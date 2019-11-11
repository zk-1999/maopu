<template>
  <div class="min1500">
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>财务管理</el-breadcrumb-item>
      <el-breadcrumb-item>报销单-待初审</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <!-- <el-row :gutter="20"> -->
      <!-- ref作用？？ -->
      <!-- ref="salesOrdermanagementForm" -->
      <el-form :inline="true" class="demo-form-inline" :model="salesOrdermanagementForm">
        <el-form-item label="报销单号">
          <el-input v-model="salesOrdermanagementForm.phoneNumber" class="hu"></el-input>
        </el-form-item>
        <el-form-item label="报销制单人" class="mar">
          <el-input v-model="salesOrdermanagementForm.phoneNumber" class="hu"></el-input>
        </el-form-item>
        <el-form-item label="制单时间" class="mar">
          <el-input v-model="salesOrdermanagementForm.phoneNumber" class="hu"></el-input>
        </el-form-item>
        <el-form-item label="审核状态" class="mar">
          <el-select v-model="salesOrdermanagementForm.warehouse" class="hu">
            <el-option
              v-for="item in warehouseOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注" class="mar">
          <el-input v-model="salesOrdermanagementForm.phoneNumber" class="hu"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" size="small" @click="q" class="mar">查 询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" @click="q" class="mar">重 置</el-button>
        </el-form-item>
      </el-form>
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
        <el-table-column prop label="报销单号"></el-table-column>
        <el-table-column prop label="报销制单人"></el-table-column>
        <el-table-column prop label="制单时间"></el-table-column>
        <el-table-column prop label="审核状态"></el-table-column>
        <el-table-column prop label="备注"></el-table-column>
        <el-table-column prop label="操作">
            <a href="" @click.prevent="stateOfAdd=true">审核</a>
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
    </el-card>

    <el-dialog :title=" '付款单' " :visible.sync="stateOfAdd" width="60%" :before-close="handleClose">
      <el-form inline="true">
        <hr />
        <div>报销人员信息</div>
        <el-form-item label="报销单号">
          <el-input v-model="salesOrdermanagementForm.phoneNumber" class="hu"></el-input>
        </el-form-item>

        <el-form-item label="报销制单人">
          <el-input v-model="salesOrdermanagementForm.phoneNumber" class="hu"></el-input>
        </el-form-item>

        <!-- 制单时间 -->
        <el-form-item label="制单时间" class="mar">
          <el-date-picker v-model="value1" type="date" placeholder="选择日期"></el-date-picker>
        </el-form-item>

        <el-form-item label="类型" class="mar">
          <el-select v-model="salesOrdermanagementForm.warehouse" class="hu">
            <el-option
              v-for="item in warehouseOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>

        <br />

        <el-form-item label="备注" class="mar">
          <el-input
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4}"
            placeholder="请输入内容"
            v-model="textarea2"
          ></el-input>
        </el-form-item>

        <hr />
        <div>报销凭证上传/查看</div>
        <!-- 两个按钮 -->
        <el-form-item>
          <el-upload
            class="upload-demo"
            drag
            action="https://jsonplaceholder.typicode.com/posts/"
            multiple
          >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">
              将文件拖到此处，或
              <em>点击上传</em>
            </div>
            <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>

        <hr />
        <div>付款凭证</div>
        <!-- 两个按钮 -->
        <el-form-item>
          <el-upload
            class="upload-demo"
            drag
            action="https://jsonplaceholder.typicode.com/posts/"
            multiple
          >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">
              将文件拖到此处，或
              <em>点击上传</em>
            </div>
            <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>

        <hr />
        <div>初审</div>
        <!-- 两个按钮 -->
          <el-table
            :data="tableData"
            tooltip-effect="dark"
            style="width: 200%"
            @selection-change="handleSelectionChange"
          >
            <!-- <el-table-column prop="no" label="序号"></el-table-column> -->
            <el-table-column prop label="审核人"></el-table-column>
            <el-table-column prop label="审核结果">
              <el-radio v-model="radio" label="1">通过</el-radio>
              <br>
              <el-radio v-model="radio" label="2">不通过</el-radio>
            </el-table-column>
            <el-table-column prop label="操作时间"></el-table-column>
            <el-table-column prop label="备注">
                <el-input ></el-input>
            </el-table-column>
          </el-table>

        <br />
        <!-- 两个按钮 -->
        <el-form-item style="margin-left:750px;">
          <el-button type="primary" size="small">确 定</el-button>
          <el-button type="primary" size="small">取 消</el-button>
        </el-form-item>
      </el-form>
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
      receiptType: [
        {
          label: "采购退货收款",
          value: "0"
        },
        {
          label: "销售订单收款",
          value: "1"
        }
      ],
      // 新增状态
      stateOfAdd: false,
      // 编辑状态
      stateOfEdit: false
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