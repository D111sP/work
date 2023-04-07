app.factory('fioServer', function($http, $q){

    return{
        getFio: function(){
            var deferred = $q.defer();
            $http({method: 'GET', url: '/admin/get-fio', transformResponse: undefined}).
                then (function success(response) {
                    deferred.resolve(response.data);
                },function error(response) {
                    deferred.reject(response);
                }
            );
            return deferred.promise;
        },
        getLogin: function(){
            var deferred = $q.defer();
            $http({method: 'GET', url: '/admin/get-login', transformResponse: undefined}).
            then (function success(response) {
                    deferred.resolve(response.data);
                },function error(response) {
                    deferred.reject(response);
                }
            );
            return deferred.promise;
        },
        getMail: function(){
            var deferred = $q.defer();
            $http({method: 'GET', url: '/admin/get-mail', transformResponse: undefined}).
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