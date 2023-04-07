app.factory('getAccounts_EL', function($http, $q){
    return{
        getAccounts: function(numberPage, callcenter_id, customer_name, inn, number, number_print, phone_number){
            console.log();
            var deferred = $q.defer();
            $http({method:  'GET', url: '/account/search-yurlic?size=20&page=' + numberPage  + '&callcenter_id=' + 
                            callcenter_id + '&customer_name=' + customer_name + 
                            '&inn=' + inn + '&number=' + number + '&number_print=' + number_print + 
                            '&phone_number=' + phone_number}).
                then (function success(response) {
                    deferred.resolve(response.data);
                },function error(response) {
                    deferred.reject(response.status);
           }
        );
            return deferred.promise;
        }
    }
})
