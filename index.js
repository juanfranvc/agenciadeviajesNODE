
import express from 'express';
import router from './routes/index.js';
import db from './config/db.js';

const app = express();

// Conectar la base de datos
db.authenticate()
    .then( () => {console.log('Base de datos Conectada')})
    .catch(error => console.log(error))

// Definir puerto
const port = process.env.port || 4000;

// Habilitar PUG
app.set('view engine', 'pug');

// Obtener el año actual
app.use((req, res, next) => {
    const year = new Date();
    res.locals.actualYear = year.getFullYear();
    res.locals.nombreSitio = "Agencia de Viajes";
    console.log(res.locals);
    next();
});

// Agregar doby parser para leer los datros del formulario
app.use(express.urlencoded({extended: true}));

// Definir carpeta publica
app.use(express.static('public'));

// Agregar ROUTER
app.use('/', router);

app.listen(port, () => {
    console.log(`Servidor funcionando en el puerto: ${port}`);
});