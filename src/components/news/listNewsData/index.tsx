import axios from "axios";
import { useState } from "react";
import "./index.css";
import DeleteNews from "../deleteNews";
import { useSession } from "next-auth/react";

const ListNewsData = (props: any) => {
  const [important, setImportant] = useState<boolean>(props.vazno);
  const { data } = useSession();

  const handleChange = async () => {
    try {
      const updatedNews = await axios.patch(`/api/news/setImportant`, {
        id: props.id,
        important: important,
      });
      setImportant(!important);
      console.log("Updated news:", updatedNews.data);
    } catch (error) {
      console.error("Error updating news:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/news/${props.id}`);
      props.onDelete(props.id);
    } catch (error) {
      console.error("Error deleting news:", error);
    }
  };

  return (
    <div className={`bla ${important}`}>
      <div className="newsEdit">
        <div className="title">
        <i className="bi bi-newspaper" style={{marginRight: '25px'}}></i>
          <h3>{props.naslov}</h3>
          
        </div>
        <div className="newsSubEdit">
          <div>{props.tekst}</div>
        </div>
        <div style={{marginLeft: '25px'}}>{new Date(props.datum).toLocaleDateString("en-GB")}</div>
      </div>

      <div className="actionButtonNews">
        {data?.user.user_type === 1 && ( 
          <div>
            <input
              type="checkbox"
              checked={important}
              onChange={handleChange}
              name="important"
            />
          </div>
        )}

        {data?.user.user_type === 1 && (
          <DeleteNews id={props.id} delete={handleDelete} />
        )}
      </div>
    </div>
  );
};

export default ListNewsData;
