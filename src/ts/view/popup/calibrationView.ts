module Diccal {
    export class CalibrationView implements Diccal.Core.View {
        private timerId:number = null;

        constructor() {
        }

        public render($target:JQuery) : void {
            var util = Diccal.Util;
            var param = util.parseQueryString(util.getQueryString());
            var windowId = parseInt(param["windowId"], 10);

            $target.append('<p>Window ID:'+windowId+'</p>');

            var delay =  1000;
            this.timerId = setInterval( ()=>{

                // TODO: refactoring
                // windowIdのアクティブなタブを取得
                new Promise( (resolve:(data:any)=>void, reject:(data:any)=>void) => {
                    var queryInfo:chrome.tabs.QueryInfo = {
                        "windowId": windowId,
                        "active": true,
                    };
                    chrome.tabs.query(queryInfo, resolve);
                }).then((tabs:chrome.tabs.Tab[])=>{
                    // タブにscriptを流し込む
                    var tabId = tabs[0].id;
                    new Promise( (resolve:(data:any)=>void, reject:(data:any)=>void) => {
                        var script:string = "var rect = {"
                            + "    left: window.pageXOffset,"
                            + "    top:window.pageYOffset,"
                            + "    width:window.document.documentElement.clientWidth,"
                            + "    height:window.document.documentElement.clientHeight"
                            + "};"
                            + "rect;"
                        var details:chrome.tabs.InjectDetails = {
                            "code": script,
                        };
                        chrome.tabs.executeScript(tabId, details, resolve);
                    }).then((results:any)=>{
                        var result = results.shift();
                        var informationTpl = new Diccal.Template('calibration/information');
                        informationTpl.set("left", result["left"]);
                        informationTpl.set("top", result["top"]);
                        informationTpl.set("width", result["width"]);
                        informationTpl.set("height", result["height"]);

                        $target.find(".information").remove();
                        $target.append(informationTpl.render());
                    }).catch((err:any)=>{
                        console.log(err);
                        clearInterval(this.timerId);
                        $target.append("<p class='error'>Trackingが解除されました</p>");
                    });
                }).catch((err:any)=>{
                    console.log(err);
                    clearInterval(this.timerId);
                    $target.append("<p class='error'>Trackingが解除されました</p>");
                });
            }, delay);
        }
    }
}
