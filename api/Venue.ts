/// 场地相关接口

export interface Result {
    code: number;
    data: string;
    message: string;

    [property: string]: any;
}

export interface createForm {
    name: string;
    location: string;
    capacity: number;
    pricePerHour: number;
    description: string;
    image: File;
    status: 'available' | 'unavailable' | '';
}

/**
 * 创建场地
 * @param data 场地创建信息
 */
export function create(data: createForm) {
    let formData = new FormData();
    formData.append('name', data.name);
    formData.append('location', data.location);
    formData.append('capacity', data.capacity + '');
    formData.append('pricePerHour', data.pricePerHour + "");
    formData.append('description', data.description);
    formData.append('image', data.image);
    formData.append('status', data.status);
    return useAxios().post<Result>('/venue/add', formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    })
}

/**
 * 删除场地
 * @param id 删除场地的id
 */
export function del(id: number | string) {
    return useAxios().delete<Result>('/venue/delete/' + id);
}

/**
 * 修改场地信息
 * @param id 被修改场地的ID
 * @param data 场地数据
 */
export function update(id: string | number, data: createForm) {
    let formData = new FormData();
    formData.append('name', data.name);
    formData.append('location', data.location);
    formData.append('capacity', data.capacity + '');
    formData.append('pricePerHour', data.pricePerHour + "");
    formData.append('description', data.description);
    formData.append('image', data.image);
    formData.append('status', data.status);
    formData.append('venueID', id + '');
    return useAxios().put<Result>('/venue/update', formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    })
}

/**
 * 预定信息
 */
export interface BookInfoResult {
    code: number;
    data: BookInfo[];
    message: string;

    [property: string]: any;
}

export interface BookInfo {
    bookingDate?: string;
    bookingDateEnd?: string;
    bookingID?: number;
    status?: string;
    totalAmount?: number;
    userID?: number;
    venueID?: number;

    [property: string]: any;
}

export interface CreateBookForm {
    venueID: number;
    startDate: string;
    endDate: string;
}

/**
 * 查询场地某一时间段的预定信息
 * @param data 场地时间段
 */
export function findBookInfo(data: CreateBookForm) {
    return useAxios().post<BookInfoResult>('/venue-booking/availability', data);
}


export interface SearchListForm {
    id?: number;
    name?: string;
    location?: string;
    capacity?: string;
    pricePerHour?: number;
    minPrice?: number;
    maxPrice?: number;
    status?: 'unavailable' | 'available' | '';
}

/**
 * 场地模糊查询列表
 */
export interface VenueListResult {
    code: number;
    data: VenueItem[];
    message: string;

    [property: string]: any;
}

export interface VenueItem {
    capacity: number;
    createdAt: string;
    description: string;
    imageUrl: string;
    location: string;
    name: string;
    pricePerHour: number;
    status: string;
    updatedAt: string;
    venueID: number;

    [property: string]: any;
}

/**
 * 模糊查询场地数据
 * @param data 查询数据
 */
export function list(data: SearchListForm) {
    return useAxios().post<VenueListResult>('/venue/search', data);
}

export function getImgUrl(name: string) {
    return useAxios().getUri() + '' + name;
}

/// 预定相关接口

export interface AddBookForm {
    userID: number,
    venueID: number,
    bookingDate: string,
    bookingDateEnd: string,
    status: "pending" | "confirmed" | "cancelled"
}

/**
 * 新增预定场地
 * @param data 预定信息
 */
export function createBook(data: AddBookForm) {
    console.log("创建预约", data);
    return useAxios().post<Result>('/venue-booking/add', data);
}

export interface UpdateBookForm {
    bookingID: string;
    venueID: number;
    bookingDate: string;
    bookingDateEnd: string;
    status: "pending" | "confirmed" | "cancelled";
}

/**
 * 更新预定信息
 * @param data 预定信息
 */
export function updateBook(data: UpdateBookForm) {
    return useAxios().put<Result>('/venue-booking/update', data);
}

export class SearchBookListForm {
    status?: "pending" | "confirmed" | "cancelled" | '';
    startDate?: string | null;
    endDate?: string | null;
    venueName?: string;
    page?: number = 1;
    size?: number = 15;
}

/**
 * 预定信息列表返回
 */
export interface BookListResult {
    code: number;
    data: BookItem[];
    message: string;

    [property: string]: any;
}

export interface BookItem {
    bookingDate?: string;
    bookingDateEnd?: string;
    bookingID?: number;
    capacity?: number;
    imageUrl?: string;
    location?: string;
    pricePerHour?: number;
    status?: string;
    totalAmount?: number;
    userID?: number;
    venueID?: number;
    venueName?: string;

    [property: string]: any;
}

/**
 * 模糊查询预定信息列表
 * @param data 搜索信息
 */
export function listBooks(data: SearchBookListForm) {
    console.log(data);

    return useAxios().post<BookListResult>('/venue-booking/search', data);
}

/**
 * 删除预定信息
 * @param id 预定ID
 */
export function delBook(id: string | number) {
    return useAxios().delete<Result>('/venue-booking/delete/' + id);
}