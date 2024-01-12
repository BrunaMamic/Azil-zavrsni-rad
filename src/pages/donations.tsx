import axios from "axios";
import { useContext, useEffect, useState } from "react";
import Donated from "../components/donations/donated";
import GivenDonations from "../components/donations/givenDonation";
import LookingForDonation from "../components/donations/lookingFor";
import NewDonation from "../components/donations/newDonation";
import { useSession } from "next-auth/react";
import { UserRole } from "@/constants/enums";

export default function Donations() {
  const [donations, setDonations] = useState([]);
  const session = useSession();

  const getAllDonations = async () => {
    try {
      const response = await axios.get("/api/donations/getAll");
      setDonations(response.data);
    } catch (error) {
      console.error("Error getting donations:", error);
    }
  };

  useEffect(() => {
    getAllDonations();
  }, []);

  const changeStatusToDonated = async (item: any) => {
    console.log(item);

    await axios.post(`/api/donations/donate`, {
      id: item.id,
    });
    setDonations((prev: any) => {
      return prev.map((x: any) => {
        if (x.id === item.id) {
          return { ...x, kategorija: "donirano", isDonated: true };
        } else return x;
      });
    });
  };

  return (
    <div style={{ flex: 1 }}>
      <NewDonation setDonations={setDonations} />
      <LookingForDonation
        setDonations={setDonations}
        donations={donations}
        changeStatusToDonated={changeStatusToDonated}
      />
      <Donated setDonations={setDonations} donations={donations} />
    </div>
  );
}
