package org.example.convert.asset;

import jakarta.annotation.Resource;
import org.example.convert.user.UserConvertUtils;
import org.example.dal.dataobj.asset.AssetDo;
import org.example.dal.dataobj.asset.vo.AssetReqVO;
import org.example.dal.dataobj.asset.vo.AssetRespVO;
import org.example.dal.dataobj.user.UserDo;
import org.example.dal.dataobj.user.vo.UserRepVO;
import org.example.service.user.UserService;

/**
 * @Author: Fly
 * @CreateTime: 2025-06-04
 * @Version: 1.0
 */
public class AssetConvertUtils {
    @Resource
    UserService userService;

    // AssetReqVO -> Asset (DO)
    public AssetDo convertToEntity(AssetReqVO reqVO) {
        AssetDo asset = new AssetDo();
        asset.setAssetName(reqVO.getAssetName());
        asset.setAssetNumber(reqVO.getAssetNumber());
        asset.setUserId(reqVO.getUserId());
        asset.setDepartment(reqVO.getDepartment());
        asset.setProductionDate(reqVO.getProductionDate());
        asset.setLocation(reqVO.getLocation());
        return asset;
    }

    /**
     * 将 AssetDo 转换为 AssetRespVO（含用户信息）
     *
     * @param asset       资产实体类
     * @param userService 用户服务（用于查询用户信息）
     */
    public static AssetRespVO convertToRespVO(AssetDo asset, UserService userService) {
        if (asset == null) {
            return null;
        }

        AssetRespVO respVO = new AssetRespVO();
        respVO.setId(asset.getId());
        respVO.setAssetName(asset.getAssetName());
        respVO.setAssetNumber(asset.getAssetNumber());
        respVO.setDepartment(asset.getDepartment());
        respVO.setProductionDate(asset.getProductionDate());
        respVO.setLocation(asset.getLocation());
        respVO.setMessage("获取资产信息成功");
        respVO.setSuccess(true);

        // 处理用户信息（解耦逻辑，可复用）
        setUserInfo(respVO, asset, userService);
        return respVO;
    }

    /**
     * 单独处理用户信息的方法（可复用）
     */
    private static void setUserInfo(AssetRespVO respVO, AssetDo asset, UserService userService) {
        if (asset.getUserId() != null) {
            UserDo user = userService.getUserById(asset.getUserId());
            if (user != null) {
                respVO.setUser(UserConvertUtils.toRepVO(user)); // 复用用户转换逻辑
            }
        }
    }

}
