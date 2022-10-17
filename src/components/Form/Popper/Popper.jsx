import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Popover from '@mui/material/Popover';
import IconButton from '@mui/material/IconButton';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import Notiflix from 'notiflix';

import { editContacts } from 'redux/authOperations';
import { useSelector, useDispatch } from 'react-redux';

import s from './Popper.module.css';

export default function SimplePopper() {
  const [idContact, setIdContact] = useState('');
  const [number, setNumber] = useState('');
  const [name, setName] = useState('');
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { contactReducer } = useSelector(state => state);
  const { contacts } = contactReducer;
  const dispatch = useDispatch();

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSubmit = event => {
    event.preventDefault();
    const form = event.target;
    const contactName = form.elements.name.value;
    const nameOfContact = contacts?.find(
      contact => contact.name === contactName
    );

    if (nameOfContact) {
      Notiflix.Notify.failure(`${contactName} is already in contacts`, {
        position: 'center-center',
        fontSize: '20px',
        failure: {
          background: '#ec7839',
          notiflixIconColor: 'white',
        },
      });

      return;
    }
    dispatch(editContacts({ name, number, id: idContact }));
    setAnchorEl(null);
    form.reset();
  };

  const handleClick = event => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
    const liId = event.currentTarget.closest('li').id;
    const contactUsers = contacts.find(contact => contact.id === liId);
    setName(contactUsers.name);
    setNumber(contactUsers.number);
    setIdContact(contactUsers.id);
  };

  const handleChangeInput =
    name =>
    ({ target: { value } }) => {
      if (name === 'number') {
        setNumber(value);
      } else {
        setName(value);
      }
    };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popper' : undefined;

  return (
    <div>
      <IconButton
        aria-describedby={id}
        type="button"
        onClick={handleClick}
        sx={{ transition: '0.3s' }}
      >
        <EditRoundedIcon />
      </IconButton>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'right',
        }}
      >
        <Box
          sx={{
            boxShadow:
              '3px 3px 1px 1px #fff583, 3px 3px 1px 2px rgba(0, 0, 0, 1)',
            border: 1,
            p: 1,
            bgcolor: 'background.paper',
          }}
        >
          <form onSubmit={handleSubmit} className={s.form}>
            <input
              onChange={handleChangeInput('name')}
              value={name}
              placeholder="Name"
              className={s.input}
              type="text"
              name="name"
              pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
              title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
              required
            />

            <input
              onChange={handleChangeInput('number')}
              value={number}
              placeholder="Phone"
              className={s.input}
              type="tel"
              name="number"
              pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
              title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
              required
            />
            <button className={s.button}>Edit contact</button>
          </form>
        </Box>
      </Popover>
    </div>
  );
}
