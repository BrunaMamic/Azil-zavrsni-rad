import axios from 'axios';
import { useState } from 'react';
import './index.css';

const DeleteDonations = (props: any) => {
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };
  

  async function deleteData() {
    try {
      await axios.delete(`/api/donations/${props.idToDelete}`);
      props.setDonations((prevDonations: any) =>
        prevDonations.filter((donation: any) => donation.id !== props.idToDelete)
      );
      toggleModal(); 
    } catch (error) {
      console.error('Error deleting donation:', error);
    }
  }
  
  return (
    <>
      <button onClick={toggleModal} className={'actionBtn'}>
        <i className="bi bi-trash3-fill"></i>
      </button>
      {modal && (
        <div className="container">
          <h2 className="modalTitle">Are you sure?</h2>
          <div className="modalButtons">
            <button className="confirmButton" onClick={deleteData}>
              <i className="bi bi-check2"></i>
            </button>
            <button className="cancelButton" onClick={toggleModal}>
              <i className="bi bi-x-lg"></i>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default DeleteDonations;
