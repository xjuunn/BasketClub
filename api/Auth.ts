
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
export function test() {
  return useAxios().get<String>('/user/Welcome');
}

export function login(username: string, password: string) {
  return useAxios().post<UserLoginDTO>('/user/login', { username, password })
}

export function register(username: string, password: string, avatar: File, gender: number = 0) {
  console.log(username, password, avatar);

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