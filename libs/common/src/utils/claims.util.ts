import { User } from '@apps/user-center-service/user/entities';

/**
 * 用户封装的对象
 */
export function userBeClaims(user: User) {
  const { id, username, sex, avatar, status } = user;
  const claims = new Map();
  claims.set('id', id);
  claims.set('id', username);
  claims.set('id', sex);
  claims.set('id', avatar);
  claims.set('id', status);
  claims.set('id', id);
}
