<template>
  <div class="min1500">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>进货管理</el-breadcrumb-item>
      <el-breadcrumb-item>采购退货-复审</el-breadcrumb-item>
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
            <el-form-item label="订单编号：" prop="preturnCode">
              <el-input class="hu" v-model="chaOrderFrom.preturnCode"></el-input>
            </el-form-item>
            <el-form-item label="制单人员：" prop="preturnProducer">
              <el-input class="hu" v-model="chaOrderFrom.preturnProducer"></el-input>
            </el-form-item>
            <el-form-item label="订单状态：" prop="preturnState">
              <el-select v-model="chaOrderFrom.preturnState" placeholder="请选择" class="hu">
                <el-option value="8" label="全部"></el-option>
                <el-option value="3" label="待审核"></el-option>
                <el-option value="4" label="已驳回"></el-option>
                <el-option value="5" label="已通过"></el-option>
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
            <!-- <el-form-item label="退货情况" prop="preturnSituation">
              <el-select v-model="chaOrderFrom.preturnSituation" placeholder="请选择" class="hu">
                <el-option value label="全部"></el-option>
                <el-option value="0" label="待退货"></el-option>
                <el-option value="1" label="部分退货"></el-option>
                <el-option value="2" label="全部退货"></el-option>
              </el-select>
            </el-form-item>-->
            <el-form-item>
              <el-button @click="getList(1)">查 询</el-button>
              <el-button type="primary" @click="ResetForm('chaOrderFrom')">重 置</el-button>
              <!-- <el-button type="primary" @click="editReturnVisible = true">重 置</el-button> -->
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-table border :data="orderList" @selection-change="handleSelectionChange">
        <el-table-column type="index" width="50px" label="序号"></el-table-column>
        <el-table-column prop="preturnCode" label="订单编号" width="200px" align="center"></el-table-column>
        <el-table-column prop="preturnAmount" label="退款总金额"></el-table-column>
        <el-table-column prop="preturnAlltotal" label="退货总数量"></el-table-column>
        <!-- <el-table-column prop="preturnTotal" label="已退数量" ></el-table-column> -->
        <!-- <el-table-column prop="preturnSituation" label="退货情况">
          <template slot-scope="scope">
            <span v-if="scope.row.preturnSituation == 0">待退货</span>
            <span v-if="scope.row.preturnSituation == 1">部分退货</span>
            <span v-if="scope.row.preturnSituation == 2">全部退货</span>
          </template>
        </el-table-column>-->
        <!-- <el-table-column prop="basicDO.basicRetainone" label="出库仓库"></el-table-column> -->
        <el-table-column prop="supplierDO.supName" label="供应商"></el-table-column>
        <el-table-column prop="preturnProducer" label="制单人员"></el-table-column>
        <el-table-column prop="preturnState" label="退货单状态" align="center">
          <template slot-scope="scope">
            <el-tag type="danger" v-if="scope.row.preturnState==3">待审核</el-tag>
            <el-tag type="danger" v-if="scope.row.preturnState==4">已驳回</el-tag>
            <el-tag type="danger" v-if="scope.row.preturnState==5">已通过</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="preturnTime" label="制单时间" width="200px" align="center"></el-table-column>
        <!-- <el-table-column prop="preturnExamine1" label="审核时间" width="100px" align="center"></el-table-column> -->
        <!-- <el-table-column prop="preturnState" label="审核状态">
          <template slot-scope="scope">
            <el-tag type="danger" v-if="scope.row.preturnState==0">初始化</el-tag>
            <el-tag type="danger" v-if="scope.row.preturnState==1">待采购审核</el-tag>
            <el-tag type="danger" v-if="scope.row.preturnState==2">待财务审核</el-tag>
            <el-tag type="danger" v-if="scope.row.preturnState==3">初审未通过</el-tag>
            <el-tag type="danger" v-if="scope.row.preturnState==4">复审未通过</el-tag>
          </template>
        </el-table-column>-->
        <el-table-column label="操作" width="180px" align="center" fixed="right">
          <template slot-scope="scope">
          <el-button
              type="success"
              size="mini"
              @click="lookUpState2 = true;lookUpState = true;showEditOrder(scope.row.preturnCode)"
            >查看</el-button>
          
            <el-button
              type="primary"
              size="mini"
              :disabled="scope.row.preturnState != 3"
              @click="lookUpState2 = false;lookUpState = true;showEditOrder(scope.row.preturnCode)"
            >审核</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- :current-page.sync="currentPage" -->
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page.sync="addQuery.pageCode"
        :page-size="10"
        layout="total, prev, pager, next"
        :total="orderTotal"
      ></el-pagination>
    </el-card>

    <el-dialog
      :title="lookUpState2?'查看订单':'审核'"
      :visible.sync="editReturnVisible"
      width="60%"
      :before-close="handleClose"
      @closed="dialogClosed('editReturnFrom')"
    >
      <el-form
        label-position="right"
        label-width="100px"
        :inline="true"
        class="demo-form-inline search"
        :model="editReturnFrom"
        ref="editReturnFrom"
      >
      <div class="fenge">退货商品信息</div>
        <el-table :data="editReturnFrom.returnListDos" style="width: 100%">
          <el-table-column prop="supgoolssmallType" label="商品小类型"></el-table-column>
          <el-table-column prop="supgoolsId" label="商品名称"></el-table-column>
          <el-table-column prop="supgoolsSplicing" label="商品描述" width="200px" align="center"></el-table-column>
          <el-table-column prop="pcommodityPrice" label="单价"></el-table-column>
          <el-table-column prop="pcommodityPalnnum" label="数量"></el-table-column>
          <el-table-column prop="xxx" label="金额">
            <template slot-scope="scope">{{scope.row.pcommodityPrice * scope.row.pcommodityPalnnum}}</template>
          </el-table-column>
          <el-table-column prop="productDhnumber" label="已到货数量"></el-table-column>
          <el-table-column prop="productThnumber" label="退货数量">
            <template slot-scope="scope">
              <el-input
                v-model="scope.row.productThnumber"
                @blur="calculateEdit(editReturnFrom)"
                :disabled="lookUpState"
              ></el-input>
            </template>
          </el-table-column>
          <!-- <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
                @click="deleteEditReturnGoods(scope.row.supgoolsId)"
                :disabled="lookUpState"
              >删除</el-button>
            </template>
          </el-table-column> -->
        </el-table>
        <br />
        <el-form-item label="退货总数量：" prop="preturnAlltotal">
          <el-input class="hu" v-model="editReturnFrom.preturnAlltotal" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="退货总金额：" prop="preturnAmount">
          <el-input class="hu" v-model="editReturnFrom.preturnAmount" :disabled="true"></el-input>
        </el-form-item>
        <div class="fenge1">供应商信息</div>

        <el-table :data="editReturnFromGongyingshang" style="width: 100%">
          <el-table-column prop="supName" label="供应商名称"></el-table-column>
          <el-table-column prop="supId" label="供应商编码"></el-table-column>
          <el-table-column prop="supType" label="供应商类型"></el-table-column>
          <el-table-column prop="supContacts" label="联系人"></el-table-column>
          <el-table-column prop="supPhone" label="手机"></el-table-column>
        </el-table>

        <div class="fenge1">退货描述</div>

        <!-- <el-form-item label="出库仓库" prop="preturnOutwarehouse">
          <el-select
            v-model="editReturnFrom.preturnOutwarehouse"
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
        </el-form-item> -->
        <el-form-item label="制单人员：" prop="preturnProducer">
          <el-input class="hu" v-model="editReturnFrom.preturnProducer" :disabled="true"></el-input>
        </el-form-item>
        <br />
        <el-form-item label="备注：" prop="preturnDesc">
          <el-input
            type="textarea"
            v-model="editReturnFrom.preturnDesc"
            style="width: 600px"
            :disabled="lookUpState"
          ></el-input>
        </el-form-item>

        <div class="fenge1">退货地址</div>

        <el-form-item label="收货人：" prop="preturnAddressee">
          <el-input class="hu" v-model="editReturnFrom.preturnAddressee" :disabled="lookUpState"></el-input>
        </el-form-item>
        <el-form-item label="手机：" prop="preturnTel">
          <el-input class="hu" v-model="editReturnFrom.preturnTel" :disabled="lookUpState"></el-input>
        </el-form-item>
        <br />
        <el-form-item label="收货地址：" prop="preturnAddress">
          <el-input
            type="textarea"
            v-model="editReturnFrom.preturnAddress"
            style="width: 600px"
            :disabled="lookUpState"
          ></el-input>
        </el-form-item>

        <div class="fenge1">退货审核-采购初审</div>

        <el-form-item label="审核人：" prop="preturnChushen">
          <el-input v-model="editReturnFrom.preturnChushen" :disabled="true"></el-input>
        </el-form-item>

        <br />
        <el-form-item label="备注：" prop="preturnRemark0">
          <el-input
            type="textarea"
            v-model="editReturnFrom.preturnRemark0"
            style="width:600px"
            :disabled="true"
          ></el-input>
        </el-form-item>

        <div v-if="lookUpState2 && editReturnFrom.preturnState != 3">
          <div class="fenge1">退货审核-财务复审</div>
        <el-form-item label="审核人：" prop="preturnFushen">
          <el-input v-model="editReturnFrom.preturnFushen" :disabled="true"></el-input>
        </el-form-item>&nbsp; &nbsp;
        <el-form-item label="审核结果：">
          <el-radio v-model="editReturnFrom.preturnState" label="5" :disabled="true">通过</el-radio>
          <el-radio v-model="editReturnFrom.preturnState" label="4" :disabled="true">驳回</el-radio>
        </el-form-item>
        <br />
        <el-form-item label="备注：" prop="preturnRemark1">
          <el-input type="textarea" v-model="editReturnFrom.preturnRemark1" style="width:600px" :disabled="true"></el-input>
        </el-form-item>
        </div>

        <div v-if="!lookUpState2">
          <hr />
        <el-form-item label="审核人：" prop="preturnFushen">
          <el-input v-model="editReturnFrom.preturnFushen" :disabled="true"></el-input>
        </el-form-item>&nbsp; &nbsp;
        <el-form-item label="审核结果：">
          <el-radio v-model="radio" label="0">通过</el-radio>
          <el-radio v-model="radio" label="1">驳回</el-radio>
        </el-form-item>
        <br />
        <el-form-item label="备注：" prop="preturnRemark1">
          <el-input type="textarea" v-model="editReturnFrom.preturnRemark1" style="width:600px"></el-input>
        </el-form-item>
        </div>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button
          @click="editReturnVisible = false;editReturnFromGongyingshang = [];ClearChedkMsg()"
        >取 消</el-button>
        <el-button type="primary" @click="editReturnOrder()" v-if="!lookUpState2">保 存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      AddVisible: false,
      selectedList: [],
      orderList: [],
      GoodsSelectedList: [],
      goodsList: [],
      chaOrderFrom: {
        preturnCode: "", //退货单号
        preturnProducer: "", //制单人
        // supplierId: "", 供应商id
        preturnState: "8", //审核状态
        preturnSituation: "", //退货状态
        time: [], //制单时间
        pageCode: 1,
        pageSize: 10
      },
      chaOrder: {
        preturnCode: "", //退货单号
        preturnProducer: "", //制单人
        // supplierId: "", 供应商id
        preturnState: "", //审核状态
        preturnSituation: "", //退货状态
        time: [], //制单时间
        pageCode: 1,
        pageSize: 10
      }, //实际查询数据
      orderTotal: 0, // 查询结果总数量
      addQueryForm: {
        // porderCode: "", //采购订单号
        // basicId: "", //入库仓库
        // porderState: "", //订单状态
        // personType: "", //人员类型
        // name: "", //人员名称
        // timeType: "", //时间类型
        // time: [], //时间
        // porderArrivalstatus: "3", //到货情况
        // pageCode: 1,
        // pageSize: 10
        porderCode: "", //采购订单号
        basicId: "", //入库仓库
        preturnProducer: "", //制单人员
        time: [], //制单时间
        porderArrivalstatus: "3", //到货情况
        pageCode: 1,
        pageSize: 10
      },
      // addQueryForm真实查询数据
      addQuery: {
        porderCode: "", //采购订单号
        basicId: "", //入库仓库
        preturnProducer: "", //制单人员
        time: [], //制单时间
        porderArrivalstatus: "3", //到货情况
        pageCode: 1,
        pageSize: 10
      },
      addOrderTotal: 0, //新增查询结果总量
      purchaseOrderList: [], //采购订单查询表格数据
      createReturnVisible: false, //生成退货单显示状态
      porderCode: "", //生成退货单时的销售订单号
      createReturnFrom: {
        //生成退货单表单
        porderCode: "", //采购订单号
        supplierId: "", //供应商id
        preturnProducer: "", //制单人员
        preturnOutwarehouse: "", //出库仓库
        preturnDesc: "", //退货描述
        preturnAddress: "", //退货地址
        preturnAddressee: "", //收货人
        preturnTel: "", //电话
        pcommodityDos: [], //采购商品对应的所有商品（生成退货单） 包含退货数量、金额、原因
        preturnAlltotal: "", //退货总数量
        preturnAmount: "", //退货总金额
        supplierDO: [], //供应商信息
        basicId: "", //仓库id
        preturnState: 0, //退货单状态
        preturnSituation: 0 //退货情况
      },
      gongyinshang: [], //供应商数组
      cangku: [], //仓库数组
      createReturnFromGongyingshang: [], //新建退货单供应商信息
      chaSupplierForm: {
        a: ""
      },

      editReturnFrom: {}, //编辑退款单表单
      lookUpState: true, //查看按钮 状态
      editReturnFromGongyingshang: [], //编辑form供应商
      editReturnVisible: false, //编辑表单可见标识

      radio: "",
      lookUpState2:false,
    };
  },
  created() {
    this.getCha();
    this.getList();
    // this.getCookie();
    this.chaCopy();
  },
  methods: {
    handleSelectionChange(val) {
      this.selectedList = val;
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    handleCloseAdd(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          this.ResetForm("addQueryForm");
          done();
        })
        .catch(_ => {});
    },
    goodsListSelect(val) {
      this.GoodsSelectedList = val;
    },

    allCount: function() {
      var count = 0;
      this.goodsList.forEach(function(val) {
        count += parseInt(val.thsl);
      });
      return count;
    },
    //表单重置
    ResetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // 查询按钮的获取列表

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
        "jh/preturn/selectPreturn",
        this.chaOrder
      );

      // console.log(res1);
      this.orderList = res.body.rows;
      this.orderTotal = res.body.total;
    },
    // 查询采购订单list
    async getPurchaseList(val) {
      this.purchaseOrderList = [];

      if (val) {
        this.addQuery.porderCode = this.addQueryForm.porderCode;
        this.addQuery.basicId = this.addQueryForm.basicId;
        this.addQuery.preturnProducer = this.addQueryForm.preturnProducer;
        this.addQuery.time = this.addQueryForm.time;
        this.addQuery.porderArrivalstatus = this.addQueryForm.porderArrivalstatus;
        this.addQuery.pageCode = 1;
        this.addQuery.pageSize = this.addQueryForm.pageSize;
      }

      const { data: res } = await this.$http.post(
        "/jh/purchase/thselect",
        this.addQuery
      );
      this.purchaseOrderList = res.body.rows;
      this.addOrderTotal = res.body.total;
    },
    handleCurrentChange(val) {
      this.chaOrder.pageCode = val;
      this.getList();
    },
    handleCurrentChange2(val) {
      this.addQuery.pageCode = val;
      this.getPurchaseList();
    },
    // 生成退货单取消按钮
    cancelAddVisible() {
      this.AddVisible = false;
      this.ResetForm("addQueryForm");
      this.addQuery = {
        porderCode: "", //采购订单号
        basicId: "", //入库仓库
        preturnProducer: "", //制单人员
        time: [], //制单时间
        porderArrivalstatus: "3", //到货情况
        pageCode: 1,
        pageSize: 10
      };
      this.getList();
    },
    // 新增 生成退货单出现
    changeAddVisible() {
      this.getPurchaseList();
      this.AddVisible = true;
    },
    // 生成退货单
    async returnOrder(porderCode, supplierId) {
      this.createReturnFrom.porderCode = porderCode;
      this.createReturnFrom.supplierId = supplierId;

      // 请求一个销售订单下的所有商品id
      const { data: res } = await this.$http.post("jh/purchase/dtjresultMap", {
        porderCode: porderCode
      });
      // console.log(res[0]);
      // 一个销售订单下的所有商品信息
      let val = res.body.result[0].pcommodityDos;
      // 一个销售订单下的所有商品
      let ids = [];
      for (let i = 0; i < val.length; i++) {
        ids.push(val[i].suppliergoolsId);
      }

      // 获取本地的供应商信息
      // console.log("供应商");
      // console.log(this.gongyinshang);

      this.gongyinshang.forEach((item, index, arr) => {
        if (item.supplierId == res.body.result[0].supplierId) {
          this.createReturnFromGongyingshang.push(item);
          // console.log("++++++++++++++++++++++++");
        }
      });

      // console.log("---------------------");
      // console.log(this.createReturnFromGongyingshang);

      // 用数组做参数查询所有规格
      // jc/suppliergoods/selectSuppliergoolslistmore
      const { data: res2 } = await this.$http.post(
        "jc/suppliergoods/selectSuppliergoolslistmore",
        ids
      );

      // console.log(res2);

      // 为表单商品赋值
      this.createReturnFrom.pcommodityDos = val;
      //
      for (let j = 0; j < val.length; j++) {
        for (let i = 0; i < res2.length; i++) {
          if (
            this.createReturnFrom.pcommodityDos[j].suppliergoolsId ==
            res2[i].suppliergoolsId
          ) {
            // 将所有规格封装成一个pcommodityDos的属性
            // this.createReturnFrom.pcommodityDos[j].suppliergoods = res2[i];
            // 需补全所有退货单的商品具体参数
            // let returnForm = {// 退货表单
            //   productThnumber : 0,// 退货数量
            //   productCount : "",// 退货金额
            //   returnReason : "",// 退货金额
            // }
            this.createReturnFrom.pcommodityDos[j].supgoolsBigType =
              res2[i].supgoolsBigType;
            this.createReturnFrom.pcommodityDos[j].supgoolssmallType =
              res2[i].supgoolssmallType;
            this.createReturnFrom.pcommodityDos[j].supgoolsId =
              res2[i].supgoolsId;
            this.createReturnFrom.pcommodityDos[j].supgoolsBrand =
              res2[i].supgoolsBrand;

            this.createReturnFrom.pcommodityDos[j].supgoolsSplicing =
              res2[i].supgoolsSplicing;

            // this.createReturnFrom.pcommodityDos[j].supgoolsWeight =
            //   res2[i].supgoolsWeight;
            // this.createReturnFrom.pcommodityDos[j].supgoolsWidths =
            //   res2[i].supgoolsWidths;
            // this.createReturnFrom.pcommodityDos[j].supgoolCoated =
            //   res2[i].supgoolCoated;

            // this.createReturnFrom.pcommodityDos[j].productThnumber = 0;
            // this.createReturnFrom.pcommodityDos[j].productCount = 0;
            // this.createReturnFrom.pcommodityDos[j].returnReason = "";

            // this.createReturnFrom.pcommodityDos[j].detailOfReturn.productThnumber =
            // this.createReturnFrom.pcommodityDos[j].detailOfReturn.productCount
          }
        }
      }

      ///this.createReturnFrom.pcommodityDos赋值
      //制单人员反显
      // this.preturnProducer = ?
      this.createReturnVisible = true;
    },

    getSummaries(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        // 统计行首列（列名）
        if (index === 0) {
          sums[index] = "统计";
          return;
        }
        if (index === 9 || index === 10) {
          const values = data.map(item => Number(item[column.property]));
          // 有值都是非数字，数字的部分做一个统计
          if (!values.every(value => isNaN(value))) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                return prev + curr;
              } else {
                return prev;
              }
            }, 0);
            // sums[index] += ' 元';
          } else {
            // 所有都是非数字，直接返回空
            sums[index] = "";
          }
        } else {
          // 除index为9和10的列，其余统计值都为空
          sums[index] = "";
        }
      });
      this.createReturnFrom.preturnAlltotal = sums[9];
      this.createReturnFrom.preturnAmount = sums[10];
      return sums;
    },
    // 创建采购退货单
    async createReturnOrder() {
      for (
        let i = this.createReturnFrom.pcommodityDos.length - 1;
        i >= 0;
        i--
      ) {
        if (isNaN(this.createReturnFrom.pcommodityDos[i].productThnumber)) {
          this.createReturnFrom.pcommodityDos.splice(i, 1);
        }
      }
      // 当没有商品被选中时，创建退货单应该失败
      if (this.createReturnFrom.pcommodityDos.length == 0) {
        this.$message({
          type: "info",
          message: "未添加任何退货商品，创建失败！"
        });
        this.createReturnVisible = false;
        this.createReturnFrom.pcommodityDos = [];
        this.createReturnFromGongyingshang = [];
        return;
      }
      // 换个名字
      this.createReturnFrom.returnListDos = this.createReturnFrom.pcommodityDos;
      delete this.createReturnFrom.pcommodityDos;
      delete this.createReturnFrom.supplierDO;
      const { data: res } = await this.$http.post(
        "/jh/preturn/createorder",
        this.createReturnFrom
      );
      //  console.log(res.body.re)
      if (res.body.respCode == 200) {
        this.$message({
          type: "success",
          message: "新增退货单成功！"
        });
      } else {
        this.$message({
          type: "info",
          message: "新增退货单失败！"
        });
      }
      this.createReturnVisible = false;
      this.createReturnFrom.pcommodityDos = [];
      this.createReturnFromGongyingshang = [];
      this.getList();
    },
    // 获取供应商 仓库
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
    // 计算数量以及总金额
    calculate(val) {
      // 例：addOrderForm.pcommodityDos
      // 计算总数量
      let quantity = 0;
      val.pcommodityDos.forEach((item, index, arr) => {
        if (!isNaN(Number(item.productThnumber))) {
          quantity += Number(item.productThnumber);
        }
      });
      val.preturnAlltotal = quantity;

      // 计算总价格
      let money = 0;
      val.pcommodityDos.forEach((item, index, arr) => {
        if (!isNaN(Number(item.productThnumber * item.pcommodityPrice))) {
          money += Number(item.productThnumber * item.pcommodityPrice);
        }
      });
      val.preturnAmount = money;
    },
    // 编辑订单计算
    calculateEdit(val) {
      let quantity = 0;
      val.returnListDos.forEach((item, index, arr) => {
        if (!isNaN(Number(item.productThnumber))) {
          quantity += Number(item.productThnumber);
        }
      });
      val.preturnAlltotal = quantity;

      // 计算总价格
      let money = 0;
      val.returnListDos.forEach((item, index, arr) => {
        if (!isNaN(Number(item.productThnumber * item.pcommodityPrice))) {
          money += Number(item.productThnumber * item.pcommodityPrice);
        }
      });
      val.preturnAmount = money;
    },
    //读取cookie
    getCookie: function() {
      // if (document.cookie.length > 0) {
      //   var arr = document.cookie.split("; "); //这里显示的格式需要切割一下自己可输出看下
      //   for (var i = 0; i < arr.length; i++) {
      //     var arr2 = arr[i].split("="); //再次切割
      //     //判断查找相对应的值
      //     if (arr2[0] == "userName") {
      //       //  console.log(arr2[1])
      //       this.editReturnFrom.preturnFushen = arr2[1]; //保存到保存数据的地方
      //     }
      //   }
      //   this.checked = true;
      // }
      var storage=window.localStorage;
      this.editReturnFrom.preturnFushen = storage.getItem("username")
    },
    dialogClosed(val) {
      this.editReturnFrom = {};
      this.$refs[val].resetFields();
    },
    // 深层拷贝
    chaCopy() {
      this.chaOrder.preturnCode = this.chaOrderFrom.preturnCode;
      this.chaOrder.preturnProducer = this.chaOrderFrom.preturnProducer;
      this.chaOrder.time = this.chaOrderFrom.time;
      this.chaOrder.preturnState = this.chaOrderFrom.preturnState;
      this.chaOrder.preturnSituation = this.chaOrderFrom.preturnSituation;
      this.chaOrder.pageCode = this.chaOrderFrom.pageCode;
      this.chaOrder.pageSize = this.chaOrderFrom.pageSize;
    },
    // 删除退货单中的不退货的商品
    deleteReturnGoods(supgoolsId) {
      for (
        let i = this.createReturnFrom.pcommodityDos.length - 1;
        i >= 0;
        i--
      ) {
        if (this.createReturnFrom.pcommodityDos[i].supgoolsId == supgoolsId) {
          this.createReturnFrom.pcommodityDos.splice(i, 1);
        }
      }
    },
    // 删除编辑退货单中的不退货的商品
    deleteEditReturnGoods(supgoolsId) {
      for (let i = this.editReturnFrom.returnListDos.length - 1; i >= 0; i--) {
        if (this.editReturnFrom.returnListDos[i].supgoolsId == supgoolsId) {
          this.editReturnFrom.returnListDos.splice(i, 1);
        }
      }
    },
    // 编辑退货单初始化
    async showEditOrder(preturnCode) {
      this.editReturnFromGongyingshang = [];
      const { data: res } = await this.$http.post("jh/preturn/dtjresultMap", {
        preturnCode: preturnCode
      });
      this.editReturnFrom = res.body.result[0];

      // 封装供应商
      let supplierId = this.editReturnFrom.supplierId;

      this.gongyinshang.forEach((item, index, arr) => {
        if (item.supplierId == supplierId) {
          this.editReturnFromGongyingshang.push(item);
        }
      });

      // 获取所有可以退货的商品
      const { data: res3 } = await this.$http.post("jh/purchase/dtjresultMap", {
        porderCode: this.editReturnFrom.porderCode
      });
      // 查看状态不用获取
      if (!this.lookUpState) {
        for (let x = 0; x < res3.body.result[0].pcommodityDos.length; x++) {
          for (let y = 0; y < this.editReturnFrom.returnListDos.length; y++) {
            // 排除已经添加了退货数量的商品
            if (
              res3.body.result[0].pcommodityDos[x].suppliergoolsId ==
              this.editReturnFrom.returnListDos[y].suppliergoolsId
            ) {
              break;
            }
            if (y == this.editReturnFrom.returnListDos.length - 1) {
              this.editReturnFrom.returnListDos.push(res3.body.result[0].pcommodityDos[x]);
              break;
            }
          }
        }
      }

      // 封装商品详情
      let val = this.editReturnFrom.returnListDos;
      let ids = [];
      for (let i = 0; i < val.length; i++) {
        ids.push(this.editReturnFrom.returnListDos[i].suppliergoolsId);
      }
      const { data: res2 } = await this.$http.post(
        "jc/suppliergoods/selectSuppliergoolslistmore",
        ids
      );
      for (let j = 0; j < val.length; j++) {
        for (let i = 0; i < res2.length; i++) {
          if (
            this.editReturnFrom.returnListDos[j].suppliergoolsId ==
            res2[i].suppliergoolsId
          ) {
            this.editReturnFrom.returnListDos[j].supgoolsBigType =
              res2[i].supgoolsBigType;
            this.editReturnFrom.returnListDos[j].supgoolssmallType =
              res2[i].supgoolssmallType;
            this.editReturnFrom.returnListDos[j].supgoolsId =
              res2[i].supgoolsId;
            this.editReturnFrom.returnListDos[j].supgoolsBrand =
              res2[i].supgoolsBrand;

            this.editReturnFrom.returnListDos[j].supgoolsSplicing =
              res2[i].supgoolsSplicing;
          }
        }
      }

      // 获取商品详情中的金额数量，从采购订单获取

      for (let a = 0; a < val.length; a++) {
        for (let b = 0; b < res3.body.result[0].pcommodityDos.length; b++) {
          if (
            this.editReturnFrom.returnListDos[a].suppliergoolsId ==
            res3.body.result[0].pcommodityDos[b].suppliergoolsId
          ) {
            this.editReturnFrom.returnListDos[a].pcommodityPalnnum =
              res3.body.result[0].pcommodityDos[b].pcommodityPalnnum;
            this.editReturnFrom.returnListDos[a].pcommodityPrice =
              res3.body.result[0].pcommodityDos[b].pcommodityPrice;
          }
        }
      }

      this.editReturnFrom.preturnOutwarehouse = Number(
        this.editReturnFrom.preturnOutwarehouse
      );

      this.editReturnFrom.preturnState = this.editReturnFrom.preturnState + '';
      // console.log(this.editReturnFrom);
      this.getCookie();
      this.editReturnVisible = true;
    },
    // 编辑订单保存
    async editReturnOrder() {
      for (let i = this.editReturnFrom.returnListDos.length - 1; i >= 0; i--) {
        if (isNaN(this.editReturnFrom.returnListDos[i].productThnumber)) {
          this.editReturnFrom.returnListDos.splice(i, 1);
        }
      }
      // 当没有商品被选中时，创建退货单应该失败
      if (this.editReturnFrom.returnListDos.length == 0) {
        this.$message({
          type: "info",
          message: "未添加任何退货商品，编辑失败！"
        });
        this.editReturnVisible = false;
        this.editReturnFrom = {};
        return;
      }
      delete this.editReturnFrom.preturnTime;

      // 根据审核结果修改订单状态
      if (this.radio != '' && this.radio == 0) {
        this.editReturnFrom.preturnState = 5;
      } else if (this.radio == 1) {
        this.editReturnFrom.preturnState = 4;
      } else {
        this.$message({
          type: "info",
          message: "未进行审核！"
        });
        this.editReturnVisible = false;
        this.editReturnFrom = {};
        this.radio = "";
        return;
      }

      const { data: res } = await this.$http.post(
        "/jh/preturn/examine",
        this.editReturnFrom
      );
      // 判断是否编辑成功！！！
      // console.log(res);
      if (res.body.respCode == 200) {
        this.$message({
          type: "success",
          message: "审核成功！"
        });
        this.getList();
      } else {
        this.$message({
          type: "info",
          message: "审核失败！"
        });
      }

      this.editReturnVisible = false;
      this.editReturnFrom = {};
      this.radio = "";
    },
    // 删除退货单
    async deletebReturnOrder(preturnCode) {
      this.$confirm("此操作将删除订单, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          let param = new URLSearchParams();
          param.append("preturnCode", preturnCode);
          const { data: res } = await this.$http.post(
            "jh/preturn/deleteall",
            param
          );

          if (res.body.respCode == 200) {
            this.$message({
              type: "success",
              message: "删除成功!"
            });
            this.getList();
          } else {
            this.$message({
              type: "info",
              message: "删除失败!"
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
    // 批量提审
    async checkOrderList() {
      let flag = false;
      let preturnCodes = []; //存放所有要提审的订单号
      // 遍历，判断是否存在不能提审的订单，获取要提审的订单号
      this.selectedList.forEach((item, index, arr) => {
        preturnCodes.push(item.preturnCode);
        if (item.preturnState != 0) {
          this.$message({
            type: "info",
            message: "存在非初始化状态订单，请重新选择！"
          });
          flag = true;
          return;
        }
      });

      if (flag) {
        return;
      }
      const { data: res } = await this.$http.post(
        "/jh/preturn/tishen",
        preturnCodes
      );

      if (res.body.respCode == 200) {
        this.$message({
          type: "success",
          message: "批量提审成功！"
        });
        this.getList();
        this.selectedList = [];
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
      let preturnCodes = []; //存放所有要提审的订单号
      // 遍历，判断是否存在不能提审的订单，获取要提审的订单号
      this.selectedList.forEach((item, index, arr) => {
        preturnCodes.push(item.preturnCode);
        if (item.preturnState != 5) {
          this.$message({
            type: "info",
            message: "存在非退货中状态订单，请重新选择！"
          });
          flag = true;
          return;
        }
      });

      if (flag) {
        return;
      }

      const { data: res } = await this.$http.post(
        "/jh/preturn/zhongzhi",
        preturnCodes
      );

      if (res.body.respCode == 200) {
        this.$message({
          type: "success",
          message: "批量终止成功！"
        });
        this.getList();
        this.selectedList = [];
      } else {
        this.$message({
          type: "danger",
          message: "批量终止失败！"
        });
      }
    },
    // 清空审核信息
    ClearChedkMsg() {
      this.radio = "";
    }
  },
  watch: {
    goodsList: function(val) {
      // console.log(val);
      // this.goodsList.forEach(function (val) {
      //     this.allCount+=parseInt(val.thsl)
      //     console.log(val)
      // })
    },
    allMoney: function() {
      var allCount = 0;
      this.goodsList.forEach(function(val) {
        allCount += val.jine;
      });
    }
  }
};
</script>

<style scoped>
.hu {
  width: 150px;
}
</style>
