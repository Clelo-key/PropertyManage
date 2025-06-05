package org.example.dal.dataobj.user.vo;

import lombok.Data;

/**
 * @Author: Fly
 * @CreateTime: 2025-06-04
 * @Version: 1.0
 * @Description: 用户简化VO - 用于在资产信息中嵌套显示用户信息
 */
@Data
public class UserRepVO {
    private Integer id;               // 用户ID
    private String username;          // 用户名
    private String email;             // 邮箱
}