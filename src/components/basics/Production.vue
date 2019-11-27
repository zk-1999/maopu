<template>
    <div class="min1500">
       <!-- 面包屑导航区域 -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>基础资料</el-breadcrumb-item>
        <el-breadcrumb-item>生产商品管理</el-breadcrumb-item>
      </el-breadcrumb>
       <el-card>
<el-tabs type="border-card" @tab-click="handleClick">
  <el-tab-pane label="单层">
    <el-form :inline="true" class="demo-form-inline" ref="chamerchandiseRef" :model="chaProductionForm">
            
              <el-form-item label="产品名称：" prop="productType">
                    <el-select v-model="chaProductionForm.productType" placeholder="请选择">
                  <el-option
                    v-for="item in chanpinmingchengyuchicun"
                    :key="item.basicId"
                    :label="item.basicRetainone"
                    :value="item.basicId">
                  </el-option>
                </el-select>
                    </el-form-item>
              <el-form-item>
                <el-button @click="handleClick">查询</el-button>
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
  <el-table
    :data="ProductionList"
    style="width: 100%" border  default-expand-all @selection-change="handleSelectionChange" class="tb">
    <!-- default-expand-all -->
    <el-table-column type="selection" width="35" align="center"></el-table-column>
    <el-table-column type="index" width="55" fixed align="center" label="序号"></el-table-column>
    <el-table-column type="expand"  label="展开"  width="55">
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="">
            {{ props.row.productSplicing }}
            <!-- 标唛<span>{{ props.row.productLabel }}</span>,
            <span>{{ props.row.productInnerbao }}</span>/条,
            <span>{{ props.row.productOutbao }}</span>/包,
            <span>{{ props.row.productOnege }}</span>/箱,
            <span>{{ props.row.productSizelength }}</span>,
            <span>{{ props.row.productSizewide }}</span>,
            <span>{{ props.row.productSizehight }}</span> -->
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>
    <el-table-column label="商品名称" prop="productName"></el-table-column>
    <el-table-column label="产品名称" prop="productType"></el-table-column>
    <el-table-column label="纸张品牌" prop="productBrandinner"></el-table-column>
    <el-table-column label="纸张类型" prop="productZhizleix"></el-table-column>
    <el-table-column label="纸张克重" prop="productGraminner"></el-table-column>
    <el-table-column label="淋膜类型" prop="productCoatedinner"></el-table-column>
    <el-table-column label="单个克重" prop="productOneke"></el-table-column>
    <el-table-column label="产品尺寸" prop="productChanpchic"></el-table-column>
    <el-table-column label="设计稿" prop="designId"  width="200px">
       <template slot-scope="scope">
                {{scope.row.designDOs[0].designModel+"-"+scope.row.designDOs[0].designName+"-"+scope.row.designDOs[0].designDate}}
              </template>
    </el-table-column>
     <el-table-column label="状态" width="65px" align="center">
              <template slot-scope="scope">
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
    <el-table-column label="操作" width="190px" align="center">
      <template slot-scope="scope">
        <el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditProduction(scope.row.productgoodsId,0)">修改</el-button>
        <el-button
          type="danger"
          icon="el-icon-delete"
          @click="deletebumen(scope.row.productgoodsId)"
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
  <el-tab-pane label="双层">
    <el-form :inline="true" class="demo-form-inline" ref="chamerchandiseRef" :model="chaProductionForm">
              
              <el-form-item label="产品名称：" prop="productType">
                    <el-select v-model="chaProductionForm.productType" placeholder="请选择">
                  <el-option
                    v-for="item in chanpinmingchengyuchicun"
                    :key="item.basicId"
                    :label="item.basicRetainone"
                    :value="item.basicId">
                  </el-option>
                </el-select>
                    </el-form-item>
              <el-form-item>
                <el-button @click="handleClick">查询</el-button>
                <el-button type="primary" @click="chaMerchandiseResetForm">重置</el-button>
              </el-form-item>
            </el-form>
          <el-button type="success" @click="addyonghuDialogVisible1 = true">新增</el-button>
          <el-button
            type="warning"
            @click="selectedqi"
            :disabled="selectedList.length == 0"
          >批量启用/禁用</el-button>
          <el-button type="danger" @click="selected" :disabled="selectedList.length == 0">批量删除</el-button>
       <el-table
    :data="ProductionList"
    style="width: 100%" border default-expand-all  @selection-change="handleSelectionChange" class="tb">
    <!-- default-expand-all -->
    <el-table-column type="selection" width="35" align="center"></el-table-column>
    <el-table-column type="index" width="55" fixed align="center" label="序号"></el-table-column>
    <el-table-column type="expand"  label="展开"  width="55">
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="">
           {{ props.row.productSplicing }}
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>
    <el-table-column label="商品名称" prop="productName"></el-table-column>
    <el-table-column label="产品名称" prop="productType"></el-table-column>
    <el-table-column label="纸张品牌" prop="productBrandabroad"></el-table-column>
    <el-table-column label="纸张类型" prop="productZhizleix"></el-table-column>
    <el-table-column label="纸张克重" prop="productGramabroad"></el-table-column>
    <el-table-column label="淋膜类型" prop="productCoatedabroad"></el-table-column>
    <el-table-column label="单个克重" prop="productOneke"></el-table-column>
    <el-table-column label="产品尺寸" prop="productChanpchic"></el-table-column>
    <el-table-column label="设计稿" prop="designId" width="200px">
      <template slot-scope="scope">
                {{scope.row.designDOs[0].designModel+"-"+scope.row.designDOs[0].designName+"-"+scope.row.designDOs[0].designDate}}
              </template>
    </el-table-column>
     <el-table-column label="状态" width="65px" align="center">
              <template slot-scope="scope">
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
            <el-table-column label="操作" width="190px" align="center">
              <template slot-scope="scope">
                <el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditProduction(scope.row.productgoodsId,1)">修改</el-button>
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  @click="deletebumen(scope.row.productgoodsId)"
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
  <el-tab-pane label="瓦楞">
    <el-form :inline="true" class="demo-form-inline" ref="chamerchandiseRef" :model="chaProductionForm">
               <el-form-item label="产品名称：" prop="productType">
                    <el-select v-model="chaProductionForm.productType" placeholder="请选择">
                  <el-option
                    v-for="item in chanpinmingchengyuchicun"
                    :key="item.basicId"
                    :label="item.basicRetainone"
                    :value="item.basicId">
                  </el-option>
                </el-select>
                    </el-form-item>
              <el-form-item>
                <el-button @click="handleClick">查询</el-button>
                <el-button type="primary" @click="chaMerchandiseResetForm">重置</el-button>
              </el-form-item>
            </el-form>
          <el-button type="success" @click="addyonghuDialogVisible2 = true">新增</el-button>
          <el-button
            type="warning"
            @click="selectedqi"
            :disabled="selectedList.length == 0"
          >批量启用/禁用</el-button>
          <el-button type="danger" @click="selected" :disabled="selectedList.length == 0">批量删除</el-button>
       <el-table
    :data="ProductionList"
    style="width: 100%" border default-expand-all @selection-change="handleSelectionChange" class="tb">
    <!-- default-expand-all -->
    <el-table-column type="selection" width="35" align="center"></el-table-column>
    <el-table-column type="index" width="55" fixed align="center" label="序号"></el-table-column>
    <el-table-column type="expand"  label="展开"  width="55">
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="">
           {{ props.row.productSplicing }}
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>
    <el-table-column label="商品名称" prop="productName"></el-table-column>
    <el-table-column label="产品名称" prop="productType"></el-table-column>
    <el-table-column label="纸张品牌" prop="productBrandabroad"></el-table-column>
    <el-table-column label="纸张类型" prop="productZhizleix"></el-table-column>
    <el-table-column label="纸张克重" prop="productGramabroad"></el-table-column>
    <el-table-column label="淋膜类型" prop="productCoatedabroad"></el-table-column>
    <el-table-column label="单个克重" prop="productOneke"></el-table-column>
    <el-table-column label="产品尺寸" prop="productChanpchic"></el-table-column>
    <el-table-column label="设计稿" prop="designId"  width="200px">
       <template slot-scope="scope">
                {{scope.row.designDOs[0].designModel+"-"+scope.row.designDOs[0].designName+"-"+scope.row.designDOs[0].designDate}}
              </template>
    </el-table-column>
            <el-table-column label="状态" width="65px" align="center">
              <template slot-scope="scope">
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
            <el-table-column label="操作" width="190px" align="center">
              <template slot-scope="scope">
                <el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditProduction(scope.row.productgoodsId,2)">修改</el-button>
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  @click="deletebumen(scope.row.productgoodsId)"
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
  <el-tab-pane label="杯套">
    <el-form :inline="true" class="demo-form-inline" ref="chamerchandiseRef" :model="chaProductionForm">
              
               <el-form-item label="产品名称：" prop="productType">
                    <el-select v-model="chaProductionForm.productType" placeholder="请选择">
                  <el-option
                    v-for="item in chanpinmingchengyuchicun"
                    :key="item.basicId"
                    :label="item.basicRetainone"
                    :value="item.basicId">
                  </el-option>
                </el-select>
                    </el-form-item>
              <el-form-item>
                <el-button @click="handleClick">查询</el-button>
                <el-button type="primary" @click="chaMerchandiseResetForm">重置</el-button>
              </el-form-item>
            </el-form>
          <el-button type="success" @click="addyonghuDialogVisible3 = true">新增</el-button>
          <el-button
            type="warning"
            @click="selectedqi"
            :disabled="selectedList.length == 0"
          >批量启用/禁用</el-button>
          <el-button type="danger" @click="selected" :disabled="selectedList.length == 0">批量删除</el-button>
       <el-table
    :data="ProductionList"
    style="width: 100%" border default-expand-all  @selection-change="handleSelectionChange" class="tb">
    <!-- default-expand-all -->
    <el-table-column type="selection" width="35" align="center"></el-table-column>
    <el-table-column type="index" width="55" fixed align="center" label="序号"></el-table-column>
    <el-table-column type="expand"  label="展开"  width="55">
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="">
           {{ props.row.productSplicing }}
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>
    <el-table-column label="商品名称" prop="productName"></el-table-column>
    <el-table-column label="产品名称" prop="productType"></el-table-column>
    <el-table-column label="纸张品牌" prop="productBrandabroad"></el-table-column>
    <el-table-column label="纸张类型" prop="productZhizleix"></el-table-column>
    <el-table-column label="纸张克重" prop="productGramabroad"></el-table-column>
    <el-table-column label="淋膜类型" prop="productCoatedabroad"></el-table-column>
    <el-table-column label="单个克重" prop="productOneke"></el-table-column>
    <el-table-column label="产品尺寸" prop="productChanpchic"></el-table-column>
    <el-table-column label="设计稿" prop="designId"  width="200px">
       <template slot-scope="scope">
                {{scope.row.designDOs[0].designModel+"-"+scope.row.designDOs[0].designName+"-"+scope.row.designDOs[0].designDate}}
              </template>
    </el-table-column>

            <el-table-column label="状态" width="65px" align="center">
              <template slot-scope="scope">
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
            <el-table-column label="操作" width="190px" align="center">
              <template slot-scope="scope">
                <el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditProduction(scope.row.productgoodsId,3)">修改</el-button>
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  @click="deletebumen(scope.row.productgoodsId)"
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
  <el-tab-pane label="手柄">
    <el-form :inline="true" class="demo-form-inline" ref="chamerchandiseRef" :model="chaProductionForm">
              <el-form-item label="产品名称：" prop="productType">
                    <el-select v-model="chaProductionForm.productType" placeholder="请选择">
                  <el-option
                    v-for="item in chanpinmingchengyuchicun"
                    :key="item.basicId"
                    :label="item.basicRetainone"
                    :value="item.basicId">
                  </el-option>
                </el-select>
                    </el-form-item>
              <el-form-item>
                <el-button @click="handleClick">查询</el-button>
                <el-button type="primary" @click="chaMerchandiseResetForm">重置</el-button>
              </el-form-item>
            </el-form>
          <el-button type="success" @click="addyonghuDialogVisible4 = true">新增</el-button>
          <el-button
            type="warning"
            @click="selectedqi"
            :disabled="selectedList.length == 0"
          >批量启用/禁用</el-button>
          <el-button type="danger" @click="selected" :disabled="selectedList.length == 0">批量删除</el-button>
      <el-table
    :data="ProductionList"
    style="width: 100%" border  default-expand-all @selection-change="handleSelectionChange" class="tb">
    <!-- default-expand-all -->
    <el-table-column type="selection" width="35" align="center"></el-table-column>
    <el-table-column type="index" width="55" fixed align="center" label="序号"></el-table-column>
    <el-table-column type="expand"  label="展开"  width="55">
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="">
           {{ props.row.productSplicing }}
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>
    <el-table-column label="商品名称" prop="productName"></el-table-column>
    <el-table-column label="产品名称" prop="productType"></el-table-column>
    <el-table-column label="纸张品牌" prop="productBrandabroad"></el-table-column>
    <el-table-column label="纸张类型" prop="productZhizleix"></el-table-column>
    <el-table-column label="纸张克重" prop="productGramabroad"></el-table-column>
    <el-table-column label="淋膜类型" prop="productCoatedabroad"></el-table-column>
    <el-table-column label="单个克重" prop="productOneke"></el-table-column>
    <el-table-column label="产品尺寸" prop="productChanpchic"></el-table-column>
    <el-table-column label="设计稿" prop="designId"  width="200px">
      <template slot-scope="scope">
                {{scope.row.designDOs[0].designModel+"-"+scope.row.designDOs[0].designName+"-"+scope.row.designDOs[0].designDate}}
              </template>
    </el-table-column>

            <el-table-column label="状态" width="65px" align="center">
              <template slot-scope="scope">
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
            <el-table-column label="操作" width="190px" align="center">
              <template slot-scope="scope">
                <el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditProduction(scope.row.productgoodsId,4)">修改</el-button>
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  @click="deletebumen(scope.row.productgoodsId)"
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
</el-tabs>
      </el-card>
      <el-dialog
        title="新增单层"
        :visible.sync="addyonghuDialogVisible"
        width="50%"
        :before-close="handleClose"
        @closed="dialogClosed">
        <el-form :label-position="labelPosition" label-width="130px" :model="addProductionForm"
        ref="addProductionRef"
        :rules="addProductionRules">
        <div class="fenge">单层信息</div>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="商品名称：" prop="productName">
            <el-input v-model="addProductionForm.productName" class="xiang" placeholder="请输入"></el-input>
            </el-form-item>
      <el-form-item label="产品名称：" prop="productType" >
                    <el-select v-model="addProductionForm.productType" placeholder="请选择"  @change="mingchengchicun">
                  <el-option
                    v-for="item in chanpinmingchengyuchicun"
                    :key="item.basicId"
                    :label="item.basicRetainone"
                    :value="item.basicId" >
                  </el-option>
                </el-select>
                    </el-form-item>
                    <el-form-item label="产品尺寸：" prop="productChanpchic">
                      <el-input  v-model="addProductionForm.productChanpchic" class="xiang" placeholder="请输入"></el-input>
                  
                    </el-form-item>  
                    <el-form-item label="设计稿：" prop="designId">
                    <el-select v-model="addProductionForm.designId" placeholder="请选择">
                        <el-option
                          v-for="item in shejigao"
                          :key="item.designId"
                          :label="item.designModel+item.designName+item.designDate"
                          :value="item.designId">
                        </el-option>
                      </el-select>
                    </el-form-item>  
                    <el-form-item label="纸张品牌：" prop="productBrandinner">
                    <el-select v-model="addProductionForm.productBrandinner" placeholder="请选择" >
                        <el-option
                          v-for="item in zhizhang"
                          :key="item.basicId"
                          :label="item.basicRetainone"
                          :value="item.basicId">
                        </el-option>
                      </el-select>
                    </el-form-item>     
                    <el-form-item label="纸张类型：" prop="productZhizleix">
                    <el-select v-model="addProductionForm.productZhizleix" placeholder="请选择">
                        <el-option
                          v-for="item in xiaoleixing"
                          :key="item.basicId"
                          :label="item.basicRetainone"
                          :value="item.basicId">
                        </el-option>
                      </el-select>
                    </el-form-item>   
                    <el-form-item label="纸张克重：" prop="productGraminner">
                    <el-select v-model="addProductionForm.productGraminner" placeholder="请选择">
                        <el-option
                          v-for="item in zhizhangkezhong"
                          :key="item.basicId"
                          :label="item.basicRetainone"
                          :value="item.basicId">
                        </el-option>
                      </el-select>
                    </el-form-item>   
                    <el-form-item label="淋膜类型：" prop="productCoatedinner">
                    <el-select v-model="addProductionForm.productCoatedinner" placeholder="请选择">
                        <el-option
                          v-for="item in linmo"
                          :key="item.basicId"
                          :label="item.basicRetainone"
                          :value="item.basicId">
                        </el-option>
                      </el-select>
                    </el-form-item>   
                    <el-form-item label="单个克重：" prop="productOneke">
                    <el-input v-model="addProductionForm.productOneke" placeholder="请输入" class="xiang"></el-input>
                    </el-form-item>   
                    
                    </el-col>
                <el-col :span="12">
                  <el-form-item label="外箱尺寸/长：" prop="productSizelength">
                      <el-input v-model="addProductionForm.productSizelength" placeholder="请输入" class="xiang"></el-input>
                    </el-form-item> 
                    <el-form-item label="外箱尺寸/宽：" prop="productSizewide">
                      <el-input v-model="addProductionForm.productSizewide" placeholder="请输入" class="xiang"></el-input>
                    </el-form-item> 
                    
                    <el-form-item label="外箱尺寸/高：" prop="productSizehight">
                      <el-input v-model="addProductionForm.productSizehight" placeholder="请输入" class="xiang"></el-input>
                    </el-form-item> 
                    
                    <el-form-item label="箱唛：" prop="productBoxMark">
                    <el-select v-model="addProductionForm.productBoxMark" placeholder="请选择">
                        <el-option
                          v-for="item in biaomai"
                          :key="item.basicId"
                          :label="item.basicRetainone"
                          :value="item.basicId">
                        </el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="标唛：" prop="productLabel">
                    <el-select v-model="addProductionForm.productLabel" placeholder="请选择">
                        <el-option
                          v-for="item in biaomai"
                          :key="item.basicId"
                          :label="item.basicRetainone"
                          :value="item.basicId">
                        </el-option>
                      </el-select>
                    </el-form-item>
                     <el-form-item label="内包装：" prop="productInnerbao">
                    <el-select v-model="addProductionForm.productInnerbao" placeholder="请选择">
                        <el-option
                          v-for="item in niebaozhuang"
                          :key="item.basicId"
                          :label="item.basicRetainone"
                          :value="item.basicRetainone">
                        </el-option>
                      </el-select>
                    </el-form-item>
                     <el-form-item label="外包装：" prop="productOutbao">
                    <el-select v-model="addProductionForm.productOutbao" placeholder="请选择">
                        <el-option
                          v-for="item in waibaozhuang"
                          :key="item.basicId"
                          :label="item.basicRetainone"
                          :value="item.basicRetainone">
                        </el-option>
                      </el-select>
                    </el-form-item>
                     <el-form-item label="个/箱：" prop="productOnege">
                    <el-input v-model="addProductionForm.productInnerbao*addProductionForm.productOutbao" placeholder="请输入内容" class="xiang"></el-input>
                    </el-form-item>
                    <el-form-item label="配盖：" prop="productCover">
                    <el-select v-model="addProductionForm.productCover" placeholder="请选择">
                        <el-option
                          v-for="item in peigai"
                          :key="item.basicId"
                          :label="item.basicRetainone"
                          :value="item.basicId">
                        </el-option>
                      </el-select>
                    </el-form-item>
                         </el-col>
            </el-row>
              
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="addyonghuDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="addProduction(0)">确 定</el-button>
        </span>
      </el-dialog>
      <el-dialog
        title="新增双层"
        :visible.sync="addyonghuDialogVisible1"
        width="50%"
        :before-close="handleClose"
        @closed="dialogClosed">
        <el-form :label-position="labelPosition" label-width="130px" :model="addProductionForm"
        ref="addProductionRef"
        :rules="addProductionRules">
        <div class="fenge">外层信息</div>
             <el-row>
                <el-col :span="12">
                    <el-form-item label="商品名称：" prop="productName">
            <el-input v-model="addProductionForm.productName" class="xiang" placeholder="请输入"></el-input>
            </el-form-item>
      <el-form-item label="产品名称：" prop="productType">
                    <el-select v-model="addProductionForm.productType" placeholder="请选择"  @change="mingchengchicun">
                  <el-option
                    v-for="item in chanpinmingchengyuchicun"
                    :key="item.basicId"
                    :label="item.basicRetainone"
                    :value="item.basicId">
                  </el-option>
                </el-select>
                    </el-form-item>
                    <el-form-item label="产品尺寸：" prop="productChanpchic">
                      <el-input v-model="addProductionForm.productChanpchic" class="xiang" placeholder="请输入"></el-input>
                  
                    </el-form-item>  
                    <el-form-item label="设计稿：" prop="designId">
                    <el-select v-model="addProductionForm.designId" placeholder="请选择">
                        <el-option
                          v-for="item in shejigao"
                          :key="item.designId"
                          :label="item.designModel+item.designName+item.designDate"
                          :value="item.designId">
                        </el-option>
                      </el-select>
                    </el-form-item>  
                    <el-form-item label="纸张品牌：" prop="productBrandabroad">
                    <el-select v-model="addProductionForm.productBrandabroad" placeholder="请选择">
                        <el-option
                          v-for="item in zhizhang"
                          :key="item.basicId"
                          :label="item.basicRetainone"
                          :value="item.basicId">
                        </el-option>
                      </el-select>
                    </el-form-item>     
                    <el-form-item label="纸张类型：" prop="productZhizleix">
                    <el-select v-model="addProductionForm.productZhizleix" placeholder="请选择">
                        <el-option
                          v-for="item in xiaoleixing"
                          :key="item.basicId"
                          :label="item.basicRetainone"
                          :value="item.basicId">
                        </el-option>
                      </el-select>
                    </el-form-item>   
                    <el-form-item label="纸张克重：" prop="productGramabroad">
                    <el-select v-model="addProductionForm.productGramabroad" placeholder="请选择">
                        <el-option
                          v-for="item in zhizhangkezhong"
                          :key="item.basicId"
                          :label="item.basicRetainone"
                          :value="item.basicId">
                        </el-option>
                      </el-select>
                    </el-form-item>   
                    <el-form-item label="淋膜类型：" prop="productCoatedabroad">
                    <el-select v-model="addProductionForm.productCoatedabroad" placeholder="请选择">
                        <el-option
                          v-for="item in linmo"
                          :key="item.basicId"
                          :label="item.basicRetainone"
                          :value="item.basicId">
                        </el-option>
                      </el-select>
                    </el-form-item>   
                    <el-form-item label="单个克重：" prop="productOneke">
                    <el-input v-model="addProductionForm.productOneke" placeholder="请输入" class="xiang"></el-input>
                    </el-form-item>   
                    
                    
                    </el-col>
                <el-col :span="12">
                  <el-form-item label="外箱尺寸/长：" prop="productSizelength">
                      <el-input v-model="addProductionForm.productSizelength" placeholder="请输入" class="xiang"></el-input>
                    </el-form-item> 
                    <el-form-item label="外箱尺寸/宽：" prop="productSizewide">
                      <el-input v-model="addProductionForm.productSizewide" placeholder="请输入" class="xiang"></el-input>
                    </el-form-item> 
                    <el-form-item label="外箱尺寸/高：" prop="productSizehight">
                      <el-input v-model="addProductionForm.productSizehight" placeholder="请输入" class="xiang"></el-input>
                    </el-form-item> 
                    
                    
                    <el-form-item label="箱唛：" prop="productBoxMark">
                    <el-select v-model="addProductionForm.productBoxMark" placeholder="请选择">
                        <el-option
                          v-for="item in biaomai"
                          :key="item.basicId"
                          :label="item.basicRetainone"
                          :value="item.basicId">
                        </el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="标唛：" prop="productLabel">
                    <el-select v-model="addProductionForm.productLabel" placeholder="请选择">
                        <el-option
                          v-for="item in biaomai"
                          :key="item.basicId"
                          :label="item.basicRetainone"
                          :value="item.basicId">
                        </el-option>
                      </el-select>
                    </el-form-item>
                     <el-form-item label="内包装：" prop="productInnerbao">
                    <el-select v-model="addProductionForm.productInnerbao" placeholder="请选择">
                        <el-option
                          v-for="item in niebaozhuang"
                          :key="item.basicId"
                          :label="item.basicRetainone"
                          :value="item.basicRetainone">
                        </el-option>
                      </el-select>
                    </el-form-item>
                     <el-form-item label="外包装：" prop="productOutbao">
                    <el-select v-model="addProductionForm.productOutbao" placeholder="请选择">
                        <el-option
                          v-for="item in waibaozhuang"
                          :key="item.basicId"
                          :label="item.basicRetainone"
                          :value="item.basicRetainone">
                        </el-option>
                      </el-select>
                    </el-form-item>
                     <el-form-item label="个/箱：" prop="productOnege">
                    <el-input v-model="addProductionForm.productInnerbao*addProductionForm.productOutbao" placeholder="请输入内容" class="xiang"></el-input>
                    </el-form-item>
                    <el-form-item label="配盖：" prop="productCover">
                    <el-select v-model="addProductionForm.productCover" placeholder="请选择">
                        <el-option
                          v-for="item in peigai"
                          :key="item.basicId"
                          :label="item.basicRetainone"
                          :value="item.basicId">
                        </el-option>
                      </el-select>
                    </el-form-item>
                         </el-col>
            </el-row>
            <div class="fenge1">内杯信息</div>
            <el-form-item label="内杯：" prop="productId">
                    <el-select v-model="addProductionForm.productId" placeholder="请选择">
                  <el-option
                    v-for="item in neibei"
                    :key="item.productgoodsId"
                    :label="item.productName+'-'+item.productType+'-'+item.productBrandinner+'-'+item.productGraminner+'-'+item.productCoatedinner+'-'+item.productBoxMark+'-'+item.productBoxMark"
                    :value="item.productgoodsId">
                  </el-option>
                </el-select>
                    </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="addyonghuDialogVisible1 = false">取 消</el-button>
          <el-button type="primary" @click="addProduction">确 定</el-button>
        </span>
      </el-dialog>
      <el-dialog
        title="新增瓦楞"
        :visible.sync="addyonghuDialogVisible2"
        width="50%"
        :before-close="handleClose"
        @closed="dialogClosed">
        <el-form :label-position="labelPosition" label-width="130px" :model="addProductionForm"
        ref="addProductionRef"
        :rules="addProductionRules">
        <div class="fenge">外层信息</div>
             <el-row>
                <el-col :span="12">
                    <el-form-item label="商品名称：" prop="productName">
            <el-input v-model="addProductionForm.productName" class="xiang" placeholder="请输入"></el-input>
            </el-form-item>
      <el-form-item label="产品名称：" prop="productType">
                    <el-select v-model="addProductionForm.productType" placeholder="请选择"  @change="mingchengchicun">
                  <el-option
                    v-for="item in chanpinmingchengyuchicun"
                    :key="item.basicId"
                    :label="item.basicRetainone"
                    :value="item.basicId">
                  </el-option>
                </el-select>
                    </el-form-item>
                     <el-form-item label="产品尺寸：" prop="productChanpchic">
                      <el-input v-model="addProductionForm.productChanpchic" class="xiang" placeholder="请输入"></el-input>
                  
                    </el-form-item>  
                  
                    <el-form-item label="设计稿：" prop="designId">
                    <el-select v-model="addProductionForm.designId" placeholder="请选择">
                        <el-option
                          v-for="item in shejigao"
                          :key="item.designId"
                          :label="item.designModel+item.designName+item.designDate"
                          :value="item.designId">
                        </el-option>
                      </el-select>
                    </el-form-item>  
                    <el-form-item label="纸张品牌：" prop="productBrandabroad">
                    <el-select v-model="addProductionForm.productBrandabroad" placeholder="请选择">
                        <el-option
                          v-for="item in zhizhang"
                          :key="item.basicId"
                          :label="item.basicRetainone"
                          :value="item.basicId">
                        </el-option>
                      </el-select>
                    </el-form-item>     
                    <el-form-item label="纸张类型：" prop="productZhizleix">
                    <el-select v-model="addProductionForm.productZhizleix" placeholder="请选择">
                        <el-option
                          v-for="item in xiaoleixing"
                          :key="item.basicId"
                          :label="item.basicRetainone"
                          :value="item.basicId">
                        </el-option>
                      </el-select>
                    </el-form-item>   
                    <el-form-item label="纸张克重：" prop="productGramabroad">
                    <el-select v-model="addProductionForm.productGramabroad" placeholder="请选择">
                        <el-option
                          v-for="item in zhizhangkezhong"
                          :key="item.basicId"
                          :label="item.basicRetainone"
                          :value="item.basicId">
                        </el-option>
                      </el-select>
                    </el-form-item>   
                    <el-form-item label="淋膜类型：" prop="productCoatedabroad">
                    <el-select v-model="addProductionForm.productCoatedabroad" placeholder="请选择">
                        <el-option
                          v-for="item in linmo"
                          :key="item.basicId"
                          :label="item.basicRetainone"
                          :value="item.basicId">
                        </el-option>
                      </el-select>
                    </el-form-item>   
                    <el-form-item label="单个克重：" prop="productOneke">
                    <el-input v-model="addProductionForm.productOneke" placeholder="请输入" class="xiang"></el-input>
                    </el-form-item>   
                   
                    
                    </el-col>
                <el-col :span="12">
                   <el-form-item label="外箱尺寸/长：" prop="productSizelength">
                      <el-input v-model="addProductionForm.productSizelength" placeholder="请输入" class="xiang"></el-input>
                    </el-form-item> 
                    <el-form-item label="外箱尺寸/宽：" prop="productSizewide">
                      <el-input v-model="addProductionForm.productSizewide" placeholder="请输入" class="xiang"></el-input>
                    </el-form-item> 
                    <el-form-item label="外箱尺寸/高：" prop="productSizehight">
                      <el-input v-model="addProductionForm.productSizehight" placeholder="请输入" class="xiang"></el-input>
                    </el-form-item> 
                   
                   
                    <el-form-item label="箱唛：" prop="productBoxMark">
                    <el-select v-model="addProductionForm.productBoxMark" placeholder="请选择">
                        <el-option
                          v-for="item in biaomai"
                          :key="item.basicId"
                          :label="item.basicRetainone"
                          :value="item.basicId">
                        </el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="标唛：" prop="productLabel">
                    <el-select v-model="addProductionForm.productLabel" placeholder="请选择">
                        <el-option
                          v-for="item in biaomai"
                          :key="item.basicId"
                          :label="item.basicRetainone"
                          :value="item.basicId">
                        </el-option>
                      </el-select>
                    </el-form-item>
                     <el-form-item label="内包装：" prop="productInnerbao">
                    <el-select v-model="addProductionForm.productInnerbao" placeholder="请选择">
                        <el-option
                          v-for="item in niebaozhuang"
                          :key="item.basicId"
                          :label="item.basicRetainone"
                          :value="item.basicRetainone">
                        </el-option>
                      </el-select>
                    </el-form-item>
                     <el-form-item label="外包装：" prop="productOutbao">
                    <el-select v-model="addProductionForm.productOutbao" placeholder="请选择">
                        <el-option
                          v-for="item in waibaozhuang"
                          :key="item.basicId"
                          :label="item.basicRetainone"
                          :value="item.basicRetainone">
                        </el-option>
                      </el-select>
                    </el-form-item>
                     <el-form-item label="个/箱：" prop="productOnege">
                    <el-input v-model="addProductionForm.productInnerbao*addProductionForm.productOutbao" placeholder="请输入内容" class="xiang"></el-input>
                    </el-form-item>
                    <el-form-item label="配盖：" prop="productCover">
                    <el-select v-model="addProductionForm.productCover" placeholder="请选择">
                        <el-option
                          v-for="item in peigai"
                          :key="item.basicId"
                          :label="item.basicRetainone"
                          :value="item.basicId">
                        </el-option>
                      </el-select>
                    </el-form-item>
                         </el-col>
            </el-row>
            <div class="fenge1">内杯信息</div>
            <el-form-item label="内杯：" prop="productId">
                    <el-select v-model="addProductionForm.productId" placeholder="请选择">
                  <el-option
                    v-for="item in neibei"
                    :key="item.productgoodsId"
                    :label="item.productName+'-'+item.productType+'-'+item.productBrandinner+'-'+item.productGraminner+'-'+item.productCoatedinner+'-'+item.productBoxMark+'-'+item.productBoxMark"
                    :value="item.productgoodsId">
                  </el-option>
                </el-select>
                    </el-form-item>
                    
            <div class="fenge1">夹层信息</div>
            <el-row>
              <el-col :span="12">
            <el-form-item label="纸张品牌/夹：" prop="productBrandmid">
                                
                <el-select v-model="addProductionForm.productBrandmid" placeholder="请选择">
                    <el-option
                      v-for="item in zhizhang"
                      :key="item.basicId"
                      :label="item.basicRetainone"
                      :value="item.basicId">
                    </el-option>
                  </el-select>
                </el-form-item>     
                <el-form-item label="纸张类型：" prop="productZhizleixone">
                <el-select v-model="addProductionForm.productZhizleixone" placeholder="请选择">
                    <el-option
                      v-for="item in xiaoleixing"
                      :key="item.basicId"
                      :label="item.basicRetainone"
                      :value="item.basicId">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
            <el-form-item label="淋膜类型/夹：" prop="productCoatedmid">
                <el-select v-model="addProductionForm.productCoatedmid" placeholder="请选择">
                    <el-option
                      v-for="item in linmo"
                      :key="item.basicId"
                      :label="item.basicRetainone"
                      :value="item.basicId">
                    </el-option>
                  </el-select>
                </el-form-item>  
                <el-form-item label="瓦楞形状/夹：" prop="productCorrugated">
                <el-select v-model="addProductionForm.productCorrugated" placeholder="请选择">
                    <el-option
                      v-for="item in waleng"
                      :key="item.basicId"
                      :label="item.basicRetainone"
                      :value="item.basicId">
                    </el-option>
                  </el-select>
                </el-form-item>  
              </el-col>
            </el-row>
              
              <el-form-item label="纸张克数/夹：" prop="productGrammid">
              <el-select v-model="addProductionForm.productGrammid" placeholder="请选择">
                  <el-option
                    v-for="item in zhizhangkezhong"
                    :key="item.basicId"
                    :label="item.basicRetainone"
                    :value="item.basicId">
                  </el-option>
                </el-select>
              </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="addyonghuDialogVisible2 = false">取 消</el-button>
          <el-button type="primary" @click="addProduction">确 定</el-button>
        </span>
      </el-dialog>
      <el-dialog
        title="新增杯套"
        :visible.sync="addyonghuDialogVisible3"
        width="50%"
        :before-close="handleClose"
        @closed="dialogClosed">
        <el-form :label-position="labelPosition" label-width="130px" :model="addProductionForm"
        ref="addProductionRef"
        :rules="addProductionRules">
           <div class="fenge">外层信息</div>
             <el-row>
                <el-col :span="12">
                    <el-form-item label="商品名称：" prop="productName">
            <el-input v-model="addProductionForm.productName" class="xiang" placeholder="请输入"></el-input>
            </el-form-item>
      <el-form-item label="产品名称：" prop="productType">
                    <el-select v-model="addProductionForm.productType" placeholder="请选择"  @change="mingchengchicun">
                  <el-option
                    v-for="item in chanpinmingchengyuchicun"
                    :key="item.basicId"
                    :label="item.basicRetainone"
                    :value="item.basicId">
                  </el-option>
                </el-select>
                    </el-form-item>
                    <el-form-item label="产品尺寸：" prop="productChanpchic">
                      <el-input  v-model="addProductionForm.productChanpchic" class="xiang" placeholder="请输入"></el-input>
                  
                    </el-form-item>  
                    <el-form-item label="设计稿：" prop="designId">
                    <el-select v-model="addProductionForm.designId" placeholder="请选择">
                        <el-option
                          v-for="item in shejigao"
                          :key="item.designId"
                          :label="item.designModel+item.designName+item.designDate"
                          :value="item.designId">
                        </el-option>
                      </el-select>
                    </el-form-item>  
                    <el-form-item label="纸张品牌：" prop="productBrandabroad">
                    <el-select v-model="addProductionForm.productBrandabroad" placeholder="请选择">
                        <el-option
                          v-for="item in zhizhang"
                          :key="item.basicId"
                          :label="item.basicRetainone"
                          :value="item.basicId">
                        </el-option>
                      </el-select>
                    </el-form-item>     
                    <el-form-item label="纸张类型：" prop="productZhizleix">
                    <el-select v-model="addProductionForm.productZhizleix" placeholder="请选择">
                        <el-option
                          v-for="item in xiaoleixing"
                          :key="item.basicId"
                          :label="item.basicRetainone"
                          :value="item.basicId">
                        </el-option>
                      </el-select>
                    </el-form-item>   
                    <el-form-item label="纸张克重：" prop="productGramabroad">
                    <el-select v-model="addProductionForm.productGramabroad" placeholder="请选择">
                        <el-option
                          v-for="item in zhizhangkezhong"
                          :key="item.basicId"
                          :label="item.basicRetainone"
                          :value="item.basicId">
                        </el-option>
                      </el-select>
                    </el-form-item>   
                    <el-form-item label="淋膜类型：" prop="productCoatedabroad">
                    <el-select v-model="addProductionForm.productCoatedabroad" placeholder="请选择">
                        <el-option
                          v-for="item in linmo"
                          :key="item.basicId"
                          :label="item.basicRetainone"
                          :value="item.basicId">
                        </el-option>
                      </el-select>
                    </el-form-item>   
                    <el-form-item label="单个克重：" prop="productOneke">
                    <el-input v-model="addProductionForm.productOneke" placeholder="请输入" class="xiang"></el-input>
                    </el-form-item>   
                    
                    
                    </el-col>
                <el-col :span="12">
                  <el-form-item label="外箱尺寸/长：" prop="productSizelength">
                      <el-input v-model="addProductionForm.productSizelength" placeholder="请输入" class="xiang"></el-input>
                    </el-form-item> 
                    <el-form-item label="外箱尺寸/宽：" prop="productSizewide">
                      <el-input v-model="addProductionForm.productSizewide" placeholder="请输入" class="xiang"></el-input>
                    </el-form-item> 
                    <el-form-item label="外箱尺寸/高：" prop="productSizehight">
                      <el-input v-model="addProductionForm.productSizehight" placeholder="请输入" class="xiang"></el-input>
                    </el-form-item> 
                   
                    <el-form-item label="箱唛：" prop="productBoxMark">
                    <el-select v-model="addProductionForm.productBoxMark" placeholder="请选择">
                        <el-option
                          v-for="item in biaomai"
                          :key="item.basicId"
                          :label="item.basicRetainone"
                          :value="item.basicId">
                        </el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="标唛：" prop="productLabel">
                    <el-select v-model="addProductionForm.productLabel" placeholder="请选择">
                        <el-option
                          v-for="item in biaomai"
                          :key="item.basicId"
                          :label="item.basicRetainone"
                          :value="item.basicId">
                        </el-option>
                      </el-select>
                    </el-form-item>
                     <el-form-item label="内包装：" prop="productInnerbao">
                    <el-select v-model="addProductionForm.productInnerbao" placeholder="请选择">
                        <el-option
                          v-for="item in niebaozhuang"
                          :key="item.basicId"
                          :label="item.basicRetainone"
                          :value="item.basicRetainone">
                        </el-option>
                      </el-select>
                    </el-form-item>
                     <el-form-item label="外包装：" prop="productOutbao">
                    <el-select v-model="addProductionForm.productOutbao" placeholder="请选择">
                        <el-option
                          v-for="item in waibaozhuang"
                          :key="item.basicId"
                          :label="item.basicRetainone"
                          :value="item.basicRetainone">
                        </el-option>
                      </el-select>
                    </el-form-item>
                     <el-form-item label="个/箱：" prop="productOnege">
                    <el-input v-model="addProductionForm.productInnerbao*addProductionForm.productOutbao" placeholder="请输入内容" class="xiang"></el-input>
                    </el-form-item>
                    <el-form-item label="配盖：" prop="productCover">
                    <el-select v-model="addProductionForm.productCover" placeholder="请选择">
                        <el-option
                          v-for="item in peigai"
                          :key="item.basicId"
                          :label="item.basicRetainone"
                          :value="item.basicId">
                        </el-option>
                      </el-select>
                    </el-form-item>
                         </el-col>
            </el-row>
                    
            <div class="fenge1">夹层信息</div>
            <el-row>
              <el-col :span="12">
            <el-form-item label="纸张品牌/夹：" prop="productBrandmid">
                                
                <el-select v-model="addProductionForm.productBrandmid" placeholder="请选择">
                    <el-option
                      v-for="item in zhizhang"
                      :key="item.basicId"
                      :label="item.basicRetainone"
                      :value="item.basicId">
                    </el-option>
                  </el-select>
                </el-form-item>     
                <el-form-item label="纸张类型：" prop="productZhizleixone">
                <el-select v-model="addProductionForm.productZhizleixone" placeholder="请选择">
                    <el-option
                      v-for="item in xiaoleixing"
                      :key="item.basicId"
                      :label="item.basicRetainone"
                      :value="item.basicId">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
            <el-form-item label="淋膜类型/夹：" prop="productCoatedmid">
                <el-select v-model="addProductionForm.productCoatedmid" placeholder="请选择">
                    <el-option
                      v-for="item in linmo"
                      :key="item.basicId"
                      :label="item.basicRetainone"
                      :value="item.basicId">
                    </el-option>
                  </el-select>
                </el-form-item>  
                <el-form-item label="瓦楞形状/夹：" prop="productCorrugated">
                <el-select v-model="addProductionForm.productCorrugated" placeholder="请选择">
                    <el-option
                      v-for="item in waleng"
                      :key="item.basicId"
                      :label="item.basicRetainone"
                      :value="item.basicId">
                    </el-option>
                  </el-select>
                </el-form-item>  
              </el-col>
            </el-row>
              
              <el-form-item label="纸张克数/夹：" prop="productGrammid">
              <el-select v-model="addProductionForm.productGrammid" placeholder="请选择">
                  <el-option
                    v-for="item in zhizhangkezhong"
                    :key="item.basicId"
                    :label="item.basicRetainone"
                    :value="item.basicId">
                  </el-option>
                </el-select>
              </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="addyonghuDialogVisible3 = false">取 消</el-button>
          <el-button type="primary" @click="addProduction">确 定</el-button>
        </span>
      </el-dialog>
      <el-dialog
        title="新增手柄"
        :visible.sync="addyonghuDialogVisible4"
        width="50%"
        :before-close="handleClose"
        @closed="dialogClosed">
        <el-form :label-position="labelPosition" label-width="130px" :model="addProductionForm"
        ref="addProductionRef"
        :rules="addProductionRules">
           <div class="fenge">外层信息</div>
             <el-row>
                <el-col :span="12">
                    <el-form-item label="商品名称：" prop="productName">
            <el-input v-model="addProductionForm.productName" class="xiang" placeholder="请输入"></el-input>
            </el-form-item>
      <el-form-item label="产品名称：" prop="productType">
                    <el-select v-model="addProductionForm.productType" placeholder="请选择"  @change="mingchengchicun">
                  <el-option
                    v-for="item in chanpinmingchengyuchicun"
                    :key="item.basicId"
                    :label="item.basicRetainone"
                    :value="item.basicId">
                  </el-option>
                </el-select>
                    </el-form-item>
                    <el-form-item label="产品尺寸：" prop="productChanpchic">
                      <el-input  v-model="addProductionForm.productChanpchic" class="xiang" placeholder="请输入"></el-input>
                  
                    </el-form-item>  
                    <el-form-item label="设计稿：" prop="designId">
                    <el-select v-model="addProductionForm.designId" placeholder="请选择">
                        <el-option
                          v-for="item in shejigao"
                          :key="item.designId"
                          :label="item.designModel+item.designName+item.designDate"
                          :value="item.designId">
                        </el-option>
                      </el-select>
                    </el-form-item>  
                    <el-form-item label="纸张品牌：" prop="productBrandabroad">
                    <el-select v-model="addProductionForm.productBrandabroad" placeholder="请选择">
                        <el-option
                          v-for="item in zhizhang"
                          :key="item.basicId"
                          :label="item.basicRetainone"
                          :value="item.basicId">
                        </el-option>
                      </el-select>
                    </el-form-item>     
                    <el-form-item label="纸张类型：" prop="productZhizleix">
                    <el-select v-model="addProductionForm.productZhizleix" placeholder="请选择">
                        <el-option
                          v-for="item in xiaoleixing"
                          :key="item.basicId"
                          :label="item.basicRetainone"
                          :value="item.basicId">
                        </el-option>
                      </el-select>
                    </el-form-item>   
                    <el-form-item label="纸张克重：" prop="productGramabroad">
                    <el-select v-model="addProductionForm.productGramabroad" placeholder="请选择">
                        <el-option
                          v-for="item in zhizhangkezhong"
                          :key="item.basicId"
                          :label="item.basicRetainone"
                          :value="item.basicId">
                        </el-option>
                      </el-select>
                    </el-form-item>   
                    <el-form-item label="淋膜类型：" prop="productCoatedabroad">
                    <el-select v-model="addProductionForm.productCoatedabroad" placeholder="请选择">
                        <el-option
                          v-for="item in linmo"
                          :key="item.basicId"
                          :label="item.basicRetainone"
                          :value="item.basicId">
                        </el-option>
                      </el-select>
                    </el-form-item>   
                    <el-form-item label="单个克重：" prop="productOneke">
                    <el-input v-model="addProductionForm.productOneke" placeholder="请输入" class="xiang"></el-input>
                    </el-form-item>   
                   
                    
                    </el-col>
                <el-col :span="12">
                   <el-form-item label="外箱尺寸/长：" prop="productSizelength">
                      <el-input v-model="addProductionForm.productSizelength" placeholder="请输入" class="xiang"></el-input>
                    </el-form-item> 
                    <el-form-item label="外箱尺寸/宽：" prop="productSizewide">
                      <el-input v-model="addProductionForm.productSizewide" placeholder="请输入" class="xiang"></el-input>
                    </el-form-item> 
                    <el-form-item label="外箱尺寸/高：" prop="productSizehight">
                      <el-input v-model="addProductionForm.productSizehight" placeholder="请输入" class="xiang"></el-input>
                    </el-form-item> 
                   
                    <el-form-item label="箱唛：" prop="productBoxMark">
                    <el-select v-model="addProductionForm.productBoxMark" placeholder="请选择">
                        <el-option
                          v-for="item in biaomai"
                          :key="item.basicId"
                          :label="item.basicRetainone"
                          :value="item.basicId">
                        </el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="标唛：" prop="productLabel">
                    <el-select v-model="addProductionForm.productLabel" placeholder="请选择">
                        <el-option
                          v-for="item in biaomai"
                          :key="item.basicId"
                          :label="item.basicRetainone"
                          :value="item.basicId">
                        </el-option>
                      </el-select>
                    </el-form-item>
                     <el-form-item label="内包装：" prop="productInnerbao">
                    <el-select v-model="addProductionForm.productInnerbao" placeholder="请选择">
                        <el-option
                          v-for="item in niebaozhuang"
                          :key="item.basicId"
                          :label="item.basicRetainone"
                          :value="item.basicRetainone">
                        </el-option>
                      </el-select>
                    </el-form-item>
                     <el-form-item label="外包装：" prop="productOutbao">
                    <el-select v-model="addProductionForm.productOutbao" placeholder="请选择">
                        <el-option
                          v-for="item in waibaozhuang"
                          :key="item.basicId"
                          :label="item.basicRetainone"
                          :value="item.basicRetainone">
                        </el-option>
                      </el-select>
                    </el-form-item>
                     <el-form-item label="个/箱：" prop="productOnege">
                    <el-input v-model="addProductionForm.productInnerbao*addProductionForm.productOutbao" placeholder="请输入内容" class="xiang"></el-input>
                    </el-form-item>
                    <el-form-item label="配盖：" prop="productCover">
                    <el-select v-model="addProductionForm.productCover" placeholder="请选择">
                        <el-option
                          v-for="item in peigai"
                          :key="item.basicId"
                          :label="item.basicRetainone"
                          :value="item.basicId">
                        </el-option>
                      </el-select>
                    </el-form-item>
                         </el-col>
            </el-row>

            <div class="fenge1">手柄信息</div>
            <el-row>
              <el-col :span="12">
            <el-form-item label="纸张品牌/夹：" prop="productBrandmid">
                                
                <el-select v-model="addProductionForm.productBrandmid" placeholder="请选择">
                    <el-option
                      v-for="item in zhizhang"
                      :key="item.basicId"
                      :label="item.basicRetainone"
                      :value="item.basicId">
                    </el-option>
                  </el-select>
                </el-form-item>     
                <el-form-item label="纸张类型：" prop="productZhizleixone">
                <el-select v-model="addProductionForm.productZhizleixone" placeholder="请选择">
                    <el-option
                      v-for="item in xiaoleixing"
                      :key="item.basicId"
                      :label="item.basicRetainone"
                      :value="item.basicId">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
            <el-form-item label="淋膜类型/夹：" prop="productCoatedmid">
                <el-select v-model="addProductionForm.productCoatedmid" placeholder="请选择">
                    <el-option
                      v-for="item in linmo"
                      :key="item.basicId"
                      :label="item.basicRetainone"
                      :value="item.basicId">
                    </el-option>
                  </el-select>
                </el-form-item>  
               <el-form-item label="手柄形状/手：" prop="productHandle">
                    <el-select v-model="addProductionForm.productHandle" placeholder="请选择">
                        <el-option
                          v-for="item in shoubin"
                          :key="item.basicId"
                          :label="item.basicRetainone"
                          :value="item.basicId">
                        </el-option>
                      </el-select>
                    </el-form-item>  
              </el-col>
            </el-row>
              
              <el-form-item label="纸张克数/夹：" prop="productGrammid">
              <el-select v-model="addProductionForm.productGrammid" placeholder="请选择">
                  <el-option
                    v-for="item in zhizhangkezhong"
                    :key="item.basicId"
                    :label="item.basicRetainone"
                    :value="item.basicId">
                  </el-option>
                </el-select>
              </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="addyonghuDialogVisible4 = false">取 消</el-button>
          <el-button type="primary" @click="addProduction">确 定</el-button>
        </span>
      </el-dialog>
      <el-dialog
        title="编辑单层"
        :visible.sync="edityonghuDialogVisible"
        width="48%"
        :before-close="handleClose"
        @closed="dialogClosed">
       <el-form :label-position="labelPosition" label-width="130px" :model="editProductionForm"
        ref="addProductionRef"
        :rules="addProductionRules">
            <div class="fenge">单层信息</div>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="商品名称：" prop="productName">
            <el-input v-model="editProductionForm.productName" class="xiang" placeholder="请输入"></el-input>
            </el-form-item>
      <el-form-item label="产品名称：" prop="productType" >
                    <el-select v-model="editProductionForm.productType" placeholder="请选择"   @change="mingchengchicun">
                  <el-option
                    v-for="item in chanpinmingchengyuchicun"
                    :key="item.basicId"
                    :label="item.basicRetainone"
                    :value="item.basicId">
                  </el-option>
                </el-select>
                    </el-form-item>
                     <el-form-item label="产品尺寸：" prop="productChanpchic">
                      <el-input  v-model="editProductionForm.productChanpchic" class="xiang" placeholder="请输入"></el-input>
                  
                    </el-form-item>  
                    <el-form-item label="设计稿：" prop="designId">
                    <el-select v-model="editProductionForm.designId" placeholder="请选择">
                        <el-option
                          v-for="item in shejigao"
                          :key="item.designId"
                          :label="item.designModel+item.designName+item.designDate"
                          :value="item.designId">
                        </el-option>
                      </el-select>
                    </el-form-item>  
                    <el-form-item label="纸张品牌：" prop="productBrandinner">
                    <el-select v-model="editProductionForm.productBrandinner" placeholder="请选择" >
                        <el-option
                          v-for="item in zhizhang"
                          :key="item.basicId"
                          :label="item.basicRetainone"
                          :value="item.basicId">
                        </el-option>
                      </el-select>
                    </el-form-item>     
                    <el-form-item label="纸张类型：" prop="productZhizleix">
                    <el-select v-model="editProductionForm.productZhizleix" placeholder="请选择">
                        <el-option
                          v-for="item in xiaoleixing"
                          :key="item.basicId"
                          :label="item.basicRetainone"
                          :value="item.basicId">
                        </el-option>
                      </el-select>
                    </el-form-item>   
                    <el-form-item label="纸张克重：" prop="productGraminner">
                    <el-select v-model="editProductionForm.productGraminner" placeholder="请选择">
                        <el-option
                          v-for="item in zhizhangkezhong"
                          :key="item.basicId"
                          :label="item.basicRetainone"
                          :value="item.basicId">
                        </el-option>
                      </el-select>
                    </el-form-item>   
                    <el-form-item label="淋膜类型：" prop="productCoatedinner">
                    <el-select v-model="editProductionForm.productCoatedinner" placeholder="请选择">
                        <el-option
                          v-for="item in linmo"
                          :key="item.basicId"
                          :label="item.basicRetainone"
                          :value="item.basicId">
                        </el-option>
                      </el-select>
                    </el-form-item>   
                    <el-form-item label="单个克重：" prop="productOneke">
                    <el-input v-model="editProductionForm.productOneke" placeholder="请输入" class="xiang"></el-input>
                    </el-form-item>   
                    
                    
                    </el-col>
                <el-col :span="12">
                  <el-form-item label="外箱尺寸/长：" prop="productSizelength">
                      <el-input v-model="editProductionForm.productSizelength" placeholder="请输入" class="xiang"></el-input>
                    </el-form-item> 
                    <el-form-item label="外箱尺寸/宽：" prop="productSizewide">
                      <el-input v-model="editProductionForm.productSizewide" placeholder="请输入" class="xiang"></el-input>
                    </el-form-item> 
                    <el-form-item label="外箱尺寸/高：" prop="productSizehight">
                      <el-input v-model="editProductionForm.productSizehight" placeholder="请输入" class="xiang"></el-input>
                    </el-form-item> 
                   
                    <el-form-item label="箱唛：" prop="productBoxMark">
                    <el-select v-model="editProductionForm.productBoxMark" placeholder="请选择">
                        <el-option
                          v-for="item in biaomai"
                          :key="item.basicId"
                          :label="item.basicRetainone"
                          :value="item.basicId">
                        </el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="标唛：" prop="productLabel">
                    <el-select v-model="editProductionForm.productLabel" placeholder="请选择">
                        <el-option
                          v-for="item in biaomai"
                          :key="item.basicId"
                          :label="item.basicRetainone"
                          :value="item.basicId">
                        </el-option>
                      </el-select>
                    </el-form-item>
                     <el-form-item label="内包装：" prop="productInnerbao">
                    <el-select v-model="editProductionForm.productInnerbao" placeholder="请选择">
                        <el-option
                          v-for="item in niebaozhuang"
                          :key="item.basicId"
                          :label="item.basicRetainone"
                          :value="item.basicRetainone">
                        </el-option>
                      </el-select>
                    </el-form-item>
                     <el-form-item label="外包装：" prop="productOutbao">
                    <el-select v-model="editProductionForm.productOutbao" placeholder="请选择">
                        <el-option
                          v-for="item in waibaozhuang"
                          :key="item.basicId"
                          :label="item.basicRetainone"
                          :value="item.basicRetainone">
                        </el-option>
                      </el-select>
                    </el-form-item>
                     <el-form-item label="个/箱：" prop="productOnege">
                    <el-input v-model="editProductionForm.productInnerbao*editProductionForm.productOutbao" placeholder="请输入内容" class="xiang"></el-input>
                    </el-form-item>
                    <el-form-item label="配盖：" prop="productCover">
                    <el-select v-model="editProductionForm.productCover" placeholder="请选择">
                        <el-option
                          v-for="item in peigai"
                          :key="item.basicId"
                          :label="item.basicRetainone"
                          :value="item.basicId">
                        </el-option>
                      </el-select>
                    </el-form-item>
                         </el-col>
            </el-row>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="edityonghuDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="editProduction">确 定</el-button>
        </span>
      </el-dialog>

      <el-dialog
        title="编辑双层"
        :visible.sync="edityonghuDialogVisible1"
        width="48%"
        :before-close="handleClose"
        @closed="dialogClosed">
       <el-form :label-position="labelPosition" label-width="130px" :model="editProductionForm"
        ref="addProductionRef"
        :rules="addProductionRules">
           <div class="fenge">外层信息</div>
             <el-row>
                <el-col :span="12">
                    <el-form-item label="商品名称：" prop="productName">
            <el-input v-model="editProductionForm.productName" class="xiang" placeholder="请输入"></el-input>
            </el-form-item>
      <el-form-item label="产品名称：" prop="productType">
                    <el-select v-model="editProductionForm.productType" placeholder="请选择"  @change="mingchengchicun">
                  <el-option
                    v-for="item in chanpinmingchengyuchicun"
                    :key="item.basicId"
                    :label="item.basicRetainone"
                    :value="item.basicId">
                  </el-option>
                </el-select>
                    </el-form-item>
                     <el-form-item label="产品尺寸：" prop="productChanpchic">
                      <el-input  v-model="editProductionForm.productChanpchic" class="xiang" placeholder="请输入"></el-input>
                  
                    </el-form-item>  
                    <el-form-item label="设计稿：" prop="designId">
                    <el-select v-model="editProductionForm.designId" placeholder="请选择">
                        <el-option
                          v-for="item in shejigao"
                          :key="item.designId"
                          :label="item.designModel+item.designName+item.designDate"
                          :value="item.designId">
                        </el-option>
                      </el-select>
                    </el-form-item>  
                    
                    <el-form-item label="纸张品牌：" prop="productBrandabroad">
                    <el-select v-model="editProductionForm.productBrandabroad" placeholder="请选择">
                        <el-option
                          v-for="item in zhizhang"
                          :key="item.basicId"
                          :label="item.basicRetainone"
                          :value="item.basicId">
                        </el-option>
                      </el-select>
                    </el-form-item>     
                    <el-form-item label="纸张类型：" prop="productZhizleix">
                    <el-select v-model="editProductionForm.productZhizleix" placeholder="请选择">
                        <el-option
                          v-for="item in xiaoleixing"
                          :key="item.basicId"
                          :label="item.basicRetainone"
                          :value="item.basicId">
                        </el-option>
                      </el-select>
                    </el-form-item>   
                    <el-form-item label="纸张克重：" prop="productGramabroad">
                    <el-select v-model="editProductionForm.productGramabroad" placeholder="请选择">
                        <el-option
                          v-for="item in zhizhangkezhong"
                          :key="item.basicId"
                          :label="item.basicRetainone"
                          :value="item.basicId">
                        </el-option>
                      </el-select>
                    </el-form-item>   
                    <el-form-item label="淋膜类型：" prop="productCoatedabroad">
                    <el-select v-model="editProductionForm.productCoatedabroad" placeholder="请选择">
                        <el-option
                          v-for="item in linmo"
                          :key="item.basicId"
                          :label="item.basicRetainone"
                          :value="item.basicId">
                        </el-option>
                      </el-select>
                    </el-form-item>   
                    <el-form-item label="单个克重：" prop="productOneke">
                    <el-input v-model="editProductionForm.productOneke" placeholder="请输入" class="xiang"></el-input>
                    </el-form-item>   
                    
                    
                    </el-col>
                <el-col :span="12">
                  <el-form-item label="外箱尺寸/长：" prop="productSizelength">
                      <el-input v-model="editProductionForm.productSizelength" placeholder="请输入" class="xiang"></el-input>
                    </el-form-item> 
                    <el-form-item label="外箱尺寸/宽：" prop="productSizewide">
                      <el-input v-model="editProductionForm.productSizewide" placeholder="请输入" class="xiang"></el-input>
                    </el-form-item> 
                    <el-form-item label="外箱尺寸/高：" prop="productSizehight">
                      <el-input v-model="editProductionForm.productSizehight" placeholder="请输入" class="xiang"></el-input>
                    </el-form-item> 
                    
                   
                    <el-form-item label="箱唛：" prop="productBoxMark">
                    <el-select v-model="editProductionForm.productBoxMark" placeholder="请选择">
                        <el-option
                          v-for="item in biaomai"
                          :key="item.basicId"
                          :label="item.basicRetainone"
                          :value="item.basicId">
                        </el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="标唛：" prop="productLabel">
                    <el-select v-model="editProductionForm.productLabel" placeholder="请选择">
                        <el-option
                          v-for="item in biaomai"
                          :key="item.basicId"
                          :label="item.basicRetainone"
                          :value="item.basicId">
                        </el-option>
                      </el-select>
                    </el-form-item>
                     <el-form-item label="内包装：" prop="productInnerbao">
                    <el-select v-model="editProductionForm.productInnerbao" placeholder="请选择">
                        <el-option
                          v-for="item in niebaozhuang"
                          :key="item.basicId"
                          :label="item.basicRetainone"
                          :value="item.basicRetainone">
                        </el-option>
                      </el-select>
                    </el-form-item>
                     <el-form-item label="外包装：" prop="productOutbao">
                    <el-select v-model="editProductionForm.productOutbao" placeholder="请选择">
                        <el-option
                          v-for="item in waibaozhuang"
                          :key="item.basicId"
                          :label="item.basicRetainone"
                          :value="item.basicRetainone">
                        </el-option>
                      </el-select>
                    </el-form-item>
                     <el-form-item label="个/箱：" prop="productOnege">
                    <el-input v-model="editProductionForm.productInnerbao*editProductionForm.productOutbao" placeholder="请输入内容" class="xiang"></el-input>
                    </el-form-item>
                    <el-form-item label="配盖：" prop="productCover">
                    <el-select v-model="editProductionForm.productCover" placeholder="请选择">
                        <el-option
                          v-for="item in peigai"
                          :key="item.basicId"
                          :label="item.basicRetainone"
                          :value="item.basicId">
                        </el-option>
                      </el-select>
                    </el-form-item>
                         </el-col>
            </el-row>
            <div class="fenge1">内杯信息</div>
            <el-form-item label="内杯：" prop="productId">
                    <el-select v-model="editProductionForm.productId" placeholder="请选择">
                  <el-option
                    v-for="item in neibei"
                    :key="item.productgoodsId"
                    :label="item.productName+'-'+item.productType+'-'+item.productBrandinner+'-'+item.productGraminner+'-'+item.productCoatedinner+'-'+item.productBoxMark+'-'+item.productBoxMark"
                    :value="item.productgoodsId">
                  </el-option>
                </el-select>
                    </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="edityonghuDialogVisible1 = false">取 消</el-button>
          <el-button type="primary" @click="editProduction">确 定</el-button>
        </span>
      </el-dialog>

      <el-dialog
        title="编辑瓦楞"
        :visible.sync="edityonghuDialogVisible2"
        width="48%"
        :before-close="handleClose"
        @closed="dialogClosed">
       <el-form :label-position="labelPosition" label-width="130px" :model="editProductionForm"
        ref="addProductionRef"
        :rules="addProductionRules">
            <div class="fenge">外层信息</div>
             <el-row>
                <el-col :span="12">
                    <el-form-item label="商品名称：" prop="productName">
            <el-input v-model="editProductionForm.productName" class="xiang" placeholder="请输入"></el-input>
            </el-form-item>
      <el-form-item label="产品名称：" prop="productType">
                    <el-select v-model="editProductionForm.productType" placeholder="请选择"  @change="mingchengchicun">
                  <el-option
                    v-for="item in chanpinmingchengyuchicun"
                    :key="item.basicId"
                    :label="item.basicRetainone"
                    :value="item.basicId">
                  </el-option>
                </el-select>
                    </el-form-item>
                     <el-form-item label="产品尺寸：" prop="productChanpchic">
                      <el-input v-model="editProductionForm.productChanpchic" class="xiang" placeholder="请输入"></el-input>
                  
                    </el-form-item>  
                  
                    <el-form-item label="设计稿：" prop="designId">
                    <el-select v-model="editProductionForm.designId" placeholder="请选择">
                        <el-option
                          v-for="item in shejigao"
                          :key="item.designId"
                          :label="item.designModel+item.designName+item.designDate"
                          :value="item.designId">
                        </el-option>
                      </el-select>
                    </el-form-item>  
                    <el-form-item label="纸张品牌：" prop="productBrandabroad">
                    <el-select v-model="editProductionForm.productBrandabroad" placeholder="请选择">
                        <el-option
                          v-for="item in zhizhang"
                          :key="item.basicId"
                          :label="item.basicRetainone"
                          :value="item.basicId">
                        </el-option>
                      </el-select>
                    </el-form-item>     
                    <el-form-item label="纸张类型：" prop="productZhizleix">
                    <el-select v-model="editProductionForm.productZhizleix" placeholder="请选择">
                        <el-option
                          v-for="item in xiaoleixing"
                          :key="item.basicId"
                          :label="item.basicRetainone"
                          :value="item.basicId">
                        </el-option>
                      </el-select>
                    </el-form-item>   
                    <el-form-item label="纸张克重：" prop="productGramabroad">
                    <el-select v-model="editProductionForm.productGramabroad" placeholder="请选择">
                        <el-option
                          v-for="item in zhizhangkezhong"
                          :key="item.basicId"
                          :label="item.basicRetainone"
                          :value="item.basicId">
                        </el-option>
                      </el-select>
                    </el-form-item>   
                    <el-form-item label="淋膜类型：" prop="productCoatedabroad">
                    <el-select v-model="editProductionForm.productCoatedabroad" placeholder="请选择">
                        <el-option
                          v-for="item in linmo"
                          :key="item.basicId"
                          :label="item.basicRetainone"
                          :value="item.basicId">
                        </el-option>
                      </el-select>
                    </el-form-item>   
                    <el-form-item label="单个克重：" prop="productOneke">
                    <el-input v-model="editProductionForm.productOneke" placeholder="请输入" class="xiang"></el-input>
                    </el-form-item>   
                    
                    
                    </el-col>
                <el-col :span="12">
                  <el-form-item label="外箱尺寸/长：" prop="productSizelength">
                      <el-input v-model="editProductionForm.productSizelength" placeholder="请输入" class="xiang"></el-input>
                    </el-form-item> 
                    <el-form-item label="外箱尺寸/宽：" prop="productSizewide">
                      <el-input v-model="editProductionForm.productSizewide" placeholder="请输入" class="xiang"></el-input>
                    </el-form-item> 
                    <el-form-item label="外箱尺寸/高：" prop="productSizehight">
                      <el-input v-model="editProductionForm.productSizehight" placeholder="请输入" class="xiang"></el-input>
                    </el-form-item> 
                   
                   
                    <el-form-item label="箱唛：" prop="productBoxMark">
                    <el-select v-model="editProductionForm.productBoxMark" placeholder="请选择">
                        <el-option
                          v-for="item in biaomai"
                          :key="item.basicId"
                          :label="item.basicRetainone"
                          :value="item.basicId">
                        </el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="标唛：" prop="productLabel">
                    <el-select v-model="editProductionForm.productLabel" placeholder="请选择">
                        <el-option
                          v-for="item in biaomai"
                          :key="item.basicId"
                          :label="item.basicRetainone"
                          :value="item.basicId">
                        </el-option>
                      </el-select>
                    </el-form-item>
                     <el-form-item label="内包装：" prop="productInnerbao">
                    <el-select v-model="editProductionForm.productInnerbao" placeholder="请选择">
                        <el-option
                          v-for="item in niebaozhuang"
                          :key="item.basicId"
                          :label="item.basicRetainone"
                          :value="item.basicRetainone">
                        </el-option>
                      </el-select>
                    </el-form-item>
                     <el-form-item label="外包装：" prop="productOutbao">
                    <el-select v-model="editProductionForm.productOutbao" placeholder="请选择">
                        <el-option
                          v-for="item in waibaozhuang"
                          :key="item.basicId"
                          :label="item.basicRetainone"
                          :value="item.basicRetainone">
                        </el-option>
                      </el-select>
                    </el-form-item>
                     <el-form-item label="个/箱：" prop="productOnege">
                    <el-input v-model="editProductionForm.productInnerbao*editProductionForm.productOutbao" placeholder="请输入内容" class="xiang"></el-input>
                    </el-form-item>
                    <el-form-item label="配盖：" prop="productCover">
                    <el-select v-model="editProductionForm.productCover" placeholder="请选择">
                        <el-option
                          v-for="item in peigai"
                          :key="item.basicId"
                          :label="item.basicRetainone"
                          :value="item.basicId">
                        </el-option>
                      </el-select>
                    </el-form-item>
                         </el-col>
            </el-row>
            <div class="fenge1">内杯信息</div>
            <el-form-item label="内杯：" prop="productId">
                    <el-select v-model="editProductionForm.productId" placeholder="请选择">
                  <el-option
                    v-for="item in neibei"
                    :key="item.productgoodsId"
                    :label="item.productName+'-'+item.productType+'-'+item.productBrandinner+'-'+item.productGraminner+'-'+item.productCoatedinner+'-'+item.productBoxMark+'-'+item.productBoxMark"
                    :value="item.productgoodsId">
                  </el-option>
                </el-select>
                    </el-form-item>
                    
            <div class="fenge1">夹层信息</div>
            <el-row>
              <el-col :span="12">
            <el-form-item label="纸张品牌/夹：" prop="productBrandmid">
                                
                <el-select v-model="editProductionForm.productBrandmid" placeholder="请选择">
                    <el-option
                      v-for="item in zhizhang"
                      :key="item.basicId"
                      :label="item.basicRetainone"
                      :value="item.basicId">
                    </el-option>
                  </el-select>
                </el-form-item>     
                <el-form-item label="纸张类型：" prop="productZhizleixone">
                <el-select v-model="editProductionForm.productZhizleixone" placeholder="请选择">
                    <el-option
                      v-for="item in xiaoleixing"
                      :key="item.basicId"
                      :label="item.basicRetainone"
                      :value="item.basicId">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
            <el-form-item label="淋膜类型/夹：" prop="productCoatedmid">
                <el-select v-model="editProductionForm.productCoatedmid" placeholder="请选择">
                    <el-option
                      v-for="item in linmo"
                      :key="item.basicId"
                      :label="item.basicRetainone"
                      :value="item.basicId">
                    </el-option>
                  </el-select>
                </el-form-item>  
                <el-form-item label="瓦楞形状/夹：" prop="productCorrugated">
                <el-select v-model="editProductionForm.productCorrugated" placeholder="请选择">
                    <el-option
                      v-for="item in waleng"
                      :key="item.basicId"
                      :label="item.basicRetainone"
                      :value="item.basicId">
                    </el-option>
                  </el-select>
                </el-form-item>  
              </el-col>
            </el-row>
              
              <el-form-item label="纸张克数/夹：" prop="productGrammid">
              <el-select v-model="editProductionForm.productGrammid" placeholder="请选择">
                  <el-option
                    v-for="item in zhizhangkezhong"
                    :key="item.basicId"
                    :label="item.basicRetainone"
                    :value="item.basicId">
                  </el-option>
                </el-select>
              </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="edityonghuDialogVisible2 = false">取 消</el-button>
          <el-button type="primary" @click="editProduction">确 定</el-button>
        </span>
      </el-dialog>

      <el-dialog
        title="编辑杯套"
        :visible.sync="edityonghuDialogVisible3"
        width="48%"
        :before-close="handleClose"
        @closed="dialogClosed">
       <el-form :label-position="labelPosition" label-width="130px" :model="editProductionForm"
        ref="addProductionRef"
        :rules="addProductionRules">
            <div class="fenge">外层信息</div>
             <el-row>
                <el-col :span="12">
                    <el-form-item label="商品名称：" prop="productName">
            <el-input v-model="editProductionForm.productName" class="xiang" placeholder="请输入"></el-input>
            </el-form-item>
      <el-form-item label="产品名称：" prop="productType">
                    <el-select v-model="editProductionForm.productType" placeholder="请选择"  @change="mingchengchicun">
                  <el-option
                    v-for="item in chanpinmingchengyuchicun"
                    :key="item.basicId"
                    :label="item.basicRetainone"
                    :value="item.basicId">
                  </el-option>
                </el-select>
                    </el-form-item>
                    <el-form-item label="产品尺寸：" prop="productChanpchic">
                      <el-input  v-model="editProductionForm.productChanpchic" class="xiang" placeholder="请输入"></el-input>
                  
                    </el-form-item>  
                  
                    <el-form-item label="设计稿：" prop="designId">
                    <el-select v-model="editProductionForm.designId" placeholder="请选择">
                        <el-option
                          v-for="item in shejigao"
                          :key="item.designId"
                          :label="item.designModel+item.designName+item.designDate"
                          :value="item.designId">
                        </el-option>
                      </el-select>
                    </el-form-item>  
                    <el-form-item label="纸张品牌：" prop="productBrandabroad">
                    <el-select v-model="editProductionForm.productBrandabroad" placeholder="请选择">
                        <el-option
                          v-for="item in zhizhang"
                          :key="item.basicId"
                          :label="item.basicRetainone"
                          :value="item.basicId">
                        </el-option>
                      </el-select>
                    </el-form-item>     
                    <el-form-item label="纸张类型：" prop="productZhizleix">
                    <el-select v-model="editProductionForm.productZhizleix" placeholder="请选择">
                        <el-option
                          v-for="item in xiaoleixing"
                          :key="item.basicId"
                          :label="item.basicRetainone"
                          :value="item.basicId">
                        </el-option>
                      </el-select>
                    </el-form-item>   
                    <el-form-item label="纸张克重：" prop="productGramabroad">
                    <el-select v-model="editProductionForm.productGramabroad" placeholder="请选择">
                        <el-option
                          v-for="item in zhizhangkezhong"
                          :key="item.basicId"
                          :label="item.basicRetainone"
                          :value="item.basicId">
                        </el-option>
                      </el-select>
                    </el-form-item>   
                    <el-form-item label="淋膜类型：" prop="productCoatedabroad">
                    <el-select v-model="editProductionForm.productCoatedabroad" placeholder="请选择">
                        <el-option
                          v-for="item in linmo"
                          :key="item.basicId"
                          :label="item.basicRetainone"
                          :value="item.basicId">
                        </el-option>
                      </el-select>
                    </el-form-item>   
                    <el-form-item label="单个克重：" prop="productOneke">
                    <el-input v-model="editProductionForm.productOneke" placeholder="请输入" class="xiang"></el-input>
                    </el-form-item>   
                   
                    
                    </el-col>
                <el-col :span="12">
                   <el-form-item label="外箱尺寸/长：" prop="productSizelength">
                      <el-input v-model="editProductionForm.productSizelength" placeholder="请输入" class="xiang"></el-input>
                    </el-form-item> 
                    <el-form-item label="外箱尺寸/宽：" prop="productSizewide">
                      <el-input v-model="editProductionForm.productSizewide" placeholder="请输入" class="xiang"></el-input>
                    </el-form-item> 
                    <el-form-item label="外箱尺寸/高：" prop="productSizehight">
                      <el-input v-model="editProductionForm.productSizehight" placeholder="请输入" class="xiang"></el-input>
                    </el-form-item> 
                   
                    
                    <el-form-item label="箱唛：" prop="productBoxMark">
                    <el-select v-model="editProductionForm.productBoxMark" placeholder="请选择">
                        <el-option
                          v-for="item in biaomai"
                          :key="item.basicId"
                          :label="item.basicRetainone"
                          :value="item.basicId">
                        </el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="标唛：" prop="productLabel">
                    <el-select v-model="editProductionForm.productLabel" placeholder="请选择">
                        <el-option
                          v-for="item in biaomai"
                          :key="item.basicId"
                          :label="item.basicRetainone"
                          :value="item.basicId">
                        </el-option>
                      </el-select>
                    </el-form-item>
                     <el-form-item label="内包装：" prop="productInnerbao">
                    <el-select v-model="editProductionForm.productInnerbao" placeholder="请选择">
                        <el-option
                          v-for="item in niebaozhuang"
                          :key="item.basicId"
                          :label="item.basicRetainone"
                          :value="item.basicRetainone">
                        </el-option>
                      </el-select>
                    </el-form-item>
                     <el-form-item label="外包装：" prop="productOutbao">
                    <el-select v-model="editProductionForm.productOutbao" placeholder="请选择">
                        <el-option
                          v-for="item in waibaozhuang"
                          :key="item.basicId"
                          :label="item.basicRetainone"
                          :value="item.basicRetainone">
                        </el-option>
                      </el-select>
                    </el-form-item>
                     <el-form-item label="个/箱：" prop="productOnege">
                    <el-input v-model="editProductionForm.productInnerbao*editProductionForm.productOutbao" placeholder="请输入内容" class="xiang"></el-input>
                    </el-form-item>
                    <el-form-item label="配盖：" prop="productCover">
                    <el-select v-model="editProductionForm.productCover" placeholder="请选择">
                        <el-option
                          v-for="item in peigai"
                          :key="item.basicId"
                          :label="item.basicRetainone"
                          :value="item.basicId">
                        </el-option>
                      </el-select>
                    </el-form-item>
                         </el-col>
            </el-row>
            <div class="fenge1">内杯信息</div>
            <el-form-item label="内杯：" prop="productId">
                    <el-select v-model="editProductionForm.productId" placeholder="请选择">
                  <el-option
                    v-for="item in neibei"
                    :key="item.productgoodsId"
                    :label="item.productName+'-'+item.productType+'-'+item.productBrandinner+'-'+item.productGraminner+'-'+item.productCoatedinner+'-'+item.productBoxMark+'-'+item.productBoxMark"
                    :value="item.productgoodsId">
                  </el-option>
                </el-select>
                    </el-form-item>
                    
            <div class="fenge1">夹层信息</div>
            <el-row>
              <el-col :span="12">
            <el-form-item label="纸张品牌/夹：" prop="productBrandmid">
                                
                <el-select v-model="editProductionForm.productBrandmid" placeholder="请选择">
                    <el-option
                      v-for="item in zhizhang"
                      :key="item.basicId"
                      :label="item.basicRetainone"
                      :value="item.basicId">
                    </el-option>
                  </el-select>
                </el-form-item>     
                <el-form-item label="纸张类型：" prop="productZhizleixone">
                <el-select v-model="editProductionForm.productZhizleixone" placeholder="请选择">
                    <el-option
                      v-for="item in xiaoleixing"
                      :key="item.basicId"
                      :label="item.basicRetainone"
                      :value="item.basicId">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
            <el-form-item label="淋膜类型/夹：" prop="productCoatedmid">
                <el-select v-model="editProductionForm.productCoatedmid" placeholder="请选择">
                    <el-option
                      v-for="item in linmo"
                      :key="item.basicId"
                      :label="item.basicRetainone"
                      :value="item.basicId">
                    </el-option>
                  </el-select>
                </el-form-item>  
                <el-form-item label="瓦楞形状/夹：" prop="productCorrugated">
                <el-select v-model="editProductionForm.productCorrugated" placeholder="请选择">
                    <el-option
                      v-for="item in waleng"
                      :key="item.basicId"
                      :label="item.basicRetainone"
                      :value="item.basicId">
                    </el-option>
                  </el-select>
                </el-form-item>  
              </el-col>
            </el-row>
              
              <el-form-item label="纸张克数/夹：" prop="productGrammid">
              <el-select v-model="editProductionForm.productGrammid" placeholder="请选择">
                  <el-option
                    v-for="item in zhizhangkezhong"
                    :key="item.basicId"
                    :label="item.basicRetainone"
                    :value="item.basicId">
                  </el-option>
                </el-select>
              </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="edityonghuDialogVisible3 = false">取 消</el-button>
          <el-button type="primary" @click="editProduction">确 定</el-button>
        </span>
      </el-dialog>


      <el-dialog
        title="编辑手柄"
        :visible.sync="edityonghuDialogVisible4"
        width="48%"
        :before-close="handleClose"
        @closed="dialogClosed">
       <el-form :label-position="labelPosition" label-width="130px" :model="editProductionForm"
        ref="addProductionRef"
        :rules="addProductionRules">
            <div class="fenge">外层信息</div>
             <el-row>
                <el-col :span="12">
                    <el-form-item label="商品名称：" prop="productName">
            <el-input v-model="editProductionForm.productName" class="xiang" placeholder="请输入"></el-input>
            </el-form-item>
      <el-form-item label="产品名称：" prop="productType">
                    <el-select v-model="editProductionForm.productType" placeholder="请选择"  @change="mingchengchicun">
                  <el-option
                    v-for="item in chanpinmingchengyuchicun"
                    :key="item.basicId"
                    :label="item.basicRetainone"
                    :value="item.basicId">
                  </el-option>
                </el-select>
                    </el-form-item>
                     <el-form-item label="产品尺寸：" prop="productChanpchic">
                      <el-input v-model="editProductionForm.productChanpchic" class="xiang" placeholder="请输入"></el-input>
                  
                    </el-form-item>  
                  
                    <el-form-item label="设计稿：" prop="designId">
                    <el-select v-model="editProductionForm.designId" placeholder="请选择">
                        <el-option
                          v-for="item in shejigao"
                          :key="item.designId"
                          :label="item.designModel+item.designName+item.designDate"
                          :value="item.designId">
                        </el-option>
                      </el-select>
                    </el-form-item>  
                    <el-form-item label="纸张品牌：" prop="productBrandabroad">
                    <el-select v-model="editProductionForm.productBrandabroad" placeholder="请选择">
                        <el-option
                          v-for="item in zhizhang"
                          :key="item.basicId"
                          :label="item.basicRetainone"
                          :value="item.basicId">
                        </el-option>
                      </el-select>
                    </el-form-item>     
                    <el-form-item label="纸张类型：" prop="productZhizleix">
                    <el-select v-model="editProductionForm.productZhizleix" placeholder="请选择">
                        <el-option
                          v-for="item in xiaoleixing"
                          :key="item.basicId"
                          :label="item.basicRetainone"
                          :value="item.basicId">
                        </el-option>
                      </el-select>
                    </el-form-item>   
                    <el-form-item label="纸张克重：" prop="productGramabroad">
                    <el-select v-model="editProductionForm.productGramabroad" placeholder="请选择">
                        <el-option
                          v-for="item in zhizhangkezhong"
                          :key="item.basicId"
                          :label="item.basicRetainone"
                          :value="item.basicId">
                        </el-option>
                      </el-select>
                    </el-form-item>   
                    <el-form-item label="淋膜类型：" prop="productCoatedabroad">
                    <el-select v-model="editProductionForm.productCoatedabroad" placeholder="请选择">
                        <el-option
                          v-for="item in linmo"
                          :key="item.basicId"
                          :label="item.basicRetainone"
                          :value="item.basicId">
                        </el-option>
                      </el-select>
                    </el-form-item>   
                    <el-form-item label="单个克重：" prop="productOneke">
                    <el-input v-model="editProductionForm.productOneke" placeholder="请输入" class="xiang"></el-input>
                    </el-form-item>   
                    
                    
                    </el-col>
                <el-col :span="12">
                  <el-form-item label="外箱尺寸/长：" prop="productSizelength">
                      <el-input v-model="editProductionForm.productSizelength" placeholder="请输入" class="xiang"></el-input>
                    </el-form-item> 
                    <el-form-item label="外箱尺寸/宽：" prop="productSizewide">
                      <el-input v-model="editProductionForm.productSizewide" placeholder="请输入" class="xiang"></el-input>
                    </el-form-item> 
                    <el-form-item label="外箱尺寸/高：" prop="productSizehight">
                      <el-input v-model="editProductionForm.productSizehight" placeholder="请输入" class="xiang"></el-input>
                    </el-form-item> 
                   
                   
                    <el-form-item label="箱唛：" prop="productBoxMark">
                    <el-select v-model="editProductionForm.productBoxMark" placeholder="请选择">
                        <el-option
                          v-for="item in biaomai"
                          :key="item.basicId"
                          :label="item.basicRetainone"
                          :value="item.basicId">
                        </el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="标唛：" prop="productLabel">
                    <el-select v-model="editProductionForm.productLabel" placeholder="请选择">
                        <el-option
                          v-for="item in biaomai"
                          :key="item.basicId"
                          :label="item.basicRetainone"
                          :value="item.basicId">
                        </el-option>
                      </el-select>
                    </el-form-item>
                     <el-form-item label="内包装：" prop="productInnerbao">
                    <el-select v-model="editProductionForm.productInnerbao" placeholder="请选择">
                        <el-option
                          v-for="item in niebaozhuang"
                          :key="item.basicId"
                          :label="item.basicRetainone"
                          :value="item.basicRetainone">
                        </el-option>
                      </el-select>
                    </el-form-item>
                     <el-form-item label="外包装：" prop="productOutbao">
                    <el-select v-model="editProductionForm.productOutbao" placeholder="请选择">
                        <el-option
                          v-for="item in waibaozhuang"
                          :key="item.basicId"
                          :label="item.basicRetainone"
                          :value="item.basicRetainone">
                        </el-option>
                      </el-select>
                    </el-form-item>
                     <el-form-item label="个/箱：" prop="productOnege">
                    <el-input v-model="editProductionForm.productInnerbao*editProductionForm.productOutbao" placeholder="请输入内容" class="xiang"></el-input>
                    </el-form-item>
                    <el-form-item label="配盖：" prop="productCover">
                    <el-select v-model="editProductionForm.productCover" placeholder="请选择">
                        <el-option
                          v-for="item in peigai"
                          :key="item.basicId"
                          :label="item.basicRetainone"
                          :value="item.basicId">
                        </el-option>
                      </el-select>
                    </el-form-item>
                         </el-col>
            </el-row>
            <div class="fenge1">内杯信息</div>
            <el-form-item label="内杯：" prop="productId">
                    <el-select v-model="editProductionForm.productId" placeholder="请选择">
                  <el-option
                    v-for="item in neibei"
                    :key="item.productgoodsId"
                    :label="item.productName+'-'+item.productType+'-'+item.productBrandinner+'-'+item.productGraminner+'-'+item.productCoatedinner+'-'+item.productBoxMark+'-'+item.productBoxMark"
                    :value="item.productgoodsId">
                  </el-option>
                </el-select>
                    </el-form-item>
                    
            <div class="fenge1">手柄信息</div>
            <el-row>
              <el-col :span="12">
            <el-form-item label="纸张品牌/夹：" prop="productBrandmid">
                                
                <el-select v-model="editProductionForm.productBrandmid" placeholder="请选择">
                    <el-option
                      v-for="item in zhizhang"
                      :key="item.basicId"
                      :label="item.basicRetainone"
                      :value="item.basicId">
                    </el-option>
                  </el-select>
                </el-form-item>     
                <el-form-item label="纸张类型：" prop="productZhizleixone">
                <el-select v-model="editProductionForm.productZhizleixone" placeholder="请选择">
                    <el-option
                      v-for="item in xiaoleixing"
                      :key="item.basicId"
                      :label="item.basicRetainone"
                      :value="item.basicId">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
            <el-form-item label="淋膜类型/夹：" prop="productCoatedmid">
                <el-select v-model="editProductionForm.productCoatedmid" placeholder="请选择">
                    <el-option
                      v-for="item in linmo"
                      :key="item.basicId"
                      :label="item.basicRetainone"
                      :value="item.basicId">
                    </el-option>
                  </el-select>
                </el-form-item>  
                 <el-form-item label="手柄形状/手：" prop="productHandle">
                    <el-select v-model="editProductionForm.productHandle" placeholder="请选择">
                        <el-option
                          v-for="item in shoubin"
                          :key="item.basicId"
                          :label="item.basicRetainone"
                          :value="item.basicId">
                        </el-option>
                      </el-select>
                    </el-form-item>  
              </el-col>
            </el-row>
              
              <el-form-item label="纸张克数/夹：" prop="productGrammid">
              <el-select v-model="editProductionForm.productGrammid" placeholder="请选择">
                  <el-option
                    v-for="item in zhizhangkezhong"
                    :key="item.basicId"
                    :label="item.basicRetainone"
                    :value="item.basicId">
                  </el-option>
                </el-select>
              </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="edityonghuDialogVisible4 = false">取 消</el-button>
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
      addyonghuDialogVisible1: false,
      addyonghuDialogVisible2: false,
      addyonghuDialogVisible3: false,
      addyonghuDialogVisible4: false,
      edityonghuDialogVisible:false,
      edityonghuDialogVisible1:false,
      edityonghuDialogVisible2:false,
      edityonghuDialogVisible3:false,
      edityonghuDialogVisible4:false,
      resetPassdialogVisible:false,
      delVisible:false,
      delVisibleqi:false,
      currentPage:0 ,
      ProductionList:[],
      selectedList: [],
      delarr:[],
      addProductionForm:{
        productgoodsId:'',
        productId:'',
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
        designId:'',
        productName:'',
        productBoxMark:'',
        productLabel:'',
        productCorrugated:'',
        productLeixing:0,
        productExplain:'',
        productHandle:'',
        productName1:'',
        productSizelength:'',
        productSizewide:'',
        productSizehight:'',
        productInnerbao:'',
        productOutbao:'',
        productOnege:'',
        productOneke:'',
        productCover:'',
        productZhizleix:'',
        productChanpchic:'',
      },
      editProductionForm:{
       productgoodsId:'',
        productId:'',
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
        designId:'',
        productName:'',
        productBoxMark:'',
        productLabel:'',
        productCorrugated:'',
        productLeixing:0,
        productExplain:'',
        productHandle:'',
        productName1:'',
        productSizelength:'',
        productSizewide:'',
        productSizehight:'',
        productInnerbao:'',
        productOutbao:'',
        productOnege:'',
        productOneke:'',
        productCover:'',
        productZhizleix:'',
        productChanpchic:'',
      },
      chaProductionForm:{
        productType:'',
        pageCode: 1, //当前页
        pageSize: 10,//每页显示的记录数
        productLeixing:0,
      },
      basicDO:{
         productType:'',
      },
      a:{
        b:''
      },
      total:0,
      chanpingleixing:[],
      linmo:[],
      zhizhang:[],
      chanpingmingcheng:[],
      shejigao:[],
      xiangmai:[],
      biaomai:[],
      neibei:[],
      shoubin:[],
      waleng:[],
      chanpinguigeyumingcheng:[],
      zhizhangkezhong:[],
      chanpinshejigaomingcheng:[],
      chanpinmingchengyuchicun:[],
      xiaoleixing:[],
      niebaozhuang:[],
      waibaozhuang:[],
      peigai:[],     
       addProductionRules: {
          productId:[
          // { required: true, message: '请输入内容', trigger: 'blur' },
          // { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
          ],},
    }
  },
  created () {
    this.getProductionList();
    this.getProductionList1();
  },
  methods:{
   async mingchengchicun(){
     if (this.addProductionForm.productType!='') {
        this.basicDO.productType=this.addProductionForm.productType;
     }else {
       this.basicDO.productType=this.editProductionForm.productType;
     }
      const { data: res } = await this.$http.post("jc/Basic/selectchicunming",this.basicDO);
      this.addProductionForm.productChanpchic=res[0].basicRetainone1;
      this.editProductionForm.productChanpchic=res[0].basicRetainone1;
    },
    async handleClick(tab) {
        this.chaProductionForm.pageCode=1;
        this.chaProductionForm.pageSize=10;
        this.currentPage=0;
        console.log(tab.index);
        if(tab.index){
      this.chaProductionForm.productLeixing=tab.index;
      this.editProductionForm.productLeixing=tab.index;
      this.addProductionForm.productLeixing=tab.index;
        }else{
this.chaProductionForm.productLeixing="0";
        }
      const { data: res } = await this.$http.post("jc/Produconggoods/selectProducing",this.chaProductionForm);
      let design='';
      for (let index = 0; index < res.body.rows.length; index++) {
        for (let i = 0; i < res.body.rows[index].designDOs.length; i++) {
          design=res.body.rows[index].designDOs[i].designModel+'-'+res.body.rows[index].designDOs[i].designName+'-'+res.body.rows[index].designDOs[i].designDate
        }
        res.body.rows[index].list=design;
      }
      this.ProductionList = res.body.rows;
      this.total=res.body.total;
      },
    async getProductionList() {
      const { data: res } = await this.$http.post("jc/Produconggoods/selectProducing",this.chaProductionForm);
      let design='';
      for (let index = 0; index < res.body.rows.length; index++) {
        for (let i = 0; i < res.body.rows[index].designDOs.length; i++) {
          design=res.body.rows[index].designDOs[i].designModel+'-'+res.body.rows[index].designDOs[i].designName+'-'+res.body.rows[index].designDOs[i].designDate
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
      const { data: res5 } = await this.$http.post("jc/Basic/selectspecificationsname");
      const { data: res6 } = await this.$http.post("jc/Basic/selectparperheight");
      const { data: res8 } = await this.$http.post("jc/Basic/selectlabel");
      const { data: res9 } = await this.$http.post("jc/Produconggoods/selectProducingdan",this.a);
      const { data: res10 } = await this.$http.post("jc/Basic/selectshoubing");
      const { data: res11 } = await this.$http.post("jc/Basic/selectwaleng");
      const { data: res12 } = await this.$http.post("jc/Basic/selectsheji");
      const { data: res13 } = await this.$http.post("jc/Basic/selectchicunming",this.basicDO);
      const { data: res14 } = await this.$http.post("jc/Basic/selectxiaoleixing");
      const { data: res15 } = await this.$http.post("jc/Basic/selectinpack");
      const { data: res16 } = await this.$http.post("jc/Basic/selectoutpack");
      const { data: res17 } = await this.$http.post("jc/Basic/selectoutpack");
      const { data: res18 } = await this.$http.post("jc/Basic/selectcover");
      this.peigai=res18;
      this.waibaozhuang=res16;
      this.niebaozhuang=res15;
      this.xiaoleixing=res14;
      this.chanpinmingchengyuchicun=res13;
      this.chanpinshejigaomingcheng=res12;
      this.zhizhangkezhong=res6;
      this.chanpinguigeyumingcheng=res5;
      this.chanpingleixing = res;
      
      
      this.linmo = res1;
      this.zhizhang = res2;
      this.chanpingmingcheng = res3;
      this.shejigao=res4;
      this.biaomai=res8;
      this.neibei=res9.body.rows;
      this.shoubin=res10;
      this.waleng=res11;
    },
    
    addProduction(productId) {
      this.$refs.addProductionRef.validate(async valid => {
        if (!valid) return;    
        console.log(this.addProductionForm);
        this.addProductionForm.productOnege=this.addProductionForm.productInnerbao*this.addProductionForm.productOutbao;
        const { data: res } = await this.$http.post("jc/Produconggoods/addProducing",this.addProductionForm);
        this.getProductionList();
        this.getProductionList1();
        this.basicDO.productType='';
        // this.handleClick();
        this.addyonghuDialogVisible = false;
        this.addyonghuDialogVisible1 = false;
        this.addyonghuDialogVisible2 = false;
        this.addyonghuDialogVisible3 = false;
        this.addyonghuDialogVisible4 = false;
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
     chaMerchandiseResetForm(formName){
        this.$refs.chamerchandiseRef.resetFields();
        this.getMerchandiseList();
    },
    async showEditProduction(productgoodsId,zhi){
      let param = new URLSearchParams();
      param.append("productgoodsId", productgoodsId);
      param.append("productLeixing",this.chaProductionForm.productLeixing);
      const {data:res} = await this.$http.post('jc/Produconggoods/selectProducingbyid',param);
      console.log(res);
      
        this.editProductionForm.productBrandinner=Number(res.productBrandinner);
        this.editProductionForm.productGraminner=Number(res.productGraminner);
        this.editProductionForm.productCoatedinner=Number(res.productCoatedinner);
        this.editProductionForm.productBrandabroad=Number(res.productBrandabroad);
        this.editProductionForm.productGramabroad=Number(res.productGramabroad);
        this.editProductionForm.productCoatedabroad=Number(res.productCoatedabroad);
        this.editProductionForm.productBrandmid=Number(res.productBrandmid);
        this.editProductionForm.productGrammid=Number(res.productGrammid);
        this.editProductionForm.productCoatedmid=Number(res.productCoatedmid);
        this.editProductionForm.productBoxMark=Number(res.productBoxMark);
        this.editProductionForm.productLabel=Number(res.productLabel);
        this.editProductionForm.productCorrugated=Number(res.productCorrugated);
        this.editProductionForm.productHandle=Number(res.productHandle);
        this.editProductionForm.productCover=Number(res.productCover);
        this.editProductionForm.productZhizleix=Number(res.productZhizleix);
        this.editProductionForm.productZhizleixone=Number(res.productZhizleixone);
        this.editProductionForm.productType=Number(res.productType);
        this.editProductionForm.productgoodsId=res.productgoodsId;
        this.editProductionForm.productId=res.productId;
        this.editProductionForm.productChanpchic=res.productChanpchic
        this.editProductionForm.productState=res.productState;
        this.editProductionForm.designId=res.designId;
        this.editProductionForm.productName=res.productName;
        this.editProductionForm.productLeixing=res.productLeixing;
        this.editProductionForm.productName1=res.productName1;
        this.editProductionForm.productSizelength=res.productSizelength;
        this.editProductionForm.productSizewide=res.productSizewide;
        this.editProductionForm.productSizehight=res.productSizehight;
        this.editProductionForm.productInnerbao=res.productInnerbao;
        this.editProductionForm.productOutbao=res.productOutbao;
        this.editProductionForm.productOnege=res.productOnege;
        this.editProductionForm.productOneke=res.productOneke;

      this.editProductionForm.designCode=res.designDOs[0].designId;
      console.log(this.editProductionForm);
      
      if (zhi==0) {
        this.edityonghuDialogVisible=true;
      }else if(zhi==1){
      this.edityonghuDialogVisible1=true;
      }
      else if(zhi==2){
      this.edityonghuDialogVisible2=true;
      }
      else if(zhi==3){
      this.edityonghuDialogVisible3=true;
      }
      else if(zhi==4){
      this.edityonghuDialogVisible4=true;
      }
    },
    async editProduction(){
       const {data:res} = await this.$http.post('jc/Produconggoods/updateProducing',this.editProductionForm);
       this.getProductionList();
       this.getProductionList1();
       this.basicDO.productType='';
      //  this.handleClick();
       this.edityonghuDialogVisible=false;
       this.edityonghuDialogVisible1=false;
       this.edityonghuDialogVisible2=false;
       this.edityonghuDialogVisible3=false;
       this.edityonghuDialogVisible4=false;
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
      this.getProductionList1();
      // this.handleClick();
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
         this.getProductionList1();
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
         this.getProductionList1();
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
      console.log(val);
      
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
      width: 300px;
    }
    .hu{
      width: 133px;
    }
    .el-select{
      width: 300px;
    }
     .demo-table-expand {
    text-align:center;
    .el-form-item {
    margin-bottom: 0px;
}
  }
    .fenge{
    position: absolute;
    top: 34px;
    left: 0px;
    height: 25px;
    width: 98.5%;
    line-height: 25px;
    padding-left:15px ;
    background-color: #DCDFE6;
    
    }
    .fenge1{
    height: 25px;
    width:98.5%;
    line-height: 25px;
    padding-left:15px ;
    background-color: #DCDFE6;
    margin-bottom: 20px;
    }
</style>