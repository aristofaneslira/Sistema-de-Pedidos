import {db, executeQuery} from '../config/database.js';

function Listar(status, callback){

    let filtro = [];
    let ssql = "select  p.id_pedido, c.nome as cliente, p.dt_pedido, p.status, s.descricao as status_descricao, p.vl_total ";
    ssql += "from  tab_pedido p ";
    ssql += "join  tab_cliente c on (c.id_cliente = p.id_cliente) ";
    ssql += "join  tab_pedido_status s on (s.status = p.status) ";
            
    if (status) {
        ssql += "where p.status = ? ";
        filtro.push(status);
    }

    ssql += "order by p.id_pedido desc ";
       
    db.query(ssql, filtro, function(err, result) {
        if (err) {                 
             callback(err, []);
        } else {                          
             callback(undefined, result);
        }
    });        
}

function ListarId(id_pedido, callback){
    let filtro = [];
    let ssql = "select  p.id_pedido, p.id_cliente, c.nome as cliente, p.dt_pedido, p.dt_entrega, ";
    ssql += "p.id_cond_pagto, n.cond_pagto, p.status, s.descricao as status_descricao, p.vl_total, p.obs ";
    ssql += "from  tab_pedido p ";
    ssql += "join  tab_cliente c on (c.id_cliente = p.id_cliente) ";
    ssql += "join  tab_pedido_status s on (s.status = p.status) ";
    ssql += "join  tab_cond_pagto n on (n.id_cond_pagto = p.id_cond_pagto) ";
    ssql += "where p.id_pedido = ? ";
        
    if (id_pedido) {
        filtro.push(id_pedido);
    } else {
        filtro.push(0);
    }
    
    db.query(ssql, filtro, function(err, result){
        if (err){
            callback(err, []);
        } else {
            
            if (result.length > 0){                
                let jsonPedido = result[0];
                
                ssql = "select  i.id_item, i.id_produto, p.descricao, i.qtd, i.vl_unit, i.vl_total ";
                ssql += "from  tab_pedido_item i ";
                ssql += "join  tab_produto p on (p.id_produto = i.id_produto) ";
                ssql += "where i.id_pedido = ? ";
                ssql += "order by i.id_item ";

                db.query(ssql, [id_pedido], function(err, result){
                    if (err) {
                        callback(err, []);
                    } else {                        
                        jsonPedido["itens"] = result;

                        callback(undefined, jsonPedido);
                    }
                });
                
            } else {
                callback(undefined, {});                            
            }
        }
    });
}

function InserirPedido(jsonPed, callback){

    db.getConnection(function(err, conn){

        conn.beginTransaction(async function(err){

            try {

                // Pedido...
                let ssql = "insert into tab_pedido(id_cliente, id_cond_pagto, id_usuario, status, dt_pedido, dt_entrega, vl_total, obs) ";
                ssql += "values(?, ?, ?, ?, ?, ?, ?, ?) ";

                let pedido = await executeQuery(conn, ssql, [jsonPed.id_cliente, jsonPed.id_cond_pagto, jsonPed.id_usuario, "A", jsonPed.dt_pedido, 
                                                             jsonPed.dt_entrega, jsonPed.vl_total, jsonPed.obs]);

                let id_pedido = pedido.insertId; // Pedido gerado acima...

                // Itens...
                if (id_pedido > 0 && jsonPed.itens.length > 0) {
                    
                    for (var i=0; i < jsonPed.itens.length; i++){
                        ssql = "insert into tab_pedido_item(id_pedido, id_produto, qtd, vl_unit, vl_total) ";                    
                        ssql += "values(?, ?, ?, ?, ?)";

                        await executeQuery(conn, ssql, [id_pedido, jsonPed.itens[i].id_produto, jsonPed.itens[i].qtd,
                                                                   jsonPed.itens[i].vl_unit, jsonPed.itens[i].vl_total]);
                    }
                }

                conn.commit();
                callback(undefined, {id_pedido: id_pedido});

            } catch(e) {
                console.log(e);
                conn.rollback();
                callback(e, {});
            }

        });

    });

}

function EditarPedido(id_pedido, jsonPed, callback){
      
    db.getConnection(function(err, conn) {
        conn.beginTransaction(async function(err){

            try {
                
                // Altera Pedido...
                let ssql = "update tab_pedido set id_cliente=?, id_cond_pagto=?, dt_pedido=?, ";
                ssql += "dt_entrega=?, vl_total=?, obs=? ";
                ssql += "where id_pedido = ? ";

                await executeQuery(conn, ssql, [jsonPed.id_cliente, jsonPed.id_cond_pagto, jsonPed.dt_pedido, 
                                                jsonPed.dt_entrega, jsonPed.vl_total, jsonPed.obs, id_pedido]);


                // Exclui itens...
                ssql = "delete from tab_pedido_item where id_pedido = ? ";
                await executeQuery(conn, ssql, [id_pedido]);
                            
                                            
                // Itens...
                if (id_pedido > 0 && jsonPed.itens.length > 0) {
                                         
                    for (var i=0; i < jsonPed.itens.length; i++){

                        ssql = "insert into tab_pedido_item(id_pedido, id_produto, qtd, vl_unit, vl_total) ";                    
                        ssql += "values(?, ?, ?, ?, ?)";
                        await executeQuery(conn, ssql, [id_pedido, jsonPed.itens[i].id_produto, jsonPed.itens[i].qtd,
                                                        jsonPed.itens[i].vl_unit, jsonPed.itens[i].vl_total]);
                        
                    }                    
                }  
                
                conn.commit(); 
                callback(undefined, {id_pedido: id_pedido});
                
            } catch (e) {
                console.log(e);
                conn.rollback();
                callback(e, {});
            }

        }); 
    }); 
}

function ExcluirPedido(id_pedido, callback){
    
    db.getConnection(function(err, conn) {
        conn.beginTransaction(async function(err){

            try {                
                // Itens...
                let ssql = "delete from tab_pedido_item where id_pedido = ?";                            
                await executeQuery(conn, ssql, [id_pedido]);
                
                                                      
                // Pedido...                
                ssql = "delete from tab_pedido where id_pedido = ?";
                await executeQuery(conn, ssql, [id_pedido]);
                

                conn.commit(); 
                callback(undefined, {id_pedido: id_pedido});                                               
            
            } catch (e) {
                console.log(e);
                conn.rollback();
                callback(e, {});
            }

        }); 
    });       
}

function StatusPedido(id_pedido, status, callback){
    
    let ssql = "update tab_pedido set status = ? where id_pedido = ? ";
                  
    db.query(ssql, [status, id_pedido], function(err, result) {
        if (err) {            
             callback(err, []);
        } else {                          
             callback(undefined, {id_pedido: id_pedido});
        }
    });           
}

export default {Listar, ListarId, InserirPedido, EditarPedido, ExcluirPedido, StatusPedido};