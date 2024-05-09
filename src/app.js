import express from "express";

import router from "./router/index.js";

const app = express();

app.use(express.json());


app.use(express.urlencoded({ extended: true }));

//Rutas
app.use("/api", router);

app.listen(8080, () => {
    console.log("Escuchando servidor en el puerto 8080");
})


