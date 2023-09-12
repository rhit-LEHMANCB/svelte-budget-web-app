<script lang="ts">
	import { Paginator } from '@skeletonlabs/skeleton';
	import { IconHomeMinus, IconHomePlus } from '@tabler/icons-svelte';
	import { modalStore, type ModalSettings } from '@skeletonlabs/skeleton';
	import { errorToast, successToast } from '$lib/Hooks/toasts';
	import type { DocumentWithId } from '../../../app';
	import { goto, invalidateAll } from '$app/navigation';

	export let properties: DocumentWithId[];

	let page = {
		offset: 0,
		limit: 5,
		size: properties.length,
		amounts: [1, 2, 5, 10]
	};

	$: paginatedProperties = properties.slice(
		page.offset * page.limit, // start
		page.offset * page.limit + page.limit // end
	);

	async function handleConfirmResponse(confirmed: boolean, userId: string) {
		if (confirmed) {
			await removeProperty(userId);
		}
	}

	function confirmModal(property: DocumentWithId) {
		const confirmModal: ModalSettings = {
			type: 'confirm',
			// Data
			title: 'Please Confirm',
			body: `Are you sure you wish to delete ${property.data.title}?`,
			// TRUE if confirm pressed, FALSE if cancel pressed
			response: (response) => handleConfirmResponse(response, property.id)
		};
		modalStore.trigger(confirmModal);
	}

	function addPropertyClicked() {
		goto('/manager/admin/properties/add');
	}

	async function removeProperty(id: string) {
		await fetch(`/api/property/${id}`, {
			method: 'DELETE'
		})
			.then(() => {
				successToast('Property Successfully Removed.');
				invalidateAll();
			})
			.catch(() => errorToast('Error removing property.'));
	}
</script>

<button on:click={addPropertyClicked} class="btn btn-sm variant-filled-primary ml-5"
	><IconHomePlus class="mr-2" />Add Property</button
>
<div class="grid grid-flow-row p-5 gap-5">
	{#each paginatedProperties as property}
		<div class="card p-5 bg-surface-200 flex flex-initial gap-2">
			<strong class="h4">{`${property.data.title}`}</strong>
			<div class="flex grow justify-end">
				<button on:click={() => confirmModal(property)} class="btn-icon btn-sm variant-filled-error"
					><IconHomeMinus /></button
				>
			</div>
		</div>
	{/each}
	<Paginator bind:settings={page} showFirstLastButtons={false} showPreviousNextButtons={true} />
</div>
