/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */

import axios from "axios";
import { useContext, useState, useEffect } from "react";
import { RoleContext } from "../../../context";
import EditAnimals from "../editAnimals";
import MoreInfo from "../moreInfo";
import "./index.css";
import AdoptionRequestForm from "../../adoptions/adoptionRequestForm";
import { useSession } from "next-auth/react";

const ListAnimalsData = (props: any) => {
  const [modal, setModal] = useState(false);
  const { data, status } = useSession();
  const [toggleUpdate, setToggleUpdate] = useState(false);
  const [updateModal, setUpdateModal] = useState(true);
  const [adopted, setAdopted] = useState(props.udomljen);
  const [adoptionRequested, setAdoptionRequested] = useState(false);
  const [important, setImportant] = useState<boolean>(props.udomljen);

  const [showAdoptionForm, setShowAdoptionForm] = useState(false);

  useEffect(() => {
    setAdopted(props.udomljen);
  }, [props.udomljen]);

  const closeAdoptionModal = () => {
    setShowAdoptionForm(false);
  }

  const handleAdoptionClick = () => {
    setShowAdoptionForm(true);
  };

  const toggleModal = () => {
    setModal(!modal);
  };

  const edit = () => {
    setUpdateModal(false);
    setToggleUpdate(true);
  };

  const updateAdoptionStatus = async () => {
    try {
      await axios.put(`/api/adoptions/${props.adoptionRequestId}`);
      setAdopted(true);
      setImportant(true);
    } catch (error) {
      console.error("Error updating adoption status:", error);
    }
  };

  const handleAdoptionRequestSubmit = () => {
    setAdoptionRequested(true);
    updateAdoptionStatus();
  };

  return (
    <>
      <div className={`edit ${important}`}>
        <div className="forDivs">
          <div
            style={{
              marginTop: "10px",
              borderRadius: "50px",
              overflow: "hidden",
            }}>
            <div className="editModal">
              {updateModal && data?.user.user_type === 1 && (
                <button className="updateButton" onClick={() => edit()}>
                  <i className="bi bi-pencil-square"></i>
                </button>
              )}
              {props.image ? (
                <img height={"200px"} width={"200px"} src={props.image} />
              ) : (
                <div className="imgPlaceholder" />
              )}
            </div>
          </div>
          <div
            style={{
              justifyContent: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}>
            <h4> {props.ime}</h4>
            <div>{adopted ? <div>ADOPTED</div> : <div></div>}</div>
          </div>

          <div className="actionContainer">
            <div>
              <button onClick={toggleModal} className="moreButton">
                <i className="bi bi-info-lg"></i>
              </button>
            </div>

            {!adopted && !adoptionRequested && status === "authenticated" && (
              <div>
                <button className="adoptButton" onClick={handleAdoptionClick}>
                  Adopt
                </button>

                {showAdoptionForm && (
                  <div className="adoptionModal">
                    <AdoptionRequestForm
                      animalType={props.vrsta}
                      animalName={props.ime}
                      animalId={props.id}
                      updateAdoptionStatus={updateAdoptionStatus}
                      onAdoptionRequestSubmit={handleAdoptionRequestSubmit}
                      toggleModal={toggleModal}
                      closeAdoptionModal={closeAdoptionModal}
                      showAdoptionForm={showAdoptionForm}
                    />
                  </div>
                )}
              </div>
            )}
          </div>

          {toggleUpdate && (
            <EditAnimals
              id={props.id}
              animal={props}
              SetOurAnimals={props.SetOurAnimals}
              setToggle={setToggleUpdate}
              updateModal={setUpdateModal}
              modal={modal}
              setModal={setModal}
            />
          )}
        </div>
      </div>

      <MoreInfo
        vrsta={props.vrsta}
        ime={props.ime}
        image={props.image}
        cip={props.cip}
        godine={props.godine}
        opis={props.opis}
        pregled={props.pregled}
        udomljen={props.udomljen}
        toggleModal={toggleModal}
        modal={modal}
        setModal={setModal}
        adopted={adopted}
      />
    </>
  );
};

export default ListAnimalsData;
