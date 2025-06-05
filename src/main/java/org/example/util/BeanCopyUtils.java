package org.example.util;

/**
 * @Author: Fly
 * @CreateTime: 2025-06-04
 * @Version: 1.0
 */

import org.springframework.beans.BeanWrapper;
import org.springframework.beans.BeanWrapperImpl;
import org.springframework.beans.BeansException;
import org.springframework.beans.FatalBeanException;
import org.springframework.util.Assert;
import org.springframework.util.ClassUtils;

import java.beans.PropertyDescriptor;
import java.lang.reflect.Method;
import java.lang.reflect.Modifier;
import java.util.*;

public class BeanCopyUtils {

    /**
     * 对象属性复制，忽略 null 值
     *
     * @param source 源对象
     * @param target 目标对象
     */
    public static void copyProperties(Object source, Object target) {
        copyProperties(source, target, true);
    }

    /**
     * 对象属性复制
     *
     * @param source     源对象
     * @param target     目标对象
     * @param ignoreNull 是否忽略 null 值
     */
    public static void copyProperties(Object source, Object target, boolean ignoreNull) {
        Assert.notNull(source, "Source must not be null");
        Assert.notNull(target, "Target must not be null");

        Class<?> actualEditable = target.getClass();
        PropertyDescriptor[] targetPds = org.springframework.beans.BeanUtils.getPropertyDescriptors(actualEditable);

        for (PropertyDescriptor targetPd : targetPds) {
            Method writeMethod = targetPd.getWriteMethod();
            if (writeMethod != null) {
                PropertyDescriptor sourcePd = org.springframework.beans.BeanUtils.getPropertyDescriptor(source.getClass(), targetPd.getName());
                if (sourcePd != null && sourcePd.getReadMethod() != null) {
                    try {
                        Method readMethod = sourcePd.getReadMethod();
                        if (!Modifier.isPublic(readMethod.getDeclaringClass().getModifiers())) {
                            readMethod.setAccessible(true);
                        }
                        Object value = readMethod.invoke(source);

                        // 忽略 null 值
                        if (ignoreNull && value == null) {
                            continue;
                        }

                        if (!Modifier.isPublic(writeMethod.getDeclaringClass().getModifiers())) {
                            writeMethod.setAccessible(true);
                        }
                        writeMethod.invoke(target, value);
                    } catch (Throwable ex) {
                        throw new FatalBeanException(
                                "Could not copy property '" + targetPd.getName() + "' from source to target", ex);
                    }
                }
            }
        }
    }

    /**
     * 对象属性复制，返回新对象
     *
     * @param source      源对象
     * @param targetClass 目标类
     * @param <T>         目标类型
     * @return 复制后的新对象
     */
    public static <T> T copy(Object source, Class<T> targetClass) {
        if (source == null) {
            return null;
        }
        try {
            T target = targetClass.getDeclaredConstructor().newInstance();
            copyProperties(source, target);
            return target;
        } catch (Exception e) {
            throw new RuntimeException("对象拷贝失败: " + e.getMessage(), e);
        }
    }

    /**
     * 集合对象属性复制
     *
     * @param sourceList  源集合
     * @param targetClass 目标类
     * @param <T>         目标类型
     * @return 复制后的新集合
     */
    public static <T> List<T> copyList(List<?> sourceList, Class<T> targetClass) {
        if (sourceList == null || sourceList.isEmpty()) {
            return Collections.emptyList();
        }
        List<T> result = new ArrayList<>(sourceList.size());
        for (Object source : sourceList) {
            result.add(copy(source, targetClass));
        }
        return result;
    }

    /**
     * 获取对象中所有 null 属性的名称
     *
     * @param source 源对象
     * @return null 属性名称数组
     */
    public static String[] getNullPropertyNames(Object source) {
        final BeanWrapper src = new BeanWrapperImpl(source);
        PropertyDescriptor[] pds = src.getPropertyDescriptors();

        Set<String> emptyNames = new HashSet<>();
        for (PropertyDescriptor pd : pds) {
            Object srcValue = src.getPropertyValue(pd.getName());
            if (srcValue == null) {
                emptyNames.add(pd.getName());
            }
        }
        String[] result = new String[emptyNames.size()];
        return emptyNames.toArray(result);
    }
}