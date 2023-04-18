import { Router } from "express";
import controllerCliente from "../controllers/controller.cliente.js";

const routeCliente = Router();

routeCliente.get("/clientes", controllerCliente.Listar);

export default routeCliente; 