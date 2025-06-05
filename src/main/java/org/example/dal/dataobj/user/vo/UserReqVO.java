package org.example.dal.dataobj.user.vo;

import jakarta.validation.constraints.*;
import lombok.Data;

import java.util.Date;

/**
 * @Author: Fly
 * @CreateTime: 2025-06-04
 * @Version: 1.0
 */
@Data
public class UserReqVO {
    @NotBlank(message = "用户名不能为空")
    @Size(min = 3, max = 20, message = "用户名长度需在3-20个字符之间")
    private String username;

    @NotBlank(message = "密码不能为空")
    @Pattern(
            regexp = "^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{6,20}$",
            message = "密码需包含字母和数字，长度为6-20位"
    )
    private String password;

    @NotBlank(message = "邮箱不能为空")
    @Email(message = "邮箱格式不正确")
    private String email;
}
