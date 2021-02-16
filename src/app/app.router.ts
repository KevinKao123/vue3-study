import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Index from './components/index.vue';
import About from './components/about.vue';
import VuexPage from './components/vuex.vue';
import ReactSystem from './components/ReactSystem.vue';
import Axios from './components/axios.vue';
import Auth from "./components/auth.vue";
//@表示src
import postRoutes from '@/app/post/post.routes';
//定义路由
const routes: Array<RouteRecordRaw> = [
	{
		path: '/',
		component: Index,
		meta: {
			requireAuth: true
		}
	},
	{
		path: '/about',
		name: 'AboutName',
		component: About,
		meta: {
			requireAuth: true
		}
	},
	{
		path: '/about-us',
		// redirect: '/about'
		// redirect: { name: 'AboutName' }
		redirect: to => {
			console.log(to);
			return '/about';
		}
	},
	{
		path: '/vuex',
		name: 'VuexPage',
		component: VuexPage
	},
	{
		path: '/react',
		name: 'ReactSystem',
		component: ReactSystem
	},
	{
		path: '/axios',
		name: 'Axios',
		component: Axios
	},
	...postRoutes,
	{
		path: '/auth',
		name: 'Auth',
		component: Auth
	}
];
// 创建路由器
const router = createRouter({
	history: createWebHistory(),
	routes
});
//导航守卫
router.beforeEach((to, from, next) => {
	const requireAuth = to.matched.some(record => record.meta.requireAuth);
	if (requireAuth) {
		console.log('👮auth🌞');
	}
	next();
	// console.log('👮');
	// console.log('to:', to);
	// console.log('from:', from);
	// // next();
	// console.log('to:', to.name);
	// if (to.name === 'postIndex') {
	// 	next('/');
	// 	console.log('toname:', to.name);
	// } else {
	// 	next();
	// }
});
export default router;
