<template>
  <div class="min1500">
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>销售管理</el-breadcrumb-item>
      <el-breadcrumb-item>销售订单管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-form
        :inline="true"
        class="demo-form-inline"
        :model="chaOrdermanagementForm"
        ref="chaOrdermanagementRef"
      >
        <!-- 订单号 -->
        <el-form-item label="订单号：" prop="sorderCode">
          <el-input v-model="chaOrdermanagementForm.sorderCode"></el-input>
        </el-form-item>
        <!-- 订单状态 -->
        <el-form-item label="订单状态：" prop="sorderStatus">
           <el-select v-model="chaOrdermanagementForm.sorderStatus" placeholder="请选择" class="w100">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <!-- 手机号码 -->
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
        <!-- 收货姓名 -->
        <el-form-item label="合同号：" prop="sorderWarehouse">
          <el-input v-model="chaOrdermanagementForm.sorderWarehouse"></el-input>
        </el-form-item>
        <!-- 收货省份 -->
        <el-form-item label="交货方式：" prop="sorderTotalsum">
          <el-input v-model="chaOrdermanagementForm.sorderTotalsum"></el-input>
        </el-form-item>
        <!-- 查询按钮 -->
        <el-form-item >
          <el-button @click="OrdermanagementList">查 询</el-button>
          <el-button type="primary" @click="chaordermanagementForm">重 置</el-button>
        </el-form-item>
      </el-form>
      <!-- </el-row> -->
      <!-- 4个按钮 -->
      <el-button type="success" @click="addOrdermanagementVisible = true">新 建</el-button>
      <el-button type="warning" @click="selectedqi(1)" :disabled="selectedList.length == 0">提 审</el-button>
      <el-button type="danger" @click="selectedqi(9)" :disabled="selectedList.length == 0">结 束</el-button>
      <!-- 表格 -->
      <el-table
        :data="ordermanagementList"
        striped
        border
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
      <el-table-column type="selection" width="35"></el-table-column>
        <el-table-column type="index" label="序号" width="55"></el-table-column>
        <el-table-column prop="sorderCode" label="订单号" width="140px"></el-table-column>
        <el-table-column prop="customerDOs.cusName" label="客户名称"></el-table-column>
        <el-table-column prop="sorderWarehouse" label="合同号"></el-table-column>
        <el-table-column prop="sorderAddress" label="交货地点"></el-table-column>
        <el-table-column prop="sorderTotalsum" label="交货方式"></el-table-column>
        <el-table-column prop="sorderAllnumber" label="总数量"></el-table-column>
        <el-table-column prop="sorderTotal" label="总金额"></el-table-column>
        <el-table-column prop="sorderPayamount" label="预付金额" ></el-table-column>
        <el-table-column prop="sorderDeliverytime" label="交货日期"></el-table-column>
        <el-table-column prop="sorderCreatetime" label="下单日期"></el-table-column>
        <el-table-column prop="sorderStatus" label="订单状态" align="center">
          <!-- <template slot-scope="scope">
          <el-tag type="danger" v-if="scope.row.sorderStatus=='0'">初始化</el-tag>
          <el-tag type="danger" v-if="scope.row.sorderStatus=='1'">待初审</el-tag>
          <el-tag type="danger" v-if="scope.row.sorderStatus=='2'">初审未通过</el-tag>
          <el-tag type="danger" v-if="scope.row.sorderStatus=='3'">待复审</el-tag>
          <el-tag type="danger" v-if="scope.row.sorderStatus=='4'">复审未通过</el-tag>
          <el-tag type="danger" v-if="scope.row.sorderStatus=='5'">生产中</el-tag>
          <el-tag type="danger" v-if="scope.row.sorderStatus=='6'">待发货</el-tag>
          <el-tag type="danger" v-if="scope.row.sorderStatus=='7'">部分发货</el-tag>
          <el-tag type="danger" v-if="scope.row.sorderStatus=='8'">全部发货</el-tag>
          <el-tag type="danger" v-if="scope.row.sorderStatus=='9'">已完成</el-tag>
          </template > -->
          <template slot-scope="scope">
          <el-tag type="danger" v-if="scope.row.sorderStatus=='0'">初始化</el-tag>
          <el-tag type="danger" v-if="scope.row.sorderStatus=='1'">待初审</el-tag>
          <el-tag type="danger" v-if="scope.row.sorderStatus=='2'">初审未通过</el-tag>
          <el-tag type="danger" v-if="scope.row.sorderStatus=='3'">待复审</el-tag>
          <el-tag type="danger" v-if="scope.row.sorderStatus=='4'">复审未通过</el-tag>
          <el-tag type="danger" v-if="scope.row.sorderStatus=='5'">生产中</el-tag>
          <el-tag type="danger" v-if="scope.row.sorderStatus=='6'">待发货</el-tag>
          <el-tag type="danger" v-if="scope.row.sorderStatus=='7'">部分发货</el-tag>
          <el-tag type="danger" v-if="scope.row.sorderStatus=='8'">全部发货</el-tag>
          <el-tag type="danger" v-if="scope.row.sorderStatus=='9'">已完成</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="220px" style="text-align:center">
          <template slot-scope="scope">
              <el-button @click="showEditOrdermanagement(scope.row.sorderCode,'0',scope.row.sorderStatus)" type="success" size="small">查 看</el-button>
             <el-button @click="showEditOrdermanagement(scope.row.sorderCode,'1')" type="primary" size="small" :disabled="scope.row.sorderStatus==1 || scope.row.sorderStatus==3 ||scope.row.sorderStatus==5 ||scope.row.sorderStatus==6 ||scope.row.sorderStatus==7 ||scope.row.sorderStatus==8 ||scope.row.sorderStatus==9"  >编 辑</el-button>
            <el-button @click="deletebumen(scope.row.sorderCode)" type="danger" size="small" :disabled="scope.row.sorderStatus==1 || scope.row.sorderStatus==3 ||scope.row.sorderStatus==5 ||scope.row.sorderStatus==6 ||scope.row.sorderStatus==7 ||scope.row.sorderStatus==8 ||scope.row.sorderStatus==9"  >删 除</el-button>

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
    <!-- 新增销售订单 -->

    <el-dialog :title=" '新增销售订单' " :visible.sync="addOrdermanagementVisible" width="70%" :before-close="handleClose" @closed="dialogClosed">
        <div class="fenge">基础信息</div>
        <el-form ref="addOrdermanagementRef" label-width="115px" :inline="true" :model="addOrdermanagementForm" :rules="addOrdermanagementRules">
          <el-form-item label="客户名称：" prop="customerId">
          <el-select v-model="addOrdermanagementForm.customerId" class="sel" placeholder="请选择" >
            <el-option
              v-for="item in kehu"
              :key="item.customerId"
              :label="item.cusName"
              :value="item.customerId">
            </el-option>
          </el-select>
        </el-form-item>
          <el-form-item label="交货地点：" prop="sorderAddress">
            <el-input v-model="addOrdermanagementForm.sorderAddress"></el-input>
          </el-form-item>
          <el-form-item label="合同号：" prop="sorderWarehouse">
            <el-input v-model="addOrdermanagementForm.sorderWarehouse"></el-input>
          </el-form-item>
          <el-form-item label="交货方式：" prop="sorderTotalsum">
            <el-input v-model="addOrdermanagementForm.sorderTotalsum"></el-input>
          </el-form-item>
          <el-form-item label="货币类型：" prop="sorderCurrecytype">
            <!-- <el-input v-model="addOrdermanagementForm.sorderCurrecytype"></el-input> -->
             <el-select class="w200" v-model="addOrdermanagementForm.sorderCurrecytype" placeholder="请选择">
                  <el-option
                    v-for="item in huobileixing"
                    :key="item.basicId"
                    :label="item.basicRetainone"
                    :value="item.basicId">
                  </el-option>
                </el-select>
          </el-form-item>
          <el-form-item label="交货日期：" prop="sorderDeliverytime">
            <!-- <el-input v-model="addOrdermanagementForm.sorderDeliverytime"></el-input> -->
            <el-date-picker
            v-model="addOrdermanagementForm.sorderDeliverytime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择日期" class="w200">
          </el-date-picker>
          </el-form-item>
          
          <div class="fenge1">商品信息</div>
        <el-button type="primary" @click="shengchanshangping">添加生产商品</el-button>
        <el-button type="primary" @click="selected">删除商品</el-button>
        <!-- <el-button type="primary" @click="chaigoushangpin">添加采购商品</el-button> -->
      <el-table
    style="width: 100%" border class="tb" default-expand-all @selection-change="handleSelectionChange"
    :data="addOrdermanagementForm.commodityListDOs" >
    <!-- default-expand-all -->
    <el-table-column type="selection" width="35" align="center"></el-table-column>
    <el-table-column type="expand"  label="展开"  width="50" >
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="">
            {{ props.row ? props.row.productSplicing : '' }}
          </el-form-item>
          <br>
          <el-form-item label="特备注意：">
          <el-input v-model="props.row.commodityRemark" ></el-input>
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>
    <el-table-column label="商品名称" prop="productName" width="150px"></el-table-column>
    <el-table-column label="产品类别" prop="productType" width="150px"></el-table-column>
    <el-table-column label="产品尺寸" prop="productChanpchic"></el-table-column>
    <el-table-column label="个/包" prop="productInnerbao"></el-table-column>
    <el-table-column label="包/箱" prop="productOutbao"></el-table-column>
    <el-table-column label="个/箱" prop="productOnege" ></el-table-column>
   
    <el-table-column label="外箱尺寸" width="150px">
      <template scope="scope">
        {{scope.row.productSizelength}}*{{scope.row.productSizelength}}*{{scope.row.productSizelength}}
      </template>
    </el-table-column>
    <el-table-column label="立方" prop="lifang"></el-table-column>
    <el-table-column label="净/毛" prop="productOneke"></el-table-column>
     <el-table-column label="数量">
      <template scope="scope">
        <el-input v-model="scope.row.commodityNumber" @blur="jisuan"></el-input>
      </template>
    </el-table-column>
    <el-table-column label="单价">
      <template scope="scope">
        <el-input v-model="scope.row.commodityPrice" @blur="jisuan"></el-input>
      </template>
    </el-table-column>
    <el-table-column label="总计" >
      <template scope="scope">
        {{scope.row.commodityNumber*scope.row.commodityPrice}}</template>
    </el-table-column>
  </el-table>
  <div class="fenge1">合计信息</div>
    <el-form-item label="快递费：" prop="sorderExpressfee">
      <el-input v-model="addOrdermanagementForm.sorderExpressfee" @blur="jisuan" @focus="fukong"></el-input>
    </el-form-item>
    <el-form-item label="运费：" prop="sorderFreigh">
      <el-input v-model="addOrdermanagementForm.sorderFreigh" @blur="jisuan" @focus="fukong1"></el-input>
    </el-form-item>
     <el-form-item label="版费：" prop="sorderEditionfee">
      <el-input v-model="addOrdermanagementForm.sorderEditionfee" @blur="jisuan" @focus="fukong2"></el-input>
    </el-form-item>
    <el-form-item label="小单费：" prop="sorderSinglefee">
      <el-input v-model="addOrdermanagementForm.sorderSinglefee" @blur="jisuan" @focus="fukong3"></el-input>
    </el-form-item>
    <el-form-item label="总数量：" prop="sorderAllnumber">
      <el-input v-model="addOrdermanagementForm.sorderAllnumber" disabled></el-input>
    </el-form-item>
    <el-form-item label="总金额：" prop="sorderTotal">
      <el-input v-model="addOrdermanagementForm.sorderTotal" disabled></el-input>
    </el-form-item>
    <el-form-item label="预收款金额：" prop="sorderPayamount">
      <el-input v-model="addOrdermanagementForm.sorderPayamount"></el-input>
    </el-form-item>
    <el-form-item label="备注：" prop="sorderRemark0">
      <el-input class="w400" v-model="addOrdermanagementForm.sorderRemark0"></el-input>
    </el-form-item>
  </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addOrdermanagementVisible = false">取 消</el-button>
        <el-button type="primary" @click="addOrdermanagement">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog :title=" '新增生产商品' " :visible.sync="addOrdermanagementVisible1" width="55%" :before-close="handleClose" @closed="dialogClosed1" >
        <el-form ref="shengchantRef" label-width="110px" :inline="true" :model="shengchanFrom" :rules="addOrdermanagementRules">
          <el-form-item label="生产商品类型：" prop="productLeixing">
            <el-select v-model="shengchanFrom.productLeixing" placeholder="请选择">
              <el-option
                v-for="item in shengchan"
                :key="item.id"
                :label="item.value"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        <el-button type="primary" @click="shengchanshangping">查询</el-button>
      <el-table
    :data="shengchanlist"
    style="width: 100%" border  @selection-change="handleSelectionChange">
    <!-- default-expand-all -->
     <el-table-column type="selection" width="35" align="center"></el-table-column>
    <el-table-column type="expand"  label="展开"  width="50">
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand" >
          <el-form-item label="">
            {{ props.row ? props.row.productSplicing : '' }}
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>
    <el-table-column label="商品名称" prop="productName"></el-table-column>
    <el-table-column label="产品名称" prop="productType"></el-table-column>
    <el-table-column label="尺寸" prop="productChanpchic"></el-table-column>
    <el-table-column label="个/包" prop="productInnerbao"></el-table-column>
    <el-table-column label="包/箱" prop="productOutbao"></el-table-column>
    <el-table-column label="个/箱" prop="productOnege"></el-table-column>
    <el-table-column label="外箱尺寸" prop="productSizelength" width="150px">
      <template slot-scope="scope">
        {{scope.row.productSizelength}}*{{scope.row.productSizewide}}*{{scope.row.productSizehight}}
      </template>
    </el-table-column>
    <el-table-column label="单个克重" prop="productOneke"></el-table-column>
  </el-table>
    
  </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addOrdermanagementVisible1 = false">取 消</el-button>
        <el-button type="primary" @click="shengchancaigou">确 定</el-button>
      </span>
    </el-dialog>
    <!-- <el-dialog :title=" '新增采购商品' " :visible.sync="addOrdermanagementVisible2" width="55%" :before-close="handleClose">
        <el-form ref="form" label-width="110px" :inline="true" :model="caigouFrom" :rules="addOrdermanagementRules">
          <el-form-item label="采购商品类型：">
            <el-select v-model="caigouFrom.lab" placeholder="请选择">
              <el-option
                v-for="item in caigou"
                :key="item.id"
                :label="item.value"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        <el-button type="primary" @click="chaigoushangpin">查询</el-button>
      <el-table
    :data="chaigoulist"
    style="width: 100%" border  @selection-change="handleSelectionChange">

    <el-table-column type="selection" width="35" align="center"></el-table-column>
    <el-table-column type="expand"  label="展开"  width="50">
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand" >
          <el-form-item label="">
            {{ props.row.productSplicing}}
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>
    <el-table-column label="商品名称" prop="supgoolsId"></el-table-column>
    <el-table-column label="商品类型" prop="supgoolssmallType"></el-table-column>
    <el-table-column label="商品描述" prop="supgoolsSplicing"></el-table-column>
  </el-table>
    
  </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addOrdermanagementVisible2 = false">取 消</el-button>
        <el-button type="primary"  @click="shengchancaigou">确 定</el-button>
      </span>
    </el-dialog> -->
    <!-- 编辑销售订单 -->
    <el-dialog
      :title=" '编辑销售订单' "
      :visible.sync="editOrdermanagementVisible"
      width="70%"
      :before-close="handleClose"
    >
     <div class="fenge">基础信息</div>
        <el-form ref="addOrdermanagementRef" label-width="115px" :inline="true" :model="editOrdermanagementForm" :rules="addOrdermanagementRules">
          <el-form-item label="客户名称：" prop="customerId">
          <el-select v-model="editOrdermanagementForm.customerId" class="sel" placeholder="请选择" :disabled="xianshi">
            <el-option
              v-for="item in kehu"
              :key="item.customerId"
              :label="item.cusName"
              :value="item.customerId">
            </el-option>
          </el-select>
        </el-form-item>
          <el-form-item label="交货地点：" prop="">
            <el-input v-model="editOrdermanagementForm.sorderAddress" :disabled="xianshi"></el-input>
          </el-form-item>
          <el-form-item label="合同号：" prop="sorderWarehouse">
            <el-input v-model="editOrdermanagementForm.sorderWarehouse" :disabled="xianshi"></el-input>
          </el-form-item>
          <el-form-item label="交货方式：" prop="sorderTotalsum">
            <el-input v-model="editOrdermanagementForm.sorderTotalsum" :disabled="xianshi"></el-input>
          </el-form-item>
          <el-form-item label="货币类型：" prop="sorderCurrecytype">
            <!-- <el-input v-model="editOrdermanagementForm.sorderCurrecytype" :disabled="xianshi"></el-input> -->
            <el-select v-model="editOrdermanagementForm.sorderCurrecytype" class="w200" placeholder="请选择">
                  <el-option
                    v-for="item in huobileixing"
                    :key="item.basicId"
                    :label="item.basicRetainone"
                    :value="item.basicId">
                  </el-option>
                </el-select>
          </el-form-item>
          <el-form-item label="交货日期：" prop="sorderDeliverytime">
            <!-- <el-input v-model="editOrdermanagementForm.sorderDeliverytime" :disabled="xianshi"></el-input> -->
            <el-date-picker
            v-model="editOrdermanagementForm.sorderDeliverytime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择日期" class="w200">
          </el-date-picker>
          </el-form-item>
          
          <div class="fenge1">商品信息</div>

        <el-button v-if="!xianshi" type="primary" @click="shengchanshangping" :disabled="xianshi">添加生产商品</el-button>
        <el-button type="primary" v-if="!xianshi" @click="selected" :disabled="xianshi">删除商品</el-button>
        <!-- <el-button type="primary" @click="chaigoushangpin">添加采购商品</el-button> -->
      <el-table
    style="width: 100%" border class="tb" default-expand-all @selection-change="handleSelectionChange"
    :data="editOrdermanagementForm.commodityListDOs" >
    <!-- default-expand-all -->
    <el-table-column type="selection" width="35" align="center"></el-table-column>
    <el-table-column type="expand"  label="展开"  width="50" >
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="" >
            {{ props.row ? props.row.productSplicing : '' }}
          </el-form-item>
          <br>
          <el-form-item label="特备注意：">
          <el-input v-model="props.row.commodityRemark" :disabled="xianshi"></el-input>
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>
    <el-table-column label="商品名称" prop="productName" width="150px"></el-table-column>
    <el-table-column label="产品类别" prop="productType" width="150px"></el-table-column>
    <el-table-column label="产品尺寸" prop="productChanpchic"></el-table-column>
    <el-table-column label="个/包" prop="productInnerbao"></el-table-column>
    <el-table-column label="包/箱" prop="productOutbao"></el-table-column>
    <el-table-column label="个/箱" prop="productOnege" ></el-table-column>
   
    <el-table-column label="外箱尺寸" width="150px">
      <template scope="scope">
        {{scope.row.productSizehight}}*{{scope.row.productSizelength}}*{{scope.row.productSizewide}}
      </template>
    </el-table-column>
    <el-table-column label="立方" prop="lifang"></el-table-column>
    <el-table-column label="净/毛" prop="productOneke"></el-table-column>
     <el-table-column label="数量">
      <template scope="scope">
        <el-input v-model="scope.row.commodityNumber" @blur="jisuan" :disabled="xianshi"></el-input>
      </template>
    </el-table-column>
    <el-table-column label="单价">
      <template scope="scope">
        <el-input v-model="scope.row.commodityPrice" @blur="jisuan" :disabled="xianshi"></el-input>
      </template>
    </el-table-column>
    <el-table-column label="总计" >
      <template scope="scope">
        {{scope.row.commodityNumber*scope.row.commodityPrice}}</template>
    </el-table-column>
  </el-table>
  <div class="fenge1">合计信息</div>
    <el-form-item label="快递费：" prop="sorderExpressfee">
      <el-input v-model="editOrdermanagementForm.sorderExpressfee" @blur="jisuan"  @focus="fukong" :disabled="xianshi"></el-input>
    </el-form-item>
    <el-form-item label="运费：" prop="sorderFreigh">
      <el-input v-model="editOrdermanagementForm.sorderFreigh" @blur="jisuan"  @focus="fukong1" :disabled="xianshi"></el-input>
    </el-form-item>
     <el-form-item label="版费：" prop="sorderEditionfee">
      <el-input v-model="editOrdermanagementForm.sorderEditionfee" @blur="jisuan"  @focus="fukong2" :disabled="xianshi"></el-input>
    </el-form-item>
    <el-form-item label="小单费：" prop="sorderSinglefee">
      <el-input v-model="editOrdermanagementForm.sorderSinglefee" @blur="jisuan"  @focus="fukong3" :disabled="xianshi"></el-input>
    </el-form-item>
    <el-form-item label="总数量：" prop="sorderAllnumber">
      <el-input v-model="editOrdermanagementForm.sorderAllnumber"  disabled></el-input>
    </el-form-item>
    <el-form-item label="总金额：" prop="sorderTotal">
      <el-input v-model="editOrdermanagementForm.sorderTotal" disabled></el-input>
    </el-form-item>
    <el-form-item label="预收款金额：" prop="sorderPayamount">
      <el-input v-model="editOrdermanagementForm.sorderPayamount" :disabled="xianshi"></el-input>
    </el-form-item>
    <el-form-item label="备注：" prop="sorderRemark0">
      <el-input class="w400" :disabled="xianshi" v-model="editOrdermanagementForm.sorderRemark0"></el-input>
    </el-form-item>
    <div class="fenge1" v-if='xianshi1'>初审信息</div>
    <el-form-item label="审核人：" prop="sorderChushen" v-if='xianshi1'>
      <el-input v-model="editOrdermanagementForm.sorderChushen" :disabled="xianshi"></el-input>
    </el-form-item>
     <el-form-item label="审核结果："  prop="sorderStatus" v-if='xianshi1'>
      <el-radio v-model="editOrdermanagementForm.sorderStatus" label='3'  :disabled="xianshi">通过</el-radio>
      <el-radio v-model="editOrdermanagementForm.sorderStatus" label='2'  :disabled="xianshi">驳回</el-radio>
    </el-form-item>
    <el-form-item label="审核时间：" prop="sorderChushentime" v-if='xianshi1'>
      <el-input v-model="editOrdermanagementForm.sorderChushentime" :disabled="xianshi"></el-input>
    </el-form-item> 
    <el-form-item label="审核描述："  prop="sorderChushendesc" v-if='xianshi1'>
      <el-input class="w400" v-model="editOrdermanagementForm.sorderChushendesc" :disabled="xianshi"></el-input>
    </el-form-item>
    <div class="fenge1" v-if='xianshi2'>复审信息</div>
    <el-form-item label="审核人："  prop="sorderFushen" v-if='xianshi2'>
      <el-input v-model="editOrdermanagementForm.sorderFushen" :disabled="xianshi"></el-input>
    </el-form-item>
     <el-form-item label="审核结果：" v-if='xianshi2'>
      <el-radio  label="5" v-model="editOrdermanagementForm.sorderStatus" :disabled="xianshi">通过</el-radio>
      <el-radio  label="4" v-model="editOrdermanagementForm.sorderStatus" :disabled="xianshi">驳回</el-radio>
    </el-form-item>
    <el-form-item label="审核时间："  prop="sorderFushentime" v-if='xianshi2'>
      <el-input v-model="editOrdermanagementForm.sorderFushentime" :disabled="xianshi"></el-input>
    </el-form-item>
    <el-form-item label="审核描述："  prop="sorderFushendesc" v-if='xianshi2'>
      <el-input class="w400" v-model="editOrdermanagementForm.sorderFushendesc" :disabled="xianshi"></el-input>
    </el-form-item>
  </el-form>
        <span slot="footer" class="dialog-footer">
        <el-button @click="editOrdermanagementVisible = false">取 消</el-button>
        <el-button type="primary" @click="editOrdermanagement" v-if="!xianshi">确 定</el-button>
      </span>
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
        productgoodsIdList:[],
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
      huobileixing:[],
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
      const { data: res1 } = await this.$http.post("jc/Basic/selectpaymode");
      this.kehu = res;
      this.huobileixing=res1;
    },
   async shengchanshangping(){
     if (this.addOrdermanagementVisible == true) {
        this.productgoodsIdList = this.addOrdermanagementForm.commodityListDOs.map(
          item => {
            return item.productgoodsId;
          }
        );
      } else {
        console.log('--------------');
        
        console.log(this.editOrdermanagementForm.commodityListDOs);
        
        this.productgoodsIdList = this.editOrdermanagementForm.commodityListDOs.map(
          item => {
            
            return parseInt(item.productgoodsId);
          }
        );
      }
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
    fukong(){
       if(this.addOrdermanagementForm.sorderExpressfee=='0'){
        this.addOrdermanagementForm.sorderExpressfee=''
      }
    },
    fukong1(){
       if(this.addOrdermanagementForm.sorderFreigh=='0'){
        this.addOrdermanagementForm.sorderFreigh=''
      }
    },
    fukong2(){
       if(this.addOrdermanagementForm.sorderEditionfee=='0'){
        this.addOrdermanagementForm.sorderEditionfee=''
      }
    },
    fukong3(){
       if(this.addOrdermanagementForm.sorderSinglefee=='0'){
        this.addOrdermanagementForm.sorderSinglefee=''
      }
    },
    jisuan() {
      // if(addOrdermanagementForm.sorderExpressfee=='0'){
      //   addOrdermanagementForm.sorderExpressfee==''
      // }
      // if(addOrdermanagementForm.sorderFreigh=='0'){
      //   addOrdermanagementForm.sorderFreigh==''
      // }
      // if(addOrdermanagementForm.sorderEditionfee=='0'){
      //   addOrdermanagementForm.sorderEditionfee==''
      // }
      // if(addOrdermanagementForm.sorderSinglefee=='0'){
      //   addOrdermanagementForm.sorderSinglefee==''
      // }
      this.addOrdermanagementForm.sorderAllnumber=0;
      this.addOrdermanagementForm.sorderTotal=0;
      if(this.addOrdermanagementVisible==true){
        for (
        let index = 0; index < this.addOrdermanagementForm.commodityListDOs.length; index++) {
        if (isNaN(this.addOrdermanagementForm.commodityListDOs[index].commodityNumber) || isNaN(this.addOrdermanagementForm.commodityListDOs[index].commodityPrice)) {
          continue;
        }
        this.addOrdermanagementForm.sorderAllnumber += parseFloat(
          this.addOrdermanagementForm.commodityListDOs[index].commodityNumber
        );

        this.addOrdermanagementForm.sorderTotal +=
          parseFloat(this.addOrdermanagementForm.commodityListDOs[index].commodityPrice) *
          parseFloat(this.addOrdermanagementForm.commodityListDOs[index].commodityNumber);
          console.log(this.addOrdermanagementForm.sorderTotal);
          var tatal=this.addOrdermanagementForm.sorderTotal
      }
      if(this.addOrdermanagementForm.sorderExpressfee==''){
        this.addOrdermanagementForm.sorderExpressfee=0
      }
      if(this.addOrdermanagementForm.sorderFreigh==''){
        this.addOrdermanagementForm.sorderFreigh=0
      }
      if(this.addOrdermanagementForm.sorderEditionfee==''){
        this.addOrdermanagementForm.sorderEditionfee=0
      }
      if(this.addOrdermanagementForm.sorderSinglefee==''){
        this.addOrdermanagementForm.sorderSinglefee=0
      }
      
      // this.addOrdermanagementForm.sorderExpressfee== '' ? 0      :this.addOrdermanagementForm.sorderExpressfee
      // this.addOrdermanagementForm.sorderFreigh==''?0:this.addOrdermanagementForm.sorderFreigh
      // this.addOrdermanagementForm.sorderEditionfee==''?0:this.addOrdermanagementForm.sorderEditionfee
      // this.addOrdermanagementForm.sorderSinglefee==''?0:this.addOrdermanagementForm.sorderSinglefee
      
       this.addOrdermanagementForm.sorderTotal=parseFloat(this.addOrdermanagementForm.sorderTotal)+parseFloat(this.addOrdermanagementForm.sorderExpressfee)+parseFloat(this.addOrdermanagementForm.sorderFreigh)+parseFloat(this.addOrdermanagementForm.sorderEditionfee)+parseFloat(this.addOrdermanagementForm.sorderSinglefee);

      }else if(this.editOrdermanagementVisible==true){
        this.editOrdermanagementForm.sorderTotal=0;
        this.editOrdermanagementForm.sorderAllnumber=0;
        for (
        let index = 0; index < this.editOrdermanagementForm.commodityListDOs.length; index++) {
        if (isNaN(this.editOrdermanagementForm.commodityListDOs[index].commodityNumber) || isNaN(this.editOrdermanagementForm.commodityListDOs[index].commodityPrice)) {
          continue;
        }
        this.editOrdermanagementForm.sorderAllnumber += parseFloat(
          this.editOrdermanagementForm.commodityListDOs[index].commodityNumber
        );

        this.editOrdermanagementForm.sorderTotal +=
          parseFloat(this.editOrdermanagementForm.commodityListDOs[index].commodityPrice) *
          parseFloat(this.editOrdermanagementForm.commodityListDOs[index].commodityNumber);
          console.log(this.editOrdermanagementForm.sorderTotal);
          var tatal=this.editOrdermanagementForm.sorderTotal
      }
       this.editOrdermanagementForm.sorderTotal=parseFloat(this.editOrdermanagementForm.sorderTotal)+parseFloat(this.editOrdermanagementForm.sorderExpressfee)+parseFloat(this.editOrdermanagementForm.sorderFreigh)+parseFloat(this.editOrdermanagementForm.sorderEditionfee)+parseFloat(this.editOrdermanagementForm.sorderSinglefee);

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
      res.sorderCurrecytype=Number(res.sorderCurrecytype);
      for(let index = 0; index < res.commodityListDOs.length; index++){
        res.commodityListDOs[index].productSplicing = res.commodityListDOs[index].producinggoodsDOs.productSplicing;
        res.commodityListDOs[index].productName=res.commodityListDOs[index].producinggoodsDOs.productName;
        res.commodityListDOs[index].productType=res.commodityListDOs[index].producinggoodsDOs.productType;
        res.commodityListDOs[index].productChanpchic=res.commodityListDOs[index].producinggoodsDOs.productChanpchic;
        res.commodityListDOs[index].productInnerbao=res.commodityListDOs[index].producinggoodsDOs.productInnerbao;
        res.commodityListDOs[index].productOutbao=res.commodityListDOs[index].producinggoodsDOs.productOutbao;
        res.commodityListDOs[index].productOnege=res.commodityListDOs[index].producinggoodsDOs.productOnege;
        res.commodityListDOs[index].productSizehight=res.commodityListDOs[index].producinggoodsDOs.productSizehight;
        res.commodityListDOs[index].productSizelength=res.commodityListDOs[index].producinggoodsDOs.productSizelength;
        res.commodityListDOs[index].productSizewide=res.commodityListDOs[index].producinggoodsDOs.productSizewide;
        res.commodityListDOs[index].lifang=res.commodityListDOs[index].producinggoodsDOs.lifang;
        res.commodityListDOs[index].productOneke=res.commodityListDOs[index].producinggoodsDOs.productOneke;
      }
      
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
    },
     async deleteRow(){
        if(this.addOrdermanagementVisible==true){
             for (let index = 0; index < this.delarr.length; index++) {
           for (let i = 0; i < this.addOrdermanagementForm.commodityListDOs.length; i++) {
              if(this.delarr[index]==this.addOrdermanagementForm.commodityListDOs[i].productgoodsId)
              this.addOrdermanagementForm.commodityListDOs.splice(i,1);
           }
         }
        }else if(this.editOrdermanagementVisible==true){
           console.log('**********************');
          for (let index = 0; index < this.delarr.length; index++) {
           for (let i = 0; i < this.editOrdermanagementForm.commodityListDOs.length; i++) {
              if(this.delarr[index]==this.editOrdermanagementForm.commodityListDOs[i].productgoodsId)
              this.editOrdermanagementForm.commodityListDOs.splice(i,1);
           }
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
      var chongfu=0;
        if(this.addOrdermanagementForm.commodityListDOs.length>=1||this.editOrdermanagementForm.commodityListDOs.length>=1){
          if(this.addOrdermanagementVisible==true){
            const needAdd = [];
          this.selectedList.forEach(item => {
            if (this.productgoodsIdList.indexOf(item.productgoodsId) === -1) {
              needAdd.push(item);
            } else {
              chongfu ++;
            }
          });
          this.addOrdermanagementForm.commodityListDOs = [
            ...this.addOrdermanagementForm.commodityListDOs,
            ...needAdd
          ];
            // var arr=this.addOrdermanagementForm.commodityListDOs.concat(this.selectedList);
            //   var hash=[];//一定要在这里置空啊
            //   for (var i = 0; i < arr.length; i++) {
            //     for (var j = i+1; j < arr.length; j++) {
            //       if(arr[i].productgoodsId==arr[j].productgoodsId){
            //         ++i;//如果一样就继续往下循环
            //         chongfu++;
            //       }
            //     }
            //       hash.push(arr[j]);
            //   }
            //   charu=this.selectedList.length-chongfu;
            //   this.addOrdermanagementForm.commodityListDOs=hash;
            //   this.$message({
            //     type: "info",
            //     message:"此次添加有重复数据，重复数据:"+chongfu+"条，插入"+charu+"条！"
            //   });
          }else if(this.editOrdermanagementVisible==true){
            const needAdd = [];
          this.selectedList.forEach(item => {
            if (this.productgoodsIdList.indexOf(item.productgoodsId) === -1) {
              needAdd.push(item);
            } else {
              chongfu ++;
            }
          });
          this.editOrdermanagementForm.commodityListDOs = [
            ...this.editOrdermanagementForm.commodityListDOs,
            ...needAdd
          ];


            // var arr=this.editOrdermanagementForm.commodityListDOs.concat(this.selectedList);
            //   var hash=[];//一定要在这里置空啊
            //   for (var i = 0; i < arr.length; i++) {
            //     for (var j = i+1; j < arr.length; j++) {
            //       if(arr[i].productgoodsId==arr[j].productgoodsId){
            //         ++i;//如果一样就继续往下循环
            //          chongfu++;
            //       }
            //     }
            //       hash.push(arr[i]);
            //   }
            //    charu=this.selectedList.length-chongfu;
            //   this.editOrdermanagementForm.commodityListDOs=hash;
            //   this.$message({
            //     type: "info",
            //     message:"此次添加有重复数据，重复数据:"+chongfu+"条，插入"+charu+"条！"
            //   });
          }
        }else{
          for (let index = 0; index < this.selectedList.length; index++) {
            if(this.addOrdermanagementVisible==true){
              this.addOrdermanagementForm.commodityListDOs.push(this.selectedList[index]);
            }else if(this.editOrdermanagementVisible==true){
              this.editOrdermanagementForm.commodityListDOs.push(this.selectedList[index]);
          }
        }
          
    }
      const charu = this.selectedList.length - chongfu;
      this.$message({
        type: "info",
        message: chongfu > 0 ? `此次添加有重复数据，重复数据${chongfu}条，成功插入${charu}条` : `此次成功插入${charu}条`
      });
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
//   .fenge1{
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
  .w200{
   width: 200px;
 }
  .sel{
    width: 203px;
  }
</style>  
