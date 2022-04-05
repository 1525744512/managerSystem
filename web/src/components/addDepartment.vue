<template>
  <Modal title="添加部门" v-model="modal8" @on-ok="ok"  @on-cancel="cancel">
    <Form :model="formDepartment" :label-width="80">

      <FormItem label="部门名称">
        <Input v-model="formDepartment.departmentName" placeholder="请填写部门名称"></Input>
      </FormItem>
    </Form>
    <div slot="footer">
      <Button type="text" @click="cancel">取消</Button>
      <Button type="primary" @click="ok">确定</Button>
    </div>
  </Modal>
</template>

<script>
import Utils from "../assets/util"
export default {
  name: "addDepartment",
  data() {
    return{
      modal8:false,
      formDepartment:{
        departmentName:'',
        parentDepartmentID:'',
        type:'',
        userCompanyID:'',
      },
    }
  },
  methods:{
    cancel () {
      this.modal8 = false;
      this.formDepartment.departmentName = null;
      this.formDepartment.parentDepartmentID = null;
    },
    ok () {
      if (this.formDepartment.type===0){
        this.axios.post(this.api.baseUrl + "/department/addDepartment/" + this.formDepartment.departmentName +"/"+this.formDepartment.parentDepartmentID +"/" + this.$cookies.get("userCompany")).then((res) => {
          let code = res.data.code;
          let msg = res.data.msg;
          if (code === 200) {
            this.$Message.success(msg);
            Utils.$emit('tree','msg');
            this.modal8 = false;
            this.formDepartment.departmentName = null;
            this.formDepartment.parentDepartmentID = null;
          }else {
            this.$Message.error(msg);
          }
        });
      }else {
        this.formDepartment.userCompanyID = this.$cookies.get("userCompany");
        this.axios.post(this.api.baseUrl + "/department/updateDepartment",this.formDepartment).then((res) => {
          let code = res.data.code;
          let msg = res.data.msg;
          if (code === 200) {
            this.$Message.success(msg);
            Utils.$emit('treeUpdate','msg');
            this.modal8 = false;
            this.formDepartment.departmentName = null;
            this.formDepartment.parentDepartmentID = null;
          }else {
            this.$Message.error(msg);
          }
        });
      }
    },
    init(value,type) {
      this.modal8=true;
      this.formDepartment.parentDepartmentID = value;
      this.formDepartment.type = type;
      if (type!==0){
        this.formDepartment.departmentName = type;
      }
    },
  }
}
</script>

<style scoped>

</style>