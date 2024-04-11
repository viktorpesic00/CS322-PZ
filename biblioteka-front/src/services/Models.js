class Autor {
    constructor(id, ime, prezime) {
        this.id = id;
        this.ime = ime;
        this.prezime = prezime;
    }
}

class Clan {
    constructor(id, ime, prezime, brojClanskeKarte, clanOD, clanarinaDo) {
        this.id = id;
        this.ime = ime;
        this.prezime = prezime;
        this.brojClanskeKarte = brojClanskeKarte;
        this.clanOD = clanOD;
        this.clanarinaDo = clanarinaDo;
    }
}

class Zanr {
    constructor(id, naziv) {
        this.id = id;
        this.naziv = naziv;
    }
}

class Knjiga {
    constructor(id, naziv, autor, opis, zanr, slikaURL) {
        this.id = id;
        this.naziv = naziv;
        this.autor = autor;
        this.opis = opis;
        this.zanr = zanr;
        this.slikaURL = slikaURL;
    }
}

class Iznajmljivanje {
    constructor(id, clan, knjiga, datum) {
        this.id = id;
        this.clan = clan;
        this.knjiga = knjiga;
        this.datum = datum;
    }
}

export {
    Autor, Clan, Zanr, Knjiga, Iznajmljivanje
}