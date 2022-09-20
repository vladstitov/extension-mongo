import {getRealFin} from "./realfin";

export namespace Database {
    export function GetUrls(obj: {kind: string}) {
        return new Promise(function (resolve, reject) {
            setTimeout(() => {
                const urls = getRealFin().split('\n');
                resolve(urls)
            }, 500)
        })
    }
}




