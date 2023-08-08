<script lang="ts">
	import { AppBar, AppShell, Drawer, drawerStore, type DrawerSettings, LightSwitch, Avatar } from '@skeletonlabs/skeleton';
	import Navigation from '$lib/Navigation/Navigation.svelte';
	import { page } from '$app/stores';
	import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
	import { auth } from '$lib/firebase';
	import { goto } from '$app/navigation';
	import type { LayoutData } from './$types';

	export let data: LayoutData;

	$: ({user} = data);

	const drawerSettings: DrawerSettings = {
		width: 'w-[80vw] md:w-[280px]',
		id: 'home'
	}

	function drawerOpen(): void {
		drawerStore.open(drawerSettings);
	}

	function goToSignInPage(): void {
		goto('/signin');
	}

	async function signOutSSR() {
		const res = await fetch("/api/signin", {method: "DELETE"});
		await signOut(auth);
		goto('/');
	}
</script>

<Drawer>
	<Navigation />
</Drawer>

<AppShell slotSidebarLeft="bg-surface-500/5 w-0 lg:w-64">
	<svelte:fragment slot="header">
		{#if !$page.url.pathname.startsWith('/signin')}
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
						<strong class="text-xl uppercase">Property Manager</strong>
					</div>
				</svelte:fragment>
				<svelte:fragment slot="trail">
					<span>Welcome, {user.firstName ?? 'New User'}</span>
					<button type="button" on:click={signOutSSR} class="btn variant-filled">Sign out</button>
				</svelte:fragment>
			</AppBar>
		{/if}
	</svelte:fragment>
	<svelte:fragment slot="sidebarLeft">
		<Navigation />
	</svelte:fragment>
	<!-- (pageHeader) -->
	<!-- Router Slot -->
	<slot />
</AppShell>
