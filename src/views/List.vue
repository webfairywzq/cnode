<template>
    <ul class="list-ul">
         <li v-for="(topic,index) in topics" :key="index">
            <div class="cont-top">
                <div class="pic" >
                    <img :src="topic.author.avatar_url" :title="topic.author.loginname">
                </div>
                <div class="time-desc">
                    <span class="time">{{topic.last_reply_at | gainTime}}</span>
                    <span class="desc">推荐</span>
                </div>
            </div>
            <div class="cont-txt">
                <label :class="topic.top==true || topic.good==true?'lab':'lab2'">{{topic | gainLabel}}</label>
                <!-- <span>{{topic.title}}</span> -->
                <router-link tag="span" :to="'/detail/'+topic.id">{{topic.title}}</router-link>
            </div>
            <div class="cont-bottom">
                <div class="sm-pic">
                    <img :src="topic.author.avatar_url" :title="topic.author.loginname">
                </div>
                <div class="visit">
                    <span>{{topic.reply_count}} /</span>
                    <span>{{topic.visit_count}}</span>
                </div>
            </div>
        </li>
    </ul>
</template>

<script>
export default {
    data(){
        return {
            topics:[]
        }
    },
    watch:{
        '$route' :{
            handler(to){
                // to就是路由对象，获取路由对象中的动态路由参数

                // 获取数据
                this.axios.get("/topics",{
                    params:{
                        limit:10,
                        tab:to.params.tab
                    }
                })
                .then((res)=>{
                    this.topics = res.data.data;
                })
            },
            immediate:true
        }
    },
    filters:{
        gainTime(value){
            // console.log(value);
            const ti=new Date(value);
            const time = Math.floor((Date.now()-ti.getTime()) / 1000);
            const arr=['年','月','周','天','小时','分钟','秒'];
            const arrn=[3600*24*365,3600*24*30,3600*24*7,3600*24,3600,60,1];

            for(var i=0;i<arr.length;i++){
                const t=Math.floor((time/arrn[i]));
                if(t != 0){
                    return t+arr[i] + "前";
                }
            }
        },
        gainLabel(value){
            if(value.top){
                return '置顶';
            }else if(value.good){
                return '精华';
            }else if(value.tab === 'share'){
                return '分享';
            }else if(value.tab === 'job'){
                return '招聘';
            }else if(value.tab === 'ask'){
                return '问答';
            }else{
                 return '客户端测试';
            }
            
        }
    }
}
</script>

<style>
.list-ul{
    width: 1000px;
    margin: 0 auto;
}
.list-ul li{
    width: 1000px;
    margin-top: 10px;
    border: 1px solid #dbe2e8;
    border-radius: 2px;
    box-shadow: 4px 2px 2px rgba(46,61,73,0.08);
    float: left;
}
.cont-top{
    overflow: hidden;
    padding: 10px;
}
.list-ul li .pic{
    width: 50px;
    height: 50px;
    float: left;
    margin-left: 20px;
}
.list-ul li .pic img{
    width: 100%;
    height: 100%;
    border-radius: 40px;
}
.list-ul li .time-desc{
    float: left;
    margin-top: 10px;
    margin-left: 20px;
    color: grey;
}
.list-ul li .cont-txt{
    margin-left: 20px;
    padding: 10px;
}
.list-ul li .cont-txt .lab{
    padding: 6px;
    background: #80bd01;
    color: #fff;
    font-size: 14px;
    border-radius: 10px;
    text-align: center;
    line-height: 30px;
}
.list-ul li .cont-txt .lab2{
    padding: 6px;
    background:#e5e5e5;
    color: #333;
    font-size: 14px;
    border-radius: 10px;
    text-align: center;
    line-height: 30px;
}
.list-ul li .cont-txt span{
    font-size: 16px;
    margin-left: 10px;
    color: #210f0f;
}
.list-ul li .cont-bottom{
    width: 150px;
    float: right;
    padding: 10px;
}
.list-ul li .cont-bottom .sm-pic{
    width: 30px;
    height: 30px;
    float: left;
}
.list-ul li .cont-bottom .sm-pic img{
    width: 100%;
    height: 100%;
    border-radius: 30px;
}
.list-ul li .cont-bottom .visit{
    float: left;
    margin-left: 10px;
    color: gray;
    margin-top: 3px;
}
.list-ul li .cont-bottom .visit span:first-child{
    color: #80bd01;
}
</style>
