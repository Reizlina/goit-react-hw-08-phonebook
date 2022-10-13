import s from './AuthPage.module.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Section from 'components/Form/Section/Section';

function AuthPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userName, setUserName] = useState('');
  const [flag, setFlag] = useState(false);

  const navigateUser = () => {
    reset();
  };

  const handleChangeInput =
    name =>
    ({ target: { value } }) => {
      if (name === 'email') {
        setEmail(value);
      } else {
        setPassword(value);
      }
    };

  const onRegister = e => {
    e.preventDefault();
  };

  const onLogin = e => {
    e.preventDefault();
  };

  const navigateAuth = () => {
    // change flag on opposite
    setFlag(!flag);
  };

  const reset = () => {
    setEmail('');
    setPassword('');
    setUserName('');
  };

  return (
    <div className={s.wrap}>
      <Section title={flag ? 'REGISTER' : 'LOGIN'}>
        <form>
          {flag ? (
            <input
              value={userName}
              onChange={handleChangeInput('userName')}
              placeholder="Name"
              className={s.input}
              type="text"
              name="name"
              required
            />
          ) : null}
          <input
            value={email}
            onChange={handleChangeInput('email')}
            placeholder="Email"
            className={s.input}
            type="text"
            name="email"
            required
            id="email"
          />
          <input
            autoComplete={password || 'Password'}
            name="password"
            required
            id="password"
            label="Password"
            value={password}
            onChange={handleChangeInput('password')}
            placeholder="Password"
            className={s.input}
          />
          <button onClick={flag ? onRegister : onLogin} className={s.button}>
            {flag ? 'Register' : 'Login'}
          </button>
        </form>
        <button onClick={navigateAuth} className={s.buttonLog}>
          {flag ? 'Go login' : 'Go register'}
        </button>
      </Section>
    </div>
  );
}

export default AuthPage;
