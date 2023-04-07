doc = document
id = window.location.search;
let xhttp = new XMLHttpRequest();

xhttp.onreadystatechange = function(){
    if(this.readyState == 4 && this.status == 200){
        chech_fun(this.responseText)
    };
};

xhttp.open("GET", "http://tmn-vpeov2-01.corp.vostok-electra.ru:8080/audio/get" +id, true);
xhttp.send();

function  chech_fun(data){
    data = JSON.parse(data)
    document.getElementById("number").innerHTML = "Номер: " + data.result.number;
    document.getElementById("call").innerHTML = "Звонил: " + time_redact(data.result.startCallDate);
    document.getElementById("callAccept").innerHTML = "Звонок был принят: " + time_redact(data.result.startCallDate);
    document.getElementById("Oper").innerHTML = "Оператор: " + data.result.fio;
    //document.querySelector("audio").src = "data:audio/mpeg;base64," + data.bytes
    document.querySelector("audio").src = data.bytes
    const mp3Ctrl =  document.querySelector("audio");
    mp3Ctrl.load();
}

function time_redact(str) {
    if(str == null || str == undefined || str == ""){
        return "";
    };
    
    gap = "."

    year = str.slice(0,4);

    month = str.slice(5,7); 

    day = str.slice(8,10);

    time = str.slice(11,19);

    return  day + gap + month + gap + year +" "+ time;
};