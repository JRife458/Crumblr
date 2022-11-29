from .db import db, environment, SCHEMA, add_prefix_for_prod
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
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'Following': [followee.to_dict() for followee in self.followed]
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
        return {
            'followee': self.followee.to_dict(),
            'follower_id': self.follower_id
        }
