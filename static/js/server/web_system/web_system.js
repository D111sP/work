app.factory('web_system', function($http, $q){

    return{
        get_time_out: function(){
            var deferred = $q.defer();
            $http({method: 'GET', url: '/admin/time'}).
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