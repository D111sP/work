app.factory('admin_role', function($http, $q){

    return{
        getRole: function(){
            var deferred = $q.defer();
            $http({method: 'GET', url: '/admin/get-role'}).
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