import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import ReactGA from 'react-ga';
import * as sessionActions from "../../../store/session";
import './RegisterForm.css'

function RegisterForm() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/channels/@me" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);

    dispatch(sessionActions.signUp({ email, username, password }))
      .catch(async (res) => {
        let data;
        try {
          data = await res.clone().json();

          ReactGA.event({
            category: 'User',
            action: 'Created an Account'
          });
        } catch {
          data = await res.text();

          ReactGA.exception({
            category: 'User',
            action: 'Attempted to create an account',
            description: 'An error ocurred',
            fatal: true
          });
        }

        if (data?.errors) setErrors(data.errors);
        else if (data) setErrors([data]);
        else setErrors([res.statusText]);
    });
  };

  return (
    <div className="login">
    <h1>Create an Account</h1>
    <form onSubmit={handleSubmit} className="login-form" id='register-form'>
      <ul>
        {errors.map(error => <li key={error} className="login-error">{error}</li>)}
      </ul>
      <label>
        <p className='login-question'>EMAIL <span className='error'>*</span>
        </p> <br/>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="login-input"
        />
      </label> <br/>
      <label>
        <p className='login-question'>USERNAME <span className='error'>*</span>
        </p> <br/>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="login-input"
        />
      </label> <br/>
      <label>
        <p className='login-question'>PASSWORD <span className='error'>*</span>
        </p> <br/>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="login-input"
        />
      </label> <br/>
      <button type="submit" className="login-button">Continue</button>
    </form>
    <sub>By registering, you agree to Dupercord's <Link to='https://discord.com/terms'>Terms of Service</Link> and <Link to='https://discord.com/privacy'>Privacy Policy</Link></sub>
    <br/>
    <br/>
    <Link to='/login' className="login-link">Already have an account?</Link><br/><br/>
    </div>
  );
}

export default RegisterForm;