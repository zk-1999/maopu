<template>
  <div class="min1500">
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>销售管理</el-breadcrumb-item>
      <el-breadcrumb-item>销售订单管理</el-breadcrumb-item>
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
        <el-form-item label="订单号：">
          <el-input class="hu"></el-input>
        </el-form-item>
        <!-- 订单状态 -->
        <el-form-item label="订单状态：" class="mar">
          <el-select v-model="salesOrdermanagementForm.state" class="hu">
            <el-option value="0">初始化</el-option>
            <el-option value="1">待审核</el-option>
            <el-option value="2">初审不通过</el-option>
            <el-option value="3">复审不通过</el-option>
          </el-select>
        </el-form-item>
        <!-- 手机号码 -->
        <el-form-item label="客户名称：" class="mar" prop="phoneNumber">
          <el-input v-model="salesOrdermanagementForm.phoneNumber" class="hu"></el-input>
        </el-form-item>
        <!-- 收货姓名 -->
        <el-form-item label="合同号：" class="mar">
          <el-input v-model="salesOrdermanagementForm.name" class="hu"></el-input>
        </el-form-item>
        <!-- 收货省份 -->
        <el-form-item label="交货方式：" class="mar">
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
      <el-button type="primary" size="small" @click="addOrdermanagementVisible = true">新 建</el-button>
      <!-- 表格 -->
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        border
        
        @selection-change="handleSelectionChange"
      >
        <el-table-column prop="no" label="序号"></el-table-column>
        <el-table-column prop="orderNum" label="订单号"></el-table-column>
        <el-table-column prop="username" label="客户名称"></el-table-column>
        <el-table-column prop="goodsInfo" label="合同号"></el-table-column>
        <el-table-column prop="overbookingTime" label="交货地点"></el-table-column>
        <el-table-column prop="money1" label="交货方式"></el-table-column>
        <el-table-column prop="money2" label="数量"></el-table-column>
        <el-table-column prop="payTime" label="金额"></el-table-column>
        <el-table-column prop="address" label="预付金额" ></el-table-column>
        <el-table-column prop="createTime" label="交货日期"></el-table-column>
        <el-table-column prop="lastModifyTime" label="下单日期"></el-table-column>
        <el-table-column prop="orderState" label="订单状态"></el-table-column>
        <el-table-column label="操作" width="240px" style="text-align:center">
          <template slot-scope="scope">
            <el-button @click="checkOrder(scope.row.orderNum)" type="primary" size="small" v-if="scope.row.orderState==='未完成'">提 审</el-button>
            <!-- v-if="scope.row.orderState!=='未完成' -->
            <el-button @click="editOrdermanagementVisible(scope.row.orderNum)" type="primary" size="small">编 辑</el-button>
            <el-button @click="deleteOrder(scope.row.orderNum)" type="danger" size="small">删 除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="10"
        layout="total, prev, pager, next"
        :total="total"
      ></el-pagination>
    </el-card>
    <!-- 新增销售订单 -->

    <el-dialog :title=" '新增销售订单' " :visible.sync="addOrdermanagementVisible" width="60%" :before-close="handleClose">
        <div class="fenge">基础信息</div>
        <el-form ref="form" label-width="110px" :inline="true">
          <el-form-item label="客户名称：">
            <el-input ></el-input>
          </el-form-item>
          <el-form-item label="交货地点：">
            <el-input ></el-input>
          </el-form-item>
          <el-form-item label="合同号：">
            <el-input ></el-input>
          </el-form-item>
          <el-form-item label="交货方式：">
            <el-input ></el-input>
          </el-form-item>
          <el-form-item label="交货日期：">
            <el-input ></el-input>
          </el-form-item>
          <el-form-item label="货币类型：">
            <el-input ></el-input>
          </el-form-item>
          <div class="fenge1">商品信息</div>
        <el-form-item label="生产商品：">
          <el-input class="w200"></el-input>
        </el-form-item>
        <el-form-item label="采购商品：">
          <el-input class="w200"></el-input>
        </el-form-item >
        <el-button type="primary" >添加商品</el-button>
      <el-table
    :data="ProductionList"
    style="width: 100%" border default-expand-all    @selection-change="handleSelectionChange">
    <!-- default-expand-all -->
    <el-table-column type="expand"  label="展开"  width="50">
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="">
            箱唛<span>{{ props.row.productBoxMark }}</span>,
            标唛<span>{{ props.row.productLabel }}</span>,
            <span>{{ props.row.productInnerbao }}</span>/条,
            <span>{{ props.row.productOutbao }}</span>/包,
            <span>{{ props.row.productOnege }}</span>/箱,
            <span>{{ props.row.productSizelength }}</span>,
            <span>{{ props.row.productSizewide }}</span>,
            <span>{{ props.row.productSizehight }}</span>
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>
    <el-table-column label="商品名称" prop="productName"></el-table-column>
    <el-table-column label="产品类别" prop="productType"></el-table-column>
    <el-table-column label="尺寸" prop="productBrandabroad"></el-table-column>
    <el-table-column label="个/包" prop="productZhizleix"></el-table-column>
    <el-table-column label="包/箱" prop="productGramabroad"></el-table-column>
    <el-table-column label="个/箱" prop="productCoatedabroad"></el-table-column>
    <el-table-column label="数量" prop="productOneke"></el-table-column>
    <el-table-column label="单价" prop="productChanpchic"></el-table-column>
    <el-table-column label="总计" prop="designId"></el-table-column>
    <el-table-column label="外箱尺寸" prop="designId"></el-table-column>
    <el-table-column label="立方" prop="designId"></el-table-column>
    <el-table-column label="净/毛" prop="designId"></el-table-column>
    <el-table-column label="操作" width="90px" align="center">
      <template slot-scope="scope">
        <el-button type="danger" icon="el-icon-delete" @click="deletebumen(scope.row.productgoodsId)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <div class="fenge1">合计信息</div>
    <el-form-item label="快递费：">
      <el-input ></el-input>
    </el-form-item>
    <el-form-item label="运费：">
      <el-input ></el-input>
    </el-form-item>
     <el-form-item label="版费：">
      <el-input ></el-input>
    </el-form-item>
    <el-form-item label="小单费：">
      <el-input ></el-input>
    </el-form-item>
    <el-form-item label="总数量：">
      <el-input ></el-input>
    </el-form-item>
    <el-form-item label="总金额：">
      <el-input ></el-input>
    </el-form-item>
    <el-form-item label="预收款金额：">
      <el-input ></el-input>
    </el-form-item>
    <el-form-item label="备注：">
      <el-input class="w400"></el-input>
    </el-form-item>
  </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addOrdermanagementVisible = false">取 消</el-button>
        <el-button type="primary" @click="addOrder">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 编辑销售订单 -->
    <el-dialog
      :title=" '编辑销售订单' "
      :visible.sync="editOrdermanagementVisible"
      width="60%"
      :before-close="handleClose"
    >
     <div class="fenge">基础信息</div>
        <el-form ref="form" label-width="110px" :inline="true">
          <el-form-item label="客户名称：">
            <el-input ></el-input>
          </el-form-item>
          <el-form-item label="交货地点：">
            <el-input ></el-input>
          </el-form-item>
          <el-form-item label="合同号：">
            <el-input ></el-input>
          </el-form-item>
          <el-form-item label="交货方式：">
            <el-input ></el-input>
          </el-form-item>
          <el-form-item label="交货日期：">
            <el-input ></el-input>
          </el-form-item>
          <el-form-item label="货币类型：">
            <el-input ></el-input>
          </el-form-item>
        <div class="fenge1">商品信息</div>
        <el-form-item label="生产商品：">
          <el-input class="w200"></el-input>
        </el-form-item>
        <el-form-item label="采购商品：">
          <el-input class="w200"></el-input>
        </el-form-item >
        <el-button type="primary" >添加商品</el-button>
      <el-table
    :data="ProductionList"
    style="width: 100%" border default-expand-all    @selection-change="handleSelectionChange">
    <!-- default-expand-all -->
    <el-table-column type="expand"  label="展开"  width="50">
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="">
            箱唛<span>{{ props.row.productBoxMark }}</span>,
            标唛<span>{{ props.row.productLabel }}</span>,
            <span>{{ props.row.productInnerbao }}</span>/条,
            <span>{{ props.row.productOutbao }}</span>/包,
            <span>{{ props.row.productOnege }}</span>/箱,
            <span>{{ props.row.productSizelength }}</span>,
            <span>{{ props.row.productSizewide }}</span>,
            <span>{{ props.row.productSizehight }}</span>
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>
    <el-table-column label="商品名称" prop="productName"></el-table-column>
    <el-table-column label="产品类别" prop="productType"></el-table-column>
    <el-table-column label="尺寸" prop="productBrandabroad"></el-table-column>
    <el-table-column label="个/包" prop="productZhizleix"></el-table-column>
    <el-table-column label="包/箱" prop="productGramabroad"></el-table-column>
    <el-table-column label="个/箱" prop="productCoatedabroad"></el-table-column>
    <el-table-column label="数量" prop="productOneke"></el-table-column>
    <el-table-column label="单价" prop="productChanpchic"></el-table-column>
    <el-table-column label="总计" prop="designId"></el-table-column>
    <el-table-column label="外箱尺寸" prop="designId"></el-table-column>
    <el-table-column label="立方" prop="designId"></el-table-column>
    <el-table-column label="净/毛" prop="designId"></el-table-column>
    <el-table-column label="操作" width="90px" align="center">
      <template slot-scope="scope">
        <el-button type="danger" icon="el-icon-delete" @click="deletebumen(scope.row.productgoodsId)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <div class="fenge1">合计信息</div>
    <el-form-item label="快递费：">
      <el-input ></el-input>
    </el-form-item>
    <el-form-item label="运费：">
      <el-input ></el-input>
    </el-form-item>
     <el-form-item label="版费：">
      <el-input ></el-input>
    </el-form-item>
    <el-form-item label="小单费：">
      <el-input ></el-input>
    </el-form-item>
    <el-form-item label="总数量：">
      <el-input ></el-input>
    </el-form-item>
    <el-form-item label="总金额：">
      <el-input ></el-input>
    </el-form-item>
    <el-form-item label="预收款金额：">
      <el-input ></el-input>
    </el-form-item>
    <el-form-item label="备注：">
      <el-input class="w400"></el-input>
    </el-form-item>
  </el-form>
        <span slot="footer" class="dialog-footer">
        <el-button @click="editOrdermanagementVisible = false">取 消</el-button>
        <el-button type="primary" @click="editOrder">确 定</el-button>
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
      addOrdermanagementVisible: false,
      editOrdermanagementVisible: false,
      delVisible: false,
      currentPage: 0,
      total: 0,
      selectedList: [],
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
 .w400{
   width: 400px;
 }
 .el-table{
   margin-bottom: 15px;
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
