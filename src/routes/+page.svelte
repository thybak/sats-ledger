<script lang="ts">
	import type { PageData } from "./$types";
	export let data: PageData;
</script>

<svelte:head>
	<title>Sats ledger</title>
	<meta name="description" content="Sats ledger" />
</svelte:head>

<section>
	<h1>
		Sats ledger - add your sats buy and sell transactions
	</h1>
	<form method="POST">
		<label>
			Sats:
			<input name="sats" type="number" />
		</label>
		<label>
			Cost:
			<input name="cost" type="number" />
		</label>
		<label>
			Currency: 
			<select name="currency">
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
