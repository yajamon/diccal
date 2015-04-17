module Diccal {
    export class PopupView implements Diccal.Core.View {

        constructor() {
        }

        public render($target:JQuery) : void {
            var result:string|JQuery = null;
            var messageTpl = new Diccal.Template("popup/message");

            messageTpl.set("value", "hello Diccal");
            result = messageTpl.render();
            $target.append(result);

            var prms = new Promise( (resolve:(data:any)=>void, reject:(data:any)=>void) => {
                chrome.windows.getAll({"populate": true}, resolve);
            });
            var windowsTpl = new Diccal.Template("popup/windows");
            prms.then( (windows:chrome.windows.Window[]) => {
                console.log(windows);
                windowsTpl.set("windows", windows);
                $target.append(windowsTpl.render());
            });
        }
    }
}
