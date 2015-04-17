module Diccal.Core {

    export class  Template {

        private namespace:{};
        private template:HandlebarsTemplateDelegate;
        private separater:string = "/";
        private params:any = {};

        constructor(templatePath:string, namespacePath:string = "") {
            this.searchNamespace(namespacePath);
            this.searchTemplate(templatePath);
        }

        public set(key:string, value:any) : void {
            this.params[key] = value;
        }

        public render(): string{
            return this.template(this.params);
        }

        private searchNamespace(path:string):void{
            this.namespace = this.existsByPath(window, path);
        }

        private searchTemplate(path:string):void{
            this.template = this.existsByPath(this.namespace, path);
        }

        private existsByPath(current:any, path:string):any{
            var elements:string[] = path.split(this.separater);
            var element:string = elements.shift();

            if(path == "") {
                return current;
            }

            if(!current.hasOwnProperty(element)) {
                throw "element not found. : "+element;
            }
            var target = current[element];

            if(elements.length === 0) {
                return target;
            }
            return this.existsByPath(target, elements.join(this.separater));
        }
    }
}
