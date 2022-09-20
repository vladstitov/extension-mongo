
export namespace Database {
    export function GetUrls(obj: {kind: string}) {
        return new Promise(function (resolve, reject) {
            setTimeout(() => {
                resolve({ooop: 'kkkk'})
            }, 500)
        })
    }
}

