module Diccal {
    export class CalibrationView implements Diccal.Core.View {

        constructor() {
        }

        public render($target:JQuery) : void {
            var util = Diccal.Util;
            var param = util.parseQueryString(util.getQueryString());

            $target.append('<p>Window ID:'+param['windowId']+'</p>');
        }
    }
}
