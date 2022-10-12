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
          src="http://www.quickmeme.com/img/26/2677b78624b1858a57d99e67c38e124dba7f6d7bd1428ec4836ab03729a5a5dd.jpg"
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
