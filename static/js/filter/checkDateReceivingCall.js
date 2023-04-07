app.filter('checkDateReceivingCall', function () {
    return function (str) {
        if (str == null || str == "") {
            return "Звонок был не принят."
        } else {
            str = str.slice(0, -10);
            str = str.substr(10);
            str = str.replace('T', ' ');
            return "Звонок был принят " + str + "."
        }
    };
  });