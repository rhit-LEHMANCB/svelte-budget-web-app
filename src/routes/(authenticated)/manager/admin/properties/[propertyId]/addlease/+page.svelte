<script lang="ts">
	import type { PageData } from './$types';
	import AddLeaseForm from '$lib/Components/Forms/AddLeaseForm.svelte';

	export let data: PageData;
</script>

<AddLeaseForm data={data.form} usersOptions={data.usersOptions} />
