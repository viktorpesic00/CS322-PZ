import { useState, useEffect } from "react";
import {
  getIznajmljivanje,
  deleteIznajmljivanje,
  getClanById,
  getKnjigaById,
} from "../services/Api";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

function IznajmljivanjeTable() {
  const [iznajmljivanja, setIznajmljivanja] = useState([]);

  useEffect(() => {
    const fetchIznajmljivanjaData = async () => {
      try {
        const iznajmljivanjaData = await getIznajmljivanje();
        const updatedIznajmljivanja = await Promise.all(
          iznajmljivanjaData.map(async (iznajmljivanje) => {
            const clan = await getClanById(iznajmljivanje.clanId);
            const knjiga = await getKnjigaById(iznajmljivanje.knjigaId);
            return {
              id: iznajmljivanje.id,
              clanIme: clan.ime,
              clanPrezime: clan.prezime,
              knjigaIme: knjiga.naziv,
            };
          })
        );
        setIznajmljivanja(updatedIznajmljivanja);
      } catch (error) {
        console.error("Error fetching iznajmljivanja:", error);
      }
    };

    fetchIznajmljivanjaData();
  }, []);

  const handleDeleteIznajmljivanje = async (id) => {
    try {
      await deleteIznajmljivanje(id);
      setIznajmljivanja(
        iznajmljivanja.filter((iznajmljivanje) => iznajmljivanje.id !== id)
      );
    } catch (error) {
      console.error("Error deleting iznajmljivanje:", error);
    }
  };

  return (
    <TableContainer component={Paper} sx={{ p: 2 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: "bold" }}>
              Ime i Prezime Člana
            </TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Ime Knjige</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Akcije</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {iznajmljivanja.map((iznajmljivanje) => (
            <TableRow key={iznajmljivanje.id}>
              <TableCell>
                {iznajmljivanje.clanIme} {iznajmljivanje.clanPrezime}
              </TableCell>
              <TableCell>{iznajmljivanje.knjigaIme}</TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => handleDeleteIznajmljivanje(iznajmljivanje.id)}
                >
                  Obriši
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default IznajmljivanjeTable;
