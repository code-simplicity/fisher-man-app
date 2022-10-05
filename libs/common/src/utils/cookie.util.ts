import { Request, Response } from 'express';

// 1年
export const default_age = 60 * 60 * 24 * 365;

/**
 * cookie工具
 */
/**
 * 设置cookie
 * @param response
 * @param key
 * @param value
 */
export function setUpCookie(response: Response, key: string, value: string) {
  // 设置cookie
  response.cookie(key, value, { maxAge: default_age });
}

/**
 * 删除cookie
 * @param response
 * @param key
 */
export function deleteCookie(response: Response, key: string) {
  response.cookie(key, null);
}

/**
 * 获取cookie
 * @param request
 * @param key
 */
export function getCookie(request: Request, key: string) {
  // 直接返回这个cookie
  return request.cookies[key];
}
