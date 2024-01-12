import {useState} from 'react';
import AddAnimals from '../components/addAnimals/addForm';
import OurAnimals from './ourAnimals';
import { url } from 'inspector';

export default function Add(props: any) {
  const [animal, setAnimal] = useState({
    id: '',
    vrsta: '',
    ime: '',
    godine: '',
    image: '',
    opis: '',
    pregled: '',
    cip: false,
    udomljen: false,
  });

  return (
    <div style={{display:"flex", justifyContent:'center', marginTop:'9rem', marginLeft:'20rem', background: 'url(https://static.vecteezy.com/system/resources/previews/002/469/425/non_2x/seamless-pattern-with-animal-paw-prints-gray-paws-on-a-white-background-illustration-endless-background-free-vector.jpg)'}}>
      <AddAnimals setOurAnimals={setAnimal} animal={animal} />
    </div>
  );
}
