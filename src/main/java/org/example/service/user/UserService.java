package org.example.service.user;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import org.example.dal.dataobj.user.UserDo;
import org.example.dal.dataobj.user.vo.UserReqVO;
import org.example.dal.dataobj.user.vo.UserRespVO;

import java.util.List;

public interface UserService  {
    UserRespVO register(UserReqVO reqVO);
    UserRespVO login(UserReqVO reqVO);
    UserDo getUserById(Integer id);

}
