<template>
	<div>nihao,这是基础</div>

	<user-profule></user-profule>
	<!-- <app-button text="queding" @tap="onTapAppBtn" @init="onInitAppBtn"></app-button> -->
	<app-button @tap="onTapAppBtn" @init="onInitAppBtn">提交</app-button>
	<!-- <app-button></app-button> -->
	<!-- <app-button></app-button> -->
	<br />
	{{ processStatus }}
	<button v-on:click="resetName">resetName</button>
	<button @click="setName">setName</button>

	<div v-for="(post, index) in postList" :key="post.id">
		{{ index + 1 }} {{ post.content }}--
		<small>{{ post.author }}</small>
	</div>

	<div v-if="visible">隐藏的内容</div>
	<button @click="visible = !visible">{{ visible ? '隐藏' : '显示' }}</button>

	<div class="menu">
		<!-- <div :class="{active:false}"></div> -->
		<div :class="['menu-item', { active: currentItem === index }]" @click="currentItem = index" v-for="(item, index) in menuItems" :key="index">{{ item }}</div>
	</div>

	<h4>{{ name }}</h4>
	<!-- <input type="text" name="" id="" v-model="content" /> -->
	<!-- 等同于 -->
	<!-- <input type="text" :value="content" @input="content = $event.target.value" /> -->
	<!-- 监听change事件，只有提交才发生改变 -->
	<input type="text" v-model.lazy="content" />
	<span>Content:{{ content }}</span>
	<br />
	<!-- 保留num数字类型，不然会更改为string -->
	<input type="text" v-model.number="contentm" @change="onChangeContentM" />
	<span>Contentm:{{ contentm }}</span>
	<br />
	<!-- trim会去掉前后多余空格 -->
	<input type="text" v-model.trim="contentT" @change="onChangeContentT" />
	<span>ContentT:{{ contentT }}</span>
	<br />

	<textarea v-model="contents" placeholder="写点东西"></textarea>
	<span>Content:{{ contents }}</span>
	<br />
	<label for="check-1">
		<input type="checkbox" id="check-1" v-model="tags" value="daming" />
		Checked daming
	</label>
	<label for="check-2">
		<input type="checkbox" id="check-2" v-model="tags" value="xiaoming" />
		Checked xiaoming:
	</label>
	<span>Tags :{{ tags }}</span>

	<br />
	<label for="sub-annual">
		<input id="sub-annual" type="radio" value="annual" v-model="subscription" />
		一年
	</label>
	<label for="sub-quarterly">
		<input id="sub-quarterly" type="radio" value="quarterly" v-model="subscription" />
		季度
	</label>
	<span>sub:{{ subscription }}</span>

	<br />
	<select name="" id="" v-model="category">
		<option value="">--选择分类--</option>
		<option value="development">开发</option>
		<option value="game">游戏</option>
		<option value="music">音乐</option>
	</select>
	<span>category:{{ category }}</span>

	<br />
	元素发生变化
	<input type="text" @input="onInputContent" />
	用户提交修改数据
	<input type="text" @change="onChangeContent" />
	按下并抬起键盘按键
	<input type="text" @keyup="onKeyupInput" />

	<div>
		<form>
			<div class="form-group">
				<label for="email">
					メールアドレス
					<span>必須</span>
				</label>
				<input
					type="email"
					id="email"
					name="entry_email"
					placeholder=""
					class="form-field required"
					title="メールアドレス"
					required="required"
					@change="onlpp"
					v-model="formlpp[0]"
				/>
			</div>
			<div class="form-group">
				<label for="tel">
					電話番号
					<span>必須</span>
				</label>
				<input type="text" id="tel" name="entry_tel" placeholder="" class="form-field required" title="電話番号" required="required" @change="onlpp" v-model="formlpp[1]" />
			</div>
			<div class="form-group">
				<label for="hopeWork">
					希望職種
					<span>必須</span>
				</label>
				<br />
				<select id="hopeWork" class="form-field" title="希望職種" name="entry_hopeWork" @change="onlpp" v-model="formlpp[2]">
					<option value="" selected>希望なし</option>
					<option value="コールセンター">コールセンター</option>
					<option value="訪問">訪問</option>
					<option value="事務・経理">事務・経理</option>
				</select>
			</div>
			<div class="form-group">
				<label for="contactMethod">希望連絡手段</label>
				<br />
				<div class="radio radio_e">
					<input
						name="contactMethod"
						type="radio"
						value="メール"
						checked="checked"
						id="radio-1"
						class="form-field"
						title="希望連絡手段"
						@change="onlpp"
						v-model="formlpp[3]"
					/>
					<label for="radio-1" class="radio-label">メール</label>
				</div>
				<div class="radio radio_e">
					<input name="contactMethod" value="電話" type="radio" id="radio-2" class="form-field" @change="onlpp" v-model="formlpp[3]" />
					<label for="radio-2" class="radio-label">電話</label>
				</div>
			</div>
			<div class="formSubmit"><input type="submit" @click="sendmessage" value="送信" /></div>
		</form>
	</div>
</template>

<script>
import AppButton from './AppButton.vue';
import UserProfule from './userProfule.vue';
export default {
	data() {
		return {
			formlpp: [],
			name: 'lalala',
			content: '我是内容',
			contents: '',
			contentm: 0,
			contentT: '',

			// checkbox1: true,
			// checkbox2: true,
			tags: [],
			subscription: 'annual',
			category: '',

			menuItems: ['index', 'hot', 'adv'],
			currentItem: 0,

			visible: true,
			//一般情况列表数据来自父端接口
			postList: [
				{
					id: 1,
					content: 'neirong1',
					author: 'author1'
				},
				{
					id: 2,
					content: 'neirong2',
					author: 'author2'
				},
				{
					id: 3,
					content: 'neirong3',
					author: 'author3'
				}
			]
		};
	},
	components: {
		AppButton,
		UserProfule
	},

	computed: {
		processStatus() {
			return this.name === 'lalala' ? '初始化' : '重新设置了数据';
		}
	},
	watch: {
		name(newName, oldName) {
			console.log(`name 发生了变化：${oldName} -> ${newName}`);
		}
	},

	created() {
		console.log('app 组件已经创建');
		console.log('contentm 数据的类型（组件创建时）：', typeof this.contentm);

		this.setName();
	},
	methods: {
		sendmessage() {
			const che = this.formlpp;
			if (che[0] != undefined && che[1] != undefined && che[2] != undefined && che[3] != undefined) {
				console.log('OK！');
			} else {
				console.log('error');
			}
		},
		onlpp() {
			console.log(this.formlpp);
			console.log(this.formlpp[2]);
		},

		onTapAppBtn(text) {
			console.log('on tap app btn', text);
		},
		onInitAppBtn(text) {
			console.log('on init app btn', text);
		},

		setName() {
			setTimeout(() => {
				this.name = '我摊牌了';
			}, 3000);
		},
		resetName() {
			this.name = 'lalala';
		},
		onInputContent(event) {
			console.log(event);
			// console.log(event.target.value);
		},
		onChangeContent(event) {
			console.log(event.target.value);
		},
		onKeyupInput(event) {
			console.log(event);
			if (event.key === 'Enter') {
				console.log('回车了');
			}
		},
		onChangeContentM() {
			console.log('contentm 数据的类型（组件创建时）：', typeof this.contentm);
		},
		onChangeContentT() {
			console.log(this.contentT, this.contentT.length);
		}
	}
};
</script>

<style></style>
