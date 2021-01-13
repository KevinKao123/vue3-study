import { createStore, createLogger } from 'vuex';
import user, { UserState } from '@/user/user.store';
// import { createApp } from 'vue';
import { logger } from './app.plugin';

export interface RootState {
	name: string;
	loading: boolean;
	user?: UserState;
}

// 创建Store
const store = createStore({
	state: {
		// name: 'kevin',
		name: '',
		// names: 'kevins',
		loading: false
	},
	getters: {
		name(state) {
			return ` ${state.name}`;
		}
	},
	mutations: {
		setName(state, data) {
			state.name = data;
		},
		setLoading(state, data) {
			state.loading = data;
		}
	},
	actions: {
		//请求接口，获取数据
		// getName(context) {
		// 	//vuex中定义的store都支持context参数
		// 	const nameData = 'kevin';
		// 	context.commit('setName', nameData);
		// 	console.log(context);
		// }
		getName({ commit, rootState }) {
			console.log(rootState);
			//vuex中定义的store都支持context参数
			commit('setLoading', true);
			setTimeout(() => {
				const nameData = 'kevin';
				commit('setName', nameData);
				commit('setLoading', false);
			}, 2000);
			console.log(commit);
		}
	},
	modules: {
		user
	},
	plugins: [
		createLogger(), //控制台查看效果
		logger
	] //插件
});

export default store;
