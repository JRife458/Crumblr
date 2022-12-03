import React, { useState } from "react";
import {login} from '../../../store/sessionReducer'
import { useDispatch } from "react-redux";
import './LoginForm.css'

function LoginForm() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password))
    if (data) {
      setErrors(data)
    }
  };

  const demoUser = async (e) => {
    e.preventDefault();
    await dispatch(login('demo@aa.io', 'password'));
  }

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <h2>Log In</h2>
      <div>
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>
      <div className="login-form-inputs">
        <label className="login-input">
          Email
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            />
        </label>
        <label className="login-input">
          Password
          <input
           type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            />
        </label>
      </div>
      <button type="submit">Log In</button>
      <button onClick={demoUser}>Demo User</button>
    </form>
  );
}

export default LoginForm;
