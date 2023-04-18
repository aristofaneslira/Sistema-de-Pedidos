import { Router } from "express";
import controllerPedido from "../controllers/controller.pedido.js";

const routePedido = Router();

routePedido.get("/pedidos", controllerPedido.Listar);
routePedido.get("/pedidos/:id_pedido", controllerPedido.ListarId);
routePedido.post("/pedidos", controllerPedido.InserirPedido);
routePedido.put("/pedidos/:id_pedido", controllerPedido.EditarPedido);
routePedido.delete("/pedidos/:id_pedido", controllerPedido.ExcluirPedido);
routePedido.put("/pedidos/:id_pedido/status", controllerPedido.StatusPedido);


export default routePedido;