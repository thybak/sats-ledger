import { SatsAdapter } from '$lib/adapter/sats-adapter';
import type { Currency } from '$lib/model/enum/currency.enum';
import { BuySats } from '$lib/use-case/buy-sats';
import { ListSatsBuys } from '$lib/use-case/list-sats-buys';
import type { Actions, PageServerLoad } from './$types';


export const load: PageServerLoad = async () => {
  return {
    satsBuys: await new ListSatsBuys(new SatsAdapter()).execute()
  };
}

export const actions: Actions = {
  default: async ({ request }) => {
    const form = await request.formData();
    const sats = Number(form.get('sats'));
    const cost = Number(form.get('cost'));
    const currency = form.get('currency') as Currency;

    console.log(`Adding transaction: ${sats} sats for ${cost} ${currency}`);

    new BuySats(new SatsAdapter()).execute({
      sats,
      cost,
      currency,
      description: 'Added via form'
    });

    return { success: true };
  }
};