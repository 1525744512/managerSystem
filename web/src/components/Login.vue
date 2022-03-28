<template>
  <div class="login">
      <card>
        <div class="title">
          <span  style="font-size: 150%" v-show="flag">用户登录</span>
          <span  style="font-size: 150%" v-show="!flag">企业注册</span>
        </div>
        <Form ref="formItem" :model="formItem" :rules="ruleValidate" :label-width="0" class="loginForm">
          <FormItem prop="userCompany" class="userCompany" v-if="!flag">
            <Input size="large"  placeholder="请输入公司名称" v-model="formItem.userCompany" type="text">
              <Icon type="ios-home"  slot="prefix"/>
            </Input>
          </FormItem>
          <FormItem prop="userName" class="userName">
            <Input size="large" placeholder="请输入账号" v-model="formItem.userName">
              <Icon type="ios-contact" slot="prefix" />
            </Input>
          </FormItem>
          <FormItem prop="userPassWord" class="userPassWord">
            <Input size="large"  placeholder="请输入密码" v-model="formItem.userPassWord" type="password">
              <Icon type="ios-lock"  slot="prefix"/>
            </Input>
          </FormItem>

        </Form>
        <Button type="primary" size="large"  @click="handleSubmit('formItem')" class="loginButton" v-if = "flag">登录</Button>
        <Button type="primary" size="large"  @click="handleRegisterSubmit('formItem')" class="loginButton" v-else-if="!flag">注册</Button>
        <div class="flexBetween">
          <SPAN style="float: left;height: 100%;margin-top: 5%;" v-show="flag">或</SPAN>
          <A type="text" @click="register()" style="float: left;height: 100%;color: cornflowerblue;margin-top: 5%" v-show="flag">注册企业</A>
          <A type="text" @click="changeRole(0)" style="float: left;height: 100%;color: cornflowerblue;margin-top: 5%" v-show="!flag">用户登录</A>
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
        userName: "",
        userPassWord: "",
        userCompany:"",
        userRole:"",
      },
      // 校验规则
      ruleValidate: {
        userName: [{
          required: true,
          message: "输入用户名",
          trigger: "blur",
        }, ],
        userPassWord: [{
          required: true,
          message: "输入密码",
          trigger: "blur",
        }, ],
        userCompany: [{
          required: true,
          message: "输入公司名称",
          trigger: "blur",
        }, ],
      },
      flag: true,
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
          this.axios.get(this.api.baseUrl + "/user/login" + "/" + this.formItem.userName + "/" + this.formItem.userPassWord).then((res) => {
                let code = res.data.code;
                let msg = res.data.msg;
                if (code === 200) {
                  that.$Message.success(msg);
                  this.$cookies.set("userName", this.formItem.userName);
                  this.$cookies.set("userCompany",res.data.data.userCompanyID);
                  this.$cookies.set("userOwner", res.data.data.userOwner);
                  //如果登录成功进行转
                  // let role = JSON.parse(JSON.stringify(res.data.data.userRole));
                  // if (role===0){
                  //   that.$router.push("/mainPage");
                  // }else if (role===1){
                  //   that.$router.push("/mainPage");
                  // }
                  that.$router.push("/mainPage");
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
    },
    handleRegisterSubmit(name){
      // 校验表单数据
      const that = this;
      this.$refs[name].validate((valid) => {
        if (valid) {
          // 校验成功 发起请求
          this.axios.put(this.api.baseUrl + "/user/register",this.formItem).then((res) => {
            let code = res.data.code;
            let msg = res.data.msg;
            if (code === 200) {
              that.$Message.success(msg);
              //如果登录成功进行转
              this.$cookies.set("userCompany",res.data.data.userCompanyID);
              this.$cookies.set("userOwner", res.data.data.userOwner);
              that.$router.push("/mainPage");
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
        this.flag = true;
      }else if (roleInt === 1){
        this.flag = true;
      }
    },

  },
};
</script>
<style scoped src="../assets/css/login.css">
</style>