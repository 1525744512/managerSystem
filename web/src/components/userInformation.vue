<template>
  <div class="layout">
    <Layout class="divlayout">
      <Header></Header>
      <Content :style="{padding: '0 50px'}">
        <Breadcrumb :style="{margin: '20px 0'}">
          <BreadcrumbItem>用户信息完善</BreadcrumbItem>
          <BreadcrumbItem v-show="flag">用户相亲要求</BreadcrumbItem>
          <BreadcrumbItem v-show="resultFlag">匹配结果</BreadcrumbItem>
        </Breadcrumb>
        <Card>
          <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80" v-show="!flag&&!resultFlag">
            <FormItem label="姓名" prop="pName">
              <Input v-model="formValidate.pName" placeholder="请输入你的名字"></Input>
            </FormItem>
            <FormItem label="年龄" prop="pAge">
              <Input type="text" v-model="formValidate.pAge" number placeholder="请输入您的年龄"></Input>
            </FormItem>
            <FormItem label="性别" prop="pGender">
              <RadioGroup v-model="formValidate.pGender">
                <Radio label="male">男</Radio>
                <Radio label="female">女</Radio>
              </RadioGroup>
            </FormItem>
            <FormItem label="身高" prop="pHeight">
              <Input type="text" v-model="formValidate.pHeight" number placeholder="请输入您的身高"></Input>
            </FormItem>
            <FormItem label="电话" prop="pPhone">
              <Input type="text" v-model="formValidate.pPhone" number placeholder="请输入您的电话"></Input>
            </FormItem>
            <FormItem label="QQ" prop="pQq">
              <Input v-model="formValidate.pQq" placeholder="请输入您的QQ"></Input>
            </FormItem>
            <FormItem label="房子" prop="pHouse">
              <Input v-model="formValidate.pHouse" placeholder="请输入您的房产情况"></Input>
            </FormItem>
            <FormItem label="爱好" prop="pHobby">
              <Input v-model="formValidate.pHobby" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入您的爱好..."></Input>
            </FormItem>
            <FormItem>
              <Button type="primary" @click="handleSubmit('formValidate')">提交</Button>
              <Button @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
            </FormItem>
          </Form>
          <Form ref="requireFormValidate" :model="requireFormValidate" :rules="requireRuleValidate" :label-width="80" v-show="flag">
            <FormItem label="年龄" prop="rAge">
              <Input type="text" v-model="requireFormValidate.rAge" number placeholder="请输入要求的年龄"></Input>
            </FormItem>
            <FormItem label="性别" prop="rGender">
              <RadioGroup v-model="requireFormValidate.rGender">
                <Radio label="male">男</Radio>
                <Radio label="female">女</Radio>
              </RadioGroup>
            </FormItem>
            <FormItem label="身高" prop="rHeight">
              <Input v-model="requireFormValidate.rHeight" number placeholder="请输入要求的身高"></Input>
            </FormItem>
            <FormItem label="房子" prop="rHouse">
              <Input v-model="requireFormValidate.rHouse" placeholder="请输入要求的房产情况"></Input>
            </FormItem>
            <FormItem>
              <Button type="primary" @click="handleRequireSubmit('requireFormValidate')">提交</Button>
              <Button @click="handleReset('requireFormValidate')" style="margin-left: 8px">重置</Button>
              <Button @click="handleReturn()" style="margin-left: 8px">返回</Button>
            </FormItem>
          </Form>
          <Table width="100%" height="450" :data="tableData1" :columns="tableColumns1" border v-show="resultFlag"></Table>
          <div style="margin: 10px;overflow: hidden" v-show="resultFlag">
            <div style="float: right;">
              <Page :total="pageTotal" :current="pageNum" :page-size="pageSize" @on-change="changePage" show-total></Page>
            </div>
          </div>
        </Card>
      </Content>
      <Footer class="layout-footer-center">2011-2016 &copy; TalkingData</Footer>
    </Layout>
  </div>
</template>

<script>
export default {
  name: "userInformation",
  data () {
    const validateAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('年龄不能为空'));
      }
      // 模拟异步验证效果
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error('请输入数字'));
        } else {
          if (value < 18) {
            callback(new Error('年龄必须大于18岁'));
          } else {
            callback();
          }
        }
      }, 1000);
    }
    const validateIphone = (rule, value, callback) => {
      const regNum = /^[1][3,5,8][0-9]{9}$/;
      if (!value) {
        return callback(new Error('电话不能为空!'));
      }
      // 模拟异步验证效果
      setTimeout(() => {
        if (!regNum.test(value)) {
          callback(new Error('手机号码格式不正确!'));
        } else {
          callback();
        }
      }, 1000);
    }
    const validateHeight = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('身高不能为空!'));
      }
      // 模拟异步验证效果
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error('身高输入不正确!'));
        } else {
          callback();
        }
      }, 1000);
    }
    return {
      formValidate: {
        userName:'',
        pName: '',
        pAge:'',
        pPhone: '',
        pHeight:'',
        pQq: '',
        pGender: '',
        pHouse:'',
        pHobby: ''
      },
      requireFormValidate: {
        userName:'',
        rAge:'',
        rHeight: '',
        rGender: '',
        rHouse:'',
      },
      flag:false,
      ruleValidate: {
        pName: [
          { required: true, message: '姓名不能为空', trigger: 'blur' }
        ],
        pAge: [
          { required: true,validator: validateAge, trigger: 'blur' }
        ],
        pPhone: [
          { required: true, validator: validateIphone, trigger: 'blur' }
        ],
        pQq: [
          { required: true, message: 'QQ不能为空', trigger: 'blur' }
        ],
        pHeight: [
          { required: true, validator: validateHeight, trigger: 'blur' }
        ],
        pGender: [
          { required: true, message: '请选择您的性别', trigger: 'change' }
        ],
        pHouse: [
          { required: true, message: '房产情况不能为空', trigger: 'blur' }
        ],
        pHobby: [
          { required: true, message: '请输入您的爱好', trigger: 'blur' },
        ]
      },
      requireRuleValidate: {
        rAge: [
          { required: true,validator: validateAge, trigger: 'blur' }
        ],
        rHeight: [
          { required: true, validator: validateHeight, trigger: 'blur' }
        ],
        rGender: [
          { required: true, message: '请选择您的性别', trigger: 'change' }
        ],
        rHouse: [
          { required: true, message: '房产情况不能为空', trigger: 'blur' }
        ],
      },
      resultFlag:false,
      pageTotal: 0,
      pageNum: 1,
      pageSize: 2,
      tableData1: [],
      tableColumns1: [
        {
          title: '姓名',
          key: 'name',
          render: (h, params) => {
            return h('div', params.row.name);
          }
        },
        {
          title: '年龄',
          key: 'age',
          render: (h, params) => {
            return h('div', params.row.age);
          }
        },
        {
          title: '性别',
          key: 'sex',
          render: (h, params) => {
            return h('div', params.row.sex);
          }
        },
        {
          title: '联系方式',
          key: 'phone',
          render: (h, params) => {
            return h('div', params.row.phone);
          }
        },
        {
          title: '身高',
          key: 'height',
          render: (h, params) => {
            return h('div', params.row.height);
          }
        },
        {
          title: 'QQ',
          key: 'qq',
          render: (h, params) => {
            return h('div', params.row.qq);
          }
        },
        {
          title: '房子',
          key: 'house',
          render: (h, params) => {
            return h('div', params.row.house);
          }
        },
        {
          title: '爱好',
          key: 'hobby',
          render: (h, params) => {
            return h('div', params.row.hobby);
          }
        },
      ]
    }
  },
  methods: {
    handleSubmit (name) {
      const that = this;
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.formValidate.userName = this.$cookies.get("userName");
          this.axios.post(this.api.baseUrl + '/personal/perfect' , this.formValidate).then((res) => {
            let code = res.data.code;
            let msg = res.data.msg;
            if (code === 200) {
              that.$Message.success(msg);
              this.axios.get(this.api.baseUrl + '/userRequire/getRequire' + '/' + this.formValidate.userName).then((res) => {
                let code = res.data.code;
                if (code === 200) {
                  this.requireFormValidate.rAge = parseInt(JSON.parse(JSON.stringify(res.data.data.rage)));
                  this.requireFormValidate.rHeight = JSON.parse(JSON.stringify(res.data.data.rheight));
                  this.requireFormValidate.rGender = JSON.parse(JSON.stringify(res.data.data.rgender));
                  this.requireFormValidate.rHouse = JSON.parse(JSON.stringify(res.data.data.rhouse));
                }
              });
              this.flag = true;
            }else{
              that.$Message.error(msg);
            }
          });
        } else {
          this.$Message.error('请输入用户信息!');
        }
      })
    },
    handleReset (name) {
      this.$refs[name].resetFields();
    },
    getPersonal(){
      let userName = this.$cookies.get("userName");
      this.axios.get(this.api.baseUrl + '/personal/getPersonal' + '/' + userName).then((res) => {
        let code = res.data.code;
        if (code === 200) {
          this.formValidate.pName = JSON.parse(JSON.stringify(res.data.data.pname));
          this.formValidate.pAge = JSON.parse(JSON.stringify(res.data.data.page));
          this.formValidate.pPhone = JSON.parse(JSON.stringify(res.data.data.pphone));
          this.formValidate.pHeight = JSON.parse(JSON.stringify(res.data.data.pheight));
          this.formValidate.pQq = JSON.parse(JSON.stringify(res.data.data.pqq));
          this.formValidate.pGender = JSON.parse(JSON.stringify(res.data.data.pgender));
          this.formValidate.pHouse = JSON.parse(JSON.stringify(res.data.data.phouse));
          this.formValidate.pHobby = JSON.parse(JSON.stringify(res.data.data.phobby));
        }
      });
    },
    handleRequireSubmit (name) {
      const that = this;
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.requireFormValidate.userName = this.$cookies.get("userName");
          this.axios.put(this.api.baseUrl + '/userRequire/require' , this.requireFormValidate).then((res) => {
            let code = res.data.code;
            let msg = res.data.msg;
            if (code === 200) {
              that.$Message.success(msg);
              this.flag = false;
              this.resultFlag = true;
              this.tableData1 = this.mockTableData1(this.pageNum);
            }else{
              that.$Message.error(msg);
            }
          });
        } else {
          this.$Message.error('请输入相亲要求信息!');
        }
      })
    },
    handleReturn(){
      this.flag = false;
    },
    mockTableData1 (pageNum) {
      let data = [];
      let userName = this.$cookies.get("userName");
      this.axios.get(this.api.baseUrl + '/userRequire/getResult' + '/' + userName + '/' + pageNum + '/' + this.pageSize).then((res) => {
        let msg = res.data.msg;
        let code = res.data.code;
        this.pageTotal = res.data.total;
        if (code === 200) {
          for (let i = 0; i < res.data.data.records.length;i++){
            data.push({
              name: JSON.parse(JSON.stringify(res.data.data.records[i].pname)),
              age:  JSON.parse(JSON.stringify(res.data.data.records[i].page)),
              sex:  JSON.parse(JSON.stringify(res.data.data.records[i].pgender)),
              phone: JSON.parse(JSON.stringify(res.data.data.records[i].pphone)),
              height:JSON.parse(JSON.stringify(res.data.data.records[i].pheight)),
              qq: JSON.parse(JSON.stringify(res.data.data.records[i].pqq)),
              house:  JSON.parse(JSON.stringify(res.data.data.records[i].phouse)),
              hobby:  JSON.parse(JSON.stringify(res.data.data.records[i].phobby)),
            })
          }
        }else {
          this.$Message.error(msg);
        }
      });
      return data;
    },
    changePage (value) {
     this.tableData1 = this.mockTableData1(value);
    }
  },
  created() {
    this.getPersonal();
  }
}
</script>

<style scoped>
.layout{
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
  height:100vh;
}
.divlayout{
  height:100vh;
}
.layout-footer-center{
  text-align: center;
  height: 5%;

}
</style>