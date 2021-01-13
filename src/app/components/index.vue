<template>
	<div>
		<div @click="onClickText">你好，这是首页</div>
		<div class="page">
			<div class="card">
				<div class="card_header">
					<h3 class="card_title">{{ name }}</h3>
					<div class="card_subtitle">Transition & Animation</div>
				</div>
				<div class="card_content">
					<!-- <div v-if="isActive" :class="['emoji', { hidden: !isActive }]">😻</div> -->
					<!-- <transition name="slide"> -->
					<!-- <div v-if="isActive" :class="['emoji']">😻</div> -->
					<!-- <transition name="pulse" mode="out-in" enter-active-class="animate__animated animate__tada" leave-active-class="animate__animated animate__backOutDown">
						<component :is="currentEmoji"></component>
					</transition> -->

					<!-- <transition-group name="custom" leave-active-class="animate__animated  animate__tada">
						<div class="emoji" v-for="emoji in emojiList" :key="emoji">{{ emoji }}</div>
					</transition-group> -->

					<div class="emoji">{{ animatedNumber }}</div>
				</div>
				<div class="card_action">
					<!-- <button @click="isActive = !isActive" :class="{ active: isActive }">please press here</button> -->
					<button @click="shuffle()" :class="{ active: isActive }">press here</button>
					<button @click="pop()">press</button>
					<button @click="number = number + 10">press</button>
				</div>
			</div>
			<div class="status">
				<small>isActive:{{ isActive }}</small>
			</div>
		</div>
	</div>
</template>

<script>
//npm install lodash
import _ from 'lodash';
//yarn add gsap
import gsap from 'gsap';

// import GhostEmoji from './animate/ghost-emoji.vue';
// import RobotEmoji from './animate/robot-emoji.vue';
export default {
	data() {
		return {
			name: 'hello world',
			isActive: false,
			emoji: 'GhostEmoji',
			emojiList: ['🍌', '🍊', '🥚'],
			number: 0,
			tweenedNumber: 0
		};
	},
	computed: {
		// 计算
		currentEmoji() {
			return this.isActive ? 'GhostEmoji' : 'RobotEmoji';
		},
		animatedNumber() {
			return this.tweenedNumber.toFixed(0);
			//小数位数为0
		}
	},
	watch: {
		number(newValue) {
			gsap.to(this.$data, { duration: 0.5, tweenedNumber: newValue });
		}
	},
	components: {
		//组件
		// GhostEmoji,RobotEmoji
	},
	methods: {
		//方法
		onClickText() {
			//创建历史记录
			this.$router.push('/about');
			//替换页面，不创建历史
			// this.$router.replace('/about');
		},
		shuffle() {
			this.emojiList = _.shuffle(this.emojiList);
		},
		pop() {
			this.emojiList.pop();
		}
	}
};
</script>

<style>
@import url('../styles/card.css');
.page {
	padding: 32px;
	margin: 32px;
}
.emoji {
	font-size: 90px;
	transition: 0.5s;
}
.hidden {
	opacity: 0;
}
.pulse {
	animation: pulse 1s infinite;
}
@keyframes pulse {
	from {
		transform: scale3d(1, 1, 1);
	}
	50% {
		transform: scale3d(1.2, 1.2, 1.2);
	}
	to {
		transform: scale3d(1, 1, 1);
	}
}

/* .v-enter-from{
	opacity: 0;
}
.v-enter-active{
	transition: 0.3s;
}
.v-enter-to{
	opacity: 1;
}

.v-leave-from{
	opacity: 1;
}
.v-leave-active{
	transform: .3s;
}
.v-leave-to{
	opacity: 0;
} */

.slide-enter-from {
	/* 自己设置的transition名字 */
	opacity: 0;
}
.slide-enter-active {
	transition: 0.3s;
}
.slide-enter-to {
	opacity: 1;
}

.slide-leave-from {
	opacity: 1;
}
.slide-leave-active {
	transform: 0.3s;
}
.slide-leave-to {
	opacity: 0;
}
.pulse-enter-active {
	animation: pulse 1s infinite;
}
.pulse-leave-active {
	animation: pulse 1s infinite;
}

.v-move {
	transition: 0.5s;
}
</style>
