package org.example.dal.dataobj.asset.vo;


import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Past;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.util.Date;

/**
 * @Author: Fly
 * @CreateTime: 2025-06-04
 * @Version: 1.0
 */
@Data
public class AssetReqVO {
    private Integer id;

    @NotBlank(message = "资产名称不能为空")
    @Size(max = 100, message = "资产名称长度不能超过100个字符")
    private String assetName;

    @NotBlank(message = "资产编号不能为空")
    @Size(max = 50, message = "资产编号长度不能超过50个字符")
    private String assetNumber;

    @NotNull(message = "使用人ID不能为空")
    private Integer userId;

    @Size(max = 100, message = "归属部门长度不能超过100个字符")
    private String department;

    @Past(message = "生产日期必须是过去的日期")
    private Date productionDate;

    @Size(max = 200, message = "存放地点长度不能超过200个字符")
    private String location;
}

