import { useState } from "react";
import AboutContact from "../aboutContact";
import "./index.css";
import { useSession } from "next-auth/react";
import Link from "next/link";
const AboutUs = () => {
  const [modal, setModal] = useState(false);
  const { data: session } = useSession(); 

  const toggleModal = () => {
    setModal(!modal);
  };

  return (
    <div className="aboutMore" id="aboutMore">
      <div className="titleAndStory">
        <div className="naslov">Our story</div>
        <div className="content">
          <div className="story">
            <div style={{ fontWeight: "600" }}>
              Pawville Animal Shelter, where paws find their way home.
            </div>
            <br></br>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsa
            aliquid quod iusto quaerat quidem delectus dolor aspernatur eos quam
            asperiores dolores nulla ea recusandae dignissimos, deserunt
            mollitia ad. Culpa, ducimus.<br></br>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam
            facere libero beatae sed saepe. Nesciunt beatae maxime, cupiditate
            numquam voluptatem ex ea, impedit eum ipsam, architecto delectus
            repellat error amet!
            <br></br>
            <div style={{ fontWeight: "600" }}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus
              similique consequuntur libero. Eaque voluptate quos cum in totam.
              Necessitatibus quisquam saepe doloribus natus expedita delectus
              quod harum, iure placeat obcaecati.
            </div>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quos,
            debitis quae! Consequatur aut sit, numquam libero qui explicabo
            minus dolores facilis laboriosam soluta error unde! Error, soluta?
            Fuga, excepturi optio? Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Hic laboriosam eveniet neque eaque aliquid
            eligendi. Maiores aliquam commodi maxime molestiae eum sint mollitia
            officiis iure obcaecati nulla velit, repellat dolor?
          </div>
        </div>
        <div className="contactButton">
          {session?.user ? (
            <button onClick={toggleModal} className="contact">
              <i className="bi bi-person-lines-fill"></i>Contact us
            </button>
          ) : (
            <button className="contact">
              <Link href="/login"> Contact us</Link>
            </button>
          )}
        </div>
      </div>

      <AboutContact
        toggleModal={toggleModal}
        modal={modal}
        setModal={setModal}
        session={session}
      />
      <div className="edited">
        <div className="iconsAbout">
          <div className="icons">
            <i className="bi bi-geo-alt-fill"></i>
            <p>Sukoišanska 21, 21000 Split</p>
          </div>
          <div className="icons">
            <i className="bi bi-envelope"></i>

            <p>pawvilleShelter@gmail.com</p>
          </div>
          <div className="icons">
            <i className="bi bi-telephone-fill"></i>
            <p>+385 91 9464064</p>
          </div>
        </div>
        <iframe
          className="mapContact"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d723.4143035185311!2d16.48029682923665!3d43.50948599869541!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x6adf347f7b3ee58c!2zNDPCsDMwJzM0LjIiTiAxNsKwMjgnNTEuMCJF!5e0!3m2!1shr!2shr!4v1642104370945!5m2!1shr!2shr"
          width="600"
          height="450"
          style={{border: 0}}
          allowFullScreen
          loading="lazy"></iframe>
      </div>
    </div>
  );
};

export default AboutUs;
