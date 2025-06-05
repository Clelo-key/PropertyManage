package org.example.dal.dataobj.asset.vo;

import com.baomidou.mybatisplus.annotation.TableField;
import lombok.Data;
import org.example.dal.dataobj.user.vo.UserRepVO;

import java.util.Date;

/**
 * @Author: Fly
 * @CreateTime: 2025-06-04
 * @Version: 1.0
 */
@Data
public class AssetRespVO {
    private Integer id;
    private String assetName;
    private String assetNumber;
    private UserRepVO user;
    private String department;
    private Date productionDate;
    private String location;
    private String message;
    private Boolean success = true;

    // 临时字段，接收联查结果中的 username 和 email
    @TableField("id")
    private Integer userId;

    @TableField("username")
    private String username;

    @TableField("email")
    private String email;

    // 自定义构造函数，用于接收数据库查询结果并初始化嵌套对象
    public AssetRespVO(
            Integer id,
            String assetName,
            String assetNumber,
            Integer userId,       // 对应联查别名 "userId"（UserDo.id）
            String username,      // 对应联查别名 "username"（UserDo.username）
            String email,         // 对应联查别名 "email"（UserDo.email）
            String department,
            Date productionDate,
            String location
    ) {
        this.id = id;
        this.assetName = assetName;
        this.assetNumber = assetNumber;
        this.department = department;
        this.productionDate = productionDate;
        this.location = location;

        if (username != null || email != null) {
            this.user = new UserRepVO();
            this.user.setId(userId);       // 使用联查得到的 userId（UserDo.id）
            this.user.setUsername(username);
            this.user.setEmail(email);
        }
    }

    // 无参构造函数（反序列化需要）
    public AssetRespVO() {
    }
}
