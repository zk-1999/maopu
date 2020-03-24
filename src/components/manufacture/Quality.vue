<template>
  <div class="min1500">
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>生产管理</el-breadcrumb-item>
      <el-breadcrumb-item>印刷质检</el-breadcrumb-item>
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
        <el-form-item label="质检状态：" prop="pbatStatus">
          <el-select v-model="chaManageForm.pbatStatus" placeholder="请选择" class="w120">
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
        <el-table-column prop="pbatParameterscode" label="批次号">
        </el-table-column>
        <el-table-column prop="pbatWeight" label="重量"></el-table-column>
         <el-table-column prop="pbatStatus" label="质检状态" align="center">
          <template slot-scope="scope">
          <el-tag type="danger" v-if="scope.row.pbatStatus=='0'">待质检</el-tag>
          <el-tag type="danger" v-if="scope.row.pbatStatus=='1'">质检通过</el-tag>
          <el-tag type="danger" v-if="scope.row.pbatStatus=='2'">质检不通过</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="170px" style="text-align:center">
          <template slot-scope="scope">
             <el-button @click="showMaterial(scope.row.pbatId,scope.row.prolistCode,true,0)" type="success" size="small" >查看</el-button>
             <el-button @click="showMaterial(scope.row.pbatId,scope.row.prolistCode,true,1)" :disabled="scope.row.pbatStatus==1||scope.row.pbatStatus==2" type="primary" size="small">印刷质检</el-button>
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
    :title="xianshi ? '查看印刷质检' : '印刷质检'"
    :visible.sync="editManageVisible"
    width="50%"
    :before-close="handleClose">
    <el-form ref="addManageRef" label-width="100px" :inline="true" :model="editMaterialForm" :rules="addManageRules">
        <div class="fenge">生产信息</div>
        <el-form-item label="生产单号：" prop="prolistCode">
            <el-input v-model="addzhijian.prolistCode" disabled></el-input>
        </el-form-item>
        <el-form-item label="制单人员：" prop="pbatController">
            <el-input v-model="addzhijian.pbatController" disabled></el-input>
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
             <el-radio v-model="scope.row.value" label=0 :disabled='xianshi'>正确</el-radio>
             <el-radio v-model="scope.row.value" label=1 :disabled='xianshi'>错误</el-radio>
          </template>
        </el-table-column>
      </el-table>
      <div class="fenge1" >质检结果信息</div>
    <el-form-item label="质检人：" prop="pbatController" >
      <el-input v-model="addzhijian.pbatController" :disabled='xianshi'></el-input>
    </el-form-item>
     <el-form-item label="质检结果："  prop="pbatStatus">
      <el-radio v-model="addzhijian.pbatStatus" :label='1' @change="guoqudangqianshijian" :disabled='xianshi'>通过</el-radio>
      <el-radio v-model="addzhijian.pbatStatus" :label='2' @change="guoqudangqianshijian"  :disabled='xianshi'>驳回</el-radio>
    </el-form-item>
    <el-form-item label="质检时间：" prop="pbatTime">
      <el-input v-model="addzhijian.pbatTime" :disabled='xianshi'></el-input>
    </el-form-item> 
    <el-form-item label="质检描述："  prop="pbatRemarks">
      <el-input class="w400" v-model="addzhijian.pbatRemarks" :disabled='xianshi'></el-input>
    </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
        <el-button @click="editManageVisible = false">取 消</el-button>
        <el-button type="primary" @click="addzhijianpanduan" v-if="!xianshi">确 定</el-button>
    </span>
    </el-dialog>
    <el-dialog
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
    <!-- default-expand-all -->
    <!-- <el-table-column type="selection" width="35" align="center"></el-table-column> -->
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
        <!-- <el-button type="primary" @click="addMaterial">确 定</el-button> -->
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
    <!-- <el-table-column label="单位" prop="productOutbao"></el-table-column> -->
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
    </el-dialog>
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
      xianshi:false,
      xianshi1:true,
      manageList:[],
      chaManageForm: {
        prolistCode:'',
        productName:'',
        basicId:'',
        pbatStatus:'',
        line:3,
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
     zhijian:[{id:'纸张材料克重',value:0},
     {id:'图案设计',value:0},
     {id:'印刷颜色',value:0},
     {id:'是否掉墨',value:0},
     {id:'是否发虚',value:0},
     {id:'是否糊版',value:0},
     {id:'是否跷版',value:0},
     {id:'是否重影',value:0},
     {id:'是否毛边',value:0},
     {id:'是否露白点',value:0},
     {id:'是否有墨杠/水纹',value:0},
     {id:'表面是否有刀线',value:0},
     {id:'表面是否有脏点',value:0},
     {id:'袋子封口',value:0},
     {id:'封箱胶带',value:0},
     ],
     addzhijian:{
       prolistCode:'',
       pbatController:'',
      pbatGramweight:0,
      pbatDesign:0,
      pbatColor:0,
      pbatInkdropping:0,
      pbatFalsenot:0,
      pbatPaste:0,
      pbatWarpage:0,
      pbatDouble:0,
      pbatBurr:0,
      pbatWhitespot:0,
      pbatInkbar:0,
      pbatKnifeLine:0,
      pbatDirty:0,
      pbatBag:0,
      pbatTape:0,
      pbatController:'',
      pbatTime:'',
      pbatRemarks:'',
      pbatId:0,
      pbatStatus:0,
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
      this.addzhijian.pbatTime=`${y}-${mm}-${d}`
    },
   async ManageList() {
      const { data: res } = await this.$http.post("sc/ProductionExecution/selectBatch",this.chaManageForm);
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
    this.addzhijian.pbatGramweight=this.zhijian[0].value;
    this.addzhijian.pbatDesign=this.zhijian[1].value;
    this.addzhijian.pbatColor=this.zhijian[2].value;
    this.addzhijian.pbatInkdropping=this.zhijian[3].value;
    this.addzhijian.pbatFalsenot=this.zhijian[4].value;
    this.addzhijian.pbatPaste=this.zhijian[5].value;
    this.addzhijian.pbatWarpage=this.zhijian[6].value;
    this.addzhijian.pbatDouble=this.zhijian[7].value;
    this.addzhijian.pbatBurr=this.zhijian[8].value;this.addzhijian.pbatWhitespot=this.zhijian[9].value;
    this.addzhijian.pbatInkbar=this.zhijian[10].value;
    this.addzhijian.pbatKnifeLine=this.zhijian[11].value;this.addzhijian.pbatDirty=this.zhijian[12].value;
    this.addzhijian.pbatBag=this.zhijian[13].value;
    this.addzhijian.pbatTape=this.zhijian[14].value;
    const { data: res } = await this.$http.post("sc/ProductionExecution/updateBatch",this.addzhijian);
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
    async showMaterial(pbatId,prolistCode,xian,sorderStatus,) {
       if(sorderStatus==0){
        this.xianshi=true;
      }else{
        this.xianshi=false;
      }
      this.addzhijian.pbatId=pbatId;
       let param = new URLSearchParams();
          param.append("pbatId", pbatId);
       const { data: res } = await this.$http.post("sc/ProductionExecution/selectBatchid",param);
      this.zhijian[0].value =res.body.ProductionBatchDO.pbatGramweight+'' ;
      this.zhijian[1].value =res.body.ProductionBatchDO.pbatDesign+''     ;
      this.zhijian[2].value =res.body.ProductionBatchDO.pbatColor+''      ;
      this.zhijian[3].value =res.body.ProductionBatchDO.pbatInkdropping+'';
      this.zhijian[4].value =res.body.ProductionBatchDO.pbatFalsenot+''   ;
      this.zhijian[5].value =res.body.ProductionBatchDO.pbatPaste+''      ;
      this.zhijian[6].value =res.body.ProductionBatchDO.pbatWarpage+''    ;
      this.zhijian[7].value =res.body.ProductionBatchDO.pbatDouble+''     ;
      this.zhijian[8].value =res.body.ProductionBatchDO.pbatBurr+''       ; 
      this.zhijian[9].value =res.body.ProductionBatchDO.pbatWhitespot+''  ;
      this.zhijian[10].value=res.body.ProductionBatchDO.pbatInkbar+''     ;
      this.zhijian[11].value=res.body.ProductionBatchDO.pbatKnifeLine+''  ;  
      this.zhijian[12].value=res.body.ProductionBatchDO.pbatDirty+''      ;
      this.zhijian[13].value=res.body.ProductionBatchDO.pbatBag+''        ;
      this.zhijian[14].value=res.body.ProductionBatchDO.pbatTape+''       ;
      if(res.body.ProductionBatchDO.pbatController!=''){
      this.addzhijian.pbatController=this.shenpiren;
      }else{
        this.addzhijian.pbatController=res.body.ProductionBatchDO.pbatController;
      }
      this.addzhijian.pbatStatus=res.body.ProductionBatchDO.pbatStatus;
      console.log(this.addzhijian.pbatStatus);
      console.log(this.addzhijian);

      
      this.addzhijian.pbatTime=res.body.ProductionBatchDO.pbatTime;
      this.addzhijian.pbatRemarks=res.body.ProductionBatchDO.pbatRemarks;
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
