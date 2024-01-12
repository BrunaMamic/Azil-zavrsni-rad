import axios from 'axios';
import { useEffect, useState } from 'react';
import ListContactsData from '../listContactsData';
import './index.css'
const ListContacts = () => {
  const [contactInfo, setContactInfo] = useState([]);

  useEffect(() => {
    fetchContactInfo();
  }, []);

  const fetchContactInfo = async () => {
    try {
      const response = await axios.get('/api/messages/getAll');
      setContactInfo(response.data);
    } catch (error) {
      console.error('Error fetching contact info:', error);
    }
  };

  const handleDeleteMessage = (messageId:any) => {
    setContactInfo((prevContactInfo) =>
      prevContactInfo.filter((contact:any) => contact.id !== messageId)
    );
  };

  return (
    <div className="listContacts">
      {contactInfo.map((contact: any) => (
        <ListContactsData
          key={contact.id}
          messageId={contact.id}
          firstName={contact.user.username}
          lastName=""
          email=""
          message={contact.message}
          onDelete={handleDeleteMessage}
        />
      ))}
    </div>
  );
};

export default ListContacts;
