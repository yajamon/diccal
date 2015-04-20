module Diccal {
    export class Window {

        constructor(private windowId:number) {
        }

        public compressWidth() : void {
            new Promise( (resolve:(data:any)=>void, reject:(data:any)=>void) => {
                chrome.windows.get(this.windowId, resolve);
            }).then( (Window:chrome.windows.Window) => {
                var updateInfo :chrome.windows.UpdateInfo = {
                    width : (--Window.width)
                }

                new Promise((resolve:(data:any)=>void, reject:(data:any)=>void) => {
                    chrome.windows.update(this.windowId, updateInfo, resolve);
                });

            });
        }

    }
}
