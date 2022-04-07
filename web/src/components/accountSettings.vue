<template>
  <modal v-model="modal"
         title="账户设置" @on-ok="ok()" @on-cancel="cancel">
    <Form ref="formAccount"  :model="formAccount" >
      <row align="middle">
        <label style="font-size: 24px">修改用户名</label>
        <label style="color: #0066cc;margin-left: 44vh" @click="openUser" v-if="flag1">展开
          <Icon type="md-arrow-dropdown"/>
        </label>
        <label style="color: #0066cc;margin-left: 44vh" @click="closeUser" v-if="flag2">收起
          <Icon type="md-arrow-dropup"/>
        </label>
      </row>
      <label style="color: #777777">修改你在当前企业的用户名，用户名只能是英文、数字和下划线组成，且必须以字母开头。</label>
      <FormItem prop="user" v-if="flag2">
        <Input type="text" v-model="formAccount.user" placeholder="请输入用户账号">
          <Icon type="ios-person-outline" slot="prepend"></Icon>
        </Input>
      </FormItem>
      <Divider style="width: 100%"/>

      <row>
        <label style="font-size: 24px">修改密码</label>
        <label style="color: #0066cc;margin-left: 47.5vh" @click="openPassword" v-if="flag3">展开
          <Icon type="md-arrow-dropdown"/>
        </label>
        <label style="color: #0066cc;margin-left: 47.5vh" @click="closePassword" v-if="flag4">收起
          <Icon type="md-arrow-dropup"/>
        </label>
      </row>
      <label style="color: #777777">修改密码时需要输入当前密码。</label>
      <FormItem prop="oldPassword" v-if="flag4">
        <Input type="password" v-model="formAccount.oldPassword" placeholder="请输入你的旧密码">
          <Icon type="ios-lock-outline" slot="prepend"></Icon>
        </Input>
      </FormItem>
      <FormItem prop="newPassword" v-if="flag4">
        <Input type="password" v-model="formAccount.newPassword" placeholder="请输入你的新密码">
          <Icon type="ios-lock-outline" slot="prepend"></Icon>
        </Input>
      </FormItem>
      <Divider style="width: 100%"/>

      <row>
        <label style="font-size: 24px">绑定邮箱</label>
        <label style="color: #0066cc;margin-left: 47.5vh" @click="openMail" v-if="flag5">展开
          <Icon type="md-arrow-dropdown"/>
        </label>
        <label style="color: #0066cc;margin-left: 47.5vh" @click="closeMail" v-if="flag6">收起
          <Icon type="md-arrow-dropup"/>
        </label>
      </row>
      <label style="color: #777777">绑定邮箱时系统会发送一封邮件到你的邮箱地址，请按照邮箱中的链接重置你的邮箱。</label>
      <FormItem prop="mail" v-if="flag6">
        <Input v-model="formAccount.mail" placeholder="请输入你的邮箱"></Input>
      </FormItem>
    </Form>
    <div slot="footer">
      <Button type="text" @click="cancel">取消</Button>
      <Button type="primary" @click="ok()">确定</Button>
    </div>
  </modal>
</template>

<script>
export default {
  name: "accountSettings",
  data() {
    return {
      modal: false,
      flag1: true,
      flag2: false,
      flag3: true,
      flag4: false,
      flag5: true,
      flag6: false,
      oldPassword: '',
      newPassword: '',
      formAccount: {
        userID:'',
        user: '',
        oldPassword: null,
        newPassword: null,
        mail: ''
      },
    }
  },
  methods: {
    ok() {
      if (this.formAccount.oldPassword!==null){
        if (this.oldPassword === this.formAccount.oldPassword) {
          if (this.formAccount.mail!==null){
            var format1 = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
            if (!this.formAccount.mail.match(format1)) {
              this.$Message.error("请输入正确邮箱格式");
            }else {
              this.axios.post(this.api.baseUrl + "/user/updateMyUser/", this.formAccount).then((res) => {
                let code = res.data.code;
                if (code === 200) {
                  this.modal = false;
                  this.oldPassword = null;
                  this.formAccount.oldPassword = null;
                  this.formAccount.newPassword = null;
                  this.formAccount.user = null;
                  this.formAccount.mail = null;
                }
              });
            }
          }else {
            this.axios.post(this.api.baseUrl + "/user/updateMyUser/", this.formAccount).then((res) => {
              let code = res.data.code;
              if (code === 200) {
                this.modal = false;
                this.oldPassword = null;
                this.formAccount.oldPassword = null;
                this.formAccount.newPassword = null;
                this.formAccount.user = null;
                this.formAccount.mail = null;
              }
            });
          }
        } else {
          this.$Message.error("请输入正确旧密码");
        }
      }else {
        if (this.formAccount.mail!==null){
          var format = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
          if (!this.formAccount.mail.match(format)) {
            this.$Message.error("请输入正确邮箱格式");
          }else {
            this.axios.post(this.api.baseUrl + "/user/updateMyUser/", this.formAccount).then((res) => {
              let code = res.data.code;
              if (code === 200) {
                this.modal = false;
                this.oldPassword = null;
                this.formAccount.oldPassword = null;
                this.formAccount.newPassword = null;
                this.formAccount.user = null;
                this.formAccount.mail = null;
              }
            });
          }
        }else {
          this.axios.post(this.api.baseUrl + "/user/updateMyUser/", this.formAccount).then((res) => {
            let code = res.data.code;
            if (code === 200) {
              this.modal = false;
              this.oldPassword = null;
              this.formAccount.oldPassword = null;
              this.formAccount.newPassword = null;
              this.formAccount.user = null;
              this.formAccount.mail = null;
            }
          });
        }
      }
    },
    cancel() {
      this.modal = false;
    },
    init() {
      this.modal = true;
      this.axios.get(this.api.baseUrl + "/user/getMyUser/"+ this.$cookies.get("userID")).then((res) => {
        let code = res.data.code;
        if (code === 200) {
          this.formAccount.userID = res.data.data.userID;
          this.formAccount.user = res.data.data.userName;
          this.formAccount.mail = res.data.data.userEmail;
          this.oldPassword = res.data.data.userPassWord;
        }
      });
    },
    openUser() {
      this.flag1 = false;
      this.flag2 = true;
    },
    closeUser() {
      this.flag1 = true;
      this.flag2 = false;
    },
    openPassword() {
      this.flag3 = false;
      this.flag4 = true;
    },
    closePassword() {
      this.flag3 = true;
      this.flag4 = false;
    },
    openMail() {
      this.flag5 = false;
      this.flag6 = true;
    },
    closeMail() {
      this.flag5 = true;
      this.flag6 = false;
    }
  }
}
</script>

<style scoped>

</style>