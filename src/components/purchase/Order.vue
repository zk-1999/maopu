<template>
  <div class="min1500">
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>进货管理</el-breadcrumb-item>
      <el-breadcrumb-item>采购订单</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
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
              <el-input placeholder="请输入订单编号" class="_small" v-model="chaOrderFrom.porderCode"></el-input>
            </el-form-item>
            <el-form-item label="制单人员：" prop="porderProducer">
              <el-input placeholder="请输入人员" v-model="chaOrderFrom.porderProducer" class="_small"></el-input>
            </el-form-item>
            <el-form-item label="到货情况：" prop="porderArrivalstatus">
              <el-select
                v-model="chaOrderFrom.porderArrivalstatus"
                placeholder="请选择"
                class="_small"
              >
                <el-option value label="全部"></el-option>
                <el-option value="0" label="未到货"></el-option>
                <el-option value="1" label="部分到货"></el-option>
                <el-option value="2" label="全部到货"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="订单状态：" prop="porderState">
              <el-select v-model="chaOrderFrom.porderState" placeholder="请选择" class="_small">
                <el-option value label="全部"></el-option>
                <el-option value="0" label="初始化"></el-option>
                <el-option value="1" label="待初审"></el-option>
                <el-option value="2" label="初审未通过"></el-option>
                <el-option value="3" label="待复审"></el-option>
                <el-option value="4" label="复审未通过"></el-option>
                <el-option value="5" label="采购中"></el-option>
                <!-- <el-option value="6" label="待入库"></el-option> -->
                <!-- <el-option value="7" label="部分入库"></el-option> -->
                <el-option value="8" label="已完成"></el-option>
                <!-- <el-option value="9" label="结束"></el-option> -->
              </el-select>
            </el-form-item>
            <el-form-item label="制单时间：" prop="time">
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
              <!-- <el-button type="primary" @click="addOrderVisible = true">重 置</el-button> -->
              <!-- <el-button type="primary" @click="editOrderVisible = true">重 置</el-button> -->
              <!-- <el-button type="primary" @click="editOrderVisible = true;lookUpState = true">重 置</el-button> -->
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <!-- addOrderVisible = true;editOrde  = false;addOrEdit = 1; -->
      <el-button type="success" @click="addPurchareOrder()">新 增</el-button>
      <el-button
        type="primary"
        @click="checkOrderList()"
        :disabled="orderListCheckOrders.length == 0"
      >提 审</el-button>
      <el-button
        @click="stopOrderList()"
        type="danger"
        :disabled="orderListCheckOrders.length == 0"
      >终 止</el-button>
      <!-- <el-button type="danger" @click="stopOrderList()">终 止</el-button>   -->
      <!-- <el-button @click="edit" :disabled="selectedList.length == 0">编辑</el-button>
            <el-button @click="del" :disabled="selectedList.length == 0">删除</el-button>
      <el-button @click="check">提审</el-button>-->
      <!-- <el-button @click="stop">终止采购</el-button> -->
      <el-table border :data="orderList" @selection-change="handleSelectionChange2">
        <el-table-column type="selection" width="50px"></el-table-column>
        <el-table-column type="index" label="序号" align="center" width="50px"></el-table-column>
        <el-table-column prop="porderCode" label="订单编号" width="180px" align="center"></el-table-column>
        <!-- <el-table-column prop="supplierDOs.supName" label="供应商" :show-overflow-tooltip="true"></el-table-column> -->
        <el-table-column prop="porderPalnmoney" label="预付款金额" width="100px"></el-table-column>
        <el-table-column prop="porderTotalmoney" label="总金额"></el-table-column>
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
        <!-- <el-table-column prop="porderBuyer" label="采购人"></el-table-column> -->
        <!-- <el-table-column prop="porderCompletenum" label="已采购数量"></el-table-column> -->
        <!-- <el-table-column prop="porderStarttime" label="采购周期" width="200" align="center">
          <template slot-scope="scope">{{scope.row.porderStarttime+"-"+scope.row.porderStoptime}}</template>
        </el-table-column>-->
        <el-table-column prop="porderTime" label="制单时间" width="200" align="center"></el-table-column>
        <el-table-column prop="porderReviewedtime" label="审批时间" width="200" align="center"></el-table-column>
        <el-table-column prop="porderState" label="订单状态" width="105px" align="center">
          <template slot-scope="scope">
            <el-tag type="danger" v-if="scope.row.porderState==0">初始化</el-tag>
            <el-tag type="danger" v-if="scope.row.porderState==1">待初审</el-tag>
            <el-tag type="danger" v-if="scope.row.porderState==2">初审未通过</el-tag>
            <el-tag type="danger" v-if="scope.row.porderState==3">待复审</el-tag>
            <el-tag type="danger" v-if="scope.row.porderState==4">复审未通过</el-tag>
            <el-tag type="danger" v-if="scope.row.porderState==5">采购中</el-tag>
            <!-- <el-tag type="danger" v-if="scope.row.porderState==6">待入库</el-tag> -->
            <!-- <el-tag type="danger" v-if="scope.row.porderState==7">部分入库</el-tag> -->
            <el-tag type="danger" v-if="scope.row.porderState==8">已完成</el-tag>
            <!-- <el-tag type="danger" v-if="scope.row.porderState==9">结束</el-tag> -->
          </template>
        </el-table-column>
        <!-- width="270px" -->
        <!-- ,operationFlag2?operationWidth2:'',operationFlag1?operationWidth1:'' -->
        <!-- :width="[operationFlag3?'270px':(operationFlag2?'180px':(operationFlag1?'90px':'0'))]" -->
        <el-table-column label="操作" width="270px" align="center" fixed="right">
          <template slot-scope="scope">
            <el-button type="success" size="mini" @click="showLookUpOrder(scope.row.porderCode)">查看</el-button>
            <el-button
              type="primary"
              size="mini"
              :disabled="!(scope.row.porderState==0||scope.row.porderState==2||scope.row.porderState==4)"
              @click="showEditOrder(scope.row.porderCode)"
            >编辑</el-button>
            <!-- :disabled="!(scope.row.porderState==0||scope.row.porderState==2||scope.row.porderState==4)" -->
            <!-- v-if="scope.row.porderState==0||scope.row.porderState==2||scope.row.porderState==4" -->
            <!-- <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              v-if="scope.row.porderState==0"
              @click="editPurOrderState(scope.row,1)"
            >提审</el-button>-->
            <!-- v-if="scope.row.porderState==2||scope.row.porderState==4" -->
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              :disabled="!(scope.row.porderState==0||scope.row.porderState==2||scope.row.porderState==4)"
              @click="deletebumen(scope.row.porderCode)"
            >删除</el-button>
            <!-- <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              v-if="scope.row.porderState==5"
              @click="editPurOrderState(scope.row,8)"
            >终止</el-button>-->
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="10"
        layout="total, prev,pager, next"
        :total="total"
      ></el-pagination>
    </el-card>

    <el-dialog
      title="新增采购订单"
      :visible.sync="addOrderVisible"
      width="75%"
      :before-close="handleClose"
      @closed="dialogClosed('addOrderRef')"
    >
      <el-form
        :label-position="labelPosition"
        label-width="100px"
        :model="addOrderForm"
        ref="addOrderRef"
        :rules="addOrderRules"
        :inline="true"
      >
        <el-button type="primary" @click="addGoods(1)">添加商品</el-button>
        <el-button
          type="danger"
          :disabled="addSelectedList.length == 0 && addSelectedList_two == 0"
          @click="deleteAddbumen(addOrderForm.pcommodityDos,1)"
        >删除商品</el-button>
        <div class="fenge">商品信息</div>
        <el-table border :data="addOrderForm.pcommodityDos" @selection-change="addSelectionChange">
          <el-table-column type="selection" width="40" align="center"></el-table-column>
          <el-table-column type="index" width="50px" align="center" label="序号"></el-table-column>
          <el-table-column prop="supgoolssmallType" label="商品小类型"></el-table-column>
          <el-table-column prop="supgoolsId" label="商品名称"></el-table-column>
          <el-table-column prop="supgoolsSplicing" label="商品描述" width="270px" align="center"></el-table-column>
          <el-table-column label="单位">
            <template slot-scope="scope">
              <el-select v-model="scope.row.pcommodityUnit" placeholder="请选择" class="_small">
                <el-option
                  v-for="item in unit"
                  :key="item.basicId"
                  :label="item.basicRetainone"
                  :value="item.basicId"
                ></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column label="入库仓库">
            <template slot-scope="scope">
              <el-select v-model="scope.row.basicId" placeholder="请选择" class="_small">
                <el-option
                  v-for="item in warehouseOptions"
                  :key="item.basicId"
                  :label="item.basicRetainone"
                  :value="item.basicId"
                ></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column label="单价（元）">
            <template slot-scope="scope">
              <el-input
                v-model="scope.row.pcommodityPrice"
                @blur="addCalculate(addOrderForm)"
                type="number"
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="pcommodityPalnnum" label="数量">
            <template slot-scope="scope">
              <el-input
                v-model="scope.row.pcommodityPalnnum"
                @blur="addCalculate(addOrderForm)"
                type="number"
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column label="金额">
            <template slot-scope="scope">
              <span
                v-if="(!isNaN(scope.row.pcommodityPrice))&&(!isNaN(scope.row.pcommodityPalnnum))"
              >{{multiple(scope.row.pcommodityPrice ,scope.row.pcommodityPalnnum).toFixed(2)}}</span>
            </template>
          </el-table-column>
        </el-table>
        <div class="fenge1">供应商信息</div>
        <el-form-item label="选择供应商：" prop="supplierId">
          <el-select
            v-model="addOrderForm.supplierId"
            placeholder="请选择"
            class="_small"
            @change="changeGongyingshang"
          >
            <el-option
              v-for="item in gongyinshang"
              :key="item.supplierId"
              :label="item.supName"
              :value="item.supplierId"
            ></el-option>
          </el-select>
        </el-form-item>

        <br />

        <el-table border :data="gongyingshangOfForm">
          <!-- <el-table-column type="selection" width="40" align="center"></el-table-column> -->
          <el-table-column prop="supName" label="供应商名称"></el-table-column>
          <el-table-column prop="supId" label="供应商编码"></el-table-column>
          <el-table-column prop="supType" label="供应商类型"></el-table-column>
          <el-table-column prop="supContacts" label="联系人"></el-table-column>
          <el-table-column prop="supPhone" label="手机"></el-table-column>
        </el-table>

        <div class="fenge1">付款信息</div>
        <el-form-item label="总数量：" prop="porderTotalnum">
          <el-input v-model="addOrderForm.porderTotalnum" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="总金额：" prop="porderTotalmoney">
          <el-input v-model="addOrderForm.porderTotalmoney" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="需预付金额：" prop="porderPalnmoney">
          <el-input v-model="addOrderForm.porderPalnmoney"></el-input>
        </el-form-item>

        <el-form-item label="预付说明：" prop="porderExplain">
          <el-input
            type="textarea"
            placeholder="请输入内容"
            v-model="addOrderForm.porderExplain"
            style="width: 600px"
          ></el-input>
        </el-form-item>

        <div class="fenge1">采购描述</div>

        <el-form-item label="制单人员：" prop="porderProducer">
          <el-input v-model="addOrderForm.porderProducer" :disabled="true" class="_small"></el-input>
        </el-form-item>

        <el-form-item label="采购人员：" prop="porderBuyer">
          <el-input v-model="addOrderForm.porderBuyer" class="_small"></el-input>
        </el-form-item>

        <el-form-item label="下单时间：" prop="porderOrdertime">
          <el-date-picker
            v-model="addOrderForm.porderOrdertime"
            type="date"
            value-format="yyyy-MM-dd"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </el-form-item>

        <el-form-item label="采购周期：" prop="time">
          <el-date-picker
            v-model="addOrderForm.time"
            type="daterange"
            format="yyyy年MM月dd日"
            value-format="yyyy-MM-dd"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :disabled="lookUpState"
          ></el-date-picker>
        </el-form-item>

        <br />

        <el-form-item label="备注：" prop="porderBuyexplain">
          <el-input
            type="textarea"
            placeholder="请输入内容"
            v-model="addOrderForm.porderBuyexplain"
            style="width: 600px"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addCancel()">取 消</el-button>
        <el-button @click="addSave" type="primary">确 认</el-button>
      </span>
    </el-dialog>
    <!--  @closed="dialogClosed" -->
    <el-dialog
      :title="lookUpState?'查看订单':'修改订单' "
      :visible.sync="editOrderVisible"
      width="75%"
      :before-close="handleClose"
      @closed="dialogClosed('editOrderRef')"
    >
      <el-form
        label-position="labelPosition"
        :model="editOrderForm"
        ref="editOrderRef"
        :rules="addOrderRules"
        :inline="true"
        label-width="100px"
      >
        <el-button type="primary" @click="addGoods(2)" v-if="!lookUpState">添加商品</el-button>
        <el-button
          type="dange"
          v-if="!lookUpState"
          :disabled="(addSelectedList.length == 0 && addSelectedList_two == 0)"
          @click="deleteAddbumen(editOrderForm.pcommodityDos,2)"
        >删除商品</el-button>
        <el-table border :data="editOrderForm.pcommodityDos" @selection-change="addSelectionChange">
          <el-table-column type="selection" width="40" align="center" v-if="!lookUpState"></el-table-column>
          <el-table-column type="index" width="50px" align="center" label="序号"></el-table-column>
          <el-table-column prop="supgoolssmallType" label="商品名称"></el-table-column>
          <el-table-column prop="supgoolsId" label="商品编码"></el-table-column>
          <el-table-column prop="supgoolsSplicing" label="商品描述"></el-table-column>
          <el-table-column label="单位">
            <template slot-scope="scope">
              <el-select v-model="scope.row.pcommodityUnit" placeholder="请选择" class="_small" :disabled="lookUpState">
                <el-option
                  v-for="item in unit"
                  :key="item.basicId"
                  :label="item.basicRetainone"
                  :value="item.basicId"
                ></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column label="入库仓库">
            <template slot-scope="scope">
              <el-select v-model="scope.row.basicId" placeholder="请选择" class="_small" :disabled="lookUpState">
                <el-option
                  v-for="item in warehouseOptions"
                  :key="item.basicId"
                  :label="item.basicRetainone"
                  :value="item.basicId"
                ></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column prop label="单价（元）">
            <template slot-scope="scope">
              <el-input
                v-model="scope.row.pcommodityPrice"
                @blur="addCalculate(editOrderForm)"
                :disabled="lookUpState"
                type="number"
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="pcommodityPalnnum" label="数量">
            <template slot-scope="scope">
              <el-input
                v-model="scope.row.pcommodityPalnnum"
                @blur="addCalculate(editOrderForm)"
                :disabled="lookUpState"
                type="number"
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="pcommodityPrice" label="金额">
            <template slot-scope="scope">
              <span
                v-if="!isNaN(scope.row.pcommodityPrice * scope.row.pcommodityPalnnum)"
              >{{scope.row.pcommodityPrice * scope.row.pcommodityPalnnum}}</span>
            </template>
          </el-table-column>
        </el-table>
        <dir class="fenge">供应商信息</dir>
        <el-form-item label="选择供应商：" prop="supplierId">
          <el-select
            v-model="editOrderForm.supplierId"
            placeholder="请选择"
            class="_small"
            @change="changeGongyingshang"
            :disabled="lookUpState"
          >
            <el-option
              v-for="item in gongyinshang"
              :key="item.supplierId"
              :label="item.supName"
              :value="item.supplierId"
            ></el-option>
          </el-select>
        </el-form-item>

        <!-- <el-form-item prop="supplierId">
          <el-button @click="xxx" type="primary" size="small">添加</el-button>
          <el-button @click="deleteGongyingshang()" type="danger" size="small">删除</el-button>
        </el-form-item>-->

        <br />

        <el-table border :data="gongyingshangOfForm">
          <!-- <el-table-column type="selection" width="40" align="center"></el-table-column> -->
          <el-table-column prop="supName" label="供应商名称"></el-table-column>
          <el-table-column prop="supId" label="供应商编码"></el-table-column>
          <el-table-column prop="supType" label="供应商类型"></el-table-column>
          <el-table-column prop="supContacts" label="联系人"></el-table-column>
          <el-table-column prop="supPhone" label="手机"></el-table-column>
        </el-table>

        <div class="fenge1">付款信息</div>
        <el-form-item label="总数量：" prop="porderTotalnum">
          <el-input v-model="editOrderForm.porderTotalnum" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="总金额：" prop="porderTotalmoney">
          <el-input v-model="editOrderForm.porderTotalmoney" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="需预付金额：" prop="porderPalnmoney">
          <el-input v-model="editOrderForm.porderPalnmoney" :disabled="lookUpState"></el-input>
        </el-form-item>

        <el-form-item label="预付说明：" prop="porderExplain">
          <el-input
            type="textarea"
            placeholder="请输入内容"
            v-model="editOrderForm.porderExplain"
            style="width: 600px"
            :disabled="lookUpState"
          ></el-input>
        </el-form-item>

        <div class="fenge1">采购描述</div>

        <el-form-item label="制单人员：" prop="porderProducer">
          <el-input v-model="editOrderForm.porderProducer" :disabled="true" class="_small"></el-input>
        </el-form-item>

        <el-form-item label="采购人员：" prop="porderBuyer">
          <el-input v-model="editOrderForm.porderBuyer" class="_small" :disabled="lookUpState"></el-input>
        </el-form-item>

        <!-- <el-form-item label="入库仓库" prop="basicId">
          <el-select
            v-model="editOrderForm.basicId"
            placeholder="请选择"
            class="_small"
            :disabled="lookUpState"
          >
            <el-option
              v-for="item in cangku"
              :key="item.basicId"
              :label="item.basicRetainone"
              :value="item.basicId"
            ></el-option>
          </el-select>
        </el-form-item>-->

        <el-form-item label="下单时间：" prop="porderOrdertime">
          <el-date-picker
            v-model="editOrderForm.porderOrdertime"
            type="date"
            value-format="yyyy-MM-dd"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :disabled="lookUpState"
          ></el-date-picker>
        </el-form-item>

        <el-form-item label="采购周期：" prop="time">
          <el-date-picker
            v-model="editOrderForm.time"
            type="daterange"
            format="yyyy年MM月dd日"
            value-format="yyyy-MM-dd"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :disabled="lookUpState"
          ></el-date-picker>
        </el-form-item>

        <el-form-item label="备注：" prop="porderBuyexplain">
          <el-input
            type="textarea"
            placeholder="请输入内容"
            v-model="editOrderForm.porderBuyexplain"
            style="width: 600px"
            :disabled="lookUpState"
          ></el-input>
        </el-form-item>
        <!-- <div v-if="this.editOrderForm.porderState == 2">
          <hr />

          <el-form-item label="审核人" prop="porderReviewman">
            <el-input v-model="editOrderForm.porderReviewman" :disabled="true"></el-input>
          </el-form-item>
          <br />
          <el-form-item label="备注" prop="porderReviewexplain">
            <el-input
              type="textarea"
              v-model="editOrderForm.porderReviewexplain"
              style="width:600px"
              :disabled="true"
            ></el-input>
          </el-form-item>
        </div>-->

        <div v-if="editOrderForm.porderState != 0 && editOrderForm.porderState != 1">
          <div class="fenge1">采购审核（初审）</div>

          <el-form-item label="审核人：" prop="porderReviewman">
            <el-input v-model="editOrderForm.porderReviewman" :disabled="true"></el-input>
          </el-form-item>
          <br />
          <el-form-item label="备注：" prop="porderReviewexplain">
            <el-input
              type="textarea"
              v-model="editOrderForm.porderReviewexplain"
              style="width:600px"
              :disabled="true"
            ></el-input>
          </el-form-item>
        </div>
        <div
          v-if="editOrderForm.porderState == 4 ||editOrderForm.porderState == 5 ||editOrderForm.porderState == 8"
        >
          <div class="fenge1">采购审核（复审）</div>

          <el-form-item label="审核人：" prop="porderReviewedman">
            <el-input v-model="editOrderForm.porderReviewedman" :disabled="true"></el-input>
          </el-form-item>
          <br />
          <el-form-item label="备注：" prop="porderReviewedexplain">
            <el-input
              type="textarea"
              v-model="editOrderForm.porderReviewedexplain"
              style="width:600px"
              :disabled="true"
            ></el-input>
          </el-form-item>
        </div>
      </el-form>

      <span slot="footer" class="dialog-footer" v-show="!lookUpState">
        <el-button @click="addCancel()">取 消</el-button>
        <el-button @click="editOrder" type="primary">保 存</el-button>
      </span>
      <span slot="footer" class="dialog-footer" v-show="lookUpState">
        <el-button @click="lookUpState=false;addCancel()">取 消</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="选择商品"
      :visible.sync="visibleOfChooseGoods"
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
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="chooseGoodsFormCancel()">取 消</el-button>
        <el-button @click="chooseGoodsFormSava()" type="primary">保 存</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      orderList: [],
      selectedList: [],
      editOrde: false,
      addOrderVisible: false,
      editOrderVisible: false,
      labelPosition: "right",
      addOrderForm: {
        porderProducer: "", //制单人员
        time: [], //采购周期范围
        porderBuyexplain: "", //采购描述
        // time:'',
        basicId: "",
        supplierId: "",
        suppliergoolsId: "",
        porderTotalnum: 0,
        porderTotalmoney: 0,
        porderPalnmoney: "", //预付款金额
        porderBuyexplain: "",
        porderExplain: "",
        pcommodityDos: [],
        gongyingshang: {}, //供应商信息
        porderOrdertime: "",
        lab: "原纸",
        pageCode: 1, //当前页
        pageSize: 10, //每页显示的记录数
        porderBuyer: "",

        supgoolsBigtype: "" //商品大类型
      },
      editOrderForm: {
        porderCode: "",
        porderBuyexplain: "", //采购描述
        porderProducer: "",
        porderPalnmone: "",
        basicId: "",
        supName: "",
        time: "",
        suppliergoolsId: "",
        porderTotalnum: 0,
        porderTotalmoney: 0,
        porderPalnmoney: "", // 预付款金额
        porderOrdertime: "",
        // porderBuyexplain:'',
        porderExplain: "",
        pcommodityDos: [],
        lab: "原纸",
        supplierId: "",
        pageCode: 1, //当前页
        pageSize: 10, //每页显示的记录数
        porderBuyer: "",
        porderReviewman: "", //订单出身人
        porderReviewexplain: "", //订单初审备注
        porderReviewedman: "", //订单俯身人
        porderReviewedexplain: "", //订单复审备注
        porderState: "", //订单状态
        supgoolsSplicing: "", //商品描述

        supgoolsBigtype: "" //商品大类型
      },
      lookUpState: false,
      chaOrderFrom: {
        porderCode: "", //订单编号
        porderProducer: "", //制单人员
        time: [], //制单时间范围
        porderArrivalstatus: "", //到货情况
        porderState: "", //订单状态
        pageCode: 1, //当前页
        pageSize: 10 //每页显示的记录数
      },
      // 实际查询参数
      chaOrder: {
        porderCode: "", //订单编号
        porderProducer: "", //制单人员
        time: [], //制单时间范围
        porderArrivalstatus: "", //到货情况
        porderState: "", //订单状态
        pageCode: 1, //当前页
        pageSize: 10 //每页显示的记录数
      }, //
      chaSupplierForm: {
        a: ""
      },
      gongyinshang: [],
      cangku: [],
      addOrderRules: {
        Id: [],
        zdry: []
      },
      addSelectedList: [],
      addSelectedList_two: [],
      addOrder_addgoods: false,
      addOrderFormGoods: {
        Id: "",
        Name: "",
        gys: ""
      },
      delarr: [],
      delarr1: [],
      shangpi: [],
      total: 0,

      addOrderGoodsRules: {},
      goods_two: [],
      AddGoods: [],
      value1: "",
      currentPage: 0,
      Totalnum: 0,
      Totalmoney: 0,
      panduan: {
        supgoolCoated1: false,
        supgoolsBradth1: false,
        supgoolsBrand1: false,
        supgoolsColor1: false,
        supgoolsHeight1: false,
        supgoolsLength1: false,
        supgoolsWeight1: false,
        supgoolsWidth1: false,
        supgoolsWidths1: false,
        supgoolssmallType1: false
      },
      // 添加商品时属于新增还是编辑 1 新增 2 编辑
      addOrEdit: 1,

      // 11.20
      // 选择商品表单
      chooseGoodsForm: {
        addOrEdit: 0, // 最终选择的商品要去哪 1 添加 2 编辑、查看
        goodsBigType: "原纸", // 商品大类型
        goodsChoosed: [] // 选择商品的集合
      },
      // 选择商品 dialog 是否可视
      visibleOfChooseGoods: false,
      // 供应商信息
      gongyingshangOfForm: [],
      // orderList批量提审
      orderListCheckOrders: "",
      // orderList批量终止
      orderListStopOrders: "",
      // 操作标识
      operationFlag3: false, // 3个按钮
      operationFlag2: false, // 2个按钮
      operationFlag1: false, // 1个按钮

      warehouseOptions: [], //仓库数组
      unit: [] //单位数组
    };
  },
  created() {
    // this.addOrderForm = this.addOrderForm;
    this.chaCopy();
    this.getList();
    this.getCha();
    this.getCookie();
    this.getWarehouseOptions();
    this.queryUnit();
  },
  methods: {
    //读取cookie
    getCookie: function() {
      // if (document.cookie.length > 0) {
      //   var arr = document.cookie.split("; "); //这里显示的格式需要切割一下自己可输出看下
      //   for (var i = 0; i < arr.length; i++) {
      //     var arr2 = arr[i].split("="); //再次切割
      //     //判断查找相对应的值
      //     if (arr2[0] == "userName") {
      //       //  console.log(arr2[1])
      //       this.addOrderForm.porderProducer = arr2[1]; //保存到保存数据的地方
      //     }
      //   }
      //   this.checked = true;
      // }
      var storage = window.localStorage;
      this.addOrderForm.porderProducer = storage.getItem("username");
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
    ResetForm(formName) {
      this.$refs[formName].resetFields();
      // this.chaOrderFrom.porderProducer="";
      // this.porderTime
      // this.porderStarttime
      // this.getList()
    },
    async getCha() {
      const { data: res } = await this.$http.post(
        "jc/supplier/selectSupplier",
        { params: this.chaSupplierForm }
      );
      const { data: res1 } = await this.$http.post(
        "jc/Basic/selectwarehousing"
      );
      this.gongyinshang = res.body.rows;
      // console.log("供应商---");
      // console.log(this.gongyinshang);
      this.cangku = res1;
      // console.log("仓库");
      // console.log(this.cangku);
    },

    handleSelectionChange(val) {
      this.chooseGoodsForm.goodsChoosed = val;
      // this.selectedList = val;
      // console.log(val);
    },
    // orderList 批量提审
    handleSelectionChange2(val) {
      this.orderListCheckOrders = val;
      // console.log(this.orderListCheckOrders);
    },
    // 批量提审
    async checkOrderList() {
      let flag = false;
      let porderCodes = []; //存放所有要提审的订单号
      // 遍历，判断是否存在不能提审的订单，获取要提审的订单号
      this.orderListCheckOrders.forEach((item, index, arr) => {
        porderCodes.push(item.porderCode);
        if (item.porderState != 0) {
          flag = true;
          return false;
        }
      });

      if (flag) {
        this.$message({
          type: "info",
          message: "存在非初始化状态订单，请重新选择！"
        });
        return;
      }

      const { data: res } = await this.$http.post(
        "/jh/purchase/tishen",
        porderCodes
      );

      if (res.body.respCode == 200) {
        this.$message({
          type: "success",
          message: "批量提审成功！"
        });
        this.getList();
        this.orderListCheckOrders = [];
      } else {
        this.$message({
          type: "danger",
          message: "批量提审失败！"
        });
      }
    },
    // 批量终止
    async stopOrderList() {
      let flag = false;
      let porderCodes = []; //存放所有要提审的订单号
      // 遍历，判断是否存在不能提审的订单，获取要提审的订单号
      this.orderListCheckOrders.forEach((item, index, arr) => {
        porderCodes.push(item.porderCode);
        if (item.porderState != 5) {
          flag = true;
          return false;
        }
      });

      if (flag) {
        this.$message({
          type: "info",
          message: "存在非采购中状态订单，请重新选择！"
        });
        return;
      }

      const { data: res } = await this.$http.post(
        "/jh/purchase/zhongzhi",
        porderCodes
      );

      if (res.body.respCode == 200) {
        this.$message({
          type: "success",
          message: "批量终止成功！"
        });
        this.getList();
        this.orderListCheckOrders = [];
      } else {
        this.$message({
          type: "danger",
          message: "批量终止失败！"
        });
      }

      // 对返回值进行判断！！！
    },
    // selected(){
    // this.delVisible = true;
    // this.delarr=[];
    // for (let i = 0; i < this.selectedList.length; i++) {
    //     this.delarr.push(this.selectedList[i].customerId)
    // }
    // console.log(this.delarr);
    // },

    // 原本的
    // async deleteRow(){
    //     for (let i = 0; i < this.selectedList.length; i++) {
    //         console.log(this.selectedList[i]);
    //         this.delarr.push(this.selectedList[i])
    //         this.delarr1.push(this.selectedList[i])

    //     }
    //     console.log(this.delarr);
    //     this.addOrderForm.pcommodityDos=this.delarr;
    //     this.addOrder_addgoods=false;
    // },
    // async deleteRow() {
    //   // 用长度判断是否有商品重复
    //   let length = 0;
    //   if (this.addOrEdit == 1) {
    //     // 新增时添加商品
    //     length = this.addOrderForm.pcommodityDos.length;
    //     for (let i = 0; i < this.selectedList.length; i++) {
    //       console.log(this.selectedList[i]);

    //       // 防止添加的商品已经存在
    //       if (this.addOrderForm.pcommodityDos.length == 0) {
    //         this.addOrderForm.pcommodityDos.push(this.selectedList[i]);
    //       }

    //       for (let j = 0; j < this.addOrderForm.pcommodityDos.length; j++) {
    //         console.log(this.addOrderForm.pcommodityDos[j].supgoolsId);
    //         if (
    //           this.selectedList[i].supgoolsId ==
    //           this.addOrderForm.pcommodityDos[j].supgoolsId
    //         ) {
    //           break;
    //         }
    //         // 最后一次循环添加数据
    //         if (j == this.addOrderForm.pcommodityDos.length - 1) {
    //           this.addOrderForm.pcommodityDos.push(this.selectedList[i]);
    //         }
    //       }
    //       // this.delarr1.push(this.selectedList[i])
    //     }
    //     // 当添加商品时如果存在已有商品，则提示用户
    //     if (
    //       this.addOrderForm.pcommodityDos.length <
    //       length + this.selectedList.length
    //     ) {
    //       this.$message({
    //         type: "info",
    //         message: "部分商品已经存在!"
    //       });
    //     }

    //     // console.log(this.delarr);
    //     // this.addOrderForm.pcommodityDos=this.delarr;
    //   } else if (this.addOrEdit == 2) {
    //     // 编辑时添加商品
    //     length = this.editOrderForm.pcommodityDos.length;
    //     for (let i = 0; i < this.selectedList.length; i++) {
    //       console.log(this.selectedList[i]);

    //       // 防止添加的商品已经存在
    //       if (this.editOrderForm.pcommodityDos.length == 0) {
    //         this.editOrderForm.pcommodityDos.push(this.selectedList[i]);
    //       }
    //       for (let j = 0; j < this.editOrderForm.pcommodityDos.length; j++) {
    //         console.log(this.editOrderForm.pcommodityDos[j].supgoolsId);
    //         if (
    //           this.selectedList[i].supgoolsId ==
    //           this.editOrderForm.pcommodityDos[j].supgoolsId
    //         ) {
    //           break;
    //         }
    //         // 最后一次循环添加数据
    //         if (j == this.editOrderForm.pcommodityDos.length - 1) {
    //           this.editOrderForm.pcommodityDos.push(this.selectedList[i]);
    //         }
    //       }
    //       // this.delarr1.push(this.selectedList[i])
    //     }
    //     // console.log(this.delarr);
    //     // this.addOrderForm.pcommodityDos=this.delarr;

    //     if (
    //       this.editOrderForm.pcommodityDos.length <
    //       length + this.selectedList.length
    //     ) {
    //       this.$message({
    //         type: "info",
    //         message: "部分商品已经存在!"
    //       });
    //     }
    //   }
    //   // 关闭窗口
    //   this.addOrder_addgoods = false;

    //   // 重置默认信息
    //   this.addOrderForm.lab = "原纸";
    // },
    async getList(val) {
      // const { data: res1 } = await this.$http.post("jh/purchase/dtjresultMap");
      // this.chaOrderFrom.pageCode = 1;
      if (val) {
        // 重新点击时，需要重置查询页数
        this.chaOrderFrom.pageCode = 1;
        this.chaCopy();
        // console.log(1111);
      }
      const { data: res } = await this.$http.post(
        "jh/purchase/selectpurc2",
        this.chaOrder
      );

      // console.log(res1);

      // !!!-----------------------
      // 用订单状态判断应该存在几个按钮
      // 当存在三个operationFlag3为true，其余为false。其他情况相同
      // this.operationFlag3 = res.body.rows.some(function(item, index, array) {
      //   return item.porderState == 0;
      // });
      // if (this.operationFlag3) {
      //   this.operationFlag2 = this.operationFlag1 = false;
      // } else {
      //   this.operationFlag2 = res.body.rows.some(function(item, index, array) {
      //     return (
      //       item.porderState == 2 ||
      //       item.porderState == 4 ||
      //       item.porderState == 5
      //     );
      //   });
      //   if (this.operationFlag2) {
      //     this.operationFlag1 = false;
      //   } else {
      //     this.operationFlag1 = true;
      //   }
      // }

      // console.log(this.operationFlag3);
      // console.log(this.operationFlag2);
      // console.log(this.operationFlag1);
      // !!!-----------------------

      this.orderList = res.body.rows;
      this.total = res.body.total;
    },

    // 订单单独审核
    async check(val) {
      // addSelectedList所有被选中的订单
      // 批量提审
      // const statusChangeList = [];
      // console.log(this.selectedList.length)
      // for(let i = 0;i<this.selectedList.length;i++ ){
      //     statusChangeList.push(this.selectedList[i].porderCode)
      // }

      const { data: res } = await this.$http.post("/jh/purchase/tishen", {
        // "statusChangeList":statusChangeList
        porderCode: val
      });
      this.getList();
      // console.log(res1);
    },
    // 终止订单
    async stopOrder(val) {
      const { data: res } = await this.$http.post("/jh/purchase/tishen", {
        // "statusChangeList":statusChangeList
        porderCode: val
      });
      this.getList();
    },
    async del() {},
    // 修改订单状态，可用于提审、终止
    async editPurOrderState(purchase, state) {
      purchase.porderState = state;
      const { data: res } = await this.$http.post(
        "/jh/purchase/examine",
        // "statusChangeList":statusChangeList
        purchase
      );
      this.getList();
    },
    async stop() {},
    a(value) {
      alert(value);
    },
    handleSizeChange(val) {
      this.chaOrderFrom.pageSize = val;
      // console.log(`每页 ${val} 条`);
      this.getList();
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      // 赋值给真实查询条件
      this.chaOrder.pageCode = val;

      this.chaOrderFrom.pageCode = val;
      this.currentPage = val;
      this.getList();
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          this.lookUpState = false;
          done();
        })
        .catch(_ => {});
    },
    dialogClosed(val) {
      this.$refs[val].resetFields();
    },
    // closeAddGoods() {
    //   this.$refs.addOrderFormGoods.resetFields();
    // },

    addSelectionChange(val) {
      this.addSelectedList = val;
      // console.log(this.addSelectedList);
    },
    addSelectionChange_two(val) {
      this.addSelectedList_two = val;
      // console.log(val);
    },
    deleteAddbumen(val, flag) {
      this.$confirm("此操作将移除商品, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          // let param = new URLSearchParams();
          // param.append("supplierId", supplierId);
          // const { data: res } = await this.$http.post(
          //     "/jc/supplier/deleteSupplier",
          //     param
          // );
          // this.getSupplierList();

          // supgoolsId 商品id
          // this.addSelectedList所有被选中的商品list
          // addOrderForm.pcommodityDos table中的数据来源

          let array = [];

          // 第一层循环，遍历已选择的商品table绑定的所有数据
          for (let i = 0; i < val.length; i++) {
            // 第二层循环，遍历已选择的商品table中被选中的所有数据
            for (let j = 0; j < this.addSelectedList.length; j++) {
              // 如果两个元素相等，那么新数组不添加该数据
              if (
                val[i].suppliergoolsId ==
                this.addSelectedList[j].suppliergoolsId
              ) {
                break;
              }
              // 如果遍历到了内层循环最后一次循环，那么说明该数据不该被删除，添加进数组
              if (j == this.addSelectedList.length - 1) {
                array.push(val[i]);
              }
            }
          }
          // 将已选择的商品table重新赋值
          if (flag == 1) {
            this.addOrderForm.pcommodityDos = array;
            this.addCalculate(this.addOrderForm);
          }

          if (flag == 2) {
            this.editOrderForm.pcommodityDos = array;
            this.addCalculate(this.editOrderForm);
          }

          // this.jisuan();

          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },

    // 编辑商品删除
    // deleteAddbumen(supplierId) {
    //   this.$confirm("此操作将移除商品, 是否继续?", "提示", {
    //     confirmButtonText: "确定",
    //     cancelButtonText: "取消",
    //     type: "warning"
    //   })
    //     .then(async () => {
    //       // let param = new URLSearchParams();
    //       // param.append("supplierId", supplierId);
    //       // const { data: res } = await this.$http.post(
    //       //     "/jc/supplier/deleteSupplier",
    //       //     param
    //       // );
    //       console.log(supplierId);
    //       // this.getSupplierList();

    //       // supgoolsId 商品id
    //       // this.addSelectedList所有被选中的商品list
    //       // addOrderForm.pcommodityDos table中的数据来源

    //       let array = [];

    //       // 第一层循环，遍历已选择的商品table绑定的所有数据
    //       for (let i = 0; i < this.editOrderForm.pcommodityDos.length; i++) {
    //         // 第二层循环，遍历已选择的商品table中被选中的所有数据
    //         for (let j = 0; j < this.addSelectedList.length; j++) {
    //           // 如果两个元素相等，那么新数组不添加该数据
    //           if (
    //             this.editOrderForm.pcommodityDos[i] == this.addSelectedList[j]
    //           ) {
    //             break;
    //           }
    //           // 如果遍历到了内层循环最后一次循环，那么说明该数据不该被删除，添加进数组
    //           if (j == this.addSelectedList.length - 1) {
    //             array.push(this.editOrderForm.pcommodityDos[i]);
    //           }
    //         }
    //       }
    //       // 将已选择的商品table重新赋值
    //       this.editOrderForm.pcommodityDos = array;

    //       this.jisuan2();

    //       this.$message({
    //         type: "success",
    //         message: "删除成功!"
    //       });
    //     })
    //     .catch(() => {
    //       this.$message({
    //         type: "info",
    //         message: "已取消删除"
    //       });
    //     });
    // },
    // 新增订单取消
    addCancel() {
      this.addOrderForm.pcommodityDos = [];
      this.addOrderVisible = false;
      this.editOrderVisible = false;
      // console.log(1111)
      // console.log(this.addOrderForm)
      // this.ResetForm('addOrderRef');
      // console.log(this.addOrderForm)
      this.gongyingshangOfForm = [];
    },
    addSave() {
      //保存采购订单
      this.$refs.addOrderRef.validate(async valid => {
        if (!valid) return;
        const { data: res } = await this.$http.post(
          "jh/purchase/createorder",
          this.addOrderForm
        );
        if (res.body.result) {
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
        this.getList();
        this.addOrderForm.pcommodityDos = [];
        this.delarr = [];
      });
    },
    async showEditOrder(porderCode) {
      // let param = new URLSearchParams();
      // param.append("porderCode", porderCode);
      // console.log(porderCode);
      this.editOrderForm.porderCode = porderCode;

      const { data: res } = await this.$http.post("jh/purchase/dtjresultMap", {
        porderCode: porderCode
      });
      // console.log(res);

      for (let i = 0; i < res.body.result[0].pcommodityDos.length; i++) {
        this.delarr.push(res.body.result[0].pcommodityDos[i].suppliergoolsId);
      }

      // console.log("--------------------");
      // console.log(this.delarr);

      const { data: res1 } = await this.$http.post(
        "/jc/suppliergoods/selectSuppliergoolslistmore",
        this.delarr
      );
      this.delarr = [];
      // console.log(res);

      for (
        let index = 0;
        index < res.body.result[0].pcommodityDos.length;
        index++
      ) {
        for (let i = 0; i < res1.length; i++) {
          if (
            res.body.result[0].pcommodityDos[index].suppliergoolsId ==
            res1[i].suppliergoolsId
          ) {
            res.body.result[0].pcommodityDos[index].supgoolCoated =
              res1[i].supgoolCoated;
            res.body.result[0].pcommodityDos[index].supgoolsBradth =
              res1[i].supgoolsBradth;
            res.body.result[0].pcommodityDos[index].supgoolsBrand =
              res1[i].supgoolsBrand;
            res.body.result[0].pcommodityDos[index].supgoolsColor =
              res1[i].supgoolsColor;
            res.body.result[0].pcommodityDos[index].supgoolsHeight =
              res1[i].supgoolsHeight;
            res.body.result[0].pcommodityDos[index].supgoolsLength =
              res1[i].supgoolsLength;
            res.body.result[0].pcommodityDos[index].supgoolsWeight =
              res1[i].supgoolsWeight;
            res.body.result[0].pcommodityDos[index].supgoolsWidth1 =
              res1[i].supgoolsWidth1;
            res.body.result[0].pcommodityDos[index].supgoolsWidths =
              res1[i].supgoolsWidths;
            res.body.result[0].pcommodityDos[index].supName = res1[i].supName;
            res.body.result[0].pcommodityDos[index].porderBuyer =
              res1[i].porderBuyer;
            res.body.result[0].pcommodityDos[index].supgoolsBigType =
              res1[i].supgoolsBigType;
            res.body.result[0].pcommodityDos[index].supgoolssmallType =
              res1[i].supgoolssmallType;
            res.body.result[0].pcommodityDos[index].supgoolsId =
              res1[i].supgoolsId;
            res.body.result[0].pcommodityDos[index].supgoolsSplicing =
              res1[i].supgoolsSplicing;
          }
        }
      }
      // console.log(res[0].pcommodityDos);
      this.delarr1 = res.body.result[0].pcommodityDos;
      // this.addOrderForm.pcommodityDos=this.delarr1;
      //  = res[0].
      this.editOrderForm.porderProducer = res.body.result[0].porderProducer;
      this.editOrderForm.porderBuyexplain = res.body.result[0].porderBuyexplain;
      this.editOrderForm.basicId = Number(res.body.result[0].basicId);
      // this.editOrderForm.supplierId = res[0].supplierId;
      // this.addOrderForm.suppliergoolsId = res[0].
      this.editOrderForm.porderTotalnum = res.body.result[0].porderTotalnum;
      this.editOrderForm.porderTotalmoney = res.body.result[0].porderTotalmoney;
      this.editOrderForm.porderBuyexplain = res.body.result[0].porderBuyexplain;
      this.editOrderForm.porderExplain = res.body.result[0].porderExplain;
      this.editOrderForm.porderPalnmoney = res.body.result[0].porderPalnmoney;
      this.editOrderForm.porderBuyer = res.body.result[0].porderBuyer;
      // this.addOrderForm.lab = res[0].
      this.editOrderForm.pcommodityDos = res.body.result[0].pcommodityDos;
      this.editOrderForm.pcommodityDos.forEach((item, index, array) => {
        item.pcommodityUnit = Number(item.pcommodityUnit);
      });
      // 下单时间
      this.editOrderForm.porderOrdertime = res.body.result[0].porderOrdertime;
      // 初复审信息
      this.editOrderForm.porderReviewman = res.body.result[0].porderReviewman;
      this.editOrderForm.porderReviewexplain =
        res.body.result[0].porderReviewexplain;
      this.editOrderForm.porderReviewedman =
        res.body.result[0].porderReviewedman;
      this.editOrderForm.porderReviewedexplain =
        res.body.result[0].porderReviewedexplain;
      // 订单状态
      this.editOrderForm.porderState = res.body.result[0].porderState;

      // 商品大类型
      this.editOrderForm.supgoolsBigtype = res.body.result[0].supgoolsBigtype;

      if (
        res.body.result[0].supplierId != "" &&
        !isNaN(res.body.result[0].supplierId)
      ) {
        this.editOrderForm.supplierId = Number(res.body.result[0].supplierId);
      } else {
        this.editOrderForm.supplierId = "";
      }

      let time = [
        res.body.result[0].porderStarttime,
        res.body.result[0].porderStoptime
      ];
      this.editOrderForm.time = time;

      this.gongyingshangOfForm = [];
      this.gongyinshang.forEach((item, index, arr) => {
        if (item.supplierId == this.editOrderForm.supplierId) {
          this.gongyingshangOfForm.push(item);
        }
      });

      this.editOrderVisible = true;

      this.addOrEdit = 2;

      // console.log("供应商编码")
      // this.editOrderForm.supplierId = ''
      // console.log(this.editOrderForm.supplierId)
    },
    //查看订单
    showLookUpOrder(porderCode) {
      this.lookUpState = true;
      this.showEditOrder(porderCode);
    },
    async editOrder() {
      const { data: res } = await this.$http.post(
        "/jh/purchase/bianji",
        this.editOrderForm
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

      // this.getList()
      this.editOrderVisible = false;
      this.editOrderForm.pcommodityDos = [];
      this.delarr = [];
      this.gongyingshangOfForm = [];
      // if (res.body.respCode==500) {
      //     this.$message({
      //         type: "info",
      //         message: res.body.msg
      //     });
      //     }else{
      //     this.$message({
      //         type: "success",
      //         message: res.body.msg
      //     });
      //     }
    },
    deletebumen(porderCode) {
      this.$confirm("此操作将删除订单, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          let param = new URLSearchParams();
          param.append("porderCode", porderCode);
          const { data: res } = await this.$http.post(
            "jh/purchase/deleteall",
            param
          );
          // console.log(res);

          this.getList();

          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },

    // 深层拷贝
    chaCopy() {
      this.chaOrder.porderCode = this.chaOrderFrom.porderCode;
      this.chaOrder.porderProducer = this.chaOrderFrom.porderProducer;
      this.chaOrder.time = this.chaOrderFrom.time;
      this.chaOrder.porderArrivalstatus = this.chaOrderFrom.porderArrivalstatus;
      this.chaOrder.porderState = this.chaOrderFrom.porderState;
      this.chaOrder.pageCode = this.chaOrderFrom.pageCode;
      this.chaOrder.pageSize = this.chaOrderFrom.pageSize;
    },

    // 11.20
    async changeGoodsBigType(val) {
      const { data: res } = await this.$http.post(
        "jc/suppliergoods/selectSuppliergoolslist",
        { params: { lab: this.chooseGoodsForm.goodsBigType } }
      );
      // console.log(res);
      this.shangpi = res.body.rows;
      this.total = res.body.total;
    },
    addChoosedGoods(val) {
      // 如果goodsChoosed为空，直接添加；否则，说明已有，需要判断
      if (this.chooseGoodsForm.goodsChoosed.length == 0) {
        this.chooseGoodsForm.goodsChoosed.push(val);
      } else {
        // 如果已存在，返回true
        let flag = this.chooseGoodsForm.goodsChoosed.some(function(
          item,
          index,
          array
        ) {
          return item.suppliergoolsId == val.suppliergoolsId;
        });
        if (!flag) {
          this.chooseGoodsForm.goodsChoosed.push(val);
        }
      }
    },
    addGoods(val) {
      this.chooseGoodsForm.addOrEdit = val;
      this.visibleOfChooseGoods = true;
      this.changeGoodsBigType();
    },
    // 选择商品表单取消
    chooseGoodsFormCancel() {
      this.visibleOfChooseGoods = false;
      // 手动重置
      this.chooseGoodsForm.addOrEdit = 0;
      this.chooseGoodsForm.goodsBigType = "原纸";
      this.chooseGoodsForm.goodsChoosed = [];

      this.gongyingshangOfForm = [];
    },
    // 选择商品表单保存
    chooseGoodsFormSava() {
      // this.chooseGoodsForm.goodsChoosed.forEach((item, index, arr) => {
      //   item.pcommodityPalnnum = '';
      //   item.pcommodityPrice = '';
      // })
      let length;
      if (this.chooseGoodsForm.addOrEdit == 1) {
        // 新增时，如果大类型改变，那么原来新增表单中的商品应该清空，并且改变新增表单大类型
        // 控制一张采购订单只能新增一种商品大类型商品
        if (
          this.addOrderForm.supgoolsBigtype !=
            this.chooseGoodsForm.goodsBigType &&
          this.chooseGoodsForm.goodsChoosed.length != 0
        ) {
          this.addOrderForm.pcommodityDos = [];
          this.addOrderForm.supgoolsBigtype = this.chooseGoodsForm.goodsBigType;
        }
        //添加
        length =
          this.addOrderForm.pcommodityDos.length +
          this.chooseGoodsForm.goodsChoosed.length;
        // 为空，直接添加；否则，选择性添加
        if (this.addOrderForm.pcommodityDos.length == 0) {
          this.chooseGoodsForm.goodsChoosed.map(item => {
            this.addOrderForm.pcommodityDos.push(item);
          });
        } else {
          // 存储新元素
          let array = [];
          for (let i = 0; i < this.chooseGoodsForm.goodsChoosed.length; i++) {
            // true 已存在
            let goodsChoosed = this.chooseGoodsForm.goodsChoosed[i];
            let flag = this.addOrderForm.pcommodityDos.some(function(
              item,
              index,
              array
            ) {
              return item.suppliergoolsId == goodsChoosed.suppliergoolsId;
            });
            if (!flag) {
              array.push(this.chooseGoodsForm.goodsChoosed[i]);
            }
          }
          for (let j = 0; j < array.length; j++) {
            this.addOrderForm.pcommodityDos.push(array[j]);
          }
        }
      } else if (this.chooseGoodsForm.addOrEdit == 2) {
        // 编辑时，如果大类型改变，那么原来编辑表单中的商品应该清空，并且改变编辑表单大类型
        if (
          this.editOrderForm.supgoolsBigtype !=
            this.chooseGoodsForm.goodsBigType &&
          this.chooseGoodsForm.goodsChoosed.length != 0
        ) {
          this.editOrderForm.pcommodityDos = [];
          this.editOrderForm.supgoolsBigtype = this.chooseGoodsForm.goodsBigType;
        }

        //编辑
        length =
          this.editOrderForm.pcommodityDos.length +
          this.chooseGoodsForm.goodsChoosed.length;
        // 为空，直接添加；否则，选择性添加
        if (this.editOrderForm.pcommodityDos.length == 0) {
          this.chooseGoodsForm.goodsChoosed.map(item => {
            this.editOrderForm.pcommodityDos.push(item);
          });
        } else {
          // 存储新元素
          let array = [];
          for (let i = 0; i < this.chooseGoodsForm.goodsChoosed.length; i++) {
            // true 已存在
            let goodsChoosed = this.chooseGoodsForm.goodsChoosed[i];
            let flag = this.editOrderForm.pcommodityDos.some(function(
              item,
              index,
              array
            ) {
              return item.suppliergoolsId == goodsChoosed.suppliergoolsId;
            });
            if (!flag) {
              array.push(this.chooseGoodsForm.goodsChoosed[i]);
            }
          }
          for (let j = 0; j < array.length; j++) {
            this.editOrderForm.pcommodityDos.push(array[j]);
          }
        }
      }

      this.visibleOfChooseGoods = false;

      if (this.chooseGoodsForm.addOrEdit == 1) {
        if (length > this.addOrderForm.pcommodityDos.length) {
          this.$message({
            type: "info",
            message: "部分商品已存在！"
          });
        }
      } else if (this.chooseGoodsForm.addOrEdit == 2) {
        if (length > this.editOrderForm.pcommodityDos.length) {
          this.$message({
            type: "info",
            message: "部分商品已存在！"
          });
        }
      }

      this.shangpi = [];
      this.chooseGoodsForm.addOrEdit = 0;
      this.chooseGoodsForm.goodsBigType = "纸张";
      this.chooseGoodsForm.goodsChoosed = [];
    },
    changeGongyingshang(val) {
      // console.log("供应商变化");
      // console.log(val);

      this.gongyingshangOfForm = [];
      this.gongyinshang.forEach((item, index, arr) => {
        if (item.supplierId == val) {
          this.gongyingshangOfForm.push(item);
        }
      });
      // console.log(this.gongyingshangOfForm);
    },
    // 供应商删除按钮
    deleteGongyingshang() {
      this.addOrderForm.supplierId = "";
      if (this.editOrderForm.supplierId != null) {
        this.editOrderForm.supplierId = "";
      }
      this.gongyingshangOfForm = [];
    },
    // 计算数量以及总金额
    addCalculate(val) {
      // let boolean = new RegExp()
      // 例：addOrderForm.pcommodityDos
      // 计算总数量
      let quantity = 0;
      val.pcommodityDos.forEach((item, index, arr) => {
        // 如果该行价格不是数字，置空
        // if (isNaN(item.pcommodityPrice)) {
        //   item.pcommodityPrice = ''
        // }

        if (!isNaN(item.pcommodityPalnnum)) {
          // quantity += Number(item.pcommodityPalnnum);
          quantity = this.add(Number(item.pcommodityPalnnum), quantity);
        }
        // else {
        //   arr[index].pcommodityPalnnum = 0
        // }
        //  else {
        // // 如果该行数量不是数字，置空
        //   item.pcommodityPalnnum = '';
        // }
      });
      val.porderTotalnum = quantity.toFixed(2);

      // 计算总价格
      let money = 0;
      val.pcommodityDos.forEach((item, index, arr) => {
        if (
          !isNaN(this.multiple(item.pcommodityPalnnum, item.pcommodityPrice))
        ) {
          // money += Number(item.pcommodityPalnnum * item.pcommodityPrice);
          money = this.add(
            this.multiple(item.pcommodityPalnnum, item.pcommodityPrice),
            money
          );
        }
      });
      val.porderTotalmoney = money.toFixed(2);

      // console.log('----------------------')

      // 将所有非数字置空
      // for (let i = 0; i < val.pcommodityDos.length; i++) {
      //   if (isNaN(Number(val.pcommodityDos[i].pcommodityPalnnum)) && val.pcommodityDos[i].pcommodityPalnnum != '') {
      //     console.log(val.pcommodityDos[i].pcommodityPalnnum)
      //     val.pcommodityDos[i].pcommodityPalnnum = '';
      //   // 破坏了双向绑定？？？？
      //   }

      //   if (isNaN(Number(val.pcommodityDos[i].pcommodityPrice)) && val.pcommodityDos[i].pcommodityPrice != '') {
      //     val.pcommodityDos[i].pcommodityPrice = '';
      //   }
      // }
    },
    // 新增采购订单
    addPurchareOrder() {
      this.addOrderForm.pcommodityDos = [];
      this.addOrderForm.goodsBigType = this.chooseGoodsForm.goodsBigType;
      this.gongyingshangOfForm = [];
      this.editOrde = false;
      this.addOrEdit = 1;
      this.addOrderVisible = true;
    },

    // 相加
    add(arg1, arg2) {
      return (Math.round(arg1 * 100) + Math.round(arg2 * 100)) / 100;
    },

    //  subtract(arg1, arg2) {
    //   return this.add(arg1, -arg2);
    // },
    // 相乘
    multiple(arg1, arg2) {
      return (Math.round(arg1 * 100) * Math.round(arg2 * 100)) / 10000;
    }
  }
};
</script>

<style lang="less">
.el-form-item {
  ._small {
    width: 150px;
  }
}
.w110 {
  width: 110px;
}
.w500 {
  width: 800px;
}
.el-table,
.el-pagination {
  margin-top: 15px;
}
.el-date-picker .el-input {
  width: 150px;
}
.el-date-editor--daterange.el-input,
.el-date-editor--daterange.el-input__inner {
  width: 300px;
}
.el-textarea {
  width: 225%;
}
hr {
  margin-bottom: 15px;
  margin-top: 20px;
}
.jisuan {
  span {
    margin-left: 50px;
  }
  float: right;
  margin-right: 50px;
  margin-top: 15px;
}

// 操作列的三种宽度 ？？？
.operationWidth3 {
  width: 270px;
}
.operationWidth2 {
  width: 180x;
}
.operationWidth {
  width: 90px;
}

.fenge {
  position: absolute;
  top: 34px;
  left: 0px;
  height: 25px;
  width: 98.5%;
  line-height: 25px;
  padding-left: 15px;
  background-color: #dcdfe6;
}
.fenge1 {
  height: 25px;
  width: 98.5%;
  line-height: 25px;
  padding-left: 15px;
  background-color: #dcdfe6;
  margin-bottom: 20px;
}
</style>