export const getLinks = (text?: string): string[] => {
    let regex = /(http[s]?:\/\/.*?\/[a-zA-Z-_]+[a-zA-Z0-9-_=&,;\/]*)/gi;
    var urls = text.match(regex);
    return urls;
}
