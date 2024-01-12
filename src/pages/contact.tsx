import axios from 'axios';
import {useEffect, useState} from 'react';
import ListContacts from '../components/contacts/listContacts';

export default function Contacts() {
  const [contactInfo, setContactInfo] = useState([]);
  return (<>
    <ListContacts contactInfo={contactInfo} setContactInfo={setContactInfo}/>
  </>);
}