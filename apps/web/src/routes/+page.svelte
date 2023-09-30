<script lang="ts">
	import { MetaTags, type MetaTagsProps } from 'svelte-meta-tags';
	import type { PageData } from './$types';
	import { onMount } from 'svelte';
	import { APP_DESCRIPTION, APP_NAME, NUMBER_OF_VOTES, LOCAL_STORAGE_KEY } from '$lib/config';
	import { snacks } from '$lib/snacks';
	import { enhance } from '$app/forms';

	export let data: PageData;

	let votedIds: number[] = [];

	let metaTags: MetaTagsProps = {
		title: APP_NAME,
		description: APP_DESCRIPTION,
		openGraph: {
			// url: 'https://',
			title: APP_NAME,
			description: APP_DESCRIPTION,
			// images: [
			// 	{
			// 		url: 'https://',
			// 	},
			// ],
			site_name: APP_NAME,
		},
		twitter: {
			// handle: '@eunjae_lee',
			// site: '@learnwitheunjae',
			cardType: 'summary', //'summary_large_image'
			title: APP_NAME,
			description: APP_DESCRIPTION,
			// image: 'https://',
			imageAlt: APP_NAME,
		},
	};

	onMount(() => {
		try {
			const votes = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
			if (Array.isArray(votes)) {
				votedIds = votes;
			}
		} catch (_e) {
			// do nothing
		}
	});
</script>

<MetaTags {...metaTags} />

<h1 class="text-center text-3xl font-black text-primary-800">Rate Korean Snacks!</h1>
{#if votedIds.length < NUMBER_OF_VOTES}
	<p class="mt-4 text-center text-lg font-medium text-secondary-500">
		You can vote for {NUMBER_OF_VOTES - votedIds.length} snacks.
	</p>
{:else}
	<p class="mt-4 text-center text-lg font-medium text-secondary-700">
		Thanks for participating. I hope you enjoyed!
	</p>
{/if}

<div class="mt-16 mx-8 grid grid-cols-2 gap-8">
	{#each snacks as snack}
		<form
			class="card"
			method="POST"
			use:enhance={() => {
				return () => {
					votedIds.push(snack.id);
					localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(votedIds));
					votedIds = votedIds;
				};
			}}
		>
			<input type="hidden" name="id" value={snack.id} />
			<header class="card-header relative">
				<img
					class="w-full max-h-64 object-cover"
					src={`/${snack.filename}`}
					alt={`Image of ${snack.name}`}
				/>
				<a
					class="absolute opacity-75 hover:opacity-100 bottom-2 right-4 btn-icon variant-filled-surface cursor-pointer"
					href={snack.url}
					target="_blank"
					><svg
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
						class="lucide lucide-external-link"
						><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline
							points="15 3 21 3 21 9"
						/><line x1="10" x2="21" y1="14" y2="3" /></svg
					>
					<span class="sr-only">
						View google search result of {snack.name}
					</span>
				</a>
			</header>
			<section class="p-4">
				<p class="text-lg text-center">{snack.name}</p>
			</section>
			<footer class="card-footer">
				<button
					type="submit"
					class="w-full btn btn-lg variant-filled-primary text-white font-bold text-xl"
					disabled={votedIds.includes(snack.id)}
				>
					{#if votedIds.includes(snack.id)}
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
							class="lucide lucide-check"><polyline points="20 6 9 17 4 12" /></svg
						>
						<span>Voted</span>
					{:else}
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
							class="lucide lucide-vote"
							><path d="m9 12 2 2 4-4" /><path
								d="M5 7c0-1.1.9-2 2-2h10a2 2 0 0 1 2 2v12H5V7Z"
							/><path d="M22 19H2" /></svg
						>

						<span>Vote</span>
					{/if}
				</button>
			</footer>
		</form>
	{/each}
</div>
