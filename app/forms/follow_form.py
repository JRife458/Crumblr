from flask_wtf import FlaskForm
from wtforms import IntegerField
from wtforms.validators import DataRequired

class FollowForm(FlaskForm):
    followeeId = IntegerField('followeeId', validators=[DataRequired()])
    followerId = IntegerField('followerId', validators=[DataRequired()])
