<template>
  <div class="min1500">
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>基础资料</el-breadcrumb-item>
      <el-breadcrumb-item>采购商品管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-tabs @tab-click="handleClick" type="border-card">
    <el-tab-pane label="纸张" >
      <el-form :inline="true" class="demo-form-inline" :model="chamerchandiseForm" ref="chamerchandiseRef">
              <!-- <el-form-item label="供应商名称：" prop="supplierId">
                <el-select v-model="chamerchandiseForm.supplierId" placeholder="请选择">
                  <el-option
                    v-for="item in chamerchandiseForm1"
                    :key="item.supplierId"
                    :label="item.supName"
                    :value="item.supplierId">
                  </el-option>
                </el-select>
              </el-form-item> -->
              <el-form-item label="原纸小类型：" prop="supgoolssmallType">
               <el-select v-model="chamerchandiseForm.supgoolssmallType" placeholder="请选择">
                        <el-option
                          v-for="item in zhizhangleixing"
                          :key="item.basicId"
                          :label="item.basicRetainone"
                          :value="item.basicId">
                        </el-option>
                      </el-select>
              </el-form-item>
              <el-form-item>
                <el-button @click="getMerchandiseList5">查询</el-button>
                <el-button type="primary" @click="chaMerchandiseResetForm">重置</el-button>
              </el-form-item>
            </el-form>
          <el-button type="success" @click="addyonghuDialogVisible = true">新增</el-button>
          <el-button
            type="warning"
            @click="selectedqi"
            :disabled="selectedList.length == 0"
          >批量启用/禁用</el-button>
          <el-button type="danger" @click="selected" :disabled="selectedList.length == 0">批量删除</el-button>
      <el-table :data="merchandiseList" border @selection-change="handleSelectionChange" >
            <el-table-column type="selection" width="35" align="center"></el-table-column>
            <el-table-column type="index" width="55" fixed align="center" label="序号"></el-table-column>
            <!-- <el-table-column prop="supId" label="供应商编码"  align="center"></el-table-column> -->
            <!-- <el-table-column prop="supName" label="供应商名称"  align="center"></el-table-column>
            <el-table-column prop="supgoolsBigType" label="商品大类型"  align="center"></el-table-column> -->
            <el-table-column prop="supgoolsId" label="商品编号" align="center"></el-table-column>
            <el-table-column prop="supgoolssmallType" label="原纸小类型"  align="center"></el-table-column>
            <el-table-column prop="supgoolCoated" label="淋膜类型"  align="center"></el-table-column>
            <el-table-column prop="supgoolsBrand" label="纸张品牌" align="center"></el-table-column>
            <el-table-column prop="supgoolsWeight" label="纸张克重" align="center"></el-table-column>
            <el-table-column prop="supgoolsWidths" label="纸张门幅" align="center"></el-table-column>
            <el-table-column label="状态" width="65px" align="center">
              <template slot-scope="scope">
                <el-switch
                  v-model="scope.row.supgoolsState"
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
                <el-button type="primary" icon="el-icon-edit" size="mini" @click="showMerchandise(scope.row.suppliergoolsId)">修改</el-button>
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  @click="deletebumen(scope.row.suppliergoolsId)"
                  size="mini"
                >删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        
        :page-size="10"
        layout="total, prev, pager, next"
        :total=total
      ></el-pagination>
    </el-tab-pane>
    <el-tab-pane label="纸箱" >
      <el-form :inline="true" class="demo-form-inline" :model="chamerchandiseForm" ref="chamerchandiseRef">
              <!-- <el-form-item label="供应商名称：" prop="supplierId">
                <el-select v-model="chamerchandiseForm.supplierId" placeholder="请选择">
                  <el-option
                    v-for="item in chamerchandiseForm1"
                    :key="item.supplierId"
                    :label="item.supName"
                    :value="item.supplierId">
                  </el-option>
                </el-select>
              </el-form-item> -->
              <el-form-item label="纸箱小类型：" prop="supgoolssmallType">
                <!-- <el-input placeholder="请输入商品小类型" v-model="chamerchandiseForm.supgoolssmallType"></el-input> -->
                <el-select v-model="chamerchandiseForm.supgoolssmallType" placeholder="请选择">
                        <el-option
                          v-for="item in zhizhangleixing"
                          :key="item.basicId"
                          :label="item.basicRetainone"
                          :value="item.basicId">
                        </el-option>
                      </el-select>
                
              </el-form-item>
              <el-form-item>
                <el-button @click="getMerchandiseList6">查询</el-button>
                <el-button type="primary" @click="chaMerchandiseResetForm">重置</el-button>
              </el-form-item>
            </el-form>
          <el-button type="success" @click="addyonghuDialogVisible = true">新增</el-button>
          <el-button
            type="warning"
            @click="selectedqi"
            :disabled="selectedList.length == 0"
          >批量启用/禁用</el-button>
          <el-button type="danger" @click="selected" :disabled="selectedList.length == 0">批量删除</el-button>
      <el-table :data="merchandiseList" border @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="35" align="center"></el-table-column>
            <el-table-column type="index" width="55" fixed align="center" label="序号"></el-table-column>
            <!-- <el-table-column prop="supId" label="供应商编码" align="center"></el-table-column> -->
            <!-- <el-table-column prop="supName" label="供应商名称" align="center"></el-table-column>
            <el-table-column prop="supgoolsBigType" label="商品大类型" align="center"></el-table-column> -->
            <el-table-column prop="supgoolsId" label="商品编号" align="center"></el-table-column> 
            <el-table-column prop="supgoolssmallType" label="纸箱小类型" align="center"></el-table-column>
            <el-table-column prop="supgoolsWeight" label="纸箱克重" align="center"></el-table-column>
            <el-table-column label="状态" width="65px" align="center">
              <template slot-scope="scope">
                <el-switch
                  v-model="scope.row.supgoolsState"
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
                <el-button type="primary" icon="el-icon-edit" size="mini" @click="showMerchandise(scope.row.suppliergoolsId)">修改</el-button>
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  @click="deletebumen(scope.row.suppliergoolsId)"
                  size="mini"
                >删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
     
        :page-size="10"
        layout="total,  prev, pager, next"
        :total=total
      ></el-pagination>
    </el-tab-pane>
    <el-tab-pane label="袋子" >
      <el-form :inline="true" class="demo-form-inline" :model="chamerchandiseForm" ref="chamerchandiseRef">
              <!-- <el-form-item label="供应商名称：" prop="supplierId">
                <el-select v-model="chamerchandiseForm.supplierId" placeholder="请选择">
                  <el-option
                    v-for="item in chamerchandiseForm1"
                    :key="item.supplierId"
                    :label="item.supName"
                    :value="item.supplierId">
                  </el-option>
                </el-select>
              </el-form-item> -->
              <el-form-item label="袋子小类型：" prop="supgoolssmallType">
                <el-select v-model="chamerchandiseForm.supgoolssmallType" placeholder="请选择">
                        <el-option
                          v-for="item in zhizhangleixing"
                          :key="item.basicId"
                          :label="item.basicRetainone"
                          :value="item.basicId">
                        </el-option>
                      </el-select>
              </el-form-item>
              <el-form-item>
                <el-button @click="getMerchandiseList7">查询</el-button>
                <el-button type="primary" @click="chaMerchandiseResetForm">重置</el-button>
              </el-form-item>
            </el-form>
          <el-button type="success" @click="addyonghuDialogVisible = true">新增</el-button>
          <el-button
            type="warning"
            @click="selectedqi"
            :disabled="selectedList.length == 0"
          >批量启用/禁用</el-button>
          <el-button type="danger" @click="selected" :disabled="selectedList.length == 0">批量删除</el-button>
      <el-table :data="merchandiseList" border @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="35" align="center"></el-table-column>
            <el-table-column type="index" width="55" fixed align="center" label="序号"></el-table-column>
            <!-- <el-table-column prop="supId" label="供应商编码" width="100px" align="center"></el-table-column> -->
            <!-- <el-table-column prop="supName" label="供应商名称" width="100px" align="center"></el-table-column>
            <el-table-column prop="supgoolsBigType" label="商品大类型" width="100px" align="center"></el-table-column> -->
            <el-table-column prop="supgoolsId" label="商品编号" align="center"></el-table-column> 
            <el-table-column prop="supgoolssmallType" label="袋子小类型" align="center"></el-table-column>

            <el-table-column prop="supgoolsLength" label="尺寸/长" align="center"></el-table-column>
            <el-table-column prop="supgoolsWidth" label="尺寸/宽" align="center"></el-table-column>
            <el-table-column prop="supgoolsHeight" label="尺寸/厚" align="center"></el-table-column>
            <el-table-column label="状态" width="65px" align="center">
              <template slot-scope="scope">
                <el-switch
                  v-model="scope.row.supgoolsState"
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
                <el-button type="primary" icon="el-icon-edit" size="mini" @click="showMerchandise(scope.row.suppliergoolsId)">修改</el-button>
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  @click="deletebumen(scope.row.suppliergoolsId)"
                  size="mini"
                >删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        
        :page-size="10"
        layout="total,  prev, pager, next"
        :total=total
      ></el-pagination>
    </el-tab-pane>
    <el-tab-pane label="油墨" >
      <el-form :inline="true" class="demo-form-inline" :model="chamerchandiseForm" ref="chamerchandiseRef">
              <!-- <el-form-item label="供应商名称：" prop="supplierId">
                <el-select v-model="chamerchandiseForm.supplierId" placeholder="请选择">
                  <el-option
                    v-for="item in chamerchandiseForm1"
                    :key="item.supplierId"
                    :label="item.supName"
                    :value="item.supplierId">
                  </el-option>
                </el-select>
              </!--> 
              <el-form-item label="油墨小类型：" prop="supgoolssmallType">
               <el-select v-model="chamerchandiseForm.supgoolssmallType" placeholder="请选择">
                        <el-option
                          v-for="item in zhizhangleixing"
                          :key="item.basicId"
                          :label="item.basicRetainone"
                          :value="item.basicId">
                        </el-option>
                      </el-select>
              </el-form-item>
              <el-form-item>
                <el-button @click="getMerchandiseList8">查询</el-button>
                <el-button type="primary" @click="chaMerchandiseResetForm">重置</el-button>
              </el-form-item>
            </el-form>
          <el-button type="success" @click="addyonghuDialogVisible = true">新增</el-button>
          <el-button
            type="warning"
            @click="selectedqi"
            :disabled="selectedList.length == 0"
          >批量启用/禁用</el-button>
          <el-button type="danger" @click="selected" :disabled="selectedList.length == 0">批量删除</el-button>
      <el-table :data="merchandiseList" border @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="35" align="center"></el-table-column>
            <el-table-column type="index" width="55" fixed align="center" label="序号"></el-table-column>
            <!-- <el-table-column prop="supId" label="供应商编码" align="center"></el-table-column> -->
            <!-- <el-table-column prop="supName" label="供应商名称" align="center"></el-table-column>
            <el-table-column prop="supgoolsBigType" label="商品大类型" align="center"></el-table-column> -->
            <el-table-column prop="supgoolsId" label="商品编号" align="center"></el-table-column>
            <el-table-column prop="supgoolssmallType" label="油墨小类型" align="center"></el-table-column>

            <el-table-column prop="supgoolCoated" label="淋膜类型" align="center"></el-table-column>
            <el-table-column label="状态" width="65px" align="center">
              <template slot-scope="scope">
                <el-switch
                  v-model="scope.row.supgoolsState"
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
                <el-button type="primary" icon="el-icon-edit" size="mini" @click="showMerchandise(scope.row.suppliergoolsId)">修改</el-button>
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  @click="deletebumen(scope.row.suppliergoolsId)"
                  size="mini"
                >删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
       
        :page-size="10"
        layout="total,  prev, pager, next"
        :total=total
      ></el-pagination>
    </el-tab-pane>
    
    <el-tab-pane label="其他" >
      <el-form :inline="true" class="demo-form-inline" :model="chamerchandiseForm" ref="chamerchandiseRef">
              <!-- <el-form-item label="供应商名称：" prop="supplierId">
                <el-select v-model="chamerchandiseForm.supplierId" placeholder="请选择">
                  <el-option
                    v-for="item in chamerchandiseForm1"
                    :key="item.supplierId"
                    :label="item.supName"
                    :value="item.supplierId">
                  </el-option>
                </el-select>
              </el-form-item> -->
              <el-form-item label="其他小类型：" prop="supgoolssmallType">
               <el-select v-model="chamerchandiseForm.supgoolssmallType" placeholder="请选择">
                        <el-option
                          v-for="item in zhizhangleixing"
                          :key="item.basicId"
                          :label="item.basicRetainone"
                          :value="item.basicId">
                        </el-option>
                      </el-select>
              </el-form-item>
              <el-form-item>
                <el-button @click="getMerchandiseList9">查询</el-button>
                <el-button type="primary" @click="chaMerchandiseResetForm">重置</el-button>
              </el-form-item>
            </el-form>
          <el-button type="success" @click="addyonghuDialogVisible = true">新增</el-button>
          <el-button
            type="warning"
            @click="selectedqi"
            :disabled="selectedList.length == 0"
          >批量启用/禁用</el-button>
          <el-button type="danger" @click="selected" :disabled="selectedList.length == 0">批量删除</el-button>
      <el-table :data="merchandiseList" border @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="35" align="center"></el-table-column>
            <el-table-column type="index" width="55" fixed align="center" label="序号"></el-table-column>
            <!-- <el-table-column prop="supId" label="供应商编码"  align="center"></el-table-column> -->
            <!-- <el-table-column prop="supName" label="供应商名称" align="center"></el-table-column>
            <el-table-column prop="supgoolsBigType" label="商品大类型" align="center"></el-table-column> -->
            <el-table-column prop="supgoolsId" label="商品编号" align="center"></el-table-column>
            <el-table-column prop="supgoolssmallType" label="油墨小类型" align="center"></el-table-column>
            <!-- <el-table-column prop="supgoolsBradth" label="宽度" align="center"></el-table-column>
            <el-table-column prop="supgoolsColor" label="颜色" align="center"></el-table-column> -->
            <el-table-column label="状态" width="65px" align="center">
              <template slot-scope="scope">
                <el-switch
                  v-model="scope.row.supgoolsState"
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
                <el-button type="primary" icon="el-icon-edit" size="mini" @click="showMerchandise(scope.row.suppliergoolsId)">修改</el-button>
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  @click="deletebumen(scope.row.suppliergoolsId)"
                  size="mini"
                >删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
       
        :page-size="10"
        layout="total,  prev, pager, next"
        :total=total
      ></el-pagination>
    </el-tab-pane>
  </el-tabs>
    </el-card>
    <el-dialog
      title="采购供应商商品"
      :visible.sync="addyonghuDialogVisible"
      width="35%"
      :before-close="handleClose"
      @closed="dialogClosed"
    >
      <el-form :label-position="labelPosition" label-width="120px" :model="addMerchandiseFrom"
        ref="addMerchandiseRef"
        :rules="addMerchandiseRules">
 
            <!-- <el-form-item label="供应商编号：" prop="supId">
              <el-select v-model="chamerchandiseForm.supId" placeholder="请选择">
                  <el-option
                    v-for="item in chamerchandiseForm1"
                    :key="item.supplierId"
                    :label="item.supId" 
                    :value="item.supId">
                  </el-option>
                </el-select>
            </el-form-item> -->
            <!-- <el-form-item label="供应商名称：" prop="supplierId">
              <el-select v-model="addMerchandiseFrom.supplierId" placeholder="请选择" class="gongse">
                  <el-option
                    v-for="item in chamerchandiseForm1"
                    :key="item.supplierId"
                    :label="item.supName"
                    :value="item.supplierId">
                  </el-option>
                </el-select>
            </el-form-item> -->
            
        
            <el-form-item label="商品名称：" prop="supgoolsId">
              <el-input placeholder="请输入商品名称" v-model="addMerchandiseFrom.supgoolsId" class="xiang" ></el-input>
            </el-form-item>
      
        <!-- <el-form-item label="商品大类型：" prop="supgoolsBigType">
          <el-select class="tiantou gongse" placeholder="请选择商品大类型" @change="showshoop"  v-model="addMerchandiseFrom.supgoolsBigType" >
            <el-option value="纸张" id="show">纸张</el-option>
            <el-option value="纸箱" id="show">纸箱</el-option>
            <el-option value="袋子" id="show">袋子</el-option>
            <el-option value="油墨" id="show">油墨</el-option>
            <el-option value="胶带" id="show">胶带</el-option>
          </el-select>
        </el-form-item> -->
        <div v-show="bigType == '纸张'">
          <el-form-item label="原纸小类型：" prop="supgoolssmallType">
            <!-- <el-input placeholder="请输入商品小类型" class="xiang" v-model="addMerchandiseFrom.supgoolssmallType"></el-input> -->
            <el-select v-model="addMerchandiseFrom.supgoolssmallType" placeholder="请选择" class="gongse1">
                        <el-option
                          v-for="item in zhizhangleixing"
                          :key="item.basicId"
                          :label="item.basicRetainone"
                          :value="item.basicId">
                        </el-option>
                      </el-select>
          </el-form-item>
          <el-form-item label="纸张品牌：" prop="supgoolsBrand">
            <!-- <el-input placeholder="请输入品牌" class="xiang" v-model="addMerchandiseFrom.supgoolsBrand"></el-input> -->
            <el-select v-model="addMerchandiseFrom.supgoolsBrand" placeholder="请选择" class="gongse1">
                  <el-option
                    v-for="item in zhizhangpinpai"
                    :key="item.basicId"
                    :label="item.basicRetainone"
                    :value="item.basicId">
                  </el-option>
                </el-select>
          </el-form-item>
          <el-form-item label="纸张克重：" prop="supgoolsWeight">
            <!-- <el-input placeholder="请输入克重" class="xiang" v-model="addMerchandiseFrom.supgoolsWeight"></el-input> -->
            <el-select v-model="addMerchandiseFrom.supgoolsWeight" placeholder="请选择" class="gongse1">
                  <el-option
                    v-for="item in kezhong"
                    :key="item.basicId"
                    :label="item.basicRetainone"
                    :value="item.basicId">
                  </el-option>
                </el-select>
          </el-form-item>
          <el-form-item label="纸张门幅：" prop="supgoolsWidths">
            
            <!-- <el-input placeholder="请输入门幅" class="xiang" v-model="addMerchandiseFrom.supgoolsWidths"></el-input> -->
             <el-select v-model="addMerchandiseFrom.supgoolsWidths" placeholder="请选择" class="gongse1">
                  <el-option
                    v-for="item in zhizhangmenfu"
                    :key="item.basicId"
                    :label="item.basicRetainone"
                    :value="item.basicId">
                  </el-option>
                </el-select>
          </el-form-item>
          <el-form-item label="淋膜类型：" prop="supgoolCoated">
            <!-- <el-input placeholder="请输入淋膜类型" class="xiang" v-model="addMerchandiseFrom."></el-input> -->
            <el-select v-model="addMerchandiseFrom.supgoolCoated" placeholder="请选择" class="gongse1">
                  <el-option
                    v-for="item in linmo"
                    :key="item.basicId"
                    :label="item.basicRetainone"
                    :value="item.basicId">
                  </el-option>
                </el-select>
          </el-form-item>
        </div>
        <div v-show="bigType == '纸箱'">
          <el-form-item label="纸箱小类型：" prop="supgoolssmallType">
            <el-select v-model="addMerchandiseFrom.supgoolssmallType" placeholder="请选择" class="gongse1">
                        <el-option
                          v-for="item in zhizhangleixing"
                          :key="item.basicId"
                          :label="item.basicRetainone"
                          :value="item.basicId">
                        </el-option>
                      </el-select>
          </el-form-item>
          <el-form-item label="纸箱克重：" prop="supgoolsWeight">
            <!-- <el-input placeholder="请输入克重" class="xiang" v-model="addMerchandiseFrom.supgoolsWeight"></el-input> -->
            <el-select v-model="addMerchandiseFrom.supgoolsWeight" placeholder="请选择" class="gongse1">
                  <el-option
                    v-for="item in zhixiangkezhong"
                    :key="item.basicId"
                    :label="item.basicRetainone"
                    :value="item.basicId">
                  </el-option>
                </el-select>
          </el-form-item>
        </div>
        <div v-show="bigType == '袋子'">
          <!-- <el-form-item label="商品小类型：" prop="">
            <el-input placeholder="请输入商品小类型" class="xiang"></el-input>
          </el-form-item> -->
          <el-form-item label="袋子小类型：" prop="supgoolssmallType">
            <el-select v-model="addMerchandiseFrom.supgoolssmallType" placeholder="请选择" class="gongse1">
                        <el-option
                          v-for="item in zhizhangleixing"
                          :key="item.basicId"
                          :label="item.basicRetainone"
                          :value="item.basicId">
                        </el-option>
                      </el-select>
          </el-form-item>
          <el-form-item label="尺寸/长：" prop="supgoolsLength">
            <el-input placeholder="请输入尺寸/长" class="xiang" v-model="addMerchandiseFrom.supgoolsLength"></el-input>
          </el-form-item>
          <el-form-item label="尺寸/宽：" prop="supgoolsWidth">
            <el-input placeholder="请输入尺寸/宽" class="xiang" v-model="addMerchandiseFrom.supgoolsWidth"></el-input>
          </el-form-item>
          <el-form-item label="尺寸/厚：" prop="supgoolsHeight">
            <el-input placeholder="请输入尺寸/高" class="xiang" v-model="addMerchandiseFrom.supgoolsHeight"></el-input>
          </el-form-item>
        </div>
        <div v-show="bigType == '油墨'">
          <el-form-item label="油墨小类型：" prop="supgoolssmallType">
            <el-select v-model="addMerchandiseFrom.supgoolssmallType" placeholder="请选择" class="gongse1">
                        <el-option
                          v-for="item in zhizhangleixing"
                          :key="item.basicId"
                          :label="item.basicRetainone"
                          :value="item.basicId">
                        </el-option>
                      </el-select>
          </el-form-item>
          <el-form-item label="淋膜类型：" prop="supgoolCoated">
            <!-- <el-input placeholder="请输入淋膜类型" class="xiang" v-model="addMerchandiseFrom.supgoolCoated"></!--> 
            <el-select v-model="addMerchandiseFrom.supgoolCoated" placeholder="请选择" class="gongse1">
                  <el-option
                    v-for="item in linmo"
                    :key="item.basicId"
                    :label="item.basicRetainone"
                    :value="item.basicId">
                  </el-option>
                </el-select>
          </el-form-item>
        </div>
        <div v-show="bigType == '其他'">
           <el-form-item label="其他小类型：" prop="supgoolssmallType">
            <el-select v-model="addMerchandiseFrom.supgoolssmallType" placeholder="请选择" class="gongse1">
                        <el-option
                          v-for="item in zhizhangleixing"
                          :key="item.basicId"
                          :label="item.basicRetainone"
                          :value="item.basicId">
                        </el-option>
                      </el-select>
          </el-form-item>
        </div>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addyonghuDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addMerchandise">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="编辑采购商品"
      :visible.sync="edityonghuDialogVisible"
      width="35%"
      :before-close="handleClose"
    >
      <el-form :label-position="labelPosition" label-width="120px" :model="editMerchandiseFrom"
        ref="addMerchandiseRef"
        :rules="addMerchandiseRules">
        <!-- <el-row>
          <el-col :span="12"> -->
            <!-- <el-form-item label="供应商编号：" prop="supId">
              <el-input placeholder="请输入供应商编号" v-model="editMerchandiseFrom.supId"></el-input>
            </el-form-item> -->
            <!-- <el-form-item label="供应商名称：" prop="supplierId">

              <el-select v-model="editMerchandiseFrom.supplierId" placeholder="请选择" class="gongse">
                  <el-option
                    v-for="item in chamerchandiseForm1"
                    :key="item.supplierId"
                    :label="item.supName"
                    :value="item.supplierId">
                  </el-option>
                </el-select>
            </el-form-item> -->
            
          <!-- </el-col>
          <el-col :span="12"> -->
            <el-form-item label="商品编号：" prop="supgoolsId">
              <el-input placeholder="请输入商品编号" v-model="editMerchandiseFrom.supgoolsId" class="xiang"></el-input>
            </el-form-item>
<!--             
          </el-col>
        </el-row> -->
        <!-- <el-form-item label="商品大类型：" prop="supgoolsBigType">
          <el-select class="tiantou gongse" placeholder="请选择商品大类型" @change="showshoop"  v-model="editMerchandiseFrom.supgoolsBigType">
            <el-option value="纸张" id="show">纸张</el-option>
            <el-option value="纸箱" id="show">纸箱</el-option>
            <el-option value="袋子" id="show">袋子</el-option>
            <el-option value="油墨" id="show">油墨</el-option>
            <el-option value="胶带" id="show">胶带</el-option>
          </el-select>
        </el-form-item> -->
        <div v-show="bigType == '纸张'">
          <el-form-item label="商品小类型：" prop="supgoolssmallType">
             <el-select v-model="editMerchandiseFrom.supgoolssmallType" placeholder="请选择" class="gongse1">
                        <el-option
                          v-for="item in zhizhangleixing"
                          :key="item.basicId"
                          :label="item.basicRetainone"
                          :value="item.basicId">
                        </el-option>
                      </el-select>
          </el-form-item>
          <el-form-item label="纸张品牌：" prop="supgoolsBrand">
            <!-- <el-input placeholder="请输入品牌" class="xiang" v-model="editMerchandiseFrom.supgoolsBrand"></el-input> -->
            <el-select v-model="editMerchandiseFrom.supgoolsBrand" placeholder="请选择" class="gongse1">
                  <el-option
                    v-for="item in zhizhangpinpai"
                    :key="item.basicId"
                    :label="item.basicRetainone"
                    :value="item.basicId">
                  </el-option>
                </el-select>
          </el-form-item>
          <el-form-item label="纸张克重：" prop="supgoolsWeight">
            <!-- <el-input placeholder="请输入克重" class="xiang" v-model="editMerchandiseFrom.supgoolsWeight"></el-input> -->
            <el-select v-model="editMerchandiseFrom.supgoolsWeight" placeholder="请选择" class="gongse1">
                  <el-option
                    v-for="item in kezhong"
                    :key="item.basicId"
                    :label="item.basicRetainone"
                    :value="item.basicId">
                  </el-option>
                </el-select>
          </el-form-item>
          <el-form-item label="纸张门幅：" prop="supgoolsWidths">
            <!-- <el-input placeholder="请输入门幅" class="xiang" v-model="editMerchandiseFrom.supgoolsWidths"></el-input> -->
            <el-select v-model="editMerchandiseFrom.supgoolsWidths" placeholder="请选择" class="gongse1">
                  <el-option
                    v-for="item in zhizhangmenfu"
                    :key="item.basicId"
                    :label="item.basicRetainone"
                    :value="item.basicId">
                  </el-option>
                </el-select>
          </el-form-item>
          <el-form-item label="淋膜类型：" prop="supgoolCoated">
            <!-- <el-input placeholder="请输入淋膜类型" class="xiang" v-model="editMerchandiseFrom.supgoolCoated"></!--> 
            <el-select v-model="editMerchandiseFrom.supgoolCoated" placeholder="请选择" class="gongse1">
                  <el-option
                    v-for="item in linmo"
                    :key="item.basicId"
                    :label="item.basicRetainone"
                    :value="item.basicId">
                  </el-option>
                </el-select>
          </el-form-item>
        </div>
        <div v-show="bigType == '纸箱'">
          <el-form-item label="商品小类型：" prop="supgoolssmallType">
             <el-select v-model="editMerchandiseFrom.supgoolssmallType" placeholder="请选择" class="gongse1">
                        <el-option
                          v-for="item in zhizhangleixing"
                          :key="item.basicId"
                          :label="item.basicRetainone"
                          :value="item.basicId">
                        </el-option>
                      </el-select>
          </el-form-item>
          <el-form-item label="纸箱克重：" prop="supgoolsWeight">
            <!-- <el-input placeholder="请输入克重" class="xiang" v-model="editMerchandiseFrom.supgoolsWeight"></el-input> -->
            <el-select v-model="editMerchandiseFrom.supgoolsWeight" placeholder="请选择" class="gongse1">
                  <el-option
                    v-for="item in zhixiangkezhong"
                    :key="item.basicId"
                    :label="item.basicRetainone"
                    :value="item.basicId">
                  </el-option>
                </el-select>
          </el-form-item>
        </div>
        <div v-show="bigType == '袋子'">
          <el-form-item label="商品小类型：" prop="supgoolssmallType">
             <el-select v-model="editMerchandiseFrom.supgoolssmallType" placeholder="请选择" class="gongse1">
                        <el-option
                          v-for="item in zhizhangleixing"
                          :key="item.basicId"
                          :label="item.basicRetainone"
                          :value="item.basicId">
                        </el-option>
                      </el-select>
          </el-form-item>
          <el-form-item label="尺寸/长：" prop="supgoolsLength">
            <el-input placeholder="请输入尺寸/长" class="xiang" v-model="editMerchandiseFrom.supgoolsLength"></el-input>
          </el-form-item>
          <el-form-item label="尺寸/宽：" prop="supgoolsWidth">
            <el-input placeholder="请输入尺寸/宽" class="xiang" v-model="editMerchandiseFrom.supgoolsWidth"></el-input>
          </el-form-item>
          <el-form-item label="尺寸/高：" prop="supgoolsHeight">
            <el-input placeholder="请输入尺寸/高" class="xiang" v-model="editMerchandiseFrom.supgoolsHeight"></el-input>
          </el-form-item>
        </div>
        <div v-show="bigType == '油墨'">
          <el-form-item label="淋膜类型：" prop="supgoolCoated">
            <!-- <el-input placeholder="请输入淋膜类型" class="xiang" v-model="editMerchandiseFrom.supgoolCoated"></el-input> -->
            <el-select v-model="editMerchandiseFrom.supgoolCoated" placeholder="请选择" class="gongse1">
                  <el-option
                    v-for="item in linmo"
                    :key="item.basicId"
                    :label="item.basicRetainone"
                    :value="item.basicId">
                  </el-option>
                </el-select>
          </el-form-item>
        </div>
        <div v-show="bigType == '其他'">
          <el-form-item label="商品小类型：" prop="supgoolssmallType">
            <el-select v-model="addMerchandiseFrom.supgoolssmallType" placeholder="请选择" class="gongse1">
                        <el-option
                          v-for="item in zhizhangleixing"
                          :key="item.basicId"
                          :label="item.basicRetainone"
                          :value="item.basicId">
                        </el-option>
                      </el-select>
          </el-form-item>
        </div>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="edityonghuDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editMerchandise">确 定</el-button>
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
  data() {
    return {
      value: "",
      labelPosition: "right",
      addyonghuDialogVisible: false,
      edityonghuDialogVisible: false,
      resetPassdialogVisible: false,
      delVisible:false,
      delVisibleqi:false,
      currentPage: 0,
      bigType: "",
      selectedList: [],
      chamerchandiseForm1:[],
      chamerchandiseForm:{
        supName:'',
        supgoolssmallType:'',
        lab:'纸张',
        pageCode: 1, //当前页
        pageSize: 10,//每页显示的记录数
      },
      total:0,
      delarr:[],
      merchandiseList:[],
      addMerchandiseFrom:{
        supgoolsId:'',
        supName:'',
        supgoolsBigType:'',
        supgoolssmallType:'',
        supgoolCoated:'',
        supgoolsBrand:'',
        supgoolsWeight:'',
        supgoolsWidths:'',
        supgoolsBradth:'',
        supgoolsLength:'',
        supgoolsWidth:'',
        supgoolsHeight:'',
        supgoolsColor:'',
        supId:'',
      },

      editMerchandiseFrom:{
        supgoolsId:'',
        supName:'',
        supgoolsBigType:'',
        supgoolssmallType:'',
        supgoolCoated:'',
        supgoolsBrand:'',
        supgoolsWeight:'',
        supgoolsWidths:'',
        supgoolsBradth:'',
        supgoolsLength:'',
        supgoolsWidth:'',
        supgoolsHeight:'',
        supgoolsColor:'',
        supId:'',
      },
       chaSupplierForm: {
        a:''
      },
      zhizhangpinpai:[],
      linmo:[],
      kezhong:[],
      zhixiangkezhong:[],
      zhizhangleixing:[],
      zhizhangmenfu:[],
      addMerchandiseRules: {
          supgoolsId:[
          { required: true, message: '请输入内容', trigger: 'blur' },
          { min: 0, max: 10, message: '长度在 0 到 10 个字符', trigger: 'blur' }
          ],},
    };
  },
  created() {
    this.getMerchandiseList();
    this.getMerchandiseList1();
    this.leixing();
  },
  methods: {
    async leixing(){
      const { data: res } = await this.$http.post("jc/Basic/selectparper");
      const { data: res1 } = await this.$http.post("jc/Basic/selectcoated");
      const { data: res2 } = await this.$http.post("jc/Basic/selectparperheight");
      const { data: res3 } = await this.$http.post("jc/Basic/selectparweight");
      const { data: res4 } = await this.$http.post("jc/Basic/selectparperdoor");
      const { data: res5 } = await this.$http.post("jc/Basic/selectxiaoleixing");
      this.zhizhangleixing=res5;
      this.zhizhangpinpai=res;
      this.linmo=res1;
      this.kezhong=res2;
      this.zhixiangkezhong=res3;
      this.zhizhangmenfu=res4;
    },
   async handleClick(tab) {
     console.log(tab);
     
        this.chamerchandiseForm.pageCode=1;
        this.chamerchandiseForm.pageSize=10;
        this.currentPage=0;
        this.chamerchandiseForm.lab=tab.label;
        const { data: res } = await this.$http.post("jc/suppliergoods/selectSuppliergoolslist",{params:this.chamerchandiseForm});
        this.merchandiseList = res.body.rows;
        this.total=res.body.total;
        this.bigType=tab.label;
      },
   async getMerchandiseList(){
      this.chamerchandiseForm.lab=this.chamerchandiseForm.lab;
      this.bigType=this.chamerchandiseForm.lab;
      const { data: res } = await this.$http.post("jc/suppliergoods/selectSuppliergoolslist",{params:this.chamerchandiseForm});
      this.merchandiseList = res.body.rows;
      this.total=res.body.total;
    },
    async getMerchandiseList5(){
      this.chamerchandiseForm.lab="纸张";
      const { data: res } = await this.$http.post("jc/suppliergoods/selectSuppliergoolslist",{params:this.chamerchandiseForm});
      this.merchandiseList = res.body.rows;
      this.total=res.body.total;
    },
    async getMerchandiseList6(){
      this.chamerchandiseForm.lab="纸箱";
      const { data: res } = await this.$http.post("jc/suppliergoods/selectSuppliergoolslist",{params:this.chamerchandiseForm});
      this.merchandiseList = res.body.rows;
      this.total=res.body.total;
    },
    async getMerchandiseList7(){
      this.chamerchandiseForm.lab="袋子";
      const { data: res } = await this.$http.post("jc/suppliergoods/selectSuppliergoolslist",{params:this.chamerchandiseForm});
      this.merchandiseList = res.body.rows;
      this.total=res.body.total;
    },
    async getMerchandiseList8(){
      this.chamerchandiseForm.lab="油墨";
      const { data: res } = await this.$http.post("jc/suppliergoods/selectSuppliergoolslist",{params:this.chamerchandiseForm});
      this.merchandiseList = res.body.rows;
      this.total=res.body.total;
    },
    async getMerchandiseList9(){
      this.chamerchandiseForm.lab="胶带";
      const { data: res } = await this.$http.post("jc/suppliergoods/selectSuppliergoolslist",{params:this.chamerchandiseForm});
      this.merchandiseList = res.body.rows;
      this.total=res.body.total;
    },
    async getMerchandiseList1(){
      const { data: res } = await this.$http.post("jc/supplier/selectSupplier",{params:this.chaSupplierForm});
      this.chamerchandiseForm1 = res.body.rows;
    },
    async userStateChanged(userInfo) {
      const { data: res } = await this.$http.post("jc/suppliergoods/updatestate",userInfo);
      this.getMerchandiseList();           
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
    addMerchandise(){
      this.$refs.addMerchandiseRef.validate(async valid => {
        if (!valid) return;   
        this.addMerchandiseFrom.supgoolsBigType=this.chamerchandiseForm.lab;
        const { data: res } = await this.$http.post("jc/suppliergoods/addSupgools",this.addMerchandiseFrom);
        this.getMerchandiseList();
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
    async showMerchandise(suppliergoolsId){
      let param = new URLSearchParams();
      param.append("suppliergoolsId", suppliergoolsId);
      const {data:res} = await this.$http.post('jc/suppliergoods/selectSugoolsByid',param);
      console.log(res);
      
      this.editMerchandiseFrom.supgoolCoated=Number(res.supgoolCoated);
      this.editMerchandiseFrom.supgoolssmallType=Number(res.supgoolssmallType);
      this.editMerchandiseFrom.supgoolsBrand=Number(res.supgoolsBrand);
      this.editMerchandiseFrom.supgoolsWeight=Number(res.supgoolsWeight);
      this.editMerchandiseFrom.supgoolsWidths=Number(res.supgoolsWidths);
      this.editMerchandiseFrom.supgoolsId=res.supgoolsId;
      this.editMerchandiseFrom.supgoolsBigType=res.supgoolsBigType;
      this.editMerchandiseFrom.supgoolsBradth=res.supgoolsBradth;
      this.editMerchandiseFrom.supgoolsLength=res.supgoolsLength;
      this.editMerchandiseFrom.supgoolsWidth=res.supgoolsWidth;
      this.editMerchandiseFrom.supgoolsHeight=res.supgoolsHeight;
      this.editMerchandiseFrom.supgoolsColor=res.supgoolsColor;
      this.editMerchandiseFrom.supgoolsState=res.supgoolsState;
      this.editMerchandiseFrom.suppliergoolsId=res.suppliergoolsId;
      
      this.edityonghuDialogVisible=true;
      this.bigType=res.supgoolsBigType;
    },
    async editMerchandise(){
       const {data:res} = await this.$http.post('jc/suppliergoods/updateSupgools',this.editMerchandiseFrom);
       this.getMerchandiseList();
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
    dialogClosed(){
        this.$refs.addMerchandiseRef.resetFields();
      },
      chaMerchandiseResetForm(formName){
        this.$refs.chamerchandiseRef.resetFields();
        this.getMerchandiseList();
    },
    selectedqi(){
      this.delarr=[];
      this.delVisibleqi = true;
      for (let i = 0; i < this.selectedList.length; i++) {
        this.delarr.push({suppliergoolsId:this.selectedList[i].suppliergoolsId,supgoolsState:this.selectedList[i].supgoolsState==1?0:1})
      }
      console.log(this.delarr);
    },
    selected(){
      this.delarr=[];
      this.delVisible = true;
      for (let i = 0; i < this.selectedList.length; i++) {
        this.delarr.push(this.selectedList[i].suppliergoolsId)
      }
      console.log(this.delarr);
    },
    async deleteRow(){
         const {data:res} = await this.$http.post('jc/suppliergoods/deletemoresupgools',this.delarr);
         this.delVisible = false;
         this.getMerchandiseList();
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
         const {data:res} = await this.$http.post('jc/suppliergoods/updatesupgoolsstate',this.delarr);
         this.delVisibleqi = false;
         this.getMerchandiseList();
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
    handleSelectionChange(val) {
      console.log(val);
      this.selectedList = val;
    },
    showshoop(value) {
      this.bigType = value;
    },
    handleSizeChange(val) {
      this.chamerchandiseForm.pageSize=val;
      this.getMerchandiseList();
    },
    handleCurrentChange(val) {
      this.chamerchandiseForm.pageCode=val;
      this.currentPage=val;
      this.getMerchandiseList();
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    deletebumen(suppliergoolsId) {
      this.$confirm("此操作将永久删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
        let param = new URLSearchParams();
        param.append("suppliergoolsId", suppliergoolsId);
        const { data: res } = await this.$http.post(
          "jc/suppliergoods/deleteSupgools",
          param
        );
        this.getMerchandiseList();
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
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    handleNodeClick(data) {
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
.demo-form-inline .el-input {
  width: 170px;
}
.el-select {
  width: 230px;
}
.xiang {
  width: 400px;
}
.hu {
  width: 133px;
}
.quan {
  height: 570px;
  float: left;
  margin-right: 20px;
}

.togglr-button {
  width: 120px;
  height: 30px;
  background: #eee;
  text-align: center;
  line-height: 30px;
}
.el-pagination {
  margin-top: 30px;
}
.shu {
  .el-button {
    display: block;
    margin: 0px;
    padding: 10px;
    font-size: 16px;
    color: #999;
  }
  .el-button:hover {
    color: #666;
  }
}
.shoop {
  display: none;
}
.gongse,.gongin{
  width: 300px;
}
.gongse1{
  width: 400px;
}
</style>
