import React, { Component } from 'react';
import ListContacts from './components/ListContacts';
import * as ContactsAPI from './utils/ContactsAPI';

class App extends Component {

  state = {
    contacts: []
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
    this.setState((currentState) => ({
      contacts: currentState.contacts.filter((c) => {
        return c.id !== contact.id;
      })
    }))
  }

  render() {
    return (
      <ListContacts
        contacts={this.state.contacts}
        onDeleteContact={this.removeContact}
      />
    );
  }
}

export default App;