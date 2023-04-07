app.filter('dataHistoryCall', function () {
    return function (str) {
        str = str.slice(0, -10);
        str = str.substr(10);
        str = str.replace('T', ' ');
        return str;
    };
  });