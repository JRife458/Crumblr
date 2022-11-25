from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError

def type_check(form, field):
    types = ['text', 'photo', 'video']
    type = field.data
    if type not in types:
        raise ValidationError('Type must be text, photo, or video.')


class PostForm(FlaskForm):
    type = StringField('type', validators=[DataRequired(), type_check])
    body = StringField('body')
    url = StringField('url')
