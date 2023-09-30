export const APP_NAME = 'Rate Korean Snacks';
export const APP_DESCRIPTION = 'Which one do you like the most?';
export const DEFAULT_LANG = 'en';

export const AUTHOR_NAME = 'Eunjae Lee';

export const SIGN_IN_PATH = '/sign_in';
export const SIGN_UP_PATH = '/sign_up';
export const REDIRECT_SIGNED_IN_USER_TO = '/my-secret-page';

export const BASE_URL = 'https://rate-korean-snacks.vercel.app';
export const POST_URL_PREFIX = `${BASE_URL}/post`;

export const isProtectedRoute = (url: URL) => {
	return url.pathname.startsWith('/super-secret-path');
};

export const NUMBER_OF_VOTES = 3;
export const LOCAL_STORAGE_KEY = 'votes';
