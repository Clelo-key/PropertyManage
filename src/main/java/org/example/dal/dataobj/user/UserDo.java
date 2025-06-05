package org.example.dal.dataobj.user;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.Date;

/**
 * @Author: Fly
 * @CreateTime: 2024-11-19
 * @Version: 1.0
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@TableName("users")
public class UserDo {
    @TableId(value = "id", type = IdType.AUTO)
    private Integer id;
    private String username;
    private String password;
    private String email;
    private Date createTime;
}
