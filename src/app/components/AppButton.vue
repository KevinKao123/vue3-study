<template>
	<!-- <button class="com-button" @click="$emit('tap', text)">{{ text }}</button> -->
	<button class="com-button" @click="$emit('tap', text)">
		<slot></slot>
	</button>
</template>

<script>
export default {
	props: {
		text: {
			type: String,
			default: 'button'
		}
	},
	created() {
		this.$emit('init');
	}
};
</script>
<style scoped="scoped">
.com-button {
	outline: none;
	border: none;
	background-color: #e1e1e1;
	color: #5a5a5a;
	padding: 8px 16px;
	margin: 4px;
	cursor: pointer;
	border-radius: 3px;

	&:active {
		opacity: 0.8;
	}
}
</style>
