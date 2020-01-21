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
                @click="lookUpState = true;checkState = false;showEditOrder(scope.row.outboundReceipt,scope.row.outboundStatus,scope.row.outboundType)"
              >查看</el-button>
              <el-button
                type="primary"
                size="mini"
                @click="lookUpState = true;checkState = true;showEditOrder(scope.row.outboundReceipt,scope.row.outboundStatus,scope.row.outboundType)"
                :disabled="scope.row.outboundStatus != 0"
              >审核</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form>
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="currentPage"
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
      editOrderFrom: {},
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
    async showEditOrder(outboundReceipt, outboundStatus, outboundType) {
      console.log("outboundType")
      console.log(outboundType)
      this.chaOutOrderForm = {
        outboundReceipt: "", //入库单号
        preturnCode: "", //采购单号
        outboundType: "", //入库类型
        outboundStatus: "", //入库状态
        pageCode: 1,
        pageSize: 10
      }
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
            good.sum = item.supoutboundsum;
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
      if (this.checkState == false) {
        this.outboundStatus = editOrder.outboundStatus + "";
        this.outboundDesc = editOrder.outboundDesc;
        console.log("出库单审核状态");
        console.log(this.outboundStatus);
      }

      this.editOrderFrom = editOrder;
      if (this.checkState == true) {
        this.getCookie();
      }

      console.log("--------------------------");
      console.log(this.editOrderFrom);

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