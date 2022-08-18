import { updateDnPediaDaily } from "./dnpediaDaily";
import { updateWhoisDsNewlyRegisteredDomains } from "./whoisdsNewly";

setTimeout(async () => {
    await updateWhoisDsNewlyRegisteredDomains();
    await updateDnPediaDaily();
}, 1);