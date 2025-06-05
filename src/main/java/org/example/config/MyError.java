package org.example.config;

import lombok.Getter;

/**
 * @Author: Fly
 * @CreateTime: 2024-11-19
 * @Version: 1.0
 */
@Getter
public class MyError extends RuntimeException{
    private final int code;
    private final String message;

    public MyError(ErrorCode error) {
        super(error.getMsg());
        this.message = error.getMsg();
        this.code=error.getCode();
    }
}
