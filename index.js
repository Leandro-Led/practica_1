//express
const express = require('express');
const app = express();
const PORT = 3000; // puede cambiar

//array 
let librosBiblicos = [
    {id: 1 , nombre: 'Genesis', autor: 'Moises', anioPublicacion: 2020},
    {id: 2 , nombre: 'Juan', autor: 'David', anioPublicacion: 2024},
    {id: 3 , nombre: 'Levitico', autor: 'Moises', anioPublicacion: 1990},
],
bienvenida=[{Mensaje:'Bienvenidos', nombre:'Leandro Ledezma',profesion:'Guardia de Seguridad'}];

//manejo de Json 
app.use(express.json());
//Endpoint 1 Bienvenida
app.get('/bienvenida',(req,res)=>{
    res.json(bienvenida)
})



//Endpoint 2 obtener libros por autor
app.get('/libroautor/:autor',(req,res)=>{
    const autorObtenido=req.params.autor
    console.log(autorObtenido);
    const autorEncontrado=librosBiblicos.filter(x=>x.autor=== autorObtenido);
    if (autorEncontrado) {
        res.json(autorEncontrado)
    }
    else{
        res.status(404).json({mensaje:'Autor no encontrado'});
    }
});

//Endpoint 3
app.get('/cantidadlibros',(req,res)=>{
    const totalLibros=librosBiblicos.length;
    res.json({mensaje:'Total de libros',cantidad:totalLibros})
})

//Endpoint 4
app.get('/libros/nombre/:texto', (req, res) => {
    const textoBusqueda = req.params.texto;
    const librosEncontrados = librosBiblicos.filter((libro) => libro.nombre.includes(textoBusqueda));

    if (librosEncontrados.length > 0) {
        res.json(librosEncontrados);
    } else {
        res.status(404).json({ mensaje: 'No se encontraron libros con el texto especificado' });
    }
});

//Endpoint 5
app.get('/libros/ordenar/nombre', (req, res) => {
    const librosOrdenados = librosBiblicos.slice().sort((a, b) => a.nombre.localeCompare(b.nombre));
    res.json(librosOrdenados);
});

app.listen(PORT, () => {
    console.log("Servidor corriendo en el puerto http://localhost:" + PORT);
});
