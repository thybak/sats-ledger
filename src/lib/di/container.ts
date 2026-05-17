import { ExchangeAdapter } from '$lib/adapter/exchange-adapter';
import { SatsBalanceAdapter } from '$lib/adapter/sats-balance-adapter';
import { SatsBuyAdapter } from '$lib/adapter/sats-buy-adapter';
import { SatsSellAdapter } from '$lib/adapter/sats-sell-adapter';
import { BuySats } from '$lib/use-case/buy-sats';
import { GetSatsBalance } from '$lib/use-case/get-sats-balance';
import { ListSatsBuys } from '$lib/use-case/list-sats-buys';
import { ListSatsSells } from '$lib/use-case/list-sats-sells';
import { SellSats } from '$lib/use-case/sell-sats';

class Container {
	readonly satsBuyRepository = new SatsBuyAdapter();
	readonly satsSellRepository = new SatsSellAdapter();
	readonly satsBalanceRepository = new SatsBalanceAdapter();
	readonly exchangeRepository = new ExchangeAdapter();

	get buySats() {
		return new BuySats(this.satsBuyRepository);
	}

	get sellSats() {
		return new SellSats(
			this.satsBuyRepository,
			this.satsSellRepository,
			this.satsBalanceRepository,
			this.exchangeRepository
		);
	}

	get listSatsBuys() {
		return new ListSatsBuys(this.satsBuyRepository);
	}

	get listSatsSells() {
		return new ListSatsSells(this.satsSellRepository);
	}

	get getSatsBalance() {
		return new GetSatsBalance(this.satsBalanceRepository);
	}
}

export const container = new Container();
