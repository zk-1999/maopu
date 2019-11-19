<template>
  <div class="min1500">
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>进货管理</el-breadcrumb-item>
      <el-breadcrumb-item>采购订单</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-form
        :inline="true"
        class="demo-form-inline search"
        :model="chaOrderFrom"
        ref="chaOrderFrom"
        label-width="80px"
        label-position="left"
      >
        <el-row :gutter="20" class="row">
          <el-col :span="24">
            <el-form-item label="订单编号" prop="porderCode">
              <el-input placeholder="请输入订单编号" class="_small" v-model="chaOrderFrom.porderCode"></el-input>
            </el-form-item>
            <el-form-item label="制单人员" prop="porderProducer">
              <el-input placeholder="请输入人员" v-model="chaOrderFrom.porderProducer" class="_small"></el-input>
            </el-form-item>
            <el-form-item label="制单时间" prop="time">
              <el-date-picker
                v-model="chaOrderFrom.time"
                type="daterange"
                value-format="yyyy-MM-dd"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="到货情况" prop="porderArrivalstatus">
              <el-select
                v-model="chaOrderFrom.porderArrivalstatus"
                placeholder="请选择"
                class="_small"
              >
                <el-option value label="全部"></el-option>
                <el-option value="0" label="未到货"></el-option>
                <el-option value="1" label="部分到货"></el-option>
                <el-option value="2" label="全部到货"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="订单状态" prop="porderState">
              <el-select v-model="chaOrderFrom.porderState" placeholder="请选择" class="_small">
                <el-option value label="全部"></el-option>
                <el-option value="0" label="初始化"></el-option>
                <el-option value="1" label="待初审"></el-option>
                <el-option value="2" label="初审未通过"></el-option>
                <el-option value="3" label="待复审"></el-option>
                <el-option value="4" label="复审未通过"></el-option>
                <el-option value="5" label="采购中"></el-option>
                <el-option value="6" label="待入库"></el-option>
                <el-option value="7" label="部分入库"></el-option>
                <el-option value="8" label="已完成"></el-option>
                <el-option value="9" label="结束"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button @click="getList(1)">查 询</el-button>
              <el-button type="primary" @click="ResetForm('chaOrderFrom')">重 置</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-button type="primary" @click="addOrderVisible = true;editOrde  = false;addOrEdit = 1;">新增</el-button>
      <!-- <el-button @click="edit" :disabled="selectedList.length == 0">编辑</el-button>
            <el-button @click="del" :disabled="selectedList.length == 0">删除</el-button>
      <el-button @click="check">提审</el-button>-->
      <!-- <el-button @click="stop">终止采购</el-button> -->
      <el-table border :data="orderList" @selection-change="handleSelectionChange">
        <el-table-column type="index" label="序号" align="center" width="50px"></el-table-column>
        <el-table-column prop="porderCode" label="订单编号" width="200px" align="center"></el-table-column>
        <el-table-column prop="supplierDOs.supName" label="供应商" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="porderPalnmoney" label="预付款金额" width="100px"></el-table-column>
        <el-table-column prop="porderTotalmoney" label="采购总价"></el-table-column>
        <el-table-column prop="porderTotalnum" label="采购总数量" width="100px"></el-table-column>
        <el-table-column prop="porderDiffernumber" label="差异数量"></el-table-column>
        <el-table-column prop="basicId" label="入库仓库"></el-table-column>
        <el-table-column prop="porderArrivalstatus" label="到货情况"></el-table-column>
        <el-table-column prop="porderProducer" label="制单人员"></el-table-column>
        <el-table-column prop="porderBuyer" label="采购人"></el-table-column>
        <!-- <el-table-column prop="porderCompletenum" label="已采购数量"></el-table-column> -->
        <el-table-column prop="porderStarttime" label="采购周期" width="200" align="center">
          <template slot-scope="scope">{{scope.row.porderStarttime+"-"+scope.row.porderStoptime}}</template>
        </el-table-column>
        <el-table-column prop="porderTime" label="制单时间" width="200" align="center"></el-table-column>
        <el-table-column prop="porderReviewedtime" label="审批时间" width="200" align="center"></el-table-column>
        <el-table-column prop="porderState" label="订单状态" width="105px" align="center">
          <template slot-scope="scope">
            <el-tag type="danger" v-if="scope.row.porderState==0">初始化</el-tag>
            <el-tag type="danger" v-if="scope.row.porderState==1">待初审</el-tag>
            <el-tag type="danger" v-if="scope.row.porderState==2">初审未通过</el-tag>
            <el-tag type="danger" v-if="scope.row.porderState==3">待复审</el-tag>
            <el-tag type="danger" v-if="scope.row.porderState==4">复审未通过</el-tag>
            <el-tag type="danger" v-if="scope.row.porderState==5">采购中</el-tag>
            <el-tag type="danger" v-if="scope.row.porderState==6">待入库</el-tag>
            <el-tag type="danger" v-if="scope.row.porderState==7">部分入库</el-tag>
            <el-tag type="danger" v-if="scope.row.porderState==8">已完成</el-tag>
            <el-tag type="danger" v-if="scope.row.porderState==9">结束</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="270px" align="center" fixed="right">
          <template slot-scope="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              v-if="scope.row.porderState==0||scope.row.porderState==2||scope.row.porderState==4"
              @click="showEditOrder(scope.row.porderCode)"
            >编辑</el-button>
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              v-if="scope.row.porderState==0"
              @click="editPurOrderState(scope.row,1)"
            >提审</el-button>
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              v-if="scope.row.porderState==2||scope.row.porderState==4"
              @click="showLookUpOrder(scope.row.porderCode)"
            >查看</el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              v-if="scope.row.porderState==0||scope.row.porderState==2||scope.row.porderState==4"
              @click="deletebumen(scope.row.porderCode)"
            >删除</el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              v-if="scope.row.porderState==5||scope.row.porderState==6||scope.row.porderState==7"
              @click="editPurOrderState(scope.row,9)"
            >终止</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="10"
        layout="total, prev,pager, next"
        :total="total"
      ></el-pagination>
    </el-card>
    <el-dialog
      title="新增订单"
      :visible.sync="addOrderVisible"
      width="75%"
      :before-close="handleClose"
      @closed="dialogClosed"
    >
      <el-form
        :label-position="labelPosition"
        :model="addOrderForm"
        ref="addOrderRef"
        :rules="addOrderRules"
        :inline="true"
      >
        <el-row>
          <!-- <el-form-item label="订单编号 ：" prop="Id">
                        <el-input v-model="addOrderForm.Id" placeholder="订单编号" class="_small"></el-input>
          </el-form-item>-->
          <el-form-item label="制单人员" prop="porderProducer">
            <el-input v-model="addOrderForm.porderProducer" :disabled="true" class="_small"></el-input>
          </el-form-item>
          <el-form-item label="采购周期" prop="time">
            <el-date-picker
              v-model="addOrderForm.time"
              type="daterange"
              value-format="yyyy-MM-dd"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </el-form-item>
          <!-- <el-form-item label="选择仓库：" prop="basicId">
                        <el-select v-model="addOrderForm.basicId" placeholder="请选择" class="_small">
                            <el-option
                            v-for="item in cangku"
                            :key="item.basicId"
                            :label="item.basicRetainone"
                            :value="item.basicId">
                            </el-option>
          </el-select>-->
          <!-- </el-form-item> -->
          <!-- 不需要 -->
          <el-form-item label="选择供应商" prop="supplierId">
            <el-select v-model="addOrderForm.supplierId" placeholder="请选择" class="_small">
              <el-option
                v-for="item in gongyinshang"
                :key="item.supplierId"
                :label="item.supName"
                :value="item.supplierId"
              ></el-option>
            </el-select>
          </el-form-item>
          <!-- <el-form-item label="采购描述" prop="tporderBuyexplainime">
                        <el-input type="textarea" v-model="addOrderForm.porderBuyexplain"></el-input>
          </el-form-item>-->
        </el-row>
        <hr />
        <el-button type="primary" @click="gongyingshangpi">添加商品</el-button>
        <el-button
          type="dange"
          :disabled="addSelectedList.length == 0 && addSelectedList_two == 0"
          @click="deleteAddbumen"
        >删除商品</el-button>
        <el-table border :data="addOrderForm.pcommodityDos" @selection-change="addSelectionChange">
          <el-table-column type="selection" width="40" align="center"></el-table-column>
          <el-table-column type="index" width="50px" align="center" label="序号"></el-table-column>
          <el-table-column prop="supgoolsBigType" label="商品名称"></el-table-column>
          <el-table-column prop="supgoolsId" label="商品编码"></el-table-column>
          <el-table-column prop="supgoolssmallType" label="商品小类型" v-if="panduan.supgoolssmallType1"></el-table-column>
          <el-table-column prop="supgoolsBrand" label="品牌" v-if="panduan.supgoolsBrand1"></el-table-column>
          <el-table-column prop="supgoolsWeight" label="克重" v-if="panduan.supgoolsWeight1"></el-table-column>
          <el-table-column prop="supgoolsWidths" label="门幅" v-if="panduan.supgoolsWidths1"></el-table-column>
          <el-table-column prop="supgoolCoated" label="淋膜类型" v-if="panduan.supgoolCoated1"></el-table-column>
          <el-table-column prop="supgoolsLength" label="尺寸/长" v-if="panduan.supgoolsLength1"></el-table-column>
          <el-table-column prop="supgoolsWidth" label="尺寸/宽" v-if="panduan.supgoolsWidth1"></el-table-column>
          <el-table-column prop="supgoolsHeight" label="尺寸/厚" v-if="panduan.supgoolsHeight1"></el-table-column>
          <el-table-column prop="supgoolsBradth" label="宽度" v-if="panduan.supgoolsBradth1"></el-table-column>
          <el-table-column prop="supgoolsColor" label="颜色" v-if="panduan.supgoolsColor1"></el-table-column>
          <el-table-column prop="supName" label="供应商" align="center"></el-table-column>

          <el-table-column prop="pcommodityStock" label="当前库存" align="center">
            <!-- <template scope="scope"> -->
            <!-- <el-input v-model="scope.row.pcommodityStock"></el-input> -->
            <!-- </template>                     -->
          </el-table-column>
          <el-table-column prop="pcommodityUnit" label="单位" align="center">
            <!-- <template scope="scope"> -->
            <!-- <el-input v-model="scope.row.pcommodityUnit"></el-input> -->
            <!-- </template> -->
          </el-table-column>
          <el-table-column prop="pcommodityPrice" label="采购价" align="center">
            <template scope="scope">
              <el-input v-model="scope.row.pcommodityPrice" @blur="jisuan"></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="pcommodityPalnnum" label="采购数量" align="center">
            <template scope="scope">
              <el-input v-model="scope.row.pcommodityPalnnum" @blur="jisuan"></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="spmc" label="采购金额" align="center">
            <template scope="scope">{{scope.row.pcommodityPalnnum*scope.row.pcommodityPrice}}</template>
          </el-table-column>
        </el-table>
        <!-- <div class="jisuan">
                                   <el-form-item prop="porderTotalnum">
                                   <span>采购总数量: {{addOrderForm.porderTotalnum}}</span>
                                  </el-form-item>
                                 <el-form-item  prop="porderTotalmoney">
                                <span>总金额: {{addOrderForm.porderTotalmoney}}</span>
                                </el-form-item></div>
        <br>-->
        <!-- <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page.sync="currentPage"
                :page-sizes="[10]"
                :page-size="100"
                layout="total, sizes, prev, pager, next"
                :total="total"
        ></el-pagination>-->
        <hr />
        <el-form-item label="订单数量" prop="porderTotalnum">
          <el-input v-model="addOrderForm.porderTotalnum" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="订单金额" prop="porderTotalmoney">
          <el-input v-model="addOrderForm.porderTotalmoney" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="预付款金额" prop="porderPalnmoney">
          <el-input v-model="addOrderForm.porderPalnmoney"></el-input>
        </el-form-item>

        <el-form-item label="付款说明" prop="porderExplain">
          <el-input
            type="textarea"
            placeholder="请输入内容"
            v-model="addOrderForm.porderExplain"
            style="width: 600px"
          ></el-input>
        </el-form-item>
        <el-form-item label="采购描述" class="w500" prop="porderBuyexplain">
          <el-input
            type="textarea"
            placeholder="请输入内容"
            v-model="addOrderForm.porderBuyexplain"
            style="width: 600px"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addCancel()">取消</el-button>
        <el-button @click="addSave" type="primary">保存</el-button>
      </span>
    </el-dialog>
    <!--  @closed="dialogClosed" -->
    <el-dialog
      :title="lookUpState?'查看订单':'修改订单' "
      :visible.sync="editOrderVisible"
      width="75%"
      :before-close="handleClose"
      @closed="dialogClosed"
    >
      <el-form
        :label-position="labelPosition"
        :model="editOrderForm"
        ref="addOrderRef"
        :rules="addOrderRules"
        :inline="true"
      >
        <el-row>
          <!-- <el-form-item label="订单编号 ：" prop="Id">
                        <el-input v-model="addOrderForm.Id" placeholder="订单编号" class="_small"></el-input>
          </el-form-item>-->
          <el-form-item label="制单人员" prop="porderProducer">
            <el-input v-model="editOrderForm.porderProducer" :disabled="true" class="_small"></el-input>
          </el-form-item>
          <!-- <el-form-item label="选择仓库：" prop="basicId">
                        <el-select v-model="editOrderForm.basicId" placeholder="请选择" class="_small">
                            <el-option
                            v-for="item in cangku"
                            :key="item.basicId"
                            :label="item.basicRetainone"
                            :value="item.basicId">
                            </el-option>
                        </el-select>
          </el-form-item>-->
          <el-form-item label="采购周期" prop="time">
            <el-date-picker
              v-model="editOrderForm.time"
              type="daterange"
              format="yyyy年MM月dd日"
              value-format="yyyy-MM-dd"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :disabled="lookUpState"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="选择供应商" prop="supplierId">
            <el-select
              v-model="editOrderForm.supplierId"
              placeholder="请选择"
              class="_small"
              :disabled="lookUpState"
            >
              <el-option
                v-for="item in gongyinshang"
                :key="item.supplierId"
                :label="item.supName"
                :value="item.supplierId"
              ></el-option>
            </el-select>
          </el-form-item>

          <!-- <el-form-item label="采购描述" prop="porderBuyexplain">
                        <el-input type="textarea" v-model="editOrderForm.porderBuyexplain"></el-input>
          </el-form-item>-->
        </el-row>
        <hr />
        <el-button type="primary" @click="gongyingshangpi2()" :disabled="lookUpState">添加商品</el-button>
        <el-button
          type="dange"
          :disabled="addSelectedList.length == 0 && addSelectedList_two == 0"
          @click="deleteAddbumen"
        >删除商品</el-button>
        <el-table border :data="editOrderForm.pcommodityDos" @selection-change="addSelectionChange">
          <el-table-column type="selection" width="40" align="center"></el-table-column>
          <el-table-column type="index" width="50px" align="center" label="序号"></el-table-column>
          <el-table-column prop="supgoolsBigType" label="商品名称"></el-table-column>
          <el-table-column prop="supgoolsId" label="商品编码"></el-table-column>
          <el-table-column prop="supgoolssmallType" label="商品小类型" width="100px" v-if="panduan.supgoolssmallType1"></el-table-column>
          <el-table-column prop="supgoolsBrand" label="品牌" v-if="panduan.supgoolsBrand1"></el-table-column>
          <el-table-column prop="supgoolsWeight" label="克重" v-if="panduan.supgoolsWeight1"></el-table-column>
          <el-table-column prop="supgoolsWidths" label="门幅" v-if="panduan.supgoolsWidths1"></el-table-column>
          <el-table-column prop="supgoolCoated" label="淋膜类型" v-if="panduan.supgoolCoated1"></el-table-column>
          <el-table-column prop="supgoolsLength" label="尺寸/长" v-if="panduan.supgoolsLength1"></el-table-column>
          <el-table-column prop="supgoolsWidth" label="尺寸/宽" v-if="panduan.supgoolsWidth1"></el-table-column>
          <el-table-column prop="supgoolsHeight" label="尺寸/厚" v-if="panduan.supgoolsHeight1"></el-table-column>
          <el-table-column prop="supgoolsBradth" label="宽度" v-if="panduan.supgoolsBradth1"></el-table-column>
          <el-table-column prop="supgoolsColor" label="颜色" v-if="panduan.supgoolsColor1"></el-table-column>
          <el-table-column prop="supName" label="供应商" align="center"></el-table-column>

          <el-table-column prop="pcommodityStock" label="当前库存" align="center">
            <!-- <template scope="scope"> -->
            <!-- <el-input v-model="scope.row.pcommodityStock"></el-input> -->
            <!-- </template>                     -->
          </el-table-column>
          <el-table-column prop="pcommodityUnit" label="单位" align="center">
            <!-- <template scope="scope"> -->
            <!-- <el-input v-model="scope.row.pcommodityUnit"></el-input> -->
            <!-- </template> -->
          </el-table-column>
          <el-table-column prop="pcommodityPrice" label="采购价" align="center">
            <template scope="scope">
              <el-input v-model="scope.row.pcommodityPrice" @blur="jisuan2" :disabled="lookUpState"></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="pcommodityPalnnum" label="采购数量" align="center">
            <template scope="scope">
              <el-input
                v-model="scope.row.pcommodityPalnnum"
                @blur="jisuan2"
                :disabled="lookUpState"
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="spmc" label="采购金额" align="center">
            <template scope="scope">{{scope.row.pcommodityPalnnum*scope.row.pcommodityPrice}}</template>
          </el-table-column>
        </el-table>
        <!-- <div class="jisuan">
                                   <el-form-item prop="porderTotalnum">
                                   <span>采购总数量: {{editOrderForm.porderTotalnum}}</span>
                                  </el-form-item>
                                 <el-form-item  prop="porderTotalmoney">
                                <span>总金额: {{editOrderForm.porderTotalmoney}}</span>
                                </el-form-item></div>
        <br>-->
        <!-- <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page.sync="currentPage"
                :page-sizes="[100, 200, 300, 400]"
                :page-size="100"
                layout="total, sizes, prev, pager, next, jumper"
                :total="800"
            ></el-pagination>
        -->

        <hr />

        <el-form-item label="订单数量" prop="porderTotalnum">
          <el-input v-model="editOrderForm.porderTotalnum" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="订单金额" prop="porderTotalmoney">
          <el-input v-model="editOrderForm.porderTotalmoney" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="预付款金额" prop="porderPalnmoney">
          <el-input v-model="editOrderForm.porderPalnmoney" :disabled="lookUpState"></el-input>
        </el-form-item>

        <el-form-item label="付款说明" prop="porderExplain">
          <el-input
            type="textarea"
            placeholder="请输入内容"
            v-model="editOrderForm.porderExplain"
            style="width: 600px"
            :disabled="lookUpState"
          ></el-input>
        </el-form-item>
        <el-form-item label="采购描述" class="w500" prop="porderBuyexplain">
          <el-input
            type="textarea"
            placeholder="请输入内容"
            v-model="editOrderForm.porderBuyexplain"
            style="width: 600px"
            :disabled="lookUpState"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer" v-show="!lookUpState">
        <el-button @click="addCancel()">取消</el-button>
        <el-button @click="editOrder" type="primary">保存</el-button>
      </span>
      <span slot="footer" class="dialog-footer" v-show="lookUpState">
        <el-button @click="lookUpState=false;addCancel()" type="primary">确定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="新增商品"
      :visible.sync="addOrder_addgoods"
      width="58%"
      :before-close="handleClose"
      @closed="closeAddGoods"
    >
      <el-form
        :model="addOrderFormGoods"
        ref="addOrderFormGoods"
        :rules="addOrderGoodsRules"
        :inline="true"
      >
        <el-form-item label="商品名称" prop="Name">
          <el-select placeholder="请选择商品" v-model="addOrderForm.lab" @change="gongyingshangpi" v-if="addOrEdit == 1">
            <el-option value="纸张" id="show">纸张</el-option>
            <el-option value="纸箱" id="show">纸箱</el-option>
            <el-option value="袋子" id="show">袋子</el-option>
            <el-option value="油墨" id="show">油墨</el-option>
            <el-option value="胶带" id="show">胶带</el-option>
          </el-select>
          <el-select placeholder="请选择商品" v-model="addOrderForm.lab" @change="gongyingshangpi2" v-if="addOrEdit == 2">
            <el-option value="纸张" id="show">纸张</el-option>
            <el-option value="纸箱" id="show">纸箱</el-option>
            <el-option value="袋子" id="show">袋子</el-option>
            <el-option value="油墨" id="show">油墨</el-option>
            <el-option value="胶带" id="show">胶带</el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="商品编号" prop="Id">
                <el-input v-model="addOrderFormGoods.Id"></el-input>
        </el-form-item>-->
        <!-- <el-button @click="gongyingshangpi" v-if="addOrEdit == 1">查询</el-button> -->
        <el-button @click="gongyingshangpi2" v-if="addOrEdit == 2">查询</el-button>
        <el-button type="primary" @click="ResetFormaddOrderFormGoods">重置</el-button>
      </el-form>
      <hr />
      <el-table border stripe :data="shangpi" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="40"></el-table-column>
        <el-table-column type="index" width="50px" label="序号" align="center"></el-table-column>
        <el-table-column prop="supgoolsBigType" label="商品名称"></el-table-column>
        <el-table-column prop="supgoolsId" label="商品编码"></el-table-column>
        <el-table-column prop="supgoolssmallType" label="商品小类型" v-if="panduan.supgoolssmallType1"></el-table-column>
        <el-table-column prop="supgoolsBrand" label="品牌" v-if="panduan.supgoolsBrand1"></el-table-column>
        <el-table-column prop="supgoolsWeight" label="克重" v-if="panduan.supgoolsWeight1"></el-table-column>
        <el-table-column prop="supgoolsWidths" label="门幅" v-if="panduan.supgoolsWidths1"></el-table-column>
        <el-table-column prop="supgoolCoated" label="淋膜类型" v-if="panduan.supgoolCoated1"></el-table-column>
        <el-table-column prop="supgoolsLength" label="尺寸/长" v-if="panduan.supgoolsLength1"></el-table-column>
        <el-table-column prop="supgoolsWidth" label="尺寸/宽" v-if="panduan.supgoolsWidth1"></el-table-column>
        <el-table-column prop="supgoolsHeight" label="尺寸/厚" v-if="panduan.supgoolsHeight1"></el-table-column>
        <el-table-column prop="supgoolsBradth" label="宽度" v-if="panduan.supgoolsBradth1"></el-table-column>
        <el-table-column prop="supgoolsColor" label="颜色" v-if="panduan.supgoolsColor1"></el-table-column>
        <el-table-column prop="supName" label="供应商"></el-table-column>
      </el-table>
      <!-- <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page.sync="currentPage"
                :page-sizes="[10]"
                :page-size="100"
                layout="total, sizes, prev, pager, next"
                :total="total"
      ></el-pagination>-->
      <span slot="footer" class="dialog-footer">
        <el-button @click="addOrder_addgoods=false">取消</el-button>
        <el-button @click="deleteRow" type="primary">保存</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      search: {
        ddbh: "",
        rylx: "制单人员",
        ry: "",
        ddzt: "",
        zdsj: "",
        timelx: "",
        date: []
      },
      rylx: [{ Id: "1", Name: "制单人员" }, { Id: "2", Name: "审核人员" }],
      ddzt: [
        { Id: "1", Name: "全部" },
        { Id: "2", Name: "待审核" },
        { Id: "3", Name: "审核通过" },
        { Id: "4", Name: "审核不通过" }
      ],
      timelx: [{ Id: "1", Name: "制单时间" }, { Id: "2", Name: "采购周期" }],
      orderList: [],
      selectedList: [],
      currentPage: 0,
      editOrde: false,
      addOrderVisible: false,
      editOrderVisible: false,
      labelPosition: "right",
      total: 0,
      addOrderForm: {
        porderProducer: "", //制单人员
        time: [], //采购周期范围
        porderBuyexplain: "", //采购描述
        // time:'',
        basicId: "",
        supplierId: "",
        suppliergoolsId: "",
        porderTotalnum: 0,
        porderTotalmoney: 0,
        porderPalnmoney: "", //预付款金额
        porderBuyexplain: "",
        porderExplain: "",
        pcommodityDos: [],
        lab: "纸张",
        pageCode: 1, //当前页
        pageSize: 10 //每页显示的记录数
      },
      editOrderForm: {
        porderCode:"",
        porderBuyexplain: "", //采购描述
        porderProducer: "",
        porderPalnmone:"",
        basicId: "",
        supName: "",
        time: "",
        suppliergoolsId: "",
        porderTotalnum: 0,
        porderTotalmoney: 0,
        porderPalnmoney: '' ,// 预付款金额
        // porderBuyexplain:'',
        porderExplain: "",
        pcommodityDos: [],
        lab: "纸张",
        supplierId:0,
        pageCode: 1, //当前页
        pageSize: 10 //每页显示的记录数
      },
      lookUpState: false,
      chaOrderFrom: {
        porderCode: "", //订单编号
        porderProducer: "", //制单人员
        time: [], //制单时间范围
        porderArrivalstatus: "", //到货情况
        porderState: "", //订单状态
        pageCode: 1, //当前页
        pageSize: 10 //每页显示的记录数
      },
      // 实际查询参数
      chaOrder: {
        porderCode: "", //订单编号
        porderProducer: "", //制单人员
        time: [], //制单时间范围
        porderArrivalstatus: "", //到货情况
        porderState: "", //订单状态
        pageCode: 1, //当前页
        pageSize: 10 //每页显示的记录数
      }, //
      chaSupplierForm: {
        a: ""
      },
      gongyinshang: [],
      cangku: [],
      addOrderRules: {
        Id: [],
        zdry: []
      },
      ck: [{ Id: 1, Name: "A仓库" }, { Id: 2, Name: "B仓库" }],
      gys: [{ Id: 1, Name: "A供应商" }, { Id: 2, Name: "B供应商" }],
      addSelectedList: [],
      addSelectedList_two: [],
      goods: [{}, {}],
      allCount: 0,
      allMoney: 0,
      preMoney: 0,
      addOrder_addgoods: false,
      addOrderFormGoods: {
        Id: "",
        Name: "",
        gys: ""
      },
      delarr: [],
      delarr1: [],
      shangpi: [],
      total: 0,

      addOrderGoodsRules: {},
      goods_two: [],
      AddGoods: [],
      value1: "",
      currentPage: 0,
      Totalnum: 0,
      Totalmoney: 0,
      panduan: {
        supgoolCoated1: false,
        supgoolsBradth1: false,
        supgoolsBrand1: false,
        supgoolsColor1: false,
        supgoolsHeight1: false,
        supgoolsLength1: false,
        supgoolsWeight1: false,
        supgoolsWidth1: false,
        supgoolsWidths1: false,
        supgoolssmallType1: false
      },
      // 添加商品时属于新增还是编辑 1 新增 2 编辑
      addOrEdit:1,
    };
  },
  created() {
    this.addOrderForm = this.addOrderForm;
    this.chaCopy();
    this.getList();
    this.getCha();
    this.getCookie();
  },
  methods: {
    jisuan() {
      this.addOrderForm.porderTotalnum = 0;
      this.addOrderForm.porderTotalmoney = 0;
      this.Totalnum = parseInt(this.editOrderForm.porderTotalnum);
      this.Totalmoney = parseInt(this.editOrderForm.porderTotalmoney);
      for (
        let index = 0;
        index < this.addOrderForm.pcommodityDos.length;
        index++
      ) {
        if (
          isNaN(this.addOrderForm.pcommodityDos[index].pcommodityPrice) ||
          isNaN(this.addOrderForm.pcommodityDos[index].pcommodityPalnnum)
        ) {
          continue;
        }
        this.addOrderForm.porderTotalnum += parseInt(
          this.addOrderForm.pcommodityDos[index].pcommodityPalnnum
        );
        this.addOrderForm.porderTotalmoney +=
          parseInt(this.addOrderForm.pcommodityDos[index].pcommodityPrice) *
          parseInt(this.addOrderForm.pcommodityDos[index].pcommodityPalnnum);
        this.Totalnum += parseInt(
          this.addOrderForm.pcommodityDos[index].pcommodityPalnnum
        );
        this.Totalmoney +=
          parseInt(this.addOrderForm.pcommodityDos[index].pcommodityPrice) *
          parseInt(this.addOrderForm.pcommodityDos[index].pcommodityPalnnum);

        this.editOrderForm.porderTotalnum = this.Totalnum;
        this.editOrderForm.porderTotalmoney = this.Totalmoney;
      }
      console.log(this.addOrderForm.porderTotalnum);
    },
    // 修改订单中的计算
    jisuan2() {
      this.editOrderForm.porderTotalnum = 0;
      this.editOrderForm.porderTotalmoney = 0;
      this.Totalnum = parseInt(this.editOrderForm.porderTotalnum);
      this.Totalmoney = parseInt(this.editOrderForm.porderTotalmoney);
      for (
        let index = 0;
        index < this.editOrderForm.pcommodityDos.length;
        index++
      ) {
        if (
          isNaN(this.editOrderForm.pcommodityDos[index].pcommodityPrice) ||
          isNaN(this.editOrderForm.pcommodityDos[index].pcommodityPalnnum)
        ) {
          continue;
        }
        this.editOrderForm.porderTotalnum += parseInt(
          this.editOrderForm.pcommodityDos[index].pcommodityPalnnum
        );
        this.editOrderForm.porderTotalmoney +=
          parseInt(this.editOrderForm.pcommodityDos[index].pcommodityPrice) *
          parseInt(this.editOrderForm.pcommodityDos[index].pcommodityPalnnum);
        this.Totalnum += parseInt(
          this.editOrderForm.pcommodityDos[index].pcommodityPalnnum
        );
        this.Totalmoney +=
          parseInt(this.editOrderForm.pcommodityDos[index].pcommodityPrice) *
          parseInt(this.editOrderForm.pcommodityDos[index].pcommodityPalnnum);

        this.editOrderForm.porderTotalnum = this.Totalnum;
        this.editOrderForm.porderTotalmoney = this.Totalmoney;
      }
      console.log(this.editOrderForm.porderTotalnum);
    },
    //读取cookie
    getCookie: function() {
      if (document.cookie.length > 0) {
        var arr = document.cookie.split("; "); //这里显示的格式需要切割一下自己可输出看下
        for (var i = 0; i < arr.length; i++) {
          var arr2 = arr[i].split("="); //再次切割
          //判断查找相对应的值
          if (arr2[0] == "userName") {
            //  console.log(arr2[1])
            this.addOrderForm.porderProducer = arr2[1]; //保存到保存数据的地方
          }
        }
        this.checked = true;
      }
    },
    ResetForm(formName) {
      this.$refs[formName].resetFields();
      // this.chaOrderFrom.porderProducer="";
      // this.porderTime
      // this.porderStarttime
      // this.getList()
    },
    async getCha() {
      const { data: res } = await this.$http.post(
        "jc/supplier/selectSupplier",
        { params: this.chaSupplierForm }
      );
      const { data: res1 } = await this.$http.post(
        "jc/Basic/selectwarehousing"
      );
      this.gongyinshang = res.body.rows;
      this.cangku = res1;
    },
    async gongyingshangpi() {
      //    this.panduan.supgoolCoated1= false
      //    this.panduan.supgoolsBradth1= false
      //    this.panduan.supgoolsBrand1= false
      //    this.panduan.supgoolsColor1=false
      //    this.panduan.supgoolsHeight1= false
      //    this.panduan.supgoolsLength1= false
      //    this.panduan.supgoolsWeight1= false
      //    this.panduan.supgoolsWidth1=false
      //    this.panduan.supgoolsWidths1= false
      //    this.panduan.supgoolssmallType= false
    //   !!!
      console.log('新增订单时编辑商品')
      

      // if (this.addOrderForm.supplierId == "") {
      //   this.$message({
      //     type: "info",
      //     message: "请选择供应商"
      //   });
      // }else 
      {
        const { data: res } = await this.$http.post(
          "jc/suppliergoods/selectSuppliergoolslist",
          { params: this.addOrderForm }
        );
        console.log(res);
        for (let index = 0; index < res.body.rows.length; index++) {
          if (res.body.rows[index].supgoolssmallType == "") {
            this.panduan.supgoolssmallType1 = false;
          } else {
            this.panduan.supgoolssmallType1 = true;
          }
          if (res.body.rows[index].supgoolCoated == "") {
            this.panduan.supgoolCoated1 = false;
          } else {
            this.panduan.supgoolCoated1 = true;
          }
          if (res.body.rows[index].supgoolsBrand == "") {
            this.panduan.supgoolsBrand1 = false;
          } else {
            this.panduan.supgoolsBrand1 = true;
          }
          if (res.body.rows[index].supgoolsWeight == null) {
            this.panduan.supgoolsWeight1 = false;
          } else {
            this.panduan.supgoolsWeight1 = true;
          }
          if (res.body.rows[index].supgoolsWidths == null) {
            this.panduan.supgoolsWidths1 = false;
          } else {
            this.panduan.supgoolsWidths1 = true;
          }
          if (res.body.rows[index].supgoolsBradth == null) {
            this.panduan.supgoolsBradth1 = false;
          } else {
            this.panduan.supgoolsBradth1 = true;
          }
          if (res.body.rows[index].supgoolsLength == null) {
            this.panduan.supgoolsLength1 = false;
          } else {
            this.panduan.supgoolsLength1 = true;
          }
          if (res.body.rows[index].supgoolsWidth == null) {
            this.panduan.supgoolsWidth1 = false;
          } else {
            this.panduan.supgoolsWidth1 = true;
          }
          if (res.body.rows[index].supgoolsHeight == null) {
            this.panduan.supgoolsHeight1 = false;
          } else {
            this.panduan.supgoolsHeight1 = true;
          }
          if (res.body.rows[index].supgoolsColor == "") {
            this.panduan.supgoolsColor1 = false;
          } else {
            this.panduan.supgoolsColor1 = true;
          }
        }
        console.log(this.panduan);

        this.shangpi = res.body.rows;
        this.total = res.body.total;
        this.addOrder_addgoods = true;
      }
    },

    // 编辑时的添加商品方法
    async gongyingshangpi2() {
      //    this.panduan.supgoolCoated1= false
      //    this.panduan.supgoolsBradth1= false
      //    this.panduan.supgoolsBrand1= false
      //    this.panduan.supgoolsColor1=false
      //    this.panduan.supgoolsHeight1= false
      //    this.panduan.supgoolsLength1= false
      //    this.panduan.supgoolsWeight1= false
      //    this.panduan.supgoolsWidth1=false
      //    this.panduan.supgoolsWidths1= false
      //    this.panduan.supgoolssmallType= false
    //   !!!
      

      console.log('添加商品时编辑')
      this.editOrderForm.lab= this.addOrderForm.lab

      // if (this.editOrderForm.supplierId == "") {
      //   this.$message({
      //     type: "info",
      //     message: "请选择供应商"
      //   });
      // }else 
      {
        const { data: res } = await this.$http.post(
          "jc/suppliergoods/selectSuppliergoolslist",
          { params: this.editOrderForm }
        );
        console.log(res);
        for (let index = 0; index < res.body.rows.length; index++) {
          if (res.body.rows[index].supgoolssmallType == "") {
            this.panduan.supgoolssmallType1 = false;
          } else {
            this.panduan.supgoolssmallType1 = true;
          }
          if (res.body.rows[index].supgoolCoated == "") {
            this.panduan.supgoolCoated1 = false;
          } else {
            this.panduan.supgoolCoated1 = true;
          }
          if (res.body.rows[index].supgoolsBrand == "") {
            this.panduan.supgoolsBrand1 = false;
          } else {
            this.panduan.supgoolsBrand1 = true;
          }
          if (res.body.rows[index].supgoolsWeight == null) {
            this.panduan.supgoolsWeight1 = false;
          } else {
            this.panduan.supgoolsWeight1 = true;
          }
          if (res.body.rows[index].supgoolsWidths == null) {
            this.panduan.supgoolsWidths1 = false;
          } else {
            this.panduan.supgoolsWidths1 = true;
          }
          if (res.body.rows[index].supgoolsBradth == null) {
            this.panduan.supgoolsBradth1 = false;
          } else {
            this.panduan.supgoolsBradth1 = true;
          }
          if (res.body.rows[index].supgoolsLength == null) {
            this.panduan.supgoolsLength1 = false;
          } else {
            this.panduan.supgoolsLength1 = true;
          }
          if (res.body.rows[index].supgoolsWidth == null) {
            this.panduan.supgoolsWidth1 = false;
          } else {
            this.panduan.supgoolsWidth1 = true;
          }
          if (res.body.rows[index].supgoolsHeight == null) {
            this.panduan.supgoolsHeight1 = false;
          } else {
            this.panduan.supgoolsHeight1 = true;
          }
          if (res.body.rows[index].supgoolsColor == "") {
            this.panduan.supgoolsColor1 = false;
          } else {
            this.panduan.supgoolsColor1 = true;
          }
        }
        console.log(this.panduan);

        this.shangpi = res.body.rows;
        this.total = res.body.total;
        this.addOrder_addgoods = true;
      }
    },


    handleSelectionChange(val) {
      this.selectedList = val;
      console.log(val);
    },
    // selected(){
    // this.delVisible = true;
    // this.delarr=[];
    // for (let i = 0; i < this.selectedList.length; i++) {
    //     this.delarr.push(this.selectedList[i].customerId)
    // }
    // console.log(this.delarr);
    // },

    // 原本的
    // async deleteRow(){
    //     for (let i = 0; i < this.selectedList.length; i++) {
    //         console.log(this.selectedList[i]);
    //         this.delarr.push(this.selectedList[i])
    //         this.delarr1.push(this.selectedList[i])

    //     }
    //     console.log(this.delarr);
    //     this.addOrderForm.pcommodityDos=this.delarr;
    //     this.addOrder_addgoods=false;
    // },
    async deleteRow() {
      // 用长度判断是否有商品重复
     let length = 0;
      if (this.addOrEdit == 1) { // 新增时添加商品
      length =  this.addOrderForm.pcommodityDos.length;
        for (let i = 0; i < this.selectedList.length; i++) {
        console.log(this.selectedList[i]);

        // 防止添加的商品已经存在
        if (this.addOrderForm.pcommodityDos.length == 0) {
            this.addOrderForm.pcommodityDos.push(this.selectedList[i]);
        }
        
        for(let j = 0; j<this.addOrderForm.pcommodityDos.length;j++){
            console.log(this.addOrderForm.pcommodityDos[j].supgoolsId);
            if (this.selectedList[i].supgoolsId == this.addOrderForm.pcommodityDos[j].supgoolsId) {
                break;
            }
            // 最后一次循环添加数据
            if (j == this.addOrderForm.pcommodityDos.length-1) {
                this.addOrderForm.pcommodityDos.push(this.selectedList[i]);
            }
        }
        // this.delarr1.push(this.selectedList[i])
      }
       // 当添加商品时如果存在已有商品，则提示用户
       if(this.addOrderForm.pcommodityDos.length < length + this.selectedList.length){
         this.$message({
          type: "info",
          message: "部分商品已经存在!"
        });
       }

      // console.log(this.delarr);
      // this.addOrderForm.pcommodityDos=this.delarr;
      } else if (this.addOrEdit == 2) { // 编辑时添加商品
      length =  this.editOrderForm.pcommodityDos.length;
        for (let i = 0; i < this.selectedList.length; i++) {
        console.log(this.selectedList[i]);

        // 防止添加的商品已经存在
        if (this.editOrderForm.pcommodityDos.length == 0) {
            this.editOrderForm.pcommodityDos.push(this.selectedList[i]);
        }
        for(let j = 0; j<this.editOrderForm.pcommodityDos.length;j++){
            console.log(this.editOrderForm.pcommodityDos[j].supgoolsId);
            if (this.selectedList[i].supgoolsId == this.editOrderForm.pcommodityDos[j].supgoolsId) {
                break;
            }
            // 最后一次循环添加数据
            if (j == this.editOrderForm.pcommodityDos.length-1) {
                this.editOrderForm.pcommodityDos.push(this.selectedList[i]);
            }
        }
        // this.delarr1.push(this.selectedList[i])
      }
      // console.log(this.delarr);
      // this.addOrderForm.pcommodityDos=this.delarr;
     
     if(this.editOrderForm.pcommodityDos.length < length + this.selectedList.length){
         this.$message({
          type: "info",
          message: "部分商品已经存在!"
        });
       }
      }
       // 关闭窗口
      this.addOrder_addgoods = false;

      // 重置默认信息
      this.addOrderForm.lab = '纸张';
    },
    async getList(val) {
      // const { data: res1 } = await this.$http.post("jh/purchase/dtjresultMap");
      // this.chaOrderFrom.pageCode = 1;
      if (val) {
        // 重新点击时，需要重置查询页数
        this.chaOrderFrom.pageCode = 1;
        this.chaCopy();
        console.log(1111);
      }
      const { data: res } = await this.$http.post(
        "jh/purchase/selectpurc2",
        this.chaOrder
      );

      // console.log(res1);
      this.orderList = res.body.rows;
      this.total = res.body.total;
    },
    // 订单单独审核
    async check(val) {
      // addSelectedList所有被选中的订单
      // 批量提审
      // const statusChangeList = [];
      // console.log(this.selectedList.length)
      // for(let i = 0;i<this.selectedList.length;i++ ){
      //     statusChangeList.push(this.selectedList[i].porderCode)
      // }

      const { data: res } = await this.$http.post("/jh/purchase/tishen", {
        // "statusChangeList":statusChangeList
        porderCode: val
      });
      this.getList();
      // console.log(res1);
    },
    // 终止订单
    async stopOrder(val) {
      const { data: res } = await this.$http.post("/jh/purchase/tishen", {
        // "statusChangeList":statusChangeList
        porderCode: val
      });
      this.getList();
    },
    async del() {},
    // 修改订单状态，可用于提审、终止
    async editPurOrderState(purchase, state) {
      purchase.porderState = state;
      const { data: res } = await this.$http.post(
        "/jh/purchase/examine",
        // "statusChangeList":statusChangeList
        purchase
      );
      this.getList();
    },
    async stop() {},
    a(value) {
      alert(value);
    },
    handleSizeChange(val) {
      this.chaOrderFrom.pageSize = val;
      console.log(`每页 ${val} 条`);
      this.getList();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      // 赋值给真实查询条件
      this.chaOrder.pageCode = val;

      this.chaOrderFrom.pageCode = val;
      this.currentPage = val;
      this.getList();
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          this.lookUpState = false;
          done();
        })
        .catch(_ => {});
    },
    dialogClosed() {
      this.$refs.addOrderRef.resetFields();
    },
    closeAddGoods() {
      this.$refs.addOrderFormGoods.resetFields();
    },

    addSelectionChange(val) {
      this.addSelectedList = val;
      console.log(this.addSelectedList);
    },
    addSelectionChange_two(val) {
      this.addSelectedList_two = val;
      console.log(val);
    },
    deleteAddbumen(supplierId) {
      this.$confirm("此操作将移除商品, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          // let param = new URLSearchParams();
          // param.append("supplierId", supplierId);
          // const { data: res } = await this.$http.post(
          //     "/jc/supplier/deleteSupplier",
          //     param
          // );
          console.log(supplierId);
          // this.getSupplierList();

          // supgoolsId 商品id
          // this.addSelectedList所有被选中的商品list
          // addOrderForm.pcommodityDos table中的数据来源

          let array = [];

          // 第一层循环，遍历已选择的商品table绑定的所有数据
          for (let i = 0; i < this.addOrderForm.pcommodityDos.length; i++) {
            // 第二层循环，遍历已选择的商品table中被选中的所有数据
            for (let j = 0; j < this.addSelectedList.length; j++) {
              // 如果两个元素相等，那么新数组不添加该数据
              if (
                this.addOrderForm.pcommodityDos[i] == this.addSelectedList[j]
              ) {
                break;
              }
              // 如果遍历到了内层循环最后一次循环，那么说明该数据不该被删除，添加进数组
              if (j == this.addSelectedList.length - 1) {
                array.push(this.addOrderForm.pcommodityDos[i]);
              }
            }
          }
          // 将已选择的商品table重新赋值
          this.addOrderForm.pcommodityDos = array;

          this.jisuan();

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

    // 编辑商品删除
    deleteAddbumen(supplierId) {
      this.$confirm("此操作将移除商品, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          // let param = new URLSearchParams();
          // param.append("supplierId", supplierId);
          // const { data: res } = await this.$http.post(
          //     "/jc/supplier/deleteSupplier",
          //     param
          // );
          console.log(supplierId);
          // this.getSupplierList();

          // supgoolsId 商品id
          // this.addSelectedList所有被选中的商品list
          // addOrderForm.pcommodityDos table中的数据来源

          let array = [];

          // 第一层循环，遍历已选择的商品table绑定的所有数据
          for (let i = 0; i < this.editOrderForm.pcommodityDos.length; i++) {
            // 第二层循环，遍历已选择的商品table中被选中的所有数据
            for (let j = 0; j < this.addSelectedList.length; j++) {
              // 如果两个元素相等，那么新数组不添加该数据
              if (
                this.editOrderForm.pcommodityDos[i] == this.addSelectedList[j]
              ) {
                break;
              }
              // 如果遍历到了内层循环最后一次循环，那么说明该数据不该被删除，添加进数组
              if (j == this.addSelectedList.length - 1) {
                array.push(this.editOrderForm.pcommodityDos[i]);
              }
            }
          }
          // 将已选择的商品table重新赋值
          this.editOrderForm.pcommodityDos = array;

          this.jisuan2();

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
    // 新增订单取消
    addCancel() {


      this.addOrderForm.pcommodityDos = [];
      this.addOrderVisible = false;
      this.editOrderVisible = false;
      // console.log(1111)
      // console.log(this.addOrderForm)
      // this.ResetForm('addOrderRef');
      // console.log(this.addOrderForm)
    },
    addSave() {
      //保存采购订单
      this.$refs.addOrderRef.validate(async valid => {
        if (!valid) return;
        const { data: res } = await this.$http.post(
          "jh/purchase/createorder",
          this.addOrderForm
        );
        this.addOrderVisible = false;
        this.getList();
        this.addOrderForm.pcommodityDos = [];
        this.delarr = [];
      });
    },
    async showEditOrder(porderCode) {
      //    this.panduan.supgoolCoated1= false
      //    this.panduan.supgoolsBradth1= false
      //    this.panduan.supgoolsBrand1= false
      //    this.panduan.supgoolsColor1=false
      //    this.panduan.supgoolsHeight1= false
      //    this.panduan.supgoolsLength1= false
      //    this.panduan.supgoolsWeight1= false
      //    this.panduan.supgoolsWidth1=false
      //    this.panduan.supgoolsWidths1= false

      // let param = new URLSearchParams();
      // param.append("porderCode", porderCode);
      console.log(porderCode);
      this.editOrderForm.porderCode = porderCode;


      const { data: res } = await this.$http.post("jh/purchase/dtjresultMap", {
        porderCode: porderCode
      });
      console.log(res);

      

      for (let i = 0; i < res[0].pcommodityDos.length; i++) {
        this.delarr.push(res[0].pcommodityDos[i].suppliergoolsId);
        this.delarr.push(res[0].pcommodityDos[i].pcommodityPalnnum);
        this.delarr.push(res[0].pcommodityDos[i].pcommodityPrice);
      }

      const { data: res1 } = await this.$http.post(
        "/jc/suppliergoods/selectSuppliergoolslistmore",
        this.delarr
      );
      // console.log(res);

      for (let index = 0; index < res[0].pcommodityDos.length; index++) {
        for (let i = 0; i < res1.length; i++) {
          if (
            res[0].pcommodityDos[index].suppliergoolsId ==
            res1[i].suppliergoolsId
          ) {
            res[0].pcommodityDos[index].supgoolCoated = res1[i].supgoolCoated;
            res[0].pcommodityDos[index].supgoolsBradth = res1[i].supgoolsBradth;
            res[0].pcommodityDos[index].supgoolsBrand = res1[i].supgoolsBrand;
            res[0].pcommodityDos[index].supgoolsColor = res1[i].supgoolsColor;
            res[0].pcommodityDos[index].supgoolsHeight = res1[i].supgoolsHeight;
            res[0].pcommodityDos[index].supgoolsLength = res1[i].supgoolsLength;
            res[0].pcommodityDos[index].supgoolsWeight = res1[i].supgoolsWeight;
            res[0].pcommodityDos[index].supgoolsWidth1 = res1[i].supgoolsWidth1;
            res[0].pcommodityDos[index].supgoolsWidths = res1[i].supgoolsWidths;
            res[0].pcommodityDos[index].supName = res1[i].supName;
            res[0].pcommodityDos[index].supgoolsBigType =
              res1[i].supgoolsBigType;
            res[0].pcommodityDos[index].supgoolssmallType =
              res1[i].supgoolssmallType;
            res[0].pcommodityDos[index].supgoolsId = res1[i].supgoolsId;
          }
        }
      }
      console.log(res[0].pcommodityDos);

      for (let index = 0; index < res[0].pcommodityDos.length; index++) {
        if (res[0].pcommodityDos[index].supgoolssmallType == "") {
          this.panduan.supgoolssmallType1 = false;
        } else {
          this.panduan.supgoolssmallType1 = true;
        }
        if (res[0].pcommodityDos[index].supgoolCoated == "") {
          this.panduan.supgoolCoated1 = false;
        } else {
          this.panduan.supgoolCoated1 = true;
        }
        if (res[0].pcommodityDos[index].supgoolsBrand == "") {
          this.panduan.supgoolsBrand1 = false;
        } else {
          this.panduan.supgoolsBrand1 = true;
        }
        if (res[0].pcommodityDos[index].supgoolsWeight == null) {
          this.panduan.supgoolsWeight1 = false;
        } else {
          this.panduan.supgoolsWeight1 = true;
        }
        if (res[0].pcommodityDos[index].supgoolsWidths == null) {
          this.panduan.supgoolsWidths1 = false;
        } else {
          this.panduan.supgoolsWidths1 = true;
        }
        if (res[0].pcommodityDos[index].supgoolsBradth == null) {
          this.panduan.supgoolsBradth1 = false;
        } else {
          this.panduan.supgoolsBradth1 = true;
        }
        if (res[0].pcommodityDos[index].supgoolsLength == null) {
          this.panduan.supgoolsLength1 = false;
        } else {
          this.panduan.supgoolsLength1 = true;
        }
        if (res[0].pcommodityDos[index].supgoolsWidth == null) {
          this.panduan.supgoolsWidth1 = false;
        } else {
          this.panduan.supgoolsWidth1 = true;
        }
        if (res[0].pcommodityDos[index].supgoolsHeight == null) {
          this.panduan.supgoolsHeight1 = false;
        } else {
          this.panduan.supgoolsHeight1 = true;
        }
        if (res[0].pcommodityDos[index].supgoolsColor == "") {
          this.panduan.supgoolsColor1 = false;
        } else {
          this.panduan.supgoolsColor1 = true;
        }
      }
      this.delarr1 = res[0].pcommodityDos;
      // this.addOrderForm.pcommodityDos=this.delarr1;
      //  = res[0].
      this.editOrderForm.porderProducer = res[0].porderProducer;
      this.editOrderForm.porderBuyexplain = res[0].porderBuyexplain;
      this.editOrderForm.basicId = res[0].basicId;
      // this.editOrderForm.supplierId = res[0].supplierId;
      // this.addOrderForm.suppliergoolsId = res[0].
      this.editOrderForm.porderTotalnum = res[0].porderTotalnum;
      this.editOrderForm.porderTotalmoney = res[0].porderTotalmoney;
      this.editOrderForm.porderBuyexplain = res[0].porderBuyexplain;
      this.editOrderForm.porderExplain = res[0].porderExplain;
      this.editOrderForm.porderPalnmoney = res[0].porderPalnmoney;
      // this.addOrderForm.lab = res[0].
      this.editOrderForm.pcommodityDos = res[0].pcommodityDos;
      this.editOrderForm.supplierId = Number(res[0].supplierId);

      let time = [res[0].porderStarttime, res[0].porderStoptime];
      this.editOrderForm.time = time;

      this.editOrderVisible = true;

      this.addOrEdit = 2;
    },
    //查看订单
    showLookUpOrder(porderCode) {
      this.lookUpState = true;
      this.showEditOrder(porderCode);
    },
    async editOrder() {
      const { data: res } = await this.$http.post(
        "/jh/purchase/bianji",
        this.editOrderForm
      );
      this.editOrderVisible = false;
      this.getList();
      this.editOrderForm.pcommodityDos = [];
      this.delarr = [];
      // if (res.body.respCode==500) {
      //     this.$message({
      //         type: "info",
      //         message: res.body.msg
      //     });
      //     }else{
      //     this.$message({
      //         type: "success",
      //         message: res.body.msg
      //     });
      //     }
    },

    chooseGoodsgys() {
      //选择供应商
    },
    getGoodsList() {
      //获取商品
    },
    ResetFormaddOrderFormGoods() {
      this.$refs.addOrderFormGoods.resetFields();
    },
    addGoodsToAddOrder(val) {
      //添加商品到订单
    },
    deletebumen(porderCode) {
      this.$confirm("此操作将删除订单, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          let param = new URLSearchParams();
          param.append("porderCode", porderCode);
          const { data: res } = await this.$http.post(
            "jh/purchase/deleteall",
            param
          );
          console.log(res);

          this.getList();

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

    // 深层拷贝
    chaCopy() {
      this.chaOrder.porderCode = this.chaOrderFrom.porderCode;
      this.chaOrder.porderProducer = this.chaOrderFrom.porderProducer;
      this.chaOrder.time = this.chaOrderFrom.time;
      this.chaOrder.porderArrivalstatus = this.chaOrderFrom.porderArrivalstatus;
      this.chaOrder.porderState = this.chaOrderFrom.porderState;
      this.chaOrder.pageCode = this.chaOrderFrom.pageCode;
      this.chaOrder.pageSize = this.chaOrderFrom.pageSize;
    }
  }
};
</script>

<style lang="less">
.el-form-item {
  ._small {
    width: 150px;
  }
}
.w110 {
  width: 110px;
}
.w500 {
  width: 800px;
}
.el-table,
.el-pagination {
  margin-top: 15px;
}
.el-date-picker .el-input {
  width: 150px;
}
.el-date-editor--daterange.el-input,
.el-date-editor--daterange.el-input__inner {
  width: 300px;
}
.el-textarea {
  width: 225%;
}
hr {
  margin-bottom: 15px;
  margin-top: 20px;
}
.jisuan {
  span {
    margin-left: 50px;
  }
  float: right;
  margin-right: 50px;
  margin-top: 15px;
}
</style>
