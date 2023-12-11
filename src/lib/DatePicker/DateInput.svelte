<script lang="ts">
	import { formatDate } from "./date-utils";

	export let value: Date;

	export let name = '';

	export let title = '';

	export let errors: string[] | undefined;

	const onChange = (newValue: string) => {
		value = new Date(newValue.replace(/-/g, '\/'));
	};

	$: convertedValue = value ? formatDate(value) : '';
</script>

<input
	{name}
	on:input={e => onChange(e.currentTarget.value)}
	bind:value={convertedValue}
	class="input"
	class:input-error={errors}
	{title}
	type="date"
/>