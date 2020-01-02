<template>
  <div class="min1500">
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>库存管理</el-breadcrumb-item>
      <el-breadcrumb-item>入库</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="采购入库" name="first">
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
                <el-form-item label="订单编号：" prop="porderCode">
                  <el-input class="_small" v-model="chaOrderFrom.porderCode"></el-input>
                </el-form-item>

                <el-form-item label="供应商：" prop="supplierId">
                  <el-select v-model="chaOrderFrom.supplierId" placeholder="请选择" class="_small">
                    <el-option
                      v-for="item in supplier"
                      :key="item.supplierId"
                      :label="item.supName"
                      :value="item.supplierId"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="到货情况：" prop="porderArrivalstatus">
                  <el-select
                    v-model="chaOrderFrom.porderArrivalstatus"
                    placeholder="请选择"
                    class="_small"
                  >
                    <el-option value="" label="全部"></el-option>
                    <el-option value="0" label="未到货"></el-option>
                    <el-option value="1" label="部分到货"></el-option>
                    <el-option value="2" label="全部到货"></el-option>
                  </el-select>
                </el-form-item>

                <el-form-item>
                  <el-button @click="getList(1)">查 询</el-button>
                  <el-button type="primary" @click="ResetForm('chaOrderFrom')">重 置</el-button>
                  <!-- <el-button @click="traceNodialogVisible = true">查 询</el-button> -->
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>

          <!-- 表格 -->
          <el-table border :data="orderList">
            <el-table-column type="index" label="序号" align="center" width="50px"></el-table-column>
            <el-table-column prop="porderCode" label="采购单号" width="180px" align="center"></el-table-column>
            <el-table-column prop="porderTotalnum" label="总数量"></el-table-column>
            <el-table-column prop="porderArrivalnumber" label="到货数量"></el-table-column>
            <el-table-column prop="porderDiffernumber" label="差异数量"></el-table-column>
            <el-table-column prop="supplierDO.supName" label="供应商" width="250px" align="center"></el-table-column>
            <el-table-column prop="porderArrivalstatus" label="到货情况">
              <template slot-scope="scope">
                <span v-if="scope.row.porderArrivalstatus == 0">未到货</span>
                <span v-if="scope.row.porderArrivalstatus == 1">部分到货</span>
                <span v-if="scope.row.porderArrivalstatus == 2">全部到货</span>
              </template>
            </el-table-column>
            <el-table-column prop="porderProducer" label="制单人员"></el-table-column>
            <el-table-column prop="porderTime" label="制单时间" width="200" align="center"></el-table-column>
            <el-table-column label="操作" width="90px" align="center" fixed="right">
              <template slot-scope="scope">
                <el-button
                  type="primary"
                  size="mini"
                  @click="showEditOrder(scope.row.porderCode,0)"
                >入库</el-button>
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

        <!-- ref="chaOrderFrom" -->
        <el-tab-pane label="生产入库" name="second">
          <el-form
            :inline="true"
            class="demo-form-inline search"
            :model="chaOrderFrom"
            
            label-width="90px"
            label-position="left"
          >
            <el-row :gutter="20" class="row">
              <el-col :span="24">
                <el-form-item label="生产单号：" prop="porderCode">
                  <el-input class="_small" v-model="chaOrderFrom.porderCode"></el-input>
                </el-form-item>

                <el-form-item label="产品名称：" prop="porderCode">
                  <el-input class="_small" v-model="chaOrderFrom.porderCode"></el-input>
                </el-form-item>

                <el-form-item label="产品规格：" prop="porderCode">
                  <el-input class="_small" v-model="chaOrderFrom.porderCode"></el-input>
                </el-form-item>

                <el-form-item>
                  <el-button @click="getList(1)">查 询</el-button>
                  <el-button type="primary" @click="ResetForm('chaOrderFrom')">重 置</el-button>
                  <!-- <el-button @click="traceNodialogVisible = true">查 询</el-button> -->
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>

          <!-- 表格 -->
          <el-table border :data="orderList">
            <el-table-column type="index" label="序号" align="center" width="50px"></el-table-column>
            <el-table-column prop label="生产单号" width="180px" align="center"></el-table-column>
            <el-table-column prop label="产品名称" width="180px" align="center"></el-table-column>
            <el-table-column prop label="产品规格" width="180px" align="center"></el-table-column>
            <el-table-column prop label="印刷版号" width="180px" align="center"></el-table-column>
            <el-table-column prop label="生产追踪号" width="180px" align="center"></el-table-column>
            <el-table-column prop label="重量" width="180px" align="center"></el-table-column>
            <el-table-column prop label="单位" width="180px" align="center"></el-table-column>
            <el-table-column prop label="生产日期" width="180px" align="center"></el-table-column>
            <el-table-column prop label="制单人" width="180px" align="center"></el-table-column>
            <el-table-column prop label="制单时间" width="180px" align="center"></el-table-column>
            <el-table-column prop label="入库类型" width="180px" align="center"></el-table-column>

            <el-table-column label="操作" width="180px" align="center" fixed="right">
              <template slot-scope="scope">
                <el-button type="primary" size="mini" @click="addProduceInOrderVisible = true">入库</el-button>

                <el-button type="primary" size="mini" @click="addProduceInOrderVisible = true">查看</el-button>
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

        <!-- ref="chaOrderFrom" -->
        <el-tab-pane label="生产退料入库" name="third">
          <el-form
            :inline="true"
            class="demo-form-inline search"
            :model="chaOrderFrom"
            
            label-width="90px"
            label-position="left"
          >
            <el-row :gutter="20" class="row">
              <el-col :span="24">
                <el-form-item label="订单编号：" prop="porderCode">
                  <el-input class="_small" v-model="chaOrderFrom.porderCode"></el-input>
                </el-form-item>

                <el-form-item>
                  <el-button @click="getList(1)">查 询</el-button>
                  <el-button type="primary" @click="ResetForm('chaOrderFrom')">重 置</el-button>
                  <el-button @click="addProduceReturnOrderVisible = true">入库</el-button>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>

          <!-- 表格 -->
          <el-table border :data="orderList">
            <el-table-column type="index" label="序号" align="center" width="50px"></el-table-column>
            <el-table-column prop label="订单编号" width="180px" align="center"></el-table-column>
            <el-table-column prop label="制单人员" width="180px" align="center"></el-table-column>
            <el-table-column prop label="制单时间" width="180px" align="center"></el-table-column>
            <el-table-column prop label="入库类型" width="180px" align="center"></el-table-column>
            <!-- fixed="right" -->
            <el-table-column label="操作" width="90px" align="center">
              <template slot-scope="scope">
                <el-button
                  type="primary"
                  size="mini"
                  @click="addProduceReturnOrderVisible = true"
                >入库</el-button>

                <!-- <el-button type="primary" size="mini" @click="addProduceInOrderVisible = true">查看</el-button> -->
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
      </el-tabs>
    </el-card>

    <el-dialog
      title="新增采购入库单"
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
        <el-form-item label="采购单号：" prop="porderCode">
          <el-input v-model="addOrderFrom.porderCode" class="_small" :disabled="true"></el-input>
        </el-form-item>

        <!-- 入库类型 -->
        <el-form-item label="入库类型：" prop="inboundType">
          <el-select v-model="addOrderFrom.inboundType" class="_small" :disabled="true">
            <el-option value="0" label="采购入库"></el-option>
            <el-option value="1" label="生产入库"></el-option>
            <el-option value="2" label="其他入库"></el-option>
          </el-select>
        </el-form-item>

        <!-- 采购单号 -->
        <el-form-item label="制单人：" prop="inboundProducer">
          <el-input v-model="addOrderFrom.inboundProducer" class="_small" :disabled="true"></el-input>
        </el-form-item>

        <!-- 入库时间 -->
        <el-form-item label="入库日期 ：" prop="inboundTime">
          <el-date-picker
            v-model="addOrderFrom.inboundTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择日期"
            class="_small"
          ></el-date-picker>
        </el-form-item>

        <br />

        <el-button type="primary" @click="addGoods(addOrderFrom.porderCode)">选择入库商品</el-button>
        <el-button
          type="dange"
          @click="deleteAddPurGoods()"
          :disabled="selectedList.length == 0"
        >删除商品</el-button>

        <!-- 带有排序功能的商品table -->
        <!-- :default-sort="{prop: 'date', order: 'descending'}" -->
        <!-- v-show="addOrderFrom.inboundType == 0" -->
        <el-table
          :data="addOrderFrom.inboundGoolsDos"
          style="width: 100%"
          @selection-change="handleSelectionChange1"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="supgoolssmallType" label="商品小类型"></el-table-column>
          <el-table-column prop="supgoolsId" label="商品名称"></el-table-column>
          <el-table-column prop="supgoolsSplicing" width="200px" align="center" label="商品描述"></el-table-column>
          <el-table-column prop="pcommodityPalnnum" label="总数"></el-table-column>
          <el-table-column prop="sum" label="已入库数量"></el-table-column>
          <el-table-column prop="inboundgoolsNum" label="本次入库数量" width="110px">
            <!-- <template slot-scope="scope">
              <el-input v-model="scope.row.inboundgoolsNum"></el-input>
            </template>-->
          </el-table-column>
          <el-table-column prop="pcommodityUnit" label="单位">
            <template slot-scope="scope">
              <el-select
                v-model="scope.row.pcommodityUnit"
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
          <el-table-column prop="basicId" label="入库仓库" width="140px">
            <template slot-scope="scope">
              <el-select
                v-model="scope.row.basicId"
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
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button @click="addOrderMsg(scope.$index)" size="mini" type="primary">关联追踪号</el-button>
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
            v-model="addOrderFrom.inboundRemark"
            style="width:600px"
          ></el-input>
        </el-form-item>
      </el-form>

      <!-- 2个按钮 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="addOrderVisible = false">取 消</el-button>
        <el-button @click="addInputOrder()" type="primary">确 认</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="选择商品"
      :visible.sync="choosePurchaseGoodsVisible"
      width="58%"
      :before-close="handleClose"
    >
      <el-table border stripe :data="purchaseGoodsList" @selection-change="handleSelectionChange1">
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
        <el-table-column label="操作" align="center" width="90px">
          <template slot-scope="scope">
            <el-button size="mini" type="danger" @click="deleteRow(scope.$index)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-button @click="traceNoList.push({})">增加行</el-button>
      <span slot="footer" class="dialog-footer">
        <el-button @click="traceNodialogVisible = false">取 消</el-button>
        <el-button @click="traceNodialogSave(index)" type="primary">保 存</el-button>
      </span>
    </el-dialog>


    <!-- ref="chaOrderFrom" -->
    <el-dialog
      title="新增生产入库单"
      :visible.sync="addProduceInOrderVisible"
      width="60%"
      :before-close="handleClose"
    >
      <el-form
        :inline="true"
        class="demo-form-inline search"
        :model="chaOrderFrom"
        
        label-width="90px"
        label-position="left"
      >
        <el-row :gutter="20" class="row">
          <el-col :span="24">
            <el-form-item label="生产单号：" prop="porderCode">
              <el-input class="_small" v-model="chaOrderFrom.porderCode"></el-input>
            </el-form-item>

            <el-form-item label="入库类型：" prop="porderCode">
              <el-input class="_small" v-model="chaOrderFrom.porderCode"></el-input>
            </el-form-item>

            <el-form-item label="制单人：" prop="porderCode">
              <el-input class="_small" v-model="chaOrderFrom.porderCode"></el-input>
            </el-form-item>

            <!-- <el-form-item label="入库仓库：" prop="supplierId">
              <el-select v-model="chaOrderFrom.supplierId" placeholder="请选择" class="_small">
                <el-option
                  v-for="item in supplier"
                  :key="item.supplierId"
                  :label="item.supName"
                  :value="item.supplierId"
                ></el-option>
              </el-select>
            </el-form-item>-->

            <el-form-item label="入库日期：" prop="porderCode">
              <el-input class="_small" v-model="chaOrderFrom.porderCode"></el-input>
            </el-form-item>

            <el-table
              border
              stripe
              :data="purchaseGoodsList"
              @selection-change="handleSelectionChange1"
            >
              <el-table-column type="index" width="50px" label="序号" align="center"></el-table-column>
              <el-table-column prop="supgoolssmallType" label="产品名称"></el-table-column>
              <el-table-column prop="supgoolsId" label="产品规格"></el-table-column>
              <!-- 二选一 -->
              <el-table-column prop="supgoolsId" label="印刷版号"></el-table-column>
              <el-table-column prop="supgoolsId" label="生产追踪号"></el-table-column>

              <el-table-column prop="supgoolsSplicing" label="入库重量"></el-table-column>
              <el-table-column prop="pcommodityPalnnum" label="单位"></el-table-column>
              <el-table-column prop="pcommodityPalnnum" label="入库仓库"></el-table-column>
            </el-table>

            <br />

            <el-form-item label="备注：" prop="porderCode">
              <el-input
                class="_small"
                v-model="chaOrderFrom.porderCode"
                type="textarea"
                style="width:600px"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="addProduceInOrderVisible = false">取 消</el-button>
        <el-button @click="chooseGoodsFormSava()" type="primary">确 定</el-button>
      </span>
    </el-dialog>


    <!-- ref="chaOrderFrom" -->
    <el-dialog
      title="新增生产退料入库单"
      :visible.sync="addProduceReturnOrderVisible"
      width="60%"
      :before-close="handleClose"
    >
      <el-form
        :inline="true"
        class="demo-form-inline search"
        :model="chaOrderFrom"
        
        label-width="90px"
        label-position="left"
      >
        <el-row :gutter="20" class="row">
          <el-col :span="24">
            <el-form-item label="生产单号：" prop="porderCode">
              <el-input class="_small" v-model="chaOrderFrom.porderCode"></el-input>
            </el-form-item>

            <el-form-item label="入库类型：" prop="porderCode">
              <el-input class="_small" v-model="chaOrderFrom.porderCode"></el-input>
            </el-form-item>

            <el-form-item label="制单人：" prop="porderCode">
              <el-input class="_small" v-model="chaOrderFrom.porderCode"></el-input>
            </el-form-item>

            <el-form-item label="入库日期：" prop="porderCode">
              <el-input class="_small" v-model="chaOrderFrom.porderCode"></el-input>
            </el-form-item>

            <!-- table -->
            <el-table
              :data="addOrderFrom.inboundGoolsDos"
              style="width: 100%"
              @selection-change="handleSelectionChange1"
            >
              <el-table-column type="selection" width="55"></el-table-column>
              <el-table-column prop="supgoolssmallType" label="商品小类型"></el-table-column>
              <el-table-column prop="supgoolsId" label="商品名称"></el-table-column>
              <el-table-column prop="supgoolsSplicing" width="200px" align="center" label="商品描述"></el-table-column>
              <el-table-column prop="pcommodityPalnnum" label="总数"></el-table-column>
              <!-- <el-table-column prop label="已入库数量"></el-table-column> -->
              <el-table-column prop="inboundgoolsNum" label="本次入库数量">
                <!-- <template slot-scope="scope">
              <el-input v-model="scope.row.inboundgoolsNum"></el-input>
                </template>-->
              </el-table-column>
              <el-table-column prop="pcommodityUnit" label="单位">
                <template slot-scope="scope">
                  <el-select
                    v-model="scope.row.pcommodityUnit"
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
              <el-table-column prop="basicId" label="入库仓库" width="140px">
                <template slot-scope="scope">
                  <el-select
                    v-model="scope.row.basicId"
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
              <el-table-column prop label="操作" align="center">
                <template slot-scope="scope">
                  <el-button @click="addOrderMsg(scope.$index)" size="mini" type="primary">关联追踪号</el-button>
                </template>
              </el-table-column>
              <!-- <el-table-column prop="pcommodityPalnnum" label="总数"></el-table-column> -->
              <el-table-column prop="jsonofinboundgoolsTrack" type="expand" label="追踪号" width="70px">
                <template slot-scope="scope">
                  <!-- <span>{{scope.row.deliverOrderListShow}}</span> -->
                  <el-table
                    :data="scope.row.jsonofinboundgoolsTrack"
                    style="width: 50%"
                    :border="true"
                  >
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
                v-model="addOrderFrom.inboundRemark"
                style="width:600px"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="addProduceReturnOrderVisible = false">取 消</el-button>
        <el-button @click="chooseGoodsFormSava()" type="primary">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      activeName: "first",

      chaOrderFrom: {
        porderCode: "",
        supplierId: "",
        porderArrivalstatus: "",
        pageCode: 1,
        pageSize: 10
      },
      chaOrder: {},
      orderList: [],
      total: 0,
      currentPage: 0,
      supplier: [], //供应商数组
      warehouseOptions: [], //仓库数组
      unit: [], //单位数组
      // 新增表单可见
      addOrderVisible: false,
      // 新增表单数据
      addOrderFrom: {
        inboundProducer: "", //制单人
        inboundTime: "", //入库时间
        inboundType: "0", //入库类型
        porderCode: "", //关联采购单号
        produceCode: "", //关联生产单号
        inboundRemark: "", //备注
        inboundGoolsDos: [] //已选择的商品列表
      },
      // 采购订单可供选择商品列表
      purchaseGoodsList: [],

      selectedList: [],

      choosePurchaseGoodsVisible: false,

      traceNoList: [{}], // 追踪号列表
      traceNodialogVisible: false, // 送回单选择

      index: 0, // 入库单商品索引

      // 采购入库

      // 生产入库
      addProduceInOrderVisible: false, //新建生产入库单是否可见

      // 生产退料入库
      addProduceReturnOrderVisible: false //新建生产退料入库
    };
  },
  created() {
    this.getWarehouseOptions();
    this.querySupplier();
    this.getList(1);
    this.getCookie();
    this.queryUnit();
  },
  methods: {
    ResetForm(formName) {
      this.$refs[formName].resetFields();
      console.log("表单重置")
      console.log(this.chaOrderFrom)

    },
    // 供应商查询
    async querySupplier() {
      const { data: res } = await this.$http.post(
        "jc/supplier/selectSupplier",
        { params: { a: "" } }
      );
      // console.log("供应商信息");
      // console.log(res);

      res.body.rows.forEach(e => {
        let x = {
          supName: e.supName,
          supplierId: e.supplierId
        };
        this.supplier.push(x);
      });

      // console.log(this.supplier);
    },
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
    async getList(val) {
      // const { data: res1 } = await this.$http.post("jh/purchase/dtjresultMap");
      // this.chaOrderFrom.pageCode = 1;
      if (val) {
        // 重新点击时，需要重置查询页数
        this.chaOrderFrom.pageCode = 1;
        this.chaOrder = JSON.parse(JSON.stringify(this.chaOrderFrom));
      }
      const { data: res } = await this.$http.post(
        "jh/purchase/selectpurc",
        this.chaOrder
      );
      this.orderList = res.body.rows;
      this.total = res.body.total;
    },
    handleCurrentChange(val) {
      this.chaOrder.pageCode = val;
      this.getList();
    },
    // 入库
    showEditOrder(porderCode, inboundType) {
      this.addOrderFrom.porderCode = porderCode;
      this.addOrderFrom.inboundType = inboundType + "";
      this.addOrderFrom.inboundGoolsDos = [];
      // console.log(porderCode);
      this.addOrderVisible = true;
    },
    //
    getCookie: function() {
      var storage = window.localStorage;
      this.addOrderFrom.inboundProducer = storage.getItem("username");
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


      //获取已入库数量
      const { data: res2 } = await this.$http.post(
        "kc/inbound/selectallgools",
        {
          porderCode: porderCode,
          suppliergoolsId: ids
        }
      );
      console.log("res2 已入库数量")
      console.log(res2)
      this.purchaseGoodsList.forEach((purGood, index, arr) => {
        res2.forEach((item, index, arr) => {
          if (purGood.suppliergoolsId == item.suppliergoolsId) {
            // 已入库数量
            purGood.sum = item.sum;
          }
        });
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
    async chooseGoodsFormSava() {
      let length = this.addOrderFrom.inboundGoolsDos.length;

      if (length == 0) {
        //长度为0，直接添加元素
        this.selectedList.forEach((item, index, arr) => {
          this.addOrderFrom.inboundGoolsDos.push(item);
        });
      } else {
        for (let i = 0; i < this.selectedList.length; i++) {
          for (let j = 0; j < length; j++) {
            if (
              this.addOrderFrom.inboundGoolsDos[j].suppliergoolsId ==
              this.selectedList[i].suppliergoolsId
            ) {
              break;
            }
            if (j == length - 1) {
              this.addOrderFrom.inboundGoolsDos.push(this.selectedList[i]);
            }
          }
        }
      }
      // 有元素被过滤，跳出提示
      if (
        length + this.selectedList.length >
        this.addOrderFrom.inboundGoolsDos.length
      ) {
        this.$message({
          type: "info",
          message: "部分商品已经存在!"
        });
      }

      console.log("---------------------------------");
      console.log(this.addOrderFrom.inboundGoolsDos);

      this.chooseGoodsFormCancel();
    },
    dialogClosed(val) {
      this.$refs[val].resetFields();
    },
    // 选择采购商品中的可选商品
    handleSelectionChange1(val) {
      this.selectedList = val;
      // console.log(this.selectedList);
    },
    // 删除添加采购订单中的商品
    deleteAddPurGoods() {
      for (let i = 0; i < this.addOrderFrom.inboundGoolsDos.length; i++) {
        for (let j = 0; j < this.selectedList.length; j++) {
          if (
            this.addOrderFrom.inboundGoolsDos[i].suppliergoolsId ==
            this.selectedList[j].suppliergoolsId
          ) {
            this.addOrderFrom.inboundGoolsDos.splice(i--, 1);
            break;
          }
        }
      }
    },
    // 新增入库单
    async addInputOrder() {
      if (this.addOrderFrom.inboundGoolsDos.length == 0) {
        this.addOrderVisible = false;
        this.$message({
          type: "info",
          message: "入库商品为空，添加入库单失败！"
        });
        return;
      }

      const { data: res } = await this.$http.post(
        "kc/inbound/createorder",
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
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    handleClick() {},

    // 关联送货单号，参数为入库单商品索引
    addOrderMsg(index) {
      this.index = index;
      if (
        this.addOrderFrom.inboundGoolsDos[index].jsonofinboundgoolsTrack !==
        undefined
      ) {
        this.traceNoList = JSON.parse(
          JSON.stringify(
            this.addOrderFrom.inboundGoolsDos[index].jsonofinboundgoolsTrack
          )
        );
      }
      this.traceNodialogVisible = true;
    },
    // 送货单信息删除行
    deleteRow(val) {
      console.log(val);
      this.traceNoList.splice(val, 1);
    },
    // 处理送货单信息关闭
    handleTraceNodialogClose() {
      this.traceNoList = [{}];
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
      // 使用深拷贝
      this.addOrderFrom.inboundGoolsDos[index].jsonofinboundgoolsTrack = arr;
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
      this.addOrderFrom.inboundGoolsDos[index].inboundgoolsNum = sum;
      this.addOrderFrom.inboundGoolsDos[index].inboundgoolsNum.toFixed(2);
      // 深拷贝，刷一下
      this.addOrderFrom.inboundGoolsDos = JSON.parse(
        JSON.stringify(this.addOrderFrom.inboundGoolsDos)
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

    // 相加
    add(arg1, arg2) {
      return (Math.round(arg1 * 100) + Math.round(arg2 * 100)) / 100;
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
</style>  