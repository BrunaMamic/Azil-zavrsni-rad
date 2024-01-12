import { useEffect, useState } from "react";
import ListAnimalsData from "../listAnimalsData";
import "./index.css";
import axios from "axios";
import { UserRole } from "@/constants/enums";
import { useSession } from "next-auth/react";

const ListAnimals = (props: any) => {
  const [animal, setAnimals] = useState([]);
  const session = useSession();
  const {data, status} = useSession()
  console.log(status);
  

  useEffect(() => {
    fetchAnimals();
  }, [props.filterForAnimals]); 

  const fetchAnimals = async () => {
    try {
      const response = await axios.get("/api/animals/getAll", {
        params: props.filterForAnimals,
      });
      setAnimals(response.data);
    } catch (error) {
      console.error("Error fetching animals:", error);
    }
  };

  const filterByType = (item: any) => {
    const { species } = props.filterForAnimals;
    if (species) {
      return species === item.species; 
    }
    return true;
  };

  const filterByStatus = (item: any) => {
    const { adopted } = props.filterForAnimals;
    console.log('ADOPTED',adopted);
    if(typeof adopted === 'string'){
      return true
    }else {
      return adopted ? item.adopted : !item.adopted; 
    }
  };

  return (
    <div className="mainAnimalsList">
      {props.ourAnimals.filter(
        (animal: any) => filterByType(animal) && filterByStatus(animal)
      ).length ? (
        props.ourAnimals
          .filter(
            (animals: any) => filterByType(animals) && filterByStatus(animals)
          )
          .filter((x: any) => {
            if (session.data?.user.user_type !== UserRole.Admin ) {
              return !x.adopted;
            } else {
              return true;
            }
          })
          .map((animal: any) => (
            <ListAnimalsData
              key={animal.id}
              id={animal.id}
              ime={animal.name}
              vrsta={animal.species}
              image={animal.image}
              cip={animal.isChiped}
              godine={animal.age}
              opis={animal.description}
              pregled={animal.vetVisit}
              udomljen={animal.adopted}
              SetOurAnimals={setAnimals}
            />
          ))
      ) : (
        <div>No animals</div>
      )}
    </div>
  );
};

export default ListAnimals;
