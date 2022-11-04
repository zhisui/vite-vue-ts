import { defineStore } from 'pinia';

export type UserInfo = {
    id: string,
    account: string,
    name: string
}
const USER_STORE = 'USER_STORE';

export const useUserStore = defineStore(USER_STORE, () => {
    const info = ref<UserInfo | null>(null);
    const setUserInfo = (data: UserInfo) => {
        info.value = data;
    };
    return {
        info: readonly(info),
        setUserInfo
    };
});
