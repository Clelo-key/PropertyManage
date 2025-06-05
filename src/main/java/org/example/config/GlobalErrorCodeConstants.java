package org.example.config;

import lombok.AllArgsConstructor;
import lombok.Getter;

/**
 * @Author: Fly
 * @CreateTime: 2024-11-19
 * @Version: 1.0
 */
@Getter
@AllArgsConstructor
public enum GlobalErrorCodeConstants {
    SUCCESS(0, "成功"),
    /**
     * 客户端错误
     * */
    BAD_REQUEST(400, "Bad Request"),
    NOT_FOUND(404,"请求为找到"),
    USER_NOT_FUND(405,"用户不存在"),
    USER_EXISTED(406,"用户已存在"),

    /**
     * 服务端错误
     * */
    INTERNAL_SERVER_ERROR(501,"参数错误"),
    NULL_POINT_ERROR(502,"系统异常"),

    /**
     * 自定义错误
     **/
    UNKNOWN(999,"未知错误"),
    ;

    private final int code;
    private final String message;

}
