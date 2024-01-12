import axios from 'axios';
import { useState } from 'react';

const DeleteAnimal = (props: any) => {
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  const deleteData = async () => {
    try {
      await axios.delete(`/api/animals/${props.id}`);
      props.delete(props.id);
      setModal(false);
    } catch (error) {
      console.error('Error deleting animal:', error);
    }
  };

  return (
    <>
      <button className="confirmButtonMain" onClick={toggleModal}>
        <i className="bi bi-trash"></i>
      </button>
      {modal && (
        <div className="modal">
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
        </div>
      )}
    </>
  );
};

export default DeleteAnimal;
