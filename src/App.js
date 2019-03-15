import React, { Component } from 'react';
import ListContacts from './components/ListContacts';
import * as ContactsAPI from './utils/ContactsAPI';
import CreateContact from './components/CreateContact';

class App extends Component {

  state = {
    contacts: [],
    screen: 'list'
  }

  componentDidMount() {
    ContactsAPI.getAll().then( contacts => {
      this.setState( () => ({
        contacts
      }) );
    } );
  }

  /*
  * Remove selected contact from the list
  */
  removeContact = (contact) => {
    this.setState( (currentState) => ({
      contacts: currentState.contacts.filter( (c) => {
        return c.id !== contact.id;
      } )
    }) )
    ContactsAPI.remove(contact);
  }

  addContactForm = () => {
    console.log('addContactForm');
    this.setState({ screen: 'create' });
  }

  render() {
    
    return (
      <div>
        {this.state.screen === 'list' && (
          <ListContacts
            contacts = {this.state.contacts}
            onDeleteContact = {this.removeContact}
            onNavigate = {this.addContactForm}
          />
        )}
        {this.state.screen === 'create' && (
          <CreateContact />
        )}
      </div>
    );
  }
}

export default App;