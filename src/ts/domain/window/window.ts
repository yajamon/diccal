module Diccal {
    export class Window {

        constructor(private windowId:number) {
        }

        public action(callback :(Window:chrome.windows.Window)=>void) : void {

            new Promise( (resolve:(data:any)=>void, reject:(data:any)=>void) => {
                chrome.windows.get(this.windowId, resolve);
            }).then(callback);

        }

        public actionAtActiveTab(callback:(tab:Diccal.Tab)=>void) : void {
            Diccal.Tab.actionAtActiveInWindow(this.windowId, callback);
        }

        public update(updateInfo:chrome.windows.UpdateInfo, callback:(Window:chrome.windows.Window)=>void = ()=>{}) : void {

            new Promise((resolve:(data:any)=>void, reject:(data:any)=>void) => {
                chrome.windows.update(this.windowId, updateInfo, resolve);
            }).then(callback);
        }

        public updateSize(diffWidth:number, diffHeight:number) : void {
            this.action( (Window:chrome.windows.Window) => {
                var updateInfo :chrome.windows.UpdateInfo = {
                    width : (Window.width + diffWidth),
                    height : (Window.height + diffHeight),
                };
                this.update(updateInfo);
            });
        }

        public compressWidth() : void {
            this.updateSize(-1, 0);
        }

        public expandWidth() : void {
            this.updateSize(1, 0);
        }

        public compressHeight() : void {
            this.updateSize(0, -1);
        }

        public expandHeight() : void {
            this.updateSize(0, 1);
        }

        public scrollLeft() : void {
            this.actionAtActiveTab((tab:Diccal.Tab)=>{
                tab.contentScrollLeft();
            });
        }
        public scrollRight() : void {
            this.actionAtActiveTab((tab:Diccal.Tab)=>{
                tab.contentScrollRight();
            });
        }
        public scrollDown() : void {
            this.actionAtActiveTab((tab:Diccal.Tab)=>{
                tab.contentScrollDown();
            });
        }
    }
}
