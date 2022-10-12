import { useSelector } from 'react-redux';
import s from './Form.module.css';

import Section from './Section/Section';
import Loader from 'components/Loader';
import FormInput from './FormInput/FormInput';
import Contacts from './Contacts/Contacts';
import SearchContact from './SearchContact/SearchContact';

export default function Form() {
  const { contacts, isLoading, error } = useSelector(state => state);

  return (
    <div className={s.wrap}>
      <Section title="Phonebook">
        <FormInput />
      </Section>
      <Section title="Contacts">
        {isLoading && !error && <Loader />}
        {contacts.length > 0 && <SearchContact />}
        <Contacts />
      </Section>
    </div>
  );
}
