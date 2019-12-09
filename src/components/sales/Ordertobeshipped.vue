<template>
  <div class="min1500">
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>销售管理</el-breadcrumb-item>
      <el-breadcrumb-item>发货通知单</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <!-- <el-row :gutter="20"> -->
      <!-- ref作用？？ -->
      <!-- ref="salesOrdermanagementForm" -->
      <el-form
        :inline="true"
        class="demo-form-inline"
        :model="chaOrdertobeshippedForm"
        ref="chaOrdertobeshippedRef"
      >
        <!-- 订单号 -->
        <el-form-item label="发货单号：" prop="deliveryCode">
          <el-input class="w200" v-model="chaOrdertobeshippedForm.deliveryCode"></el-input>
        </el-form-item>
        <!-- 订单状态 -->
        <el-form-item label="订单状态：" prop="deliveryStatus">
          <el-select
            v-model="chaOrdertobeshippedForm.deliveryStatus"
            placeholder="请选择"
            class="w200"
          >
            <el-option v-for="item in dingdan" :key="item.id" :label="item.value" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="发货方式：" prop="deliveryMode">
          <el-input v-model="chaOrdertobeshippedForm.deliveryMode" class="w200"></el-input>
        </el-form-item>
        <!-- 查询按钮 -->
        <el-form-item>
          <el-button @click="getOrdertobeshipped">查 询</el-button>
          <el-button type="primary" @click="chaOrdertobeshippedFormRef">重 置</el-button>
        </el-form-item>
      </el-form>
      <!-- </el-row> -->
      <!-- 4个按钮 -->
      <el-button type="success" @click="addOrdermanagementVisible = true">新 建</el-button>
      <!-- 表格 -->
      <el-table
        ref="multipleTable"
        :data="ordertobeshippedList"
        style="width: 100%"
        border
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="index" label="序号" width="55"></el-table-column>
        <el-table-column prop="deliveryCode" label="发货单号"></el-table-column>
        <el-table-column prop="deliveryTime" label="发货日期"></el-table-column>
        <el-table-column prop="deliveryMode" label="发货方式"></el-table-column>
        <el-table-column prop="deliveryMan" label="制单人"></el-table-column>
        <el-table-column prop="deliveryTimenow" label="制单时间"></el-table-column>
        <el-table-column prop="deliveryNumber" label="总数量"></el-table-column>
        <el-table-column prop="deliveryStatus" label="审核状态">
          <template slot-scope="scope">
            <el-tag type="danger" v-if="scope.row.deliveryStatus=='0'">待审核</el-tag>
            <el-tag type="danger" v-if="scope.row.deliveryStatus=='1'">审核通过</el-tag>
            <el-tag type="danger" v-if="scope.row.deliveryStatus=='2'">审核不通过</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="220px" style="text-align:center">
          <template slot-scope="scope">
            <el-button
              @click="showEditOrdertobeshipped(scope.row.deliveryCode,true,0)"
              type="success"
              size="small"
            >查 看</el-button>
            <el-button
              @click="showEditOrdertobeshipped(scope.row.deliveryCode,true,1)"
              type="primary"
              size="small"
              :disabled="scope.row.deliveryStatus==1 "
            >编 辑</el-button>
            <el-button
              @click="deletebumen(scope.row.deliveryCode)"
              type="danger"
              size="small"
              :disabled="scope.row.deliveryStatus==1"
            >删 除</el-button>
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

    <el-dialog
      :title=" '新增发货通知单' "
      :visible.sync="addOrdermanagementVisible"
      width="60%"
      :before-close="handleClose"
      @closed="dialogClosed"
    >
      <el-form
        ref="addOrdertobeshippedRef"
        label-width="85px"
        :inline="true"
        :model="addOrdertobeshippedForm"
      >
        <el-form-item label="制单人：" prop="deliveryMan">
          <el-input v-model="addOrdertobeshippedForm.deliveryMan" disabled></el-input>
        </el-form-item>
        <el-form-item label="发货日期：" prop="deliveryTime">
          <!-- <el-input v-model="addOrdertobeshippedForm.deliveryTime"></el-input> -->
          <el-date-picker
      v-model="addOrdertobeshippedForm.deliveryTime"
      type="date"
      value-format="yyyy-MM-dd"
      placeholder="选择日期">
    </el-date-picker>
        </el-form-item>
        <el-form-item label="发货方式：" prop="deliveryMode">
          <el-input v-model="addOrdertobeshippedForm.deliveryMode"></el-input>
        </el-form-item>
        <el-form-item label="备注：" prop="deliveryRemark">
          <el-input class="w400" v-model="addOrdertobeshippedForm.deliveryRemark"></el-input>
        </el-form-item>
        <div class="fenge1">商品信息</div>
        <el-button type="primary" @click="addOrdermanagementVisible1 = true">添加商品</el-button>
        <el-button type="primary" @click="selected">删除商品</el-button>
        <el-table
          :data="addOrdertobeshippedForm.deliveryOrderDOs"
          style="width: 100%"
          border
          default-expand-all
          @selection-change="handleSelectionChange"
          class="tb"
        >
          <!-- default-expand-all -->
          <el-table-column type="selection" width="35" align="center"></el-table-column>
          <el-table-column type="expand" label="展开" width="50">
            <template slot-scope="props">
              <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label>{{ props.row.producinggoodsDOs.productSplicing }}</el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column label="销售单号" prop="sorderCode" width="140"></el-table-column>
          <el-table-column label="客户名称" prop="cusName"></el-table-column>
          <el-table-column label="合同号" prop="sorderWarehouse"></el-table-column>
          <el-table-column label="交货地点" prop="sorderAddress"></el-table-column>
          <el-table-column label="交货方式" prop="sorderTotalsum"></el-table-column>
          <el-table-column label="商品名称" prop="producinggoodsDOs.productName"></el-table-column>
          <el-table-column label="数量" prop="commodityNumber"></el-table-column>
          <el-table-column label="已发数量" prop="sorderAuqntityshipped"></el-table-column>
          <el-table-column label="发货数量" prop="dorderNumbers">
            <template scope="scope">
              <el-input v-model="scope.row.dorderNumbers"></el-input>
            </template>
          </el-table-column>
        </el-table>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addOrdermanagementVisible = false">取 消</el-button>
        <el-button type="primary" @click="addDepartment">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog
      :title=" '新增发货商品' "
      :visible.sync="addOrdermanagementVisible1"
      width="55%"
      :before-close="handleClose"
      :model="chaOrdermanagementForm"
      ref="chaOrdermanagementRef"
    >
      <el-form ref="form" label-width="90px" :inline="true">
        <el-form-item label="销售单号：" prop="sorderCode">
          <el-input v-model="chaOrdermanagementForm.sorderCode"></el-input>
        </el-form-item>
        <el-button type="primary" @click="getOrdermanagement">查询</el-button>
        <el-table
          :data="ordermanagementList"
          style="width: 100%"
          border
          default-expand-all
          @selection-change="handleSelectionChange"
          class="tb"
        >
          <!-- default-expand-all -->
          <el-table-column type="selection" width="35" align="center"></el-table-column>
          <el-table-column type="expand" label="展开" width="50">
            <template slot-scope="props">
              <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label>{{props.row.producinggoodsDOs.productSplicing}}</el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column label="商品名称" prop="producinggoodsDOs.productName" width="150px"></el-table-column>
          <el-table-column label="产品类别" prop="producinggoodsDOs.productType" width="150px"></el-table-column>
          <el-table-column label="产品尺寸" prop="producinggoodsDOs.productChanpchic"></el-table-column>
          <el-table-column label="个/包" prop="producinggoodsDOs.productInnerbao"></el-table-column>
          <el-table-column label="包/箱" prop="producinggoodsDOs.productOutbao"></el-table-column>
          <el-table-column label="个/箱" prop="producinggoodsDOs.productOnege"></el-table-column>

          <el-table-column label="外箱尺寸" width="150px">
            <template
              scope="scope"
            >{{scope.row.producinggoodsDOs.productSizelength}}*{{scope.row.producinggoodsDOs.productSizelength}}*{{scope.row.producinggoodsDOs.productSizelength}}</template>
          </el-table-column>
          <el-table-column label="立方" prop="producinggoodsDOs.lifang"></el-table-column>
          <el-table-column label="净/毛" prop="producinggoodsDOs.productOneke"></el-table-column>
        </el-table>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addOrdermanagementVisible1 = false">取 消</el-button>
        <el-button type="primary" @click="fahuoshangpin1">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 编辑销售订单 -->
    <el-dialog
      :title=" '编辑发货通知单' "
      :visible.sync="editOrdermanagementVisible"
      width="60%"
      :before-close="handleClose"
    >
      <el-form
        ref="addOrdertobeshippedRef"
        label-width="85px"
        :inline="true"
        :model="editOrdertobeshippedForm"
      >
        <el-form-item label="制单人：" prop="deliveryMan">
          <el-input v-model="editOrdertobeshippedForm.deliveryMan" disabled></el-input>
        </el-form-item>
        <el-form-item label="发货日期：" prop="deliveryTime">
          <!-- <el-input v-model="editOrdertobeshippedForm.deliveryTime" :disabled="xianshi"></el-input> -->
         
        <el-date-picker
      v-model="editOrdertobeshippedForm.deliveryTime"
      type="date"
      value-format="yyyy-MM-dd"
      placeholder="选择日期">
    </el-date-picker>
        </el-form-item>
        <el-form-item label="发货方式：" prop="deliveryMode">
          <el-input v-model="editOrdertobeshippedForm.deliveryMode" :disabled="xianshi"></el-input>
        </el-form-item>
        <el-form-item label="备注：" prop="deliveryRemark">
          <el-input
            class="w400"
            v-model="editOrdertobeshippedForm.deliveryRemark"
            :disabled="xianshi"
          ></el-input>
        </el-form-item>
        <div class="fenge1">商品信息</div>
        <el-form-item v-if="!xianshi">
          <el-button type="primary" @click="addOrdermanagementVisible1 = true">添加商品</el-button>
          <el-button type="primary" @click="selected">删除商品</el-button>
        </el-form-item>
        <el-table
          :data="editOrdertobeshippedForm.deliveryOrderDOs"
          style="width: 100%"
          border
          default-expand-all
          @selection-change="handleSelectionChange"
          class="tb"
        >
          <!-- default-expand-all -->
          <el-table-column type="selection" width="35" align="center"></el-table-column>
          <el-table-column type="expand" label="展开" width="50">
            <template slot-scope="props">
              <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label>{{ props.row.producinggoodsDOs.productSplicing }}</el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column label="销售单号" prop="sorderCode" width="140"></el-table-column>
          <el-table-column label="客户名称" prop="cusName"></el-table-column>
          <el-table-column label="合同号" prop="sorderWarehouse"></el-table-column>
          <el-table-column label="交货地点" prop="sorderAddress"></el-table-column>
          <el-table-column label="交货方式" prop="sorderTotalsum"></el-table-column>
          <el-table-column label="商品名称" prop="producinggoodsDOs.productName"></el-table-column>
          <el-table-column label="数量" prop="commodityNumber"></el-table-column>
          <el-table-column label="已发数量" prop="sorderAuqntityshipped"></el-table-column>
          <el-table-column label="发货数量" prop="dorderNumbers">
            <template scope="scope">
              <el-input v-model="scope.row.dorderNumbers" :disabled="xianshi"></el-input>
            </template>
          </el-table-column>
        </el-table>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editOrdermanagementVisible = false">取 消</el-button>
        <el-button type="primary" @click="editOrdertobeshipped">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="提示" :visible.sync="delVisible" width="300px">
      <div class="del-dialog-cnt">删除不可恢复，是否确定删除？</div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="delVisible = false">取 消</el-button>
        <el-button type="primary" @click="deleteRow">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      labelPosition: "right",
      addOrdermanagementVisible: false,
      addOrdermanagementVisible1: false,
      editOrdermanagementVisible: false,
      delVisible: false,
      currentPage: 0,
      total: 0,
      selectedList: [],
      chaOrdertobeshippedForm: {
        pageCode: 1, //当前页
        pageSize: 10, //每页显示的记录数
        deliveryCode: "",
        deliveryStatus: "",
        deliveryMode: ""
      },
      addOrdertobeshippedForm: {
        deliveryTime: '',
        deliveryMan: "",
        deliveryMode: "",
        deliveryRemark: "",
        deliveryOrderDOs: [],
        dorderNumbers: ""
      },
      chaOrdermanagementForm: {
        sorderCode: ""
      },
      sorderCode1: "",
      editOrdertobeshippedForm: {
        deliveryTime: '',
        deliveryMan: "",
        deliveryMode: "",
        deliveryRemark: "",
        deliveryOrderDOs: [],
        dorderNumbers: ""
      },
      addDepartmentRules: {
        name: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 10, message: "长度在 3 到 10 个字符", trigger: "blur" }
        ]
      },
      sorderCodeList: [],
      xianshi: false,
      xianshi1: false,
      ordertobeshippedList: [],
      ordermanagementList: [],
      dingdan: [
        {
          id: 0,
          value: "待审核"
        },
        {
          id: 1,
          value: "审核通过"
        },
        {
          id: 2,
          value: "审核不通过"
        }
      ]
    };
  },
  created() {
    this.getOrdertobeshipped();
    this.getCookie();
  },
  methods: {
    async getOrdertobeshipped() {
      const { data: res } = await this.$http.post(
        "xs/delivery/selectDeliveryNotice",
        this.chaOrdertobeshippedForm
      );
      this.ordertobeshippedList = res.body.rows;
      this.total = res.body.total;
    },
    async getOrdermanagement() {
      // for(var k = 0; k < this.addOrdertobeshippedForm.deliveryOrderDOs.length; k++){
      // this.sorderCodeList.push(this.addOrdertobeshippedForm.deliveryOrderDOs[k].sorderCode);
      // }

      // let array = [];
      // console.log(this.addOrdertobeshippedForm.deliveryOrderDOs);
      // if (!this.addOrdertobeshippedForm.deliveryOrderDOs.length == 0) {
      //   for (
      //     let j = 0;
      //     j < this.addOrdertobeshippedForm.deliveryOrderDOs.length;
      //     j++
      //   ) {
      //     if (array.length == 0) {
      //       array.push(this.addOrdertobeshippedForm.deliveryOrderDOs[j]);
      //     }
      //     for (let i = 0; i < array.length; i++) {
      //       if (
      //         array[i].sorderCode ==
      //         this.addOrdertobeshippedForm.deliveryOrderDOs[j].sorderCode
      //       ) {
      //         break;
      //       }
      //       if (i == array.length - 1) {
      //         array.push(this.addOrdertobeshippedForm.deliveryOrderDOs[j]);
      //         break;
      //       }
      //     }
      //   }
      // }

      // this.sorderCodeList = array;
      if (this.addOrdermanagementVisible == true) {
        this.sorderCodeList = this.addOrdertobeshippedForm.deliveryOrderDOs.map(
          item => {
            return item.sorderCode;
          }
        );
      } else {
        this.sorderCodeList = this.editOrdertobeshippedForm.deliveryOrderDOs.map(
          item => {
            return item.sorderCode;
          }
        );
      }

      this.sorderCode1 = this.chaOrdermanagementForm.sorderCode;
      const { data: res } = await this.$http.post(
        "xs/saleorder/selectOrderComm",
        this.chaOrdermanagementForm
      );
      for (
        let index = 0;
        index < res.body.rows[0].commodityListDOs.length;
        index++
      ) {
        if (
          res.body.rows[0].commodityListDOs[index].sorderCode ==
          res.body.rows[0].sorderCode
        ) {
          res.body.rows[0].commodityListDOs[index].cusName =
            res.body.rows[0].customerDOs.cusName;
          res.body.rows[0].commodityListDOs[index].sorderWarehouse =
            res.body.rows[0].sorderWarehouse;
          res.body.rows[0].commodityListDOs[index].sorderAddress =
            res.body.rows[0].sorderAddress;
          res.body.rows[0].commodityListDOs[index].sorderTotalsum =
            res.body.rows[0].sorderTotalsum;
        }
      }
      this.ordermanagementList = res.body.rows[0].commodityListDOs;
      this.total = res.body.total;
    },
    fahuoshangpin1() {
      let chongfu = 0;
      if (this.addOrdermanagementVisible == true) {
        const index = this.sorderCodeList.indexOf(this.sorderCode1);
        if (index <= -1) {
          // 没有次订货单
          console.log(this.addOrdertobeshippedForm.deliveryOrderDOs);
          this.addOrdertobeshippedForm.deliveryOrderDOs = [
            ...this.addOrdertobeshippedForm.deliveryOrderDOs,
            ...this.selectedList
          ];
          
        } else {
          // 有此订货单
          const thisSorderCodeProduct = [];
          this.addOrdertobeshippedForm.deliveryOrderDOs.forEach(item => {
            if (item.sorderCode === this.sorderCode1) {
              thisSorderCodeProduct.push(item.productgoodsId);
            }
          });

          const needAdd = [];
          this.selectedList.forEach(item => {
            if (thisSorderCodeProduct.indexOf(item.productgoodsId) === -1) {
              needAdd.push(item);
            } else {
              chongfu ++;
            }
          });
          this.addOrdertobeshippedForm.deliveryOrderDOs = [
            ...this.addOrdertobeshippedForm.deliveryOrderDOs,
            ...needAdd
          ];
        }
      } else if (this.editOrdermanagementVisible == true) {
        const index = this.sorderCodeList.indexOf(this.sorderCode1);
        if (index <= -1) {
          // 没有次订货单
          console.log(this.editOrdertobeshippedForm.deliveryOrderDOs);
          this.editOrdertobeshippedForm.deliveryOrderDOs = [
            ...this.editOrdertobeshippedForm.deliveryOrderDOs,
            ...this.selectedList
          ];
        } else {
          // 有此订货单
          const thisSorderCodeProduct = [];
          this.editOrdertobeshippedForm.deliveryOrderDOs.forEach(item => {
            if (item.sorderCode === this.sorderCode1) {
              thisSorderCodeProduct.push(item.productgoodsId);
            }
          });

          const needAdd = [];
          this.selectedList.forEach(item => {
            if (thisSorderCodeProduct.indexOf(item.productgoodsId) === -1) {
              needAdd.push(item);
            } else {
              chongfu ++;
            }
          });
          this.editOrdertobeshippedForm.deliveryOrderDOs = [
            ...this.editOrdertobeshippedForm.deliveryOrderDOs,
            ...needAdd
          ];
        }
      }
      const charu = this.selectedList.length - chongfu;
      this.$message({
        type: "info",
        message: chongfu > 0 ? `此次添加有重复数据，重复数据${chongfu}条，成功插入${charu}条` : `此次成功插入${charu}条`
      });

      this.addOrdermanagementVisible1 = false;
      this.addOrdermanagementVisible2 = false;
      this.editOrdermanagementVisible1 = false;
      this.editOrdermanagementVisible2 = false;
      this.chaOrdermanagementForm.sorderCode = "";
      this.ordermanagementList = [];
      console.log(this.sorderCodeList);
    },
    // XS201912060006
    fahuoshangpin() {
      var chongfu = 0;
      var charu = 0;

      if (
        this.addOrdertobeshippedForm.deliveryOrderDOs.length >= 1 ||
        this.editOrdertobeshippedForm.deliveryOrderDOs.length >= 1
      ) {
        for (var k = 0; k < this.sorderCodeList.length; k++) {
          // console.log(this.sorderCode1)
          if (this.sorderCodeList[k].sorderCode == this.sorderCode1) {
            console.log(this.sorderCode1);
            console.log(this.sorderCodeList[k].sorderCode);
            console.log("--------------------************");
            if (this.addOrdermanagementVisible == true) {
              console.log("--------------------************------------------");
              // var arr = this.addOrdertobeshippedForm.deliveryOrderDOs.concat(
              //   this.selectedList
              // );
              var hash = []; //一定要在这里置空啊
              // for (var i = 0; i < arr.length; i++) {
              //   for (var j = i + 1; j < arr.length; j++) {
              //     if (arr[i].productgoodsId == arr[j].productgoodsId) {
              //       ++i; //如果一样就继续往下循环
              //       chongfu++;
              //     }
              //   }
              //   hash.push(arr[i]);
              // }
              this.addOrdertobeshippedForm.deliveryOrderDOs.forEach(item => {
                this.selectedList.forEach(selectedItem => {
                  console.log(
                    item.productgoodsId == selectedItem.productgoodsId
                  );
                  if (item.productgoodsId == selectedItem.productgoodsId) {
                    chongfu++;
                  } else {
                    hash.push(selectedItem);
                  }
                });
              });
              this.addOrdertobeshippedForm.deliveryOrderDOs.concat(hash);
              charu = this.selectedList.length - chongfu;
              // this.addOrdertobeshippedForm.deliveryOrderDOs = arr.contact(hash);
              this.$message({
                type: "info",
                message:
                  "此次添加有重复数据，重复数据:" +
                  chongfu +
                  "条，插入" +
                  charu +
                  "条！"
              });
              break;
            } else if (this.editOrdermanagementVisible == true) {
              var arr = this.editOrdertobeshippedForm.deliveryOrderDOs.concat(
                this.selectedList
              );
              var hash = []; //一定要在这里置空啊
              for (var i = 0; i < arr.length; i++) {
                for (var j = i + 1; j < arr.length; j++) {
                  if (arr[i].productgoodsId == arr[j].productgoodsId) {
                    ++i; //如果一样就继续往下循环
                    chongfu++;
                  }
                }
                hash.push(arr[i]);
              }
              charu = this.selectedList.length - chongfu;
              this.editOrdertobeshippedForm.deliveryOrderDOs = hash;
              this.$message({
                type: "info",
                message:
                  "此次添加有重复数据，重复数据:" +
                  chongfu +
                  "条，插入" +
                  charu +
                  "条！"
              });
            }
          } else {
            console.log("/////////////************");
            for (let index = 0; index < this.selectedList.length; index++) {
              if (this.addOrdermanagementVisible == true) {
                this.addOrdertobeshippedForm.deliveryOrderDOs.push(
                  this.selectedList[index]
                );
              } else if (this.editOrdermanagementVisible == true) {
                this.editOrdertobeshippedForm.deliveryOrderDOs.push(
                  this.selectedList[index]
                );
              }
            }
          }
        }
      } else {
        for (let index = 0; index < this.selectedList.length; index++) {
          if (this.addOrdermanagementVisible == true) {
            this.addOrdertobeshippedForm.deliveryOrderDOs.push(
              this.selectedList[index]
            );
          } else if (this.editOrdermanagementVisible == true) {
            this.editOrdertobeshippedForm.deliveryOrderDOs.push(
              this.selectedList[index]
            );
          }
        }
      }
      this.addOrdermanagementVisible1 = false;
      this.addOrdermanagementVisible2 = false;
      this.editOrdermanagementVisible1 = false;
      this.editOrdermanagementVisible2 = false;
      this.chaOrdermanagementForm.sorderCode = "";
      this.ordermanagementList = [];
    },
    selected() {
      this.delVisible = true;
      this.delarr = [];
      for (let i = 0; i < this.selectedList.length; i++) {
        this.delarr.push({
          productId: this.selectedList[i].producinggoodsDOs.productgoodsId,
          sorderId: this.selectedList[i].sorderCode
        });
      }
    },
    async deleteRow() {
      if (this.addOrdermanagementVisible == true) {
        this.addOrdertobeshippedForm.deliveryOrderDOs.forEach((item, index) => {
          this.delarr.forEach(delItem => {
            console.log(
              item.productgoodsId == delItem.productId,
              item.sorderCode == delItem.sorderId
            );
            if (
              item.productgoodsId == delItem.productId &&
              item.sorderCode == delItem.sorderId
            ) {
              this.addOrdertobeshippedForm.deliveryOrderDOs.splice(index, 1);
            }
          });
        });
      } else if (this.editOrdermanagementVisible == true) {
        this.editOrdertobeshippedForm.deliveryOrderDOs.forEach(
          (item, index) => {
            this.delarr.forEach(delItem => {
              if (
                item.productgoodsId == delItem.productId &&
                item.sorderCode == delItem.sorderId
              ) {
                this.editOrdertobeshippedForm.deliveryOrderDOs.splice(index, 1);
              }
            });
          }
        );
      }

      // for (let index = 0; index < this.delarr.length; index++) {
      //   for (
      //     let i = 0;
      //     i < this.addOrdertobeshippedForm.deliveryOrderDOs.length;
      //     i++
      //   ) {
      //     if (
      //       this.delarr[index] ==
      //       this.addOrdertobeshippedForm.deliveryOrderDOs[i].producinggoodsDOs
      //         .productgoodsId
      //     )
      //       this.addOrdertobeshippedForm.deliveryOrderDOs.splice(i, 1);
      //   }
      // }

      // if (this.addOrdermanagementVisible == true) {
      //   for (let index = 0; index < this.delarr.length; index++) {
      //     for (
      //       let i = 0;
      //       i < this.addOrdertobeshippedForm.deliveryOrderDOs.length;
      //       i++
      //     ) {
      //       if (
      //         this.delarr[index] ==
      //         this.addOrdertobeshippedForm.deliveryOrderDOs[i].producinggoodsDOs
      //           .productgoodsId
      //       )
      //         this.addOrdertobeshippedForm.deliveryOrderDOs.splice(i, 1);
      //     }
      //   }
      // } else if (this.editOrdermanagementVisible == true) {
      //   for (let index = 0; index < this.delarr.length; index++) {
      //     for (
      //       let i = 0;
      //       i < this.editOrdertobeshippedForm.deliveryOrderDOs.length;
      //       i++
      //     ) {
      //       if (
      //         this.delarr[index] ==
      //         this.editOrdertobeshippedForm.deliveryOrderDOs[i].productgoodsId
      //       )
      //         this.editOrdertobeshippedForm.deliveryOrderDOs.splice(i, 1);
      //     }
      //   }
      // }
      this.delVisible = false;
    },
    addDepartment() {
      this.$refs.addOrdertobeshippedRef.validate(async valid => {
        if (!valid) return;
        const { data: res } = await this.$http.post(
          "xs/delivery/insertDeliveryNotice",
          this.addOrdertobeshippedForm
        );
        if (res.body.respCode == 500) {
          this.$message({
            type: "info",
            message: res.body.msg
          });
        } else {
          this.$message({
            type: "success",
            message: res.body.msg
          });
        }
        this.getOrdertobeshipped();
        this.addOrdermanagementVisible = false;
      });
    },
    chaOrdertobeshippedFormRef(formName) {
      this.$refs.chaOrdertobeshippedRef.resetFields();
      this.getOrdertobeshipped();
    },
    getCookie: function() {
      var storage = window.localStorage;
      this.addOrdertobeshippedForm.deliveryMan = storage.getItem("username");
    },
    async showEditOrdertobeshipped(deliveryCode, xian, zhi) {
      if (zhi == 0) {
        this.xianshi = xian;
      } else if (zhi == 1) {
        this.xianshi = !xian;
      }
      let param = new URLSearchParams();
      param.append("deliveryCode", deliveryCode);
      const { data: res } = await this.$http.post(
        "xs/delivery/selectDeliveryNoticebyid",
        param
      );
      for (
        let index = 0;
        index < res.body.DeliveryNoticeDO.deliveryOrderDOs.length;
        index++
      ) {
        res.body.DeliveryNoticeDO.deliveryOrderDOs[index].productSplicing =
          res.body.DeliveryNoticeDO.deliveryOrderDOs[
            index
          ].producinggoodsDOs.productSplicing;
        res.body.DeliveryNoticeDO.deliveryOrderDOs[index].cusName =
          res.body.DeliveryNoticeDO.deliveryOrderDOs[
            index
          ].saleOrderDO.customerDOs.cusName;
        res.body.DeliveryNoticeDO.deliveryOrderDOs[index].sorderWarehouse =
          res.body.DeliveryNoticeDO.deliveryOrderDOs[
            index
          ].saleOrderDO.sorderWarehouse;
        res.body.DeliveryNoticeDO.deliveryOrderDOs[index].sorderAddress =
          res.body.DeliveryNoticeDO.deliveryOrderDOs[
            index
          ].saleOrderDO.sorderAddress;
        res.body.DeliveryNoticeDO.deliveryOrderDOs[index].sorderTotalsum =
          res.body.DeliveryNoticeDO.deliveryOrderDOs[
            index
          ].saleOrderDO.sorderTotalsum;
        res.body.DeliveryNoticeDO.deliveryOrderDOs[index].productName =
          res.body.DeliveryNoticeDO.deliveryOrderDOs[
            index
          ].producinggoodsDOs.productName;
        res.body.DeliveryNoticeDO.deliveryOrderDOs[index].commodityNumber =
          res.body.DeliveryNoticeDO.deliveryOrderDOs[
            index
          ].saleOrderDO.commodityListDOs[0].commodityNumber;
        res.body.DeliveryNoticeDO.deliveryOrderDOs[
          index
        ].sorderAuqntityshipped =
          res.body.DeliveryNoticeDO.deliveryOrderDOs[
            index
          ].saleOrderDO.sorderAuqntityshipped;
        res.body.DeliveryNoticeDO.deliveryOrderDOs[index].sorderTotalsum =
          res.body.DeliveryNoticeDO.deliveryOrderDOs[
            index
          ].saleOrderDO.sorderTotalsum;
      }
      this.editOrdertobeshippedForm = res.body.DeliveryNoticeDO;
      console.log(res);

      this.editOrdermanagementVisible = true;
    },
    async editOrdertobeshipped() {
      if (this.editOrdertobeshippedForm.deliveryStatus == "2") {
        this.editOrdertobeshippedForm.deliveryStatus = "0";
      }
      const { data: res } = await this.$http.post(
        "xs/delivery/updateDelivery",
        this.editOrdertobeshippedForm
      );
      if (res.body.respCode == 500) {
          this.$message({
            type: "info",
            message: res.body.msg
          });
        } else {
          this.$message({
            type: "success",
            message: res.body.msg
          });
        }
      this.editOrdermanagementVisible = false;
      this.getOrdertobeshipped();
    },
    dialogClosed() {
      this.$refs.addOrdertobeshippedRef.resetFields();
      this.addOrdertobeshippedForm.deliveryOrderDOs = [];
    },

    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },

    deletebumen(deliveryCode) {
      this.$confirm("此操作将永久删除该职务, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          let param = new URLSearchParams();
          param.append("deliveryCode", deliveryCode);
          const { data: res } = await this.$http.post(
            "xs/delivery/deleteDelivery",
            param
          );
          this.getOrdertobeshipped();
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

    //分页相关函数
    handleSizeChange(val) {
      this.chaOrdertobeshippedForm.pageSize = val;
      console.log(`每页 ${val} 条`);
      this.getOrdertobeshipped();
    },
    handleCurrentChange(val) {
      this.chaOrdertobeshippedForm.pageCode = val;
      console.log(`当前页: ${val}`);
      this.currentPage = val;
      this.getOrdertobeshipped();
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
.w400 {
  width: 400px;
}
.w200 {
  width: 200px;
}
.el-table {
  margin-bottom: 15px;
}
.demo-table-expand {
  text-align: center;
  .el-form-item {
    margin-bottom: 0px;
  }
}
// .fenge{
//     position: absolute;
//     top: 34px;
//     left: 0px;
//     height: 25px;
//     width: 98.5%;
//     line-height: 25px;
//     padding-left:15px ;
//     background-color: #DCDFE6;

//     }
//      .fenge1{
//     height: 25px;
//     width:98.5%;
//     line-height: 25px;
//     padding-left:15px ;
//     background-color: #DCDFE6;
//     margin-bottom: 20px;
//     }
</style>  
