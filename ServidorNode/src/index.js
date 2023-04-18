import express from "express";
import cors from "cors";
import basicAuth from "express-basic-auth";
//import {db} from "./config/database.js"

import routeCliente from "./routes/route.cliente.js";
import routeProduto from "./routes/route.produto.js";
import routeCondPagto from "./routes/route.condpagto.js";
import routeDashboard from "./routes/route.dashboard.js";
import routePedido from "./routes/route.pedido.js";


const app = express();

//Middleware JSON
app.use(express.json() );

//Midleware CORS
app.use(cors());


//Middleware Basic Auth
app.use(basicAuth({
    authorizer: function(usuario, senha){
        return basicAuth.safeCompare(usuario, '99coders') && basicAuth.safeCompare(senha, '112233');
    }
}));

/*
app.get("/pedidos", function(request, response){

    let ssql = "select * from tab_pedido";

    db.query(ssql, function(err, result){
        if (err) {
            return response.status(500).send(err);
        } else {
            return response.status(200).send(result);
        }
    });
});
*/

//registrando rotas na aplicacao
app.use(routeCliente);
app.use(routeProduto);
app.use(routeCondPagto);
app.use(routeDashboard);
app.use(routePedido);

app.listen(3001, function(){
    console.log("Servidor rodando na porta: 3001");
});
