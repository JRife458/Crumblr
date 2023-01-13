from .db import db, environment, SCHEMA, add_prefix_for_prod
from .post import users_to_post_likes
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)


    posts = db.relationship('Post', back_populates='user', cascade="all, delete-orphan")
    # likes = db.relationship('Like', back_populates='user', primaryjoin=lambda: User.id == Like.user_id, cascade="all, delete-orphan")
    liked = db.relationship('Post', secondary=users_to_post_likes, back_populates='likes')
    followers = db.relationship(
        'Follow',
         back_populates='follower',
         primaryjoin=lambda: User.id == Follow.follower_id,
         cascade="all, delete-orphan",
         )
    followed = db.relationship(
            'Follow',
            back_populates='followee',
            primaryjoin=lambda: User.id == Follow.followee_id,
            cascade="all, delete-orphan",
            )



    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        print('look here ------------------', self.followed)
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'Following': [followee.to_dict() for followee in self.followers]
        }
    def following_to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'Posts': [post.to_dict() for post in self.posts]
        }
    def post_to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email
        }

class Follow(db.Model):
    __tablename__ = 'follows'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    followee_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod('users.id')), nullable=False, primary_key=True)
    follower_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod('users.id')), nullable=False, primary_key=True)

    followee = db.relationship('User', back_populates='followed', foreign_keys=[followee_id])
    follower = db.relationship('User', back_populates='followers', foreign_keys=[follower_id])

    def to_dict(self):
        return self.followee.following_to_dict()
