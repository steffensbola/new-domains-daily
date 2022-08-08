// https://www.whoisds.com/newly-registered-domains
// sample download url = https://www.whoisds.com//whois-database/newly-registered-domains/MjAyMi0wNy0yNy56aXA=/nrd
import axios from "axios";
import { getLinks } from './utils';
import { DateTime } from 'luxon';
import { downloadFile } from './downloadFile';

const base_url = "https://www.whoisds.com/newly-registered-domains";
const content_url_match = "whois-database/newly-registered-domains/";
const output_folder = "data/";

export const updateWhoisDsNewlyRegisteredDomains = async () => {
    const today = DateTime.local();
    console.log("Updating WhoisDs Newly Registered Domains from:\n", base_url);
    let mainPage = await axios.get(base_url);
    let downloadLinks = getLinks(mainPage.data).filter(link => link.includes(content_url_match));
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
    }).catch(err => {
        console.log("Error downloading files", err);
    });
}



