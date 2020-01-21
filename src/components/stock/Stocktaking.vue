<template>
  <div class="min1500">
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>库存管理</el-breadcrumb-item>
      <el-breadcrumb-item>库存盘点</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="原材料" name="first"></el-tab-pane>
        <el-tab-pane label="成品" name="second"></el-tab-pane>
        <el-tab-pane label="半成品" name="third"></el-tab-pane>
        <el-form
          :inline="true"
          class="demo-form-inline search"
          :model="chaOrderForm"
          ref="chaOrderForm"
          label-width="90px"
          label-position="left"
        >
          <el-row :gutter="20" class="row">
            <el-col :span="24">
              <el-form-item label="盘点单号：" prop="inventoryReceipt">
                <el-input class="_small" v-model="chaOrderForm.inventoryReceipt"></el-input>
              </el-form-item>
              <!-- <el-form-item label="审核人：" prop="porderCode">
                  <el-input></el-input>
              </el-form-item>-->
              <el-form-item label="制单人：" prop="inventoryProducer">
                <el-input class="_small" v-model="chaOrderForm.inventoryProducer"></el-input>
              </el-form-item>
              <el-form-item label="选择仓库：" prop="basicId">
                <el-select v-model="chaOrderForm.basicId" placeholder="请选择" class="_small">
                  <el-option
                    v-for="item in warehouseOptions"
                    :key="item.basicId"
                    :label="item.basicRetainone"
                    :value="item.basicId"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="盘点时间：" prop="inventoryTime">
                <el-date-picker
                  v-model="chaOrderForm.inventoryTime"
                  type="daterange"
                  value-format="yyyy-MM-dd"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                ></el-date-picker>
              </el-form-item>

              <el-form-item>
                <el-button @click="getList(1)">查 询</el-button>
                <el-button type="primary" @click="ResetForm('chaOrderForm')">重 置</el-button>
                <!-- <el-button type="primary" @click="addOrderVisible = true">重 置</el-button> -->
                <!-- <el-button type="primary" @click="editOrderVisible = true">重 置</el-button> -->
                <!-- <el-button type="primary" @click="editOrderVisible = true;lookUpState = true">重 置</el-button> -->
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>

        <el-button type="success" @click="addOrder = true;getCookie();">新 增</el-button>

        <el-table border :data="orderList">
          <!-- <el-table-column type="selection" width="40" align="center"></el-table-column> -->
          <el-table-column type="index" width="50px" align="center" label="序号"></el-table-column>
          <el-table-column prop="inventoryReceipt" label="盘点单号"></el-table-column>
          <!-- <el-table-column prop="supgoolssmallType" label="商品名称"></el-table-column> -->
          <el-table-column prop="warehouse" label="盘点仓库"></el-table-column>
          <el-table-column prop="inventoryProducer" label="制单人"></el-table-column>
          <el-table-column prop="inventoryTime" label="盘点时间" width="270px" align="center"></el-table-column>
          <el-table-column prop="inventoryOrdertime" label="制单时间" width="270px" align="center"></el-table-column>
          <!-- <el-table-column prop="supgoolsSplicing" label="盘点前库存" width="270px" align="center"></el-table-column> -->
          <!-- <el-table-column prop="supgoolsSplicing" label="盘点后库存" width="270px" align="center"></el-table-column> -->
          <!-- <el-table-column prop="xxx" label="单位"></el-table-column> -->
          <el-table-column prop="inventoryRemark" label="备注"></el-table-column>
          <el-table-column label="操作" width="90px" align="center">
            <template slot-scope="scope">
              <el-button
                type="primary"
                size="mini"
                @click="showEditOrder(scope.row.inventoryReceipt)"
              >查看</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          @current-change="handleCurrentChange"
          :page-size="10"
          layout="total, prev, pager, next"
          :total="total"
          :current-page="currentPage"
        ></el-pagination>
      </el-tabs>
    </el-card>
    <!-- 新增出库单 -->
    <!-- :title="addOrder?"新增销售订单":"编辑销售订单""  :visible.sync="addOrder || editOrder"-->
    <el-dialog
      title="新增盘点单"
      :visible.sync="addOrder"
      width="40%"
      :before-close="handleClose"
      @closed="dialogClosed('addOrderForm')"
    >
      <!-- 修改库存表单 -->
      <el-form
        title="库存"
        :inline="true"
        label-position="left"
        label-width="90px"
        :model="addOrderForm"
        ref="addOrderForm"
      >
        <el-form-item label="选择仓库：" prop="basicId">
          <el-select v-model="addOrderForm.basicId" placeholder="请选择" class="_small">
            <el-option
              v-for="item in warehouseOptions"
              :key="item.basicId"
              :label="item.basicRetainone"
              :value="item.basicId"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="盘点时间：" prop="stringtime">
          <el-date-picker
            v-model="addOrderForm.stringtime"
            type="date"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item>

        <el-form-item label="制单人：" prop="inventoryProducer">
          <el-input v-model="addOrderForm.inventoryProducer" class="_small" :disabled="true"></el-input>
        </el-form-item>

        <br />

        <el-form-item label="备注：" prop="inventoryRemark">
          <el-input type="textarea" style="width:600px" v-model="addOrderForm.inventoryRemark"></el-input>
        </el-form-item>
        <br />

        <el-button type="primary" @click="addGoodsMethod()">添加商品</el-button>
        <el-button @click="deleteGoods()" :disabled="selectedList.length == 0">删除商品</el-button>
        <div v-show="flag == 'first'">
          <el-table
            :data="addOrderForm.inventoryGoolsDos"
            style="width: 100%"
            @selection-change="handleSelectionChange"
          >
            <!-- <el-table-column prop="date" label="日期" sortable width="180"></el-table-column>
              <el-table-column prop="name" label="姓名" sortable width="180"></el-table-column>
            <el-table-column prop="address" label="地址" :formatter="formatter"></el-table-column>-->

            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="supgoolsBigType" label="商品大类型"></el-table-column>
            <el-table-column prop="supgoolssmallType" label="商品小类型"></el-table-column>
            <el-table-column prop="supgoolsId" label="商品名称"></el-table-column>
            <el-table-column prop label="盘点实存">
              <template slot-scope="scope">
                <el-input v-model="scope.row.inventorygoolsStock"></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="kcTotalstock" label="现有库存"></el-table-column>
            <el-table-column prop="unit" label="单位"></el-table-column>
          </el-table>
        </div>
        <div v-show="flag == 'second' || flag == 'third'">
          <el-table
            :data="addOrderForm.inventoryGoolsDos"
            style="width: 100%"
            @selection-change="handleSelectionChange"
            default-expand-all
            class="tb"
          >
            <el-table-column type="selection" width="35" align="center"></el-table-column>
            <el-table-column type="expand" label="展开" width="50">
              <template slot-scope="props">
                <el-form label-position="left" inline class="demo-table-expand">
                  <el-form-item label>{{ props.row ? props.row.productSplicing : '' }}</el-form-item>
                </el-form>
              </template>
            </el-table-column>
            <el-table-column label="商品名称" prop="productName" width="150px"></el-table-column>
            <el-table-column label="产品类别" prop="productType" width="150px"></el-table-column>
            <el-table-column prop label="盘点实存">
              <template slot-scope="scope">
                <el-input v-model="scope.row.inventorygoolsStock"></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="kcTotalstock" label="现有库存"></el-table-column>
            <el-table-column prop="unit" label="单位"></el-table-column>
          </el-table>
        </div>
        <!-- <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-size="10"
          layout="total,  prev, pager, next"
          :total="total"
        ></el-pagination>-->
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addOrder = false">取 消</el-button>
        <el-button @click="addSave()" type="primary">确 认</el-button>
      </span>
    </el-dialog>

    <el-dialog title="查看盘点单" :visible.sync="showVisible" width="40%" :before-close="handleClose">
      <!-- 修改库存表单 -->
      <el-form
        :inline="true"
        class="demo-form-inline search"
        :model="showOrderForm"
        ref="showOrderForm"
        label-width="90px"
        label-position="left"
      >
        <el-form-item label="选择仓库：" prop="warehouse">
          <el-select
            v-model="showOrderForm.basicId"
            placeholder="请选择"
            class="_small"
            :disabled="true"
          >
            <el-option
              v-for="item in warehouseOptions"
              :key="item.basicId"
              :label="item.basicRetainone"
              :value="item.basicId"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="盘点时间：" prop="inventoryTime">
          <el-date-picker
            v-model="showOrderForm.inventoryTime"
            type="date"
            placeholder="选择日期"
            class="_small"
            :disabled="true"
          ></el-date-picker>
        </el-form-item>

        <el-form-item label="制单人：" prop="inventoryProducer">
          <el-input v-model="showOrderForm.inventoryProducer" class="_small" :disabled="true"></el-input>
        </el-form-item>

        <br />

        <el-form-item label="备注：" prop="inventoryRemark">
          <el-input
            type="textarea"
            style="width:600px"
            v-model="showOrderForm.inventoryRemark"
            :disabled="true"
          ></el-input>
        </el-form-item>

        <div v-show="flag == 'first'">

        <!-- 带有排序功能的商品table -->
        <!-- :default-sort="{prop: 'date', order: 'descending'}" -->
        <el-table :data="showOrderForm.inventoryGoolsDos" style="width: 100%">
          <!-- <el-table-column prop="date" label="日期" sortable width="180"></el-table-column>
              <el-table-column prop="name" label="姓名" sortable width="180"></el-table-column>
          <el-table-column prop="address" label="地址" :formatter="formatter"></el-table-column>-->

          <el-table-column prop="supgoolsBigType" label="商品大类型"></el-table-column>
          <el-table-column prop="supgoolssmallType" label="商品小类型"></el-table-column>
          <el-table-column prop="supgoolsId" label="商品名称"></el-table-column>
          <el-table-column prop="inventorygoolsStock" label="盘点实存"></el-table-column>
          <el-table-column prop="kcTotalstock" label="现有库存"></el-table-column>
          <el-table-column prop="unit" label="单位"></el-table-column>
        </el-table>
        </div>
        <div v-show="flag == 'second' || flag == 'third'">
          <el-table
            :data="showOrderForm.inventoryGoolsDos"
            style="width: 100%"
            @selection-change="handleSelectionChange"
            default-expand-all
            class="tb"
          >
            <el-table-column type="selection" width="35" align="center"></el-table-column>
            <el-table-column type="expand" label="展开" width="50">
              <template slot-scope="props">
                <el-form label-position="left" inline class="demo-table-expand">
                  <el-form-item label>{{ props.row ? props.row.productSplicing : '' }}</el-form-item>
                </el-form>
              </template>
            </el-table-column>
            <el-table-column label="商品名称" prop="productName" width="150px"></el-table-column>
            <el-table-column label="产品类别" prop="productType" width="150px"></el-table-column>
            <el-table-column label="盘点实存" prop="inventorygoolsStock" width="150px"></el-table-column>
            <el-table-column label="现有库存" prop="kcTotalstock" width="150px"></el-table-column>
            <el-table-column label="单位" prop="unit" width="150px"></el-table-column>
          </el-table>
        </div>
        <!-- <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-size="10"
          layout="total,  prev, pager, next"
          :total="total"
        ></el-pagination>-->
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showVisible = false">取 消</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="选择商品"
      :visible.sync="visibleOfChooseGoods"
      width="58%"
      :before-close="handleClose"
      @closed="dialogClosed('chooseGoodsForm')"
    >
      <el-form :model="chooseGoodsForm" ref="chooseGoodsForm" :inline="true">
        <el-form-item label="商品大类型：" prop="goodsBigType">
          <el-select
            placeholder="请选择商品"
            v-model="chooseGoodsForm.goodsBigType"
            @change="changeGoodsBigType"
          >
            <el-option value="原纸">原纸</el-option>
            <el-option value="纸箱">纸箱</el-option>
            <el-option value="袋子">袋子</el-option>
            <el-option value="油墨">油墨</el-option>
            <el-option value="其它">其它</el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <el-table border stripe :data="shangpi" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="40"></el-table-column>
        <el-table-column type="index" width="50px" label="序号" align="center"></el-table-column>
        <el-table-column prop="supgoolsId" label="商品名称"></el-table-column>
        <el-table-column prop="supgoolssmallType" label="商品小类型"></el-table-column>
        <el-table-column prop="supgoolsSplicing" label="商品描述"></el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="chooseGoodsFormCancel()">取 消</el-button>
        <el-button @click="chooseGoodsFormSava()" type="primary">保 存</el-button>
      </span>
    </el-dialog>

    <el-dialog
      :title=" '新增生产商品' "
      :visible.sync="addOrdermanagementVisible1"
      width="55%"
      :before-close="handleClose"
      @closed="dialogClosed1"
    >
      <el-form
        ref="shengchantRef"
        label-width="110px"
        :inline="true"
        :model="shengchanFrom"
      >
        <el-form-item label="生产商品类型：" prop="productLeixing">
          <el-select v-model="shengchanFrom.productLeixing" placeholder="请选择">
            <el-option
              v-for="item in shengchan"
              :key="item.id"
              :label="item.value"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-button type="primary" @click="shengchanshangping">查询</el-button>
        <el-table
          :data="shengchanlist"
          style="width: 100%"
          border
          @selection-change="handleSelectionChange"
        >
          <!-- default-expand-all -->
          <el-table-column type="selection" width="35" align="center"></el-table-column>
          <el-table-column type="expand" label="展开" width="50">
            <template slot-scope="props">
              <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label>{{ props.row ? props.row.productSplicing : '' }}</el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column label="商品名称" prop="productName"></el-table-column>
          <el-table-column label="产品名称" prop="productType"></el-table-column>
          <el-table-column label="尺寸" prop="productChanpchic"></el-table-column>
          <el-table-column label="个/包" prop="productInnerbao"></el-table-column>
          <el-table-column label="包/箱" prop="productOutbao"></el-table-column>
          <el-table-column label="个/箱" prop="productOnege"></el-table-column>
          <el-table-column label="外箱尺寸" prop="productSizelength" width="150px">
            <template
              slot-scope="scope"
            >{{scope.row.productSizelength}}*{{scope.row.productSizewide}}*{{scope.row.productSizehight}}</template>
          </el-table-column>
          <el-table-column label="单个克重" prop="productOneke"></el-table-column>
        </el-table>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addOrdermanagementVisible1 = false">取 消</el-button>
        <el-button type="primary" @click="shengchancaigou">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // v:false,
      labelPosition: "right",
      total: 0,
      currentPage:1,
      // 页面表单数据
      addOrder: false,
      editOrder: false,
      addGoods: false,

      activeName: "first", //默认标签页
      addGoodsVisual: false, //添加商品是否可见

      smallType: [], //小类型

      queryGoodsForm: {
        smallType: ""
      },

      // 查询表单
      chaOrderForm: {
        inventoryReceipt: "", //盘点单号
        inventoryProducer: "", //制单人
        basicId: "", //盘点仓库
        inventoryTime: [], //盘点时间
        inventoryType:0,//盘点单类型
        pageCode: 0,
        pageSize: 10
      },
      chaOrder: {},
      unit: [], //单位

      orderList: [],

      showVisible: false, //查看盘点单是否可见
      showOrderForm: {}, //盘点单展示
      warehouseOptions: [], //仓库列表

      addOrderForm: {
        //新增表单
        basicId: "", //仓库id
        stringtime: "", //盘点时间
        inventoryProducer: "", //制单人
        inventoryRemark: "", //备注
        inventoryGoolsDos: [], //商品数组
        inventoryType:0,// 盘点单类型
      },

      visibleOfChooseGoods: false, //选择商品表单是否可见
      chooseGoodsForm: {
        addOrEdit: 0, // 最终选择的商品要去哪 1 添加 2 编辑、查看
        goodsBigType: "原纸", // 商品大类型
        goodsChoosed: [] // 选择商品的集合
      },

      shangpi: [], //商品数组

      selectedList: [],

      flag: "first",

      // --------------生产商品盘点-----------------
      addOrdermanagementVisible: false,
      productgoodsIdList: [], //
      shengchanFrom: {
        productLeixing: ""
      },
      shengchanlist: [],
      shengchan: [
        {
          id: 0,
          value: "单层"
        },
        {
          id: 1,
          value: "双层"
        },
        {
          id: 2,
          value: "瓦楞"
        },
        {
          id: 3,
          value: "杯套"
        },
        {
          id: 4,
          value: "手柄"
        }
      ],
      caigou: [
        {
          id: 0,
          value: "原纸"
        },
        {
          id: 1,
          value: "纸箱"
        },
        {
          id: 2,
          value: "袋子"
        },
        {
          id: 3,
          value: "油墨"
        },
        {
          id: 4,
          value: "其他"
        }
      ],
      addOrdermanagementVisible1: false,
      addOrdermanagementVisible2: false
    };
  },
  created() {
    //自己写的方法
    this.getWarehouseOptions();
    this.querySmallType();
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
    // 查询库存单位
    async queryUnit() {
      const { data: res } = await this.$http.post("jc/Basic/selectstorenum");
      this.unit = res;
    },
    // 获取仓库列表
    async getWarehouseOptions() {
      const { data: res } = await this.$http.post("jc/Basic/selectwarehousing");
      // console.log('仓库')
      // console.log(res)
      this.warehouseOptions = res; //如何取
    },
    // 表单重置
    ResetForm(formName) {
      this.$refs[formName].resetFields();
    },

    //分页相关函数
    handleSizeChange(val) {
      this.salesOrdermanagementForm.pageSize = val;
      console.log(`每页 ${val} 条`);
      this.queryOrderList();
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.chaOrder.pageCode = val;
      this.getList();
    },

    // 查询商品小类型
    async querySmallType() {
      const { data: res } = await this.$http.post("jc/Basic/selectxiaoleixing");
      // this.getDepartmentList();
      this.smallType = res;
    },
    async getList(val) {
      // const { data: res1 } = await this.$http.post("jh/purchase/dtjresultMap");
      // this.chaOrderFrom.pageCode = 1;
      if (val) {
        // 重新点击时，需要重置查询页数
        this.currentPage = 1;
        this.chaOrderForm.pageCode = 1;
        this.chaOrder = JSON.parse(JSON.stringify(this.chaOrderForm));
      }
      const { data: res } = await this.$http.post(
        "kc/inventory/selectInventory",
        this.chaOrder
      );

      this.orderList = res.body.rows;

      this.orderList.forEach((order, index, array) => {
        this.warehouseOptions.forEach((warehouse, index, array) => {
          //
          if (order.basicId == warehouse.basicId) {
            order.warehouse = warehouse.basicRetainone;
          }
        });
      });

      this.total = res.body.total;
    },

    // 查看页面展示
    async showEditOrder(inventoryReceipt) {
      const { data: res } = await this.$http.post("kc/inventory/selectAll", {
        inventoryReceipt: inventoryReceipt
      });
      console.log("----------------------");
      console.log(res);

      let showOrder = res.body.result[0];
      // 仓库
      showOrder.basicId = Number(showOrder.basicId);

      if(this.flag == "first"){//原材料
      // 获取供应商商品数组
      let ids = [];
      showOrder.inventoryGoolsDos.forEach((item, index, array) => {
        ids.push(item.suppliergoolsId);
      });
      // 获取对应供应商品的基础信息
      const { data: res1 } = await this.$http.post(
        "jc/suppliergoods/selectSuppliergoolslistmore",
        ids
      );
      showOrder.inventoryGoolsDos.forEach((good, index, array) => {
        res1.forEach((item, index, array) => {
          if (good.suppliergoolsId == item.suppliergoolsId) {
            good.supgoolsBigType = item.supgoolsBigType;
            good.supgoolssmallType = item.supgoolssmallType;
            good.supgoolsId = item.supgoolsId;
            good.supgoolsSplicing = item.supgoolsSplicing;
          }
        });
      });

      // 封装单位
      showOrder.inventoryGoolsDos.forEach((good, index, array) => {
        this.unit.forEach((item, index, array) => {
          if (good.pcommodityUnit == item.basicId) {
            good.unit = item.basicRetainone;
          }
        });
      });
      }else if(this.flag == "second"){//成品
        let ids = [];
        showOrder.inventoryGoolsDos.forEach((good)=>{
          ids.push(good.productgoodsId)
        })

        // 根据id数组查询生产商品规格
        const { data: res1 } = await this.$http.post(
        "/jc/Produconggoods/selectall",
        ids
      );
        // 规格
        showOrder.inventoryGoolsDos.forEach((good)=>{
          res1.forEach((item)=>{
            if(good.productgoodsId == item.productgoodsId){
              good.productName = item.productName
              good.productType = item.productType
              good.productSplicing = item.productSplicing
            }
          })
        })
      }else if(this.flag == "third"){//半成品
        let ids = [];
        showOrder.inventoryGoolsDos.forEach((good)=>{
          ids.push(good.productgoodsId)
        })

        // 根据id数组查询生产商品规格
        const { data: res1 } = await this.$http.post(
        "/jc/Produconggoods/selectall",
        ids
      );
        // 规格
        showOrder.inventoryGoolsDos.forEach((good)=>{
          res1.forEach((item)=>{
            if(good.productgoodsId == item.productgoodsId){
              good.productName = item.productName
              good.productType = item.productType
              good.productSplicing = item.productSplicing
            }
          })
        })

        console.log("111111111111111111111111")
        console.log(showOrder)
      }

      this.showOrderForm = showOrder;

      this.showVisible = true;
    },

    // 新增盘点单
    async addSave() {
      console.log(this.addOrderForm);
      const { data: res } = await this.$http.post(
        "kc/inventory/createorder",
        this.addOrderForm
      );

      if (res.body.respCode == 200) { 
        this.$message({
          type: "success",
          message: res.body.msg
        });
      } else {
        this.$message({
          type: "info",
          message: res.body.msg
        });
      }

      this.addOrder = false;
      this.getList();
    },

    // 新增表单清空
    dialogClosed(val) {
      this.$refs[val].resetFields();
      // 手动重置
      if (val == "addOrderForm") {
        this.addOrderForm.inventoryGoolsDos = [];
      }
    },

    async changeGoodsBigType(val) {
      const { data: res } = await this.$http.post(
        "jc/suppliergoods/selectSuppliergoolslist",
        { params: { lab: this.chooseGoodsForm.goodsBigType } }
      );
      // console.log(res);
      this.shangpi = res.body.rows;
      this.total = res.body.total;
    },
    // 选择商品表单取消
    chooseGoodsFormCancel() {
      this.visibleOfChooseGoods = false;
      // 手动重置
      this.chooseGoodsForm.addOrEdit = 0;
      this.chooseGoodsForm.goodsBigType = "原纸";
      this.chooseGoodsForm.goodsChoosed = [];

      // this.gongyingshangOfForm = [];
    },
    // 选择商品表单保存
    addGoodsMethod() {
      this.selectedList = [];
      if (this.flag == "first") {
        this.visibleOfChooseGoods = true;
        this.changeGoodsBigType();
      } else if (this.flag == "second" || this.flag == "third") {
        this.shengchanshangping();
      }
    },
    // 选择商品表单保存
    async chooseGoodsFormSava() {
      console.log("---------------------------  ");
      console.log(this.selectedList);

      // 中间量
      let goods = [];
      // this.addOrderForm.inventoryGoolsDos为空
      if (this.addOrderForm.inventoryGoolsDos.length == 0) {
        this.selectedList.map(item => {
          goods.push(item);
        });
      } else {
        // this.addOrderForm.inventoryGoolsDos不为空，可能存在重复情况，需要排重
        let arr = [];

        this.addOrderForm.inventoryGoolsDos.forEach((item, index, array) => {
          goods.push(item);
        });

        let length = this.addOrderForm.inventoryGoolsDos.length;

        let length2 = this.selectedList.length;

        // 外层 selectedList
        for (let i = 0; i < length2; i++) {
          // 内层 this.addOrderForm.inventoryGoolsDos 用其对外层进行校验
          for (let j = 0; j < length; j++) {
            if (
              this.selectedList[i].suppliergoolsId == goods[j].suppliergoolsId
            ) {
              break;
            }
            if (j == length - 1) {
              arr.push(this.selectedList[i]);
            }
          }
        }

        goods = goods.concat(arr);
        let length3 = this.addOrderForm.inventoryGoolsDos.length;

        if (length3 < length + length2) {
          this.$message({
            type: "info",
            message: "部分商品已存在！"
          });
        }
      }

      let ids = [];
      goods.forEach((item, index, array) => {
        ids.push(item.suppliergoolsId);
      });
      // 根据原材料id查询当前库存
      const { data: res } = await this.$http.post(
        "kc/stock/selectkcBygoolsIdA",
        { suppliergoolsId: ids }
      );

      goods.forEach((good, index, array) => {
        res.body.result.forEach((item, index, array) => {
          if (good.suppliergoolsId == item.suppliergoolsId) {
            good.kcTotalstock = item.kcTotalstock;
            good.pcommodityUnit = item.pcommodityUnit;

            this.unit.forEach((item2, index, array) => {
              if (good.pcommodityUnit == item2.basicId) {
                good.unit = item2.basicRetainone;
              }
            });
          }
        });
      });

      console.log(goods);
      this.addOrderForm.inventoryGoolsDos = goods;

      console.log("111111111111111111111111");
      // this.addOrderForm.inventoryGoolsDos = this.selectedList
      console.log(this.addOrderForm.inventoryGoolsDos);
      this.visibleOfChooseGoods = false;
    },

    getCookie() {
      var storage = window.localStorage;
      this.addOrderForm.inventoryProducer = storage.getItem("username");
    },

    deleteGoods() {
      this.selectedList.forEach((delGood, index1, array1) => {
        this.addOrderForm.inventoryGoolsDos.forEach((item, index2, array2) => {
          if (this.flag == "first") {
            if (delGood.suppliergoolsId == item.suppliergoolsId) {
              this.addOrderForm.inventoryGoolsDos.splice(index2, 1);
            }
          } else if (this.flag == "second") {
            if (delGood.productgoodsId == item.productgoodsId) {
              this.addOrderForm.inventoryGoolsDos.splice(index2, 1);
            }
          }
        });
      });
    },

    // 处理标签页切换
    handleClick(tab, event) {
      this.flag = tab.paneName;
      if( tab.paneName == "first"){
        this.chaOrderForm.inventoryType = 0;
        this.addOrderForm.inventoryType = 0
      }else if(tab.paneName == "second"){
        this.chaOrderForm.inventoryType = 1;
        this.addOrderForm.inventoryType = 1;
      }else if(tab.paneName == "third"){
        this.chaOrderForm.inventoryType = 2;
        this.addOrderForm.inventoryType = 2;
      }
      this.ResetForm('chaOrderForm')
      this.getList(1)
    },

    // ---------------------生产商品部分----------------------
    async shengchanshangping() {
      //  if (this.addOrdermanagementVisible == true) {// 判断是否为编辑
      this.productgoodsIdList = this.addOrderForm.inventoryGoolsDos.map(
        item => {
          return item.productgoodsId;
        }
      );
      // } else {
      //   console.log('--------------');

      //   console.log(this.addOrderForm.inventoryGoolsDos);

      //   this.productgoodsIdList = this.editOrdermanagementForm.commodityListDOs.map(
      //     item => {

      //       return parseInt(item.productgoodsId);
      //     }
      //   );
      // }
      const { data: res } = await this.$http.post(
        "jc/Produconggoods/selectProducing",
        this.shengchanFrom
      );
      console.log(res);
      this.shengchanlist = res.body.rows;
      this.addOrdermanagementVisible1 = true;
    },
    async shengchancaigou() {

      // 先对selectList进行处理，获取对应库存、单位
      let ids = []
      this.selectedList.forEach((item)=>{
        ids.push(item.productgoodsId)
      })

      if(this.flag == "second"){// 成品库存
        const { data: res } = await this.$http.post(
        "kc/stock/selectkcBygoolsIdB",
        {productgoodsId:ids}
      );
        this.selectedList.forEach((item)=>{
          res.body.result.forEach((productGood)=>{
            if(item.productgoodsId == productGood.productgoodsId){
          //  库存
              item.kcTotalstock = productGood.kcTotalstock
          //  单位？？？
            }
        })
      })
      }else if(this.flag == "third"){// 半成品库存
        const { data: res } = await this.$http.post(
        "kc/stock/selectkcBygoolsIdC",
        {productgoodsId1:ids}
        );
        this.selectedList.forEach((item)=>{
          res.body.result.forEach((productGood)=>{
            if(item.productgoodsId == productGood.productgoodsId1){
          //  库存
              item.kcTotalstock = productGood.kcTotalstock
          //  单位？？？
            }
          })
        })
      }
      
     

      var chongfu = 0;
      // ||this.editOrdermanagementForm.commodityListDOs.length>=1
      if (this.addOrderForm.inventoryGoolsDos.length >= 1) {
        if (this.addOrdermanagementVisible1 == true) {
          const needAdd = [];
          this.selectedList.forEach(item => {
            if (this.productgoodsIdList.indexOf(item.productgoodsId) === -1) {
              needAdd.push(item);
            } else {
              chongfu++;
            }
          });
          console.log("needAdd");
          console.log(needAdd);
          this.addOrderForm.inventoryGoolsDos = [
            ...this.addOrderForm.inventoryGoolsDos,
            ...needAdd
          ];
        }
        // else if(this.editOrdermanagementVisible==true){
        //   const needAdd = [];
        // this.selectedList.forEach(item => {
        //   if (this.productgoodsIdList.indexOf(item.productgoodsId) === -1) {
        //     needAdd.push(item);
        //   } else {
        //     chongfu ++;
        //   }
        // });
        // this.editOrdermanagementForm.commodityListDOs = [
        //   ...this.editOrdermanagementForm.commodityListDOs,
        //   ...needAdd
        // ];
        // }
      } else {
        console.log("++++++++++++++++++++");
        for (let index = 0; index < this.selectedList.length; index++) {
          if (this.addOrdermanagementVisible1 == true) {
            this.addOrderForm.inventoryGoolsDos.push(this.selectedList[index]);
          }
          //   else if(this.editOrdermanagementVisible==true){
          //     this.editOrdermanagementForm.commodityListDOs.push(this.selectedList[index]);
          // }
        }
        console.log(this.selectedList);
        console.log(this.addOrderForm.inventoryGoolsDos);
      }
      const charu = this.selectedList.length - chongfu;
      this.$message({
        type: "info",
        message:
          chongfu > 0
            ? `此次添加有重复数据，重复数据${chongfu}条，成功插入${charu}条`
            : `此次成功插入${charu}条`
      });
      console.log("---------------------------------");
      console.log(this.addOrderForm.inventoryGoolsDos);
      console.log("---------------------------------");
      console.log(this.selectedList);
      this.addOrdermanagementVisible1 = false;
      this.addOrdermanagementVisible2 = false;
      //   this.editOrdermanagementVisible1=false;
      //  this.editOrdermanagementVisible2=false;
    },
    dialogClosed1(){
      this.$refs.shengchantRef.resetFields();
      this.selectedList = [];
      console.log("this.selectedList")
      console.log(this.selectedList)
    },
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
.el-form-item {
  ._small {
    width: 150px;
  }
}
.demo-table-expand {
  text-align: center;
  .el-form-item {
    margin-bottom: 0px;
  }
}
</style>  