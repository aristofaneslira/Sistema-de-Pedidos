import Navbar from "../../components/navbar/navbar.jsx";
import Grafico from "../../components/grafico/grafico.jsx";
import { useEffect, useState } from "react";
import api from "../../services/api.js";

function Dashboard(){

    const [dados_clientes, setDadosClientes] = useState([]);
    const [dados_vendas, setDadosVendas] = useState([]);
    const [dados_produtos, setDadosProdutos] = useState([]);
    const [dados_cidades, setDadosCidades] = useState([]); 
    
    function GraficoClientes(){

        api.get('/dashboard/clientes')
        .then((retorno) => {
            setDadosClientes(retorno.data);
        })
        .catch((err) => {
            console.log(err);
        });

    }

    function GraficoVendas(){

        api.get('/dashboard/vendas')
        .then((retorno) => {
            setDadosVendas(retorno.data);
        })
        .catch((err) => {
            console.log(err);
        });
    }

      function GraficoProdutos(){

        api.get('/dashboard/produtos')
        .then((retorno) => {
            setDadosProdutos(retorno.data);
        })
        .catch((err) => {
            console.log(err);
        });
      }

      function GraficoCidades(){

        api.get('/dashboard/cidades')
        .then((retorno) => {
            setDadosCidades(retorno.data);
        })
        .catch((err) => {
            console.log(err);
        });
      }
      
    function MontarGraficos(){
        GraficoClientes();
        GraficoVendas();
        GraficoProdutos();
        GraficoCidades();
    }

    function SalvarDadosUsuario(id, nome, email, token){
        localStorage.setItem("sessionId", id);
        localStorage.setItem("sessionNome", nome);
        localStorage.setItem("sessionEmail", email);
        localStorage.setItem("sessionToken", token);

    }

    useEffect(() => {
        MontarGraficos();

        SalvarDadosUsuario("1", "Heber", "heber@99coders.com.br", "000000000");
        
    }, []);

    return <>
        <Navbar />

        <div className="container-fluid mt-page">
            <div className="ms-4 d-flex justify-content-between">
                <h2>Dashboard</h2>
                <button className="btn btn-primary me-4" onClick={MontarGraficos}>Atualizar</button>
            </div>

            <div className="row">

                    <div className="col-md-6 p-5">
                        <Grafico titulo="Venda por clientes (top 5)"
                                 chartType="Bar"
                                 dados={dados_clientes}
                                 legenda={false} />
                                 
                    </div>

                    <div className="col-md-6 p-5">
                        <Grafico titulo="Vendas anual"
                                 chartType="Line"
                                 dados={dados_vendas}
                                 legenda={false} />
                    </div>

                    <div className="col-md-6 p-5">
                        <Grafico titulo="Venda por produto (top 5)"
                                 chartType="PieChart"
                                 dados={dados_produtos}
                                 legenda={true} />
                    </div>

                    <div className="col-md-6 p-5">
                        <Grafico titulo="Venda por cidade"
                                 chartType="BarChart"
                                 dados={dados_cidades}
                                 legenda={false} />
                    </div>
                   

            </div>
        </div>
        
    </>
}
 
export default Dashboard;