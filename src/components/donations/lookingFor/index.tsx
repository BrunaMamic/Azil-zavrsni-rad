import { useContext, useEffect, useState } from "react";
import { RoleContext } from "../../../context";
import DeleteDonations from "../deleteDonations";
import "./index.css";
import axios from "axios";
import { useSession } from "next-auth/react";
import { UserRole } from "@/constants/enums";
import { set } from "react-hook-form";

const LookingForDonation = ({
  donations,
  setDonations,
  changeStatusToDonated,
}: any) => {
  const session = useSession();

  const [idToDelete, setIdToDelete] = useState();

  const [modal, setModal] = useState(false);

  const closeModal = () => {
    setModal(!modal);
  };

  return (
    <>
      <div className={"donationSubtitle"}>LOOKING FOR</div>
      <div className={"section"}>
        {donations
          .filter((x: any) => !x.isDonated)
          .map((x: any) => (
            <div key={x.id} className={"donationRow"}>
              <div className="donationEdit">
                <div className="contentDonation">
                  <div className={"donationProp"}>
                    <b>Type:</b> Other
                  </div>
                  <div className={"donationProp"}>
                    <b>VALUE (€):</b>
                    {x.amount}
                  </div>
                  <div className={"donationPropDesc"}>
                    <b>ABOUT:</b>
                    {x.description}
                  </div>
                </div>

                <div className={"actionRow"}>
                  <button
                    onClick={() => {
                      changeStatusToDonated(x), setModal(true);
                    }}
                    className={"actionBtn"}>
                    <i className="bi bi-box2-heart-fill"></i>
                  </button>
                  {session.data?.user.user_type === UserRole.Admin && (
                    <div
                      onClick={() => setIdToDelete(x.id)}
                      className={"actionBtn"}>
                      <DeleteDonations
                        donationId={x.id}
                        setIdToDelete={setIdToDelete}
                        idToDelete={idToDelete}
                        setDonations={setDonations}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
      </div>
      {modal && (
        <div className="donationModal">
          Thank you for donating!<br></br>
          Admin will contact you for furder steps.
          <button onClick={closeModal}>OK</button>
        </div>
      )}
    </>
  );
};
export default LookingForDonation;
