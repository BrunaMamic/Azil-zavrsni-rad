// components/news/deleteNews.tsx

import axios from 'axios';
import { useState } from 'react';
import './index.css';

const DeleteNews = (props: any) => {
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  async function deleteData() {
    try {
      await axios.delete(`/api/news/${props.id}`);
      props.delete();
    } catch (error) {
      console.error('Error deleting news:', error);
    }
  }

  return (
    <>
      <button className="deleteButton" onClick={toggleModal}>
        <i className="bi bi-trash3"></i>
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

export default DeleteNews;
