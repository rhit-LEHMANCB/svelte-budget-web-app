<script lang="ts">
	import '../app.postcss';

	import { Modal, Toast, initializeStores } from '@skeletonlabs/skeleton';

	initializeStores();
</script>

<Toast />

<Modal />

<slot />
