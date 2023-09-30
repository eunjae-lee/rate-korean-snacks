<script>
	// Finally, your application's global stylesheet (sometimes labeled 'app.css')
	import '../app.postcss';

	import progress from 'nprogress';
	import 'nprogress/nprogress.css';
	import { beforeNavigate, afterNavigate } from '$app/navigation';

	beforeNavigate(() => {
		progress.start();
	});

	afterNavigate(() => {
		progress.done();
	});
</script>

<div class="container mx-auto py-4 sm:py-8">
	<slot />
</div>
