<template>
  <div class="min1500">
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>进货管理</el-breadcrumb-item>
      <el-breadcrumb-item>采购订单-复审</el-breadcrumb-item>
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
            
            <!-- <el-form-item label="到货情况" prop="porderArrivalstatus">
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
            </el-form-item> -->
            <el-form-item label="订单状态：" prop="porderState">
              <el-select v-model="chaOrderFrom.porderState" placeholder="请选择" class="_small">
                <el-option value="11" label="全部"></el-option>
                <!-- 待复审 -->
                <el-option value="3" label="待审核"></el-option>
                <!-- 复审未通过 -->
                <el-option value="4" label="已驳回"></el-option>
                <!-- 采购中 -->
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
            <el-form-item>
              <el-button @click="getList(1)">查 询</el-button>
              <el-button type="primary" @click="ResetForm('chaOrderFrom')">重 置</el-button>
              <!-- <el-button type="primary" @click="lookUpState = true;checkOrderVisible = true">重 置</el-button> -->
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <!-- <el-button type="primary" @click="checkOrderVisible=true">审 核</el-button>  -->
      <!-- <el-button type="primary" @click="checkOrderVisible = true">审 核</el-button> -->
      <!-- <el-button type="primary" @click="prePayVisible=true">新增预付款单</el-button> -->
      <!-- <el-button type="success" @click="addOrderVisible = true;editOrde  = false">新增</el-button> -->
      <!-- <el-button @click="edit" :disabled="selectedList.length == 0">编辑</el-button>
      <el-button @click="del" :disabled="selectedList.length == 0">删除</el-button>
      <el-button @click="getList">提审</el-button>-->
      <!-- <el-button @click="stop">终止采购</el-button> -->
      <el-table border :data="orderList" @selection-change="handleSelectionChange">
        <el-table-column type="index" width="50px" label="序号" align="center"></el-table-column>
        <el-table-column prop="porderCode" label="订单编号" width="200px" align="center"></el-table-column>
        <el-table-column prop="porderPalnmoney" label="预付款金额"></el-table-column>
        <el-table-column prop="porderTotalmoney" label="总金额"></el-table-column>
        <el-table-column prop="porderTotalnum" label="总数量"></el-table-column>
        <el-table-column prop="supplierDO.supName" label="供应商" width="250px" align="center"></el-table-column>
        <el-table-column prop="porderProducer" label="制单人员"></el-table-column>
        <el-table-column prop="porderTime" label="制单时间" width="200" align="center"></el-table-column>
        <el-table-column prop="porderState" label="订单状态" width="105px" align="center">
          <template slot-scope="scope">
            <!-- <el-tag type="danger" v-if="scope.row.porderState==0">初始化</el-tag> -->
            <!-- <el-tag type="danger" v-if="scope.row.porderState==1">待初审</el-tag> -->
            <!-- <el-tag type="danger" v-if="scope.row.porderState==2">初审未通过</el-tag> -->
            <!-- 待复审 -->
            <el-tag type="danger" v-if="scope.row.porderState==3">待审核</el-tag>
            <!-- 复审未通过 -->
            <el-tag type="danger" v-if="scope.row.porderState==4">已驳回</el-tag>
            <!-- 采购中 -->
            <el-tag type="danger" v-if="scope.row.porderState==5">已通过</el-tag>
            <!-- <el-tag type="danger" v-if="scope.row.porderState==6">待入库</el-tag> -->
            <!-- <el-tag type="danger" v-if="scope.row.porderState==7">部分入库</el-tag> -->
            <!-- <el-tag type="danger" v-if="scope.row.porderState==8">已完成</el-tag> -->
            <!-- <el-tag type="danger" v-if="scope.row.porderState==9">终止</el-tag> -->
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180px" align="center" fixed="right">
          <template slot-scope="scope">
            <el-button
              type="success"
              size="mini"
              @click="lookUpState = true;checkOrder(scope.row.porderCode)"
            >查看</el-button>
            <el-button
              type="primary"
              size="mini"
              @click="lookUpState = false;checkOrder(scope.row.porderCode)"
              :disabled="scope.row.porderState!=3"
            >审核</el-button>
            <!-- <el-button type="danger" icon="el-icon-delete" size="mini" @click="deletebumen(scope.row.porderCode)">删除</el-button> -->
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="10"
        layout="total,  prev, pager, next"
        :total="total"
      ></el-pagination>
    </el-card>
    <el-dialog
      :title="lookUpState?'查看订单':'审核'"
      :visible.sync="checkOrderVisible"
      width="75%"
      :before-close="handleClose"
      @closed="dialogClosed"
    >
      <el-form
        :label-position="labelPosition"
        label-width="100px"
        :model="checkOrderForm"
        ref="checkOrderForm"
        :inline="true"
      >
      <div class="fenge">商品信息</div>
        <el-table
          border
          :data="checkOrderForm.pcommodityDos"
          @selection-change="addSelectionChange"
        >
          <!-- <el-table-column type="selection" width="40" align="center"></el-table-column> -->
          <el-table-column type="index" width="50px" align="center" label="序号"></el-table-column>
          <el-table-column prop="supgoolssmallType" label="商品名称"></el-table-column>
          <el-table-column prop="supgoolsId" label="商品编码"></el-table-column>
          <el-table-column prop="supgoolsSplicing" label="商品描述" width="270px" align="center"></el-table-column>
          <el-table-column label="单位">
            <template slot-scope="scope">
              <el-select v-model="scope.row.pcommodityUnit" placeholder="请选择" class="_small" :disabled="true">
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
              <el-select v-model="scope.row.basicId" placeholder="请选择" class="_small" :disabled="true">
                <el-option
                  v-for="item in warehouseOptions"
                  :key="item.basicId"
                  :label="item.basicRetainone"
                  :value="item.basicId"
                ></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column prop="pcommodityPrice" label="单价（元）"></el-table-column>
          <el-table-column prop="pcommodityPalnnum" label="数量"></el-table-column>
          <el-table-column label="金额">
             <template slot-scope="scope">
              <span
                v-if="(!isNaN(scope.row.pcommodityPrice))&&(!isNaN(scope.row.pcommodityPalnnum))"
              >{{multiple(scope.row.pcommodityPrice ,scope.row.pcommodityPalnnum).toFixed(2)}}</span>
            </template>
          </el-table-column>
        </el-table>

        <div class="fenge1">供应商信息</div>

        <el-table border :data="gongyingshangOfForm">
          <!-- <el-table-column type="selection" width="40" align="center"></el-table-column> -->
          <el-table-column prop="supName" label="供应商名称"></el-table-column>
          <el-table-column prop="supId" label="供应商编码"></el-table-column>
          <el-table-column prop="supType" label="供应商类型"></el-table-column>
          <el-table-column prop="supContacts" label="联系人"></el-table-column>
          <el-table-column prop="supPhone" label="手机"></el-table-column>
        </el-table>

        <div class="fenge1">退货描述</div>
        <el-form-item label="总数量：" prop="porderTotalnum">
          <el-input v-model="checkOrderForm.porderTotalnum" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="总金额：" prop="porderTotalmoney">
          <el-input v-model="checkOrderForm.porderTotalmoney" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="需预付金额：" prop="porderPalnmoney">
          <el-input v-model="checkOrderForm.porderPalnmoney" :disabled="true"></el-input>
        </el-form-item>

        <el-form-item label="预付说明：" prop="porderExplain">
          <el-input
            type="textarea"
            placeholder="请输入内容"
            v-model="checkOrderForm.porderExplain"
            style="width: 600px"
            :disabled="true"
          ></el-input>
        </el-form-item>

        <div class="fenge">采购描述</div>

        <el-form-item label="制单人员：" prop="porderProducer">
          <el-input v-model="checkOrderForm.porderProducer" :disabled="true" class="_small"></el-input>
        </el-form-item>

        <el-form-item label="采购人员：" prop="porderBuyer">
          <el-input v-model="checkOrderForm.porderBuyer" :disabled="true" class="_small"></el-input>
        </el-form-item>

        <!-- <el-form-item label="入库仓库" prop="basicId">
          <el-select
            v-model="checkOrderForm.basicId"
            placeholder="请选择"
            class="_small"
            :disabled="true"
          >
            <el-option
              v-for="item in cangku"
              :key="item.basicId"
              :label="item.basicRetainone"
              :value="item.basicId"
            ></el-option>
          </el-select>
        </el-form-item> -->

        <el-form-item label="下单时间：" prop="porderOrdertime">
          <el-date-picker
            v-model="checkOrderForm.porderOrdertime"
            type="date"
            value-format="yyyy-MM-dd"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :disabled="true"
          ></el-date-picker>
        </el-form-item>

        <el-form-item label="采购周期：" prop="time">
          <el-date-picker
            v-model="checkOrderForm.time"
            type="daterange"
            format="yyyy年MM月dd日"
            value-format="yyyy-MM-dd"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :disabled="true"
          ></el-date-picker>
        </el-form-item>

        <el-form-item label="备注：" prop="porderBuyexplain">
          <el-input
            type="textarea"
            placeholder="请输入内容"
            v-model="checkOrderForm.porderBuyexplain"
            style="width: 600px"
            :disabled="true"
          ></el-input>
        </el-form-item>

        <div class="fenge1">采购审核（初审）</div>

        <el-form-item label="审核人：" prop="porderReviewman">
          <el-input v-model="checkOrderForm.porderReviewman" :disabled="true"></el-input>
        </el-form-item>
        <!-- &nbsp;    &nbsp;    
        <el-form-item label="审核结果" prop="porderPalnmoney">
          <el-radio v-model="radio" label="0">通过</el-radio>
          <el-radio v-model="radio" label="1">驳回</el-radio>
        </el-form-item>-->
        <br />
        <el-form-item label="备注：" prop="porderReviewexplain">
          <el-input
            type="textarea"
            v-model="checkOrderForm.porderReviewexplain"
            style="width:600px"
            :disabled="true"
          ></el-input>
        </el-form-item>

        <div v-if="lookUpState && checkOrderForm.porderState != 3">

        <div class="fenge1">财务审核（复审）</div>

        <el-form-item label="审核人：" prop="porderReviewedman">
          <el-input v-model="checkOrderForm.porderReviewedman" :disabled="true"></el-input>
        </el-form-item>&nbsp;&nbsp;
        <el-form-item label="审核结果：">
          <el-radio v-model="checkOrderForm.porderState" label="5" :disabled="true">通过</el-radio>
          <el-radio v-model="checkOrderForm.porderState" label="4" :disabled="true">驳回</el-radio>
        </el-form-item>
        <br />
        <el-form-item label="备注：" prop="porderReviewedexplain">
          <el-input
            type="textarea"
            v-model="checkOrderForm.porderReviewedexplain"
            style="width:600px"
            :disabled="true"
          ></el-input>
        </el-form-item>
        </div>

        <div v-if="!lookUpState">

        <div class="fenge1">财务审核（复审）</div>

        <el-form-item label="审核人：" prop="porderReviewedman">
          <el-input v-model="checkOrderForm.porderReviewedman" :disabled="true"></el-input>
        </el-form-item>&nbsp;&nbsp;
        <el-form-item label="审核结果：">
          <el-radio v-model="radio" label="0">通过</el-radio>
          <el-radio v-model="radio" label="1">驳回</el-radio>
        </el-form-item>
        <br />
        <el-form-item label="备注：" prop="porderReviewedexplain">
          <el-input
            type="textarea"
            v-model="checkOrderForm.porderReviewedexplain"
            style="width:600px"
          ></el-input>
        </el-form-item>
        </div>
      </el-form>

      <!-- <hr v-if="!lookUpState"> -->
      <el-button type="primary" @click="addAdvancePaymentFormVisible=true;addAdvancePaymentForm.purchaseorderno = checkOrderForm.porderCode;addAdvancePaymentForm.payexamine = checkOrderForm.porderReviewedman;" v-if="!lookUpState">新增预付款单</el-button>
      <span slot="footer" class="dialog-footer">
        <el-button @click="checkOrderVisible=false">取 消</el-button>
        <el-button @click="editPurOrderState()" type="primary" v-if="!lookUpState">保 存</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="新增预付款单"
      :visible.sync="addAdvancePaymentFormVisible"
      width="42%"
      :before-close="handleClose"
    >
    <div class="fenge">付款信息</div>
      <el-form
        label-position="right"
        label-width="100px"
        :model="addAdvancePaymentForm"
        ref="addAdvancePaymentForm"
        :inline="true"
      >
        <el-form-item label="采购订单号：" prop="purchaseorderno">
          <el-input class="_small" v-model="addAdvancePaymentForm.purchaseorderno" :disabled="true"></el-input>
        </el-form-item>

        <el-form-item label="制单人：" prop="payexamine">
          <el-input class="_small" v-model="addAdvancePaymentForm.payexamine" :disabled="true"></el-input>
        </el-form-item>

        <el-form-item label="预付款金额：" prop="amount">
          <el-input class="_small" v-model="addAdvancePaymentForm.amount"></el-input>
        </el-form-item>

        <el-form-item label="资金账户：" prop="assetaccount">
          <el-select
                v-model="addAdvancePaymentForm.assetaccount"
                placeholder="请选择"
                class="_small"
                
              >
                <el-option
                  v-for="item in zijinCount"
                  :key="item.basicId"
                  :label="item.basicRetainone"
                  :value="item.basicId"
                ></el-option>
              </el-select>
          <!-- <el-select v-model="assetaccount" placeholder="请选择" class="_small">
            <el-option value label="全部"></el-option>
            <el-option value="0" label="未到货"></el-option>
            <el-option value="1" label="部分到货"></el-option>
            <el-option value="2" label="全部到货"></el-option>
          </el-select>-->
        </el-form-item>

        <el-form-item label="支出类型：" prop="raetypes">
          <el-select v-model="addAdvancePaymentForm.raetypes" placeholder="请选择" class="_small">
            <el-option
              v-for="item in paymode"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              :disabled="item.disabled"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="付款状态：" prop="paymentstatus">
          <el-select v-model="addAdvancePaymentForm.paymentstatus" placeholder="请选择" class="_small">
            <el-option value="0" label="未付款"></el-option>
            <el-option value="1" label="已付款"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="备注：" prop="remarks">
          <el-input
            type="textarea"
            placeholder="请输入内容"
            v-model="addAdvancePaymentForm.remarks"
            style="width: 600px"
          ></el-input>
        </el-form-item>
        <div class="fenge1">付款凭证</div>
        <el-form-item>
          <el-upload
                      ref="upload"
                      :action="ip"
                      name="picture"
                      list-type="picture-card"
                      :limit="1"
                      :on-exceed="onExceed"
                      :before-upload="beforeUpload"
                      :on-preview="handlePreview"
                      :on-success="handleSuccess"
                      :on-remove="handleRemove"
                      >
                <i class="el-icon-plus"></i>
            </el-upload>
          </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addAdvancePaymentFormVisible=false;dialogClosed2()">取消</el-button>
        <el-button @click="addAdvancePaymentFormVisible=false" type="primary">保存</el-button>
        <!-- <el-button @click="addAdvancePayment()" type="primary">保存</el-button> -->
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      ip:'',
      selectedList: [],
      currentPage: 0,
      editOrde: false,
      addOrderVisible: false,
      editOrderVisible: false,
      labelPosition: "right",
      total: 0,
      addOrderForm: {
        porderProducer: "",
        basicId: "",
        supplierId: "",
        time: "",
        suppliergoolsId: "",
        porderTotalnum: 0,
        porderTotalmoney: 0,
        porderBuyexplain: "",
        porderExplain: "",
        pcommodityDos: [],
        lab: "原纸",
        pageCode: 1, //当前页
        pageSize: 10 //每页显示的记录数
      },
      chaOrderFrom: {
        porderCode: "", //订单编号
        porderProducer: "", //制单人员
        time: [], //制单时间范围
        porderArrivalstatus: "", //到货情况
        porderState: "11", //订单状态
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
      addOrderRules: {
        Id: [],
        zdry: []
      },
      addSelectedList: [],
      addSelectedList_two: [],
      goods: [{}, {}],
      addOrder_addgoods: false,
      delarr: [],
      delarr1: [],
      shangpi: [],

      addOrderGoodsRules: {},
      goods_two: [],
      AddGoods: [],
      value1: "",
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
      // 审核dialog显示
      checkOrderVisible: false,
      // 审核订单表单
      checkOrderForm: {
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
        // porderBuyexplain:'',
        porderExplain: "",
        pcommodityDos: [],
        lab: "原纸",
        supplierId: 0,
        pageCode: 1, //当前页
        pageSize: 10, //每页显示的记录数
        porderBuyer: "",
        porderState: "", //订单状态
        porderOrdertime: "", //下单时间
        porderReviewman: "", //订单出身人
        porderReviewexplain: "", //订单初审备注
        porderReviewedman:"",//订单俯身人
        porderReviewedexplain:"",//订单复审备注
      },
      // 通过审核状态
      radio: "",
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
      cangku: [],
      lookUpState: false,
      gongyinshang: [],
      chaSupplierForm: {
        a: ""
      },

      // 新增预付款单相关
      addAdvancePaymentFormVisible: false,
      addAdvancePaymentForm: {
        payexamine: "", //付款制单人
        purchaseorderno: "", //采购订单号
        amount: "", //金额
        assetaccount: "", //资金账户
        raetypes: "", //收支类型
        paymentstatus: "", //应付款状态
        remarks: "", //备注
        voucher:'',//图片路径
      },
      paymode:[],//支出类型
      orderList:[],
      zijinCount:[],
    };
  },
  created() {
    this.chaCopy();
    this.getList();
    this.getCha();
    // this.getCookie();
    this.getWarehouseOptions();
    this.queryUnit();
    this.selectoutpaymode();
    this.selectZiJinCount();
  },
  methods: {
    //文件上传成功的钩子函数
        handleSuccess(res, file) {
            this.$message({
                type: 'info',
                message: '图片上传成功',
                duration: 6000
            });
            if (file.response.success) {
                // this.editor.picture = file.response.message; //将返回的文件储存路径赋值picture字段
                
                this.addAdvancePaymentForm.voucher=file.response.message;
                // this.editProductForm.voucher=file.response.message;

                // this.productList.picture=file.response.message;
                
            }
        },
        //删除文件之前的钩子函数
        handleRemove(file, fileList) {
            this.$message({
                type: 'info',
                message: '已删除原有图片',
                duration: 6000
            });
        },
        //点击列表中已上传的文件事的钩子函数
        handlePreview(file) {
          this.dialogImageUrl = file.url;
          this.dialogVisible = true;
        },
        //上传的文件个数超出设定时触发的函数
        onExceed(files, fileList) {
            this.$message({
                type: 'info',
                message: '最多只能上传一个图片',
                duration: 6000
            });
        },
        //文件上传前的前的钩子函数
        //参数是上传的文件，若返回false，或返回Primary且被reject，则停止上传
        beforeUpload(file) {
            const isJPG = file.type === 'image/jpeg';
            const isGIF = file.type === 'image/gif';
            const isPNG = file.type === 'image/png';
            const isBMP = file.type === 'image/bmp';
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPG && !isGIF && !isPNG && !isBMP) {
                this.$message.error('上传图片必须是JPG/GIF/PNG/BMP 格式!');
            }
            if (!isLt2M) {
                this.$message.error('上传图片大小不能超过 2MB!');
            }
            return (isJPG || isBMP || isGIF || isPNG) && isLt2M;
        },
    //读取cookie
    async selectZiJinCount(userInfo) {
      const { data: res } = await this.$http.post("jc/Basic/selectzijin", userInfo);

      this.zijinCount = res

      console.log("资金账户")
      console.log(res)
    },
    getCookie: function() {
      // if (document.cookie.length > 0) {
      //   var arr = document.cookie.split("; "); //这里显示的格式需要切割一下自己可输出看下
      //   for (var i = 0; i < arr.length; i++) {
      //     var arr2 = arr[i].split("="); //再次切割
      //     //判断查找相对应的值
      //     if (arr2[0] == "userName") {
      //       //  console.log(arr2[1])
      //       this.checkOrderForm.porderReviewedman = arr2[1]; //保存到保存数据的地方
      //     }
      //   }
      //   this.checked = true;
      // }
      var storage=window.localStorage;
      this.checkOrderForm.porderReviewedman = storage.getItem("username")
    },
    ResetForm(formName) {
      this.$refs[formName].resetFields();
      // this.getList();
    },
    handleSelectionChange(val) {
      this.selectedList = val;
    },
    async getList(val) {
      if (val) {
        // 重新点击时，需要重置查询页数
        this.chaOrderFrom.pageCode = 1;
        this.chaCopy();
      }
      // const { data: res1 } = await this.$http.post("jh/purchase/dtjresultMap");
      const { data: res } = await this.$http.post(
        "jh/purchase/selectpurc2",
        this.chaOrder
      );
      // console.log(res1);
      this.orderList = res.body.rows;
      this.total = res.body.total;
    },
    // 获取仓库列表
    async getWarehouseOptions() {
      this.ip=this.ips+'upload';
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
    handleSizeChange(val) {
      this.chaOrderFrom.pageSize = val;
      // console.log(`每页 ${val} 条`);
      this.getList();
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.chaOrder.pageCode = val;
      this.chaOrderFrom.pageCode = val;
      this.currentPage = val;
      this.getList();
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    dialogClosed() {
      this.$refs.checkOrderForm.resetFields();
      this.dialogClosed2()
    },
    dialogClosed2() {
      this.$refs['addAdvancePaymentForm'].resetFields();
      // 图片清空
      this.$refs.upload.clearFiles()
    },

    addSelectionChange(val) {
      this.addSelectedList = val;
      // console.log(val);
    },
    // 审核订单
    async checkOrder(porderCode) {
      // console.log(porderCode);
      this.checkOrderForm.porderCode = porderCode;

      const { data: res } = await this.$http.post("jh/purchase/dtjresultMap", {
        porderCode: porderCode
      });
      // console.log(res);

      for (let i = 0; i < res.body.result[0].pcommodityDos.length; i++) {
        this.delarr.push(res.body.result[0].pcommodityDos[i].suppliergoolsId);
      }

      const { data: res1 } = await this.$http.post(
        "/jc/suppliergoods/selectSuppliergoolslistmore",
        this.delarr
      );
      this.delarr = [];
      // console.log(res);

      for (let index = 0; index < res.body.result[0].pcommodityDos.length; index++) {
        for (let i = 0; i < res1.length; i++) {
          if (
            res.body.result[0].pcommodityDos[index].suppliergoolsId ==
            res1[i].suppliergoolsId
          ) {
            res.body.result[0].pcommodityDos[index].supgoolCoated = res1[i].supgoolCoated;
            res.body.result[0].pcommodityDos[index].supgoolsBradth = res1[i].supgoolsBradth;
            res.body.result[0].pcommodityDos[index].supgoolsBrand = res1[i].supgoolsBrand;
            res.body.result[0].pcommodityDos[index].supgoolsColor = res1[i].supgoolsColor;
            res.body.result[0].pcommodityDos[index].supgoolsHeight = res1[i].supgoolsHeight;
            res.body.result[0].pcommodityDos[index].supgoolsLength = res1[i].supgoolsLength;
            res.body.result[0].pcommodityDos[index].supgoolsWeight = res1[i].supgoolsWeight;
            res.body.result[0].pcommodityDos[index].supgoolsWidth1 = res1[i].supgoolsWidth1;
            res.body.result[0].pcommodityDos[index].supgoolsWidths = res1[i].supgoolsWidths;
            res.body.result[0].pcommodityDos[index].supName = res1[i].supName;
            res.body.result[0].pcommodityDos[index].porderBuyer = res1[i].porderBuyer;
            res.body.result[0].pcommodityDos[index].supgoolsBigType =
              res1[i].supgoolsBigType;
            res.body.result[0].pcommodityDos[index].supgoolssmallType =
              res1[i].supgoolssmallType;
            res.body.result[0].pcommodityDos[index].supgoolsId = res1[i].supgoolsId;
            res.body.result[0].pcommodityDos[index].supgoolsSplicing =
              res1[i].supgoolsSplicing;
          }
        }
      }
      // console.log(res[0].pcommodityDos);

      this.delarr1 = res.body.result[0].pcommodityDos;
      // this.addOrderForm.pcommodityDos=this.delarr1;
      //  = res[0].
      this.checkOrderForm.porderProducer = res.body.result[0].porderProducer;
      this.checkOrderForm.porderBuyexplain = res.body.result[0].porderBuyexplain;
      this.checkOrderForm.basicId = Number(res.body.result[0].basicId);
      // this.editOrderForm.supplierId = res[0].supplierId;
      // this.addOrderForm.suppliergoolsId = res[0].
      this.checkOrderForm.porderTotalnum = res.body.result[0].porderTotalnum;
      this.checkOrderForm.porderTotalmoney = res.body.result[0].porderTotalmoney;
      this.checkOrderForm.porderBuyexplain = res.body.result[0].porderBuyexplain;
      this.checkOrderForm.porderExplain = res.body.result[0].porderExplain;
      this.checkOrderForm.porderPalnmoney = res.body.result[0].porderPalnmoney;
      this.checkOrderForm.porderBuyer = res.body.result[0].porderBuyer;
      // this.addOrderForm.lab = res[0].
      this.checkOrderForm.pcommodityDos = res.body.result[0].pcommodityDos;
      this.checkOrderForm.pcommodityDos.forEach((item,index,array)=>{
        item.pcommodityUnit = Number(item.pcommodityUnit);
      })

      // 初审信息
      this.checkOrderForm.porderReviewman = res.body.result[0].porderReviewman;
      this.checkOrderForm.porderReviewexplain = res.body.result[0].porderReviewexplain;

      // 下单时间
      this.checkOrderForm.porderOrdertime = res.body.result[0].porderOrdertime;

      this.checkOrderForm.supplierId = Number(res.body.result[0].supplierId);

      let time = [res.body.result[0].porderStarttime, res.body.result[0].porderStoptime];
      this.checkOrderForm.time = time;

      this.checkOrderForm.porderReviewedman = res.body.result[0].porderReviewedman;
      this.checkOrderForm.porderReviewedexplain = res.body.result[0].porderReviewedexplain;
      this.checkOrderForm.porderState = res.body.result[0].porderState + '';

      this.gongyingshangOfForm = [];
      this.gongyinshang.forEach((item, index, arr) => {
        if (item.supplierId == this.checkOrderForm.supplierId) {
          this.gongyingshangOfForm.push(item);
        }
      });

      this.getCookie()

      this.checkOrderVisible = true;

      this.radio = "";
    },

    // 审核
    async editPurOrderState() {
      let purchase = this.checkOrderForm;
      if (this.radio != "" && this.radio == "0") {
        purchase.porderState = "5";
      } else if (this.radio == "1"){
        purchase.porderState = "4";
      } else{
        this.$message({
          type: "info",
          message: "未进行审核！"
        });
        this.checkOrderVisible = false;
        return;
      }

      const { data: res } = await this.$http.post(
        "/jh/purchase/examine",
        // "statusChangeList":statusChangeList
        purchase
      );
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
      this.addAdvancePayment();
      this.checkOrderVisible = false;
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

    multiple(arg1, arg2) {
      return (Math.round(arg1 * 100) * Math.round(arg2 * 100)) / 10000;
    },

    // 新增预付款单 应付款
    async addAdvancePayment() {
      const { data: res } = await this.$http.post(
          "/payment/addAdvancepayment",
          this.addAdvancePaymentForm
        );

        if(res.body.respCode == 200){
          this.$message({
            type: "success",
            message: res.body.msg
          });
        }else{
          this.$message({
            type: "info",
            message: "新增失败！"
          });
        }
      // this.addAdvancePaymentFormVisible = false;
      // this.getList();
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
      // console.log("支出类型");
      // console.log(this.paymode);
    },

    //文件上传成功的钩子函数
        handleSuccess(res, file) {
            this.$message({
                type: 'info',
                message: '图片上传成功',
                duration: 6000
            });
            if (file.response.success) {
                // this.editor.picture = file.response.message; //将返回的文件储存路径赋值picture字段
                
                this.addAdvancePaymentForm.voucher=file.response.message;
                // this.editProductForm.voucher=file.response.message;

                // this.productList.picture=file.response.message;
                
            }
        },
        //删除文件之前的钩子函数
        handleRemove(file, fileList) {
            this.$message({
                type: 'info',
                message: '已删除原有图片',
                duration: 6000
            });
        },
        //点击列表中已上传的文件事的钩子函数
        handlePreview(file) {
          this.dialogImageUrl = file.url;
          this.dialogVisible = true;
        },
        //上传的文件个数超出设定时触发的函数
        onExceed(files, fileList) {
            this.$message({
                type: 'info',
                message: '最多只能上传一个图片',
                duration: 6000
            });
        },
        //文件上传前的前的钩子函数
        //参数是上传的文件，若返回false，或返回Primary且被reject，则停止上传
        beforeUpload(file) {
            const isJPG = file.type === 'image/jpeg';
            const isGIF = file.type === 'image/gif';
            const isPNG = file.type === 'image/png';
            const isBMP = file.type === 'image/bmp';
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPG && !isGIF && !isPNG && !isBMP) {
                this.$message.error('上传图片必须是JPG/GIF/PNG/BMP 格式!');
            }
            if (!isLt2M) {
                this.$message.error('上传图片大小不能超过 2MB!');
            }
            return (isJPG || isBMP || isGIF || isPNG) && isLt2M;
        },
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
</style>
