<template>
  <div class="min1500">
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>进货管理</el-breadcrumb-item>
      <el-breadcrumb-item>新增退货单</el-breadcrumb-item>
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
              <el-select v-model="chaOrderFrom.porderArrivalstatus" placeholder="请选择" class="_small">
                <el-option value="3" label="全部"></el-option>
                <el-option value="1" label="部分到货"></el-option>
                <el-option value="2" label="全部到货"></el-option>
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
              <router-link to="cancel" tag="el-button">返回</router-link>
              <!-- <el-button type="primary" @click="createReturnVisible = true">重 置</el-button> -->
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <!-- addOrderVisible = true;editOrde  = false;addOrEdit = 1; -->
      <!-- <el-button type="success" @click="addPurchareOrder()">新 增</el-button> -->
      <!-- <el-button type="primary" @click="checkOrderList()" :disabled="orderListCheckOrders.length == 0">提 审</el-button> -->
      <!-- <el-button @click="stopOrderList()" type="danger" :disabled="orderListCheckOrders.length == 0">终 止</el-button> -->
      <!-- <el-button type="danger" @click="stopOrderList()">终 止</el-button>   -->
      <!-- <el-button @click="edit" :disabled="selectedList.length == 0">编辑</el-button>
            <el-button @click="del" :disabled="selectedList.length == 0">删除</el-button>
      <el-button @click="check">提审</el-button>-->
      <!-- <el-button @click="stop">终止采购</el-button> -->
      <el-table border :data="orderList" @selection-change="handleSelectionChange2">
        <!-- <el-table-column type="selection" width="50px"></el-table-column> -->
        <el-table-column type="index" label="序号" align="center" width="50px"></el-table-column>
        <el-table-column prop="porderCode" label="订单编号" width="180px" align="center"></el-table-column>
        <!-- <el-table-column prop="supplierDOs.supName" label="供应商" :show-overflow-tooltip="true"></el-table-column> -->
        <el-table-column prop="porderPalnmoney" label="预付款金额" width="100px"></el-table-column>
        <el-table-column prop="porderTotalmoney" label="总金额"></el-table-column>
        <el-table-column prop="porderTotalnum" label="总数量"></el-table-column>
        <el-table-column prop="porderArrivalnumber" label="到货数量"></el-table-column>
        <el-table-column prop="porderDiffernumber" label="差异数量"></el-table-column>
        <el-table-column prop="supplierDO.supName" label="供应商" width="220px" align="center"></el-table-column>
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
        <el-table-column label="操作" align="center" fixed="right">
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="mini"
              :disabled="!(scope.row.porderState==5||scope.row.porderState==8)"
              @click="returnOrder(scope.row.porderCode,scope.row.supplierId)"
            >退货</el-button>
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
      title="生成退货单"
      :visible.sync="createReturnVisible"
      width="60%"
      :before-close="handleClose"
      @closed="dialogClosed('createReturnFrom')"
    >
      <el-form
        label-position="right"
        label-width="100px"
        :inline="true"
        class="demo-form-inline search"
        :model="createReturnFrom"
        ref="createReturnFrom"
      >
      <div class="fenge">退货商品信息</div>
        <el-table :data="createReturnFrom.pcommodityDos" style="width: 100%">
          <el-table-column prop="supgoolssmallType" label="商品小类型"></el-table-column>
          <el-table-column prop="supgoolsId" label="商品名称"></el-table-column>
          <el-table-column prop="supgoolsSplicing" label="商品描述" width="200px" align="center"></el-table-column>
          <el-table-column prop="pcommodityPrice" label="单价"></el-table-column>
          <el-table-column prop="pcommodityPalnnum" label="数量"></el-table-column>
          <el-table-column prop="xxx" label="金额">
            <template slot-scope="scope">{{multiple(scope.row.pcommodityPrice , scope.row.pcommodityPalnnum)}}</template>
          </el-table-column>
          <el-table-column prop="productDhnumber" label="已到货数量"></el-table-column>
          <el-table-column prop="productThnumber" label="退货数量">
            <template slot-scope="scope">
              <el-input
                v-model="scope.row.productThnumber"
                @blur="calculate(createReturnFrom)"
                type="number"
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
                @click="deleteReturnGoods(scope.row.supgoolsId)"
              >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <br />
        <el-form-item label="退货总数量：" prop="preturnAlltotal">
          <el-input class="hu" v-model="createReturnFrom.preturnAlltotal" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="退货总金额：" prop="preturnAmount">
          <el-input class="hu" v-model="createReturnFrom.preturnAmount" :disabled="true"></el-input>
        </el-form-item>
        <div class="fenge1">供应商信息</div>

        <el-table :data="createReturnFromGongyingshang" style="width: 100%">
          <el-table-column prop="supName" label="供应商名称"></el-table-column>
          <el-table-column prop="supId" label="供应商编码"></el-table-column>
          <el-table-column prop="supType" label="供应商类型"></el-table-column>
          <el-table-column prop="supContacts" label="联系人"></el-table-column>
          <el-table-column prop="supPhone" label="手机"></el-table-column>
        </el-table>

        <div class="fenge1">退货描述</div>

        <!-- <el-form-item label="出库仓库" prop="preturnOutwarehouse">
          <el-select
            v-model="createReturnFrom.preturnOutwarehouse"
            placeholder="请选择"
            class="_small"
          >
            <el-option
              v-for="item in cangku"
              :key="item.basicId"
              :label="item.basicRetainone"
              :value="item.basicId"
            ></el-option>
          </el-select>
        </el-form-item>-->
        <el-form-item label="制单人员：" prop="preturnProducer">
          <el-input class="hu" v-model="createReturnFrom.preturnProducer" :disabled="true"></el-input>
        </el-form-item>
        <br />
        <el-form-item label="备注：" prop="preturnDesc">
          <el-input type="textarea" v-model="createReturnFrom.preturnDesc" style="width: 600px"></el-input>
        </el-form-item>

        <div class="fenge1">退货地址</div>

        <el-form-item label="收货人：" prop="preturnAddressee">
          <el-input class="hu" v-model="createReturnFrom.preturnAddressee"></el-input>
        </el-form-item>
        <el-form-item label="手机：" prop="preturnTel">
          <el-input class="hu" v-model="createReturnFrom.preturnTel"></el-input>
        </el-form-item>
        <br />
        <el-form-item label="收货地址：" prop="preturnAddress">
          <el-input type="textarea" v-model="createReturnFrom.preturnAddress" style="width: 600px"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="createReturnVisible = false;createReturnFromGongyingshang = []">取 消</el-button>
        <el-button type="primary" @click="createReturnOrder()">保 存</el-button>
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
        porderBuyer: ""
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
        supgoolsSplicing: "" //商品描述
      },
      lookUpState: false,
      chaOrderFrom: {
        porderCode: "", //订单编号
        porderProducer: "", //制单人员
        time: [], //制单时间范围
        porderArrivalstatus: "3", //到货情况
        porderState: "", //订单状态
        pageCode: 1, //当前页
        pageSize: 10 //每页显示的记录数
      },
      // 实际查询参数
      chaOrder: {
        porderCode: "", //订单编号
        porderProducer: "", //制单人员
        time: [], //制单时间范围
        porderArrivalstatus: "3", //到货情况
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
      editReturnFromGongyingshang: [], //编辑form供应商
      editReturnVisible: false, //编辑表单可见标识
      createReturnVisible: false,
      createReturnFromGongyingshang: []
    };
  },
  created() {
    // this.addOrderForm = this.addOrderForm;
    this.chaCopy();
    this.getList();
    this.getCha();
    this.getCookie();
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
      //       this.createReturnFrom.preturnProducer = arr2[1]; //保存到保存数据的地方
      //     }
      //   }
      //   this.checked = true;
      // }
      var storage = window.localStorage;
      this.createReturnFrom.preturnProducer = storage.getItem("username");
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
      console.log("供应商---");
      console.log(this.gongyinshang);
      this.cangku = res1;
      console.log("仓库");
      console.log(this.cangku);
    },

    handleSelectionChange(val) {
      this.chooseGoodsForm.goodsChoosed = val;
      // this.selectedList = val;
      console.log(val);
    },
    // orderList 批量提审
    handleSelectionChange2(val) {
      this.orderListCheckOrders = val;
      console.log(this.orderListCheckOrders);
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
    async getList(val) {
      // const { data: res1 } = await this.$http.post("jh/purchase/dtjresultMap");
      // this.chaOrderFrom.pageCode = 1;
      if (val) {
        // 重新点击时，需要重置查询页数
        this.chaOrderFrom.pageCode = 1;
        this.chaCopy();
        console.log(1111);
      }
      const { data: res } = await this.$http.post(
        "jh/purchase/thselect",
        this.chaOrder
      );

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
      console.log(`每页 ${val} 条`);
      this.getList();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
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
      console.log(this.addSelectedList);
    },
    addSelectionChange_two(val) {
      this.addSelectedList_two = val;
      console.log(val);
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
        this.addOrderVisible = false;
        this.getList();
        this.addOrderForm.pcommodityDos = [];
        this.delarr = [];
      });
    },
    async showEditOrder(porderCode) {
      // let param = new URLSearchParams();
      // param.append("porderCode", porderCode);
      console.log(porderCode);
      this.editOrderForm.porderCode = porderCode;

      const { data: res } = await this.$http.post("jh/purchase/dtjresultMap", {
        porderCode: porderCode
      });
      // console.log(res);

      for (let i = 0; i < res.body.result[0].pcommodityDos.length; i++) {
        this.delarr.push(res.body.result[0].pcommodityDos[i].suppliergoolsId);
      }

      console.log("--------------------");
      console.log(this.delarr);

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
      console.log(res.body.result[0].pcommodityDos);
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
      this.editOrderVisible = false;
      this.getList();
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
          console.log(res);

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
      console.log(res);
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
      let length;
      if (this.chooseGoodsForm.addOrEdit == 1) {
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
      console.log("供应商变化");
      console.log(val);

      this.gongyingshangOfForm = [];
      this.gongyinshang.forEach((item, index, arr) => {
        if (item.supplierId == val) {
          this.gongyingshangOfForm.push(item);
        }
      });
      console.log(this.gongyingshangOfForm);
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
          quantity += Number(item.pcommodityPalnnum);
        }
        //  else {
        // 如果该行数量不是数字，置空
        //   item.pcommodityPalnnum = '';
        // }
      });
      val.porderTotalnum = quantity;

      // 计算总价格
      let money = 0;
      val.pcommodityDos.forEach((item, index, arr) => {
        if (!isNaN(item.pcommodityPalnnum * item.pcommodityPrice)) {
          money += Number(item.pcommodityPalnnum * item.pcommodityPrice);
        }
      });
      val.porderTotalmoney = money;
    },
    // 新增采购订单
    addPurchareOrder() {
      this.addOrderForm.pcommodityDos = [];
      this.gongyingshangOfForm = [];
      this.editOrde = false;
      this.addOrEdit = 1;
      this.addOrderVisible = true;
    },
    // 生成退货单
    async returnOrder(porderCode, supplierId) {
      this.createReturnFromGongyingshang = [];
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
      console.log("供应商");
      console.log(this.gongyinshang);

      this.gongyinshang.forEach((item, index, arr) => {
        if (item.supplierId == res.body.result[0].supplierId) {
          this.createReturnFromGongyingshang.push(item);
          console.log("++++++++++++++++++++++++");
        }
      });

      console.log("---------------------");
      console.log(this.createReturnFromGongyingshang);

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

       //获取已入库数量
      const { data: res3 } = await this.$http.post(
        "kc/inbound/selectallgools",
        {
          porderCode: porderCode,
          suppliergoolsId: ids
        }
      );
      console.log("res3 已入库数量")
      console.log(res3)
      this.createReturnFrom.pcommodityDos.forEach((purGood, index, arr) => {
        // 默认值
        purGood.productDhnumber = 0,
        res3.forEach((item, index, arr) => {
          if (purGood.suppliergoolsId == item.suppliergoolsId) {
            // 已到货数量
            purGood.productDhnumber = item.supinboundsum;
          }
        });
      });

      console.log("到货数量")
      console.log( this.createReturnFrom.pcommodityDos)

      this.createReturnVisible = true;
    },
    // 计算数量以及总金额
    calculate(val) {
      // 例：addOrderForm.pcommodityDos
      // 计算总数量
      let quantity = 0;
      val.pcommodityDos.forEach((item, index, arr) => {
        if (!isNaN(Number(item.productThnumber))) {
          quantity = this.add(Number(item.productThnumber),quantity);
        }
      });
      val.preturnAlltotal = quantity.toFixed(2);

      // 计算总价格
      let money = 0;
      val.pcommodityDos.forEach((item, index, arr) => {
        if (!isNaN(this.multiple(item.productThnumber,item.pcommodityPrice))) {
          money = this.add(this.multiple(item.productThnumber,item.pcommodityPrice),money);
        }
      });
      val.preturnAmount = money;
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
      this.calculate(this.createReturnFrom)
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
      //   this.getPurchaseList()
      this.getList();
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
position: absolute;
top: 34px;
left: 0px;
height: 25px;
width:98.5%;
line-height: 25px;
padding-left:15px ;
background-color: red;
}
.fenge1{
height: 25px;
width: 98.5%;
line-height: 25px;
padding-left: 15px ;
background-color: red;
margin-bottom: 20px;
}
</style>
