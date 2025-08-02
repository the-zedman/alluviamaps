import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
	return {
		title: 'AlluviaMaps - Discover Hidden Tracks & Historical Mining Sites',
		description: 'Advanced mapping application for bushwalking and gold fossicking enthusiasts in Australia'
	};
}; 