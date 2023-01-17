from .db import db, environment, SCHEMA, add_prefix_for_prod, date_str


class Post(db.Model):
    __tablename__ = 'posts'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod('users.id')), nullable=False)
    type = db.Column(db.String, nullable=False)
    body = db.Column(db.String(500), nullable=False)
    url = db.Column(db.String(500))
    created_at = db.Column(db.String(50), nullable=False, default=date_str)

    user = db.relationship('User', back_populates='posts')
    likes = db.relationship("Like", back_populates="post", cascade="all, delete")

    def to_dict(self):
      return {
          'id': self.id,
          'User': self.user.post_to_dict(),
          'Likes': [like.getLikeUserId() for like in self.likes],
          'type': self.type,
          'body': self.body,
          'url': self.url,
          'createdAt': self.created_at
      }

    def likes_lst(self):
        return [like.getLikeUserId() for like in self.likes]
