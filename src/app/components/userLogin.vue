<template>
	<div>
		<div>用户登录{{ username }}</div>
		<input type="text" ref="username" />
		<input type="text" />
		<app-input v-model="username"></app-input>
	</div>
</template>

<script>
import AppInput from './AppInput.vue';
export default {
	data() {
		return {
			username: ''
		};
	},
	components: {
		AppInput
	},
	beforeCreate() {
		console.log('组件创建之前');
	},

	created() {
		console.log('组件创建');
	},
	beforeMount() {
		console.log('组件挂载之前');
	},
	mounted() {
		console.log(this.$refs.username);
		this.$refs.username.focus();
		console.log('组件挂载');
	},
	updated() {
		console.log('组件更新');
	},
	unmounted() {
		console.log('组件卸载');
	}
};
</script>

<style></style>
