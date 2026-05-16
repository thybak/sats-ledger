import { ExchangeAdapter } from '$lib/adapter/exchange-adapter';
import { SatsAdapter } from '$lib/adapter/sats-adapter';
import { SellSats } from '$lib/use-case/sell-sats';
import type { Actions, PageServerLoad } from './$types';
import { ListSatsSells } from '$lib/use-case/list-sats-sells';

export const load: PageServerLoad = async () => {
	return {
		satsSells: await new ListSatsSells(new SatsAdapter()).execute()
	};
};

export const actions: Actions = {
	default: async ({ request }) => {
		const form = await request.formData();
		const sats = Number(form.get('sats'));
		const currency = form.get('currency') as string;
		const dateStr = form.get('date') as string;
		const description = (form.get('description') as string) || 'Sell transaction';

		if (!sats || sats <= 0) {
			return { error: 'Please enter a valid number of sats.' };
		}

		const date = dateStr ? new Date(dateStr).toISOString() : new Date().toISOString();

		try {
			await new SellSats(new SatsAdapter(), new ExchangeAdapter()).execute({
				sats,
				currency,
				description,
				date
			});
		} catch (e) {
			return { error: (e as Error).message };
		}

		return { success: true };
	}
};
