<template>
  <Modal title="添加部门" v-model="modal8" @on-ok="ok"  @on-cancel="cancel">
    <Form :model="formDepartment" :label-width="80">
      <FormItem label="部门名称">
        <Input v-model="formDepartment.departmentName" placeholder="请填写部门名称"></Input>
      </FormItem>
      <FormItem label="部门主管">
        <Select v-model="formDepartment.departmentUser">
          <Option value="yonghu1">用户1</Option>
          <Option value="yonghu2">用户2</Option>
          <Option value="yonghu3">用户三</Option>
        </Select>
      </FormItem>
      <FormItem label="部门编号">
        <Input v-model="formDepartment.departmentNum" placeholder="请填写部门名称"></Input>
      </FormItem>
    </Form>
    <div slot="footer">
      <Button type="text" @click="cancel">取消</Button>
      <Button type="primary" @click="ok">确定</Button>
    </div>
  </Modal>
</template>

<script>
export default {
  name: "addDepartment",
  data() {
    return{
      modal8:false,
      formDepartment:{
        departmentName:'',
        departmentUser:'',
        departmentNum:'',
      }
    }
  },
  methods:{
    cancel () {
      this.modal8 = false;
      this.userName = null;
      this.userPassword = null;
    },
    ok () {
    },
    init() {
      this.modal8=true;
    },
  }
}
</script>

<style scoped>

</style>