<template>
  <div class="min1500">
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>库存管理</el-breadcrumb-item>
      <el-breadcrumb-item>出入库查询</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="入库查询" name="first">
          <el-form
            :inline="true"
            class="demo-form-inline search"
            :model="chaInOrderFrom"
            ref="chaInOrderFrom"
            label-width="90px"
            label-position="left"
          >
            <el-row :gutter="20" class="row">
              <el-col :span="24">
                <el-form-item label="入库单号：" prop="inboundReceipt">
                  <el-input class="_small" v-model="chaInOrderFrom.inboundReceipt"></el-input>
                </el-form-item>
                <el-form-item label="关联单号：" prop="porderCode">
                  <el-input v-model="chaInOrderFrom.porderCode" class="_small"></el-input>
                </el-form-item>
                <el-form-item label="入库类型：" prop="inboundType">
                  <el-select v-model="chaInOrderFrom.inboundType" placeholder="请选择" class="_small">
                    <el-option value="0" label="采购入库"></el-option>
                    <el-option value="1" label="生产入库"></el-option>
                    <el-option value="2" label="生产退料入库"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="入库状态：" prop="inboundStatus">
                  <el-select
                    v-model="chaInOrderFrom.inboundStatus"
                    placeholder="请选择"
                    class="_small"
                  >
                    <el-option value label="全部"></el-option>
                    <el-option value="0" label="待审核"></el-option>
                    <el-option value="1" label="审核不通过"></el-option>
                    <el-option value="2" label="已入库"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item>
                  <el-button @click="getList(1)">查 询</el-button>
                  <el-button type="primary" @click="ResetForm('chaInOrderFrom')">重 置</el-button>
                  <!-- <el-button type="primary" @click="addOrderVisible = true">重 置</el-button> -->
                  <!-- <el-button type="primary" @click="editOrderVisible = true">重 置</el-button> -->
                  <!-- <el-button type="primary" @click="editOrderVisible = true;lookUpState = true">重 置</el-button> -->
                </el-form-item>
              </el-col>
            </el-row>

            <el-table border :data="orderList" @selection-change="handleSelectionChange">
              <el-table-column type="index" label="序号" align="center" width="50px"></el-table-column>
              <el-table-column prop="inboundReceipt" label="入库单号" width="180px" align="center"></el-table-column>
              <el-table-column prop="porderCode" label="关联单号" width="180px" align="center"></el-table-column>
              <!-- <el-table-column prop="supplierDOs.supName" label="供应商" :show-overflow-tooltip="true"></el-table-column> -->
              <el-table-column prop="inboundType" label="入库类型">
                <template slot-scope="scope">
                  <span v-if="scope.row.inboundType == 0">采购入库</span>
                  <span v-if="scope.row.inboundType == 1">生产入库</span>
                  <span v-if="scope.row.inboundType == 2">售后入库</span>
                  <span v-if="scope.row.inboundType == 3">其他入库</span>
                </template>
              </el-table-column>
              <el-table-column prop="inboundWhousenum" label="入库数量"></el-table-column>
              <el-table-column prop="inboundTime" label="入库时间"></el-table-column>
              <el-table-column prop="inboundProducer" label="制单人"></el-table-column>
              <el-table-column prop="inboundOrdertime" label="制单时间" align="center" width="200px"></el-table-column>
              <el-table-column prop="inboundStatus" label="入库状态" align="center">
                <template slot-scope="scope">
                  <el-tag type="danger" v-if="scope.row.inboundStatus==0">待审核</el-tag>
                  <el-tag type="danger" v-if="scope.row.inboundStatus==1">审核不通过</el-tag>
                  <el-tag type="danger" v-if="scope.row.inboundStatus==2">已入库</el-tag>
                </template>
              </el-table-column>
              <el-table-column label="操作" width="270px" align="center" fixed="right">
                <template slot-scope="scope">
                  <el-button
                    type="success"
                    size="mini"
                    @click="lookUpState = true;showEditOrder(scope.row.inboundReceipt,scope.row.inboundStatus)"
                  >查看</el-button>
                  <el-button
                    type="primary"
                    size="mini"
                    :disabled="scope.row.inboundStatus == 0 || scope.row.inboundStatus == 2"
                    @click="lookUpState = false;showEditOrder(scope.row.inboundReceipt,scope.row.inboundStatus)"
                  >编辑</el-button>
                  <el-button
                    type="danger"
                    size="mini"
                    :disabled="scope.row.inboundStatus == 0 || scope.row.inboundStatus == 2"
                    @click="deleteInputOrder(scope.row.inboundReceipt)"
                  >删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-form>
          <el-pagination
            @current-change="handleCurrentChange"
            :page-size="10"
            layout="total, prev, pager, next"
            :total="total"
          ></el-pagination>
        </el-tab-pane>
        <el-tab-pane label="出库查询" name="second">
          <el-form
            :inline="true"
            class="demo-form-inline search"
            :model="chaOutOrderForm"
            ref="chaOutOrderForm"
            label-width="90px"
            label-position="left"
          >
            <el-row :gutter="20" class="row">
              <el-col :span="24">
                <el-form-item label="出库单号：" prop="outboundReceipt">
                  <el-input class="_small" v-model="chaOutOrderForm.outboundReceipt"></el-input>
                </el-form-item>
                <el-form-item label="关联单号：" prop="preturnCode">
                  <el-input v-model="chaOutOrderForm.preturnCode" class="_small"></el-input>
                </el-form-item>
                <el-form-item label="出库类型：" prop="outboundType">
                  <el-select
                    v-model="chaOutOrderForm.outboundType"
                    placeholder="请选择"
                    class="_small"
                  >
                    <el-option value="0" label="退货出库"></el-option>
                    <el-option value="1" label="生产出库"></el-option>
                    <el-option value="2" label="销售出库"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="出库状态：" prop="outboundStatus">
                  <el-select
                    v-model="chaOutOrderForm.outboundStatus"
                    placeholder="请选择"
                    class="_small"
                  >
                    <el-option value label="全部"></el-option>
                    <el-option value="0" label="待审核"></el-option>
                    <el-option value="1" label="审核不通过"></el-option>
                    <el-option value="2" label="已出库"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item>
                  <el-button @click="getOutList(1)">查 询</el-button>
                  <el-button type="primary" @click="ResetForm('chaOutOrderForm')">重 置</el-button>
                  <!-- <el-button type="primary" @click="addOrderVisible = true">重 置</el-button> -->
                  <!-- <el-button type="primary" @click="editOrderVisible = true">重 置</el-button> -->
                  <!-- <el-button type="primary" @click="editOrderVisible = true;lookUpState = true">重 置</el-button> -->
                </el-form-item>
              </el-col>
            </el-row>

            <el-table border :data="OutOrderList" @selection-change="handleSelectionChange">
              <el-table-column type="index" label="序号" align="center" width="50px"></el-table-column>
              <el-table-column prop="outboundReceipt" label="出库单号" width="180px" align="center"></el-table-column>
              <el-table-column prop="preturnCode" label="关联单号" width="180px" align="center"></el-table-column>
              <!-- <el-table-column prop="supplierDOs.supName" label="供应商" :show-overflow-tooltip="true"></el-table-column> -->
              <el-table-column prop="outboundType" label="出库类型">
                <template slot-scope="scope">
                  <span v-if="scope.row.outboundType == 0">退货出库</span>
                  <span v-if="scope.row.outboundType == 1">生产出库</span>
                  <span v-if="scope.row.outboundType == 2">销售出库</span>
                </template>
              </el-table-column>
              <el-table-column prop="inboundWhousenum" label="出库数量"></el-table-column>
              <el-table-column prop="outboundTime" label="出库时间"></el-table-column>
              <el-table-column prop="outboundProducer" label="制单人"></el-table-column>
              <el-table-column prop="outboundOrdertime" label="制单时间" align="center" width="200px"></el-table-column>
              <el-table-column prop="outboundStatus" label="出库状态" align="center">
                <template slot-scope="scope">
                  <el-tag type="danger" v-if="scope.row.outboundStatus==0">待审核</el-tag>
                  <el-tag type="danger" v-if="scope.row.outboundStatus==1">审核不通过</el-tag>
                  <el-tag type="danger" v-if="scope.row.outboundStatus==2">已出库</el-tag>
                </template>
              </el-table-column>
              <el-table-column label="操作" width="270px" align="center" fixed="right">
                <template slot-scope="scope">
                  <el-button
                    type="success"
                    size="mini"
                    @click="lookUpState = true;checkState = false;showOutEditOrder(scope.row.outboundReceipt,scope.row.outboundStatus,scope.row.outboundType,)"
                  >查看</el-button>
                  <el-button
                    type="primary"
                    size="mini"
                    :disabled="scope.row.outboundStatus == 0 || scope.row.outboundStatus == 2"
                    @click="lookUpState = false;checkState = true;showOutEditOrder(scope.row.outboundReceipt,scope.row.outboundStatus,scope.row.outboundType)"
                  >编辑</el-button>
                  <el-button
                    type="danger"
                    size="mini"
                    :disabled="scope.row.outboundStatus == 0 || scope.row.outboundStatus == 2"
                    @click="deleteOutputOrder(scope.row.outboundReceipt)"
                  >删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-form>
          <el-pagination
            @current-change="handleCurrentChange2"
            :page-size="10"
            layout="total, prev, pager, next"
            :total="OutTotal"
          ></el-pagination>
        </el-tab-pane>
      </el-tabs>
    </el-card>

    <el-dialog
      :title="lookUpState?'查看入库单':'编辑入库单'"
      :visible.sync="editOrderVisible"
      width="60%"
      :before-close="handleClose"
      @closed="dialogClosed('editOrderFrom')"
    >
      <!-- 新增销售订单表格 -->
      <el-form
        :inline="true"
        class="demo-form-inline search"
        :model="editOrderFrom"
        ref="editOrderFrom"
        label-width="90px"
        label-position="left"
      >
        <!-- 采购单号 -->
        <el-form-item label="采购单号：" prop="porderCode">
          <el-input v-model="editOrderFrom.porderCode" class="_small" :disabled="true"></el-input>
        </el-form-item>

        <!-- 入库类型 -->
        <el-form-item label="入库类型：" prop="inboundType">
          <el-select v-model="editOrderFrom.inboundType" class="_small" :disabled="true">
            <el-option value="0" label="采购入库"></el-option>
            <el-option value="1" label="生产入库"></el-option>
            <el-option value="2" label="其他入库"></el-option>
          </el-select>
        </el-form-item>

        <!-- 采购单号 -->
        <el-form-item label="制单人：" prop="inboundProducer">
          <el-input v-model="editOrderFrom.inboundProducer" class="_small" :disabled="true"></el-input>
        </el-form-item>

        <!-- 入库时间 -->
        <el-form-item label="入库日期：" prop="inboundTime">
          <el-date-picker
            v-model="editOrderFrom.inboundTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择日期"
            class="_small"
            :disabled="lookUpState"
          ></el-date-picker>
        </el-form-item>

        <br />

        <el-button
          type="primary"
          @click="addGoods(editOrderFrom.porderCode)"
          v-if="!lookUpState"
        >选择入库商品</el-button>
        <el-button
          type="dange"
          @click="deleteAddPurGoods()"
          :disabled="selectedList.length == 0"
          v-if="!lookUpState"
        >删除商品</el-button>

        <!-- 带有排序功能的商品table -->
        <!-- :default-sort="{prop: 'date', order: 'descending'}" -->
        <!-- v-show="addOrderFrom.inboundType == 0" -->
        <!-- style="width: 100%" -->
        <el-table :data="editOrderFrom.inboundGoolsDos" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55" align="center"></el-table-column>
          <el-table-column type="index" width="55" label="序号" align="center"></el-table-column>
          <el-table-column prop="supgoolssmallType" label="商品小类型"></el-table-column>
          <el-table-column prop="supgoolsId" label="商品名称"></el-table-column>
          <el-table-column prop="supgoolsSplicing" width="200px" align="center" label="商品描述"></el-table-column>
          <el-table-column prop="pcommodityPalnnum" label="总数"></el-table-column>
          <el-table-column prop="sum" label="已入库数量" width="90px"></el-table-column>
          <el-table-column prop="inboundgoolsNum" label="本次入库数量" width="120px">
            <!-- <template slot-scope="scope">
              <el-input v-model="scope.row.inboundgoolsNum"></el-input>
            </template>-->
          </el-table-column>
          <el-table-column label="单位" width="80px">
            <template slot-scope="scope">
              <el-select
                v-model="scope.row.inboundgoolsUnit"
                placeholder="请选择"
                class="_small"
                :disabled="true"
              >
                <el-option
                  v-for="item in unit"
                  :key="item.basicId"
                  :label="item.basicRetainone"
                  :value="item.basicId"
                ></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column label="入库仓库" width="150x">
            <template slot-scope="scope">
              <el-select
                v-model="scope.row.inboundgoolsWhouse"
                placeholder="请选择"
                class="_small"
                :disabled="true"
              >
                <el-option
                  v-for="item in warehouseOptions"
                  :key="item.basicId"
                  :label="item.basicRetainone"
                  :value="item.basicId"
                ></el-option>
              </el-select>
            </template>
          </el-table-column>

          <el-table-column prop label="操作" align="center" v-if="!lookUpState">
            <template slot-scope="scope">
              <el-button @click="addOrderMsg(scope.$index,0)" size="mini" type="primary">关联追踪号</el-button>
            </template>
          </el-table-column>
          <!-- <el-table-column prop="pcommodityPalnnum" label="总数"></el-table-column> -->
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
        <el-form-item label="备注：" prop="inboundRemark">
          <el-input
            type="textarea"
            placeholder="请输入内容"
            v-model="editOrderFrom.inboundRemark"
            style="width:600px"
            :disabled="lookUpState"
          ></el-input>
        </el-form-item>
        <!-- 审核信息显示 -->
        <div v-if="showCheckMsg">
          <div class="fenge1">审核信息</div>

          <el-form-item label="审核人：" prop="inboundAuditor">
            <el-input v-model="editOrderFrom.inboundAuditor" :disabled="true"></el-input>
          </el-form-item>&nbsp; &nbsp;
          <el-form-item label="审核结果：" prop="inboundStatus">
            <el-radio v-model="editOrderFrom.inboundStatus" label="2" :disabled="!checkState">通过</el-radio>
            <el-radio v-model="editOrderFrom.inboundStatus" label="1" :disabled="!checkState">驳回</el-radio>
          </el-form-item>
          <br />
          <el-form-item label="审核备注：" prop="inboundDesc">
            <el-input
              type="textarea"
              v-model="editOrderFrom.inboundDesc"
              style="width:600px"
              :disabled="!checkState"
            ></el-input>
          </el-form-item>
        </div>
      </el-form>

      <!-- 2个按钮 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="editOrderVisible = false">取 消</el-button>
        <el-button @click="editInputOrder()" type="primary" v-if="!lookUpState">确 认</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="选择商品"
      :visible.sync="choosePurchaseGoodsVisible"
      width="58%"
      :before-close="handleClose"
    >
      <el-table border stripe :data="purchaseGoodsList" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="40px"></el-table-column>
        <el-table-column type="index" width="50px" label="序号" align="center"></el-table-column>
        <el-table-column prop="supgoolssmallType" label="商品小类型"></el-table-column>
        <el-table-column prop="supgoolsId" label="商品名称"></el-table-column>
        <el-table-column prop="supgoolsSplicing" label="商品描述"></el-table-column>
        <el-table-column prop="pcommodityPalnnum" label="总数量"></el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="chooseGoodsFormCancel()">取 消</el-button>
        <el-button @click="chooseGoodsFormSava()" type="primary">保 存</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="送货单信息"
      :visible.sync="traceNodialogVisible"
      width="40%"
      :before-close="handleClose"
      @closed="handleTraceNodialogClose()"
    >
      <el-table border stripe :data="traceNoList" @selection-change="handleSelectionChange">
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
        <el-table-column label="操作" align="center" width="90px">
          <template slot-scope="scope">
            <el-button size="mini" type="danger" @click="deleteRow(scope.$index)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- <i class="el-icon-circle-plus"></i> -->
      <el-button @click="traceNoList.push({})">增加行</el-button>
      <span slot="footer" class="dialog-footer">
        <el-button @click="traceNodialogVisible = false">取 消</el-button>
        <el-button @click="traceNodialogSave(index)" type="primary">保 存</el-button>
      </span>
    </el-dialog>

    <!-- 查看 编辑出库单 -->
    <el-dialog
      :title="lookUpState?'查看出库单':'编辑出库单'"
      :visible.sync="editOutOrderVisible"
      width="60%"
      :before-close="handleClose"
      @closed="dialogClosed('editOrderFrom')"
    >
      <!-- 新增销售订单表格 -->
      <el-form
        :inline="true"
        class="demo-form-inline search"
        :model="editOrderFrom"
        ref="editOrderFrom"
        label-width="100px"
        label-position="left"
      >
        <!-- 采购单号 -->
        <el-form-item label="退货单号：" prop="preturnCode">
          <el-input v-model="editOrderFrom.preturnCode " class="_small" :disabled="true"></el-input>
        </el-form-item>

        <!-- 入库类型 -->
        <el-form-item label="出库类型：" prop="outboundType">
          <el-select v-model="editOrderFrom.outboundType" class="_small" :disabled="true">
            <el-option value="0" label="退货出库"></el-option>
            <el-option value="1" label="生产出库"></el-option>
            <el-option value="2" label="销售出库"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="制单人：" prop="outboundProducer">
          <el-input v-model="editOrderFrom.outboundProducer" class="_small" :disabled="true"></el-input>
        </el-form-item>

        <!-- 入库时间 -->
        <el-form-item label="出库日期：" prop="outboundTime">
          <el-date-picker
            v-model="editOrderFrom.outboundTime"
            type="date"
            value-format="yyyy-MM-dd"
            class="_small"
            :disabled="lookUpState"
          ></el-date-picker>
        </el-form-item>

        <!-- <br />

        <el-button type="primary" @click="addGoods(editOrderFrom.porderCode)" v-if="!lookUpState">选择入库商品</el-button>
        <el-button
          type="dange"
          @click="deleteAddPurGoods()"
          :disabled="selectedList.length == 0"
          v-if="!lookUpState"
        >删除商品</el-button>-->

        <!-- 带有排序功能的商品table -->
        <!-- :default-sort="{prop: 'date', order: 'descending'}" -->
        <!-- v-show="addOrderFrom.inboundType == 0" -->
        <div v-show="outboundType == 0">
          <el-table :data="editOrderFrom.outboundGoolsDos" style="width: 100%">

            <el-table-column prop="supgoolssmallType" label="商品小类型"></el-table-column>
            <el-table-column prop="supgoolsId" label="商品名称"></el-table-column>
            <el-table-column prop="supgoolsSplicing" width="250px" align="center" label="商品描述"></el-table-column>
            <el-table-column prop="pcommodityPalnnum" label="总数"></el-table-column>
            <el-table-column prop="sum" label="已出库数量"></el-table-column>
            <el-table-column prop="outboundgoolsNum" label="本次出库数量"></el-table-column>
            <el-table-column prop="unit" label="单位"></el-table-column>
            <el-table-column prop="warehouse" label="入库仓库"></el-table-column>
            <el-table-column prop label="操作" align="center" v-if="!lookUpState">
            <template slot-scope="scope">
              <el-button @click="addOrderMsg(scope.$index,1)" size="mini" type="primary">编辑</el-button>
            </template>
          </el-table-column>
            <el-table-column prop="jsonofinboundgoolsTrack" type="expand">
              <template slot-scope="scope">
                <el-table
                  :data="scope.row.jsonofinboundgoolsTrack"
                  style="width: 50%"
                  :border="true"
                >
                  <el-table-column prop="traceNo" align="center" label="追踪号"></el-table-column>
                  <el-table-column prop="weight" label="数量" align="center"></el-table-column>
                </el-table>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <!-- 销售订单表单 -->
        <div v-show="outboundType == 2">
          <el-table
            :data="editOrderFrom.outboundGoolsDos"
            style="width: 100%"
            @selection-change="handleSelectionChange"
            border
            default-expand-all
            class="tb"
          >
            <el-table-column type="selection" width="35" align="center"></el-table-column>
            <el-table-column type="expand" label="展开" width="50">
              <template slot-scope="props">
                <el-form label-position="left" inline class="demo-table-expand">
                  <el-form-item label>{{ props.row.producinggoodsDOs.productSplicing }}</el-form-item>
                </el-form>
                <el-table
                  :data="props.row.jsonofinboundgoolsTrack"
                  style="width: 50%"
                  :border="true"
                >
                  <el-table-column prop="traceNo" align="center" label="追踪号"></el-table-column>
                  <el-table-column prop="weight" label="数量" align="center"></el-table-column>
                </el-table>
              </template>
            </el-table-column>
            <el-table-column type="index" label="序号" align="center" width="50px"></el-table-column>
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
            <el-table-column prop label="操作" align="center" v-if="!lookUpState">
            <template slot-scope="scope">
              <el-button @click="addOrderMsg(scope.$index,1)" size="mini" type="primary">编辑</el-button>
            </template>
          </el-table-column>
            <!-- <el-table-column prop label="操作" align="center">
              <template slot-scope="scope">
                <el-button @click="addOrderMsg(scope.$index)" size="mini" type="primary">编辑</el-button>
              </template>
            </el-table-column> -->
          </el-table>
        </div>
        <br />
        <el-form-item label="备注：" prop="outboundRemark">
          <el-input
            type="textarea"
            v-model="editOrderFrom.outboundRemark"
            style="width:600px"
            :disabled="lookUpState"
          ></el-input>
        </el-form-item>

        <div v-if="flag">
          <div class="fenge1">审核信息</div>

          <el-form-item label="审核人：" prop="outboundAuditor">
            <el-input v-model="editOrderFrom.outboundAuditor" :disabled="true"></el-input>
          </el-form-item>&nbsp; &nbsp;
          <el-form-item label="审核结果：" prop="outboundStatus">
            <el-radio v-model="outboundStatus" label="2" :disabled="true">通过</el-radio>
            <el-radio v-model="outboundStatus" label="1" :disabled="true">驳回</el-radio>
          </el-form-item>

          <br />
          <el-form-item label="审核备注：" prop="outboundDesc">
            <el-input
              type="textarea"
              v-model="outboundDesc"
              style="width:600px"
              :disabled="true"
            ></el-input>
          </el-form-item>
        </div>
      </el-form>

      <!-- 2个按钮 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="editOutOrderVisible = false">取 消</el-button>
        <el-button @click="editOutputOrder()" type="primary" v-if="checkState">确 认</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      chaInOrderFrom: {
        inboundReceipt: "", //入库单号
        porderCode: "", //采购单号
        inboundType: "", //入库类型
        inboundStatus: "", //入库状态
        pageCode: 1,
        pageSize: 10
      }, //查询表单数据
      chaInOrder: {}, //查询真实数据
      activeName: "first", //默认标签页
      orderList: [],
      lookUpState: false,

      editOrderVisible: false,
      editOrderFrom: {},
      selectedList: [],

      warehouseOptions: [], //仓库数组
      unit: [], //单位数组

      choosePurchaseGoodsVisible: false, // 选择商品dialog

      index: 0, //数组序号
      outOrIn: 0, //0入库 1出库
      traceNodialogVisible: false, //送货单信息dialog是否可见
      traceNoList: [{}], //送货单表单数组

      // 出库部分
      chaOutOrderForm: {
        outboundReceipt: "", //出库单号
        outboundType: "", //出库类型
        preturnCode: "", //退货单号
        outboundStatus: "", //出库状态
        pageSize: 10, //每页条数
        pageCode: 1 //页码
      },
      chaOutOrder: {},
      OutOrderList: [], //表单数据
      OutTotal: 0,

      editOutOrderVisible: false, //查看编辑出库单是否可见


      showCheckMsg:false,// 审核信息展示

      outboundStatus: 0, //审核状态
      outboundDesc: "", //审核描述
      outboundType: 0, //出库类型

      checkState:false,
      purchaseGoodsList:[],
      flag:false,

    };
  },
  created() {
    //自己写的方法
    this.getWarehouseOptions();
    this.queryUnit();
    this.getList(1);
  },
  methods: {
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
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
      this.chaInOrder.pageCode = val;
      this.getList();
    },

    async getList(val) {
      // const { data: res1 } = await this.$http.post("jh/purchase/dtjresultMap");
      // this.chaOrderFrom.pageCode = 1;
      if (val) {
        // 重新点击时，需要重置查询页数
        this.chaInOrderFrom.pageCode = 1;
        this.chaInOrder = JSON.parse(JSON.stringify(this.chaInOrderFrom));
        console.log(1111);
      }
      const { data: res } = await this.$http.post(
        "kc/inbound/selectInbound",
        this.chaInOrder
      );

      // console.log(res1);

      this.orderList = res.body.rows;
      this.total = res.body.total;
    },

    deleteInputOrder(inboundReceipt) {
      this.$confirm("此操作将永久删除该入库单, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          let param = new URLSearchParams();
          param.append("inboundReceipt", inboundReceipt);
          const { data: res } = await this.$http.post(
            "kc/inbound/deleteall",
            param
          );
          // this.getDepartmentList();
          console.log(res);

          if (res.body.respCode == 200) {
            this.$message({
              type: "success",
              message: res.body.msg
            });
            this.getList();
          } else {
            this.$message({
              type: "info",
              message: "入库单删除失败!"
            });
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 表单重置
    ResetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // 查看表单
    async showEditOrder(inboundReceipt,inboundStatus) {
      if(inboundStatus != 0){
        this.showCheckMsg = true;
      }else{
        this.showCheckMsg = false;
      }
      
      const { data: res } = await this.$http.post(
        "kc/inbound/selectindisplay",
        { inboundReceipt: inboundReceipt }
      );
      console.log(res);

      this.editOrderFrom = res.body.result;

      let ids = [];
      this.editOrderFrom.inboundGoolsDos.forEach((item, index, array) => {
        // 将仓库 单位转为数字
        item.inboundgoolsUnit = Number(item.inboundgoolsUnit);
        item.inboundgoolsWhouse = Number(item.inboundgoolsWhouse);

        ids.push(item.suppliergoolsId);
      });

      // 根据采购单和商品id查询商品已入库数量
      const { data: res2 } = await this.$http.post(
        "kc/inbound/selectallgools",
        {
          porderCode: res.body.result.porderCode,
          suppliergoolsId: ids
        }
      );

      console.log("根据采购单和商品id查询商品已入库数量");
      console.log(res2);

      // 基础信息
      const { data: res1 } = await this.$http.post(
        "jc/suppliergoods/selectSuppliergoolslistmore",
        ids
      );

      this.editOrderFrom.inboundGoolsDos.forEach((good, index, array) => {
        res1.forEach((item, index, array) => {
          if (good.suppliergoolsId == item.suppliergoolsId) {
            good.supgoolssmallType = item.supgoolssmallType;
            good.supgoolsId = item.supgoolsId;
            good.supgoolsSplicing = item.supgoolsSplicing;
          }
        });
      });

      this.editOrderFrom.inboundGoolsDos.forEach((good, index, array) => {
        res2.forEach((item, index, array) => {
          if (good.suppliergoolsId == item.suppliergoolsId) {
            good.sum = item.sum;
          }
        });
      });

      // 根据采购单号查询各种商品采购数量
      const { data: res3 } = await this.$http.post("jh/purchase/dtjresultMap", {
        porderCode: res.body.result.porderCode
      });

      this.editOrderFrom.inboundGoolsDos.forEach((good, index, array) => {
        res3.body.result[0].pcommodityDos.forEach((item, index, array) => {
          if (good.suppliergoolsId == item.suppliergoolsId) {
            // 采购总数
            good.pcommodityPalnnum = item.pcommodityPalnnum;
            // 单位
            good.inboundgoolsUnit = Number(item.pcommodityUnit);
            // 仓库
            good.inboundgoolsWhouse = item.basicId;
          }
        });
      });

      console.log(this.editOrderFrom);
      this.editOrderFrom.inboundType += "";
      this.editOrderFrom.inboundStatus += "";
      this.editOrderVisible = true;
    },
    dialogClosed(val) {
      this.$refs[val].resetFields();
    },
    // 关联送货单号，参数为入库单商品索引
    addOrderMsg(index,val) {
      this.index = index;
      this.outOrIn = val;
      if(val == 0){
      if (
        this.editOrderFrom.inboundGoolsDos[index].jsonofinboundgoolsTrack !==
          undefined &&
        this.editOrderFrom.inboundGoolsDos[index].jsonofinboundgoolsTrack !==
          null
      ) {
        console.log(
          this.editOrderFrom.inboundGoolsDos[index].jsonofinboundgoolsTrack
        );
        this.traceNoList = JSON.parse(
          JSON.stringify(
            this.editOrderFrom.inboundGoolsDos[index].jsonofinboundgoolsTrack
          )
        );
        console.log("----------------------");
        console.log(this.traceNoList);
      }
      }else if(val == 1){
         if (
        this.editOrderFrom.outboundGoolsDos[index].jsonofinboundgoolsTrack !==
          undefined &&
        this.editOrderFrom.outboundGoolsDos[index].jsonofinboundgoolsTrack !==
          null
      ) {
        console.log(
          this.editOrderFrom.outboundGoolsDos[index].jsonofinboundgoolsTrack
        );
        this.traceNoList = JSON.parse(
          JSON.stringify(
            this.editOrderFrom.outboundGoolsDos[index].jsonofinboundgoolsTrack
          )
        );
        console.log("----------------------");
        console.log(this.traceNoList);
      }
      }
      this.traceNodialogVisible = true;
    },
    // 送货单信息删除行
    deleteRow(val) {
      console.log(val);
      this.traceNoList.splice(val, 1);
    },
    // 送货单信息保存
    traceNodialogSave(index) {
      console.log(index);
      // 排空
      let arr = [];
      this.traceNoList.forEach((item, index, array) => {
        if (item.traceNo !== undefined && item.weight !== undefined) {
          arr.push(item);
        }
      });

      if(this.outOrIn == 0){
      // 使用深拷贝
      this.editOrderFrom.inboundGoolsDos[index].jsonofinboundgoolsTrack = arr;
      //数组信息拼接
      // let s = "";
      // arr.forEach((item, index, array) => {
      //   s = s + item.traceNo + "," + item.weight + ";";
      // });
      // this.addOrderFrom.inboundGoolsDos[index].deliverOrderListShow = s;

      // 遍历，获得此次入库数量
      let sum = 0;
      arr.forEach((item, index, array) => {
        sum = this.add(sum, Number(item.weight));
      });
      this.editOrderFrom.inboundGoolsDos[index].inboundgoolsNum = sum;
      this.editOrderFrom.inboundGoolsDos[index].inboundgoolsNum.toFixed(2);
      // 深拷贝，刷一下
      this.editOrderFrom.inboundGoolsDos = JSON.parse(
        JSON.stringify(this.editOrderFrom.inboundGoolsDos)
      );
      }else if(this.outOrIn == 1){
        // 使用深拷贝
      this.editOrderFrom.outboundGoolsDos[index].jsonofinboundgoolsTrack = arr;
      //数组信息拼接
      // let s = "";
      // arr.forEach((item, index, array) => {
      //   s = s + item.traceNo + "," + item.weight + ";";
      // });
      // this.addOrderFrom.inboundGoolsDos[index].deliverOrderListShow = s;

      // 遍历，获得此次入库数量
      let sum = 0;
      arr.forEach((item, index, array) => {
        sum = this.add(sum, Number(item.weight));
      });
      this.editOrderFrom.outboundGoolsDos[index].inboundgoolsNum = sum;
      this.editOrderFrom.outboundGoolsDos[index].inboundgoolsNum.toFixed(2);
      // 深拷贝，刷一下
      this.editOrderFrom.outboundGoolsDos = JSON.parse(
        JSON.stringify(this.editOrderFrom.outboundGoolsDos)
      );
      }
      if (arr.length < this.traceNoList.length) {
        this.$message({
          type: "warning",
          message: "存在部分追踪号信息不完全！"
        });
      }
      this.traceNoList = [{}];
      this.traceNodialogVisible = false;
    },
    // 相加
    add(arg1, arg2) {
      return (Math.round(arg1 * 100) + Math.round(arg2 * 100)) / 100;
    },
    async addGoods(porderCode) {
      // 点击添加商品
      const { data: res } = await this.$http.post("jh/purchase/dtjresultMap", {
        porderCode: porderCode
      });

      // console.log(res.body.result[0].pcommodityDos);

      // 遍历获取商品id数组
      let ids = [];
      res.body.result[0].pcommodityDos.forEach((item, index, arr) => {
        ids.push(item.suppliergoolsId);
      });
      // console.log("ids")
      // console.log(ids)

      const { data: res1 } = await this.$http.post(
        "jc/suppliergoods/selectSuppliergoolslistmore",
        ids
      );

      // 可供选择的商品列表
      // console.log("res1");
      // console.log(res1);
      this.purchaseGoodsList = res1;
      // 获取规格后再获取相对应商品在此采购订单中的采购总数量
      this.purchaseGoodsList.forEach((purGood, index, arr) => {
        res.body.result[0].pcommodityDos.forEach((item, index, arr) => {
          if (purGood.suppliergoolsId == item.suppliergoolsId) {
            purGood.pcommodityPalnnum = item.pcommodityPalnnum;
            // 仓库id
            purGood.basicId = item.basicId;
            // 单位id
            purGood.pcommodityUnit = Number(item.pcommodityUnit);
          }
        });
      });

      //

      this.choosePurchaseGoodsVisible = true;
    },

    // 选择商品表单保存
    async chooseGoodsFormSava() {
      let length = this.editOrderFrom.inboundGoolsDos.length;

      if (length == 0) {
        //长度为0，直接添加元素
        this.selectedList.forEach((item, index, arr) => {
          this.editOrderFrom.inboundGoolsDos.push(item);
        });
      } else {
        for (let i = 0; i < this.selectedList.length; i++) {
          for (let j = 0; j < length; j++) {
            if (
              this.editOrderFrom.inboundGoolsDos[j].suppliergoolsId ==
              this.selectedList[i].suppliergoolsId
            ) {
              break;
            }
            if (j == length - 1) {
              this.editOrderFrom.inboundGoolsDos.push(this.selectedList[i]);
            }
          }
        }
      }
      // 有元素被过滤，跳出提示
      if (
        length + this.selectedList.length >
        this.editOrderFrom.inboundGoolsDos.length
      ) {
        this.$message({
          type: "info",
          message: "部分商品已经存在!"
        });
      }

      console.log("---------------------------------");
      console.log(this.editOrderFrom.inboundGoolsDos);

      this.chooseGoodsFormCancel();
    },
    // 选择商品表单取消
    chooseGoodsFormCancel() {
      this.choosePurchaseGoodsVisible = false;
      this.selectedList = [];
      this.purchaseGoodsList = [];
    },
    // 选择采购商品中的可选商品
    handleSelectionChange(val) {
      this.selectedList = val;
      // console.log(this.selectedList);
    },
    // 删除添加采购订单中的商品
    deleteAddPurGoods() {
      for (let i = 0; i < this.editOrderFrom.inboundGoolsDos.length; i++) {
        for (let j = 0; j < this.selectedList.length; j++) {
          if (
            this.editOrderFrom.inboundGoolsDos[i].suppliergoolsId ==
            this.selectedList[j].suppliergoolsId
          ) {
            this.editOrderFrom.inboundGoolsDos.splice(i--, 1);
            break;
          }
        }
      }
    },
    // 编辑入库单
    async editInputOrder() {
      const { data: res } = await this.$http.post(
        "kc/inbound/bianji",
        this.editOrderFrom
      );

      if (res.body.respCode == 200) {
        this.$message({
          type: "success",
          message: res.body.msg
        });
        this.getList();
      } else {
        this.$message({
          type: "info",
          message: res.body.msg
        });
      }
      this.editOrderVisible = false;
    },
    // 标签切换事件
    handleClick(tab, event) {
      // 两个标签页执行不同的查询
      if (tab.name == "first") {
        this.getList(1);
      } else if (tab.name == "second") {
        this.getOutList(1);
      }
    },

    // 出库查询部分方法
    async getOutList(val) {
      if (val) {
        // 重新点击时，需要重置查询页数
        this.chaOutOrderForm.pageCode = 1;
        this.chaOutOrder = JSON.parse(JSON.stringify(this.chaOutOrderForm));
        console.log(1111);
      }
      const { data: res } = await this.$http.post(
        "kc/outbound/selectOutbound",
        this.chaOutOrder
      );

      // console.log(res1);

      this.OutOrderList = res.body.rows;
      this.OutTotal = res.body.total;
    },
    handleCurrentChange2(val) {
      this.chaOutOrder.pageCode = val;
      this.getOutList();
    },
    // 编辑出库单
    async showOutEditOrder(outboundReceipt, outboundStatus, outboundType) {
      // 重置审核信息
      this.checkForm = {
        outboundReceipt: "",
        outboundStatus: "0",
        outboundDesc: "",
        outboundAuditor: "",
        preturnCode: "",
        outboundReceipt: {}
      };
      this.outboundStatus = 0;
      this.outboundDesc = "";

      // 待审核，查看 审核信息不可见
      if (outboundStatus == 0 && this.checkState == false) {
        this.flag = false; // 不可见
      } else {
        this.flag = true; // 可见
      }
      // outboundStatus控制页面table对于不同类型出库单的不同展现
      this.outboundType = outboundType;

      const { data: res } = await this.$http.post(
        "kc/outbound/selectoutdisplay",
        { outboundReceipt: outboundReceipt }
      );
      console.log(res);

      let editOrder = res.body.result;
      // 设置出库类型为字符串
      editOrder.outboundType += "";


      // 采购退货
      if(this.outboundType == 0){
      // 获取所有供应商商品id
      let ids = [];
      editOrder.outboundGoolsDos.forEach((item, index, array) => {
        ids.push(item.suppliergoolsId);
      });

      // 获取对应供应商品的基础信息
      const { data: res1 } = await this.$http.post(
        "jc/suppliergoods/selectSuppliergoolslistmore",
        ids
      );
      editOrder.outboundGoolsDos.forEach((good, index, array) => {
        res1.forEach((item, index, array) => {
          if (good.suppliergoolsId == item.suppliergoolsId) {
            good.supgoolssmallType = item.supgoolssmallType;
            good.supgoolsId = item.supgoolsId;
            good.supgoolsSplicing = item.supgoolsSplicing;
          }
        });
      });

      // 单位和仓库显示
      editOrder.outboundGoolsDos.forEach((good, index, array) => {
        // 单位
        this.unit.forEach((u, index, array) => {
          if (good.pcommodityUnit == u.basicId) {
            good.unit = u.basicRetainone;
          }
        });
        // 仓库
        this.warehouseOptions.forEach((w, index, array) => {
          if (good.basicId == w.basicId) {
            good.warehouse = w.basicRetainone;
          }
        });
      });

      // 根据退货单号和商品id查询商品已出库数量
      const { data: res2 } = await this.$http.post(
        "kc/outbound/selectallgools",
        {
          preturnCode: editOrder.preturnCode,
          suppliergoolsId: ids
        }
      );
      editOrder.outboundGoolsDos.forEach((good, index, array) => {
        // 如果该商品没有已入库数量，设置为0
        good.sum = 0;
        res2.forEach((item, index, array) => {
          if (good.suppliergoolsId == item.suppliergoolsId) {
            good.sum = item.sum;
          }
        });
      });
      }else if(this.outboundType == 2){
        let param = new URLSearchParams();
      param.append("deliveryCode", res.body.result.preturnCode);
      const { data: res1 } = await this.$http.post(
        "xs/delivery/selectDeliveryNoticebyid",
        param
      );

      // 商品
      for (
        let index = 0;
        index < res1.body.DeliveryNoticeDO.deliveryOrderDOs.length;
        index++
      ) {
        res1.body.DeliveryNoticeDO.deliveryOrderDOs[index].productSplicing =
          res1.body.DeliveryNoticeDO.deliveryOrderDOs[
            index
          ].producinggoodsDOs.productSplicing;
        res1.body.DeliveryNoticeDO.deliveryOrderDOs[index].cusName =
          res1.body.DeliveryNoticeDO.deliveryOrderDOs[
            index
          ].saleOrderDO.customerDOs.cusName;
        res1.body.DeliveryNoticeDO.deliveryOrderDOs[index].sorderWarehouse =
          res1.body.DeliveryNoticeDO.deliveryOrderDOs[
            index
          ].saleOrderDO.sorderWarehouse;
        res1.body.DeliveryNoticeDO.deliveryOrderDOs[index].sorderAddress =
          res1.body.DeliveryNoticeDO.deliveryOrderDOs[
            index
          ].saleOrderDO.sorderAddress;
        res1.body.DeliveryNoticeDO.deliveryOrderDOs[index].sorderTotalsum =
          res1.body.DeliveryNoticeDO.deliveryOrderDOs[
            index
          ].saleOrderDO.sorderTotalsum;
        res1.body.DeliveryNoticeDO.deliveryOrderDOs[index].productName =
          res1.body.DeliveryNoticeDO.deliveryOrderDOs[
            index
          ].producinggoodsDOs.productName;
        res1.body.DeliveryNoticeDO.deliveryOrderDOs[index].commodityNumber =
          res1.body.DeliveryNoticeDO.deliveryOrderDOs[
            index
          ].saleOrderDO.commodityListDOs[0].commodityNumber;
        res1.body.DeliveryNoticeDO.deliveryOrderDOs[
          index
        ].sorderAuqntityshipped =
          res1.body.DeliveryNoticeDO.deliveryOrderDOs[
            index
          ].saleOrderDO.sorderAuqntityshipped;
        res1.body.DeliveryNoticeDO.deliveryOrderDOs[index].sorderTotalsum =
          res1.body.DeliveryNoticeDO.deliveryOrderDOs[
            index
          ].saleOrderDO.sorderTotalsum;
      }
      // editOrder.outboundGoolsDos
      console.log("editOrder.outboundGoolsDos")
      console.log(editOrder.outboundGoolsDos)

      let arr = JSON.parse(JSON.stringify(editOrder.outboundGoolsDos));

      editOrder.outboundGoolsDos =
        res1.body.DeliveryNoticeDO.deliveryOrderDOs;

        console.log(editOrder.outboundGoolsDos)
        console.log(res.body.result.outboundGoolsDos) 
      
      // 获取追踪码
      editOrder.outboundGoolsDos.forEach((good,index,array)=>{
        arr.forEach((item,index,array)=>{
          if(item.productgoodsId == good.productgoodsId && item.sorderCode == good.sorderCode){
            good.jsonofinboundgoolsTrack = item.jsonofinboundgoolsTrack
          }
        })
      })
      }

      // 审核状态反显
      // if (this.checkState == false) {
      //   this.outboundStatus = editOrder.outboundStatus + "";
      //   this.outboundDesc = editOrder.outboundDesc;
      //   console.log("出库单审核状态");
      //   console.log(this.outboundStatus);
      // }
        this.outboundStatus = editOrder.outboundStatus + "";
        this.outboundDesc = editOrder.outboundDesc;

      this.editOrderFrom = editOrder;
      if (this.checkState == true) {
        this.getCookie();
      }

      console.log("--------------------------");
      console.log(this.editOrderFrom);

      this.editOutOrderVisible = true;
    },
    // 删除出库单
    async deleteOutputOrder(outboundReceipt) {
      this.$confirm("此操作将永久删除该出库单, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          let param = new URLSearchParams();
          param.append("outboundReceipt", outboundReceipt);
          const { data: res } = await this.$http.post(
            "kc/outbound/deleteall",
            // {outboundReceipt:outboundReceipt}
            param
          );
          // this.getDepartmentList();
          console.log(res);

          if (res.body.respCode == 200) {
            this.$message({
              type: "success",
              message: res.body.msg
            });
            this.getOutList();
          } else {
            this.$message({
              type: "info",
              message: "出库单删除失败!"
            });
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    getCookie: function() {
      var storage = window.localStorage;
      this.editOrderFrom.inboundAuditor = storage.getItem("username");
    },
    // 编辑出库单
    async editOutputOrder(){
      const { data: res } = await this.$http.post(
            "kc/outbound/bianji",
            // {outboundReceipt:outboundReceipt}
            this.editOrderFrom
      );
      if(res.body.respCode == 200){
        this.$message({
              type: "success",
              message: res.body.msg
        });
      }else {
         this.$message({
              type: "info",
              message: res.body.msg
        });
      }
      this.getOutList()
      this.editOutOrderVisible = false
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
.demo-table-expand {
  text-align: center;
  .el-form-item {
    margin-bottom: 0px;
  }
}
</style>  