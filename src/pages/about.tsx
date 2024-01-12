import axios from 'axios';
import { useEffect, useState } from 'react';
import AboutHeader from '../components/about/aboutHeader';
import AboutUs from '../components/about/aboutUs'
import AboutContact from '../components/about/aboutContact';

export default function About() {
  const [contactInfo, setContactInfo] = useState([]);

  return (
    <div className="home" id="home">
      <AboutHeader />
      <AboutUs />
      <AboutContact contactInfo={contactInfo} setContactInfo={setContactInfo} />
    </div>
  );
}