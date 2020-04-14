<template>
  <div>
    <van-nav-bar title="用户注册" left-text left-arrow @click-left="goBack" />

    <div class="register-panel">
      <van-field
        v-model="username"
        required
        placeholder="请输入用户名"
        clearable
        label="用户名"
        :error-message="userNameMsg"
      />

      <van-field
        v-model="password"
        type="password"
        label="密码"
        placeholder="请输入密码"
        required
        clearable
        :error-message="paswordMsg"
      />
      <div class="register-button">
        <van-button type="primary" :loading="openLoading" size="large" @click="submit">马上注册</van-button>
      </div>
      <div class="register-button">
        <van-button type="default" plain size="large" @click="goLogin()">去登录</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import { UserRegister } from "@/api/index";
export default {
  data() {
    return {
      username: "",
      password: "",
      openLoading: false,
      userNameMsg: "",
      paswordMsg: ""
    };
  },
  created() {

  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    goLogin() {
      this.$router.push({
        name: "Login"
      });
    },
    submit() {
      this.openLoading = true;
      if (!this.checkData()) {
        this.openLoading = false;
        return;
      }
      console.log(this.username, this.password);
      UserRegister(this.username, this.password).then(res => {
        console.log(res);
        this.openLoading = false;
        if (res.code == 200) {
          this.$toast(res.msg);
          this.username = "";
          this.password = "";

          this.$router.push({
            path: "/login"
          });
        } else {
          this.$toast(res.msg);
        }
      });
    },

    checkData() {
      let isOk = true;
      if (this.username.length < 5) {
        this.userNameMsg = "用户名不能小于5位";
        isOk = false;
      } else {
        this.userNameMsg = "";
      }

      if (this.password.length < 6) {
        this.paswordMsg = "密码不能少于6位";
        isOk = false;
      } else {
        this.paswordMsg = "";
      }
      return isOk;
    }
  }
};
</script>

<style>
.register-panel {
  width: 96%;
  border-radius: 5px;
  margin: 20px auto;
  padding-bottom: 50px;
}
.register-button {
  padding-top: 20px;
}
</style>