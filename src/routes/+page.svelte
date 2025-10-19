<script lang="ts">
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
			Euros:
			<input name="euros" type="number" />
		</label>
		<button>Add transaction</button>
	</form>
</section>

<style>
	
</style>
