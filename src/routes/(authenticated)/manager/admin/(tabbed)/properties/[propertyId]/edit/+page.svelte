<script lang="ts">
	import type { PageData } from './$types';
	import PropertyForm from '$lib/Components/Forms/PropertyForm.svelte';
	import { enhance } from '$app/forms';
	import SortablePhotos from '$lib/Components/SortablePhotos.svelte';
	import { errorToast, successToast } from '$lib/Hooks/toasts';
	import { page } from '$app/stores';
	import { invalidateAll } from '$app/navigation';
	import type { PhotoItem } from '../../../../../../../../app';

	export let data: PageData;

	$: photos = data.photos;

	async function sortList(e: CustomEvent) {
		const newList = e.detail;
		photos = newList;
		try {
			await fetch(`/api/property/${$page.params.propertyId}/photos`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ photos: newList })
			}).then(() => {
				invalidateAll();
			});
		} catch (error) {
			errorToast('Error reordering photos.');
		}
	}

	async function deleteLink(item: PhotoItem) {
		try {
			await fetch(`/api/property/${$page.params.propertyId}/photos`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ photo: item })
			}).then(() => {
				successToast('Photo successfully deleted.');
				invalidateAll();
			});
		} catch (error) {
			errorToast('Error deleting photo.');
		}
	}

	function handleError(ev: Event, item: PhotoItem) {
		if (ev.target as HTMLImageElement) {
			(ev.target as HTMLImageElement).src = item.photoUrl;
		}
	}
</script>

<PropertyForm data={data.form} />
<hr />
<form
	class="flex flex-col gap-4 m-5 pb-5"
	use:enhance
	method="POST"
	action="?/photos"
	enctype="multipart/form-data"
>
	<strong class="h4">Photos</strong>
	<div class="grid grid-cols-8 gap-4">
		<input
			name="photos"
			class="input col-span-3"
			type="file"
			multiple
			accept="image/png, image/jpeg, image/gif, image/webp"
		/>
		<div>
			<button type="submit" class="btn variant-filled-secondary">Add</button>
		</div>
	</div>
	<SortablePhotos list={photos} on:sort={sortList} let:item let:index>
		<div class="group relative">
			<div class="w-40 h-40 overflow-hidden flex items-center justify-center">
				<img src={item.photoUrl} alt={item.id} on:error={(ev) => handleError(ev, item)} />
			</div>
			<button
				on:click={() => deleteLink(item)}
				class="chip variant-filled-error invisible group-hover:visible transition-all absolute -right-2 -bottom-4"
				>Delete</button
			>
			<span class="badge-icon variant-filled absolute -left-3 -top-3">{index + 1}</span>
		</div>
	</SortablePhotos>
</form>
