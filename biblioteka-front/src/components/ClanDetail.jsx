import  { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getClanById } from '../services/Api';

function ClanDetail() {
  const { id } = useParams();
  const [clan, setClan] = useState(null);

  useEffect(() => {
    async function fetchClan() {
      try {
        const clanData = await getClanById(id);
        setClan(clanData);
      } catch (error) {
        console.error('Error fetching clan:', error);
      }
    }

    fetchClan();
  }, [id]);

  return (
    <div>
      <h2>Detalji Člana</h2>
      {clan ? (
        <div>
          <p>Ime: {clan.ime}</p>
          <p>Prezime: {clan.prezime}</p>
          <p>Broj članske karte: {clan.brojClanskeKarte}</p>
          <p>Član od: {clan.clanOD}</p>
          <p>Članarina do: {clan.clanarinaDo}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default ClanDetail;
