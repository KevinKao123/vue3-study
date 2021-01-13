import { RouteRecordRaw } from 'vue-router';
import PostIndex from './index/postIndex.vue';
import PostShow from './show/postShow.vue';
import PostMeta from './show/components/postMeta.vue';

const routes: Array<RouteRecordRaw> = [
	{
		path: '/posts',
		name: 'PostIndex',
		component: PostIndex,
		props: {
			sort: 'popular'
		}
	},
	{
		path: '/posts/:postId',
		props: true,
		name: 'PostShow',
		component: PostShow,
		children: [
			{
				path: 'meta',
				component: PostMeta
			}
		]
	}
];
export default routes;
