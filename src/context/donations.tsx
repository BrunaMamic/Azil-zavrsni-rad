/* eslint-disable react/jsx-key */

import '../styles/donations.css';
import {useContext, useEffect, useState} from 'react';
import {RoleContext} from '../context';
import axios from 'axios';

const Donations = () => {
  const [donations, setDonations] = useState<any>([]);
  const role = useContext(RoleContext);

  console.log(role.isAdmin);

  const getAllDonations = async () => {
    const data = await axios.get('http://localhost:3001/donacije/');
    setDonations(data.data);
  };

  useEffect(() => {
    getAllDonations();
  }, []);

  const changeStatusToDonated = async (item: any) => {
    await axios.patch(`http://localhost:3001/donacije/${item.id}`, {
      ...item,
      kategorija: 'donirano',
    });
    setDonations((prev: any) => {
      return prev.map((x: any) => {
        if (x.id === item.id) {
          return {...x, kategorija: 'donirano'};
        } else return x;
      });
    });
  };

  const createDonation = async (item: any) => {
    const data = await axios.post('http://localhost:3001/donacije', {
      tip: item.tip,
      vrijednost: item.vrijednost,
      opis: item.opis,
      kategorija: 'trazi',
    });

    setDonations((prev: any) => {
      return [...prev, data.data];
    });
  };

  return (
    <div>
      <div className={'buttonContainer'}>
        {role.isAdmin && <div className={'donationNavBtn'}>Nova donacija</div>}
      </div>
      <div className={'section'}>
        <div className={'donationSubtitle'}>Trazimo</div>
        <div className={'donationProperties'}>
          <div className={'donationProp'}>Tip</div>
          <div className={'donationProp'}>Vrijednosti</div>
          <div className={'donationPropDesc'}>Opis</div>
          <div className={'donationProp'}>Akcije</div>
        </div>
        {donations
          .filter((x:any) => x.kategorija === 'trazi')
          .map((x:any) => (
            <div className={'donationRow'}>
              <div className={'donationProp'}>{x.tip}</div>
              <div className={'donationProp'}>{x.vrijednost}</div>
              <div className={'donationPropDesc'}>{x.opis}</div>
              <div className={'actionRow'}>
                {role.isAdmin ? (
                  <>
                    <div
                      onClick={() => changeStatusToDonated(x)}
                      className={'actionBtn'}>
                      Donirano
                    </div>
                    <div className={'actionBtn'}>Izbrisi</div>
                  </>
                ) : (
                  <div className={'actionBtn'}>Doniraj</div>
                )}
              </div>
            </div>
          ))}
      </div>
      <div className={'section'}>
        <div className={'donationSubtitle'}>Nudi se</div>
        <div className={'donationProperties'}>
          <div className={'donationProp'}>Tip</div>
          <div className={'donationProp'}>Vrijednosti</div>
          <div className={'donationPropDesc'}>Opis</div>
          <div className={'donationProp'}>Akcije</div>
        </div>
        {donations
          .filter((x:any) => x.kategorija === 'nudi')
          .map((x:any) => (
            <div className={'donationRow'}>
              <div className={'donationProp'}>{x.tip}</div>
              <div className={'donationProp'}>{x.vrijednost}</div>
              <div className={'donationPropDesc'}>{x.opis}</div>
              <div className={'actionRow'}>
                {role.isAdmin && (
                  <div
                    onClick={() => changeStatusToDonated(x)}
                    className={'actionBtn'}>
                    Prihvati
                  </div>
                )}
              </div>
            </div>
          ))}
      </div>
      <div className={'section'}>
        <div className={'donationSubtitle'}>Donirano</div>
        <div className={'donationProperties'}>
          <div className={'donationProp'}>Tip</div>
          <div className={'donationProp'}>Vrijednosti</div>
          <div className={'donationPropDesc'}>Opis</div>
          <div className={'donationProp'}>Akcije</div>
        </div>
        {donations
          .filter((x:any) => x.kategorija === 'donirano')
          .map((x:any) => (
            <div className={'donationRow'}>
              <div className={'donationProp'}>{x.tip}</div>
              <div className={'donationProp'}>{x.vrijednost}</div>
              <div className={'donationPropDesc'}>{x.opis}</div>
              <div className={'actionRow'}>
                {role.isAdmin && (
                  <>
                    <div
                      onClick={() => createDonation(x)}
                      className={'actionBtn'}>
                      Ponovi
                    </div>
                    <div className={'actionBtn'}>Izbrisi</div>
                  </>
                )}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Donations;
