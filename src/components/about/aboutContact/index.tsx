import axios from 'axios';
import {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import './index.css';
import { log } from 'console';
import { useSession } from 'next-auth/react';
import { MessageType } from '@/constants/enums';

const AboutContact = (props: any) => {
  const { data: session } = useSession();
  console.log(session?.user);
  
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();


  const onSubmit = (data: any) => {
    reset();
    props.toggleModal();
  };

  const [newContact, setNewContact] = useState({
    id: '',
    firstName: '', 
    lastName: '', 
    email: '', 
    message: '',
  });

  function handler(event: any) {
    const { name, value } = event.target;
    if (value !== 0) {
      setNewContact({ ...newContact, [name]: value });
    }
  }

  async function createContact() {
    const result = proccesData(newContact);
    console.log('Create contact');
    try {
      const response = await axios.post('/api/messages/create', result);
      const createdContact = response.data;
      console.log('Created contact:', createdContact);
  
      if(props.setContactInfo){
        props.setContactInfo((prev: any) => {
          return [...prev, createdContact];
        });
      }
     
      
      onSubmit(createdContact);
    } catch (error) {
      console.error('Error creating contact:', error);
    }
  }
  

  const proccesData = (data: any) => {
    return {
      id: data.id,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      message: data.message,
      messageType: MessageType.Request
    };
  };

  return (
    props.modal && (
      <div>
        <div className="moreDetails" onClick={() => props.setModal(false)} />
        <div className="contactUs" id="contactUs">
          <div className="contactEdit">
            <button onClick={props.toggleModal} className="exitButton">
              <i className="bi bi-x-lg exitContact"></i>
            </button>

            <div className="formContact">
              <form
                onSubmit={handleSubmit(createContact)}
                className="contactForm">
                <label htmlFor="firstName">First name</label>
                <input
                  id="firstName"
                  type="text"
                  placeholder="Ivo"
                  {...register('firstName', {
                    required: true,
                    maxLength: 10,
                    pattern: /^[a-zA-Z]+$/,
                  })}
                  onChange={handler}
                />
                {errors.firstName && (
                  <div className="error">Enter first name without numbers</div>
                )}
                <label htmlFor="lastName">Last name</label>
                <input
                  id="lastName"
                  type="text"
                  placeholder="Ivić"
                  {...register('lastName', {
                    required: true,
                    maxLength: 20,
                  })}
                  onChange={handler}
                />
                <label htmlFor="email">E-mail address</label>
                <input
                  type="text"
                  id="email"
                  placeholder="example@example.com"
                  {...register('email', {
                    required: true,
                    maxLength: 80,
                    pattern: /\S+@\S+\.\S+/,
                  })}
                  onChange={handler}
                />
                {errors.email && <div className="error">Email is invalid!</div>}
                <label htmlFor="message">Your message</label>
                <textarea
                  {...register('message', {maxLength: 300, required: true})}
                  onChange={handler}
                />
                <br></br>
                {errors.message && <div className="error">Message is too long. Max 300</div>}

                <input type="submit" className="submitContact" />
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default AboutContact;
