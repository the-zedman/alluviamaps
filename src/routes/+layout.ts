import type { LayoutLoad } from './$types';
import { initializeAuth } from '$lib/auth';

export const load: LayoutLoad = async () => {
	// Initialize authentication
	await initializeAuth();
	
	return {
		appName: 'AlluviaMaps',
		version: '0.0.1'
	};
}; 