import express from 'express'
import usuarioRoutes from './routes/usuarioRoutes.js'
import db from './config/db.js'


//crear la app
const app = express()

//Habilitar lectura de datos de formulario:
app.use( express.urlencoded({extended: true}))

//Conexion a la base de datos:
try {
  await db.authenticate();
  db.sync()
  console.log("conexion correcta a la base de datos")
} catch (error) {
  console.log(error)
}

//Habilitar Pug
app.set('view engine', 'pug')
app.set('views', './views')

//Carpeta publica
app.use( express.static("public"))

//routing
app.use('/auth', usuarioRoutes)


//definir un puerto y arrancar el proyecto
const port = 3000;
app.listen(port, ()=>{
  console.log(`Hola, el servidor esta funcionado en el puerto: ${port}`)
});