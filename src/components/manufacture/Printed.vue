<template>
  <div class="min1500">
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>生产管理</el-breadcrumb-item>
      <el-breadcrumb-item>印刷</el-breadcrumb-item>
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
        <el-form-item label="生产单状态：" prop="prolistState">
          <el-select v-model="chaManageForm.prolistState" placeholder="请选择" class="w120">
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
      <el-button type="success" @click="selectedqi1"
            :disabled="selectedList.length == 0 || selectedList.length > 1">补 料</el-button>
      <el-button type="danger" @click="selectedqi2"
            :disabled="selectedList.length == 0 || selectedList.length > 1">退 料</el-button>
      <el-button
            type="warning"
            @click="selectedqi"
            :disabled="selectedList.length == 0"
          >印刷完成</el-button>
      <el-table
        :data="manageList"
        striped
        border
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
       <el-table-column type="selection" width="35"></el-table-column>
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
        <!-- <el-table-column prop="productWanchengtime" label="生产时间"></el-table-column>
        <el-table-column prop="productWanchengtime" label="完成时间"></el-table-column> -->
        <el-table-column prop="prolistState" label="生产单状态" align="center">
          <template slot-scope="scope">
          <el-tag type="danger" v-if="scope.row.prolistState=='0'">待排程</el-tag>
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
             <el-button @click="yinshuachanshu(scope.row.prolistCode,0)" type="success" size="small" >查看</el-button>
             <el-button @click="yinshuachanshu(scope.row.prolistCode,1)" type="primary" size="small" >印刷</el-button>
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
    
    :title="xianshi ? '查看印刷' : '印刷'"
    :visible.sync="editManageVisible"
    width="75%"
    :before-close="handleClose"
    @closed="dialogClosed">
    <el-form ref="addManageRef" label-width="100px" :inline="true" :model="editMaterialForm" :rules="addManageRules">
        <div class="fenge">生产信息</div>
        <el-form-item label="生产单号：" prop="prolistCode">
            <el-input v-model="editPrintedForm.productionDO.prolistCode" disabled></el-input>
        </el-form-item>
        <el-form-item label="制单人员：" prop="prolistPlanman">
            <el-input v-model="editPrintedForm.productionExecutionDO.pexeMan" disabled></el-input>
        </el-form-item>
        <div class="fenge1">设计稿信息</div>
        <el-form-item label="设计稿编码：" prop="designName">
            <el-input v-model="editPrintedForm.designDO.designName" disabled></el-input>
        </el-form-item>
        <el-form-item label="设计稿颜色：" prop="designCol1">
            <el-input v-model="editPrintedForm.designDO.designCol1" disabled></el-input>
        </el-form-item>
        <div class="fenge1">物料信息</div>
         <el-table
    style="width: 100%" border @selection-change="handleSelectionChange" :data="editPrintedForm.materialListDOs">
    <el-table-column type="index" label="序号" width="55" align="center"></el-table-column>
    <el-table-column label="物料编码" prop="supplierGoolsDO.supgoolsId"  align="center"></el-table-column>
    <el-table-column label="物料名称" prop="supplierGoolsDO.supgoolssmallType"  align="center"></el-table-column>
    <el-table-column label="商品描述" prop="supplierGoolsDO.supgoolsSplicing" align="center"></el-table-column>
    <el-table-column label="计划使用量" prop="prolistPlannum" align="center"></el-table-column>
    <el-table-column label="物料实际使用量" prop="prolistTruenum"  align="center">
       <template scope="scope">
        <el-input v-model="scope.row.prolistTruenum" :disabled='xianshi'></el-input>
      </template>
    </el-table-column>
    <el-table-column label="单位"  >
      <template >
        kg
      </template>
    </el-table-column>
  </el-table>
  <div class="fenge1">印刷参数信息</div>
  <el-table
    style="width: 100%" border @selection-change="handleSelectionChange" :data="editPrintedForm.parametersDO">
    <el-table-column type="index" label="序号" width="55" align="center"></el-table-column>
    <el-table-column label="产品规格与名称" prop="parametersName"  align="center" ></el-table-column>
    <el-table-column label="版锟齿数" prop="parametersSingle" width="80" align="center" ></el-table-column>
    <el-table-column label="周长" prop="parametersSinglenum" width="80" align="center" ></el-table-column>
    <el-table-column label="周长片数" prop="parametersTeethnum" width="80" align="center" ></el-table-column>
    <el-table-column label="纸张门幅" prop="parametersDoorwidth" align="center" ></el-table-column>
    <el-table-column label="门幅片数" prop="parametersDoornum" width="80" align="center" ></el-table-column>
    <el-table-column label="总片数" prop="parametersNumber" width="65" align="center" ></el-table-column>
    <el-table-column label="印刷方式"  prop="prolistParameters" align="center" ></el-table-column>
    <el-table-column label="印刷放量" prop="prolistParamenumber" width="80" align="center" ></el-table-column>
    <el-table-column label="计划用纸" prop="prolistUsemetre" align="center" ></el-table-column>
    <el-table-column label="印刷重量" prop="prolistParamemetre"  align="center" ></el-table-column>
    <el-table-column label="油墨用量"  prop="prolistPeweight" align="center" ></el-table-column>
    <!-- <el-table-column label="油墨实际使用量"  prop="productOnege" align="center" >
      <template scope="scope">
        <el-input v-model="scope.row.prolistPlannum" :disabled='xianshi'></el-input>
      </template>
    </el-table-column> -->
  </el-table>
  <div class="fenge1">印刷批次信息</div>
  <el-table border stripe :data="editPrintedForm.productionExecutionDO.productionBatchDOs" >
        <el-table-column type="index" width="50px" label="序号" align="center"></el-table-column>
        <el-table-column prop="pbatParameterscode" label="印刷批次号" align="center" >
          <template slot-scope="scope">
            <el-input v-model="scope.row.pbatParameterscode" :disabled='xianshi'></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="pbatWeight" label="重量" align="center" >
          <template slot-scope="scope">
            <el-input v-model="scope.row.pbatWeight" :disabled='xianshi'></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="pbatStatus" label="质检状态" align="center" >
          <template slot-scope="scope">
             <el-tag type="danger">{{scope.row.pbatStatus=='' ? '待质检':scope.row.pbatStatus==0 ? '待质检':scope.row.pbatStatus==1?'质检通过':'质检未通过'}}</el-tag>
          </template>
        </el-table-column>
      </el-table>
      <el-button v-if="!xianshi" @click="editPrintedForm.productionExecutionDO.productionBatchDOs.push({pbatStatus:0})">增加行</el-button>
    </el-form>
    <span slot="footer" class="dialog-footer">
        <el-button @click="editManageVisible = false">取 消</el-button>
        <el-button type="primary" @click="addPrinted" v-if="!xianshi" >确 定</el-button>
    </span>
    </el-dialog>
    <el-dialog
    title="补料"
    :visible.sync="editManageVisible1"
    width="60%"
    :before-close="handleClose"
    @closed="dialogClosed">
   
    <el-form ref="addManageRef" label-width="100px" :inline="true" :model="editMaterialForm" :rules="addManageRules">
        <div class="fenge">物料信息</div>
        <el-form-item label="生产单号：" prop="prolistCode">
            <el-input v-model="editMaterialForm.prolistCode" disabled></el-input>
        </el-form-item>
        <el-form-item label="制单人员：" prop="prolistPlanman">
            <el-input v-model="editMaterialForm.prolistPlanman" disabled></el-input>
        </el-form-item>
        <div class="fenge1">商品信息</div>
        <el-button type="primary" @click="xuanzhewuliao">选择补料</el-button>
        <!-- <el-button type="primary" @click="selected">删除补料</el-button> -->
         <el-table
    style="width: 100%" border @selection-change="handleSelectionChange" :data="editMaterialForm.buMaterialListDOs">
    <!-- default-expand-all -->
    <!-- <el-table-column type="selection" width="35" align="center"></el-table-column> -->
    <el-table-column label="物理编码" prop="supgoolsId" ></el-table-column>
    <el-table-column label="物料名称" prop="supgoolssmallType" ></el-table-column>
    <el-table-column label="商品描述" prop="supgoolsSplicing"></el-table-column>
    <el-table-column label="库存数量" prop="kcTotalstock"></el-table-column>
    <el-table-column label="单位" prop="productOutbao">
      <template >
        kg
      </template>
    </el-table-column>
    <el-table-column label="计划使用量" prop="productOnege" >
       <template scope="scope">
        <el-input v-model="scope.row.prolistPlannum"></el-input>
      </template>
    </el-table-column>
  </el-table>
    </el-form>
    <span slot="footer" class="dialog-footer">
        <el-button @click="editManageVisible1 = false">取 消</el-button>
        <el-button type="primary" @click="addMaterial">确 定</el-button>
    </span>
    </el-dialog>
    <el-dialog
      title="补料选择"
      :visible.sync="dialogVisible11"
      width="58%"
      :before-close="handleClose"
      
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
        <el-button @click="dialogVisible11=false">取 消</el-button>
        <el-button @click="shengchancaigou()" type="primary">保 存</el-button>
      </span>
    </el-dialog>
    <el-dialog title="提示" :visible.sync="delVisibleqi" width="300px">
      <div class="del-dialog-cnt">此操作将批量印刷, 是否继续？</div>
      <span slot="footer" class="dialog-footer">
          <el-button @click="delVisibleqi = false">取 消</el-button>
          <el-button type="primary" @click="deleteRowqi" >确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
    title="退料"
    :visible.sync="editManageVisible2"
    width="60%"
    :before-close="handleClose"
    @closed="dialogClosed">
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
    style="width: 100%" border @selection-change="handleSelectionChange" :data="editMaterialForm.tuiMaterialListDOs">
    <!-- default-expand-all -->
    <!-- <el-table-column type="selection" width="35" align="center"></el-table-column> -->
    <el-table-column label="物理编码" prop="supplierGoolsDO.supgoolsId" ></el-table-column>
    <el-table-column label="物料名称" prop="supplierGoolsDO.supgoolssmallType" ></el-table-column>
    <el-table-column label="商品描述" prop="supplierGoolsDO.supgoolsSplicing"></el-table-column>
    <el-table-column label="单位" prop="productOutbao">
      <template >
        kg
      </template>
    </el-table-column>
    <el-table-column label="计划使用量" prop="prolistPlannum" >
       <!-- <template scope="scope">
        <el-input v-model="scope.row.prolistPlannum"></el-input>
      </template> -->
    </el-table-column>
    <el-table-column label="退货数量" prop="prolistLossnum" >
       <template scope="scope">
        <el-input v-model="scope.row.prolistLossnum"></el-input>
      </template>
    </el-table-column>
  </el-table>
    </el-form>
    <span slot="footer" class="dialog-footer">
        <el-button @click="editManageVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="addtuihuoshu">确 定</el-button>
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
      editManageVisible1: false,
      editManageVisible2:false,
      dialogVisible11:false,
      delVisibleqi:false,
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
        prolistState:'',
        line:2,
        
        pageCode: 1, //当前页
        pageSize: 10 //每页显示的记录数
      },
      chanpinmingcheng:[],
       basicDO:{
         productType:'',
      },
      zhuangtai:[
        {id:0,value:'待生产'},
        {id:1,value:'待印刷领料'},
        {id:2,value:'待印刷'},
        {id:3,value:'印刷中'},
        {id:4,value:'待成型领料'},
        {id:5,value:'待成型'},
        {id:6,value:'成型中'},
        {id:7,value:'已完成'},
      ],
      addManageForm1:{
       productLeixing:'',
        // productgoodsId:'',
      },
      editPrintedForm:{
        designDO:{},
        parametersDO:{},
        producinggoodsDO:{},
        productionDO:{},
        productionExecutionDO:{
          pexeMan:'',
          productionBatchDOs:[],
        },
        basicDOs:{},
        materialListDOs:[],
      },
        parametersDO1:[],

      editMaterialForm:{
       prolistCode:'',
       prolistPlanman:'',
       prolistPlantime:'',
       kcTotalstock:'',
       buMaterialListDOs:[],
       tuiMaterialListDOs:[],
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
    //   this.
  
    productgoodsIdList:[],
    traceNoList:[],
    };
  },
  created() {
    this.ManageList();
    this.list();
    this.getCookie();
  },
  methods: {
    
     async selectedqi1(){
      this.editMaterialForm.prolistCode= this.selectedList[0].prolistCode;
      this.editMaterialForm.prolistPlanman=this.shenpiren;
      this.editManageVisible1=true;
    },
    async selectedqi2(){
      this.editMaterialForm.prolistCode= this.selectedList[0].prolistCode;
      this.editMaterialForm.prolistPlanman=this.shenpiren;
      let param = new URLSearchParams();
          param.append("prolistCode", this.selectedList[0].prolistCode);
      const {data:res} = await this.$http.post('sc/BuMateral/selectpliscode',param);
       
      this.editMaterialForm.tuiMaterialListDOs=res.body;
      this.editManageVisible2=true;
    },
    async addtuihuoshu(){
      const {data:res} = await this.$http.post('sc/BuMateral/inserttuimaterial',this.editMaterialForm);
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
        this.editManageVisible2=false;
    },

    selectedqi(){
      this.delarr=[];
      this.delVisibleqi = true;
      for (let i = 0; i < this.selectedList.length; i++) {
        this.delarr.push({prolistCode:this.selectedList[i].prolistCode,prolistState:this.selectedList[i].prolistState=4,line:2}
        )
      }
      console.log(this.delarr);
    },
    
     async deleteRowqi(){
         const {data:res} = await this.$http.post('sc/Production/updatestatusmore',this.delarr);
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
         this.delVisibleqi = false;
         this.ManageList();
     
      },
    async yinshuachanshu(prolistCode,xian){
      if(xian==0){
        this.xianshi=true;
      }else{
        this.xianshi=false;
      }
      this.editPrintedForm.parametersDO={};
      this.parametersDO1=[];
      let param = new URLSearchParams();
      param.append("prolistCode", prolistCode);
      const { data: res } = await this.$http.post("sc/ProductionExecution/selectbyid",param);
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
      this.editPrintedForm=res.body.SCProductionDO;
       this.editPrintedForm.parametersDO.prolistParameters=this.editPrintedForm.productionDO.prolistParameters;
       this.editPrintedForm.parametersDO.prolistParamenumber=this.editPrintedForm.productionDO.prolistParamenumber;
       this.editPrintedForm.parametersDO.prolistUsemetre=this.editPrintedForm.productionDO.prolistUsemetre;
       this.editPrintedForm.parametersDO.prolistParamemetre=this.editPrintedForm.productionDO.prolistParamemetre;
        this.editPrintedForm.parametersDO.prolistPeweight=this.editPrintedForm.productionDO.prolistPeweight;
       this.editPrintedForm.parametersDO.prolistParamemetre=this.editPrintedForm.productionDO.prolistParamemetre;
       if(this.editPrintedForm.productionExecutionDO.productionBatchDOs==null){
         this.editPrintedForm.productionExecutionDO.productionBatchDOs=[];
       }
       if(this.editPrintedForm.productionExecutionDO.pexeMan!=''){
         this.editPrintedForm.productionExecutionDO.pexeMan= this.shenpiren;

       }
      
       this.parametersDO1.push(this.editPrintedForm.parametersDO); 
      this.editPrintedForm.parametersDO=this.parametersDO1;
       
      this.editManageVisible = true;
      console.log(this.editPrintedForm);
      
    },
    async addPrinted(){
      console.log(this.editPrintedForm.productionExecutionDO.productionBatchDOs);
      for (let index = 0; index < this.editPrintedForm.productionExecutionDO.productionBatchDOs.length; index++) {
        if(Object.keys(this.editPrintedForm.productionExecutionDO.productionBatchDOs[index]).length<=1){
          this.editPrintedForm.productionExecutionDO.productionBatchDOs.splice(index,1);
        }
        
      }
      console.log(this.editPrintedForm.productionExecutionDO.productionBatchDOs);
      
      this.editPrintedForm.parametersDO=this.editPrintedForm.parametersDO[0];
      const { data: res } = await this.$http.post("sc/ProductionExecution/update",this.editPrintedForm);
       
      this.editManageVisible=false;
    },
     dialogClosed(){
        this.$refs.addManageRef.resetFields();
      },
   async ManageList() {
    //  if (this.chaManageForm.sorderCode!=''||this.chaManageForm.sorderTotalsum!=''||this.chaManageForm.sorderStatus!=''||this.chaManageForm.sorderWarehouse!='') {
    //    this.chaManageForm.pageCode=1;
    //    this.chaManageForm.pageSize=10;
    //  }
      const { data: res } = await this.$http.post("sc/Production/selectproduction",this.chaManageForm);
       
      this.total=res.body.total;
      this.manageList = res.body.rows;
    },
     dialogClosed(val) {
       this.editMaterialForm.buMaterialListDOs=[];
      //  this.editMaterialForm.tuiMaterialListDOs=[];
      this.$refs[val].resetFields();
    },
    async changeGoodsBigType(val) {
      
      const { data: res } = await this.$http.post(
        "sc/Materal/selectname",
        { params: { lab: this.chooseGoodsForm.goodsBigType,
        pageCode: this.chooseGoodsForm.pageCode ,
        pageSize:this.chooseGoodsForm.pageSize} }
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
      this.shangpi = res.body.rows;
      this.total = res.body.total;
    },
    xuanzhewuliao(){
       if (this.editManageVisible == true) {
        this.productgoodsIdList = this.editMaterialForm.buMaterialListDOs.map(
          item => {
            return item.suppliergoolsId;
          }
        );
      } 
      this.dialogVisible11=true;
      this.changeGoodsBigType();
    },
    
 shengchancaigou(){
      var chongfu=0;
        if(this.editMaterialForm.buMaterialListDOs.length>=1){
          if(this.editManageVisible==true){
            const needAdd = [];
          this.selectedList.forEach(item => {
            if (this.productgoodsIdList.indexOf(item.suppliergoolsId) === -1) {
              needAdd.push(item);
            } else {
              chongfu ++;
            }
          });
          this.editMaterialForm.buMaterialListDOs = [
            ...this.editMaterialForm.buMaterialListDOs,
            ...needAdd
          ];
          }
        }else{
          for (let index = 0; index < this.selectedList.length; index++) {
            if(this.editManageVisible1==true){
              this.editMaterialForm.buMaterialListDOs.push(this.selectedList[index]);
            }
console.log(this.editMaterialForm.buMaterialListDOs);
        }
          
    }
    
    
      const charu = this.selectedList.length - chongfu;
      this.$message({
        type: "info",
        message: chongfu > 0 ? `此次添加有重复数据，重复数据${chongfu}条，成功插入${charu}条` : `此次成功插入${charu}条`
      });
       this.dialogVisible11=false;
    },
    shanchuwuliao(){

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
           for (let i = 0; i < this.editMaterialForm.buMaterialListDOs.length; i++) {
              if(this.delarr[index]==this.editMaterialForm.buMaterialListDOs[i].suppliergoolsId)
              this.editMaterialForm.buMaterialListDOs.splice(i,1);
           }
         }
        }
         this.delVisible11 = false;
         
      },
   async addMaterial(){
       const { data: res } = await this.$http.post("sc/BuMateral/insertbumaterial",this.editMaterialForm);
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
       this.editManageVisible1 = false;
        this.ManageList();
    },

    getCookie: function() {
      var storage=window.localStorage;
      this.shenpiren = storage.getItem("username");
    },
    async showMaterial(prolistCode,xian,sorderStatus) {

       
         let param = new URLSearchParams();
          param.append("prolistCode", prolistCode);
        const { data: res } = await this.$http.post("sc/Materal/selctforeach",param);
         
        if(res.body.rows.length>=1){
          this.editMaterialForm.prolistCode=res.body.rows[0].prolistCode;
           this.editMaterialForm.prolistPlanman=res.body.rows[0].prolistPlanman;
           this.editMaterialForm.buMaterialListDOs=res.body.rows[0].buMaterialListDOs;
           
        }else{
         
        this.editMaterialForm.buMaterialListDOs=[];

        }
        if(sorderStatus==1){
       this.editMaterialForm.prolistCode=prolistCode;
      this.editMaterialForm.prolistPlanman=this.shenpiren;
      this.editManageVisible = true;
        }else{
           this.editManageVisible1 = true;
        }
      
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
