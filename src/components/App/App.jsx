import { useEffect, useState } from 'react';
import { Container, Title } from './App.styled';
import ContactForm from 'components/ContactForm/ContactForm';
import { Subtitle } from 'components/Subtitle/Subtitle.styled';
import ContactList from 'components/ContactList';
import Filter from 'components/Filter/Filter';

function getLocalStorageContacts() {
  const contactsLS = JSON.parse(localStorage.getItem('contacts'));
  return contactsLS || [];
}

export default function App() {
  const [contacts, setContacts] = useState(getLocalStorageContacts);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const isValidContact = name => {
    const isSameContact = contacts.some(contact => contact.name === name);
    if (isSameContact) {
      alert(`${name} is already in contacts!`);
      return false;
    }

    return true;
  };

  const handleSubmit = contact => {
    if (!isValidContact(contact.name)) return;
    setContacts(state => [...state, contact]);
  };

  const handleDeleteContact = id => {
    setContacts(state => state.filter(contact => contact.id !== id));
  };

  return (
    <Container>
      <div>
        <Title>Phonebook</Title>
        <ContactForm handleSubmit={handleSubmit}></ContactForm>
      </div>

      <div>
        <Subtitle>Contacts</Subtitle>
        <Filter value={filter} onChange={setFilter} />
        {contacts.length ? (
          <ContactList
            contacts={contacts}
            filter={filter}
            onDelete={handleDeleteContact}
          />
        ) : null}
      </div>
    </Container>
  );
}
