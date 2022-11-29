from app.models import db, Post, environment, SCHEMA

def seed_posts():
  post1 = Post(
    user_id = 2,
    type = 'text',
    body = 'Pariatur culpa do magna consequat aute laboris et tempor. Consectetur adipisicing magna consectetur amet adipisicing ex velit anim incididunt ex nulla ad reprehenderit et. Adipisicing et velit ut proident aute excepteur esse do aliqua ipsum. Sunt aliquip nisi eiusmod mollit dolor excepteur consequat labore velit irure eu veniam elit esse. Ut id aute laboris non velit veniam ea. Amet tempor laboris cillum pariatur nisi aliquip duis sit aute labore laborum elit labore excepteur.'
  )
  post2 = Post(
    user_id = 2,
    type = 'photo',
    body = 'Testing Photo Post',
    url = 'https://upload.wikimedia.org/wikipedia/commons/f/f1/2ChocolateChipCookies.jpg'
  )
  post3 = Post(
    user_id = 3,
    type = 'photo',
    body = 'Cookie Clicker Tips and Tricks',
    url = 'https://media.istockphoto.com/id/157511634/photo/homemade-chocolate-chip-cookie-on-white-overhead-xxxl.jpg?s=612x612&w=0&k=20&c=0sdlLuP-vNNQZguX4AWIHSvUYBFWIJfkYoiwpKMM9zA='
  )
  post4 = Post(
    user_id = 3,
    type = 'text',
    body = 'In quis minim duis id sunt culpa duis tempor et mollit labore consequat aute dolore. Qui nisi culpa proident id ullamco esse amet aute occaecat commodo deserunt laborum. Consectetur minim adipisicing nisi nostrud laborum magna non Lorem mollit ex proident mollit irure ad. Occaecat reprehenderit mollit nulla tempor irure aliquip officia veniam ullamco Lorem. Do commodo quis do magna deserunt ipsum reprehenderit et cillum eiusmod. Dolor amet cillum irure tempor ea aliquip commodo nulla labore aliquip reprehenderit et. Qui est reprehenderit quis enim commodo.'
  )


  db.session.add(post1)
  db.session.add(post2)
  db.session.add(post3)
  db.session.add(post4)
  db.session.commit()

def undo_posts():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.posts RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM posts")

    db.session.commit()
