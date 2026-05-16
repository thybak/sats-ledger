import { SatsAdapter } from '$lib/adapter/sats-adapter';
import type { Currency } from '$lib/model/enum/currency.enum';
import { BuySats } from '$lib/use-case/buy-sats';
import { ListSatsBuys } from '$lib/use-case/list-sats-buys';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	return {
		satsBuys: await new ListSatsBuys(new SatsAdapter()).execute()
	};
};

export const actions: Actions = {
	default: async ({ request }) => {
		const form = await request.formData();
		const sats = Number(form.get('sats'));
		const cost = Number(form.get('cost'));
		const currency = form.get('currency') as Currency;
		const dateStr = form.get('date') as string;
		const description = (form.get('description') as string) || 'Buy transaction';

		if (!sats || sats <= 0) {
			return { error: 'Please enter a valid number of sats.' };
		}

		if (!cost || cost <= 0) {
			return { error: 'Please enter a valid cost.' };
		}

		const date = dateStr ? new Date(dateStr).toISOString() : new Date().toISOString();

		try {
			await new BuySats(new SatsAdapter()).execute({
				sats,
				cost,
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
