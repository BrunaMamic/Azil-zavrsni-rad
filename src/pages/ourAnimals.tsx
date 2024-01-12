import { useState, useEffect } from "react";
import axios from "axios";
import ListAnimals from "../components/ourAnimals/listAnimals";
import FilterAnimals from "../components/ourAnimals/filterAnimals";
import { getSession, useSession } from "next-auth/react";
import { GetServerSidePropsContext } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";

export default function OurAnimals(props: any) {
  const [ourAnimalsList, setOurAnimalsList] = useState([]);
  const [filterForAnimals, setFilterForAnimals] = useState({
    species: "",
    adopted: "",
  });

  const { data } = useSession();
  console.log(data);

  const handleFilter = (vrsta: string, udomljen: string) => {
    setFilterForAnimals({ species: vrsta, adopted: udomljen });
  };
  console.log(filterForAnimals);

  useEffect(() => {
    fetchAnimals();
  }, [filterForAnimals]);

  const fetchAnimals = async () => {
    try {
      const response = await axios.get("/api/animals/getAll", {
        params: filterForAnimals,
      });
      setOurAnimalsList(response.data);
    } catch (error) {
      console.error("Error fetching animals:", error);
    }
  };

  return (
    <div className="editMain">

      <FilterAnimals filter={handleFilter} />
      <ListAnimals
        filterForAnimals={filterForAnimals}
        ourAnimals={ourAnimalsList}
        setOurAnimals={setOurAnimalsList}
      />
    </div>
  );
}

