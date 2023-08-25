import { toastStore, type ToastSettings } from '@skeletonlabs/skeleton';

export function successToast(message: string) {
	const successToast: ToastSettings = {
		message: message,
		// Provide any utility or variant background style:
		background: 'variant-filled-success'
	};
	toastStore.trigger(successToast);
}

export function errorToast(message: string) {
	const errorToast: ToastSettings = {
		message: message,
		// Provide any utility or variant background style:
		background: 'variant-filled-error'
	};
	toastStore.trigger(errorToast);
}
