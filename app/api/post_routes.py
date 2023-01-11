from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Post, db
from app.forms import PostForm
from app.api.auth_routes import validation_errors_to_error_messages
from app.s3.upload import (
    upload_file_to_s3, allowed_file, get_unique_filename)

post_routes = Blueprint('posts', __name__)

def upload_image(image):
    image.filename = get_unique_filename(image.filename)

    upload = upload_file_to_s3(image)

    if "url" not in upload:
      # if the dictionary doesn't have a url key
      # it means that there was an error when we tried to upload
      # so we send back that error message
      return upload
    url = upload["url"]
    return url

@post_routes.route('/')
def recent_posts():
    posts = Post.query.order_by(Post.created_at.desc()).all()
    return jsonify({'Posts': [post.to_dict() for post in posts]})

@post_routes.route('/', methods=["POST"])
@login_required
def create_posts():
    form = PostForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
      data = form.data
      url = None

      if (data['type'] == 'photo'):
        image = data['image']
        print("IMAGE---------------------------------", image)
        image.filename = get_unique_filename(image['name'])
        s3_url = upload_image(image)
        url = s3_url

      new_post = Post(
        user_id = current_user.id,
        type = data['type'],
        body = data['body'],
        url = url
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
    form = PostForm()
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

@post_routes.route('/following')
@login_required
def following():
    followed = current_user.to_dict().Followed

    return jsonify({'Posts': [followee.to_dict() for followee in followed]})
