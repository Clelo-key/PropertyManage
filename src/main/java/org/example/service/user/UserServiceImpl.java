package org.example.service.user;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.IService;
import jakarta.annotation.Resource;
import org.example.config.ErrorCode;
import org.example.config.MyError;
import org.example.convert.user.UserConvertUtils;
import org.example.dal.dataobj.user.UserDo;
import org.example.dal.dataobj.user.vo.UserReqVO;
import org.example.dal.dataobj.user.vo.UserRespVO;
import org.example.dal.mysql.user.UserMapper;
import org.example.util.MD5Utils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static org.example.config.GlobalErrorCodeConstants.*;

/**
 * @Author: Fly
 * @CreateTime: 2025-06-04
 * @Version: 1.0
 */
@Service
@Transactional
public class UserServiceImpl implements UserService {
    @Resource
    UserMapper userMapper;

    @Override
    @Transactional
    public UserRespVO register(UserReqVO reqVO) {
        // 1. 校验用户名是否已存在
        if (userMapper.selectByUsername(reqVO.getUsername()) != null) {
            throw new MyError(new ErrorCode(USER_EXISTED));
        }

        // 2. 创建用户DO（手动转换）
        UserDo userDo = new UserDo();
        userDo.setUsername(reqVO.getUsername());
        userDo.setEmail(reqVO.getEmail());
        userDo.setPassword(MD5Utils.encrypt(reqVO.getPassword())); // 加密后存储

        // 3. 密码加密
        userDo.setPassword(MD5Utils.encrypt(reqVO.getPassword()));

        // 4. 插入数据库
        userMapper.insert(userDo);

        // 5. 转换为RespVO并返回
        return UserConvertUtils.convertToRespVO(userDo);
    }

    @Override
    public UserRespVO login(UserReqVO reqVO) {
        // 1. 查询用户
        UserDo userDo = userMapper.selectByUsername(reqVO.getUsername());

        // 2. 校验用户是否存在
        if (userDo == null) {
            throw new MyError(new ErrorCode(USER_NOT_FUND));
        }

        // 3. 校验密码
        if (!MD5Utils.encrypt(reqVO.getPassword()).equals(userDo.getPassword())) {
            throw new MyError(new ErrorCode(USER_NOT_FUND));

        }
        return UserConvertUtils.convertToRespVO(userDo);
    }

    @Override
    public UserDo getUserById(Integer id) {
        UserDo userDo = userMapper.selectById(id);
        if (userDo == null) {
            throw new MyError(new ErrorCode(USER_NOT_FUND));
        }
        return userDo;
    }
}
