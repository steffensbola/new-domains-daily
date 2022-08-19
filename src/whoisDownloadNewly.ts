// https://www.whoisdownload.com/newly-registered-domains
// sample download url = https://www.whoisdownload.com/download-panel/free-download-file/MjAyMi0wOC0xNS56aXA=/nrd/home
import axios from "axios";
import { getLinks, saveToFile } from './utils';
import { DateTime } from 'luxon';
import { downloadFile } from './downloadFile';

const base_url = "https://www.whoisdownload.com/newly-registered-domains";
const content_url_match = "download-panel/free-download-file/";
const output_folder = "data/whoisds/";

export const updateWhoisDownloadNewlyRegisteredDomains = async () => {
    const today = DateTime.local();
    console.log("Updating WhoisDownload Newly Registered Domains from:\n", base_url);
    let mainPage = await axios.get(base_url);
    let downloadLinks = getLinks(mainPage.data)
        .filter(link => link.includes(content_url_match))
        .reverse();
    console.log('Download links:\n', downloadLinks);

    let promises = downloadLinks.map(async (cLink, index) => {
        let day = today.minus({ days: index });
        return await downloadFile(
            cLink.trim(),
            output_folder + day.toFormat('yyyy-MM-dd') + ".zip"
        );
    });

    Promise.allSettled(promises).then(results => {
        console.log("All downloads completed");
        saveToFile(today.toISO(), output_folder + 'last_update.txt');
    }).catch(err => {
        console.log("Error downloading files", err);
    });
}



