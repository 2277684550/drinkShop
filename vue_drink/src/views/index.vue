<template>
    <div>
        <el-container>
        <el-header class="header">
            <!-- header头部组件 -->
            <Header></Header>
        </el-header>
        <el-main>
            <!-- 路由出口 -->
        <router-view></router-view>
        </el-main>
        </el-container>
    </div>
</template>

<script>
import Header from '@/components/header/index.vue'
export default {
    props: {

    },
    data() {
        return {

        };
    },
    methods: {

    },
    components: {
        Header
    },
};
</script>

<style scoped lang="less">

</style>
