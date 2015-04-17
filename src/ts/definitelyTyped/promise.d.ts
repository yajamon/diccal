interface Promise_static{
    new(callback: (resolve:Function, reject:Function)=>void):Promise_instance;
}

interface Promise_instance{
    then: (callback:(value:any)=>void)=>Promise_instance;
}

declare var Promise: Promise_static;
