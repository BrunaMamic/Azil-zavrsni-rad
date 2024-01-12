
import { useForm } from 'react-hook-form';
import axios from 'axios';
import './index.css';
import { Animal } from '@prisma/client';

const AddAnimals = (props: any) => {
  const {
    register,
    reset,
    handleSubmit,
    formState: {errors},
  } = useForm();

  

  function handler(event: any) {
    const {name, value, checked} = event.target;

    if (value !== 0) {
      if (name === 'cip') {
        props.setOurAnimals({...props.animal, cip: checked});
      } else {
        props.setOurAnimals({...props.animal, [name]: value});
      }
    }
  }

  async function createAnimal() {
    const result = proccesData(props.animal);
    try {
      await axios.post('/api/animals/create/',{
        ...result
      });
      props.setOurAnimals({
        id: '',
        vrsta: '',
        name: '',
        godine: '',
        image: '',
        opis: '',
        pregled: '',
        cip: false,
        udomljen: '',
      });
      reset();
    } catch (error) {
      console.error('Error creating animal:', error);
    }
  }

  const proccesData = (data: any) => {
    return {
      id: data.id,
      name: data.ime,
      vrsta: data.vrsta,
      godine: data.godine,
      image: data.image,
      opis: data.opis,
      pregled: new Date(data.pregled).toISOString() ,
      cip: data.cip || false,
      udomljen: false,
    };
  };
  

  return (
    <div className='adding'>
      <div className="addForm">
        <form onSubmit={handleSubmit(createAnimal)} className="inputForm">
          <div className='inputAddForm'>
            <label htmlFor="vrsta">Type: </label>
            <select {...register('vrsta', {required: true})} onChange={handler} className="selectAdd">
              <option value={0}>Choose</option>
              <option value="Dog">Dog</option>
              <option value="Cat">Cat</option>
              <option value="else">else</option>
            </select>
            {errors.vrsta && <div className="error">type is required</div>}
          </div>
          <div className='inputAddForm'>
            <label htmlFor="ime">Name:</label>
            <input
              type="text"
              placeholder="ex. Papi"
              {...register('ime', {
                required: true,
                max: 10,
                minLength: 1,
                pattern: /^[a-zA-Z ]+$/                ,
              })}
              onChange={handler}
            />
            {errors.ime && (
              <div className="error">Enter name for your animal</div>
            )}
                        Age:
            <input
              min={0}
              type="number"
              step={0.1}
              placeholder="ex. 3 or 0.5 (five months old)"
              {...register('godine', {pattern: /^[0-9\b]/g, min: 0})}
              onChange={handler}
            />
          </div>
          <div className='inputAddForm' style={{minWidth:'26rem'}}>
            Image:
            <input
              type="url"
              placeholder="URL link to your image"
              {...register('image', {})}
              onChange={handler}
              
            />
          </div>
          <div className='inputAddForm' >
            About:
            <textarea style={{minWidth:'26rem'}} {...register('opis', {max: 100})} onChange={handler} className="aboutText"/>
          </div>

          <div className='inputAddForm'>
            Last vet visit:
            <input
              type="date"
              placeholder="pregled"
              {...register('pregled', {})}
              onChange={handler}
            />
          </div>

          <div className='inputAddForm'>
            Chiped?
            <input
            style={{boxShadow:'none'}}
              type="checkbox"
              placeholder="cip"
              {...register('cip', {})}
              onChange={handler}
            />
          </div>

          <input type="submit" value="Add animal" />
        </form>
      </div>


    </div>
  );
};
export default AddAnimals;
