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
      <el-button type="success" @click="addManageVisible = true">新 建</el-button>
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
        </el-table-column>
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
        <el-table-column label="操作" width="150px" style="text-align:center">
          <template slot-scope="scope">
             <el-button @click="showManage(scope.row.prolistCode,true,1)" type="success" size="small" >查看</el-button>
             <el-button @click="showManage(scope.row.prolistCode,true,1)" type="primary" size="small" >编辑</el-button>
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
    title="新增生产单"
    :visible.sync="addManageVisible"
    width="60%"
    @open="guoqushangpin"
    :before-close="handleClose">
    <el-form ref="addManageRef" label-width="100px" :inline="true" :model="addManageForm" :rules="addManageRules">
        <div class="fenge">生产信息</div>
        <el-form-item label="商品类型：" prop="productLeixing">
          <el-select v-model="addManageForm.producinggoodsDO.productLeixing" class="sel" placeholder="请选择" @change="guoqushangpin">
            <el-option
              v-for="item in shangpinleixing"
              :key="item.id"
              :label="item.value"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品名称：" prop="productgoodsId">
          <el-select v-model="addManageForm.producinggoodsDO.productgoodsId" class="sel" placeholder="请选择" @change="guoqushangpinmingcheng">
            <el-option
              v-for="item in shangpinmingcheng"
              :key="item.productgoodsId"
              :label="item.productName"
              :value="item.productgoodsId"
              >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="生产数量：" prop="prolistNumber">
            <el-input v-model="addManageForm.prolistNumber"></el-input>
        </el-form-item>
        <div v-if="addManageForm.producinggoodsDO.productLeixing==0">
        <div class="fenge1">内杯信息</div>
        <el-form-item label="产品名称：" prop="productType">
            <el-input v-model="addManageForm.producinggoodsDO.productType"></el-input>
        </el-form-item>
        <el-form-item label="纸张品牌：" prop="productBrandinner">
            <el-input v-model="addManageForm.producinggoodsDO.productBrandinner"></el-input>
        </el-form-item>
        <el-form-item label="纸张类型：" prop="productZhizleix">
            <el-input v-model="addManageForm.producinggoodsDO.productZhizleix"></el-input>
        </el-form-item>
        <el-form-item label="纸张克重：" prop="productGraminner">
            <el-input v-model="addManageForm.producinggoodsDO.productGraminner"></el-input>
        </el-form-item>
        <el-form-item label="淋膜类型：" prop="productCoatedinner">
            <el-input v-model="addManageForm.producinggoodsDO.productCoatedinner"></el-input>
        </el-form-item>
        <el-form-item label="单个克重：" prop="productOneke">
            <el-input v-model="addManageForm.producinggoodsDO.productOneke"></el-input>
        </el-form-item>
        <el-form-item label="产品尺寸：" prop="productChanpchic">
            <el-input v-model="addManageForm.producinggoodsDO.productChanpchic"></el-input>
        </el-form-item>
        <el-form-item label="设计稿：" prop="designModel">
            <el-input v-model="addManageForm.designDO.designName==''?'':addManageForm.designDO.designName"></el-input>
        </el-form-item>
        </div>
        <div v-if="addManageForm.producinggoodsDO.productLeixing==1||addManageForm.producinggoodsDO.productLeixing==2||addManageForm.producinggoodsDO.productLeixing==3||addManageForm.producinggoodsDO.productLeixing==4">
        <div class="fenge1">外杯信息</div>
        </el-form-item> -->
        <el-form-item label="产品名称：" prop="productType">
            <el-input v-model="addManageForm.producinggoodsDO.productType"></el-input>
        </el-form-item>
        <el-form-item label="纸张品牌：" prop="productBrandabroad">
            <el-input v-model="addManageForm.producinggoodsDO.productBrandabroad"></el-input>
        </el-form-item>
        <el-form-item label="纸张类型：" prop="productZhizleix">
            <el-input v-model="addManageForm.producinggoodsDO.productZhizleix"></el-input>
        </el-form-item>
        <el-form-item label="纸张克重：" prop="productGramabroad">
            <el-input v-model="addManageForm.producinggoodsDO.productGramabroad"></el-input>
        </el-form-item>
        <el-form-item label="淋膜类型：" prop="productCoatedabroad">
            <el-input v-model="addManageForm.producinggoodsDO.productCoatedabroad"></el-input>
        </el-form-item>
        <el-form-item label="单个克重：" prop="productOneke">
            <el-input v-model="addManageForm.producinggoodsDO.productOneke"></el-input>
        </el-form-item>
        <el-form-item label="产品尺寸：" prop="productChanpchic">
            <el-input v-model="addManageForm.producinggoodsDO.productChanpchic"></el-input>
        </el-form-item>
        <el-form-item label="设计稿：" prop="designModel">
            <el-input v-model="addManageForm.designDO.designName==''?'':addManageForm.designDO.designName"></el-input>
        </el-form-item>
        
        </div>
        <div v-if="addManageForm.producinggoodsDO.productLeixing==1||addManageForm.producinggoodsDO.productLeixing==2">
        <div class="fenge1" >内杯信息</div>
        <el-form-item label="内杯名称：" prop="productName1">
            <el-input v-model="addManageForm.producinggoodsDO.productName1"></el-input>
        </el-form-item>
        </div>
        <div v-if="addManageForm.producinggoodsDO.productLeixing==2||addManageForm.producinggoodsDO.productLeixing==3">
        <div class="fenge1">夹层信息</div>
        <el-form-item label="纸张品牌：" prop="productBrandmid">
            <el-input v-model="addManageForm.producinggoodsDO.productBrandmid"></el-input>
        </el-form-item>
        <el-form-item label="纸张类型：" prop="productZhizleixone">
            <el-input v-model="addManageForm.producinggoodsDO.productZhizleixone"></el-input>
        </el-form-item>
        <el-form-item label="纸张克重：" prop="productGrammid">
            <el-input v-model="addManageForm.producinggoodsDO.productGrammid"></el-input>
        </el-form-item>
         <el-form-item label="淋膜类型：" prop="productCoatedmid">
            <el-input v-model="addManageForm.producinggoodsDO.productCoatedmid"></el-input>
        </el-form-item>
         <el-form-item label="瓦楞形状：" prop="productCorrugated">
            <el-input v-model="addManageForm.producinggoodsDO.productCorrugated"></el-input>
        </el-form-item>
        </div>
        <div v-if="addManageForm.producinggoodsDO.productLeixing==4">
        <div class="fenge1">手柄信息</div>
        <el-form-item label="纸张品牌：" prop="productBrandabroad">
            <el-input v-model="addManageForm.producinggoodsDO.productBrandabroad"></el-input>
        </el-form-item>
        <el-form-item label="纸张类型：" prop="productZhizleix">
            <el-input v-model="addManageForm.productZhizleix"></el-input>
        </el-form-item>
        <el-form-item label="纸张克重：" prop="productGramabroad">
            <el-input v-model="addManageForm.producinggoodsDO.productGramabroad"></el-input>
        </el-form-item>
         <el-form-item label="淋膜类型：" prop="productCoatedabroad">
            <el-input v-model="addManageForm.producinggoodsDO.productCoatedabroad"></el-input>
        </el-form-item>
         <el-form-item label="手柄形状：" prop="productHandle">
            <el-input v-model="addManageForm.producinggoodsDO.productHandle"></el-input>
        </el-form-item>
        </div>
        <div v-if="addManageForm.producinggoodsDO.productLeixing==0||addManageForm.producinggoodsDO.productLeixing==1||addManageForm.producinggoodsDO.productLeixing==2||addManageForm.producinggoodsDO.productLeixing==3||addManageForm.producinggoodsDO.productLeixing==4">
        <div class="fenge1">设计稿信息</div>
        <el-form-item label="设计稿名称：" prop="designModel">
            <el-input v-model="addManageForm.designDO.designName==''?'':addManageForm.designDO.designName"></el-input>
        </el-form-item>
        <el-form-item label="设计稿颜色：" prop="parametersSinglenum">
            <el-input v-model="addManageForm.designDO.designCol1==''?'':addManageForm.designDO.designCol1"></el-input>
        </el-form-item>
        </div>
        <div v-if="addManageForm.producinggoodsDO.productLeixing==0||addManageForm.producinggoodsDO.productLeixing==1||addManageForm.producinggoodsDO.productLeixing==2||addManageForm.producinggoodsDO.productLeixing==3||addManageForm.producinggoodsDO.productLeixing==4">
        <div class="fenge1">印刷信息</div>
        <el-form-item label="版锟齿数：" prop="parametersSingle">
            <el-input v-model="addManageForm.parametersDO.parametersSingle"></el-input>
        </el-form-item>
        <el-form-item label="版锟周长：" prop="parametersSinglenum">
            <el-input v-model="addManageForm.parametersDO.parametersSinglenum"></el-input>
        </el-form-item>
        <el-form-item label="周长片数：" prop="parametersTeethnum">
            <el-input v-model="addManageForm.parametersDO.parametersTeethnum"></el-input>
        </el-form-item>
        <el-form-item label="纸张门幅：" prop="parametersDoorwidth">
            <el-input v-model="addManageForm.parametersDO.parametersDoorwidth"></el-input>
        </el-form-item>
        <el-form-item label="门幅片数：" prop="parametersDoornum">
            <el-input v-model="addManageForm.parametersDO.parametersDoornum"></el-input>
        </el-form-item>
        <el-form-item label="总计片数：" prop="parametersNumber">
            <el-input v-model="addManageForm.parametersDO.parametersNumber"></el-input>
        </el-form-item>
        <el-form-item label="印刷方式：" prop="prolistParameters">
            <!-- <el-input v-model="addManageForm.prolistParameters"></el-input> -->
            <el-select v-model="addManageForm.prolistParameters" class="sel" placeholder="请选择" >
            <el-option
              v-for="item in yinshuafangshi"
              :key="item.basicId"
              :label="item.basicRetainone"
              :value="item.basicId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="印刷放量：" prop="prolistParamenumber">
            <el-input v-model="addManageForm.prolistParamenumber"></el-input>
        </el-form-item>
        <el-form-item label="印刷重量：" prop="prolistParamemetre">
            <el-input v-model="addManageForm.prolistParamemetre"></el-input>
        </el-form-item>
        <el-form-item label="用纸米数：" prop="prolistUsemetre">
            <el-input v-model="addManageForm.prolistUsemetre"></el-input>
        </el-form-item>
        <el-form-item label="油墨用量：" prop="prolistPeweight">
            <el-input v-model="addManageForm.prolistPeweight"></el-input>
        </el-form-item>
        <el-form-item label="备注：" prop="prolistParaexplain">
            <el-input v-model="addManageForm.prolistParaexplain" class="w400"></el-input>
        </el-form-item>
        </div>
        <div v-if="addManageForm.producinggoodsDO.productLeixing==0||addManageForm.producinggoodsDO.productLeixing==1||addManageForm.producinggoodsDO.productLeixing==2||addManageForm.producinggoodsDO.productLeixing==3||addManageForm.producinggoodsDO.productLeixing==4">
        <div class="fenge1">模具信息</div>
        <el-table
        :data="addManageForm.basicDOs"
        border 
        style="width: 100%">
        <el-table-column
            prop="basicRetainone"
            label="可用模具名称"
            >
        </el-table-column>
        <el-table-column
            prop="basicRetainone1"
            label="总产能"
            >
        </el-table-column>
        </el-table>
        </div>
        <div v-if="addManageForm.producinggoodsDO.productLeixing==0||addManageForm.producinggoodsDO.productLeixing==1||addManageForm.producinggoodsDO.productLeixing==2||addManageForm.producinggoodsDO.productLeixing==3||addManageForm.producinggoodsDO.productLeixing==4">
        <div class="fenge1">包装信息</div>
        <el-form-item label="内包装：" prop="productInnerbao">
            <el-input v-model="addManageForm.producinggoodsDO.productInnerbao"></el-input>
        </el-form-item>
        <el-form-item label="外包装：" prop="productOutbao">
            <el-input v-model="addManageForm.producinggoodsDO.productOutbao"></el-input>
        </el-form-item>
        <el-form-item label="个/箱：" prop="productOnege">
            <el-input v-model="addManageForm.producinggoodsDO.productOnege"></el-input>
        </el-form-item>
        <el-form-item label="外箱尺寸：" prop="productSizelength">
            <el-input v-model="addManageForm.producinggoodsDO.productSizelength==''?'':addManageForm.producinggoodsDO.productSizelength"></el-input>
        </el-form-item>
        <el-form-item label="配盖：" prop="productCover">
            <el-input v-model="addManageForm.producinggoodsDO.productCover"></el-input>
        </el-form-item>
        <el-form-item label="箱唛：" prop="productBoxMark">
            <el-input v-model="addManageForm.producinggoodsDO.productBoxMark"></el-input>
        </el-form-item>
        <el-form-item label="标唛：" prop="productLabel">
            <el-input v-model="addManageForm.producinggoodsDO.productLabel"></el-input>
        </el-form-item>
        <el-form-item label="备注：" prop="prolistExplain">
            <el-input v-model="addManageForm.prolistExplain" class="w400"></el-input>
        </el-form-item>
        </div>
    </el-form>
    
    <span slot="footer" class="dialog-footer">
        <el-button @click="addManageVisible = false">取 消</el-button>
        <el-button type="primary" @click="addManage">确 定</el-button>
    </span>
    </el-dialog>
    <el-dialog
    title="编辑生产单"
    :visible.sync="editManageVisible"
    width="60%"
    @open="guoqushangpin"
    :before-close="handleClose">
    <el-form ref="addManageRef" label-width="100px" :inline="true" :model="editManageForm" :rules="addManageRules">
        <div class="fenge">生产信息</div>
        <el-form-item label="商品类型：" prop="productLeixing">
          <el-select v-model="editManageForm.producinggoodsDO.productLeixing" class="sel" placeholder="请选择" @change="guoqushangpin">
            <el-option
              v-for="item in shangpinleixing"
              :key="item.id"
              :label="item.value"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品名称：" prop="productgoodsId">
          <el-select v-model="editManageForm.producinggoodsDO.productgoodsId" class="sel" placeholder="请选择" @change="guoqushangpinmingcheng">
            <el-option
              v-for="item in shangpinmingcheng"
              :key="item.productgoodsId"
              :label="item.productName"
              :value="item.productgoodsId"
              >
            </el-option>
          </el-select>
        </el-form-item>
        <div v-if="addManageForm.producinggoodsDO.productLeixing==0">
        <div class="fenge1">生产信息</div>
        <el-form-item label="生产单号：" prop="productType">
            <el-input v-model="editManageForm.productionDO.prolistCode"></el-input>
        </el-form-item>
        <el-form-item label="合同号：" prop="sorderWarehouse" v-if="editManageForm.saleOrderDO!=null">
            <el-input  v-model="editManageForm.saleOrderDO.sorderWarehouse"></el-input>
        </el-form-item>
        <el-form-item label="下单日期：" prop="sorderCreatetime" v-if="editManageForm.saleOrderDO!=null">
            <el-input v-model="editManageForm.saleOrderDO.sorderCreatetime"></el-input>
        </el-form-item>
        <el-form-item label="交货日期：" prop="sorderDeliverytime" v-if="editManageForm.saleOrderDO!=null">
            <el-input v-model="editManageForm.saleOrderDO.sorderDeliverytime"></el-input>
        </el-form-item>
        <el-form-item label="完成日期：" prop="productWanchengtime">
            <el-input v-model="editManageForm.productionDO.productWanchengtime"></el-input>
        </el-form-item>
        <el-form-item label="生产数量：" prop="prolistNumber">
            <el-input v-model="editManageForm.productionDO.prolistNumber"></el-input>
        </el-form-item>
        </div>
        <div v-if="editManageForm.producinggoodsDO.productLeixing==0">
        <div class="fenge1">内杯信息</div>
        <el-form-item label="产品名称：" prop="productType">
            <el-input v-model="editManageForm.producinggoodsDO.productType"></el-input>
        </el-form-item>
        <el-form-item label="纸张品牌：" prop="productBrandinner">
            <el-input v-model="editManageForm.producinggoodsDO.productBrandinner"></el-input>
        </el-form-item>
        <el-form-item label="纸张类型：" prop="productZhizleix">
            <el-input v-model="editManageForm.producinggoodsDO.productZhizleix"></el-input>
        </el-form-item>
        <el-form-item label="纸张克重：" prop="productGraminner">
            <el-input v-model="editManageForm.producinggoodsDO.productGraminner"></el-input>
        </el-form-item>
        <el-form-item label="淋膜类型：" prop="productCoatedinner">
            <el-input v-model="editManageForm.producinggoodsDO.productCoatedinner"></el-input>
        </el-form-item>
        <el-form-item label="单个克重：" prop="productOneke">
            <el-input v-model="editManageForm.producinggoodsDO.productOneke"></el-input>
        </el-form-item>
        <el-form-item label="产品尺寸：" prop="productChanpchic">
            <el-input v-model="editManageForm.producinggoodsDO.productChanpchic"></el-input>
        </el-form-item>
        <el-form-item label="设计稿：" prop="designModel">
            <el-input v-model="editManageForm.designDO.designName==''?'':editManageForm.designDO.designName"></el-input>
        </el-form-item>
        </div>
        <div v-if="editManageForm.producinggoodsDO.productLeixing==1||editManageForm.producinggoodsDO.productLeixing==2||editManageForm.producinggoodsDO.productLeixing==3||editManageForm.producinggoodsDO.productLeixing==4">
        <div class="fenge1">外杯信息</div>
        <el-form-item label="产品名称：" prop="productType">
            <el-input v-model="editManageForm.producinggoodsDO.productType"></el-input>
        </el-form-item>
        <el-form-item label="纸张品牌：" prop="productBrandabroad">
            <el-input v-model="editManageForm.producinggoodsDO.productBrandabroad"></el-input>
        </el-form-item>
        <el-form-item label="纸张类型：" prop="productZhizleix">
            <el-input v-model="editManageForm.producinggoodsDO.productZhizleix"></el-input>
        </el-form-item>
        <el-form-item label="纸张克重：" prop="productGramabroad">
            <el-input v-model="editManageForm.producinggoodsDO.productGramabroad"></el-input>
        </el-form-item>
        <el-form-item label="淋膜类型：" prop="productCoatedabroad">
            <el-input v-model="editManageForm.producinggoodsDO.productCoatedabroad"></el-input>
        </el-form-item>
        <el-form-item label="单个克重：" prop="productOneke">
            <el-input v-model="editManageForm.producinggoodsDO.productOneke"></el-input>
        </el-form-item>
        <el-form-item label="产品尺寸：" prop="productChanpchic">
            <el-input v-model="editManageForm.producinggoodsDO.productChanpchic"></el-input>
        </el-form-item>
        <el-form-item label="设计稿：" prop="designModel">
            <el-input v-model="editManageForm.designDO.designName==''?'':editManageForm.designDO.designName"></el-input>
        </el-form-item>
        
        </div>
        <div v-if="editManageForm.producinggoodsDO.productLeixing==1||editManageForm.producinggoodsDO.productLeixing==2">
        <div class="fenge1" >内杯信息</div>
        <el-form-item label="内杯名称：" prop="productName1">
            <el-input v-model="editManageForm.producinggoodsDO.productName1"></el-input>
        </el-form-item>
        </div>
        <div v-if="editManageForm.producinggoodsDO.productLeixing==2||editManageForm.producinggoodsDO.productLeixing==3">
        <div class="fenge1">夹层信息</div>
        <el-form-item label="纸张品牌：" prop="productBrandmid">
            <el-input v-model="editManageForm.producinggoodsDO.productBrandmid"></el-input>
        </el-form-item>
        <el-form-item label="纸张类型：" prop="productZhizleixone">
            <el-input v-model="editManageForm.producinggoodsDO.productZhizleixone"></el-input>
        </el-form-item>
        <el-form-item label="纸张克重：" prop="productGrammid">
            <el-input v-model="editManageForm.producinggoodsDO.productGrammid"></el-input>
        </el-form-item>
         <el-form-item label="淋膜类型：" prop="productCoatedmid">
            <el-input v-model="editManageForm.producinggoodsDO.productCoatedmid"></el-input>
        </el-form-item>
         <el-form-item label="瓦楞形状：" prop="productCorrugated">
            <el-input v-model="editManageForm.producinggoodsDO.productCorrugated"></el-input>
        </el-form-item>
        </div>
        <div v-if="editManageForm.producinggoodsDO.productLeixing==4">
        <div class="fenge1">手柄信息</div>
        <el-form-item label="纸张品牌：" prop="productBrandabroad">
            <el-input v-model="editManageForm.producinggoodsDO.productBrandabroad"></el-input>
        </el-form-item>
        <el-form-item label="纸张类型：" prop="productZhizleix">
            <el-input v-model="editManageForm.productZhizleix"></el-input>
        </el-form-item>
        <el-form-item label="纸张克重：" prop="productGramabroad">
            <el-input v-model="editManageForm.producinggoodsDO.productGramabroad"></el-input>
        </el-form-item>
         <el-form-item label="淋膜类型：" prop="productCoatedabroad">
            <el-input v-model="editManageForm.producinggoodsDO.productCoatedabroad"></el-input>
        </el-form-item>
         <el-form-item label="手柄形状：" prop="productHandle">
            <el-input v-model="editManageForm.producinggoodsDO.productHandle"></el-input>
        </el-form-item>
        </div>
        <div v-if="editManageForm.producinggoodsDO.productLeixing==0||editManageForm.producinggoodsDO.productLeixing==1||editManageForm.producinggoodsDO.productLeixing==2||editManageForm.producinggoodsDO.productLeixing==3||editManageForm.producinggoodsDO.productLeixing==4">
        <div class="fenge1">设计稿信息</div>
        <el-form-item label="设计稿名称：" prop="designModel">
            <el-input v-model="editManageForm.designDO.designName==''?'':editManageForm.designDO.designName"></el-input>
        </el-form-item>
        <el-form-item label="设计稿颜色：" prop="parametersSinglenum">
            <el-input v-model="editManageForm.designDO.designCol1==''?'':editManageForm.designDO.designCol1"></el-input>
        </el-form-item>
        </div>
        <div v-if="editManageForm.producinggoodsDO.productLeixing==0||editManageForm.producinggoodsDO.productLeixing==1||editManageForm.producinggoodsDO.productLeixing==2||editManageForm.producinggoodsDO.productLeixing==3||editManageForm.producinggoodsDO.productLeixing==4">
        <div class="fenge1">印刷信息</div>
        <el-form-item label="版锟齿数：" prop="parametersSingle">
            <el-input v-model="editManageForm.parametersDO.parametersSingle"></el-input>
        </el-form-item>
        <el-form-item label="版锟周长：" prop="parametersSinglenum">
            <el-input v-model="editManageForm.parametersDO.parametersSinglenum"></el-input>
        </el-form-item>
        <el-form-item label="周长片数：" prop="parametersTeethnum">
            <el-input v-model="editManageForm.parametersDO.parametersTeethnum"></el-input>
        </el-form-item>
        <el-form-item label="纸张门幅：" prop="parametersDoorwidth">
            <el-input v-model="editManageForm.parametersDO.parametersDoorwidth"></el-input>
        </el-form-item>
        <el-form-item label="门幅片数：" prop="parametersDoornum">
            <el-input v-model="editManageForm.parametersDO.parametersDoornum"></el-input>
        </el-form-item>
        <el-form-item label="总计片数：" prop="parametersNumber">
            <el-input v-model="editManageForm.parametersDO.parametersNumber"></el-input>
        </el-form-item>
        <el-form-item label="印刷方式：" prop="prolistParameters">
            <!-- <el-input v-model="editManageForm.prolistParameters"></el-input> -->
            <el-select v-model="editManageForm.productionDO.prolistParameters" class="sel" placeholder="请选择" >
            <el-option
              v-for="item in yinshuafangshi"
              :key="item.basicId"
              :label="item.basicRetainone"
              :value="item.basicId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="印刷放量：" prop="prolistParamenumber">
            <el-input v-model="editManageForm.productionDO.prolistParamenumber"></el-input>
        </el-form-item>
        <el-form-item label="印刷重量：" prop="prolistParamemetre">
            <el-input v-model="editManageForm.productionDO.prolistParamemetre"></el-input>
        </el-form-item>
        <el-form-item label="用纸米数：" prop="prolistUsemetre">
            <el-input v-model="editManageForm.productionDO.prolistUsemetre"></el-input>
        </el-form-item>
        <el-form-item label="油墨用量：" prop="prolistPeweight">
            <el-input v-model="editManageForm.productionDO.prolistPeweight"></el-input>
        </el-form-item>
        <el-form-item label="备注：" prop="prolistParaexplain">
            <el-input v-model="editManageForm.productionDO.prolistParaexplain" class="w400"></el-input>
        </el-form-item>
        </div>
        <div v-if="editManageForm.producinggoodsDO.productLeixing==0||editManageForm.producinggoodsDO.productLeixing==1||editManageForm.producinggoodsDO.productLeixing==2||editManageForm.producinggoodsDO.productLeixing==3||editManageForm.producinggoodsDO.productLeixing==4">
        <div class="fenge1">模具信息</div>
        <el-table
        :data="editManageForm.basicDOs"
        border 
        style="width: 100%">
        <el-table-column
            prop="basicRetainone"
            label="可用模具名称"
            >
        </el-table-column>
        <el-table-column
            prop="basicRetainone1"
            label="总产能"
            >
        </el-table-column>
        </el-table>
        </div>
        <div v-if="editManageForm.producinggoodsDO.productLeixing==0||editManageForm.producinggoodsDO.productLeixing==1||editManageForm.producinggoodsDO.productLeixing==2||editManageForm.producinggoodsDO.productLeixing==3||editManageForm.producinggoodsDO.productLeixing==4">
        <div class="fenge1">包装信息</div>
        <el-form-item label="内包装：" prop="productInnerbao">
            <el-input v-model="editManageForm.producinggoodsDO.productInnerbao"></el-input>
        </el-form-item>
        <el-form-item label="外包装：" prop="productOutbao">
            <el-input v-model="editManageForm.producinggoodsDO.productOutbao"></el-input>
        </el-form-item>
        <el-form-item label="个/箱：" prop="productOnege">
            <el-input v-model="editManageForm.producinggoodsDO.productOnege"></el-input>
        </el-form-item>
        <el-form-item label="外箱尺寸：" prop="productSizelength">
            <el-input v-model="editManageForm.producinggoodsDO.productSizelength==''?'':editManageForm.producinggoodsDO.productSizelength"></el-input>
        </el-form-item>
        <el-form-item label="配盖：" prop="productCover">
            <el-input v-model="editManageForm.producinggoodsDO.productCover"></el-input>
        </el-form-item>
        <el-form-item label="箱唛：" prop="productBoxMark">
            <el-input v-model="editManageForm.producinggoodsDO.productBoxMark"></el-input>
        </el-form-item>
        <el-form-item label="标唛：" prop="productLabel">
            <el-input v-model="editManageForm.producinggoodsDO.productLabel"></el-input>
        </el-form-item>
        <el-form-item label="备注：" prop="prolistExplain">
            <el-input v-model="editManageForm.productionDO.prolistExplain" class="w400"></el-input>
        </el-form-item>
        </div>
    </el-form>
    
    <span slot="footer" class="dialog-footer">
        <el-button @click="editManageVisible = false">取 消</el-button>
        <el-button type="primary" @click="addManage">确 定</el-button>
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
   async ManageList() {
     if (this.chaManageForm.sorderCode!=''||this.chaManageForm.sorderTotalsum!=''||this.chaManageForm.sorderStatus!=''||this.chaManageForm.sorderWarehouse!='') {
       this.chaManageForm.pageCode=1;
       this.chaManageForm.pageSize=10;
     }
      const { data: res } = await this.$http.post("sc/Production/selectproduction",this.chaManageForm);
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
      const { data: res } = await this.$http.post("sc/Production/selectProductionbyid", param);
      this.editManageForm=res.body.SCProductionDO;
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
