import { useRef, useState } from 'react';
import classes from './AuthForm.module.css';
import { Button } from 'react-bootstrap';

const AuthForm = () => {
  const API_KEY = 'AIzaSyCPyLCs84sAfKxwN-ld71RMaAFUsgRaHVA';
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const [isLogin, setIsLogin] = useState(true);
  const [login, setLogin] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
    setErrorMsg('');
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    setLogin(true);
    setErrorMsg('');

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    const url = isLogin
      ? `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`
      : `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`;

    try {
      const res = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPassword,
          returnSecureToken: true
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const data = await res.json();
      console.log(data.idToken);
      setLogin(false);

      if (!res.ok) {
        throw new Error(data.error.message || 'Authentication failed!');
      }

      console.log('Success:', data);
      alert('Success!');

    } catch (err) {
      setLogin(false);
      alert(err.message);
    }
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={handleLogin}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input
            type='password'
            id='password'
            minLength={6}
            ref={passwordInputRef}
            required
          />
        </div>
        <div>
          <Button type='submit'>{isLogin ? 'Login' : 'Sign Up'}</Button>
          {login && <p className='fw-bold text-white mt-2'>Sending Request...</p>}
          {errorMsg && <p className='text-danger mt-2'>{errorMsg}</p>}
        </div>
        <div className={classes.actions}>
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
