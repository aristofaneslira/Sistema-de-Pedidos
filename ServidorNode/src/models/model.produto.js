import {db} from "../config/database.js";

function Listar(busca, callback){

    let filtro = [];
    let ssql = "select id_produto, descricao from tab_produto ";

    if (busca){
        ssql += "where descricao like ?";
        filtro.push('%' + busca + '%');
    }

    db.query(ssql, filtro, function(err, result){
        if (err){
            callback(err, []);
        } else {
            callback(undefined, result);
        }
    });

}

export default {Listar};