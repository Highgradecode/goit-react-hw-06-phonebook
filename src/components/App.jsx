import { useState } from "react";
import { nanoid } from 'nanoid'
import { ContactForm } from "./ContactForm/ContactForm";
import { ContactList } from "./ContactList/ContactList";
import { Filter } from "./Filter/Filter";
import { useDispatch, useSelector } from "react-redux";
import { addContact as addContactAction, deleteContact as deleteContactAction, getContacts } from "./store/contacts/contactSlice";


export const App = () => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const contacts = useSelector(getContacts);
  const filterValue = useSelector(state => state.filter);
  const dispatch = useDispatch();


  const handleChange = (e) => {
    const { value, name } = e.target;

    switch (name) {
      case 'name':
        setName(value)
        break;
      
      case 'number':
        setNumber(value)
        break;
      
      default:
        return
    }
  }

  const addContact = (e) => {
  e.preventDefault();

  if (contacts.find(contact => contact.name === name)) {
    e.target.reset()
    return alert(`${name} already in contacts.`)
  }

  const newContact = {
    name: name,
    number: number,
    id: nanoid(),
  };
  
    dispatch(addContactAction(newContact))
  
    e.target.reset()
  
  };

  const filteredContacts = () => {
    const normlizeFilter = filterValue.toLowerCase();
    
    return contacts.filter(contact => contact.name.toLowerCase().includes(normlizeFilter));
  };

  const deleteContact = (contactId) => {

    dispatch(deleteContactAction(contactId));
  };

  // add contacts to localstor
  // useEffect(() => {
  //   localStorage.setItem('savedContacts', JSON.stringify(contacts))
  // }, [contacts]);


  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 26,
        color: '#010101'
      }}
    >
      <h1 style={{margin: 30}}>Phonebook</h1>
      <ContactForm addContact={addContact}
        handleChange={handleChange}/>
      <h2 style={{ margin: 30 }}>Contacts</h2>
      <Filter/>
      <ContactList
        contacts={filteredContacts()}
        deleteContact={deleteContact} />
    </div>
  );
};