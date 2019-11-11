<template>
  <div class="min1500">
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>基础资料</el-breadcrumb-item>
      <el-breadcrumb-item>供应商管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-row :gutter="20" class="row">
        <el-col :span="24">
          <el-row :gutter="20">
            <el-form :inline="true" class="demo-form-inline" :model="chaSupplierForm" ref="chaSupplierRef">
              <el-form-item label="供应商名称：" prop="supName">
                <el-input placeholder="请输入供应商名称" v-model="chaSupplierForm.supName"></el-input>
                <!-- <el-select v-model="chaSupplierForm.supName" placeholder="请选择">
                  <el-option
                    v-for="item in chaSupplierForm1"
                    :key="item.supplierId"
                    :label="item.supName"
                    :value="item.supName">
                  </el-option>
                </el-select> -->
              </el-form-item>
              <el-form-item label="类型：" prop="supType">
                <!-- <el-input placeholder="请输入类型" v-model="chaSupplierForm.supType"></el-input> -->
                <el-select v-model="chaSupplierForm.supType" placeholder="请选择">
                  <el-option
                    v-for="item in chasupTypelist"
                    :key="item.basicId"
                    :label="item.basicRetainone"
                    :value="item.basicRetainone">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="联系人：" prop="supContacts">
                <el-input placeholder="请输入联系人" v-model="chaSupplierForm.supContacts"></el-input>
              </el-form-item>
              <el-form-item label="手机：" prop="supPhone">
                <el-input placeholder="请输入手机" v-model="chaSupplierForm.supPhone"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button @click="getSupplierList">查询</el-button>
                <el-button type="primary"  @click="chaSupplierResetForm('chaSupplierForm')">重置</el-button>
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
          <el-table border :data="supplierList" stripe @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="35"></el-table-column>
            <el-table-column type="index" width="55" align="center" label="序号"></el-table-column>
            <el-table-column prop="supId" label="供应商编码"></el-table-column>
            <el-table-column prop="supName" label="供应商名称"></el-table-column>
            <el-table-column prop="supType" label="类型"></el-table-column>
            <el-table-column prop="supContacts" label="联系人"></el-table-column>
            <el-table-column prop="supPhone" label="联系人手机"></el-table-column>
            <!-- <el-table-column prop="supState" label="状态"></el-table-column> -->
            <el-table-column prop="supCreateUser" label="创建人"></el-table-column>
            <el-table-column prop="supCreateTime" label="创建时间"></el-table-column>
            <el-table-column prop="supState" label="状态" width="65px">
              <template slot-scope="scope">
                <!-- {{scope.row}} -->
                <el-switch
                  v-model="scope.row.supState"
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
                <el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditSupplier(scope.row.supplierId)">修改</el-button>
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  @click="deletebumen(scope.row.supplierId)"
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
        layout="total,  prev, pager, next"
        :total="total"
      ></el-pagination>
    </el-card>
    <el-dialog
      title="新增供应商"
      :visible.sync="addyonghuDialogVisible"
      width="48%"
      :before-close="handleClose"
       @closed="dialogClosed"
    >
      <el-form
        :label-position="labelPosition"
        label-width="120px"
        :model="addSupplierForm"
        ref="addSupplierRef"
        :rules="addsSupplierRules"
      >
        <el-row>
          <el-col :span="12">
            <el-form-item label="供应商编码：" prop="supId">
              <el-input v-model="addSupplierForm.supId" placeholder="请输入供应商编码 如：GYS001"></el-input>
            </el-form-item>
            <el-form-item label="联系人：" prop="supContacts">
              <el-input v-model="addSupplierForm.supContacts" placeholder="请输入联系人"></el-input>
            </el-form-item>
            <el-form-item label="邮箱：" prop="supEmail">
              <el-input v-model="addSupplierForm.supEmail" placeholder="请输入邮箱"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="供应商名称：" prop="supName">
              <el-input v-model="addSupplierForm.supName" placeholder="请输入与营业执照一致的供应商名称"></el-input>
            </el-form-item>
            <el-form-item label="手机：" prop="supPhone">
              <el-input v-model="addSupplierForm.supPhone" placeholder="请输入手机"></el-input>
            </el-form-item>
            <el-form-item label="类型：" prop="supType">
              <el-select class="tiantou" v-model="addSupplierForm.supType" placeholder="请选择类型">
                <el-option
                    v-for="item in chasupTypelist"
                    :key="item.basicId"
                    :label="item.basicRetainone"
                    :value="item.basicRetainone">
                  </el-option>
                </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        
        <el-row>
          <el-col :span="8">
            <el-form-item label="联系地址：" prop="supPriv" >
              <el-select
                v-model="addSupplierForm.supPriv"
                @change="choseProvince"
                placeholder="省级地区">
                <el-option
                  v-for="item in province"
                  :key="item.id"
                  :label="item.value"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
            <el-col :span="8">
            <el-form-item  prop="supCity" label-width="60px">
              <el-select
                v-model="addSupplierForm.supCity"
                @change="choseCity"
                placeholder="市级地区">
                <el-option
                  v-for="item in shi1"
                  :key="item.id"
                  :label="item.value"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
            <el-col :span="8">
            <el-form-item  prop="supTown" label-width="0px">
              <el-select
                v-model="addSupplierForm.supTown"
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
          </el-col>
        </el-row>
        <el-form-item label="详细地址：" prop="supAddress">
          <el-input v-model="addSupplierForm.supAddress" placeholder="请输入详细地址" class="xiang"></el-input>
        </el-form-item>
        <el-form-item label="银行卡号：" prop="supBank">
          <el-input v-model="addSupplierForm.supBank" placeholder="请输入银行卡号" class="xiang"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addyonghuDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addSupplier">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="编辑供应商"
      :visible.sync="edityonghuDialogVisible"
      width="48%"
      :before-close="handleClose"
      @closed="dialogClosed"
    >
       <el-form
        :label-position="labelPosition"
        :model="editSupplierForm"
        ref="addSupplierRef"
        label-width="120px"
        :rules="addsSupplierRules"
      >
        <el-row>
          <el-col :span="12">
            <el-form-item label="供应商编码：" prop="supId">
              <el-input v-model="editSupplierForm.supId" placeholder="请输入供应商编码 如：GYS001"></el-input>
            </el-form-item>
            <el-form-item label="联系人：" prop="supContacts">
              <el-input v-model="editSupplierForm.supContacts" placeholder="请输入联系人"></el-input>
            </el-form-item>
            <el-form-item label="邮箱：" prop="supEmail">
              <el-input v-model="editSupplierForm.supEmail" placeholder="请输入邮箱"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="供应商名称：" prop="supName">
              <el-input v-model="editSupplierForm.supName" placeholder="请输入与营业执照一致的供应商名称"></el-input>
            </el-form-item>
            <el-form-item label="手机：" prop="supPhone">
              <el-input v-model="editSupplierForm.supPhone" placeholder="请输入手机"></el-input>
            </el-form-item>
            <el-form-item label="类型：" prop="supType">
              <el-select class="tiantou" v-model="editSupplierForm.supType" placeholder="请选择类型">
                <el-option
                    v-for="item in chasupTypelist"
                    :key="item.basicId"
                    :label="item.basicRetainone"
                    :value="item.basicRetainone">
                  </el-option>
                </el-select>

            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="联系地址：" prop="supPriv" >
              <el-select
                v-model="editSupplierForm.supPriv"
                @change="choseProvince"
                placeholder="省级地区">
                <el-option
                  v-for="item in province"
                  :key="item.id"
                  :label="item.value"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
            <el-col :span="8">
            <el-form-item  prop="supCity" label-width="60px">
              <el-select
                v-model="editSupplierForm.supCity"
                @change="choseCity"
                placeholder="市级地区">
                <el-option
                  v-for="item in shi1"
                  :key="item.id"
                  :label="item.value"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
            <el-col :span="8">
            <el-form-item  prop="supTown" label-width="0px">
              <el-select
                v-model="editSupplierForm.supTown"
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
          </el-col>
        </el-row>
        <el-form-item label="详细地址：" prop="supAddress">
          <el-input v-model="editSupplierForm.supAddress" placeholder="请输入详细地址" class="xiang"></el-input>
        </el-form-item>
        <el-form-item label="银行卡号：" prop="supBank">
          <el-input v-model="editSupplierForm.supBank" placeholder="请输入银行卡号" class="xiang"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="edityonghuDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editSupplier">确 定</el-button>
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
import { async } from "q";
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
      delVisible:false,
      delVisibleqi:false,
      currentPage:0,
      selectedList: [],
      delarr:[],
      total:0,
      supplierList: [],
      addSupplierForm: {
        supId: "",
        supName: "",
        supType: "",
        supContacts: "",
        supPhone: "",
        supEmail: "",
        supCreateUser: "",
        supCreateTime: "",
        supPriv: "",
        supCity: "",
        supTown: "",
        supAddress: "",
        supBank: "",
      },
      editSupplierForm: {
        supId: "",
        supName: "",
        supType: "",
        supContacts: "",
        supPhone: "",
        supEmail: "",
        supCreateUser: "",
        supCreateTime: "",
        supPriv: "",
        supCity: "",
        supTown: "",
        supAddress: "",
        supBank: ""
      },
      chaSupplierForm: {
        supName1: [],
        supType: "",
        supContacts: "",
        supPhone: "",
        supName:'',
        pageCode: 1, //当前页
        pageSize: 10,//每页显示的记录数
      },
      chaSupplierForm1:[],
      chasupTypelist:[],
      addsSupplierRules: {
          supId:[
          { required: true, message: '请输入正确编码', trigger: 'blur' },
          { min: 6, max: 6, message: '请输入6位商编码', trigger: 'blur' }
          ],
          supName:[
          { required: true, message: '请输入名称', trigger: 'blur' },
          { min: 1, max: 20, message: '长度不能超过20位', trigger: 'blur' }
          ],
          supContacts:[
          { required: true, message: '请输入联系人', trigger: 'blur' },
          { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
          ],
          supPhone:[
          {validator: checkPhone, trigger: 'blur'}
          ],
          supEmail:[
          {validator: checkEmail, trigger: 'blur'}
          ],
          supAddress:[
          
          { min: 1, max: 30, message: '长度在 1 到 30 个字符', trigger: 'blur' }
          ],
          supBank:[
          { min: 1, max:19 , message: '长度在 1 到 19 个字符', trigger: 'blur' }
          ],
          
      },
    };
  },
  created() {
    this.getSupplierList();
    this.getCityData();
    this.getSupplierList1();
    this.getChasupTypelist();
  },
  methods: {
    
    // 加载china地点数据，三级
      getCityData:function(){
        var that = this
        console.log(this.ips);
        
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
    async getSupplierList() {
      const { data: res } = await this.$http.post("jc/supplier/selectSupplier",{params:this.chaSupplierForm});
      // console.log(res);
      this.total=res.body.total
      this.supplierList = res.body.rows;
    },
    async getSupplierList1() {
      const { data: res } = await this.$http.post("jc/supplier/selectSupplier",{params:this.chaSupplierForm});
      // console.log(res);
      this.chaSupplierForm1=res.body.rows;
    },
   async getChasupTypelist(){
      const { data: res } = await this.$http.post("jc/Basic/selectCustype");
      console.log(res);
      this.chasupTypelist=res;
   },
    async userStateChanged(userInfo) {
      const { data: res } = await this.$http.post("jc/supplier/startSuppiler",userInfo);
      this.getSupplierList();
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
    addSupplier() {
      this.$refs.addSupplierRef.validate(async valid => {
        if (!valid) return;    
        console.log(this.addSupplierForm);
        
        const { data: res } = await this.$http.post("/jc/supplier/addSupplier",this.addSupplierForm);
        this.getSupplierList();
        this.addyonghuDialogVisible = false;
        this.getSupplierList1();
        this.getChasupTypelist();
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
      });
    },
   async showEditSupplier(supplierId){
      let param = new URLSearchParams();
      param.append("supplierId", supplierId);
      const {data:res} = await this.$http.post('jc/supplier/selectSupplierbyid/',param);
      console.log(res);
      this.editSupplierForm=res;
      this.edityonghuDialogVisible=true;
    },
    async editSupplier(){
       const {data:res} = await this.$http.post('/jc/supplier/updateSupplier',this.editSupplierForm);
       this.getSupplierList();
       this.edityonghuDialogVisible=false;
       this.getSupplierList1();
       this.getChasupTypelist();
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
    chaSupplierResetForm(formName){
        this.$refs.chaSupplierRef.resetFields();
        this.getSupplierList();
    },
    dialogClosed(){
        this.$refs.addSupplierRef.resetFields();
      },
    handleSelectionChange(val) {
      this.selectedList = val
    },
    
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.chaSupplierForm.pageSize=val;
      this.getSupplierList();
    },
    handleCurrentChange(val) {
      this.chaSupplierForm.pageCode=val;
      console.log(`当前页: ${val}`);
      this.currentPage=val;
      this.getSupplierList();
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    selectedqi(){
      this.delarr=[];
      this.delVisibleqi = true;
      for (let i = 0; i < this.selectedList.length; i++) {
        this.delarr.push({supplierId:this.selectedList[i].supplierId,supState:this.selectedList[i].supState==1?0:1})
      }
      console.log(this.delarr);
    },
    selected(){
      this.delarr=[];
      this.delVisible = true;
      for (let i = 0; i < this.selectedList.length; i++) {
        this.delarr.push(this.selectedList[i].supplierId)
      }
      console.log(this.delarr);
    },
    async deleteRow(){
         const {data:res} = await this.$http.post('/jc/supplier/deleteSup',this.delarr);
         this.delVisible = false;
         this.getSupplierList();
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
         const {data:res} = await this.$http.post('jc/supplier/updatestate',this.delarr);
         this.delVisibleqi = false;
         this.getSupplierList();
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
    deletebumen(supplierId) {
      this.$confirm("此操作将永久删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          let param = new URLSearchParams();
          param.append("supplierId", supplierId);
          const { data: res } = await this.$http.post(
            "/jc/supplier/deleteSupplier",
            param
          );
          console.log(supplierId);
          this.getSupplierList();

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
    }
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