import { Router } from "express";
import controllerDashboard from "../controllers/controller.dashboard.js";

const routeDashboard = Router();

routeDashboard.get("/dashboard/clientes", controllerDashboard.DashboardClientes);
routeDashboard.get("/dashboard/vendas", controllerDashboard.DashboardVendas);
routeDashboard.get("/dashboard/produtos", controllerDashboard.DashboardProdutos);
routeDashboard.get("/dashboard/cidades", controllerDashboard.DashboardCidades);

export default routeDashboard; 