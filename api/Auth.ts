
export interface UserLoginDTO {
  code: number;
  data: Data;
  message: string;
  [property: string]: any;
}

export interface Data {
  token: string;
  user: User;
  [property: string]: any;
}

/** 用户 */
export interface User {
  avatar?: string;
  balance?: number;
  createdAt?: string;
  gender?: number;
  membershipLevel?: number;
  password?: null;
  points?: number;
  role?: number;
  userID?: number;
  username?: string;
  [property: string]: any;
}
/**
 * 测试
 */
export function test() {
  return useAxios().get<String>('/user/Welcome');
}

/**
 * 用户登录
 * @param username 用户名
 * @param password 密码
 */
export function login(username: string, password: string) {
  return useAxios().post<UserLoginDTO>('/user/login', { username, password })
}

/**
 * 注册用户
 * @param username 用户名
 * @param password 密码
 * @param avatar 头像文件
 * @param gender 性别
 */
export function register(username: string, password: string, avatar: File, gender: number = 0) {
  let formData = new FormData();
  formData.append('username', username);
  formData.append('password', password);
  formData.append('avatar', avatar);
  formData.append('gender', gender + "");
  return useAxios().post('/user/register', formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });
}

export interface ResultString {
  code: number;
  message: string;
  data: string;
}

/**
 * 更新用户信息
 * @param user 用户信息 
 */
export function update(user: FormUpdate) {
  let formData = new FormData();
  formData.append('username', user.username);
  if (user.avatar) formData.append('avatar', user.avatar);
  if (user.gender) formData.append('gender', user.gender + "");
  if (user.password) formData.append("password", user.password);
  return useAxios().put<ResultString>('/user/updatePersonalInfo', formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  })
}

/** 更新用户表单 */
export interface FormUpdate {
  username: string;
  password?: string;
  gender?: number;
  avatar?: File;
}

/**
 * 模糊搜索返回DTO
 */
export interface ListUsers {
  code: number;
  data: Datum[];
  message: string;
  [property: string]: any;
}

export interface Datum {
  avatar?: string;
  balance?: number;
  createdAt?: string;
  gender?: number;
  membershipLevel?: number;
  password?: string;
  points?: number;
  role?: number;
  userID?: number;
  username?: string;
  [property: string]: any;
}

export class FormList {
  role?: number;
  gender?: number;
  membershipLevel?: number;
  username?: string;
  page?: number = 1;
  size?: number = 15;

}

/**
 * 模糊分页查询用户列表 
 * @param form 查询表单
 */
export function list(form: FormList) {
  return useAxios().post<ListUsers>('/user/search', form);
}

export interface UpdateBanlance {
  username: string;
  points?: number;
  balance?: number;
}
/**
 * 更新用户金额和积分
 * @param form 更新数据
 */
export function updateBalance(form: UpdateBanlance) {
  return useAxios().put<ResultString>('/user/updatePointsAndBalance', form);
}

/**
 * 删除用户
 * @param id 用户id
 */
export function del(id: number | string) {
  return useAxios().delete<ResultString>('/user/delete/' + id);
}

export function getAvatar(avatarurl: string) {
  return useAxios().getUri() + '' + avatarurl
}