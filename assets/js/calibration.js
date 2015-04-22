$(function() {
    var $wrapper = $('#wrapper');
    var calibrationView = new Diccal.CalibrationView();

    var windowId = Diccal.Util.getWindowIdByQueryString();

    calibrationView.render($wrapper);

    var windowManager = new Diccal.Window(windowId);

    $wrapper.on('click', '.compressWidth', function(event) {
        event.preventDefault();
        /* Act on the event */
        windowManager.compressWidth();
    });
    $wrapper.on('click', '.expandWidth', function(event) {
        event.preventDefault();
        /* Act on the event */
        windowManager.expandWidth();
    });
    $wrapper.on('click', '.compressHeight', function(event) {
        event.preventDefault();
        /* Act on the event */
        windowManager.compressHeight();
    });

});
