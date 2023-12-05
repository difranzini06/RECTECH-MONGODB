const mongoose = require ("mongoose")
const express = require ("express")
const bodyParser = require("body-parser")

const app = express ()
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
const port = 3000

mongoose.connect('mongodb://127.0.0.1:27017/rectech',
{
    useNewUrlParser : true,
    useUnifiedTopology : true,
    serverSelectionTimeoutMS : 20000
})


const UsuarioSchema =  new mongoose.Schema({
    nome : { type :String},
    email : {type : String, required : true},
    senha : {type : String,  required : true}
})


const Usuario = mongoose.model("Usuario", UsuarioSchema)



app.post("/cadastrousuario", async(req,res)=>{
    const nome = req.body.nome
    const email = req.body.email
    const senha = req.body.senha

    const usuario = new Usuario({
        nome : nome,
        email: email,
        senha:senha,
    })

    try{
        const newUsuario = await usuario.save()
        res.json({error: null,msg: "Cadastro ok", UsuarioId : newUsuario._id})
    }

    catch(error){
        res.status(400).json((error))
    }
    
})






const NotaFiscalSchema =  new mongoose.Schema({
    
    numero : {type : String, required : true},
    dataemissao : {type : Date},
    item : { type :String},
    valorunitario : { type :String},
    quantidade : { type :Number}
})


const NotaFiscal = mongoose.model("NotaFiscal", NotaFiscalSchema)



app.post("/cadastronotafiscal", async(req,res)=>{
    const numero = req.body.numero
    const dataemissao = req.body.dataemissao
    const item = req.body.item
    const valorunitario = req.body.valorunitario
    const quantidade = req.body.quantidade

    const notafiscal = new NotaFiscal({
        numero: numero,
        dataemissao: dataemissao,
        item: item,
        valorunitario: valorunitario,
        quantidade: quantidade,
    })

    try{
        const newNotaFiscal = await notafiscal.save()
        res.json({error: null,msg: "Cadastro ok", UsuarioId : newNotaFiscal._id})
    }

    catch(error){
        res.status(400).json((error))
    }
    
})


//configurando a porta
app.listen(port, ()=>{
    console.log(`Servidor rodando na porta ${port}`);
})