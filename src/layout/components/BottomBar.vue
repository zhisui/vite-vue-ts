<template>
    <div class="bottom-bar">
        <ul>
            <router-link to="/main/importMng/gas" :class="{'router-link-active': ['gas','dustRoad','dustBuilding','dustPollute','dustControl'].includes(route?.name as string)}">
                <li>
                    <span>大气</span>
                </li>
            </router-link>
            <a>
                <li>
                    <span>水</span>
                </li>
            </a>
            <a>
                <li>
                    <span>土壤</span>
                </li>
            </a>
            <a>
                <li>
                    <span>固废</span>
                </li>
            </a>
            <a>
                <li>
                    <span>噪声</span>
                </li>
            </a>
            <a>
                <li>
                    <span>辐射</span>
                </li>
            </a>
            <a>
                <li>
                    <span>自然生态</span>
                </li>
            </a>
        </ul>
    </div>
</template>

<script lang='ts' setup>

const route = useRoute()

</script>

<style lang="scss" scoped>
    .bottom-bar{
        width: 100%;
        height: 55px;
        background: url("~@/assets/navbar/bottomBar.png") no-repeat;
        background-size: 100% 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        ul{
            height: 100%;
            display: flex;
            //justify-content: center;
            justify-content: space-around;
            justify-self: center;
            >a{
                font-size: 18px;
                line-height: 1;
                &.router-link-active, &:hover{
                    >li{
                        color: #ffffff;
                        &:after{
                            content: "";
                            position: absolute;
                            top: 0;
                            left: 50%;
                            width: 128px;
                            height: 3px;
                            background: url("~@/assets/navbar/bottomActive.png") no-repeat;
                            background-size: 100% 100%;
                            transform: translateX(-50%);
                        }
                    }
                }
                >li{
                    position: relative;
                    height: 100%;
                    width: auto;
                    margin: 0 18px;
                    padding-top: 17px;
                    border: 0;
                    color: #53baff;
                }
            }
        }
    }
</style>
