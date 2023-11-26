<script lang="ts">
	import { getDrawerStore } from '@skeletonlabs/skeleton';
	import { page } from '$app/stores';
	import {
		IconBuildingEstate,
		IconCash,
		IconDashboard,
		IconHome,
		IconInfoCircle,
		IconTool,
		IconUser,
		IconUsers
	} from '@tabler/icons-svelte';

	const drawerStore = getDrawerStore();

	function drawerClose(): void {
		drawerStore.close();
	}

	export let isAdmin: boolean;
</script>

<nav class="list-nav p-4">
	{#if $page.url.pathname.startsWith('/manager')}
		<ul>
			{#if isAdmin}
				<li>
					<a
						href="/manager/admin"
						on:click={drawerClose}
						class:bg-primary-active-token={$page.url.pathname === '/manager/admin'}
						><IconHome class="mr-2" />Home</a
					>
				</li>
				<li>
					<a
						href="/manager/profile"
						on:click={drawerClose}
						class:bg-primary-active-token={$page.url.pathname.startsWith('/manager/profile')}
						><IconUser class="mr-2" />Profile</a
					>
				</li>
				<li>
					<a
						href="/manager/admin/maintenance"
						on:click={drawerClose}
						class:bg-primary-active-token={$page.url.pathname.startsWith(
							'/manager/admin/maintenance'
						)}><IconTool class="mr-2" />Maintenance</a
					>
				</li>
				<li>
					<a
						href="/manager/admin/properties"
						on:click={drawerClose}
						class:bg-primary-active-token={$page.url.pathname.startsWith(
							'/manager/admin/properties'
						)}><IconBuildingEstate class="mr-2" />Properties</a
					>
				</li>
				<li>
					<a
						href="/manager/admin/users"
						on:click={drawerClose}
						class:bg-primary-active-token={$page.url.pathname.startsWith('/manager/admin/users')}
						><IconUsers class="mr-2" />Users</a
					>
				</li>
			{:else}
				<li>
					<a
						href="/manager"
						on:click={drawerClose}
						class:bg-primary-active-token={$page.url.pathname === '/manager'}
						><IconDashboard class="mr-2" />Dashboard</a
					>
				</li>
				<li>
					<a
						href="/manager/maintenance"
						on:click={drawerClose}
						class:bg-primary-active-token={$page.url.pathname.startsWith('/manager/maintenance')}
						><IconTool class="mr-2" />Maintenance</a
					>
				</li>
				<li>
					<a
						href="/manager/payment"
						on:click={drawerClose}
						class:bg-primary-active-token={$page.url.pathname.startsWith('/manager/payment')}
						><IconCash class="mr-2" />Payment</a
					>
				</li>
				<li>
					<a
						href="/manager/profile"
						on:click={drawerClose}
						class:bg-primary-active-token={$page.url.pathname.startsWith('/manager/profile')}
						><IconUser class="mr-2" />Profile</a
					>
				</li>
				<li><a href="/" on:click={drawerClose}><IconInfoCircle class="mr-2" />About Us</a></li>
			{/if}
		</ul>
	{:else}
		<ul>
			<li>
				<a
					href="/"
					on:click={drawerClose}
					class:bg-primary-active-token={$page.url.pathname === '/'}>Home</a
				>
			</li>
			<li><a href="/manager" on:click={drawerClose}>Manager</a></li>
			<li><a href="/blog" on:click={drawerClose}>Blog</a></li>
			<li><a href="/contact" on:click={drawerClose}>Contact</a></li>
		</ul>
	{/if}
</nav>
