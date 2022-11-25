from app.models import db, Post, environment, SCHEMA

def seed_posts():
  post1 = Post(
    user_id = 1,
    type = 'text',
    body = 'Pariatur culpa do magna consequat aute laboris et tempor. Consectetur adipisicing magna consectetur amet adipisicing ex velit anim incididunt ex nulla ad reprehenderit et. Adipisicing et velit ut proident aute excepteur esse do aliqua ipsum. Sunt aliquip nisi eiusmod mollit dolor excepteur consequat labore velit irure eu veniam elit esse. Ut id aute laboris non velit veniam ea. Amet tempor laboris cillum pariatur nisi aliquip duis sit aute labore laborum elit labore excepteur.'
  )
  post2 = Post(
    user_id = 2,
    type = 'photo',
    body = 'Testing Photo Post',
    url = 'https://upload.wikimedia.org/wikipedia/commons/f/f1/2ChocolateChipCookies.jpg'
  )

  db.session.add(post1)
  db.session.add(post2)
  db.session.commit()

def undo_posts():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.posts RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM posts")

    db.session.commit()
