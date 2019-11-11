<template>
  <div class="min1500">
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>基础资料</el-breadcrumb-item>
      <el-breadcrumb-item>客户管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-row :gutter="20" class="row">
        <el-col :span="24">
          <el-row :gutter="20">
            <el-form :inline="true" class="demo-form-inline" :model="chaclientForm"  ref="chaclientRef">
              <el-form-item label="客户名称：" prop="cusName">
                <el-input placeholder="请输入客户名称" v-model="chaclientForm.cusName"></el-input>
                <!-- <el-select v-model="chaclientForm.cusName" placeholder="请选择">
                  <el-option
                    v-for="item in chaClientList"
                    :key="item.customerId"
                    :label="item.cusName"
                    :value="item.cusName">
                  </el-option>
                </el-select> -->
              </el-form-item>
              <el-form-item label="类型：" prop="cusType">
                <!-- <el-input placeholder="请输入类型" v-model="chaclientForm.cusType"></el-input> -->
                <el-select class="tiantou" v-model="chaclientForm.cusType" placeholder="请选择类型">
                <el-option
              v-for="item in options"
              :key="item.basicId"
              :label="item.basicRetainone"
              :value="item.basicRetainone"
            ></el-option>
              </el-select>
              </el-form-item>
              <el-form-item label="联系人：" prop="cusContacts">
                <el-input placeholder="请输入联系人" v-model="chaclientForm.cusContacts"></el-input>
              </el-form-item>
              <el-form-item label="手机：" prop="cusPhone">
                <el-input placeholder="请输入联系人手机" v-model="chaclientForm.cusPhone"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button @click="getClientList">查询</el-button>
                <el-button type="primary" @click="chaclientResetForm">重置</el-button>
              </el-form-item>
            </el-form>
          </el-row>
          <el-button type="success" @click="addyonghuDialogVisible = true">新增</el-button>
         <el-button
            type="warning"
            @click="selectedqi"
            :disabled="selectedList.length == 0"
          >批量启用/禁用</el-button>
          <el-button type="danger" @click="selected" :disabled="selectedList.length == 0">批量删除</el-button>
          <el-table border stripe :data="clientList" @selection-change="handleSelectionChange" align="center">
            <el-table-column type="selection" width="35"></el-table-column>
            <el-table-column type="index"  label="序号" width="55" align="center"></el-table-column>
            <el-table-column prop="cusId" label="客户编码"></el-table-column>
            <el-table-column prop="cusName" label="客户名称"></el-table-column>
            <el-table-column prop="cusType" label="类型"></el-table-column>
            <el-table-column prop="cusContacts" label="联系人"></el-table-column>
            <el-table-column prop="cusPhone" label="手机"></el-table-column>
            <el-table-column prop="cusFounder" label="创建人"></el-table-column>
            <el-table-column prop="cusTime" label="创建时间"></el-table-column>
            <el-table-column label="状态" width="65px">
              <template slot-scope="scope">
                <el-switch
                  v-model="scope.row.cusState"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                  :active-value="1"
                  :inactive-value="0"
                  @change="userStateChanged(scope.row)"
                ></el-switch>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="190px">
             <template slot-scope="scope">
                <el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditClient(scope.row.customerId)">修改</el-button>
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  @click="deletebumen(scope.row.customerId)"
                  size="mini"
                >删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
     
        :page-size="10"
        layout="total, prev, pager, next"
        :total=total
      ></el-pagination>
      <!-- <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-size="10"
      layout="total, prev, pager, next"
      :total=total>
    </el-pagination> -->
    </el-card>
    <el-dialog
      title="新增客户"
      :visible.sync="addyonghuDialogVisible"
      width="48%"
      :before-close="handleClose"
      @closed="dialogClosed"
    >
      <el-form :label-position="labelPosition" :model="addClientFrom" :rules="addClientRules" label-width="120px" ref="addRef">
        <el-row>
          <el-col :span="12">
            <el-form-item label="客户编码：" prop="cusId">
              <el-input placeholder="请输入客户编码 如：KH0001" v-model="addClientFrom.cusId"></el-input>
            </el-form-item>
            <el-form-item label="联系人：" prop="cusContacts">
              <el-input placeholder="请输入联系人" v-model="addClientFrom.cusContacts"></el-input>
            </el-form-item>
            <el-form-item label="邮箱：" prop="cusEmail">
              <el-input placeholder="请输入联系邮箱" v-model="addClientFrom.cusEmail"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="客户名称：" prop="cusName">
              <el-input placeholder="请输入客户名称" v-model="addClientFrom.cusName"></el-input>
            </el-form-item>
            <el-form-item label="手机：" prop="cusPhone">
              <el-input placeholder="请输入手机" v-model="addClientFrom.cusPhone"></el-input>
            </el-form-item>
            <el-form-item label="类型：" prop="cusType">
              <el-select class="tiantou" v-model="addClientFrom.cusType" placeholder="请选择类型">
                <el-option
              v-for="item in options"
              :key="item.basicId"
              :label="item.basicRetainone"
              :value="item.basicRetainone"
            ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="联系地址：" prop="cusPriv">
          <el-select
            v-model="addClientFrom.cusPriv"
            @change="choseProvince"
            placeholder="省级地区">
            <el-option
              v-for="item in province"
              :key="item.id"
              :label="item.value"
              :value="item.value">
            </el-option>
          </el-select>
          <el-select
            v-model="addClientFrom.cusCity"
            @change="choseCity"
            placeholder="市级地区">
            <el-option
              v-for="item in shi1"
              :key="item.id"
              :label="item.value"
              :value="item.value">
            </el-option>
          </el-select>
          <el-select
            v-model="addClientFrom.cusTown"
            @change="choseBlock"
            placeholder="区级地区">
            <el-option
              v-for="item in qu1"
              :key="item.id"
              :label="item.value"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="详细地址：" prop="cusAddress">
          <el-input placeholder="请输入详细地址" class="xiang" v-model="addClientFrom.cusAddress"></el-input>
        </el-form-item>
        <el-form-item label="银行卡号：" prop="cusBank">
          <el-input placeholder="请输入银行卡号" class="xiang" v-model="addClientFrom.cusBank"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addyonghuDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addClient">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="编辑客户"
      :visible.sync="edityonghuDialogVisible"
      width="48%"
      :before-close="handleClose"
      @closed="dialogClosed"
    >
      <el-form :label-position="labelPosition" :model="editClientForm" :rules="addClientRules" label-width="120px" ref="addRef">
        <el-row>
          <el-col :span="12">
            <el-form-item label="客户编码：" prop="cusId">
              <el-input placeholder="客户编码" v-model="editClientForm.cusId"></el-input>
            </el-form-item>
            <el-form-item label="联系人：" prop="cusContacts">
              <el-input placeholder="请输入联系人" v-model="editClientForm.cusContacts"></el-input>
            </el-form-item>
            <el-form-item label="邮箱：" prop="cusEmail">
              <el-input placeholder="请输入联系邮箱" v-model="editClientForm.cusEmail"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="客户名称：" prop="cusName">
              <el-input placeholder="请输入客户名称" v-model="editClientForm.cusName"></el-input>
            </el-form-item>
            <el-form-item label="手机：" prop="cusPhone">
              <el-input placeholder="请输入手机" v-model="editClientForm.cusPhone"></el-input>
            </el-form-item>
            <el-form-item label="类型：" prop="cusType">
              <el-select class="tiantou" v-model="editClientForm.cusType" placeholder="请选择类型">
                <el-option
              v-for="item in options"
              :key="item.basicId"
              :label="item.basicRetainone"
              :value="item.basicRetainone"
            ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="联系地址：" prop="cusPriv">
          <el-select
            v-model="editClientForm.cusPriv"
            @change="choseProvince"
            placeholder="省级地区">
            <el-option
              v-for="item in province"
              :key="item.id"
              :label="item.value"
              :value="item.value">
            </el-option>
          </el-select>
          <el-select
            v-model="editClientForm.cusCity"
            @change="choseCity"
            placeholder="市级地区">
            <el-option
              v-for="item in shi1"
              :key="item.id"
              :label="item.value"
              :value="item.value">
            </el-option>
          </el-select>
          <el-select
            v-model="editClientForm.cusTown"
            @change="choseBlock"
            placeholder="区级地区">
            <el-option
              v-for="item in qu1"
              :key="item.id"
              :label="item.value"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="详细地址：" prop="cusAddress">
          <el-input placeholder="请输入详细地址" class="xiang" v-model="editClientForm.cusAddress"></el-input>
        </el-form-item>
        <el-form-item label="银行卡号：" prop="cusBank">
          <el-input placeholder="请输入银行卡号" class="xiang" v-model="editClientForm.cusBank"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="edityonghuDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editClient">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="提示" :visible.sync="delVisible" width="300px">
      <div class="del-dialog-cnt">删除不可恢复，是否确定删除？</div>
      <span slot="footer" class="dialog-footer">
          <el-button @click="delVisible = false">取 消</el-button>
          <el-button type="primary" @click="deleteRow" >确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="提示" :visible.sync="delVisibleqi" width="300px">
      <div class="del-dialog-cnt">此操作将批量启用, 是否继续？</div>
      <span slot="footer" class="dialog-footer">
          <el-button @click="delVisibleqi = false">取 消</el-button>
          <el-button type="primary" @click="deleteRowqi" >确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>

export default {
  data() {
    var checkPhone = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('手机号不能为空'));
        } else {
          const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
          if (reg.test(value)) {
            callback();
          } else {
            return callback(new Error('请输入正确的手机号'));
          }
        }
      };
      var checkEmail = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('邮箱不能为空'));
        } else {
          var checkEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          if (checkEmail.test(value)) {
            callback();
          } else {
            return callback(new Error('请输入正确的邮箱'));
          }
        }
      };
    return {
      province:'',
      shi1: [],
      qu1: [],
      city:'',
      block:'',
      labelPosition: "right",
      addyonghuDialogVisible: false,
      edityonghuDialogVisible: false,
      resetPassdialogVisible: false,
      currentPage:0,
      delVisible:false,
      delVisibleqi:false,
      selectedList: [],
      delarr:[],
      chaClientList:[],
      clientList:[],
      chaclientForm: {
        cusName: "",
        cusType: "",
        cusContacts: "",
        cusPhone: "",
        pageCode: 1, //当前页
        pageSize: 10,//每页显示的记录数
      },
      total:0,
      addClientFrom:{
        cusId:'',
        cusName:'',
        cusType:'',
        cusContacts:'',
        cusPhone:'',
        cusEmail:'',
        cusFounder:'',
        cusTime:'',
        cusPriv:'',
        cusCity:'',
        cusTown:'',
        cusAddress:'',
        cusBank:'',
      },
      addClientRules: {
          cusId:[
          { required: true, message: '请输入正确编码', trigger: 'blur' },
          { min: 6, max: 6, message: '请输入6位编码', trigger: 'blur' }
          ],
          cusName:[
          { required: true, message: '请输入名称', trigger: 'blur' },
          { min: 1, max: 20, message: '长度不能超过20位', trigger: 'blur' }
          ],
          cusContacts:[
          { required: true, message: '请输入联系人', trigger: 'blur' },
          { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
          ],
          cusPhone:[
          {validator: checkPhone, trigger: 'blur'}
          ],
          cusEmail:[
          {validator: checkEmail, trigger: 'blur'}
          ],
          cusAddress:[
          { min: 1, max: 30, message: '长度在 1 到 30 个字符', trigger: 'blur' }
          ],
          cusBank:[
          { min: 1, max:19 , message: '长度在 1 到 19 个字符', trigger: 'blur' }
          ],
      },
      editClientForm:{
        cusId:'',
        cusName:'',
        cusType:'',
        cusContacts:'',
        cusPhone:'',
        cusEmail:'',
        cusFounder:'',
        cusTime:'',
        cusPriv:'',
        cusCity:'',
        cusTown:'',
        cusAddress:'',
        cusBank:'',
      },
      options: [],
    };
  },
  created() {
    this.getClientList();
    this.getClientList1();
    this.getCityData();
    this.kehuleixing();
  },
  methods: {
    async getClientList(){
       const { data: res } = await this.$http.post("jc/customer/selectCustomer",this.chaclientForm);
      console.log(res);
      this.total=res.body.total;
      this.clientList = res.body.rows;
    },
    async kehuleixing(){
      const { data: res } = await this.$http.post("jc/Basic/selectcustomer");
      console.log(res);
      this.options = res;
    },
    async getClientList1(){
       const { data: res } = await this.$http.post("jc/customer/selectCustomer",this.chaclientForm);
      // console.log(res);
      this.chaClientList = res.body.rows;
      
    },
     async userStateChanged(userInfo) {
      //  console.log(userInfo);
      const { data: res } = await this.$http.post("jc/customer/updateCusstate",userInfo);
      this.getClientList();
      if (res.body.respCode==500) {
          this.$message({
            type: "info",
            message: res.body.msg
          }); 
        }else{
          this.$message({
            type: "success",
            message: res.body.msg
          });
        }
    },
    chaclientResetForm(){
     this.$refs.chaclientRef.resetFields();
     this.getClientList();

    },
    selectedqi(){
      this.delarr=[];
      this.delVisibleqi = true;
      for (let i = 0; i < this.selectedList.length; i++) {
        this.delarr.push({customerId:this.selectedList[i].customerId,cusState:this.selectedList[i].cusState==1?0:1})
      }
      console.log(this.delarr);
    },
    selected(){
      this.delVisible = true;
      this.delarr=[];
      for (let i = 0; i < this.selectedList.length; i++) {
        this.delarr.push(this.selectedList[i].customerId)
      }
      console.log(this.delarr);
    },
     async deleteRow(){
         const {data:res} = await this.$http.post('jc/customer/deleteCus',this.delarr);
         this.delVisible = false;
         this.getClientList();
         if (res.body.respCode==500) {
          this.$message({
            type: "info",
            message: res.body.msg
          }); 
        }else{
          this.$message({
            type: "success",
            message: res.body.msg
          });
        }
      },
      async deleteRowqi(){
         const {data:res} = await this.$http.post('jc/customer/updateCus',this.delarr);
         this.delVisibleqi = false;
         this.getClientList();
         if (res.body.respCode==500) {
          this.$message({
            type: "info",
            message: res.body.msg
          }); 
        }else{
          this.$message({
            type: "success",
            message: res.body.msg
          });
        }
      },
      addClient() {
      this.$refs.addRef.validate(async valid => {
        if (!valid) return;    
        const { data: res } = await this.$http.post("jc/customer/addCustomer",this.addClientFrom);
        this.getClientList();
        if (res.body.respCode==500) {
          this.$message({
            type: "info",
            message: res.body.msg
          }); 
        }else{
          this.$message({
            type: "success",
            message: res.body.msg
          });
        }
        this.addyonghuDialogVisible = false;
        this.getClientList1();

      });
    },
    async showEditClient(customerId){
      let param = new URLSearchParams();
      param.append("customerId", customerId);
      const {data:res} = await this.$http.post('jc/customer/selectCustomerbyid',param);
      this.editClientForm=res;
      this.edityonghuDialogVisible=true;
      this.getClientList1();

    },
    async editClient(){
       const {data:res} = await this.$http.post('jc/customer/updateCustomer',this.editClientForm);
       this.getClientList();
       if (res.body.respCode==500) {
          this.$message({
            type: "info",
            message: res.body.msg
          }); 
        }else{
          this.$message({
            type: "success",
            message: res.body.msg
          });
        }
       this.edityonghuDialogVisible=false;
    },
      dialogClosed(){
        this.$refs.addRef.resetFields();
      },
     handleSelectionChange(val) {
      this.selectedList = val;
      console.log(val);
      
    },
    handleSizeChange(val) {
      this.chaclientForm.pageSize=val;
      this.getClientList();
    },
    handleCurrentChange(val) {
      this.chaclientForm.pageCode=val;
      this.currentPage=val;
      this.getClientList();
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    deletebumen(customerId) {
      this.$confirm("此操作将永久删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async() => {
          let param = new URLSearchParams();
          param.append("customerId", customerId);
          const { data: res } = await this.$http.post(
            "/jc/customer/deleteCustomer",
            param
            
          );
          if (res.body.respCode==500) {
          this.$message({
            type: "info",
            message: res.body.msg
          }); 
        }else{
          this.$message({
            type: "success",
            message: res.body.msg
          });
        }
          this.getClientList();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    handleNodeClick(data) {
      console.log(data);
    },
    // 加载china地点数据，三级
      getCityData:function(){
        var that = this
        var ip=this.ips;
        this.$http.get('/'+'map.json').then(function(response){
          if (response.status==200) {
            var data = response.data
            that.province = []
            that.city = []
            that.block = []
            // 省市区数据分类
            for (var item in data) {
              if (item.match(/0000$/)) {//省
                that.province.push({id: item, value: data[item], children: []})
              } else if (item.match(/00$/)) {//市
                that.city.push({id: item, value: data[item], children: []})
              } else {//区
                that.block.push({id: item, value: data[item]})
              }
            }
            // 分类市级
            for (var index in that.province) {
              for (var index1 in that.city) {
                if (that.province[index].id.slice(0, 2) === that.city[index1].id.slice(0, 2)) {
                  that.province[index].children.push(that.city[index1])
                }
              }
            }
            // 分类区级
            for(var item1 in that.city) {
              for(var item2 in that.block) {
                if (that.block[item2].id.slice(0, 4) === that.city[item1].id.slice(0, 4)) {
                  that.city[item1].children.push(that.block[item2])
                }
              }
            }
          }
          else{
            console.log(response.status)
          }
        }).catch(function(error){console.log(typeof+ error)})
      },
      // 选省
      choseProvince:function(e) {
        for (var index2 in this.province) {
          if (e === this.province[index2].value) {
            this.shi1 = this.province[index2].children
            this.shi = this.province[index2].children[0].value
            this.qu1 =this.province[index2].children[0].children
            this.qu = this.province[index2].children[0].children[0].value
            this.E = this.qu1[0].id
          }
        }
      },
      // 选市
      choseCity:function(e) {
        for (var index3 in this.city) {
          if (e === this.city[index3].value) {
            this.qu1 = this.city[index3].children
            this.qu = this.city[index3].children[0].value
            this.E = this.qu1[0].id
            // console.log(this.E)
          }
        }
      },
      // 选区
      choseBlock:function(e) {
        this.E=e;
        // console.log(this.E)
      },
  }
};
</script>
<style lang='less' scoped>
.el-card {
  margin-top: 15px;
}
.el-row {
  align-items: center;
  display: flex;
}
.el-table {
  margin-top: 15px;
}
.demo-form-inline .el-input {
  width: 170px;
}
.el-select {
  width: 225px;
}
.xiang {
  width: 400px;
}
.hu {
  width: 133px;
}
</style>