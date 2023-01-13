from .db import db, environment, SCHEMA, add_prefix_for_prod, date_str


users_to_post_likes = db.Table(
    'users_to_post_likes',
    db.Column('user_id', db.Integer, db.ForeignKey(
        add_prefix_for_prod('user.id')), primary_key=True),
    db.Column('post_id', db.Integer, db.ForeignKey(
        add_prefix_for_prod('post.id')), primary_key=True)
)

if environment == "production":
    users_to_post_likes.schema = SCHEMA

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
    # likes = db.relationship('Like', back_populates='post', primaryjoin=lambda: Post.id == Like.post_id, cascade="all, delete-orphan")
    likes = db.relationship('User', secondary=users_to_post_likes, back_populates='liked')

    def to_dict(self):
      return {
          'id': self.id,
          'User': self.user.post_to_dict(),
          'Likes': self.likes,
          'type': self.type,
          'body': self.body,
          'url': self.url,
          'createdAt': self.created_at
      }
