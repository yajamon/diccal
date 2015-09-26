$(function() {
    var $wrapper = $('#wrapper');
    var calibrationView = new Diccal.CalibrationView();

    var windowId = Diccal.Util.getWindowIdByQueryString();

    calibrationView.render($wrapper);

    var windowManager = new Diccal.Window(windowId);

    var longPushIntervalId = null;
    var longPushStartTime = null;

    function releaseLongPush() {
        clearInterval(longPushIntervalId);
        longPushIntervalId = null;
        longPushStartTime = null;
    }
    function setupLongPush(action) {
        if (longPushIntervalId) {
            releaseLongPush();
        }
        longPushStartTime = new Date().getTime();
        longPushIntervalId = setInterval(function () {
            var now = new Date().getTime();
            if (now - longPushStartTime < 500) {
                return;
            }
            action();
        }, 1000/30);
    }


    $wrapper.on('click', '.compressWidth', function(event) {
        event.preventDefault();
        /* Act on the event */
        windowManager.compressWidth();
    });
    $wrapper.on('mousedown', '.compressWidth', function(event) {
        event.preventDefault();
        /* Act on the event */
        setupLongPush(function () {
            windowManager.compressWidth();
        });
    });
    $wrapper.on('mouseup mouseout', '.compressWidth', function(event) {
        event.preventDefault();
        /* Act on the event */
        releaseLongPush();
    });
    
    $wrapper.on('click', '.expandWidth', function(event) {
        event.preventDefault();
        /* Act on the event */
        windowManager.expandWidth();
    });
    $wrapper.on('mousedown', '.expandWidth', function(event) {
        event.preventDefault();
        /* Act on the event */
        setupLongPush(function () {
            windowManager.expandWidth();
        });
    });
    $wrapper.on('mouseup mouseout', '.expandWidth', function(event) {
        event.preventDefault();
        /* Act on the event */
        releaseLongPush();
    });
    
    $wrapper.on('click', '.compressHeight', function(event) {
        event.preventDefault();
        /* Act on the event */
        windowManager.compressHeight();
    });
    $wrapper.on('mousedown', '.compressHeight', function (event) {
        event.preventDefault();
        /* Act on the event */
        setupLongPush(function () {
            windowManager.compressHeight();
        });
    });
    $wrapper.on('mouseup mouseout', '.compressHeight', function (event) {
        event.preventDefault();
        /* Act on the event */
        releaseLongPush();
    });
    
    $wrapper.on('click', '.expandHeight', function(event) {
        event.preventDefault();
        /* Act on the event */
        windowManager.expandHeight();
    });
    $wrapper.on('mousedown', '.expandHeight', function (event) {
        event.preventDefault();
        /* Act on the event */
        setupLongPush(function () {
            windowManager.expandHeight();
        });
    });
    $wrapper.on('mouseup mouseout', '.expandHeight', function (event) {
        event.preventDefault();
        /* Act on the event */
        releaseLongPush();
    });


    $wrapper.on('click', '.left', function(event) {
        event.preventDefault();
        /* Act on the event */
        windowManager.scrollLeft();
    });
    $wrapper.on('mousedown', '.left', function (event) {
        event.preventDefault();
        /* Act on the event */
        setupLongPush(function () {
            windowManager.scrollLeft();
        });
    });
    $wrapper.on('mouseup mouseout', '.left', function (event) {
        event.preventDefault();
        /* Act on the event */
        releaseLongPush();
    });
    
    $wrapper.on('click', '.right', function(event) {
        event.preventDefault();
        /* Act on the event */
        windowManager.scrollRight();
    });
    $wrapper.on('mousedown', '.right', function (event) {
        event.preventDefault();
        /* Act on the event */
        setupLongPush(function () {
            windowManager.scrollRight();
        });
    });
    $wrapper.on('mouseup mouseout', '.right', function (event) {
        event.preventDefault();
        /* Act on the event */
        releaseLongPush();
    });
    
    $wrapper.on('click', '.down', function(event) {
        event.preventDefault();
        /* Act on the event */
        windowManager.scrollDown();
    });
    $wrapper.on('mousedown', '.down', function (event) {
        event.preventDefault();
        /* Act on the event */
        setupLongPush(function () {
            windowManager.scrollDown();
        });
    });
    $wrapper.on('mouseup mouseout', '.down', function (event) {
        event.preventDefault();
        /* Act on the event */
        releaseLongPush();
    });
    
    $wrapper.on('click', '.up', function(event) {
        event.preventDefault();
        /* Act on the event */
        windowManager.scrollUp();
    });
    $wrapper.on('mousedown', '.up', function (event) {
        event.preventDefault();
        /* Act on the event */
        setupLongPush(function () {
            windowManager.scrollUp();
        });
    });
    $wrapper.on('mouseup mouseout', '.up', function (event) {
        event.preventDefault();
        /* Act on the event */
        releaseLongPush();
    });

});
