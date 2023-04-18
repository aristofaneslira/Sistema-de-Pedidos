import { Router } from "express";
import controllerCondPagto from "../controllers/controller.condpagto.js";

const routeCondPagto = Router();

routeCondPagto.get("/condpagto", controllerCondPagto.Listar);

export default routeCondPagto;