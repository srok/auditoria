angular.module('app.services', ['app.config']).factory('DB', function($q, DB_CONFIG) {
    var self = this;
    self.db = null;

    self.init = function() {
        // Use self.db = window.sqlitePlugin.openDatabase({name: DB_CONFIG.name}); in production
        self.db = window.openDatabase(DB_CONFIG.name, '1.0', 'database', -1);

        angular.forEach(DB_CONFIG.tables, function(table) {
            var columns = [];

            angular.forEach(table.columns, function(column) {
                columns.push(column.name + ' ' + column.type);
            });

            var query = 'CREATE TABLE IF NOT EXISTS ' + table.name + ' (' + columns.join(',') + ')';
            self.query(query);
            console.log('Table ' + table.name + ' initialized');
        });
    };

    self.query = function(query, bindings) {
        bindings = typeof bindings !== 'undefined' ? bindings : [];
        var deferred = $q.defer();

        self.db.transaction(function(transaction) {
            transaction.executeSql(query, bindings, function(transaction, result) {
                deferred.resolve(result);
            }, function(transaction, error) {
                console.log(error);

                deferred.reject(error);
            });
        });

        return deferred.promise;
    };

   

    self.fetchAll = function(result) {
        var output = [];

        for (var i = 0; i < result.rows.length; i++) {
            output.push(result.rows.item(i));
        }
        
        return output;
    };

    self.fetch = function(result) {
        return result.rows.item(0);
    };

    return self;
})
// Resource service example
.factory('Campana', function(DB) {
    var self = this;

    self.insert = function(data) {
        console.log("INSERT INTO campanas ('id','nombre','cliente_id') values ("+data.id+",'"+data.nombre+"',"+data.cliente_id+")");
        return DB.query( "INSERT INTO campanas ('id','nombre','cliente_id') values ("+data.id+",'"+data.nombre+"',"+data.cliente_id+")")
        .then(function(result){
        

            return DB.fetchAll(result);
        });
    };

    self.update = function(data) {
        console.log("UPDATE campanas SET nombre='"+data.nombre+"',cliente_id="+data.cliente_id+" WHERE id="+data.cliente_id);
        
        return DB.query( "UPDATE campanas SET nombre='"+data.nombre+"',cliente_id="+data.cliente_id+" WHERE id="+data.cliente_id)
        .then(function(result){

            return DB.fetchAll(result);
        });
    };

     self.deleteAll=function (){
        return DB.query('delete from campanas where 1').then(function(result){
            return DB.fetchAll(result);
        });
    };

    self.all = function() {
        return DB.query('SELECT * FROM campanas')
        .then(function(result){
            return DB.fetchAll(result);
        });
    };
    
    self.getById = function(id) {
        return DB.query('SELECT * FROM campanas WHERE id = ?', [id])
        .then(function(result){
            return DB.fetch(result);
        });
    };
    
    return self;
})
.factory('Carteles', function(DB) {
    var self = this;

    self.deleteAll=function (){
        return DB.query('delete from carteles where 1').then(function(result){
            return DB.fetchAll(result);
        });
    };

    self.insert = function(data) {
        console.log("INSERT INTO carteles ('id','campana_id','fecha_max','direccion','cartel_lat','cartel_long','soporte_id','empresa_id','ws_status','ws_sync_date') values ("+data.id+","+data.campana_id+",'"+data.fecha_max+"','"+data.direccion+"','"+data.cartel_lat+"','"+data.cartel_long+"',"+data.soporte_id+","+data.empresa_id+",'"+data.ws_status+"','"+data.ws_sync_date+"')");
        return DB.query("INSERT INTO carteles ('id','campana_id','fecha_max','direccion','cartel_lat','cartel_long','soporte_id','empresa_id','ws_status','ws_sync_date') values ("+data.id+","+data.campana_id+",'"+data.fecha_max+"','"+data.direccion+"','"+data.cartel_lat+"','"+data.cartel_long+"',"+data.soporte_id+","+data.empresa_id+",'"+data.ws_status+"','"+data.ws_sync_date+"')")
        .then(function(result){
        

            return DB.fetchAll(result);
        });
    };

    self.getByCampana = function(id) {
        return DB.query('SELECT * FROM carteles WHERE campana_id = ?', [id])
        .then(function(result){
            return DB.fetchAll(result);
        });
    };
  
    self.all = function() {
        return DB.query('SELECT * FROM carteles')
        .then(function(result){
            return DB.fetchAll(result);
        });
    };
    
    self.getById = function(id) {
        return DB.query('SELECT * FROM carteles WHERE id = ?', [id])
        .then(function(result){
            return DB.fetch(result);
        });
    };
    
    return self;
}).factory('Soportes', function(DB) {
    var self = this;

    self.deleteAll=function (){
        return DB.query('delete from soportes where 1').then(function(result){
            return DB.fetchAll(result);
        });
    };

    self.insert = function(data) {
        
        return DB.query("INSERT INTO soportes ('id','nombre') values ("+data.id+",'"+data.nombre+"')")
        .then(function(result){
        

            return DB.fetchAll(result);
        });
    };

  
    self.all = function() {
        return DB.query('SELECT * FROM soportes')
        .then(function(result){
            return DB.fetchAll(result);
        });
    };
    
    self.getById = function(id) {
        return DB.query('SELECT * FROM soportes WHERE id = ?', [id])
        .then(function(result){
            return DB.fetch(result);
        });
    };
    
    return self;
}).factory('Estados', function(DB) {
    var self = this;

    self.deleteAll=function (){
        return DB.query('delete from estados where 1').then(function(result){
            return DB.fetchAll(result);
        });
    };

    self.insert = function(data) {
        
        return DB.query("INSERT INTO estados ('id','nombre') values ("+data.id+",'"+data.nombre+"')")
        .then(function(result){
        

            return DB.fetchAll(result);
        });
    };

  
    self.all = function() {
        return DB.query('SELECT * FROM estados')
        .then(function(result){
            return DB.fetchAll(result);
        });
    };
    
    self.getById = function(id) {
        return DB.query('SELECT * FROM estados WHERE id = ?', [id])
        .then(function(result){
            return DB.fetch(result);
        });
    };
    
    return self;
}).factory('Empresas_publi', function(DB) {
    var self = this;

    self.deleteAll=function (){
        return DB.query('delete from empresas_publi where 1').then(function(result){
            return DB.fetchAll(result);
        });
    };

    self.insert = function(data) {
        
        return DB.query("INSERT INTO empresas_publi ('id','nombre') values ("+data.id+",'"+data.nombre+"')")
        .then(function(result){
        

            return DB.fetchAll(result);
        });
    };

  
    self.all = function() {
        return DB.query('SELECT * FROM empresas_publi')
        .then(function(result){
            return DB.fetchAll(result);
        });
    };
    
    self.getById = function(id) {
        return DB.query('SELECT * FROM empresas_publi WHERE id = ?', [id])
        .then(function(result){
            return DB.fetch(result);
        });
    };
    
    return self;
}).factory('Clientes', function(DB) {
    var self = this;

    self.deleteAll=function (){
        return DB.query('delete from clientes where 1').then(function(result){
            return DB.fetchAll(result);
        });
    };

    self.insert = function(data) {
        
        return DB.query("INSERT INTO clientes ('id','razon_social') values ("+data.id+",'"+data.razon_social+"')")
        .then(function(result){
        

            return DB.fetchAll(result);
        });
    };

  
    self.all = function() {
        return DB.query('SELECT * FROM clientes')
        .then(function(result){
            return DB.fetchAll(result);
        });
    };
    
    self.getById = function(id) {
        return DB.query('SELECT * FROM clientes WHERE id = ?', [id])
        .then(function(result){
            return DB.fetch(result);
        });
    };
    
    return self;
})
.factory('Auditorias', function(DB) {
    var self = this;


    self.deleteAll=function (){
        return DB.query('delete from auditorias where 1').then(function(result){
            return DB.fetchAll(result);
        });
    };

    self.insert = function(data) {
      
        return DB.query("INSERT INTO auditorias" 
            +"("
            +"cliente_id,"
            +"campana_id,"
            +"cartel_id,"
            +"fecha_max,"
            +"direccion,"
            +"cartel_lat,"
            +"cartel_long,"
            +"soporte_id,"
            +"empresa_id,"
            +"estado_id,"
            +"observaciones,"
            +"foto_uri,"
            +"foto_lat,"
            +"foto_long,"
            +"fecha,"
            +"ws_status,"
            +"ws_sync_date"
            +") "
            +"values ("
            +data.cliente_id+","+
            +data.campana_id+","+
            +data.cartel_id+","+
            "'"+data.fecha_max+"',"+
            "'"+data.direccion+"',"+
            "'"+data.cartel_lat+"',"+
            "'"+data.cartel_long+"',"+
            +data.soporte_id+","+
            +data.empresa_id+","+
            +data.estado_id+","+
            "'"+data.observaciones+"',"+
            "'"+data.foto_uri+"',"+
            "'"+data.foto_lat+"',"+
            "'"+data.foto_long+"',"+
            "'"+data.fecha+"',"+
            "'"+data.ws_status+"',"+
            "'"+data.ws_sync_date+"'"+

            ")")
        .then(function(result){
        

            return DB.fetchAll(result);
        });
    };
    self.update = function(data) {
        

       return DB.query("UPDATE auditorias SET " 
            +"cliente_id="+data.cliente_id
            +",campana_id=" +data.campana_id
            +",cartel_id="+data.cartel_id
            +",fecha_max='"+data.fecha_max+"'"
            +",direccion='"+data.direccion+"'"
            +",cartel_lat='"+data.cartel_lat+"'"
            +",cartel_long='"+data.cartel_long+"'"
            +",soporte_id="+data.soporte_id
            +",empresa_id="+data.empresa_id
            +",estado_id="+data.estado_id
            +",observaciones='"+data.observaciones+"'"
            +",foto_uri='"+data.foto_uri+"'"
            +",foto_lat='"+data.foto_lat+"'"
            +",foto_long='"+data.foto_long+"'"
            +",fecha='"+data.fecha+"'"
            +",ws_status='"+data.ws_status+"'"
            +",ws_sync_date='"+data.ws_sync_date+"'"
            +" WHERE id="+data.id)
        .then(function(result){
        

            return DB.fetchAll(result);
        });
    };

     self.getByCartel = function(id) {
        return DB.query('SELECT * FROM auditorias WHERE cartel_id = ?', [id])
        .then(function(result){
            return DB.fetchAll(result);
        });
    };

    self.getNews = function() {
        return DB.query('SELECT * FROM auditorias WHERE ws_status != 10')
        .then(function(result){
            return DB.fetchAll(result);
        });
    };

    self.all = function() {
        return DB.query('SELECT * FROM auditorias')
        .then(function(result){
            return DB.fetchAll(result);
        });
    };
    
    self.getById = function(id) {
        return DB.query('SELECT * FROM auditorias WHERE id = ?', [id])
        .then(function(result){
            return DB.fetch(result);
        });
    };
    
    return self;
});
