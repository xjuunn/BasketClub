import { defineStore } from 'pinia'
import * as Auth from '~/api/Auth'

export const useUserStore = defineStore('user', () => {
    let _user: Ref<Auth.User> = ref({});
    let user = computed(() => _user)
    let _islogin = ref(false);
    let islogin = computed(() => _islogin);
    let userid = computed(() => _user.value.userID)
    onMounted(async () => {
        _user.value = JSON.parse(await localStorage.getItem('user') ?? '{}')
        if (_user.value.username !== undefined) _islogin.value = true;
    })

    async function login(username: string, password: string) {
        let { data } = await Auth.login(username, password);
        if (data.code !== 200) {
            useToastStore().errorToast("登录失败:" + data.message + '');
            return;
        }
        _user.value = data.data.user;
        localStorage.setItem('token', data.data.token);
        localStorage.setItem('user', JSON.stringify(data.data.user));
        _islogin.value = true;
        refreshAxiosInstance();
        let usernum = await $fetch('/api/addusernum');
        console.log(usernum);

        return data
    }
    async function logout() {
        _user.value = {};
        _islogin.value = false;
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    }
    async function refreshUserInfo() {
        let { data } = await Auth.list({ username: _user.value.username })
        let newuser = data.data[0]
        _user.value.username = newuser.username;
        _user.value.avatar = newuser.avatar;
        _user.value.role = newuser.role;
        _user.value.balance = newuser.balance;
        _user.value.gender = newuser.gender;
        _user.value.membershipLevel = newuser.membershipLevel;
        _user.value.points = newuser.points;
        localStorage.setItem('user', JSON.stringify(_user.value))

    }
    return {
        login,
        logout,
        userid,
        user,
        islogin,
        refreshUserInfo
    }
})
