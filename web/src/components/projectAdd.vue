<template>
  <modal v-model="modal"
         title="新建项目" @on-ok="ok"  @on-cancel="cancel">
      <Form ref="formItem" :model="formItem" :rules="ruleValidate" :label-width="0">
          <label>项目名称</label>
          <Input v-model="formItem.projectName" placeholder="项目名称" style="width: 100%;margin-top: 0.5%;margin-bottom: 1.5%"/>
          <row>
            <Col span="12">
              <label>可见范围</label>
            </Col>
            <Col span="12">
              <label style="margin-left: 5%">所属部门</label>
            </Col>
          </row>
          <row style="margin-bottom: 1.5%;margin-top: 0.5%;">
            <Col span="12">
              <Select v-model="formItem.projectVisibleRange" clearable style="width: 95%">
                <Option v-for="item in Range" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </Col>
            <Col span="12">
              <Select v-model="formItem.departmentID" filterable  clearable style="width: 95%;margin-left: 5%;" >
                <Option v-for="item in grouping" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </Col>
          </row>
          <row>
            <Col span="12">
              <label>项目描述</label>
            </Col>
          </row>
          <row>
            <Input v-model="formItem.projectDescribe" type="textarea" :rows="4" placeholder="本项目是..." />
          </row>
          <row style="margin-top: 1.5%;">
            <Col span="12">
              <label>参与人</label>
            </Col>
          </row>
          <row style="margin-bottom: 1.5%;margin-top: 0.5%;">
            <Col span="12">
              <Select v-model="formItem.usersChoose" multiple filterable :max-tag-count="2"
                      :max-tag-placeholder="maxTagPlaceholder"
                      style="width: 95%;">
                <Option v-for="item in users" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </Col>
          </row>
      </Form>
    <div slot="footer">
      <Button type="text" @click="cancel">取消</Button>
      <Button type="primary" @click="ok">确定</Button>
    </div>
  </modal>
</template>

<script>
import {validationMixin} from "vuelidate";
import {getData} from "@/mixins/getData";

export default {
  name: "projectAdd",
  mixins: [validationMixin,getData],
  data() {
    return {
      formItem:{
        userCompanyID:'',
        projectCreatorID:'',
        projectName:'',
        departmentID:'',
        projectVisibleRange:'',
        projectDescribe:'',
        usersChoose:[],
      },
      ruleValidate:{
        projectName: [
          { required: true, message: '项目名称不能为空', trigger: 'blur' }
        ],
      },
      Range: [
        {
          value: '1',
          label: '私有：加入的成员可见'
        },
        {
          value: '0',
          label: '公开：加入的成员可见'
        }
      ],
      grouping: [],
      users: [],
      usersChoose: [],
      content:null,
      editorOption:{},
      modal:false,
      value6:''
    }
  },
  methods: {
    maxTagPlaceholder(num) {
      return 'more ' + num;
    },
    onEditorBlur(){//失去焦点事件
    },
    onEditorFocus(){//获得焦点事件
    },
    onEditorChange(){//内容改变事件
    },
    init(){
      this.modal =true;
    },
    ok () {
      const that = this;
      if (this.formItem.projectName!=="") {
        // 校验成功 发起请求
        this.formItem.userCompanyID = this.$cookies.get("userCompany");
        this.formItem.projectCreatorID = this.$cookies.get("userID");
        this.axios.post(this.api.baseUrl + "/project/addProject",this.formItem).then((res) => {
          let code = res.data.code;
          let msg = res.data.msg;
          if (code === 200) {
            that.$Message.success(msg);
            this.modal = false;
            this.formItem.projectName=null;
            this.formItem.departmentID=null;
            this.formItem.projectVisibleRange=null;
            this.formItem.projectDescribe=null;
            this.formItem.usersChoose=null;
          } else {
            // todo 登录失败处理
            that.$Message.error(msg);
          }
        }).catch(function() {
          //todo 接口访问异常处理
          that.$Message.error("接口访问失败!");
        });
      } else {
        that.$Message.error("请输入项目名称!");
      }
    },
    cancel () {
      this.modal = false;
      this.formItem.projectName=null;
      this.formItem.departmentID=null;
      this.formItem.projectVisibleRange=null;
      this.formItem.projectDescribe=null;
      this.formItem.usersChoose=null;
    },
  },
  created() {
    this.grouping = this.getDepartment();
    this.users = this.getUsers();
  }
}
</script>

<style scoped>
.layout-header {
  background-color: #ffffff;
}
</style>