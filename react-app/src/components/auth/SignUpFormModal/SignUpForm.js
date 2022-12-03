import React, { useState } from 'react';
import { useDispatch } from 'react-redux'
import { signUp } from '../../../store/sessionReducer';

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    let validationErrors = [];
    if (password !== repeatPassword)
      validationErrors.push("Passwords do not match");
    if (!email.includes("@"))
      validationErrors.push("Not a valid email address");
    setErrors(validationErrors)
    if (validationErrors.length <= 0) {
      const data = await dispatch(signUp(username, email, password));
      if (data) {
        setErrors(data)
      }
    }

  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  return (
    <form onSubmit={onSignUp} className="signup-form">
      <h2>Sign Up</h2>
      <div>
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>
      <div className='signup-form-inputs'>
      <div className="signup-input">
        <label>User Name</label>
        <input
          type='text'
          name='username'
          onChange={updateUsername}
          value={username}
          minLength='2'
          maxLength='20'
        ></input>
      </div>
      <div className="signup-input">
        <label>Email</label>
        <input
          type='text'
          name='email'
          onChange={updateEmail}
          value={email}
        ></input>
      </div>
      <div className="signup-input">
        <label>Password</label>
        <input
          type='password'
          name='password'
          onChange={updatePassword}
          value={password}
          minLength='8'
        ></input>
      </div>
      <div className="signup-input">
        <label>Repeat Password</label>
        <input
          type='password'
          name='repeat_password'
          onChange={updateRepeatPassword}
          value={repeatPassword}
          required={true}
          minLength='8'
        ></input>
      </div>
      </div>
      <button type='submit'>Sign Up</button>
    </form>
  );
};

export default SignUpForm;
