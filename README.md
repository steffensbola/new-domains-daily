# new-domains-daily  
New websites created on a daily basis.  
Data in this repo is provided "as is". There is no garantee that the data is correct. Is is colected over varios sources that made this info available.
This repo does not intend to provide whois data.
  
  
Data is avilable in:  
```
data/whoisds (as a txt file, domains only) *whoisdownload.com is used as a fallback
data/dnpedia (as a json file, very unreliable)
``` 

This repo is updated using a cron schedule:  
[![Fetch new data](https://github.com/steffensbola/new-domains-daily/actions/workflows/daily-update.yml/badge.svg)](https://github.com/steffensbola/new-domains-daily/actions/workflows/daily-update.yml)


Run it at your own machine:
```
./run.sh
```


