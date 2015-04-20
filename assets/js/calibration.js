$(function() {
    var $wrapper = $('#wrapper');

    var util = Diccal.Util;
    var param = util.parseQueryString(util.getQueryString());

    $wrapper.append('<p>Window ID:'+param['windowId']+'</p>');
});
