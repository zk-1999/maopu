<template>
  <div class="min1500">
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>生产管理</el-breadcrumb-item>
      <el-breadcrumb-item>生产单排程</el-breadcrumb-item>
    </el-breadcrumb>
<el-card>
      <el-form
        :inline="true"
        class="demo-form-inline"
        :model="chaManageForm"
        ref="chaOrdermanagementRef"
      >
        <el-form-item label="生产单号：" prop="prolistCode">
          <el-input v-model="chaManageForm.prolistCode"></el-input>
        </el-form-item>
        <el-form-item label="销售单号：" prop="sorderCode">
          <el-input v-model="chaManageForm.sorderCode"></el-input>
        </el-form-item>
       <el-form-item label="产品规格：" prop="productNorms">
          <el-select v-model="chaManageForm.productNorms" placeholder="请选择">
            <el-option
              v-for="item in kehu"
              :key="item.basicId"
              :label="item.basicRetainone"
              :value="item.basicId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item >
          <el-button @click="ManageList">查 询</el-button>
          <el-button type="primary" @click="chaordermanagementForm">重 置</el-button>
        </el-form-item>
      </el-form>
       <el-button type="success" @click="jieshupaicheng"
            :disabled="selectedList.length == 0 || selectedList.length > 1">结束排程</el-button>
      <el-table
        :data="manageList"
        striped
        border
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
       <el-table-column type="selection" width="35"></el-table-column>
        <el-table-column type="index" label="序号" width="55" align="center"></el-table-column>
        <el-table-column prop="prolistCode" label="生产单号" ></el-table-column>
        <el-table-column prop="sorderCode" label="销售单号"></el-table-column>
        <el-table-column prop="productNorms" label="产品规格"></el-table-column>
        
        <el-table-column prop="start" label="开始时间"></el-table-column>
        <el-table-column prop="stop" label="完成时间"></el-table-column>
        <el-table-column prop="ontime" label="所需时间"></el-table-column>
        <el-table-column prop="intime" label="距离生产时间"></el-table-column>
        <el-table-column prop="surplus" label="剩余时间/天"></el-table-column>
        
        
        
        <el-table-column prop="priority" label="排程位序"></el-table-column>
        <!-- <el-table-column prop="cusName" label="客户名称">
          <template slot-scope="scope">
            {{scope.row.cusName == null ? '自生产' : scope.row.cusName}}
          </template>
        </el-table-column>
        <el-table-column prop="sorderWarehouse" label="合同号">
          <template slot-scope="scope">
            {{scope.row.sorderWarehouse == null ? '自生产' : scope.row.sorderWarehouse}}
          </template>
        </el-table-column>
        <el-table-column prop="saleOrderDO.sorderAddress" label="交货地点">
          <template slot-scope="scope">
            {{scope.row.saleOrderDO==null? '自生产' : scope.row.saleOrderDO.sorderAddress==null? '没有交货地点' : scope.row.saleOrderDO.sorderAddress}}
          </template>
        </el-table-column>
        <el-table-column prop="sorderTotalsum" label="交货方式">
          <template slot-scope="scope">
            {{scope.row.saleOrderDO==null? '自生产' : scope.row.saleOrderDO.sorderTotalsum==null? '没有交货方式' : scope.row.saleOrderDO.sorderTotalsum}}
          </template>
        </el-table-column>
        <el-table-column prop="producinggoodsDO.productName" label="商品名称">
        </el-table-column>
        <el-table-column prop="producinggoodsDO.productType" label="产品名称"></el-table-column>
        <el-table-column prop="saleOrderDO.commodityNumber" label="销售数量">
          <template slot-scope="scope">
          {{scope.row.saleOrderDO==null? '自生产' : scope.row.saleOrderDO.commodityNumber==null? '没有销售数量' : scope.row.saleOrderDO.commodityNumber}}
          </template> 
        </el-table-column>
        <el-table-column prop="prolistNumber" label="生产数量"></el-table-column>
        <el-table-column prop="saleOrderDO.sorderDeliverytime" label="交货日期">
         <template slot-scope="scope">
          {{scope.row.saleOrderDO==null? '自生产' : scope.row.saleOrderDO.sorderDeliverytime==null? '没有交货日期' : scope.row.saleOrderDO.sorderDeliverytime}}
          </template> 
        </el-table-column> -->
        
        <!-- <el-table-column prop="prolistState" label="生产单状态" align="center">
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
        </el-table-column> -->
        <el-table-column label="操作" width="105px" style="text-align:center">
          <template slot-scope="scope">
             <!-- <el-button @click="showManage(scope.row.prolistCode,true,1)" type="success" size="small" >查看</el-button> -->
             <el-button @click="showManage(scope.row.prolistCode,true,1)" type="primary" size="small" >排程调整</el-button>
             <!-- <el-button @click="showManage(scope.row.prolistCode,true,1)" type="primary" size="small" >下调</el-button> -->

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
    title="排程生产单"
    :visible.sync="addManageVisible"
    width="70%"
    @open="guoqushangpin"
    :before-close="handleClose">
          <el-table
        :data="manageList"
        striped
        border
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="index" label="序号" width="55" align="center"></el-table-column>
        <el-table-column prop="prolistCode" label="生产单号" width="140px"></el-table-column>
        <el-table-column prop="cusName" label="客户名称">
          <template slot-scope="scope">
            {{scope.row.cusName == null ? '自生产' : scope.row.cusName}}
          </template>
        </el-table-column>
        <el-table-column prop="sorderWarehouse" label="合同号">
          <template slot-scope="scope">
            {{scope.row.sorderWarehouse == null ? '自生产' : scope.row.sorderWarehouse}}
          </template>
        </el-table-column>
        <el-table-column prop="saleOrderDO.sorderAddress" label="交货地点">
          <template slot-scope="scope">
            {{scope.row.saleOrderDO==null? '自生产' : scope.row.saleOrderDO.sorderAddress==null? '没有交货地点' : scope.row.saleOrderDO.sorderAddress}}
          </template>
        </el-table-column>
        <el-table-column prop="sorderTotalsum" label="交货方式">
          <template slot-scope="scope">
            {{scope.row.saleOrderDO==null? '自生产' : scope.row.saleOrderDO.sorderTotalsum==null? '没有交货方式' : scope.row.saleOrderDO.sorderTotalsum}}
          </template>
        </el-table-column>
        <el-table-column prop="producinggoodsDO.productName" label="商品名称">
        </el-table-column>
        <el-table-column prop="producinggoodsDO.productType" label="产品名称" width="120"></el-table-column>
        <el-table-column prop="saleOrderDO.commodityNumber" label="销售数量">
          <template slot-scope="scope">
          {{scope.row.saleOrderDO==null? '自生产' : scope.row.saleOrderDO.commodityNumber==null? '没有销售数量' : scope.row.saleOrderDO.commodityNumber}}
          </template> 
        </el-table-column>
        <el-table-column prop="prolistNumber" label="生产数量"></el-table-column>
        <el-table-column prop="saleOrderDO.sorderDeliverytime" label="交货日期"  width="110">
         <template slot-scope="scope">
          {{scope.row.saleOrderDO==null? '自生产' : scope.row.saleOrderDO.sorderDeliverytime==null? '没有交货日期' : scope.row.saleOrderDO.sorderDeliverytime}}
          </template> 
        </el-table-column>
        <!-- <el-table-column prop="productWanchengtime" label="完成时间"></el-table-column> -->
        <el-table-column prop="prolistState" label="生产单状态" align="center"  width="120">
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
        <el-table-column label="操作" width="150px" style="text-align:center">
          <template slot-scope="scope">
             <!-- <el-button @click="showManage(scope.row.prolistCode,true,1)" type="success" size="small" >查看</el-button> -->
             <el-button @click="showManage(scope.row.prolistCode,true,1)" type="primary" size="small" >上调</el-button>
             <el-button @click="showManage(scope.row.prolistCode,true,1)" type="primary" size="small" >下调</el-button>

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
    
    <span slot="footer" class="dialog-footer">
        <el-button @click="addManageVisible = false">取 消</el-button>
        <el-button type="primary" @click="addManage">确 定</el-button>
    </span>
    </el-dialog>
    <el-dialog
    title="生产单排程调整"
    :visible.sync="editManageVisible"
    width="40%"
    @open="guoqushangpin"
    :before-close="handleClose">
    <el-form ref="addManageRef" label-width="130px" :inline="true" :model="editManageForm1" :rules="addManageRules">
        <!-- <div class="fenge">生产信息</div> -->
        <el-form-item label="生产单号：" prop="prolistCode" >
            <el-input v-model="editManageForm1.prolistCode" disabled></el-input>
        </el-form-item>
        <el-form-item label="开始时间：" prop="start">
            <el-input v-model="editManageForm1.start" disabled></el-input>
        </el-form-item>
        <el-form-item label="销售单号：" prop="sorderCode">
            <el-input v-model="editManageForm1.sorderCode" disabled></el-input>
        </el-form-item>
         <el-form-item label="结束时间：" prop="stop">
            <el-input v-model="editManageForm1.stop" disabled></el-input>
        </el-form-item>
        <el-form-item label="产品规格：" prop="productNorms">
            <el-input v-model="editManageForm1.productNorms" disabled></el-input>
        </el-form-item>
        <el-form-item label="剩余时间/天：" prop="surplus">
            <el-input v-model="editManageForm1.surplus" disabled></el-input>
        </el-form-item>
        <el-form-item label="所需时间：" prop="ontime">
            <el-input v-model="editManageForm1.ontime" disabled></el-input>
        </el-form-item>
        <el-form-item label="距离生产时间：" prop="intime">
            <el-input v-model="editManageForm1.intime" disabled></el-input>
        </el-form-item>
        <el-form-item label="排程位序：" prop="priority">
            <el-input v-model="editManageForm1.priority"></el-input>
        </el-form-item>
      </el-form>
    <span slot="footer" class="dialog-footer">
        <el-button @click="editManageVisible = false">取 消</el-button>
        <el-button type="primary" @click="paicheng">确 定</el-button>
    </span>
    </el-dialog>

<el-dialog title="提示" :visible.sync="delVisibleqi" width="300px">
      <div class="del-dialog-cnt">此操作将结束排程, 是否继续？</div>
      <span slot="footer" class="dialog-footer">
          <el-button @click="delVisibleqi = false">取 消</el-button>
          <el-button type="primary" @click="jieshupaichengqi" >确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      labelPosition: "right",
      delVisibleqi:false,
      addManageVisible: false,
      editManageVisible: false,
      delVisible: false,
      currentPage: 0,
      total: 0,
      selectedList: [],
      xianshi:false,
      xianshi1:true,
      manageList:[],
      chaManageForm: {
        prolistCode:'',
        sorderCode:'',
        productNorms:'',
        // sorderWarehouse:'',
        pageCode: 1, //当前页
        pageSize: 10 //每页显示的记录数
      },
      addManageForm1:{
      productLeixing:'',
        // productgoodsId:'',
      },
      addManageForm:{
        basicDOs:[],
        designDO:{},
        parametersDO:{},
        producinggoodsDO:{
        productLeixing:0,
        productgoodsId:'',
        },
        productionDO:'',
        saleOrderDO:{},
        productLeixing:'',
        productgoodsId:'',
        prolistNumber:'',
        prolistParameters:'',
        prolistParamenumber:'',
        prolistPeweight:'',
        prolistUsemetre:'',
        prolistParaexplain:'',
        prolistExplain:'',
        prolistParamemetre:'',
      },
      editManageForm:{
        basicDOs:[],
        designDO:{},
        parametersDO:{},
        producinggoodsDO:{
        productLeixing:0,
        productgoodsId:'',
        },
        productionDO:'',
        saleOrderDO:{},
        productLeixing:'',
        productgoodsId:'',
        prolistNumber:'',
        prolistParameters:'',
        prolistParamenumber:'',
        prolistPeweight:'',
        prolistUsemetre:'',
        prolistParaexplain:'',
        prolistExplain:'',
        prolistParamemetre:'',
      },
      editManageForm1:{
        intime:'',
        ontime:'',
        priority:'',
        productNorms:'',
        productionDO:'',
        prolistCode:'',
        sorderCode:'',
        start:'',
        stop:'',
        surplus:'',
      },
      shangpinleixing:[
        {id:0,value:'单层'},
        {id:1,value:'双层'},
        {id:2,value:'瓦楞'},
        {id:3,value:'杯套'},
        {id:4,value:'手柄'},
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
     jieshupaicheng(){
      this.delarr=[];
      this.delVisibleqi = true;
      for (let i = 0; i < this.selectedList.length; i++) {
        this.delarr.push({prolistCode:this.selectedList[i].prolistCode}
        )
      }
      console.log(this.delarr);
    },
    async jieshupaichengqi(){
         const {data:res} = await this.$http.post('sc/Scheduling/onupdate',this.delarr[0]);
         this.delVisibleqi = false;
         this.ManageList();
     
      },
   async ManageList() {
     if (this.chaManageForm.sorderCode!=''||this.chaManageForm.sorderTotalsum!=''||this.chaManageForm.sorderStatus!=''||this.chaManageForm.sorderWarehouse!='') {
       this.chaManageForm.pageCode=1;
       this.chaManageForm.pageSize=10;
     }
      const { data: res } = await this.$http.post("sc/Scheduling/select",this.chaManageForm);
      this.total=res.body.total;
      this.manageList = res.body.rows;
    },
    getCookie: function() {
      var storage=window.localStorage;
      this.shenpiren = storage.getItem("username");
    },
    async guoqushangpin(){
      if(this.addManageVisible==true){
        this.addManageForm1.productLeixing=this.addManageForm.producinggoodsDO.productLeixing;
      }
      if(this.editManageVisible==true){
        this.addManageForm1.productLeixing=this.editManageForm.producinggoodsDO.productLeixing;
      }
        
        const { data: res } = await this.$http.post("jc/Produconggoods/selectProducing",this.addManageForm1);
        console.log(res.body.rows);
        var productLeixing1=0
        productLeixing1=this.addManageForm.producinggoodsDO.productLeixing;
        var productgoodsId1=this.addManageForm.producinggoodsDO.productgoodsId;
        this.addManageForm.basicDOs=[];
        this.addManageForm.designDO={};
        this.addManageForm.parametersDO={};
        this.addManageForm.producinggoodsDO={};
        // this.addManageForm.producinggoodsDO.productgoodsId=productgoodsId1;
        this.addManageForm.producinggoodsDO.productLeixing=productLeixing1
        this.shangpinmingcheng=res.body.rows;
        
    },
    async guoqushangpinmingcheng(){
        let param = new URLSearchParams();
        param.append("productLeixing", parseInt(this.addManageForm.producinggoodsDO.productLeixing));
        param.append("productgoodsId", parseInt(this.addManageForm.producinggoodsDO.productgoodsId));
        const { data: res } = await this.$http.post("sc/Production/selectname",param);
        
        if (res.body.respCode==500) {
            // this.guoqushangpin();
          this.$message({
            type: "info",
            message: res.body.msg
          }); 
        }else{
            this.addManageForm=res.body.SCProductionDO;
          this.$message({
            type: "success",
            message: res.body.msg
          });
        }
    },
    async addManage(){
       const { data: res } = await this.$http.post("sc/Production/addproduction",this.addManageForm);
       this.ManageList();
       this.addManageVisible=false;
    },
    async paicheng(){
      const { data: res } = await this.$http.post("sc/Scheduling/update",this.editManageForm1);
      this.ManageList();
      this.editManageVisible=false;
    },
    async showManage(prolistCode,xian,sorderStatus) {
      // if(xian=='0'){
      //   this.xianshi=true;
      //   if(sorderStatus=='0' || sorderStatus=='1'){
      //     this.xianshi1=false;
      //     this.xianshi2=false;
      //   }else if(sorderStatus=='2' || sorderStatus=='3'){
      //     this.xianshi1=true;
      //   }else{
      //     this.xianshi1=true;
      //     this.xianshi2=true;
      //   }
      // }else if(xian=='1'){
      //   this.xianshi=false;
      //  this.xianshi1=false;
      //   this.xianshi2=false;
      // }
      this.guoqushangpin();
      let param = new URLSearchParams();
      param.append("prolistCode", prolistCode);
      const { data: res } = await this.$http.post("/sc/Scheduling/selectbyid", param);
      this.editManageForm1=res.body.SchedulingDO;
      this.editManageVisible = true;
    },
    async list(){
      const { data: res } = await this.$http.post("jc/Basic/selectparameters");
      const { data: res1 } = await this.$http.post("jc/Basic/selectProductcode");
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
