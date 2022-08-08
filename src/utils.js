"use strict";
// export function getLinks(text?: string): string[] {
//     const doc = document.createElement('html');
//     doc.innerHTML = text ?? '';
//     const links = doc.getElementsByTagName('a');
//     const urls: string[] = [];
exports.__esModule = true;
exports.getLinks = void 0;
//     for (let i = 0; i < links.length; i += 1) {
//         urls.push(links[i].getAttribute('href') ?? '');
//     }
//     return urls;
// }
var getLinks = function (text) {
    // let regex = /(https?:\/\/[^/]+(\/[\w-]+)+)/gi;
    var regex = /(http[s]?:\/\/.*?\/[a-zA-Z-_]+[a-zA-Z0-9-_=&,;\/]*)/gi;
    // let regex = /(http[s]?:\/\/.*?\/[a-zA-Z-_]+[A-Za-z0-9-_]*)/gi;
    var urls = text.match(regex);
    console.log(urls);
    return urls;
};
exports.getLinks = getLinks;
