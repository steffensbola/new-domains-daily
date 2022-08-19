import { updateDnPediaDaily } from "./dnpediaDaily";
import { updateWhoisDownloadNewlyRegisteredDomains } from "./whoisDownloadNewly";
import { updateWhoisDsNewlyRegisteredDomains } from "./whoisdsNewly";


setTimeout(async () => {
    try {
        await updateWhoisDsNewlyRegisteredDomains();
    } catch (e) {
        console.log('Falha ao atualizar WHOISDS ', e);
        try {
            console.log('Utilizando WHOISDOWNLOADCOM como fallback');
            await updateWhoisDownloadNewlyRegisteredDomains();
        } catch (e) {
            console.log('Falha ao atualizar WHOISDOWNLOADCOM ', e);
        }
    }

    try {
        await updateDnPediaDaily();
    } catch (e) {
        console.log('Falha ao atualizar DNPEDIA ', e);
    }
}, 1);