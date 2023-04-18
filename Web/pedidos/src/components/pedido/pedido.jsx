import { Link } from "react-router-dom";
import api from "../../services/api.js";

function Pedido(props){
    const dt_pedido = new Date(props.dt_pedido.substring(0,19));

    function AlterarStatus(id_ped, st){
        api.put('/pedidos/' + id_ped + '/status', {status: st})
        .then((retorno) => {
            props.atualizar_lista();
        })
        .catch((err) => {
            console.log(err);
            
        });
    }

    function ExcluirPedido(id_ped){

        api.delete('/pedidos/' + id_ped)
        .then((retorno) => {
            props.atualizar_lista();
        })
        .catch((err) => {
            console.log(err);
            
        });
    }

    return <tr>
        <td>{props.id_pedido}</td>
        <td>{props.cliente}</td>
        <td>{new Intl.DateTimeFormat('pt-BR', {dateStyle: 'short'}).format(dt_pedido)}</td>
        <td>{props.status_descricao}</td>
        <td>{new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(props.vl_total)}</td>
        <td>
            <div className="dropdown">
                <button className="btn btn-outline-secondary dropdown-toggle" type="button" 
                        data-bs-toggle="dropdown" aria-expanded="false">
                    Opções
                </button>
                <ul className="dropdown-menu">
                    <li><Link className="dropdown-item" to={"/pedidos/editar/" + props.id_pedido}>Editar Pedido</Link></li>
                    <li><button className="dropdown-item" onClick={(e) => ExcluirPedido(props.id_pedido)}>Excluir Pedido</button></li>
                    <li><hr className="dropdown-divider" /></li>
                    <li><button className="dropdown-item" onClick={(e) => AlterarStatus(props.id_pedido, "F")}>Finalizar Pedido</button></li>
                    <li><button className="dropdown-item" onClick={(e) => AlterarStatus(props.id_pedido, "A")}>Reabrir Pedido</button></li>
                </ul>
            </div>
        </td>
    </tr>

}

export default Pedido;