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

         public executeScript(code:string, callback:any) : void {
             new Promise((resolve:(data:any)=>void, reject:(data:any)=>void) => {
                var details:chrome.tabs.InjectDetails = {
                    "code": code,
                };
                chrome.tabs.executeScript(this.tabId, details, resolve);
            }).then(callback);
         }

         public scrollBy(left:number, top:number) : void {
             var script = 'window.scrollBy('+left+','+top+');';
             this.executeScript(script, ()=>{});
         }

         public contentScrollLeft(distance:number = 1) : void {
             this.scrollBy(distance, 0);
         }
    }
}
