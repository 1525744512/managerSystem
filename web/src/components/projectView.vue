<template>
  <div style="background:#eee;padding: 20px;height: 100%">
    <Card :bordered="false" style="float: left;width: 63%">
      <row slot="title" align="middle">
        <Col span="8">
          <Breadcrumb separator=">">
            <BreadcrumbItem @click.native="closeThisVue"><Icon type="ios-home-outline"></Icon> 返回</BreadcrumbItem>
            <BreadcrumbItem><Icon type="logo-buffer"></Icon>{{ formItem.projectName }}</BreadcrumbItem>
          </Breadcrumb>
        </Col>
      </row>
      <Form :ref="formItem" v-model="formItem">
        <row>
          <Col span="7">
            <label>负责人</label>
          </Col>
          <Col span="7">
            <label>开始时间</label>
          </Col>
          <Col span="7">
            <label>结束时间</label>
          </Col>
        </row>
        <row>
          <Select v-model="formItem.projectLeader" filterable style="width: 24.6%;">
            <Option v-for="item in workUsers" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
          <DatePicker
              v-model="formItem.projectStartTime"
              :open="open"
              :value="formItem.projectStartTime"
              confirm
              type="date"
              @on-change="handleChangeStart"
              @on-clear="handleClear(0)"
              @on-ok="handleOk(0)"
              style="width: 24.6%;margin-left: 4.5%"
          >
            <a href="javascript:void(0)" @click="handleClick(0)">
              <Icon type="ios-calendar-outline"></Icon>
              <template v-if="formItem.projectStartTime === ''">任务开始时间</template>
              <template v-else>{{ formItem.projectStartTime }}</template>
            </a>
          </DatePicker>
          <DatePicker
              v-model="formItem.projectEndTime"
              :open="open2"
              :value="formItem.projectEndTime"
              confirm
              type="date"
              @on-change="handleChangeEnd"
              @on-clear="handleClear(1)"
              @on-ok="handleOk(1)"
              style="width: 24.6%;margin-left: 4.5%"
          >
            <a href="javascript:void(0)" @click="handleClick">
              <Icon type="ios-calendar-outline"></Icon>
              <template v-if="formItem.projectEndTime === ''">任务开始时间</template>
              <template v-else>{{ formItem.projectEndTime }}</template>
            </a>
          </DatePicker>
        </row>
        <row>
          <label style="margin-top: 1.5%">项目描述</label>
          <Input disabled :border="false" placeholder="无描述" v-model="formItem.projectDescribe" v-if="flag1"/>
          <Input v-model="formItem.projectDescribe" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入描述"
                 v-if="flag2"/>
          <div style="width: 100%">
            <Button type="primary" v-if="flag2" @click="submit" style="float: right;margin-top: 1.5%">保存</Button>
            <Button type="text" v-if="flag2" @click="close" style="float: right;margin-top: 1.5%">取消</Button>

          </div>
          <label v-if="flag1" style="margin-left: 1%" @click="openDescribe"><font color="#6495ed">编辑</font></label>
        </row>
        <Divider/>
        <row align="middle">
          <Col span="20">
            <label>项目成员</label>
          </Col>
          <Col style="margin-left: 0.5%">
            <Button icon="md-add" type="text" size="small">添加成员</Button>
          </Col>
        </row>
        <row align="middle">
          <Col span="22">
            <Input suffix="ios-search" placeholder="搜索成员(按Enter搜索)" style="width: auto" search v-model="searchProjectPersonal" @keyup.enter.native="search" @input="search"/>
          </Col>
          <Col>
            <label>共{{totalPerson}}人</label>
          </Col>
        </row>
        <row>
          <Col>
            <Table border :columns="users" height="270" :data="data3" v-model="data1" style="width: 98vh;margin-top: 1.5%">
              <template slot-scope="{ row, index }" slot="action">
                <Button type="error" size="small" @click="remove(index)">删除</Button>
              </template>
            </Table>
          </Col>
        </row>
      </Form>
    </Card>
    <Card :bordered="false" style="float: right;width: 35%;margin-left: 2%">
      <row slot="title" align="middle">
        <Col span="5">
          <p>项目状态</p>
        </Col>
        <Col style="margin-left: 55%">
          <Button type="text" size="small" icon="ios-sync" @click="updata">更新</Button>
        </Col>
      </row>
      <row>
        <Form ref="formWork" :model="formWork" inline>
          <row>
            <Col>
              <FormItem label="当前状态">
                <label>{{ formWork.projectStatusLabel }}</label>
              </FormItem>
            </Col>
          </row>
          <row>
            <FormItem label="附件">
              <label>{{ formWork.enclosure }}</label>
            </FormItem>
          </row>
        </Form>
      </row>
      <Divider/>

      <label>任务统计</label>
      <Button size="small" style="margin-left: 31vh;" @click="taskManagement">任务管理</Button>
      <row>
        <Form ref="formWorkDescribe" :model="formWorkDescribe" inline style="margin-top: 5%">
          <row>
            <Col>
              <FormItem label="任务总数">
                <label>{{ formWorkDescribe.taskTotal }}</label>
              </FormItem>
            </Col>
            <Col style="margin-left: 2vh">
              <FormItem label="已完成">
                <label>{{ formWorkDescribe.completed }}</label>
              </FormItem>
            </Col>
            <Col style="margin-left: 2vh">
              <FormItem label="进行中">
                <label>{{ formWorkDescribe.haveInHand }}</label>
              </FormItem>
            </Col>
            <Col>
              <FormItem label="未开始" style="margin-left: 2vh">
                <label>{{ formWorkDescribe.notStarted }}</label>
              </FormItem>
            </Col>
          </row>

          <row>
            <Col>
              <FormItem label="延期任务">
                <label>{{ formWorkDescribe.delayTaskTotal }}</label>
              </FormItem>
            </Col>
            <Col>
              <FormItem label="完成率" style="margin-left: 2vh">
                <label><font color="#7fffd4">{{ formWorkDescribe.completionRate + '%' }}</font></label>
              </FormItem>
            </Col>
            <Col>
              <FormItem label="延期率" style="margin-left: 2vh">
                <label><font color="red">{{ formWorkDescribe.delayRate + '%' }}</font></label>
              </FormItem>
            </Col>
          </row>
        </Form>
      </row>
    </Card>

    <!--    更新状态的model-->
    <modal v-model="modal" title="状态更新" :styles="{top: '20px'}" @on-ok="ok"  @on-cancel="cancel">
        <row>
          <Col span="4" style="margin-top: 4%">
          <label>项目状态:</label>
          </Col>
          <Col>
            <Select v-model="projectStatus" filterable style="width: 100%;height: 40%">
              <Option v-for="item in states" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </Col>
        </row>
        <row style="margin-top: 4%">
          <Col span="4" >
            <label>附件:</label>
          </Col>
          <Col>
            <Upload
                ref="upload"
                :before-upload="handleUpload"
                :data="uploadData"
                action="//localhost:8550/project/upload"
            >
              <Button icon="ios-cloud-upload-outline" size="small">选择文件上传</Button>
            </Upload>
            <div v-if="file!==null">上传文件: {{ file.name }}<Button type="text" @click="upload" :loading="loadingStatus">{{ loadingStatus ? 'Uploading' : '点击上传' }}</Button></div>
          </Col>
        </row>
      <div slot="footer">
        <Button type="text" @click="cancel">取消</Button>
        <Button type="primary" @click="ok">确定</Button>
      </div>
    </modal>

    <!--    任务管理-->
    <modal v-model="modal2" title="全部任务" :styles="{top: '20px',width:'110vh'}">
      <row>
        <Col span="10">
          <Input suffix="ios-search" placeholder="搜索成员(按Enter搜索)" style="width: auto"/>
        </Col>
        <Col style="margin-left: 44.5vh">
          <Button type="primary" icon="ios-add" @click="add">新建任务</Button>
          <work-add v-if="flag3" ref="workAdd"></work-add>
        </Col>
      </row>
      <row>
        <Table border :columns="work" :data="data2" style="width: 100%;margin-top: 1.5%"></Table>
      </row>

    </modal>
  </div>
</template>

<script>
import workAdd from "@/components/workAdd";
import {validationMixin} from "vuelidate";
import {getData} from "@/mixins/getData";
import {parseDate} from "view-design/src/components/date-picker/util";

export default {
  name: "projectView",
  components: {workAdd},
  mixins: [validationMixin,getData],
  data() {
    return {
      formItem: {
        projectID:this.$route.params.projectID,
        projectName: '',
        projectLeader: null,
        projectStartTime: '',
        projectEndTime: '',
        projectDescribe: ''
      },
      formWork: {
        projectStatusLabel: '正常',
        enclosure: '无附件'
      },
      projectStatus:1,
      editorOption: {},
      formWorkDescribe: {
        taskTotal: '',
        completed: '',
        haveInHand: '',
        notStarted: '',
        delayTaskTotal: '',
        completionRate: '',
        delayRate: ''
      },
      flag1: true,
      flag2: false,
      flag3: false,
      modal: false,
      modal2: false,
      open: false,
      open2: false,
      workUsers: [],
      users: [
        {
          title: '成员',
          key: 'userName'
        },
        {
          title: '操作',
          slot: 'action',
          width: 200,
          align: 'center'
        }
      ],
      data1: [],
      states: [
        {
          value:  1,
          label: '正常'
        },
        {
          value:  2,
          label: '有风险'
        },
        {
          value:  3,
          label: '失控'
        },
      ],
      work: [
        {
          title: '状态',
          key: 'state'
        },
        {
          title: '标题',
          key: 'titles'
        },
        {
          title: '负责人',
          key: 'user'
        },
        {
          title: '优先级',
          key: 'priority'
        },
        {
          title: '开始时间',
          key: 'startTime'
        },
        {
          title: '截止时间',
          key: 'endTime'
        },
      ],
      data2: [
        {
          state:'未开始',
          titles:'任务1',
          user:'磊儿子',
          priority:'最高',
          startTime:'2021-12-30',
          endTime:'2022-12-30',
        }
      ],
      data3:[],
      totalPerson:0,
      searchProjectPersonal:null,
      file: null,
      loadingStatus: false,
      uploadData:{'projectID':null},
    }
  },
  methods: {
    openDescribe() {
      this.flag1 = false;
      this.flag2 = true;
    },
    handleClick(type) {
      if (type === 0) {
        this.open = !this.open;
      } else {
        this.open2 = !this.open2;

      }
    },
    handleChangeStart(date) {
      this.formItem.projectStartTime = date;
    },
    handleChangeEnd(data) {
      this.formItem.projectEndTime = data;
    },
    handleClear(type) {
      if (type === 0) {
        this.open = false;
      } else {
        this.open2 = false;
      }
    },
    handleOk(type) {
      if (type === 0) {
        this.open = false;
      } else {
        this.open2 = false;
      }
    },
    close() {
      this.flag2 = false;
      this.flag1 = true;
    },
    submit() {
      this.flag2 = false;
      this.flag1 = true;
        // 校验成功 发起请求
      this.axios.post(this.api.baseUrl + "/project/updateProjectDescribe/"+this.formItem.projectID+"/" + this.formItem.projectDescribe);
    },
    closeThisVue() {
      this.$router.push('allProjects');
    },
    updata() {
      this.modal = true
    },
    onEditorBlur() {//失去焦点事件
    },
    onEditorFocus() {//获得焦点事件
    },
    onEditorChange() {//内容改变事件
    },
    taskManagement() {
      this.modal2 = true
    },
    add() {
      this.flag3= true;
      this.$nextTick(() => {
        this.$refs.workAdd.init();
      });
    },
    getProjectAll(){
      this.axios.get(this.api.baseUrl + "/project/getProjectID/"+ this.formItem.projectID).then((res) => {
        let code = res.data.code;
        if (code === 200) {
          this.formItem.projectID = JSON.parse(JSON.stringify(res.data.data.projectID));
          this.formItem.projectName =   JSON.parse(JSON.stringify(res.data.data.projectName));
          if (res.data.data.projectLeader!==null){
            this.formItem.projectLeader =  parseInt(JSON.parse(JSON.stringify(res.data.data.projectLeader)));
          }
          this.formItem.projectDescribe = JSON.parse(JSON.stringify(res.data.data.projectDescribe));
          if (res.data.data.projectStartTime!==null){
            this.formItem.projectStartTime =  parseDate(JSON.parse(JSON.stringify(res.data.data.projectStartTime)));
          }
          if (res.data.data.projectEndTime!==null){
            window.alert(JSON.parse(JSON.stringify(res.data.data.projectEndTime)))
            this.formItem.projectEndTime = parseDate(JSON.parse(JSON.stringify(res.data.data.projectEndTime)),'yyyy-MM-dd');
          }
          this.formWorkDescribe.taskTotal = JSON.parse(JSON.stringify(res.data.data.taskTotal));
          this.formWorkDescribe.completed = JSON.parse(JSON.stringify(res.data.data.taskFinishTotal));
          this.formWorkDescribe.haveInHand = JSON.parse(JSON.stringify(res.data.data.taskingTotal));
          this.formWorkDescribe.notStarted = JSON.parse(JSON.stringify(res.data.data.taskNoStartTotal));
          this.formWorkDescribe.delayTaskTotal = JSON.parse(JSON.stringify(res.data.data.delayTaskTotal));
          this.formWorkDescribe.completionRate = JSON.parse(JSON.stringify(res.data.data.completionRate))*100;
          this.formWorkDescribe.delayRate = JSON.parse(JSON.stringify(res.data.data.delayRate))*100;
          if (res.data.data.projectStatus!==null){
            if ( JSON.parse(JSON.stringify(res.data.data.projectStatus)) ===1){
              this.formWork.projectStatusLabel = "正常";
            }else if ( JSON.parse(JSON.stringify(res.data.data.projectStatus))===2){
              this.formWork.projectStatusLabel = "有风险";
            }else {
              this.formWork.projectStatusLabel = "失控";
            }
          }
          this.projectStatus = JSON.parse(JSON.stringify(res.data.data.projectStatus));
          for (let i=0;i<res.data.data.projectUserVos.length;i++){
            this.data3.push({
              userName: JSON.parse(JSON.stringify(res.data.data.projectUserVos[i].userName)),
              userID: JSON.parse(JSON.stringify(res.data.data.projectUserVos[i].userID)),
            })
            this.data1.push({
              userName: JSON.parse(JSON.stringify(res.data.data.projectUserVos[i].userName)),
              userID: JSON.parse(JSON.stringify(res.data.data.projectUserVos[i].userID)),
            })
          }
          this.totalPerson = res.data.data.projectUserVos.length;
        }
      })
    },
    search(){
      let _search = this.searchProjectPersonal.toString().toLowerCase();
      let newListData = []; //  用于存放搜索出来数据的新数组
      if (_search!==null) {
        this.data1.filter(item => {
          if (item.userName.toLowerCase().indexOf(_search) !== -1) {
            newListData.push(item);
          }
        })
        this.data3 = newListData;
      }else {
        this.data3 = this.data1;
      }
    },
    remove (index) {
      if (parseInt(this.$cookies.get("userID"))===this.formItem.projectLeader||this.formItem.projectLeader===null){
        if (this.formItem.projectLeader!==this.data1[index].userID){
          this.axios.delete(this.api.baseUrl + '/project/deleteProjectUser' + '/' + this.data1[index].userID+'/' + this.formItem.projectID).then((res) => {
            let msg = res.data.msg;
            let code = res.data.code;
            if (code === 200) {
              this.$Message.success(msg);
              this.data3.splice(index,1);
            }else {
              this.$Message.error(msg);
            }
          });
        }else {
          this.$Message.error("您是项目负责人，不能自己");
        }
      }else {
        this.$Message.error("您不是项目负责人，不能删除成员");
      }
    },
    handleUpload (file) {
      this.file = file;
      this.uploadData = {'projectID': 1} //修改参数位置
      return false;
    },
    upload () {
      this.loadingStatus = true;
      this.$set(this.$refs.upload.data, 'projectID', this.formItem.projectID);
      this.$refs.upload.post(this.file);
      setTimeout(() => {
        this.file = null;
        this.loadingStatus = false;
        this.$Message.success('Success')
        this.getTaskFile();
      }, 1500);
    },
    download(index){
      window.open(this.api.baseUrl+ "/task/download/" + this.uploadList[index].taskFilePathName, '_blank')
    },
    removeTaskFile(index){
      this.axios.delete(this.api.baseUrl + '/task/deleteTaskFile' + '/' + this.uploadList[index].taskFileID).then((res) => {
        let msg = res.data.msg;
        let code = res.data.code;
        if (code === 200) {
          this.$Message.success(msg);
          this.uploadList.splice(index,1);
        }else {
          this.$Message.error(msg);
        }
      });
    },
    ok () {
      const that = this;
      if (this.formWork.projectStatus!=="") {
        // 校验成功 发起请求
        this.axios.post(this.api.baseUrl + "/project/updateProjectStatus/"+this.formItem.projectID+"/" + this.projectStatus).then((res) => {
          let code = res.data.code;
          let msg = res.data.msg;
          if (code === 200) {
            that.$Message.success(msg);
            this.modal = false;
            if (this.projectStatus===1){
              this.formWork.projectStatusLabel = "正常";
            }else if (this.projectStatus===2){
              this.formWork.projectStatusLabel = "有风险";
            }else {
              this.formWork.projectStatusLabel = "失控";
            }
            this.projectStatus =  null;
          } else {
            // todo 登录失败处理
            that.$Message.error(msg);
          }
        })
      }else {
        that.$Message.error("项目状态必填");
      }
    },
    cancel () {
      this.modal = false;
    },
  },
  watch: {
    formItemData: {
      deep: true,
      handler: function (newVal, oldValue) {
        if (newVal!==oldValue){
          this.axios.post(this.api.baseUrl + "/project/updateProject/",newVal)
        }
      }
    },
  },
  computed:{
    formItemData(){
      return JSON.parse(JSON.stringify(this.formItem));
    }
  },
  created() {
    this.workUsers = this.getUsers();
  },
  mounted() {
    this.getProjectAll();
  }
}
</script>

<style scoped>
.outer-class .ivu-tabs-nav-wrap {
  text-align: center;
}

.outer-class .ivu-tabs-nav-scroll {
  display: inline-block;
}
</style>