package org.example.dal.dataobj.asset;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

/**
 * @Author: Fly
 * @CreateTime: 2025-06-04
 * @Version: 1.0
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@TableName("assets")
public class AssetDo {
    @TableId(value = "id", type = IdType.AUTO)
    private Integer id;
    private String assetName;
    private String assetNumber;
    private Integer userId;
    private String department;
    private Date productionDate;
    private String location;
}
