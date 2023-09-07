const mongoose= require('mongoose')
const Person = mongoose.model('Person',{
    titulo: String,
  sinopse: String,
  duracao: String,
  dtaLancamento: Date,
  imagem: String,
  categorias: String,
})

module.exports = Person
    
