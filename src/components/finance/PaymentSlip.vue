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
        label-width="90px"
        label-position="left"
      >
        <el-row :gutter="20" class="row">
          <el-col :span="24">
            <el-form-item label="付款单号：" prop="paymentorderno">
              <el-input class="_small" v-model="chaOrderFrom.paymentorderno"></el-input>
            </el-form-item>
            <el-form-item label="制单人员：" prop="payexamine">
              <el-input class="_small" v-model="chaOrderFrom.payexamine"></el-input>
            </el-form-item>

            <el-form-item label="资金账户：" prop="assetaccount">
              <el-select
                v-model="chaOrderFrom.assetaccount"
                class="_small"
                placeholder=""
              >
                <el-option
                  v-for="item in zijinCount"
                  :key="item.basicId"
                  :label="item.basicRetainone"
                  :value="item.basicId"
                ></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="支出类型：" prop="raetypes">
              <el-select
                v-model="chaOrderFrom.raetypes"
                class="_small"
                placeholder=""
              >
                <el-option
                  v-for="item in paymode"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <!-- @change="changeTypeOfPayment($event)" -->
            <el-form-item label="付款类别：" prop="typeOfPayment">
              <el-select
                v-model="chaOrderFrom.typeOfPayment"
                class="_small"
                
              >
                <el-option value="0" label="预付款"></el-option>
                <el-option value="1" label="应付款"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="制单日期：" prop="rectimeRange">
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

      <!-- <el-button type="primary" @click="addAdvancePaymentFormVisible = true">新增预付款单</el-button> -->
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
              size="mini"
              @click="lookUpState = true;showEditOrder(scope.row.paymentorderno)"
            >查看</el-button>
            <el-button
              type="primary"
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
        :inline="true"
      >
        <el-form-item label="采购订单号：" prop="purchaseorderno">
          <el-input class="_small" v-model="addAdvancePaymentForm.purchaseorderno"></el-input>
        </el-form-item>

        <el-form-item label="预付款金额：" prop="amount">
          <el-input class="_small" v-model="addAdvancePaymentForm.amount"></el-input>
        </el-form-item>

        <el-form-item label="资金账户：" prop="assetaccount">
          <!-- <el-input class="_small" v-model="addAdvancePaymentForm.assetaccount"></el-input> -->
          <el-select
                v-model="addAdvancePaymentForm.assetaccount"
                class="_small"
                placeholder=""
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
          <el-select v-model="addAdvancePaymentForm.raetypes"  class="_small" placeholder=""> 
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
          <el-select v-model="addAdvancePaymentForm.paymentstatus"  class="_small">
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
      width="42%"
      :before-close="handleClose"
      @closed="dialogClosed('editPaymentForm')"
    >
      <el-form
        label-position="right"
        label-width="100px"
        :model="editPaymentForm"
        ref="editPaymentForm"
        :inline="true"
      >
        <el-form-item label="付款制单人：" prop="payexamine">
          <el-input class="_small" v-model="editPaymentForm.payexamine" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="供应商名称：" prop="supName">
          <el-input class="_small" v-model="editPaymentForm.supName" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="供应商编码：" prop="supId">
          <el-input class="_small" v-model="editPaymentForm.supId" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="采购订单号：" prop="porderCode">
          <el-input class="_small" v-model="editPaymentForm.porderCode" :disabled="true"></el-input>
        </el-form-item>
        <br />
        <el-form-item label="采购数量：" prop="porderTotalnum">
          <el-input class="_small" v-model="editPaymentForm.porderTotalnum" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="采购金额：" prop="porderTotalmoney">
          <el-input class="_small" v-model="editPaymentForm.porderTotalmoney":disabled="true"></el-input>
        </el-form-item>
        <!-- <el-form-item label="结算方式" prop="settlemethod">
          <el-input class="_small" v-model="editPaymentForm.settlemethod" disabled="true"></el-input>
        </el-form-item> -->
        <el-form-item label="预付款金额：" prop="amount">
          <el-input class="_small" v-model="editPaymentForm.amount" :disabled="true"></el-input>
        </el-form-item>
        <br />
        <el-form-item label="资金账户：" prop="assetaccount">
          <!-- <el-input class="_small" v-model="editPaymentForm.assetaccount" :disabled="lookUpState"></el-input> -->
          <el-select
                v-model="editPaymentForm.assetaccount"
                class="_small"
                :disabled="lookUpState"
              >
                <el-option
                  v-for="item in zijinCount"
                  :key="item.basicId"
                  :label="item.basicRetainone"
                  :value="item.basicId"
                ></el-option>
              </el-select>
        </el-form-item>
        <el-form-item label="支出类型：" prop="raetypes">
          <el-select
            v-model="editPaymentForm.raetypes"
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
        <el-form-item label="预付款状态：" prop="paymentstatus">
          <el-select
            v-model="editPaymentForm.paymentstatus"
            class="_small"
            :disabled="lookUpState"
          >
            <el-option value="0" label="未付款"></el-option>
            <el-option value="1" label="已付款"></el-option>
          </el-select>
        </el-form-item>
        <br />
        <el-form-item label="备注：" prop="remarks">
          <el-input
            type="textarea"
            class="_small"
            v-model="editPaymentForm.remarks"
            style="width: 600px"
            :disabled="lookUpState"
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
                      :on-error="handleError"
                      :on-remove="handleRemove"
                      :disabled="lookUpState"
                      >
                <i class="el-icon-plus"></i>
            </el-upload>
          </el-form-item>
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
      addAdvancePaymentFormVisible: false,

      zijinCount:[],

      // 图片上传
      ip:'',
    };
  },
  created() {
    //自己写的方法
    this.getList(1);
    this.selectoutpaymode();
    this.getCookie();
    this.selectZiJinCount();
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


      let arr = res.body.rows;


      // 循环遍历，raetypes变为名字
      for(let i = 0;i<arr.length;i++){
        for(let j = 0;j<this.paymode.length;j++){
          if(arr[i].raetypes == this.paymode[j].value){
            arr[i].raetypes = this.paymode[j].label
          }
        }
      }
      // 循环遍历，显示资金账户
      arr.forEach(order=>{
        this.zijinCount.forEach(account =>{
          if(order.assetaccount == account.basicId){
            order.assetaccount = account.basicRetainone;
          }
        })
      }) 

      this.orderList = arr

      this.total = res.body.total;

    },
    // 表单重置
    ResetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // 获取支出类型
    async selectoutpaymode() {
      //获取正确ip
      this.ip=this.ips+'upload';
      
      const { data: res } = await this.$http.post("jc/Basic/selectoutpaymode");
      res.forEach((item, index, array) => {
        let x = {
          label: item.basicRetainone,
          value: item.basicId
        };
        this.paymode.push(x);
      });
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

        if(this.lookUpState == false){
          var storage = window.localStorage;
          res.body.result.payexamine =  storage.getItem("username");
        }
      }


      

      this.editPaymentForm = res.body.result;

      this.editPaymentForm.paymentstatus =
      this.editPaymentForm.paymentstatus + "";
      this.editPaymentForm.paymentorderno = val;

      if(res.body.result.assetaccount != null){
        this.editPaymentForm.assetaccount = Number(this.editPaymentForm.assetaccount)
      }
      
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

      if(res.body.respCode == 200){
        this.$message({
          type: "success",
          message: res.body.msg
        });
      }else{
        this.$message({
          type: "info",
          message: res.body.msg
        });
      }


      this.editPaymentVisible = false;

      this.getList();
    },

    getCookie: function() {
      var storage = window.localStorage;
      this.addAdvancePaymentForm.payexamine = storage.getItem("username");
    },

    async selectZiJinCount(userInfo) {
      const { data: res } = await this.$http.post("jc/Basic/selectzijin", userInfo);

      this.zijinCount = res

    },
    handleCurrentChange(val) {
      this.chaOrder.pageCode = val;
      this.getList();
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
                
                this.editPaymentForm.voucher=file.response.message;
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
        handleError(err, file, fileList){
        }

    // changeTypeOfPayment(val){
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
.fenge{
position: absolute;
top: 34px;
left: 0px;
height: 25px;
width: 98.5%;
line-height: 25px;
padding-left:15px ;
background-color: #DCDFE6;

}
.fenge1{
height: 25px;
width:98.5%;
line-height: 25px;
padding-left:15px ;
background-color: #DCDFE6;
margin-bottom: 20px;
}
</style>  