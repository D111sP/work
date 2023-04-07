app.controller('page', function page( $timeout, callHistoryService, monitoring_call, $http, $q, statusBase, historyCall, createPhone, searchAccountServer, $scope, metSerever, infoServer, $timeout, fioServer, callServer) {
    $scope.$on('searchPhoneNumber', function(event, phoneNumber) {
        condition = 'Table'; 

        $scope.clear_search_window();

        foundAccountByNumber(phoneNumber);
    });
    
    $scope.show_window = {showInfoNumber: false}; 
    $scope.clear_search_window = function(){
        $scope.show_window.showInfoNumber = false; 
        $scope.formData.ls_number = null; 
        $scope.formData.fio = null; 
        $scope.formData.address = null; 
        $scope.formData.phone = null;
        $scope.showTable = false
    };
    function call_clear_search_window(){
        $timeout(function(){
            $scope.clear_search_window()
        }, 100);
    }
    
    $scope.disabledCheckBox = function(name){
        if(name == "ТРИЦ"){
            return true;
        } return false;  
    };

    $scope.connectedASUFun = function(СonnectedASU){
        if(СonnectedASU == 1){
            return "/stilLIB/stilTable/photo/green.png"
        } else return "";
    };

    $scope.imgD = function(imgBase){
        if(imgBase){
            return "/stilLIB/stilTable/photo/green.png";
        } else return "/stilLIB/stilTable/photo/red.png";
    };

    // Стили на таблице
    $scope.maxLengthNumber = function(value, significance, accuracy){
        if(accuracy == 0){
            return significance;
        } else return significance + 1 + accuracy;
    };


    $scope.colorBackName_Consumption = function(nextData, lastDate, oldValue, newValue, averageConsumption, zero, numbetLenght ){
        if(averageConsumption == null || averageConsumption == 0 || averageConsumption == ""){
            return "";
        };
        

       
            if(newValue != 0 && newValue != null && newValue != ""){
                var date = (Date.now() - Date.parse(lastDate))/(1000*60*60*24);

                if (zero == 0 ) {
                    if(oldValue > newValue.replace(',', '.')){
                        return "";
                    };
                    var value = (newValue.replace(',', '.') - oldValue)/date;   
                } else {
                    var numnerMax = "";
                    for(let i = 0; i < numbetLenght; i++){
                        numnerMax = numnerMax + "9";
                    }; 
                    var value = (1 + Number(numnerMax) + Number(newValue.replace(',', '.')) - oldValue)/date;
                }; 

                if (value == 0 || (value - averageConsumption) < 0){
                    var procent = 0;   
                }else{ 
                    var procent = ((value - averageConsumption)/averageConsumption)*100
                };
            
                if(procent < 25 && procent >= 0){
                    return ""; 
                } else if(25 <= procent && procent <= 50 ){
                    return "Превышение среднесуточного расхода более 25%";
                } else  return "Превышение среднесуточного расхода более 50%";
            } else return "";        
      
    };

    $scope.colorBack_Consumption = function(nextData, lastDate, oldValue, newValue, averageConsumption, zero, numbetLenght){
        if(averageConsumption == null || averageConsumption == 0 || averageConsumption == ""){
            return "";
        };
        
        
            if(newValue != 0 && newValue != null && newValue != ""){
                var date = (Date.now() - Date.parse(lastDate))/(1000*60*60*24); 
            
                if (zero == 0 ) {
                    if(oldValue > newValue.replace(',', '.')){
                        return "";
                    };
                    var value = (newValue.replace(',', '.') - oldValue)/date;   
                } else {
                    var numnerMax = "";
                    for(let i = 0; i < numbetLenght; i++){
                        numnerMax = numnerMax + "9";
                    }; 
                    var value = (1 + Number(numnerMax) + Number(newValue.replace(',', '.')) - oldValue)/date;
                }; 
                
                if (value == 0  || (value - averageConsumption) < 0){
                    var procent = 0;   
                }else{ 
                    var procent = ((value - averageConsumption)/averageConsumption)*100
                };
            
                if(procent < 25 && procent >= 0){
                    return "greenAverage"; 
                } else if(25 <= procent && procent <= 50 ){
                    return "yellowAverage";
                } else  return "redAverage";
            } else return "";
    };

    $scope.muoseEnter = function(name){
        $scope.nameBase = name;       
    };
    $scope.muoseLeave = function(){
        $scope.nameBase = "";
    };


    $scope.tittleNameInputRed = function(newValue, oldValue, zero){
       
            if(newValue != null && newValue != ""){
                if (zero == 0 || zero == null){
                    if (oldValue > Number(newValue.replace(',', '.')) && Number(newValue.replace(',', '.')) != 0){
                        return "redinput"
                    } return "";
                };
            }else return "";

    };
    
    $scope.tittleNameInput = function(newValue, oldValue, zero){
        if (zero == 0 || zero == null){    
            if (oldValue > Number(newValue) && Number(newValue) != 0){
                return "Меньше предыдущего!"
            } return "";
        }else return "";
    };

    $scope.colorBack = function(next, last){
        var threeMonth = 86400000 * 3 * 30;

        if (Date.parse(next) < Date.now()) {

            return "red";
            
        //}else if(( Date.parse(next) -  Date.parse(last)) < threeMonth){
        }else if(( Date.parse(next) -  Date.now()) < threeMonth){

            return "yellow";

        } else return "white";

    };

    $scope.colorBackName = function(next, last){
        var threeMonth = 86400000 * 3 * 30;

        if (Date.parse(next) < Date.now()) {

            return "Срок проверки истек";
            
        //}else if(( Date.parse(next) -  Date.parse(last)) < threeMonth){
        }else if(( Date.parse(next) -  Date.now()) < threeMonth){
            return "Менее 3-х месяцев до проверки";

        } else return "";

    };
    //+++
    // Вывод истории
    /*
    var numberPageCall = 0; 
    var totalPageCall = 0;
    $scope.showPagin = false;
   
    $scope.getHistoryCall = function(){
        numberPageCall = 0;
        getHistoryCallFun($scope.accountFio, numberPageCall);
        disabledCall(numberPageCall)
    };

    $scope.downCall = function(){
        if (numberPageCall == 0 || numberPageCall <= 0) {
            numberPageCall = 0;
        } else {
            numberPageCall = numberPageCall - 1;
        };

        getHistoryCallFun($scope.accountFio, numberPageCall);

        disabledCall(numberPageCall);
    };

    $scope.upCall = function(){
        if (numberPageCall + 1 >= totalPageCall) {
            numberPageCall = numberPageCall; 
        } else {
            numberPageCall = numberPageCall + 1;
        }

        getHistoryCallFun($scope.accountFio, numberPageCall);

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
        //console.log(numberPageCall);
        //console.log(totalPageCall);

    };
//+++
*/
//+++   

// WEBSOCET телефония
var socket_Call = null;
var stompClient_Call;
var call_end = false;

/*var closeEventCallback = function(){
    console.log(123)
};*/

var connectCallback =function(frame){
    subscribeAll_Call($scope.accountLogin)
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
        if(message.body != "звонок завершен"){
            call_end = false
            if($scope.abonentNumber != message.body || $scope.show_window.showInfoNumber == false){
                $scope.abonentNumber = message.body;
                var getAccountObj=searchAccountServer.getAccount(0, "", "", "", $scope.abonentNumber);
                getAccountObj.then(function(value) {
                    $scope.booleanConfirm = 1;

                    if(value.content.length > 0){
                        var strAbonentFio = [];
                        
                        for(let j = 0; j < value.content.length; j++){
                            for(let a = 0; a < value.content[j].phones.length; a++){
                                console.log(value.content[j]);
                                if (value.content[j].phones[a].confirm == true){
                    
                                    $scope.booleanConfirm = 0;
                                    strAbonentFio.push(value.content[j].fio);
                                    break;   
                                };

                                console.log(value.content[j].phones);
                            };
                        };
                        $scope.infoBeLSNumber = "";
                        $scope.abonentFio = strAbonentFio.join(); 

                    }else{
                        $scope.booleanConfirm = 1;
                        $scope.infoBeLSNumber = "По номеру телефона ЛС не найдены.";
                        $scope.abonentFio = null;
                        $scope.abonentAdress = null;
                        $scope.abonentAccauntNumber = null;   
                    }; 
                    callHistoryService.clearCallData();
                    $scope.show_window.showInfoNumber = true;
                    foundAccountByNumber($scope.abonentNumber)
                });
            };
        } else if(call_end != true) {
            $scope.abonentNumber = "";
            $timeout(function(){
                $scope.show_window.showInfoNumber = false; 
            }, 100);
            //call_clear_search_window()
            call_end = true
        };
    });
};

conenectSockAll_Call();



//+++
// Алерт окно когда звонит телефон   
    $scope.formData = {};
    objTimeInfo = {
        id:"",
        fio: "",  
        number: "",
        startCallDate: "",
        incomingCallDate: ""
    };
    writeSQL = false;
    var timeIdCall = null;
    var valueCall;
    var valueCallFast;
    var flagWrite = true;
    var flagValueCallEmpty = true;
    var flagSerchPhoneNumber  = true;
    var flagFL = false
//TODO  передалать звонки по этому шаблону
   // getCallFastAndTurn();
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
                    $scope.abonentNumber = "";
                    $scope.abonentFio = "";
                    $scope.showInfoNumber = false;
                    //console.log("Пустая очередь и путсые быстрые звонки");
    
                }else if(valueCall.length != 0 && valueCall[0].idacd.toString().split('')[0] == "5"){
                    flagFL = true
                    callTurn(valueCall);
                    //console.log("Полная очередь и путсые быстрые звонки");
                }; 
            };
            //Быстрые звонки есть или звонко на запись, очеред не известно.
            if(valueCallFast.length != 0 && flagFL && flagWrite){
                callFastOrWtire(valueCallFast);
            }; 
            
            $timeout(getCallFastAndTurn, 2000);
        });
    };
    function callFastOrWtire(value){
        fioWork = $scope.accountLogin;

        for( let i = 0; i < value.length; i++ ){
            var fio3Component = value[i].f + " " + value[i].i + " " + value[i].o;  
            if(fio3Component == fioWork){
                if(value[i].timeFinish == null){
                    $scope.abonentNumber = value[i].anumber;
                    if(flagSerchPhoneNumber){
                        flagSerchPhoneNumber = false;
                        foundAccountByNumber($scope.abonentNumber);
                        $scope.showInfoNumber = true;
                    };
                }else{
                    if (flagWrite){
                            createTimeInfo($scope.abonentNumber, fio3Component, value[i].timeStartTime, value[i].timeFinish);
                            createPhoneFio(objTimeInfo);
                            flagSerchPhoneNumber = true;
                            flagFL = false;
                            flagWrite = false;
                    };
                };
            };
        };
    };


    function callTurn(value){ 
        fioWork = $scope.accountLogin;

        for( let i = 0; i < value.length; i++ ){
            if(value[i].fio == fioWork ){
                $scope.abonentNumber = value[i].abonentNumber;
                
                var getAccountObj=searchAccountServer.getAccount(0, "", "", "", value[i].abonentNumber);
                getAccountObj.then(function(value) {
                    $scope.booleanConfirm = 1;

                    if(value.content.length > 0){
                        var strAbonentFio = [];
                        
                        for(let j = 0; j < value.content.length; j++){
                            for(let a = 0; a < value.content[j].phones.length; a++){
                                console.log(value.content[j]);
                                if (value.content[j].phones[a].confirm == true){
                    
                                    $scope.booleanConfirm = 0;
                                    strAbonentFio.push(value.content[j].fio);
                                    break;   
                                };

                                console.log(value.content[j].phones);
                            };
                        };
                        $scope.infoBeLSNumber = "";
                        $scope.abonentFio = strAbonentFio.join(); 

                    }else{
                        $scope.booleanConfirm = 1;
                        $scope.infoBeLSNumber = "По номеру телефона ЛС не найдены.";
                        $scope.abonentFio = null;
                        $scope.abonentAdress = null;
                        $scope.abonentAccauntNumber = null;   
                    }; 
                });

                $scope.showInfoNumber = true;
            };
        };
    };

// Кнопка закрытия алер окна
    $scope.closeAlert = function(){
        $scope.show_window.showInfoNumber = false; 
    };
///+++

// Временая таблица информации о звонимвшем
    function createTimeInfo(abonentNumber, abonentFio, startCallDate, incomingCallDate, idCallServer){
        if (idCallServer != null) {
            objTimeInfo.id = idCallServer;    
        };
        if (abonentNumber != null) {
            objTimeInfo.number = abonentNumber;    
        };
        if (abonentFio != null) {
            objTimeInfo.fio = abonentFio;    
        }
        if (startCallDate != null) {
            objTimeInfo.startCallDate = startCallDate;    
        };
        if (incomingCallDate != null) {
            objTimeInfo.incomingCallDate = incomingCallDate;        
        };
        //console.log(objTimeInfo);
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
// Кнопка поиска
    $scope.foundAccountByNumber = function (abonentNumber){
        $scope.searchAccount("", "", "", abonentNumber);

        condition = 'Table'; 
    };
//
// Авто поиск
    function foundAccountByNumber(abonentNumber){
        $scope.searchAccount("", "", "", abonentNumber);
        //condition ='ShowElemet';
        //condition = 'Table'; 
    };
    //
//
//Получает ФИО  
    var getAccountFio = fioServer.getFio();
    getAccountFio.then(function(value){
        $scope.accountFio = value;
    });
//+++
//Получает LOGIN
    var getAccountLogin = fioServer.getLogin();
    getAccountLogin.then(function(value){
        $scope.accountLogin = value;
    });
//+++

//Получение лицевого счета 
    numberPage = 0;
    totalPage = 0;
    ls_number = "";
    fio = "";
    adress = "";
    phone = "";
    var valueShowTable = false;


  

    function getAccount (numberPage, ls_number, fio, adress, phone){
        if (ls_number == null) {
            ls_number =""; 
        };

        if (fio == null) {
            fio =""; 
        };

        if (adress == null) {
            adress =""; 
        };

        if (phone == null) {
            phone =""; 
        };
        var getAccountObj=searchAccountServer.getAccount(numberPage, ls_number, fio, adress, phone);
        getAccountObj.then(function(value) {

            $scope.accountServer=value.content;

            console.log($scope.accountServer);
            numberPage = value.number;
            totalPage = value.totalPages;

            disabled(numberPage, totalPage);

            if (value.content.length == 0){
                $scope.showTable = false;
            } else {
                $scope.showTable = true; 
            };
        });
        console.log($scope.accountServer);
    };
//+++


// Переменные    
    $scope.account = null;
    $scope.colorTrue = null;
    $scope.classValue = 0;
    $scope.Classdownload = "fa fa-spinner fa-spin";
    $scope.showTable = false;
    $scope.showWriteMet = 0;
//++
    
//Контролер страниц
    condition = 'Table';

    $scope.setFile = function () {
        if(condition =='Table')
            return './we/table.html';
        else if(condition=='ShowElemet')
            return './we/showElemet.html';
        else if(condition=='ShowInfoCall')
            return './we/showInfoCall.html';
    };

    
//++

$scope.openInfoCall = function(historyCallInfo){
    $scope.historyCallInfonumber = historyCallInfo.number;
    $scope.historyCallInfostartCallDate = historyCallInfo.startCallDate;
    $scope.historyCallInfoincomingCallDate = historyCallInfo.incomingCallDate;
    $scope.historyCallInfofio = historyCallInfo.fio;
    //console.log(historyCall);
    condition = 'ShowInfoCall'; 
};
function loadInfo(){
    $scope.flagShowTable = true;
};
function flagFalseShow(){
    $scope.infoErrorValueAIS = false;
    $scope.infoSuccessValueAIS = false;
    $scope.infoErrorValueTRIC = false;
    $scope.infoSuccessValueTRIC = false;
    $scope.infoCorrectValue_form = "";
    $scope.infoCorrectValue_form_red = false;
    $scope.showDopInfoAISS = false;
    $scope.infoSuccessValueBp = false;
    $scope.infoErrorValueBp = false; 
};
// Открытие окна с информацией и приборами учета 
var ls_Number_tric;
var ls_Number_Bp;
var codeBp;
var flagObnov = true;
var flagApiBp = true;



$scope.openNewWindowPIR = function(){
    get_window_PIR=metSerever.getNewWindowPIR($scope.accountOpenModel.ls_number);
    get_window_PIR.then(function(value) {
        window.open(value.body, "_blank");
    });
}

$scope.showInfoOpenAIS = false;
$scope.InfoOpenAIS= "";
$scope.showInfoOpenGIS = false;
$scope.InfoOpenGIS = "";

//but show AIS
getMail();
function getMail(){
    $scope.mailOperator;

    get_mail = fioServer.getMail();
    get_mail.then(function(value){
        $scope.mailOperator = value;
    }).catch(angular.noop);
};
$scope.openNewWindowAIS = function(){
    idVebAIS = "AIS/" + Date.now();
    subscribeAll(idVebAIS);
    var sourceInfoCallCenter = "Call-центр (Единое окно)";

    var phoneWhitheoutFirstNumber;
    if($scope.metObjs.length != 0){
        if($scope.metObjs[0].numberPhone == undefined){
            phoneWhitheoutFirstNumber = '';
        } else if($scope.metObjs[0].numberPhone[0] == "+"){
            phoneWhitheoutFirstNumber = $scope.metObjs[0].numberPhone.slice(2);
        } else if($scope.metObjs[0].numberPhone[0] == "8"){
            phoneWhitheoutFirstNumber = $scope.metObjs[0].numberPhone.slice(1);
        }else {
            phoneWhitheoutFirstNumber = $scope.metObjs[0].numberPhone;
        }; 
    }else phoneWhitheoutFirstNumber = $scope.account.numberPhone;
    

    get_window_AIS=metSerever.getNewWindowAIS($scope.accountOpenModel.ls_number, $scope.mailOperator, phoneWhitheoutFirstNumber ,sourceInfoCallCenter, idVebAIS, $scope.link_call);
    get_window_AIS.then(function(value) {
        var url= value.body;
        showMessageAIS("Форма открывается.") 
        window.open(url, "_self");
    }).catch(angular.noop);
};

//But show GIS
$scope.openNewWindowGIS = function(){
    idVebGIS = "GIS/" + Date.now();
    subscribeAll(idVebGIS);
    get_window_GIS=metSerever.getNewWindowGIS($scope.accountOpenModel.ls_number, idVebGIS);
    get_window_GIS.then(function(value) {
        var url= value.body ;
        showMessageGIS("Форма открывается.")
        window.open(url, "_self");
    }).catch(angular.noop);
};


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
        if(id.split('/')[0] == "AIS"){
            showMessageAIS(JSON.parse(message.body).content);
        };
        if(id.split('/')[0] == "GIS"){
            showMessageGIS(JSON.parse(message.body).content);
        };
    });
};

//AIS
function showMessageAIS(message){
    $timeout(function(){
        $scope.showInfoOpenAIS = true;
        $scope.InfoOpenAIS = message
    }, 100);
};

$scope.closeInfoOpenAIS = function(){
    $scope.showInfoOpenAIS = false;
};

//GIS

function showMessageGIS(message){
    $timeout(function(){
        $scope.showInfoOpenGIS = true;
        $scope.InfoOpenGIS = message;  
    }, 100);
};

$scope.closeInfoOpenGIS = function(){
    $scope.showInfoOpenGIS = false;
};

//+++
$scope.update = function(){
    $scope.openModal($scope.accountOpenModel);
    //flagObnov = false;
};
$scope.openModal = function (account){
    var monitoring = monitoring_call.getCallFast();
    monitoring.then(function(value) {
        $scope.link_call = "";
        for(let i = 0; i < value.length; i++){
            if(value[i].login ==  $scope.accountLogin){
                $scope.link_call = "http://infinity.vostok-electra.ru:10080/stat/getrecordedfile/?IDSeance=" + value[i].idseance + "&codec=mp3";
                break;
            };
        }
    $scope.showInfoOpenAIS = false;
    $scope.InfoOpenAIS= "";
    $scope.showInfoOpenGIS = false;
    $scope.InfoOpenGIS = "";
    whoOpenWindowAIS = false;
    whoOpenWindowGIS = false; 

    if (callHistoryService.fromHistory) {
        $scope.link_call= callHistoryService.audioLink;
        $scope.abonentNumber = callHistoryService.phoneNumber;
    }else if(callHistoryService.fromHistory == false &&  $scope.link_call == ""){
        $scope.abonentNumber = "";
    };
    
    $scope.formInfoBpname =  "";
    $scope.formInfoBplsnumber = "";
   // console.log($scope.$destroy());
    if(!flagObnov){
        return false;
    };
    $scope.accountOpenModel = account;
    var ls_Number_tric = "";
    var ls_Number_Bp = account.ls_number;
    //$scope.ls_Number_Bp_chech = account.ls_number;
    $scope.sistemObjs = [];
    $scope.showInfoAISTRIC = [];
    $scope.metObjs = [];
    loadInfo();
    flagFalseShow();
    $scope.account = account;
    $scope.account.numberPhone = $scope.abonentNumber
    condition = 'ShowElemet';
    console.log(account);
// idAccount = String(account.obj_id);
// console.log(account.ls_number);
    

    //Статус баз
    for (let i = 0; account.outerLS.length > i; i++){
        if(account.outerLS[i].outerName === "ОАО ТРИЦ"){
            ls_Number_tric = account.outerLS[i].outerNumber;
        };
    };
    if( $http.pendingRequests.length > 0){
        for(let i = 0; i < $http.pendingRequests.length; i++){
            if ($http.pendingRequests[i].cancel) {
                $http.pendingRequests[i].cancel.resolve(true);
            };
        };
    };


    var get_Ststus_base = statusBase.getPings();
    get_Ststus_base.then(function(value){
        var lengthLs = 0;
        console.log(value);

        var showAis = value[0].access;
        var showTric = value[1].access;
        var showBp = value[2].access;
        //var showAis = false;
        //var showTric = false; 
        //var showBp = true;
        /*if(flagApiBp){
            flagApiBp = false;
            if(showBp && ls_Number_Bp != "" && ls_Number_Bp != null){
                get_Met_Bp=metSerever.getMetBp(ls_Number_Bp);
                get_Met_Bp.then(function(value) {
                    if(value != true){
                        if(value !="Лицевой счет не относится к Курганской области"){
                            if(value.body.lsnumber ==  $scope.ls_Number_Bp_chech){
                                lengthLs = showBpTable(value, ls_Number_Bp, $scope.metObjs);   
                                
                                
                                var arraySistemBp = {};
                                if(ls_Number_Bp != null && ls_Number_Bp != ""){
                                    Object.assign(arraySistemBp, {name: "БП"});
                                    Object.assign(arraySistemBp, {nameHooks: "(БП)"});
                                    Object.assign(arraySistemBp, {size: "(" + lengthLs + ")"});
                                    Object.assign(arraySistemBp, {numberLs: value.body.code});
                                    if(showBp){
                                        var imgBaseRG = "/stilLIB/stilTable/photo/green.png"
                                    } else var imgBaseRG ="/stilLIB/stilTable/photo/red.png" ;
                                    Object.assign(arraySistemBp, {imgBase: imgBaseRG});
                                };
                                $scope.showInfoAISTRIC.push(arraySistemBp); 
                            }
                        
                            $scope.flagShowTable = false;
                            flagApiBp = true;
                        };
                    };
                },function error(value) {
                    console.log("тест ошибки" + value);
                    flagApiBp = true;
                    $scope.flagShowTable = false;
                });
            };
        };*/
        if(showTric && ls_Number_tric != "" && ls_Number_tric != null){
            //TRIC 
            var get_Met_Tric=metSerever.getMetTric(ls_Number_tric);
            get_Met_Tric.then(function(value) {
                return value;
            }).catch(angular.noop);
        };

        if(showAis){
            //AIS
            var get_Met_AIS=metSerever.getMet1(account.ls_number);
            get_Met_AIS.then(function(value) {    
                return value;
            }).catch(angular.noop); 
        };

        if(showBp){
            //BP
            get_Met_Bp=metSerever.getMetBp(ls_Number_Bp);
            get_Met_Bp.then(function(value) {
                return value;
            }).catch(angular.noop);
        };
        $q.all([get_Met_AIS, get_Met_Tric, get_Met_Bp]).then(function(result){
            console.log(result);
            var arraySistemAIS ={};
            var arraySistemTRIC = {};
            var arraySistemBP = {};

            if(account.ls_number != null || account.ls_number != ""){
                Object.assign(arraySistemAIS, {name: "АИС Восток"});
                Object.assign(arraySistemAIS, {nameHooks: "(АИС Восток)"});
                Object.assign(arraySistemAIS, {size: "("+0+")"});
                Object.assign(arraySistemAIS, {numberLs: account.ls_number});
                if(showAis){
                    var imgBaseRG = "/stilLIB/stilTable/photo/green.png"
                } else var imgBaseRG ="/stilLIB/stilTable/photo/red.png" ;
                Object.assign(arraySistemAIS, {imgBase: imgBaseRG});
            };
    
            if(ls_Number_tric != null && ls_Number_tric != ""){
                Object.assign(arraySistemTRIC, {name: "ТРИЦ"});
                Object.assign(arraySistemTRIC, {nameHooks: "(ТРИЦ)"});
                Object.assign(arraySistemTRIC, {size: "("+0+")"});
                Object.assign(arraySistemTRIC, {numberLs: ls_Number_tric});
                if(showTric){
                    var imgBaseRG = "/stilLIB/stilTable/photo/green.png"
                } else var imgBaseRG ="/stilLIB/stilTable/photo/red.png" ;
                Object.assign(arraySistemTRIC, {imgBase: imgBaseRG});
            };

            if(ls_Number_Bp != null && ls_Number_Bp != "" && result[2].error != "Лицевой счет "+ls_Number_Bp+" не относится к Курганской области!" ){
                Object.assign(arraySistemBP, {name: "БП"});
                Object.assign(arraySistemBP, {nameHooks: "(БП)"});
                Object.assign(arraySistemBP, {size: "(" + 0 + ")"});
                //Object.assign(arraySistemBP, {numberLs: result[2].body.code});
                Object.assign(arraySistemBP, {numberLs: result[2].code});
                if(showBp){
                    var imgBaseRG = "/stilLIB/stilTable/photo/green.png"
                } else var imgBaseRG ="/stilLIB/stilTable/photo/red.png" ;
                Object.assign(arraySistemBP, {imgBase: imgBaseRG});
            };

            if(showAis){
                var ais = aisRefact(account, result[0]);
                if (ais != null && showAis) {
                    $scope.metObjs.push(...ais[0]);
                };
            };
            if(showTric){
                var tric = tricRefact(account, result[1], ls_Number_tric);   
                if (tric != null && showTric) {
                    $scope.metObjs.push(...tric[0]);
                };
            };

            if(showBp ){
                var bp = bpRefact(result[2], ls_Number_Bp,  $scope.metObjs);
            };

            
            if(ais != undefined ){
                if(ais[1] != null && ais[1] != undefined){
                    arraySistemAIS.size =  ais[1].size;
                };
            };

            if(tric != undefined){
                if(tric[1] != null && tric[1] != undefined){
                    arraySistemTRIC.size =  tric[1].size;
                };
            };

            if(bp != undefined){
                if(bp[1] != null && bp[1] != undefined){
                    arraySistemBP.size =  bp[1].size;
                };
            };
           
            if (ais != null && showAis) {
               // $scope.metObjs.push(...ais[0]);
                $scope.sistemObjs.push(ais[1]);
            };

            if (tric != null && showTric) {
               // $scope.metObjs.push(...tric[0]);
                $scope.sistemObjs.push(tric[1]);
            };

            if(bp != null && showBp){
                $scope.metObjs.push(...bp[0]);
                //$scope.sistemObjs.push(tric[1]);
            };
        
            $scope.showInfoAISTRIC.push(arraySistemAIS);
            $scope.showInfoAISTRIC.push(arraySistemTRIC);
            $scope.showInfoAISTRIC.push(arraySistemBP); 

            
            console.log($scope.showInfoAISTRIC);
            console.log($scope.metObjs);
            flagObnov = true;
            //$scope.sistemObjs.push(tric[1]); 
            //if(!showBp || ls_Number_Bp == ""){
                $scope.flagShowTable = false;
           // };
        });
    });

  //console.log($scope.sistemObj);
  conenectSockAll();
  $scope.ls_Number_Bp_chech = account.ls_number;
});
};

function bpRefact(value, ls_Number_Bp, metObj){
    if(value.error == "Лицевой счет "+ls_Number_Bp+" не относится к Курганской области!"){
        return null;
    };
    console.log(metObj);
    var lengthLs = 0;
    var arrayNumberPu = []
    for(let i = 0; i < metObj.length; i++){
        arrayNumberPu.push(metObj[i].NumberPU);
    };
    var objBp = {
        SubscriberAddress: null,
        ServiceName: null,
        IndicationDate: null,
        DateNextVerifiedPU: null,
        MyvalueNew: null, 
        PlaceInstallation: null,
        ScaleName: null,
        NumberPU: null,
        id: null,
        Indication: null,
        nameAIS: null,
        Price: null,
        source: null,
        unit: null,
        ScaleSignificance: null, 
        ScaleAccuracy: null,
        ls: null,
        service_parameters: null, 
        entity_guid: null,
        guid_package: null,
        codeBp: null,
        MyzeroCrossing:null
    };
    var arrayLsNumber = [];
    var arrayBp = [];
    var lengthObjBp;
    if(value.body.meter_package.meter_set == null){
        lengthObjBp = 0;
    }else{
        lengthObjBp = value.body.meter_package.meter_set.length;
    }
    for(let i = 0; i < lengthObjBp; i++){
        if(!arrayNumberPu.includes(value.body.meter_package.meter_set[i].meter_parameters.meter_number)){
            arrayLsNumber.push(value.body.meter_package.meter_set[i].ls.ls_num);
            objBp.SubscriberAddress = value.body.meter_package.address_string;
            objBp.ServiceName =  value.body.meter_package.meter_set[i].service_parameters.service_name;
            objBp.id =  null;
            objBp.DateNextVerifiedPU =  value.body.meter_package.meter_set[i].relevant_date;
            objBp.IndicationDate =  value.body.meter_package.meter_set[i].meter_parameters.meter_previous_reading_date;
            objBp.NumberPU =  value.body.meter_package.meter_set[i].meter_parameters.meter_number;
            objBp.MyvalueNew = null;
            objBp.Indication =  value.body.meter_package.meter_set[i].meter_parameters.meter_previous_reading;
            objBp.ScaleName =  value.body.meter_package.meter_set[i].meter_parameters.meter_location_scale;
            objBp.PlaceInstallation =  null; 
            objBp.nameAIS =  "БП";
            objBp.Ls_number = ls_Number_Bp;
            objBp.numberPhone = $scope.abonentNumber;
            objBp.source = null;
            objBp.unit = null;
            objBp.ScaleSignificance = value.body.meter_package.meter_set[0].value_requirement.length;
            objBp.ScaleAccuracy = value.body.meter_package.meter_set[0].value_requirement.accuracy;
            objBp.ls = value.body.meter_package.meter_set[i].ls;
            objBp.service_parameters = value.body.meter_package.meter_set[i].service_parameters;
            objBp.entity_guid = value.body.meter_package.meter_set[i].entity_guid;
            objBp.guid_package = value.body.meter_package.status.guid_package;
            objBp.codeBp = value.code;
            arrayBp.push(objBp);
            
            objBp = {
                SubscriberAddress: null,
                ServiceName: null,
                DateLastVerifiedPU: null,
                DateNextVerifiedPU: null,
                MyvalueNew: null, 
                PlaceInstallation: null,
                ScaleName: null,
                NumberPU: null,
                id: null,
                Indication: null,
                nameAIS: null,
                Price: null,
                ModelTric: null,
                numberPhone: null,
                source: null,
                ScaleSignificance: null, 
                ScaleAccuracy: null,
                ls: null,
                service_parameters: null,
                entity_guid: null,
                guid_package: null,
                codeBp: null,
                MyzeroCrossing:null
            };

            lengthLs++;
        };
    };
    if(arrayLsNumber.length > 0){
        $scope.formInfoBpname =  "Лицевые счета услуг из БП:";
        $scope.formInfoBplsnumber = arrayLsNumber.join();
    }else if (arrayLsNumber.length == 0){
        $scope.formInfoBpname =  "";
        $scope.formInfoBplsnumber = "";
    };
    var arraySistem = {};
    Object.assign(arraySistem, {size: "("+lengthLs+")"});
    return [arrayBp, arraySistem];
};

function aisRefact(account, value){
     if (value.body.Answer.length > 0) {
        var arraySistem = {};
        Object.assign(arraySistem, {size: "("+value.body.Answer.length+")"});
    };
    
    if(value == undefined){
        return null;
    };
   
     for(let i = 0; i < value.body.Answer.length; i++){
        Object.assign(value.body.Answer[i], {MyvalueNew: null});
        Object.assign(value.body.Answer[i], {MyzeroCrossing: 0});
        Object.assign(value.body.Answer[i], {nameAIS: "АИС Восток"});
        Object.assign(value.body.Answer[i], {numberPhone: $scope.abonentNumber});
        Object.assign(value.body.Answer[i], {asuis: value.body.Answer[i].СonnectedASU});
        Object.assign(value.body.Answer[i], {source: "vostok"});
        Object.assign(value.body.Answer[i], {unit: null});
     };
    //console.log(value.body.Answer);
    var arrayAnswer = [value.body.Answer, arraySistem];
    return arrayAnswer;
};

function tricRefact(account, value, ls_Number_tric){
    if(value == undefined){
        return null;
    };
    var arrayTrci = [];
    var objTric = {
        SubscriberAddress: null,
        ServiceName: null,
        IndicationDate: null,
        DateNextVerifiedPU: null,
        MyvalueNew: null, 
        PlaceInstallation: null,
        ScaleName: null,
        NumberPU: null,
        id: null,
        Indication: null,
        nameAIS: null,
        Price: null,
        ModelTric: null,
        source: null,
        unit: null

    };

        //console.log(value);
        $scope.tricInfo = [];
        for(let j = 0; j < value.body.groups.length; j++){
            for(let a = 0; a < value.body.groups[j].counter.length; a++){
                if(value.body.groups[j].counter[a].source == "vostok"){
                    console.log("Задвоение есть.");
                    $scope.tricInfo.push(value.body.groups[j].counter[a].id);
                    continue;
                };
                objTric.SubscriberAddress = value.body.address;
                objTric.ServiceName =  value.body.groups[j].name;
                objTric.id =  value.body.groups[j].counter[a].id;
                objTric.DateNextVerifiedPU =  value.body.groups[j].counter[a].next_verification_date;
                objTric.IndicationDate =  value.body.groups[j].counter[a].readings.date;
                objTric.NumberPU =  value.body.groups[j].counter[a].serial;
                objTric.MyvalueNew =  value.body.groups[j].counter[a].readings.current;
                objTric.Indication =  value.body.groups[j].counter[a].readings.previous;
                objTric.ScaleName =  value.body.groups[j].counter[a].service;
                objTric.PlaceInstallation =  value.body.groups[j].counter[a].place; 
                objTric.ModelTric =  value.body.groups[j].counter[a].model
                objTric.nameAIS =  "ТРИЦ";
                objTric.Ls_number = ls_Number_tric;
                objTric.numberPhone = $scope.abonentNumber;
                objTric.source = value.body.groups[j].counter[a].source;
                objTric.unit = value.body.groups[j].counter[a].unit;
                arrayTrci.push(objTric);
                
                objTric = {
                    SubscriberAddress: null,
                    ServiceName: null,
                    DateLastVerifiedPU: null,
                    DateNextVerifiedPU: null,
                    MyvalueNew: null, 
                    PlaceInstallation: null,
                    ScaleName: null,
                    NumberPU: null,
                    id: null,
                    Indication: null,
                    nameAIS: null,
                    Price: null,
                    ModelTric: null,
                    numberPhone: null,
                    source: null 
        
        
                };
            }
        };
        
        if (value.body.groups.length > 0) {
            var arraySistem = {};
            Object.assign(arraySistem, {size: "("+arrayTrci.length+")"});
        };
        var arrayAnswer = [arrayTrci, arraySistem];
        return arrayAnswer;
};

//+++

// Кнопки на форме Назад Записать И ЗаписатьИЗакртыь

    function close (){
        condition = 'Table';
    };

    $scope.back = function(){
        flagApiBp = true;

        if(socket != null){
            disconnectWebSock();
            socket = null;
        };

        flagFalseShow();
        close();
    };

    $scope.writeDown = function(infoObj, metObjs){
        flagFalseShow();
        writeObjsMet(metObjs)
        $scope.showWriteMet = 1;
    };

    $scope.writeDownAndClose = function(infoObj,metObjs){
        close();
    };
    function writeObjsMet(metObjs) {
        var IndicationTable =[];
        var arrayTric = [];
        console.log(metObjs);
        var met_data_obj_tric = {
            service: null
        };
        let met_data_obj = {
            Recalc: 1,
            Operator: $scope.accountFio,
            PhoneNumber:metObjs[0].numberPhone,
            Link: $scope.link_call
        };
        var met_data_obj_bp = {
            indication_package:{
                guid_package: null,
                indications_datetime: null,
                contact:{
                    "email":"paysys@mail.ru",
                    "phone":"7(912)570-99-00"
                },
                indication_set:[]
            }
        };
        var checkValue = 0;

        var correctValue = true;
        var infoCorrectValue;

        for(let i = 0; i < metObjs.length; i++){
            if(metObjs[i].MyvalueNew != null && metObjs[i].MyvalueNew != ""){
                if(metObjs[i].MyvalueNew.replace(',', '.') < metObjs[i].Indication && (metObjs[i].MyzeroCrossing == 0 || metObjs[i].MyzeroCrossing == null)){
                    correctValue = false;
                    infoCorrectValue = "Показания не переданы! Введённые показания меньше предыдущих." 
                    break;
                };
            };
            for(let j = i + 1; j < metObjs.length; j++ ){
                if(metObjs[i].NumberPU == metObjs[j].NumberPU){
                    if(metObjs[i].MyvalueNew == null || metObjs[i].MyvalueNew == "" || metObjs[j].MyvalueNew == null || metObjs[j].MyvalueNew == ""){
                        if((metObjs[i].MyvalueNew == null || metObjs[i].MyvalueNew == "") && (metObjs[j].MyvalueNew == null || metObjs[j].MyvalueNew == "")){
                        } else {
                            correctValue = false;
                            infoCorrectValue = "Показания не переданы! Введены показания не по всем шкалам прибора " + metObjs[i].NumberPU;
                            break;  
                        };   
                    }; 
                }
            };
            if(metObjs[i].nameAIS == "АИС Восток"){
                if(metObjs[i].MyvalueNew != null && metObjs[i].MyvalueNew != ""){
                                        
                    if (metObjs[i].MyzeroCrossing == null || metObjs[i].MyzeroCrossing == 0 ) {
                        checkValue = 0;    
                    } else {
                        checkValue = 1; 
                    };

                    let IndicationTableObj = {
                        Indication: metObjs[i].MyvalueNew.replace(',', '.'),
                        ZeroCrossing: checkValue,
                        ScaleID: metObjs[i].ScaleID
                    };
                    IndicationTable.push(IndicationTableObj);
                } else {
                    //$scope.showWriteMet = 0
                    
                }; 
            } else if (metObjs[i].nameAIS == "ТРИЦ") {
                if(metObjs[i].MyvalueNew != null && metObjs[i].MyvalueNew != ""){
                    var objtric = {
                        "id":metObjs[i].id,
                        "value": metObjs[i].MyvalueNew.replace(',', '.')
                    }
                    ls_Number_tric = metObjs[i].Ls_number;
                    arrayTric.push(objtric);
                };
            }else if(metObjs[i].nameAIS == "БП"){
                if(metObjs[i].MyvalueNew != null && metObjs[i].MyvalueNew != ""){

                    if (metObjs[i].MyzeroCrossing == null || metObjs[i].MyzeroCrossing == 0 ) {
                        checkValue = false;    
                    } else {
                        checkValue = true; 
                    };

                    met_data_obj_bp.indication_package.guid_package = metObjs[i].guid_package;
                    met_data_obj_bp.indication_package.indications_datetime = new Date();
                    codeBp = metObjs[i].codeBp;

                    var objBpPost = {
                        entity_guid:metObjs[i].entity_guid,
                        ls:metObjs[i].ls,
                        service_parameters:metObjs[i].service_parameters,
                        meter_parameters:{
                            meter_number:metObjs[i].NumberPU,
                            meter_location_scale:metObjs[i].ScaleName
                        },
                        value:metObjs[i].MyvalueNew,
                        zero_crossing:checkValue
                    };
                    met_data_obj_bp.indication_package.indication_set.push(objBpPost);
                    //console.log(met_data_obj_bp);
                };
            };
            
        };
        if(IndicationTable.length == 0 && arrayTric.length == 0 && correctValue == true && met_data_obj_bp.indication_package.indication_set.length == 0){
            correctValue = false;
            infoCorrectValue = "Данные не переданы! Введите хотя бы одно показание.";    
        }
        //console.log(IndicationTable);
        Object.assign(met_data_obj_tric, {service : arrayTric});
        Object.assign(met_data_obj, {IndicationTable : IndicationTable});
        
        if(correctValue) {
            if((ls_Number_tric != undefined) && correctValue){
                var postPromiseMetTric=metSerever.postMetTric(met_data_obj_tric, ls_Number_tric);
                postPromiseMetTric.then(function(value) {
                    return value;
                }).catch(function(error) {
                    error_post(error)
                });
            };
            if(correctValue){
                var postPromiseMetAis=metSerever.postMet(met_data_obj);
                postPromiseMetAis.then(function(value) {
                    return value;
                }).catch(function(error) {
                    error_post(error)
                });
            };
            if(met_data_obj_bp.indication_package.indication_set.length != 0){
                var postPromisMetBp=metSerever.postMetBp(met_data_obj_bp, codeBp, met_data_obj_bp.indication_package.guid_package);
                postPromisMetBp.then(function(value) {
                    console.log(value);
                    /*if(value.body.status_package.status.text == ""){
                        $scope.infoSuccessValueBp = true;
                    }else {
                        $scope.infoErrorValueBp = true;
                        $scope.infoAnswerBp = value.body.status_package.status.text
                    };*/
                    return value;
                }).catch(function(error) {
                    error_post(error)
                });
            };
        };

        $q.all([postPromiseMetAis, postPromiseMetTric, postPromisMetBp]).then(function(value){
            console.log(value);
            if(value[0] != undefined){
                var errorAIS_param = errorAIS(value[0], met_data_obj);
                showDopInfoAIS(value[0]);
                showErorAIS(errorAIS_param);
            };

            if(value[1] != undefined){
                if(ls_Number_tric != undefined){
                    var errorTRIC_param = errorTRIC(value[1]); 

                    if(met_data_obj_tric.service.length != 0){ 
                        if(ls_Number_tric != undefined){
                            showErrorTRIC(errorTRIC_param);
                        };
                    }; 
                };
            };
            if(value[2] != undefined){
                if(value[2].body.status_package.status.text == ""){
                    $scope.infoSuccessValueBp = true;
                }else {
                    $scope.infoErrorValueBp = true;
                    $scope.infoAnswerBp = value.body.status_package.status.text
                };
            };

            errorMistakeRed(correctValue, infoCorrectValue);
            $scope.showWriteMet = 0;
            ls_Number_tric = undefined;
        });

    };
    // обработка ошибки
    function error_post(data){
        $scope.showWriteMet = 0;
        $scope.infoCorrectValue_form_red = true
        $scope.infoCorrectValue_form = data.error
    };
    // Обработка алертов с ошибками
    function errorMistakeRed(correctValue, infoCorrectValue){
        if(!correctValue){
            $scope.infoCorrectValue_form = infoCorrectValue;
            $scope.infoCorrectValue_form_red = true;
            correctValue = false;
        };

    };

    function showDopInfoAIS(value){
        if(value.body.Answer.length > 0){
            $scope.dopInfoAISS = value.body.Answer[0].Details;
            $scope.dopInfoAISBalance = value.body.Answer[0].Balance;
            $scope.showDopInfoAISS = true;
        }
    };

    function showErorAIS(errorAIS_param){
        if(typeof(errorAIS_param) == "object"){
            console.log(errorAIS_param);
            $scope.errorsAIS_form = errorAIS_param;
            $scope.infoErrorValueAIS = true;
        }else {
            if(errorAIS_param == true){
                $scope.infoSuccessValueAIS = true;   
            };
        };
        console.log(typeof(errorAIS_param));
    };

    function showErrorTRIC(errorTRIC_param){
        $scope.errorsTRIC_form = errorTRIC_param;
        $scope.infoErrorValueTRIC = true;
    };

    function errorAIS(value, met_data_obj){
        console.log(value);
        if(value.body.Error == 0 ){
            return true;
        };
        if(value.body.ErrorDescription.length == 0 ){
            return false;
        };
        if(value.body.Error > 0 ){
            arrayErrors = [];
            for( let a = 0; a < value.body.ErrorDescription.length; a++){     
                arrayErrors.push(value.body.ErrorDescription[a].Description);
            };
            return arrayErrors;
        };
    };

    function errorTRIC(value){
        console.log(value);
        arrayErrors = [];
        var numberPUArray = [];
        console.log($scope.tricInfo); 
        
        console.log(numberPUArray);

        for(let i = 0; i < value.body.length; i++){
            var numberPUArray = [];
            if(Object.entries(value.body[i])[0][1].status != "OK"){
                var textError = Object.entries(value.body[i])[0][1].status ;
                var stratIndex = textError.indexOf("[");
                var endIndex = textError.indexOf("]");
                var numberPUString =textError.slice(stratIndex+1, endIndex);
                numberPUArray.push(...JSON.parse("[" + numberPUString + "]"));
            } else  numberPUArray.push(1);

            for(let j = 0; j < numberPUArray.length; j++){

                if(!$scope.tricInfo.includes(numberPUArray[j])){

                    if (Object.entries(value.body[i])[0][0] == "m1") {
                        if(Object.entries(value.body[i])[0][1].apply == true && Object.entries(value.body[i])[0][1].status == "OK"){
                            arrayErrors.push("Показания Электричества переданы успешно"); 
                        }else arrayErrors.push("Показания Электричества переданы с ошибкой: " + Object.entries(value.body[i])[0][1].status);
                    } else if(Object.entries(value.body[i])[0][0] == "s11"){             
                        if(Object.entries(value.body[i])[0][1].apply == true && Object.entries(value.body[i])[0][1].status == "OK"){
                            arrayErrors.push("Показания Центрального отопления переданы успешно");
                        }else arrayErrors.push("Показания Центрального отопления переданы с ошибкой: " + Object.entries(value.body[i])[0][1].status);
                    } else if(Object.entries(value.body[i])[0][0] == "s8" || Object.entries(value.body[i])[0][0] == "s249"){
                        if(Object.entries(value.body[i])[0][1].apply == true && Object.entries(value.body[i])[0][1].status == "OK"){
                            arrayErrors.push("Показания Горячей воды переданы успешно");
                        }else arrayErrors.push("Показания Горячей воды переданы с ошибкой: " + Object.entries(value.body[i])[0][1].status);
                    } else{
                        if(Object.entries(value.body[i])[0][1].apply == true && Object.entries(value.body[i])[0][1].status == "OK"){
                            arrayErrors.push("Показания Холодной воды переданы успешно");
                        }else arrayErrors.push( "Показания Холодной воды переданы с ошибкой: " + Object.entries(value.body[i])[0][1].status);
                    };
                    flagNumberPUArray = false;
                    break;

                };

            };
        };

        return arrayErrors;
    };
    //+++

    $scope.showinfoErrorValueAIS = function(){
        $scope.infoErrorValueAIS = false;
    };
    $scope.showinfoErrorValueTRIC = function(){
        $scope.infoErrorValueTRIC = false;
    };
    $scope.showinfoSuccessValueAIS = function(){
        $scope.infoErrorValueAIS = false;
    };
    $scope.showinfoErrorValue_red = function(){
        $scope.infoCorrectValue_form_red = false;
    };
    $scope.showinfoErrorValueBp = function(){
        $scope.infoErrorValueBp = false;
    };
    $scope.showinfoSuccessValueBp = function(){
        $scope.infoSuccessValueBp = false;
    };

//+++

//Выделение цветом строки
    $scope.selectedColor = function(accountId){
        $scope.accountId = accountId;
    };

    $scope.getColor = function(accountId){
        $scope.accountIdDin = accountId;    
    };

    $scope.deleteColor = function(accountId){
        $scope.accountIdDin = accountId;
    };
//+++

//Пагинация

    $scope.up = function(ls_number, fio, adress, phone){

        if (ls_number == null) {
            ls_number =""; 
        };

        if (fio == null) {
            fio =""; 
        };

        if (adress == null) {
            adress =""; 
        };

        if (phone == null) {
            phone =""; 
        };

        if (numberPage + 1 >= totalPage) {
            numberPage = numberPage; 
        } else {
            numberPage = numberPage + 1;
        }


        getAccount(numberPage, ls_number, fio, adress, phone);

        disabled(numberPage, totalPage);

       //console.log(numberPage);
    };

    $scope.down = function(ls_number, fio, adress, phone){
        if (ls_number == null) {
            ls_number =""; 
        };

        if (fio == null) {
            fio =""; 
        };

        if (adress == null) {
            adress =""; 
        };

        if (phone == null) {
            phone =""; 
        };

        if (numberPage == 0 || numberPage <= 0) {
            numberPage = 0;
        } else {
            numberPage = numberPage - 1;
        };
        
        getAccount(numberPage, ls_number, fio, adress, phone);

        disabled(numberPage);

        //console.log(numberPage);
    };
//++

// Фильтрация
    $scope.searchAccount = function(ls_number, fio, adress, phone){
        $scope.classValue = 1;

        valueSearch(ls_number, fio, adress, phone);

        if ((ls_number == "" || ls_number == null) && (fio == "" || fio == null)
        && (adress == "" || adress == null) && (phone == "" || phone == null)) {
           
            $scope.showTable = false; 

        } else {
            numberPage = 0;

            if (ls_number == null) {
                ls_number =""; 
            };
    
            if (fio == null) {
                fio =""; 
            };
    
            if (adress == null) {
                adress =""; 
            };
    
            if (phone == null) {
                phone =""; 
            };

            getAccount(numberPage, ls_number, fio, adress, phone);     

        };

        $timeout(function() {
            $scope.classValue = 0;
        }, 500);
    };



//++


//Отключение кнопок паганиации

    function disabled(numberPage, totalPage){

        $scope.numberPage = numberPage;
        $scope.totalPage = totalPage;

    };

//++


// Тост 
    function tost(status) {
       
        if (status == null || status == "") {
            $scope.testTost = "Данные успешно сохранены"
        } else {
            $scope.testTost = "Ошибка номер " + status;
        };
        // Получить снэк-бар DIV
        var x = document.getElementById("snackbar");
    
        // Добавить "show" класс для DIV
        x.className = "show";
    
        // После 3 секунд, извлеките класс show из DIV
        setTimeout(function(){ 
            x.className = x.className.replace("show", ""); 
        }, 3000);
    }
    //++

    function valueSearch(ls_number, fio, adress, phone){
        $scope.formData.ls_number = ls_number;  
        $scope.formData.adress = adress;
        $scope.formData.fio = fio;
        $scope.formData.phone = phone;  
        //console.log($scope.formData);
    };

    // Проверка URL на ls_number
    function getLs_NumberURL(name) {
        var s = window.location.search;
        s = s.match(new RegExp(name + '=([^&=]+)'));
        return s ? s[1] : false;
    };

    //console.log(getLs_NumberURL("ls_number"));
    var ls_numberGetURL = getLs_NumberURL("ls_number");
    getAccountWhitLs_number(ls_numberGetURL);

    function getAccountWhitLs_number(ls_numberGetURL){
        if(ls_numberGetURL == false || ls_numberGetURL == ""){
            return "";
        };
        var getAccountObj=searchAccountServer.getAccount("", ls_numberGetURL, "", "", "");
        getAccountObj.then(function(value) {

            $scope.accountServer=value.content;

            console.log($scope.accountServer);
            numberPage = value.number;
            totalPage = value.totalPages;

            disabled(numberPage, totalPage);

            if (value.content.length == 0){
                $scope.showTable = false;
            } else {
                $scope.showTable = true; 
            };
            
            $scope.openModal($scope.accountServer[0]);
        });
        valueSearch(ls_numberGetURL, "", "", "");
    };
    //+++
});