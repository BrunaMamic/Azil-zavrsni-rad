import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import DeleteAnimal from "../deleteAnimals";
import "./index.css";


const EditAnimals = (props: any) => {
  const { register } = useForm();
  const [editAnimals, setEditedAnimals] = useState(props.animal);
  const [editModal, toggleEditModal] = useState(false);

  const toggleModal = () => {
    toggleEditModal(!editModal);
  };

  const changeHandler = (event: any) => {
    const { name, value } = event.target;
    if (value !== 0) {
      setEditedAnimals({ ...editAnimals, [name]: value });
    }
  };

  async function handleSubmit(event: any) {
    event.preventDefault();
    const result = proccesData(editAnimals);
    console.log(result);
  
    try {
      const response = await axios.put(`/api/animals/${props.id}`, result);
      const updatedAnimal = response.data;
      console.log("Updated animal:", updatedAnimal);
      console.log(response.data);
  
      props.SetOurAnimals((prev: any) =>
        prev.map((x: any) => (x.id === updatedAnimal.id ? updatedAnimal : x))
      );
  
      props.setToggle(false);
      props.updateModal(true);
    } catch (error) {
      console.error("Error updating animal:", error);
    }
  }
  
  const proccesData = (data: any) => {
    return {
      species: data.vrsta,
      name: data.ime,
      image: data.image,
      isChiped: data.cip,
      age: data.godine,
      description: data.opis,
      vetVisit: data.pregled,
      adopted: data.udomljen,
    };
  };
  

  return (
    <div>
      <div
        className="fade"
        onClick={() => {
          props.updateModal(true);
          props.setToggle(false);
        }}
      />
      <div className="popup">
        <form onSubmit={handleSubmit} className="editForm">
          <div style={{ margin: "10px" }}>
            Type:
            <select
              style={{ marginLeft: "10px" }}
              {...register("vrsta", { required: true })}
              onChange={changeHandler}
              value={editAnimals.vrsta}>
              <option value={0}>Other</option>
              <option value="Dog">Dog</option>
              <option value="Cat"> Cat</option>
              <option value="else"> else</option>
            </select>
          </div>
          <div style={{ margin: "10px" }}>
            Name:
            <input
              style={{ marginLeft: "10px" }}
              type="text"
              placeholder="ex. Papi"
              {...register("ime", { required: true, max: 15 })}
              onChange={changeHandler}
              value={editAnimals.ime}
            />
          </div>
          <div style={{ margin: "10px" }}>
            Age:
            <input
              style={{ marginLeft: "10px" }}
              type="number"
              placeholder="ex. 3"
              {...register("godine", { required: true, max: 2 })}
              onChange={changeHandler}
              value={editAnimals.godine}
            />
          </div>
          <div style={{ margin: "10px" }}>
            Image:
            <input
              style={{ marginLeft: "10px" }}
              type="url"
              placeholder="image URL"
              {...register("image", {})}
              onChange={changeHandler}
            />
          </div>
          About:
          <textarea
            style={{ width: "33em", height: "7em" }}
            {...register("opis", { max: 200 })}
            onChange={changeHandler}
          />
          <div style={{ margin: "10px" }}>
            Last vet visit:
            <input
              style={{ marginLeft: "10px" }}
              type="datetime"
              placeholder="choose a date"
              {...register("pregled", {})}
              onChange={changeHandler}
              value={editAnimals.pregled}
            />
          </div>
          <div style={{ margin: "10px" }}>
            Chiped?
            <input
              style={{ marginLeft: "50px" }}
              type="checkbox"
              placeholder="cip"
              {...register("cip", { required: true })}
              onChange={changeHandler}
              value={editAnimals.cip}
            />
          </div>
          <br></br>
        </form>
        <div className="actionsEdit">
          <button onClick={handleSubmit} className="editButton">
            <i className="bi bi-check-lg"></i>
          </button>
          <DeleteAnimal id={props.id} delete={props.SetOurAnimals} />
        </div>
      </div>
    </div>
  );
};
export default EditAnimals;
