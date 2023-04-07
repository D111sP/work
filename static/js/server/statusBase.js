app.factory('statusBase', function($http, $q){
    return{
        getPings: function(){
            var deferred = $q.defer();
            $http({method: 'GET', url: '/admin/get-pings'}).
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