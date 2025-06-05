package org.example.dal.mysql.asset;

import com.github.yulichang.base.MPJBaseMapper;
import com.github.yulichang.wrapper.MPJLambdaWrapper;
import org.apache.ibatis.annotations.Mapper;
import org.example.dal.dataobj.asset.AssetDo;
import org.example.dal.dataobj.asset.vo.AssetRespVO;
import org.example.dal.dataobj.user.UserDo;

import java.util.List;

@Mapper
public interface AssetMapper extends MPJBaseMapper<AssetDo> {

    /**
     * 查询所有资产（关联用户信息，使用自定义构造函数映射）
     */
    default List<AssetRespVO> selectAllWithUser() {
        return selectJoinList(
                AssetRespVO.class,
                new MPJLambdaWrapper<AssetDo>()
                        // 选择 AssetDo 字段
                        .select(
                                AssetDo::getId,
                                AssetDo::getAssetName,
                                AssetDo::getAssetNumber,
                                AssetDo::getDepartment,
                                AssetDo::getProductionDate,
                                AssetDo::getLocation
                        )
                        // 选择 UserDo 字段，并指定别名（需与构造函数参数顺序一致）
                        .selectAs(UserDo::getUsername, "username")
                        .selectAs(UserDo::getEmail, "email")
                        // 左关联用户表
                        .leftJoin(UserDo.class, UserDo::getId, AssetDo::getUserId)
        );
    }

    /**
     * 根据条件搜索资产（关联用户信息）
     */
    default List<AssetRespVO> searchWithUser(String assetName, String assetNumber) {
        System.out.println(assetNumber);
        return selectJoinList(
                AssetRespVO.class,
                new MPJLambdaWrapper<AssetDo>()
                        .select(
                                AssetDo::getId,
                                AssetDo::getAssetName,
                                AssetDo::getAssetNumber,
                                AssetDo::getDepartment,
                                AssetDo::getProductionDate,
                                AssetDo::getLocation
                        )
                        .selectAs(UserDo::getUsername, "username")  // 映射到构造函数参数
                        .selectAs(UserDo::getEmail, "email")        // 映射到构造函数参数
                        .leftJoin(UserDo.class, UserDo::getId, AssetDo::getUserId)
                        .like(assetName != null, AssetDo::getAssetName, assetName)
                        .or() // 添加 or 条件
                        .like(assetNumber != null, AssetDo::getAssetNumber, assetNumber)
        );
    }

    /**
     * 根据ID查询资产（关联用户信息）
     */
    default AssetRespVO selectByIdWithUser(Integer id) {
        return selectJoinOne(
                AssetRespVO.class,
                new MPJLambdaWrapper<AssetDo>()
                        .select(
                                AssetDo::getId,          // Asset.id
                                AssetDo::getAssetName,
                                AssetDo::getAssetNumber,
                                AssetDo::getDepartment,
                                AssetDo::getProductionDate,
                                AssetDo::getLocation,
                                AssetDo::getUserId        // 新增：获取 AssetDo.userId（外键）
                        )
                        .selectAs(UserDo::getId, "userId")       // 选择 UserDo.id，别名 "userId"
                        .selectAs(UserDo::getUsername, "username") // UserDo.username
                        .selectAs(UserDo::getEmail, "email")       // UserDo.email
                        .leftJoin(UserDo.class, UserDo::getId, AssetDo::getUserId) // 通过 UserDo.id 关联
                        .eq(AssetDo::getId, id)
        );
    }
}
