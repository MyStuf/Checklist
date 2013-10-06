$.base64.utf8encode = true;

$.readData = function() {
    var url = "" + document.location.href;
    if (url.indexOf("#") > 0 ) {
        var hash = url.substring(url.indexOf("#")+1);


     //   var data = JSON.parse("" + $.base64.decode(hash, true));

 //       return data;
    }
    return {};
};

//$.sendData = function(link, data) {
//    var enc = $.base64.encode(JSON.stringify(data), true);
//    var a = $(link);
//    a.attr("href", a.attr("href") + "#" + enc);
//};
