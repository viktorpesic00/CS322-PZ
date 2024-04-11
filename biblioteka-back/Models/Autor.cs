using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Models
{
    [Table("Autor")]
    public class Autor
    {
        public Autor(){}
        [Key]
        public int ID { get; set; }

        [MaxLength(80)]
        [Required]
        public string Ime { get; set; }

        [MaxLength(80)]
        [Required]
        public string Prezime { get; set; }

    }
}