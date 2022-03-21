import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useOrderCreationContext } from '../../Context';
import { createLogin, createValidateHash } from '../../Context/actions';
import { getHashFromLocalStorage } from '../../Context/service';
import s from './styles.module.scss';

function Login() {
  const { state, dispatch } = useOrderCreationContext();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const login = createLogin(dispatch);
  const validateHash = createValidateHash(dispatch);

  useEffect(() => {
    const hash = getHashFromLocalStorage();
    if (hash) {
      validateHash(hash);
    }
  }, []);
  useEffect(() => {
    if (!state.loginError && state.user.userHash) navigate('/todo');
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [state.user]);

  const handleLogin = () => {
    login(username, password);
  };
  return (
    <div className={s.container}>
      <div className={s.LoginForm}>
        <h1>ToDo List App</h1>
        <input
          type="text"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        {state.loginError && <span>Could not login</span>}
        <div className={s.Actions}>
          <button>Register</button>
          <button onClick={handleLogin}>Login</button>
        </div>
      </div>
    </div>
  );
}

export default Login;
