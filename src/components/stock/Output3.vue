<template>
  <div class="min1500">
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>库存管理</el-breadcrumb-item>
      <el-breadcrumb-item>出库</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="退货出库" name="first">
          <el-form
            :inline="true"
            class="demo-form-inline search"
            :model="chaOrderFrom"
            ref="chaOrderFrom"
            label-width="90px"
            label-position="left"
          >
            <el-row :gutter="20" class="row">
              <el-col :span="24">
                <el-form-item label="订单编号：" prop="preturnCode">
                  <el-input class="_small" v-model="chaOrderFrom.preturnCode"></el-input>
                </el-form-item>

                <el-form-item label="供应商：" prop="supplierId">
                  <el-select
                    v-model="chaOrderFrom.supplierId"
                    placeholder="请选择"
                    class="_small"
                    @change="changeGongyingshang"
                  >
                    <el-option
                      v-for="item in supplier"
                      :key="item.supplierId"
                      :label="item.supName"
                      :value="item.supplierId"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="退货情况：" prop="preturnSituation">
                  <el-select
                    v-model="chaOrderFrom.preturnSituation"
                    placeholder="请选择"
                    class="_small"
                  >
                    <el-option value label="全部"></el-option>
                    <el-option value="0" label="待退货"></el-option>
                    <el-option value="1" label="部分退货"></el-option>
                    <el-option value="2" label="全部退货"></el-option>
                  </el-select>
                </el-form-item>

                <el-form-item>
                  <el-button @click="getList(1)">查 询</el-button>
                  <el-button type="primary" @click="ResetForm('chaOrderFrom')">重 置</el-button>
                  <!-- <el-button type="primary" @click="addOrderVisible = true">入 库</el-button> -->
                  <!-- <el-button type="primary" @click="editOrderVisible = true">重 置</el-button> -->
                  <!-- <el-button type="primary" @click="editOrderVisible = true;lookUpState = true">重 置</el-button> -->
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <el-button @click="addPurOutOrderVisible = true" type="primary">新 增</el-button>
          <!-- 表格 -->
          <el-table border :data="orderList" @selection-change="handleSelectionChange">
            <!-- <el-table-column type="selection" width="50px"></el-table-column> -->
            <el-table-column type="index" label="序号" align="center" width="50px"></el-table-column>
            <el-table-column prop="preturnCode" label="退货单号" width="180px" align="center"></el-table-column>
            <el-table-column prop="supplierDO.supName" label="供应商" width="250px" align="center"></el-table-column>
            <el-table-column prop="preturnAlltotal" label="退货总数量"></el-table-column>
            <!-- <el-table-column prop label="到货数量"></el-table-column> -->
            <el-table-column prop="preturnTotal" label="已退数量"></el-table-column>
            <el-table-column prop="preturnSituation" label="退货情况">
              <template slot-scope="scope">
                <span v-if="scope.row.preturnSituation == 0">待退货</span>
                <span v-if="scope.row.preturnSituation == 1">部分退货</span>
                <span v-if="scope.row.preturnSituation == 2">全部退货</span>
              </template>
            </el-table-column>
            <el-table-column prop="preturnProducer" label="制单人员"></el-table-column>

            <el-table-column prop="preturnTime" label="制单时间" width="200" align="center"></el-table-column>
            <el-table-column label="操作" width="90px" align="center" fixed="right">
              <template slot-scope="scope">
                <el-button
                  type="primary"
                  size="mini"
                  @click="showEditOrder(scope.row.preturnCode,0)"
                >出库</el-button>
              </template>
            </el-table-column>
          </el-table>

          <el-pagination
            @current-change="handleCurrentChange(1)"
            :current-page="currentPage"
            :page-size="10"
            layout="total, prev, pager, next"
            :total="total"
          ></el-pagination>
        </el-tab-pane>

        <el-tab-pane label="生产出库" name="second">
          <el-form
            :inline="true"
            class="demo-form-inline search"
            :model="chaOrderFrom"
            ref="chaOrderFrom"
            label-width="90px"
            label-position="left"
          >
            <el-row :gutter="20" class="row">
              <el-col :span="24">
                <el-form-item label="生产单号：" prop="preturnCode">
                  <el-input class="_small" v-model="chaOrderFrom.preturnCode"></el-input>
                </el-form-item>

                <el-form-item label="产品名称：" prop="preturnCode">
                  <el-input class="_small" v-model="chaOrderFrom.preturnCode"></el-input>
                </el-form-item>

                <el-form-item label="制单时间：" prop="preturnCode">
                  <el-date-picker
                    v-model="chaOrderFrom.time"
                    type="daterange"
                    value-format="yyyy-MM-dd"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                  ></el-date-picker>
                </el-form-item>

                <el-form-item>
                  <el-button @click="getList(1)">查 询</el-button>
                  <el-button type="primary" @click="ResetForm('chaOrderFrom')">重 置</el-button>
                  <el-button type="primary" @click="addProduceOrderVisible = true">出库1</el-button>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <!-- 表格 -->
          <el-table border :data="orderList" @selection-change="handleSelectionChange">
            <!-- <el-table-column type="selection" width="50px"></el-table-column> -->
            <el-table-column type="index" label="序号" align="center" width="50px"></el-table-column>
            <el-table-column prop="preturnCode" label="生产单号" width="180px" align="center"></el-table-column>
            <el-table-column prop label="产品名称" align="center"></el-table-column>
            <el-table-column prop label="产品规格" align="center"></el-table-column>
            <el-table-column prop label="制单人" align="center"></el-table-column>
            <el-table-column prop label="制单时间" align="center"></el-table-column>
            <el-table-column prop label="出库类型" align="center"></el-table-column>
            <el-table-column label="操作" width="90px" align="center" fixed="right">
              <template slot-scope="scope">
                <el-button
                  type="primary"
                  size="mini"
                  @click="showEditOrder(scope.row.preturnCode,0)"
                >出库</el-button>
              </template>
            </el-table-column>
          </el-table>

          <el-pagination
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-size="10"
            layout="total, prev, pager, next"
            :total="total"
          ></el-pagination>
        </el-tab-pane>

        <el-tab-pane label="销售出库" name="third">
          <el-form
            :inline="true"
            class="demo-form-inline search"
            :model="chaOrdertobeshippedForm"
            ref="chaOrdertobeshippedForm"
            label-width="90px"
            label-position="left"
          >
            <el-row :gutter="20" class="row">
              <el-col :span="24">
                <!-- 订单号 -->
                <el-form-item label="发货单号：" prop="deliveryCode">
                  <el-input class="w200" v-model="chaOrdertobeshippedForm.deliveryCode"></el-input>
                </el-form-item>
                <!-- 订单状态 -->
                <el-form-item label="发货方式：" prop="deliveryMode">
                  <el-input v-model="chaOrdertobeshippedForm.deliveryMode" class="w200"></el-input>
                </el-form-item>
                <!-- 查询按钮 -->
                <el-form-item>
                  <el-button @click="getOrdertobeshipped(1)">查 询</el-button>
                  <el-button type="primary" @click="ResetForm('chaOrdertobeshippedForm')">重 置</el-button>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <!-- 表格 -->
          <el-table
            ref="multipleTable"
            :data="orderList"
            style="width: 100%"
            border
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="index" label="序号" width="55"></el-table-column>
            <el-table-column prop="deliveryCode" label="发货单号"></el-table-column>
            <el-table-column prop="deliveryTime" label="发货日期"></el-table-column>
            <el-table-column prop="deliveryMode" label="发货方式"></el-table-column>
            <el-table-column prop="deliveryMan" label="制单人"></el-table-column>
            <el-table-column prop="deliveryTimenow" label="制单时间"></el-table-column>
            <el-table-column prop="deliveryNumber" label="总数量"></el-table-column>
            <el-table-column prop="deliveryStatus" label="审核状态" align="center">
              <template slot-scope="scope">
                <el-tag type="danger" v-if="scope.row.deliveryStatus=='0'">待审核</el-tag>
                <el-tag type="danger" v-if="scope.row.deliveryStatus=='1'">审核通过</el-tag>
                <el-tag type="danger" v-if="scope.row.deliveryStatus=='2'">审核不通过</el-tag>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="90px" align="center">
              <template slot-scope="scope">
                <el-button
                  @click="saleOrderOutput(scope.row.deliveryCode)"
                  type="primary"
                  size="mini"
                >出 库</el-button>
                <!-- <el-button
                  @click="showEditOrdertobeshipped(scope.row.deliveryCode,true,1)"
                  type="primary"
                  size="small"
                  :disabled="scope.row.deliveryStatus==0||scope.row.deliveryStatus==1 "
                >编 辑</el-button>
                <el-button
                  @click="deletebumen(scope.row.deliveryCode)"
                  type="danger"
                  size="small"
                  :disabled="scope.row.deliveryStatus==0||scope.row.deliveryStatus==1"
                >删 除</el-button>-->
              </template>
            </el-table-column>
          </el-table>

          <el-pagination
            @current-change="handleCurrentChange(3)"
            :current-page="currentPage"
            :page-size="10"
            layout="total, prev, pager, next"
            :total="total"
          ></el-pagination>
        </el-tab-pane>
      </el-tabs>
    </el-card>
    <!-- 新增销售订单 -->
    <!-- :title="addOrder?"新增销售订单":"编辑销售订单""  :visible.sync="addOrder || editOrder"-->
    <el-dialog
      title="新增退货出库单"
      :visible.sync="addOrderVisible"
      width="60%"
      :before-close="handleClose"
      @closed="dialogClosed('addOrderFrom')"
    >
      <!-- 新增销售订单表格 -->
      <el-form
        :inline="true"
        class="demo-form-inline search"
        :model="addOrderFrom"
        ref="addOrderFrom"
        label-width="90px"
        label-position="left"
      >
        <!-- 采购单号 -->
        <el-form-item label="退货单号：" prop="preturnCode">
          <el-input v-model="addOrderFrom.preturnCode" class="_small" disabled="true"></el-input>
        </el-form-item>
        <!-- 入库类型 -->
        <el-form-item label="出库类型：" prop="outboundType">
          <el-select v-model="addOrderFrom.outboundType" class="_small" disabled="true">
            <el-option value="0" label="退货出库"></el-option>
            <el-option value="1" label="生产出库"></el-option>
            <el-option value="2" label="销售出库"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="制单人：" prop="outboundProducer">
          <el-input v-model="addOrderFrom.outboundProducer" class="_small" disabled="true"></el-input>
        </el-form-item>
        <!-- 入库时间 -->
        <el-form-item label="出库日期：" prop="outboundTime">
          <el-date-picker
            v-model="addOrderFrom.outboundTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择日期"
            class="_small"
          ></el-date-picker>
        </el-form-item>

        <br />
        <el-button
          type="primary"
          @click="addGoods(addOrderFrom.preturnCode)"
          v-if="addOrderFrom.preturnCode != '无'"
        >选择出库商品</el-button>
        <el-button
          type="dange"
          @click="deleteAddPurGoods()"
          :disabled="selectedList.length == 0"
          v-if="addOrderFrom.preturnCode != '无'"
        >删除商品</el-button>

        <!-- 带有排序功能的商品table -->
        <!-- :default-sort="{prop: 'date', order: 'descending'}" -->
        <el-table
          :data="addOrderFrom.outboundGoolsDos"
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <!-- <el-table-column type="selection" width="55"></el-table-column> -->
          <el-table-column prop="supgoolssmallType" label="商品小类型"></el-table-column>
          <el-table-column prop="supgoolsId" label="商品名称"></el-table-column>
          <el-table-column prop="supgoolsSplicing" label="商品描述" align="center" width="200px"></el-table-column>
          <el-table-column prop="productThnumber" label="总数"></el-table-column>
          <el-table-column prop="sum" label="已出库数量"></el-table-column>
          <el-table-column prop="outboundgoolsNum" label="本次出库数量" width="110px" align="center"></el-table-column>
          <el-table-column prop="pcommodityUnit1" label="单位"></el-table-column>
          <el-table-column prop="preturnOutwarehouse1" label="出库仓库"></el-table-column>
          <el-table-column prop label="操作" align="center">
            <template slot-scope="scope">
              <el-button @click="addOrderMsg(scope.$index)" size="mini" type="primary">编辑</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="jsonofinboundgoolsTrack" type="expand" label="追踪号" width="70px">
            <template slot-scope="scope">
              <!-- <span>{{scope.row.deliverOrderListShow}}</span> -->
              <el-table :data="scope.row.jsonofinboundgoolsTrack" style="width: 50%" :border="true">
                <el-table-column prop="traceNo" align="center" label="追踪号"></el-table-column>
                <el-table-column prop="weight" label="数量" align="center"></el-table-column>
                <!-- <el-table-column label="单位" align="center"></el-table-column> -->
              </el-table>
            </template>
          </el-table-column>
        </el-table>

        <br />
        <el-form-item label="备注：" prop="outboundRemark">
          <el-input
            type="textarea"
            placeholder="请输入内容"
            v-model="addOrderFrom.outboundRemark"
            style="width:600px"
          ></el-input>
        </el-form-item>
      </el-form>

      <!-- 2个按钮 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="addOrderVisible = false">取 消</el-button>
        <el-button @click="addOutputOrder()" type="primary">确 认</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="选择商品"
      :visible.sync="choosePurchaseGoodsVisible"
      width="58%"
      :before-close="handleClose"
      @closed="dialogClosed('chooseGoodsForm')"
    >
      <!-- <el-button type="primary" size="small">添加</el-button> -->
      <el-table border stripe :data="purchaseGoodsList" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="40"></el-table-column>
        <el-table-column type="index" width="50px" label="序号" align="center"></el-table-column>
        <el-table-column prop="supgoolssmallType" label="商品小类型"></el-table-column>
        <el-table-column prop="supgoolsId" label="商品名称"></el-table-column>
        <el-table-column prop="supgoolsSplicing" label="商品描述" width="250px"></el-table-column>
        <el-table-column prop="xxx" label="库存"></el-table-column>
        <el-table-column prop="pcommodityUnit" label="单位"></el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="chooseGoodsFormCancel()">取 消</el-button>
        <el-button @click="chooseGoodsFormSava()" type="primary">保 存</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="选择出库单"
      :visible.sync="addPurOutOrderVisible"
      width="20%"
      :before-close="handleClose"
      @closed="dialogClosed('addPurOutOrderForm')"
    >
      <el-form
        :inline="true"
        class="demo-form-inline search"
        :model="addPurOutOrderForm"
        ref="addPurOutOrderForm"
        label-width="80px"
        label-position="left"
      >
        <el-form-item label="追踪号：" prop="traceNo">
          <el-input class="_small" v-model="addPurOutOrderForm.traceNo"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="showTraceNoEditOrder(0)" type="primary" size="small">新 增</el-button>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="addPurOutOrderVisible = false">取 消</el-button>
        <!-- <el-button @click="chooseGoodsFormSava()" type="primary">保 存</el-button> -->
      </span>
    </el-dialog>

    <!-- 新增生产出库单 -->
    <el-dialog
      title="新增生产出库单"
      :visible.sync="addProduceOrderVisible"
      width="60%"
      :before-close="handleClose"
      @closed="dialogClosed('addOrderFrom')"
    >
      <!-- 新增生产订单表格 -->
      <el-form
        :inline="true"
        class="demo-form-inline search"
        :model="addOrderFrom"
        ref="addOrderFrom"
        label-width="90px"
        label-position="left"
      >
        <el-form-item label="生产单号：" prop="preturnCode">
          <el-input v-model="addOrderFrom.preturnCode" class="_small" disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="出库类型：" prop="outboundProducer">
          <el-input v-model="addOrderFrom.outboundProducer" class="_small" disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="制单人：" prop="outboundProducer">
          <el-input v-model="addOrderFrom.outboundProducer" class="_small" disabled="true"></el-input>
        </el-form-item>

        <el-form-item label="出库日期：" prop="outboundTime">
          <el-date-picker
            v-model="addOrderFrom.outboundTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择日期"
            class="_small"
          ></el-date-picker>
        </el-form-item>

        <!-- 原材料出库 -->
        <el-table
          :data="addOrderFrom.outboundGoolsDos"
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="index" label="序号"></el-table-column>
          <el-table-column prop="supgoolssmallType" label="物料小类型"></el-table-column>
          <el-table-column prop="supgoolsId" label="物料名称"></el-table-column>
          <el-table-column prop="supgoolsSplicing" label="物料描述" align="center"></el-table-column>
          <el-table-column prop="supgoolsSplicing" label="库存" align="center"></el-table-column>
          <el-table-column prop="supgoolsSplicing" label="领料重量" align="center"></el-table-column>
          <el-table-column prop label="实际出库数量">
            <template slot-scope="scope">
              <el-input v-model="scope.row.outboundgoolsNum"></el-input>
            </template>
          </el-table-column>
          <el-table-column prop label="单位"></el-table-column>
          <el-table-column prop="preturnOutwarehouse" label="出库仓库"></el-table-column>

          <el-table-column prop label="操作" align="center">
            <template slot-scope="scope">
              <el-button @click="addOrderMsg(scope.$index)" size="mini" type="primary">编辑</el-button>
            </template>
          </el-table-column>

          <el-table-column prop="jsonofinboundgoolsTrack" type="expand" label="追踪码" width="100px">
            <template slot-scope="scope">
              <!-- <span>{{scope.row.deliverOrderListShow}}</span> -->
              <el-table :data="scope.row.jsonofinboundgoolsTrack" style="width: 50%" :border="true">
                <el-table-column prop="traceNo" align="center" label="追踪号"></el-table-column>
                <el-table-column prop="weight" label="数量" align="center"></el-table-column>
                <!-- <el-table-column label="出库仓库" align="center"></el-table-column> -->
              </el-table>
            </template>
          </el-table-column>
        </el-table>

        <!-- 半成品出库 -->
        半成品：
        <el-table
          :data="addOrderFrom.outboundGoolsDos"
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column prop="supgoolsSplicing" label="产品名称" align="center"></el-table-column>
          <el-table-column prop="supgoolsSplicing" label="规格" align="center"></el-table-column>
          <el-table-column prop="supgoolsSplicing" label="领料重量" align="center"></el-table-column>
          <!-- <el-table-column prop="supgoolsSplicing" label="单位" align="center"></el-table-column> -->
          <!-- <el-table-column prop="supgoolsSplicing" label="印刷版号/生产追踪号" align="center"></el-table-column> -->
          <el-table-column prop label="实际出库数量">
            <template slot-scope="scope">
              <el-input v-model="scope.row.outboundgoolsNum"></el-input>
            </template>
          </el-table-column>
          <el-table-column prop label="单位"></el-table-column>
          <el-table-column prop="preturnOutwarehouse" label="出库仓库"></el-table-column>

          <el-table-column prop label="操作" align="center">
            <template slot-scope="scope">
              <el-button @click="addOrderMsg(scope.$index)" size="mini" type="primary">编辑</el-button>
            </template>
          </el-table-column>

          <el-table-column prop="jsonofinboundgoolsTrack" type="expand" label="印刷版号" width="100px">
            <template slot-scope="scope">
              <!-- <span>{{scope.row.deliverOrderListShow}}</span> -->
              <el-table :data="scope.row.jsonofinboundgoolsTrack" style="width: 50%" :border="true">
                <el-table-column prop="traceNo" align="center" label="追踪号"></el-table-column>
                <el-table-column prop="weight" label="数量" align="center"></el-table-column>
                <!-- <el-table-column label="出库仓库" align="center"></el-table-column> -->
              </el-table>
            </template>
          </el-table-column>
        </el-table>

        <!-- 纸箱 -->
        <!-- 需要追踪号吗 -->
        纸箱：
        <el-table
          :data="addOrderFrom.outboundGoolsDos"
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column label="序号" type="index"></el-table-column>
          <el-table-column prop="supgoolsSplicing" label="纸箱小类型" align="center"></el-table-column>
          <el-table-column prop="supgoolsSplicing" label="纸箱名称" align="center"></el-table-column>
          <el-table-column prop="supgoolsSplicing" label="克重" align="center"></el-table-column>
          <el-table-column prop="supgoolsSplicing" label="长" align="center"></el-table-column>
          <el-table-column prop="supgoolsSplicing" label="宽" align="center"></el-table-column>
          <el-table-column prop="supgoolsSplicing" label="高" align="center"></el-table-column>
          <el-table-column prop="supgoolsSplicing" label="数量" align="center"></el-table-column>
          <el-table-column prop="supgoolsSplicing" label="单位" align="center"></el-table-column>
          <el-table-column prop="supgoolsSplicing" label="实际出库数量" align="center"></el-table-column>
          <el-table-column prop label="操作" align="center">
            <template slot-scope="scope">
              <el-button @click="addOrderMsg(scope.$index)" size="mini" type="primary">编辑</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="jsonofinboundgoolsTrack" type="expand" label="追踪码" width="100px">
            <template slot-scope="scope">
              <!-- <span>{{scope.row.deliverOrderListShow}}</span> -->
              <el-table :data="scope.row.jsonofinboundgoolsTrack" style="width: 50%" :border="true">
                <el-table-column prop="traceNo" align="center" label="追踪号"></el-table-column>
                <el-table-column prop="weight" label="数量" align="center"></el-table-column>
                <el-table-column label="出库仓库" align="center"></el-table-column>
              </el-table>
            </template>
          </el-table-column>
        </el-table>

        <!-- 袋子 -->
        <!-- 需要追踪号吗 -->
        袋子：
        <el-table
          :data="addOrderFrom.outboundGoolsDos"
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column label="序号" type="index"></el-table-column>
          <el-table-column prop="supgoolsSplicing" label="袋子小类型" align="center"></el-table-column>
          <el-table-column prop="supgoolsSplicing" label="袋子名称" align="center"></el-table-column>
          <el-table-column prop="supgoolsSplicing" label="长" align="center"></el-table-column>
          <el-table-column prop="supgoolsSplicing" label="宽" align="center"></el-table-column>
          <el-table-column prop="supgoolsSplicing" label="厚" align="center"></el-table-column>
          <el-table-column prop="supgoolsSplicing" label="数量" align="center"></el-table-column>
          <el-table-column prop="supgoolsSplicing" label="单位" align="center"></el-table-column>
          <el-table-column prop="supgoolsSplicing" label="实际出库数量" align="center"></el-table-column>
          <el-table-column prop label="操作" align="center">
            <template slot-scope="scope">
              <el-button @click="addOrderMsg(scope.$index)" size="mini" type="primary">编辑</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="jsonofinboundgoolsTrack" type="expand" label="追踪码" width="100px">
            <template slot-scope="scope">
              <!-- <span>{{scope.row.deliverOrderListShow}}</span> -->
              <el-table :data="scope.row.jsonofinboundgoolsTrack" style="width: 50%" :border="true">
                <el-table-column prop="traceNo" align="center" label="追踪号"></el-table-column>
                <el-table-column prop="weight" label="数量" align="center"></el-table-column>
                <el-table-column label="出库仓库" align="center"></el-table-column>
              </el-table>
            </template>
          </el-table-column>
        </el-table>

        <br />
        <el-form-item label="备注：" prop="outboundProducer">
          <el-input
            type="textarea"
            placeholder="请输入内容"
            v-model="addOrderFrom.inboundRemark"
            style="width:600px"
          ></el-input>
        </el-form-item>
      </el-form>

      <!-- 2个按钮 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="addProduceOrderVisible = false">取 消</el-button>
        <el-button @click="addOutputOrder()" type="primary">确 认</el-button>
      </span>
    </el-dialog>

    <!-- 新增销售出库单 -->
    <el-dialog
      title="新增销售出库单"
      :visible.sync="addSaleOrderVisible"
      width="70%"
      :before-close="handleClose"
      @closed="dialogClosed('addOrderFrom')"
    >
      <!-- 新增销售订单表格 -->
      <el-form
        :inline="true"
        class="demo-form-inline search"
        :model="addOrderFrom"
        ref="addOrderFrom"
        label-width="90px"
        label-position="left"
      >
        <el-form-item label="发货单号：" prop="preturnCode">
          <el-input v-model="addOrderFrom.preturnCode" class="_small" disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="出库类型：" prop="outboundProducer">
          <el-select v-model="addOrderFrom.outboundType" class="_small" disabled="true">
            <el-option value="0" label="退货出库"></el-option>
            <el-option value="1" label="生产出库"></el-option>
            <el-option value="2" label="销售出库"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="制单人：" prop="outboundProducer">
          <el-input v-model="addOrderFrom.outboundProducer" class="_small" disabled="true"></el-input>
        </el-form-item>

        <el-form-item label="出库日期：" prop="outboundTime">
          <el-date-picker
            v-model="addOrderFrom.outboundTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择日期"
            class="_small"
          ></el-date-picker>
        </el-form-item>

        <br />

        <!-- <el-button
          type="primary"
          @click="addGoods(addOrderFrom.preturnCode)"
          v-if="addOrderFrom.preturnCode != '无'"
        >选择出库商品</el-button>
        <el-button
          type="dange"
          @click="deleteAddPurGoods()"
          :disabled="selectedList.length == 0"
          v-if="addOrderFrom.preturnCode != '无'"
        >删除商品</el-button>-->

        <!-- 原材料出库 -->
        <el-table
          :data="addOrderFrom.outboundGoolsDos"
          style="width: 100%"
          @selection-change="handleSelectionChange"
          border
          default-expand-all
          class="tb"
        >
          <!-- <el-table-column type="index" label="序号"></el-table-column>
          <el-table-column prop label="商品名称"></el-table-column>
          <el-table-column prop label="产品名称"></el-table-column>
          <el-table-column prop label="商品描述"></el-table-column>
          <el-table-column prop label="尺寸"></el-table-column>
          <el-table-column prop label="个/包"></el-table-column>
          <el-table-column prop label="包/箱"></el-table-column>
          <el-table-column prop label="个/箱"></el-table-column>
          <el-table-column prop label="数量"></el-table-column>
          <el-table-column prop label="外箱尺寸"></el-table-column>
          <el-table-column prop label="立方"></el-table-column>
          <el-table-column prop label="单个克重"></el-table-column>
          <el-table-column prop label="已发货数量" width="100px"></el-table-column>
          <el-table-column prop label="本次发货数量" width="110px"></el-table-column>

          <el-table-column prop label="操作" align="center">
            <template slot-scope="scope">
              <el-button @click="addOrderMsg(scope.$index)" size="mini" type="primary">编辑</el-button>
            </template>
          </el-table-column>

          <el-table-column prop="jsonofinboundgoolsTrack" type="expand" label="生产追踪号" width="100px">
            <template slot-scope="scope">
              <el-table :data="scope.row.jsonofinboundgoolsTrack" style="width: 50%" :border="true">
                <el-table-column prop="traceNo" align="center" label="追踪号"></el-table-column>
                <el-table-column prop="weight" label="数量" align="center"></el-table-column>
                <el-table-column label="出库仓库" align="center"></el-table-column>
              </el-table>
            </template>
          </el-table-column>-->
          <el-table-column type="selection" width="35" align="center"></el-table-column>
          <el-table-column type="expand" label="展开" width="50">
            <template slot-scope="props">
              <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label>{{ props.row.producinggoodsDOs.productSplicing }}</el-form-item>
              </el-form>
              <el-table :data="props.row.jsonofinboundgoolsTrack" style="width: 50%" :border="true">
                <el-table-column prop="traceNo" align="center" label="追踪号"></el-table-column>
                <el-table-column prop="weight" label="数量" align="center"></el-table-column>
              </el-table>
            </template>
          </el-table-column>
          <el-table-column label="销售单号" prop="sorderCode" width="140"></el-table-column>
          <el-table-column label="客户名称" prop="cusName"></el-table-column>
          <el-table-column label="合同号" prop="sorderWarehouse"></el-table-column>
          <el-table-column label="交货地点" prop="sorderAddress"></el-table-column>
          <el-table-column label="交货方式" prop="sorderTotalsum"></el-table-column>
          <el-table-column label="商品名称" prop="producinggoodsDOs.productName"></el-table-column>
          <el-table-column label="数量" prop="commodityNumber"></el-table-column>
          <el-table-column label="已发数量" prop="sorderAuqntityshipped"></el-table-column>
          <el-table-column label="发货数量" prop="dorderNumbers">
            <template scope="scope">
              <el-input v-model="scope.row.dorderNumbers" :disabled="true"></el-input>
            </template>
          </el-table-column>
          <el-table-column prop label="操作" align="center">
            <template slot-scope="scope">
              <el-button @click="addOrderMsg(scope.$index)" size="mini" type="primary">编辑</el-button>
            </template>
          </el-table-column>
          <!-- <el-table-column prop="jsonofinboundgoolsTrack" type="expand" label="追踪号" width="70px">
            <template slot-scope="scope">
              <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label>{{ scope.row.producinggoodsDOs.productSplicing }}</el-form-item>
              </el-form>
              <el-table :data="scope.row.jsonofinboundgoolsTrack" style="width: 50%" :border="true">
                <el-table-column prop="traceNo" align="center" label="追踪号"></el-table-column>
                <el-table-column prop="weight" label="数量" align="center"></el-table-column>
              </el-table>
            </template>
          </el-table-column> -->
        </el-table>

        <br />
        <el-form-item label="备注：" prop="outboundRemark">
          <el-input
            type="textarea"
            placeholder="请输入内容"
            v-model="addOrderFrom.outboundRemark"
            style="width:600px"
          ></el-input>
        </el-form-item>
      </el-form>

      <!-- 2个按钮 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="addSaleOrderVisible = false">取 消</el-button>
        <el-button @click="addOutputOrder()" type="primary">确 认</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="追踪号信息"
      :visible.sync="traceNodialogVisible"
      width="40%"
      :before-close="handleClose"
      @closed="handleTraceNodialogClose()"
    >
      <el-table border stripe :data="traceNoList" @selection-change="handleSelectionChange1">
        <!-- <el-table-column type="selection" width="40px"></el-table-column> -->
        <el-table-column type="index" width="50px" label="序号" align="center"></el-table-column>
        <el-table-column prop="traceNo" label="追踪号">
          <template slot-scope="scope">
            <el-input v-model="scope.row.traceNo"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="weight" label="重量">
          <template slot-scope="scope">
            <el-input v-model="scope.row.weight" type="number"></el-input>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          align="center"
          width="90px"
          v-if="addOrderFrom.preturnCode != '无'"
        >
          <template slot-scope="scope">
            <el-button size="mini" type="danger" @click="deleteRow(scope.$index)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-button @click="traceNoList.push({})" v-if="addOrderFrom.preturnCode != '无'">增加行</el-button>
      <span slot="footer" class="dialog-footer">
        <el-button @click="traceNodialogVisible = false">取 消</el-button>
        <el-button @click="traceNodialogSave(index)" type="primary">保 存</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      //分页相关数据
      currentPage: 0,
      total: 0,
      // 页面表单数据

      // 12/04
      // 查询表单
      chaOrderFrom: {
        preturnCode: "",
        supplierId: "",
        preturnSituation: "",
        // porderArrivalstatus:'',
        pageCode: 1,
        pageSize: 10
      },
      chaOrder: {},
      // 新增表单可见
      addOrderVisible: false,
      // 新增表单数据
      addOrderFrom: {
        preturnCode: "", //退货单号
        outboundType: "", //出库类型
        outboundTime: "", //出库时间
        outboundProducer: "", //制单人
        outboundGoolsDos: [], //商品详情
        outboundRemark: "" //出库备注
      },

      // 其他商品选择表单
      chooseGoodsForm: {
        addOrEdit: 0, // 最终选择的商品要去哪 1 添加 2 编辑、查看
        goodsBigType: "原纸", // 商品大类型
        goodsChoosed: [] // 选择商品的集合
      },
      orderList: [],
      activeName: "first",
      supplier: [], //供应商数组
      purchaseGoodsList: [], //退货
      selectedList: [], //选择集合，可供多处使用
      choosePurchaseGoodsVisible: false,

      addPurOutOrderVisible: false, // 新增出库单可见
      addPurOutOrderForm: {
        traceNo: "" //追踪号
      },

      traceNoList: [], //追踪号列表

      // 退货出库
      traceNodialogVisible: false, //追踪号信息dialog 是否显示

      // 生产出库
      addProduceOrderVisible: false, //新增生产出库单 原材料出库是否可见
      addProduceOrderVisibleB: false, //新增生产出库单 半成品出库是否可见
      // 销售出库
      addSaleOrderVisible: false, //新增销售出库单 出库单是否可见
      chaOrdertobeshippedForm: {
        pageCode: 1, //当前页
        pageSize: 10, //每页显示的记录数
        deliveryCode: "",
        deliveryStatus: "1",
        deliveryMode: ""
      },
      chaOrdertobeshipped: {},

      unit: [], // 单位
      warehouseOptions: [] // 仓库列表
    };
  },
  created() {
    //自己写的方法
    this.getWarehouseOptions(); // 仓库
    this.queryUnit(); // 单位
    this.querySupplier();
    this.getList(1);
    this.getCookie();
  },
  methods: {
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

    // 自己写的方法
    // 获取仓库列表
    async getWarehouseOptions() {
      const { data: res } = await this.$http.post("jc/Basic/selectwarehousing");
      // console.log('仓库')
      // console.log(res)
      this.warehouseOptions = res; //如何取
    },
    // 查询库存单位
    async queryUnit() {
      const { data: res } = await this.$http.post("jc/Basic/selectstorenum");
      // console.log('单位')
      // console.log(res)
      this.unit = res;
    },

    handleCurrentChange(val) {
      if (val == 1) {
        // 退货
        this.chaOrder.pageCode = val;
        this.getList();
      }
      if (val == 2) {
        this.chaOrder.pageCode = val;
        this.getList();
      }
      if (val == 3) {
        // 销售
        this.chaOrdertobeshipped.pageCode = val;
        this.getOrdertobeshipped();
      }
    },

    dialogClosed(val) {
      this.$refs[val].resetFields();
    },
    async addGoods(preturnCode) {
      const { data: res } = await this.$http.post("jh/preturn/dtjresultMap", {
        preturnCode: preturnCode
      });

      console.log("res");

      console.log(res.body.result[0]);

      // 遍历获取商品id数组
      let ids = [];
      res.body.result[0].returnListDos.forEach((item, index, arr) => {
        ids.push(item.suppliergoolsId);
      });
      // console.log("ids")
      // console.log(ids)

      const { data: res1 } = await this.$http.post(
        "jc/suppliergoods/selectSuppliergoolslistmore",
        ids
      );

      console.log("res1");
      console.log(res1);
      this.purchaseGoodsList = res1;
      // 获取规格后再获取相对应商品在此退货订单中的采购总数量
      this.purchaseGoodsList.forEach((purGood, index, arr) => {
        res.body.result[0].returnListDos.forEach((item, index, arr) => {
          if (purGood.suppliergoolsId == item.suppliergoolsId) {
            purGood.productThnumber = item.productThnumber;
          }
        });
      });
      console.log(this.purchaseGoodsList);

      const { data: res2 } = await this.$http.post(
        "kc/outbound/selectallgools",
        {
          preturnCode: res.body.result[0].preturnCode,
          suppliergoolsId: ids
        }
      );
      console.log("res2");
      console.log(res2);

      this.purchaseGoodsList.forEach((purGood, index, arr) => {
        res2.forEach((item, index, arr) => {
          if (purGood.suppliergoolsId == item.suppliergoolsId) {
            purGood.sum = item.sum;
          }
        });
      });
      console.log("this.purchaseGoodsList");
      console.log(this.purchaseGoodsList);

      // 追踪号
      const { data: res3 } = await this.$http.post(
        "kc/outbound/selectgoolsmsg",
        {
          preturnCode: res.body.result[0].preturnCode,
          suppliergoolsId: ids
        }
      );
      console.log("res3");
      console.log(res3);
      let traceNoList = res3.body.result;
      console.log(traceNoList);
      // 暂存
      let arr = [];
      console.log(ids);
      ids.forEach((id, index, array) => {
        traceNoList[id].forEach((traceNo, index, array) => {
          // arr.concat(traceNo) 无效？？
          console.log(id);
          console.log(traceNo);
          traceNo.forEach((t, index, array) => {
            arr.push(t);
          });
        });
        traceNoList[id] = arr;
        arr = [];
      });
      this.purchaseGoodsList.forEach((good, index, array) => {
        this.purchaseGoodsList[index].jsonofinboundgoolsTrack =
          traceNoList[good.suppliergoolsId];
      });

      // 已出库数量
      const { data: res4 } = await this.$http.post(
        "kc/outbound/selectallgools",
        {
          preturnCode: res.body.result[0].preturnCode,
          suppliergoolsId: ids
        }
      );
      console.log("res4");
      console.log(res4);
      let outputCountList = res4;
      console.log(outputCountList);
      this.purchaseGoodsList.forEach((purGood, index, arr) => {
        purGood.sum = 0;
        res4.forEach((item, index, arr) => {
          if (purGood.suppliergoolsId == item.suppliergoolsId) {
            purGood.sum = item.sum;
          }
        });
      });

      // 根据退货单号和商品id查询商品单位和仓库
      const { data: res5 } = await this.$http.post("kc/outbound/selectmsg", {
        preturnCode: res.body.result[0].preturnCode,
        suppliergoolsId: ids
      });
      console.log("res5");
      console.log(res5);

      this.purchaseGoodsList.forEach((purGood, index, arr) => {
        res5.body.result.forEach((item, index, arr) => {
          if (purGood.suppliergoolsId == item.suppliergoolsId) {
            // 仓库
            // purGood.preturnOutwarehouse = item.basicId;
            this.warehouseOptions.forEach((warehouse, index, array) => {
              if (warehouse.basicId == item.basicId) {
                purGood.basicId = item.basicId;
                purGood.preturnOutwarehouse1 = warehouse.basicRetainone;
              }
            });

            // 单位
            // purGood.pcommodityUnit = Number(item.pcommodityUnit);
            this.unit.forEach((u, index, array) => {
              if (u.basicId == item.pcommodityUnit) {
                purGood.pcommodityUnit = Number(item.pcommodityUnit);
                purGood.pcommodityUnit1 = u.basicRetainone;
              }
            });
          }
        });
      });
      console.log("this.purchaseGoodsList");
      console.log(this.purchaseGoodsList);

      // 计算所有商品的本次出库数量
      let sum = 0;
      this.purchaseGoodsList.forEach((good, index, array) => {
        good.jsonofinboundgoolsTrack.forEach((traceMsg, index, array) => {
          sum = this.add(Number(traceMsg.weight), sum);
        });
        good.outboundgoolsNum = sum;
        sum = 0;
      });

      this.choosePurchaseGoodsVisible = true;
    },
    // 选择商品表单取消
    chooseGoodsFormCancel() {
      this.choosePurchaseGoodsVisible = false;
      this.selectedList = [];
      this.purchaseGoodsList = [];
    },
    // 选择商品表单保存
    chooseGoodsFormSava() {
      let length = this.addOrderFrom.outboundGoolsDos.length;

      if (length == 0) {
        //长度为0，直接添加元素
        this.selectedList.forEach((item, index, arr) => {
          this.addOrderFrom.outboundGoolsDos.push(item);
        });
      } else {
        for (let i = 0; i < this.selectedList.length; i++) {
          for (let j = 0; j < length; j++) {
            if (
              this.addOrderFrom.outboundGoolsDos[j].suppliergoolsId ==
              this.selectedList[i].suppliergoolsId
            ) {
              break;
            }
            if (j == length - 1) {
              this.addOrderFrom.outboundGoolsDos.push(this.selectedList[i]);
            }
          }
        }
      }
      // 有元素被过滤，跳出提示
      if (
        length + this.selectedList.length >
        this.addOrderFrom.outboundGoolsDos.length
      ) {
        this.$message({
          type: "info",
          message: "部分商品已经存在!"
        });
      }
      // const { data: res } = await this.$http.post(
      //   "jc/suppliergoods/selectSuppliergoolslist",
      //   { params: { lab: this.chooseGoodsForm.goodsBigType } }
      // );

      this.chooseGoodsFormCancel();
    },

    // 供应商查询
    async querySupplier() {
      const { data: res } = await this.$http.post(
        "jc/supplier/selectSupplier",
        { params: { a: "" } }
      );
      console.log("供应商信息");
      console.log(res);

      res.body.rows.forEach(e => {
        let x = {
          supName: e.supName,
          supplierId: e.supplierId
        };
        this.supplier.push(x);
      });

      console.log(this.supplier);
    },
    async getList(val) {
      // const { data: res1 } = await this.$http.post("jh/purchase/dtjresultMap");
      // this.chaOrderFrom.pageCode = 1;
      if (val) {
        // 重新点击时，需要重置查询页数
        this.chaOrderFrom.pageCode = 1;
        this.chaOrder = JSON.parse(JSON.stringify(this.chaOrderFrom));
        console.log(1111);
      }
      const { data: res } = await this.$http.post(
        "/jh/preturn/preturnselect",
        this.chaOrder
      );

      // console.log(res1);

      this.orderList = res.body.rows;
      this.total = res.body.total;

      console.log("--------------------");
      console.log(this.orderList);
    },
    ResetForm(formName) {
      this.$refs[formName].resetFields();
    },

    // 出库
    showEditOrder(preturnCode, outboundType) {
      this.addOrderFrom.preturnCode = preturnCode;
      this.addOrderFrom.outboundType = outboundType + "";
      this.addOrderFrom.outboundGoolsDos = [];
      // console.log(porderCode);
      this.addOrderVisible = true;
    },
    // 根据追踪号新增出库单
    async showTraceNoEditOrder(outboundType) {
      this.addOrderFrom.preturnCode = "无";
      this.addOrderFrom.outboundType = outboundType + "";
      this.addOrderFrom.outboundGoolsDos = [];

      // 根据追踪号查询商品入库数量
      const { data: res } = await this.$http.post("kc/inbound/selecttrack", {
        traceNo: this.addPurOutOrderForm.traceNo
      });

      //追踪号存在
      if (res.body.respCode == 200) {
        // 商品信息
        let goodMsg = [];
        // 商品实体
        let good = {};

        // 根据追踪号查询商品单位和id
        const { data: res1 } = await this.$http.post(
          "kc/inbound/selectinboundgools",
          { traceNo: this.addPurOutOrderForm.traceNo }
        );

        let ids = [];
        ids.push(res1.body.result.suppliergoolsId);
        // 获取对应供应商品的基础信息
        const { data: res3 } = await this.$http.post(
          "jc/suppliergoods/selectSuppliergoolslistmore",
          ids
        );
        good.supgoolssmallType = res3[0].supgoolssmallType;
        good.supgoolsId = res3[0].supgoolsId;
        good.supgoolsSplicing = res3[0].supgoolsSplicing;

        // 商品id
        good.suppliergoolsId = res1.body.result.suppliergoolsId;

        // 商品入库数量
        good.productThnumber = res.body.result;

        // 单位
        this.unit.forEach((u, index, array) => {
          if (u.basicId == res1.body.result.pcommodityUnit) {
            good.pcommodityUnit = Number(res1.body.result.pcommodityUnit);
            good.pcommodityUnit1 = u.basicRetainone;
          }
        });
        // 仓库
        this.warehouseOptions.forEach((warehouse, index, array) => {
          if (warehouse.basicId == res1.body.result.basicId) {
            good.basicId = res1.body.result.basicId;
            good.preturnOutwarehouse1 = warehouse.basicRetainone;
          }
        });
        // 本次出库数量（默认设置为入库数量）
        good.outboundgoolsNum = res.body.result;
        // 追踪号数组
        good.jsonofinboundgoolsTrack = [];
        good.jsonofinboundgoolsTrack.push({
          traceNo: this.addPurOutOrderForm.traceNo,
          weight: good.productThnumber
        });

        // 根据追踪号查询商品出库数量
        const { data: res2 } = await this.$http.post(
          "kc/outbound/selecttrack",
          { traceNo: this.addPurOutOrderForm.traceNo }
        );

        goodMsg.push(good);

        this.addOrderFrom.outboundGoolsDos = goodMsg;

        this.addPurOutOrderVisible = false;
        this.addOrderVisible = true;
      } else {
        this.$message({
          type: "info",
          message: res.body.msg
        });
        this.addPurOutOrderVisible = false;
      }

      // console.log(porderCode);
    },
    getCookie: function() {
      var storage = window.localStorage;
      this.addOrderFrom.outboundProducer = storage.getItem("username");
    },

    // 删除添加采购订单中的商品
    deleteAddPurGoods() {
      for (let i = 0; i < this.addOrderFrom.outboundGoolsDos.length; i++) {
        for (let j = 0; j < this.selectedList.length; j++) {
          if (
            this.addOrderFrom.outboundGoolsDos[i].suppliergoolsId ==
            this.selectedList[j].suppliergoolsId
          ) {
            this.addOrderFrom.outboundGoolsDos.splice(i--, 1);
            break;
          }
        }
      }
    },
    // 新增出库单
    async addOutputOrder() {
      if (this.addOrderFrom.outboundGoolsDos.length == 0) {
        this.addOrderVisible = false;
        this.$message({
          type: "info",
          message: "出库商品为空，添加出库单失败！"
        });
        return;
      }
      const { data: res } = await this.$http.post(
        "kc/outbound/createorder",
        this.addOrderFrom
      );

      if (res.body.respCode == 200) {
        this.$message({
          type: "success",
          message: res.body.msg
        });
      } else {
        this.$message({
          type: "info",
          message: res.body.msg
        });
      }

      this.addOrderVisible = false;
      this.addSaleOrderVisible = false;
    },
    // 相加
    add(arg1, arg2) {
      return (Math.round(arg1 * 100) + Math.round(arg2 * 100)) / 100;
    },
    // 相乘
    multiple(arg1, arg2) {
      return (Math.round(arg1 * 100) * Math.round(arg2 * 100)) / 10000;
    },

    // 关联送货单号，参数为入库单商品索引
    addOrderMsg(index) {
      this.orderList = []
      this.index = index;
      if (
        this.addOrderFrom.outboundGoolsDos[index].jsonofinboundgoolsTrack !==
        undefined
      ) {
        this.traceNoList = JSON.parse(
          JSON.stringify(
            this.addOrderFrom.outboundGoolsDos[index].jsonofinboundgoolsTrack
          )
        );
      }
      this.traceNodialogVisible = true;
    },
    // 追踪号信息保存
    traceNodialogSave(index) {
      console.log(index);
      // 排空
      let arr = [];
      this.traceNoList.forEach((item, index, array) => {
        if (item.traceNo !== undefined && item.weight !== undefined) {
          arr.push(item);
        }
      });
      // 使用深拷贝
      this.addOrderFrom.outboundGoolsDos[index].jsonofinboundgoolsTrack = arr;

      // 遍历，获得此次入库数量
      let sum = 0;
      arr.forEach((item, index, array) => {
        sum = this.add(sum, Number(item.weight));
      });
      this.addOrderFrom.outboundGoolsDos[index].outboundgoolsNum = sum;
      this.addOrderFrom.outboundGoolsDos[index].outboundgoolsNum.toFixed(2);
      // 深拷贝，刷一下
      this.addOrderFrom.outboundGoolsDos = JSON.parse(
        JSON.stringify(this.addOrderFrom.outboundGoolsDos)
      );
      if (arr.length < this.traceNoList.length) {
        this.$message({
          type: "warning",
          message: "存在部分追踪号信息不完全！"
        });
      }
      this.traceNoList = [{}];
      this.traceNodialogVisible = false;
    },
    // 送货单信息删除行
    deleteRow(val) {
      console.log(val);
      this.traceNoList.splice(val, 1);
    },
    // 查询销售发货通知单
    async getOrdertobeshipped(val) {
      if (val) {
        // 重新点击时，需要重置查询页数
        this.chaOrdertobeshippedForm.pageCode = 1;
        this.chaOrdertobeshipped = JSON.parse(
          JSON.stringify(this.chaOrdertobeshippedForm)
        );
        console.log(1111);
      }
      const { data: res } = await this.$http.post(
        "xs/delivery/selectDeliveryNotice",
        this.chaOrdertobeshipped
      );
      this.orderList = res.body.rows;
      this.total = res.body.total;
    },
    // 处理标签页切换
    handleClick(tab, event) {
      if (tab.paneName == "first") {
        this.getList(1);
      } else if (tab.paneName == "second") {
      } else if (tab.paneName == "third") {
        this.getOrdertobeshipped(1);
      }
    },
    //
    async saleOrderOutput(deliveryCode) {
      let param = new URLSearchParams();
      param.append("deliveryCode", deliveryCode);
      const { data: res } = await this.$http.post(
        "xs/delivery/selectDeliveryNoticebyid",
        param
      );

      // 商品
      for (
        let index = 0;
        index < res.body.DeliveryNoticeDO.deliveryOrderDOs.length;
        index++
      ) {
        res.body.DeliveryNoticeDO.deliveryOrderDOs[index].productSplicing =
          res.body.DeliveryNoticeDO.deliveryOrderDOs[
            index
          ].producinggoodsDOs.productSplicing;
        res.body.DeliveryNoticeDO.deliveryOrderDOs[index].cusName =
          res.body.DeliveryNoticeDO.deliveryOrderDOs[
            index
          ].saleOrderDO.customerDOs.cusName;
        res.body.DeliveryNoticeDO.deliveryOrderDOs[index].sorderWarehouse =
          res.body.DeliveryNoticeDO.deliveryOrderDOs[
            index
          ].saleOrderDO.sorderWarehouse;
        res.body.DeliveryNoticeDO.deliveryOrderDOs[index].sorderAddress =
          res.body.DeliveryNoticeDO.deliveryOrderDOs[
            index
          ].saleOrderDO.sorderAddress;
        res.body.DeliveryNoticeDO.deliveryOrderDOs[index].sorderTotalsum =
          res.body.DeliveryNoticeDO.deliveryOrderDOs[
            index
          ].saleOrderDO.sorderTotalsum;
        res.body.DeliveryNoticeDO.deliveryOrderDOs[index].productName =
          res.body.DeliveryNoticeDO.deliveryOrderDOs[
            index
          ].producinggoodsDOs.productName;
        res.body.DeliveryNoticeDO.deliveryOrderDOs[index].commodityNumber =
          res.body.DeliveryNoticeDO.deliveryOrderDOs[
            index
          ].saleOrderDO.commodityListDOs[0].commodityNumber;
        res.body.DeliveryNoticeDO.deliveryOrderDOs[
          index
        ].sorderAuqntityshipped =
          res.body.DeliveryNoticeDO.deliveryOrderDOs[
            index
          ].saleOrderDO.sorderAuqntityshipped;
        res.body.DeliveryNoticeDO.deliveryOrderDOs[index].sorderTotalsum =
          res.body.DeliveryNoticeDO.deliveryOrderDOs[
            index
          ].saleOrderDO.sorderTotalsum;
      }

      this.addOrderFrom.outboundGoolsDos =
        res.body.DeliveryNoticeDO.deliveryOrderDOs;

      this.addOrderFrom.preturnCode = deliveryCode; //需要设置为关联单号
      this.addOrderFrom.outboundType = "2";
      this.addSaleOrderVisible = true;
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
.el-table {
  margin-top: 15px;
}
.chongzhi {
  margin-top: 0px;
}
.hu {
  width: 133px;
}
.hu2 {
  width: 90px;
}
.mar {
  margin-left: 15px;
}
// 控制添加按钮左右
.btn {
  margin-top: 20px;
  margin-left: 920px;
}
hr {
  margin: 15px 0px;
}
.a {
  text-align: right;
}
.el-form-item {
  ._small {
    width: 150px;
  }
}
.demo-table-expand {
  text-align: center;
  .el-form-item {
    margin-bottom: 0px;
  }
}
</style>  