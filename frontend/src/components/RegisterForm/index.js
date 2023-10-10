import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import './RegisterForm.css'
import { Link } from "react-router-dom/cjs/react-router-dom.min";

function RegisterForm() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [dob, setDateofBirth] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);

    dispatch(sessionActions.signUp({ email, username, password }))
      .catch(async (res) => {
        let data;
        try {
          data = await res.clone().json();
        } catch {
          data = await res.text();
        }
        if (data?.errors) setErrors(data.errors);
        else if (data) setErrors([data]);
        else setErrors([res.statusText]);
    });

    return setErrors;
  };

  return (
    <div className="login">
    <h1>Create an Account</h1>
    <form onSubmit={handleSubmit} className="login-form">
      <ul>
        {errors.map(error => <li key={error}>{error}</li>)}
      </ul>
      <label>
        <p className='login-question'>EMAIL </p> <br/>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="login-input"
        />
      </label> <br/>
      <label>
        <p className='login-question'>USERNAME </p> <br/>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="login-input"
        />
      </label> <br/>
      <label>
        <p className='login-question'>PASSWORD </p> <br/>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="login-input"
        />
      </label> <br/>
      <label>
        <p className='login-question'>DATE OF BIRTH </p> <br/>
        <input
          type="date"
          value={dob}
          onChange={(e) => setDateofBirth(e.target.value)}
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