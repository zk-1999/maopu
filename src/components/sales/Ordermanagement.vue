<template>
  <div class="min1500">
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>销售管理</el-breadcrumb-item>
      <el-breadcrumb-item>合同订单管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <!-- <el-row :gutter="20"> -->
      <!-- ref作用？？ -->
      <!-- ref="salesOrdermanagementForm" -->
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
        <!-- 订单状态 -->
        <el-form-item label="订单状态" class="mar">
          <el-select v-model="salesOrdermanagementForm.state" class="hu">
            <el-option value="0">初始化</el-option>
            <el-option value="1">待审核</el-option>
            <el-option value="2">初审不通过</el-option>
            <el-option value="3">复审不通过</el-option>
          </el-select>
        </el-form-item>
        <!-- 手机号码 -->
        <el-form-item label="手机号码" class="mar" prop="phoneNumber">
          <el-input v-model="salesOrdermanagementForm.phoneNumber" class="hu"></el-input>
        </el-form-item>
        <!-- 收货姓名 -->
        <el-form-item label="收货姓名" class="mar">
          <el-input v-model="salesOrdermanagementForm.name" class="hu"></el-input>
        </el-form-item>
        <!-- 收货省份 -->
        <el-form-item label="收货省份" class="mar">
          <el-input v-model="salesOrdermanagementForm.province" class="hu"></el-input>
        </el-form-item>
        <!-- 查询按钮 -->
        <el-form-item class="mar">
          <el-button type="primary" size="small" @click="queryOrderList">查 询</el-button>
          <el-button type="primary" size="small" @click="resetForm('salesOrdermanagementForm')">重 置</el-button>
        </el-form-item>
      </el-form>
      <!-- </el-row> -->
      <!-- 4个按钮 -->
      <el-button type="primary" size="small" @click="addOrder = true">新 建</el-button>
      <!-- 表格 -->
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        border
        @selection-change="handleSelectionChange"
      >
        <!-- <el-table-column label="序号" width="120">
          <template slot-scope="scope">{{ scope.row.no }}</template>
        </el-table-column>-->

        <el-table-column prop="no" label="序号"></el-table-column>
        <el-table-column prop="orderNum" label="订单号"></el-table-column>
        <el-table-column prop="username" label="客户名称"></el-table-column>
        <el-table-column prop="goodsInfo" label="商品信息"></el-table-column>
        <el-table-column prop="overbookingTime" label="下单时间"></el-table-column>
        <el-table-column prop="money1" label="总金额"></el-table-column>
        <el-table-column prop="money2" label="预付金额"></el-table-column>
        <el-table-column prop="payTime" label="付款时间"></el-table-column>
        <el-table-column prop="address" label="收货地址" show-overflow-tooltip></el-table-column>
        <!-- <el-table-column prop="createTime" label="创建时间"></el-table-column> -->
        <el-table-column prop="lastModifyTime" label="最后修改时间"></el-table-column>
        <el-table-column prop="orderState" label="订单状态"></el-table-column>
        <el-table-column prop="orderNote" label="订单备注"></el-table-column>
        <el-table-column label="操作" width="240px" style="text-align:center">
          <template slot-scope="scope">
            <el-button @click="checkOrder(scope.row.orderNum)" type="primary" size="small" v-if="scope.row.orderState==='未完成'">提 审</el-button>
            <!-- v-if="scope.row.orderState!=='未完成' -->
            <el-button @click="editOrder(scope.row.orderNum)" type="primary" size="small">编 辑</el-button>
            <el-button @click="deleteOrder(scope.row.orderNum)" type="danger" size="small">删 除</el-button>
          </template>
        </el-table-column>
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
        :page-sizes="[10]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>
    <!-- 新增销售订单 -->
    <!-- :title="addOrder?"新增销售订单":"编辑销售订单""  :visible.sync="addOrder || editOrder"-->
    <el-dialog :title=" '新增销售订单' " :visible.sync="addOrder" width="60%" :before-close="handleClose">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="基础信息" name="first">
          <!-- 新增销售订单表格 -->
          <el-form title="订单" inline="true" label-width="90px">
            <el-button type="primary" size="small" @click="addGoods = true">添加产品</el-button>
            <hr />

            <!-- 带有排序功能的商品table -->
            <!-- :default-sort="{prop: 'date', order: 'descending'}" -->
            <el-table :data="goodsData" style="width: 100%">
              <!-- <el-table-column prop="date" label="日期" sortable width="180"></el-table-column>
              <el-table-column prop="name" label="姓名" sortable width="180"></el-table-column>
              <el-table-column prop="address" label="地址" :formatter="formatter"></el-table-column>-->

              <el-table-column prop="productName" label="产品名称"></el-table-column>
              <el-table-column prop="productNum" label="产品编码"></el-table-column>
              <el-table-column prop="productType" label="产品类型"></el-table-column>
              <el-table-column prop="productType" label="产品规格"></el-table-column>
              <el-table-column label="成本价" sortable>
                <template slot-scope="scope">
                  <el-input v-model="scope.row.productionCost"></el-input>
                </template>
              </el-table-column>
              <el-table-column label="单价" sortable>
                <template slot-scope="scope">
                  <el-input v-model="scope.row.unitPrice"></el-input>
                </template>
              </el-table-column>
              <el-table-column label="数量" sortable>
                <template slot-scope="scope">
                  <el-input v-model="scope.row.salesQuantity"></el-input>
                </template>
              </el-table-column>
              <el-table-column label="金额" sortable>
                <template slot-scope="scope">
                  <el-input v-model="scope.row.sumMoney"></el-input>
                </template>
              </el-table-column>
              <el-table-column label="备注">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.note"></el-input>
                </template>
              </el-table-column>
              <el-table-column prop="operate" label="操作">
                <el-button type="danger" size="small">删 除</el-button>
              </el-table-column>
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

            <!-- 分割线 -->
            <hr />

            <!-- 对齐 -->
            <el-row>
              <el-col :span="10">
                <el-form-item label="总数量">
                  <el-input class="dialogl"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item label="快递费">
                  <el-input class="dialogl"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="10">
                <el-form-item label="总金额">
                  <el-input class="dialogl"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item label="运费">
                  <el-input class="dialogl"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="10">
                <el-form-item label="货币类型">
                  <el-select v-model="value" placeholder="请选择" class="dialogl">
                    <el-option>人民币</el-option>
                    <el-option>美元</el-option>
                    <el-option>英镑</el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item label="版费">
                  <el-input class="dialogl"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="10">
                <el-form-item label="预付款金额">
                  <el-input class="dialogl"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item label="小单费">
                  <el-input class="dialogl"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="10">
                <el-form-item label="客户名称">
                  <el-select v-model="value" placeholder="请选择" class="dialogl">
                    <el-option>人民币</el-option>
                    <el-option>美元</el-option>
                    <el-option>英镑</el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item label="订单说明">
                  <el-input type="text"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="10">
                <el-form-item label="合计">
                  <el-input class="dialogl"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <hr />
            <!-- 收款信息 -->
            <el-table :data="goodsData222" style="width: 100%">
              <!-- <el-table-column prop="date" label="日期" sortable width="180"></el-table-column>
              <el-table-column prop="name" label="姓名" sortable width="180"></el-table-column>
              <el-table-column prop="address" label="地址" :formatter="formatter"></el-table-column>-->

              <el-table-column prop="productName" label="收款类型"></el-table-column>
              <el-table-column prop="productNum" label="金额">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.productionCost"></el-input>
                </template>
              </el-table-column>
              <el-table-column prop="productType" label=收款单号>
                <template slot-scope="scope">
                  <el-input v-model="scope.row.productionCost"></el-input>
                </template>
              </el-table-column>
              <el-table-column prop="productType" label="操作时间">

              </el-table-column>
              <el-table-column prop="productType" label="备注">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.productionCost"></el-input>
                </template>
              </el-table-column>

            </el-table>

            <el-form-item label="付款状态">
              <el-input class="hu"></el-input>
            </el-form-item>
            <el-form-item label="付款时间">
              <el-input class="hu"></el-input>
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
            <el-form-item label="备注">
              <el-input class="hu"></el-input>
            </el-form-item>

            <el-form-item label="省市区">
              <el-select v-model="value" placeholder="请选择" class="hu"></el-select>
              <el-select v-model="value" placeholder="请选择" class="hu"></el-select>
              <el-select v-model="value" placeholder="请选择" class="hu"></el-select>
            </el-form-item>

            <el-form-item label="发货时间">
              <el-date-picker v-model="value1" type="date" placeholder="选择日期"></el-date-picker>
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
            
            <el-row>
              <div style="margin-left:600px">
                <el-button type="primary" size="small">保 存</el-button>
                <el-button type="primary" size="small">提 交</el-button>
                <el-button type="primary" size="small">取 消</el-button>
              </div>
            </el-row>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="折消单信息" name="second">折消单信息</el-tab-pane>
      </el-tabs>
    </el-dialog>
    <!-- 编辑销售订单 -->
    <el-dialog
      :title=" '编辑销售订单' "
      :visible.sync="editOrder"
      width="60%"
      :before-close="handleClose"
    >
      <!-- 新增销售订单表格 -->
      <el-form title="订单" inline="true">
        <el-button type="primary" size="small" @click="addGoods = true">添加产品</el-button>
        <hr />

        <!-- 带有排序功能的商品table -->
        <!-- :default-sort="{prop: 'date', order: 'descending'}" -->
        <el-table :data="goodsData" style="width: 100%">
          <!-- <el-table-column prop="date" label="日期" sortable width="180"></el-table-column>
              <el-table-column prop="name" label="姓名" sortable width="180"></el-table-column>
          <el-table-column prop="address" label="地址" :formatter="formatter"></el-table-column>-->

          <el-table-column prop="productName" label="产品名称"></el-table-column>
          <el-table-column prop="productNum" label="产品编码"></el-table-column>
          <el-table-column prop="productType" label="产品类型"></el-table-column>
          <el-table-column prop="unitPrice" label="单价" sortable></el-table-column>
          <el-table-column prop="salesQuantity" label="销售数量" sortable></el-table-column>
          <el-table-column prop="sumMoney" label="总金额" sortable></el-table-column>
          <el-table-column prop="note" label="备注"></el-table-column>
          <el-table-column prop="operate" label="操作">
            <el-button type="danger" size="small">删 除</el-button>
          </el-table-column>
        </el-table>
        <!-- @prev-click="handlePrevClick"
        @next-click="handleNextClick"-->
        <!-- 数据需要双向绑定，这样绑定是否正确 -->
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
        <el-form-item label="付款状态" style=" margin: 15px 0px;">
          <el-select v-model="value" placeholder="请选择" class="hu">
            <el-option>初始化</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="货币类型" style=" margin: 15px 0px;">
          <el-select v-model="value" placeholder="请选择" class="hu">
            <el-option>人民币</el-option>
            <el-option>美元</el-option>
            <el-option>英镑</el-option>
          </el-select>
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

        <hr />

        <el-form-item label="客户名称">
          <el-input class="hu"></el-input>
        </el-form-item>

        <hr />

        <el-form-item label="订单说明">
          <el-input style="width:300px"></el-input>
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
        <el-form-item label="备注">
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

        <el-form-item label="发货时间">
          <el-date-picker v-model="value1" type="date" placeholder="选择日期"></el-date-picker>
        </el-form-item>

        <el-row>
          <div style="margin-left:600px">
            <el-button type="primary" size="small">保 存</el-button>
            <el-button type="primary" size="small">提 交</el-button>
            <el-button type="primary" size="small">取 消</el-button>
          </div>
        </el-row>
      </el-form>
    </el-dialog>

    <!-- 添加产品 -->
    <el-dialog title="添加产品" :visible.sync="addGoods" width="70%" :before-close="handleClose">
      <el-card>
        <!-- 需要进行提交 -->
        <el-form inline="true">
          <el-row>
            <!-- 查询表格 -->
            <el-form-item label="产品名称">
              <el-select v-model="value" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="产品类型">
              <el-select>
                <el-option></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="产品编号">
              <el-select v-model="value" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="small">查 询</el-button>
              <el-button type="primary" size="small">重 置</el-button>
            </el-form-item>
          </el-row>
        </el-form>
        <el-table
          ref="multipleTable"
          :data="[]"
          tooltip-effect="dark"
          style="width: 100%"
          border
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column label="产品名称">
            <template slot-scope="scope">{{ scope.row.date }}</template>
          </el-table-column>
          <el-table-column label="产品编码"></el-table-column>
          <el-table-column label="产品类型"></el-table-column>
        </el-table>
        <el-button type="primary" size="small" class="btn">添 加</el-button>
      </el-card>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // v:false,
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
        // 要发送的真实字段
        orderNum: "", //订单号
        select: "1", //订单号类型选择
        warehouse: "", //仓库
        pageCode: 1, //当前页
        pageSize: 10, //每页显示的记录数
        state: "",
        phoneNumber: "",
        name: "",
        province: ""
      },
      // 仓库列表
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
      //订单状态列表（不完全）
      orderStateOptions: [
        {
          value: 0,
          label: "初始化"
        },
        {
          value: 1,
          label: "已付款"
        },
        {
          value: 1,
          label: "已完成"
        }
      ],
      //分页相关数据
      //currentPage:0,
      total: 0,
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
        },
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
        },
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
        },
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
        },
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
        },
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
        },
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
        },
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
      addOrder: false,
      editOrder: false,
      addGoods: false,
      addOrderForm: {
        activeName: "first"
      },
      goodsData: [
        {
          productName: "娃哈哈",
          productNum: "12121212",
          productType: "饮料",
          // 产品规格
          productSpecs: "500ml",
          productionCost: "",
          unitPrice: "",
          salesQuantity: "",
          sumMoney: "",
          note: "哈哈哈哈哈",
          opetate: ""
        },
        {
          productName: "王老吉",
          productNum: "12121212",
          productType: "饮料",
          // 产品规格
          productSpecs: "300ml",
          productionCost: "",
          unitPrice: "",
          salesQuantity: "",
          sumMoney: "",
          note: "哈哈哈哈哈",
          opetate: ""
        }
      ],
      title: "",
      // 标签页选择
      activeName: "first"
    };
  },
  created() {
    //自己写的方法
    this.getWarehouseOptions();

    this.getDepartmentList();
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

    resetForm(formName) {
      this.$refs[formName].resetFields();
      // this.$refs[formName].resetFields();
    },

    //分页相关函数
    handleSizeChange(val) {
      this.salesOrdermanagementForm.pageSize = val;
      console.log(`每页 ${val} 条`);
      this.queryOrderList();
    },
    handleCurrentChange(val) {
      this.salesOrdermanagementForm.pageCode = val;
      console.log(`当前页: ${val}`);
      this.currentPage = val;
      this.queryOrderList();
    },
    handleEdit(index, row) {
      console.log(row); // , row
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
// .a {
//   text-align: right;
// }
// dialog输入框长度
.dialogl {
  width: 80%;
}
</style>  