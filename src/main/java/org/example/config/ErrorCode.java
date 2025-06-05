package org.example.config;

import lombok.Data;

/**
 * @Author: Fly
 * @CreateTime: 2024-11-18
 * @Version: 1.0
 * @Description: 错误码
 */
@Data
public class ErrorCode{
    private final int code;
    private final String msg;

    public ErrorCode(Integer code, String message) {
        this.code = code;
        this.msg = message;
    }
    public ErrorCode(GlobalErrorCodeConstants errorCode) {
        this.code = errorCode.getCode();
        this.msg = errorCode.getMessage();
    }


}
