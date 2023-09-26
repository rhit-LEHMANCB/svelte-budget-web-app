<script lang="ts">
	import {
		AppBar,
		AppShell,
		Drawer,
		drawerStore,
		type DrawerSettings
	} from '@skeletonlabs/skeleton';
	import Navigation from '$lib/Components/Navigation/Navigation.svelte';
	import { goto } from '$app/navigation';

	const drawerSettings: DrawerSettings = {
		width: 'w-[80vw] md:w-[280px]',
		id: 'home'
	};

	function drawerOpen(): void {
		drawerStore.open(drawerSettings);
	}

	function goToSignInPage(): void {
		goto('/signin');
	}
</script>

<Drawer>
	<Navigation isAdmin={false} />
</Drawer>

<AppShell slotSidebarLeft="bg-surface-500/5 w-0 lg:w-64">
	<svelte:fragment slot="header">
		<AppBar shadow="shadow-xl">
			<svelte:fragment slot="lead">
				<div class="flex items-center">
					<button class="lg:hidden btn btn-sm mr-4" on:click={drawerOpen}>
						<span>
							<svg viewBox="0 0 100 80" class="fill-token w-4 h-4">
								<rect width="100" height="20" />
								<rect y="30" width="100" height="20" />
								<rect y="60" width="100" height="20" />
							</svg>
						</span>
					</button>
					<strong class="text-xl uppercase">Lehman Properties</strong>
				</div>
			</svelte:fragment>
			<svelte:fragment slot="trail">
				<button type="button" on:click={goToSignInPage} class="btn variant-filled">Sign in</button>
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<svelte:fragment slot="sidebarLeft">
		<Navigation isAdmin={false} />
	</svelte:fragment>
	<!-- (pageHeader) -->
	<!-- Router Slot -->
	<slot />
</AppShell>
