/**
 * 权限集合类型
 */
export interface permissionsType<T, V> {
  [V: string]: permissionsTypeOptions<T, V>;
}

export interface permissionsTypeOptions<T, V> {
  [V: string]: permissionsTypeOptions<T, V>;
}
