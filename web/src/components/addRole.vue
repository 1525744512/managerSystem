<template>
  <Modal title="新增角色" v-model="modal8" @on-ok="ok"  @on-cancel="cancel">
    <Form>
      <FormItem label="角色名">
        <Input v-model="roleName" placeholder="请输入角色名"></Input>
      </FormItem>
    </Form>
    <div slot="footer">
      <Button type="text" @click="cancel">取消</Button>
      <Button type="primary" @click="ok">确定</Button>
    </div>
  </Modal>
</template>

<script>

import Utils from "@/assets/util";

export default {
  name: "addRole",
  data(){
    return{
      modal8:false,
      roleName:'',
    }
  },
  methods:{
    ok() {
      this.axios.post(this.api.baseUrl + "/role/addRole/"+this.roleName +"/"+this.$cookies.get("userCompany")).then((res) => {
        let code = res.data.code;
        let msg = res.data.msg;
        if (code === 200) {
          this.$Message.success(msg);
          this.modal8 = false;
          Utils.$emit('addRole','msg');
          this.roleName = null;
        }else {
          this.$Message.error(msg);
        }
      });
    },
    cancel() {
      this.modal8 = false;
      this.roleName = null;
    },
    init() {
      this.modal8 = true;
    },
  }
}
</script>

<style scoped>

</style>