module Diccal {
    export class Tab {

        constructor(private tabId:number) {
        }

        static actionAtActiveInWindow(windowId:number, callback:(tab:Diccal.Tab)=>void){
            var queryInfo:chrome.tabs.QueryInfo = {
                "windowId": windowId,
                "active": true,
            };
            new Promise( (resolve:(data:any)=>void, reject:(data:any)=>void) => {
                chrome.tabs.query(queryInfo, resolve);
            }).then((tabs:chrome.tabs.Tab[])=>{
                return new Tab(tabs[0].id);
            }).then(callback);
        }
    }
}
