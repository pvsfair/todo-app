import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTodoAppContext } from '../../Context';
import { createRegister, createSetRegisterError } from '../../Context/actions';
import s from './styles.module.scss';

function Register() {
  const { state, dispatch } = useTodoAppContext();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [realName, setRealName] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [errors, setErrors] = useState([]);

  const register = createRegister(dispatch);
  const setRegisterErrors = createSetRegisterError(dispatch);

  useEffect(() => {
    if (state.registerSuccess === true) navigate('/todo');
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [state.registerSuccess]);

  const handleRegister = () => {
    setRegisterErrors(null);
    const errorsFound = [];
    if (!username) {
      errorsFound.push('Username Cannot be empty');
    }
    if (!realName) {
      errorsFound.push('Real Name Cannot be empty');
    }
    if (!password) {
      errorsFound.push('Password Cannot be empty');
    }
    if (password !== repeatPassword) {
      errorsFound.push("Passwords don't match");
    }
    setErrors(errorsFound);
    if (errorsFound.length) {
      return;
    }
    register(username, realName, password);
  };
  return (
    <div className={s.container}>
      <div className={s.LoginForm}>
        <h1>ToDo List App</h1>
        <h1>Register Now!</h1>
        <input
          autocomplete="false"
          type="text"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
        <input
          autocomplete="false"
          type="text"
          placeholder="Real Name"
          onChange={(e) => setRealName(e.target.value)}
          value={realName}
        />
        <input
          autocomplete="false"
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <input
          autocomplete="false"
          type="password"
          placeholder="Repeat Password"
          onChange={(e) => setRepeatPassword(e.target.value)}
          value={repeatPassword}
        />
        {!!errors.length && <span>{errors.join(', ')}</span>}
        {state.registerErrors}
        <div className={s.Actions}>
          <button onClick={handleRegister}>Register</button>
        </div>
      </div>
    </div>
  );
}

export default Register;
