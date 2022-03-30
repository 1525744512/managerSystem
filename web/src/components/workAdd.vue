<template>
  <modal v-model="modal"
         title="创建任务" width="50" @on-ok="ok"  @on-cancel="cancel">
        <Form ref="formItem" :model="formItem" :rules="ruleValidate" :label-width="0">
          <label>标题</label>
          <Input v-model="formItem.taskName" placeholder="请输入标题" style="width: 100%;margin-top: 0.5%;margin-bottom: 1.5%"/>
          <row>
            <Col span="12">
              <label>选择项目</label>
            </Col>
            <Col span="12">
              <label style="margin-left: 5%">截至时间</label>
            </Col>
          </row>
          <row style="margin-bottom: 1.5%;margin-top: 0.5%;">
            <Col span="12">
              <Select v-model="formItem.projectID" clearable style="width: 95%">
                <Option v-for="item in project" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </Col>
            <Col span="12">
              <DatePicker v-model="formItem.taskEndTime"  type="date" placeholder="任务截至时间" style="width: 95%;margin-left: 5%"></DatePicker>
            </Col>
          </row>
          <row>
            <Col span="12">
              <label>负责人</label>
            </Col>
            <Col span="12">
              <label style="margin-left: 5%">参与人</label>
            </Col>

          </row>
          <row style="margin-bottom: 1.5%;margin-top: 0.5%;">
            <Col span="12">
              <Select v-model="formItem.taskLeader" filterable clearable style="width: 95%">
                <Option v-for="item in users" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </Col>
            <Col span="12">
              <Select v-model="formItem.userID" multiple filterable :max-tag-count="2"
                      :max-tag-placeholder="maxTagPlaceholder"
                      style="width: 95%;margin-left: 5%">
                <Option v-for="item in users" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </Col>
          </row>
          <row>
            <label>描述</label>
          </row>
          <row>
            <Col>
              <quill-editor
                  v-model="formItem.taskDescribe"
                  ref="myQuillEditor"
                  :options="editorOption"
                  @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
                  @change="onEditorChange($event)">
              </quill-editor>
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
export default {
  name: "workAdd",
  data() {
    return {
      formItem:{
        taskName: '',
        projectID: '',
        userCompanyID:'',
        taskEndTime:'',
        taskLeader:'',
        userID:[],
        taskDescribe:'',
      },
      ruleValidate:{
        taskName: [
          { required: true, message: '任务名称不能为空', trigger: 'blur' }
        ],
        projectID: [
          { required: true, message: '必须选择所属项目', trigger: 'blur' }
        ],
      },
      project: [],
      users: [],
      editorOption:{},
      modal:false,
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
    getProject(){
      let data = [];
      const that = this;
      this.axios.get(this.api.baseUrl + "/project/getProject/"+parseInt(this.$cookies.get("userCompany"))).then((res) => {
        let code = res.data.code;
        let msg = res.data.msg;
        if (code === 200) {
          for (let i = 0; i < res.data.data.length;i++){
            data.push({
              value:JSON.parse(JSON.stringify(res.data.data[i].projectID)),
              label:JSON.parse(JSON.stringify(res.data.data[i].projectName)),
            })
          }
        } else {
          // todo 登录失败处理
          that.$Message.error(msg);
        }
      }).catch(function() {
        //todo 接口访问异常处理
        that.$Message.error("项目接口访问失败!");
      });
      return data;
    },
    getUsers(){
      let data = [];
      const that = this;
      this.axios.get(this.api.baseUrl + "/user/getCompanyUser/"+parseInt(this.$cookies.get("userCompany"))).then((res) => {
        let code = res.data.code;
        let msg = res.data.msg;
        if (code === 200) {
          for (let i = 0; i < res.data.data.length;i++){
            data.push({
              value:JSON.parse(JSON.stringify(res.data.data[i].userID)),
              label:JSON.parse(JSON.stringify(res.data.data[i].userName)),
            })
          }
        } else {
          // todo 登录失败处理
          that.$Message.error(msg);
        }
      }).catch(function() {
        //todo 接口访问异常处理
        that.$Message.error("接口访问失败!");
      });
      return data;
    },
    ok () {
      const that = this;
      if (this.formItem.taskName!==""||this.formItem.projectID!==null) {
        // 校验成功 发起请求
        this.formItem.userCompanyID = this.$cookies.get("userCompany");
        this.axios.post(this.api.baseUrl + "/task/addTask",this.formItem).then((res) => {
          let code = res.data.code;
          let msg = res.data.msg;
          if (code === 200) {
            that.$Message.success(msg);
            this.modal = false;
          } else {
            // todo 登录失败处理
            that.$Message.error(msg);
          }
        }).catch(function() {
          //todo 接口访问异常处理
          that.$Message.error("新建任务接口访问失败!");
        });
      } else {
        that.$Message.error("请输入任务名称或者选择项目!");
      }
    },
    cancel () {
      this.modal = false;
    },
  },
  created() {
    this.project = this.getProject();
    this.users = this.getUsers();
  }
}
</script>

<style scoped>
.layout-header {
  background-color: #ffffff;
}
.ivu-form ivu-form-label-right{
  height: 70vh;
}
</style>