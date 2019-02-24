<template>
    <div class="box">
        <nav class="top-nav">
            <div class="cas">
                <router-link to="/all">全部</router-link>
                <router-link to="/good">精华</router-link>
                <router-link to="/share">分享</router-link>
                <router-link to="/job">招聘</router-link>
                <router-link to="/ask">问答</router-link>
                <router-link to="/dev">客户端测试</router-link>
            </div>
        </nav>
        <router-view></router-view>
    </div>
</template>

<script>
export default {

}
</script>

<style>
    .top-nav{
        padding: 10px;
        
        height: 64px;
        margin-bottom: 10px;
        background: #80bd01;
    }
    .cas{
        width: 1000px;
        margin: 0 auto;
        display: flex;
    }
    .cas a{
        width: 100%;
        height: 44px;
        line-height: 44px;
        text-align: center;
        color: #333;
        font-size: 16px;
    }
    a.router-link-active {
        background: #fff;
        color: #333;
        border: 1px solid #333;
        border-radius: 40px;
    }
</style>
