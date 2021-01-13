<template>
	<div @click="name = 'lalala'">{{ name }}</div>
	<div @click="changeName">{{ name }}</div>
	<div @click="changeName">{{ nameEmoji }}</div>
	<div @click="username = 'heiheihie'">{{ username }}</div>
</template>

<script>
import { reactive, ref, toRefs, onMounted, watch, computed } from 'vue';
export default {
	// created() {
	// },
	// mounted() {
	// },
	// updated() {
	// },
	setup() {
		//具有反映特性
		const name = ref('种太阳');

		const changeName = () => {
			name.value = 'Ninghaoma';
		};

		const user = reactive({
			username: '嘿嘿'
		});

		console.log(user);
		// console.log(name.value);

		// const { username } = toRefs(user);

		//生命周期
		onMounted(() => {
			console.log('mounted 挂载');
		});
		//监视数据
		watch(name, (newName, oldName) => {
			console.log(newName, oldName);
		});
		//计算属性
		const nameEmoji = computed(() => `${name.value} `);

		return {
			name,
			changeName,
			nameEmoji,
			// username
			...toRefs(user)
		};
	}

	// data() {
	// 	return {
	// 		name: 'kevin'
	// 	};
	// },
	// created() {
	// 	console.log(this.$data);
	// 	const user = {
	// 		name: 'kevin'
	// 	};
	// 	const handler = {
	// 		get(target,property) {
	// 			// return 'kkkkkevin';
	// 			//对象 对象中某个属性的名字
	// 			return target[property];
	// 		},
	// 		set(target,property,value){
	// 			if(property === 'name'){
	// 				if(value.length > 10){
	// 					throw new Error('名字太长了！');
	// 				}
	// 			}
	// 			return Reflect.set(target,property,value);
	// 		},

	// 	};
	// 	const userProxy = new Proxy(user, handler);

	// 	try{
	// 		userProxy.name = 'kkeviawldjlawn';
	// 	}catch(e){
	// 		//TODO handle the exception
	// 		console.log('错了',e.message);
	// 	}

	// 	console.log(userProxy.name);
	// }
};
</script>

<style>
@import url('../styles/app.css');
</style>
