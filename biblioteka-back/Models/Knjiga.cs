using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Models
{
    [Table("Knjige")]
    public class Knjiga
    {
        [Key]
        public int ID { get; set; }

        [Required]
        public string Naziv { get; set; }

        public int AutorId { get; set; }

        [Required]
        public string Opis { get; set; }

        [Required]
        public int ZanrId { get; set; }

        public string SlikaURL { get; set; }
    }
}