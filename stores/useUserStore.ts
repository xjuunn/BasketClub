import { defineStore } from 'pinia'
import * as Auth from '~/api/Auth'

export const useUserStore = defineStore('user', () => {
    let user: Ref<Auth.User> = ref({});

    async function login(username: string, password: string) {
        let { data } = await Auth.login(username, password);
        user.value = data.data.user;
        localStorage.setItem('token', data.data.token);
        return data
    }
    return {
        login
    }
})
