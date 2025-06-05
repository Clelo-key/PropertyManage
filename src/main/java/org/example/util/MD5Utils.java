package org.example.util;

import org.springframework.util.DigestUtils;

/**
 * @Author: Fly
 * @CreateTime: 2025-06-04
 * @Version: 1.0
 */
public class MD5Utils {
    public static String encrypt(String password) {
        return DigestUtils.md5DigestAsHex(password.getBytes());
    }
}
