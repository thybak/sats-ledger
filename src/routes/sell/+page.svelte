<script lang="ts">
	import type { PageData } from "./$types";
	export let data: PageData;
</script>

<svelte:head>
	<title>Sats ledger - Sell</title>
	<meta name="description" content="Sats ledger" />
</svelte:head>

<section>
	<h1>
		Sats ledger - add your sats sell transactions
	</h1>
	<ul>
		<li><a href="/">Buy</a></li>
	</ul>
	<form method="POST">
		<label for="sats">
			Sats:
			<input name="sats" type="number" id="sats" />
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
	<h2>Sell transactions</h2>
	{#if data.satsSells.length === 0}
		<p>No sell transactions yet.</p>
	{/if}
	<ul>
		{#each data.satsSells as satsSell}
			<li>
				{satsSell.sats} sats for {satsSell.revenue} {satsSell.currency} revenue - {new Date(satsSell.date).toLocaleDateString()}
			</li>
		{/each}
	</ul>
</section>