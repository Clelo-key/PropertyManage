package org.example.dal.mysql.user;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Mapper;
import org.example.dal.dataobj.user.UserDo;

@Mapper
public interface UserMapper extends BaseMapper<UserDo> {
    default UserDo selectByUsername(String username) {
        return selectOne(new QueryWrapper<UserDo>().eq("username", username));
    }
}
