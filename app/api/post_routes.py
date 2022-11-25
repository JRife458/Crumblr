from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Post, db
from app.forms import PostForm
from app.api.auth_routes import validation_errors_to_error_messages

post_routes = Blueprint('posts', __name__)

@post_routes.route('/')
def recent_posts():
    posts = Post.query.order_by(Post.created_at.desc()).all()
    return jsonify({'Posts': [post.to_dict() for post in posts]})

@post_routes.route('/', methods=["POST"])
@login_required
def create_posts():
    form = PostForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    print('post creation hit')
    if form.validate_on_submit():
      data = form.data
      new_post = Post(
        user_id = current_user.id,
        type = data['type'],
        body = data['body'],
        url = data['url']
      )
      db.session.add(new_post)
      db.session.commit()
      return jsonify(new_post.to_dict())
    else:
      return jsonify('Error creating post.')

@post_routes.route('/<int:id>', methods=["PUT"])
@login_required
def edit_post(id):
    post = Post.query.get(id)
    form = PostForm
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
      data = form.data
      post.type = data['type']
      post.body = data['body']
      post.url = data['url']
      db.session.commit()
      return jsonify(post.to_dict())
    return jsonify('Error updating post.')

@post_routes.route('/<int:id>', methods=["DELETE"])
@login_required
def delete_post(id):
    post = Post.query.get(id)
    db.session.delete(post)
    db.session.commit()
    return jsonify('Post Deleted')
