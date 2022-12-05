from app.models import db, Post, environment, SCHEMA

def seed_posts():
        post1 = Post(
          user_id = 2,
          type = 'text',
          body = 'The best thing an aspiring Cookie Clicker aficionado can do for themselves is to never turn off the game. This might seem like a bad idea for such an addicting game, but the easiest way to rack up money is to keep the game running while doing other things like working, watching videos, or even playing other games.'
        )
        post2 = Post(
          user_id = 3,
          type = 'photo',
          body = "It looks like a chocolate chip cookie. It taste like a chocolate chip cookie, but it's gluten-free, grain-free, and dairy-free. ''Thank you so much for this healthy alternative to chocolate chip cookies,'' says reviewer Julie. ''Made these to the exact recipe, cooked them for 10 mins and they came out to perfection, soft centers with crisp edges!''",
          url = 'https://www.allrecipes.com/thmb/8NDb45Ly7LUKNvL5q1QriFvd4BM=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/241434-Paleo-Chocolate-Chip-Cookies-Christine-Satterfield-1x1-1-c082476aef2d42bd911268dc7c743847.jpg'
        )
        post3 = Post(
          user_id = 4,
          type = 'photo',
          body = 'Cookie Clicker Tips and Tricks',
          url = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQewqtDemDI3dCBNjw9T647KSy5RV2UmqErkA&usqp=CAU'
        )
        post4 = Post(
          user_id = 5,
          type = 'text',
          body = 'For me, its the oatmeal raisin. The best classic cookie. I even ask for extra icing on top and the staff is so friendly and more than willing to oblige.'
        )
        post5 = Post(
          user_id = 5,
          type = 'text',
          body = "Fights over cookies have nearly ended my marriage, has driven a wedge between me and my children and almost got me arrested. Beware, these cookies are so yummy they will change your life, you've been warned. And remember don't eat your wife's have of the coconut lime cookie if you intend to stay married/alive."
        )
        post6 = Post(
          user_id = 6,
          type = 'photo',
          body = '#SelfieSunday',
          url = 'https://cdn.britannica.com/66/218266-050-77C3D624/Cookie-Monster-Sesame-Street-2016.jpg'
        )
        post7 = Post(
          user_id = 2,
          type = 'text',
          body = "Have you guys tried the Gluten Free Oreos? They're just like the regular ones! A definite must try."
        )
        post8 = Post(
          user_id = 3,
          type = 'text',
          body = "Personally, I've never had a snickerdoodle that I didn't like"
        )
        post9 = Post(
          user_id = 4,
          type = 'text',
          body = "How many Keebler Elves do you think there actually are? There's no way the three of them could be making all of those themselves."
        )
        post10 = Post(
          user_id = 5,
          type = 'photo',
          body = "Oatmeal Raisin get's way more hate than it deserves. The sweetness of the raisin plays off the earthiness of the oats so well, a little salt pulls it all together. The icing on top brings it to a perfect 10 out of 10.",
          url = "https://thesouthernladycooks.com/wp-content/uploads/2022/11/IcedOatmealCookiesWebsite.png"
        )
        post11 = Post(
          user_id = 6,
          type = 'photo',
          body = 'Cookie Monster never seen a cookie this big!',
          url = "https://www.foodandwine.com/thmb/ikZM7OMpenKVEFzQA-aDh4W-Nhs=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/the-joy-of-cookies-cookie-monster-blog0817-ce87adde1df44caaa271581b92c3e71e.jpg"
        )
        post12 = Post(
          user_id = 2,
          type = 'photo',
          body = 'My Secret Family Recipe!!',
          url = 'https://i.pinimg.com/originals/b9/c5/95/b9c595d42f2e2566dfaaa508badfe764.jpg'
        )


        db.session.add(post1)
        db.session.add(post2)
        db.session.add(post3)
        db.session.add(post4)
        db.session.add(post5)
        db.session.add(post6)
        db.session.add(post7)
        db.session.add(post8)
        db.session.add(post9)
        db.session.add(post10)
        db.session.add(post11)
        db.session.add(post12)
        db.session.commit()

def undo_posts():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.posts RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM posts")

    db.session.commit()
