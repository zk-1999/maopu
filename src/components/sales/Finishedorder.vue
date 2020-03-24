<template>
  <div class="min1500">
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>销售管理</el-breadcrumb-item>
      <el-breadcrumb-item>发货通知单</el-breadcrumb-item>
    </el-breadcrumb>
     <el-card>
      <!-- <el-row :gutter="20"> -->
      <!-- ref作用？？ -->
      <!-- ref="salesOrdermanagementForm" -->
      <el-form
        :inline="true"
        class="demo-form-inline"
        :model="chaOrdertobeshippedForm"
        ref="chaOrdertobeshippedRef"
      >
        <!-- 订单号 -->
        <el-form-item label="发货单号：" prop="deliveryCode">
          <el-input  class="w200" v-model="chaOrdertobeshippedForm.deliveryCode" ></el-input>
        </el-form-item>
        <!-- 订单状态 -->
        <el-form-item label="订单状态：" prop="deliveryStatus">
           <el-select v-model="chaOrdertobeshippedForm.deliveryStatus" placeholder="请选择" class="w200">
            <el-option
              v-for="item in dingdan"
              :key="item.id"
              :label="item.value"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="发货方式：" prop="deliveryMode">
          <el-input v-model="chaOrdertobeshippedForm.deliveryMode" class="w200" ></el-input>
        </el-form-item>
        <!-- 查询按钮 -->
        <el-form-item >
         <el-button @click="getOrdertobeshipped">查 询</el-button>
          <el-button type="primary" @click="chaOrdertobeshippedFormRef">重 置</el-button>
        </el-form-item>
      </el-form>
      <!-- </el-row> -->
      <!-- 4个按钮 -->
      <!-- <el-button type="success" @click="addOrdermanagementVisible = true">新 建</el-button> -->
      <!-- 表格 -->
      <el-table
        ref="multipleTable"
        :data="ordertobeshippedList"
        style="width: 100%"
        border
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="index" label="序号" width="55"></el-table-column>
        <el-table-column prop="deliveryCode" label="发货单号"></el-table-column>
        <el-table-column prop="deliveryTime" label="发货日期"></el-table-column>
        <el-table-column prop="deliveryMode" label="发货方式"></el-table-column>
        <el-table-column prop="deliveryMan" label="制单人"></el-table-column>
        <el-table-column prop="deliveryTimenow" label="制单时间"></el-table-column>
        <el-table-column prop="deliveryNumber" label="总数量"></el-table-column>
        <el-table-column prop="deliveryStatus" label="审核状态">
          <template slot-scope="scope">
            <el-tag type="danger" v-if="scope.row.deliveryStatus=='0'">待审核</el-tag>
            <el-tag type="danger" v-if="scope.row.deliveryStatus=='1'">审核通过</el-tag>
            <el-tag type="danger" v-if="scope.row.deliveryStatus=='2'">审核不通过</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150px" style="text-align:center">
          <template slot-scope="scope">
            <el-button @click="showEditOrdertobeshipped(scope.row.deliveryCode,true,0)" type="success" size="small">查 看</el-button>
            <el-button @click="showEditOrdertobeshipped(scope.row.deliveryCode,true,1)" type="primary" size="small" :disabled="scope.row.deliveryStatus==1||scope.row.deliveryStatus==2">审 核</el-button>
            <!-- <el-button @click="deletebumen(scope.row.deliveryCode)" type="danger" size="small">删 除</el-button> -->
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="10"
        layout="total, prev, pager, next"
        :total="total"
      ></el-pagination>
    </el-card>
    <!-- 编辑销售订单 -->
     <el-dialog
      :title=" xianshi1?'发货审核': '查看发货审核'"
      :visible.sync="editOrdermanagementVisible"
      width="60%"
      :before-close="handleClose"
    >
    <el-form ref="addOrdertobeshippedRef" label-width="85px" :inline="true" :model="editOrdertobeshippedForm">
          <el-form-item label="制单人：" prop="deliveryMan">
            <el-input v-model="editOrdertobeshippedForm.deliveryMan" disabled></el-input>
          </el-form-item>
          <el-form-item label="发货日期：" prop="deliveryTime">
            <el-input v-model="editOrdertobeshippedForm.deliveryTime" disabled></el-input>
          </el-form-item>
          <el-form-item label="发货方式：" prop="deliveryMode">
            <el-input v-model="editOrdertobeshippedForm.deliveryMode" disabled></el-input>
          </el-form-item>
          <el-form-item label="备注：" prop="deliveryRemark">
      <el-input class="w400" v-model="editOrdertobeshippedForm.deliveryRemark" disabled></el-input>
    </el-form-item >
          <div class="fenge1">商品信息</div>
      <el-table
    :data="editOrdertobeshippedForm.deliveryOrderDOs"
    style="width: 100%" border default-expand-all    @selection-change="handleSelectionChange" class="tb">
    <!-- default-expand-all -->
    <el-table-column type="selection" width="35" align="center" v-if="xianshi1"></el-table-column>
    <el-table-column type="expand"  label="展开"  width="50">
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="">
            {{ props.row.producinggoodsDOs.productSplicing }}
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>
     <el-table-column label="销售单号" prop="sorderCode" width="140"></el-table-column>
    <el-table-column label="客户名称" prop="saleOrderDO.customerDOs.cusName"></el-table-column>
    <el-table-column label="合同号" prop="saleOrderDO.sorderWarehouse"></el-table-column>
    <el-table-column label="交货地点" prop="saleOrderDO.sorderAddress"></el-table-column>
    <el-table-column label="交货方式" prop="saleOrderDO.sorderTotalsum"></el-table-column>
    <el-table-column label="商品名称" prop="producinggoodsDOs.productName"></el-table-column>
    <el-table-column label="数量" prop="saleOrderDO.commodityListDOs[0].commodityNumber"></el-table-column>
    <el-table-column label="已发数量" prop="saleOrderDO.sorderAuqntityshipped"></el-table-column>
    <el-table-column label="发货数量" prop="dorderNumbers">
       <template scope="scope">
        <el-input v-model="scope.row.dorderNumbers" disabled></el-input>
      </template>
    </el-table-column>
  </el-table>
    <div class="fenge1" v-if="editOrdertobeshippedForm.deliveryStatus==1||xianshi1||editOrdertobeshippedForm.deliveryStatus==2">审核信息</div>
    <el-form-item label="审核人："  prop="deliveryReviewedman" v-if="editOrdertobeshippedForm.deliveryStatus==1||xianshi1||editOrdertobeshippedForm.deliveryStatus==2">
      <el-input v-model="editOrdertobeshippedForm.deliveryReviewedman" :disabled="true"></el-input>
    </el-form-item>
     <el-form-item label="审核结果：" prop="deliveryStatus" v-if="editOrdertobeshippedForm.deliveryStatus==1||xianshi1||editOrdertobeshippedForm.deliveryStatus==2">
      <el-radio v-model="editOrdertobeshippedForm.deliveryStatus" label='1' @change="guoqudangqianshijian" :disabled="xianshi">通过</el-radio>
      <el-radio v-model="editOrdertobeshippedForm.deliveryStatus" label='2' @change="guoqudangqianshijian" :disabled="xianshi">驳回</el-radio>
    </el-form-item>
    <el-form-item label="审核时间：" prop="deliveryReviewedtime" v-if="editOrdertobeshippedForm.deliveryStatus==1||xianshi1||editOrdertobeshippedForm.deliveryStatus==2">
      <el-input v-model="editOrdertobeshippedForm.deliveryReviewedtime" :disabled="xianshi"></el-input>
    </el-form-item> 
    <el-form-item label="审核描述："  prop="deliveryRemark1" v-if="editOrdertobeshippedForm.deliveryStatus==1||xianshi1||editOrdertobeshippedForm.deliveryStatus==2">
      <el-input class="w400" v-model="editOrdertobeshippedForm.deliveryRemark1" :disabled="xianshi"></el-input>
    </el-form-item>
  </el-form>
        <span slot="footer" class="dialog-footer">
        <el-button @click="editOrdermanagementVisible = false">取 消</el-button>
        <el-button type="primary" @click="editOrdertobeshipped" v-if="!xianshi">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="提示" :visible.sync="delVisible" width="300px">
      <div class="del-dialog-cnt">删除不可恢复，是否确定删除？</div>
      <span slot="footer" class="dialog-footer">
          <el-button @click="delVisible = false">取 消</el-button>
          <el-button type="primary" @click="deleteRow" >确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      labelPosition: "right",
      addOrdermanagementVisible: false,
      addOrdermanagementVisible1: false,
      editOrdermanagementVisible: false,
      delVisible: false,
      currentPage: 0,
      total: 0,
      shenpiren:'',
      selectedList: [],
      chaOrdertobeshippedForm: {
        pageCode: 1, //当前页
        pageSize: 10 ,//每页显示的记录数
        deliveryCode:'',
        deliveryStatus:'',
        deliveryMode:'',
      },
      addOrdertobeshippedForm: {
        deliveryTime: "",
        deliveryMan: "",
        deliveryMode:"",
        deliveryRemark:"",
        deliveryOrderDOs:[],
        dorderNumbers:'',
      },
      chaOrdermanagementForm:{
         sorderCode:'',
      },
      editOrdertobeshippedForm: {
        deliveryTime: "",
        deliveryMan: "",
        deliveryMode:"",
        deliveryRemark:"",
        deliveryOrderDOs:[],
        dorderNumbers:'',
        deliveryReviewedman:'',
        deliveryReviewedtime:'',
        deliveryRemark1:'',
        deliveryStatus:'',
      },
      addDepartmentRules: {
        name: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 10, message: "长度在 3 到 10 个字符", trigger: "blur" }
        ]
      },
      xianshi:false,
      xianshi1:false,
      ordertobeshippedList:[],
      ordermanagementList:[],
      dingdan:[{
        id:0,
        value:'待审核'
      },{
        id:1,
        value:'审核通过'
      },{
        id:2,
        value:'审核不通过'
      }],
    };
  },
  created() {
      this.getOrdertobeshipped();
      this.getCookie();
  },
  methods: {
      async getOrdertobeshipped() {
      const { data: res } = await this.$http.post("xs/delivery/selectDeliveryNotice",this.chaOrdertobeshippedForm);
      this.ordertobeshippedList = res.body.rows; 
      this.total=res.body.total;
    },
    async getOrdermanagement() {
      const { data: res } = await this.$http.post("xs/saleorder/selectOrderComm",this.chaOrdermanagementForm);
      for (let index = 0; index <  res.body.rows[0].commodityListDOs.length; index++) {
        if(res.body.rows[0].commodityListDOs[index].sorderCode==res.body.rows[0].sorderCode){
          res.body.rows[0].commodityListDOs[index].cusName=res.body.rows[0].customerDOs.cusName;
          res.body.rows[0].commodityListDOs[index].sorderWarehouse=res.body.rows[0].sorderWarehouse;
          res.body.rows[0].commodityListDOs[index].sorderAddress=res.body.rows[0].sorderAddress;
          res.body.rows[0].commodityListDOs[index].sorderTotalsum=res.body.rows[0].sorderTotalsum;
        }
      }
      this.ordermanagementList = res.body.rows[0].commodityListDOs; 
      this.total=res.body.total;
    },
    fahuoshangpin(){
    for (let index = 0; index < this.selectedList.length; index++) {
         if(this.addOrdermanagementVisible==true){
           this.addOrdertobeshippedForm.deliveryOrderDOs.push(this.selectedList[index]);
         }else if(this.editOrdermanagementVisible==true){
           this.editOrdertobeshippedForm.deliveryOrderDOs.push(this.selectedList[index]);
         }
       }
       this.addOrdermanagementVisible1=false;
       this.addOrdermanagementVisible2=false;
        this.editOrdermanagementVisible1=false;
       this.editOrdermanagementVisible2=false;
       this.chaOrdermanagementForm.sorderCode='';
       this.ordermanagementList=[];
    },
    selected(){
      this.delVisible = true;
      this.delarr=[];
      for (let i = 0; i < this.selectedList.length; i++) {
        this.delarr.push(this.selectedList[i].producinggoodsDOs.productgoodsId)
      }
    },
     async deleteRow(){
         for (let index = 0; index < this.delarr.length; index++) {
           for (let i = 0; i < this.addOrdertobeshippedForm.deliveryOrderDOs.length; i++) {
              if(this.delarr[index]==this.addOrdertobeshippedForm.deliveryOrderDOs[i].producinggoodsDOs.productgoodsId)
              this.addOrdertobeshippedForm.deliveryOrderDOs.splice(i,1);
           }
         }
         this.delVisible = false;
         
      },
      guoqudangqianshijian(){
      var date = new Date();
      var y = date.getFullYear()
      var mm = date.getMonth() + 1
      var d = date.getDate()
      this.editOrdertobeshippedForm.deliveryReviewedtime=`${y}-${mm}-${d}`
    },
    addDepartment() {
      this.$refs.addOrdertobeshippedRef.validate(async valid => {
        if (!valid) return;
        const { data: res } = await this.$http.post("xs/delivery/insertDeliveryNotice", this.addOrdertobeshippedForm);
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
        this.getOrdertobeshipped();
        this.addOrdermanagementVisible = false;
      });
    },
    chaOrdertobeshippedFormRef(formName) {
      this.$refs.chaOrdertobeshippedRef.resetFields();
      this.getOrdertobeshipped();
    },
    getCookie: function() {
      var storage=window.localStorage;
      this.addOrdertobeshippedForm.deliveryMan = storage.getItem("username")
       this.shenpiren= storage.getItem("username")
    },
    async showEditOrdertobeshipped(deliveryCode,xian,zhi) {
     
      if(zhi==0){
         this.xianshi1=!xian;
         this.xianshi=true;
      }else if(zhi==1){
        this.xianshi1=xian;
        this.xianshi=false;
      }
      let param = new URLSearchParams();
      param.append("deliveryCode", deliveryCode);
      const { data: res } = await this.$http.post("xs/delivery/selectDeliveryNoticebyid", param);
       if(res.body.DeliveryNoticeDO.deliveryReviewedman==null || res.body.DeliveryNoticeDO.deliveryReviewedman==''){
        res.body.DeliveryNoticeDO.deliveryReviewedman=this.shenpiren;
      }
      this.editOrdertobeshippedForm = res.body.DeliveryNoticeDO;

      this.editOrdermanagementVisible = true;
    },
    async editOrdertobeshipped() {
      const { data: res } = await this.$http.post("xs/delivery/updateDelivery",this.editOrdertobeshippedForm);
      this.editOrdermanagementVisible = false;
      this.getOrdertobeshipped();
    },
    dialogClosed(){
        this.$refs.addOrdertobeshippedRef.resetFields();
        this.addOrdertobeshippedForm.deliveryOrderDOs=[];
      },
  
    // selected() {
    //   this.delarr = [];
    //   this.delVisible = true;
    //   for (let i = 0; i < this.selectedList.length; i++) {
    //     // this.delarr.push(this.selectedList[i].deptId)

    //     this.delarr += this.selectedList[i].deptId + ",";
    //   }
    //   console.log(this.delarr);
    // },
    // async deleteRow() {
    //   let param = new URLSearchParams();
    //   param.append("deptIds", this.delarr);
    //   const { data: res } = await this.$http.post(
    //     "sys/dept/batchRemove",
    //     param
    //   );
    //   this.delVisible = false;
    //   this.getDepartmentList();
    // },

    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },

    deletebumen(deliveryCode) {
      this.$confirm("此操作将永久删除该职务, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          let param = new URLSearchParams();
          param.append("deliveryCode", deliveryCode);
          const { data: res } = await this.$http.post("xs/delivery/deleteDelivery", param);
          this.getOrdertobeshipped();
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    handleSelectionChange(val) {
      this.selectedList = val;
    },

    resetForm(formName) {
      this.$refs[formName].resetFields();
      // this.$refs[formName].resetFields();
    },

    //分页相关函数
   handleSizeChange(val) {
      this.chaOrdertobeshippedForm.pageSize = val;
      this.getOrdertobeshipped();
    },
    handleCurrentChange(val) {
      this.chaOrdertobeshippedForm.pageCode = val;
      this.currentPage = val;
       this.getOrdertobeshipped();
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
 .w400{
   width: 400px;
 }
 .w200{
   width: 200px;
 }
 .el-table{
   margin-bottom: 15px;
 }
   .demo-table-expand {
    text-align:center;
    .el-form-item {
    margin-bottom: 0px;
}
  }
// .fenge{
//     position: absolute;
//     top: 34px;
//     left: 0px;
//     height: 25px;
//     width: 98.5%;
//     line-height: 25px;
//     padding-left:15px ;
//     background-color: #DCDFE6;
    
//     }
//      .fenge1{
//     height: 25px;
//     width:98.5%;
//     line-height: 25px;
//     padding-left:15px ;
//     background-color: #DCDFE6;
//     margin-bottom: 20px;
//     }
</style>  
