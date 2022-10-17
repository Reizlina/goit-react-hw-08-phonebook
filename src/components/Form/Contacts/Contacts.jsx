import { useSelector, useDispatch } from 'react-redux';
import { getContacts, deleteContacts } from 'redux/authOperations';
import { useEffect } from 'react';
import Popper from '../Popper/Popper';

import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
// import EditRoundedIcon from '@mui/icons-material/EditRounded';

import s from './Contacts.module.css';

const Contacts = () => {
  const dispatch = useDispatch();
  const { contactReducer, persistedReducer } = useSelector(state => state);
  const { contacts, filter } = contactReducer;
  const { token } = persistedReducer;

  useEffect(() => {
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
          <li key={id} className={s.item} id={id}>
            <p>
              {name}: {number}
            </p>
            <div className={s.btnBox}>
              <IconButton
                onClick={() => dispatch(deleteContacts(id))}
                // className={s.button}
                sx={{ marginRight: '10px', transition: '0.3s' }}
              >
                <DeleteIcon />
              </IconButton>
              <Popper />
            </div>
          </li>
        ))}
      </ul>
    );
  }
};

export default Contacts;

// import Fade from '@mui/material/Fade';
