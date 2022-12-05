# Crumblr

Crumblr is a clone of the website Tumblr, but with a cookie themed twist! You can create an account, add

Live site: [Crumblr](https://crumblr.onrender.com/)

Wiki: [Link](https://github.com/Mancussion/Crumblr/wiki)

## Tech Stack

### Frameworks, Platforms, and Libraries:

![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54)
![Flask](https://img.shields.io/badge/flask-%23000.svg?style=for-the-badge&logo=flask&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)

### Hosting:

![Render](https://img.shields.io/badge/Render-%46E3B7.svg?style=for-the-badge&logo=render&logoColor=white)

## Features

### Home Page:

Here you can see a list of recent posts. You can also follow users to add them to your following feed

![home]

[home]: ./screenshots/Homepage.png

### Sign Up and Log In

You can sign up or log in at any time by navigating to the top of the screen. There is also an option to log in as the Demo User

![sign up]
![log in]

[sign up]: ./screenshots/SignUp.png
[log in]: ./screenshots/LogIn.png

### Create a Post

![create a post]

[create a post]: ./screenshots/CreatePost.png

If you are signed in, you can create a post by clicking the selection at the top of the page

### Edit a Post

Here you can edit posts you've made, or delete them entirely.

![edit a post]

[edit a post]: ./screenshots/EditPost.png

### Following

Here you can see a view only the most recent posts from the users that you have followed

![following]

[following]: ./screenshots/Following.png

## Upcoming Features

- Upload Images

- Video Posts

- Liking Posts

- Add tags to post

## Set Up

- Clone the repo

### Back End Server

- Open up a new terminal

- Open up the project folder

- Install dependencies

  ```bash
  pipenv install -r requirements.txt
  ```

- Create a **.env** file based on the example

- Run the following commands to open your pipenv, migrate the database, seed the database, and run the Flask app

  ```bash
  pipenv shell
  ```

  ```bash
  flask db upgrade
  ```

  ```bash
  flask seed all
  ```

  ```bash
  flask run
  ```

### Front End

- Open up another new terminal

- Direct to the <code>react-app</code> folder

- Install dependencies

  ```bash
  npm install
  ```

- Start the React App

  ```bash
  npm start
  ```

## Contact Me

- Email: <code>jrife458@gmail.com</code>

- Linkedin: [Link](https://www.linkedin.com/in/justin-rife-730875181/)
