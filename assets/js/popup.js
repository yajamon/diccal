$(function() {
    var $wrapper = $('#wrapper');
    var popupView = new Diccal.PopupView();

    popupView.render($wrapper);

    $wrapper.on('click', '.displayWindowId', function(event) {
        event.preventDefault();
        /* Act on the event */
        // Todo: Viewのやることじゃない……
        popupView.openCalibration($(this));
    });
});
