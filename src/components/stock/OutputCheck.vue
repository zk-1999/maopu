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
        <el-tab-pane label="入库查询" name="first"> -->
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
                <el-form-item label="出库单号：" prop="inboundReceipt">
                  <el-input class="_small" v-model="chaInOrderFrom.inboundReceipt"></el-input>
                </el-form-item>
                <el-form-item label="关联单号：" prop="porderCode">
                  <el-input v-model="chaInOrderFrom.porderCode" class="_small"></el-input>
                </el-form-item>
                <el-form-item label="出库类型：" prop="inboundType">
                  <el-select v-model="chaInOrderFrom.inboundType" placeholder="请选择" class="_small">
                    <el-option value="0" label="采购入库"></el-option>
                    <el-option value="1" label="生产入库"></el-option>
                    <el-option value="3" label="售后入库"></el-option>
                    <el-option value="4" label="其他入库"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="出库状态：" prop="inboundStatus">
                  <el-select
                    v-model="chaInOrderFrom.inboundStatus"
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
                  <el-button @click="getList(1)">查 询</el-button>
                  <el-button type="primary" @click="ResetForm('chaInOrderFrom')">重 置</el-button>
                  <!-- <el-button type="primary" @click="addOrderVisible = true">重 置</el-button> -->
                  <!-- <el-button type="primary" @click="editOrderVisible = true">重 置</el-button> -->
                  <el-button type="primary" @click="editOrderVisible = true;lookUpState = true">重 置</el-button>
                </el-form-item>
              </el-col>
            </el-row>

            <el-table border :data="orderList">
              <el-table-column type="index" label="序号" align="center" width="50px"></el-table-column>
              <el-table-column prop="inboundReceipt" label="出库单号" width="180px" align="center"></el-table-column>
              <el-table-column prop="porderCode" label="关联单号" width="180px" align="center"></el-table-column>
              <!-- <el-table-column prop="supplierDOs.supName" label="供应商" :show-overflow-tooltip="true"></el-table-column> -->
              <el-table-column prop="inboundType" label="出库类型">
                <template slot-scope="scope">
                  <span v-if="scope.row.inboundType == 0">采购入库</span>
                  <span v-if="scope.row.inboundType == 1">生产入库</span>
                  <span v-if="scope.row.inboundType == 2">售后入库</span>
                  <span v-if="scope.row.inboundType == 3">其他入库</span>
                </template>
              </el-table-column>
              <!-- <el-table-column prop="inboundWhousenum" label="出库数量"></el-table-column> -->
              <el-table-column prop="inboundTime" label="出库时间"></el-table-column>
              <el-table-column prop="inboundProducer" label="制单人"></el-table-column>
              <el-table-column prop="inboundOrdertime" label="制单时间"></el-table-column>
              <el-table-column prop="inboundStatus" label="出库状态" width="100px">
                <template slot-scope="scope">
                <el-tag type="danger" v-if="scope.row.inboundStatus == 0">待审核</el-tag>
                <el-tag type="danger" v-if="scope.row.inboundStatus == 1">审核不通过</el-tag>
                <el-tag type="danger" v-if="scope.row.inboundStatus == 2">审核通过</el-tag>
                </template>
              </el-table-column>
              <el-table-column label="操作" width="90px" align="center" fixed="right">
                <template slot-scope="scope">
                  <el-button
                    type="success"
                    size="mini"
                    @click="lookUpState = true;checkState = false;showEditOrder(scope.row.inboundReceipt)"
                    :disabled="scope.row.inboundStatus != 0"
                  >查看</el-button>
                  <el-button
                    type="primary"
                    size="mini"
                    @click="lookUpState = true;checkState = true;showEditOrder(scope.row.inboundReceipt)"
                    :disabled="scope.row.inboundStatus != 0"
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
      </el-tabs> -->
    </el-card>

    <el-dialog
      title="出库单审核"
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

        <el-button type="primary" @click="addGoods(editOrderFrom.porderCode)" v-if="!lookUpState">选择入库商品</el-button>
        <el-button
          type="dange"
          @click="deleteAddPurGoods()"
          :disabled="selectedList.length == 0"
          v-if="!lookUpState"
        >删除商品</el-button>

        <!-- 带有排序功能的商品table -->
        <!-- :default-sort="{prop: 'date', order: 'descending'}" -->
        <!-- v-show="addOrderFrom.inboundType == 0" -->
        <el-table
          :data="editOrderFrom.inboundGoolsDos"
          style="width: 100%"
        >
          <!-- <el-table-column type="selection" width="55"></el-table-column> -->
          <el-table-column prop="supgoolssmallType" label="商品小类型"></el-table-column>
          <el-table-column prop="supgoolsId" label="商品名称"></el-table-column>
          <el-table-column prop="supgoolsSplicing" width="200px" align="center" label="商品描述"></el-table-column>
          <el-table-column prop="pcommodityPalnnum" label="总数"></el-table-column>
          <el-table-column prop label="已入库数量"></el-table-column>
          <el-table-column prop="inboundgoolsNum" label="本次入库数量">
            <!-- <template slot-scope="scope">
              <el-input v-model="scope.row.inboundgoolsNum"></el-input>
            </template> -->
          </el-table-column>
          <el-table-column prop label="单位">
            <!-- <template slot-scope="scope">
              <el-select v-model="scope.row.inboundgoolsUnit" placeholder="请选择" class="_small">
                <el-option
                  v-for="item in unit"
                  :key="item.basicId"
                  :label="item.basicRetainone"
                  :value="item.basicId"
                ></el-option>
              </el-select>
            </template> -->
          </el-table-column>
          <el-table-column prop label="入库仓库">
            <!-- <template slot-scope="scope">
              <el-select v-model="scope.row.inboundgoolsWhouse" placeholder="请选择" class="_small">
                <el-option
                  v-for="item in warehouseOptions"
                  :key="item.basicId"
                  :label="item.basicRetainone"
                  :value="item.basicId"
                ></el-option>
              </el-select>
            </template> -->
          </el-table-column>

           <!-- <el-table-column prop label="操作" align="center" v-if="!lookUpState">
            <template slot-scope="scope">
              <el-button @click="addOrderMsg(scope.$index)" size="mini" type="primary">关联追踪号</el-button>
            </template>
          </el-table-column> -->
          <!-- <el-table-column prop="pcommodityPalnnum" label="总数"></el-table-column> -->
          <el-table-column prop="jsonofinboundgoolsTrack" type="expand">
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

        <hr>

        <el-form-item label="审核人：" prop="inboundAuditor">
          <el-input v-model="editOrderFrom.inboundAuditor" :disabled="true"></el-input>
        </el-form-item>
        &nbsp;    &nbsp;    
        <el-form-item label="审核结果：" prop="inboundStatus">
          <el-radio v-model="inboundStatus" label="2">通过</el-radio>
          <el-radio v-model="inboundStatus" label="1">驳回</el-radio>
        </el-form-item>
        <br>
        <el-form-item label="审核备注：" prop="inboundDesc" >
          <el-input
            type="textarea"
            v-model="inboundDesc"
            style="width:600px"
          ></el-input>
        </el-form-item>
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
      lookUpState:false,//查看状态
      checkState:false,//审核状态

      editOrderVisible:false,
      editOrderFrom:{},
      selectedList:[],

      warehouseOptions: [], //仓库数组
      unit: [], //单位数组

      currentPage:1,
      total:0,

      inboundStatus:0,//审核状态
      inboundDesc:"",//审核描述

      checkForm:{
        inboundReceipt:"",
        inboundStatus:"0",
        inboundDesc:"",
        inboundAuditor:"",
        porderCode:"",
      }
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

    // deletebumen(deptId) {
    //   this.$confirm("此操作将永久删除该职务, 是否继续?", "提示", {
    //     confirmButtonText: "确定",
    //     cancelButtonText: "取消",
    //     type: "warning"
    //   })
    //     .then(async () => {
    //       let param = new URLSearchParams();
    //       param.append("deptId", deptId);
    //       const { data: res } = await this.$http.post("sys/dept/remove", param);
    //       // this.getDepartmentList();
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
    async showEditOrder(inboundReceipt){
      const { data: res } = 
        await this.$http.post("kc/inbound/selectindisplay",{inboundReceipt:inboundReceipt});
      console.log(res)

      // 获取采购订单中对应商品的单位与仓库
      // const { data: res2 } = await this.$http.post("jh/purchase/dtjresultMap", {
      //   porderCode: res.body.result.porderCode
      // });

      this.editOrderFrom = res.body.result

      let ids = []
      this.editOrderFrom.inboundGoolsDos.forEach((item,index,array) => {
        // 将仓库 单位转为数字
        item.inboundgoolsUnit = Number(item.inboundgoolsUnit)
        item.inboundgoolsWhouse = Number(item.inboundgoolsWhouse)

        ids.push(item.suppliergoolsId)
      });

      const { data: res1 } = await this.$http.post(
        "jc/suppliergoods/selectSuppliergoolslistmore",
        ids
      );

      this.editOrderFrom.inboundGoolsDos.forEach((good,index,array) => {
        res1.forEach((item,index,array) => {
          if(good.suppliergoolsId == item.suppliergoolsId){
            good.supgoolssmallType = item.supgoolssmallType;
            good.supgoolsId = item.supgoolsId;
            good.supgoolsSplicing = item.supgoolsSplicing;
          }
        })
      });
      this.getCookie();
      console.log( this.editOrderFrom)

      this.checkForm.inboundReceipt = inboundReceipt;

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
    async check(){
        this.checkForm.porderCode = this.editOrderFrom.porderCode;
        this.checkForm.inboundAuditor = this.editOrderFrom.inboundAuditor;
        this.checkForm.inboundStatus = Number(this.inboundStatus);
        this.checkForm.inboundDesc = this.inboundDesc;
        

        const { data: res } = await this.$http.post("kc/inbound/examine",this.checkForm);


        this.getList();
        this.editOrderVisible = false
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