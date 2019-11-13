<template>
  <div class="min1500">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>进货管理</el-breadcrumb-item>
      <el-breadcrumb-item>采购退货单</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-form
        :inline="true"
        class="demo-form-inline search"
        :model="chaOrderFrom"
        ref="chaOrderFrom"
      >
        <el-row :gutter="20" class="row">
          <el-col :span="24">
            <el-form-item label="退货单号" prop="preturnCode">
              <el-input class="hu" v-model="chaOrderFrom.preturnCode"></el-input>
            </el-form-item>
            <el-form-item label="制单人" prop="preturnProducer">
              <el-input class="hu" v-model="chaOrderFrom.preturnProducer"></el-input>
            </el-form-item>
            <el-form-item label="供应商" prop="supplierId">
              <el-select v-model="chaOrderFrom.supplierId" placeholder="请选择" class="hu">
                <el-option value="0" label="原材料供应商"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="审核状态" prop="preturnState">
              <el-select v-model="chaOrderFrom.preturnState" placeholder="请选择" class="hu">
                <el-option value="" label="全部"></el-option>
                <el-option value="1" label="初始化"></el-option>
                <el-option value="2" label="待采购审核"></el-option>
                <el-option value="3" label="待财务审核"></el-option>
                <el-option value="4" label="初审未通过"></el-option>
                <el-option value="5" label="复审未通过"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="退货状态" prop="preturnSituation">
              <el-select v-model="chaOrderFrom.preturnSituation" placeholder="请选择" class="hu">
                <el-option value="" label="全部"></el-option>
                <el-option value="1" label="待退货"></el-option>
                <el-option value="2" label="退货中"></el-option>
                <el-option value="3" label="部分退货"></el-option>
                <el-option value="4" label="全部退货"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button @click="getList">查询</el-button>
              <el-button type="primary" @click="ResetForm('chaOrderFrom')">重置</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-row>
        <el-button @click="changeAddVisible()" type="primary">新增</el-button>
        <!-- <el-button @click="returnOrder('10101010101','2020202020202')" type="primary">退货</el-button> -->
      </el-row>
      <el-table border :data="orderList" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="preturnCode" label="退货单号">
           <!-- <template slot-scope="scope">
          <el-input v-model="scope.row.preturnCode"></el-input>
           </template> -->
        </el-table-column>
        <el-table-column prop="supplierId" label="供应商"></el-table-column>
        <el-table-column prop="preturnAmount" label="退款总金额"></el-table-column>
        <el-table-column prop="preturnAlltotal" label="退货总数量"></el-table-column>
        <el-table-column prop="preturnTotal" label="已退数量"></el-table-column>
        <el-table-column prop="preturnSituation" label="退货情况"></el-table-column>
        <el-table-column prop="preturnOutwarehouse" label="出库仓库"></el-table-column>
        <el-table-column prop="preturnProducer" label="制单人员"></el-table-column>
        <el-table-column prop="preturnState" label="审核状态">
          <template slot-scope="scope">
            <el-tag type="danger" v-if="scope.row.preturnState==0">初始化</el-tag>
            <el-tag type="danger" v-if="scope.row.preturnState==1">待采购审核</el-tag>
            <el-tag type="danger" v-if="scope.row.preturnState==2">待财务审核</el-tag>
            <el-tag type="danger" v-if="scope.row.preturnState==3">初审未通过</el-tag>
            <el-tag type="danger" v-if="scope.row.preturnState==4">复审未通过</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="preturnTime" label="制单时间"></el-table-column>
        <!-- <el-table-column prop="x" label="审核时间"></el-table-column> -->
        <el-table-column label="操作" style=" width='270px'">
          <template slot-scope="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              v-if="scope.row.porderState==0||scope.row.porderState==2||scope.row.porderState==4"
              @click="showEditOrder(scope.row.porderCode)"
            >编辑</el-button>
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              v-if="scope.row.porderState==0"
              @click="edit(scope.row.porderCode)"
            >提审</el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              v-if="scope.row.porderState==0||scope.row.porderState==2||scope.row.porderState==4"
              @click="deletebumen(scope.row.porderCode)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- :current-page.sync="currentPage" -->
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-sizes="[10]"
        :page-size="100"
        layout="total, sizes, prev, pager, next"
        :total="orderTotal"
      ></el-pagination>
    </el-card>
    <el-dialog
      :title="AddVisible?'新增退货单':'编辑退货单'"
      :visible.sync="AddVisible"
      width="60%"
      :before-close="handleCloseAdd"
      @closed="$refs.cancel_.resetFields()"
    >
      <!-- label-position="left"  -->
      <el-form :inline="true" :model="addQueryForm" label-width="100px" ref="addQueryForm">
        <el-row :gutter="20" class="row">
          <el-col :span="24">
            <el-form-item label="采购订单号" prop="porderCode">
              <el-input class="hu" v-model="addQueryForm.porderCode"></el-input>
            </el-form-item>
            <el-form-item label="入库仓库" prop="basicId">
              <el-select v-model="addQueryForm.basicId" placeholder="请选择" class="hu">
                <el-option value="0" label="原材料仓库"></el-option>
                <el-option value="1" label="半成品仓库"></el-option>
                <el-option value="2" label="成品仓库"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="订单状态" prop="porderState">
              <el-select v-model="addQueryForm.porderState" placeholder="请选择" class="hu">
                <el-option value="0" label="全部"></el-option>
                <el-option value="1" label="部分入库"></el-option>
                <el-option value="2" label="已完成"></el-option>
                <el-option value="3" label="退货中"></el-option>
                <el-option value="4" label="退货完成"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="到货情况" prop="porderArrivalstatus">
              <el-select v-model="addQueryForm.porderArrivalstatus" placeholder="请选择" class="hu">
                <el-option value="0" label="全部"></el-option>
                <el-option value="1" label="部分到货"></el-option>
                <el-option value="2" label="全部到货"></el-option>
              </el-select>
            </el-form-item>
            <br />
            <el-form-item prop="name">
              <el-input
                placeholder="请输入人员"
                v-model="addQueryForm.name"
                class="input-with-select"
                style="width: 250px"
              >
                <el-select
                  v-model="addQueryForm.personType"
                  slot="prepend"
                  placeholder="请选择"
                  style="width: 110px"
                >
                  <el-option value="0" label="制单人员"></el-option>
                  <el-option value="1" label="审核人员"></el-option>
                </el-select>
              </el-input>
            </el-form-item>
            <el-form-item prop="time">
              <el-select v-model="addQueryForm.timeType" placeholder="请选择" class="hu">
                <el-option value="0" label="创建时间"></el-option>
                <el-option value="1" label="审核时间"></el-option>
              </el-select>
              <el-date-picker
                v-model="addQueryForm.time"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                value-format="“yyyy-MM-dd”"
              ></el-date-picker>
            </el-form-item>

            <el-form-item>
              <el-button @click="getPurchaseList">查询</el-button>
              <el-button type="primary" @click="ResetForm('addQueryForm')">重置</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <!-- <el-row>
        <el-button :disabled="GoodsSelectedList.length==0" type="danger">删除</el-button>
      </el-row>-->
      <el-table border :data="purchaseOrderList">
        <el-table-column prop="porderCode" label="订单编号"></el-table-column>
        <el-table-column prop="supplierId" label="供应商"></el-table-column>
        <el-table-column prop="porderPalnmoney" label="预付款金额"></el-table-column>
        <el-table-column prop="porderTotalmoney" label="订单总金额"></el-table-column>
        <el-table-column prop="porderTotalnum" label="采购总数量"></el-table-column>
        <el-table-column prop="porderArrivalnumber" label="到货数量"></el-table-column>
        <el-table-column prop="porderDiffernumber" label="差异数量"></el-table-column>
        <el-table-column prop="basicId" label="入库仓库"></el-table-column>
        <el-table-column prop="porderArrivalstatus" label="到货情况"></el-table-column>
        <el-table-column prop="porderProducer" label="采购员"></el-table-column>
        <el-table-column prop="porderTime" label="制单时间"></el-table-column>
        <!-- 复审时间 -->
        <el-table-column prop="porderReviewedtime" label="审核时间"></el-table-column>
        <el-table-column prop="porderState" label="订单状态"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="mini"
              v-if="scope.row.porderState==5||scope.row.porderState==6||scope.row.porderState==7"
              @click="returnOrder(scope.row.porderCode,scope.row.supplierId)"
            >退货</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @current-change="handleCurrentChange2"
        :current-page.sync="currentPage"
        :page-sizes="[10]"
        :page-size="100"
        layout="total, sizes, prev, pager, next"
        :total="addOrderTotal"
      ></el-pagination>
      <span slot="footer" class="dialog-footer">
        <el-row>
          <el-col :span="7" style="float: right">
            <el-button @click="Save" type="primary">保存</el-button>
            <el-button @click="cancelAddVisible()">取消</el-button>
          </el-col>
        </el-row>
      </span>
    </el-dialog>
    <el-dialog
      title="生成退货单"
      :visible.sync="createReturnVisible"
      width="60%"
      :before-close="handleClose"
    >
      <el-form
        label-position="right"
        label-width="100px"
        :inline="true"
        class="demo-form-inline search"
        :model="createReturnFrom"
        ref="createReturnFrom"
      >
        <el-form-item label="采购订单号" prop="porderCode">
          <el-input class="hu" v-model="createReturnFrom.porderCode" :disabled="true"></el-input>
        </el-form-item>

        <el-form-item label="供应商" prop="supplierId">
          <el-input class="hu" v-model="createReturnFrom.supplierId" :disabled="true"></el-input>
        </el-form-item>

        <el-form-item label="制单人员" prop="preturnProducer">
          <el-input class="hu" v-model="createReturnFrom.preturnProducer" :disabled="true"></el-input>
        </el-form-item>
        <br />
        <el-form-item label="出库仓库" prop="preturnOutwarehouse">
          <el-input class="hu" v-model="createReturnFrom.preturnOutwarehouse"></el-input>
        </el-form-item>

        <el-form-item label="收货人" prop="preturnAddressee">
          <el-input v-model="createReturnFrom.preturnAddressee" class="hu"></el-input>
        </el-form-item>

        <el-form-item label="电话" prop="preturnTel">
          <el-input v-model="createReturnFrom.preturnTel" class="hu"></el-input>
        </el-form-item>

        <br />

        <el-form-item label="退货地址" prop="preturnAddress">
          <el-input type="textarea" v-model="createReturnFrom.preturnAddress"></el-input>
        </el-form-item>

        <el-form-item label="退货描述" prop="preturnDesc">
          <el-input type="textarea" v-model="createReturnFrom.preturnDesc"></el-input>
        </el-form-item>
      </el-form>
      <el-table
        :data="createReturnFrom.pcommodityDos"
        style="width: 100%"
        :summary-method="getSummaries"
        show-summary
      >
        <el-table-column prop="supgoolsBigType" label="商品名称"></el-table-column>
        <el-table-column prop="supgoolsId" label="商品编码"></el-table-column>
        <el-table-column prop="supgoolsBrand" label="品牌"></el-table-column>
        <el-table-column prop="supgoolsWeight" label="克重"></el-table-column>
        <el-table-column prop="supgoolsWidths" label="门幅"></el-table-column>
        <el-table-column prop="supgoolCoated" label="淋膜类型"></el-table-column>
        <el-table-column prop="pcommodityPrice" label="采购价（元）" style="width:300px"></el-table-column>
        <el-table-column prop="pcommodityPalnnum" label="采购数量"></el-table-column>
        <el-table-column prop label="到货数量"></el-table-column>
        <el-table-column prop="productThnumber" label="退货数量" align="center">
          <template slot-scope="scope">
            <el-input v-model="scope.row.productThnumber"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="productCount" label="金额" align="center">
          <template slot-scope="scope">
            <el-input v-model="scope.row.productCount"></el-input>
          </template>
        </el-table-column>
        
        <el-table-column prop="returnReason" label="退货原因">
          <template slot-scope="scope">
            <el-input v-model="scope.row.returnReason"></el-input>
          </template>
        </el-table-column>
      </el-table>
      <!-- <el-row style="margin: 20px 0 40px">
        <el-col :span="12" style="float: right">
          <el-row>
            <el-col :span="10" v-model="createReturnFrom.preturnTotalQuantity">退货总数量:{{allCount()}}</el-col>
            <el-col :span="10" v-model="createReturnFrom.preturnTotalAmount">退货总金额:{{allMoney()}}</el-col>
          </el-row>
        </el-col>
      </el-row> -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="createReturnVisible = false">取 消</el-button>
        <el-button type="primary" @click="createReturnOrder()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      search: {
        thdh: "",
        gystype: "原材料供应商",
        gys: "",
        zdry: ""
      },
      state: [
        { Id: 1, Name: "全部" },
        { Id: 2, Name: "初始化" },
        { Id: 3, Name: "待采购审核" },
        { Id: 4, Name: "待财务审核" },
        { Id: 5, Name: "审核不通过" },
        { Id: 6, Name: "待退货" },
        { Id: 7, Name: "已退货" },
        { Id: 8, Name: "终止" }
      ],
      gystype: [{ Id: 1, Name: "原材料供应商" }],
      AddVisible: false,
      selectedList: [],
      orderList: [],
      GoodsSelectedList: [],
      cancel_: {
        gys: "",
        ckck: "",
        zdsj: "2015-9-9",
        zdry: "人员"
      },
      cancel_gys: [{ Id: 1, Name: "A供应商" }, { Id: 2, Name: "B料供应商" }],
      cancel_ckck: [{ Id: 1, Name: "A仓库" }, { Id: 2, Name: "B仓库" }],
      goodsList: [
        {
          jine: 0,
          thsl: 0
        }
      ],
      chaOrderFrom: {
        preturnCode: "", //退货单号
        preturnProducer: "", //制单人
        supplierId: "", //供应商id
        preturnState: "", //审核状态
        preturnSituation: "", //退货状态
        pageCode: 1,
        pageSize: 10
      },
      orderTotal: 0, // 查询结果总数量
      addQueryForm: {
        porderCode: "", //采购订单号
        basicId: "", //入库仓库
        porderState: "", //订单状态
        personType: "", //人员类型
        name: "", //人员名称
        timeType: "", //时间类型
        time: [], //时间
        porderArrivalstatus: "", //到货情况
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
        preturnTotalQuantity: "", //退货总数量
        preturnTotalAmount: "" //退货总金额
      }
    };
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
    allMoney: function() {
      var count = 0;
      this.goodsList.forEach(function(val) {
        count += parseInt(val.jine);
      });
      return count;
    },
    Save() {},
    //表单重置
    ResetForm(formName) {
      this.$refs[formName].resetFields();
    },
    async getList() {
      const { data: res } = await this.$http.post(
        "jh/preturn/selectPreturn",
        this.chaOrderFrom
      );
      this.orderList = res.body.rows;
      this.orderTotal = res.body.total;
    },
    // 查询采购订单list
    async getPurchaseList() {
      this.purchaseOrderList = [];

      const { data: res } = await this.$http.post(
        "jh/purchase/selectpurc2",
        this.addQueryForm
      );
      this.purchaseOrderList = res.body.rows;
      this.addOrderTotal = res.body.total;
    },
    handleCurrentChange(val) {
      this.chaOrderFrom.pageCode = val;
      this.getList();
    },
    handleCurrentChange2(val) {
      this.addQueryForm.pageCode = val;
      this.getPurchaseList();
    },
    // 生成退货单取消按钮
    cancelAddVisible() {
      this.AddVisible = false;
      this.ResetForm("addQueryForm");
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
      console.log(res[0]);
      // 一个销售订单下的所有商品信息
      let val = res[0].pcommodityDos;
      // 一个销售订单下的所有商品
      let ids = [];
      for (let i = 0; i < val.length; i++) {
        ids.push(val[i].suppliergoolsId);
      }
      console.log(ids);

      // 用数组做参数查询所有规格
      // jc/suppliergoods/selectSuppliergoolslistmore
      const { data: res2 } = await this.$http.post(
        "jc/suppliergoods/selectSuppliergoolslistmore",
        ids
      );

      console.log(res2);

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
            this.createReturnFrom.pcommodityDos[j].supgoolsBigType = res2[i].supgoolsBigType;
            this.createReturnFrom.pcommodityDos[j].supgoolsId = res2[i].supgoolsId;
            this.createReturnFrom.pcommodityDos[j].supgoolsBrand = res2[i].supgoolsBrand;

            this.createReturnFrom.pcommodityDos[j].supgoolsWeight = res2[i].supgoolsWeight;
            this.createReturnFrom.pcommodityDos[j].supgoolsWidths = res2[i].supgoolsWidths;
            this.createReturnFrom.pcommodityDos[j].supgoolCoated = res2[i].supgoolCoated;


            // this.createReturnFrom.pcommodityDos[j].productThnumber = 0;
            // this.createReturnFrom.pcommodityDos[j].productCount = 0;
            // this.createReturnFrom.pcommodityDos[j].returnReason = "";

            // this.createReturnFrom.pcommodityDos[j].detailOfReturn.productThnumber =
            // this.createReturnFrom.pcommodityDos[j].detailOfReturn.productCount
            

          }
        }
      }

      console.log(this.createReturnFrom.pcommodityDos);

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
            sums[index] = '统计';
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
            sums[index] = '';
          }
          }else{
            // 除index为9和10的列，其余统计值都为空
            sums[index] = ''
          }
          
        });
        this.createReturnFrom.preturnTotalQuantity = sums[9];
        this.createReturnFrom.preturnTotalAmount = sums[10];
        return sums;
      },
      // 创建采购退货单
      async createReturnOrder(){
        await this.$http.post("/jh/preturn/createorder", 
          this.createReturnFrom
      );
        this.createReturnVisible = false
      }

  },
  watch: {
    goodsList: function(val) {
      console.log(val);
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
  },
  created() {
    this.getList();
  }
};
</script>

<style scoped>
.hu {
  width: 133px;
}
</style>
