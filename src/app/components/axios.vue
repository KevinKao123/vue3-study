<template>
  <div>
    <h3>{{ name }}</h3>

    <user-login
      v-if="!isLoggedIn"
      @login-success="onLoginSuccess"
      @login-error="onLoginError"
    ></user-login>
    <div>{{ errorMessage }}</div>

    <div v-if="currentUser">
      <div>
        {{ currentUser.name }}
      </div>
      <button @click="logout">退出</button>
    </div>

    <!-- <div>{{ token }}</div> -->
    <label for="createPost"></label>
    <input
      v-if="isLoggedIn"
      id="createPost"
      type="text"
      v-model="title"
      @keyup.enter="createPost"
      placeholder="输入内容标题"
    />
    <!-- 选择多个文件 multiple  -->
    <input
      type="file"
      name=""
      ref="file"
      id=""
      @change="onChangeFile"
      accept="image/png,image/jpeg,image/jpg"
    />

    <div
      :class="['drag-zone', { active: dragZoneActive }]"
      @dragover.prevent
      @drop.prevent="onDropDragZone"
      @dragenter="dragZoneActive = true"
      @dragleave="dragZoneActive = false"
    >
      <div>把图像文件拖放到这</div>
    </div>

    <div v-if="imageUploadProgress">
      <span class="image-upload-progress">{{ imageUploadProgress + '%' }}</span>
    </div>

    <div v-if="imagePreviewUrl">
      <img :src="imagePreviewUrl" alt="" class="image-preview" />
    </div>

    <div v-for="post in posts" :key="post.id">
      <input
        type="text"
        :value="post.title"
        @keyup.enter="updatePost1($event, post.id)"
      />
      <input
        type="text"
        :value="post.content"
        @keyup.enter="updatePost2($event, post.id)"
      />
      {{ post.title }} - <small>{{ post.content }}</small> -{{
        post.user.name
      }}&nbsp;
      <button @click="deletePost(post.id)">删除</button>
    </div>
  </div>
</template>

<script>
// import axios from 'axios';
// import { axios } from '@/app/app.service';
import { apiHttpClient } from '@/app/app.service';
import UserLogin from '../user/components/user-login';

export default {
  components: {
    UserLogin,
  },
  data() {
    return {
      name: 'AXIOS & AUTH',
      posts: [],
      errorMessage: '',
      // user: {
      //   name: '张三',
      //   password: '123456',
      // },
      token: '',
      title: '',
      currentUser: null,
      imagePreviewUrl: null,
      imageUploadProgress: null,
      dragZoneActive: false,
    };
  },
  // 计算属性
  computed: {
    isLoggedIn() {
      return this.token ? true : false;
    },
  },
  async created() {
    this.getPosts();

    const tid = localStorage.getItem('tid');
    const uid = localStorage.getItem('uid');

    if (tid) {
      this.token = tid;
    }
    if (uid) {
      this.getCurrentUser(uid);
    }

    // 用户登录

    // try {
    //   const response = await apiHttpClient.post('/login', this.user);
    //   this.token = response.data.token;
    //   console.log(response.data);
    // } catch (error) {
    //   this.errorMessage = error.message;
    // }
  },
  // created() {
  // 	axios.get('http://192.168.10.101:3000/posts')
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

  methods: {
    onDropDragZone(event) {
      console.log(event.dataTransfer.files);

      this.dragZoneActive = false;
      const file = event.dataTransfer.files[0];

      if (file) {
        this.file = file;

        // 设置标题
        this.title = file.name.split('.')[0];

        // 生成预览图片
        this.createImagePreview(file);
      }
    },
    async createFile(file, postId) {
      // 创建表单
      const formData = new FormData();
      // 添加字段
      formData.append('file', file);

      // 上传文件
      try {
        const response = await apiHttpClient.post(
          `/files?post=${postId}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },

            onUploadProgress: (event) => {
              console.log(event);

              const { loaded, total } = event;

              this.imageUploadProgress = Math.round((loaded * 100) / total);
            },
          },
        );
        // 清理
        this.file = null;
        this.imagePreviewUrl = null;
        this.$refs.file.value = null;
        this.imageUploadProgress = null;

        console.log(response.data);
      } catch (error) {
        this.errorMessage - error.message;
      }
    },

    createImagePreview(file) {
      const reader = new FileReader();

      reader.readAsDataURL(file);

      reader.onload = (event) => {
        this.imagePreviewUrl = event.target.result;
      };
    },
    onChangeFile(event) {
      console.log(event.target.files);
      const file = event.target.files[0];

      if (file) {
        this.file = file;
        // split分割字符串为数组，[0]则为选取数组被.分割后的第一项，即文件名
        this.title = file.name.split('.')[0];

        // 生成预览图片
        this.createImagePreview(file);
      }
    },
    logout() {
      this.token = '';
      this.currentUser = null;

      localStorage.removeItem('tid');
      localStorage.removeItem('uid');
    },
    async getCurrentUser(userId) {
      try {
        const response = await apiHttpClient.get(`/users/${userId}`);

        this.currentUser = response.data;
      } catch (error) {
        this.errorMessage = error.message;
      }
    },
    onLoginSuccess(data) {
      this.token = data.token;
      this.getCurrentUser(data.id);

      localStorage.setItem('tid', data.token);
      localStorage.setItem('uid', data.id);
    },
    onLoginError(error) {
      this.errorMessage = error.data.message;
    },
    async getPosts() {
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
    },
    async createPost() {
      try {
        const response = await apiHttpClient.post(
          '/posts',
          {
            title: this.title,
            // content: this.content,
          },
          {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          },
        );

        console.log(response.data);

        if (this.file) {
          this.createFile(this.file, response.data.insertId);
        }

        this.title = '';
        this.getPosts();
      } catch (error) {
        this.errorMessage = error.message;
      }
    },
    async updatePost1(event, postId) {
      console.log(event.target.value);
      console.log(postId);

      try {
        await apiHttpClient.patch(
          `posts/${postId}`,
          {
            title: event.target.value,
          },
          {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          },
        );

        this.getPosts();
      } catch (error) {
        this.errorMessage = error.message;
      }
    },
    async updatePost2(event, postId) {
      console.log(event.target.value);
      console.log(postId);
      console.log('Hello,world!');

      try {
        await apiHttpClient.patch(
          `posts/${postId}`,
          {
            content: event.target.value,
          },
          {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          },
        );

        this.getPosts();
      } catch (error) {
        this.errorMessage = error.message;
      }
    },
    async deletePost(postId) {
      try {
        await apiHttpClient.delete(`/posts/${postId}`, {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        });
        this.getPosts();
      } catch (error) {
        this.errorMessage = error.message;
      }
    },
  },
};
</script>

<style>
.image-preview {
  max-width: 360px;
}
.image-upload-progress {
  font-size: 32px;
  font-weight: 300;
}
.drag-zone {
  width: 360px;
  height: 250px;
  background: #f8f8f8;
  color: #ababab;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.active {
  background: #83c7f7;
  color: #1790e9;
}
</style>
