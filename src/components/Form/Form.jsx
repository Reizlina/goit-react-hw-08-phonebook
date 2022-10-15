import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { logout } from 'redux/authOperations';
import s from './Form.module.css';

import Section from './Section/Section';
import Loader from 'components/Loader';
import FormInput from './FormInput/FormInput';
import Contacts from './Contacts/Contacts';
import SearchContact from './SearchContact/SearchContact';

export default function Form() {
  const { contactReducer, persistedReducer } = useSelector(state => state);
  const { contacts, isLoading, error } = contactReducer;
  const { user } = persistedReducer;
  console.log(contacts);
  const dispatch = useDispatch();

  const handleLogout = e => {
    e.preventDefault();
    dispatch(logout());
  };

  return (
    <>
      <div className={s.wrap}>
        <div className={s.user}>
          <p>{user.email}</p>
          <button onClick={handleLogout} className={s.buttonLogout}>
            Logout
          </button>
        </div>
        <Section title="Phonebook">
          <FormInput />
        </Section>
        <Section title="Contacts">
          {isLoading && !error && <Loader />}
          {contacts.length > 0 && <SearchContact />}
          <Contacts />
        </Section>
      </div>
    </>
  );
}
