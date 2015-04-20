module Diccal {
    export class CalibrationView implements Diccal.Core.View {

        constructor() {
        }

        public render($target:JQuery) : void {
            var util = Diccal.Util;
            var param = util.parseQueryString(util.getQueryString());
            var windowId = parseInt(param["windowId"], 10);

            $target.append('<p>Window ID:'+windowId+'</p>');

        }
    }
}
