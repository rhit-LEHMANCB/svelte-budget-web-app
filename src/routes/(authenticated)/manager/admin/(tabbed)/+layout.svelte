<script lang="ts">
	import { TabAnchor, TabGroup } from '@skeletonlabs/skeleton';
	import type { LayoutData } from './$types';
	import { IconBuildingEstate, IconUsers } from '@tabler/icons-svelte';
	import { page } from '$app/stores';
</script>

<div class="card m-5">
	<!-- TODO: separate these two tabs into different routes with common layout -->
	<TabGroup>
		<TabAnchor href="/manager/admin/properties" selected={$page.url.pathname === '/manager/admin/properties'}>
			<div class="flex gap-2">
				<IconBuildingEstate />
				<span>Properties</span>
			</div>
		</TabAnchor>
		<TabAnchor href="/manager/admin/users" selected={$page.url.pathname === '/manager/admin/users'}
			><div class="flex gap-2">
				<IconUsers />
				<span>Users</span>
			</div></TabAnchor
		>
		<!-- Tab Panels --->
		<svelte:fragment slot="panel">
			<slot />
		</svelte:fragment>
	</TabGroup>
</div>
