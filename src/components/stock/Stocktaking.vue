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
        <el-tab-pane label="原材料" name="first">
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
                <el-form-item label="盘点单号" prop="porderCode">
                  <el-input></el-input>
                </el-form-item>
                <el-form-item label="审核人" prop="porderCode">
                  <el-input></el-input>
                </el-form-item>
                <el-form-item label="制单人" prop="porderCode">
                  <el-input></el-input>
                </el-form-item>
                <el-form-item label="选择仓库" prop="porderProducer">
                  <el-select v-model="chaOrderFrom" placeholder="请选择" class="_small">
                    <el-option value label="全部"></el-option>
                    <el-option value="0" label="未到货"></el-option>
                    <el-option value="1" label="部分到货"></el-option>
                    <el-option value="2" label="全部到货"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="盘点时间" prop="time">
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
                  <!-- <el-button type="primary" @click="addOrderVisible = true">重 置</el-button> -->
                  <!-- <el-button type="primary" @click="editOrderVisible = true">重 置</el-button> -->
                  <!-- <el-button type="primary" @click="editOrderVisible = true;lookUpState = true">重 置</el-button> -->
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>

          <el-button type="success" @click="addOrder = true">新 增</el-button>

          <el-table
            border
            :data="addOrderForm.pcommodityDos"
            @selection-change="addSelectionChange"
          >
            <!-- <el-table-column type="selection" width="40" align="center"></el-table-column> -->
            <el-table-column type="index" width="50px" align="center" label="序号"></el-table-column>
            <el-table-column prop="supgoolssmallType" label="盘点单号"></el-table-column>
            <el-table-column prop="supgoolssmallType" label="商品名称"></el-table-column>
            <el-table-column prop="supgoolsId" label="盘点仓库"></el-table-column>
            <el-table-column prop="supgoolsId" label="制单人"></el-table-column>
            <el-table-column prop="supgoolsSplicing" label="盘点时间" width="270px" align="center"></el-table-column>
            <el-table-column prop="xxx" label="备注"></el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="成品" name="second">
          
        </el-tab-pane>
      </el-tabs>
    </el-card>
    <!-- 新增出库单 -->
    <!-- :title="addOrder?"新增销售订单":"编辑销售订单""  :visible.sync="addOrder || editOrder"-->
    <el-dialog
      :title=" '商品库存手动设置' "
      :visible.sync="addOrder"
      width="40%"
      :before-close="handleClose"
    >
      <!-- 修改库存表单 -->
      <el-form title="库存" inline="true">
        <el-form-item label="选择仓库" prop="porderCode">
          <el-select v-model="chaOrderFrom" placeholder="请选择" class="_small">
            <el-option value label="全部"></el-option>
            <el-option value="0" label="未到货"></el-option>
            <el-option value="1" label="部分到货"></el-option>
            <el-option value="2" label="全部到货"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="盘点时间" prop="time">
          <el-date-picker
            v-model="chaOrderFrom.time"
            type="daterange"
            value-format="yyyy-MM-dd"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </el-form-item>

        <el-form-item label="盘点单号" prop="porderCode">
                  <el-input type="textarea" style="width:600px"></el-input>
                </el-form-item>

        <br>

        <el-button type="primary" @click="addGoods(1)">添加商品</el-button>
        <el-button
          type="danger"
          @click="deleteAddbumen(addOrderForm.pcommodityDos,1)"
        >删除商品</el-button>

        <!-- 3个按钮 -->
        <!-- <el-form-item>
          <el-button type="primary" size="small" class="mar">查 询</el-button>
        </el-form-item>
        <hr /> -->

        <!-- 带有排序功能的商品table -->
        <!-- :default-sort="{prop: 'date', order: 'descending'}" -->
        <el-table :data="goodsData" style="width: 100%">
          <!-- <el-table-column prop="date" label="日期" sortable width="180"></el-table-column>
              <el-table-column prop="name" label="姓名" sortable width="180"></el-table-column>
          <el-table-column prop="address" label="地址" :formatter="formatter"></el-table-column>-->

          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop label="商品大类型"></el-table-column>
          <el-table-column prop label="商品小类型"></el-table-column>
          <el-table-column prop label="商品名称"></el-table-column>
          <el-table-column prop label="盘点实存">
              <template slot-scope="scope">
              <el-input v-model="scope.row.pcommodityPrice" @blur="addCalculate(addOrderForm)"></el-input>
            </template>
          </el-table-column>
          <el-table-column prop label="现有库存"></el-table-column>
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
      <br>
      盘点总实存：<el-input style="width: 133px"></el-input>
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
        pageSize: 3, //每页显示的记录数
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
          unitPrice: 3,
          salesQuantity: 7,
          sumMoney: 21,
          note: "哈哈哈哈哈",
          opetate: ""
        },
        {
          productName: "王老吉",
          productNum: "12121212",
          productType: "饮料",
          unitPrice: 3,
          salesQuantity: 8,
          sumMoney: 21,
          note: "大吉大利",
          operate: ""
        }
      ],
      title: "",

      activeName: "first", //默认标签页
      chaOrderFrom: {} //查询表单
    };
  },
  created() {
    //自己写的方法
    this.getWarehouseOptions();
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
._small {
    width: 150px;
  }
</style>  