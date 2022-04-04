<template>
  <Modal title="邀请成员一起协作" v-model="modal7" @on-ok="ok(userName)"  @on-cancel="cancel">
    <p>当前企业:{{company}}</p>
    <Input v-model="userName" placeholder="成员手机号或邮箱" clearable style="width: 100%;margin-top: 5%"/>
    <Input v-model="userPassword" placeholder="成员登录密码" clearable style="width: 100%;margin-top: 2%"/>
    <div slot="footer">
      <Button type="text" @click="cancel">取消</Button>
      <Button type="primary" @click="ok(userName)">确定</Button>
    </div>
  </Modal>
</template>

<script>

export default {
  name: "inviteMembers",
  data () {
    return {
      modal7: false,
      company:'',
      userName:'',
      userPassword:'',
    }
  },
  methods:{
    init(id) {
      const that = this;
      this.axios.get(this.api.baseUrl + "/company/find" + "/" + parseInt(id)).then((res) => {
        let code = res.data.code;
        let msg = res.data.msg;
        if (code === 200) {
          this.modal7 = true;
          this.company = res.data.data.userCompany;
        } else {
          // todo 登录失败处理
          that.$Message.error(msg);
        }
      }).catch(function() {
        //todo 接口访问异常处理
        that.$Message.error("接口访问失败!");
      });

    },
    ok (name) {
      const that = this;
      if (name!=="") {
          // 校验成功 发起请求
          this.axios.put(this.api.baseUrl + "/user/registerUser" + "/" + this.userName+ "/" + this.userPassword + "/" + this.$cookies.get("userCompany")).then((res) => {
            let code = res.data.code;
            let msg = res.data.msg;
            if (code === 200) {
              that.$Message.success(msg);
              this.modal7 = false;
              this.userName = null;
              this.userPassword = null;
            } else {
              // todo 登录失败处理
              that.$Message.error(msg);
            }
          }).catch(function() {
            //todo 接口访问异常处理
            that.$Message.error("接口访问失败!");
          });
      } else {
          that.$Message.error("请输入邀请成员手机号或者邮箱!");
      }
    },
    cancel () {
      this.modal7 = false;
      this.userName = null;
      this.userPassword = null;
    },
    getCookies(){
      if (this.$cookies.get("userID")===null){
        this.$router.push("/Login")
      }
    }
  },
  created() {
    this.getCookies();
  }
}
</script>

<style scoped>

</style>