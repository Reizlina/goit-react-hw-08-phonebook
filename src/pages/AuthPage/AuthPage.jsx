import s from './AuthPage.module.css';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { register, login } from '../../redux/authOperations';
import Section from 'components/Form/Section/Section';

function AuthPage() {
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [passwordShown, setPasswordShown] = useState(false);
  const [flag, setFlag] = useState(false);

  const handleChangeInput =
    name =>
    ({ target: { value } }) => {
      if (name === 'email') {
        setEmail(value);
      } else if (name === 'password') {
        setPassword(value);
      } else {
        setName(value);
      }
    };

  const onRegister = e => {
    e.preventDefault();
    dispatch(register({ name, email, password }));
    reset();
  };

  const onLogin = e => {
    e.preventDefault();
    dispatch(login({ email, password }));
    reset();
  };

  const navigateAuth = () => {
    setFlag(!flag);
  };

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  const reset = () => {
    setEmail('');
    setPassword('');
    setName('');
  };

  return (
    <div className={s.wrap}>
      <Section title={flag ? 'REGISTER' : 'LOGIN'}>
        <form>
          {flag ? (
            <input
              value={name}
              onChange={handleChangeInput('Name')}
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
            min="7"
            label="Password"
            value={password}
            onChange={handleChangeInput('password')}
            type={passwordShown ? 'text' : 'password'}
            placeholder="Password"
            className={s.inputPass}
          />

          <button
            className={s.btnToggle}
            onClick={togglePassword}
            type="button"
          >
            Show password
          </button>

          <button
            type="submit"
            onClick={flag ? onRegister : onLogin}
            className={s.button}
          >
            {flag ? 'Register' : 'Login'}
          </button>
        </form>
        <button type="button" onClick={navigateAuth} className={s.buttonLog}>
          {flag ? 'Go login' : 'Go register'}
        </button>
      </Section>
    </div>
  );
}

export default AuthPage;
