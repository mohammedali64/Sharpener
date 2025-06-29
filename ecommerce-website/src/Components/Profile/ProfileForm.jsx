import { useRef, useState, useContext } from 'react';
import classes from './ProfileForm.module.css';
import AuthContext from '../../Contexts/auth-context';
import { useNavigate } from 'react-router-dom';

const API_KEY = 'AIzaSyCPyLCs84sAfKxwN-ld71RMaAFUsgRaHVA';

const ProfileForm = () => {
  const newPasswordRef = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const authCtx = useContext(AuthContext);
  const token = authCtx.token;

  const navigate = useNavigate();

  const submitHandler = async (event) => {
    event.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    setIsLoading(true);

    const enteredNewPassword = newPasswordRef.current.value;

    try {
      const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${API_KEY}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            idToken: token,
            password: enteredNewPassword,
            returnSecureToken: true
          })
        }
      );

      const data = await response.json();
      setIsLoading(false);

      if (!response.ok) {
        throw new Error(data.error.message || 'Password change failed!');
      }

      setSuccessMsg('Password changed successfully!');
      navigate('/profile');
    } catch (error) {
      setIsLoading(false);
      setErrorMsg(error.message);
    }
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input
          type='password'
          id='new-password'
          minLength={6}
          required
          ref={newPasswordRef}
        />
      </div>
      <div className={classes.action}>
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Updating...' : 'Change Password'}
        </button>
      </div>
      {errorMsg && <p className='text-danger'>{errorMsg}</p>}
      {successMsg && <p className='text-success'>{successMsg}</p>}
    </form>
  );
};

export default ProfileForm;
