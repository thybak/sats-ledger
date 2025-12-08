<script lang="ts">
	import type { PageData } from "./$types";
	export let data: PageData;
</script>

<svelte:head>
	<title>Sats ledger - Buy</title>
	<meta name="description" content="Sats ledger" />
</svelte:head>

<section>
	<h1>
		Sats ledger - add your sats buy transactions
	</h1>
	<ul>
		<li><a href="/sell">Sell</a></li>
	</ul>
	<form method="POST">
		<label for="sats">
			Sats:
			<input name="sats" type="number" id="sats" />
		</label>
		<label for="cost">
			Cost:
			<input name="cost" type="number" id="cost" />
		</label>
		<label for="currency">
			Currency: 
			<select name="currency" id="currency">
				<option value="EUR">EUR</option>
			</select>
		</label>
		<button>Add transaction</button>
	</form>
</section>

<section>
	<h2>Buy transactions</h2>
	{#if data.satsBuys.length === 0}
		<p>No buy transactions yet.</p>
	{/if}
	<ul>
		{#each data.satsBuys as satBuy}
			<li>
				{satBuy.sats} sats for {satBuy.cost} {satBuy.currency} - {new Date(satBuy.date).toLocaleDateString()} ({satBuy.cost / satBuy.sats} {satBuy.currency}/sat or {satBuy.cost / satBuy.sats * 100000000} {satBuy.currency}/BTC)
			</li>
		{/each}
	</ul>
</section>

<style>
	
</style>
