app.controller('LEpage', function page($scope, callHistoryService, monitoring_call, statusBase, getAccounts_EL, $timeout, fioServer, callServer, $q, createPhone, getInfoAccount_EL) {
    $scope.$on('searchPhoneNumber', function(event, phoneNumber) {
        conditionLE = 'TableLE';

        $scope.clear_search_window_EL();
        
        foundAccountByNumber(phoneNumber);

    });
    
    $scope.show_window_EL = {showInfoNumber: false}; 
    $scope.clear_search_window_EL = function(){
        $scope.show_window_EL.showInfoNumber_EL = false;
        $scope.showTable_EL = false
        $scope.searchOptions.UID = null; 
        $scope.searchOptions.partner = null; 
        $scope.searchOptions.INN = null;
        $scope.searchOptions.contractNum = null;
        $scope.searchOptions.contractNumSeal = null;
        $scope.searchOptions.phoneNumber = null;
    };
    function call_clear_search_window_EL(){
        $timeout(function(){
            $scope.clear_search_window_EL()
        }, 100);
    }

// WEBSOCET телефония
var socket_Call = null;
var stompClient_Call;
var call_end = false;

/*var closeEventCallback = function(){
    console.log(123)
};*/

var connectCallback =function(frame){
    subscribeAll_Call($scope.accountLogin_EL)
};

var error_callback = function(error) {
    conenectSockAll_Call()
}; 

function connectSockJs_Call(){
    if(socket_Call == null){
        socket_Call = new SockJS('/eo-websocket');
        stompClient_Call = Stomp.over(socket_Call); 
    };
};

function disconnectWebSock_Call(){
    stompClient_Call.disconnect();
    socket_Call = null;
};
// start fun
function conenectSockAll_Call(){
    if(socket_Call != null){
        disconnectWebSock_Call();
    };

    connectSockJs_Call();

    stompClient_Call.connect({}, connectCallback, error_callback)
};

function subscribeAll_Call(accountLogin){
    stompClient_Call.subscribe('/call/private-messages/' + accountLogin , function (message) {
        if(message.body != "звонок завершен" ){
            call_end_EL = false
            if($scope.abonentNumber_EL != message.body || $scope.show_window_EL.showInfoNumber_EL == false){
                $scope.abonentNumber_EL = message.body;
                var getAccountObj=getAccounts_EL.getAccounts(0, "", "", "", "", "", $scope.abonentNumber_EL);
                getAccountObj.then(function(value) {
                    $scope.booleanConfirm_EL = 1;
    
                    if(value.content.length > 0){
                        var strAbonentFio = [];
                        
                        for(let j = 0; j < value.content.length; j++){
                            for(let a = 0; a < value.content[j].phones.length; a++){
                                console.log(value.content[j]);
                                if (value.content[j].phones[a].confirm == true){
                    
                                    $scope.booleanConfirm_EL = 0;
                                    strAbonentFio.push(value.content[j].fio);
                                    break;   
                                };
    
                                console.log(value.content[j].phones);
                            };
                        };
                        $scope.infoBeLSNumber_EL = "";
                        $scope.abonentFio_EL = strAbonentFio.join(); 
    
                    }else{
                        $scope.booleanConfirm_EL = 1;
                        $scope.infoBeLSNumber_EL = "По номеру телефона ЛС не найдены.";
                        $scope.abonentFio_EL = null;
                        $scope.abonentAdress = null;
                        $scope.abonentAccauntNumber = null;   
                    };
                    callHistoryService.clearCallData(); 
                    $scope.show_window_EL.showInfoNumber_EL = true;
                    foundAccountByNumber($scope.abonentNumber_EL)
                });
            };
        } else if (call_end_EL != true) {
            $scope.abonentNumber_EL = "";
            $timeout(function(){
                $scope.show_window_EL.showInfoNumber_EL = false;
            }, 100);
            //call_clear_search_window_EL()
            call_end_EL = true
        };
    });
};

conenectSockAll_Call();
//+++
//Контролер страниц в ЮР
conditionLE = 'TableLE'

$scope.setFile_EL = function(){
    if(conditionLE =='TableLE')
        return './we/tableLE.html';
    else if(conditionLE == 'ShowInfoCall')
        return './we/showInfoCall.html';
    else if(conditionLE =='showElementEl')
        return './we/showElementEl.html';
}
//+++

// Параметры поиск ЮР
$scope.searchOptions = {};

//+++

//Параметры при загрузки страницы
$scope.showTable_EL = false
    //Анимация поиска
$scope.search_animation = 0;
//+++

// Кнопка Поиска на форме ЮР
$scope.searchAccounts_EL = function(UID, partner, INN, contractNum, contractNumSeal, phoneNumber){
    
    $timeout(function() {
        $scope.search_animation = 0;
    }, 500);

    if((UID == "" || UID == null) && (partner == "" || partner == null) && (INN == "" || INN == null) &&
    (contractNum == "" || contractNum == null) && (contractNumSeal == "" || contractNumSeal == null) && 
    (phoneNumber == "" || phoneNumber == null)){
        $scope.showTable_EL = false
        $scope.search_animation = 1;
    }else {
        numberPage = 0 

        getAccountsEL(numberPage, UID, partner, INN, contractNum, contractNumSeal, phoneNumber);
        $scope.search_animation = 1;
    }
}
//+++

//Получение всех юр счетов с сервера
function getAccountsEL (numberPage, UID, partner, INN, contractNum, contractNumSeal, phoneNumber) {
    if (UID == null) {
        UID =""; 
    };

    if (partner == null) {
        partner =""; 
    };

    if (INN == null) {
        INN =""; 
    };

    if (contractNum == null) {
        contractNum =""; 
    };

    if (contractNumSeal == null) {
        contractNumSeal =""; 
    };

    if (phoneNumber == null) {
        phoneNumber =""; 
    };

    var getAccounts_EL_List=getAccounts_EL.getAccounts(numberPage, UID, partner, INN, contractNum, contractNumSeal, phoneNumber);
    getAccounts_EL_List.then(function(value){

        if (value.content.length == 0){
            $scope.showTable_EL = false;
        } else {
            $scope.showTable_EL = true; 
            $scope.accounts_EL = value.content;
            numberPage = value.number;
            totalPage = value.totalPages;
    
            disabled(numberPage, totalPage);
        };
    })

}

//+++

//Отключение кнопок паганиации
function disabled(numberPage, totalPage){

    $scope.numberPage_EL = numberPage;
    $scope.totalPage_EL = totalPage;


};
//++

//Пагинация
$scope.up_EL = function(UID, partner, INN, contractNum, contractNumSeal, phoneNumber){
    if ($scope.numberPage_EL + 1 >= $scope.totalPage_EL) {
        numberPag_EL = $scope.numberPage_EL; 
    } else {
        numberPage_EL = $scope.numberPage_EL + 1;
    }

    getAccountsEL(numberPage_EL, UID, partner, INN, contractNum, contractNumSeal, phoneNumber);
};

$scope.down_EL = function(UID, partner, INN, contractNum, contractNumSeal, phoneNumber){
    if ($scope.numberPage_EL == 0 || $scope.numberPage_EL <= 0) {
        numberPage_EL = 0;
    } else {
        numberPage_EL = $scope.numberPage_EL - 1;
    };
    
    getAccountsEL(numberPage_EL, UID, partner, INN, contractNum, contractNumSeal, phoneNumber);
};
//++
//Выделение цветом строки
$scope.selectedColor_EL = function(obj_id){
    $scope.obj_id_EL = obj_id;
};
//+++

//Получает ФИО  
var getAccountFio = fioServer.getFio();
getAccountFio.then(function(value){
    $scope.accountFio_EL = value;
});
//+++
//Получает LOGIN
var getAccountLogin = fioServer.getLogin();
getAccountLogin.then(function(value){
    $scope.accountLogin_EL = value;
});
//+++
//+++

//Телефония ЮР

objTimeInfo_EL = {
    id:"",
    fio: "",  
    number: "",
    startCallDate: "",
    incomingCallDate: ""
};
var writeSQL = false;
var timeIdCall = null;
var flagWrite = true;
var flagSerchPhoneNumber  = true;
var flagUR = false

//getCallFastAndTurn();
function getCallFastAndTurn(){
    var getFastCall = callServer.getCallFast();
    getFastCall.then(function(value){
        return value;
    }).catch(angular.noop);

    var getCall = callServer.getCall();
    getCall.then(function(value){
        return value;
    }).catch(angular.noop);

    $q.all([getFastCall, getCall]).then(function(result){
        //console.log(result);

        var valueCallFast = result[0];
        var valueCall = result[1];

        //Быстрых звонков нет и очеред не известно.
        if(valueCallFast.length == 0 ){
            if(valueCall.length == 0){
                createTimeInfo("", "", "", "", "")
                flagWrite = true;
                $scope.abonentNumber_EL = "";
                $scope.abonentFio_EL = "";
                $scope.showInfoNumber_EL = false;
                //console.log("Пустая очередь и путсые быстрые звонки ЮР");

            }else if(valueCall.length != 0 && valueCall[0].idacd.toString().split('')[0] == "6"){
                flagUR = true
                callTurn(valueCall);
                //console.log("Полная очередь и путсые быстрые звонки ЮР");
            }; 
        };
        //Быстрые звонки есть или звонко на запись, очеред не известно.
        if(valueCallFast.length != 0 && flagUR){
            //console.log("Полная очередь и путсые быстрые звонки ЮР");
            callFastOrWtire(valueCallFast);
        };     
 
        $timeout(getCallFastAndTurn, 2000);
    });
};
function callFastOrWtire(value){
    fioWork = $scope.accountLogin_EL;

    for( let i = 0; i < value.length; i++ ){
        var fio3Component = value[i].f + " " + value[i].i + " " + value[i].o;  
        if(fio3Component == fioWork){
            if(value[i].timeFinish == null){
                $scope.abonentNumber_EL = value[i].anumber;
                if(flagSerchPhoneNumber){
                    flagSerchPhoneNumber = false;
                    foundAccountByNumber($scope.abonentNumber_EL);
                    $scope.showInfoNumber_EL = true;
                };
            }else{
                if (flagWrite){
                    createTimeInfo($scope.abonentNumber_EL, fio3Component, value[i].timeStartTime, value[i].timeFinish);
                    createPhoneFio(objTimeInfo_EL);
                    flagSerchPhoneNumber = true;
                    flagWrite = false;
                    flagUR = false;
                };
            };
        };
    };
};
//Поиск при принития звонка
function foundAccountByNumber(abonentNumber_EL){
    $timeout(function() {
        $scope.search_animation = 0;
    }, 500);

    $scope.searchOptions.phoneNumber = abonentNumber_EL;
    getAccountsEL(0, "", "", "", "", "", abonentNumber_EL);

    $scope.search_animation = 1;
}

$scope.foundAccountByNumber_EL = function (abonentNumber_EL){
    getAccountsEL(0, "", "", "", "", "", abonentNumber_EL);

    condition = 'TableEl'; 
};
//


// Записи в базу данных
function createPhoneFio(phoneObj){
    var postphoneObj=createPhone.postphone(phoneObj);
    postphoneObj.then(function(value) {
        timeIdCall = value.id
    });
};
//
// Временая таблица информации о звонимвшем
function createTimeInfo(abonentNumber, abonentFio, startCallDate, incomingCallDate, idCallServer){
    if (idCallServer != null) {
        objTimeInfo_EL.id = idCallServer;    
    };
    if (abonentNumber != null) {
        objTimeInfo_EL.number = abonentNumber;    
    };
    if (abonentFio != null) {
        objTimeInfo_EL.fio = abonentFio;    
    }
    if (startCallDate != null) {
        objTimeInfo_EL.startCallDate = startCallDate;    
    };
    if (incomingCallDate != null) {
        objTimeInfo_EL.incomingCallDate = incomingCallDate;        
    };
};
//
function callTurn(value){ 
    fioWork = $scope.accountLogin_EL;

    for( let i = 0; i < value.length; i++ ){
        if(value[i].fio == fioWork ){
            $scope.abonentNumber_EL = value[i].abonentNumber;
            
            var getAccountObj=getAccounts_EL.getAccounts(0, "", "", "", "", "", value[i].abonentNumber);
            getAccountObj.then(function(value) {
                $scope.booleanConfirm_EL = 1;

                if(value.content.length > 0){
                    var strAbonentFio = [];
                    
                    for(let j = 0; j < value.content.length; j++){
                        for(let a = 0; a < value.content[j].phones.length; a++){
                            console.log(value.content[j]);
                            if (value.content[j].phones[a].confirm == true){
                
                                $scope.booleanConfirm_EL = 0;
                                strAbonentFio.push(value.content[j].fio);
                                break;   
                            };

                            console.log(value.content[j].phones);
                        };
                    };
                    $scope.infoBeLSNumber_EL = "";
                    $scope.abonentFio_EL = strAbonentFio.join(); 

                }else{
                    $scope.booleanConfirm_EL = 1;
                    $scope.infoBeLSNumber_EL = "По номеру телефона ЛС не найдены.";
                    $scope.abonentFio_EL = null;
                    $scope.abonentAdress = null;
                    $scope.abonentAccauntNumber = null;   
                }; 
            });

            $scope.showInfoNumber_EL = true;
        };
    };
};


// Кнопка закрытия алер окна
$scope.closeAlert_EL = function(){
    $scope.show_window_EL.showInfoNumber_EL = false; 
};
//
//+++

// Открытие информации о договоре
/*$scope.testEL = [
    {
        key:"111",
        znal:2,
        new: null
    },
    {
        key:"222",
        znal:3,
        new: null
    },
    {
        key:"333",
        znal:0,
        new: null
    }
];*/

//Кнопки назад и обновить
$scope.backEl = function(){
    conditionLE ='TableLE';
};
$scope.updateEl = function(){
    $scope.openModalEl(update_info_account);
};
//+++
//Открытие окна

var showAis
var lenght_accounts = 0;
$scope.show_btn_ping = 1;
$scope.info_Pings = [];
$scope.show_info_post_data = false;
$scope.flag_show_load = false;
$scope.flag_show_load_post = false;
$scope.str_empty = "";
var update_info_account;

$scope.openModalEl = function(info_account){
    var monitoring = monitoring_call.getCallFast();
    monitoring.then(function(value) {
        $scope.link_call_EL = "";
        for(let i = 0; i < value.length; i++){
            if(value[i].login ==  $scope.accountLogin_EL){
                $scope.link_call_EL = "http://infinity.vostok-electra.ru:10080/stat/getrecordedfile/?IDSeance=" + value[i].idseance + "&codec=mp3";
                break;
            };
        }
        $scope.showInfoOpenAIS_EL = false;
        $scope.showInfoOpenGIS_EL = false;

        if (callHistoryService.fromHistory) {
            $scope.link_call_EL = callHistoryService.audioLink;
            $scope.abonentNumber_EL = callHistoryService.phoneNumber;
        }else if(callHistoryService.fromHistory == false &&  $scope.link_call_EL == ""){
            $scope.abonentNumber_EL = "";
        };
        info_account.number_call_EL = $scope.abonentNumber_EL;
        update_info_account = info_account;
        lenght_accounts = 0;
        $scope.show_btn_ping = 1;
        $scope.info_Pings = [];
        arraySistemAIS = {};
        $scope.info_accounts = [];
        $scope.show_info_post_data = false;
        $scope.flag_show_load = true;
        $scope.infoCorrectValue_form_red_EL = false;
        $scope.show_info_post_data_success = false;

        var get_Ststus_base = statusBase.getPings();
        get_Ststus_base.then(function(value){
            console.log(value);
            showAis = value[0].access;
        //СФ00ЭЭ0000001361 300604599 
            if(showAis){
                id = info_account.number;
                $scope.info_account_EL = info_account;
                var getInfo_El=getInfoAccount_EL.getInfo(id);
                getInfo_El.then(function(value) {
                    info = value.body.Object
                    for(let i = 0; i < info.length; i++){
                        info[i].statusShow = false
                        for(let j = 0; j < info[i].PU.length; j++){
                            if(info[i].PU[j].СonnectedASU == false){
                            info[i].PU[j].statusASU = 0; 
                            }else {
                                info[i].PU[j].statusASU = 1; 
                            };
                            
                            for(let d = 0; d < info[i].PU[j].Scale.length; d++){
                                info[i].PU[j].Scale[d].NewIndication = null;
                                info[i].PU[j].Scale[d].zeroCrossing = 0
                                lenght_accounts = lenght_accounts + 1
                            };
                        };
                    };
                    $scope.info_accounts = info  
                    Object.assign(arraySistemAIS, {name: "АИС Восток"});
                    Object.assign(arraySistemAIS, {size: "("+lenght_accounts+")"});
                    if(showAis){
                        var imgBaseRG = "/stilLIB/stilTable/photo/green.png"
                    } else var imgBaseRG ="/stilLIB/stilTable/photo/red.png" ;
                    Object.assign(arraySistemAIS, {imgBase: imgBaseRG});

                    $scope.flag_show_load = false 
                });
            } else {
                $scope.show_btn_ping = 0

                Object.assign(arraySistemAIS, {name: "АИС Восток"});
                Object.assign(arraySistemAIS, {size: "("+"0"+")"});
                if(showAis){
                    var imgBaseRG = "/stilLIB/stilTable/photo/green.png"
                } else var imgBaseRG ="/stilLIB/stilTable/photo/red.png" ;
                Object.assign(arraySistemAIS, {imgBase: imgBaseRG});

                $scope.flag_show_load = false
            }
            
            $scope.info_Pings.push(arraySistemAIS)
        });
        conditionLE ='showElementEl'
        conenectSockAll();
    });
};
//Скрывать раскрывать приборы учета
$scope.changeStatus = function(info_account){
    info_account.statusShow = !info_account.statusShow
}
//++
//Галочка количества заполненых приборов учета
$scope.check_fullness = function(pu){
    count_full = 0
    count_zero = 0
    for(let j = 0; j < pu.length; j++){
        for(let d = 0; d < pu[j].Scale.length; d++){
            if(pu[j].Scale[d].NewIndication != "" && pu[j].Scale[d].NewIndication != null){
                count_full = count_full + 1;
            } else {
                count_zero = count_zero + 1;
            };
        };
    };
    if (count_full - count_zero == count_full) {
        return "/stilLIB/stilTable/photo/green.png"
    } else if (count_full != 0 ) {
        return "/stilLIB/stilTable/photo/yellow.png"
    } else {
        return "/stilLIB/stilTable/photo/clear.png"
    };
};
//++
//АУСКЭ
$scope.ausku_img = function(СonnectedASU){
    if(СonnectedASU == false){
        return "/stilLIB/stilTable/photo/green.png"
    } else return "";
};
//++
// Стили динаметческие
$scope.tittleNameInputRed_El = function(newValue, oldValue, zero){    
    if(newValue != null && newValue != ""){
        if (zero == 0 || zero == null){
            if (oldValue > Number(newValue.replace(',', '.')) && Number(newValue.replace(',', '.')) != 0){
                return "redinput"
            } return "";
        };
    }else return "";
};
// Общие функции для nameBack_Consumption_EL и colorBack_Consumption_EL

function get_number_month(last_data){
    data = new Date();

    month = (data.getMonth()+1) - (last_data.getMonth()+1);
    year = data.getFullYear() - last_data.getFullYear();
    all_month = month + (year*12);

    //console.log(all_month)
    return all_month; 
};

function get_percent(scale, date){
    if (scale.zeroCrossing == 0 ) {
        if(scale.Indication > scale.NewIndication.replace(',', '.')){
            return "";
        };
        var value = Number((scale.NewIndication.replace(',', '.')) - Number(scale.Indication))/Number(date);   
    } else {
        var numnerMax = "";
        for(let i = 0; i < scale.ScaleSignificance; i++){
            numnerMax = numnerMax + "9";
        }; 
        var value = (1 + Number(numnerMax) + Number(scale.NewIndication.replace(',', '.')) - Number(scale.Indication))/Number(date);
    }; 
    
    if (value == 0 || (value - scale.LastConsumption) < 0){
        return 0;   
    }else{ 
        return ((value - scale.LastConsumption)/scale.LastConsumption)*100;
    };
};
//+++
$scope.nameBack_Consumption_EL = function(scale){
    if(scale.NewIndication != 0 && scale.NewIndication != null && scale.NewIndication != "" && 
    scale.LastConsumption != "" && scale.LastConsumption != null){

        date = get_number_month(new Date(scale.IndicationDate));
        procent = get_percent(scale, date);

        if(procent === ""){
            return ""
        };

        if(procent < 25 && procent >= 0){
            return ""; 
        } else if(25 <= procent && procent <= 50 ){
            return "Превышение среднемесячного расхода более 25%";
        } else  return "Превышение среднемесячного расхода более 50%";
    } else return "";  
};
//TODO исправить парметры приходящие 
$scope.colorBack_Consumption_EL = function(scale){
    if(scale.NewIndication != 0 && scale.NewIndication != null && scale.NewIndication != "" && 
    scale.LastConsumption != "" && scale.LastConsumption != null){

        date = get_number_month(new Date(scale.IndicationDate));
        procent = get_percent(scale, date);

        if(procent === ""){
            return ""
        };

        if(procent < 25 && procent >= 0){
            return "greenAverage"; 
        } else if(25 <= procent && procent <= 50 ){
            return "yellowAverage";
        } else  return "redAverage";
    } else return "";
};

$scope.colorBack_data_El = function(next, last){
    var threeMonth = 86400000 * 3 * 30;

    if (Date.parse(next) < Date.now()) {
        return "red";
    }else if(( Date.parse(next) -  Date.now()) < threeMonth){
        return "yellow";
    } else return "white";
};

$scope.NameBack_data_El = function(next, last){
    var threeMonth = 86400000 * 3 * 30;

    if (Date.parse(next) < Date.now()) {
        return "Срок проверки истек";
    }else if(( Date.parse(next) -  Date.now()) < threeMonth){
        return "Менее 3-х месяцев до проверки";
    } else return "";
};
//++
// Пинг АИС
function info_Ping_ais(){

};
//++
//Передачва показаний
$scope.post_info_accounts = function(info_accounts, number, callCenter){
    $scope.flag_show_load_post = true;
    $scope.show_info_post_data_success = false;
    $scope.show_info_post_data = false;
    $scope.infoCorrectValue_form_red_EL = false;

    data = {
        PhoneNumber: number,
        Link: $scope.link_call_EL,
        IndicationTable:[]
    };
    data_IndicationTable = {
        Scale_ID: null,
        Indication: null,
        ZeroCrossing: null
    };
    correctValue = true

    for(let i = 0; i < info_accounts.length; i++){
        for(let j = 0; j < info_accounts[i].PU.length; j++){
            for(let d = 0; d < info[i].PU[j].Scale.length; d++){
                if(info[i].PU[j].Scale[d].NewIndication != null && info[i].PU[j].Scale[d].NewIndication != ""){
                    if(Number(info[i].PU[j].Scale[d].NewIndication.replace(',', '.')) < info[i].PU[j].Scale[d].Indication && (info[i].PU[j].Scale[d].zeroCrossing == 0 || info[i].PU[j].Scale[d].zeroCrossing == null)){
                        console.log("Меньше предыдущего!")
                        correctValue = false;
                        infoCorrectValue = "Показания не переданы! Введённые показания меньше предыдущих."
                        $scope.flag_show_load_post = false
                        break;
                    };
                };

                if(info[i].PU[j].Scale.length > 1){
                    if((d+1) < info[i].PU[j].Scale.length){
                        if(info[i].PU[j].Scale[d].NewIndication == null || info[i].PU[j].Scale[d].NewIndication == "" || info[i].PU[j].Scale[d+1].NewIndication== null || info[i].PU[j].Scale[d+1].NewIndication == ""){
                            if((info[i].PU[j].Scale[d].NewIndication == null || info[i].PU[j].Scale[d].NewIndication == "") && (info[i].PU[j].Scale[d+1].NewIndication == null || info[i].PU[j].Scale[d+1].NewIndication == "")){
                            } else {
                                //cosnsole.log(info[i].PU[j].NumberPU);
                                correctValue = false;
                                infoCorrectValue = "Показания не переданы! Введены показания не по всем шкалам прибора " + info[i].PU[j].NumberPU
                                $scope.flag_show_load_post = false
                                break;  
                            };   
                        };
                    };
                };

                if(info[i].PU[j].Scale[d].NewIndication != null && info[i].PU[j].Scale[d].NewIndication != ""){
                    data_IndicationTable.Scale_ID = info[i].PU[j].Scale[d].Scale_ID
                    data_IndicationTable.Indication = Number(info[i].PU[j].Scale[d].NewIndication.replace(',', '.'))
                    data_IndicationTable.ZeroCrossing = info[i].PU[j].Scale[d].zeroCrossing

                    data.IndicationTable.push(data_IndicationTable)

                    data_IndicationTable = {
                        Scale_ID: null,
                        Indication: null,
                        ZeroCrossing: null
                    };
                };

            };
        };
    };

    if(data.IndicationTable.length == 0 &&  correctValue == true ){
        correctValue = false;
        infoCorrectValue = "Данные не переданы! Введите хотя бы одно показание.";   
        $scope.flag_show_load_post = false; 
    }

    if(correctValue){
        var post_info_accounts=getInfoAccount_EL.postInfo(data);
        post_info_accounts.then(function(value) {
            $scope.flag_show_load_post = false;
            console.log(value);
            if(value.body.Error == 0){
                $scope.show_info_post_data_success = true;
            } else {
                $scope.info_post_datas = value.body.ErrorDescription;
                $scope.show_info_post_data = true;
            };

        }).catch(function(error) {
            error_post(error)
        });
    }else errorMistakeRed(correctValue, infoCorrectValue);

};

// обработка ошибки
function error_post(data){
    $scope.flag_show_load_post = false;
    $scope.infoCorrectValue_form_red_EL = true;
    $scope.infoCorrectValue_form_EL = data.error;
};

function errorMistakeRed(correctValue, infoCorrectValue){
    if(!correctValue){
        $scope.infoCorrectValue_form_EL = infoCorrectValue;
        $scope.infoCorrectValue_form_red_EL = true;
        correctValue = false;
    };
};

$scope.show_cloese_info_post_data = function(){
    $scope.show_info_post_data = false;
};

$scope.showinfoErrorValue_red_EL = function(){
    $scope.infoCorrectValue_form_red_EL = false;
};

$scope.showinfoSuccessValue_EL = function(){
    $scope.show_info_post_data_success = false;
};
// Таймаут на оповещение
$scope.closeinfoErrorValue_red_EL = function() {
    $timeout(function() {
        $scope.infoCorrectValue_form_red_EL = false;
    }, 30000); 
};

$scope.closeinfoSuccessValue_EL = function() {
    $timeout(function() {
        $scope.show_info_post_data_success = false;
    }, 30000); 
};

$scope.close_cloese_info_post_data = function() {
    $timeout(function() {
        $scope.show_info_post_data = false;
    }, 30000); 
};
//++
//+++

//3 Кнопки для открытие стороних приложений 
function correct_Phone_Number(number){
    if(number == undefined){
        return '';
    } else if(number == "+"){
        return number.slice(2);
    } else if(number == "8"){
        return number.slice(1);
    }else {
        return number;
    }; 
};
// WEB socet
//WEBSOCET
//Paramm
var idVebAIS = null;
var idVebGIS = null;

var socket = null;
var stompClient;

function connectSockJs(){
    if(socket == null){
        socket = new SockJS('/eo-websocket');
        stompClient = Stomp.over(socket);   
    };
};

function disconnectWebSock(){
    stompClient.disconnect();
};
// start fun
function conenectSockAll(){
    if(socket != null){
        disconnectWebSock();
        socket = null;
    };

    connectSockJs();
    stompClient.connect({});
};

function subscribeAll(id){
    stompClient.subscribe('/topic/private-messages/' + id , function (message) {
        if(id.split('/')[0] == "AISul"){
            showMessageAIS_EL(JSON.parse(message.body).content);
        }else if(id.split('/')[0] == "GISul"){
            showMessageGIS_EL(JSON.parse(message.body).content);
        };
    });
};
//++
// AИС кнопки
$scope.openNewWindowAIS_EL = function(info_account){
        idVebAIS = "AISul/" + Date.now();
        subscribeAll(idVebAIS);
        var uid_call_center = info_account.callcenter_id;
        
        console.log($scope.link_call_EL)
        var phoneWhitheoutFirstNumber;
        if(info_account != 0){
            phoneWhitheoutFirstNumber = correct_Phone_Number(info_account.number_call_EL)
        }else phoneWhitheoutFirstNumber = '';
            

        get_window_AIS=getInfoAccount_EL.getNewWindowAIS_EL(info_account.name_full, info_account.number, uid_call_center, phoneWhitheoutFirstNumber, $scope.link_call_EL, idVebAIS);
        get_window_AIS.then(function(value) {
            var url= value.body;
            showMessageAIS_EL("Форма открывается.") 
            window.open(url, "_self");
        }).catch(angular.noop);
};
//AIS
function showMessageAIS_EL(message){
    $timeout(function(){
        $scope.showInfoOpenAIS_EL = true;
        $scope.InfoOpenAIS_EL = message;
    }, 100);
};

$scope.closeInfoOpenAIS_EL = function(){
    $scope.showInfoOpenAIS_EL = false;
};
//++
//+++
// GIS Кнопка
$scope.openNewWindowGIS_EL = function(info_account){

    idVebAIS = "GISul/" + Date.now();
    subscribeAll(idVebAIS);
    
    get_window_AIS=getInfoAccount_EL.getNewWindowGIS_EL(info_account.number_print, info_account.name , idVebAIS);
    get_window_AIS.then(function(value) {
        var url= value.body;
        showMessageGIS_EL("Форма открывается.") 
        window.open(url, "_self");
    }).catch(angular.noop);

};
//GIS
function showMessageGIS_EL(message){
    $timeout(function(){
        $scope.showInfoOpenGIS_EL = true;
        $scope.InfoOpenGIS_EL = message;
    }, 100);
};

$scope.closeInfoOpenGIS_EL = function(){
    $scope.showInfoOpenGIS_EL = false;
};
//++
//+++
// Получение ссылки на запись звонка во время звонка
function get_link_call(login){
    var monitoring = monitoring_call.getCallFast();
    monitoring.then(function(value) {
        for(let i = 0; i < value.length; i++){
            if(value[i].login == login){
                return "http://tmn-vpeov2-01.corp.vostok-electra.ru:8080/audio.html?id=" + value[i].idseance;
            };
        };
    });
};
//+++
})