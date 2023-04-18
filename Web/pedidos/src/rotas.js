import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/dashboard/dashboard.jsx";
import Pedidos from "./pages/pedidos/pedidos.jsx";
import PedidoEditar from "./pages/pedido-editar/pedido-editar.jsx";

function Rotas(){
    return <BrowserRouter>
        <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/pedidos" element={<Pedidos />} />
            <Route path="/pedidos/novo" element={<PedidoEditar />} />
            <Route path="/pedidos/editar/:id_pedido" element={<PedidoEditar />} />
        </Routes>
    
    </BrowserRouter>
}

export default Rotas;