import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  getKnjigaById,
  getAutor,
  getZanr,
  deleteKnjiga,
} from "../services/Api"; 
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
} from "@mui/material";
import CardMedia from "@mui/material/CardMedia";
import { updateKnjiga } from "../services/Api";
import { primaryColor } from "../App";
import { useNavigate } from "react-router-dom";

function BookDetail() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [formData, setFormData] = useState({
    naziv: "",
    autor: "",
    opis: "",
    zanr: "",
    slikaURL: "",
  });
  const [authors, setAuthors] = useState([]); 
  const [genres, setGenres] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchBook() {
      try {
        const bookData = await getKnjigaById(id);
        setBook(bookData);
        setFormData({
          naziv: bookData.naziv,
          autor: bookData.autor.id,
          opis: bookData.opis,
          zanr: bookData.zanr.id,
          slikaURL: bookData.slikaURL,
        });
      } catch (error) {
        console.error("Error fetching book:", error);
      }
    }

    fetchBook();
  }, [id]);


  useEffect(() => {
    async function fetchData() {
      try {
        const authorsData = await getAutor();
        const genresData = await getZanr();
        setAuthors(authorsData);
        setGenres(genresData);
      } catch (error) {
        console.error("Error fetching authors and genres:", error);
      }
    }

    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleEditClick = () => {
    setOpenEditDialog(true);
  };

  const handleCancel = () => {
    setOpenEditDialog(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { naziv, opis, slikaURL } = formData;

    const autorId = formData.autor;
    const zanrId = formData.zanr;

    updateKnjiga(id, {
      id: book.id,
      naziv,
      autorId,
      opis,
      zanrId,
      slikaURL,
    })
      .then(() => {
        setOpenEditDialog(false);
        window.location.reload(); 
      })
      .catch((error) => {
        console.error("Error updating book:", error);
      });
  };

  const handleDeleteBook = async () => {
    await deleteKnjiga(id)
      .then(() => {
        alert("Uspesno ste obrisali");
        navigate("/");
      })
      .catch((err) => {
        console.log("err", err);
        alert("Doslo je do greske");
      });
  };

  return (
    <Box px={3}>
      <h2>Book Detail</h2>
      {!book && <p>Loading...</p>}

      <Box display={"flex"} gap={4} flexWrap={"wrap"}>
        <Box>
          <CardMedia
            component="img"
            height="500"
            image={book?.slikaURL}
            alt={book?.naziv}
            sx={{ border: `2px solid ${primaryColor}`, objectFit: "contain" }}
          />
        </Box>

        <Box display={"flex"} flexDirection={"column"}>
          <h3>{book?.naziv}</h3>
          <Typography>
            <b>Autor:</b>
            {book?.autor
              ? `${book?.autor.ime} ${book.autor.prezime}`
              : "Unknown"}
          </Typography>
          <Typography
            sx={{
              display: "inline-block",
              width: "500px",
            }}
          >
            <b>Opis:</b> {book?.opis}
          </Typography>
          <Typography>
            <b>Zanr:</b> {book?.zanr ? book.zanr.naziv : "Unknown"}
          </Typography>
          <Box
            display={"flex"}
            gap={2}
            justifyContent={"flex-end"}
            mt={5}
            alignSelf={"flex-end"}
          >
            <Button variant="contained" onClick={handleEditClick}>
              Izmeni
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={handleDeleteBook}
            >
              Obrisi
            </Button>
          </Box>
        </Box>
      </Box>

      <Dialog open={openEditDialog} maxWidth="md" fullWidth>
        <form onSubmit={handleSubmit}>
          <DialogTitle>Uredi Knjigu</DialogTitle>
          <DialogContent>
            <Box display={"flex"} flexDirection={"column"} gap={2} m={2}>
              <TextField
                label="naziv"
                name="naziv"
                value={formData.naziv}
                onChange={handleChange}
                fullWidth
                required
              />

              <FormControl fullWidth>
                <InputLabel>Autor</InputLabel>
                <Select
                  value={formData.autor}
                  label="Autor"
                  onChange={handleChange}
                  name="autor"
                >
                  {authors.map((a) => (
                    <MenuItem
                      value={a.id}
                      key={a.id}
                    >{`${a.ime} ${a.prezime}`}</MenuItem>
                  ))}
                </Select>
              </FormControl>

              <TextField
                label="opis"
                name="opis"
                value={formData.opis}
                onChange={handleChange}
                fullWidth
                required
                multiline
              />

              <FormControl fullWidth required>
                <InputLabel>Zanr</InputLabel>
                <Select
                  label="Zanr"
                  value={formData.zanr}
                  onChange={handleChange}
                  name="zanr"
                >
                  {genres.map((a) => (
                    <MenuItem value={a.id} key={a.id}>{`${a.naziv}`}</MenuItem>
                  ))}
                </Select>
              </FormControl>

              <TextField
                label="slikaURL"
                name="slikaURL"
                value={formData.slikaURL}
                onChange={handleChange}
                fullWidth
                required
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button color="error" variant="outlined" onClick={handleCancel}>
              Otkazi
            </Button>
            <Button variant="contained" type="submit">
              Sačuvaj
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
}

export default BookDetail;
