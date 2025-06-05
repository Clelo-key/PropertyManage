package org.example.service.asset;

import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import jakarta.annotation.Resource;
import org.example.config.BusinessException;
import org.example.dal.dataobj.asset.AssetDo;
import org.example.dal.dataobj.asset.vo.AssetReqVO;
import org.example.dal.dataobj.asset.vo.AssetRespVO;
import org.example.dal.mysql.asset.AssetMapper;
import org.example.dal.mysql.user.UserMapper;
import org.example.util.BeanCopyUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Objects;

/**
 * @Author: Fly
 * @CreateTime: 2025-06-04
 * @Version: 1.0
 */
@Service
public class AssetServiceImpl implements AssetService {
    @Resource
    AssetMapper assetMapper;
    @Resource
    UserMapper userMapper;

    @Override
    public List<AssetRespVO> getAllAssets() {
        return assetMapper.selectAllWithUser();
    }

    @Override
    public List<AssetRespVO> searchAssets(String assetName, String assetNumber) {
        return assetMapper.searchWithUser(assetName, assetNumber);
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public AssetRespVO createAsset(AssetReqVO reqVO) {
        // 校验资产编号唯一性
        if (assetMapper.selectCount(Wrappers.<AssetDo>lambdaQuery()
                .eq(AssetDo::getAssetNumber, reqVO.getAssetNumber())) > 0) {
            throw new BusinessException("资产编号已存在");
        }

        // 校验用户是否存在
        if (reqVO.getUserId() != null && userMapper.selectById(reqVO.getUserId()) == null) {
            throw new BusinessException("关联的用户不存在");
        }

        // 转换为DO并保存
        AssetDo assetDo = BeanCopyUtils.copy(reqVO, AssetDo.class);
        assetMapper.insert(assetDo);

        // 返回带用户信息的VO
        return assetMapper.selectByIdWithUser(assetDo.getId());
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public AssetRespVO updateAsset(AssetReqVO reqVO) {
        // 校验资产是否存在
        AssetDo existAsset = assetMapper.selectById(reqVO.getId());
        if (existAsset == null) {
            throw new BusinessException("资产不存在");
        }

        // 校验资产编号唯一性（如果修改了编号）
        if (!Objects.equals(existAsset.getAssetNumber(), reqVO.getAssetNumber()) &&
                assetMapper.selectCount(Wrappers.<AssetDo>lambdaQuery()
                        .eq(AssetDo::getAssetNumber, reqVO.getAssetNumber())
                        .ne(AssetDo::getId, reqVO.getId())) > 0) {
            throw new BusinessException("新的资产编号已存在");
        }

        // 校验用户是否存在（如果修改了用户ID）
        if (reqVO.getUserId() != null &&
                !Objects.equals(existAsset.getUserId(), reqVO.getUserId()) &&
                userMapper.selectById(reqVO.getUserId()) == null) {
            throw new BusinessException("关联的用户不存在");
        }

        // 更新资产信息
        AssetDo assetDo = BeanCopyUtils.copy(reqVO, AssetDo.class);
        assetMapper.updateById(assetDo);

        // 返回更新后的VO
        return assetMapper.selectByIdWithUser(reqVO.getId());
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void deleteAsset(Integer id) {
        // 校验资产是否存在
        if (assetMapper.selectById(id) == null) {
            throw new BusinessException("资产不存在");
        }
        // 执行删除
        assetMapper.deleteById(id);
    }

    @Override
    public AssetRespVO getAssetById(Integer id) {
        return assetMapper.selectByIdWithUser(id);
    }
}
