<template>
  <div class="min1500">
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>财务管理</el-breadcrumb-item>
      <el-breadcrumb-item>收款单</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-form
        :inline="true"
        class="demo-form-inline search"
        :model="chaOrderFrom"
        ref="chaOrderFrom"
        label-width="70px"
        label-position="left"
      >
        <el-row :gutter="20" class="row">
          <el-col :span="24">
            <el-form-item label="收款单号" prop="advanceorderno">
              <el-input class="_small" v-model="chaOrderFrom.advanceorderno"></el-input>
            </el-form-item>

            <el-form-item label="制单人员" prop="payexamine">
              <el-input class="_small" v-model="chaOrderFrom.payexamine"></el-input>
            </el-form-item>

            <el-form-item label="资金账户" prop="assetaccount">
              <el-input class="_small" v-model="chaOrderFrom.assetaccount"></el-input>
            </el-form-item>

            <el-form-item label="收入类型" prop="raetypes">
              <el-select
                v-model="chaOrderFrom.raetypes"
                placeholder="请选择"
                class="_small"
              >
                <el-option
                  v-for="item in paymode"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                  :disabled="lookUpState"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="收款类别" prop="typeOfReceipt">
              <el-select
                v-model="chaOrderFrom.typeOfReceipt"
                placeholder="请选择"
                class="_small"
                @change="changeTypeOfPayment($event)"
              >
                <el-option value="0" label="预收款"></el-option>
                <el-option value="1" label="应收款"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="制单日期" prop="rectimeRange">
              <el-date-picker
                v-model="chaOrderFrom.rectimeRange"
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
              <!-- <el-button type="primary" @click="lookUpState = false;editPaymentVisible = true">付 款</el-button> -->
              <!-- <el-button type="primary" @click="lookUpState = true;editPaymentVisible = true">查 看</el-button> -->
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <!-- </el-row> -->
      <!-- 表格 -->
      <el-button type="primary" @click="addAdvancePaymentFormVisible = true">新增预收款单</el-button>
      <el-table border :data="orderList">
        <!-- <el-table-column type="selection" width="50px"></el-table-column> -->
        <el-table-column type="index" label="序号" align="center" width="50px"></el-table-column>
        <el-table-column
          prop="advanceorderno"
          :label="chaOrder.typeOfReceipt == 0?'预收款单号':'应收款单号'"
          width="180px"
          align="center"
        ></el-table-column>
        <el-table-column prop="payexamine" label="收款制单人" width="100px"></el-table-column>
        <el-table-column prop="rectime" label="制单时间" width="200px" align="center"></el-table-column>
        <el-table-column prop="raetypes" label="收入类型"></el-table-column>
        <el-table-column prop="saleorderno" label="关联单号" width="200px" align="center"></el-table-column>
        <el-table-column prop="amount" label="收款金额"></el-table-column>
        <el-table-column prop="assetaccount" label="资金账户"></el-table-column>
        <el-table-column prop="paymentstatus" label="收款状态">
          <template slot-scope="scope">
            <span v-if="scope.row.paymentstatus == 0">未收款</span>
            <span v-if="scope.row.paymentstatus == 1">已收款</span>
          </template>
        </el-table-column>

        <el-table-column prop="paymenttime" label="收款时间" width="200px" align="center"></el-table-column>
        <el-table-column prop="remarks" label="备注" width="200" align="center"></el-table-column>
        
        <el-table-column label="操作" width="180px" align="center" fixed="right">
          <template slot-scope="scope">
            <el-button
              type="success"
              icon="el-icon-edit"
              size="mini"
              @click="lookUpState = true;showEditOrder(scope.row.advanceorderno)"
            >查看</el-button>
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              :disabled="!(scope.row.paymentstatus == 0)"
              @click="lookUpState = false;showEditOrder(scope.row.advanceorderno)"
            >收款</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="chaOrder.pageCode"
        :page-size="10"
        layout="total, prev,pager, next"
        :total="total"
      ></el-pagination>
    </el-card>

    <!-- 类型选择 -->
    <el-dialog :title=" '类型选择' " :visible.sync="stateOfTypeChoose" width="30%">
      收款单类型
      <el-select v-model="rType" class="mar">
        <el-option
          v-for="item in receiptType"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <el-button type="primary" size="small" class="mar" @click="chooseReceiptType">确 定</el-button>
    </el-dialog>

    <!-- 采购退货收款单 -->
    <el-dialog
      :title=" '采购退货收款单' "
      :visible.sync="stateOfReturn"
      width="60%"
      :before-close="handleClose"
    >
      <el-form inline="true">
        <hr />
        <div>收款信息</div>
        <!-- 收款单号 -->
        <el-form-item label="收款单号">
          <el-input v-model="salesOrdermanagementForm.phoneNumber" class="hu"></el-input>
        </el-form-item>

        <!-- 收款制单人 -->
        <el-form-item label="收款制单人">
          <el-input v-model="salesOrdermanagementForm.phoneNumber" class="hu"></el-input>
        </el-form-item>

        <!-- 制单时间 -->
        <el-form-item label="制单时间" class="mar">
          <el-date-picker v-model="value1" type="date" placeholder="选择日期"></el-date-picker>
        </el-form-item>

        <!-- 收款类型 -->
        <el-form-item label="收款类型" class="mar">
          <el-select v-model="salesOrdermanagementForm.warehouse" class="hu">
            <el-option
              v-for="item in warehouseOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>

        <!-- 关联采购订单 -->
        <el-form-item label="关联采购订单">
          <el-input v-model="salesOrdermanagementForm.phoneNumber" class="hu"></el-input>
        </el-form-item>

        <!-- 收款方式 -->
        <el-form-item label="收款方式">
          <el-input v-model="salesOrdermanagementForm.phoneNumber" class="hu"></el-input>
        </el-form-item>

        <!-- 本次结算总额 -->
        <el-form-item label="本次结算总额">
          <el-input v-model="salesOrdermanagementForm.phoneNumber" class="hu"></el-input>
        </el-form-item>

        <!-- 结算方式 -->
        <!-- <el-form-item label="结算方式" class="mar">
          <el-select v-model="salesOrdermanagementForm.warehouse" class="hu">
            <el-option
              v-for="item in warehouseOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item> -->

        <br />

        <el-form-item label="备注" class="mar">
          <el-input
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4}"
            placeholder="请输入内容"
            v-model="textarea2"
          ></el-input>
        </el-form-item>

        <hr />
        <div>关联采购订单</div>
        <el-form-item label="供应商编码">
          <el-input v-model="salesOrdermanagementForm.phoneNumber" class="hu"></el-input>
        </el-form-item>

        <el-form-item label="供应商名称">
          <el-input v-model="salesOrdermanagementForm.phoneNumber" class="hu"></el-input>
        </el-form-item>

        <el-form-item label="创建发票时间">
          <el-input v-model="salesOrdermanagementForm.phoneNumber" class="hu"></el-input>
        </el-form-item>

        <el-form-item label="采购金额">
          <el-input v-model="salesOrdermanagementForm.phoneNumber" class="hu"></el-input>
        </el-form-item>

        <el-form-item label="预付款金额">
          <el-input v-model="salesOrdermanagementForm.phoneNumber" class="hu"></el-input>
        </el-form-item>

        <br />采购商品明细：
        <br />

        <el-table :data="goodsData" style="width: 100%">
          <el-table-column prop label="商品名称"></el-table-column>
          <el-table-column prop label="商品编码"></el-table-column>
          <el-table-column prop label="克重"></el-table-column>
          <el-table-column prop label="采购价"></el-table-column>
          <el-table-column prop label="当前库存（kg）"></el-table-column>
          <el-table-column prop label="预计采购数量（kg）"></el-table-column>
          <el-table-column prop label="金额"></el-table-column>
        </el-table>

        <hr />
        <div>关联出库订单</div>

        <!-- 两个按钮 -->
        <el-form-item>
          <el-button type="primary" size="small">选择出库单</el-button>
          <el-button type="danger" size="small">删 除</el-button>
        </el-form-item>

        <el-table :data="goodsData" style="width: 100%">
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column label="出库单号" width="120">
            <template slot-scope="scope">{{ scope.row.no }}</template>
          </el-table-column>

          <!-- <el-table-column prop="no" label="序号"></el-table-column> -->
          <el-table-column prop label="产品名称"></el-table-column>
          <el-table-column prop label="产品编码"></el-table-column>
          <el-table-column prop label="出库数量（kg）"></el-table-column>
          <el-table-column prop label="结算单价"></el-table-column>
          <el-table-column prop label="未结算数量（kg）"></el-table-column>
          <el-table-column prop label="未结算金额"></el-table-column>
          <el-table-column prop label="已结算金额"></el-table-column>
          <el-table-column prop label="当前结算数量（kg）"></el-table-column>
          <el-table-column prop label="当前结算金额"></el-table-column>
        </el-table>

        <hr />
        <div>收款凭证</div>
        <!-- 两个按钮 -->
        <el-form-item>
          <el-upload
            class="upload-demo"
            drag
            action="https://jsonplaceholder.typicode.com/posts/"
            multiple
          >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">
              将文件拖到此处，或
              <em>点击上传</em>
            </div>
            <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>

        <br />
        <!-- 两个按钮 -->
        <el-form-item style="margin-left:750px;">
          <el-button type="primary" size="small">确 定</el-button>
          <el-button type="primary" size="small">取 消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!-- 销售订单收款单 -->
    <el-dialog
      :title=" '销售订单收款单' "
      :visible.sync="stateOfSell"
      width="60%"
      :before-close="handleClose"
    >
      <el-form inline="true">
        <hr />
        <div>收款信息</div>
        <!-- 收款单号 -->
        <el-form-item label="收款单号">
          <el-input v-model="salesOrdermanagementForm.phoneNumber" class="hu"></el-input>
        </el-form-item>

        <!-- 收款制单人 -->
        <el-form-item label="收款制单人">
          <el-input v-model="salesOrdermanagementForm.phoneNumber" class="hu"></el-input>
        </el-form-item>

        <!-- 制单时间 -->
        <el-form-item label="制单时间" class="mar">
          <el-date-picker v-model="value1" type="date" placeholder="选择日期"></el-date-picker>
        </el-form-item>

        <!-- 收款类型 -->
        <el-form-item label="收款类型" class="mar">
          <el-select v-model="salesOrdermanagementForm.warehouse" class="hu">
            <el-option
              v-for="item in warehouseOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>

        <!-- 关联销售订单 -->
        <el-form-item label="关联销售订单">
          <el-input v-model="salesOrdermanagementForm.phoneNumber" class="hu"></el-input>
        </el-form-item>

        <!-- 收款方式 -->
        <el-form-item label="收款方式">
          <el-input v-model="salesOrdermanagementForm.phoneNumber" class="hu"></el-input>
        </el-form-item>

        <!-- 本次结算总额 -->
        <el-form-item label="本次结算总额">
          <el-input v-model="salesOrdermanagementForm.phoneNumber" class="hu"></el-input>
        </el-form-item>

        <!-- 结算方式 -->
        <!-- <el-form-item label="结算方式" class="mar">
          <el-select v-model="salesOrdermanagementForm.warehouse" class="hu">
            <el-option
              v-for="item in warehouseOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item> -->

        <br />

        <el-form-item label="备注" class="mar">
          <el-input
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4}"
            placeholder="请输入内容"
            v-model="textarea2"
          ></el-input>
        </el-form-item>

        <hr />
        <div>关联销售订单</div>
        <!-- 收款单号 -->
        <el-form-item label="供应商编码">
          <el-input v-model="salesOrdermanagementForm.phoneNumber" class="hu"></el-input>
        </el-form-item>

        <!-- 收款单号 -->
        <el-form-item label="供应商名称">
          <el-input v-model="salesOrdermanagementForm.phoneNumber" class="hu"></el-input>
        </el-form-item>

        <!-- 收款单号 -->
        <el-form-item label="创建发票时间">
          <el-input v-model="salesOrdermanagementForm.phoneNumber" class="hu"></el-input>
        </el-form-item>

        <!-- 收款单号 -->
        <el-form-item label="采购金额">
          <el-input v-model="salesOrdermanagementForm.phoneNumber" class="hu"></el-input>
        </el-form-item>

        <!-- 收款单号 -->
        <el-form-item label="预付款金额">
          <el-input v-model="salesOrdermanagementForm.phoneNumber" class="hu"></el-input>
        </el-form-item>

        <br />销售产品明细：
        <br />

        <el-table :data="goodsData" style="width: 100%">
          <el-table-column prop label="产品名称"></el-table-column>
          <el-table-column prop label="产品编码"></el-table-column>
          <el-table-column prop label="产品类型"></el-table-column>
          <el-table-column prop label="单价"></el-table-column>
          <el-table-column prop label="销售数量"></el-table-column>
          <el-table-column prop label="总金额"></el-table-column>
          <el-table-column prop label="备注"></el-table-column>
        </el-table>

        <hr />
        <div>关联出库订单</div>

        <!-- 两个按钮 -->
        <el-form-item>
          <el-button type="primary" size="small">选择出库单</el-button>
          <el-button type="danger" size="small">删 除</el-button>
        </el-form-item>

        <el-table :data="goodsData" style="width: 100%">
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column label="出库单号" width="120">
            <template slot-scope="scope">{{ scope.row.no }}</template>
          </el-table-column>

          <!-- <el-table-column prop="no" label="序号"></el-table-column> -->
          <el-table-column prop label="产品名称"></el-table-column>
          <el-table-column prop label="产品编码"></el-table-column>
          <el-table-column prop label="出库数量（kg）"></el-table-column>
          <el-table-column prop label="结算单价"></el-table-column>
          <el-table-column prop label="未结算数量（kg）"></el-table-column>
          <el-table-column prop label="未结算金额"></el-table-column>
          <el-table-column prop label="已结算金额"></el-table-column>
          <el-table-column prop label="当前结算数量（kg）"></el-table-column>
          <el-table-column prop label="当前结算金额"></el-table-column>
        </el-table>

        <hr />
        <div>收款凭证</div>
        <!-- 两个按钮 -->
        <el-form-item>
          <el-upload
            class="upload-demo"
            drag
            action="https://jsonplaceholder.typicode.com/posts/"
            multiple
          >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">
              将文件拖到此处，或
              <em>点击上传</em>
            </div>
            <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>

        <br />
        <!-- 两个按钮 -->
        <el-form-item style="margin-left:750px;">
          <el-button type="primary" size="small">确 定</el-button>
          <el-button type="primary" size="small">取 消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!-- 新增出库单 -->
    <!-- :title="addOrder?"新增销售订单":"编辑销售订单""  :visible.sync="addOrder || editOrder"-->
    <el-dialog :title=" '新增出库单' " :visible.sync="a" width="60%" :before-close="handleClose">
      <!-- 新增出库单表格 -->
      <el-form title="订单" inline="true">
        <!-- 入库编号 -->
        <el-form-item label="出库编号">
          <el-input v-model="salesOrdermanagementForm.phoneNumber" class="hu"></el-input>
        </el-form-item>
        <!-- 选择仓库 -->
        <el-form-item label="选择仓库" class="mar">
          <el-select v-model="salesOrdermanagementForm.warehouse" class="hu">
            <el-option
              v-for="item in warehouseOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <!-- 入库类型 -->
        <el-form-item label="出库类型" class="mar">
          <el-select v-model="salesOrdermanagementForm.warehouse" class="hu">
            <el-option
              v-for="item in warehouseOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>

        <br />
        <!-- 制单人 -->
        <el-form-item label="制单人">
          <el-input v-model="salesOrdermanagementForm.phoneNumber" class="hu"></el-input>
        </el-form-item>
        <!-- 出库时间 -->
        <el-form-item label="出库时间" class="mar">
          <el-date-picker v-model="value1" type="date" placeholder="选择日期"></el-date-picker>
        </el-form-item>

        <!-- 采购退货出库 -->
        <br />

        <!-- 订单号 -->
        <el-form-item label="采购退货单" class="mar">
          <el-select v-model="salesOrdermanagementForm.warehouse" class="hu">
            <el-option
              v-for="item in warehouseOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>

        <!-- 生产出库 -->
        <br />

        <!-- 生产订单 -->
        <el-form-item label="生产订单" class="mar">
          <el-select v-model="salesOrdermanagementForm.warehouse" class="hu">
            <el-option
              v-for="item in warehouseOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>

        <!-- 售后入库 -->
        <br />

        <!-- 订单出库 -->
        <el-form-item label="关联集装箱" class="mar">
          <el-select v-model="salesOrdermanagementForm.warehouse" class="hu">
            <el-option
              v-for="item in warehouseOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>

        <!-- 其他出库 -->

        <!-- 备注 -->
        <br />
        <el-form-item label="备注">
          <el-input
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4}"
            placeholder="请输入内容"
            v-model="textarea2"
          ></el-input>
        </el-form-item>

        <br />
        <!-- 3个按钮 -->
        <el-form-item>
          <el-button type="info" size="small">选择商品</el-button>
          <el-button type="info" size="small">商品导入</el-button>
          <el-button type="info" size="small">删除行</el-button>
        </el-form-item>

        <hr />

        <!-- 带有排序功能的商品table -->
        <!-- :default-sort="{prop: 'date', order: 'descending'}" -->
        <el-table :data="goodsData" style="width: 100%">
          <!-- <el-table-column prop="date" label="日期" sortable width="180"></el-table-column>
              <el-table-column prop="name" label="姓名" sortable width="180"></el-table-column>
          <el-table-column prop="address" label="地址" :formatter="formatter"></el-table-column>-->

          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop label="商品编码"></el-table-column>
          <el-table-column prop label="商品名称"></el-table-column>
          <el-table-column prop label="规格名称"></el-table-column>
          <el-table-column prop label="条形码"></el-table-column>
          <el-table-column prop label="出库数量"></el-table-column>
          <el-table-column prop label="已出库数量"></el-table-column>
          <el-table-column prop label="总出库数量"></el-table-column>

          <!-- 关联销售订单 仅订单出库有 -->
          <el-table-column prop label="关联销售订单"></el-table-column>
          <!-- 需要？？？ -->
          <!-- <el-table-column prop="operate" label="操作">
            <el-button type="danger" size="small">删 除</el-button>
          </el-table-column>-->
        </el-table>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[3, 5, 10, 15]"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
        <hr />
        <!-- 总数量 -->
        <el-form-item label="总数量" class="mar">
          <el-input v-model="salesOrdermanagementForm.phoneNumber" class="hu"></el-input>
        </el-form-item>

        <!-- 2个按钮 -->
        <el-form-item label class="mar" style="margin-left:500px;">
          <el-button type="info" size="small">确 定</el-button>
          <el-button type="info" size="small">取 消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!-- 审核收款单 -->
    <el-dialog :title=" '审核收款单' " :visible.sync="stateOfCheck" width="30%">
      <el-radio v-model="radio" label="0">审核通过</el-radio>
      <el-radio v-model="radio" label="1">审核不通过</el-radio>
      <br>
      <el-button type="primary" size="small" style="margin-left:70%,margin-top:100%" @click="chooseReceiptType">确 定</el-button>
      <el-button type="primary" size="small" class="mar" @click="chooseReceiptType">取 消</el-button>
    </el-dialog>


        <el-dialog
      :title="lookUpState?'查看收款单':'收款'"
      :visible.sync="editPaymentVisible"
      width="50%"
      :before-close="handleClose"
      @closed="dialogClosed('editPaymentForm')"
    >
      <el-form
        label-position="right"
        label-width="90px"
        :model="editPaymentForm"
        ref="editPaymentForm"
        :rules="editPaymentRules"
        :inline="true"
      >
        <el-form-item label="付款制单人" prop="payexamine">
          <el-input class="_small" v-model="editPaymentForm.payexamine" disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="供应商名称" prop="supName">
          <el-input class="_small" v-model="editPaymentForm.supName" disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="供应商编码" prop="supId">
          <el-input class="_small" v-model="editPaymentForm.supId" disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="销售订单号" prop="saleorderno">
          <el-input class="_small" v-model="editPaymentForm.saleorderno" disabled="true"></el-input>
        </el-form-item>
        <br />
        <el-form-item label="采购数量" prop="porderTotalnum">
          <el-input class="_small" v-model="editPaymentForm.porderTotalnum" disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="采购金额" prop="porderTotalmoney">
          <el-input class="_small" v-model="editPaymentForm.porderTotalmoney" disabled="true"></el-input>
        </el-form-item>
        <!-- <el-form-item label="结算方式" prop="settlemethod">
          <el-input class="_small" v-model="editPaymentForm.settlemethod" disabled="true"></el-input>
        </el-form-item> -->
        <el-form-item label="预付款金额" prop="amount">
          <el-input class="_small" v-model="editPaymentForm.amount" disabled="true"></el-input>
        </el-form-item>
        <br />
        <el-form-item label="资金账户" prop="assetaccount">
          <el-input class="_small" v-model="editPaymentForm.assetaccount" :disabled="lookUpState"></el-input>
        </el-form-item>
        <el-form-item label="收入类型" prop="raetypes">
          <el-select
            v-model="editPaymentForm.raetypes"
            placeholder="请选择"
            class="_small"
            :disabled="lookUpState"
          >
            <el-option
              v-for="item in paymode"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              :disabled="lookUpState"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="预收款状态" prop="paymentstatus">
          <el-select
            v-model="editPaymentForm.paymentstatus"
            placeholder="请选择"
            class="_small"
            :disabled="lookUpState"
          >
            <el-option value="0" label="未付款"></el-option>
            <el-option value="1" label="已付款"></el-option>
          </el-select>
        </el-form-item>
        <br />
        <el-form-item label="备注" prop="remarks">
          <el-input
            type="textarea"
            class="_small"
            v-model="editPaymentForm.remarks"
            style="width: 600px"
            :disabled="lookUpState"
          ></el-input>
        </el-form-item>

        <hr />
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editPaymentVisible = false">取 消</el-button>
        <el-button @click="addSave()" type="primary" v-if="!lookUpState">确 认</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // v:false,
      labelPosition: "right",
      addbumenDialogVisible: false,
      editbumenDialogVisible: false,
      delVisible: false,
      currentPage: 0,
      total: 0,
      delarr: "",
      selectedList: [],
      departmentList: [],
      chaDepartmentForm: {
        name: "",
        pageCode: 1, //当前页
        pageSize: 3 //每页显示的记录数
      },
      addDepartmentForm: {
        name: "",
        orderNum: ""
      },
      editDepartmentForm: {
        name: "",
        orderNum: ""
      },
      addDepartmentRules: {
        name: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 10, message: "长度在 3 到 10 个字符", trigger: "blur" }
        ]
      },

      //   自己做的部分
      // 查询收款单表单
      queryReceiptForm: {
        supName: "", // 供应商名称
        receivablesPayexamine: "", // 收款制单人
        receivablesPaydate: "", // 收款单日期
        supId: "", // 供应商编码
        // receivablesSettlemethod: "", // 结算方式
        receivablesPaymode: "", // 收款方式
        receivablesRectype: "", // 收款类型
        receivablesStatus: "" // 审核状态
      },
      // 顶部查询表单
      salesOrdermanagementForm: {
        // 要发送的真实字段
        orderNum: "", //订单号
        select: "1", //订单号类型选择
        warehouse: "", //仓库
        pageCode: 1, //当前页
        pageSize: 3, //每页显示的记录数
        state: "",
        phoneNumber: "",
        name: "",
        province: ""
      },
      // 仓库列表
      warehouseOptions: [
        {
          value: 0,
          label: "默认仓库"
        },
        {
          value: 1,
          label: "黄金糕"
        }
      ],
      //订单状态列表（不完全）
      orderStateOptions: [
        {
          value: 0,
          label: "初始化"
        },
        {
          value: 1,
          label: "已付款"
        },
        {
          value: 1,
          label: "已完成"
        }
      ],
      //分页相关数据
      //currentPage:0,
      total: 0,
      // 页面表单数据
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          no: 1,
          orderNum: 99999,
          username: "小明",
          goodsInfo: "纸杯",
          overbookingTime: "2016-05-02",
          money1: 3000,
          money2: 300,
          payTime: "2016-05-02",
          address: "上海市普陀区金沙江路 1518 弄",
          createTime: "2016-05-02",
          lastModifyTime: "2016-05-02",
          orderState: "未完成",
          orderNote: "0000"
        }
      ],
      addOrder: false,
      editOrder: false,
      addGoods: false,
      addOrderForm: {
        activeName: "first"
      },
      goodsData: [
        {
          productName: "娃哈哈",
          productNum: "12121212",
          productType: "饮料",
          unitPrice: 3,
          salesQuantity: 7,
          sumMoney: 21,
          note: "哈哈哈哈哈",
          opetate: ""
        },
        {
          productName: "王老吉",
          productNum: "12121212",
          productType: "饮料",
          unitPrice: 3,
          salesQuantity: 8,
          sumMoney: 21,
          note: "大吉大利",
          operate: ""
        }
      ],
      title: "",
      receiptType: [
        {
          label: "采购退货收款",
          value: "0"
        },
        {
          label: "销售订单收款",
          value: "1"
        }
      ],
      // 收款单类型
      rType: "",
      // 收款单类型选择显示状态
      stateOfTypeChoose: false,
      // 采购退货收款单显示状态
      stateOfReturn: false,
      // 销售订单收款单显示状态
      stateOfSell: false,
      // 审核状态
      stateOfCheck: false,



      // 查询表单数据
      chaOrderFrom:{
        advanceorderno:"",//收款单号
        payexamine:"",//制单人员
        assetaccount:"",//资金账户
        raetypes:"",//收入类型
        typeOfReceipt:"0",//收款类别
        rectimeRange: [], // 制单日期范围

        pageCode: 1,
        pageSize: 10
      },
      // 查询实际数据
      chaOrder: {},
      // 付款单list
      orderList: [],
      // 分页总数
      total: 0,
      // 是否为查看状态
      lookUpState: false,
      // 编辑付款单
      editPaymentVisible: false,
      // 点击付款后弹出页面
      editPaymentForm: {},

      // 收支类型数组
      paymode: [],
    };
  },
  created() {
    //自己写的方法
    //this.getWarehouseOptions();
    this.getList(1);
    this.selectinpaymode();
    this.getCookie();
  },
  methods: {
    addDepartment() {
      this.$refs.addDepartmentRef.validate(async valid => {
        if (!valid) return;
        const { data: res } = await this.$http.post(
          "sys/dept/save",
          this.addDepartmentForm
        );
        this.$message.success("用户创建成功！");
        // this.getDepartmentList();
        this.addbumenDialogVisible = false;
      });
    },
    chaDepartmentResetForm(formName) {
      this.$refs.chaDepartmentRef.resetFields();
      // 重置表单内容
      // this.getDepartmentList();
    },
    async userStateChanged(userInfo) {
      const { data: res } = await this.$http.post("sys/dept/update", userInfo);
      // this.getDepartmentList();
    },
    async showEditDepartment(id) {
      let param = new URLSearchParams();
      param.append("id", id);
      const { data: res } = await this.$http.post("sys/dept/getDept", param);
      this.editDepartmentForm = res.body.dept;
      console.log(res);

      this.editbumenDialogVisible = true;
    },
    async editDepartment() {
      const { data: res } = await this.$http.post(
        "sys/dept/update",
        this.editDepartmentForm
      );
      // this.getDepartmentList();
      this.editbumenDialogVisible = false;
    },

    selected() {
      this.delarr = [];
      this.delVisible = true;
      for (let i = 0; i < this.selectedList.length; i++) {
        // this.delarr.push(this.selectedList[i].deptId)

        this.delarr += this.selectedList[i].deptId + ",";
      }
      console.log(this.delarr);
    },
    async deleteRow() {
      let param = new URLSearchParams();
      param.append("deptIds", this.delarr);
      const { data: res } = await this.$http.post(
        "sys/dept/batchRemove",
        param
      );
      this.delVisible = false;
      // this.getDepartmentList();
    },

    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },

    deletebumen(deptId) {
      this.$confirm("此操作将永久删除该职务, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          let param = new URLSearchParams();
          param.append("deptId", deptId);
          const { data: res } = await this.$http.post("sys/dept/remove", param);
          // this.getDepartmentList();
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
    handleSelectionChange(val) {
      console.log(val);
      this.selectedList = val;
    },
    // 解决弹出框title
    handleTitle() {
      if (this.addOrder == true) {
        this.title = "新增销售订单";
      }
      if (this.editOrder == true) {
        this.title = "编辑销售订单";
      }
    },
    handleVisible() {
      return this.addOrder || this.editOrder;
    },

    // 自己写的方法
    // 查询收款单列表
    queryReceiptList() {
      const { data: res } = this.$http.post("/receipt/selectReceipt", {
        params: { receiptDO: this.queryReceiptForm }
      });
      console.log(data);
    },

    // 查询订单列表
    async queryOrderList() {
      // const { data: res } = await
      this.$http
        .get("/queryOrderList", {
          params: {
            salesOrdermanagementForm: this.salesOrdermanagementForm
          }
        })
        .then(function(response) {
          console.log(response);
        })
        .catch(function(error) {
          console.log(error);
        })
        .then(function() {
          // always executed
        });
      this.tableData = res.body.rows; //如何取
    },

    //分页相关函数
    handleSizeChange(val) {
      this.salesOrdermanagementForm.pageSize = val;
      console.log(`每页 ${val} 条`);
      this.queryOrderList();
    },
    handleCurrentChange(val) {
      this.chaOrder.pageCode = val;
      this.getList();
    },
    chooseReceiptType() {
      if (this.rType === "0") {
        this.stateOfReturn = true;
        stateOfTypeChoose = false;
      } else if (this.rType === "1") {
        this.stateOfSell = true;
        stateOfTypeChoose = false;
      } else {
        handleClose();
      }
    },

    // 查询
    async getList(val) {
      // const { data: res1 } = await this.$http.post("jh/purchase/dtjresultMap");
      // this.chaOrderFrom.pageCode = 1;
      if (val) {
        // 重新点击时，需要重置查询页数
        this.chaOrderFrom.pageCode = 1;
        // 深拷贝
        this.chaOrder = JSON.parse(JSON.stringify(this.chaOrderFrom));
      }

      let res = "";
      if (this.chaOrder.typeOfReceipt == 0) {
        // 预付款
        const { data: res1 } = await this.$http.post(
          "/advancereceivable/selectAdvancereceivable",
          this.chaOrder
        );
        res = res1;
      } else if (this.chaOrder.typeOfReceipt == 1) {
        // 应收款
        const { data: res2 } = await this.$http.post(
          "/acountreceivable/selectAccountreceivable",
          this.chaOrder
        );
        res = res2;
      }
      // const { data: res } = await this.$http.post(
      //   "/cw/payment/selectAccountpayable",
      //   this.chaOrder
      // );

      console.log(res);

      this.orderList = res.body.rows;



      console.log('-----------------------------------');
      console.log(this.orderList);
      console.log(this.paymode);

      // 循环遍历，raetypes变为名字
      for(let i = 0;i<this.orderList.length;i++){
        for(let j = 0;j<this.paymode.length;j++){
          if(this.orderList[i].raetypes == this.paymode[j].value){
            console.log(this.paymode[j].label)
            this.orderList[i].raetypes = this.paymode[j].label
          }
        }
      }

      // this.orderList.forEach()
      this.total = res.body.total;

      console.log(this.orderList);
      console.log(this.total);
    },
    // 表单重置
    ResetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // 获取支出类型
    async selectoutpaymode() {
      const { data: res } = await this.$http.post("jc/Basic/selectoutpaymode");
      res.forEach((item, index, array) => {
        let x = {
          label: item.basicRetainone,
          value: item.basicId
        };
        this.paymode.push(x);
      });
      console.log("支出类型");
      console.log(this.paymode);
    },

    // 获取收入类型
    async selectinpaymode() {
      const { data: res } = await this.$http.post("jc/Basic/selectinpaymode");
      res.forEach((item, index, array) => {
        let x = {
          label: item.basicRetainone,
          value: item.basicId
        };
        this.paymode.push(x);
      });
      console.log("收入类型");
      console.log(this.paymode);
    },
    dialogClosed(val) {
      this.$refs[val].resetFields();
    },
    // 新增预付款单 应付款
    async addAdvancePayment() {
      let res = "";
      if (this.chaOrder.typeOfPayment == 0) {
        const { data: res1 } = await this.$http.post(
          "/payment/addAdvancepayment",
          this.addAdvancePaymentForm
        );
        res = res1;
      } else if (this.chaOrder.typeOfPayment == 1) {
        const { data: res2 } = await this.$http.post(
          "/payable/addAccountpayable",
          this.addAdvancePaymentForm
        );
        res = res2;
      }

      console.log(res);

      this.addAdvancePaymentFormVisible = false;
      this.getList();
    },

    // 编辑付款单
    async showEditOrder(val) {
      let res = "";
      if (this.chaOrder.typeOfReceipt == 0) {
        const { data: res1 } = await this.$http.post("/advancereceivable/selectMassage", {
          advanceorderno: val
        });
        res = res1;
      } else if (this.chaOrder.typeOfReceipt == 1) {
        const { data: res2 } = await this.$http.post("/acountreceivable/selectMassage", {
          advanceorderno: val
        });
        res = res2;
      }

      console.log(res.body.result);

      this.editPaymentForm = res.body.result;

      console.log(this.paymode);
      this.editPaymentForm.paymentstatus =
        this.editPaymentForm.paymentstatus + "";
      this.editPaymentForm.advanceorderno = val;
      //  this.editPaymentForm.raetypes = this.editPaymentForm.raetypes + ''

      this.editPaymentVisible = true;
    },

    // 付款结果保存
    async addSave() {
      let res = "";
      if (this.chaOrder.typeOfReceipt == 0) {
        const { data: res1 } = await this.$http.put(
          "/advancereceivable/updateAdvancereceivable",
          this.editPaymentForm
        );
        res = res1;
      } else if (this.chaOrder.typeOfReceipt == 1) {
        const { data: res2 } = await this.$http.put(
          "/acountreceivable/updateAccountreceivable",
          this.editPaymentForm
        );
        res = res2;
      }

      console.log(res.body.result);

      this.editPaymentVisible = false;

      this.getList();
    },

    getCookie: function() {
      var storage = window.localStorage;
      this.addAdvancePaymentForm.payexamine = storage.getItem("username");
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
</style>  