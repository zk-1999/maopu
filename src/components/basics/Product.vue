<template>
    <div class="min1500">
       <!-- 面包屑导航区域 -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>基础资料</el-breadcrumb-item>
        <el-breadcrumb-item>产品设计稿维护</el-breadcrumb-item>
      </el-breadcrumb>
      <el-card>
        <el-row :gutter="20" class="row">
          <el-col :span="24">
             <el-row :gutter="20">
                <el-form :inline="true" class="demo-form-inline" :model="chaProductForm" ref="chaProductRef">
                    <el-form-item label="设计稿编码：" prop="designName">
                    <el-input placeholder="请输入名称" v-model="chaProductForm.designName"></el-input>
                    </el-form-item>
                    <el-form-item label="颜色：" prop="designCol1">
                    <el-input placeholder="请输入颜色" v-model="chaProductForm.designCol1"></el-input>
                    </el-form-item>
                    <el-form-item label="状态：" prop="designState">
                    <el-select v-model="chaProductForm.designState" placeholder="请选择">
                      <el-option
                        v-for="item in chaproductList"
                        :key="item.designId"
                        :label="item.a"
                        :value="item.designState">
                      </el-option>
                    </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button @click="getProductList">查询</el-button>
                        <el-button type="primary" @click="chaProductResetForm">重置</el-button>
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
          <el-table border stripe :data="productList" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="35" align="center"></el-table-column>
            <el-table-column type="index" width="55" align="center" label="序号"></el-table-column>
            <el-table-column prop="designName" label="设计稿编码" align="center">
              <template slot-scope="scope">
                {{scope.row.designModel+'-'+scope.row.designName+'-'+scope.row.designDate}}
              </template>
            </el-table-column>
            <!-- <el-table-column prop="b" label="名称"></el-table-column> -->
            <el-table-column prop="" label="颜色" align="center">
              <template slot-scope="scope">
                <!-- {{scope.row.designCol2}} -->
                <div><el-tag v-if="scope.row.designCol1!=''&&scope.row.designCol1!=null">{{scope.row.designCol1}}</el-tag>
                <el-tag type="success" v-if="scope.row.designCol2!=''&&scope.row.designCol2!=null">{{scope.row.designCol2}}</el-tag>
                <el-tag type="info" v-if="scope.row.designCol3!=''&&scope.row.designCol3!=null">{{scope.row.designCol3}}</el-tag>
                <el-tag type="warning" v-if="scope.row.designCol4!=''&&scope.row.designCol4!=null">{{scope.row.designCol4}}</el-tag> </div>
                <!-- <el-tag v-if="scope.row.designCol1!=''&&scope.row.designCol1!=null">{{scope.row.designCol1}}</el-tag>
                <el-tag type="success" v-if="scope.row.designCol2!=''&&scope.row.designCol2!=null">{{scope.row.designCol2}}</el-tag>
                <el-tag type="info" v-if="scope.row.designCol3!=''&&scope.row.designCol3!=null">{{scope.row.designCol3}}</el-tag>
                <el-tag type="warning" v-if="scope.row.designCol4!=''&&scope.row.designCol4!=null">{{scope.row.designCol4}}</el-tag> 
                </br> -->
                <div><el-tag v-if="scope.row.designCol5!=''&&scope.row.designCol5!=null">{{scope.row.designCol5}}</el-tag>
                <el-tag type="success" v-if="scope.row.designCol6!=''&&scope.row.designCol6!=null">{{scope.row.designCol6}}</el-tag>
                <el-tag type="info" v-if="scope.row.designCol7!=''&&scope.row.designCol7!=null">{{scope.row.designCol7}}</el-tag>
                <el-tag type="warning" v-if="scope.row.designCol8!=''&&scope.row.designCol8!=null">{{scope.row.designCol8}}</el-tag></div>
                <!-- <el-tag v-if="scope.row.designCol5!=''&&scope.row.designCol5!=null">{{scope.row.designCol5}}</el-tag>
                <el-tag type="success" v-if="scope.row.designCol6!=''&&scope.row.designCol6!=null">{{scope.row.designCol6}}</el-tag>
                <el-tag type="info" v-if="scope.row.designCol7!=''&&scope.row.designCol7!=null">{{scope.row.designCol7}}</el-tag>
                <el-tag type="warning" v-if="scope.row.designCol8!=''&&scope.row.designCol8!=null">{{scope.row.designCol8}}</el-tag> -->
                <!-- {{scope.row.designCol1==null?'':scope.row.designCol1+','+scope.row.designCol2+','+scope.row.designCol3+','+scope.row.designCol4+','+
                scope.row.designCol5+','+scope.row.designCol6+','+scope.row.designCol7+','+scope.row.designCol8}} -->
              </template>
            </el-table-column>
            <el-table-column prop="designPicture" label="图片" align="center">
                <!-- <div class="demo-image__preview">
                  <el-image
                    style="width:200px; height: 100px"
                    :src="url" 
                    :preview-src-list="srcList"
                    >
                  </el-image>
                </div> -->
                <template scope="scope">
                  <!-- <img :src="scope.row.designPicture" /> -->
                   <el-image 
    style="width: 200px; height: 100px"
    :src="scope.row.designPicture" 
    :preview-src-list="srcList" @click="a(scope.row.designPicture)">
  </el-image>
                </template>
                
            </el-table-column>
            <el-table-column label="状态" width="65px" align="center">
              <template slot-scope="scope">
                <el-switch
                  v-model="scope.row.designState"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                  :active-value="1"
                  :inactive-value="0"
                  @change="userStateChanged(scope.row)"
                ></el-switch>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="190px" align="center">
              <template slot-scope="scope">
                <el-button type="primary" icon="el-icon-edit" size="mini" @click="showProduct(scope.row.designId)">修改</el-button>
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  @click="deletebumen(scope.row.designId)"
                  size="mini"
                >删除</el-button>
              </template>
            </el-table-column>
          </el-table></el-col>
        </el-row>
        <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
       
        :page-size="4"
        layout="total,  prev, pager, next"
        :total=total
      ></el-pagination>
      </el-card>
      <el-dialog
        title="新增产品设计稿"
        :visible.sync="addyonghuDialogVisible"
        width="40%"
        :before-close="handleClose"
        @closed="dialogClosed">
        <el-form :label-position="labelPosition" label-width="130px" :model="addProductForm"
        ref="addProductRef"
        :rules="addProductRules">
            <el-form-item label="产品规格：" prop="designModel">
              <!-- <el-input placeholder="请输入产品型号" v-model="addProductForm.designModel"></el-input> -->
            
             <el-select class="tiantou" v-model="addProductForm.designModel" placeholder="请选择类型">
                    <el-option
                  v-for="item in chanpingguige"
                  :key="item.basicId"
                  :label="item.basicRetainone"
                  :value="item.basicRetainone"
                ></el-option>
                  </el-select>
            </el-form-item>      
            <el-form-item label="设计稿名称：" prop="designName">
              <!-- <el-input placeholder="请输入产品名称" v-model="addProductForm.designName"></el-input> -->
            <el-select class="tiantou" v-model="addProductForm.designName" placeholder="请选择类型">
                    <el-option
                  v-for="item in shejigaomingcehg"
                  :key="item.basicId"
                  :label="item.basicRetainone"
                  :value="item.basicRetainone"
                ></el-option>
                  </el-select>
            </el-form-item>      
            <el-form-item label="确定日期：" prop="designDate"><el-input placeholder="请输入产品日期" v-model="addProductForm.designDate" class="xiang"></el-input></el-form-item>

              <el-row>
                <el-col :span="12">
                  <el-form-item label="颜色：" prop="designCol1">
                   <el-input placeholder="请输入颜色1" v-model="addProductForm.designCol1"></el-input>
                   </el-form-item>
                   <el-form-item prop="designCol2">
                   <el-input placeholder="请输入颜色2" v-model="addProductForm.designCol2"></el-input>
                   </el-form-item>
                   <el-form-item prop="designCol3">
                   <el-input placeholder="请输入颜色3" v-model="addProductForm.designCol3"></el-input>
                   </el-form-item>
                   <el-form-item prop="designCol4">
                   <el-input placeholder="请输入颜色4" v-model="addProductForm.designCol4"></el-input>
                   </el-form-item>
                </el-col>
                 <el-col :span="12">
                   <el-form-item label-width="0px" prop="designCol5">
                   <el-input placeholder="请输入颜色5" v-model="addProductForm.designCol5"></el-input>
                   </el-form-item>
                   <el-form-item label-width="0px" prop="designCol6">
                   <el-input placeholder="请输入颜色6" v-model="addProductForm.designCol6"></el-input>
                   </el-form-item>
                   <el-form-item label-width="0px" prop="designCol7">
                   <el-input placeholder="请输入颜色7" v-model="addProductForm.designCol7"></el-input>
                   </el-form-item>
                   <el-form-item label-width="0px" prop="designCol8">
                   <el-input placeholder="请输入颜色8" v-model="addProductForm.designCol8"></el-input>
                   </el-form-item>
                </el-col>
               </el-row>
            
            <el-form-item label="上传设计稿：" prop="designPicture">
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
              class="upload-demo"
              drag
              :action="ip"
              multiple>
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
              <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload> -->
            <!-- <el-upload
  action="http://192.168.31.234:8090/upload"
  list-type="picture-card"
  :on-preview="handlePictureCardPreview"
  :on-remove="handleRemove">
  <i class="el-icon-plus"></i>
</el-upload> -->
            
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="addyonghuDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="addProduct">确 定</el-button>
        </span>
      </el-dialog>
      <el-dialog
        title="编辑产品设计稿"
        :visible.sync="edityonghuDialogVisible"
        width="40%"
        :before-close="handleClose"
        @closed="dialogClosed">
        <el-form :label-position="labelPosition" label-width="130px" :model="editProductForm"
        ref="editProductRef"
        :rules="addProductRules">
        <el-form-item label="产品规格：" prop="designModel">
            <el-select class="tiantou" v-model="editProductForm.designModel" placeholder="请选择类型">
                    <el-option
                  v-for="item in chanpingguige"
                  :key="item.basicId"
                  :label="item.basicRetainone"
                  :value="item.basicRetainone"
                ></el-option>
                  </el-select>
            </el-form-item>      
            <el-form-item label="设计稿名称：" prop="designName">
              <!-- <el-input placeholder="请输入产品名称" v-model="addProductForm.designName"></el-input> -->
            <el-select class="tiantou" v-model="editProductForm.designName" placeholder="请选择类型">
                    <el-option
                  v-for="item in shejigaomingcehg"
                  :key="item.basicId"
                  :label="item.basicRetainone"
                  :value="item.basicRetainone"
                ></el-option>
                  </el-select>
            </el-form-item>      
            <el-form-item label="确定日期：" prop="designDate"><el-input placeholder="请输入产品日期" v-model="editProductForm.designDate" class="xiang"></el-input></el-form-item>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="颜色：" prop="designCol1">
                   <el-input placeholder="请输入颜色1" v-model="editProductForm.designCol1"></el-input>
                   </el-form-item>
                   <el-form-item prop="designCol2">
                   <el-input placeholder="请输入颜色2" v-model="editProductForm.designCol2"></el-input>
                   </el-form-item>
                   <el-form-item prop="designCol3">
                   <el-input placeholder="请输入颜色3" v-model="editProductForm.designCol3"></el-input>
                   </el-form-item>
                   <el-form-item prop="designCol4">
                   <el-input placeholder="请输入颜色4" v-model="editProductForm.designCol4"></el-input>
                   </el-form-item>
                </el-col>
                 <el-col :span="12">
                   <el-form-item label-width="0px" prop="designCol5">
                   <el-input placeholder="请输入颜色5" v-model="editProductForm.designCol5"></el-input>
                   </el-form-item>
                   <el-form-item label-width="0px" prop="designCol6">
                   <el-input placeholder="请输入颜色6" v-model="editProductForm.designCol6"></el-input>
                   </el-form-item>
                   <el-form-item label-width="0px" prop="designCol7">
                   <el-input placeholder="请输入颜色7" v-model="editProductForm.designCol7"></el-input>
                   </el-form-item>
                   <el-form-item label-width="0px" prop="designCol8">
                   <el-input placeholder="请输入颜色8" v-model="editProductForm.designCol8"></el-input>
                   </el-form-item>
                </el-col>
               </el-row>
            
            <el-form-item label="上传设计稿：" prop="designPicture">
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
              class="upload-demo"
              drag
              :action="ip"
              multiple>
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
              <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload> -->
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="edityonghuDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="editProduct">确 定</el-button>
        </span>
      </el-dialog>
      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt="">
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
    <el-dialog :visible.sync="dialogVisible">
  <img width="100%" :src="dialogImageUrl" alt="">
</el-dialog>
    <el-dialog
      title=""
      :visible.sync="tupainfangdadialogVisible"
      width="45%"
      :before-close="handleClose" class="fanggda">
      <img :src="tupainfangda" alt="" width="100%">
      <span slot="footer" class="dialog-footer">
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
      tupainfangdadialogVisible:false,
      delVisible:false,
      delVisibleqi:false,
      currentPage: 0,
      selectedList: [],
      delarr:[],
      productList:[],
      ip:'',
      ip1:'',
      chaproductList:[{designState:1,a:'启用',designId:0},{designState:0,a:'禁用',designId:1}],
      chaProductForm:{
        designName:'',
        designCol1:'',
        designState:'',
         pageCode: 1, //当前页
        pageSize: 4,//每页显示的记录数
      },
      total:0,
      chanpingguige:[],
      addProductForm:{
        designName:'',
        designModel:'',
        designDate:'',
        designPicture:'',
        designCol1:'',
        designCol2:'',
        designCol3:'',
        designCol4:'',
        designCol5:'',
        designCol6:'',
        designCol7:'',
        designCol8:'',
      },
      editProductForm:{
        designName:'',
        designModel:'',
        designDate:'',
        designPicture:'',
        designCol1:'',
        designCol2:'',
        designCol3:'',
        designCol4:'',
        designCol5:'',
        designCol6:'',
        designCol7:'',
        designCol8:'',
      },
      tupainfangda:'',
      shejigaomingcehg:[],
      addProductRules: {
          designName:[
          // { required: true, message: '请输入内容', trigger: 'blur' },
          // { min: 1, max: 10, message: '长度在 1 到 1000个字符', trigger: 'blur' }
          ],},
          url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      srcList: [
          'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
          'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg'
        ],
        //文件上传的参数
            dialogImageUrl: '',
            dialogVisible: false,
            //图片列表（用于在上传组件中回显图片）
          
    }
  },
  created () {
    this.getProductList();
    this.list();
  },
  methods:{
    a(url){
      this.tupainfangdadialogVisible=true;
      this.tupainfangda=url;
      
    },
   async list(){
     const { data: res1 } = await this.$http.post("jc/Basic/selectbox");
     this.shejigaomingcehg=res1;
      const { data: res } = await this.$http.post("jc/Basic/selectProductcode");
      
      this.chanpingguige=res;
    },
    //文件上传成功的钩子函数
        handleSuccess(res, file) {
            this.$message({
                type: 'info',
                message: '图片上传成功',
                duration: 6000
            });
            if (file.response.success) {
                // this.editor.picture = file.response.message; //将返回的文件储存路径赋值picture字段
                
                this.addProductForm.designPicture=file.response.message;
                this.editProductForm.designPicture=file.response.message;

                // this.productList.picture=file.response.message;
                console.log(file.response.message);
                
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
    async getProductList(){
      const { data: res } = await this.$http.post("jc/Design/selectDesign",this.chaProductForm);
      this.ip=this.ips+'upload';
      this.ip1=this.ips;
      for (let index = 0; index < res.body.rows.length; index++) {
        res.body.rows[index].designPicture=this.ip1+res.body.rows[index].designPicture
      }
      this.total=res.body.total
      this.productList = res.body.rows;
    },
    async userStateChanged(userInfo) {
      const { data: res } = await this.$http.post("jc/Design/updatedesignstate",userInfo);
      this.getProductList();
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
    chaProductResetForm(formName){
        this.$refs.chaProductRef.resetFields();
        this.getProductList();
    },
    addProduct() {
      this.$refs.addProductRef.validate(async valid => {
        if (!valid) return;    
        const { data: res } = await this.$http.post("jc/Design/addDesign",this.addProductForm);
        this.getProductList();
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
    dialogClosed(){
        this.$refs.addProductRef.resetFields();
      },
    async showProduct(designId){
      let param = new URLSearchParams();
      param.append("designId", designId);
      const {data:res} = await this.$http.post('jc/Design/selectDesignByid',param);
      // res.designPicture=this.ip1+res.designPicture;
      this.editProductForm=res;
      this.edityonghuDialogVisible=true;
    },
    async editProduct(){
       const {data:res} = await this.$http.post('jc/Design/updateDesign',this.editProductForm);
       this.getProductList();
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
    selectedqi(){
      this.delarr=[];
      this.delVisibleqi = true;
      for (let i = 0; i < this.selectedList.length; i++) {
        this.delarr.push({designId:this.selectedList[i].designId,designState:this.selectedList[i].designState==1?0:1})
      }
    },
    selected(){
      this.delarr=[];
      this.delVisible = true;
      for (let i = 0; i < this.selectedList.length; i++) {
        this.delarr.push(this.selectedList[i].designId)
      }
    },
    async deleteRow(){
         const {data:res} = await this.$http.post('jc/Design/deleteDesignmore',this.delarr);
         this.delVisible = false;
         this.getProductList();
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
         const {data:res} = await this.$http.post('jc/Design/updatedesignmorestate',this.delarr);
         this.delVisibleqi = false;
         this.getProductList();
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
     handleRemove(file, fileList) {
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
    handleSelectionChange(val) {
      this.selectedList = val;
    },
    handleSizeChange(val) {
      this.chaProductForm.pageSize=val;
      this.getProductList();
    },
    handleCurrentChange(val) {
      this.chaProductForm.pageCode=val;
      this.currentPage=val;
       this.getProductList();
    },
    handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
    },
    deletebumen(designId){
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async() => {
          let param = new URLSearchParams();
        param.append("designId", designId);
        const { data: res } = await this.$http.post(
          "jc/Design/deleteDesign",
          param
        );
        this.getProductList();
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
    .el-select{
      width: 265px;
    }
    .xiang{
      width: 270px;
    }
    .hu{
      width: 133px;
    }
   .el-col{
        .el-input{
            width: 200px;
        }
        .el-form-item{
          .el-select{
            width: 200px;
          }
        }
    }
    .el-tag{
      margin: 5px 15px;
    }
    .el-form-item{
      margin-bottom: 15px;
    }
    .el-dialog__body{
      padding-top: 10px;
    }
     .avatar {
    width: 143px;
    height: 143px;
    display: block;
}
</style>