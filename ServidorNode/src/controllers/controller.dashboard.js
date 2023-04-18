import modelDashboard from "../models/model.dashboard.js";

function DashboardClientes(req, res){    
          
    modelDashboard.DashboardClientes(function(err, result){            
        
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).json(result);
        }      
    });      
}

function DashboardVendas(req, res){    
          
    modelDashboard.DashboardVendas(function(err, result){            
        
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).json(result);
        }      
    });      
}

function DashboardProdutos(req, res){    
          
    modelDashboard.DashboardProdutos(function(err, result){            
        
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).json(result);
        }      
    });      
}

function DashboardCidades(req, res){    
          
    modelDashboard.DashboardCidades(function(err, result){            
        
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).json(result);
        }      
    });      
}


export default {DashboardClientes, DashboardVendas, DashboardProdutos, DashboardCidades};