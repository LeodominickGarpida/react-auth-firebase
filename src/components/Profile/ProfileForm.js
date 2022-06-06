import { useRef, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import AuthContext from '../../store/auth-context';

import classes from './ProfileForm.module.css';

const ProfileForm = () => {
  const history = useHistory()
  const newPasswordInputRef = useRef()
  const { token } = useContext(AuthContext)

  const submitHandler = (e) => {
    e.preventDefault()

    const enteredPassword = newPasswordInputRef.current.value

    // add validation

    console.log(token)

    fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBb3KxcSSBicveERZ_mynl9wSR8HA_4790', {
        method: 'POST',
        body: JSON.stringify({
          idToken: token,
          password: enteredPassword,
          returnSecureToken: false
        }),
        headers: { 'Content-Type': 'application/json' }
    }).then(res => {
      // console.log('Success')

      history.replace('/')
    })
  }

  return (
    <form className={classes.form} onSubmit={submitHandler} >
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' minLength="7" ref={newPasswordInputRef} />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
