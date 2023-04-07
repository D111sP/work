/*app.factory('metSerever', function($http, $q){
    return{
        getMet: function(idAccount){
            var deferred = $q.defer();
            $http({method: 'GET', url: '/device/get-meter-data?obj_id='+'"'+ idAccount +'"'}).
               then (function success(response) {
                    deferred.resolve(response.data);

                },function error(response) {
                    deferred.reject(response.status);
                }
            );
            return deferred.promise;
        },
        postMet: function(metObj){
            var deferred = $q.defer();
                $http({method: 'POST', url: '/device/save', data: metObj}).
                    then (function success(response) {
                        deferred.resolve(response.data);
                    },function error(response) {
                        deferred.reject(response.status);
                    }
                );  
            return deferred.promise;
    }      
    }
});*/

app.factory('metSerever', function($http, $q){
    return{
        getMet: function(idAccount){
            var deferred = $q.defer();
            $http({method: 'GET', url: '/device/get-meter-data?obj_id='+'"'+ idAccount +'"'}).
               then (function success(response) {
                    deferred.resolve(response.data);

                },function error(response) {
                    deferred.reject(response.status);
                }
            );
            return deferred.promise;
        },
        postMet: function(metObj){
            var deferred = $q.defer();
                $http({method: 'POST', url: '/metering/send', data: metObj}).
                    then (function success(response) {
                        deferred.resolve(response.data);
                    },function error(response) {
                        deferred.reject(response.data);
                    }
                );  
            return deferred.promise;
        },
        getMet1: function(idAccount){
            var deferred = $q.defer();
            $http({method: 'GET', url: '/metering/get?ls_number='+ idAccount, timeout: deferred.promise, cancel: deferred }).
               then (function success(response) {
                    deferred.resolve(response.data);

                },function error(response) {
                    deferred.reject(response.status);
                }
            );
            return deferred.promise;
        },
        getMetTric: function(idAccountTric){
            var deferred = $q.defer();
            $http({method: 'GET', url: '/metering/get-tric?ls_number='+ idAccountTric, timeout: deferred.promise, cancel: deferred }).
               then (function success(response) {
                    deferred.resolve(response.data);

                },function error(response) {
                    deferred.reject(response.data);
                }
            );
            return deferred.promise;
        }, 
        postMetTric: function(metObjTric, idAccountTric){
            var deferred = $q.defer();
                $http({method: 'PUT', url: '/metering/send-tric?ls_number='+ idAccountTric, data: metObjTric}).
                    then (function success(response) {
                        deferred.resolve(response.data);
                    },function error(response) {
                        deferred.reject(response.status);
                    }
                );  
            return deferred.promise;
        },
        getMetBp: function(idAccountBp){
            var deferred = $q.defer();
            $http({method: 'GET', url: '/metering/get-bp?lsnum='+ idAccountBp, timeout: deferred.promise, cancel: deferred}).
               then (function success(response) {
                    deferred.resolve(response.data);

                },function error(response) {
                    deferred.reject(response.status);
                }
            );
            return deferred.promise;
        }, 
        postMetBp: function(metObjBp, codeBp, codeGuid){
            var deferred = $q.defer();
                $http({method: 'POST', url: '/metering/send-bp?woaddress='+ codeBp + '&entityGUID=' + codeGuid, data: metObjBp}).
                    then (function success(response) {
                        deferred.resolve(response.data);
                    },function error(response) {
                        deferred.reject(response.data);
                    }
                );  
            return deferred.promise;
        }, 
        getStatusBp: function(codeBp, codeGuid){
            var deferred = $q.defer();
                $http({method: 'GET', url: '/metering/get-status?woaddress='+ codeBp + '&entity_guid=' + codeGuid}).
                    then (function success(response) {
                        deferred.resolve(response.data);
                    },function error(response) {
                        deferred.reject(response.status);
                    }
                );  
            return deferred.promise;
        }, 
        getNewWindowAIS: function(LsNumber, operator, phone, source, id, link){
            var deferred = $q.defer();
                $http({method: 'GET', url: '/metering/get-link?lsnumber='+ LsNumber + '&operator=' + operator + '&phone=' + phone + '&source=' + source + '&id=' + id + '&link=' + link,}).
                    then (function success(response) {
                        deferred.resolve(response.data);
                    },function error(response) {
                        deferred.reject(response.status);
                    }
                );  
            return deferred.promise;
        }, 
        getNewWindowGIS: function(LsNumber, id){
            var deferred = $q.defer();
                $http({method: 'GET', url: '/metering/get-link-gis?lsnumber='+ LsNumber + '&id=' + id}).
                    then (function success(response) {
                        deferred.resolve(response.data);
                    },function error(response) {
                        deferred.reject(response.status);
                    }
                );  
            return deferred.promise;
        }, 
        getNewWindowPIR: function(LsNumber, domain){
            var deferred = $q.defer();
                $http({method: 'GET', url: '/metering/link-pyramid?lsnumber='+ LsNumber}).
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
