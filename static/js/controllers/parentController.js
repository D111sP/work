app.config(function($sceDelegateProvider) {
    $sceDelegateProvider.resourceUrlWhitelist([
      // Allow same origin resource loads.
      'self',
      // Allow loading from our assets domain.  Notice the difference between * and **.
      'data**']);
   })
.controller('Parentpage', function page($scope, $rootScope, callHistoryService, fioServer, historyCall, createPhone, $sce, web_system, admin_role) {
    //Получает ФИО  
    var getAccountFio = fioServer.getFio();
    getAccountFio.then(function(value){
        $scope.accountFio_Parent = value;
    
    });
    //+++
    //Получение исории звонков
    var numberPageCall = 0; 
    var totalPageCall = 0;
    $scope.showPagin = false;
    $scope.show_info_statys_back = false;
    
    $scope.getHistoryCall = function(){
        numberPageCall = 0;
        getHistoryCallFun($scope.accountFio_Parent, numberPageCall);
        disabledCall(numberPageCall)
    };
    
    $scope.downCall = function(){
        if (numberPageCall == 0 || numberPageCall <= 0) {
            numberPageCall = 0;
        } else {
            numberPageCall = numberPageCall - 1;
        };
    
        getHistoryCallFun($scope.accountFio_Parent, numberPageCall);
    
        disabledCall(numberPageCall);
    };
    
    $scope.upCall = function(){
        if (numberPageCall + 1 >= totalPageCall) {
            numberPageCall = numberPageCall; 
        } else {
            numberPageCall = numberPageCall + 1;
        }
    
        getHistoryCallFun($scope.accountFio_Parent, numberPageCall);
    
        disabledCall(numberPageCall, totalPageCall);
    };
    
    function getHistoryCallFun(fio, numberPageCall){
        var getHistory = historyCall.getHistoryCall(fio, numberPageCall);
        getHistory.then(function(value){
            //console.log(value.content);
            $scope.historyCalls = value.content;
            numberPageCall = value.number;
            totalPageCall = value.totalPages;
            if(totalPageCall == 0){
                $scope.showPagin = false;
            } else $scope.showPagin = true;
            disabledCall(numberPageCall, totalPageCall);
        });
    };
    
    //Отключение кнопок паганиации
    function disabledCall(numberPageCall, totalPageCall){
        $scope.numberPageCall = numberPageCall;
        $scope.totalPageCall = totalPageCall;
    };
    //+++
    //+++
    // Открытие информации о звонке
    $scope.openInfoCall = function(historyCallInfo){
        var get_audio = historyCall.getPlayer_Audio( historyCallInfo.id);
        get_audio.then(function(value){
            $scope.historyCall_Audio_Player = $sce.trustAsResourceUrl(value);
            const mp3Ctrl = document.getElementById('mp3_id');
            mp3Ctrl.load();
        });
        $scope.historyCallInfonumber = historyCallInfo.number;
        $scope.historyCallInfostartCallDate = historyCallInfo.startCallDate;
        $scope.historyCallInfoincomingCallDate = historyCallInfo.incomingCallDate;
        $scope.historyCallInfofio = historyCallInfo.fio;
        $scope.historyCallInfoCall = "http://10.172.2.105:8080/admin/get-link?IDSeance=" + historyCallInfo.id;
        $scope.historyCallPlay = historyCallInfo.linkRecordedCall;
        $scope.linkInfinity = historyCallInfo.linkInfinity
        condition = 'ShowInfoCall';
        conditionLE = 'ShowInfoCall';  
    };
    //+++
    $scope.obnova = function(){
        conditionLE = 'TableLE';
        condition = 'Table';
    };
    //Закрытие информации о звонке
    $scope.back_infoCall = function(){
        conditionLE = 'TableLE';
        condition = 'Table';
    };
    //+++
    // Провекрка на автоматичсекий разрыв подключения.

    get_info()
    function get_info(){
        var get_info_statys_back = web_system.get_time_out();
        get_info_statys_back.then(function(value){
            console.log(typeof value)
            console.log(value)
            if(typeof value == "string"){
                $scope.show_info_statys_back = true;  
            } else {
                $scope.show_info_statys_back = false; 
            };
            

            time_out_chech()
        });
    };

    function time_out_chech(){
        setTimeout(function(){ 
            get_info() 
        }, 600000); 
    };

    // +++

    // Админ панель
    $scope.showAdminPanel = false
    arr_key_role = ["ROLE_ADMIN", "ROLE_TECH"]; 
    admin_panel()
    function admin_panel(){
        var get_admin_panel= admin_role.getRole();
        get_admin_panel.then(function(value){
            for(let i = 0; i < value.length;  i++){
                if(arr_key_role.includes(value[i].authority)){
                    $scope.showAdminPanel = true;
                };
            };
        });
    };
    //+++

    //Сохранение информации в кладках
    $scope.tabStateFL = 'Table';
    $scope.tabStateLE = 'TableLE';

    $scope.switchToFL = function() {
        $scope.condition = $scope.tabStateFL;
        $scope.lastActiveTab = 'FL';
    };

    $scope.switchToLE = function() {
        $scope.conditionLE = $scope.tabStateLE;
        $scope.lastActiveTab = 'LE';
    };
    //+++

    //Новая в кладка истоии звонка
    $scope.lastActiveTab = 'FL';
    $scope.switchToTab = function(tab) {
        $('#custom-tab-container li').removeClass('active');
        $('#custom-tab-container li a[href="#' + tab + '"]').closest('li').addClass('active');
        $('.custom-tab-pane').removeClass('active');
        $('#' + tab).addClass('active');
    };

    $scope.switchToCallHistory = function() {
        $scope.switchToTab('CH');
    };

    $scope.showCallHistory = function(historyCallInfo) {
        $scope.selectedPhoneNumber = historyCallInfo.number;
        $scope.selectedCallTime = historyCallInfo.startCallDate;

        var get_audio = historyCall.getPlayer_Audio( historyCallInfo.id);
        get_audio.then(function(value){
            $scope.historyCall_Audio_Player = $sce.trustAsResourceUrl(value);
            const mp3Ctrl = document.getElementById('mp3_id');
            mp3Ctrl.load();
        });
        $scope.historyCallInfonumber = historyCallInfo.number;
        $scope.historyCallInfostartCallDate = historyCallInfo.startCallDate;
        $scope.historyCallInfoincomingCallDate = historyCallInfo.incomingCallDate;
        $scope.historyCallInfofio = historyCallInfo.fio;
        $scope.historyCallInfoCall = "http://10.172.2.105:8080/admin/get-link?IDSeance=" + historyCall.id;
        $scope.historyCallPlay = historyCallInfo.linkRecordedCall;
        $scope.linkInfinity = historyCallInfo.linkInfinity

        $scope.showCallHistoryTab = true;
        $scope.switchToCallHistory();
    };

    $scope.back_infoCall = function() {
       
        if ($scope.lastActiveTab === 'FL') {
            $scope.switchToTab('IN');
        } else if ($scope.lastActiveTab === 'LE') {
            $scope.switchToTab('EL');
        };
        $scope.showCallHistoryTab = false;
        callHistoryService.clearCallData();
    };

    $scope.foundAccountByNumber = function(number, linkInfinity) {
        $rootScope.$broadcast('searchPhoneNumber', number, );
        callHistoryService.setCallData(number, linkInfinity, true);
        if ($scope.lastActiveTab === 'FL') {
            $scope.switchToTab('IN');
        } else if ($scope.lastActiveTab === 'LE') {
            $scope.switchToTab('EL');
        };
    };
    //+++
});