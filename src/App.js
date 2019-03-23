import React, { Component } from 'react';
import ListContacts from './components/ListContacts';
import * as ContactsAPI from './utils/ContactsAPI';
import CreateContact from './components/CreateContact';
import { Route } from 'react-router-dom';

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
    this.setState( (currentState) => ({
      contacts: currentState.contacts.filter( (c) => {
        return c.id !== contact.id;
      } )
    }) )
    ContactsAPI.remove(contact);
  }

  createContact = contact => {
    ContactsAPI.create(contact)
      .then( (contact) => {
        this.setState( (prevState) => ({
          contacts: prevState.contacts.concat([contact])
        }));
      });
  }

  render() {
    
    return (
      <div>
        <Route exact path='/' render={ () => (
          <ListContacts
            contacts = {this.state.contacts}
            onDeleteContact = {this.removeContact}
          />
        )} />
        <Route path='/create' render={ ({ history }) => (
          <CreateContact
            onCreateContact={ contact => {
              this.createContact(contact)
              history.push('/')
            }}
          />
        )} />
      </div>
    );
  }
}

export default App;