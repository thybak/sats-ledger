import { ExchangeAdapter } from "$lib/adapter/exchange-adapter";
import { SatsAdapter } from "$lib/adapter/sats-adapter";
import { SellSats } from "$lib/use-case/sell-sats";
import type { Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "../$types";
import { ListSatsSells } from "$lib/use-case/list-sats-sells";

export const load: PageServerLoad = async () => {
    return {
        satsSells: await new ListSatsSells(new SatsAdapter()).execute()
    };
}

export const actions: Actions = {
    default: async ({ request }) => {
        const form = await request.formData();
        const sats = Number(form.get('sats'));
        const currency = form.get('currency') as string;
        const description = form.get('description') as string || 'Sold via form';

        console.log(`Adding sell transaction: ${sats} sats for ${currency}`);

        await new SellSats(new SatsAdapter(), new ExchangeAdapter()).execute({
            sats,
            currency,
            description
        });

        return { success: true };
    }
}