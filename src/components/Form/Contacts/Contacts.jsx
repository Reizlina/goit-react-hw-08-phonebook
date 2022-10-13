import { useSelector, useDispatch } from 'react-redux';
// import { remove } from 'redux/slice';
import { fetchContacts, deleteSomeContact } from 'redux/operations';
import { useEffect } from 'react';

import s from './Contacts.module.css';

const Contacts = () => {
  const dispatch = useDispatch();
  const { contacts, filter } = useSelector(state => state);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

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
        {resultArr.map(({ name, phone, id }) => (
          <li key={id} className={s.item}>
            <p>
              {name}: {phone}
            </p>
            <button
              className={s.button}
              onClick={() => dispatch(deleteSomeContact(id))}
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
