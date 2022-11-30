from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import User, db, Follow
from app.forms import FollowForm

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    return user.to_dict()

@user_routes.route('/<int:id>/follow', methods=["POST"])
@login_required
def follow_user(id):
    form = FollowForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
      data = form.data
      new_follow = Follow(
        followee_id = id,
        follower_id = current_user.id
      )
      db.session.add(new_follow)
      db.session.commit()
      return jsonify(new_follow.to_dict())
    else:
      return jsonify('Error following User')

@user_routes.route('/<int:id>/follow', methods=["DELETE"])
@login_required
def delete_follow(id):
    follow = Follow.query.filter(Follow.followee_id == id, Follow.follower_id == current_user.id).first()
    db.session.delete(follow)
    db.session.commit()
    return jsonify('User Unfollowed')
