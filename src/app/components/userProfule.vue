<template>
	<div>
		<keep-alive>
			<component :is="currentComponent"></component>
		</keep-alive>
		<p @click="onClickHintText">{{ hintText }}</p>
	</div>
</template>

<script>
import UserRegister from './userRegister.vue';
import UserLogin from './userLogin.vue';
export default {
	data() {
		return {
			currentComponent: 'UserRegister',
			hintText:'还没有账户，点击注册'
			// 显示的就是用户注册的component
		};
	},
	methods: {
		onClickHintText() {
			switch (this.currentComponent) {
				case 'UserRegister':
					this.currentComponent = 'UserLogin';
					this.hintText = '还没有账户，点击注册';
					break;
				case 'UserLogin':
					this.currentComponent = 'UserRegister';
					this.hintText = '点击登录';
					break;
			}
		}
	},
	components: {
		UserRegister,
		UserLogin
	}
};
</script>

<style></style>
