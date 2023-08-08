<script lang="ts">
	import { drawerStore } from '@skeletonlabs/skeleton';
	import { page } from '$app/stores';

	function drawerClose(): void {
		drawerStore.close();
	}
</script>

<nav class="list-nav p-4">
	{#if $page.url.pathname.startsWith('/manager')}
		<ul>
            <li><a href="/manager" on:click={drawerClose} class:bg-primary-active-token={$page.url.pathname === '/manager'}>Manager Home</a></li>
			<li><a href="/manager/workorder" on:click={drawerClose} class:bg-primary-active-token={$page.url.pathname.startsWith('/manager/workorder')}>Work Orders</a></li>
			<li><a href="/manager/payment" on:click={drawerClose} class:bg-primary-active-token={$page.url.pathname.startsWith('/manager/payment')}>Payment</a></li>
			<li><a href="/manager/profile" on:click={drawerClose} class:bg-primary-active-token={$page.url.pathname.startsWith('/manager/profile')}>Profile</a></li>
            <li><a href="/" on:click={drawerClose}>About Us</a></li>
		</ul>
	{:else}
		<ul>
			<li><a href="/" on:click={drawerClose} class:bg-primary-active-token={$page.url.pathname === '/'}>Home</a></li>
			<li><a href="/manager" on:click={drawerClose}>Manager</a></li>
			<li><a href="/blog" on:click={drawerClose}>Blog</a></li>
			<li><a href="/contact" on:click={drawerClose}>Contact</a></li>
		</ul>
	{/if}
</nav>
