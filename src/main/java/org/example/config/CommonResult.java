package org.example.config;

import lombok.Data;

import java.io.Serializable;

/**
 * @Author: Fly
 * @CreateTime: 2024-11-18
 * @Version: 1.0
 * @Description: 全局统一响应类
 */
@Data
public class CommonResult<T> implements Serializable {
    /**
     * 错误码
     */
    private int code;
    /**
     * 返回数据
     */
    private T data;
    /**
     * 错误信息
     */
    private String msg;

    /**
     * success
     */
    public static <T> CommonResult<T> success(T data) {
        CommonResult<T> result = new CommonResult<T>();
        result.code = GlobalErrorCodeConstants.SUCCESS.getCode();
        result.data = data;
        result.msg = "";
        return result;
    }

    /**
     * success
     */
    public static <T> CommonResult<T> success(T data, String msg) {
        CommonResult<T> result = new CommonResult<T>();
        result.code = GlobalErrorCodeConstants.SUCCESS.getCode();
        result.data = data;
        result.msg = msg;
        return result;
    }

    /**
     * error
     */
    public static <T> CommonResult<T> error(int code, String msg) {
        if (GlobalErrorCodeConstants.SUCCESS.getCode() == code) {
            throw new IllegalArgumentException(msg);
        }
        CommonResult<T> result = new CommonResult<T>();
        result.code = code;
        result.msg = msg;
        return result;
    }
}
