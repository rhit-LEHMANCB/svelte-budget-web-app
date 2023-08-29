<script lang="ts">
	import { TabGroup, Tab, localStorageStore } from '@skeletonlabs/skeleton';
	import type { PageData } from './$types';
	import { IconBuildingEstate, IconUsers } from '@tabler/icons-svelte';
	import type { Writable } from 'svelte/store';
	import UsersTab from '$lib/Components/Admin/UsersTab.svelte';

	export let data: PageData;

	const tabSet: Writable<number> = localStorageStore('tabSet', 0);
</script>

<div class="card m-5">
	<!-- TODO: separate these two tabs into different routes with common layout -->
	<TabGroup>
		<Tab bind:group={$tabSet} name="properties" value={0}>
			<div class="flex gap-2">
				<IconBuildingEstate />
				<span>Properties</span>
			</div>
		</Tab>
		<Tab bind:group={$tabSet} name="users" value={1}
			><div class="flex gap-2">
				<IconUsers />
				<span>Users</span>
			</div></Tab
		>
		<!-- Tab Panels --->
		<svelte:fragment slot="panel">
			{#if $tabSet === 0}
				(tab panel 1 contents)
			{:else if $tabSet === 1}
				<UsersTab users={data.users} />
			{/if}
		</svelte:fragment>
	</TabGroup>
</div>
