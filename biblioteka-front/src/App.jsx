import { BrowserRouter, Routes, Route } from "react-router-dom";
import BookList from "./components/BookList"; // Import BookList component
import BookDetail from "./components/BookDetail"; // Import BookDetail component
import ClanDetail from "./components/ClanDetail.jsx";
import MemberTable from "./components/MemberTable.jsx";
import IznajmljivanjeTable from "./components/IznajmljivanjeTable.jsx";
import Layout from "./components/Layout.jsx";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { grey, purple } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    primary: {
      main: grey[600],
    },
    secondary: {
      main: purple[500],
    },
  },
});

export const primaryColor = grey[600];

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route exact path="/" element={<BookList />} />
            <Route exact path="/clan/:id" element={<ClanDetail />} />
            <Route path="/book/:id" element={<BookDetail />} />
            <Route exact path="/clanovi" element={<MemberTable />} />
            <Route
              exact
              path="/iznajmljivanje"
              element={<IznajmljivanjeTable />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
