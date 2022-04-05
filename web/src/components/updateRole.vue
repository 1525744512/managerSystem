<template>
  <Modal title="调整角色" v-model="modal7" @on-ok="ok"  @on-cancel="cancel">
    <Select v-model="departmentID" filterable :max-tag-count="2"
            :max-tag-placeholder="maxTagPlaceholder" style="width: 95%;margin-left: 5%">
      <Option v-for="item in users" :value="item.value" :key="item.value">{{ item.label }}</Option>
    </Select>
    <div slot="footer">
      <Button type="text" @click="cancel">取消</Button>
      <Button type="primary" @click="ok">确定</Button>
    </div>
  </Modal>
</template>

<script>

export default {
  name: "updateRole",
  data () {
    return {
      modal7: false,
      company:'',
      userID:'',
      userPassword:'',
      departmentID:'',
      users:[],
    }
  },
  methods:{
    maxTagPlaceholder(num) {
      return 'more ' + num;
    },
    init(index) {
      this.modal7 = true;
      this.userID = index;
    },
    ok () {
      const that = this;
      // 校验成功 发起请求
      this.axios.post(this.api.baseUrl + "/user/updateUserRole" + "/" + this.userID + "/" + this.departmentID).then((res) => {
        let code = res.data.code;
        let msg = res.data.msg;
        if (code === 200) {
          that.$Message.success(msg);
          this.modal7 = false;
          this.departmentID = null;
        } else {
          // todo 登录失败处理
          that.$Message.error(msg);
        }
      }).catch(function() {
        //todo 接口访问异常处理
        that.$Message.error("接口访问失败!");
      });
    },
    cancel () {
      this.modal7 = false;
      this.departmentID = null;
    },
    getMyRole () {
      this.axios.get(this.api.baseUrl + "/role/getMyChildrenRole/" + this.$cookies.get("userCompany")).then((res) => {
        let code = res.data.code;
        if (code === 200) {
          for (let i=0;i<res.data.data.length;i++){
            this.users.push(
                {
                  label: JSON.parse(JSON.stringify(res.data.data[i].userRoleName)),
                  value:   JSON.parse(JSON.stringify(res.data.data[i].userRoleId)),
                },
            )
          }
        }
      });
    },
  },
  created() {
    this.getMyRole();
  }
}
</script>

<style scoped>

</style>