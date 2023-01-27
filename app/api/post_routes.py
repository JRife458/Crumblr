from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Post, db, Like
from app.forms import PostForm
from app.api.auth_routes import validation_errors_to_error_messages
from app.s3.upload import (
    upload_file_to_s3, allowed_file, get_unique_filename, delete_file_in_s3)

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

@post_routes.route("/upload", methods=["POST"])
@login_required
def upload_image():
    if "image" not in request.files:
        return {"errors": "image required"}, 400

    image = request.files["image"]

    if not allowed_file(image.filename):
        return {"errors": "file type not permitted"}, 400

    image.filename = get_unique_filename(image.filename)

    upload = upload_file_to_s3(image)

    if "url" not in upload:
        # if the dictionary doesn't have a url key
        # it means that there was an error when we tried to upload
        # so we send back that error message
        return upload, 400

    url = upload["url"]
    # flask_login allows us to get the current user from the request
    return {"url": url}

@post_routes.route('/<int:id>', methods=["PUT"])
@login_required
def edit_post(id):
    post = Post.query.get(id)
    form = PostForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
      data = form.data
      post.body = data['body']
      db.session.commit()
      return jsonify(post.to_dict())
    return jsonify('Error updating post.')

@post_routes.route('/<int:id>', methods=["DELETE"])
@login_required
def delete_post(id):
    post = Post.query.get(id)
    split = post.url.split('/')
    filename = split[len(split) - 1]
    delete_file_in_s3(filename)
    db.session.delete(post)
    db.session.commit()
    return jsonify('Post Deleted')

@post_routes.route('/<int:id>/likes', methods=["POST"])
@login_required
def like_post(id):
    post = Post.query.get(id)
    if not post:
        return {'error': 'Post not found'}
    if current_user.id in post.likes_lst():
        return {'error': 'User has already liked this post'}
    newLike = Like(
        user_id=current_user.id,
        post_id=id
    )
    db.session.add(newLike)
    db.session.commit()
    return jsonify({
        "userId": current_user.id,
        "postId": id
    })

@post_routes.route('/<int:id>/likes', methods=["DELETE"])
@login_required
def unlike_post(id):
    like = Like.query.filter(Like.post_id == id, Like.user_id == current_user.id).first()
    if like:
        db.session.delete(like)
        db.session.commit()
        return jsonify('Post Unliked')
    else:
        return jsonify({'error': 'No like found by user for this post'})


@post_routes.route('/following')
@login_required
def following():
    followed = current_user.to_dict().Followed

    return jsonify({'Posts': [followee.to_dict() for followee in followed]})
