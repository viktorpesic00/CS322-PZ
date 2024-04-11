using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Models
{
    [Table("Iznajmljivanje")]
    public class Iznajmljivanje
    {
        public Iznajmljivanje(){}
        [Key]
        public int ID { get; set; }

        [Required]
        public int ClanId { get; set; }


        [Required]
        public int KnjigaId { get; set; }

    }

}