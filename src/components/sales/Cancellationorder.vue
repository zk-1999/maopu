<template>
  <div class="min1500">
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>销售管理</el-breadcrumb-item>
      <el-breadcrumb-item>销售订单-复审</el-breadcrumb-item>
    </el-breadcrumb>

<el-card>
      <el-form
        :inline="true"
        class="demo-form-inline"
        :model="chaOrdermanagementForm"
        ref="chaOrdermanagementRef"
      >
        <!-- 订单号 -->
        <el-form-item label="订单号：" prop="sorderCode">
          <el-input v-model="chaOrdermanagementForm.sorderCode"></el-input>
        </el-form-item>
        <!-- 订单状态 -->
        <el-form-item label="订单状态：" prop="sorderStatus">
           <el-select v-model="chaOrdermanagementForm.sorderStatus" placeholder="请选择" class="w100">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <!-- 手机号码 -->
        <el-form-item label="客户名称：" prop="customerId">
          <el-select v-model="chaOrdermanagementForm.customerId" placeholder="请选择" class="w100">
            <el-option
              v-for="item in kehu"
              :key="item.customerId"
              :label="item.cusName"
              :value="item.customerId">
            </el-option>
          </el-select>
        </el-form-item>
        <!-- 收货姓名 -->
        <el-form-item label="合同号：" prop="sorderWarehouse">
          <el-input v-model="chaOrdermanagementForm.sorderWarehouse"></el-input>
        </el-form-item>
        <!-- 收货省份 -->
        <el-form-item label="交货方式：" prop="sorderTotalsum">
          <el-input v-model="chaOrdermanagementForm.sorderTotalsum"></el-input>
        </el-form-item>
        <!-- 查询按钮 -->
        <el-form-item >
          <el-button @click="OrdermanagementList">查 询</el-button>
          <el-button type="primary" @click="chaordermanagementForm">重 置</el-button>
        </el-form-item>
      </el-form>
      <!-- </el-row> -->
      <!-- 4个按钮 -->
      <!-- 表格 -->
      <el-table
        :data="ordermanagementList"
        striped
        border
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
 
        <el-table-column type="index" label="序号" width="55" align="center"></el-table-column>
        <el-table-column prop="sorderCode" label="订单号" width="140px"></el-table-column>
        <el-table-column prop="customerDOs.cusName" label="客户名称"></el-table-column>
        <el-table-column prop="sorderWarehouse" label="合同号"></el-table-column>
        <el-table-column prop="sorderAddress" label="交货地点"></el-table-column>
        <el-table-column prop="sorderTotalsum" label="交货方式"></el-table-column>
        <el-table-column prop="sorderAllnumber" label="总数量"></el-table-column>
        <el-table-column prop="sorderTotal" label="总金额"></el-table-column>
        <el-table-column prop="sorderPayamount" label="预付金额" ></el-table-column>
        <el-table-column prop="sorderDeliverytime" label="交货日期"></el-table-column>
        <el-table-column prop="sorderCreatetime" label="下单日期"></el-table-column>
        <el-table-column prop="sorderStatus" label="订单状态" align="center">
          <!-- <template slot-scope="scope">
          <el-tag type="danger" v-if="scope.row.sorderStatus=='0'">初始化</el-tag>
          <el-tag type="danger" v-if="scope.row.sorderStatus=='1'">待初审</el-tag>
          <el-tag type="danger" v-if="scope.row.sorderStatus=='2'">初审未通过</el-tag>
          <el-tag type="danger" v-if="scope.row.sorderStatus=='3'">待审核</el-tag>
          <el-tag type="danger" v-if="scope.row.sorderStatus=='4'">已驳回</el-tag>
          <el-tag type="danger" v-if="scope.row.sorderStatus=='5'">已通过</el-tag>
          <el-tag type="danger" v-if="scope.row.sorderStatus=='6'">待发货</el-tag>
          <el-tag type="danger" v-if="scope.row.sorderStatus=='7'">部分发货</el-tag>
          <el-tag type="danger" v-if="scope.row.sorderStatus=='8'">全部发货</el-tag>
          <el-tag type="danger" v-if="scope.row.sorderStatus=='9'">已完成</el-tag>
          </template > -->
          <template slot-scope="scope">
          <el-tag type="danger" v-if="scope.row.sorderStatus=='0'">初始化</el-tag>
          <el-tag type="danger" v-if="scope.row.sorderStatus=='1'">待初审</el-tag>
          <el-tag type="danger" v-if="scope.row.sorderStatus=='2'">初审未通过</el-tag>
          <el-tag type="danger" v-if="scope.row.sorderStatus=='3'">待审核</el-tag>
          <el-tag type="danger" v-if="scope.row.sorderStatus=='4'">已驳回</el-tag>
          <el-tag type="danger" v-if="scope.row.sorderStatus=='5'">已通过</el-tag>
          <el-tag type="danger" v-if="scope.row.sorderStatus=='6'">待发货</el-tag>
          <el-tag type="danger" v-if="scope.row.sorderStatus=='7'">部分发货</el-tag>
          <el-tag type="danger" v-if="scope.row.sorderStatus=='8'">全部发货</el-tag>
          <el-tag type="danger" v-if="scope.row.sorderStatus=='9'">已完成</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150px" style="text-align:center">
          <template slot-scope="scope">
              <el-button @click="showEditOrdermanagement(scope.row.sorderCode,true,0)" type="success" size="small">查 看</el-button>
             <el-button @click="showEditOrdermanagement(scope.row.sorderCode,true,1)" type="primary" size="small" :disabled="scope.row.sorderStatus!=3">审 批</el-button>
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
    <el-dialog
      :title="xianshi1? '审批销售订单':'查看审批销售订单'"
      :visible.sync="editOrdermanagementVisible"
      width="70%"
      :before-close="handleClose"
    >
     <div class="fenge">基础信息</div>
        <el-form ref="addOrdermanagementRef" label-width="115px" :inline="true" :model="editOrdermanagementForm" :rules="addOrdermanagementRules">
          <el-form-item label="客户名称：" prop="customerId">
          <el-select v-model="editOrdermanagementForm.customerId" class="sel" placeholder="请选择" :disabled="xianshi">
            <el-option
              v-for="item in kehu"
              :key="item.customerId"
              :label="item.cusName"
              :value="item.customerId">
            </el-option>
          </el-select>
        </el-form-item>
          <el-form-item label="交货地点：" prop="">
            <el-input v-model="editOrdermanagementForm.sorderAddress" :disabled="xianshi"></el-input>
          </el-form-item>
          <el-form-item label="合同号：" prop="sorderWarehouse">
            <el-input v-model="editOrdermanagementForm.sorderWarehouse" :disabled="xianshi"></el-input>
          </el-form-item>
          <el-form-item label="交货方式：" prop="sorderTotalsum">
            <el-input v-model="editOrdermanagementForm.sorderTotalsum" :disabled="xianshi"></el-input>
          </el-form-item>
          <el-form-item label="货币类型：" prop="sorderCurrecytype">
            <!-- <el-input v-model="editOrdermanagementForm.sorderCurrecytype" :disabled="xianshi"></!--> 
             <el-select v-model="editOrdermanagementForm.sorderCurrecytype" placeholder="请选择" class="w200" :disabled="xianshi">
                  <el-option
                    v-for="item in huobileixing"
                    :key="item.basicId"
                    :label="item.basicRetainone"
                    :value="item.basicId">
                  </el-option>
                </el-select>
          </el-form-item>
          <el-form-item label="交货日期：" prop="sorderDeliverytime" >
            <el-date-picker :disabled="xianshi"
            v-model="editOrdermanagementForm.sorderDeliverytime"
            type="date"
            placeholder="选择日期" class="w200">
          </el-date-picker>
          </el-form-item>
          
          <div class="fenge1">商品信息</div>
        <!-- <el-button type="primary" @click="chaigoushangpin">添加采购商品</el-button> -->
      <el-table
    style="width: 100%" border class="tb" default-expand-all @selection-change="handleSelectionChange"
    :data="editOrdermanagementForm.commodityListDOs" >
    <!-- default-expand-all -->
    <el-table-column type="selection" width="35" align="center" v-if="!xianshi"></el-table-column>
    <el-table-column type="expand"  label="展开"  width="50" >
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="" >
            {{ props.row.producinggoodsDOs.productSplicing }}
          </el-form-item>
          <br>
          <el-form-item label="特备注意：">
          <el-input v-model="props.row.commodityRemark" :disabled="xianshi"></el-input>
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>
    <el-table-column label="商品名称" prop="producinggoodsDOs.productName" width="150px"></el-table-column>
    <el-table-column label="产品类别" prop="producinggoodsDOs.productType" width="150px"></el-table-column>
    <el-table-column label="产品尺寸" prop="producinggoodsDOs.productChanpchic"></el-table-column>
    <el-table-column label="个/包" prop="producinggoodsDOs.productInnerbao"></el-table-column>
    <el-table-column label="包/箱" prop="producinggoodsDOs.productOutbao"></el-table-column>
    <el-table-column label="个/箱" prop="producinggoodsDOs.productOnege" ></el-table-column>
   
    <el-table-column label="外箱尺寸" width="150px">
      <template scope="scope">
        {{scope.row.producinggoodsDOs.productSizelength}}*{{scope.row.producinggoodsDOs.productSizelength}}*{{scope.row.producinggoodsDOs.productSizelength}}
      </template>
    </el-table-column>
    <el-table-column label="立方" prop="producinggoodsDOs.lifang"></el-table-column>
    <el-table-column label="净/毛" prop="producinggoodsDOs.productOneke"></el-table-column>
     <el-table-column label="数量">
      <template scope="scope">
        <el-input v-model="scope.row.commodityNumber" @blur="jisuan" :disabled="xianshi"></el-input>
      </template>
    </el-table-column>
    <el-table-column label="单价">
      <template scope="scope">
        <el-input v-model="scope.row.commodityPrice" @blur="jisuan" :disabled="xianshi"></el-input>
      </template>
    </el-table-column>
    <el-table-column label="总计" >
      <template scope="scope">
        {{scope.row.commodityNumber*scope.row.commodityPrice}}</template>
    </el-table-column>
  </el-table>
  <div class="fenge1">合计信息</div>
    <el-form-item label="快递费：" prop="sorderExpressfee">
      <el-input v-model="editOrdermanagementForm.sorderExpressfee" @blur="jisuan" :disabled="xianshi"></el-input>
    </el-form-item>
    <el-form-item label="运费：" prop="sorderFreigh">
      <el-input v-model="editOrdermanagementForm.sorderFreigh" @blur="jisuan" :disabled="xianshi"></el-input>
    </el-form-item>
     <el-form-item label="版费：" prop="sorderEditionfee">
      <el-input v-model="editOrdermanagementForm.sorderEditionfee" @blur="jisuan" :disabled="xianshi"></el-input>
    </el-form-item>
    <el-form-item label="小单费：" prop="sorderSinglefee">
      <el-input v-model="editOrdermanagementForm.sorderSinglefee" @blur="jisuan" :disabled="xianshi"></el-input>
    </el-form-item>
    <el-form-item label="总数量：" prop="sorderAllnumber">
      <el-input v-model="editOrdermanagementForm.sorderAllnumber" :disabled="xianshi"></el-input>
    </el-form-item>
    <el-form-item label="总金额：" prop="sorderTotal">
      <el-input v-model="editOrdermanagementForm.sorderTotal" :disabled="xianshi"></el-input>
    </el-form-item>
    <el-form-item label="预收款金额：" prop="sorderPayamount">
      <el-input v-model="editOrdermanagementForm.sorderPayamount" :disabled="xianshi"></el-input>
    </el-form-item>
    <el-form-item label="备注：" prop="sorderRemark0">
      <el-input class="w400" :disabled="xianshi" v-model="editOrdermanagementForm.sorderRemark0"></el-input>
    </el-form-item>
    <br>
    <el-form-item label="预收款单号：" prop="advanceorderno" v-if="xianshi1">
      <el-input v-model="editOrdermanagementForm.advanceorderno" :disabled="xianshi"></el-input>
    </el-form-item>
    <el-button type="primary" @click="yufukuanshuju" v-if="xianshi1">新增预收款单</el-button>
    <div class="fenge1" >初审信息</div>
    <el-form-item label="审核人：" prop="sorderChushen" >
      <el-input v-model="editOrdermanagementForm.sorderChushen" :disabled="xianshi"></el-input>
    </el-form-item>
     <el-form-item label="审核结果："  prop="sorderStatus">
      <el-radio v-model="radio" label='3' @change="guoqudangqianshijian" :disabled="xianshi">通过</el-radio>
      <el-radio v-model="editOrdermanagementForm.sorderStatus" label='2' @change="guoqudangqianshijian" :disabled="xianshi">驳回</el-radio>
    </el-form-item>
    <el-form-item label="审核时间：" prop="sorderChushentime">
      <el-input v-model="editOrdermanagementForm.sorderChushentime" :disabled="xianshi"></el-input>
    </el-form-item> 
    <el-form-item label="审核描述："  prop="sorderChushendesc">
      <el-input class="w400" v-model="editOrdermanagementForm.sorderChushendesc" :disabled="xianshi"></el-input>
    </el-form-item>
    <div class="fenge1" v-if="xianshi1||editOrdermanagementForm.sorderStatus==4||editOrdermanagementForm.sorderStatus==5">复审信息</div>
    <el-form-item label="审核人：" v-if="xianshi1||editOrdermanagementForm.sorderStatus==4||editOrdermanagementForm.sorderStatus==5" prop="sorderFushen">
      <el-input v-model="editOrdermanagementForm.sorderFushen"  :disabled="true"></el-input>
    </el-form-item>
     <el-form-item label="审核结果：" v-if="xianshi1||editOrdermanagementForm.sorderStatus==4||editOrdermanagementForm.sorderStatus==5">
      <el-radio @change="guoqudangqianshijian" label="5" v-model="editOrdermanagementForm.sorderStatus" :disabled="!xianshi1">通过</el-radio>
      <el-radio @change="guoqudangqianshijian" label="4" v-model="editOrdermanagementForm.sorderStatus" :disabled="!xianshi1">驳回</el-radio>
    </el-form-item>
    <el-form-item label="审核时间：" v-if="xianshi1||editOrdermanagementForm.sorderStatus==4||editOrdermanagementForm.sorderStatus==5" prop="sorderFushentime">
      <el-input v-model="editOrdermanagementForm.sorderFushentime" :disabled="!xianshi1"></el-input>
    </el-form-item>
    <el-form-item label="审核描述：" v-if="xianshi1||editOrdermanagementForm.sorderStatus==4||editOrdermanagementForm.sorderStatus==5" prop="sorderFushendesc">
      <el-input class="w400" v-model="editOrdermanagementForm.sorderFushendesc" :disabled="!xianshi1"></el-input>
    </el-form-item>
  </el-form>
        <span slot="footer" class="dialog-footer">
        <el-button @click="editOrdermanagementVisible = false">取 消</el-button>
        <el-button type="primary" @click="editOrdermanagement" v-if="xianshi1">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog :title=" '新增预收款单' " :visible.sync="addOrdermanagementVisible5" width="55%" :before-close="handleClose">
      <div class="fenge">预收款信息</div>
        <el-form ref="form" label-width="110px" :inline="true" :model="yufukuan" :rules="addOrdermanagementRules">
          <el-form-item label="收款制单人：">
            <el-input v-model="yufukuan.payexamine" disabled></el-input>
          </el-form-item>
          <el-form-item label="客户名称：">
            <el-select v-model="yufukuan.cusName" disabled class="sel" placeholder="请选择" >
            <el-option
              v-for="item in kehu"
              :key="item.customerId"
              :label="item.cusName"
              :value="item.customerId">
            </el-option>
          </el-select>
            <!-- <el-input v-model="yufukuan.cusName"></el-input> -->
          </el-form-item>
          <el-form-item label="销售单号：">
            <el-input v-model="yufukuan.sorderCode" disabled></el-input>
          </el-form-item>
          <el-form-item label="销售数量：">
            <el-input v-model="yufukuan.sorderAllnumber" disabled></el-input>
          </el-form-item>
          <el-form-item label="销售金额：">
            <el-input v-model="yufukuan.porderTotalmoney" disabled></el-input>
          </el-form-item>
          <el-form-item label="预收款金额：">
            <el-input v-model="yufukuan.sorderPayamount" disabled></el-input>
          </el-form-item>
          <el-form-item label="资金账户：">
            <el-select v-model="yufukuan.assetaccount"  class="sel" placeholder="请选择" >
            <el-option
              v-for="item in zijinzhanghu"
              :key="item.basicId"
              :label="item.basicRetainone"
              :value="item.basicId">
            </el-option>
          </el-select>
            <!-- <el-input v-model="yufukuan.assetaccount"></el-input> -->
          </el-form-item>
          <el-form-item label="收支类型：">
            <el-select v-model="yufukuan.raetypes"  class="sel" placeholder="请选择" >
            <el-option
              v-for="item in shouruleixing"
              :key="item.basicId"
              :label="item.basicRetainone"
              :value="item.basicId">
            </el-option>
          </el-select>
            <!-- <el-input v-model="yufukuan.raetypes"></el-input> -->
          </el-form-item>
          <el-form-item label="付款状态：">
            <el-select v-model="yufukuan.paymentstatus"  class="sel" placeholder="请选择" >
            <el-option
              v-for="item in fukuanzhuangtai"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
            <!-- <el-input v-model="yufukuan.paymentstatus"></el-input> -->
          </el-form-item>
          <el-form-item label="备注：">
            <el-input class="w400" v-model="yufukuan.remarks"></el-input>
          </el-form-item>
          <div class="fenge1">收款凭证</div>
          <el-form-item>
            <el-upload
                      ref="upload"
                      :action="ip"
                      name="picture"
                      list-type="picture-card"
                      :limit="1"
                      :on-exceed="onExceed"
                      :before-upload="beforeUpload"
                      :on-preview="handlePreview"
                      :on-success="handleSuccess"
                      :on-remove="handleRemove">
                <i class="el-icon-plus"></i>
            </el-upload>
             <!-- <el-upload
              action="ip"
              list-type="picture-card"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove">
              <i class="el-icon-plus"></i>
            </el-upload>
             <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>  -->
          </el-form-item>
        </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addOrdermanagementVisible5 = false">取 消</el-button>
        <el-button type="primary" @click="addyushoukuan">确 定</el-button>
      </span>
    </el-dialog> 
    <el-dialog title="提示" :visible.sync="delVisibleqi" width="300px">
      <div class="del-dialog-cnt">此操作将批量启用, 是否继续？</div>
      <span slot="footer" class="dialog-footer">
          <el-button @click="delVisibleqi = false">取 消</el-button>
          <el-button type="primary" @click="deleteRowqi" >确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="提示" :visible.sync="delVisible" width="300px">
      <div class="del-dialog-cnt">删除不可恢复，是否确定删除？</div>
      <span slot="footer" class="dialog-footer">
          <el-button @click="delVisible = false">取 消</el-button>
          <el-button type="primary" @click="deleteRow" >确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      labelPosition: "right",
      delVisibleqi:false,
      addOrdermanagementVisible: false,
      addOrdermanagementVisible1: false,
      addOrdermanagementVisible2: false,
      addOrdermanagementVisible5: false,
      editOrdermanagementVisible: false,
      delVisible: false,
      currentPage: 0,
      total: 0,
      selectedList: [],
      xianshi:false,
      xianshi1:true,
      ordermanagementList:[],
      chaOrdermanagementForm: {
        line:2,
        sorderCode:'',
        customerId:'',
        sorderStatus:'',
        sorderTotalsum:'',
        sorderWarehouse:'',
        pageCode: 1, //当前页
        pageSize: 10 //每页显示的记录数
      },
      shengchanFrom:{
        productLeixing:'',
      },
      caigouFrom:{
        lab:'原纸',
      },
      shengchan:[{
        id:0,
        value:'单层'
      },{
        id:1,
        value:'双层'
      },{
        id:2,
        value:'瓦楞'
      },{
        id:3,
        value:'杯套'
      },{
        id:4,
        value:'手柄'
      }],
      caigou:[{
        id:0,
        value:'原纸'
      },{
        id:1,
        value:'纸箱'
      },{
        id:2,
        value:'袋子'
      },{
        id:3,
        value:'油墨'
      },{
        id:4,
        value:'其他'
      }],
      options: [{
          value: '3',
          label: '待审核'
        }, {
          value: '4',
          label: '已驳回'
        }, {
          value: '5',
          label: '已通过'
        }],
        value:'',
      addOrdermanagementForm: {
        customerId: '',
        sorderAddress: '',
        sorderWarehouse:'',
        sorderTotalsum:'',
        sorderDeliverytime:'',
        sorderCurrecytype:'', 
        productName:'',
        supgoolsId:'',
        sorderExpressfee:'',
        sorderFreigh:'',
        sorderEditionfee:'',
        sorderSinglefee:'',
        sorderAllnumber:'',
        sorderTotal:'',
        sorderPayamount:'',
        sorderRemark0:'',
        commodityListDOs:[],
      },
      editOrdermanagementForm: {
        sorderCode:'',
        customerId: '',
        sorderAddress: '',
        sorderWarehouse:'',
        sorderTotalsum:'',
        sorderDeliverytime:'',
        sorderStatus:'3',
        sorderCurrecytype:'', 
        productName:'',
        supgoolsId:'',
        sorderExpressfee:'',
        sorderFreigh:'',
        sorderEditionfee:'',
        sorderSinglefee:'',
        sorderAllnumber:'',
        sorderTotal:'',
        sorderPayamount:'',
        sorderRemark0:'',
        commodityListDOs:[],
        sorderChushen:'',
        sorderChushentime:'',
        sorderChushendesc:'',
        sorderFushen:'',
        sorderFushentime:'',
        sorderFushendesc:'',
        advanceorderno:'',
      },
      yufukuan:{
        payexamine:'',
        cusName:'',
        sorderCode:'',
        sorderAllnumber:'',
        porderTotalmoney:'',
        sorderPayamount:'',
        assetaccount:'',
        raetypes:'',
        paymentstatus:'',
        remarks:'',
        voucher:'',
      },
      radio:'3',
      shenpiren:'',
      addOrdermanagementRules: {
        sorderAddress: [
          { min: 1, max: 100, message: "长度在 3 到 10 个字符", trigger: "blur" }
        ]
      },
      ip:'',
      huobileixing:[],
      kehu:[],
      shengchanlist:[],
      shouruleixing:[],
      zijinzhanghu:[],
      fukuanzhuangtai: [ {
          value: '0',
          label: '未收款'
        }, {
          value: '1',
          label: '已收款'
        }],
      // chaigoulist:[],
    };
  },
  created() {
    this.OrdermanagementList();
    this.list();
    this.getCookie();
  },
  methods: {
     //文件上传成功的钩子函数
        handleSuccess(res, file) {
            this.$message({
                type: 'info',
                message: '图片上传成功',
                duration: 6000
            });
            if (file.response.success) {
                // this.editor.picture = file.response.message; //将返回的文件储存路径赋值picture字段
                
                this.yufukuan.voucher=file.response.message;
                // this.editProductForm.voucher=file.response.message;

                // this.productList.picture=file.response.message;
                
            }
        },
        //删除文件之前的钩子函数
        handleRemove(file, fileList) {
            this.$message({
                type: 'info',
                message: '已删除原有图片',
                duration: 6000
            });
        },
        //点击列表中已上传的文件事的钩子函数
        handlePreview(file) {
          this.dialogImageUrl = file.url;
          this.dialogVisible = true;
        },
        //上传的文件个数超出设定时触发的函数
        onExceed(files, fileList) {
            this.$message({
                type: 'info',
                message: '最多只能上传一个图片',
                duration: 6000
            });
        },
        //文件上传前的前的钩子函数
        //参数是上传的文件，若返回false，或返回Primary且被reject，则停止上传
        beforeUpload(file) {
            const isJPG = file.type === 'image/jpeg';
            const isGIF = file.type === 'image/gif';
            const isPNG = file.type === 'image/png';
            const isBMP = file.type === 'image/bmp';
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPG && !isGIF && !isPNG && !isBMP) {
                this.$message.error('上传图片必须是JPG/GIF/PNG/BMP 格式!');
            }
            if (!isLt2M) {
                this.$message.error('上传图片大小不能超过 2MB!');
            }
            return (isJPG || isBMP || isGIF || isPNG) && isLt2M;
        },     
    yufukuanshuju(){
      
      this.yufukuan.payexamine=this.shenpiren;
      this.yufukuan.cusName=this.editOrdermanagementForm.customerId;
      this.yufukuan.sorderCode=this.editOrdermanagementForm.sorderCode;
      this.yufukuan.sorderAllnumber=this.editOrdermanagementForm.sorderAllnumber;
      this.yufukuan.porderTotalmoney=this.editOrdermanagementForm.sorderTotal;
      this.yufukuan.sorderPayamount=this.editOrdermanagementForm.sorderPayamount;
      this.addOrdermanagementVisible5=true;
    },
     //读取cookie
    getCookie: function() {
      var storage=window.localStorage;
      this.shenpiren = storage.getItem("username");
      // if (document.cookie.length > 0) {
      //   var arr = document.cookie.split("; "); //这里显示的格式需要切割一下自己可输出看下
      //   for (var i = 0; i < arr.length; i++) {
      //     var arr2 = arr[i].split("="); //再次切割
      //     //判断查找相对应的值
      //     if (arr2[0] == "userName") {
      //       this.shenpiren = arr2[1]; //保存到保存数据的地方
      //     }
      //   }
      //   this.checked = true;
      // }
    },
     // 查询订单列表
   async OrdermanagementList() {
     this.ip=this.ips+'upload';
     if (this.chaOrdermanagementForm.sorderCode!=''||this.chaOrdermanagementForm.sorderTotalsum!=''||this.chaOrdermanagementForm.sorderStatus!=''||this.chaOrdermanagementForm.sorderWarehouse!='') {
       this.chaOrdermanagementForm.pageCode=1;
       this.chaOrdermanagementForm.pageSize=10;
     }
      const { data: res } = await this.$http.post("xs/saleorder/selectOrderComm",this.chaOrdermanagementForm);
      this.total=res.body.total;
      this.ordermanagementList = res.body.rows;
    },
    async list(){
      const { data: res } = await this.$http.post("jc/customer/selectcustom1");
      const { data: res1 } = await this.$http.post("jc/Basic/selectpaymode");
      const { data: res2 } = await this.$http.post("jc/Basic/selectinpaymode");
      const { data: res3 } = await this.$http.post("jc/Basic/selectzijin");
      this.zijinzhanghu=res3;
      this.shouruleixing=res2;
      this.huobileixing=res1;
      this.kehu = res;
    },
   async shengchanshangping(){
      const { data: res } = await this.$http.post("jc/Produconggoods/selectProducing",this.shengchanFrom);
      console.log(res);
      this.shengchanlist = res.body.rows;
      this.addOrdermanagementVisible1=true;
    },
    // async chaigoushangpin(){
    //   const { data: res } = await this.$http.post("jc/suppliergoods/selectSuppliergoolslist",{params:this.caigouFrom});
    //   console.log(res);
    //   this.chaigoulist = res.body.rows;
    //   this.addOrdermanagementVisible2=true;
    // },
    addyushoukuan() {
      // this.$refs.form.validate(async valid => {
      //   if (!valid) return;
      //   const { data: res } = await this.$http.post(
      //     "advancereceivable/addAdvancereceivable",
      //     this.yufukuan
      //   );
      //   this.editOrdermanagementForm.advanceorderno=res.body.result.advanceorderno;
      //   if (res.body.respCode==500) {
      //     this.$message({
      //       type: "info",
      //       message: res.body.msg
      //     }); 
      //   }else{
      //     this.$message({
      //       type: "success",
      //       message: res.body.msg
      //     });
      //   }
        this.addOrdermanagementVisible5 = false;
      // });
    },
    addOrdermanagement() {
      this.$refs.addOrdermanagementRef.validate(async valid => {
        if (!valid) return;
        const { data: res } = await this.$http.post(
          "xs/saleorder/insertSalesOrder",
          this.addOrdermanagementForm
        );
        if (res.body.respCode==500) {
          this.$message({
            type: "info",
            message: res.body.msg
          }); 
        }else{
          this.$message({
            type: "success",
            message: res.body.msg
          });
        }
        this.OrdermanagementList();
        this.addOrdermanagementVisible = false;
      });
    },
    jisuan() {
      this.addOrdermanagementForm.sorderAllnumber=0;
      this.addOrdermanagementForm.sorderTotal=0;
      if(this.addOrdermanagementVisible==true){
        for (
        let index = 0; index < this.addOrdermanagementForm.commodityListDOs.length; index++) {
        if (isNaN(this.addOrdermanagementForm.commodityListDOs[index].commodityNumber) || isNaN(this.addOrdermanagementForm.commodityListDOs[index].commodityPrice)) {
          continue;
        }
        this.addOrdermanagementForm.sorderAllnumber += parseInt(
          this.addOrdermanagementForm.commodityListDOs[index].commodityNumber
        );

        this.addOrdermanagementForm.sorderTotal +=
          parseInt(this.addOrdermanagementForm.commodityListDOs[index].commodityPrice) *
          parseInt(this.addOrdermanagementForm.commodityListDOs[index].commodityNumber);
          console.log(this.addOrdermanagementForm.sorderTotal);
          var tatal=this.addOrdermanagementForm.sorderTotal
      }
       this.addOrdermanagementForm.sorderTotal=parseInt(this.addOrdermanagementForm.sorderTotal)+parseInt(this.addOrdermanagementForm.sorderExpressfee)+parseInt(this.addOrdermanagementForm.sorderFreigh)+parseInt(this.addOrdermanagementForm.sorderEditionfee)+parseInt(this.addOrdermanagementForm.sorderSinglefee);

      }else if(this.editOrdermanagementVisible==true){
        this.editOrdermanagementForm.sorderTotal=0;
        this.editOrdermanagementForm.sorderAllnumber=0;
        for (
        let index = 0; index < this.editOrdermanagementForm.commodityListDOs.length; index++) {
        if (isNaN(this.editOrdermanagementForm.commodityListDOs[index].commodityNumber) || isNaN(this.editOrdermanagementForm.commodityListDOs[index].commodityPrice)) {
          continue;
        }
        this.editOrdermanagementForm.sorderAllnumber += parseInt(
          this.editOrdermanagementForm.commodityListDOs[index].commodityNumber
        );

        this.editOrdermanagementForm.sorderTotal +=
          parseInt(this.editOrdermanagementForm.commodityListDOs[index].commodityPrice) *
          parseInt(this.editOrdermanagementForm.commodityListDOs[index].commodityNumber);
          console.log(this.editOrdermanagementForm.sorderTotal);
          var tatal=this.editOrdermanagementForm.sorderTotal
      }
       this.editOrdermanagementForm.sorderTotal=parseInt(this.editOrdermanagementForm.sorderTotal)+parseInt(this.editOrdermanagementForm.sorderExpressfee)+parseInt(this.editOrdermanagementForm.sorderFreigh)+parseInt(this.editOrdermanagementForm.sorderEditionfee)+parseInt(this.editOrdermanagementForm.sorderSinglefee);

      }
      
    },
    chaordermanagementForm(formName) {
      this.$refs.chaOrdermanagementRef.resetFields();
      this.OrdermanagementList();
    },
    guoqudangqianshijian(){
      var date = new Date();
      var y = date.getFullYear()
      var mm = date.getMonth() + 1
      var d = date.getDate()
      this.editOrdermanagementForm.sorderFushentime=`${y}-${mm}-${d}`
    },
    async showEditOrdermanagement(sorderCode,xian,zhi) {
      this.xianshi=xian;
      if(zhi==0){
         this.xianshi1=!xian;
      }else if(zhi==1){
        this.xianshi1=xian;
      }
      let param = new URLSearchParams();
      param.append("sorderCode", sorderCode);
      const { data: res } = await this.$http.post("xs/saleorder/selectOrderCommbyid", param);
      res.sorderCurrecytype=Number(res.sorderCurrecytype);
      if(res.sorderFushen==null || res.sorderFushen==''){
        res.sorderFushen=this.shenpiren;
      }
      this.editOrdermanagementForm = res;
      this.editOrdermanagementVisible = true;
    },
    async editOrdermanagement() {
      const { data: res } = await this.$http.post(
        "xs/saleorder/updateSaleOrder",
        this.editOrdermanagementForm
      );
     this.OrdermanagementList();
      this.editOrdermanagementVisible = false;
      if(this.editOrdermanagementForm.sorderStatus==5){
        this.$refs.form.validate(async valid => {
          if (!valid) return;
          const { data: res } = await this.$http.post(
            "advancereceivable/addAdvancereceivable",
            this.yufukuan
          );
          this.editOrdermanagementForm.advanceorderno=res.body.result.advanceorderno;
          if (res.body.respCode==500) {
            this.$message({
              type: "info",
              message: res.body.msg
            }); 
          }else{
            this.$message({
              type: "success",
              message: res.body.msg
            });
          }
          // this.addOrdermanagementVisible5 = false;
        });
      }
      
    },
    selected(){
      this.delVisible = true;
      this.delarr=[];
      for (let i = 0; i < this.selectedList.length; i++) {
        this.delarr.push(this.selectedList[i].productgoodsId)
      }
      console.log(this.delarr);
    },
     async deleteRow(){
         console.log(this.delarr);
         console.log(this.shengchanpin);
         for (let index = 0; index < this.delarr.length; index++) {
           for (let i = 0; i < this.shengchanpin.length; i++) {
              if(this.delarr[index]==this.shengchanpin[i].productgoodsId)
              this.shengchanpin.splice(i);
           }    
         }
         this.delVisible = false; 
      },
 selectedqi(){
      this.delarr=[];
      this.delVisibleqi = true;
      for (let i = 0; i < this.selectedList.length; i++) {
        this.delarr.push({sorderCode:this.selectedList[i].sorderCode,sorderStatus:1})
      }
      console.log(this.delarr);
    },
      async deleteRowqi(){
         const {data:res} = await this.$http.post('xs/saleorder/tishen',this.delarr);
         this.delVisibleqi = false;
         this.OrdermanagementList();
         if (res.body.respCode==500) {
          this.$message({
            type: "info",
            message: res.body.msg
          }); 
        }else{
          this.$message({
            type: "success",
            message: res.body.msg
          });
        }
      },

    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },

    deletebumen(sorderCode) {
      this.$confirm("此操作将永久删除该职务, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          let param = new URLSearchParams();
          param.append("sorderCode", sorderCode);
          const { data: res } = await this.$http.post("xs/saleorder/deletesaleOrder", param);
          this.OrdermanagementList();
          this.$message({
            type: "success",
            message: res.body.msg
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: res.body.msg
          });
        });
    },
    shengchancaigou(){
       for (let index = 0; index < this.selectedList.length; index++) {
         if(this.addOrdermanagementVisible==true){
           this.addOrdermanagementForm.commodityListDOs.push(this.selectedList[index]);
         }else if(this.editOrdermanagementVisible==true){
           this.editOrdermanagementForm.commodityListDOs.push(this.selectedList[index]);
         }
       }
       this.addOrdermanagementVisible1=false;
       this.addOrdermanagementVisible2=false;
        this.editOrdermanagementVisible1=false;
       this.editOrdermanagementVisible2=false;
    },
    
    handleSelectionChange(val) {
      console.log(val);
      this.selectedList = val;
    },

   
    resetForm(formName) {
      this.$refs[formName].resetFields();
      // this.$refs[formName].resetFields();
    },

    //分页相关函数
    handleSizeChange(val) {
      this.chaOrdermanagementForm.pageSize = val;
      this.OrdermanagementList();

    },
    handleCurrentChange(val) {
      this.chaOrdermanagementForm.pageCode = val;
      this.currentPage=val;
      this.OrdermanagementList();
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
 .w100{
   width: 180px;
 }
 .w200{
   width: 200px;
 }
 .el-table{
   margin-bottom: 15px;
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
   .demo-table-expand {
    text-align:center;
    .el-form-item {
    margin-bottom: 0px;
}
  }
  .sel{
    width: 203px;
  }
</style>  
