<script lang="ts">
	import { page } from '$app/state';
	import '../app.css';
</script>

<svelte:head>
	<title>Sats Ledger</title>
	<meta name="description" content="Bitcoin satoshi buy/sell tracking ledger" />
</svelte:head>

<!-- eslint-disable svelte/no-navigation-without-resolve -->
<nav class="navbar">
	<div class="navbar-inner">
		<a href="/" class="navbar-brand">Sats Ledger</a>
		<ul class="navbar-tabs">
			<li><a href="/" class:active={page.url.pathname === '/'}>Buy</a></li>
			<li><a href="/sell" class:active={page.url.pathname === '/sell'}>Sell</a></li>
		</ul>
	</div>
</nav>
<!-- eslint-enable svelte/no-navigation-without-resolve -->

<main class="container">
	<slot />
</main>
