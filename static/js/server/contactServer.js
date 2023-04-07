app.factory('infoServer', function($http, $q){
    return{
        getInfo: function(idAccount){
            var deferred = $q.defer();
            $http({method: 'GET', url: '/contact/get?id='+idAccount}).
               then (function success(response) {
                    deferred.resolve(response.data);

                },function error(response) {
                    deferred.reject(response.status);
                }
            );
            return deferred.promise;
        },
        postInfo: function(infoObj){
            var deferred = $q.defer();
                $http({method: 'POST', url: '/contact/edit', data: infoObj }).
                    then (function success(response) {
                        deferred.resolve(response.data);
                    },function error(response) {
                        deferred.reject(response.status);
                    }
                );  
            return deferred.promise;
        }

    };


});