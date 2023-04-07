app.factory('monitoring_call', function($http, $q){
    return{
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

app.service('callHistoryService', function() {
    this.phoneNumber = null;
    this.audioLink = null;
    this.fromHistory = false;

    this.setCallData = function(phoneNumber, audioLink, fromHistory) {
        this.phoneNumber = phoneNumber;
        this.audioLink = audioLink;
        this.fromHistory = fromHistory;
    };

    this.clearCallData = function() {
        this.phoneNumber = null;
        this.audioLink = null;
        this.fromHistory = false;
    };
});