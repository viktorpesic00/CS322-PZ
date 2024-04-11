-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 10, 2024 at 11:23 PM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.1.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `biblioteka`
--

-- --------------------------------------------------------

--
-- Table structure for table `autor`
--

CREATE TABLE `autor` (
  `ID` int(11) NOT NULL,
  `Ime` varchar(80) NOT NULL,
  `Prezime` varchar(80) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `autor`
--

INSERT INTO `autor` (`ID`, `Ime`, `Prezime`) VALUES
(1, 'J.K.', 'Rowling'),
(2, 'Harper', 'Lee'),
(3, 'Jane', 'Austen'),
(4, 'F. Scott', 'Fitzgerald'),
(5, 'George', 'Orwell'),
(6, 'J.D.', 'Salinger'),
(7, 'Virginia', 'Woolf'),
(8, 'Herman', 'Melville'),
(9, 'J.R.R.', 'Tolkien'),
(10, 'J.R.R.', 'Tolkien'),
(11, 'Charlotte', 'Brontë'),
(12, 'C.S.', 'Lewis'),
(13, 'Aldous', 'Huxley'),
(14, 'John', 'Steinbeck'),
(15, 'Gabriel García', 'Márquez'),
(16, 'Fyodor', 'Dostoevsky'),
(17, 'Oscar', 'Wilde'),
(18, 'Leo', 'Tolstoy'),
(19, 'Mark', 'Twain'),
(20, 'Homer', ''),
(21, 'Homer', ''),
(22, 'Mary', 'Shelley'),
(23, 'Emily', 'Brontë'),
(24, 'Miguel de', 'Cervantes'),
(25, 'Victor', 'Hugo'),
(26, 'Fyodor', 'Dostoevsky'),
(27, 'Nathaniel', 'Hawthorne'),
(28, 'Alexandre', 'Dumas'),
(29, 'Leo', 'Tolstoy'),
(30, 'Bram', 'Stoker'),
(31, 'Margaret', 'Mitchell'),
(32, 'Franz', 'Kafka'),
(33, 'William', 'Faulkner'),
(34, 'Joseph', 'Conrad'),
(35, 'Geoffrey', 'Chaucer'),
(36, 'Herman', 'Melville'),
(37, 'Ernest', 'Hemingway'),
(38, 'Albert', 'Camus'),
(39, 'Sylvia', 'Plath'),
(40, 'Kurt', 'Vonnegut'),
(41, 'Joseph', 'Heller'),
(42, 'Ernest', 'Hemingway'),
(43, 'Douglas', 'Adams'),
(44, 'Stephen', 'King'),
(45, 'Astrid', 'Lindgren'),
(46, 'Frances Hodgson', 'Burnett'),
(47, 'L.M.', 'Montgomery'),
(48, 'Louisa May', 'Alcott'),
(49, 'Roald', 'Dahl'),
(50, 'C.S.', 'Lewis'),
(51, 'string', 'string');

-- --------------------------------------------------------

--
-- Table structure for table `clan`
--

CREATE TABLE `clan` (
  `ID` int(11) NOT NULL,
  `Ime` varchar(80) NOT NULL,
  `Prezime` varchar(80) NOT NULL,
  `BrojClanskeKarte` int(11) NOT NULL,
  `ClanOD` datetime(6) NOT NULL,
  `ClanarinaDo` datetime(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `clan`
--

INSERT INTO `clan` (`ID`, `Ime`, `Prezime`, `BrojClanskeKarte`, `ClanOD`, `ClanarinaDo`) VALUES
(1, 'Trajko', 'Trajkovic', 1, '2024-04-10 00:00:00.000000', '2024-05-09 22:00:00.000000'),
(2, 'Trajko', 'Trajkovic', 1, '2024-04-10 00:00:00.000000', '2024-08-09 22:00:00.000000'),
(3, 'Mirko', 'Mirkovic', 2, '2024-03-10 00:00:00.000000', '2024-04-10 00:00:00.000000'),
(4, 'trola', 'trolic', 2, '2024-03-10 00:00:00.000000', '2024-09-09 22:00:00.000000'),
(5, 'Petar', 'Peric', 0, '2024-04-10 00:00:00.000000', '2024-04-10 00:00:00.000000'),
(6, 'Milan', 'Milic', 0, '0001-01-01 00:00:00.000000', '2024-04-10 00:00:00.000000'),

-- --------------------------------------------------------

--
-- Table structure for table `iznajmljivanje`
--

CREATE TABLE `iznajmljivanje` (
  `ID` int(11) NOT NULL,
  `ClanId` int(11) NOT NULL,
  `KnjigaId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `iznajmljivanje`
--

INSERT INTO `iznajmljivanje` (`ID`, `ClanId`, `KnjigaId`) VALUES
(2, 3, 14),
(5, 1, 11);

-- --------------------------------------------------------

--
-- Table structure for table `knjige`
--

CREATE TABLE `knjige` (
  `ID` int(11) NOT NULL,
  `Naziv` longtext NOT NULL,
  `AutorId` int(11) NOT NULL,
  `Opis` longtext NOT NULL,
  `ZanrId` int(11) NOT NULL,
  `SlikaURL` longtext DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `knjige`
--

INSERT INTO `knjige` (`ID`, `Naziv`, `AutorId`, `Opis`, `ZanrId`, `SlikaURL`) VALUES
(1, 'Hari Poter i Kamen mudraca', 1, 'Život Harija Potera se dramatično menja kada otkrije da je čarobnjak i pozvan je da pohađa Školu čarobnjaštva i veštičarenja u Hogvortsu.', 5, 'https://i.pinimg.com/736x/5d/51/73/5d517355bacaf8a36b628eff173e955c.jpg'),
(2, 'Ubiti pticu rugalicuuuu', 2, 'Smještena u 1930-e godine, ova knjiga istražuje teme rasne nepravde i moralnog rasta kroz oči mlade Skaut Finč.', 8, 'https://laguna.rs/_img/korice/2762/ubiti_pticu_rugalicu-harper_li_v.jpg'),
(3, 'Gordost i predrasude', 3, 'Klasično delo Džejn Ostin prati burnu vezu između Elizabete Benet i gospodina Darsija u Džordžijanskoj Engleskoj.', 8, 'https://i.pinimg.com/736x/d9/d6/b9/d9d6b9370b227d26651a42eeed6a80d6.jpg'),
(4, 'Veliki Getsbi', 4, 'Majstorsko delo F. Skota Ficdžeralda istražuje živote bogate elite tokom Džez doba u Americi.', 8, 'https://m.media-amazon.com/images/I/41SnZOvkQcL._AC_UF1000,1000_QL80_.jpg'),
(5, '1984', 5, 'Distopijski roman Džordža Orvela istražuje posledice vlasti i totalitarizma.', 5, 'https://m.media-amazon.com/images/I/61ZewDE3beL._AC_UF894,1000_QL80_.jpg'),
(6, 'Lovac u žitu', 6, 'Roman Dž.D. Selindžera prati razočaranog tinejdžera Holdena Kolfilda dok se suočava sa izazovima adolescencije.', 8, 'https://www.knjizare-vulkan.rs/files/images/slike_proizvoda/259984.jpg'),
(7, 'Ka svetioniku', 7, 'Eksperimentalni roman Virdžinije Vulf zahvata unutrašnje misli i iskustva porodice Ramsi tokom putovanja ka svetioniku.', 8, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSA8WLPxrcuOSc48JoKL9gnfFoWgk2ig5Ljyp_KQgXJIg&s'),
(8, 'Mobi Dik', 8, 'Ep O Hermana Melvila prati opsesivnu potragu kapetana Ehaba za osvetom protiv belog kita.', 8, 'https://static01.nyt.com/images/2011/10/22/books/review/moby-dick-slideshow-slide-V7YU/moby-dick-slideshow-slide-V7YU-articleLarge.jpg?quality=75&auto=webp&disable=upscale'),
(9, 'Hobit', 9, 'Fantastični roman J.R.R. Tolkin prati avanture Bilba Baginsa dok prati grupu patuljaka na putovanju da povrate svoj dom.', 5, 'https://m.media-amazon.com/images/I/712cDO7d73L._AC_UF1000,1000_QL80_.jpg'),
(10, 'Gospodar prstenova', 10, 'Smješten u fiktivni svet Srednje zemlje, ovaj epski trilogija prati putovanje da se uništi Jedan Prsten i pobedi Mračni Lord Sauron.', 5, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqW0rXDMwLuqxNocnstTyzXpFpef9d6Mnd4aJtC_Nj8w&s'),
(11, 'Džejn Ejr', 11, 'Roman Šarlote Bronte prati putovanje Džejn Ejr, siročeta koje postaje guvernanta i zaljubljuje se u svog poslodavca, gospodina Rotčestera.', 8, 'https://edenbooks.rs/elektronske-knjige/page-assets/images/c4/c41026_400Dzej-Ejr.jpg'),
(12, 'Hronike iz Narnije', 12, 'Fantastična serija C.S. Luisa prati avanture dece koje otkrivaju čarobnu zemlju Narniju.', 5, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYzzODAEe4SrhzHEtd16GWQ8tm0azlxQMKcLfcBhp-9A&s'),
(13, 'Veličanstveni novi svet', 13, 'Distopijski roman Oldusa Hakslija istražuje buduće društvo gde su ljudi genetski inženjerisani i kontrolisani od strane države.', 5, 'https://www.knjizare-vulkan.rs/files/thumbs/files/watermark/files/images/slike_proizvoda/thumbs_w/thumbs_1200/127804_w_1200_1200px.jpg.webp'),
(14, 'Grozničava braća', 14, 'Roman Džona Štajnbeka prati priču porodice Džod koja se bori za preživljavanje tokom Velike depresije.', 8, 'https://marketplace.canva.com/EAFMf17QgBs/1/0/1003w/canva-green-and-yellow-modern-book-cover-business-Ah-do4Y91lk.jpg'),
(15, 'Sto godina samoće', 15, 'Roman Gabrijela Garsije Markesa prati porodicu Buendija kroz generacije u fiktivnom gradu Macondo.', 8, 'https://marketplace.canva.com/EAFMf17QgBs/1/0/1003w/canva-green-and-yellow-modern-book-cover-business-Ah-do4Y91lk.jpg'),
(16, 'Zločin i kazna', 16, 'Psihološki triler Fjodora Dostojevskog prati problematičnog studenta Raskoljnikova dok se bori sa krivicom i moralom.', 8, 'https://marketplace.canva.com/EAFMf17QgBs/1/0/1003w/canva-green-and-yellow-modern-book-cover-business-Ah-do4Y91lk.jpg'),
(17, 'Portret Dorijana Greja', 17, 'Roman Oskara Vajlda prati priču mladića koji ostaje večno mlad dok se portret njega stari.', 8, 'https://marketplace.canva.com/EAFMf17QgBs/1/0/1003w/canva-green-and-yellow-modern-book-cover-business-Ah-do4Y91lk.jpg'),
(18, 'Ana Karenjina', 18, 'Roman Lava Tolstoja istražuje teme ljubavi, neverstva i društvenih normi kroz tragičnu priču Ane Karenjine.', 8, 'https://marketplace.canva.com/EAFMf17QgBs/1/0/1003w/canva-green-and-yellow-modern-book-cover-business-Ah-do4Y91lk.jpg'),
(19, 'Avanture Haklberi Fina', 19, 'Roman Marka Tvena prati Hak Finna i Džima, pobeglog roba, dok putuju niz reku Misisipi.', 8, 'https://marketplace.canva.com/EAFMf17QgBs/1/0/1003w/canva-green-and-yellow-modern-book-cover-business-Ah-do4Y91lk.jpg'),
(20, 'Odisseja', 20, 'Ep Homerove pesme prati grčkog heroja Odiseja dok pokušava da se vrati kući nakon Trojanskog rata.', 8, 'https://marketplace.canva.com/EAFMf17QgBs/1/0/1003w/canva-green-and-yellow-modern-book-cover-business-Ah-do4Y91lk.jpg'),
(21, 'Ilijada', 21, 'Drugo delo Homerove pesme, \"Ilijada\" priča priču o Trojanskom ratu i grčkom heroju Ahileju.', 8, 'https://marketplace.canva.com/EAFMf17QgBs/1/0/1003w/canva-green-and-yellow-modern-book-cover-business-Ah-do4Y91lk.jpg'),
(22, 'Frankenštajn', 22, 'Roman Mari Šeli prati priču o Viktoru Frankenštajnu, mladom naučniku koji stvara užasno stvorenje u neortodoksnom naučnom eksperimentu.', 7, 'https://marketplace.canva.com/EAFMf17QgBs/1/0/1003w/canva-green-and-yellow-modern-book-cover-business-Ah-do4Y91lk.jpg'),
(23, 'Orkanski visovi', 23, 'Roman Emilije Bronte prati strastvenu i destruktivnu ljubav između Hetklifa i Ketrin Ernšo na jorkširskim močvarama.', 8, 'https://marketplace.canva.com/EAFMf17QgBs/1/0/1003w/canva-green-and-yellow-modern-book-cover-business-Ah-do4Y91lk.jpg'),
(24, 'Don Kihot', 24, 'Roman Miguela de Servantesa prati avanture starih viteza koji kreće da obnovi viteštvo i vrati pravdu.', 8, 'https://marketplace.canva.com/EAFMf17QgBs/1/0/1003w/canva-green-and-yellow-modern-book-cover-business-Ah-do4Y91lk.jpg'),
(25, 'Jadnici', 25, 'Roman Viktora Igoa prati život nekoliko likova, uključujući bivšeg zatvorenika Žana Valžana, u revolucionarnoj Francuskoj.', 8, 'https://marketplace.canva.com/EAFMf17QgBs/1/0/1003w/canva-green-and-yellow-modern-book-cover-business-Ah-do4Y91lk.jpg'),
(26, 'Braća Karamazovi', 26, 'Roman Fjodora Dostojevskog istražuje teme vere, morala i slobodne volje kroz živote braće Karamazov.', 8, 'https://marketplace.canva.com/EAFMf17QgBs/1/0/1003w/canva-green-and-yellow-modern-book-cover-business-Ah-do4Y91lk.jpg'),
(27, 'Skarletno slovo', 27, 'Roman Natanijela Hotorna prati priču Hester Prin, koja je izopštena iz svoje zajednice nakon što je rodila dete van braka.', 8, 'https://marketplace.canva.com/EAFMf17QgBs/1/0/1003w/canva-green-and-yellow-modern-book-cover-business-Ah-do4Y91lk.jpg'),
(28, 'Grof od Monte Krista', 28, 'Roman Aleksandra Dime prati putovanje Edmonda Danta, čoveka koji traži osvetu protiv onih koji su ga nepravedno zatvorili.', 8, 'https://marketplace.canva.com/EAFMf17QgBs/1/0/1003w/canva-green-and-yellow-modern-book-cover-business-Ah-do4Y91lk.jpg'),
(29, 'Rat i mir', 29, 'Epski roman Lava Tolstoja prati život nekoliko aristokratskih porodica tokom Napoleonskih ratova.', 8, 'https://marketplace.canva.com/EAFMf17QgBs/1/0/1003w/canva-green-and-yellow-modern-book-cover-business-Ah-do4Y91lk.jpg'),
(30, 'Drakula', 30, 'Roman Brama Stokera prati priču o pokušaju grofa Drakule da se preseli iz Transilvanije u Englesku kako bi proširio kletvu večne mladosti.', 7, 'https://marketplace.canva.com/EAFMf17QgBs/1/0/1003w/canva-green-and-yellow-modern-book-cover-business-Ah-do4Y91lk.jpg'),
(31, 'Prohujalo sa vihorom', 31, 'Roman Margaret Mičel prati život Skarlet OHare tokom i posle Građanskog rata na američkom Jugu.', 8, 'https://marketplace.canva.com/EAFMf17QgBs/1/0/1003w/canva-green-and-yellow-modern-book-cover-business-Ah-do4Y91lk.jpg'),
(32, 'Sud', 32, 'Roman Franca Kafke prati protagonista Jozefa K. dok se suočava sa apsurdnim i nelogičnim pravnim sistemom koji ga optužuje za zločin.', 7, 'https://marketplace.canva.com/EAFMf17QgBs/1/0/1003w/canva-green-and-yellow-modern-book-cover-business-Ah-do4Y91lk.jpg'),
(33, 'Buča i jad', 33, 'Roman Vilijema Foknera istražuje teme vremena, sećanja i pada američkog Juga kroz porodicu Kompson.', 8, 'https://marketplace.canva.com/EAFMf17QgBs/1/0/1003w/canva-green-and-yellow-modern-book-cover-business-Ah-do4Y91lk.jpg'),
(34, 'Srce tame', 34, 'Novela Josifa Konrada prati Čarlsa Marloa dok putuje niz reku Kongo u potrazi za enigmatičnim Kurcom.', 8, 'https://marketplace.canva.com/EAFMf17QgBs/1/0/1003w/canva-green-and-yellow-modern-book-cover-business-Ah-do4Y91lk.jpg'),
(35, 'Kanterberijske priče', 35, 'Zbirka priča Džefrija Čosera prati grupu hodočasnika dok putuju ka svetištu Tomasa Beketa u Kenterberiju.', 8, 'https://marketplace.canva.com/EAFMf17QgBs/1/0/1003w/canva-green-and-yellow-modern-book-cover-business-Ah-do4Y91lk.jpg'),
(36, 'Mobi Dik', 36, 'Ep O Hermana Melvila prati opsesivnu potragu kapetana Ehaba za osvetom protiv belog kita.', 8, 'https://marketplace.canva.com/EAFMf17QgBs/1/0/1003w/canva-green-and-yellow-modern-book-cover-business-Ah-do4Y91lk.jpg'),
(37, 'I sunce sija', 37, 'Roman Ernesta Hemingveja prati grupu američkih i britanskih emigranata dok putuju iz Pariza u Pamplonu na trku bikova.', 8, 'https://marketplace.canva.com/EAFMf17QgBs/1/0/1003w/canva-green-and-yellow-modern-book-cover-business-Ah-do4Y91lk.jpg'),
(38, 'Stranac', 38, 'Roman Alberta Kamija prati Meursa, ravnodušnog i apatičnog Alžirca, dok se bori sa apsurdnošću postojanja.', 8, 'https://marketplace.canva.com/EAFMf17QgBs/1/0/1003w/canva-green-and-yellow-modern-book-cover-business-Ah-do4Y91lk.jpg'),
(39, 'Zvono i leptir', 39, 'Poluautobiografski roman Silvije Plat prati Estera Grinvud dok tone u mentalnu bolest i bori se sa svojim identitetom kao žena.', 8, 'https://marketplace.canva.com/EAFMf17QgBs/1/0/1003w/canva-green-and-yellow-modern-book-cover-business-Ah-do4Y91lk.jpg'),
(40, 'Pokolj petog jula', 40, 'Anti-ratni roman Kerta Vonegata prati iskustva Bilija Pilgrima, koji postaje \"nezakačen u vremenu\" i doživljava događaje van sekvence.', 5, 'https://marketplace.canva.com/EAFMf17QgBs/1/0/1003w/canva-green-and-yellow-modern-book-cover-business-Ah-do4Y91lk.jpg'),
(41, 'Catch-22', 41, 'Satirični roman Josepha Hellera prati podvige kapetana Džona Joserijana dok se suočava sa apsurdima rata i vojne birokratije tokom Drugog svetskog rata.', 5, 'https://marketplace.canva.com/EAFMf17QgBs/1/0/1003w/canva-green-and-yellow-modern-book-cover-business-Ah-do4Y91lk.jpg'),
(42, 'Starac i more', 42, 'Novela Ernesta Hemingveja prati starenog kubanskog ribara po imenu Santiago dok se bori da uhvati divovsku skušu.', 8, 'https://marketplace.canva.com/EAFMf17QgBs/1/0/1003w/canva-green-and-yellow-modern-book-cover-business-Ah-do4Y91lk.jpg'),
(43, 'Vodič kroz galaksiju za autostopere', 43, 'Naučno-fantastična komedija Daglasa Adamsa prati Artura Denta dok putuje kroz svemir nakon uništenja Zemlje kako bi se napravila brza obilaznica kroz hipersvemir.', 5, 'https://marketplace.canva.com/EAFMf17QgBs/1/0/1003w/canva-green-and-yellow-modern-book-cover-business-Ah-do4Y91lk.jpg'),
(44, 'Sjaj', 44, 'Horor roman Stivena Kinga prati Džeka Torensa, ambicioznog pisca i bivšeg alkoholičara, dok postaje zimski čuvar uklete gostionice Overluk.', 7, 'https://marketplace.canva.com/EAFMf17QgBs/1/0/1003w/canva-green-and-yellow-modern-book-cover-business-Ah-do4Y91lk.jpg'),
(45, 'Pipi Duga Čarapa', 45, 'Dečja knjiga Astrid Lindgren prati avanture Pipi Duge Čarape, snažne i nezavisne devojčice sa osećajem za neobično.', 5, 'https://marketplace.canva.com/EAFMf17QgBs/1/0/1003w/canva-green-and-yellow-modern-book-cover-business-Ah-do4Y91lk.jpg'),
(46, 'Tajni vrt', 46, 'Dečji roman Fransis Hodžson Berneta prati Meri Lenoks dok otkriva zapušteni vrt na imanju svojeg ujaka i trudi se da ga vrati u nekadašnje stanje.', 8, 'https://marketplace.canva.com/EAFMf17QgBs/1/0/1003w/canva-green-and-yellow-modern-book-cover-business-Ah-do4Y91lk.jpg'),
(47, 'Ana sa zelenog žbuna', 47, 'Roman L. M. Montgomeri prati avanture En Širli, maštovite i odlučne siročice koja greškom dospeva da živi sa starijim bratom i sestrom.', 8, 'https://marketplace.canva.com/EAFMf17QgBs/1/0/1003w/canva-green-and-yellow-modern-book-cover-business-Ah-do4Y91lk.jpg'),
(48, 'Male žene', 48, 'Roman Lujze Mej Alkot prati život četiri sestre Mark – Meg, Džo, Bet i Ejmi – dok odrastaju u Masačusetsu za vreme Građanskog rata.', 8, 'https://marketplace.canva.com/EAFMf17QgBs/1/0/1003w/canva-green-and-yellow-modern-book-cover-business-Ah-do4Y91lk.jpg'),
(49, 'Matilda', 49, 'Dečji roman Roalda Dala prati Matildu Vormvud, nadarenu i inteligentnu devojčicu koja koristi svoje telekinetičke moći da prevaziđe prepreke i suprotstavi se svojoj tiranskoj porodici.', 5, 'https://marketplace.canva.com/EAFMf17QgBs/1/0/1003w/canva-green-and-yellow-modern-book-cover-business-Ah-do4Y91lk.jpg'),
(50, 'Lav, veštica i orman', 50, 'Fantastični roman K. S. Luisa prati Pevensie-jevu braću i sestre dok otkrivaju magičnu zemlju Narniju kroz orman i pridružuju se borbi protiv Bele Veštice.', 5, 'https://marketplace.canva.com/EAFMf17QgBs/1/0/1003w/canva-green-and-yellow-modern-book-cover-business-Ah-do4Y91lk.jpg'),
(51, 'safd', 10, 'sdvg', 3, 'sdvd');

-- --------------------------------------------------------

--
-- Table structure for table `zanr`
--

CREATE TABLE `zanr` (
  `ID` int(11) NOT NULL,
  `Naziv` longtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `zanr`
--

INSERT INTO `zanr` (`ID`, `Naziv`) VALUES
(1, 'Akcija'),
(2, 'Biografija'),
(3, 'Drama'),
(4, 'Edukativni'),
(5, 'Fantastika'),
(6, 'Filozofija'),
(7, 'Horor'),
(8, 'Klasika');

-- --------------------------------------------------------

--
-- Table structure for table `__efmigrationshistory`
--

CREATE TABLE `__efmigrationshistory` (
  `MigrationId` varchar(150) NOT NULL,
  `ProductVersion` varchar(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `__efmigrationshistory`
--

INSERT INTO `__efmigrationshistory` (`MigrationId`, `ProductVersion`) VALUES
('20240410142732_Initial', '6.0.0');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `autor`
--
ALTER TABLE `autor`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `clan`
--
ALTER TABLE `clan`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `iznajmljivanje`
--
ALTER TABLE `iznajmljivanje`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `knjige`
--
ALTER TABLE `knjige`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `zanr`
--
ALTER TABLE `zanr`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `__efmigrationshistory`
--
ALTER TABLE `__efmigrationshistory`
  ADD PRIMARY KEY (`MigrationId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `autor`
--
ALTER TABLE `autor`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=52;

--
-- AUTO_INCREMENT for table `clan`
--
ALTER TABLE `clan`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `iznajmljivanje`
--
ALTER TABLE `iznajmljivanje`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `knjige`
--
ALTER TABLE `knjige`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=53;

--
-- AUTO_INCREMENT for table `zanr`
--
ALTER TABLE `zanr`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
