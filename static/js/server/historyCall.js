app.factory('historyCall', function($http, $q){

    return{
        getHistoryCall: function(fio, page){
            var deferred = $q.defer();
            $http({method: 'GET', url: '/calls/get-by-fio-and-phone?fio='+ fio + '&page=' + page + '&size=8'}).
                then (function success(response) {
                    deferred.resolve(response.data);

                },function error(response) {
                    deferred.reject(response);
           }
        );
            return deferred.promise;
        },
        getPlayer_Audio: function(idCode){
            var deferred = $q.defer();
            $http({method: 'GET', url: '/audio/listen?IDSeance='+ idCode, transformResponse: undefined}).
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