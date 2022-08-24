import fs from "fs";

export const getLinks = (text?: string): string[] => {
  let regex = /(http[s]?:\/\/.*?\/[a-zA-Z-_]+[a-zA-Z0-9-_=&,;\/]*)/gi;
  var urls = text.match(regex);
  return urls;
};

export const saveToFile = (data: string, filename: string) => {
  fs.writeFile(filename, data, (err) => {
    if (err) {
      console.log(err);
    }
  });
};

export const range = (start: number, end: number) =>
  Array.from({ length: end - start }, (v, k) => k + start);
