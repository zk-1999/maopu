<template>
  <div class="min1500">
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>生产管理</el-breadcrumb-item>
      <el-breadcrumb-item>成型</el-breadcrumb-item>
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
      <!-- <el-button type="success" @click="addManageVisible = true">新 建</el-button> -->
       <el-button
            type="warning"
            @click="selectedqi"
            :disabled="selectedList.length == 0"
          >成型完成</el-button>
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
             <el-button @click="showMaterial(scope.row.prolistCode,true,0)" type="success" size="small" >查看</el-button>
             <el-button @click="showMaterial(scope.row.prolistCode,true,1)" type="primary" size="small" >成型</el-button>
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
    :title="xianshi ? '查看成品' : '成品'"
    :visible.sync="editManageVisible"
    width="60%"
    :before-close="handleClose">
    <el-form ref="addManageRef" label-width="100px" :inline="true" :model="editMaterialForm" :rules="addManageRules">
        <div class="fenge">物料信息</div>
        <el-form-item label="生产单号：" prop="prolistCode">
            <el-input v-model="editMaterialForm.prolistCode" disabled></el-input>
        </el-form-item>
        <el-form-item label="制单人员：" prop="machMan">
            <el-input v-model="editMaterialForm.machMan" disabled></el-input>
        </el-form-item>
        <div class="fenge1">商品名称</div>
         <el-table
    style="width: 100%" border @selection-change="handleSelectionChange" :data="editMaterialForm.producinggoodsDO">
    
    <el-table-column label="商品名称" prop="productName" ></el-table-column>
    <el-table-column label="产品名称" prop="productType" ></el-table-column>
    <el-table-column label="产品规格" prop="productNorms"></el-table-column>
    <el-table-column label="数量" prop="prolistNumber"></el-table-column>
  </el-table>
        <div class="fenge1">半成品信息</div>
         <el-table
    style="width: 100%" border @selection-change="handleSelectionChange" :data="editMaterialForm.banFormingDOs">
    <el-table-column label="产品名称" prop="producinggoodsDO.productName" ></el-table-column>
    <el-table-column label="规格" prop="producinggoodsDO.productNorms" ></el-table-column>
    <el-table-column label="重量" prop="banPlannum"></el-table-column>
    <el-table-column label="单位" prop="productOutbao">
      <template >
        kg
      </template>
    </el-table-column>
  </el-table>
  <div class="fenge1">纸箱包装信息</div>
         <el-table
    style="width: 100%" border @selection-change="handleSelectionChange" :data="editMaterialForm.xiangFormingDOs">
    <el-table-column label="纸箱小类型" prop="supplierGoolsDO.supgoolsId" ></el-table-column>
    <el-table-column label="纸箱名称" prop="supplierGoolsDO.supgoolssmallType" ></el-table-column>
    <el-table-column label="商品描述" prop="supplierGoolsDO.supgoolsSplicing"></el-table-column>
    <!-- <el-table-column label="库存数量" prop="kcTotalstock"></el-table-column> -->
    <el-table-column label="数量" prop="xiangPlannum"></el-table-column>
  </el-table>
  <div class="fenge1">袋子包装信息</div>
         <el-table
    style="width: 100%" border @selection-change="handleSelectionChange" :data="editMaterialForm.daiFormingDOs">
    <el-table-column label="袋子小类型" prop="supplierGoolsDO.supgoolsId" ></el-table-column>
    <el-table-column label="袋子名称" prop="supplierGoolsDO.supgoolssmallType" ></el-table-column>
    <el-table-column label="商品描述" prop="supplierGoolsDO.supgoolsSplicing"></el-table-column>
    <el-table-column label="数量" prop="daiPlannum">
      
    </el-table-column>
  </el-table>
  <div class="fenge1" v-if="machinedBatchDOs1">模具信息</div>
   <el-form-item label="选择模具" prop="goodsBigType" v-if="!xianshi">
          <el-select v-model="editMaterialForm.basicId" placeholder="请选择" >
            <el-option
              v-for="item in editMaterialForm.machinedBatchDOs"
              :key="item.basicId"
              :label="item.mbatMouldname"
              :value="item.basicId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-button type="primary" v-if="!xianshi" @click="tianmoju">添加</el-button>
        <el-button type="primary" v-if="!xianshi" @click="selected">删除</el-button>
         <el-table
    style="width: 100%" border @selection-change="handleSelectionChange" :data="machinedBatchDOs1">
    <el-table-column type="selection" width="35" align="center"></el-table-column>
    <el-table-column label="模具名称" prop="mbatMouldname" ></el-table-column>
    <el-table-column label="模具产能" prop="mbatMouldcapacity" ></el-table-column>
    <el-table-column label="生产追踪号" prop="mbatCode"></el-table-column>
    <el-table-column label="实际生产数量" prop="mbatReallynum">
<template scope="scope">
        <el-input v-model="scope.row.mbatReallynum"></el-input>
      </template>
    </el-table-column>
  </el-table>
    </el-form>
    <span slot="footer" class="dialog-footer">
        <el-button @click="editManageVisible = false">取 消</el-button>
        <el-button type="primary" v-if="!xianshi" @click="addMaterial">确 定</el-button>
    </span>
    </el-dialog>
    <el-dialog
      title="半成品选择"
      :visible.sync="dialogVisible1"
      width="58%"
      :before-close="handleClose"
      @closed="dialogClosed('chooseGoodsForm')"
    >
      <el-form :model="chooseGoodsForm" ref="chooseGoodsForm" :inline="true">
        <el-form-item label="商品名称：" prop="goodsBigType"></el-form-item>
         <el-form-item >
           <el-button >查看</el-button>
         </el-form-item>
      </el-form>
      <el-table border stripe :data="shangpi" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="40"></el-table-column>
        <el-table-column type="index" width="50px" label="序号" align="center"></el-table-column>
        <el-table-column prop="supgoolsId" label="商品名称"></el-table-column>
        <el-table-column prop="supgoolssmallType" label="产品名称"></el-table-column>
        <el-table-column prop="supgoolsSplicing" label="规格"></el-table-column>
        <el-table-column label="库存" prop="kcTotalstock"></el-table-column>
        <el-table-column label="单位" prop="productOutbao"></el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible1=false">取 消</el-button>
        <el-button @click="shengchancaigou()" type="primary">保 存</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="纸箱选择"
      :visible.sync="dialogVisible2"
      width="58%"
      :before-close="handleClose"
      @closed="dialogClosed('chooseGoodsForm')"
    >
     <el-form :model="chooseGoodsForm" ref="chooseGoodsForm" :inline="true">
        <el-form-item label="商品大类型：" prop="goodsBigType">
          <el-select
          disabled
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
        <el-button @click="dialogVisible2=false">取 消</el-button>
        <el-button @click="shengchancaigou()" type="primary">保 存</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="袋子选择"
      :visible.sync="dialogVisible3"
      width="58%"
      :before-close="handleClose"
      @closed="dialogClosed('chooseGoodsForm')"
    >
      <el-form :model="chooseGoodsForm" ref="chooseGoodsForm" :inline="true">
        <el-form-item label="商品大类型：" prop="goodsBigType">
          <el-select
          disabled
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
        <el-button @click="dialogVisible3=false">取 消</el-button>
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
    <el-dialog title="提示" :visible.sync="delVisibleqi" width="300px">
      <div class="del-dialog-cnt">此操作将批量印刷, 是否继续？</div>
      <span slot="footer" class="dialog-footer">
          <el-button @click="delVisibleqi = false">取 消</el-button>
          <el-button type="primary" @click="deleteRowqi" >确 定</el-button>
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
      dialogVisible3:false,
      dialogVisible2:false,
      dialogVisible1:false,
      delVisible: false,
      delVisible11:false,
      delVisibleqi:false,
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
        line:5,
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
      editMaterialForm:{
       prolistCode:'',
       machMan:'',
       prolistPlantime:'',
       kcTotalstock:'',
       banFormingDOs:[],
       xiangFormingDOs:[],
       daiFormingDOs:[],
       producinggoodsDO:{},
       machinedBatchDOs:[],
       basicId:'',
      },
      machinedBatchDOs1:[],
      producinggoodsDO1:[],
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
    };
  },
  created() {
    this.ManageList();
    this.list();
    this.getCookie();
  },
  methods: {
     selectedqi(){
      this.delarr=[];
      this.delVisibleqi = true;
      for (let i = 0; i < this.selectedList.length; i++) {
        this.delarr.push({prolistCode:this.selectedList[i].prolistCode,prolistState:this.selectedList[i].prolistState=7,line:5}
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
    tianmoju(){
     var a=0;
     if(this.machinedBatchDOs1.length>=1){
          for (let i = 0; i < this.machinedBatchDOs1.length; i++) {
             if (this.editMaterialForm.basicId==this.machinedBatchDOs1[i].basicId) {
               this.$message({
                  type: "info",
                  message: '已有此条数据！'
                });
                a=1;
             }
          }
          if(a!=1){
            for (let j = 0; j < this.editMaterialForm.machinedBatchDOs.length; j++) {
                 if (this.editMaterialForm.basicId==this.editMaterialForm.machinedBatchDOs[j].basicId) {
                   this.machinedBatchDOs1.push(this.editMaterialForm.machinedBatchDOs[j]);
                 }
               }
          }
        }else{
          for (let index = 0; index < this.editMaterialForm.machinedBatchDOs.length; index++) {
       if(this.editMaterialForm.basicId==this.editMaterialForm.machinedBatchDOs[index].basicId){
         this.machinedBatchDOs1.push(this.editMaterialForm.machinedBatchDOs[index]);
       }
      } 
      }
      
    },
   async ManageList() {
      const { data: res } = await this.$http.post("sc/Production/selectproduction",this.chaManageForm);
       
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
        this.productgoodsIdList = this.editMaterialForm.banFormingDOs.map(
          item => {
            return item.suppliergoolsId;
          }
        );
      } 
      this.dialogVisible1=true;
      this.changeGoodsBigType();
    },
    xuanzhewuliao1(){
      this.chooseGoodsForm.goodsBigType='纸箱';
       if (this.editManageVisible == true) {
        this.productgoodsIdList = this.editMaterialForm.xiangFormingDOs.map(
          item => {
            return item.suppliergoolsId;
          }
        );
      } 
      this.dialogVisible2=true;
      this.changeGoodsBigType();
    },
    xuanzhewuliao2(){
      this.chooseGoodsForm.goodsBigType='袋子';
       if (this.editManageVisible == true) {
        this.productgoodsIdList = this.editMaterialForm.daiFormingDOs.map(
          item => {
            return item.suppliergoolsId;
          }
        );
      } 
      this.dialogVisible3=true;
      this.changeGoodsBigType();
    },
    
 shengchancaigou(){
      var chongfu=0;
      if(this.chooseGoodsForm.goodsBigType=='纸箱'){
        if(this.editMaterialForm.xiangFormingDOs.length>=1){
          if(this.editManageVisible==true){
            const needAdd = [];
          this.selectedList.forEach(item => {
            if (this.productgoodsIdList.indexOf(item.suppliergoolsId) === -1) {
              needAdd.push(item);
            } else {
              chongfu ++;
            }
          });
          this.editMaterialForm.xiangFormingDOs = [
            ...this.editMaterialForm.xiangFormingDOs,
            ...needAdd
          ];
          }
        }else{
          for (let index = 0; index < this.selectedList.length; index++) {
            if(this.editManageVisible==true){
             this.editMaterialForm.xiangFormingDOs.push(this.selectedList[index]);
            }
        }
      }
      this.dialogVisible2=false;
    }else if(this.chooseGoodsForm.goodsBigType=='袋子'){
      if(this.editMaterialForm.daiFormingDOs.length>=1){
          if(this.editManageVisible==true){
            const needAdd = [];
          this.selectedList.forEach(item => {
            if (this.productgoodsIdList.indexOf(item.suppliergoolsId) === -1) {
              needAdd.push(item);
            } else {
              chongfu ++;
            }
          });
          this.editMaterialForm.daiFormingDOs = [
            ...this.editMaterialForm.daiFormingDOs,
            ...needAdd
          ];
          }
        }else{
          for (let index = 0; index < this.selectedList.length; index++) {
            if(this.editManageVisible==true){
             this.editMaterialForm.daiFormingDOs.push(this.selectedList[index]);
            }
        }
      }
       this.dialogVisible3=false;
    }else{
      if(this.editMaterialForm.banFormingDOs.length>=1){
          if(this.editManageVisible==true){
            const needAdd = [];
          this.selectedList.forEach(item => {
            if (this.productgoodsIdList.indexOf(item.suppliergoolsId) === -1) {
              needAdd.push(item);
            } else {
              chongfu ++;
            }
          });
          this.editMaterialForm.banFormingDOs = [
            ...this.editMaterialForm.banFormingDOs,
            ...needAdd
          ];
          }
           this.dialogVisible2=false;
        }else{
          for (let index = 0; index < this.selectedList.length; index++) {
            if(this.editManageVisible==true){
             this.editMaterialForm.banFormingDOs.push(this.selectedList[index]);
            }
        }
        
      }
      this.dialogVisible1=false;
    }
         
      const charu = this.selectedList.length - chongfu;
      this.$message({
        type: "info",
        message: chongfu > 0 ? `此次添加有重复数据，重复数据${chongfu}条，成功插入${charu}条` : `此次成功插入${charu}条`
      });
       
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
      if(this.chooseGoodsForm.goodsBigType=='纸箱'){
        if(this.editManageVisible==true){
             for (let index = 0; index < this.delarr.length; index++) {
           for (let i = 0; i < this.editMaterialForm.xiangFormingDOs.length; i++) {
              if(this.delarr[index]==this.editMaterialForm.xiangFormingDOs[i].suppliergoolsId)
              this.editMaterialForm.xiangFormingDOs.splice(i,1);
           }
         }
        }
      }else if (this.chooseGoodsForm.goodsBigType=='袋子') {
        if(this.editManageVisible==true){
             for (let index = 0; index < this.delarr.length; index++) {
           for (let i = 0; i < this.editMaterialForm.daiFormingDOs.length; i++) {
              if(this.delarr[index]==this.editMaterialForm.daiFormingDOs[i].suppliergoolsId)
              this.editMaterialForm.daiFormingDOs.splice(i,1);
           }
         }
        }
      }else{
        if(this.editManageVisible==true){
             for (let index = 0; index < this.delarr.length; index++) {
           for (let i = 0; i < this.editMaterialForm.banFormingDOs.length; i++) {
              if(this.delarr[index]==this.editMaterialForm.banFormingDOs[i].suppliergoolsId)
              this.editMaterialForm.banFormingDOs.splice(i,1);
           }
         }
        }
      }
         this.delVisible11 = false;
      },
   async addMaterial(){
     console.log(this.editMaterialForm);
     this.editMaterialForm.machinedBatchDOs=this.machinedBatchDOs1;
       const { data: res } = await this.$http.post("sc/Machined/update",this.editMaterialForm);
        
       this.editManageVisible = false;
        this.ManageList();
    },
    getCookie: function() {
      var storage=window.localStorage;
      this.shenpiren = storage.getItem("username");
    },
    async showMaterial(prolistCode,xian,sorderStatus) {
         if(sorderStatus==0){
        this.xianshi=true;
      }else{
        this.xianshi=false;
      }
      let param = new URLSearchParams();
      param.append("prolistCode", prolistCode);
      const { data: res } = await this.$http.post("sc/Forming/select",param);
       
      this.editMaterialForm=res.body.formingPickingDO;
      this.producinggoodsDO1.push(res.body.producinggoodsDO);
      this.editMaterialForm.producinggoodsDO= this.producinggoodsDO1;
      this.editMaterialForm.machinedBatchDOs=res.body.machinedBatchDOs;
      this.machinedBatchDOs1=res.body.machinedBatchDOs1;
      this.editMaterialForm.prolistCode=prolistCode;
      if(res.body.formingPickingDO.machMan){
         this.editMaterialForm.machMan=res.body.formingPickingDO.machMan;
      }else{
         this.editMaterialForm.machMan=this.shenpiren;
      }
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
