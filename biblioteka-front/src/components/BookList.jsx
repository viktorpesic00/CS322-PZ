import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  getKnjiga,
  getZanr,
  getAutor,
  getKnjigaByAutor,
  getKnjigaByZanr,
} from "../services/Api";
import {
  Box,
  Typography,
  Grid,
  CardActionArea,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  TextField,
} from "@mui/material";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import DialogTitle from "@mui/material/DialogTitle";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { createKnjiga } from "../services/Api";

function BookList() {
  const [books, setBooks] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [genres, setGenres] = useState([]);

  const [formData, setFormData] = useState({
    naziv: "",
    autor: "",
    opis: "",
    zanr: "",
    slikaURL: "",
  });

  const [filterAutor, setFilterAutor] = useState("");
  const [filterZanr, setFilterZanr] = useState("");

  const [openModal, setOpenModal] = useState(false);
  const [refetchBooks, setRefetchBooks] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const booksData = await getKnjiga();
        setBooks(booksData);

        const authorsData = await getAutor();

        const genresData = await getZanr();

        setAuthors(authorsData);
        setGenres(genresData);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        if (filterAutor) {
          const booksData = await getKnjigaByAutor(filterAutor);

          setBooks(booksData ? booksData : []);
        } else if (filterZanr) {
          const booksData = await getKnjigaByZanr(filterZanr);
          setBooks(booksData ? booksData : []);
        } else {
          const booksData = await getKnjiga();
          setBooks(booksData);
        }
      } catch (error) {
        setBooks([]);
        console.error("Error fetching books:", error);
      }
    }

    fetchData();
  }, [filterAutor, filterZanr]);

  useEffect(() => {
    async function fetchData() {
      try {
        const booksData = await getKnjiga();
        setBooks(booksData);
      } catch (error) {
        setBooks([]);
        console.error("Error fetching books:", error);
      }
    }

    fetchData();
  }, [refetchBooks]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddClick = () => {
    setOpenModal(true);
  };

  const handleCancel = () => {
    setFormData({
      naziv: "",
      autor: "",
      opis: "",
      zanr: "",
      slikaURL: "",
    });
    setOpenModal(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { naziv, autor, opis, zanr, slikaURL } = formData;

    createKnjiga({
      naziv,
      autorId: JSON.parse(autor).id,
      opis,
      zanrId: JSON.parse(zanr).id,
      slikaURL,
    })
      .then(() => {
        handleCancel();
        setRefetchBooks((prev) => !prev);
      })
      .catch((error) => {
        console.error("Error creating book:", error);
      });
  };

  return (
    <div>
      <Box mx={10}>
        <Dialog open={openModal} maxWidth="md" fullWidth>
          <Box component={"form"} onSubmit={handleSubmit}>
            <DialogTitle>Nova Knjiga</DialogTitle>
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
                        value={JSON.stringify(a)}
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
                      <MenuItem
                        value={JSON.stringify(a)}
                        key={a.id}
                      >{`${a.naziv}`}</MenuItem>
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
                Dodaj
              </Button>
            </DialogActions>
          </Box>
        </Dialog>

        <Typography variant="h4" fontWeight={"bold"}>
          Book List
        </Typography>

        <Box display={"flex"} justifyContent={"flex-end"} my={2}>
          <Button onClick={handleAddClick} variant="contained">
            Dodaj
          </Button>
        </Box>

        <Box display={"flex"} flexDirection={"column"} gap={2} my={2}>
          <Typography>Filter</Typography>
          <Box display={"flex"} gap={2}>
            <FormControl fullWidth>
              <InputLabel>Autor</InputLabel>
              <Select
                value={filterAutor}
                label="Autor"
                onChange={(e) => {
                  setFilterAutor(e.target.value);
                  setFilterZanr("");
                }}
              >
                {authors.map((a) => (
                  <MenuItem
                    value={a.id}
                    key={a.id}
                  >{`${a.ime} ${a.prezime}`}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>Zanr</InputLabel>
              <Select
                value={filterZanr}
                label="Zanr"
                onChange={(e) => {
                  setFilterZanr(e.target.value);
                  setFilterAutor("");
                }}
              >
                {genres.map((a) => (
                  <MenuItem value={a.id} key={a.id}>{`${a.naziv}`}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          <Button
            onClick={() => {
              setFilterAutor("");
              setFilterZanr("");
            }}
            variant="contained"
          >
            Obrisi filter
          </Button>
        </Box>

        {books.length === 0 && <Typography>Nema rezultata</Typography>}
        <Grid container spacing={2}>
          {books.map((book) => (
            <Grid item xs={12} md={3} key={book.id}>
              <Link to={`/book/${book.id}`}>
                <Card sx={{ maxWidth: 345 }}>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="250"
                      image={book.slikaURL}
                      alt={book.naziv}
                    />
                    <CardContent>
                      <Typography variant="body2" color="text.secondary">
                        {book.naziv}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Link>
            </Grid>
          ))}
        </Grid>
      </Box>
      {/* <h2>Book List</h2>
      <ul>
        {books.map((book) => (
          <li key={book.id}>
            <Link to={`/book/${book.id}`}>{book.naziv}</Link>
          </li>
        ))}
      </ul> */}
    </div>
  );
}

export default BookList;
