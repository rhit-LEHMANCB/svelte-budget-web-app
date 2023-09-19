<script lang="ts">
	import type { PageData } from './$types';
	import PropertiesTab from '$lib/Components/Admin/PropertiesTab.svelte';

	export let data: PageData;
</script>

<PropertiesTab properties={data.properties} />
