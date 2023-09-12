<script lang="ts">
	import type { PageData } from '../../$types';
	import UsersTab from '$lib/Components/Admin/UsersTab.svelte';

	export let data: PageData;
</script>

<UsersTab users={data.users}/>
