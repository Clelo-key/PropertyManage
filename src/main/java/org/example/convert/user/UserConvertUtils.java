package org.example.convert.user;

import org.example.dal.dataobj.user.UserDo;
import org.example.dal.dataobj.user.vo.UserRepVO;
import org.example.dal.dataobj.user.vo.UserRespVO;

public class UserConvertUtils {
    /**
     * 将 UserDO 转换为 UserRespVO
     */
    public static UserRespVO convertToRespVO(UserDo userDO) {
        if (userDO == null) {
            return null;
        }
        UserRespVO respVO = new UserRespVO();
        respVO.setId(userDO.getId());
        respVO.setUsername(userDO.getUsername());
        respVO.setEmail(userDO.getEmail());
        respVO.setCreateTime(userDO.getCreateTime());
        respVO.setSuccess(true);
        respVO.setMessage("获取用户信息成功");
        return respVO;
    }

    /**
     * 将 UserRespVO 转换为 UserDO（谨慎使用）
     */
    public static UserDo convertToDO(UserRespVO respVO) {
        if (respVO == null) {
            return null;
        }
        UserDo userDO = new UserDo();
        userDO.setId(respVO.getId());
        userDO.setUsername(respVO.getUsername());
        userDO.setEmail(respVO.getEmail());
        userDO.setCreateTime(respVO.getCreateTime());
        return userDO;
    }

    public static UserRepVO toRepVO(UserDo user) {
        if (user == null) {
            return null;
        }
        UserRepVO vo = new UserRepVO();
        vo.setId(user.getId());
        vo.setUsername(user.getUsername());
        vo.setEmail(user.getEmail());
        return vo;
    }
}