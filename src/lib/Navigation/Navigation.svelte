<script lang="ts">
	import { drawerStore } from '@skeletonlabs/skeleton';
	import { page } from '$app/stores';
	import { IconCash, IconDashboard, IconInfoCircle, IconSettings, IconTool, IconUser } from '@tabler/icons-svelte';

	function drawerClose(): void {
		drawerStore.close();
	}

	export let isAdmin: boolean;
</script>

<nav class="list-nav p-4">
	{#if $page.url.pathname.startsWith('/manager')}
		<ul>
            <li><a href="/manager" on:click={drawerClose} class:bg-primary-active-token={$page.url.pathname === '/manager'}><IconDashboard class="mr-2"/>Dashboard</a></li>
			<li><a href="/manager/workorder" on:click={drawerClose} class:bg-primary-active-token={$page.url.pathname.startsWith('/manager/workorder')}><IconTool class="mr-2"/>Maintenance</a></li>
			<li><a href="/manager/payment" on:click={drawerClose} class:bg-primary-active-token={$page.url.pathname.startsWith('/manager/payment')}><IconCash class="mr-2"/>Payment</a></li>
			<li><a href="/manager/profile" on:click={drawerClose} class:bg-primary-active-token={$page.url.pathname.startsWith('/manager/profile')}><IconUser class="mr-2"/>Profile</a></li>
			{#if isAdmin}
			<li><a href="/manager/admin" on:click={drawerClose} class:bg-primary-active-token={$page.url.pathname.startsWith('/manager/admin')}><IconSettings class="mr-2" />Admin</a></li>
			{/if}
            <li><a href="/" on:click={drawerClose}><IconInfoCircle class="mr-2" />About Us</a></li>
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
