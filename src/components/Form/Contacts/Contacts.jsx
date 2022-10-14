import { useSelector, useDispatch } from 'react-redux';
// import { remove } from 'redux/slice';
import { getContacts, deleteContacts } from 'redux/authOperations';
import { useEffect } from 'react';

import s from './Contacts.module.css';

const Contacts = () => {
  const dispatch = useDispatch();
  const { contactReducer, persistedReducer } = useSelector(state => state);
  const { contacts, filter } = contactReducer;
  const { token } = persistedReducer;

  useEffect(() => {
    // console.log(token);
    if (token) {
      dispatch(getContacts());
    }
    // eslint-disable-next-line
  }, [token]);

  const filterContact = () => {
    if (!filter) {
      return contacts;
    }
    return contacts.filter(({ name }) => {
      return name.toLowerCase().includes(filter.toLowerCase());
    });
  };

  const resultArr = filterContact();

  if (!resultArr.length) {
    return (
      <div className={s.wrap}>
        <img
          src="https://i.pinimg.com/236x/0e/f2/8d/0ef28d8ff51cf563124538ae3323e5d6.jpg"
          alt="smile"
          width="300"
        />
      </div>
    );
  } else {
    return (
      <ul className={s.list}>
        {resultArr.map(({ name, number, id }) => (
          <li key={id} className={s.item}>
            <p>
              {name}: {number}
            </p>
            <button
              className={s.button}
              onClick={() => dispatch(deleteContacts(id))}
            >
              Delete contact
            </button>
          </li>
        ))}
      </ul>
    );
  }
};

export default Contacts;
