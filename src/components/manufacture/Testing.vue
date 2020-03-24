<template>
  <div class="min1500">
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>生产管理</el-breadcrumb-item>
      <el-breadcrumb-item>成型质检</el-breadcrumb-item>
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
        <el-form-item label="商品名称：" prop="productName">
          <el-input v-model="chaManageForm.productName"></el-input>
        </el-form-item>
        <el-form-item label="产品名称：" prop="basicId">
                    <el-select v-model="chaManageForm.basicId" placeholder="请选择">
                  <el-option
                    v-for="item in chanpinmingcheng"
                    :key="item.basicId"
                    :label="item.basicRetainone"
                    :value="item.basicId">
                  </el-option>
                </el-select>
                    </el-form-item>
        <el-form-item label="质检状态：" prop="mbatStatus">
          <el-select v-model="chaManageForm.mbatStatus" placeholder="请选择" class="w120">
            <el-option
              v-for="item in zhuangtai"
              :key="item.id"
              :label="item.value"
              :value="item.id">
            </el-option>
          </el-select>
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
        <el-table-column prop="productName" label="商品名称">
        </el-table-column>
        <el-table-column prop="productType" label="产品名称"></el-table-column>
        <el-table-column prop="mbatCode" label="批次号">
        </el-table-column>
        <el-table-column prop="mbatReallynum" label="重量"></el-table-column>
         <el-table-column prop="mbatStatus" label="质检状态" align="center">
          <template slot-scope="scope">
          <el-tag type="danger" v-if="scope.row.mbatStatus=='0'">待质检</el-tag>
          <el-tag type="danger" v-if="scope.row.mbatStatus=='1'">质检通过</el-tag>
          <el-tag type="danger" v-if="scope.row.mbatStatus=='2'">质检未通过</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="170px" style="text-align:center">
          <template slot-scope="scope">
             <el-button @click="showMaterial(scope.row.mbatId,scope.row.prolistCode,true,0)" type="success" size="small" >查看</el-button>
             <el-button @click="showMaterial(scope.row.mbatId,scope.row.prolistCode,false,1)" :disabled="scope.row.mbatStatus==1||scope.row.mbatStatus==2" type="primary" size="small">成型质检</el-button>
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
     :title="xianshi ? '查看成品质检' : '成品质检'"
    :visible.sync="editManageVisible"
    width="50%"
    :before-close="handleClose"
    @closed="dialogClosed">
    <el-form ref="addManageRef1" label-width="100px" :inline="true" :model="addzhijian" :rules="addManageRules">
        <div class="fenge">生产信息</div>
        <el-form-item label="生产单号：" prop="prolistCode">
            <el-input v-model="addzhijian.prolistCode" disabled></el-input>
        </el-form-item>
        <el-form-item label="制单人员：" prop="mbatController">
            <el-input v-model="addzhijian.mbatController" disabled></el-input>
        </el-form-item>
        <div class="fenge1">质检信息</div>
       <el-table
        :data="zhijian"
        striped
        border
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="index" label="序号" width="55" align="center"></el-table-column>
        <el-table-column prop="id" label="检查内容" align="center"></el-table-column>
        <el-table-column prop="pbatParameterscode" label="检查结果" align="center">
          <template slot-scope="scope">
             <el-radio v-model="scope.row.value" label=0  :disabled="xianshi">正确</el-radio>
             <el-radio v-model="scope.row.value" label=1  :disabled="xianshi">错误</el-radio>
          </template>
        </el-table-column>
      </el-table>
      <!-- <div v-if="addzhijian.mbatController!=''"> -->
    <div class="fenge1">质检结果信息</div>
    <el-form-item label="质检人：" prop="mbatController" >
      <el-input v-model="addzhijian.mbatController" disabled></el-input>
    </el-form-item>
     <el-form-item label="质检结果："  prop="mbatStatus">
      <el-radio v-model="addzhijian.mbatStatus" :label='1' @change="guoqudangqianshijian" :disabled="xianshi">通过</el-radio>
      <el-radio v-model="addzhijian.mbatStatus" :label='2' @change="guoqudangqianshijian" :disabled="xianshi">驳回</el-radio>
    </el-form-item>
    <el-form-item label="质检时间：" prop="mbatTime">
      <el-input v-model="addzhijian.mbatTime" :disabled="xianshi"></el-input>
    </el-form-item> 
    <el-form-item label="质检描述："  prop="mbatRemarks">
      <el-input class="w400" v-model="addzhijian.mbatRemarks" :disabled="xianshi"></el-input>
    </el-form-item>
      
       
    </el-form>
    <span slot="footer" class="dialog-footer">
        <el-button @click="editManageVisible = false">取 消</el-button>
        <el-button type="primary" v-if="!xianshi"  @click="addzhijianpanduan">确 定</el-button>
    </span>
    </el-dialog>
    <!-- <el-dialog
    title="物料控制查看"
    :visible.sync="editManageVisible1"
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
         <el-table
    style="width: 100%" border @selection-change="handleSelectionChange" :data="editMaterialForm.materialListDOs">
    <el-table-column label="物理编码" prop="supplierGoolsDO.supgoolsId" ></el-table-column>
    <el-table-column label="物料名称" prop="supplierGoolsDO.supgoolssmallType" ></el-table-column>
    <el-table-column label="商品描述" prop="supplierGoolsDO.supgoolsSplicing"></el-table-column>
    <el-table-column label="库存数量" prop="kcTotalstock"></el-table-column>
    <el-table-column label="单位" prop="supplierGoolsDO.productOutbao">
      <template >
        kg
      </template>
    </el-table-column>
    <el-table-column label="计划使用量" prop="prolistPlannum" >
       <template scope="scope">
        <el-input v-model="scope.row.prolistPlannum"></el-input>
      </template>
    </el-table-column>
  </el-table>
    </el-form>
    <span slot="footer" class="dialog-footer">
        <el-button @click="editManageVisible1 = false">取 消</el-button>
    </span>
    </el-dialog>
    
    <el-dialog
      title="物料选择"
      :visible.sync="dialogVisible1"
      width="58%"
      :before-close="handleClose"
      @closed="dialogClosed('chooseGoodsForm')"
    >
      <el-form :model="chooseGoodsForm" ref="chooseGoodsForm" :inline="true">
        <el-form-item label="商品大类型：" prop="goodsBigType">
          <el-select
            placeholder="请选择商品"
            v-model="chooseGoodsForm.goodsBigType"
            @change="changeGoodsBigType"
          >
            <el-option value="原纸">原纸</el-option>
            <el-option value="纸箱">纸箱</el-option>
            <el-option value="袋子">袋子</el-option>
            <el-option value="油墨">油墨</el-option>
            <el-option value="其它">其它</el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <el-table border stripe :data="shangpi" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="40"></el-table-column>
        <el-table-column type="index" width="50px" label="序号" align="center"></el-table-column>
        <el-table-column prop="supgoolsId" label="商品名称"></el-table-column>
        <el-table-column prop="supgoolssmallType" label="商品小类型"></el-table-column>
        <el-table-column prop="supgoolsSplicing" label="商品描述"></el-table-column>
        <el-table-column label="库存数量" prop="kcTotalstock"></el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible1=false">取 消</el-button>
        <el-button @click="shengchancaigou()" type="primary">保 存</el-button>
      </span>
    </el-dialog>
    <el-dialog title="提示" :visible.sync="delVisible11" width="300px">
      <div class="del-dialog-cnt">删除不可恢复，是否确定删除？</div>
      <span slot="footer" class="dialog-footer">
          <el-button @click="delVisible11 = false">取 消</el-button>
          <el-button type="primary" @click="deleteRow" >确 定</el-button>
      </span>
    </el-dialog> -->
    <!-- <el-dialog
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
         <el-table
          style="width: 100%" border @selection-change="handleSelectionChange" >
          <el-table-column type="selection" width="35" align="center"></el-table-column>
          <el-table-column label="商品编码" prop="productType" ></el-table-column>
          <el-table-column label="商品名称" prop="productName" ></el-table-column>
          <el-table-column label="商品描述" prop="productChanpchic"></el-table-column>
        </el-table>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible1 = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible1 = false">确 定</el-button>
      </span>
    </el-dialog> -->

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
      editManageVisible1: false,

      dialogVisible1:false,
      delVisible: false,
      delVisible11:false,
      currentPage: 0,
      total: 0,
      delarr:[],
      selectedList: [],
      xianshi:'',
      xianshi1:true,
      manageList:[],
      chaManageForm: {
         prolistCode:'',
        productName:'',
        basicId:'',
        mbatStatus:'',
        line:6,
        pageCode: 1, //当前页
        pageSize: 10 //每页显示的记录数
      },
      chanpinmingcheng:[],
       basicDO:{
         productType:'',
      },
       zhuangtai:[
        {id:0,value:'待质检'},
        {id:1,value:'质检通过'},
        {id:2,value:'质检未通过'},
        
      ],
      addManageForm1:{
       productLeixing:'',
        // productgoodsId:'',
      },
      editMaterialForm:{
       prolistCode:'',
       prolistPlanman:'',
       prolistPlantime:'',
       kcTotalstock:'',
       materialListDOs:[],
      },
      editMaterialForm1:[],
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
      chooseGoodsForm: {
        addOrEdit: 0, // 最终选择的商品要去哪 1 添加 2 编辑、查看
        goodsBigType: "原纸", // 商品大类型
        goodsChoosed: [], // 选择商品的集合，
        pageCode: 1, //当前页
        pageSize: 10 //每页显示的记录数
      },
      shangpi:[],
      shangpinmingcheng:[],
      shangpingxinxi:[],
      huobileixing:[],
      yinshuafangshi:[],
      shengchanlist:[],
      shouruleixing:[],
      zijinzhanghu:[],
      kehu:[],
    ag:'0',
    productgoodsIdList:[],
     zhijian:[
     {id:'印刷设计稿',value:0},
     {id:'纸张名称',value:0},
     {id:'纸张克重',value:0},
     {id:'印刷图案',value:0},
     {id:'印刷颜色',value:0},
     {id:'模切',value:0},
     {id:'外箱唛头',value:0},
     {id:'标贴唛头',value:0},
     {id:'外箱尺寸',value:0},
     {id:'单片克重',value:0},
     {id:'单张杯片核对',value:0},
     {id:'盖子测试',value:0},
     {id:'杯子叠高',value:0},
     {id:'袋子封口',value:0},
     {id:'封箱胶带',value:0},
     
     ],
     addzhijian:{
       prolistCode:'',
       pbatController:'',
      mbatDesign:0,
      mbatName:0,
      mbatWeight:0,
      mbatPattern:0,
      mbatColor:0,
      mbatCutting:0,
      mbatBox:0,
      mbatLabel:0,
      mbatSize:0,
      mbatOneke:0,
      mbatOnebei:0,
      mbatGai:0,
      mbatDiegao:0,
      mbatSeal:0,
      mbatTape:0,
      mbatController:'',
      mbatTime:'',
      mbatRemarks:'',
      mbatStatus:0,
      mbatId:0,
     }
    };
   
  },
  created() {
    this.ManageList();
    this.list();
    this.getCookie();
  },
  methods: {
     guoqudangqianshijian(){
      var date = new Date();
      var y = date.getFullYear()
      var mm = date.getMonth() + 1
      var d = date.getDate()
      this.addzhijian.mbatTime=`${y}-${mm}-${d}`
    },
   async ManageList() {
      const { data: res } = await this.$http.post("sc/Machined/select",this.chaManageForm);
      this.total=res.body.total;
      this.manageList = res.body.rows;
    },
     dialogClosed(val) {
      this.$refs[val].resetFields();
    },
    async changeGoodsBigType(val) {
      
      const { data: res } = await this.$http.post(
        "sc/Materal/selectname",
        { params: { lab: this.chooseGoodsForm.goodsBigType,
        pageCode: this.chooseGoodsForm.pageCode ,
        pageSize:this.chooseGoodsForm.pageSize} }
      );
      this.shangpi = res.body.rows;
      this.total = res.body.total;
    },
    xuanzhewuliao(){
       if (this.editManageVisible == true) {
        this.productgoodsIdList = this.editMaterialForm.materialListDOs.map(
          item => {
            return item.suppliergoolsId;
          }
        );
      } 
      this.dialogVisible1=true;
      this.changeGoodsBigType();
    },
    
 shengchancaigou(){
      var chongfu=0;
        if(this.editMaterialForm.materialListDOs.length>=1){
          if(this.editManageVisible==true){
            const needAdd = [];
          this.selectedList.forEach(item => {
            if (this.productgoodsIdList.indexOf(item.suppliergoolsId) === -1) {
              needAdd.push(item);
            } else {
              chongfu ++;
            }
          });
          this.editMaterialForm.materialListDOs = [
            ...this.editMaterialForm.materialListDOs,
            ...needAdd
          ];
          }
        }else{
          for (let index = 0; index < this.selectedList.length; index++) {
            if(this.editManageVisible==true){
              this.editMaterialForm.materialListDOs.push(this.selectedList[index]);
            }
        }
          
    }
      const charu = this.selectedList.length - chongfu;
      this.$message({
        type: "info",
        message: chongfu > 0 ? `此次添加有重复数据，重复数据${chongfu}条，成功插入${charu}条` : `此次成功插入${charu}条`
      });
       this.dialogVisible1=false;
    },
    shanchuwuliao(){

    },
    async addzhijianpanduan(){
    this.addzhijian.mbatDesign=this.zhijian[0].value;
    this.addzhijian.mbatName=this.zhijian[1].value;
    this.addzhijian.mbatWeight=this.zhijian[2].value;
    this.addzhijian.mbatPattern=this.zhijian[3].value;
    this.addzhijian.mbatColor=this.zhijian[4].value;
    this.addzhijian.mbatCutting=this.zhijian[5].value;
    this.addzhijian.mbatBox=this.zhijian[6].value;
    this.addzhijian.mbatLabel=this.zhijian[7].value;
    this.addzhijian.mbatSize=this.zhijian[8].value;
    this.addzhijian.mbatOneke=this.zhijian[9].value;
    this.addzhijian.mbatOnebei=this.zhijian[10].value;
    this.addzhijian.mbatGai=this.zhijian[11].value;
    this.addzhijian.mbatDiegao=this.zhijian[12].value;
    this.addzhijian.mbatSeal=this.zhijian[13].value;
    this.addzhijian.mbatTape=this.zhijian[14].value;
    const { data: res } = await this.$http.post("sc/Machined/updatebatch",this.addzhijian);
    this.editManageVisible=false;
    this.ManageList();
    },
    selected(){
      if(this.selectedList.length == 0){
        this.delVisible11 = false;
        this.$message({
        type: "info",
        message: '未选择商品,请选择商品进行删除！'
      });
      }else{
        this.delVisible11 = true;
      }
      
      this.delarr=[];
      for (let i = 0; i < this.selectedList.length; i++) {
        this.delarr.push(this.selectedList[i].suppliergoolsId)
      }
    },
    async deleteRow(){
        if(this.editManageVisible==true){
             for (let index = 0; index < this.delarr.length; index++) {
           for (let i = 0; i < this.editMaterialForm.materialListDOs.length; i++) {
              if(this.delarr[index]==this.editMaterialForm.materialListDOs[i].suppliergoolsId)
              this.editMaterialForm.materialListDOs.splice(i,1);
           }
         }
        }
         this.delVisible11 = false;
         
      },
   async addMaterial(){
     console.log(this.editMaterialForm);
     
       const { data: res } = await this.$http.post("sc/Materal/insertmaterial",this.editMaterialForm);
       this.editManageVisible = false;
        this.ManageList();
    },

    getCookie: function() {
      var storage=window.localStorage;
      this.shenpiren = storage.getItem("username");
    },
    async showMaterial(mbatId,prolistCode,xian,sorderStatus,) {
        if(sorderStatus==0){
        this.xianshi=true;
      }else{
        this.xianshi=false;
      }
      // this.xianshi=xian;
      this.addzhijian.mbatId=mbatId;
       let param = new URLSearchParams();
          param.append("mbatId", mbatId);
       const { data: res } = await this.$http.post("sc/Machined/selectbyid",param);
      this.zhijian[0].value =res.body.MachinedBatchDO.mbatDesign+'';
      this.zhijian[1].value =res.body.MachinedBatchDO.mbatName+'';
      this.zhijian[2].value =res.body.MachinedBatchDO.mbatWeight+'';
      this.zhijian[3].value =res.body.MachinedBatchDO.mbatPattern+'';
      this.zhijian[4].value =res.body.MachinedBatchDO.mbatColor+'';
      this.zhijian[5].value =res.body.MachinedBatchDO.mbatCutting+'';
      this.zhijian[6].value =res.body.MachinedBatchDO.mbatBox+'';
      this.zhijian[7].value =res.body.MachinedBatchDO.mbatLabel+'';
      this.zhijian[8].value =res.body.MachinedBatchDO.mbatSize+''; 
      this.zhijian[9].value =res.body.MachinedBatchDO.mbatOneke+'';
      this.zhijian[10].value=res.body.MachinedBatchDO.mbatOnebei+'';
      this.zhijian[11].value=res.body.MachinedBatchDO.mbatGai+'';
      this.zhijian[12].value=res.body.MachinedBatchDO.mbatDiegao+'';
      this.zhijian[13].value=res.body.MachinedBatchDO.mbatSeal+'';
      this.zhijian[14].value=res.body.MachinedBatchDO.mbatTape+'';
      if(res.body.MachinedBatchDO.mbatController!=''){
         this.addzhijian.mbatController=this.shenpiren;
      }else{
         this.addzhijian.mbatController=res.body.MachinedBatchDO.mbatController;
      }
      this.addzhijian.mbatStatus=res.body.MachinedBatchDO.mbatStatus;
      this.addzhijian.mbatTime=res.body.MachinedBatchDO.mbatTime;
       this.addzhijian.mbatRemarks=res.body.MachinedBatchDO.mbatRemarks;
      this.addzhijian.prolistCode=prolistCode;
console.log(this.zhijian);

     
      this.editManageVisible = true;
    },
    async list(){
      const { data: res } = await this.$http.post("jc/Basic/selectparameters");
      const { data: res1 } = await this.$http.post("jc/customer/selectcustom1");
      this.kehu = res1;
      this.yinshuafangshi = res;
       const { data: res2 } = await this.$http.post("jc/Basic/selectchicunming",this.basicDO);
      this.chanpinmingcheng=res2;
    },
    dialogClosed(){
        this.$refs.addManageRef1.resetFields();
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
      console.log(val);
      this.chaManageForm.pageSize = val;
      this.ManageList();

    },
    handleCurrentChange(val) {
      console.log(val);
      
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
