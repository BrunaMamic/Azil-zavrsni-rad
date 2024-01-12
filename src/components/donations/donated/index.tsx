import axios from "axios";
import { useContext, useState } from "react";
import { RoleContext } from "../../../context";
import DeleteDonations from "../deleteDonations";
import "./index.css";
import { UserRole } from "@/constants/enums";
import { useSession } from "next-auth/react";

const Donated = (props: any) => {
  const role = useContext(RoleContext);
  const [idToDelete, setIdToDelete] = useState();
  const session = useSession();

  console.log(props.donations);

  return (
    <>
      {session.data?.user.user_type === UserRole.Admin ? (
        <>
          <div className={"donationSubtitle"}>DONATED</div>

          <div className={"section"}>
            {props.donations
              .filter((x: any) => x.isDonated)
              .map((x: any) => (
                <div key={x.id} className={"donationRow"}>
                  <div className="donationEditDonated">
                    <div className="contentDonation">
                      <div className={"donationProp"}>
                        <b>TYPE</b> Other
                      </div>
                      <div className={"donationProp"}>
                        <b>VALUE (€)</b>
                        {x.amount}
                      </div>
                      <div className={"donationPropDesc"}>
                        <b>ABOUT</b>
                        {x.description}
                      </div>
                    </div>
                    <div className={"actionRow"}>
                      {role.isAdmin && (
                        <>
                          <div
                            onClick={() => setIdToDelete(x.id)}
                            className={"actionBtn"}>
                            <DeleteDonations
                              idToDelete={idToDelete}
                              setIdToDelete={setIdToDelete}
                              setDonations={props.setDonations}
                            />
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
};
export default Donated;
