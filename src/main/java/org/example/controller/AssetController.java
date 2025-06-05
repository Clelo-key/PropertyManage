package org.example.controller;

import jakarta.annotation.Resource;
import jakarta.validation.Valid;
import org.example.config.CommonResult;
import org.example.dal.dataobj.asset.vo.AssetReqVO;
import org.example.dal.dataobj.asset.vo.AssetRespVO;
import org.example.service.asset.AssetService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * @Author: Fly
 * @CreateTime: 2025-06-04
 * @Version: 1.0
 */
@RestController
@RequestMapping("assets")
public class AssetController {

    @Resource
    AssetService assetService;

    // 主页列表展示系统中所有的资产信息
    @GetMapping
    public CommonResult<List<AssetRespVO>> getAllAssets() {
        List<AssetRespVO> assetRespVOList = assetService.getAllAssets();
        return CommonResult.success(assetRespVOList, "获取所有资产信息成功");
    }

    // 根据资产名称或者资产编号对资产进行模糊搜索
    @GetMapping("/search")
    public CommonResult<List<AssetRespVO>> searchAssets(
            @RequestParam(required = false) String assetName,
            @RequestParam(required = false) String assetNumber) {
        List<AssetRespVO> assetRespVOList = assetService.searchAssets(assetName, assetNumber);
        return CommonResult.success(assetRespVOList, "搜索资产成功");
    }

    // 新增资产信息
    @PostMapping
    public CommonResult<AssetRespVO> createAsset(@Valid @RequestBody AssetReqVO assetReqVO) {
        AssetRespVO assetRespVO = assetService.createAsset(assetReqVO);
        return CommonResult.success(assetRespVO, "新增资产成功");
    }

    // 查看某个资产的具体信息
    @GetMapping("/{id}")
    public CommonResult<AssetRespVO> getAssetById(@PathVariable Integer id) {
        AssetRespVO assetRespVO = assetService.getAssetById(id);
        return CommonResult.success(assetRespVO, "获取资产详情成功");
    }

    // 修改某个资产的信息
    @PutMapping("/{id}")
    public CommonResult<AssetRespVO> updateAsset(@PathVariable Integer id, @Valid @RequestBody AssetReqVO assetReqVO) {
        assetReqVO.setId(id);
        AssetRespVO assetRespVO = assetService.updateAsset(assetReqVO);
        return CommonResult.success(assetRespVO, "更新资产成功");
    }

    // 删除某个具体的资产信息
    @DeleteMapping("/{id}")
    public CommonResult<Void> deleteAsset(@PathVariable Integer id) {
        assetService.deleteAsset(id);
        return CommonResult.success(null, "删除资产成功");
    }
}
