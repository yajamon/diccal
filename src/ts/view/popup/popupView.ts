module Diccal {
    export class PopupView implements Diccal.Core.View {

        constructor() {
        }

        public render() : string|JQuery {
            var result:string|JQuery = null;
            var messageTpl = new Diccal.Template("popup/message");

            messageTpl.set("value", "hello Diccal");
            result = messageTpl.render();
            return result;
        }
    }
}
