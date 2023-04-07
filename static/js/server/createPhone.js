app.factory('createPhone', function($http, $q){
    return{
        postphone: function(phoneObj){
            var deferred = $q.defer();
                $http({method: 'POST', url: '/calls/create', data: phoneObj}).
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