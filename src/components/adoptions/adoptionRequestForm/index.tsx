// AdoptionRequestForm.tsx

import { useForm } from "react-hook-form";
import axios from "axios";
import { useState } from "react";
import "./index.css";
import { ToggleButton } from "react-bootstrap";
const AdoptionRequestForm = ({ animalId, animalName, closeAdoptionModal, showAdoptionForm }: any) => {

  const hideModal = () => {
    console.log('closaj');
    closeAdoptionModal()
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [msg, setMsg] = useState("");

  const onSubmit = async (data: any) => {
    try {
      const requestData = {
        animalId: animalId,
        userId: 1,
        ...data,
      };

      const response = await axios.post(
        "/api/adoptions/requests/",
        requestData
      );
      console.log("Adoption request submitted:", response);
      setMsg(response.data.message);
      reset();
      hideModal();

    } catch (error) {
      console.error("Error submitting adoption request:", error);
    }
  };
  console.log(animalId);

  return (
    <div className="modalContent">
      <h1>Adoption Request Form</h1>
      <div>
        Thank you for applying to adopt <b>{animalName}</b>!
      </div>
      <>Please submit your data and we will contact you!</>
      <br></br>
      <div className="formAdoption">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="adoptionForm">
          <label htmlFor="firstName">First name</label>
          <input
            id="firstName"
            type="text"
            placeholder="Ivo"
            {...register("firstName", {
              required: true,
              maxLength: 10,
              pattern: /^[a-zA-Z]+$/,
            })}
          />
          {errors.firstName && (
            <div className="error">Enter first name without numbers</div>
          )}
          <label htmlFor="lastName">Last name</label>
          <input
            id="lastName"
            type="text"
            placeholder="Ivić"
            {...register("lastName", {
              required: true,
              maxLength: 20,
            })}
          />
          <label htmlFor="email">E-mail address</label>
          <input
            type="text"
            id="email"
            placeholder="example@example.com"
            {...register("email", {
              required: true,
              maxLength: 80,
              pattern: /\S+@\S+\.\S+/,
            })}
          />
          {errors.email && <div className="error">Email is invalid!</div>}
          <br></br>
          {errors.message && (
            <div className="error">Message is too long. Max 300</div>
          )}

          <div>{msg}</div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default AdoptionRequestForm;
