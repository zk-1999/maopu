<template>
  <div class="min1500">
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>库存管理</el-breadcrumb-item>
      <el-breadcrumb-item>出库审核</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <!-- <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="入库查询" name="first">-->
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
              <el-select v-model="chaOutOrderForm.outboundType" placeholder="请选择" class="_small">
                <el-option value="0" label="退货出库"></el-option>
                <el-option value="1" label="生产出库"></el-option>
                <el-option value="3" label="销售出库"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="出库状态：" prop="outboundStatus">
              <el-select v-model="chaOutOrderForm.outboundStatus" placeholder="请选择" class="_small">
                <el-option value label="全部"></el-option>
                <el-option value="0" label="待审核"></el-option>
                <el-option value="1" label="审核不通过"></el-option>
                <el-option value="2" label="审核通过"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button @click="getList(1)">查 询</el-button>
              <el-button type="primary" @click="ResetForm('chaOutOrderForm')">重 置</el-button>
              <!-- <el-button type="primary" @click="editOrderVisible = true;lookUpState = true">重 置</el-button> -->
            </el-form-item>
          </el-col>
        </el-row>

        <el-table border :data="orderList">
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
          <!-- <el-table-column prop="inboundWhousenum" label="出库数量"></el-table-column> -->
          <el-table-column prop="outboundTime" label="出库时间"></el-table-column>
          <el-table-column prop="outboundProducer" label="制单人"></el-table-column>
          <el-table-column prop="outboundOrdertime" label="制单时间"></el-table-column>
          <el-table-column prop="outboundStatus" label="出库状态" width="100px" align="center">
            <template slot-scope="scope">
              <el-tag type="danger" v-if="scope.row.outboundStatus == 0">待审核</el-tag>
              <el-tag type="danger" v-if="scope.row.outboundStatus == 1">审核不通过</el-tag>
              <el-tag type="danger" v-if="scope.row.outboundStatus == 2">审核通过</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="180px" align="center" fixed="right">
            <template slot-scope="scope">
              <el-button
                type="success"
                size="mini"
                @click="lookUpState = true;checkState = false;showEditOrder(scope.row.outboundReceipt,scope.row.outboundStatus,scope.row.outboundType,scope.row.outboundType1)"
              >查看</el-button>
              <el-button
                type="primary"
                size="mini"
                @click="lookUpState = true;checkState = true;showEditOrder(scope.row.outboundReceipt,scope.row.outboundStatus,scope.row.outboundType,scope.row.outboundType1)"
                :disabled="scope.row.outboundStatus != 0"
              >审核</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form>
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page.sync="chaOutOrder.pageCode"
        :page-size="10"
        layout="total, prev, pager, next"
        :total="total"
      ></el-pagination>
      <!-- </el-tab-pane>
        <el-tab-pane label="出库查询" name="second"></el-tab-pane>
      </el-tabs>-->
    </el-card>

    <el-dialog
      :title="!checkState?'查看出库单':'出库单审核'"
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
        label-width="100px"
        label-position="left"
      >
        <!-- 采购单号 -->
        <el-form-item label="关联单号：" prop="preturnCode">
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
            <el-table-column prop="productThnumber" label="总数"></el-table-column>
            <el-table-column prop="sum" label="已出库数量"></el-table-column>
            <el-table-column prop="outboundgoolsNum" label="本次出库数量"></el-table-column>
            <el-table-column prop="unit" label="单位"></el-table-column>
            <el-table-column prop="warehouse" label="入库仓库"></el-table-column>
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

        <!-- 生产单 印刷领料 印刷补料 -->
        <div v-show="outboundType == 1 && (proOrderState == 1 || proOrderState == 3)">
          <el-table
            style="width: 100%"
            :data="editOrderFrom.outboundGoolsDos instanceof Array ? editOrderFrom.outboundGoolsDos : []"
          >
            <!-- default-expand-all -->
            <el-table-column type="index" width="50" align="center" label="序号"></el-table-column>
            <el-table-column label="商品名称" prop="supgoolsId"></el-table-column>
            <el-table-column label="商品小类型" prop="supgoolssmallType"></el-table-column>
            <el-table-column label="商品描述" prop="supgoolsSplicing" width="250px" align="center"></el-table-column>
            <el-table-column label="库存数量" prop="kcTotalstock"></el-table-column>
            <el-table-column label="单位" prop="productOutbao">
              <template>kg</template>
            </el-table-column>
            <el-table-column label="计划使用量" prop="prolistPlannum"></el-table-column>
            <el-table-column prop="basicId" label="出库仓库" width="140px"></el-table-column>
            <el-table-column label="实际出库" prop="outboundgoolsNum"></el-table-column>

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
        </div>
        <!-- 生产单 成型领料 -->
        <div v-show="outboundType == 1 && proOrderState == 4">
          <el-table style="width: 100%" :data="banFormingDOs">
            <el-table-column type="index" width="50" label="序号"></el-table-column>
            <el-table-column label="产品名称" prop="producinggoodsDO.productName"></el-table-column>
            <el-table-column label="规格" prop="producinggoodsDO.productNorms"></el-table-column>
            <el-table-column label="重量" prop="banPlannum"></el-table-column>
            <el-table-column label="单位" prop="productOutbao">
              <template>kg</template>
            </el-table-column>
            <el-table-column prop="basicId" label="出库仓库" width="140px"></el-table-column>
            <el-table-column label="出库数量" prop="outboundgoolsNum"></el-table-column>
            <el-table-column prop="jsonofinboundgoolsTrack" type="expand" label="追踪号" width="90px">
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
          <div class="fenge1">纸箱包装信息</div>
          <el-table style="width: 100%" :data="xiangFormingDOs">
            <el-table-column type="index" width="50px" label="序号"></el-table-column>
            <el-table-column label="纸箱小类型" prop="supplierGoolsDO.supgoolsId"></el-table-column>
            <el-table-column label="纸箱名称" prop="supplierGoolsDO.supgoolssmallType"></el-table-column>
            <el-table-column label="商品描述" prop="supplierGoolsDO.supgoolsSplicing"></el-table-column>
            <el-table-column label="库存数量" prop="supplierGoolsDO.kcTotalstock"></el-table-column>
            <el-table-column label="数量" prop="xiangPlannum"></el-table-column>
            <el-table-column prop="basicId" label="出库仓库" width="140px"></el-table-column>
            <el-table-column label="出库数量" prop="outboundgoolsNum"></el-table-column>
          </el-table>
          <div class="fenge1">袋子包装信息</div>
          <el-table style="width: 100%" :data="daiFormingDOs">
            <el-table-column type="index" width="50px" label="序号"></el-table-column>
            <el-table-column label="袋子小类型" prop="supplierGoolsDO.supgoolsId"></el-table-column>
            <el-table-column label="袋子名称" prop="supplierGoolsDO.supgoolssmallType"></el-table-column>
            <el-table-column label="商品描述" prop="supplierGoolsDO.supgoolsSplicing"></el-table-column>
            <el-table-column label="库存数量" prop="supplierGoolsDO.kcTotalstock"></el-table-column>
            <el-table-column label="数量" prop="daiPlannum"></el-table-column>
            <el-table-column prop="basicId" label="出库仓库" width="140px"></el-table-column>
            <el-table-column label="出库数量" prop="outboundgoolsNum"></el-table-column>
          </el-table>
        </div>

        <!-- 销售订单表单 -->
        <div v-if="outboundType == 2">
          <el-table
            :data="editOrderFrom.outboundGoolsDos"
            style="width: 100%"
            border
            default-expand-all
            class="tb"
          >
            <!-- <el-table-column type="selection" width="35" align="center"></el-table-column> -->
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
            <el-table-column label="发货数量" prop="dorderNumbers"></el-table-column>

            <el-table-column prop="pcommodityUnit" label="单位" width="100px" align="center"></el-table-column>
            <el-table-column prop="basicId" label="出库仓库" width="140px" align="center"></el-table-column>

            <el-table-column prop="outboundgoolsNum" label="本次出库数量" width="110px" align="center"></el-table-column>
            <!-- <el-table-column prop label="操作" align="center">
              <template slot-scope="scope">
                <el-button @click="addOrderMsg(scope.$index)" size="mini" type="primary">编辑</el-button>
              </template>
            </el-table-column>-->
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
            <el-radio v-model="outboundStatus" label="2" :disabled="checkState == false">通过</el-radio>
            <el-radio v-model="outboundStatus" label="1" :disabled="checkState == false">驳回</el-radio>
          </el-form-item>

          <br />
          <el-form-item label="审核备注：" prop="outboundDesc">
            <el-input
              type="textarea"
              v-model="outboundDesc"
              style="width:600px"
              :disabled="checkState == false"
            ></el-input>
          </el-form-item>
        </div>
      </el-form>

      <!-- 2个按钮 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="editOrderVisible = false">取 消</el-button>
        <el-button @click="check()" type="primary" v-if="checkState">确 认</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      chaOutOrderForm: {
        outboundReceipt: "", //入库单号
        preturnCode: "", //采购单号
        outboundType: "", //入库类型
        outboundStatus: "", //入库状态
        pageCode: 1,
        pageSize: 10
      }, //查询表单数据
      chaOutOrder: {}, //查询真实数据
      activeName: "first", //默认标签页
      orderList: [],
      lookUpState: false, //查看状态
      checkState: false, //审核状态

      editOrderVisible: false,
      editOrderFrom: {
        outboundGoolsDos: []
      },
      selectedList: [],

      warehouseOptions: [], //仓库数组
      unit: [], //单位数组

      currentPage: 1,
      total: 0,

      outboundStatus: 0, //审核状态
      outboundDesc: "", //审核描述
      outboundType: 0, //出库类型

      checkForm: {
        outboundReceipt: "",
        outboundStatus: "0",
        outboundDesc: "",
        outboundAuditor: "",
        preturnCode: "",
        outboundReceipt: {}
      },
      flag: false, // 审核信息是否可见，仅待审核状态 查看不可见

      proOrderState: 1, //生产单具体状态 1 印刷领料 3 印刷补料 4 成型领料

      banFormingDOs: [],
      xiangFormingDOs: [],
      daiFormingDOs: []
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
      this.warehouseOptions = res; //如何取
    },
    // 查询库存单位
    async queryUnit() {
      const { data: res } = await this.$http.post("jc/Basic/selectstorenum");
      this.unit = res;
    },
    handleCurrentChange(val) {
      this.chaOutOrder.pageCode = val;
      this.getList();
    },

    async getList(val) {
      // const { data: res1 } = await this.$http.post("jh/purchase/dtjresultMap");
      // this.chaOrderFrom.pageCode = 1;
      if (val) {
        // 重新点击时，需要重置查询页数
        this.chaOutOrderForm.pageCode = 1;
        this.chaOutOrder = JSON.parse(JSON.stringify(this.chaOutOrderForm));
      }
      const { data: res } = await this.$http.post(
        "kc/outbound/selectOutbound",
        this.chaOutOrder
      );

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
    async showEditOrder(
      outboundReceipt,
      outboundStatus,
      outboundType,
      outboundType1
    ) {
      //outboundType1生产出库小类型
      this.editOrderFrom = {
        outboundGoolsDos: []
      };
      this.chaOutOrderForm = {
        outboundReceipt: "", //入库单号
        preturnCode: "", //采购单号
        outboundType: "", //入库类型
        outboundStatus: "", //入库状态
        pageCode: 1,
        pageSize: 10
      };
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
        {
          outboundReceipt: outboundReceipt
        }
      );

      let editOrder = res.body.result;
      // 设置出库类型为字符串
      editOrder.outboundType += "";

      // 采购退货
      if (this.outboundType == 0) {
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
              good.sum = item.supoutboundsum;
            }
          });
        });

        // 应出库总数量
        const { data: res3 } = await this.$http.post("jh/preturn/dtjresultMap", {
          preturnCode: editOrder.preturnCode
        });

        editOrder.outboundGoolsDos.forEach(good => {
          res3.body.result[0].returnListDos.forEach(item => {
            if(good.suppliergoolsId == item.suppliergoolsId){
              good.productThnumber = item.productThnumber
            }
          })
        })

      } else if (this.outboundType == 1) {
        // 控制显示
        this.proOrderState = outboundType1;
        // 回传服务器
        editOrder.outboundType1 = outboundType1;

        const { data: res2 } = await this.$http.post(
          "/sc/BuMateral/selectpliscode2",
          {
            prolistCode: editOrder.preturnCode,
            status: outboundType1,
            kcState: 1
          }
        );

        if (outboundType1 == 1 || outboundType1 == 3) {
          editOrder.outboundGoolsDos.forEach(e => {
            res2.body.forEach(item => {
              if (e.suppliergoolsId == item.suppliergoolsId) {
                e.supgoolsId = item.supplierGoolsDO.supgoolsId;
                e.supgoolssmallType = item.supplierGoolsDO.supgoolssmallType;
                e.supgoolsSplicing = item.supplierGoolsDO.supgoolsSplicing;
                e.kcTotalstock = item.supplierGoolsDO.kcTotalstock;
                e.prolistPlannum = item.prolistPlannum;

              }
            });

            // 封装仓库
            this.warehouseOptions.forEach(w => {
                  if (e.basicId == w.basicId) {
                    e.basicId = w.basicRetainone;
                  }
            });
          });
        }
        if (outboundType1 == 4) {
          // 成型领料基础信息
          this.banFormingDOs = res2.body[0].formingPickingDO.banFormingDOs;
          this.xiangFormingDOs = res2.body[0].formingPickingDO.xiangFormingDOs;
          this.daiFormingDOs = res2.body[0].formingPickingDO.daiFormingDOs;

          this.banFormingDOs.forEach(ban => {
            ban.productNorms = ban.producinggoodsDO.productNorms;
            editOrder.outboundGoolsDos.forEach(good => {
              if (ban.productgoodsId == good.productgoodsId1) {
                // 出库仓库
                this.warehouseOptions.forEach(w => {
                  if (good.basicId == w.basicId) {
                    ban.basicId = w.basicRetainone;
                  }
                });
                ban.outboundgoolsNum = good.outboundgoolsNum;
                ban.jsonofinboundgoolsTrack = good.jsonofinboundgoolsTrack;
              }
            });
          });

          this.xiangFormingDOs.forEach(xiang => {
            editOrder.outboundGoolsDos.forEach(good => {
              if (xiang.suppliergoolsId == good.suppliergoolsId) {
                // 出库仓库
                this.warehouseOptions.forEach(w => {
                  if (good.basicId == w.basicId) {
                    xiang.basicId = w.basicRetainone;
                  }
                });
                // 出库数量
                xiang.outboundgoolsNum = good.outboundgoolsNum;
              }
            });
          });

          this.daiFormingDOs.forEach(dai => {
            editOrder.outboundGoolsDos.forEach(good => {
              if (dai.suppliergoolsId == good.suppliergoolsId) {
                // 出库仓库
                this.warehouseOptions.forEach(w => {
                  if (good.basicId == w.basicId) {
                    dai.basicId = w.basicRetainone;
                  }
                });

                dai.outboundgoolsNum = good.outboundgoolsNum;
              }
            });
          });
        }
      } else if (this.outboundType == 2) {
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

        let arr = JSON.parse(JSON.stringify(editOrder.outboundGoolsDos));

        editOrder.outboundGoolsDos =
          res1.body.DeliveryNoticeDO.deliveryOrderDOs;

        // 获取追踪码
        editOrder.outboundGoolsDos.forEach((good, index, array) => {
          arr.forEach((item, index, array) => {
            if (
              item.productgoodsId == good.productgoodsId &&
              item.sorderCode == good.sorderCode
            ) {
              good.jsonofinboundgoolsTrack = item.jsonofinboundgoolsTrack;
            }
          });
        });

        // 计算本次出库数量
        editOrder.outboundGoolsDos.forEach((good, index, array) => {
          good.outboundgoolsNum = 0;
          if (good.jsonofinboundgoolsTrack != null) {
            good.jsonofinboundgoolsTrack.forEach(track => {
              good.outboundgoolsNum += Number(track.weight);
            });
          }
        });


        // 封装单位和仓库
        editOrder.outboundGoolsDos.forEach(e => {
          arr.forEach(item => {
            if (item.productgoodsId == e.productgoodsId) {
              // 单位
              this.unit.forEach(u => {
                if (item.pcommodityUnit == u.basicId) {
                  e.pcommodityUnit = u.basicRetainone;
                }
              });
              // 仓库
              this.warehouseOptions.forEach(w => {
                if (item.basicId == w.basicId) {
                  e.basicId = w.basicRetainone;
                }
              });
            }
          });
        });

      }

      // 审核状态反显
      if (this.checkState == false) {
        this.outboundStatus = editOrder.outboundStatus + "";
        this.outboundDesc = editOrder.outboundDesc;
      }

      this.editOrderFrom = editOrder;
      if (this.checkState == true) {
        this.getCookie();
      }

      console.log(this.banFormingDOs);
      console.log(this.daiFormingDOs);
      console.log(this.xiangFormingDOs);

      this.editOrderVisible = true;
    },
    dialogClosed(val) {
      this.$refs[val].resetFields();
      // 手动重置
      this.checkForm = {};
      this.inboundStatus = 0;
      this.inboundDesc = "";
    },
    getCookie: function() {
      var storage = window.localStorage;
      this.editOrderFrom.outboundAuditor = storage.getItem("username");
    },
    // 入库单审核
    async check() {
      this.checkForm.preturnCode = this.editOrderFrom.preturnCode;
      this.checkForm.outboundAuditor = this.editOrderFrom.outboundAuditor;
      this.checkForm.outboundStatus = Number(this.outboundStatus);
      this.checkForm.outboundDesc = this.outboundDesc;
      this.checkForm.outboundReceipt = this.editOrderFrom.outboundReceipt;
      this.checkForm.outboundGoolsDos = this.editOrderFrom.outboundGoolsDos;
      this.checkForm.outboundType1 = this.editOrderFrom.outboundType1;

      // 类型转换
      this.checkForm.outboundGoolsDos.forEach(e => {
        e.productgoodsId = Number(e.productgoodsId);
        e.outboundgoolsNum += "";
      });

      const { data: res } = await this.$http.post(
        "kc/outbound/examine",
        this.checkForm
      );

      if (res.body.respCode == 200) {
        this.$message({
          type: "success",
          message: res.body.msg
        });
      } else {
        this.$message({
          type: "info",
          message: "出库单审核失败"
        });
      }

      this.getList();
      this.editOrderVisible = false;
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
.demo-table-expand {
  text-align: center;
  .el-form-item {
    margin-bottom: 0px;
  }
}
</style>  