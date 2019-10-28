<template>
    <div class="min1500">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>采购退货单</el-breadcrumb-item>
            <el-breadcrumb-item>审批</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card>
            <el-form :model="search" ref="search" :inline="true" class="demo-form-inline search">
                <el-row>
                    <el-col>
                        <el-form-item label="退货单号" prop="thdh">
                            <el-input v-model="search.thdh"></el-input>
                        </el-form-item>
                        <el-form-item label="入库仓库" prop="rkck">
                            <el-select v-model="search.rkck">
                                <el-option v-for="item in rkck"
                                           :key="item.Id"
                                           :label="item.Name"
                                           :value="item.Name"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="订单状态" prop="state">
                            <el-select v-model="search.state">
                                <el-option v-for="item in state"
                                           :key="item.Id"
                                           :label="item.Name"
                                           :value="item.Name"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                        <div style="float: right; width: 300px">
                            <el-button>查询</el-button>
                            <el-button type="primary" @click="$refs.search.resetFields()">重置</el-button>
                        </div>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col>
                        <el-form-item label="制单人员" prop="zdr">
                            <el-input v-model="search.zdr"></el-input>
                        </el-form-item>
                        <el-form-item label="审核人员" prop="shr">
                            <el-input v-model="search.shr"></el-input>
                        </el-form-item>
                        <el-form-item label="创建时间" prop="cjsj">
                            <el-date-picker
                                    v-model="search.cjsj"
                                    type="datetimerange"
                                    range-separator="至"
                                    start-placeholder="开始日期"
                                    end-placeholder="结束日期"
                                    format="yyyy年MM月dd日"
                                    value-format="yyyy-MM-dd"></el-date-picker>
                        </el-form-item>
                        <el-form-item label="审核时间" prop="shsj">
                            <el-date-picker
                                    v-model="search.shsj"
                                    type="datetimerange"
                                    range-separator="至"
                                    start-placeholder="开始日期"
                                    end-placeholder="结束日期"
                                    format="yyyy年MM月dd日"
                                    value-format="yyyy-MM-dd"></el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <el-row>
                <el-button type="primary" :disabled="selectedList.length == 0">提审</el-button>
                <el-button type="warning" :disabled="selectedList.length == 0">终止退货</el-button>
            </el-row>
            <el-table border :data="CancelList" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column prop="x" label="退货单号"></el-table-column>
                <el-table-column prop="x" label="供应商"></el-table-column>
                <el-table-column prop="x" label="退款总金额"></el-table-column>
                <el-table-column prop="x" label="退货总数量"></el-table-column>
                <el-table-column prop="x" label="退货情况"></el-table-column>
                <el-table-column prop="x" label="出库仓库"></el-table-column>
                <el-table-column prop="x" label="制单人员"></el-table-column>
                <el-table-column prop="x" label="订单状态"></el-table-column>
                <el-table-column prop="x" label="制单时间"></el-table-column>
                <el-table-column prop="x" label="审核时间"></el-table-column>
                <el-table-column prop="x" label="退货描述" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column label="退货描述" width="190px">
                    <template slot-scope="scope">
                        <el-button @click="AuditVisible=true;second=false" type="primary" size="mini">初审</el-button>
                        <el-button @click="AuditVisible=true;second=true" type="primary" size="mini">二审</el-button>
                        <el-button type="warning"  size="mini">终止</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
        <el-dialog
            title="审核退货单"
            :visible.sync="AuditVisible"
            width="55%"
            :before-close="handleClose"
            @closed="$refs.chushen.resetFields()"
        >
            <el-form :model="cancel_" label-position="right" label-width="100px" ref="cancel_">
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="退货单号" prop="thdh">
                            <el-input v-model="cancel_.thdh"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="制单人员" prop="zdry">
                            <el-input v-model="cancel_.zdry"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="出库仓库" prop="ckck">
                            <el-select v-model="cancel_.ckck">
                                <el-option v-for="item in rkck" :key="item.Id" :label="item.Name" :value="item.Name"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="制单时间" prop="zdsj">
                            <el-input v-model="cancel_.zdsj" :readonly="true"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="供应商" prop="gys">
                            <el-select v-model="cancel_.gystype">
                                <el-option v-for="item in rkck" :key="item.Id" :label="item.Name" :value="item.Name"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="出库仓库" prop="ckck">
                            <el-select v-model="cancel_.ckck">
                                <el-option v-for="item in cancelState" :key="item.Id" :label="item.Name" :value="item.Name"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="退货情况" prop="thqk">
                            <el-select v-model="cancel_.thqk">

                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col>
                        <el-form-item label="退货描述" prop="thms">
                            <el-input type="textarea" :rows="2" v-model="cancel_.thms"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <el-table border :data="goods">
                <el-table-column prop="x" label="商品名称"></el-table-column>
                <el-table-column prop="x" label="商品编码"></el-table-column>
                <el-table-column prop="x" label="克重"></el-table-column>
                <el-table-column prop="x" label="单价"></el-table-column>
                <el-table-column prop="x" label="退货数量"></el-table-column>
                <el-table-column prop="x" label="金额"></el-table-column>
            </el-table>
            <el-form label-position="left" label-width="0px" ref="chushen" :model="order">
                <el-row style="text-align: center">
                    <el-col :span="6">
                        <el-row class="top">
                            审核人
                        </el-row>
                    </el-col>
                    <el-col :span="6">
                        <el-row class="top">
                            审核结果
                        </el-row>
                    </el-col>
                    <el-col :span="6">
                        <el-row  class="top">
                            审核时间
                        </el-row>
                    </el-col>
                    <el-col :span="6">
                        <el-row  class="top">
                            备注
                        </el-row>
                    </el-col>
                </el-row>
                <el-row style="text-align: center" type="flex" align="middle">
                    <el-col :span="6">
                        <el-row v-if="second">
                            <el-form-item>
                                <span class="content look">{{cancel_.shenheren}}</span>
                            </el-form-item>
                        </el-row>
                        <el-row v-else>
                            <el-form-item>
                                <span class="content look">{{user}}</span>
                            </el-form-item>
                        </el-row>
                    </el-col>
                    <el-col :span="6">
                        <el-row v-if="second">
                            <el-form-item>
                                <span class="content">{{cancel_.jieguo}}</span>
                            </el-form-item>
                        </el-row>
                        <el-row v-else>
                            <el-form-item prop="pass">
                                <el-radio v-model="cancel_.pass" label="true">通过</el-radio>
                                <el-radio v-model="cancel_.pass" label="false">不通过</el-radio>
                            </el-form-item>
                        </el-row>
                    </el-col>
                    <el-col :span="6">
                        <el-row v-if="second">
                            <el-form-item>
                                <span class="content">{{cancel_.sjian}}</span>
                            </el-form-item>
                        </el-row>
                        <el-row v-else>
                            <el-form-item>
                                <span class="content">{{NowDate}}</span>
                            </el-form-item>
                        </el-row>
                    </el-col>
                    <el-col :span="6">
                        <el-row v-if="second">
                            <el-form-item prop="beizhu1">
                                <el-input type="textarea" :rows="2" :readonly="true" v-model="cancel_.beizhu1"></el-input>
                            </el-form-item>
                        </el-row>
                        <el-row v-else>
                            <el-form-item prop="beizhu1">
                                <el-input type="textarea" :rows="2"  v-model="cancel_.beizhu1"></el-input>
                            </el-form-item>
                        </el-row>
                    </el-col>
                </el-row>
            </el-form>
            <el-row>
                <el-col :span="5" style="float: right">
                    <el-button @click="Save" type="primary">保存</el-button>
                    <el-button @click="AuditVisible=false">取消</el-button>
                </el-col>
            </el-row>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        data(){
            function getDate(){
                var date = new Date();
                return date.getFullYear()+'-'+date.getMonth()+"-"+date.getDay()+" "+date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()
            }
            return {
                search:{
                    thdh:"",
                    gystype:"原材料供应商",
                    gys:"",
                    zdry:"",
                    shsj:""
                },
                state:[
                    {Id:1,Name:"全部"},
                    {Id:3,Name:"待审核"},
                    {Id:8,Name:"已审核"},
                ],
                cancelState:[
                    {Id:1,Name:"待财务审核"},
                    {Id:3,Name:"终止"},
                ],
                gystype:[
                    {Id:1,Name:"原材料供应商"},
                ],
                rkck:[
                    {Id:1,Name:"原材料仓库"},
                    {Id:2,Name:"半成品仓库"},
                    {Id:3,Name:"成品仓库"},
                ],
                cancel_:{
                    thqk:"部分出库",
                    shenheren:"初审人",
                    jieguo:"通过",
                    pass:"",
                    sjian:"2019-9-9"
                },
                NowDate: getDate(),
                selectedList:[],
                CancelList:[{}],
                AuditVisible:false,
                goods:[{}],
                second:false,
                user:"我自己"
            }
        },
        methods:{
            handleSelectionChange(val) {
                this.selectedList = val
            },
            handleClose(done) {
                this.$confirm("确认关闭？")
                    .then(_ => {
                        done();
                    })
                    .catch(_ => {});
            },
            getDate(){
                var date = new Date();
                return date.getFullYear()+'-'+date.getMonth()+"-"+date.getDay()+" "+date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()
            }
        }
    }
</script>

<style scoped>

</style>
