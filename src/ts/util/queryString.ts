module Diccal.Util {
    export function getQueryString (target:any = window) {
        return target.location.search;
    }
    export function parseQueryString(search:string):any {
        var search:string = window.location.search;

        if(search == "") {
            return {};
        }

        var hashes = search.slice(1).split('&');
        var params:any = {};
        for(var i = 0; i < hashes.length; i++) {
            var hash = hashes[i].split('=');
            params[hash[0]] = hash[1];
        }
        return params;
    }
}
