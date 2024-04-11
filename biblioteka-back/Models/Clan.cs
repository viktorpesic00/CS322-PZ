using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Models
{
    [Table("Clan")]
    public class Clan
    {
        [Key]
        public int ID { get; set; }

        [MaxLength(80)]
        [Required]
        public string Ime { get; set; }

        [MaxLength(80)]
        [Required]
        public string Prezime { get; set; }

      [Required]
        public int BrojClanskeKarte { get; set; }

        [Required]
        [DataType(DataType.Date)]
        public DateTime ClanOD {get; set;}

        [Required]
        [DataType(DataType.Date)]
        public DateTime ClanarinaDo { get; set; }

    }
}