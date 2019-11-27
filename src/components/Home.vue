<template>
    <el-container class="home-container">
        <el-header>
            <div>
                <img src="../assets/log.png" alt="login">
                <span>贸普实业ERP管理系统</span>
            </div>
           <div class="tubiao"> 
               <div class="im"><img :src="a" alt=""></div>
               <div class="yong">你好，{{user.name}}</div>
               <el-badge  :value="3" class="item tuituxin"><el-button size="small" type="success" circle icon="el-icon-chat-line-round"></el-button></el-badge>
               <el-button class="tuituxin" type="warning" icon="el-icon-setting" size="small" circle @click="showEditUser(user.userId)"></el-button>
               <el-button type="info" @click="logout" size="small" class="tuituxin">退出</el-button>
            </div>
        </el-header>
        <el-container>
            <el-aside :width="isCollapse ? '64px' : '200px'">
                <div class="togglr-button" @click="toggleCollapse">|||</div>
                <el-menu background-color="#001529" text-color="#fff" active-text-color="#409eff" :unique-opened="true" :collapse="isCollapse" :collapse-transition="false"
                :router="true" :default-active="activePath">
                    <!-- 一级菜单 -->
                <el-submenu :index="item.menuId+''" v-for="item in menuList" :key="item.menuId">
                <!-- 一级菜单的模板区域 -->
                    <template slot="title">
                        <!-- 图标 -->
                    <i :class="iconsObj[item.menuId]"></i>
                    <!-- 文本 -->
                    <span>{{item.name}}</span>
                    </template>
                    <!-- 二级菜单的模板区域 -->
                    <el-menu-item :index="'/'+subItem.router" v-for="subItem in item.children" :key="subItem.menuId" @click="saveNavState('/'+subItem.router)">
                         <!-- 图标 -->
                    <i class="el-icon-menu"></i>
                    <!-- 文本 -->
                    <span>{{subItem.name}}</span>
                    </el-menu-item>
                </el-submenu>
                </el-menu>
            </el-aside>
            <el-main><router-view></router-view></el-main>
        </el-container>
        <el-dialog
        title="基本设置"
        :visible.sync="shezhidialogVisible"
        width="40%"
        :before-close="handleClose">
        <div class="ti">
            <el-form :label-position="labelPosition" label-width="100px" :model="editUserForm"
        ref="addUserRef"
        :rules="addUserRules">
                <el-form-item class="tupian">
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
                </el-form-item>
                <el-form-item class="tian" label="用户名:" prop="name"><el-input  placeholder="请输入用户名" v-model="editUserForm.name"></el-input></el-form-item>
                <el-form-item class="tian" label="手机号:" prop="mobile"><el-input  placeholder="请输入手机号" v-model="editUserForm.mobile"></el-input></el-form-item>
                <el-form-item class="tian" label="新密码:" prop="newpassword"><el-input  placeholder="请输入新密码" v-model="editUserForm.newpassword"></el-input></el-form-item>
                <el-form-item class="tian" label="确认新密码:" prop="quepassword"><el-input  placeholder="请输入确认新密码" v-model="editUserForm.quepassword"></el-input></el-form-item>
            </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="shezhidialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="editUser">确 定</el-button>
        </span>
        </el-dialog>
    </el-container>
</template>
<script>
export default {
    data () {
        return {
            imageUrl: '',
            labelPosition: 'right',
            shezhidialogVisible : false,
            editUserForm:{
                name:'',
                password:'',
                mobile:'',
                newpassword:'',
                quepassword:'',
                picUrl:'',
                imageUrl:''
            },
            ip:'',
            ip1:'',
            a:'',
            addUserRules: {
          name:[
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
          ],},
            menuList:[],
            user:{},
            iconsObj:{
                '14':'iconfont icon-user',
                '12':'iconfont icon-tijikongjian',
                '41':'iconfont icon-shangpin',
                '48':'iconfont icon-danju',
                '34':'iconfont icon-baobiao',
                '28':'iconfont icon-baobiao'
            },
            //是否折叠
            isCollapse:false,
            //被激活的链接地址
            activePath:'',
            username:'',
        };
    },
    created () {
        this.getMenuList(),
        this.activePath=window.sessionStorage.getItem('activePath')
        this.getUser();
    },
    methods:{
        //文件上传成功的钩子函数v
        handleSuccess(res, file) {
            this.$message({
                type: 'info',
                message: '图片上传成功',
                duration: 6000
            });
            if (file.response.success) {
                this.editUserForm.picUrl=file.response.message;
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
       async getUser() {
      const { data: res } = await this.$http.post("sys/user/getCurrentUser");
      this.a=this.ips+res.body.user.picUrl;
      this.user = res.body.user;
    },
     async showEditUser(id){
      let param = new URLSearchParams();
      param.append("id", id);
      const {data:res} = await this.$http.post('sys/user/getInfo',param);
      
           
      res.body.user.picUrl=this.ips+res.body.user.picUrl;
      console.log(res.picUrl);
      
      this.editUserForm=res.body.user;
      console.log(this.editUserForm);
      
      this.shezhidialogVisible=true;
    },
    async editUser(){
       this.editUserForm.password=this.editUserForm.quepassword;
       const {data:res} = await this.$http.post('sys/user/update',this.editUserForm);
       this.shezhidialogVisible=false;
       this.getUser();
    },
        handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
        logout(){
            window.sessionStorage.clear();
            this.$router.push('/login');
        },
        async getMenuList(){
         const {data:res} = await this.$http.post('getPermissMenu');
         this.ip=this.ips+'upload';
      this.ip1=this.ips;
         console.log(res);
          this.menuList=res.body.menu;
        },
        //点击按钮，切换菜单的折叠与展开
        toggleCollapse(){
            this.isCollapse=!this.isCollapse;
        },

        //保存链接的激活状态
        saveNavState(activePath){
        window.sessionStorage.setItem('activePath',activePath);
        this.activePath=activePath
        },
        handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
    },
    }
}
</script>
<style lang='less' scoped>
    .home-container{
        height: 100%;
    }
    .el-header{
        background-color: #001529;
        display:flex;
        justify-content:space-between;
        padding-left: 0;
        align-items:center;
        color: #fff;
        font-size: 20px;
        > div{
            display: flex;
            align-items:center;
            span{
                margin-left: 15px;
            }
        }
    }
    .el-aside{
        background-color: #001529;
        .el-menu{
            border-right: none;
        }
    }
    .el-main{
        background-color: #eaedf1;
    }
    .iconfont{
        margin-right: 10px;
    }
    .togglr-button{
        background-color: #4a5064;
        font-size: 10px;
        line-height: 24px;
        color: #fff;
        text-align: center;
        letter-spacing: 0.2em;
        cursor: pointer;
    }
    .el-header img{
        width: 61px;
        height: 56px;
    }
    .tubiao{
        // margin-top: 15px;
        .im{
            // width: 45px;
            height: 45px;
            img {
                width: 30px;
                height: 30px;
                border-radius: 50%;
                margin-top: 8px;
            }
        }
        .yong{
            // width: 120px;
            height: 35px;
            padding-top: 10px;
            font-size: 18px;
            padding-left: 15px;
        }
        .el-button{
            margin-left: 15px;
        }
    }
    .ti{
        width: 430px;
      .tian{
            margin-left: 20px;
        .el-input{
            width: 320px;
        }
      }
      .el-button{
          margin-left: 140px;
          margin-top: 10px;
      }
    }
   .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
 .avatar {
    width: 143px;
    height: 143px;
    display: block;
}
  
</style>