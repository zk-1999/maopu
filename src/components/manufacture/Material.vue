<template>
  <div class="min1500">
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>生产管理</el-breadcrumb-item>
      <el-breadcrumb-item>印刷单领料</el-breadcrumb-item>
    </el-breadcrumb>
<el-card>
      <el-form
        :inline="true"
        class="demo-form-inline"
        :model="chaManageForm"
        ref="chaOrdermanagementRef"
      >
        <el-form-item label="生产单号：" prop="sorderCode">
          <el-input v-model="chaManageForm.prolistCode"></el-input>
        </el-form-item>
        <el-form-item label="客户名称：" prop="customerId">
          <el-select v-model="chaManageForm.customerId" placeholder="请选择" class="w100">
            <el-option
              v-for="item in kehu"
              :key="item.customerId"
              :label="item.cusName"
              :value="item.customerId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="合同号：" prop="sorderWarehouse">
          <el-input v-model="chaManageForm.sorderWarehouse"></el-input>
        </el-form-item>
        <el-form-item label="交货方式：" prop="sorderTotalsum">
          <el-input v-model="chaManageForm.sorderTotalsum"></el-input>
        </el-form-item>
        <el-form-item >
          <el-button @click="ManageList">查 询</el-button>
          <el-button type="primary" @click="chaordermanagementForm">重 置</el-button>
        </el-form-item>
      </el-form>
      <!-- <el-button type="success" @click="addManageVisible = true">新 建</el-button> -->
      <el-table
        :data="manageList"
        striped
        border
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="index" label="序号" width="55" align="center"></el-table-column>
        <el-table-column prop="prolistCode" label="生产单号" width="140px"></el-table-column>
        <el-table-column prop="producinggoodsDO.productName" label="商品名称">
        </el-table-column>
        <el-table-column prop="producinggoodsDO.productType" label="产品名称"></el-table-column>
        <el-table-column prop="prolistNumber" label="生产数量"></el-table-column>
        <el-table-column prop="saleOrderDO.sorderDeliverytime" label="交货日期">
         <template slot-scope="scope">
          {{scope.row.saleOrderDO==null? '自生产' : scope.row.saleOrderDO.sorderDeliverytime==null? '没有交货日期' : scope.row.saleOrderDO.sorderDeliverytime}}
          </template> 
        </el-table-column>
        <el-table-column prop="productWanchengtime" label="生产时间"></el-table-column>
        <el-table-column prop="productWanchengtime" label="完成时间"></el-table-column>
        <el-table-column prop="prolistState" label="生产单状态" align="center">
          <template slot-scope="scope">
          <el-tag type="danger" v-if="scope.row.prolistState=='0'">待生产</el-tag>
          <el-tag type="danger" v-if="scope.row.prolistState=='1'">待印刷领料</el-tag>
          <el-tag type="danger" v-if="scope.row.prolistState=='2'">待印刷</el-tag>
          <el-tag type="danger" v-if="scope.row.prolistState=='3'">印刷中</el-tag>
          <el-tag type="danger" v-if="scope.row.prolistState=='4'">待成型领料</el-tag>
          <el-tag type="danger" v-if="scope.row.prolistState=='5'">待成型</el-tag>
          <el-tag type="danger" v-if="scope.row.prolistState=='6'">成型中</el-tag>
          <el-tag type="danger" v-if="scope.row.prolistState=='7'">已完成</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="170px" style="text-align:center">
          <template slot-scope="scope">
             <el-button @click="showMaterial(scope.row.prolistCode,true,1)" type="success" size="small" >查看</el-button>
             <el-button @click="showMaterial(scope.row.prolistCode,true,1)" type="primary" size="small" >物料控制</el-button>
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
    <el-dialog
    title="物料控制"
    :visible.sync="editManageVisible"
    width="60%"
    :before-close="handleClose">
    <el-form ref="addManageRef" label-width="100px" :inline="true" :model="editMaterialForm" :rules="addManageRules">
        <div class="fenge">物料信息</div>
        <el-form-item label="生产单号：" prop="prolistCode">
            <el-input v-model="editMaterialForm.prolistCode" disabled></el-input>
        </el-form-item>
        <el-form-item label="制单人员：" prop="prolistPlanman">
            <el-input v-model="editMaterialForm.prolistPlanman" disabled></el-input>
        </el-form-item>
        <div class="fenge1">商品信息</div>
        <el-button type="primary" @click="xuanzhewuliao">选择物料</el-button>
         <el-table
    style="width: 100%" border @selection-change="handleSelectionChange" >
    <!-- default-expand-all -->
    <el-table-column type="selection" width="35" align="center"></el-table-column>
    <el-table-column label="物理编码" prop="productType" ></el-table-column>
    <el-table-column label="物料名称" prop="productName" ></el-table-column>
    <el-table-column label="商品描述" prop="productChanpchic"></el-table-column>
    <el-table-column label="库存数量" prop="productInnerbao"></el-table-column>
    <el-table-column label="单位" prop="productOutbao"></el-table-column>
    <el-table-column label="计划使用量" prop="productOnege" ></el-table-column>
  </el-table>
    </el-form>
    <span slot="footer" class="dialog-footer">
        <el-button @click="editManageVisible = false">取 消</el-button>
        <el-button type="primary">确 定</el-button>
    </span>
    </el-dialog>
    <el-dialog
      title="物料选择"
      :visible.sync="dialogVisible1"
      width="50%"
      :before-close="handleClose">
      <el-form ref="addManageRef" label-width="100px" :inline="true" :model="wuliaoForm" :rules="addManageRules">
        <el-form-item label="物料类型：" prop="productType">
          <el-select v-model="wuliaoForm.lab" placeholder="请选择" >
            <el-option
              v-for="item in wuliaoleixing"
              :key="item.id"
              :label="item.value"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item >
        <el-button type="primary" @click="wuliaochaxun">查 询</el-button>
        </el-form-item>
         <!-- <el-table
          style="width: 100%" border @selection-change="handleSelectionChange" >
           <el-table-column type="selection" width="35"></el-table-column>
          <el-table-column type="selection" width="35" align="center"></el-table-column>
          <el-table-column label="物理编码" prop="productType" ></el-table-column>
          <el-table-column label="物料名称" prop="productName" ></el-table-column>
          <el-table-column label="商品描述" prop="productChanpchic"></el-table-column>
          <el-table-column label="库存数量" prop="productInnerbao"></el-table-column>
          <el-table-column label="单位" prop="productOutbao"></el-table-column>
          <el-table-column label="计划使用量" prop="productOnege" ></el-table-column>
        </el-table> -->
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible1 = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible1 = false">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>
<script>
export default {
  data() {
    return {
      labelPosition: "right",
      delVisible1:false,
      addManageVisible: false,
      editManageVisible: false,
      dialogVisible1:false,
      delVisible: false,
      currentPage: 0,
      total: 0,
      selectedList: [],
      xianshi:false,
      xianshi1:true,
      manageList:[],
      chaManageForm: {
        prolistCode:'',
        customerId:'',
        sorderTotalsum:'',
        sorderWarehouse:'',
        pageCode: 1, //当前页
        pageSize: 10 //每页显示的记录数
      },
      addManageForm1:{
      productLeixing:'',
        // productgoodsId:'',
      },
      editMaterialForm:{
       prolistCode:'',
       prolistPlanman:'',
       prolistPlantime:'',
      },
      wuliaoForm:{
        lab:'',
      },
      wuliaoleixing:[
        {id:0,value:'原纸'},
        {id:1,value:'纸箱'},
        {id:2,value:'袋字'},
        {id:3,value:'油墨'},
        {id:4,value:'其他'},
      ],
        value:'',
      shenpiren:'',
      addManageRules: {
        sorderAddress: [
          { min: 1, max: 100, message: "长度在 3 到 10 个字符", trigger: "blur" }
        ]
      },
      shangpinmingcheng:[],
      shangpingxinxi:[],
      huobileixing:[],
      yinshuafangshi:[],
      shengchanlist:[],
      shouruleixing:[],
      zijinzhanghu:[],
      kehu:[],
    //   this.
    };
  },
  created() {
    this.ManageList();
    this.list();
    this.getCookie();
  },
  methods: {
   async ManageList() {
     if (this.chaManageForm.sorderCode!=''||this.chaManageForm.sorderTotalsum!=''||this.chaManageForm.sorderStatus!=''||this.chaManageForm.sorderWarehouse!='') {
       this.chaManageForm.pageCode=1;
       this.chaManageForm.pageSize=10;
     }
      const { data: res } = await this.$http.post("sc/Production/selectproduction",this.chaManageForm);
      this.total=res.body.total;
      this.manageList = res.body.rows;
    },
    xuanzhewuliao(){
      this.dialogVisible1=true;
    },
    async wuliaochaxun(){
      const { data: res } = await this.$http.post("sc/Materal/selectname",this.wuliaoForm);
    },
    getCookie: function() {
      var storage=window.localStorage;
      this.shenpiren = storage.getItem("username");
    },
    async showMaterial(prolistCode,xian,sorderStatus) {
      this.editMaterialForm.prolistCode=prolistCode;
      this.editMaterialForm.prolistPlanman=this.shenpiren;
      this.editManageVisible = true;
    },
    async list(){
      const { data: res } = await this.$http.post("jc/Basic/selectparameters");
      const { data: res1 } = await this.$http.post("jc/customer/selectcustom1");
      this.kehu = res1;

    //   const { data: res1 } = await this.$http.post("jc/Basic/selectpaymode");
    //   const { data: res2 } = await this.$http.post("jc/Basic/selectinpaymode");
    //   const { data: res3 } = await this.$http.post("jc/Basic/selectzijin");
    //   this.zijinzhanghu=res3;
    //   this.shouruleixing=res2;
    //   this.huobileixing=res1;
      this.yinshuafangshi = res;
    },

    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    handleSelectionChange(val) {
      console.log(val);
      this.selectedList = val;
    },
    chaordermanagementForm(formName) {
      this.$refs.chaOrdermanagementRef.resetFields();
      this.ManageList();
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      // this.$refs[formName].resetFields();
    },

    //分页相关函数
    handleSizeChange(val) {
      this.chaManageForm.pageSize = val;
      this.ManageList();

    },
    handleCurrentChange(val) {
      this.chaManageForm.pageCode = val;
      this.currentPage=val;
      this.ManageList();
    },
    handleEdit(index, row) {
      console.log(row); // , row
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
 .w400{
   width: 510px;
 }
 .w100{
   width: 180px;
 }
 .w200{
   width: 200px;
 }
 .el-table{
   margin-bottom: 15px;
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
   .demo-table-expand {
    text-align:center;
    .el-form-item {
    margin-bottom: 0px;
}
  }
  .sel{
    width: 203px;
  }
</style>  
