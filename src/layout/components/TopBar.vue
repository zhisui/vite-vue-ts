<template>
    <div class="header_bar">
        <div class="header_left" style="flex: 1.1">
            <ul>
                <a href="/xkzdap/" style="width: 200px" target="_blank">
                    <li>
                        <span style="font-size: 18px">环统与许可衔接试点</span>
                    </li>
                </a>
                <router-link to="/main/envSituation" v-authox="'ypgzd|access'">
                    <li>
                        <span>一图知态势</span>
                    </li>
                </router-link>
                <router-link to="/main/targetScene" v-authox="'ypgzd|access'">
                    <li>
                        <span>一单达目标</span>
                    </li>
                </router-link>
                <router-link to="/main/proScene" v-authox="'ypgzd|access'">
                    <li>
                        <span>一网识问题</span>
                    </li>
                </router-link>
            </ul>
        </div>
        <div class="header_center" style="flex: 1.3">
            <div class="tab">
                <router-link to="/waste" v-authox="'ypgzd|access'">
                    <span class="iconfont icon-qiehuanxitong"></span>
                </router-link>
            </div>
        </div>
        <div class="header_right">
            <ul>
                <router-link to="/main/importMng">
                    <li>
                        <span>一屏管重点</span>
                    </li>
                </router-link>
                <router-link to="/main/cloudMng" v-authox="'ypgzd|access'" :class="{ 'router-link-active': $route.path.includes('parkCode-park') | $route.path.includes('parkCode-manage') }">
                    <li>
                        <span>一码智管服</span>
                    </li>
                </router-link>
                <router-link to="/cooperation/dust" v-authox="'ypgzd|access'">
                    <li>
                        <span v-debounce>协同管控中心</span>
                    </li>
                </router-link>
            </ul>
            <div>
                <!--                <div class="img-btn" @click="$router.push('/main/authox/user')">-->
                <!--                    <img src="@/assets/main/config.png" alt="">-->
                <!--                </div>-->
                <div class="img-btn" @click="goAuthox">
                    <img src="@/assets/navbar/config.png" alt="" />
                </div>
                <Dropdown placement="bottom-end" @on-click="changeDrop">
                    <!--                    <span>{{user.DISPLAYNAME?user.DISPLAYNAME:"admin"}}</span>-->
                    <span>{{ userName }}</span>
                    <Icon type="ios-arrow-down" />
                    <DropdownMenu slot="list">
                        <DropdownItem name="logout">
                            <span>注销登录</span>
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </div>
        </div>
    </div>
</template>

<script>
// import {clearCache} from "@/utils/cache";

export default {
    name: 'topBar',
    components: {},
    data() {
        return {
            user: {},
            region: 'all',
            regionList: [{ label: '市本级', value: 'all' }],
            userName: '',
        };
    },
    methods: {
        initUser() {
            this.userName = localStorage.getItem('username');
        },
        getUser() {
            this.$http.get('/rest/authox/curUser').then((res) => {
                this.user = res.data;
            });
        },
        logout() {
            this.$logins.get('/waterloo/logout').then(() => {
                this.$store.commit('getUserInfo', {});
                clearCache();
                this.$router.push({
                    path: '/login',
                });
            });
        },
        changeDrop(val) {
            if (val == 'logout') {
                this.logout();
            }
        },
        ouhaiChange() {
            const { path } = this.$route;
            if (path.includes('/charaScene/company')) {
                this.region = 'all';
                this.regionList = [
                    { label: '市本级', value: 'all' },
                    { label: '瓯海区', value: 'ouhai' },
                ];
            } else {
                this.region = 'all';
                this.regionList = [{ label: '市本级', value: 'all' }];
            }
            this.$store.commit('CHANGE_REGION', this.region);
        },
        changeRegion(val) {
            this.$store.commit('CHANGE_REGION', val);
            this.$bus.$emit('CHANGE_REGION', val);
        },
        goAuthox() {
            this.$router.push({
                path: '/main/authox',
            });
        },
    },
    watch: {
        $route: {
            handler() {
                this.ouhaiChange();
            },
            deep: true,
        },
    },
    created() {
        this.ouhaiChange();
        this.initUser();
        // this.getUser();
    },
    mounted() {},
    destroyed() {
        this.$events.off('resize');
    },
};
</script>
<style lang="scss" scoped>
.header_bar {
    width: 100%;
    height: 75px;
    background: url('~@/assets/navbar/topBar.png') no-repeat center;
    background-size: auto;
    display: flex;
    justify-content: center;

    .header_left {
        height: 55px;
        flex: 1;
        display: flex;
        justify-content: space-between;

        > ul {
            height: 100%;
            display: flex;
            justify-content: center;
            justify-self: center;

            > a {
                width: 140px;
                font-size: 20px;
                line-height: 1;

                &.router-link-active,
                &:hover {
                    > li {
                        color: #ffffff;
                        background: url('~@/assets/navbar/topActive.png') no-repeat bottom center;
                        background-size: 100% 100%;
                    }
                }

                > li {
                    position: relative;
                    height: 100%;
                    width: auto;
                    margin: 0 17px;
                    padding-top: 20px;
                    border: 0;
                    color: #53baff;
                }
            }
        }
    }

    .header_center {
        flex: 1.5;
        position: relative;

        .iconfont {
            font-size: 19px;
            line-height: 23px;
        }

        .tab {
            position: absolute;
            right: calc(30% - 10px);
            top: 25px;
            > a {
                color: #fff;
            }
            > span {
                color: #fff;
            }
        }
    }

    .header_right {
        height: 55px;
        flex: 1.1;
        display: flex;
        justify-content: space-between;

        > ul {
            display: flex;
            justify-content: center;
            justify-self: center;

            > a {
                width: 140px;
                font-size: 20px;
                line-height: 1;
                &:last-of-type {
                    width: 160px;
                }
                &.router-link-active,
                &:hover {
                    > li {
                        color: #ffffff;
                        background: url('~@/assets/navbar/topActive.png') no-repeat bottom center;
                    }
                }

                > li {
                    position: relative;
                    height: 100%;
                    width: auto;
                    margin: 0 17px;
                    padding-top: 20px;
                    border: 0;
                    color: #53baff;
                }
            }
        }

        > div {
            display: flex;
        }

        .img-btn {
            cursor: pointer;
            line-height: 75px;
            //margin-right: 0px;
        }

        ::v-deep .ivu-dropdown {
            float: right;
            color: #fff;
            width: auto !important;
            height: 100%;
            line-height: 70px;
            margin: 0 15px;
            cursor: pointer;
            font-size: 20px;

            .ivu-dropdown-rel {
                display: flex;
                height: 40px;
                margin-top: 16px;

                span {
                    display: inline-block;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    max-width: 80px;
                    line-height: 28px;
                    vertical-align: middle;
                    padding: auto 5px;
                    color: #fff;
                }

                i {
                    display: inline-block;
                }
            }

            ::v-deep.ivu-select-dropdown {
                background-color: #1a2632;
                border-radius: 0px;
                margin: 0px;
                padding: 0px;
                z-index: 5000 !important;

                .ivu-dropdown-item {
                    line-height: 50px;
                    height: 50px;
                    color: #d8dce5;
                    padding: 0;
                    font-size: 14px !important;

                    &:hover {
                        background-color: #0f1720;
                        color: #00f7ff;
                    }
                }
            }

            li {
                text-align: center;
            }

            > span {
                display: inline-block;
                padding: 0 5px;
            }

            i {
                line-height: 28px;
            }
        }
    }
}
</style>
