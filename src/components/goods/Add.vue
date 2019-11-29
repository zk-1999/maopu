<template>
    <div>
        <!-- 面包屑 -->
       <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>商品管理</el-breadcrumb-item>
            <el-breadcrumb-item>添加商品</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 卡片 -->
        <el-card>
            <!-- 警告 -->
            <el-alert title="添加商品信息" center type="info" show-icon :closable="false">
            </el-alert>
            <!-- step步骤条 -->
            <el-steps :space="200" :active="activeIndex-0" finish-status="success" align-center>
                <el-step title="基本信息"></el-step>
                <el-step title="商品参数"></el-step>
                <el-step title="商品属性"></el-step>
                <el-step title="商品图片"></el-step>
                <el-step title="商品内容"></el-step>
                <el-step title="完成"></el-step>
            </el-steps>
            <!-- tab栏切换 -->
            <el-form :model="addForm" :rules="addRuleForm" ref="addRuleFormRef" class="demo-ruleForm">
                <el-tabs v-model="activeIndex" tab-position="left" :before-leave="beforeLeave"
                @tab-click="tabClicked">
                    <el-tab-pane label="基本信息" name="0">
                        <el-form-item label="商品名称" prop="goods_name">
                            <el-input v-model="addForm.goods_name"></el-input>
                        </el-form-item>
                        <el-form-item label="商品价格" prop="goods_price">
                            <el-input v-model="addForm.goods_price"></el-input>
                        </el-form-item>
                        <el-form-item label="商品重量" prop="goods_weight">
                            <el-input v-model="addForm.goods_weight"></el-input>
                        </el-form-item>
                        <el-form-item label="商品数量" prop="goods_number">
                            <el-input v-model="addForm.goods_number"></el-input>
                        </el-form-item>
                        <el-form-item label="商品分类">
                            <el-cascader
                                v-model="goods_cat"
                                :options="cateList"
                                :props="cateOptions"
                                @change="handleChange"></el-cascader>
                        </el-form-item>
                    </el-tab-pane>
                    <el-tab-pane label="商品参数" name="1">
                        <!-- 多选框 -->
                        <el-form-item v-for="item in manyTabData" :key="item.attr_id" :label="item.attr_name" >
                            <el-checkbox-group v-model="item.attr_vals">
                                <el-checkbox :label="item1" v-for="(item1,index) in item.attr_vals"
                                :key="index" border></el-checkbox>
                            </el-checkbox-group>
                        </el-form-item>
                    </el-tab-pane>
                    <el-tab-pane label="商品属性" name="2">
                        <el-form-item v-for="item in onlyTabData" :key="item.attr_id" :label="item.attr_name" >
                            <el-input v-model="item.attr_vals"></el-input>
                        </el-form-item>
                    </el-tab-pane>
                    <el-tab-pane label="商品图片" name="3">
                        <!-- 图片上传 -->
                        <el-upload
                        class="upload-demo"
                        :action="uploadURL"
                        :on-preview="handlePreview"
                        :on-remove="handleRemove"
                        list-type="picture" :headers="headerToken"
                         :on-success="handleSuccess">
                        <el-button size="small" type="primary">点击上传</el-button>
                        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                        </el-upload>
                    </el-tab-pane>
                    <el-tab-pane label="商品内容" name="4">
                        <quill-edit v-model="addForm.goods_introduce"></quill-edit>
                        <el-button type="primary" @click="add">点击提交</el-button>
                    </el-tab-pane>
                </el-tabs>
            </el-form>
        </el-card>
        <el-dialog
        title="图片预览"
        :visible.sync="previewDialogVisible"
        width="80%">
        <img :src="previewSrc" alt="">
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
      editOrdermanagementVisible: false,
      delVisible: false,
      currentPage: 0,
      total: 0,
      selectedList: [],
      xianshi:'',
      xianshi1:'',
      xianshi2:'',
      ordermanagementList:[],
      chaOrdermanagementForm: {
        sorderCode:'',
        customerId:'',
        sorderStatus:'',
        sorderTotalsum:'',
        sorderWarehouse:'',
        line:0,
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
          label: '生产中'
        }, {
          value: '6',
          label: '待发货'
        }, {
          value: '7',
          label: '部分发货'
        }, {
          value: '8',
          label: '全部发货'
        }, {
          value: '9',
          label: '已完成'
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
        customerId: '',
        sorderAddress: '',
        sorderWarehouse:'',
        sorderTotalsum:'',
        sorderDeliverytime:'',
        sorderCurrecytype:'', 
        productName:'',
        supgoolsId:'',
        sorderStatus:'',
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
      },
      addOrdermanagementRules: {
        sorderAddress: [
          { min: 1, max: 100, message: "长度在 3 到 10 个字符", trigger: "blur" }
        ]
      },
      kehu:[],
      shengchanlist:[],
      // chaigoulist:[],
    };
  },
  created() {
    this.OrdermanagementList();
    this.list();
  },
  methods: {
   async OrdermanagementList() {
     if (this.chaOrdermanagementForm.sorderCode!=''|| this.chaOrdermanagementForm.sorderTotalsum!=''|| this.chaOrdermanagementForm.sorderStatus!=''|| this.chaOrdermanagementForm.sorderWarehouse!='') {
       this.chaOrdermanagementForm.pageCode=1;
       this.chaOrdermanagementForm.pageSize=10;
     }
      const { data: res } = await this.$http.post("xs/saleorder/selectOrderComm",this.chaOrdermanagementForm);
      this.total=res.body.total;
      this.ordermanagementList = res.body.rows;
    },
    async list(){
      const { data: res } = await this.$http.post("jc/customer/selectcustom1");
      console.log(res);
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
    addOrdermanagement() {
      console.log(this.addOrdermanagementForm);
      
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
   
    async showEditOrdermanagement(sorderCode,xian,sorderStatus) {
      if(xian=='0'){
        this.xianshi=true;
        if(sorderStatus=='0' || sorderStatus=='1'){
          this.xianshi1=false;
          this.xianshi2=false;
        }else if(sorderStatus=='2' || sorderStatus=='3'){
          this.xianshi1=true;
        }else{
          this.xianshi1=true;
          this.xianshi2=true;
        }
      }else if(xian=='1'){
        this.xianshi=false;
       this.xianshi1=false;
        this.xianshi2=false;
      }
      
      let param = new URLSearchParams();
      param.append("sorderCode", sorderCode);
      const { data: res } = await this.$http.post("xs/saleorder/selectOrderCommbyid", param);
      this.editOrdermanagementForm = res;
      console.log(res);

      this.editOrdermanagementVisible = true;
    },
    async editOrdermanagement() {
      if(this.editOrdermanagementForm.sorderStatus == '2' || this.editOrdermanagementForm.sorderStatus == '4'){
           this.editOrdermanagementForm.sorderStatus='0';
      }
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
      console.log(this.delarr);
    },
     async deleteRow(){
       console.log('---------------------');
         console.log(this.delarr);
         console.log('---------------------');
         console.log(this.addOrdermanagementForm.commodityListDOs);
         for (let index = 0; index < this.delarr.length; index++) {
           for (let i = 0; i < this.addOrdermanagementForm.commodityListDOs.length; i++) {
              if(this.delarr[index]==this.addOrdermanagementForm.commodityListDOs[i].productgoodsId)
              this.addOrdermanagementForm.commodityListDOs.splice(i,1);
           }
         }
         this.delVisible = false;
         
      },
 selectedqi(status){
      this.delarr=[];
      this.delVisibleqi = true;
      for (let i = 0; i < this.selectedList.length; i++) {
        this.delarr.push({sorderCode:this.selectedList[i].sorderCode,sorderStatus:status})
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
      dialogClosed(){
        this.$refs.addOrdermanagementRef.resetFields();
        this.addOrdermanagementForm.commodityListDOs=[];
      },
      dialogClosed1(){
         this.$refs.shengchantRef.resetFields();
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
 .el-table{
   margin-bottom: 15px;
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
