module Diccal {
    export class CalibrationView implements Diccal.Core.View {

        constructor() {
        }

        public render($target:JQuery) : void {
            var util = Diccal.Util;
            var param = util.parseQueryString(util.getQueryString());
            var windowId = parseInt(param["windowId"], 10);

            $target.append('<p>Window ID:'+windowId+'</p>');

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
                        + "    width:window.innerWidth,"
                        + "    height:window.innerHeight"
                        + "};"
                        + "rect;"
                    var details:chrome.tabs.InjectDetails = {
                        "code": script,
                    };
                    chrome.tabs.executeScript(tabId, details, resolve);
                }).then((result:any)=>{
                    console.log(result);
                });

                //TODO: 出力する
                console.log(tabs);
            });


        }
    }
}
