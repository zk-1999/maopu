<template>
    <div class="min1500">
        <!-- 面包屑导航区域 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>进货管理</el-breadcrumb-item>
            <el-breadcrumb-item>采购订单</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card>
            <el-form :inline="true" class="demo-form-inline search" :model="chaOrderFrom" ref="search">
                <el-row :gutter="20" class="row">
                    <el-col :span="24">
                        <el-form-item label="订单编号：">
                            <el-input placeholder="请输入订单编号" class="_small" v-model="chaOrderFrom.porderCode"></el-input>
                        </el-form-item>
                        <el-form-item prop="rylx" >
                            <el-input placeholder="请输入人员" v-model="chaOrderFrom.porderProducer" class="input-with-select" style="width: 250px" >
                                <el-select v-model="search.rylx" slot="prepend" placeholder="请选择"  style="width: 110px">
                                <el-option
                                    v-for="item in rylx"
                                    :key="item.Id"
                                    :label="item.Name"
                                    :value="item.Name">
                                </el-option>
                                </el-select>
                            </el-input>
                        </el-form-item>
                        <el-form-item label="订单状态：" prop="ddzt">
                            <el-select v-model="chaOrderFrom.porderState" placeholder="请选择" class="_small">
                                <el-option
                                    v-for="item in ddzt"
                                    :key="item.Id"
                                    :label="item.Name"
                                    :value="item.Name">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="制单时间："  prop="zdsj" >
                            <el-date-picker
                                v-model="search.zdsj"
                                type="date"
                                format="yyyy年MM月dd日"
                                value-format="yyyy-MM-dd"
                                placeholder="选择日期时间" >
                            </el-date-picker>
                        </el-form-item >
                        <el-form-item label="采购周期" >
                            <el-date-picker
                            v-model="value1"
                            type="daterange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item>
                            <el-button @click="getList">查询</el-button>
                            <el-button type="primary" @click="ResetForm('search')">重置</el-button>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <el-button type="success" @click="addOrderVisible = true;editOrde  = false">新增</el-button>
            <el-button @click="edit" :disabled="selectedList.length == 0">编辑</el-button>
            <el-button @click="del" :disabled="selectedList.length == 0">删除</el-button>
            <el-button @click="getList">提审</el-button>
            <!-- <el-button @click="stop">终止采购</el-button> -->
            <el-table border :data="orderList" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="40"></el-table-column>
                <el-table-column type="index"></el-table-column>
                <el-table-column prop="porderCode" label="订单编号"></el-table-column>
                <el-table-column prop="supplierDOs.supName" label="供应商" :show-overflow-tooltip='true'></el-table-column>
                <el-table-column prop="porderPalnmoney" label="预付款金额"></el-table-column>
                <el-table-column prop="porderTotalmoney" label="采购总价"></el-table-column>
                <el-table-column prop="porderTotalnum" label="采购总数量"></el-table-column>
                <el-table-column prop="porderDiffernumber" label="差异数量"></el-table-column>
                <el-table-column prop="basicId" label="入库仓库"></el-table-column>
                <el-table-column prop="porderArrivalstatus" label="到货情况"></el-table-column>
                <el-table-column prop="porderProducer" label="制单人员"></el-table-column>
                <el-table-column prop="porderBuyer" label="采购人"></el-table-column>
                <!-- <el-table-column prop="porderCompletenum" label="已采购数量"></el-table-column> -->
                <el-table-column prop="porderStarttime" label="采购周期" width="200">
                    <template slot-scope="scope">
                        {{scope.row.porderStarttime+"-"+scope.row.porderStoptime}}
                    </template>
                </el-table-column>
                <el-table-column prop="porderTime" label="制单时间"></el-table-column>
                <el-table-column prop="" label="审批时间"></el-table-column>

                <el-table-column prop="porderState" label="订单状态"></el-table-column>
                <el-table-column label="操作" width="190px">
                    <template slot-scope="scope">
                        <el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditOrder(scope.row.porderCode)">修改</el-button>
                        <el-button type="danger" icon="el-icon-delete" size="mini" @click="deletebumen(scope.row.porderCode)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page.sync="currentPage"
                :page-sizes="[10]"
                :page-size="100"
                layout="total, sizes, prev, pager, next"
                :total="total"
            ></el-pagination>
        </el-card>
        <el-dialog
            :title="editOrde ? '修改订单':'新增订单'"
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
                    </el-form-item> -->
                    <el-form-item label="制单人员：" prop="porderProducer">
                        <el-input v-model="addOrderForm.porderProducer" :disabled="true" class="_small"></el-input>
                    </el-form-item>
                    <el-form-item label="选择仓库：" prop="basicId">
                        <el-select v-model="addOrderForm.basicId" placeholder="请选择" class="_small">
                            <el-option
                            v-for="item in cangku"
                            :key="item.basicId"
                            :label="item.basicRetainone"
                            :value="item.basicId">
                            </el-option>
                        </el-select>
                    </el-form-item>
                        <el-form-item label="选择供应商：" prop="supplierId">
                        <el-select v-model="addOrderForm.supplierId" placeholder="请选择" class="_small">
                            <el-option
                            v-for="item in gongyinshang"
                            :key="item.supplierId"
                            :label="item.supName"
                            :value="item.supplierId">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="选购周期：" prop="time">
                        <el-date-picker
                        v-model="addOrderForm.time"
                        type="daterange"
                        format="yyyy年MM月dd日"
                        value-format="yyyy-MM-dd"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                        </el-date-picker>
                    </el-form-item>
                </el-row>
                <hr>
                <el-button type="primary" @click="gongyingshangpi">添加商品</el-button>
                <el-button type="dange" :disabled="addSelectedList.length == 0 && addSelectedList_two == 0" @click="deleteAddbumen">删除商品</el-button>
                <el-table border :data="addOrderForm.pcommodityDos" @selection-change="addSelectionChange">
                    
                    <el-table-column type="selection" width="40" align="center"></el-table-column>
                    <el-table-column type="index" width="40" align="center"></el-table-column>
                    <el-table-column prop="supgoolsBigType" label="商品名称"></el-table-column>
                    <el-table-column prop="supgoolsId" label="商品编码"></el-table-column>
                    <el-table-column prop="supgoolssmallType" label="商品小类型"     v-if='panduan.supgoolssmallType1'></el-table-column>
                    <el-table-column prop="supgoolsBrand" label="品牌"     v-if='panduan.supgoolsBrand1'></el-table-column>
                    <el-table-column prop="supgoolsWeight" label="克重"    v-if='panduan.supgoolsWeight1'></el-table-column>
                    <el-table-column prop="supgoolsWidths" label="门幅"    v-if='panduan.supgoolsWidths1'></el-table-column>
                    <el-table-column prop="supgoolCoated" label="淋膜类型" v-if='panduan.supgoolCoated1'></el-table-column>
                    <el-table-column prop="supgoolsLength" label="尺寸/长" v-if='panduan.supgoolsLength1'></el-table-column>
                    <el-table-column prop="supgoolsWidth" label="尺寸/宽"  v-if='panduan.supgoolsWidth1'></el-table-column>
                    <el-table-column prop="supgoolsHeight" label="尺寸/厚" v-if='panduan.supgoolsHeight1'></el-table-column>
                    <el-table-column prop="supgoolsBradth" label="宽度"    v-if='panduan.supgoolsBradth1'></el-table-column>
                    <el-table-column prop="supgoolsColor" label="颜色"     v-if='panduan.supgoolsColor1'></el-table-column>
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
                        <template scope="scope">
                           {{scope.row.pcommodityPalnnum*scope.row.pcommodityPrice}}
                        </template>
                    </el-table-column>
                    
                </el-table>
                <!-- <div class="jisuan">
                                   <el-form-item prop="porderTotalnum">
                                   <span>采购总数量: {{addOrderForm.porderTotalnum}}</span>
                                  </el-form-item>
                                 <el-form-item  prop="porderTotalmoney">
                                <span>总金额: {{addOrderForm.porderTotalmoney}}</span>
                                </el-form-item></div>
                                <br> -->
                <!-- <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page.sync="currentPage"
                :page-sizes="[10]"
                :page-size="100"
                layout="total, sizes, prev, pager, next"
                :total="total"
            ></el-pagination>     -->
                <hr>
                <el-form-item label="订单数量：" prop="porderTotalnum">
                    <el-input v-model="addOrderForm.porderTotalnum" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="订单金额：" prop="porderTotalmoney">
                    <el-input v-model="addOrderForm.porderTotalmoney" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="预付款金额：" prop="porderPalnmoney">
                    <el-input v-model="addOrderForm.porderPalnmoney"></el-input>
                </el-form-item>
                
                <el-form-item label="付款说明：" prop="porderExplain">
                    <el-input
                    type="textarea"
                        placeholder="请输入内容"
                        v-model="addOrderForm.porderExplain" style="width: 600px"  >
                    </el-input>
                </el-form-item>
                <el-form-item label="采购描述：" class="w500" prop="porderBuyexplain">
                    <el-input
                    type="textarea"
                        placeholder="请输入内容"
                        v-model="addOrderForm.porderBuyexplain" style="width: 600px" >
                    </el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addOrderVisible=false">取消</el-button>
                <el-button @click="addSave" type="primary">保存</el-button>
            </span>
        </el-dialog>
        <el-dialog
            title="修改订单"
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
                    </el-form-item> -->
                    <el-form-item label="制单人员：" prop="porderProducer">
                        <el-input v-model="editOrderForm.porderProducer" :disabled="true" class="_small"></el-input>
                    </el-form-item>
                    <el-form-item label="选择仓库：" prop="basicId">
                        <el-select v-model="editOrderForm.basicId" placeholder="请选择" class="_small">
                            <el-option
                            v-for="item in cangku"
                            :key="item.basicId"
                            :label="item.basicRetainone"
                            :value="item.basicId">
                            </el-option>
                        </el-select>
                    </el-form-item>
                        <el-form-item label="选择供应商：" prop="supplierId">
                        <el-select v-model="editOrderForm.supplierId" placeholder="请选择" class="_small">
                            <el-option
                            v-for="item in gongyinshang"
                            :key="item.supplierId"
                            :label="item.supName"
                            :value="item.supplierId">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="选购周期：" prop="time">
                        <el-date-picker
                        v-model="editOrderForm.time"
                        type="daterange"
                        format="yyyy年MM月dd日"
                        value-format="yyyy-MM-dd"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                        </el-date-picker>
                    </el-form-item>
                </el-row>
                <hr>
                <el-button type="primary" @click="gongyingshangpi">添加商品</el-button>
                <el-button type="dange" :disabled="addSelectedList.length == 0 && addSelectedList_two == 0" @click="deleteAddbumen">删除商品</el-button>
                <el-table border :data="editOrderForm.pcommodityDos" @selection-change="addSelectionChange">
                    
                    <el-table-column type="selection" width="40" align="center"></el-table-column>
                    <el-table-column type="index" width="40" align="center"></el-table-column>
                    <el-table-column prop="supgoolsBigType" label="商品名称"></el-table-column>
                    <el-table-column prop="supgoolsId" label="商品编码"></el-table-column>
                    <el-table-column prop="supgoolssmallType" label="商品小类型"     v-if='panduan.supgoolssmallType1'></el-table-column>
                    <el-table-column prop="supgoolsBrand" label="品牌"     v-if='panduan.supgoolsBrand1'></el-table-column>
                    <el-table-column prop="supgoolsWeight" label="克重"    v-if='panduan.supgoolsWeight1'></el-table-column>
                    <el-table-column prop="supgoolsWidths" label="门幅"    v-if='panduan.supgoolsWidths1'></el-table-column>
                    <el-table-column prop="supgoolCoated" label="淋膜类型" v-if='panduan.supgoolCoated1'></el-table-column>
                    <el-table-column prop="supgoolsLength" label="尺寸/长" v-if='panduan.supgoolsLength1'></el-table-column>
                    <el-table-column prop="supgoolsWidth" label="尺寸/宽"  v-if='panduan.supgoolsWidth1'></el-table-column>
                    <el-table-column prop="supgoolsHeight" label="尺寸/厚" v-if='panduan.supgoolsHeight1'></el-table-column>
                    <el-table-column prop="supgoolsBradth" label="宽度"    v-if='panduan.supgoolsBradth1'></el-table-column>
                    <el-table-column prop="supgoolsColor" label="颜色"     v-if='panduan.supgoolsColor1'></el-table-column>
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
                        <template scope="scope">
                           {{scope.row.pcommodityPalnnum*scope.row.pcommodityPrice}}
                        </template>
                    </el-table-column>
                    
                </el-table>
                <!-- <div class="jisuan">
                                   <el-form-item prop="porderTotalnum">
                                   <span>采购总数量: {{editOrderForm.porderTotalnum}}</span>
                                  </el-form-item>
                                 <el-form-item  prop="porderTotalmoney">
                                <span>总金额: {{editOrderForm.porderTotalmoney}}</span>
                                </el-form-item></div>
                                <br> -->
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
                               
                    
                <hr>
                
                <el-form-item label="订单数量：" prop="porderTotalnum">
                    <el-input v-model="editOrderForm.porderTotalnum" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="订单金额：" prop="porderTotalmoney">
                    <el-input v-model="editOrderForm.porderTotalmoney" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="预付款金额：" prop="porderPalnmoney">
                    <el-input v-model="editOrderForm.porderPalnmoney"></el-input>
                </el-form-item>
                
                <el-form-item label="付款说明：" prop="porderExplain">
                    <el-input
                    type="textarea"
                        placeholder="请输入内容"
                        v-model="editOrderForm.porderExplain" style="width: 600px"  >
                    </el-input>
                </el-form-item>
                <el-form-item label="采购描述：" class="w500" prop="porderBuyexplain">
                    <el-input
                    type="textarea"
                        placeholder="请输入内容"
                        v-model="editOrderForm.porderBuyexplain" style="width: 600px" >
                    </el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editOrderVisible=false">取消</el-button>
                <el-button @click="editOrder" type="primary">保存</el-button>
            </span>
        </el-dialog>
        <el-dialog title="新增商品" :visible.sync="addOrder_addgoods" width="58%" :before-close="handleClose" @closed="closeAddGoods">
            <el-form
                :model="addOrderFormGoods"
                ref="addOrderFormGoods"
                :rules="addOrderGoodsRules"
                :inline="true" 
            >

            <el-form-item label="商品名称" prop="Name">
            <el-select  placeholder="请选择商品"  v-model="addOrderForm.lab" @change="gongyingshangpi">
                <el-option value="纸张" id="show">纸张</el-option>
                <el-option value="纸箱" id="show">纸箱</el-option>
                <el-option value="袋子" id="show">袋子</el-option>
                <el-option value="油墨" id="show">油墨</el-option>
                <el-option value="胶带" id="show">胶带</el-option>
            </el-select>
            </el-form-item>
            <!-- <el-form-item label="商品编号" prop="Id">
                <el-input v-model="addOrderFormGoods.Id"></el-input>
            </el-form-item> -->
            <el-button @click="gongyingshangpi">查询</el-button>
            <el-button type="primary" @click="ResetFormaddOrderFormGoods">重置</el-button>
            </el-form>
            <hr>
            <el-table border stripe :data="shangpi" @selection-change="handleSelectionChange">

                <el-table-column type="selection" width="40"></el-table-column>
                <el-table-column type="index" width="40"></el-table-column>
                <el-table-column prop="supgoolsBigType" label="商品名称"></el-table-column>
                    <el-table-column prop="supgoolsId" label="商品编码"></el-table-column>
                    <el-table-column prop="supgoolssmallType" label="商品小类型"     v-if='panduan.supgoolssmallType1'></el-table-column>
                    <el-table-column prop="supgoolsBrand" label="品牌"     v-if='panduan.supgoolsBrand1'></el-table-column>
                    <el-table-column prop="supgoolsWeight" label="克重"    v-if='panduan.supgoolsWeight1'></el-table-column>
                    <el-table-column prop="supgoolsWidths" label="门幅"    v-if='panduan.supgoolsWidths1'></el-table-column>
                    <el-table-column prop="supgoolCoated" label="淋膜类型" v-if='panduan.supgoolCoated1'></el-table-column>
                    <el-table-column prop="supgoolsLength" label="尺寸/长" v-if='panduan.supgoolsLength1'></el-table-column>
                    <el-table-column prop="supgoolsWidth" label="尺寸/宽"  v-if='panduan.supgoolsWidth1'></el-table-column>
                    <el-table-column prop="supgoolsHeight" label="尺寸/厚" v-if='panduan.supgoolsHeight1'></el-table-column>
                    <el-table-column prop="supgoolsBradth" label="宽度"    v-if='panduan.supgoolsBradth1'></el-table-column>
                    <el-table-column prop="supgoolsColor" label="颜色"     v-if='panduan.supgoolsColor1'></el-table-column>
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
            ></el-pagination> -->
            <span slot="footer" class="dialog-footer">
                <el-button @click="addOrder_addgoods=false">取消</el-button>
                <el-button @click="deleteRow" type="primary">保存</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
    export default {
        data(){
            return{
                search:{
                    ddbh:"",
                    rylx:"制单人员",
                    ry:"",
                    ddzt:"",
                    zdsj:"",
                    timelx:"",
                    date:[]
                },
                rylx:[{Id:"1",Name:"制单人员"},{Id:"2",Name:"审核人员"}],
                ddzt:[{Id:"1",Name:"全部"},{Id:"2",Name:"待审核"},{Id:"3",Name:"审核通过"},{Id:"4",Name:"审核不通过"}],
                timelx:[{Id:"1",Name:"制单时间"},{Id:"2",Name:"采购周期"}],
                orderList:[],
                selectedList: [],
                currentPage:0,
                editOrde:false,
                addOrderVisible:false,
                editOrderVisible:false,
                labelPosition: "right",
                total:0,
                addOrderForm:{
                    porderProducer:'',
                    basicId:'',
                    supplierId:'',
                    time:'',
                    suppliergoolsId:'',
                    porderTotalnum:0,
                    porderTotalmoney:0,
                    porderBuyexplain:'',
                    porderExplain:'',
                    pcommodityDos:[],
                    lab:'纸张',
                    pageCode: 1, //当前页
                    pageSize: 10,//每页显示的记录数
                },
                editOrderForm:{
                    porderProducer:'',
                    basicId:'',
                    supplierId:'',
                    time:'',
                    suppliergoolsId:'',
                    porderTotalnum:0,
                    porderTotalmoney:0,
                    porderBuyexplain:'',
                    porderExplain:'',
                    pcommodityDos:[],
                    lab:'纸张',
                    pageCode: 1, //当前页
                    pageSize: 10,//每页显示的记录数
                },
                chaOrderFrom:{
                    porderCode:'',
                    porderProducer:'',
                    porderState:'',
                    porderTime:'',
                    porderStarttime:'',
                     pageCode: 1, //当前页
                    pageSize: 10,//每页显示的记录数
                },
                chaSupplierForm:{
                    a:''
                },
                gongyinshang:[],
                cangku:[],
                addOrderRules:{
                        Id:[],
                        zdry:[]
                },
                ck:[{Id:1,Name:"A仓库"},{Id:2,Name:"B仓库"}],
                gys:[{Id:1,Name:"A供应商"},{Id:2,Name:"B供应商"}],
                addSelectedList:[],
                addSelectedList_two:[],
                goods:[{},{}],
                allCount:0,
                allMoney:0,
                preMoney:0,
                addOrder_addgoods:false,
                addOrderFormGoods:{
                    Id:"",
                    Name:"",
                    gys:""
                },
                delarr:[],
                delarr1:[],
                shangpi:[],
                total:0,
                
                addOrderGoodsRules:{
                },
                goods_two:[],
                AddGoods:[],
                value1:'',
                currentPage:0,
                Totalnum:0,
                Totalmoney:0,
                panduan:{
                    supgoolCoated1: false,
                    supgoolsBradth1: false,
                    supgoolsBrand1: false,
                    supgoolsColor1: false,
                    supgoolsHeight1: false,
                    supgoolsLength1: false,
                    supgoolsWeight1: false,
                    supgoolsWidth1: false,
                    supgoolsWidths1: false,
                    supgoolssmallType1:false,
                }
            }
        },
        created () {
            this.getList();
            this.getCha();
            this.getCookie();
        },
        methods:{
            jisuan(){
                this.addOrderForm.porderTotalnum =0;
                this.addOrderForm.porderTotalmoney=0;
               this.Totalnum= parseInt(this.editOrderForm.porderTotalnum) ;
               this.Totalmoney= parseInt(this.editOrderForm.porderTotalmoney);
            for (let index = 0; index < this.addOrderForm.pcommodityDos.length; index++) {
                
                if (isNaN(this.addOrderForm.pcommodityDos[index].pcommodityPrice)||isNaN(this.addOrderForm.pcommodityDos[index].pcommodityPalnnum)) { 
                    continue;
                }
                this.addOrderForm.porderTotalnum += parseInt(this.addOrderForm.pcommodityDos[index].pcommodityPalnnum);
                this.addOrderForm.porderTotalmoney += parseInt(this.addOrderForm.pcommodityDos[index].pcommodityPrice) * parseInt(this.addOrderForm.pcommodityDos[index].pcommodityPalnnum);
                this.Totalnum += parseInt(this.addOrderForm.pcommodityDos[index].pcommodityPalnnum);
                this.Totalmoney += parseInt(this.addOrderForm.pcommodityDos[index].pcommodityPrice) * parseInt(this.addOrderForm.pcommodityDos[index].pcommodityPalnnum);
                
                
                this.editOrderForm.porderTotalnum =this.Totalnum;
                this.editOrderForm.porderTotalmoney=this.Totalmoney;
                
            }
            console.log(this.addOrderForm.porderTotalnum);
            
            },
            //读取cookie
      getCookie: function() {
          if (document.cookie.length > 0) {
              var arr = document.cookie.split('; '); //这里显示的格式需要切割一下自己可输出看下
              for (var i = 0; i < arr.length; i++) {
                  var arr2 = arr[i].split('='); //再次切割
                  //判断查找相对应的值
                  if (arr2[0] == 'userName') {
                    //  console.log(arr2[1])
                      this.addOrderForm.porderProducer = arr2[1]; //保存到保存数据的地方
                  } 
              }
               this.checked = true;
          }
      },
            ResetForm(formName){
                this.$refs.formName.resetFields();
                this.getList()
            },
            async getCha(){
            const { data: res } = await this.$http.post("jc/supplier/selectSupplier",{params:this.chaSupplierForm});
            const { data: res1 } = await this.$http.post("jc/Basic/selectwarehousing");
            this.gongyinshang = res.body.rows;
            this.cangku = res1;
            
            },
            async gongyingshangpi(){
                   this.panduan.supgoolCoated1= false
                   this.panduan.supgoolsBradth1= false
                   this.panduan.supgoolsBrand1= false
                   this.panduan.supgoolsColor1=false
                   this.panduan.supgoolsHeight1= false
                   this.panduan.supgoolsLength1= false
                   this.panduan.supgoolsWeight1= false
                   this.panduan.supgoolsWidth1=false
                   this.panduan.supgoolsWidths1= false
                   this.panduan.supgoolssmallType= false

                   
                if(this.addOrderForm.supplierId==""){
                    this.$message({
                            type: "info",
                            message: "请选择供应商"
                        });
                }else{
            const { data: res } = await this.$http.post("jc/suppliergoods/selectSuppliergoolslist",{params:this.addOrderForm});
            console.log(res);
            for (let index = 0; index < res.body.rows.length; index++) {
                if (res.body.rows[index].supgoolssmallType=='') {
                    this.panduan.supgoolssmallType1=false;
                }else{
                    this.panduan.supgoolssmallType1=true;
                }
                if (res.body.rows[index].supgoolCoated=='') {
                    this.panduan.supgoolCoated1=false;
                }else{
                    this.panduan.supgoolCoated1=true;
                }
                if (res.body.rows[index].supgoolsBrand=='') {
                    this.panduan.supgoolsBrand1=false;
                }else{
                    this.panduan.supgoolsBrand1=true;
                }
                if (res.body.rows[index].supgoolsWeight==null) {
                    this.panduan.supgoolsWeight1=false;
                }else{
                    this.panduan.supgoolsWeight1=true;
                }
                if (res.body.rows[index].supgoolsWidths==null) {
                    this.panduan.supgoolsWidths1=false;
                }else{
                    this.panduan.supgoolsWidths1=true;
                }
                if (res.body.rows[index].supgoolsBradth==null) {
                    this.panduan.supgoolsBradth1=false;
                }else{
                    this.panduan.supgoolsBradth1=true;
                }
                if (res.body.rows[index].supgoolsLength==null) {
                    this.panduan.supgoolsLength1=false;
                }else{
                    this.panduan.supgoolsLength1=true;
                }
                if (res.body.rows[index].supgoolsWidth==null) {
                    this.panduan.supgoolsWidth1=false;
                }else{
                    this.panduan.supgoolsWidth1=true;
                }
                if (res.body.rows[index].supgoolsHeight==null) {
                    this.panduan.supgoolsHeight1=false;
                }else{
                    this.panduan.supgoolsHeight1=true;
                }
                if (res.body.rows[index].supgoolsColor=='') {
                    this.panduan.supgoolsColor1=false;
                }else{
                    this.panduan.supgoolsColor1=true;
                }
            }
            console.log(this.panduan);
            
            this.shangpi=res.body.rows;
            this.total=res.body.total;
            this.addOrder_addgoods=true;
            
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
            async deleteRow(){
                for (let i = 0; i < this.selectedList.length; i++) {
                    console.log(this.selectedList[i]);
                    this.delarr.push(this.selectedList[i])
                    this.delarr1.push(this.selectedList[i])

                }
                console.log(this.delarr);
                this.addOrderForm.pcommodityDos=this.delarr;
                this.addOrder_addgoods=false;
            },
            async getList() {
                // const { data: res1 } = await this.$http.post("jh/purchase/dtjresultMap");
                const { data: res } = await this.$http.post("jh/purchase/selectpurc",this.chaOrderFrom);
                // console.log(res1);
                this.orderList = res.body.rows;
                this.total=res.body.total;
            },
            async del(){

            },
            async edit(){

            },
            async stop(){

            },
            a(value){
                alert(value)
            },
            handleSizeChange(val) {
                this.chaOrderFrom.pageSize=val;
                console.log(`每页 ${val} 条`);
                this.getList();
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
                 this.chaOrderFrom.pageCode=val;
                 this.currentPage=val;
                this.getList();
            },
            handleClose(done) {
                this.$confirm("确认关闭？")
                    .then(_ => {
                        done();
                    })
                    .catch(_ => {});
            },
            dialogClosed(){
                this.$refs.addOrderRef.resetFields();
            },
            closeAddGoods(){
                this.$refs.addOrderFormGoods.resetFields();
            },
           
            addSelectionChange(val) {
                this.addSelectedList = val
                console.log(val)
            },
            addSelectionChange_two(val){
                this.addSelectedList_two = val
                console.log(val)
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
            addSave(){//保存采购订单
               this.$refs.addOrderRef.validate(async valid => {
                if (!valid) return;    
                const { data: res } = await this.$http.post("jh/purchase/createorder",this.addOrderForm);
                this.addOrderVisible = false;
                this.getList();
                this.addOrderForm.pcommodityDos=[];
                this.delarr=[];
            });
            },
            async showEditOrder(porderCode){
                //    this.panduan.supgoolCoated1= false
                //    this.panduan.supgoolsBradth1= false
                //    this.panduan.supgoolsBrand1= false
                //    this.panduan.supgoolsColor1=false
                //    this.panduan.supgoolsHeight1= false
                //    this.panduan.supgoolsLength1= false
                //    this.panduan.supgoolsWeight1= false
                //    this.panduan.supgoolsWidth1=false
                //    this.panduan.supgoolsWidths1= false
                let param = new URLSearchParams();
                param.append("porderCode", porderCode);
                const {data:res} = await this.$http.post('jh/purchase/dtjresultMap',param);
                // console.log(res);
                
                for (let i = 0; i < res[0].pcommodityDos.length; i++) {
                    this.delarr.push(res[0].pcommodityDos[i].suppliergoolsId)
                    this.delarr.push(res[0].pcommodityDos[i].pcommodityPalnnum)
                    this.delarr.push(res[0].pcommodityDos[i].pcommodityPrice)
                }
                // console.log(res);
                
                const {data:res1} = await this.$http.post('jc/suppliergoods/selectSuppliergoolslistmore',this.delarr);
                for (let index = 0; index < res[0].pcommodityDos.length; index++) {
                    for (let i = 0; i < res1.length; i++) {
                        if(res[0].pcommodityDos[index].suppliergoolsId==res1[i].suppliergoolsId){
                           res[0].pcommodityDos[index].supgoolCoated =res1[i].supgoolCoated ;
                           res[0].pcommodityDos[index].supgoolsBradth=res1[i].supgoolsBradth;
                           res[0].pcommodityDos[index].supgoolsBrand =res1[i].supgoolsBrand ;
                           res[0].pcommodityDos[index].supgoolsColor =res1[i].supgoolsColor ;
                           res[0].pcommodityDos[index].supgoolsHeight=res1[i].supgoolsHeight;
                           res[0].pcommodityDos[index].supgoolsLength=res1[i].supgoolsLength;
                           res[0].pcommodityDos[index].supgoolsWeight=res1[i].supgoolsWeight;
                           res[0].pcommodityDos[index].supgoolsWidth1=res1[i].supgoolsWidth1;
                           res[0].pcommodityDos[index].supgoolsWidths=res1[i].supgoolsWidths;
                           res[0].pcommodityDos[index].supName=res1[i].supName;
                           res[0].pcommodityDos[index].supgoolsBigType=res1[i].supgoolsBigType;
                           res[0].pcommodityDos[index].supgoolssmallType=res1[i].supgoolssmallType;
                           res[0].pcommodityDos[index].supgoolsId=res1[i].supgoolsId;
                        }
                    }
                }
                console.log(res[0].pcommodityDos);
                
                
                for (let index = 0; index < res[0].pcommodityDos.length; index++) {
                if (res[0].pcommodityDos[index].supgoolssmallType=='') {
                    this.panduan.supgoolssmallType1=false;
                }else{
                    this.panduan.supgoolssmallType1=true;
                }
                if (res[0].pcommodityDos[index].supgoolCoated=='') {
                    this.panduan.supgoolCoated1=false;
                }else{
                    this.panduan.supgoolCoated1=true;
                }
                if (res[0].pcommodityDos[index].supgoolsBrand=='') {
                    this.panduan.supgoolsBrand1=false;
                }else{
                    this.panduan.supgoolsBrand1=true;
                }
                if (res[0].pcommodityDos[index].supgoolsWeight==null) {
                    this.panduan.supgoolsWeight1=false;
                }else{
                    this.panduan.supgoolsWeight1=true;
                }
                if (res[0].pcommodityDos[index].supgoolsWidths==null) {
                    this.panduan.supgoolsWidths1=false;
                }else{
                    this.panduan.supgoolsWidths1=true;
                }
                if (res[0].pcommodityDos[index].supgoolsBradth==null) {
                    this.panduan.supgoolsBradth1=false;
                }else{
                    this.panduan.supgoolsBradth1=true;
                }
                if (res[0].pcommodityDos[index].supgoolsLength==null) {
                    this.panduan.supgoolsLength1=false;
                }else{
                    this.panduan.supgoolsLength1=true;
                }
                if (res[0].pcommodityDos[index].supgoolsWidth==null) {
                    this.panduan.supgoolsWidth1=false;
                }else{
                    this.panduan.supgoolsWidth1=true;
                }
                if (res[0].pcommodityDos[index].supgoolsHeight==null) {
                    this.panduan.supgoolsHeight1=false;
                }else{
                    this.panduan.supgoolsHeight1=true;
                }
                if (res[0].pcommodityDos[index].supgoolsColor=='') {
                    this.panduan.supgoolsColor1=false;
                }else{
                    this.panduan.supgoolsColor1=true;
                }
                }
                this.delarr1=res[0].pcommodityDos;
                res[0].pcommodityDos=this.delarr1;
                // console.log(res[0]);
                this.editOrderForm=res[0];
                this.editOrderVisible = true;
         
                },   
                async editOrder(){
                const {data:res} = await this.$http.post('/jh/purchase/bianji',this.editOrderForm);
                this.getList();
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
                this.editOrderVisible=false;
                },
          
            chooseGoodsgys(){//选择供应商

            },
            getGoodsList(){//获取商品

            },
            ResetFormaddOrderFormGoods(){
                this.$refs.addOrderFormGoods.resetFields();
            },
            addGoodsToAddOrder(val){//添加商品到订单

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
        }

    }
</script>

<style lang="less">
    .el-form-item{
        ._small{
            width: 150px;
            
        }
    }
    .w110{
        width: 110px;
        
    
    }
    .w500{
        width: 800px;
    }
    .el-table ,.el-pagination{
        margin-top: 15px;
    }
    .el-date-picker .el-input{
    width: 150px;
    }
    .el-date-editor--daterange.el-input, .el-date-editor--daterange.el-input__inner{
        width: 300px;
    }
    .el-textarea {
    width: 225%;
    
}
hr{
    margin-bottom: 15px;
    margin-top: 20px;
}
.jisuan{
     span{
         margin-left: 50px;
     }
     float: right;
     margin-right: 50px;
     margin-top: 15px;
}
</style>
