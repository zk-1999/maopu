<template>
  <div class="min1500">
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>进货管理</el-breadcrumb-item>
      <el-breadcrumb-item>采购订单-初审</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-form
        :inline="true"
        class="demo-form-inline search"
        :model="chaOrderFrom"
        ref="chaOrderFrom"
        label-width="80px"
        label-position="left"
      >
        <el-row :gutter="20" class="row">
          <el-col :span="24">
            <el-form-item label="订单编号" prop="porderCode">
              <el-input placeholder="请输入订单编号" class="_small" v-model="chaOrderFrom.porderCode"></el-input>
            </el-form-item>
            <el-form-item label="制单人员" prop="porderProducer">
              <el-input placeholder="请输入人员" v-model="chaOrderFrom.porderProducer" class="_small"></el-input>
            </el-form-item>
            <el-form-item label="制单时间" prop="time">
              <el-date-picker
                v-model="chaOrderFrom.time"
                type="daterange"
                value-format="yyyy-MM-dd"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="到货情况" prop="porderArrivalstatus">
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
            <el-form-item label="订单状态" prop="porderState">
              <el-select v-model="chaOrderFrom.porderState" placeholder="请选择" class="_small">
                <el-option value label="全部"></el-option>
                <el-option value="0" label="初始化"></el-option>
                <el-option value="1" label="待初审"></el-option>
                <el-option value="2" label="初审未通过"></el-option>
                <el-option value="3" label="待复审"></el-option>
                <el-option value="4" label="复审未通过"></el-option>
                <el-option value="5" label="采购中"></el-option>
                <el-option value="6" label="待入库"></el-option>
                <el-option value="7" label="部分入库"></el-option>
                <el-option value="8" label="已完成"></el-option>
                <el-option value="9" label="结束"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button @click="getList(1)">查 询</el-button>
              <el-button type="primary" @click="ResetForm('chaOrderFrom')">重 置</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <!-- <el-button type="success" @click="addOrderVisible = true;editOrde  = false">新增</el-button> -->
      <!-- <el-button @click="edit" :disabled="selectedList.length == 0">编辑</el-button>
      <el-button @click="del" :disabled="selectedList.length == 0">删除</el-button>
      <el-button @click="getList">提审</el-button>-->
      <!-- <el-button @click="stop">终止采购</el-button> -->
      <el-table border :data="orderList" @selection-change="handleSelectionChange">
        <el-table-column type="index" width="50px" label="序号" align="center"></el-table-column>
        <el-table-column prop="porderCode" label="订单编号" width="200px" align="center"></el-table-column>
        <el-table-column prop="supplierDOs.supName" label="供应商" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="porderPalnmoney" label="预付款金额" width="100px"></el-table-column>
        <el-table-column prop="porderTotalmoney" label="订单总金额" width="100px"></el-table-column>
        <el-table-column prop="porderTotalnum" label="采购总数量" width="100px"></el-table-column>
        <el-table-column prop="porderDiffernumber" label="到货数量"></el-table-column>
        <el-table-column prop="porderDiffernumber" label="差异数量"></el-table-column>
        <el-table-column prop="basicId" label="入库仓库"></el-table-column>
        <el-table-column prop="porderArrivalstatus" label="到货情况"></el-table-column>
        <!-- <el-table-column prop="porderProducer" label="制单人员"></el-table-column> -->
        <el-table-column prop="porderBuyer" label="采购员"></el-table-column>
        <!-- <el-table-column prop="porderCompletenum" label="已采购数量"></el-table-column> -->
        <!-- <el-table-column prop="porderStarttime" label="采购周期" width="200">
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
            <el-tag type="danger" v-if="scope.row.porderState==6">待入库</el-tag>
            <el-tag type="danger" v-if="scope.row.porderState==7">部分入库</el-tag>
            <el-tag type="danger" v-if="scope.row.porderState==8">已完成</el-tag>
            <el-tag type="danger" v-if="scope.row.porderState==9">终止</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="95px" align="center" fixed="right">
          <template slot-scope="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              @click="checkOrder(scope.row.porderCode)"
              v-if="scope.row.porderState==1"
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
      title="审核"
      :visible.sync="checkOrderVisible"
      width="75%"
      :before-close="handleClose"
      @closed="dialogClosed"
    >
      <el-form
        :label-position="labelPosition"
        :model="checkOrderForm"
        ref="checkOrderForm"
        :rules="addOrderRules"
        :inline="true"
        label-width="110px"
      >
        <!-- <el-form-item label="订单编号 ：" prop="Id">
                        <el-input v-model="addOrderForm.Id" placeholder="订单编号" class="_small"></el-input>
        </el-form-item>-->
        <el-form-item label="采购订单编号" prop="porderCode">
          <el-input v-model="checkOrderForm.porderCode" :disabled="true" class="_small"></el-input>
        </el-form-item>
        <el-form-item label="制单人" prop="porderProducer">
          <el-input v-model="checkOrderForm.porderProducer" :disabled="true" class="_small"></el-input>
        </el-form-item>
        <el-form-item label="入库仓库" prop="basicId">
          <el-input v-model="checkOrderForm.basicId" :disabled="true" class="_small"></el-input>
        </el-form-item>
        <br />
        <el-form-item label="采购人员" prop="porderBuyer">
          <el-input v-model="checkOrderForm.porderBuyer" :disabled="true" class="_small"></el-input>
        </el-form-item>
        <el-form-item label="供应商" prop="supplierId">
          <el-input v-model="checkOrderForm.supplierId" :disabled="true" class="_small"></el-input>
        </el-form-item>
        <el-form-item label="订单状态" prop="porderState">
          <el-select
            v-model="checkOrderForm.porderState"
            placeholder="请选择"
            class="_small"
            :disabled="true"
          >
            <el-option value label="全部"></el-option>
            <el-option value="0" label="初始化"></el-option>
            <el-option value="1" label="待初审"></el-option>
            <el-option value="2" label="初审未通过"></el-option>
            <el-option value="3" label="待复审"></el-option>
            <el-option value="4" label="复审未通过"></el-option>
            <el-option value="5" label="采购中"></el-option>
            <el-option value="6" label="待入库"></el-option>
            <el-option value="7" label="部分入库"></el-option>
            <el-option value="8" label="已完成"></el-option>
            <el-option value="9" label="结束"></el-option>
          </el-select>
        </el-form-item>
        <br />
        <el-form-item label="采购描述" prop="porderBuyexplain">
          <el-input
            type="textarea"
            v-model="checkOrderForm.porderBuyexplain"
            :disabled="true"
            :rows="2"
          ></el-input>
        </el-form-item>

        <hr />

        <el-table
          border
          :data="checkOrderForm.pcommodityDos"
          @selection-change="addSelectionChange"
        >
          <el-table-column type="index" width="50px" label="序号" align="center"></el-table-column>
          <el-table-column prop="supgoolsBigType" label="商品名称"></el-table-column>
          <el-table-column prop="supgoolsId" label="商品编码"></el-table-column>
          <!-- <el-table-column
              prop="supgoolssmallType"
              label="商品小类型"
              v-if="panduan.supgoolssmallType1"
          ></el-table-column>-->
          <el-table-column prop="supgoolsBrand" label="品牌"></el-table-column>
          <el-table-column prop="supgoolsWeight" label="克重"></el-table-column>
          <el-table-column prop="supgoolsWidths" label="门幅"></el-table-column>
          <el-table-column prop="supgoolCoated" label="淋膜类型"></el-table-column>

          <el-table-column prop="pcommodityStock" label="当前库存" align="center">
            <!-- <template scope="scope"> -->
            <!-- <el-input v-model="scope.row.pcommodityStock"></el-input> -->
            <!-- </template>                     -->
          </el-table-column>
          <el-table-column prop="pcommodityUnit" label="单位" align="center">
            <!-- <template scope="scope"> -->
            <!-- <el-input v-model="scope.row.pcommodityUnit"></el-input> -->
            <!-- </template> -->
          </el-table-column>
          <el-table-column prop="pcommodityPrice" label="采购价（元）" align="center">
            <template scope="scope">
              <el-input v-model="scope.row.pcommodityPrice" :disabled="true"></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="pcommodityPalnnum" label="采购数量" align="center">
            <template scope="scope">
              <el-input v-model="scope.row.pcommodityPalnnum" :disabled="true"></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="spmc" label="金额" align="center">
            <template scope="scope">{{scope.row.pcommodityPalnnum*scope.row.pcommodityPrice}}</template>
          </el-table-column>
        </el-table>

        <hr />

        <el-form-item label="订单数量" prop="porderTotalnum">
          <el-input v-model="checkOrderForm.porderTotalnum" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="订单金额" prop="porderTotalmoney">
          <el-input v-model="checkOrderForm.porderTotalmoney" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="预付金额" prop="porderPalnmoney">
          <el-input v-model="checkOrderForm.porderPalnmoney" :disabled="true"></el-input>
        </el-form-item>

        <br />
        <el-form-item label="付款说明" prop="porderExplain">
          <el-input type="textarea" v-model="checkOrderForm.porderExplain" :disabled="true"></el-input>
        </el-form-item>

        <hr />

        <el-form-item label="审核人" prop="porderReviewman">
          <el-input v-model="checkOrderForm.porderReviewman" :disabled="true"></el-input>
        </el-form-item>
        <br />
        <el-form-item label="审核结果" prop="porderPalnmoney">
          <el-radio v-model="radio" label="0">通过</el-radio>
          <el-radio v-model="radio" label="1">驳回</el-radio>
        </el-form-item>
        <br />
        <el-form-item label="备注" prop="porderReviewexplain">
          <el-input type="textarea" v-model="checkOrderForm.porderReviewexplain"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="checkOrderVisible=false">取消</el-button>
        <el-button @click="editPurOrderState()" type="primary">保存</el-button>
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
        lab: "纸张",
        pageCode: 1, //当前页
        pageSize: 10 //每页显示的记录数
      },
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
      checkOrderForm: {},
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
      }
    };
  },
  created() {
    this.chaCopy();
    this.getList();
    // this.getCookie();
  },
  methods: {
    //读取cookie
    getCookie: function() {
      if (document.cookie.length > 0) {
        var arr = document.cookie.split("; "); //这里显示的格式需要切割一下自己可输出看下
        for (var i = 0; i < arr.length; i++) {
          var arr2 = arr[i].split("="); //再次切割
          //判断查找相对应的值
          if (arr2[0] == "userName") {
            //  console.log(arr2[1])
            this.checkOrderForm.porderReviewman = arr2[1]; //保存到保存数据的地方
          }
        }
        this.checked = true;
      }
    },
    ResetForm(formName) {
      this.$refs[formName].resetFields();
      // this.getList();
    },
    async gongyingshangpi() {
      this.panduan.supgoolCoated1 = false;
      this.panduan.supgoolsBradth1 = false;
      this.panduan.supgoolsBrand1 = false;
      this.panduan.supgoolsColor1 = false;
      this.panduan.supgoolsHeight1 = false;
      this.panduan.supgoolsLength1 = false;
      this.panduan.supgoolsWeight1 = false;
      this.panduan.supgoolsWidth1 = false;
      this.panduan.supgoolsWidths1 = false;
      this.panduan.supgoolssmallType = false;

      if (this.addOrderForm.supplierId == "") {
        this.$message({
          type: "info",
          message: "请选择供应商"
        });
      } else {
        const { data: res } = await this.$http.post(
          "jc/suppliergoods/selectSuppliergoolslist",
          { params: this.addOrderForm }
        );
        console.log(res);
        for (let index = 0; index < res.body.rows.length; index++) {
          if (res.body.rows[index].supgoolssmallType == "") {
            this.panduan.supgoolssmallType1 = false;
          } else {
            this.panduan.supgoolssmallType1 = true;
          }
          if (res.body.rows[index].supgoolCoated == "") {
            this.panduan.supgoolCoated1 = false;
          } else {
            this.panduan.supgoolCoated1 = true;
          }
          if (res.body.rows[index].supgoolsBrand == "") {
            this.panduan.supgoolsBrand1 = false;
          } else {
            this.panduan.supgoolsBrand1 = true;
          }
          if (res.body.rows[index].supgoolsWeight == null) {
            this.panduan.supgoolsWeight1 = false;
          } else {
            this.panduan.supgoolsWeight1 = true;
          }
          if (res.body.rows[index].supgoolsWidths == null) {
            this.panduan.supgoolsWidths1 = false;
          } else {
            this.panduan.supgoolsWidths1 = true;
          }
          if (res.body.rows[index].supgoolsBradth == null) {
            this.panduan.supgoolsBradth1 = false;
          } else {
            this.panduan.supgoolsBradth1 = true;
          }
          if (res.body.rows[index].supgoolsLength == null) {
            this.panduan.supgoolsLength1 = false;
          } else {
            this.panduan.supgoolsLength1 = true;
          }
          if (res.body.rows[index].supgoolsWidth == null) {
            this.panduan.supgoolsWidth1 = false;
          } else {
            this.panduan.supgoolsWidth1 = true;
          }
          if (res.body.rows[index].supgoolsHeight == null) {
            this.panduan.supgoolsHeight1 = false;
          } else {
            this.panduan.supgoolsHeight1 = true;
          }
          if (res.body.rows[index].supgoolsColor == "") {
            this.panduan.supgoolsColor1 = false;
          } else {
            this.panduan.supgoolsColor1 = true;
          }
        }
        console.log(this.panduan);

        this.shangpi = res.body.rows;
        this.total = res.body.total;
        this.addOrder_addgoods = true;
      }
    },
    handleSelectionChange(val) {
      this.selectedList = val;
      console.log(val);
    },
    async getList(val) {
      if (val) {
        // 重新点击时，需要重置查询页数
        this.chaOrderFrom.pageCode = 1;
        this.chaCopy();
        console.log(1111);
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
    handleSizeChange(val) {
      this.chaOrderFrom.pageSize = val;
      console.log(`每页 ${val} 条`);
      this.getList();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
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
    },

    addSelectionChange(val) {
      this.addSelectedList = val;
      console.log(val);
    },
    // 审核订单
    async checkOrder(porderCode) {
      const { data: res } = await this.$http.post("jh/purchase/dtjresultMap", {
        porderCode: porderCode
      });
      this.checkOrderForm = res[0];
      if (this.checkOrderForm.porderState == 1) {
        this.checkOrderForm.porderState = "1";
      }

      // 查询具体商品信息
      let val = res[0].pcommodityDos;
      // 一个销售订单下的所有商品
      let ids = [];
      for (let i = 0; i < val.length; i++) {
        ids.push(val[i].suppliergoolsId);
      }

      // 用数组做参数查询所有规格
      // jc/suppliergoods/selectSuppliergoolslistmore
      const { data: res2 } = await this.$http.post(
        "jc/suppliergoods/selectSuppliergoolslistmore",
        ids
      );

      // 为表单商品赋值
      this.checkOrderForm.pcommodityDos = val;
      //
      for (let j = 0; j < val.length; j++) {
        for (let i = 0; i < res2.length; i++) {
          if (
            this.checkOrderForm.pcommodityDos[j].suppliergoolsId ==
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
            this.checkOrderForm.pcommodityDos[j].supgoolsBigType =
              res2[i].supgoolsBigType;
            this.checkOrderForm.pcommodityDos[j].supgoolsId =
              res2[i].supgoolsId;
            this.checkOrderForm.pcommodityDos[j].supgoolsBrand =
              res2[i].supgoolsBrand;

            this.checkOrderForm.pcommodityDos[j].supgoolsWeight =
              res2[i].supgoolsWeight;
            this.checkOrderForm.pcommodityDos[j].supgoolsWidths =
              res2[i].supgoolsWidths;
            this.checkOrderForm.pcommodityDos[j].supgoolCoated =
              res2[i].supgoolCoated;
          }
        }
      }

      // this.checkOrderForm.porderReviewman

      this.getCookie();

      this.checkOrderVisible = true;
    },

    // 审核
    async editPurOrderState() {
      let purchase = this.checkOrderForm;
      if (this.radio == "0") {
        purchase.porderState = "3";
      } else {
        purchase.porderState = "2";
      }

      const { data: res } = await this.$http.post(
        "/jh/purchase/examine",
        // "statusChangeList":statusChangeList
        purchase
      );
      this.getList();
      this.checkOrderVisible = false;
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
</style>
