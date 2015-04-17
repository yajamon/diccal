module Diccal {
    export class PopupView implements Diccal.Core.View {

        constructor() {
        }

        public render() : string|JQuery {
            var messageTpl = new Diccal.Template("popup/message");

            messageTpl.set("value", "hello world");
            return messageTpl.render();
        }
    }
}
