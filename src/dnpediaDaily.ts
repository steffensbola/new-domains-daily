import axios from 'axios';
import { DateTime } from 'luxon';
import { range, saveToFile } from './utils';

const BASE_URL_FOR_TLD =
  'https://dnpedia.com/tlds/ajax.php?cmd=tldlist&columns=id,zoneuc,active_in_zone,current_add_count,last_processed,zone,id,&_search=false&rows=1000&page=[PAGE]&sidx=active_in_zone&sord=desc';
const BASE_URL =
  'https://dnpedia.com/tlds/ajax.php?columns=name,thedate,&ecf=zoneid,thedate&ecv=[TLD_ID],[YYYY-MM-DD]&zone=[ZONE]&rows=[PAGE_SIZE]&page=[PAGE]&cmd=added';
const PAGE_SIZE = 2000;

interface TLD {
  zoneuc: string;
  id: number;
  current_add_count: number;
  last_processed: string;
  zone: string;
}


function delay(t: number, data) {
  return new Promise(resolve => {
    setTimeout(resolve.bind(null, data), t);
  });
}

const getTLDs = async (): Promise<TLD[]> => {
  let tlds: TLD[] = [];
  const pages = range(1, 2);

  const promises = pages.map((pg) => {
    const myUrl = BASE_URL_FOR_TLD.replace('[PAGE]', pg.toString());
    return axios.get(myUrl, {
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        Referer: 'https://dnpedia.com/tlds/daily.php',
      },
    });
  });

  await Promise.allSettled(promises).then((results) => {
    results.forEach((response) => {
      if (response.status === 'fulfilled') {
        tlds = tlds.concat(response.value.data.rows);
      }
    });
    return tlds;
  });

  return tlds;
};

export const updateDnPediaDaily = async () => {
  let allTlds = await getTLDs();

  let db: any[] = [];

  let today = DateTime.now();
  const days = range(0, 1).map((n) => {
    today = today.minus({ days: n });
    return today.toISO().split('T')[0];
  });

  const urls: string[] = [];
  const error: string[] = [];
  const success: string[] = [];

  days.forEach((day) => {
    const tlds = allTlds.filter((t) => t.current_add_count > 0 && t.last_processed === day);
    tlds.forEach((tld) => {
      const pages = range(1, Math.ceil(tld.current_add_count / PAGE_SIZE) + 1);
      pages.forEach((pg) => {
        const cUrl = BASE_URL.replace('[YYYY-MM-DD]', day)
          .replace('[PAGE_SIZE]', PAGE_SIZE.toString())
          .replace('[PAGE]', pg.toString())
          .replace('[ZONE]', tld.zoneuc)
          .replace('[TLD_ID]', tld.id.toString());
        urls.push(cUrl);
      });
    });
  });

  // custom headers must be set for each request
  const promises = urls.map(async (u) => {
    return axios.get(u, {
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        Referer: 'https://dnpedia.com/tlds/daily.php',
        'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.5060.66 Safari/537.36 Edg/103.0.1264.44',
      },
      timeout: 100000,
    })
  });

  await Promise.allSettled(promises).then((results) => {
    for (let i = results.length - 1; i--;) {
      let response = results[i];
      if (response.status === 'fulfilled') {
        try {
          db = db.concat(response.value?.data?.rows ?? []);
          success.push(urls[i]);
        } finally { }
      } else {
        error.push(urls[i]);
      }
    }

    saveToFile(JSON.stringify(db), 'data/dnpedia/' + today.toISO().split('T')[0] + '.json');
    saveToFile(JSON.stringify(error), 'data/dnpedia/' + today.toISO().split('T')[0] + '.error.txt');
    saveToFile(JSON.stringify(success), 'data/dnpedia/' + today.toISO().split('T')[0] + '.success.txt');

  });
};
