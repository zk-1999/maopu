<template>
  <div class="min1500">
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>生产管理</el-breadcrumb-item>
      <el-breadcrumb-item>转为生产单</el-breadcrumb-item>
    </el-breadcrumb>
<el-card>
      <el-form
        :inline="true"
        class="demo-form-inline"
        :model="chaOrdermanagementForm"
        ref="chaOrdermanagementRef"
      >
        <el-form-item label="销售订单号：" prop="sorderCode">
          <el-input v-model="chaOrdermanagementForm.sorderCode"></el-input>
        </el-form-item>
        <el-form-item label="客户名称：" prop="customerId">
          <el-select v-model="chaOrdermanagementForm.customerId" placeholder="请选择" class="w100">
            <el-option
              v-for="item in kehu"
              :key="item.customerId"
              :label="item.cusName"
              :value="item.customerId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="合同号：" prop="sorderWarehouse">
          <el-input v-model="chaOrdermanagementForm.sorderWarehouse"></el-input>
        </el-form-item>
        <el-form-item label="交货方式：" prop="sorderTotalsum">
          <el-input v-model="chaOrdermanagementForm.sorderTotalsum"></el-input>
        </el-form-item>
        <el-form-item >
          <el-button @click="OrdermanagementList">查 询</el-button>
          <el-button type="primary" @click="chaordermanagementForm">重 置</el-button>
        </el-form-item>
      </el-form>
      <el-table
        :data="ordermanagementList"
        striped
        border
        :default-sort = "{prop: 'sorderCreatetime', order: 'descending'}"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="index" label="序号" width="55" align="center"></el-table-column>
        <el-table-column prop="sorderCode" label="订单号" width="140px"></el-table-column>
        <el-table-column prop="customerDOs.cusName" label="客户名称"></el-table-column>
        <el-table-column prop="sorderWarehouse" label="合同号"></el-table-column>
        <el-table-column prop="sorderAddress" label="交货地点"></el-table-column>
        <el-table-column prop="sorderTotalsum" label="交货方式"></el-table-column>
        <el-table-column prop="sorderAllnumber" label="销售数量"></el-table-column>
        <el-table-column prop="sorderDeliverytime" label="交货日期"></el-table-column>
        <el-table-column prop="sorderCreatetime" label="下单日期" :formatter="formatter"></el-table-column>
        <el-table-column label="操作" width="150px" style="text-align:center">
          <template slot-scope="scope">
             <el-button @click="showEditOrdermanagement(scope.row.sorderCode,true,1)" type="success" size="small" >转为生产单</el-button>
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
      :title="xianshi1? '转为生产单':'查看审批销售订单'"
      :visible.sync="editOrdermanagementVisible"
      width="45%"
      :before-close="handleClose"
    >
        <el-form ref="addOrdermanagementRef" label-width="115px" :inline="true" :model="editOrdermanagementForm" :rules="addOrdermanagementRules">
          <div class="fenge">商品信息</div>
      <el-table
    style="width: 100%" border class="tb"  @selection-change="handleSelectionChange"
    :data="editOrdermanagementForm.commodityListDOs" >
    <!-- default-expand-all -->
    <el-table-column type="selection" width="35" align="center" v-if="!xianshi"></el-table-column>
    <el-table-column label="商品名称" prop="producinggoodsDOs.productName" ></el-table-column>
    <el-table-column label="产品类别" prop="producinggoodsDOs.productType" ></el-table-column>
    <el-table-column label="销售数量">
      <template scope="scope">
        {{scope.row.commodityNumber}}
      </template>
    </el-table-column>
    <el-table-column label="库存数量" prop="producinggoodsDOs.ckcTotalstock" ></el-table-column>
    <el-table-column label="生产数量" prop="prolistNumber">
      <template scope="scope">
        <el-input v-model="scope.row.prolistNumber" :disabled="scope.row.commodityStatus==1"></el-input>
      </template>
    </el-table-column>
    <el-table-column label="操作" width="135px">
      <template scope="scope">
        <el-button type="danger" :disabled="scope.row.commodityStatus==1" @click="zhuanweishengchandan(scope.row)">转为生产单</el-button>
      </template>
    </el-table-column>
  </el-table>
  </el-form>
    </el-dialog>
    <el-dialog title="提示" :visible.sync="delVisibleqi" width="300px">
      <div class="del-dialog-cnt">此操作将批量启用, 是否继续？</div>
      <span slot="footer" class="dialog-footer">
          <el-button @click="delVisibleqi = false">取 消</el-button>
          <el-button type="primary" @click="deleteRowqi" >确 定</el-button>
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
      delVisibleqi:false,
      addOrdermanagementVisible: false,
      addOrdermanagementVisible1: false,
      addOrdermanagementVisible2: false,
      addOrdermanagementVisible5: false,
      editOrdermanagementVisible: false,
      delVisible: false,
      currentPage: 0,
      total: 0,
      selectedList: [],
      xianshi:false,
      xianshi1:true,
      ordermanagementList:[],
      chaOrdermanagementForm: {
        line:3,
        sorderCode:'',
        customerId:'',
        sorderStatus:'',
        sorderTotalsum:'',
        sorderWarehouse:'',
        pageCode: 1, //当前页
        pageSize: 10 //每页显示的记录数
      },
      shengchanFrom:{
        productLeixing:'',
      },
      caigouFrom:{
        lab:'原纸',
      },
      shengchan:[{
        id:0,
        value:'单层'
      },{
        id:1,
        value:'双层'
      },{
        id:2,
        value:'瓦楞'
      },{
        id:3,
        value:'杯套'
      },{
        id:4,
        value:'手柄'
      }],
      caigou:[{
        id:0,
        value:'原纸'
      },{
        id:1,
        value:'纸箱'
      },{
        id:2,
        value:'袋子'
      },{
        id:3,
        value:'油墨'
      },{
        id:4,
        value:'其他'
      }],
      options: [{
          value: '3',
          label: '待审核'
        }, {
          value: '4',
          label: '已驳回'
        }, {
          value: '5',
          label: '已通过'
        }],
        value:'',
      addOrdermanagementForm: {
        customerId: '',
        sorderAddress: '',
        sorderWarehouse:'',
        sorderTotalsum:'',
        sorderDeliverytime:'',
        sorderCurrecytype:'', 
        productName:'',
        supgoolsId:'',
        sorderExpressfee:'',
        sorderFreigh:'',
        sorderEditionfee:'',
        sorderSinglefee:'',
        sorderAllnumber:'',
        sorderTotal:'',
        sorderPayamount:'',
        sorderRemark0:'',
        commodityListDOs:[],
      },
      editOrdermanagementForm: {
        prolistNumber:'',
        sorderCode:'',
        customerId: '',
        sorderAddress: '',
        sorderWarehouse:'',
        sorderTotalsum:'',
        sorderDeliverytime:'',
        sorderStatus:'3',
        sorderCurrecytype:'', 
        productName:'',
        supgoolsId:'',
        sorderExpressfee:'',
        sorderFreigh:'',
        sorderEditionfee:'',
        sorderSinglefee:'',
        sorderAllnumber:'',
        sorderTotal:'',
        sorderPayamount:'',
        sorderRemark0:'',
        commodityListDOs:[],
        sorderChushen:'',
        sorderChushentime:'',
        sorderChushendesc:'',
        sorderFushen:'',
        sorderFushentime:'',
        sorderFushendesc:'',
        advanceorderno:'',
      },
      yufukuan:{
        payexamine:'',
        cusName:'',
        sorderCode:'',
        sorderAllnumber:'',
        porderTotalmoney:'',
        sorderPayamount:'',
        assetaccount:'',
        raetypes:'',
        paymentstatus:'',
        remarks:'',
      },
      radio:'3',
      shenpiren:'',
      addOrdermanagementRules: {
        sorderAddress: [
          { min: 1, max: 100, message: "长度在 3 到 10 个字符", trigger: "blur" }
        ]
      },
      huobileixing:[],
      kehu:[],
      shengchanlist:[],
      shouruleixing:[],
      zijinzhanghu:[],
      fukuanzhuangtai: [{
          value: '0',
          label: '待收款'
        }, {
          value: '1',
          label: '未收款'
        }, {
          value: '3',
          label: '已收款'
        }],
      // chaigoulist:[],
    };
  },
  created() {
    this.OrdermanagementList();
    this.list();
    this.getCookie();
  },
  methods: {
    formatter(row, column) {
        return row.address;
    },
     zhuanweishengchandan(shengchan,prolistNumber) {
        this.$confirm('此操作将转为生产单, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async() => {
          const { data: res } = await this.$http.post("sc/Production/insertproduction",shengchan,prolistNumber);
          this.showEditOrdermanagement(shengchan.sorderCode,true,1)
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
          
        }).catch(() => {
                  
        });
        
      },
    yufukuanshuju(){
      this.yufukuan.payexamine=this.shenpiren;
      this.yufukuan.cusName=this.editOrdermanagementForm.customerId;
      this.yufukuan.sorderCode=this.editOrdermanagementForm.sorderCode;
      this.yufukuan.sorderAllnumber=this.editOrdermanagementForm.sorderAllnumber;
      this.yufukuan.porderTotalmoney=this.editOrdermanagementForm.sorderTotal;
      this.yufukuan.sorderPayamount=this.editOrdermanagementForm.sorderPayamount;
      this.addOrdermanagementVisible5=true;
    },
     //读取cookie
    getCookie: function() {
      var storage=window.localStorage;
      this.shenpiren = storage.getItem("username");
      // if (document.cookie.length > 0) {
      //   var arr = document.cookie.split("; "); //这里显示的格式需要切割一下自己可输出看下
      //   for (var i = 0; i < arr.length; i++) {
      //     var arr2 = arr[i].split("="); //再次切割
      //     //判断查找相对应的值
      //     if (arr2[0] == "userName") {
      //       this.shenpiren = arr2[1]; //保存到保存数据的地方
      //     }
      //   }
      //   this.checked = true;
      // }
    },
     // 查询订单列表
   async OrdermanagementList() {
     if (this.chaOrdermanagementForm.sorderCode!=''||this.chaOrdermanagementForm.sorderTotalsum!=''||this.chaOrdermanagementForm.sorderStatus!=''||this.chaOrdermanagementForm.sorderWarehouse!='') {
       this.chaOrdermanagementForm.pageCode=1;
       this.chaOrdermanagementForm.pageSize=10;
     }
      const { data: res } = await this.$http.post("xs/saleorder/selectOrderComm",this.chaOrdermanagementForm);
      this.total=res.body.total;
      this.ordermanagementList = res.body.rows;
    },
    async list(){
      const { data: res } = await this.$http.post("jc/customer/selectcustom1");
      const { data: res1 } = await this.$http.post("jc/Basic/selectpaymode");
      const { data: res2 } = await this.$http.post("jc/Basic/selectinpaymode");
      const { data: res3 } = await this.$http.post("jc/Basic/selectzijin");
      this.zijinzhanghu=res3;
      this.shouruleixing=res2;
      this.huobileixing=res1;
      this.kehu = res;
    },
   async shengchanshangping(){
      const { data: res } = await this.$http.post("jc/Produconggoods/selectProducing",this.shengchanFrom);
      console.log(res);
      this.shengchanlist = res.body.rows;
      this.addOrdermanagementVisible1=true;
    },
    // async chaigoushangpin(){
    //   const { data: res } = await this.$http.post("jc/suppliergoods/selectSuppliergoolslist",{params:this.caigouFrom});
    //   console.log(res);
    //   this.chaigoulist = res.body.rows;
    //   this.addOrdermanagementVisible2=true;
    // },
    addyushoukuan() {
      this.$refs.form.validate(async valid => {
        if (!valid) return;
        const { data: res } = await this.$http.post(
          "advancereceivable/addAdvancereceivable",
          this.yufukuan
        );
        this.editOrdermanagementForm.advanceorderno=res.body.result.advanceorderno;
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
        this.addOrdermanagementVisible5 = false;
      });
    },
    addOrdermanagement() {
      this.$refs.addOrdermanagementRef.validate(async valid => {
        if (!valid) return;
        const { data: res } = await this.$http.post(
          "xs/saleorder/insertSalesOrder",
          this.addOrdermanagementForm
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
        this.OrdermanagementList();
        this.addOrdermanagementVisible = false;
      });
    },
    jisuan() {
      this.addOrdermanagementForm.sorderAllnumber=0;
      this.addOrdermanagementForm.sorderTotal=0;
      if(this.addOrdermanagementVisible==true){
        for (
        let index = 0; index < this.addOrdermanagementForm.commodityListDOs.length; index++) {
        if (isNaN(this.addOrdermanagementForm.commodityListDOs[index].commodityNumber) || isNaN(this.addOrdermanagementForm.commodityListDOs[index].commodityPrice)) {
          continue;
        }
        this.addOrdermanagementForm.sorderAllnumber += parseInt(
          this.addOrdermanagementForm.commodityListDOs[index].commodityNumber
        );

        this.addOrdermanagementForm.sorderTotal +=
          parseInt(this.addOrdermanagementForm.commodityListDOs[index].commodityPrice) *
          parseInt(this.addOrdermanagementForm.commodityListDOs[index].commodityNumber);
          console.log(this.addOrdermanagementForm.sorderTotal);
          var tatal=this.addOrdermanagementForm.sorderTotal
      }
       this.addOrdermanagementForm.sorderTotal=parseInt(this.addOrdermanagementForm.sorderTotal)+parseInt(this.addOrdermanagementForm.sorderExpressfee)+parseInt(this.addOrdermanagementForm.sorderFreigh)+parseInt(this.addOrdermanagementForm.sorderEditionfee)+parseInt(this.addOrdermanagementForm.sorderSinglefee);

      }else if(this.editOrdermanagementVisible==true){
        this.editOrdermanagementForm.sorderTotal=0;
        this.editOrdermanagementForm.sorderAllnumber=0;
        for (
        let index = 0; index < this.editOrdermanagementForm.commodityListDOs.length; index++) {
        if (isNaN(this.editOrdermanagementForm.commodityListDOs[index].commodityNumber) || isNaN(this.editOrdermanagementForm.commodityListDOs[index].commodityPrice)) {
          continue;
        }
        this.editOrdermanagementForm.sorderAllnumber += parseInt(
          this.editOrdermanagementForm.commodityListDOs[index].commodityNumber
        );

        this.editOrdermanagementForm.sorderTotal +=
          parseInt(this.editOrdermanagementForm.commodityListDOs[index].commodityPrice) *
          parseInt(this.editOrdermanagementForm.commodityListDOs[index].commodityNumber);
          console.log(this.editOrdermanagementForm.sorderTotal);
          var tatal=this.editOrdermanagementForm.sorderTotal
      }
       this.editOrdermanagementForm.sorderTotal=parseInt(this.editOrdermanagementForm.sorderTotal)+parseInt(this.editOrdermanagementForm.sorderExpressfee)+parseInt(this.editOrdermanagementForm.sorderFreigh)+parseInt(this.editOrdermanagementForm.sorderEditionfee)+parseInt(this.editOrdermanagementForm.sorderSinglefee);

      }
      
    },
    chaordermanagementForm(formName) {
      this.$refs.chaOrdermanagementRef.resetFields();
      this.OrdermanagementList();
    },
    guoqudangqianshijian(){
      var date = new Date();
      var y = date.getFullYear()
      var mm = date.getMonth() + 1
      var d = date.getDate()
      this.editOrdermanagementForm.sorderFushentime=`${y}-${mm}-${d}`
    },
    async showEditOrdermanagement(sorderCode,xian,zhi) {
      this.xianshi=xian;
      if(zhi==0){
         this.xianshi1=!xian;
      }else if(zhi==1){
        this.xianshi1=xian;
      }
      let param = new URLSearchParams();
      param.append("sorderCode", sorderCode);
      const { data: res } = await this.$http.post("xs/saleorder/selectOrderCommbyid", param);
      res.sorderCurrecytype=Number(res.sorderCurrecytype);
      if(res.sorderFushen==null || res.sorderFushen==''){
        res.sorderFushen=this.shenpiren;
      }
      this.editOrdermanagementForm = res;
      this.editOrdermanagementVisible = true;
    },
    async editOrdermanagement() {
      const { data: res } = await this.$http.post(
        "xs/saleorder/updateSaleOrder",
        this.editOrdermanagementForm
      );
     this.OrdermanagementList();
      this.editOrdermanagementVisible = false;
    },
    selected(){
      this.delVisible = true;
      this.delarr=[];
      for (let i = 0; i < this.selectedList.length; i++) {
        this.delarr.push(this.selectedList[i].productgoodsId)
      }
    },
     async deleteRow(){
         for (let index = 0; index < this.delarr.length; index++) {
           for (let i = 0; i < this.shengchanpin.length; i++) {
              if(this.delarr[index]==this.shengchanpin[i].productgoodsId)
              this.shengchanpin.splice(i);
           }    
         }
         this.delVisible = false; 
      },
 selectedqi(){
      this.delarr=[];
      this.delVisibleqi = true;
      for (let i = 0; i < this.selectedList.length; i++) {
        this.delarr.push({sorderCode:this.selectedList[i].sorderCode,sorderStatus:1})
      }
      console.log(this.delarr);
    },
      async deleteRowqi(){
         const {data:res} = await this.$http.post('xs/saleorder/tishen',this.delarr);
         this.delVisibleqi = false;
         this.OrdermanagementList();
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

    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },

    deletebumen(sorderCode) {
      this.$confirm("此操作将永久删除该职务, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          let param = new URLSearchParams();
          param.append("sorderCode", sorderCode);
          const { data: res } = await this.$http.post("xs/saleorder/deletesaleOrder", param);
          this.OrdermanagementList();
          this.$message({
            type: "success",
            message: res.body.msg
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: res.body.msg
          });
        });
    },
    shengchancaigou(){
       for (let index = 0; index < this.selectedList.length; index++) {
         if(this.addOrdermanagementVisible==true){
           this.addOrdermanagementForm.commodityListDOs.push(this.selectedList[index]);
         }else if(this.editOrdermanagementVisible==true){
           this.editOrdermanagementForm.commodityListDOs.push(this.selectedList[index]);
         }
       }
       this.addOrdermanagementVisible1=false;
       this.addOrdermanagementVisible2=false;
        this.editOrdermanagementVisible1=false;
       this.editOrdermanagementVisible2=false;
    },
    
    handleSelectionChange(val) {
      console.log(val);
      this.selectedList = val;
    },

   
    resetForm(formName) {
      this.$refs[formName].resetFields();
      // this.$refs[formName].resetFields();
    },

    //分页相关函数
    handleSizeChange(val) {
      this.chaOrdermanagementForm.pageSize = val;
      this.OrdermanagementList();

    },
    handleCurrentChange(val) {
      this.chaOrdermanagementForm.pageCode = val;
      this.currentPage=val;
      this.OrdermanagementList();
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
   width: 400px;
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
