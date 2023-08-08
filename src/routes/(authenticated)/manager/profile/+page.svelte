<script lang="ts">
    import type { PageData } from './$types';
    
    export let data: PageData;
</script>

<div>
    
    <label class="label"><span>Preferred Name</span><input bind:value={data.user.firstName} class="input" title="Preferred Name" type="text" /></label>
    <label class="label"><span>Last Name</span><input bind:value={data.user.lastName} class="input" title="Last Name" type="text" /></label>

    
</div>