import type { Currency } from '$lib/model/enum/currency.enum';
import { container } from '$lib/di/container';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	return {
		satsSells: await container.listSatsSells.execute()
	};
};

export const actions: Actions = {
	default: async ({ request }) => {
		const form = await request.formData();
		const sats = Number(form.get('sats'));
		const currency = form.get('currency') as Currency;
		const dateStr = form.get('date') as string;
		const description = (form.get('description') as string) || 'Sell transaction';

		if (!sats || sats <= 0) {
			return { error: 'Please enter a valid number of sats.' };
		}

		const date = dateStr ? new Date(dateStr).toISOString() : new Date().toISOString();

		try {
			await container.sellSats.execute({
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
