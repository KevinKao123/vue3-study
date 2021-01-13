<template>
	<div>
		<!-- <h3>{{ $store.state.name }} {{ appName }}</h3> -->
		<h3 @click="onClickName()" class="nameColor">
			{{ name }}
			<span v-if="loadingState">加载中...</span>
		</h3>
		<br />
		{{ user.currentUser }}
	</div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';

export default {
	data() {
		return {};
	},
	computed: {
		// ...mapState(['names'])
		...mapState({
			// appName: 'names',
			loadingState: 'loading',
			user: 'user'
		}),
		...mapGetters({
			name: 'name',
			currentUser: 'user/currentUser'
		})
	},
	created() {
		// this.$store.dispatch('getName');
		this.getName();
		this.getCurrentUser();
	},
	methods: {
		...mapMutations(['setName']),
		...mapActions({
			getName: 'getName', //对应store中的actions
			getCurrentUser: 'user/getCurrentUser'
		}),
		onClickName() {
			if (this.$store.state.name === 'kevin') {
				// this.$store.commit('setName', 'kevin Change');
				this.setName('kevin Change');
			} else {
				// this.$store.commit('setName', 'kevin');
				this.setName('kevin');
			}
		}
	}
};
</script>

<style>
.nameColor {
	background-color: #dda0dd;
}
</style>
