import { Module } from 'vuex';
import { RootState } from '@/app/app.store';

export interface UserState {
	currentUser: string;
}
// export type UserState {
// 	currentUser: string;
// }
const store: Module<UserState, RootState> = {
	namespaced: true,
	//使用命名空间
	state: {
		currentUser: ''
	},
	getters: {
		currentUser(state) {
			return state.currentUser;
		}
	},
	mutations: {
		setCurrentUser(state, data) {
			state.currentUser = data;
		}
	},
	actions: {
		getCurrentUser(context) {
			const user = 'kevinvue';
			context.commit('setCurrentUser', user);
		}
	}
};
// const store = {
// 	state: {
// 		currentUser: ''
// 	},
// 	mutations: {
// 		setCurrentUser(state, data) {
// 			state.currentUser = data;
// 		}
// 	}
// };
export default store;
