package org.example.dal.dataobj.user.vo;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.example.dal.dataobj.user.UserDo;

import java.time.format.DateTimeFormatter;
import java.util.Date;

/**
 * @Author: Fly
 * @CreateTime: 2025-06-04
 * @Version: 1.0
 */
@EqualsAndHashCode(callSuper = true)
@Data
public class UserRespVO extends UserDo {
    private Integer id;               // 用户ID
    private String username;          // 用户名
    private String email;             // 邮箱
    private Date createTime;          // 注册时间
    private String message;           // 操作消息（如"注册成功"）
    private Boolean success = true;   // 操作结果
}
