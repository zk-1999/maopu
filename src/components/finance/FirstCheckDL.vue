<template>
  <div class="min1500">
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>财务管理</el-breadcrumb-item>
      <el-breadcrumb-item>报销单-初审</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <!-- <el-row :gutter="20"> -->
      <!-- ref作用？？ -->
      <!-- ref="salesOrdermanagementForm" -->
      <el-form :inline="true" class="demo-form-inline" :model="chaDispatchListForm" ref="chaDispatchListFormRef"> 
        <el-form-item label="报销单号" prop="reimbursementBxnumbers">
          <el-input v-model="chaDispatchListForm.reimbursementBxnumbers" ></el-input>
        </el-form-item>
        <el-form-item label="报销制单人" prop="reimbursementBxproducer">
          <el-input v-model="chaDispatchListForm.reimbursementBxproducer"></el-input>
        </el-form-item>
        <el-form-item label="制单时间" prop="reimbursementBxtime">
          <!-- <el-input v-model="chaDispatchListForm.reimbursementBxtime" ></el-input> -->
          <el-date-picker
      v-model="chaDispatchListForm.reimbursementBxtime"
      type="daterange"
      value-format="yyyy-MM-dd"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期">
    </el-date-picker>
          <!-- <el-date-picker
            v-model="chaDispatchListForm.reimbursementBxtime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择日期" class="w200">
          </el-date-picker> -->
        </el-form-item>
        <el-form-item label="审核状态" prop="reimbursementStatus">
          <el-select v-model="chaDispatchListForm.reimbursementStatus" >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>

        <!-- 查询按钮 -->
        <el-form-item>
          <el-button  @click="getDispatchListList" >查 询</el-button>
          <el-button type="primary" @click="chaDispatchListListForm">重置</el-button>
        </el-form-item>
      </el-form>
      <!-- </el-row> -->
      <!-- 4个按钮 -->
      <!-- <el-button type="success"  @click="addbumenDialogVisible = true">新 增</el-button> -->
      <!-- <el-button type="warning" @click="selectedqi(1)">提 审</el-button> -->
      <el-table border stripe :data="dispatchListList" @selection-change="handleSelectionChange" align="center">
            <!-- <el-table-column type="selection" width="35"></el-table-column> -->
            <el-table-column type="index"  label="序号" width="55" align="center"></el-table-column>
            <el-table-column prop="reimbursementBxnumbers" label="报销单号"></el-table-column>
            <el-table-column prop="reimbursementBxproducer" label="报销制单人"></el-table-column>
            <el-table-column prop="reimbursementType" label="报销类型"></el-table-column>
            <el-table-column prop="reimbursementBxtime" label="制单时间"></el-table-column>
            <el-table-column prop="reimbursementBxremark" label="备注"></el-table-column>
            <el-table-column prop="reimbursementStatus" label="审核状态">
              <template slot-scope="scope">
                <el-tag type="danger" v-if="scope.row.reimbursementStatus=='0'">初始化</el-tag>
                <el-tag type="danger" v-if="scope.row.reimbursementStatus=='1'">待初审</el-tag>
                <el-tag type="danger" v-if="scope.row.reimbursementStatus=='2'">初审未通过</el-tag>
                <el-tag type="danger" v-if="scope.row.reimbursementStatus=='3'">初审通过</el-tag>
                <el-tag type="danger" v-if="scope.row.reimbursementStatus=='4'">复审未通过</el-tag>
                <el-tag type="danger" v-if="scope.row.reimbursementStatus=='5'">已完成</el-tag>
            </template>
            </el-table-column>
            
            <el-table-column label="操作" width="190px">
             <template slot-scope="scope">
                <el-button type="success" icon="el-icon-edit" size="mini" @click="showDispatchList(scope.row.reimbursementBxnumbers,true,0)">查 看</el-button>
                <el-button type="primary" icon="el-icon-edit" size="mini" @click="showDispatchList(scope.row.reimbursementBxnumbers,true,1)" :disabled=" scope.row.reimbursementStatus!=1">审 批</el-button>
              </template>
            </el-table-column>
          </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="10"
        layout="total, prev, pager, next"
        :total=total
      ></el-pagination>
    </el-card>

    <el-dialog
      :title=" '新增报销单' "
      :visible.sync="addbumenDialogVisible"
      width="50%"
      :before-close="handleClose"
    >
    <div class="fenge">报销人员信息</div>
      <el-form :inline="true" class="demo-form-inline" :model="addDispatchListForm" ref="addDispatchListFormRef" :rules="addDispatchListRules">
        <el-form-item label="报销制单人：" prop="reimbursementBxproducer">
          <el-input v-model="addDispatchListForm.reimbursementBxproducer" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="报销类型：" prop="reimbursementType">
          <el-input v-model="addDispatchListForm.reimbursementType" ></el-input>
        </el-form-item>
        <el-form-item label="备注信息：" prop="reimbursementBxremark">
          <el-input
            type="textarea"
            :autosize="{ minRows: 1.3, maxRows:3}"
            placeholder="请输入内容"
            v-model="addDispatchListForm.reimbursementBxremark"
          ></el-input>
        </el-form-item>
<div class="fenge1">报销凭证上传/查看</div>
        <!-- 两个按钮 -->
        <el-form-item>
          <el-upload
            ref="upload"
            :action="ip"
            name="picture"
            list-type="picture-card"
            :limit="1"
            :on-exceed="onExceed"
            :before-upload="beforeUpload"
            :on-preview="handlePreview"
            :on-success="handleSuccess"
            :on-remove="handleRemove">
              <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>
<div class="fenge1">付款凭证</div>
        <!-- 两个按钮 -->
        <el-form-item>
          <el-upload
            ref="upload"
            :action="ip"
            name="picture"
            list-type="picture-card"
            :limit="1"
            :on-exceed="onExceed"
            :before-upload="beforeUpload"
            :on-preview="handlePreview"
            :on-success="handleSuccess1"
            :on-remove="handleRemove">
              <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
          <el-button @click="addbumenDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="addDispatchList">确 定</el-button>
        </span>
    </el-dialog>
     <el-dialog
      :title=" '编辑报销单' "
      :visible.sync="editbumenDialogVisible"
      width="50%"
      :before-close="handleClose"
    >
      <div class="fenge">报销人员信息</div>
      <el-form :inline="true" class="demo-form-inline" :model="editDispatchListForm" ref="addDispatchListFormRef" :rules="addDispatchListRules">
        <el-form-item label="报销制单人：" prop="reimbursementBxproducer">
          <el-input v-model="editDispatchListForm.reimbursementBxproducer" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="报销类型：" prop="reimbursementType">
          <el-input v-model="editDispatchListForm.reimbursementType" :disabled="xianshi"></el-input>
        </el-form-item>
        <br>
        <el-form-item label="备注信息：" prop="reimbursementBxremark">
          <el-input
          :disabled="xianshi"
            type="textarea"
            :autosize="{ minRows: 1.3, maxRows:3}"
            placeholder="请输入内容"
            v-model="editDispatchListForm.reimbursementBxremark"
          ></el-input>
        </el-form-item>
<div class="fenge1">报销凭证上传/查看</div>
        <!-- 两个按钮 -->
        <el-form-item v-if="editDispatchListForm.reimbursementVoucher">
        <img width="20%" :src="ip1 +editDispatchListForm.reimbursementVoucher" alt="" @click="ab(editDispatchListForm.reimbursementVoucher)">
          <el-upload
          :disabled="xianshi"
            ref="upload"
            :action="ip"
            name="picture"
            list-type="picture-card"
            :limit="1"
            :on-exceed="onExceed"
            :before-upload="beforeUpload"
            :on-preview="handlePreview"
            :on-success="handleSuccess"
            :on-remove="handleRemove">
              <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>
<div class="fenge1">付款凭证</div>
        <!-- 两个按钮 -->
        <el-form-item v-if="editDispatchListForm.reimbursementMessage">
        <img width="20%" :src="ip1+editDispatchListForm.reimbursementMessage" alt="" @click="ab(editDispatchListForm.reimbursementMessage)">
       
          <el-upload
          :disabled="xianshi"
            ref="upload"
            :action="ip"
            name="picture"
            list-type="picture-card"
            :limit="1"
            :on-exceed="onExceed"
            :before-upload="beforeUpload"
            :on-preview="handlePreview"
            :on-success="handleSuccess1"
            :on-remove="handleRemove">
              <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>
          <div class="fenge1" v-if="xianshi1||editDispatchListForm.reimbursementStatus==2||editDispatchListForm.reimbursementStatus==3">审核信息</div>
    <el-form-item label="审核人：" v-if="xianshi1||editDispatchListForm.reimbursementStatus==2||editDispatchListForm.reimbursementStatus==3" prop="reimbursementMana">
      <el-input v-model="editDispatchListForm.reimbursementMana" :disabled="true"></el-input>
    </el-form-item>
     <el-form-item label="审核结果：" v-if="xianshi1||editDispatchListForm.reimbursementStatus==2||editDispatchListForm.reimbursementStatus==3" prop="reimbursementStatus">
      <el-radio v-model="editDispatchListForm.reimbursementStatus" label='3' @change="guoqudangqianshijian" :disabled="!xianshi1">通过</el-radio>
      <el-radio v-model="editDispatchListForm.reimbursementStatus" label='2' @change="guoqudangqianshijian" :disabled="!xianshi1">驳回</el-radio>
    </el-form-item>
    <el-form-item label="审核时间：" v-if="xianshi1||editDispatchListForm.reimbursementStatus==2||editDispatchListForm.reimbursementStatus==3" prop="reimbursementTimea">
      <el-input v-model="editDispatchListForm.reimbursementTimea" :disabled="!xianshi1"></el-input>
    </el-form-item> 
    <el-form-item label="审核描述：" v-if="xianshi1||editDispatchListForm.reimbursementStatus==2||editDispatchListForm.reimbursementStatus==3" prop="reimbursementBxremarka">
      <el-input class="w400" v-model="editDispatchListForm.reimbursementBxremarka" :disabled="!xianshi1"></el-input>
    </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
          <el-button @click="editbumenDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="editDispatchList">确 定</el-button>
        </span>
    </el-dialog>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
    <el-dialog title="提示" :visible.sync="delVisibleqi" width="300px">
      <div class="del-dialog-cnt">此操作将批量提审, 是否继续？</div>
      <span slot="footer" class="dialog-footer">
          <el-button @click="delVisibleqi = false">取 消</el-button>
          <el-button type="primary" @click="deleteRowqi" >确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title=""
      :visible.sync="tupainfangdadialogVisible"
      width="45%"
      :before-close="handleClose" class="fanggda">
      <img :src="tupainfangda" alt="" width="100%">
      <span slot="footer" class="dialog-footer">
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      delVisibleqi:false,
      dialogVisible: false,
      dialogImageUrl: '',
      disabled: false,
      dispatchListList:[],
      labelPosition: "right",
      addbumenDialogVisible: false,
      editbumenDialogVisible: false,
      delVisible: false,
      currentPage: 0,
      total: 0,
      delarr: "",
 
      selectedList: [],
      departmentList: [],
      chaDispatchListForm: {
        pageCode: 1, //当前页
        pageSize: 10, 
        status:0,
        reimbursementBxnumbers:'',
        reimbursementBxproducer:'',
        reimbursementBxtime:'',
        reimbursementStatus:'',
      },
      xianshi:false,
      xianshi1:false,
      xianshi2:false,
      addDispatchListForm: {
        reimbursementBxnumbers: '',
        reimbursementBxproducer: '',
        reimbursementBxtime: '',
        reimbursementType: '',
        reimbursementVoucher: '',
        reimbursementBxremark: '',
        reimbursementMessage: '',
      },
      editDispatchListForm: {
        reimbursementBxnumbers: '',
        reimbursementBxproducer: '',
        reimbursementBxtime: '',
        reimbursementType: '',
        reimbursementVoucher: '',
        reimbursementBxremark: '',
        reimbursementMessage: '',
        reimbursementMana:'',
        reimbursementTimea:'',
        reimbursementBxremarka:'',
        reimbursementStatus:'',
        reimbursementManb:'',
        reimbursementTimeb:'',
        reimbursementBxremarkb:'',
      },
      addDispatchListRules: {
        reimbursementBxnumbers: [
         
          { min: 0, max: 1000, message: "长度在 3 到 10 个字符", trigger: "blur" }
        ]
      },
      ip:'',
      ip1:'',
      tupainfangda:'',
      tupainfangdadialogVisible:false,
      dialogImageUrl: '',
      dialogVisible: false,
      yonghu:'',
      // 仓库列表
      options: [{
          value: '0',
          label: '初始化'
        }, {
          value: '1',
          label: '待初审'
        }, {
          value: '2',
          label: '初审未通过'
        }, {
          value: '3',
          label: '待复审'
        }, {
          value: '4',
          label: '复审未通过'
        }, {
          value: '5',
          label: '已完成'
        }],
      total: 0,
      // 页面表单数据
      addOrder: false,
      editOrder: false,
      addGoods: false,
      addOrderForm: {
        activeName: "first"
      },
      title: "",
 
      // 新增状态
      stateOfAdd: false,
      // 编辑状态
      stateOfEdit: false
    };
    
    
  },
  created() {
    //自己写的方法
    this.getDispatchListList();
    this.getCookie();
  },
  methods: {
    ab(url){
       console.log(url);
      this.tupainfangdadialogVisible=true;
      this.tupainfangda=this.ip1+url;
    },
    async getDispatchListList(){
       this.ip1=this.ips;
      this.ip=this.ips+'upload';
      this.chaDispatchListForm.status=1;
      const { data: res } = await this.$http.post("reimbursement/selectReimbursement", this.chaDispatchListForm);
      this.dispatchListList=res.body.rows;
      this.total=res.body.total;
    },
    chaDispatchListListForm(formName) {
      this.$refs.chaDispatchListFormRef.resetFields();
      this.getDispatchListList();
    },
     //分页相关函数
    handleSizeChange(val) {
      this.chaDispatchListForm.pageSize = val;
      this.getDispatchListList();
    },
    handleCurrentChange(val) {
      this.chaDispatchListForm.pageCode = val;
      this.currentPage = val;
      this.getDispatchListList();
    },
    //文件上传成功的钩子函数
        handleSuccess(res, file) {
            this.$message({
                type: 'info',
                message: '图片上传成功',
                duration: 6000
            });
            if (file.response.success) {
                // this.editor.picture = file.response.message; //将返回的文件储存路径赋值picture字段
                this.addDispatchListForm.reimbursementVoucher=file.response.message;
                this.editDispatchListForm.reimbursementVoucher=file.response.message;

                // this.productList.picture=file.response.message;
                
            }
        },
        handleSuccess1(res, file) {
            this.$message({
                type: 'info',
                message: '图片上传成功',
                duration: 6000
            });
            if (file.response.success) {
                // this.editor.picture = file.response.message; //将返回的文件储存路径赋值picture字段
                
                this.addDispatchListForm.reimbursementMessage=file.response.message;
                this.editDispatchListForm.reimbursementMessage=file.response.message;

                // this.productList.picture=file.response.message;
                
            }
        },
        //删除文件之前的钩子函数
        handleRemove(file, fileList) {
            this.$message({
                type: 'info',
                message: '已删除原有图片',
                duration: 6000
            });
        },
        //点击列表中已上传的文件事的钩子函数
        handlePreview(file) {
          this.dialogImageUrl = file.url;
          this.dialogVisible = true;
        },
        //上传的文件个数超出设定时触发的函数
        onExceed(files, fileList) {
            this.$message({
                type: 'info',
                message: '最多只能上传一个图片',
                duration: 6000
            });
        },
        //文件上传前的前的钩子函数
        //参数是上传的文件，若返回false，或返回Primary且被reject，则停止上传
        beforeUpload(file) {
            const isJPG = file.type === 'image/jpeg';
            const isGIF = file.type === 'image/gif';
            const isPNG = file.type === 'image/png';
            const isBMP = file.type === 'image/bmp';
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPG && !isGIF && !isPNG && !isBMP) {
                this.$message.error('上传图片必须是JPG/GIF/PNG/BMP 格式!');
            }
            if (!isLt2M) {
                this.$message.error('上传图片大小不能超过 2MB!');
            }
            return (isJPG || isBMP || isGIF || isPNG) && isLt2M;
        },   
         //读取cookie
    getCookie: function() {
      
      var storage=window.localStorage;
      this.addDispatchListForm.reimbursementBxproducer = storage.getItem("username")
      this.yonghu = storage.getItem("username")
      
    },  
    addDispatchList() {
      this.$refs.addDispatchListFormRef.validate(async valid => {
        if (!valid) return;
        const { data: res } = await this.$http.post(
          "reimbursement/addReimbursement",
          this.addDispatchListForm
        );
        this.getDispatchListList();
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
        this.addbumenDialogVisible = false;
      });
    },
    async showDispatchList(reimbursementBxnumbers,xian,zhi) {
      this.xianshi=xian;
      if(zhi==0){
         this.xianshi1=!xian;
         
      }else if(zhi==1){
        this.xianshi1=xian;
      }
      let param = new URLSearchParams();
      param.append("reimbursementBxnumbers", reimbursementBxnumbers);

      const { data: res } = await this.$http.post("reimbursement/selectReimbursementList",param);
       console.log(res);
      if(res.body.result.reimbursementMana==null || res.body.result.reimbursementMana==''){
        res.body.result.reimbursementMana=this.yonghu;
      }
     
      res.body.result.reimbursementStatus=res.body.result.reimbursementStatus+'';
      this.editDispatchListForm = res.body.result;
      console.log( this.editDispatchListForm);

      this.editbumenDialogVisible = true;
    },
    async editDispatchList(Status) {
     this.editDispatchListForm.reimbursementStatus=parseInt(this.editDispatchListForm.reimbursementStatus) ;
      
      // this.editDispatchListForm.reimbursementStatus=Status;
      const { data: res } = await this.$http.put(
        "reimbursement/updateReimbursement",
        this.editDispatchListForm
      );
      
      this.getDispatchListList();
      this.editbumenDialogVisible = false;
    },
    guoqudangqianshijian(){
      var date = new Date();
      var y = date.getFullYear()
      var mm = date.getMonth() + 1
      var d = date.getDate()
      this.editDispatchListForm.reimbursementTimea=`${y}-${mm}-${d}`
    },
    selectedqi(status){
      this.delarr=[];
      this.delVisibleqi = true;
      for (let i = 0; i < this.selectedList.length; i++) {
        this.delarr.push({reimbursementBxnumbers:this.selectedList[i].reimbursementBxnumbers,reimbursementStatus:status})
      }
    },
      async deleteRowqi(){
         const {data:res} = await this.$http.post('reimbursement/status',this.delarr);
         this.delVisibleqi = false;
         this.getDispatchListList();
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
    selected() {
      this.delarr = [];
      this.delVisible = true;
      for (let i = 0; i < this.selectedList.length; i++) {
        // this.delarr.push(this.selectedList[i].deptId)

        this.delarr += this.selectedList[i].deptId + ",";
      }
      console.log(this.delarr);
    },
    async deleteRow() {
      let param = new URLSearchParams();
      param.append("deptIds", this.delarr);
      const { data: res } = await this.$http.post(
        "sys/dept/batchRemove",
        param
      );
      this.delVisible = false;
      // this.getDepartmentList();
    },

    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },

    deletebumen(reimbursementBxnumbers) {
      this.$confirm("此操作将永久删除该职务, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          const { data: res } = await this.$http.delete("reimbursement/deleteReimbursement"+'/'+reimbursementBxnumbers);
          this.getDispatchListList();
         if (res.respCode==500) {
          this.$message({
            type: "info",
            message: res.msg
          }); 
        }else{
          this.$message({
            type: "success",
            message: res.msg
          });
        }
        });
    },
    handleSelectionChange(val) {
      console.log(val);
      this.selectedList = val;
    },
    // 解决弹出框title
    handleTitle() {
      if (this.addOrder == true) {
        this.title = "新增销售订单";
      }
      if (this.editOrder == true) {
        this.title = "编辑销售订单";
      }
    },
    handleVisible() {
      return this.addOrder || this.editOrder;
    },

    // 自己写的方法
    // 获取仓库列表
    async getWarehouseOptions() {
      const { data: res } = await this.$http.get("/getWarehouseOptions");
      this.warehouseOptions = res.body.rows; //如何取
    },
    // 查询订单列表
    async queryOrderList() {
      // const { data: res } = await
      this.$http
        .get("/queryOrderList", {
          params: {
            salesOrdermanagementForm: this.salesOrdermanagementForm
          }
        })
        .then(function(response) {
          console.log(response);
        })
        .catch(function(error) {
          console.log(error);
        })
        .then(function() {
          // always executed
        });
      this.tableData = res.body.rows; //如何取
    },

   
    chooseReceiptType() {
      if (this.rType === "0") {
        this.stateOfReturn = true;
        stateOfTypeChoose = false;
      } else if (this.rType === "1") {
        this.stateOfSell = true;
        stateOfTypeChoose = false;
      } else {
        handleClose();
      }
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

  .fenge{
    position: absolute;
    top: 34px;
    left: 0px;
    height: 25px;
    width: 98.5%;
    line-height: 25px;
    padding-left:15px ;
    background-color: #DCDFE6;
    
    }
    .fenge1{
    height: 25px;
    width:98.5%;
    line-height: 25px;
    padding-left:15px ;
    background-color: #DCDFE6;
    margin-bottom: 20px;
    }
</style>  