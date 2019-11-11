<template>
  <div class="min1500">
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>销售管理</el-breadcrumb-item>
      <el-breadcrumb-item>已发货订单</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <!-- ref作用？？ -->
      <el-form
        :inline="true"
        class="demo-form-inline"
        :model="salesOrdermanagementForm"
        ref="salesOrdermanagementForm"
      >
        <!-- 订单号 -->

        <el-form-item label="订单号"> 
          <el-input class="hu"></el-input>
        </el-form-item>
        <!-- 选择仓库 -->
        <el-form-item label="选择仓库" class="mar">
          <el-select v-model="salesOrdermanagementForm.value1" class="hu">
            <el-option
              v-for="item in salesOrdermanagementForm.warehouseOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <!-- 订单状态 -->
        <el-form-item label="订单状态" class="mar">
          <el-select v-model="salesOrdermanagementForm.value2" class="hu">
            <el-option
              v-for="item in salesOrdermanagementForm.orderStateOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <!-- 手机号码 -->
        <el-form-item label="手机号码" class="mar">
          <el-input v-model="salesOrdermanagementForm.phoneNumber" class="hu"></el-input>
        </el-form-item>
        <!-- 收货姓名 -->
        <el-form-item label="收货姓名">
          <el-input v-model="salesOrdermanagementForm.name" class="hu"></el-input>
        </el-form-item>
        <!-- 收货省份 -->
        <el-form-item label="收货省份" class="mar">
          <el-select placeholder="选择省份" class="hu"></el-select>
        </el-form-item>
        <!-- 查询按钮 -->
        <el-form-item class="mar">
          <el-button type="primary" size="small">查询</el-button>
        </el-form-item>
      </el-form>

      <!-- 自定义展示按钮，需要删除 -->
      <el-button type="info" size="small" @click="order=true">订单详情</el-button>
      <!-- <el-button type="warning">警告按钮</el-button> -->
      <!-- <el-button type="danger">危险按钮</el-button> -->

      <!-- 表格 -->
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        border
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column label="序号" width="120">
          <template slot-scope="scope">{{ scope.row.no }}</template>
        </el-table-column>

        <!-- <el-table-column prop="no" label="序号"></el-table-column> -->
        <el-table-column prop="orderNum" label="订单号"></el-table-column>
        <el-table-column prop="username" label="客户名称"></el-table-column>
        <el-table-column prop="goodsInfo" label="商品信息"></el-table-column>
        <el-table-column prop="overbookingTime" label="下单时间"></el-table-column>
        <el-table-column prop="money1" label="应付总金额"></el-table-column>
        <el-table-column prop="money2" label="应付预付金额"></el-table-column>
        <el-table-column prop="payTime" label="付款时间"></el-table-column>
        <el-table-column prop="address" label="收货地址" show-overflow-tooltip></el-table-column>
        <!-- <el-table-column prop="createTime" label="创建时间"></el-table-column> -->
        <!-- <el-table-column prop="lastModifyTime" label="最后修改时间"></el-table-column> -->
        <el-table-column prop="orderState" label="订单状态"></el-table-column>
        <el-table-column prop="orderNote" label="订单备注"></el-table-column>
      </el-table>
      <!-- 表格操作按钮 -->
      <!-- <div style="margin-top: 20px">
        <el-button @click="toggleSelection([tableData[1], tableData[2]])">切换第二、第三行的选中状态</el-button>
        <el-button @click="toggleSelection()">取消选择</el-button>
      </div>-->

      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[3, 5, 10, 15]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>

    <el-dialog title="订单详情" :visible.sync="order" width="60%" :before-close="handleClose">
      <!-- 标签页 -->
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="基础信息" name="first">
          <el-form title="订单" inline="true">
            <!-- 带有排序功能的商品table-->
            <!-- :default-sort="{prop: 'date', order: 'descending'}" -->
            <el-table :data="goodsData" style="width: 100%">
              <!-- <el-table-column prop="date" label="日期" sortable width="180"></el-table-column>
              <el-table-column prop="name" label="姓名" sortable width="180"></el-table-column>
              <el-table-column prop="address" label="地址" :formatter="formatter"></el-table-column>-->

              <!-- <el-table-column prop="orderNum" label="订单号"></el-table-column> -->
              <el-table-column prop="productName" label="产品名称"></el-table-column>
              <el-table-column prop="productNum" label="产品编码"></el-table-column>
              <el-table-column prop="productType" label="产品类型"></el-table-column>
              <el-table-column prop="unitPrice" label="单价" sortable></el-table-column>
              <el-table-column prop="salesQuantity" label="销售数量" sortable></el-table-column>
              <el-table-column prop="sumMoney" label="总金额" sortable></el-table-column>
              <el-table-column prop="note" label="备注"></el-table-column>
              <el-table-column prop="" label="已发货数量"></el-table-column>
            </el-table>
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="[3, 5, 10, 15]"
              :page-size="100"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total"
            ></el-pagination>
            <hr />

            <el-form-item label="订单编号">
              <el-input disabled="true" class="hu"></el-input>
            </el-form-item>
            <el-form-item label="状态">
              <el-select v-model="value" placeholder="请选择" class="hu" disabled="true">
                <el-option>初始化</el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="货币类型">
              <el-select v-model="value" placeholder="请选择" class="hu" disabled="true">
                <el-option>人民币</el-option>
                <el-option>美元</el-option>
                <el-option>英镑</el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="创建时间">
              <el-input disabled="true" class="hu"></el-input>
            </el-form-item>
            <el-form-item label="最后修改时间">
              <el-input disabled="true" class="hu"></el-input>
            </el-form-item>

            <!-- 分割线 -->
            <hr />

            <!-- 对齐 -->
            <el-row>
              <el-col :span="6">
                <el-form-item label="商品金额" class="a">
                  <el-input class="hu"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="预付款金额" class="a">
                  <el-input class="hu"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="小单费">
                  <el-input class="hu"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6">
                <el-form-item label="快递费">
                  <el-input class="hu"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="运  费">
                  <el-input class="hu"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="版  费">
                  <el-input class="hu"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6">
                <div></div>
              </el-col>
              <el-col :span="6">
                <div></div>
              </el-col>
              <el-col :span="6">
                <el-form-item label="合 计">
                  <el-input class="hu"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <!-- 付款状态 -->
            <hr />

            <el-form-item label="付款状态">
              <el-input class="hu" disabled="true"></el-input>
            </el-form-item>

            <el-form-item label="付款时间">
              <el-input class="hu" disabled="true"></el-input>
            </el-form-item>
            <hr />

            <el-form-item label="客户名称">
              <el-input class="hu"></el-input>
            </el-form-item>

            <hr />

            <el-form-item label="订单说明">
              <el-input style="width:300px"></el-input>
            </el-form-item>
            <!-- 生产订单信息 -->
            <!-- 生产单数量不确定，应该循环遍历 -->
            <hr />

            <el-form-item label="生产订单信息">
              <!-- <el-input style="width:300px"></el-input> -->
            </el-form-item>
            <!-- 收货信息 -->
            <hr />

            <el-form-item label="收货人">
              <el-input class="hu"></el-input>
            </el-form-item>
            <el-form-item label="手机号码">
              <el-input class="hu"></el-input>
            </el-form-item>
            <el-form-item label="电话号码">
              <el-input class="hu"></el-input>
            </el-form-item>
            <el-form-item label="邮编">
              <el-input class="hu"></el-input>
            </el-form-item>

            <el-form-item label="省市区">
              <el-select v-model="value" placeholder="请选择" class="hu"></el-select>
              <el-select v-model="value" placeholder="请选择" class="hu"></el-select>
              <el-select v-model="value" placeholder="请选择" class="hu"></el-select>
            </el-form-item>

            <el-form-item label="详细地址">
              <el-input style="width:250px"></el-input>
            </el-form-item>

            <el-form-item label="物流公司">
              <el-select v-model="value" placeholder="请选择" class="hu"></el-select>
            </el-form-item>

            <el-form-item label="物流单号（主）">
              <el-select v-model="value" placeholder="请选择" class="hu"></el-select>
            </el-form-item>

            <el-form-item label="LC码">
              <el-input class="hu"></el-input>
            </el-form-item>

            <el-form-item label="发货时间">
              <el-date-picker v-model="value1" type="date" placeholder="选择日期"></el-date-picker>
            </el-form-item>

            <!-- 发货信息 -->
            <hr />

            <el-table :data="t" style="width: 100%">
              <el-table-column prop label="产品编码"></el-table-column>
              <el-table-column prop label="产品名称"></el-table-column>
              <el-table-column prop label="产品类型"></el-table-column>
              <el-table-column prop label="单价"></el-table-column>
              <el-table-column prop label="总数量"></el-table-column>
              <el-table-column prop label="发货数量"></el-table-column>
              <el-table-column prop label="剩余数量"></el-table-column>
              <el-table-column prop label="发货时间"></el-table-column>
              <el-table-column prop label="关联出库单号"></el-table-column>
            </el-table>
            <hr />

            <el-row>
              <div style="margin-left:600px">
                <el-button type="primary" size="small">保 存</el-button>
                <el-button type="primary" size="small">提 交</el-button>
                <el-button type="primary" size="small">取 消</el-button>
              </div>
            </el-row>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="折消单信息" name="second">
          <el-form title="订单" inline="true">
            <!-- 带有排序功能的商品table-->
            <!-- :default-sort="{prop: 'date', order: 'descending'}" -->
            <el-table :data="goodsData" style="width: 100%">
              <!-- <el-table-column prop="date" label="日期" sortable width="180"></el-table-column>
              <el-table-column prop="name" label="姓名" sortable width="180"></el-table-column>
              <el-table-column prop="address" label="地址" :formatter="formatter"></el-table-column>-->

              <!-- <el-table-column prop="orderNum" label="订单号"></el-table-column> -->
              <el-table-column prop="productName" label="产品名称"></el-table-column>
              <el-table-column prop="productNum" label="产品编码"></el-table-column>
              <el-table-column prop="productType" label="产品类型"></el-table-column>
              <el-table-column prop="unitPrice" label="单价" sortable></el-table-column>
              <el-table-column prop="salesQuantity" label="销售数量" sortable></el-table-column>
              <el-table-column prop="sumMoney" label="总金额" sortable></el-table-column>
              <el-table-column prop="note" label="备注"></el-table-column>
              <el-table-column prop="note" label="已发货数量"></el-table-column>
            </el-table>
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="[3, 5, 10, 15]"
              :page-size="100"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total"
            ></el-pagination>
            <hr />

            <el-form-item label="订单编号">
              <el-input disabled="true" class="hu"></el-input>
            </el-form-item>
            <el-form-item label="状态">
              <el-select v-model="value" placeholder="请选择" class="hu" disabled="true">
                <el-option>初始化</el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="货币类型">
              <el-select v-model="value" placeholder="请选择" class="hu" disabled="true">
                <el-option>人民币</el-option>
                <el-option>美元</el-option>
                <el-option>英镑</el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="创建时间">
              <el-input disabled="true" class="hu"></el-input>
            </el-form-item>
            <el-form-item label="最后修改时间">
              <el-input disabled="true" class="hu"></el-input>
            </el-form-item>

            <!-- 分割线 -->
            <hr />

            <!-- 对齐 -->
            <el-row>
              <el-col :span="6">
                <el-form-item label="商品金额" class="a">
                  <el-input class="hu"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="预付款金额" class="a">
                  <el-input class="hu"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="小单费">
                  <el-input class="hu"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6">
                <el-form-item label="快递费">
                  <el-input class="hu"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="运  费">
                  <el-input class="hu"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="版  费">
                  <el-input class="hu"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6">
                <div></div>
              </el-col>
              <el-col :span="6">
                <div></div>
              </el-col>
              <el-col :span="6">
                <el-form-item label="合 计">
                  <el-input class="hu"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <!-- 付款状态 -->
            <hr />

            <el-form-item label="付款状态">
              <el-input class="hu" disabled="true"></el-input>
            </el-form-item>

            <el-form-item label="付款时间">
              <el-input class="hu" disabled="true"></el-input>
            </el-form-item>
            <hr />

            <el-form-item label="客户名称">
              <el-input class="hu"></el-input>
            </el-form-item>

            <hr />

            <el-form-item label="订单说明">
              <el-input style="width:300px"></el-input>
            </el-form-item>
            <!-- 生产订单信息 -->
            <!-- 生产单数量不确定，应该循环遍历 -->
            <hr />

            <el-form-item label="生产订单信息">
              <!-- <el-input style="width:300px"></el-input> -->
            </el-form-item>


            <!-- 收货信息 -->
            <hr />

            <el-form-item label="收货人">
              <el-input class="hu"></el-input>
            </el-form-item>
            <el-form-item label="手机号码">
              <el-input class="hu"></el-input>
            </el-form-item>
            <el-form-item label="电话号码">
              <el-input class="hu"></el-input>
            </el-form-item>
            <el-form-item label="邮编">
              <el-input class="hu"></el-input>
            </el-form-item>

            <el-form-item label="省市区">
              <el-select v-model="value" placeholder="请选择" class="hu"></el-select>
              <el-select v-model="value" placeholder="请选择" class="hu"></el-select>
              <el-select v-model="value" placeholder="请选择" class="hu"></el-select>
            </el-form-item>

            <el-form-item label="详细地址">
              <el-input style="width:250px"></el-input>
            </el-form-item>

            <el-form-item label="物流公司">
              <el-select v-model="value" placeholder="请选择" class="hu"></el-select>
            </el-form-item>

            <el-form-item label="物流单号（主）">
              <el-select v-model="value" placeholder="请选择" class="hu"></el-select>
            </el-form-item>

            <el-form-item label="LC码">
              <el-input class="hu"></el-input>
            </el-form-item>

            <el-form-item label="发货时间">
              <el-date-picker v-model="value1" type="date" placeholder="选择日期"></el-date-picker>
            </el-form-item>

            <!-- 发货信息 -->
            <hr />

            <el-table :data="t" style="width: 100%">
              <el-table-column prop label="产品编码"></el-table-column>
              <el-table-column prop label="产品名称"></el-table-column>
              <el-table-column prop label="产品类型"></el-table-column>
              <el-table-column prop label="单价"></el-table-column>
              <el-table-column prop label="总数量"></el-table-column>
              <el-table-column prop label="发货数量"></el-table-column>
              <el-table-column prop label="剩余数量"></el-table-column>
              <el-table-column prop label="发货时间"></el-table-column>
              <el-table-column prop label="关联出库单号"></el-table-column>
            </el-table>
            <hr />

            <el-row>
              <div style="margin-left:600px">
                <el-button type="primary" size="small">保 存</el-button>
                <el-button type="primary" size="small">提 交</el-button>
                <el-button type="primary" size="small">取 消</el-button>
              </div>
            </el-row>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      labelPosition: "right",
      addbumenDialogVisible: false,
      editbumenDialogVisible: false,
      delVisible: false,
      currentPage: 0,
      total: 0,
      delarr: "",
      selectedList: [],
      departmentList: [],
      chaDepartmentForm: {
        name: "",
        pageCode: 1, //当前页
        pageSize: 3 //每页显示的记录数
      },
      addDepartmentForm: {
        name: "",
        orderNum: ""
      },
      editDepartmentForm: {
        name: "",
        orderNum: ""
      },
      addDepartmentRules: {
        name: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 10, message: "长度在 3 到 10 个字符", trigger: "blur" }
        ]
      },

      //   自己做的部分

      salesOrdermanagementForm: {
        select: "1",
        pageCode: 1, //当前页
        pageSize: 3, //每页显示的记录数

        orderNoOptions: [
          {
            value: 0,
            label: "订单号"
          },
          {
            value: 1,
            label: "黄金糕"
          }
        ],
        value0: 0,

        orderNo: "",
        warehouseOptions: [
          {
            value: 0,
            label: "默认仓库"
          },
          {
            value: 1,
            label: "黄金糕"
          }
        ],
        value1: 0,

        orderStateOptions: [
          {
            value: 0,
            label: "全部"
          },
          {
            value: 1,
            label: "黄金糕"
          }
        ],
        value2: 0,
        phonenumber: "",
        name: ""
      },
      // 页面表单数据
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          no: 1,
          orderNum: 99999,
          username: "小明",
          goodsInfo: "纸杯",
          overbookingTime: "2016-05-02",
          money1: 3000,
          money2: 300,
          payTime: "2016-05-02",
          address: "上海市普陀区金沙江路 1518 弄",
          createTime: "2016-05-02",
          lastModifyTime: "2016-05-02",
          orderState: "未完成",
          orderNote: "0000"
        }
      ],
      auditing: false,
      addGoods: false,
      order: false,
      activeName: "first"
    };
  },
  created() {
    this.getDepartmentList();
  },
  methods: {
    async getDepartmentList() {
      const { data: res } = await this.$http.post("sys/dept/list", {
        params: this.chaDepartmentForm
      });
      this.total = res.body.total;
      this.departmentList = res.body.rows;
    },
    handleSizeChange(val) {
      this.chaDepartmentForm.pageSize = val;
      console.log(`每页 ${val} 条`);
      this.getDepartmentList();
    },
    handleCurrentChange(val) {
      this.chaDepartmentForm.pageCode = val;
      console.log(`当前页: ${val}`);
      this.currentPage = val;
      this.getDepartmentList();
    },
    addDepartment() {
      this.$refs.addDepartmentRef.validate(async valid => {
        if (!valid) return;
        const { data: res } = await this.$http.post(
          "sys/dept/save",
          this.addDepartmentForm
        );
        this.$message.success("用户创建成功！");
        this.getDepartmentList();
        this.addbumenDialogVisible = false;
      });
    },
    chaDepartmentResetForm(formName) {
      this.$refs.chaDepartmentRef.resetFields();
      this.getDepartmentList();
    },
    async userStateChanged(userInfo) {
      const { data: res } = await this.$http.post("sys/dept/update", userInfo);
      this.getDepartmentList();
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
      this.getDepartmentList();
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
      this.getDepartmentList();
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
          this.getDepartmentList();
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
    // 标签页函数
    handleClick(tab, event) {
      console.log(tab, event);
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