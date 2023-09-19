<script lang="ts">
	import type { PageData } from './$types';
	import PropertyForm from '$lib/Components/Forms/PropertyForm.svelte';

	export let data: PageData;
</script>

<PropertyForm dataForm={data.form} />
