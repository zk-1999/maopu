<template>
  <div class="min1500">
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>库存管理</el-breadcrumb-item>
      <el-breadcrumb-item>入库审核</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <!-- <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="入库查询" name="first">-->
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
                <el-option value="3" label="半成品入库"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="入库状态：" prop="inboundStatus">
              <el-select v-model="chaInOrderFrom.inboundStatus" placeholder="请选择" class="_small">
                <el-option value label="全部"></el-option>
                <el-option value="0" label="待审核"></el-option>
                <el-option value="1" label="审核不通过"></el-option>
                <el-option value="2" label="审核通过"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button @click="getList(1)">查 询</el-button>
              <el-button type="primary" @click="ResetForm('chaInOrderFrom')">重 置</el-button>
              <!-- <el-button type="primary" @click="editOrderVisible = true;lookUpState = true">重 置</el-button> -->
            </el-form-item>
          </el-col>
        </el-row>

        <el-table border :data="orderList">
          <el-table-column type="index" label="序号" align="center" width="50px"></el-table-column>
          <el-table-column prop="inboundReceipt" label="入库单号" width="180px" align="center"></el-table-column>
          <el-table-column prop="porderCode" label="关联单号" width="180px" align="center"></el-table-column>
          <!-- <el-table-column prop="supplierDOs.supName" label="供应商" :show-overflow-tooltip="true"></el-table-column> -->
          <el-table-column prop="inboundType" label="入库类型">
            <template slot-scope="scope">
              <span v-if="scope.row.inboundType == 0">采购入库</span>
              <span v-if="scope.row.inboundType == 1">生产入库</span>
              <span v-if="scope.row.inboundType == 2">生产退料入库</span>
              <span v-if="scope.row.inboundType == 3">半成品入库</span>
            </template>
          </el-table-column>
          <!-- <el-table-column prop="inboundWhousenum" label="入库数量"></el-table-column> -->
          <el-table-column prop="inboundTime" label="入库时间" align="center" width="120px"></el-table-column>
          <el-table-column prop="inboundProducer" label="制单人"></el-table-column>
          <el-table-column prop="inboundOrdertime" label="制单时间" align="center" width="200px"></el-table-column>
          <el-table-column prop="inboundStatus" label="入库状态" width="100px" align="center">
            <template slot-scope="scope">
              <el-tag type="danger" v-if="scope.row.inboundStatus == 0">待审核</el-tag>
              <el-tag type="danger" v-if="scope.row.inboundStatus == 1">审核不通过</el-tag>
              <el-tag type="danger" v-if="scope.row.inboundStatus == 2">审核通过</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="180px" align="center" fixed="right">
            <template slot-scope="scope">
              <el-button
                type="success"
                size="mini"
                @click="lookUpState = true;checkState = false;showEditOrder(scope.row.inboundStatus,scope.row.inboundReceipt,scope.row.inboundType)"
              >查看</el-button>
              <el-button
                type="primary"
                size="mini"
                @click="lookUpState = true;checkState = true;showEditOrder(scope.row.inboundStatus,scope.row.inboundReceipt,scope.row.inboundType)"
                :disabled="scope.row.inboundStatus != 0"
              >审核</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form>
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page.sync="chaInOrder.pageCode"
        :page-size="10"
        layout="total, prev, pager, next"
        :total="total"
      ></el-pagination>
      <!-- </el-tab-pane>
        <el-tab-pane label="出库查询" name="second"></el-tab-pane>
      </el-tabs>-->
    </el-card>

    <el-dialog
      title="入库单审核"
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
        <el-form-item label="关联单号：" prop="porderCode">
          <el-input v-model="editOrderFrom.porderCode" class="_small" :disabled="true"></el-input>
        </el-form-item>

        <!-- 入库类型 -->
        <el-form-item label="入库类型：" prop="inboundType">
          <el-select v-model="editOrderFrom.inboundType" class="_small" :disabled="true">
            <el-option value="0" label="采购入库"></el-option>
            <el-option value="1" label="生产入库"></el-option>
            <el-option value="2" label="生产退料入库"></el-option>
            <el-option value="3" label="半成品入库"></el-option>
          </el-select>
        </el-form-item>

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
        <div v-show="flag == 0">
          <el-table :data="editOrderFrom.inboundGoolsDos" style="width: 100%">
            <!-- <el-table-column type="selection" width="55"></el-table-column> -->
            <el-table-column prop="supgoolssmallType" label="商品小类型"></el-table-column>
            <el-table-column prop="supgoolsId" label="商品名称"></el-table-column>
            <el-table-column prop="supgoolsSplicing" width="200px" align="center" label="商品描述"></el-table-column>
            <el-table-column prop="pcommodityPalnnum" label="总数"></el-table-column>
            <el-table-column prop="sum" label="已入库数量"></el-table-column>
            <el-table-column prop="inboundgoolsNum" label="本次入库数量">
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

            <!-- <el-table-column prop label="操作" align="center" v-if="!lookUpState">
            <template slot-scope="scope">
              <el-button @click="addOrderMsg(scope.$index)" size="mini" type="primary">关联追踪号</el-button>
            </template>
            </el-table-column>-->
            <!-- <el-table-column prop="pcommodityPalnnum" label="总数"></el-table-column> -->
            <el-table-column prop="jsonofinboundgoolsTrack" type="expand">
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
        <div v-show="flag == 1">
          <el-table :data="editOrderFrom.inboundGoolsDos" style="width: 100%">
            <el-table-column type="index" width="50px" label="序号" align="center"></el-table-column>
            <el-table-column prop="productName" label="商品名称"></el-table-column>
            <el-table-column prop="productNorms" label="产品规格"></el-table-column>
            <!-- 二选一 -->
            <!-- <el-table-column prop="supgoolsId" label="印刷版号"></el-table-column> -->
            <el-table-column prop="pbatParameterscode" label="生产追踪号" width="250px"></el-table-column>

            <el-table-column prop="mbatReallynum" label="入库重量"></el-table-column>
            <el-table-column label="单位">kg</el-table-column>
            <el-table-column prop="warehouse" label="入库仓库" width="140px"></el-table-column>
            <el-table-column label="实际入库" prop="inboundgoolsNum"></el-table-column>
          </el-table>
        </div>
        <div v-show="flag == 2">
          <el-table :data="editOrderFrom.inboundGoolsDos" style="width: 100%">
            <el-table-column type="index" label="序号" align="center" width="50px"></el-table-column>
            <el-table-column label="商品名称" prop="supgoolsId" width="110px"></el-table-column>
            <el-table-column label="商品小类型" prop="supgoolssmallType" width="100px"></el-table-column>
            <el-table-column label="商品描述" prop="supgoolsSplicing" width="240px"></el-table-column>
            <el-table-column label="单位" prop="pcommodityUnit">
              <template>kg</template>
            </el-table-column>
            <el-table-column label="计划使用量" prop="prolistPlannum" width="100px"></el-table-column>
            <el-table-column label="退货数量" prop="prolistLossnum"></el-table-column>
            <el-table-column label="入库数量" prop="inboundgoolsNum"></el-table-column>
            <el-table-column prop="warehouse" label="入库仓库" width="140px"></el-table-column>
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
        </div>
        <div v-show="flag == 3">
          <el-table :data="editOrderFrom.inboundGoolsDos" style="width: 100%">
            <!-- <el-table-column type="selection" width="55"></el-table-column> -->
            <el-table-column prop="productName" label="商品名称"></el-table-column>
            <el-table-column prop="productType" label="产品名称"></el-table-column>
            <el-table-column prop="pbatParameterscode" label="印刷批次号"></el-table-column>
            <el-table-column prop="pbatWeight" label="总数"></el-table-column>
            <!-- <el-table-column prop="sum" label="已入库数量"></el-table-column> -->
            <el-table-column prop="inboundgoolsNum" label="本次入库数量"></el-table-column>
            <el-table-column prop="unit" label="单位"></el-table-column>
            <el-table-column prop="warehouse" label="入库仓库" width="140px"></el-table-column>
          </el-table>
        </div>
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

        <!--  -->
        <div v-if="showCheckMsg">
          <div class="fenge1">审核信息</div>

          <el-form-item label="审核人：" prop="inboundAuditor">
            <el-input v-model="editOrderFrom.inboundAuditor" :disabled="true"></el-input>
          </el-form-item>&nbsp; &nbsp;
          <el-form-item label="审核结果：" prop="inboundStatus">
            <el-radio v-model="inboundStatus" label="2" :disabled="!checkState">通过</el-radio>
            <el-radio v-model="inboundStatus" label="1" :disabled="!checkState">驳回</el-radio>
          </el-form-item>
          <br />
          <el-form-item label="审核备注：" prop="inboundDesc">
            <el-input
              type="textarea"
              v-model="inboundDesc"
              style="width:600px"
              :disabled="!checkState"
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
      lookUpState: false, //查看状态
      checkState: false, //审核状态
      showCheckMsg: false, //展示审核信息

      editOrderVisible: false,
      editOrderFrom: {},
      selectedList: [],

      warehouseOptions: [], //仓库数组
      unit: [], //单位数组

      currentPage: 1,
      total: 0,

      inboundStatus: 0, //审核状态
      inboundDesc: "", //审核描述

      checkForm: {
        inboundReceipt: "",
        inboundStatus: "0",
        inboundDesc: "",
        inboundAuditor: "",
        porderCode: ""
      },

      flag: 0
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
      }
      const { data: res } = await this.$http.post(
        "kc/inbound/selectInbound",
        this.chaInOrder
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
    async showEditOrder(inboundStatus, inboundReceipt, inboundType) {
      // 根据入库单状态决定显示
      if (inboundStatus == 0 && this.checkState == false) {
        //审核状态并且为查看状态
        this.showCheckMsg = false;
      } else {
        this.showCheckMsg = true;
      }

      this.flag = inboundType; // 设置标志，控制表单显示

      if (inboundType == 0) {
        // 采购入库
        const { data: res } = await this.$http.post(
          "kc/inbound/selectindisplay",
          {
            inboundReceipt: inboundReceipt
          }
        );

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
              good.sum = item.supinboundsum;
            }
          });
        });

        // 根据采购单号查询各种商品采购数量
        const { data: res3 } = await this.$http.post(
          "jh/purchase/dtjresultMap",
          {
            porderCode: res.body.result.porderCode
          }
        );

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

        // 查看时显示 审核结果 审核描述
        if (this.checkState == false) {
          this.inboundStatus = this.editOrderFrom.inboundStatus + "";
          this.inboundDesc = this.editOrderFrom.inboundDesc;
        }
      } else if (inboundType == 1) {
        // 成品入库
        // 查询入库单信息
        const { data: res } = await this.$http.post(
          "kc/inbound/selectindisplay",
          {
            inboundReceipt: inboundReceipt
          }
        );
        let editOrder = res.body.result;

        editOrder.inboundType += "";

        let mbatCode = editOrder.inboundGoolsDos[0].pbatParameterscode;
        // 查询生产入库单商品信息
        const { data: res2 } = await this.$http.post("/sc/Machined/select1", {
          mbatCode: mbatCode //生产追踪号
        });

        editOrder.inboundGoolsDos[0].productName =
          res2.body.rows[0].productName;
        editOrder.inboundGoolsDos[0].productNorms =
          res2.body.rows[0].machinedDO.productionDO.productNorms;
        editOrder.inboundGoolsDos[0].mbatReallynum =
          res2.body.rows[0].mbatReallynum;
        editOrder.inboundGoolsDos[0].pbatParameterscode =
          res2.body.rows[0].mbatCode;

        this.warehouseOptions.forEach(warehouse => {
          if (warehouse.basicId == editOrder.inboundGoolsDos[0].basicId) {
            editOrder.inboundGoolsDos[0].warehouse = warehouse.basicRetainone;
          }
        });

        // 查看时显示 审核结果 审核描述
        if (this.checkState == false) {
          this.inboundStatus = editOrder.inboundStatus + "";
          this.inboundDesc = editOrder.inboundDesc;
        }

        this.editOrderFrom = editOrder;
      } else if (inboundType == 2) {
        //生产退料入库审核
        const { data: res2 } = await this.$http.post(
          "kc/inbound/selectindisplay",
          {
            inboundReceipt: inboundReceipt
          }
        );
        let editOrder = res2.body.result;

        editOrder.inboundType += "";


// --------------基础数据-----------------------
        let param = new URLSearchParams();
        param.append("prolistCode", res2.body.result.porderCode);
        const { data: res } = await this.$http.post(
          "sc/BuMateral/selectpliscode1",
          param
        );
        // 由于领料和补料可能存在相同商品，所以res.body需要去重，并且合并计划使用量和退货数量
      let ids = [];
      res.body.forEach(e=>{
        // 该元素id是否已经存在于ids数组中，true已存在
        let f =  ids.some(function(item,index,array){
          return item == e.suppliergoolsId
        })
        if(!f){
          ids.push(e.suppliergoolsId)
        }
      })

      // 实际数组 已经过去重
      let arr = [];
      ids.forEach(id=>{
        for(let i = 0;i<res.body.length;i++){
          if(res.body[i].suppliergoolsId == id){
            arr.push(JSON.parse(JSON.stringify(res.body[i])))
            break;
          }
        }
      })

      let prolistLossnum = 0
      let prolistPlannum = 0

      ids.forEach(id=>{
        // 统计相同id两项值
        res.body.forEach(e=>{
          if(e.suppliergoolsId == id){
            prolistLossnum += Number(e.prolistLossnum)
            prolistPlannum += Number(e.prolistPlannum)
          }
        })
        // 赋值
        arr.forEach(item=>{
          if(item.suppliergoolsId == id){
            item.prolistLossnum = prolistLossnum
            item.prolistPlannum = prolistPlannum
          }
        })

        prolistLossnum = 0;
        prolistPlannum = 0;
      })

      editOrder.inboundGoolsDos.forEach(good=>{
        arr.forEach(item=>{
          if(good.suppliergoolsId == item.suppliergoolsId){
            good.supgoolsId = item.supplierGoolsDO.supgoolsId
            good.supgoolssmallType = item.supplierGoolsDO.supgoolssmallType
            good.supgoolsSplicing = item.supplierGoolsDO.supgoolsSplicing
            good.prolistLossnum = item.prolistLossnum
            good.prolistPlannum = item.prolistPlannum
          }
        })
      })
// -----------------基础数据部分结束---------------------

        this.warehouseOptions.forEach(warehouse => {
          editOrder.inboundGoolsDos.forEach(e=>{
            if (warehouse.basicId == e.basicId) {
            e.warehouse = warehouse.basicRetainone;
          }
          })
        });

        // 查看时显示 审核结果 审核描述
        if (this.checkState == false) {
          this.inboundStatus = editOrder.inboundStatus + "";
          this.inboundDesc = editOrder.inboundDesc;
        }

        this.editOrderFrom = editOrder;
      } else if (inboundType == 3) {
        // 半成品入库
        const { data: res } = await this.$http.post(
          "kc/inbound/selectindisplay",
          {
            inboundReceipt: inboundReceipt
          }
        );
        let editOrder = res.body.result;

        editOrder.inboundType += "";

        const {
          data: res1
        } = await this.$http.post("jc/Produconggoods/selectall", [
          res.body.result.inboundGoolsDos[0].productgoodsId1
        ]);

        editOrder.inboundGoolsDos[0].productName = res1[0].productName;
        editOrder.inboundGoolsDos[0].productType = res1[0].productType;

        this.warehouseOptions.forEach(warehouse => {
          if (warehouse.basicId == editOrder.inboundGoolsDos[0].basicId) {
            editOrder.inboundGoolsDos[0].warehouse = warehouse.basicRetainone;
          }
        });
        this.unit.forEach(u => {
          if (u.basicId == editOrder.inboundGoolsDos[0].pcommodityUnit) {
            editOrder.inboundGoolsDos[0].unit = u.basicRetainone;
          }
        });

        // 查看时显示 审核结果 审核描述
        if (this.checkState == false) {
          this.inboundStatus = editOrder.inboundStatus + "";
          this.inboundDesc = editOrder.inboundDesc;
        }

        this.editOrderFrom = editOrder;
      }

      if (this.checkState) {
        this.getCookie();
      }

      this.editOrderFrom.inboundType += "";
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
      this.editOrderFrom.inboundAuditor = storage.getItem("username");
    },
    // 入库单审核
    async check() {
      this.checkForm.porderCode = this.editOrderFrom.porderCode;
      this.checkForm.inboundAuditor = this.editOrderFrom.inboundAuditor;
      this.checkForm.inboundStatus = Number(this.inboundStatus);
      this.checkForm.inboundDesc = this.inboundDesc;
      this.checkForm.inboundReceipt = this.editOrderFrom.inboundReceipt;
      this.checkForm.inboundGoolsDos = this.editOrderFrom.inboundGoolsDos;

      const { data: res } = await this.$http.post(
        "kc/inbound/examine",
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
          message: res.body.msg
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
</style>  