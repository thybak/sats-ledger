import { ExchangeAdapter } from '$lib/adapter/exchange-adapter';
import { SatsAdapter } from '$lib/adapter/sats-adapter';
import { BuySats } from '$lib/use-case/buy-sats';
import { ListSatsBuys } from '$lib/use-case/list-sats-buys';
import { ListSatsSells } from '$lib/use-case/list-sats-sells';
import { SellSats } from '$lib/use-case/sell-sats';

class Container {
	readonly satsRepository = new SatsAdapter();
	readonly exchangeRepository = new ExchangeAdapter();

	get buySats() {
		return new BuySats(this.satsRepository);
	}

	get sellSats() {
		return new SellSats(this.satsRepository, this.exchangeRepository);
	}

	get listSatsBuys() {
		return new ListSatsBuys(this.satsRepository);
	}

	get listSatsSells() {
		return new ListSatsSells(this.satsRepository);
	}
}

export const container = new Container();
