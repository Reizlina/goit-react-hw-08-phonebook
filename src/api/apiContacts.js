import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://63452f26dcae733e8feb7813.mockapi.io',
});

export const getContacts = async () => {
  const { data } = await instance.get('/contacts');
  return data;
};

export const addContact = async contactObj => {
  const { data } = await instance.post('/contacts', contactObj);
  return data;
};

export const deleteContact = async id => {
  const { data } = await instance.delete(`/contacts/${id}`);
  return data;
};
