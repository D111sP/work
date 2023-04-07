app.factory('getInfoAccount_EL', function($http, $q){
    return{
        getInfo: function(id){
            var deferred = $q.defer();
            $http({method:  'GET', url: '/metering-ul/get-info?contract_id=' + id}).
                then (function success(response) {
                    deferred.resolve(response.data);
                },function error(response) {
                    deferred.reject(response.status);
           }
        );
            return deferred.promise;
        },
        postInfo: function(data){
            var deferred = $q.defer();
            $http({method:  'POST', url: '/metering-ul/update-info', data: data}).
                then (function success(response) {
                    deferred.resolve(response.data);
                },function error(response) {
                    deferred.reject(response.data);
           }
        );
            return deferred.promise;
        },
        getNewWindowAIS_EL: function(contragent, guid, callcenter_id, phone, link, id){
            var deferred = $q.defer();
                $http({method: 'GET', url: '/metering-ul/get-link?contragent='+ contragent + '&guid=' + guid + '&callcenter_id=' + callcenter_id + '&phone=' + phone + '&link=' + link + '&id=' + id}).
                    then (function success(response) {
                        deferred.resolve(response.data);
                    },function error(response) {
                        deferred.reject(response.status);
                    }
                );  
            return deferred.promise;
        },
        getNewWindowGIS_EL: function(contract_number, short_name, id){
            var deferred = $q.defer();
                $http({method: 'GET', url: '/metering-ul/get-link-gis?contract_number='+ contract_number + '&short_name=' + short_name + '&id=' + id}).
                    then (function success(response) {
                        deferred.resolve(response.data);
                    },function error(response) {
                        deferred.reject(response.status);
                    }
                );  
            return deferred.promise;
        }
    }
});