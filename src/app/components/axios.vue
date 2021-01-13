<template>
	<div>
		<div>{{ errorMessage }}</div>
		<div v-for="post in posts" :key="post.id">
			{{ post.title }} -
			<small>{{ post.content }}</small>
		</div>
	</div>
</template>

<script>
// import axios from 'axios';
// import { axios } from '@/app/app.service';
import { apiHttpClient } from '@/app/app.service';

export default {
	data() {
		return {
			posts: [],
			errorMessage: '',
			user: {
				name: 'kevin',
				password: '123123'
			}
		};
	},
	async created() {
		try {
			// const response = await axios.get('/posts', {
			// 	baseURL: 'http://192.168.10.101:3000'
			// });
			// const response = await axios({
			// 	method: 'get',
			// 	url: '/posts',
			// 	baseURL: 'http://192.168.10.101:3000',
			// 	headers: {
			// 		//头部数据
			// 		// 'X-Custom': 'hello ~'
			// 	}
			// });

			// const response = await axios.get('/posts');
			const response = await apiHttpClient.get('/posts');

			// console.log(axios.defaults);

			this.posts = response.data;
		} catch (error) {
			this.errorMessage = error.message;
		}

		//用户登录
		// try {
		// 	const response = await apiHttpClient.post('/login', this.user);
		// 	console.log(response.data);
		// } catch (error) {
		// 	this.errorMessage = error.message;
		// }
	}
	// created() {
	// 	axios.get('http://192.168.10.101:3000/posts');
	// 				.then(response => {
	// 					console.log(response);
	// 					this.posts = response.data;
	// 				})
	// 				.catch(error => {
	// 					console.log(error.message);
	// 					console.log(error.response);

	// 					this.errorMessage = error.message;
	// 				})
	// }
};
</script>

<style></style>
