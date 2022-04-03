<template>
  <Modal title="新增角色" v-model="modal8" @on-ok="ok"  @on-cancel="cancel">
    <Form>
      <FormItem label="角色名">
        <Input v-model="roleName" placeholder="请输入角色名"></Input>
      </FormItem>
      <FormItem label="描述">
        <Input v-model="roleDescribe" placeholder="请输入角色描述" type="textarea"></Input>
      </FormItem>
    </Form>
<!--    <Input v-model="userName" placeholder="成员手机号或邮箱" clearable style="width: 100%;margin-top: 5%"/>-->
<!--    <Input v-model="userPassword" placeholder="成员登录密码" clearable style="width: 100%;margin-top: 2%"/>-->
    <div slot="footer">
      <Button type="text" @click="cancel">取消</Button>
      <Button type="primary" @click="ok">确定</Button>
    </div>
  </Modal>
</template>

<script>
export default {
  name: "addRole",
  data(){
    return{
      modal8:false,
      roleName:'',
      roleDescribe:'',
    }
  },
  methods:{
    ok() {

    },
    cancel() {
      this.modal8 = false;
      this.roleName = null;
      this.roleDescribe = null;
    },
    init() {
      this.modal8 = true;
    },
  }
}
</script>

<style scoped>

</style>