/* eslint-disable @next/next/no-img-element */
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import "./index.css";
import ListAnimalsData from "../../../components/ourAnimals/listAnimalsData";

const AdoptionRequests = (props: any) => {
  const [adoptionRequests, setAdoptionRequests] = useState([]);
  console.log(adoptionRequests);
  
  
  useEffect(() => {
    fetchAdoptionRequests();
  }, []);

  const fetchAdoptionRequests = async () => {
    try {
      const response = await axios.get("/api/adoptions/getAll");
      setAdoptionRequests(response.data);
    } catch (error) {
      console.error("Error fetching adoption requests:", error);
    }
  };

  const handleAnswerClick = (email: any) => {
    window.location.href = `mailto:${email}`;
  };

  const updateAdoptionStatus = async (id: any, approved: any) => {
    try {
      const response = await axios.put(`/api/adoptions/${id}`);
      setAdoptionRequests((prevRequests: any) =>
        prevRequests.map((request: any) =>
          request.id === id ? { ...request, approved: true } : request
        )
      );
    } catch (error) {
      console.error("Error updating adoption status:", error);
    }
  };

  return (
    <div>
      <h1>Adoption Requests</h1>
      <div className="adoptions">
        {adoptionRequests.map((request: any) => (
          <div key={request.id} className="data">
            <div className="adoptionDiv">
              <img alt={'animal'} height={"200px"} width={"200px"} src={request.animal.image} />
              <p>
                Animal Name: <b>{request.animal.name}</b>
              </p>
              <p>
                User Name: <b>{request.user.username}</b>
              </p>
              <p>
                Approved: <b>{request.approved ? "Yes" : "No"}</b>
              </p>
              <p>
                Timestamp:{" "}
                <b>{new Date(request.timestamp).toISOString().split("T")[0]}</b>
              </p>
            </div>

            <div className="buttonsAdoption">
              <button
                onClick={() =>
                  updateAdoptionStatus(request.id, request.approved)
                }
                className="buttonApprove">
                {request.approved ? "" : "Approve"}
              </button>

              {request.approved && (
                <button
                  className="buttonApprove"
                  onClick={() => handleAnswerClick('brunamamic00@gmail.com')}>
                  Contact
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdoptionRequests;
