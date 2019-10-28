<template>
    <div class="min1500">
       <!-- 面包屑导航区域 -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>基础资料</el-breadcrumb-item>
        <el-breadcrumb-item>生产商品管理</el-breadcrumb-item>
      </el-breadcrumb>
      <el-card>
        <el-row :gutter="20" class="row">
          <el-col :span="24">
             <el-row :gutter="20">
                <el-form :inline="true" class="demo-form-inline" :model="chaProductionForm" ref="chaProductionRef">
                    <el-form-item label="产品名称：" prop="productName">
                    <el-select v-model="chaProductionForm.productName" placeholder="请选择">
                        <el-option
                          v-for="item in chanpingmingcheng"
                          :key="item.basicId"
                          :label="item.basicRetainone"
                          :value="item.basicRetainone">
                        </el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button @click="getProductionList">查询</el-button>
                        <el-button type="primary" @click="chaProductionResetForm">重置</el-button>
                    </el-form-item>
                </el-form>
        </el-row>
          <el-button type="success" @click="addyonghuDialogVisible = true">新增</el-button>
          <el-button
            type="warning"
            @click="selectedqi"
            :disabled="selectedList.length == 0"
          >批量启用/禁用</el-button>
          <el-button type="danger" @click="selected" :disabled="selectedList.length == 0">批量删除</el-button>
          <el-table border stripe :data="ProductionList" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="35"></el-table-column>
            <el-table-column type="index" width="55" label="序号" align="center"></el-table-column>
            <el-table-column prop="productId"  label="产品编码"></el-table-column>
            <el-table-column prop="productName" label="产品名称"></el-table-column>
            <el-table-column prop="productType" label="产品类型"></el-table-column>
            <el-table-column prop="list" label="设计稿" width="250px">
            </el-table-column>
            <el-table-column prop="productBrandinner" label="纸张品牌/内" width="100px"></el-table-column>
            <el-table-column prop="productGraminner" label="克数" width="60"></el-table-column>
            <el-table-column prop="productCoatedinner" label="淋膜类型"></el-table-column>
            <el-table-column prop="productBrandabroad" label="纸张品牌/外" width="100px"></el-table-column>
            <el-table-column prop="productGramabroad" label="克数" width="60"></el-table-column>
            <el-table-column prop="productCoatedabroad" label="淋膜类型"></el-table-column>
            <el-table-column prop="productBrandmid" label="纸张品牌/中" width="100px"></el-table-column>
            <el-table-column prop="productGrammid" label="克数" width="60"></el-table-column>
            <el-table-column prop="productCoatedmid" label="淋膜类型"></el-table-column>
            <el-table-column label="状态" width="65px">
              <template slot-scope="scope">
                <!-- {{scope.row}} -->
                <el-switch
                  v-model="scope.row.productState"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                  :active-value="1"
                  :inactive-value="0"
                  @change="userStateChanged(scope.row)"
                ></el-switch>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="190px">
              <template slot-scope="scope">
                <el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditProduction(scope.row.productgoodsId)">修改</el-button>
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  @click="deletebumen(scope.row.productgoodsId)"
                  size="mini"
                >删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          
          </el-col>
        </el-row>
        <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10]"
        :page-size="100"
        layout="total, sizes, prev, pager, next"
        :total=total
      ></el-pagination>
      </el-card>
      <el-dialog
        title="新增生产商品"
        :visible.sync="addyonghuDialogVisible"
        width="50%"
        :before-close="handleClose"
        @closed="dialogClosed">
        <el-form :label-position="labelPosition" label-width="120px" :model="addProductionForm"
        ref="addProductionRef"
        :rules="addProductionRules">
            <el-row>
                <el-col :span="12">
                    <el-form-item label="产品编码：" prop="productId"><el-input placeholder="请输入产品编码" v-model="addProductionForm.productId"></el-input></el-form-item>      
                    <el-form-item label="产品名称：" prop="productName">
                      <el-select v-model="addProductionForm.productName" placeholder="请选择">
                        <el-option
                          v-for="item in chanpingmingcheng"
                          :key="item.basicId"
                          :label="item.basicRetainone"
                          :value="item.basicRetainone">
                        </el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="产品类型：" prop="productType">
                      <el-select v-model="addProductionForm.productType" placeholder="请选择">
                        <el-option
                          v-for="item in chanpingleixing"
                          :key="item.basicId"
                          :label="item.basicRetainone"
                          :value="item.basicRetainone">
                        </el-option>
                      </el-select>
                    </el-form-item>      
                    
                    <el-form-item label="纸张品牌/内：" prop="productBrandinner">
                    
                    <el-select v-model="addProductionForm.productBrandinner" placeholder="请选择">
                        <el-option
                          v-for="item in zhizhang"
                          :key="item.basicId"
                          :label="item.basicRetainone"
                          :value="item.basicRetainone">
                        </el-option>
                      </el-select>
                    </el-form-item>     
                    <el-form-item label="克数/内：" prop="productGraminner"><el-input placeholder="请输入克数/内" v-model="addProductionForm.productGraminner"></el-input></el-form-item>
                    <el-form-item label="淋膜类型/内：" prop="productCoatedinner">
                    <el-select v-model="addProductionForm.productCoatedinner" placeholder="请选择">
                        <el-option
                          v-for="item in linmo"
                          :key="item.basicId"
                          :label="item.basicRetainone"
                          :value="item.basicRetainone">
                        </el-option>
                      </el-select>
                    </el-form-item>   
                </el-col>
                <el-col :span="12"> 
                    <el-form-item label="纸张品牌/外：" prop="productBrandabroad">
                    <el-select v-model="addProductionForm.productBrandabroad" placeholder="请选择">
                        <el-option
                          v-for="item in zhizhang"
                          :key="item.basicId"
                          :label="item.basicRetainone"
                          :value="item.basicRetainone">
                        </el-option>
                      </el-select>
                    </el-form-item>     
                    <el-form-item label="克数/外：" prop="productGramabroad"><el-input placeholder="请输入克数/外" v-model="addProductionForm.productGramabroad"></el-input></el-form-item>
                    <el-form-item label="淋膜类型/外：" prop="productCoatedabroad">
                    <el-select v-model="addProductionForm.productCoatedabroad" placeholder="请选择">
                        <el-option
                          v-for="item in linmo"
                          :key="item.basicId"
                          :label="item.basicRetainone"
                          :value="item.basicRetainone">
                        </el-option>
                      </el-select>
                    </el-form-item>  
                    <el-form-item label="纸张品牌/中：" prop="productBrandmid">
                    <el-select v-model="addProductionForm.productBrandmid" placeholder="请选择">
                        <el-option
                          v-for="item in zhizhang"
                          :key="item.basicId"
                          :label="item.basicRetainone"
                          :value="item.basicRetainone">
                        </el-option>
                      </el-select>
                    </el-form-item>     
                    <el-form-item label="克数/中：" prop="productGrammid"><el-input placeholder="请输入克数/中" v-model="addProductionForm.productGrammid"></el-input></el-form-item>
                    <el-form-item label="淋膜类型/中：" prop="productCoatedmid">
                    <el-select v-model="addProductionForm.productCoatedmid" placeholder="请选择">
                        <el-option
                          v-for="item in linmo"
                          :key="item.basicId"
                          :label="item.basicRetainone"
                          :value="item.basicRetainone">
                        </el-option>
                      </el-select>
                    
                    </el-form-item>             
                </el-col>
            </el-row>
            <el-form-item label="设计稿：" prop="designCode">
            <el-select v-model="addProductionForm.designCode" placeholder="请选择">
                  <el-option
                    v-for="item in shejigao"
                    :key="item.designId"
                    :label="item.designModel+'-'+item.designDate+'-'+item.designName"
                    :value="item.designId">
                  </el-option>
                </el-select>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="addyonghuDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="addProduction">确 定</el-button>
        </span>
      </el-dialog>
      <el-dialog
        title="编辑生产商品"
        :visible.sync="edityonghuDialogVisible"
        width="48%"
        :before-close="handleClose"
        @closed="dialogClosed">
       <el-form :label-position="labelPosition" label-width="120px" :model="editProductionForm"
        ref="addProductionRef"
        :rules="addProductionRules">
            <el-row>
                <el-col :span="12">
                    <el-form-item label="产品编码：" prop="productId"><el-input placeholder="请输入产品编码" v-model="editProductionForm.productId"></el-input></el-form-item>      
                    <el-form-item label="产品名称：" prop="productName">
                      <el-select v-model="editProductionForm.productName" placeholder="请选择">
                        <el-option
                          v-for="item in chanpingmingcheng"
                          :key="item.basicId"
                          :label="item.basicRetainone"
                          :value="item.basicRetainone">
                        </el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="产品类型：" prop="productType">
                      <el-select v-model="editProductionForm.productType" placeholder="请选择">
                        <el-option
                          v-for="item in chanpingleixing"
                          :key="item.basicId"
                          :label="item.basicRetainone"
                          :value="item.basicRetainone">
                        </el-option>
                      </el-select>
                    </el-form-item>      
                    
                    <el-form-item label="纸张品牌/内：" prop="productBrandinner">
                    
                    <el-select v-model="editProductionForm.productBrandinner" placeholder="请选择">
                        <el-option
                          v-for="item in zhizhang"
                          :key="item.basicId"
                          :label="item.basicRetainone"
                          :value="item.basicRetainone">
                        </el-option>
                      </el-select>
                    </el-form-item>     
                    <el-form-item label="克数/内：" prop="productGraminner"><el-input placeholder="请输入克数/内" v-model="editProductionForm.productGraminner"></el-input></el-form-item>
                    <el-form-item label="淋膜类型/内：" prop="productCoatedinner">
                    <el-select v-model="editProductionForm.productCoatedinner" placeholder="请选择">
                        <el-option
                          v-for="item in linmo"
                          :key="item.basicId"
                          :label="item.basicRetainone"
                          :value="item.basicRetainone">
                        </el-option>
                      </el-select>
                    </el-form-item>   
                </el-col>
                <el-col :span="12"> 
                    <el-form-item label="纸张品牌/外：" prop="productBrandabroad">
                    <el-select v-model="editProductionForm.productBrandabroad" placeholder="请选择">
                        <el-option
                          v-for="item in zhizhang"
                          :key="item.basicId"
                          :label="item.basicRetainone"
                          :value="item.basicRetainone">
                        </el-option>
                      </el-select>
                    </el-form-item>     
                    <el-form-item label="克数/外：" prop="productGramabroad"><el-input placeholder="请输入克数/外" v-model="editProductionForm.productGramabroad"></el-input></el-form-item>
                    <el-form-item label="淋膜类型/外：" prop="productCoatedabroad">
                    <el-select v-model="editProductionForm.productCoatedabroad" placeholder="请选择">
                        <el-option
                          v-for="item in linmo"
                          :key="item.basicId"
                          :label="item.basicRetainone"
                          :value="item.basicRetainone">
                        </el-option>
                      </el-select>
                    </el-form-item>  
                    <el-form-item label="纸张品牌/中：" prop="productBrandmid">
                    <el-select v-model="editProductionForm.productBrandmid" placeholder="请选择">
                        <el-option
                          v-for="item in zhizhang"
                          :key="item.basicId"
                          :label="item.basicRetainone"
                          :value="item.basicRetainone">
                        </el-option>
                      </el-select>
                    </el-form-item>     
                    <el-form-item label="克数/中：" prop="productGrammid"><el-input placeholder="请输入克数/中" v-model="editProductionForm.productGrammid"></el-input></el-form-item>
                    <el-form-item label="淋膜类型/中：" prop="productCoatedmid">
                    <el-select v-model="editProductionForm.productCoatedmid" placeholder="请选择">
                        <el-option
                          v-for="item in linmo"
                          :key="item.basicId"
                          :label="item.basicRetainone"
                          :value="item.basicRetainone">
                        </el-option>
                      </el-select>
                    
                    </el-form-item>             
                </el-col>
            </el-row>
            <el-form-item label="设计稿：" prop="designCode">
            <el-select v-model="editProductionForm.designCode" placeholder="请选择">
                  <el-option
                    v-for="item in shejigao"
                    :key="item.designId"
                    :label="item.designModel+'-'+item.designDate+'-'+item.designName"
                    :value="item.designId">
                  </el-option>
                </el-select>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="edityonghuDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="editProduction">确 定</el-button>
        </span>
      </el-dialog>
      <el-dialog title="提示" :visible.sync="delVisible" width="300px">
      <div class="del-dialog-cnt">删除不可恢复，是否确定删除？</div>
      <span slot="footer" class="dialog-footer">
          <el-button @click="delVisible = false">取 消</el-button>
          <el-button type="primary" @click="deleteRow" >确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="提示" :visible.sync="delVisibleqi" width="300px">
      <div class="del-dialog-cnt">此操作将批量启用, 是否继续？</div>
      <span slot="footer" class="dialog-footer">
          <el-button @click="delVisibleqi = false">取 消</el-button>
          <el-button type="primary" @click="deleteRowqi" >确 定</el-button>
      </span>
    </el-dialog>
    </div>
</template>
<script>
export default {
  data () {
    return {
      labelPosition: 'right',
      addyonghuDialogVisible: false,
      edityonghuDialogVisible:false,
      resetPassdialogVisible:false,
      delVisible:false,
      delVisibleqi:false,
      currentPage:0 ,
      ProductionList:[],
      selectedList: [],
      delarr:[],
      addProductionForm:{
        productId:'',
        productName:'',
        productType:'',
        productBrandinner:'',
        productGraminner:'',
        productCoatedinner:'',
        productBrandabroad:'',
        productGramabroad:'',
        productCoatedabroad:'',
        productBrandmid:'',
        productGrammid:'',
        productCoatedmid:'',
        productState:'',
        designCode:'',
      },
      editProductionForm:{
        productId:'',
        productName:'',
        productType:'',
        productBrandinner:'',
        productGraminner:'',
        productCoatedinner:'',
        productBrandabroad:'',
        productGramabroad:'',
        productCoatedabroad:'',
        productBrandmid:'',
        productGrammid:'',
        productCoatedmid:'',
        productState:'',
        designCode:'',
      },
      chaProductionForm:{
        productName:'',
        pageCode: 1, //当前页
        pageSize: 10,//每页显示的记录数
      },
      total:0,
      chanpingleixing:[],
      linmo:[],
      zhizhang:[],
      chanpingmingcheng:[],
      shejigao:[],
      addProductionRules: {
          productId:[
          { required: true, message: '请输入内容', trigger: 'blur' },
          // { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
          ],},
    }
  },
  created () {
    this.getProductionList();
    this.getProductionList1();

  },
  methods:{
    async getProductionList() {
      const { data: res } = await this.$http.post("jc/Produconggoods/selectProducing",this.chaProductionForm);
      
      let design='';
      for (let index = 0; index < res.body.rows.length; index++) {
        for (let i = 0; i < res.body.rows[index].designDOs.length; i++) {
          design=res.body.rows[index].designDOs[i].designModel+'-'+res.body.rows[index].designDOs[i].designDate+'-'+res.body.rows[index].designDOs[i].designName
        }
        res.body.rows[index].list=design;
      }
      this.ProductionList = res.body.rows;
      this.total=res.body.total;
    },
    async getProductionList1() {
      const { data: res } = await this.$http.post("jc/Basic/selectProducttype");
      const { data: res1 } = await this.$http.post("jc/Basic/selectcoated");
      const { data: res2 } = await this.$http.post("jc/Basic/selectparper");
      const { data: res3 } = await this.$http.post("jc/Basic/selectProductName");
      const { data: res4 } = await this.$http.post("jc/Design/selectdesignname");
      this.chanpingleixing = res;
      this.linmo = res1;
      this.zhizhang = res2;
      this.chanpingmingcheng = res3;
      this.shejigao=res4;
    },
    
    addProduction() {
      this.$refs.addProductionRef.validate(async valid => {
        if (!valid) return;    
        const { data: res } = await this.$http.post("jc/Produconggoods/addProducing",this.addProductionForm);
        this.getProductionList();
        this.addyonghuDialogVisible = false;
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
      });
    },
    async showEditProduction(productgoodsId){
      let param = new URLSearchParams();
      param.append("productgoodsId", productgoodsId);
      const {data:res} = await this.$http.post('jc/Produconggoods/selectProducingbyid',param);
      this.editProductionForm=res;
      this.editProductionForm.designCode=res.designDOs[0].designId;
      this.edityonghuDialogVisible=true;
    },
    async editProduction(){
       const {data:res} = await this.$http.post('jc/Produconggoods/updateProducing',this.editProductionForm);
       this.getProductionList();
       this.edityonghuDialogVisible=false;
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
    async userStateChanged(userInfo) {
      const { data: res } = await this.$http.post("jc/Produconggoods/updateProducingstate",userInfo);
      this.getProductionList();
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
    dialogClosed(){
        this.$refs.addProductionRef.resetFields();
      },
    selectedqi(){
      this.delarr=[];
      this.delVisibleqi = true;
      for (let i = 0; i < this.selectedList.length; i++) {
        this.delarr.push({productgoodsId:this.selectedList[i].productgoodsId,productState:this.selectedList[i].productState==1?0:1})
      }
    },
    selected(){
      this.delarr=[];
      this.delVisible = true;
      for (let i = 0; i < this.selectedList.length; i++) {
        this.delarr.push(this.selectedList[i].productgoodsId)
      }
    },
    async deleteRow(){
         const {data:res} = await this.$http.post('jc/Produconggoods/deleteProducingmore',this.delarr);
         this.delVisible = false;
         this.getProductionList();
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
      async deleteRowqi(){
         const {data:res} = await this.$http.post('jc/Produconggoods/updateProducingstatemore',this.delarr);
         this.delVisibleqi = false;
         this.getProductionList();
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
      chaProductionResetForm(formName){
        this.$refs.chaProductionRef.resetFields();
        this.getProductionList();
    },
    handleSelectionChange(val) {
      this.selectedList = val;
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.chaProductionForm.pageSize=val;
      this.getProductionList();
    },
    handleCurrentChange(val) {
      this.chaProductionForm.pageCode=val;
      console.log(`当前页: ${val}`);
      this.currentPage=val;
      this.getProductionList();
    },
    handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
    },
    deletebumen(productgoodsId){
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async() => {
          let param = new URLSearchParams();
          param.append("productgoodsId", productgoodsId);
          const { data: res } = await this.$http.post(
            "jc/Produconggoods/delectProducing",
            param
          );
          this.getProductionList();
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
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },
     handleNodeClick(data) {
        console.log(data);
     }
  }
}
</script>
<style lang='less' scoped>
    .el-card{
        margin-top: 15px;
    }
    .el-row{
        align-items: center;
        display: flex;
    }
    .el-table{
        margin-top: 15px;
    }
    .demo-form-inline .el-input{
      width: 170px;
    }
    .xiang{
      width: 400px;
    }
    .hu{
      width: 133px;
    }
   .el-col{
        .el-input{
            width: 300px;
        }
    }
    .el-select{
      width: 300px;
    }
</style>