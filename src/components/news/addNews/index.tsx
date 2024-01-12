import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import "./index.css";
import { useSession } from "next-auth/react";

const AddNews = (props: any) => {
  const [modal, setModal] = useState(false);

  const session = useSession();

  const [addNews, setAddNews] = useState({
    id: "",
    naslov: "",
    datum: "",
    tekst: "",
    vazno: "",
  });

  console.log(addNews);

  const toggleModal = () => {
    setModal(!modal);
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = (data: any) => console.log(data);
  console.log(errors);

  function handler(event: any) {
    const { name, value } = event.target;
    if (value !== 0) {
      setAddNews({ ...addNews, [name === 'vazno' ? 'important' : name]: value });
    }
  }

  async function createNews() {
    const result = processData(addNews);
    try {
      const response = await axios.post("/api/news/create/", result);
      const createdNews = response.data;
      console.log("Created news:", createdNews);

      props.setListNews((prev: any) => [...prev, createdNews]);

      reset();
      setModal(false);
    } catch (error) {
      console.error("Error creating news:", error);
    }
  }

  const processData = (data: any) => {
    return {
      id: data.id,
      naslov: data.naslov,
      datum: new Date().toISOString(),
      tekst: data.tekst,
    };
  };

  return (
    <>
      {session.data?.user.user_type === 1 && <div style={{ padding: "20px" }}>
        <button onClick={toggleModal} className="addNewsButton">
          <i className="bi bi-file-earmark-plus"></i>
        </button>
      </div>}
      {modal && (
        <form onSubmit={handleSubmit(createNews)} className="newsForm">
          <input
            type="text"
            placeholder="title"
            style={{ width: "300px", height: "50px", marginBottom: '25px' }}
            {...register("naslov", { required: true, max: 20 })}
            onChange={handler}
          />
          <textarea
            placeholder="write ..."
            className="newsTextarea"
            style={{ width: "300px", height: "100px", marginBottom: '25px' }}
            {...register("tekst", { min: 10, maxLength: 2000 })}
            onChange={handler}
          />

          <input type="submit" value="ADD" />
        </form>
      )}
    </>
  );
};

export default AddNews;
