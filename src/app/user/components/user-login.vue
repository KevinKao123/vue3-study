<template>
  <div>UserLogin</div>
  <input type="text" name="" id="" placeholder="用户名" v-model="name" />
  <input type="password" name="" id="" placeholder="密码" v-model="password" />
  <button @click="login">登录</button>
</template>
<script>
import { apiHttpClient } from '@/app/app.service';
export default {
  data() {
    return {
      name: '',
      password: '',
    };
  },
  methods: {
    async login() {
      console.log(this.name, this.password);

      try {
        const response = await apiHttpClient.post('/login', {
          name: this.name,
          password: this.password,
        });
        console.log(response.data);

        this.$emit('login-success', response.data);
      } catch (error) {
        console.log(error.response);

        this.$emit('login-error', error.response);
      }
    },
  },
};
</script>