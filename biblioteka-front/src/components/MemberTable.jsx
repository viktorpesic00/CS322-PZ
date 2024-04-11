import { useState, useEffect } from "react";
import { getClan, updateClan, deleteClan, createClan } from "../services/Api";
import { getKnjiga, createIznajmljivanje } from "../services/Api";
import {
  Chip,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  Select,
  MenuItem,
  Box,
  FormControl,
  InputLabel,
  TextField,
  DialogActions,
} from "@mui/material";

function MemberTable() {
  const [members, setMembers] = useState([]);
  const [selectedMember, setSelectedMember] = useState("");
  const [openRenewModal, setOpenRenewModal] = useState(false);
  const [selectedMonths, setSelectedMonths] = useState(1);
  const [openIssueModal, setOpenIssueModal] = useState(false);
  const [openCreateForm, setOpenCreateForm] = useState(false);
  const [availableBooks, setAvailableBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState("");

  const [formData, setFormData] = useState({
    ime: "",
    prezime: "",
    brojClanskeKarte: 0,
    clanOD: new Date(),
    clanarinaDo: new Date(),
  });

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const membersData = await getClan();
        setMembers(membersData);
      } catch (error) {
        console.error("Error fetching members:", error);
      }
    };

    fetchMembers();
  }, []);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const booksData = await getKnjiga();
        setAvailableBooks(booksData);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchBooks();
  }, []);

  const handleRenewMembership = async () => {
    try {
      const updatedDate = new Date(selectedMember.clanarinaDo);
      updatedDate.setMonth(updatedDate.getMonth() + selectedMonths);
      const updatedData = {
        ...selectedMember,
        clanarinaDo: updatedDate.toISOString(),
      };
      await updateClan(selectedMember.id, updatedData);
      handleCloseRenewModal();

      const updatedMembersData = await getClan();
      setMembers(updatedMembersData);
    } catch (error) {
      console.error("Error renewing membership:", error);
    }
  };

  const handleIssueBook = async () => {
    try {
      const iznajmljivanjeData = {
        ClanId: selectedMember.id,
        KnjigaId: selectedBook.id,
      };
      await createIznajmljivanje(iznajmljivanjeData);
      handleCloseIssueModal();
    } catch (error) {
      console.error("Error issuing book:", error);
    }
  };

  const handleOpenRenewModal = (member) => {
    setSelectedMember(member);
    setOpenRenewModal(true);
  };

  const handleCloseRenewModal = () => {
    setOpenRenewModal(false);
    setSelectedMember(null);
    setSelectedMonths(1);
  };

  const handleOpenIssueModal = (member) => {
    setSelectedMember(member);
    setOpenIssueModal(true);
  };

  const handleCloseIssueModal = () => {
    setOpenIssueModal(false);
    setSelectedMember(null);
    setSelectedBook(null);
  };

  const handleDeleteMember = async (member) => {
    try {
      await deleteClan(member.id);
      const updatedMembersData = await getClan();
      setMembers(updatedMembersData);
    } catch (err) {
      alert("Doslo je do greske");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddMember = () => {
    setOpenCreateForm(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    createClan({ ...formData, clanOD: new Date() })
      .then(async () => {
        const updatedMembersData = await getClan();
        setMembers(updatedMembersData);
        setOpenCreateForm(false);
        setFormData({
          ime: "",
          prezime: "",
          brojClanskeKarte: 0,

          clanarinaDo: new Date(),
        });
      })
      .catch((error) => {
        console.error("Error creating memer:", error);
        alert("Doslo je do greske");
      });
  };

  return (
    <Box p={3}>
      <Box display={"flex"} justifyContent={"flex-end"} my={2}>
        <Button variant="contained" onClick={handleAddMember}>
          Novi clan
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table aria-label="member table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>Ime</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Prezime</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>
                Broj Članske Karte
              </TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Članarina</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Akcije</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {members.map((member) => (
              <TableRow key={member.id}>
                <TableCell>{member.ime}</TableCell>
                <TableCell>{member.prezime}</TableCell>
                <TableCell>{member.brojClanskeKarte}</TableCell>
                <TableCell>
                  <Chip
                    label={
                      new Date(member.clanarinaDo) > new Date()
                        ? "Aktivna"
                        : "Istekla"
                    }
                    color={
                      new Date(member.clanarinaDo) > new Date()
                        ? "primary"
                        : "error"
                    }
                  />
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleOpenRenewModal(member)}
                    sx={{ mx: 1 }}
                  >
                    Produži članarinu
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleOpenIssueModal(member)}
                    sx={{ mx: 1 }}
                  >
                    Izdaj knjigu
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleDeleteMember(member)}
                  >
                    Obrisi clana
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog
        open={openRenewModal}
        onClose={handleCloseRenewModal}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          Produži članarinu za {selectedMember && selectedMember.ime}{" "}
          {selectedMember && selectedMember.prezime}
        </DialogTitle>
        <DialogContent>
          <Box display={"flex"} flexDirection={"column"} gap={2} mt={2}>
            <FormControl fullWidth>
              <InputLabel>Broj meseci</InputLabel>
              <Select
                value={selectedMonths}
                onChange={(e) => setSelectedMonths(e.target.value)}
                label="Broj meseci"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((month) => (
                  <MenuItem key={month} value={month}>
                    {month} mesec{month === 1 ? "" : "a"}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button variant="contained" onClick={handleRenewMembership}>
              Potvrdi
            </Button>
          </Box>
        </DialogContent>
      </Dialog>

      <Dialog
        open={openIssueModal}
        onClose={handleCloseIssueModal}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          Izdaj knjigu članu {selectedMember && selectedMember.ime}{" "}
          {selectedMember && selectedMember.prezime}
        </DialogTitle>
        <DialogContent>
          <Box display={"flex"} flexDirection={"column"} gap={2} mt={2}>
            <FormControl fullWidth>
              <InputLabel>Knjiga</InputLabel>
              <Select
                value={selectedBook}
                onChange={(e) => setSelectedBook(e.target.value)}
                label="Knjiga"
              >
                {availableBooks.map((book) => (
                  <MenuItem key={book.id} value={book}>
                    {book.naziv}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Button variant="contained" onClick={handleIssueBook}>
              Izdaj knjigu
            </Button>
          </Box>
        </DialogContent>
      </Dialog>

      <Dialog open={openCreateForm} maxWidth="md" fullWidth>
        <Box component={"form"} onSubmit={handleSubmit}>
          <DialogTitle>Nova Knjiga</DialogTitle>
          <DialogContent>
            <Box display={"flex"} flexDirection={"column"} gap={2} m={2}>
              <TextField
                label="Ime"
                name="ime"
                value={formData.ime}
                onChange={handleChange}
                fullWidth
                required
              />
              <TextField
                label="Prezime"
                name="prezime"
                value={formData.prezime}
                onChange={handleChange}
                fullWidth
                required
              />
              <TextField
                label="Broj clanske karte"
                name="brojClanskeKarte"
                value={formData.brojClanskeKarte}
                onChange={handleChange}
                fullWidth
                required
                type="number"
              />

              <TextField
                label="Clanarina vazi do"
                name="clanarinaDo"
                value={formData.clanarinaDo}
                onChange={handleChange}
                fullWidth
                required
                type="date"
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button
              color="error"
              variant="outlined"
              onClick={() => {
                setFormData({
                  ime: "",
                  prezime: "",
                  brojClanskeKarte: 0,
                  clanOD: new Date(),
                  clanarinaDo: new Date(),
                });
                setOpenCreateForm(false);
              }}
            >
              Otkazi
            </Button>
            <Button variant="contained" type="submit">
              Dodaj
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </Box>
  );
}

export default MemberTable;
