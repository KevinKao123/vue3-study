<template>
	<div>
		postShow {{ $route.params.postId }}
		<br />
		postShow {{ postId }}
		<br />
		<router-view></router-view>
	</div>
</template>

<script>
export default {
	props: {
		postId: String
	},
	created() {
		console.log(this.$route.params.postId);
	}
};
</script>

<style></style>
