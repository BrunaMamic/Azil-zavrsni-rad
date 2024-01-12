import { useState } from "react";
import "./index.css";
import axios from "axios";
import { useRouter } from "next/router";

const ListContactsData = (props: any) => {
  const [modalOpen, setModalOpen] = useState(false);
  console.log(props);
  const email = 'brunamamic00@gmail.com'

  const handleAnswerClick = () => {
    window.location.href = `mailto:${email}`;
  };

  const handleDeleteClick = async () => {
    try {
      await axios.delete(`/api/messages/${props.messageId}`);
      props.onDelete(props.messageId);
    } catch (error) {
      console.error("Error deleting message:", error);
    }
  };

  return (
    <div className="contactInfo">
      <div className="infos">
        <div>
          {" "}
          <b style={{ fontSize: "1.6rem" }}>
            {props.firstName} {props.lastName}
          </b>
          <br></br>
          <div  style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              padding: "20px",
            }}>
            <b>Contact: </b>
            brunamamic00@gmail.com
          </div>
          <div
          className="messageHover"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              padding: "20px",
            }}>
            <b>Message: </b>
            <p>{props.message}</p>
          </div>
        </div>
      </div>
      <div className="buttons">
        <button onClick={handleAnswerClick} className="actionBtnMess">
          <i className="bi bi-envelope-at"></i>
        </button>
        <button onClick={handleDeleteClick} className="actionBtnMess">
          <i className="bi bi-trash3-fill"></i>
        </button>
      </div>
    </div>
  );
};

export default ListContactsData;
