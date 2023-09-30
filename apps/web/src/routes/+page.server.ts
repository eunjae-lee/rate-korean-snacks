import { env } from '$env/dynamic/private';
import { PUBLIC_SUPABASE_URL } from '$env/static/public';
import type { Actions } from '@sveltejs/kit';
import { createSupabaseServerClient } from '@supabase/auth-helpers-sveltekit';

export const actions: Actions = {
	default: async ({ request, cookies }) => {
		const data = await request.formData();
		const id = Number(data.get('id'));

		const supabase = createSupabaseServerClient({
			supabaseUrl: PUBLIC_SUPABASE_URL,
			supabaseKey: env.SUPABASE_PRIVATE_KEY,
			event: {
				cookies,
			},
		});

		const result = await supabase.rpc('increment_count', {
			param_key: `korean-snack-${id}`,
		});
		console.log({ result });

		return { success: true };
	},
};
