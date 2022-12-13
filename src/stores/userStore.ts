import { defineStore } from 'pinia';
export type UserInfo = {
    id: string,
    account: string,
    name: string
}

export const userStore = defineStore('userStore', () => {
    const info = ref<UserInfo | null>(null);
    const setUserInfo = (data: UserInfo) => {
        info.value = data;
    };
    return {
        info: readonly(info),
        setUserInfo
    };
});
