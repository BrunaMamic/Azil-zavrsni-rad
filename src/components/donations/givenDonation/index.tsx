import {useContext} from 'react';
import {RoleContext} from '../../../context';
import './index.css';

const GivenDonations = (props: any) => {
  const role = useContext(RoleContext);
  return (
    <>
      {/* <div className={'donationSubtitle'}>OFFERED</div> */}
      <div className={'section'}>
        {props.donations
          .filter((x: any) => x.kategorija === 'nudi')
          .map((x: any) => (
            <div key={x.id} className={'donationRow'}>
              <div className="donationEditGiven">
                <div className="contentDonation">
                  <div className={'donationProp'}>
                    <b>TYPE</b> Other
                  </div>
                  <div className={'donationProp'}>
                    <b>VALUE (€)</b>
                    {x.vrijednost}
                  </div>
                  <div className={'donationPropDesc'}>
                    <b>ABOUT</b>
                    {x.opis}
                  </div>
                </div>
                <div className={'actionRow'}>
                  {role.isAdmin && (
                    <div
                      onClick={() => props.changeStatusToDonated(x)}
                      className={'actionBtn'}>
                      <i className="bi bi-check-lg"></i>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        {/* <div className={'donationProperties'}>
          <div className={'donationProp'}>Tip</div>
          <div className={'donationProp'}>Vrijednosti</div>
          <div className={'donationPropDesc'}>Opis</div>
          <div className={'donationProp'}>Akcije</div>
        </div>
        {props.donations
          .filter((x: any) => x.kategorija === 'nudi')
          .map((x: any) => (
            <div key={x.id} className={'donationRow'}>
              <div className={'donationProp'}>{x.tip}</div>
              <div className={'donationProp'}>{x.vrijednost}</div>
              <div className={'donationPropDesc'}>{x.opis}</div>
              <div className={'actionRow'}>
                {role.isAdmin && (
                  <div
                    onClick={() => props.changeStatusToDonated(x)}
                    className={'actionBtn'}>
                    Prihvati
                  </div>
                )}
              </div>
            </div>
          ))}*/}
      </div>
    </>
  );
};
export default GivenDonations;
