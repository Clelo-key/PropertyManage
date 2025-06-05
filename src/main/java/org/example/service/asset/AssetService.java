package org.example.service.asset;

import org.example.dal.dataobj.asset.vo.AssetReqVO;
import org.example.dal.dataobj.asset.vo.AssetRespVO;

import java.util.List;

public interface AssetService {
    List<AssetRespVO> searchAssets(String assetName, String assetNumber);
    List<AssetRespVO> getAllAssets();
    AssetRespVO createAsset(AssetReqVO reqVO);
    AssetRespVO updateAsset(AssetReqVO reqVO);
    void deleteAsset(Integer id);
    AssetRespVO getAssetById(Integer id);
}
