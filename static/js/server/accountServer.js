
app.factory('accountServer', function($http, $q){

    return{
        getAccount: function(numberPage, searAchccount){
            console.log(searAchccount);
            var deferred = $q.defer();
            $http({method: 'GET', url: '/account/search?page=' + numberPage + '&query=' + searAchccount}).
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

app.factory('searchAccountServer', function($http, $q){

    return{
        getAccount: function(numberPage, ls_number, fio, adress, phone){
            console.log();
            var deferred = $q.defer();
            $http({method: 'GET', url: '/account/search-full?size=20&page=' + numberPage + '&ls_number=' + ls_number + '&fio=' + fio + '&address=' + adress + '&phone=' + phone}).
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

