export interface Result {
    code: number;
    data: string;
    message: string;
    [property: string]: any;
}

export interface CreateForm {
    name: string;
    description: string;
    price: number;
    stockQuantity: number;
    image: File;
    category: number;
}

/**
 * 创建商品
 * @param data 商品数据
 */
export function create(data: CreateForm) {
    console.log(data);

    let formdata = new FormData();
    formdata.append('name', data.name);
    formdata.append('description', data.description);
    formdata.append('price', data.price + '');
    formdata.append('stockQuantity', data.stockQuantity + '');
    formdata.append('image', data.image);
    formdata.append('category', data.category + '');
    return useAxios().post<Result>('/product/add', data, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    })
}

/**
 * 删除商品
 * @param id 商品id
 */
export function del(id: string | number) {
    return useAxios().delete<Result>('/product/delete/' + id);
}

/**
 * 商品
 */
export interface ProductResult {
    code: number;
    data: ProductItem[];
    message: string;
    [property: string]: any;
}

export interface ProductItem {
    category?: string;
    createdAt?: string;
    description?: string;
    imageUrl?: string;
    name?: string;
    price?: number;
    productID?: number;
    stockQuantity?: number;
    updatedAt?: string;
    [property: string]: any;
}

export class SearchForm {
    name?: string;
    category?: number;
    page: number = 1;
    size: number = 15;
}

/**
 * 搜索商品
 * @param data 搜索数据
 */
export function list(data: SearchForm) {
    let formdata = new FormData();
    if (data.name)
        formdata.append('name', data.name);
    if (data.category)
        formdata.append('category', data.category + '')
    formdata.append('page', data.page + '');
    formdata.append('size', data.size + '');
    return useAxios().post<ProductResult>('/product/search', formdata);
}

export interface UpdateForm {
    name: string;
    description: string;
    price: number;
    stockQuantity: number;
    image: File;
    category: number;
    productID: number;
}

/**
 * 更新商品数据
 * @param data 更新数据
 */
export function update(data: UpdateForm) {
    let formdata = new FormData();
    formdata.append('name', data.name);
    formdata.append('description', data.description);
    formdata.append('price', data.price + '');
    formdata.append('stockQuantity', data.stockQuantity + '');
    formdata.append('image', data.image);
    formdata.append('category', data.category + '');
    formdata.append('productID', data.productID + '');
    return useAxios().put<Result>('/product/update', formdata, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    })
}

export function getImgUrl(name: string) {
    return useAxios().getUri() + '' + name;
}