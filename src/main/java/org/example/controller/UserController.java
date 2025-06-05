package org.example.controller;

import jakarta.annotation.Resource;
import jakarta.validation.Valid;
import org.example.config.CommonResult;
import org.example.config.ErrorCode;
import org.example.config.MyError;
import org.example.dal.dataobj.user.UserDo;
import org.example.dal.dataobj.user.vo.UserReqVO;
import org.example.dal.dataobj.user.vo.UserRespVO;
import org.example.service.user.UserService;
import org.springframework.web.bind.annotation.*;


import static org.example.config.CommonResult.success;

/**
 * @Author: Fly
 * @CreateTime: 2024-11-18
 * @Version: 1.0
 */
@RestController
@RequestMapping("/user")
public class UserController {
    @Resource
    UserService userService;

    @PostMapping("/register")
    public CommonResult<UserRespVO> register(@Valid @RequestBody UserReqVO reqVO) {
        return CommonResult.success(userService.register(reqVO));
    }

    @PostMapping("/login")
    public CommonResult<UserRespVO> login(@Valid @RequestBody UserReqVO reqVO) {
        return CommonResult.success(userService.login(reqVO));
    }

    @GetMapping("/{id}")
    public CommonResult<UserDo> getUserById(@PathVariable Integer id) {
        return CommonResult.success(userService.getUserById(id));
    }
}
