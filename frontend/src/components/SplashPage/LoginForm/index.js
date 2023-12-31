import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import ReactGA from 'react-ga';
import * as sessionActions from '../../../store/session';
import './LoginForm.css'

function LoginForm() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/channels/@me" />;

  const handleSubmit = (e) => {
    e.preventDefault();

    setErrors([]);

    return dispatch(sessionActions.login({ credential, password }))
      .catch(async (res) => {
        let data;
        try {
          data = await res.clone().json();

          ReactGA.event({
            category: 'User',
            action: 'Logged In'
          });
        } catch {
          data = await res.text();
          
          ReactGA.exception({
            category: 'User',
            action: 'Attempted to log in',
            description: 'An error ocurred',
            fatal: true
          });
        }

        if (data?.errors) setErrors(data.errors)
        else if (data) setErrors([data])
        else setErrors([res.statusText]);
      });
  }

  const handleDemo = (e) => {
    e.preventDefault();

    setErrors([]);

    return dispatch(sessionActions.loginDemo())
      .catch(async (res) => {
        let data;
        try {
          data = await res.clone().json();
        } catch {
          data = await res.text();
        }

        if (data?.errors) setErrors(data.errors)
        else if (data) setErrors([data])
        else setErrors([res.statusText]);
      });
  }

  const handleDemo2 = (e) => {
    e.preventDefault();

    setErrors([]);

    return dispatch(sessionActions.loginDemo2())
      .catch(async (res) => {
        let data;
        try {
          data = await res.clone().json();
        } catch {
          data = await res.text();
        }

        if (data?.errors) setErrors(data.errors)
        else if (data) setErrors([data])
        else setErrors([res.statusText]);
      });
  }

  return (
    <>
    <div className='login'>
    <h1>Welcome back!</h1>
    <h2>We're so excited to see you again!</h2>
    <form onSubmit={handleSubmit} className='login-form' id='login-form'>
      <label>
        <p className={errors.length > 0 ? 'login-error' : 'login-question'}>
          <span className='bold'>EMAIL OR USERNAME</span>
          {errors.length > 0 ?
          <span className='italic'> - Login or password is invalid.</span>
          : <span className='error'> *</span>}
        </p>
        <br/>
        <input
          type="text"
          value={credential}
          onChange={(e) => setCredential(e.target.value)}
          required
          className='login-input'
        />
      </label>
      <br/>
      <br/>
      <label>
        <p className={errors.length > 0 ? 'login-error' : 'login-question'}>
          <span className='bold'>PASSWORD</span>
          {errors.length > 0 ?
          <span className='italic'> - Login or password is invalid.</span>
          : <span className='error'> *</span>}
        </p>
        <br/>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className='login-input'
        />
      </label>
      <br/>
      <br/>
      <button type='submit' className='login-button'>Log In</button>
      <button type='button' className='login-button' onClick={handleDemo}>Demo Account</button>
      <button type='button' className='login-button' onClick={handleDemo2}>Demo Account 2</button>
      <h3 className='login-sub'>Need an account? <Link to='/register/'>Register</Link></h3>
    </form>
    <br/>
    </div>
    </>
  );
}

export default LoginForm;
