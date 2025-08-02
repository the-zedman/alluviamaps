import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async () => {
	return {
		appName: 'AlluviaMaps',
		version: '0.0.1'
	};
}; 