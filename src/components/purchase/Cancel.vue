<template>
    <div class="min1500">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>采购退货单</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card>
            <el-form :model="search" ref="search" label-position="left" label-width="90px">
                <el-row>
                    <el-col :span="5">
                        <el-form-item label="退货单号" prop="thdh">
                            <el-input v-model="search.thdh"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="5" :push="1">
                        <el-form-item label="制单人" prop="zdr">
                            <el-input v-model="search.zdr"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="5">
                        <el-form-item label="退货单状态" prop="state">
                            <el-select v-model="search.state">
                                <el-option v-for="item in state" :key="item.Id" :value="item.Name" :label="item.Name"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="5" :push="1">
                        <el-form-item label-width="0" prop="gystype">
                            <el-select v-model="search.gystype">
                                <el-option v-for="item in gystype" :key="item.Id" :value="item.Name" :label="item.Name"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="5" >
                        <el-form-item label-width="0" prop="gys">
                            <el-input v-model="search.gys"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="3">
                        <div style="float: right">
                            <el-button>查询</el-button>
                            <el-button type="primary" @click="$refs.search.resetFields()">重置</el-button>
                        </div>
                    </el-col>
                </el-row>
            </el-form>
            <el-row>
                <el-button @click="AddVisible=true" type="primary">新增</el-button>
                <el-button type="primary" :disabled="selectedList.length == 0">编辑</el-button>
                <el-button type="primary" :disabled="selectedList.length == 0">提审</el-button>
                <el-button type="danger"  :disabled="selectedList.length == 0">删除</el-button>
                <el-button type="warning" :disabled="selectedList.length == 0">终止退货</el-button>
            </el-row>
            <el-table border :data="orderList" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column prop="x" label="退货单号"></el-table-column>
                <el-table-column prop="x" label="供应商"></el-table-column>
                <el-table-column prop="x" label="退款总金额"></el-table-column>
                <el-table-column prop="x" label="退货总数量"></el-table-column>
                <el-table-column prop="x" label="已退数量"></el-table-column>
                <el-table-column prop="x" label="退货情况"></el-table-column>
                <el-table-column prop="x" label="出库仓库"></el-table-column>
                <el-table-column prop="x" label="制单人员"></el-table-column>
                <el-table-column prop="x" label="审核状态"></el-table-column>
                <el-table-column prop="x" label="制单时间"></el-table-column>
                <el-table-column prop="x" label="审核时间"></el-table-column>
                <el-table-column prop="x" label="退货描述" :show-overflow-tooltip="true"></el-table-column>
            </el-table>
        </el-card>
        <el-dialog
            title="新增/编辑退货单"
            :visible.sync="AddVisible"
            width="55%"
            :before-close="handleClose"
            @closed="$refs.cancel_.resetFields()"
        >
            <el-form :model="cancel_" label-position="left" label-width="100px" ref="cancel_">
                <el-row>
                    <el-col :span="8">
                        <el-form-item prop="gys" label="*供应商:">
                            <el-select v-model="cancel_.gys">
                                <el-option v-for="item in cancel_gys" :key="item.Id" :value="item.Name" :label="item.Name"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8" :push="1">
                        <el-form-item prop="ckck" label="出库仓库">
                            <el-select v-model="cancel_.ckck">
                                <el-option v-for="item in cancel_ckck" :key="item.Id" :value="item.Name" :label="item.Name"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="制单人员：" prop="zdry">
                            <el-input v-model="cancel_.zdry" :readonly="true"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8" :push="1">
                        <el-form-item label="制单时间：" prop="zdsj">
                            <el-input v-model="cancel_.zdsj" :readonly="true"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col>
                        <el-form-item prop="thms" label="退货描述：">
                            <el-input type="textarea" :rows="2" v-model="cancel_.thms"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="14">
                        <el-form-item label="退货地址：" prop="thdz">
                            <el-input v-model="cancel_.thdz"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="14">
                        <el-form-item label="收货人：" prop="shr">
                            <el-input v-model="cancel_.shr"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="14">
                        <el-form-item label="电话：" prop="dh">
                            <el-input v-model="cancel_.dh"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <el-row>
                <el-button :disabled="GoodsSelectedList.length==0" type="danger">删除</el-button>
            </el-row>
            <el-table border :data="goodsList" @selection-change="goodsListSelect">
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column prop="x" label="采购订单"></el-table-column>
                <el-table-column prop="x" label="商品名称"></el-table-column>
                <el-table-column prop="x" label="商品编码"></el-table-column>
                <el-table-column prop="x" label="克重"></el-table-column>
                <el-table-column prop="x" label="单价"></el-table-column>
                <el-table-column prop="x" label="采购总量"></el-table-column>
                <el-table-column prop="x" label="到货数量"></el-table-column>
                <el-table-column prop="x" label="退货数量">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.thsl"></el-input>
                    </template>
                </el-table-column>
                <el-table-column prop="x" label="金额">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.jine"></el-input>
                    </template>
                </el-table-column>
                <el-table-column label="退货原因" width="190px">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.thyy"></el-input>
                    </template>
                </el-table-column>
            </el-table>
            <el-row style="margin: 20px 0 40px">
                <el-col :span="12" style="float: right">
                    <el-row>
                        <el-col :span="10">
                            退货总数量:{{allCount()}}
                        </el-col>
                        <el-col :span="10">
                            退货总数量:{{allMoney()}}
                        </el-col>
                    </el-row>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="7" style="float: right">
                    <el-button @click="Save" type="primary">保存</el-button>
                    <el-button @click="AddVisible=false">取消</el-button>
                </el-col>
            </el-row>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                search:{
                    thdh:"",
                    gystype:"原材料供应商",
                    gys:"",
                    zdry:"",
                },
                state:[
                    {Id:1,Name:"全部"},
                    {Id:2,Name:"初始化"},
                    {Id:3,Name:"待采购审核"},
                    {Id:4,Name:"待财务审核"},
                    {Id:5,Name:"审核不通过"},
                    {Id:6,Name:"待退货"},
                    {Id:7,Name:"已退货"},
                    {Id:8,Name:"终止"},
                ],
                gystype:[
                    {Id:1,Name:"原材料供应商"},
                ],
                AddVisible:false,
                selectedList:[],
                orderList:[{}],
                GoodsSelectedList:[],
                cancel_:{
                    gys:"",
                    ckck:"",
                    zdsj:"2015-9-9",
                    zdry:"人员"
                },
                cancel_gys:[
                    {Id:1,Name:"A供应商"},
                    {Id:2,Name:"B料供应商"},
                ],
                cancel_ckck:[
                    {Id:1,Name:"A仓库"},
                    {Id:2,Name:"B仓库"},
                ],
                goodsList:[{
                    jine:0,
                    thsl:0
                }],
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
            goodsListSelect(val) {
                this.GoodsSelectedList = val
            },

            allCount:function () {
                var count = 0
                this.goodsList.forEach(function (val) {
                    count+=parseInt(val.thsl)
                })
                return count
            },
            allMoney:function(){
                var count = 0
                this.goodsList.forEach(function (val) {
                    count+=parseInt(val.jine)
                })
                return count
            },
            Save(){

            }
        },
        watch:{
            goodsList :function (val) {
                console.log(val)
                // this.goodsList.forEach(function (val) {
                //     this.allCount+=parseInt(val.thsl)
                //     console.log(val)
                // })
            },
            allMoney :function () {
                var allCount = 0;
                this.goodsList.forEach(function (val) {
                    allCount+=val.jine
                })
            }
        }
    }
</script>

<style scoped>

</style>
