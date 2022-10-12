import { useDispatch } from 'react-redux';
import { find } from 'redux/slice';
import s from './SearchContact.module.css';

function SearchContact() {
  const dispatch = useDispatch();

  const findContact = e => {
    dispatch(find(e.target.value));
  };

  return (
    <div className={s.wrap}>
      <input
        className={s.input}
        placeholder="Find contacts by name"
        type="text"
        name="search"
        onChange={findContact}
      ></input>
    </div>
  );
}

export default SearchContact;
