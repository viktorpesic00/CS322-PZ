const baseUrl = "http://localhost:44352/";

const handleResponse = async (response) => {
  const contentType = response.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    return await response.json();
  } else {
    return await response.text();
  }
};

const get = async (url) => {
  const response = await fetch(baseUrl + url);
  return handleResponse(response);
};

const post = async (url, data) => {
  const response = await fetch(baseUrl + url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return handleResponse(response);
};

const put = async (url, data) => {
  const response = await fetch(baseUrl + url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return handleResponse(response);
};

const remove = async (url) => {
  const response = await fetch(baseUrl + url, {
    method: "DELETE",
  });
  return handleResponse(response);
};

const getAutor = () => get("Autor");
const createAutor = (autor) => post("Autor", autor);
const getAutorById = (id) => get(`Autor/${id}`);
const updateAutor = (id, autor) => put(`Autor/${id}`, autor);
const deleteAutor = (id) => remove(`Autor/${id}`);

const getClan = () => get("Clan");
const createClan = (clan) => post("Clan", clan);
const getClanById = (id) => get(`Clan/${id}`);
const updateClan = (id, clan) => put(`Clan/${id}`, clan);
const deleteClan = (id) => remove(`Clan/${id}`);

const getKnjiga = () => get("Knjiga");
const createKnjiga = (knjiga) => post("Knjiga", knjiga);
const getKnjigaById = (id) => get(`Knjiga/${id}`);
const updateKnjiga = (id, knjiga) => put(`Knjiga/${id}`, knjiga);
const deleteKnjiga = (id) => remove(`Knjiga/${id}`);
const getKnjigaByAutor = (id) => get(`Knjiga/GetKnjigeByAutor/${id}`);
const getKnjigaByZanr = (id) => get(`Knjiga/GetKnjigeByZanr/${id}`);

const getZanr = () => get("Zanr");
const createZanr = (zanr) => post("Zanr", zanr);
const getZanrById = (id) => get(`Zanr/${id}`);
const updateZanr = (id, zanr) => put(`Zanr/${id}`, zanr);
const deleteZanr = (id) => remove(`Zanr/${id}`);

const getIznajmljivanje = () => get("Iznajmljivanje");
const createIznajmljivanje = (iznajmljivanje) =>
  post("Iznajmljivanje", iznajmljivanje);
const getIznajmljivanjeById = (id) => get(`Iznajmljivanje/${id}`);
const updateIznajmljivanje = (id, iznajmljivanje) =>
  put(`Iznajmljivanje/${id}`, iznajmljivanje);
const deleteIznajmljivanje = (id) => remove(`Iznajmljivanje/${id}`);

export {
  getAutor,
  createAutor,
  getAutorById,
  updateAutor,
  deleteAutor,
  getClan,
  createClan,
  getClanById,
  updateClan,
  deleteClan,
  getKnjiga,
  createKnjiga,
  getKnjigaById,
  updateKnjiga,
  deleteKnjiga,
  getZanr,
  createZanr,
  getZanrById,
  updateZanr,
  deleteZanr,
  getIznajmljivanje,
  createIznajmljivanje,
  getIznajmljivanjeById,
  updateIznajmljivanje,
  deleteIznajmljivanje,
  getKnjigaByAutor,
  getKnjigaByZanr,
};
