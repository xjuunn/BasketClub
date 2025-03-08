export interface Result {
    code: number;
    data: string;
    message: string;
    [property: string]: any;
}

export interface CreateForm {
    userID: number;
    feedbackType: '问题报告' | '投诉' | '建议';
    content: string;
    status: 'pending' | 'resolved' | 'dismissed';
}

/**
 * 创建用户反馈数据
 * @param data 反馈数据
 */
export function create(data: CreateForm) {
    return useAxios().post<Result>('/user-feedback/add', data);
}

export interface UpdateForm {
    feedbackID: number;
    status: 'pending' | 'resolved' | 'dismissed';
    response: string;
}

/**
 * 修改反馈数据
 * @param data 反馈修改数据
 */
export function update(data: UpdateForm) {
    return useAxios().put<Result>('/user-feedback/update', data);
}

/**
 * 删除用户反馈
 * @param id 反馈ID
 */
export function del(id: string | number) {
    return useAxios().delete<Result>('/user-feedback/delete/' + id);
}

export interface SearchForm {
    userID?: number;
    feedbackType?: '问题报告' | '投诉' | '建议';
    status?: 'pending' | 'resolved' | 'dismissed';
    keyword?: string;
    startDate?: string;
    endDate?: string;
    page?: number;
    size?: number;
}

/**
 * 用户反馈
 */
export interface FeedBackResult {
    code: number;
    data: FeedBackList;
    message: string;
    [property: string]: any;
}

export interface FeedBackList {
    list: FeedBackListItem[];
    page: number;
    size: number;
    total: number;
    [property: string]: any;
}

export interface FeedBackListItem {
    content?: string;
    createdAt?: string;
    feedbackID?: number;
    feedbackType?: string;
    response?: null;
    status?: string;
    updatedAt?: string;
    userAvatar?: null;
    userID?: number;
    username?: null;
    [property: string]: any;
}

/**
 * 搜索反馈列表
 * @param data 搜索数据
 */
export function list(data: SearchForm) {
    return useAxios().post<FeedBackResult>('/user-feedback/advanced-search', data);
}