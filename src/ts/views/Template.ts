module Diccal {
    export class Template extends Diccal.Core.Template {

        constructor(templatePath:string) {
            var namespacePath:string = "Diccal/templates";
            super(templatePath, namespacePath);
        }
    }
}
