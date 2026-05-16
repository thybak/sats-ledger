<script lang="ts">
	import type { PageData } from './$types';
	let { data }: { data: PageData & { success?: boolean; error?: string } } = $props();
</script>

<svelte:head>
	<title>Sats Ledger - Sell</title>
</svelte:head>

<div class="card">
	<h2>Record Sell Transaction</h2>
	{#if data.error}
		<div class="feedback error">{data.error}</div>
	{/if}
	{#if data.success}
		<div class="feedback success">Sell transaction recorded successfully.</div>
	{/if}
	<form method="POST">
		<div class="form-row">
			<div class="form-group">
				<label for="sats">Sats to Sell</label>
				<input name="sats" type="number" id="sats" min="1" step="1" required />
			</div>
			<div class="form-group">
				<label for="currency">Currency</label>
				<select name="currency" id="currency">
					<option value="EUR">EUR</option>
				</select>
			</div>
		</div>
		<div class="form-row">
			<div class="form-group">
				<label for="date">Date</label>
				<input name="date" type="date" id="date" value={new Date().toISOString().split('T')[0]} />
			</div>
			<div class="form-group">
				<label for="description">Description</label>
				<input
					name="description"
					type="text"
					id="description"
					placeholder="e.g. Sold on exchange"
				/>
			</div>
		</div>
		<button type="submit">Add Sell Transaction</button>
	</form>
</div>

<div class="card">
	<h2>Sell Transactions</h2>
	{#if data.satsSells.length === 0}
		<div class="empty-state">No sell transactions yet. Record your first sale above.</div>
	{:else}
		<div class="table-wrapper">
			<table>
				<thead>
					<tr>
						<th>Date</th>
						<th class="text-right">Sats Sold</th>
						<th class="text-right">Revenue</th>
						<th class="text-right">Sat Price</th>
						<th class="text-right">BTC Price</th>
					</tr>
				</thead>
				<tbody>
					{#each data.satsSells as satsSell (satsSell.id)}
						<tr>
							<td>{new Date(satsSell.date).toLocaleDateString()}</td>
							<td class="text-right mono">{satsSell.sats.toLocaleString()}</td>
							<td class="text-right mono">{satsSell.revenue.toFixed(2)} {satsSell.currency}</td>
							<td class="text-right mono">{(satsSell.revenue / satsSell.sats).toFixed(8)}</td>
							<td class="text-right mono"
								>{((satsSell.revenue / satsSell.sats) * 100000000).toFixed(2)}</td
							>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	{/if}
</div>
