import React, { useContext, useState } from "react";
import Link from "next/link";
import { Menu, MenuItem, Sidebar } from "react-pro-sidebar";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { UserRole } from "@/constants/enums";

const Navbar = () => {
  const router = useRouter();
  const [collapse, setCollapse] = useState(false);

  const session = useSession();
  console.log(session);
  
  return (
    <Sidebar collapsed={collapse}>
      <Menu>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "100vh",
            overflow: "hidden",
          }}>
          <div>
            <MenuItem
              icon={<i className="bi bi-list" />}
              onClick={() => {
                setCollapse((prevSate) => !prevSate);
              }}
              style={{ textAlign: "center" }}>
              <h2>PAWVILLE </h2>
            </MenuItem>
            <MenuItem
              icon={<i className="bi bi-file-person"></i>}
              component={<Link href={"about/"} />}>
              Home
            </MenuItem>
            <MenuItem
              icon={<i className="bi bi-house"></i>}
              component={<Link href={"ourAnimals/"} />}>
              Our paws
            </MenuItem>
            <MenuItem
              icon={<i className="bi bi-box2-heart"></i>}
              component={<Link href={"donations/"} />}>
              Donations
            </MenuItem>
            <MenuItem
              icon={<i className="bi bi-newspaper"></i>}
              component={<Link href={"news/"} />}>
              News
            </MenuItem>
            {session.data?.user.user_type === 1 && (
              <MenuItem
                icon={
                  <i
                    className="bi bi-file-earmark-plus"
                    style={{ fontSize: "1.2rem" }}></i>
                }
                component={<Link href={"add/"} />}>
                Add
              </MenuItem>
            )}
            {session.data?.user.user_type === UserRole.Admin && (
              <MenuItem
                icon={
                  <i
                    className="bi bi-envelope"
                    style={{ fontSize: "1.2rem" }}></i>
                }
                component={<Link href={"contact/"} />}>
                Messages
              </MenuItem>
            )}
            {session.data?.user.user_type === UserRole.Admin && (
              <MenuItem
                icon={
                  <i
                    className="bi bi-question-square"
                    style={{ fontSize: "1.2rem" }}></i>
                }
                component={<Link href={"adoptions/"} />}>
                Adoption Requests
              </MenuItem>
            )}
          </div>
          <div>
            <MenuItem
              icon={
                session.status !== "authenticated" ? (
                  <i className="bi bi-lock"></i>
                ) : (
                  <i className="bi bi-unlock"></i>
                )
              }
              onClick={() => {
                if (session.status === "authenticated") {
                  signOut({
                    redirect: true,
                    callbackUrl: "/login",
                  });
                } else {
                  router.push("/login");
                }
              }}>
              {session.status === "authenticated" ? "Sign out" : "Log in"}
            </MenuItem>
          </div>
        </div>
      </Menu>
    </Sidebar>
  );
};

export default Navbar;
