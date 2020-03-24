<template>
  <div class="min1500">
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>财务管理</el-breadcrumb-item>
      <el-breadcrumb-item>收支明细</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-tabs >
        <el-tab-pane label="收支记录">
         
          <el-form :inline="true" :model="chaDetailForm" ref="chaDetailFormRef">
            <el-form-item label="收支类型" prop="budgetBudgettype">
              <el-select v-model="chaDetailForm.budgetBudgettype" >
            <el-option
              v-for="item in shouzhileixing"
              :key="item.id"
              :label="item.value"
              :value="item.value"
            ></el-option>
          </el-select>
            </el-form-item>

            <el-form-item label="业务类型" prop="budgetBusinesstype">
             <el-select v-model="chaDetailForm.budgetBusinesstype" >
            <el-option
              v-for="item in yewuleixing"
              :key="item.id"
              :label="item.value"
              :value="item.value"
            ></el-option>
          </el-select>
            </el-form-item>

            <el-form-item label="账户类型" prop="budgetAccounttype">
              <el-select v-model="chaDetailForm.budgetAccounttype" >
              <el-option
                v-for="item in zhanghuleixing"
                :key="item.basicId"
                :label="item.basicRetainone"
                :value="item.basicId"
              ></el-option>
          </el-select>
            </el-form-item>
            <el-form-item label="交易时间" prop="budgetCompletetime">
              <el-date-picker v-model="chaDetailForm.budgetCompletetime" type="date" placeholder="选择日期" value-format="yyyy-MM-dd"></el-date-picker>
            </el-form-item>
            <el-form-item>
               <el-button @click="getDetail">查 询</el-button>
          <el-button type="primary" @click="chaDetailForm1">重 置</el-button>
            </el-form-item>
          </el-form>
          <el-button type="primary" @click="addDetailVisible = true">新 增</el-button>
          <el-table
            :data="detailList"
            border
            @selection-change="handleSelectionChange"
          >
            <!-- <el-table-column type="selection" width="35"></el-table-column> -->
            <el-table-column type="index" label="序号" width="55"></el-table-column>
            <el-table-column prop="budgetOrdernumber" label="订单号" ></el-table-column>
            <el-table-column prop="budgetBusinesstype" label="业务类型"></el-table-column>
            <el-table-column prop="budgetAccounttype" label="账户类型"></el-table-column>
            <el-table-column prop="budgfetBelong" label="所属订单"></el-table-column>
            <el-table-column prop="budgetDesc" label="描述"></el-table-column>
            <el-table-column prop="budgetCompletetime" label="交易时间"></el-table-column>
            <el-table-column prop="budgetBudgettype" label="收支类型"></el-table-column>
            <el-table-column prop="budgetBudgetamount" label="收支金额"></el-table-column>
          </el-table>

          <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="10"
        layout="total, prev, pager, next"
        :total="total"
      ></el-pagination>
        </el-tab-pane>
        <el-tab-pane label="账户明细" >
           <el-table
            :data="detailList2"
            border
            @selection-change="handleSelectionChange"
          >
            <!-- <el-table-column type="index" label="序号" width="55"></el-table-column> -->
            <el-table-column prop="advancepayment" label="预收款"></el-table-column>
            <el-table-column prop="accountreceived" label="应收款"></el-table-column>
            <el-table-column prop="advancepayment" label="预付款"></el-table-column>
            <el-table-column prop="accountpayable" label="应付款"></el-table-column>
          </el-table>

          <!-- <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="10"
        layout="total, prev, pager, next"
        :total="total"
      ></el-pagination> -->
        </el-tab-pane>
      </el-tabs>
      <!-- 表格 -->
    </el-card>

    <el-dialog :title=" '新增' " :visible.sync="addDetailVisible" width="40%" :before-close="handleClose" @closed="dialogClosed">
      <el-form :inline="true" :model="addDetailForm" :rules="addDetailRules" ref="addDetailFormRef">
         <el-form-item label="收支类型："  prop="budgetBudgettype">
          <el-select v-model="addDetailForm.budgetBudgettype" >
            <el-option
              v-for="item in shouzhileixing"
              :key="item.id"
              :label="item.value"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
       
       
        <el-form-item label="所属订单：" prop="budgetBelong">
          <el-input v-model="addDetailForm.budgetBelong"></el-input>
        </el-form-item>
         <el-form-item label="业务类型："  prop="budgetBusinesstype">
          <el-select v-model="addDetailForm.budgetBusinesstype" >
            <el-option
              v-for="item in yewuleixing"
              :key="item.id"
              :label="item.value"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
         
        
        <el-form-item label="收支金额：" prop="budgetBudgetamount">
          <el-input v-model="addDetailForm.budgetBudgetamount" ></el-input>
        </el-form-item>
       <el-form-item label="账户类型：" prop="budgetAccounttype">
          <el-select v-model="addDetailForm.budgetAccounttype" >
            <el-option
              v-for="item in zhanghuleixing"
              :key="item.basicId"
              :label="item.basicRetainone"
              :value="item.basicId"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="交易时间：" prop="budgetCompletetime">
          <el-date-picker v-model="addDetailForm.budgetCompletetime" type="date" placeholder="选择日期" value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="描述信息：" prop="budgetDesc">
          <el-input
            type="textarea"
            :autosize="{ minRows: 1.4, maxRows: 1}"
            placeholder="请输入内容"
            v-model="addDetailForm.budgetDesc"
            style="width:100%"
          ></el-input>
        </el-form-item>
       
      </el-form>
      <span slot="footer" class="dialog-footer">
          <el-button @click="addDetailVisible = false">取 消</el-button>
          <el-button type="primary" @click="addDetail" >确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      labelPosition: "right",
      addDetailVisible: false,
      editbumenDialogVisible: false,
      delVisible: false,
      currentPage: 0,
      total: 0,
      delarr: "",
      selectedList: [],
      detailList: [],
      detailList1: [],
      detailList2: [],

      chaDetailForm: {
        budgetBudgettype:'',
        budgetAccounttype:'',
        budgetCompletetime:'',
        budgetBusinesstype:'',
        pageCode: 1, //当前页
        pageSize: 10 //每页显示的记录数
      },
      addDetailForm: {
        budgetOrdernumber:'',
        budgetBusinesstype:'',
        budgetAccounttype:'',
        budgetBelong:'',
        budgetDesc:'',
        budgetCompletetime:'',
        budgetBudgettype:'',
        budgetBudgetamount:'',

      },
      shouzhileixing:[{
        id:'0',value:'收入'
      },{
        id:'1',value:'支出'
      }],
      yewuleixing:[{
        id:'0',value:'销售'
      },{
        id:'1',value:'采购'
      },{
        id:'3',value:'其它'
      }],
      zhanghuleixing:[],
      addDetailRules: {
        addDetailForm: [
         
          { min: 0, max: 100, message: "长度在 3 到 10 个字符", trigger: "blur" }
        ]
      },
    };
  },
  created() {
    //自己写的方法
    this.getDetail();
    this.getDetail1();
    this.list();
  },
  methods: {
      async getDetail() {
      const { data: res } = await this.$http.post("detail/selectDetail",this.chaDetailForm);
      this.detailList = res.body.rows; //如何取
      this.total=res.body.total;
    },
    async getDetail1() {
      const { data: res } = await this.$http.post("money/selectMoney");
      // this.detailList1 = res.body.result; //如何取
      this.detailList1[0]=res.body.result;
      console.log(this.detailList1);
      this.detailList2=this.detailList1;
      // this.total=res.body.total;
    },
    async list(){
       const { data: res } = await this.$http.post("jc/Basic/selectzijin");
       this.zhanghuleixing=res;
    },
    addDetail() {
      this.$refs.addDetailFormRef.validate(async valid => {
        if (!valid) return;
        const { data: res } = await this.$http.post(
          "detail/addDetail",
          this.addDetailForm
        );
        this.addDetailVisible = false;
         this.getDetail();
      });
    },
    chaDetailForm1(formName) {
      this.$refs.chaDetailFormRef.resetFields();
      this.getDetail();
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
 dialogClosed(){
        this.$refs.addDetailFormRef.resetFields();
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