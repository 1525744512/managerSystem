<template>
  <Modal title="调整部门" v-model="modal7" @on-ok="ok"  @on-cancel="cancel">
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
import {validationMixin} from "vuelidate";
import {getData} from "@/mixins/getData";

export default {
  name: "updateDepartment",
  mixins: [validationMixin,getData],
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
        this.axios.post(this.api.baseUrl + "/user/updateUser" + "/" + this.userID+ "/" + this.departmentID).then((res) => {
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
  },
  created() {
    this.users = this.getDepartment();
  }
}
</script>

<style scoped>

</style>