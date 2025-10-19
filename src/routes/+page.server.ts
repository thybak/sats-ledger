import { SatsAdapter } from '$lib/adapter/sats-adapter';
import { BuySats } from '$lib/use-case/buy-sats';
import type { Actions } from './$types';

export const actions: Actions = {
  default: async ({ request }) => {
    const form = await request.formData();
    const sats = Number(form.get('sats'));
    const euros = Number(form.get('euros'));

    console.log(`Adding transaction: ${sats} sats for ${euros} euros`);
    new BuySats(new SatsAdapter()).execute({
      sats,
      cost: euros,
      currency: 'EUR',
      description: 'Added via form'
    });
    
    return { success: true };
  }
};