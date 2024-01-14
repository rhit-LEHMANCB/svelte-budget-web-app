<script lang="ts">
	import { goto, invalidateAll } from "$app/navigation";
	import { successToast, errorToast } from "$lib/Hooks/toasts";
	import { getToastStore } from "@skeletonlabs/skeleton";

    const toastStore = getToastStore();

    async function startCheckout() {
        const lookupKey = 'basic';
        const response = await fetch(`/api/stripe/create-checkout-session`, {
			method: 'POST',
            headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ lookupKey })
		});
		if (response.ok) {
            const body = await response.json();
            goto(body.url);
			successToast('User Successfully Removed.', toastStore);
		} else {
			errorToast('Error removing user.', toastStore);
		}
    }
</script>

<div>
    <button class='btn variant-filled-primary' on:click={startCheckout}>
        Pay
    </button>
</div>
