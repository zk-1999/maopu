<template>
  <div class="min1500">
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>财务管理</el-breadcrumb-item>
      <el-breadcrumb-item>付款单</el-breadcrumb-item>
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
            <el-form-item label="付款单号" prop="paymentorderno">
              <el-input class="_small" v-model="chaOrderFrom.paymentorderno"></el-input>
            </el-form-item>
            <el-form-item label="制单人员" prop="payexamine">
              <el-input class="_small" v-model="chaOrderFrom.payexamine"></el-input>
            </el-form-item>

            <el-form-item label="资金账户" prop="assetaccount">
              <el-input class="_small" v-model="chaOrderFrom.assetaccount"></el-input>
            </el-form-item>

            <el-form-item label="支出类型" prop="raetypes">
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
            <el-form-item label="付款类别" prop="typeOfPayment">
              <el-select
                v-model="chaOrderFrom.typeOfPayment"
                placeholder="请选择"
                class="_small"
                @change="changeTypeOfPayment($event)"
              >
                <el-option value="0" label="预付款"></el-option>
                <el-option value="1" label="应付款"></el-option>
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

      <el-button type="primary" @click="addAdvancePaymentFormVisible = true">新增预付款单</el-button>
      <!-- @selection-change="handleSelectionChange2" -->
      <el-table border :data="orderList">
        <!-- <el-table-column type="selection" width="50px"></el-table-column> -->
        <el-table-column type="index" label="序号" align="center" width="50px"></el-table-column>
        <el-table-column
          prop="paymentorderno"
          :label="chaOrder.typeOfPayment == 0?'预付款单号':'应付款单号'"
          width="180px"
          align="center"
        ></el-table-column>
        <el-table-column prop="payexamine" label="付款制单人" width="100px"></el-table-column>
        <el-table-column prop="rectime" label="制单时间" width="200px" align="center"></el-table-column>
        <el-table-column prop="raetypes" label="支出类型"></el-table-column>
        <el-table-column prop="purchaseorderno" label="关联单号" width="200px" align="center"></el-table-column>
        <el-table-column prop="amount" label="付款金额"></el-table-column>
        <el-table-column prop="assetaccount" label="资金账户"></el-table-column>
        <el-table-column prop="paymentstatus" label="付款状态">
          <template slot-scope="scope">
            <span v-if="scope.row.paymentstatus == 0">未付款</span>
            <span v-if="scope.row.paymentstatus == 1">已付款</span>
          </template>
        </el-table-column>
        <!-- <el-table-column prop="porderBuyer" label="采购人"></el-table-column> -->
        <!-- <el-table-column prop="porderCompletenum" label="已采购数量"></el-table-column> -->
        <!-- <el-table-column prop="porderStarttime" label="采购周期" width="200" align="center">
          <template slot-scope="scope">{{scope.row.porderStarttime+"-"+scope.row.porderStoptime}}</template>
        </el-table-column>-->
        <el-table-column prop="paymenttime" label="付款时间" width="200px" align="center"></el-table-column>
        <el-table-column prop="remarks" label="备注" width="200" align="center"></el-table-column>
        <!-- <el-table-column prop="porderState" label="操作" width="105px" align="center">
          <template slot-scope="scope">
            <el-button type="success" @click="pay(scope.row.paymentorderno)">付款</el-button>
            <el-button type="primary">查看</el-button>
          </template>
        </el-table-column>-->
        <!-- width="270px" -->
        <!-- ,operationFlag2?operationWidth2:'',operationFlag1?operationWidth1:'' -->
        <!-- :width="[operationFlag3?'270px':(operationFlag2?'180px':(operationFlag1?'90px':'0'))]" -->
        <el-table-column label="操作" width="180px" align="center" fixed="right">
          <template slot-scope="scope">
            <el-button
              type="success"
              icon="el-icon-edit"
              size="mini"
              @click="lookUpState = true;showEditOrder(scope.row.paymentorderno)"
            >查看</el-button>
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              :disabled="!(scope.row.paymentstatus == 0)"
              @click="lookUpState = false;showEditOrder(scope.row.paymentorderno)"
            >付款</el-button>

            <!-- <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
                :disabled="!(scope.row.porderState==0||scope.row.porderState==2||scope.row.porderState==4)"
                @click="deletebumen(scope.row.porderCode)"
            >删除</el-button>-->
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



    <el-dialog
      title="新增预付款单"
      :visible.sync="addAdvancePaymentFormVisible"
      width="40%"
      :before-close="handleClose"
      @closed="dialogClosed('addAdvancePaymentForm')"
    >
      <el-form
        label-position="right"
        label-width="90px"
        :model="addAdvancePaymentForm"
        ref="addAdvancePaymentForm"
        :rules="addAdvancePaymentFormRules"
        :inline="true"
      >
        <el-form-item label="采购订单号" prop="purchaseorderno">
          <el-input class="_small" v-model="addAdvancePaymentForm.purchaseorderno"></el-input>
        </el-form-item>

        <el-form-item label="预付款金额" prop="amount">
          <el-input class="_small" v-model="addAdvancePaymentForm.amount"></el-input>
        </el-form-item>

        <el-form-item label="资金账户" prop="assetaccount">
          <el-input class="_small" v-model="addAdvancePaymentForm.assetaccount"></el-input>
          <!-- <el-select v-model="assetaccount" placeholder="请选择" class="_small">
            <el-option value label="全部"></el-option>
            <el-option value="0" label="未到货"></el-option>
            <el-option value="1" label="部分到货"></el-option>
            <el-option value="2" label="全部到货"></el-option>
          </el-select>-->
        </el-form-item>

        <el-form-item label="支出类型" prop="raetypes">
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

        <el-form-item label="付款状态" prop="paymentstatus">
          <el-select v-model="addAdvancePaymentForm.paymentstatus" placeholder="请选择" class="_small">
            <el-option value="0" label="未付款"></el-option>
            <el-option value="1" label="已付款"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="备注" prop="remarks">
          <el-input
            type="textarea"
            placeholder="请输入内容"
            v-model="addAdvancePaymentForm.remarks"
            style="width: 600px"
          ></el-input>
        </el-form-item>
        <hr />
        <!-- ！！！ -->
        <!-- <el-form-item class="tupian">
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
                      :on-remove="handleRemove">
                <i class="el-icon-plus"></i>
            </el-upload>
        </el-form-item>-->
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addAdvancePaymentFormVisible=false">取消</el-button>
        <el-button @click="addAdvancePayment()" type="primary">保存</el-button>
      </span>
    </el-dialog>

            <el-dialog
      :title="lookUpState?'查看付款单':'付款'"
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
        <el-form-item label="采购订单号" prop="porderCode">
          <el-input class="_small" v-model="editPaymentForm.porderCode" disabled="true"></el-input>
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
        <el-form-item label="支出类型" prop="raetypes">
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
              
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="预付款状态" prop="paymentstatus">
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
      // 查询表单数据
      chaOrderFrom: {
        paymentorderno:"",//付款单号
        payexamine: "", // 付款制单人
        assetaccount: "", //资金账户
        raetypes: "", //收支类型
        typeOfPayment: "0", //付款类别
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

      // 新增付款单显示
      payVisible: false,

      // 新增预付款单
      addAdvancePaymentForm: {
        payexamine: "", //付款制单人
        purchaseorderno: "", //采购订单号
        amount: "", //金额
        assetaccount: "", //资金账户
        raetypes: "", //收支类型
        paymentstatus: "", //应付款状态
        remarks: "" //备注
      },
      // 新增预付款单显示
      addAdvancePaymentFormVisible: false
    };
  },
  created() {
    //自己写的方法
    this.getWarehouseOptions();
    // this.chaOrder = JSON.parse(JSON.stringify(this.chaOrderFrom));
    this.getList(1);
    this.selectoutpaymode();
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
    // 获取仓库列表
    async getWarehouseOptions() {
      const { data: res } = await this.$http.get("/getWarehouseOptions");
      this.warehouseOptions = res.body.rows; //如何取
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
    // handleSizeChange(val) {
    //   this.salesOrdermanagementForm.pageSize = val;
    //   console.log(`每页 ${val} 条`);
    //   this.queryOrderList();
    // },
    handleCurrentChange(val) {
      // this.chaOrder.pageCode = val;
      // console.log(`当前页: ${val}`);
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
      if (this.chaOrder.typeOfPayment == 0) {
        // 预付款
        const { data: res1 } = await this.$http.post(
          "/payment/selectAdvancepayment",
          this.chaOrder
        );
        res = res1;
      } else if (this.chaOrder.typeOfPayment == 1) {
        // 应付款
        const { data: res2 } = await this.$http.post(
          "/payable/selectAccountpayable",
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


      // 循环遍历，raetypes变为名字
      for(let i = 0;i<this.orderList.length;i++){
        for(let j = 0;j<this.paymode.length;j++){
          if(this.orderList[i].raetypes == this.paymode[j].value){
            console.log(this.paymode[j].label)
            this.orderList[i].raetypes = this.paymode[j].label
          }
        }
      }
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
      if (this.chaOrder.typeOfPayment == 0) {
        const { data: res1 } = await this.$http.post("/payment/selectMassage", {
          paymentorderno: val
        });
        res = res1;
      } else if (this.chaOrder.typeOfPayment == 1) {
        const { data: res2 } = await this.$http.post("/payable/selectMassage", {
          paymentorderno: val
        });
        res = res2;
      }

      console.log(res.body.result);

      this.editPaymentForm = res.body.result;

      console.log(this.paymode);
      this.editPaymentForm.paymentstatus =
        this.editPaymentForm.paymentstatus + "";
      this.editPaymentForm.paymentorderno = val;
      //  this.editPaymentForm.raetypes = this.editPaymentForm.raetypes + ''

      this.editPaymentVisible = true;
    },

    // 付款结果保存
    async addSave() {
      let res = "";
      if (this.chaOrder.typeOfPayment == 0) {
        const { data: res1 } = await this.$http.put(
          "/payment/updateAdvancepayment",
          this.editPaymentForm
        );
        res = res1;
      } else if (this.chaOrder.typeOfPayment == 1) {
        const { data: res2 } = await this.$http.put(
          "/payable/updateAccountpayable",
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

    // changeTypeOfPayment(val){
    //   // console.log(val)
    //   let res = '';
    //   if(val == 0){//预付款
    //     this.selectoutpaymode()
    //   }else if(val == 1){//应付款
    //     this.selectinpaymode()
    // }
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