// 积分

export interface Result {
    code: number;
    data: string;
    message: string;
    [property: string]: any;
}

/**
 * 升级用户为会员
 * @param username 用户名
 */
export function UpgradetoMember(username: string) {
    return useAxios().put<Result>('/user/update', {
        username, role: '1', membershipLevel: '1'
    })
}

export interface UpdateForm {
    username: string;
    points?: number;
    balance?: number;
}

/**
 * 更新用户金额和积分
 * @param data 更新数据
 */
export function update(data: UpdateForm) {
    return useAxios().put<Result>('/user/updatePointsAndBalance', data);
}

/**
 * 兑换积分
 * @param userid 兑换积分
 * @param exchangeType 兑换类型 
 */
export function exchange(userid: string | number, exchangeType: 100 | 500 | 1000 | "100" | "500" | "1000") {
    return useAxios().post('/points-exchange/exchange', {
        userID: userid + '',
        exchangeType: exchangeType + ''
    })
}