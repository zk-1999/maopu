<template>
  <div class="min1500">
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>库存管理</el-breadcrumb-item>
      <el-breadcrumb-item>库存查询</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="采购商品" name="first">
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
                <el-form-item label="商品小类型" prop="supgoolsSmalltype">
                  <el-select
                    v-model="chaOrderForm.supgoolsSmalltype"
                    placeholder="请选择"
                    class="_small"
                  >
                    <el-option
                      v-for="item in smallType"
                      :key="item.basicId"
                      :label="item.basicRetainone"
                      :value="item.basicId"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="商品名称" prop="supgoolsId">
                  <el-input class="_small" v-model="chaOrderForm.supgoolsId"></el-input>
                </el-form-item>
                <!-- <el-form-item label="所在仓库" prop="porderState">
                  <el-select v-model="chaOrderFrom" placeholder="请选择" class="_small">
                    <el-option value label="全部"></el-option>
                    <el-option value="0" label="初始化"></el-option>
                    <el-option value="1" label="待初审"></el-option>
                    <el-option value="2" label="初审未通过"></el-option>
                  </el-select>
                </el-form-item>-->

                <el-form-item>
                  <el-button @click="getPurGoodsList(1)">查 询</el-button>
                  <el-button type="primary" @click="ResetForm('chaOrderForm')">重 置</el-button>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>

          <el-table border :data="orderList">
            <!-- <el-table-column type="selection" width="40" align="center"></el-table-column> -->
            <el-table-column type="index" width="50px" align="center" label="序号"></el-table-column>
            <el-table-column prop="supgoolssmallType" label="商品小类型"></el-table-column>
            <el-table-column prop="supgoolsId" label="商品名称"></el-table-column>
            <el-table-column prop="supgoolsSplicing" label="商品描述"></el-table-column>
            <el-table-column prop="kcTotalstock" label="商品库存" width="270px" align="center"></el-table-column>
            <el-table-column prop="pcommodityUnit" label="单位"></el-table-column>
            <!-- <el-table-column prop="xxx" label="仓库名称"></el-table-column> -->
          </el-table>
          <el-pagination
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-size="10"
            layout="total, prev, pager, next"
            :total="total"
          ></el-pagination>
        </el-tab-pane>
        <el-tab-pane label="生产商品" name="second">
          <el-form
            :inline="true"
            class="demo-form-inline search"
            :model="chaProductOrderForm"
            ref="chaProductOrderForm"
            label-width="90px"
            label-position="left"
          >
            <el-row :gutter="20" class="row">
              <el-col :span="24">
                <el-form-item label="商品名称：" prop="productName">
                  <el-input class="_small" v-model="chaProductOrderForm.productName"></el-input>
                </el-form-item>
                <el-form-item label="产品名称：" prop="productType">
                  <el-input class="_small" v-model="chaProductOrderForm.productType"></el-input>
                </el-form-item>
                <el-form-item label="产品类型：" prop="productLeixing">
                  <el-select
                    v-model="chaProductOrderForm.productLeixing"
                    placeholder="请选择"
                    class="_small"
                  >
                    <el-option value label="全部"></el-option>
                    <el-option value="0" label="单层"></el-option>
                    <el-option value="1" label="双层"></el-option>
                    <el-option value="2" label="瓦楞"></el-option>
                    <el-option value="3" label="杯套"></el-option>
                    <el-option value="4" label="手柄"></el-option>
                  </el-select>
                </el-form-item>
                <!-- <el-form-item label="产品规格：" prop="porderArrivalstatus">
                  <el-select v-model="chaOrderFrom" placeholder="请选择" class="_small">
                    <el-option value label="全部"></el-option>
                    <el-option value="0" label="未到货"></el-option>
                    <el-option value="1" label="部分到货"></el-option>
                    <el-option value="2" label="全部到货"></el-option>
                  </el-select>
                </el-form-item>-->

                <el-form-item>
                  <el-button @click="getProGoodsList(1)">查 询</el-button>
                  <el-button type="primary" @click="ResetForm('chaProductOrderForm')">重 置</el-button>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>

          <el-table border :data="orderList" @selection-change="addSelectionChange">
            <!-- <el-table-column type="selection" width="40" align="center"></el-table-column> -->
            <el-table-column type="index" width="50px" align="center" label="序号"></el-table-column>
            <el-table-column prop="productName" label="商品名称"></el-table-column>
            <el-table-column prop="productType" label="产品名称"></el-table-column>
            <el-table-column prop="productLeixing" label="产品类型"></el-table-column>
            <el-table-column prop="productSplicing" label="产品描述" width="400px"></el-table-column>
            <el-table-column prop="kcTotalstock" label="库存" width="270px" align="center"></el-table-column>
            <el-table-column prop="xxx" label="单位"></el-table-column>
            <!-- <el-table-column prop="xxx" label="仓库名称"></el-table-column> -->
          </el-table>
          <el-pagination
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-size="10"
            layout="total, prev, pager, next"
            :total="total"
          ></el-pagination>
        </el-tab-pane>
      </el-tabs>
    </el-card>
    <!-- 新增出库单 -->
    <!-- :title="addOrder?"新增销售订单":"编辑销售订单""  :visible.sync="addOrder || editOrder"-->
    <el-dialog
      :title=" '商品库存手动设置' "
      :visible.sync="addOrder"
      width="60%"
      :before-close="handleClose"
    >
      <!-- 修改库存表单 -->
      <el-form title="库存" inline="true">
        <el-form-item label="商品大类型" prop="porderCode">
          <el-select v-model="chaOrderFrom" placeholder="请选择" class="_small">
            <el-option value label="全部"></el-option>
            <el-option value="0" label="未到货"></el-option>
            <el-option value="1" label="部分到货"></el-option>
            <el-option value="2" label="全部到货"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品小类型" prop="porderProducer">
          <el-select v-model="chaOrderFrom" placeholder="请选择" class="_small">
            <el-option value label="全部"></el-option>
            <el-option value="0" label="未到货"></el-option>
            <el-option value="1" label="部分到货"></el-option>
            <el-option value="2" label="全部到货"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品名称" prop="porderArrivalstatus">
          <el-select v-model="chaOrderFrom" placeholder="请选择" class="_small">
            <el-option value label="全部"></el-option>
            <el-option value="0" label="未到货"></el-option>
            <el-option value="1" label="部分到货"></el-option>
            <el-option value="2" label="全部到货"></el-option>
          </el-select>
        </el-form-item>
        <!-- 3个按钮 -->
        <el-form-item>
          <el-button type="primary" size="small" class="mar">查 询</el-button>
        </el-form-item>
        <hr />

        <!-- 带有排序功能的商品table -->
        <!-- :default-sort="{prop: 'date', order: 'descending'}" -->
        <el-table :data="goodsData" style="width: 100%">
          <!-- <el-table-column prop="date" label="日期" sortable width="180"></el-table-column>
              <el-table-column prop="name" label="姓名" sortable width="180"></el-table-column>
          <el-table-column prop="address" label="地址" :formatter="formatter"></el-table-column>-->

          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop label="商品名称"></el-table-column>
          <el-table-column prop label="商品库存"></el-table-column>
          <el-table-column prop label="单位"></el-table-column>
          <el-table-column prop label="仓库"></el-table-column>
          <el-table-column prop label="修改数量">
            <template slot-scope="scope">
              <el-input v-model="scope.row.pcommodityPrice" @blur="addCalculate(addOrderForm)"></el-input>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-size="10"
          layout="total,  prev, pager, next"
          :total="total"
        ></el-pagination>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addCancel()">取 消</el-button>
        <el-button @click="addSave" type="primary">确 认</el-button>
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
      currentPage: 0,
      total: 0,
      selectedList: [],
      title: "",

      unit: [], //单位数组

      activeName: "first", //默认标签页
      chaOrderForm: {
        //查询表单
        supgoolsSmalltype: "", //商品小类型
        supgoolsId: "", //商品名称
        suppliergoolsId: "", //采购商品id
        pageCode: 0,
        pageSize: 10
      },
      chaOrder: {},

      smallType: [], //商品小类型
      orderList: [], //页面商品
      total: 0,

      // 生产商品
      chaProductOrderForm: {
        productName: "", //商品名称
        productType: "", //产品名称
        productLeixing: "", //产品类型
        productgoodsId: "", //生产商品id
        pageCode: 1,
        pageSize: 10
      },
      // 实际查询数据
      chaProductOrder: {}
    };
  },
  created() {
    //自己写的方法
    this.getWarehouseOptions();
    this.querySmallType();
    this.getPurGoodsList(1);
    this.queryUnit();
  },
  methods: {
    // 查询库存单位
    async queryUnit() {
      const { data: res } = await this.$http.post("jc/Basic/selectstorenum");
      console.log("单位");
      console.log(res);
      this.unit = res;
    },
    // 表单重置
    ResetForm(formName) {
      this.$refs[formName].resetFields();
    },
    async userStateChanged(userInfo) {
      const { data: res } = await this.$http.post("sys/dept/update", userInfo);
      // this.getDepartmentList();
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
    handleSizeChange(val) {
      this.salesOrdermanagementForm.pageSize = val;
      console.log(`每页 ${val} 条`);
      this.queryOrderList();
    },
    handleCurrentChange(val) {
      this.chaOrder.pageCode = val;
      this.getPurGoodsList();
    },

    // 查询商品小类型
    async querySmallType() {
      const { data: res } = await this.$http.post("jc/Basic/selectxiaoleixing");
      // this.getDepartmentList();
      this.smallType = res;
    },
    async getPurGoodsList(val) {
      if (val) {
        // 重新点击时，需要重置查询页数
        this.chaOrderForm.pageCode = 1;
        this.chaOrder = JSON.parse(JSON.stringify(this.chaOrderForm));
      }
      const { data: res } = await this.$http.post(
        "kc/stock/selectstock",
        this.chaOrder
      );
      let orderListMsg = res.body.rows;

      console.log("orderListMsg");
      console.log(orderListMsg);
      console.log("this.unit");
      console.log(this.unit);
      // 封装单位
      orderListMsg.forEach((item, index, array) => {
        this.unit.forEach((u, index2, array2) => {
          if (item.pcommodityUnit != null && item.pcommodityUnit == u.basicId) {
            item.pcommodityUnit = u.basicRetainone;
          }
        });
      });

      let ids = [];
      orderListMsg.forEach((item, index, array) => {
        ids.push(item.suppliergoolsId);
      });
      console.log("ids");
      console.log(ids);
      const { data: res1 } = await this.$http.post(
        "jc/suppliergoods/selectSuppliergoolslistmore",
        ids
      );
      console.log("res1");
      console.log(res1);
      orderListMsg.forEach((item, index, array) => {
        res1.forEach((good, index2, array2) => {
          if (item.suppliergoolsId == good.suppliergoolsId) {
            item.supgoolsId = good.supgoolsId;
            item.supgoolssmallType = good.supgoolssmallType;
            item.supgoolsSplicing = good.supgoolsSplicing;
          }
        });
      });

      this.orderList = orderListMsg;

      console.log(this.orderList);

      this.total = res.body.total;
    },

    // 生产商品 方法
    async getProGoodsList(val) {
      if (val) {
        // 重新点击时，需要重置查询页数
        this.chaProductOrderForm.pageCode = 1;
        this.chaProductOrder = JSON.parse(
          JSON.stringify(this.chaProductOrderForm)
        );
      }
      const { data: res } = await this.$http.post(
        "kc/stock/scselectstock",
        this.chaProductOrder
      );
      let orderListMsg = res.body.rows;

      // 根据id数组查询生产商品
      let ids = [];
      orderListMsg.forEach((item, index, array) => {
        ids.push(item.productgoodsId);
      });
      console.log("ids");
      console.log(ids);
      const { data: res1 } = await this.$http.post(
        "/jc/Produconggoods/selectall",
        ids
      );

      orderListMsg.forEach((item, index, array) => {
        res1.forEach((good, index, array) => {
          if(item.productgoodsId == good.productgoodsId){
            item.productName = good.productName
            item.productType = good.productType

            if(good.productLeixing == 0){
              item.productLeixing = "单层"
            }else if(good.productLeixing == 1){
              item.productLeixing = "双层"
            }else if(good.productLeixing == 2){
              item.productLeixing = "瓦楞"
            }else if(good.productLeixing == 3){
              item.productLeixing = "杯套"
            }else if(good.productLeixing == 4){
              item.productLeixing = "手柄"
            }
            item.productSplicing = good.productSplicing
          }
        });
      });

      this.total = res.body.total;

      this.orderList = orderListMsg;
    },

    // 处理标签页切换
    handleClick(tab, event) {
      console.log(tab, event);
      if (tab.paneName == "first") {
        // 查询采购订单
        this.getPurGoodsList(1);
      } else if (tab.paneName == "second") {
        // 查询生产订单
        this.getProGoodsList(1);
      }
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
.el-form-item {
  ._small {
    width: 150px;
  }
}
</style>  