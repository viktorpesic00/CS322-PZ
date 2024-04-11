import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getClan } from '../services/Api';

function ClanList() {
  const [clanovi, setClanovi] = useState([]);

  useEffect(() => {
    async function fetchClanovi() {
      try {
        const clanoviData = await getClan();
        setClanovi(clanoviData);
      } catch (error) {
        console.error('Error fetching clanovi:', error);
      }
    }

    fetchClanovi();
  }, []);

  return (
    <div>
      <h2>Lista Članova</h2>
      <ul>
        {clanovi.map(clan => (
          <li key={clan.id}>
            <Link to={`/clan/${clan.id}`}>
              {clan.ime} {clan.prezime}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ClanList;
