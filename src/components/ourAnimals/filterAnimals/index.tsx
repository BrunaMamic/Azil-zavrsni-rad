import { useState } from "react";
import "./index.css";
import { useSession } from "next-auth/react";
import { UserRole } from "@/constants/enums";

const FilterAnimals = (props: any) => {
  const [selectedType, setSelectedType] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const session = useSession();

  const types = ["Dog", "Cat", "else"];
  const status = ["Adopted", "Not Adopted"];

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleClearFilter = () => {
    setSelectedType("");
    setSelectedStatus("");
    props.filter("", "");
  };

  const handleTypeClick = (vrsta: any) => {
    setSelectedType(vrsta);
    props.filter(vrsta, selectedStatus);
  };

  const handleStatusClick = (status: any) => {
    setSelectedStatus(status);
    console.log("STATUS", status);

    props.filter(selectedType, status);
  };

  return (
    <div>
      <div
        className="filter-icon"
        style={{
          color: "rgb(18 18 18 / 76%);",
          fontSize: "1.2rem",
          justifyContent: "center",
          paddingTop: "45px",
          marginTop: '20px',
          marginLeft: '30px',
          marginBottom: '20px'
        }}
        onClick={toggleModal}>
        <i className="bi bi-funnel"></i> Filters
      </div>
      <div
        style={{
          display: "flex",
          marginLeft: "40px",
          flexWrap: "wrap",
          alignItems: "center",
        }}>
        {isModalOpen && (
          <div className="button-containerType">
            Type:
            <button onClick={handleClearFilter} className="filterButton">
              Clear Filter
            </button>

            {types.map((vrsta, index) => (
              <button
                key={index}
                onClick={() => handleTypeClick(vrsta)}
                className={
                  selectedType === vrsta
                    ? "filterButton active"
                    : "filterButton"
                }>
                {vrsta}
              </button>
            ))}
            {session.data?.user.user_type === UserRole.Admin && (
              <div className="button-containerAdopted">
                Status: 
                <button onClick={handleClearFilter} className="filterButton">
                  Clear Filter
                </button>
                {status.map((status, index) => (
                  <button
                    key={index}
                    onClick={() =>
                      handleStatusClick(status === "Adopted" ? true : false)
                    }
                    className={
                      selectedStatus === status
                        ? "filterButton active"
                        : "filterButton"
                    }>
                    {status}
                    <i className="fa-light fa-paw"></i>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterAnimals;
