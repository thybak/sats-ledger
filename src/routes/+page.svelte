<script lang="ts">
	import type { PageProps } from './$types';
	let { data, form }: PageProps = $props();
</script>

<svelte:head>
	<title>Sats Ledger - Buy</title>
</svelte:head>

<div class="card">
	<h2>Record Buy Transaction</h2>
	{#if form?.error}
		<div class="feedback error">{form.error}</div>
	{/if}
	{#if form?.success}
		<div class="feedback success">Buy transaction recorded successfully.</div>
	{/if}
	<form method="POST">
		<div class="form-row">
			<div class="form-group">
				<label for="sats">Sats</label>
				<input name="sats" type="number" id="sats" min="1" step="1" required />
			</div>
			<div class="form-group">
				<label for="cost">Total Cost</label>
				<input name="cost" type="number" id="cost" min="0.01" step="0.01" required />
			</div>
		</div>
		<div class="form-row">
			<div class="form-group">
				<label for="currency">Currency</label>
				<select name="currency" id="currency">
					<option value="EUR">EUR</option>
				</select>
			</div>
			<div class="form-group">
				<label for="date">Date</label>
				<input name="date" type="date" id="date" value={new Date().toISOString().split('T')[0]} />
			</div>
		</div>
		<div class="form-group">
			<label for="description">Description</label>
			<input
				name="description"
				type="text"
				id="description"
				placeholder="e.g. DCA purchase on exchange"
			/>
		</div>
		<button type="submit">Add Buy Transaction</button>
	</form>
</div>

<div class="card">
	<h2>Buy Transactions</h2>
	{#if data.satsBuys.length === 0}
		<div class="empty-state">No buy transactions yet. Record your first purchase above.</div>
	{:else}
		<div class="table-wrapper">
			<table>
				<thead>
					<tr>
						<th>Date</th>
						<th class="text-right">Sats</th>
						<th class="text-right">Cost</th>
						<th class="text-right">Sat Price</th>
						<th class="text-right">BTC Price</th>
					</tr>
				</thead>
				<tbody>
					{#each data.satsBuys as satBuy (satBuy.id)}
						<tr>
							<td>{new Date(satBuy.date).toLocaleDateString()}</td>
							<td class="text-right mono">{satBuy.sats.toLocaleString()}</td>
							<td class="text-right mono">{satBuy.cost.toFixed(2)} {satBuy.currency}</td>
							<td class="text-right mono">{(satBuy.cost / satBuy.sats).toFixed(8)}</td>
							<td class="text-right mono">{((satBuy.cost / satBuy.sats) * 100000000).toFixed(2)}</td
							>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	{/if}
</div>
