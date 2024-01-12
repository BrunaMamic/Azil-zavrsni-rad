import { useState } from 'react';
import AdoptionRequests from '../components/adoptions/adoptionRequests';

const Adoptions = () => {
  const [adoptionRequests, setAdoptionRequests] = useState([]);

  return (
    <div>
      <h1>Adoptions</h1>
      <AdoptionRequests adoptionRequests={adoptionRequests} setAdoptionRequests={setAdoptionRequests} />
    </div>
  );
};

export default Adoptions;
