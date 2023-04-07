app.factory('callServer', function($http, $q){

    return{
        getCall: function(){
            var deferred = $q.defer();
            $http({method: 'GET', url: '/admin/monitoring'}).
                then (function success(response) {
                    deferred.resolve(response.data);

                },function error(response) {
                    deferred.reject(response);
           }
        );
            return deferred.promise;
        },
        getCallFast: function(){
            var deferred = $q.defer();
            $http({method: 'GET', url: '/admin/monitoring-fc'}).
                then (function success(response) {
                    deferred.resolve(response.data);

                },function error(response) {
                    deferred.reject(response);
           }
        );
            return deferred.promise;
        }
    }


});