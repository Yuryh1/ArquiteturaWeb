const express = require('express')
const mongoose= require('mongoose')
const Person = require('./models/Person')
const exp = require('constants')

const app = express()

app.use(
    express.urlencoded({
        extended:true, 
    }),
)

app.use(express.json())
app.post('/person', async(req, res)=>{
    const {titulo, sinopse, duracao, dtaLancamento, imagem, categorias} = req.body
    const person = {
        titulo,
        sinopse,
        duracao,
        dtaLancamento,
        imagem,
        categorias,
    }
    try{
        await Person.create(person)
        res.status(201).json({message:'Filmes inserida no sistema com sucesso'})
    }catch(error){
        res.status(500).json({erro:error})
    }
  
})
app.get('/person/:id' , async (req,res)=>{
    const id = req.params.id
try{
    const person = await Person.findOne({_id:id})
    if(!person){
        res.status(422).json({message:"Usuario não encontrado"})
        return 
    }
    res.status(200).json(person)
}   catch (error){
    res.status(500).json({erro:error})

}

})
app.patch('/person/:id', async (req, res) => {
    const id = req.params.id
    const { titulo, sinopse, duracao, dtaLancamento, imagem, categorias } = req.body
    const person = {
      nome,
      salario,
      aprovado,
    }
    try {
      const updatedPerson = await Person.updateOne({ _id: id }, person)
      if (updatedPerson.matchedCount === 0) {
        res.status(422).json({ message: 'Usuário não encontrado!' })
        return
      }
      res.status(200).json(person)
    } catch (error) {
      res.status(500).json({ erro: error })
    }
  })

  app.delete('/person/:id', async (req, res) => {
    const id = req.params.id
    const person = await Person.findOne({ _id: id })
    if (!person) {
      res.status(422).json({ message: 'Usuário não encontrado!' })
      return
    }
    try {
      await Person.deleteOne({ _id: id })
      res.status(200).json({ message: 'Usuário removido com sucesso!' })
    } catch (error) {
      res.status(500).json({ erro: error })
    }
  }) 
app.get("/", (req, res) => {  //criando a rota - endpoint
    res.json({ message: "Oi Express!" });
  });
  mongoose.connect(
    'mongodb+srv://yuryh084:2g7q1kLKGA8mRIHa@aula.qpwlurh.mongodb.net/Movies?retryWrites=true&w=majority',
   
)
  .then(() => {
    console.log('Conectou ao banco!')
    app.listen(3000)
  })
  .catch((err) => console.log(err))