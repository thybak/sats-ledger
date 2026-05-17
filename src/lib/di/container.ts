import { ExchangeAdapter } from '$lib/adapter/exchange-adapter';
import { SatsAdapter } from '$lib/adapter/sats-adapter';
import { SatsBalanceAdapter } from '$lib/adapter/sats-balance-adapter';
import { BuySats } from '$lib/use-case/buy-sats';
import { GetSatsBalance } from '$lib/use-case/get-sats-balance';
import { ListSatsBuys } from '$lib/use-case/list-sats-buys';
import { ListSatsSells } from '$lib/use-case/list-sats-sells';
import { SellSats } from '$lib/use-case/sell-sats';

class Container {
	readonly satsRepository = new SatsAdapter();
	readonly satsBalanceRepository = new SatsBalanceAdapter();
	readonly exchangeRepository = new ExchangeAdapter();

	get buySats() {
		return new BuySats(this.satsRepository);
	}

	get sellSats() {
		return new SellSats(this.satsRepository, this.satsBalanceRepository, this.exchangeRepository);
	}

	get listSatsBuys() {
		return new ListSatsBuys(this.satsRepository);
	}

	get listSatsSells() {
		return new ListSatsSells(this.satsRepository);
	}

	get getSatsBalance() {
		return new GetSatsBalance(this.satsBalanceRepository);
	}
}

export const container = new Container();
