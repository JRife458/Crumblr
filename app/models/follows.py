from .db import db, environment, SCHEMA, add_prefix_for_prod

class Follow(db.Model):
    __tablename__ = 'follows'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    followee_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod('users.id')), nullable=False)
    follower_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod('users.id')), nullable=False)

    followee = db.relationship('User', back_populates='followees', cascade="all, delete-orphan")
    follower = db.relationship('User', back_populates='followers', cascade="all, delete-orphan")

    def to_dict(self):
        return {
            'id': self.id,
            'followee': self.followee.to_dict(),
            'follower_id': self.follower_id
        }
