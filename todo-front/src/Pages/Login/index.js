import { useState } from 'react';
import s from './styles.module.scss';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

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
        <button>Login</button>
        <button>Register</button>
      </div>
    </div>
  );
}

export default Login;
