<template>
  <div class="login">
      <card>
        <div class="title">
          <span  style="font-size: 150%" v-if="roleFlag===0">用户登录</span>
          <span  style="font-size: 150%" v-else-if="roleFlag===1">管理员登录</span>
          <span  style="font-size: 150%" v-else-if="roleFlag===2">用户注册</span>
        </div>
        <Form ref="formItem" :model="formItem" :rules="ruleValidate" :label-width="0" class="loginForm">
          <FormItem prop="username" class="userName">
            <Input size="large" placeholder="请输入账号" v-model="formItem.username">
              <Icon type="ios-contact" slot="prefix" />
            </Input>
          </FormItem>
          <FormItem prop="password" class="passWord">
            <Input size="large"  placeholder="请输入密码" v-model="formItem.password" type="password">
              <Icon type="ios-lock"  slot="prefix"/>
            </Input>
          </FormItem>
        </Form>
        <Button type="primary" size="large"  @click="handleSubmit('formItem')" class="loginButton" v-if = "flag">登录</Button>
        <Button type="primary" size="large"  @click="handleRegisterSubmit('formItem')" class="loginButton" v-else-if="!flag">注册</Button>
        <div class="flexBetween">
          <SPAN style="float: left;height: 100%;margin-top: 5%;">或</SPAN>
          <A type="text" @click="register()" style="float: left;height: 100%;color: cornflowerblue;margin-top: 5%" >注册账号</A>
          <A type="text" @click="changeRole(1)" style="float: right;height: 100%;color: cornflowerblue;margin-top: 5%" v-if="roleFlag===0">管理员通道</A>
          <A type="text" @click="changeRole(0)" style="float: right;height: 100%;color: cornflowerblue;margin-top: 5%" v-else-if="roleFlag!==0">用户登录</A>
        </div>
      </card>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      // 表单
      formItem: {
        username: "",
        password: "",
      },
      // 校验规则
      ruleValidate: {
        username: [{
          required: true,
          message: "输入用户名",
          trigger: "blur",
        }, ],
        password: [{
          required: true,
          message: "输入密码",
          trigger: "blur",
        }, ],
      },
      flag: true,
      roleFlag: 0,
    };
  },
  methods: {
    // 提交表单
    handleSubmit(name) {
      // 校验表单数据
      const that = this;
      this.$refs[name].validate((valid) => {
        if (valid) {
          // 校验成功 发起请求
          this.axios.get(this.api.baseUrl + "/user/login" + "/" + this.formItem.username + "/" + this.formItem.password).then((res) => {
                let code = res.data.code;
                let msg = res.data.msg;
                if (code === 200) {
                  that.$Message.success(msg);
                  this.$cookies.set("userName", this.formItem.username);
                  //如果登录成功进行转
                  let role = JSON.parse(JSON.stringify(res.data.data.userRole));
                  if (role===0){
                    that.$router.push("/userInformation");
                  }else if (role===1){
                    that.$router.push("/backIndex");
                  }
                } else {
                    // todo 登录失败处理
                    that.$Message.error(msg);
                }
              }).catch(function() {
                //todo 接口访问异常处理
                  that.$Message.error("接口访问失败!");
              });
        } else {
          that.$Message.error("请输入账号密码!");
        }
      });
    },
    register(){
        this.flag = false;
        this.roleFlag = 2;
    },
    handleRegisterSubmit(name){
      // 校验表单数据
      const that = this;
      this.$refs[name].validate((valid) => {
        if (valid) {
          // 校验成功 发起请求
          this.axios.put(this.api.baseUrl + "/user/register" + "/" + this.formItem.username + "/" + this.formItem.password).then((res) => {
            let code = res.data.code;
            let msg = res.data.msg;
            if (code === 200) {
              that.$Message.success(msg);
              //如果登录成功进行转
              that.$router.push("/userInformation");
              this.flag = true;
            } else {
              // todo 登录失败处理
              that.$Message.error(msg);
            }
          }).catch(function() {
            //todo 接口访问异常处理
            that.$Message.error("接口访问失败!");
          });
        } else {
          that.$Message.error("请输入账号密码!");
        }
      });
    },
    changeRole(roleInt){
      if (roleInt===0){
        this.roleFlag = 0;
        this.flag = true;
      }else if (roleInt === 1){
        this.roleFlag = 1;
        this.flag = true;
      }
    },

  },
};
</script>
<style scoped src="../assets/css/login.css">
</style>