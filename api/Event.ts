/// 赛事相关接口

export interface Result {
    code: number;
    data: string;
    message: string;
    [property: string]: any;
}

export interface CreateEventForm {
    name: string;
    description: string;
    startDate: Date;
    endDate: Date;
    location: string;
    status: 'upcoming' | 'ongoing' | 'finished';
    image: File;
}

/**
 * 新增赛事
 * @param data 赛事信息
 */
export function create(data: CreateEventForm) {
    let formData = new FormData();
    formData.append('name', data.name)
    formData.append('description', data.description)
    formData.append('startDate', data.startDate.toLocaleString())
    formData.append('endDate', data.endDate.toLocaleString())
    formData.append('location', data.location)
    formData.append('status', data.status)
    formData.append('image', data.image)
    return useAxios().post<Result>('/event/add', data, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });
}

/**
 * 修改赛事信息
 * @param id 赛事ID
 * @param data 赛事信息
 */
export function update(id: number | string, data: CreateEventForm) {
    let formData = new FormData();
    formData.append('name', data.name);
    formData.append('description', data.description);
    formData.append('startDate', data.startDate.toLocaleString());
    formData.append('endDate', data.endDate.toLocaleString());
    formData.append('location', data.location);
    formData.append('status', data.status);
    formData.append('image', data.image);
    formData.append('eventID', id + '');
    return useAxios().put<Result>('/event/update', data, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    })
}

/**
 * 删除赛事
 * @param id 赛事ID
 */
export function del(id: string | number) {
    return useAxios().delete<Result>('/event/delete/' + id);
}

export interface SearchEventForm {
    name?: string;
    location?: string;
    status?: 'upcoming' | 'ongoing' | 'finished';
    startDate?: Date;
    endDate?: Date;
    page?: number;
    size?: number;
}

/**
 * 赛事列表
 */
export interface EventListResult {
    code: number;
    data: EventItem[];
    message: string;
    [property: string]: any;
}

export interface EventItem {
    createdAt: string;
    description: string;
    endDate: string;
    eventID: number;
    imageUrl: string;
    location: string;
    name: string;
    startDate: string;
    status: string;
    updatedAt: string;
    views: null;
    [property: string]: any;
}

/**
 * 模糊搜索赛事信息
 * @param data 赛事搜索数据
 */
export function list(data: SearchEventForm) {
    return useAxios().post<EventListResult>('/event/search', data);
}

/**
 * 热门赛事
 */
export interface HotEventResult {
    code: number;
    data: HotEventItem[];
    message: string;
    [property: string]: any;
}

export interface HotEventItem {
    createdAt: string;
    description: string;
    endDate: string;
    eventID: number;
    imageUrl: string;
    location: string;
    name: string;
    startDate: string;
    status: string;
    updatedAt: string;
    views: number;
    [property: string]: any;
}

/**
 * 获取浏览量最高的五个赛事
 */
export function hotEvent() {
    return useAxios().get<HotEventResult>('/event/top-five-views');
}

/**
 * 赛事浏览量+1
 * @param id 赛事ID
 */
export function addView(id: number | string) {
    return useAxios().post<Result>('/event/increment-views/' + id);
}

export interface EventRegisterForm {
    userID: number;
    eventID: number;
    registrationDate: Date;
}

/**
 * 用户报名
 * @param data 报名信息
 */
export function register(data: EventRegisterForm) {
    return useAxios().post<Result>('/event-registration/add', data);
}

/**
 * 是否报名Result
 */
export interface IsRegistedResult {
    code: number;
    data?: isRegisted;
    message: string;
    [property: string]: any;
}

export interface isRegisted {
    eventID: number;
    registrationDate: string;
    registrationID: number;
    status: string;
    userID: number;
    [property: string]: any;
}

/**
 * 检测用户是否报名这个比赛
 * @param userID 用户ID
 * @param eventID 比赛ID
 */
export function isRegisted(userID: string | number, eventID: string | number) {
    return useAxios().post<IsRegistedResult>('/event-registration/check-registration', {
        userID, eventID
    })
}

/**
 * 报名用户
 */
export interface EventUserResult {
    code: number;
    data: EventUser[];
    message: string;
    [property: string]: any;
}

export interface EventUser {
    avatar?: string;
    eventEndDate?: string;
    eventImageUrl?: string;
    eventLocation?: string;
    eventName?: string;
    eventStartDate?: string;
    eventViews?: number;
    registrationDate?: string;
    registrationID?: number;
    registrationStatus?: string;
    userID?: number;
    username?: string;
    [property: string]: any;
}

/**
 * 分页查询所有有比赛的用户信息和比赛信息
 * @param page 页码
 * @param size 页面数据量
 */
export function listEventUsers(page: string | number = 1, size: string | number = 15) {
    let formData = new FormData();
    formData.append("page", page + '');
    formData.append("size", size + '');
    return useAxios().post<EventUserResult>('/event-registration/details', formData);
}