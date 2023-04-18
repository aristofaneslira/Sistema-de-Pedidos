import Navbar from "../../components/navbar/navbar.jsx";
import { Link } from "react-router-dom";
import "./pedidos.css";
import Pedido from "../../components/pedido/pedido.jsx";
import { useState } from "react";
import { useEffect } from "react";
import api from "../../services/api.js";

function Pedidos(){

    const [pedidos, setPedidos] = useState([]);
    const [status, setStatus] = useState("");

    function ConsultarPedidos(){
        
    api.get('/pedidos?status=' + status)
      .then((retorno) => {
        setPedidos(retorno.data);
      })
      .catch((err) => {
        setPedidos([]);

        if (err.response) {
            console.log(err.response.data);
        }
        
        alert("Erro ao consultar os pedidos");
      });
        
    }    

    useEffect(() => {
        ConsultarPedidos();
    }, []);

    return <>
        <Navbar />

        <div className="container-fluid mt-page form-pedido">

            <div className="ms-4 d-flex justify-content-between">
                <div>
                    <h2 className="d-inline">Pedidos</h2>
                    <Link className="btn btn-success ms-5 mb-2" to="/pedidos/novo">Adicionar Pedido</Link>
                </div>

                <div>
                     <div className="form-control d-inline me-3">
                        <select name="status" id="status" onChange={(e) => setStatus(e.target.value)}>
                            <option value="">Todos os Status</option>
                            <option value="A">Aberto</option>
                            <option value="F">Finalizado</option>
                        </select>
                    </div>
                    <button className="btn btn-primary" onClick={ConsultarPedidos}>Filtrar</button>
                </div>
                
            </div> 

            <div className="mt-5 ms-4 me-4">
                <table className="table">
                    <thead>
                        <tr>
                        <th scope="col">Pedido</th>
                        <th scope="col">Cliente</th>
                        <th scope="col">Dt. Venda</th>
                        <th scope="col">Status</th>
                        <th scope="col">Valor Total</th>
                        <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            pedidos.map((pedido) => {
                                return <Pedido key={pedido.id_pedido}
                                               id_pedido={pedido.id_pedido}
                                               cliente={pedido.cliente}
                                               dt_pedido={pedido.dt_pedido}
                                               status={pedido.status}                                
                                               status_descricao={pedido.status_descricao}
                                               vl_total={pedido.vl_total}
                                               atualizar_lista={ConsultarPedidos}
                                               />
                            })                            
                        }                        
                        
                    </tbody>
                </table>
            </div>

        </div>
    </>
}

export default Pedidos;