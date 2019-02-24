<template>
    <div class="big">
        <div class="main-box">
            <div class="main-top">
                <div class="main-title">
                    <label>置顶</label>
                    <h3>{{topic.title}}</h3>
                </div>
                <div class="detail-tit">
                    <span><b>·</b>发布于&nbsp;{{topic.create_at | gainTime}}<b>·</b>作者&nbsp;{{topic.author.loginname}}&nbsp;<b>·</b>{{topic.visit_count}}&nbsp;次浏览<b>·</b>来自&nbsp;{{topic.tab | gainLabel}}</span>
                </div>
            </div>
            <div v-html="topic.content"></div>
        </div>
        <div class="main-box main2">
            <div class="comment">
                <div class="comment-top">
                    <span><em>{{topic.reply_count}}</em>&nbsp;&nbsp;回复</span>
                </div>
                <div class="comment-cont">
                     <div class="comment-wrap" v-for="(replie,index) in topic.replies" :key="index">
                         <div class="author-pic">
                            <img :src="replie.author.avatar_url">
                        </div>
                        <div class="autor-cont">
                            <span>{{replie.author.loginname}}&nbsp;</span>
                            <span>{{index+1}}楼&nbsp;<b>·</b>&nbsp;{{replie.create_at | gainTime}}</span>
                            <div v-html="replie.content"></div>
                            <!-- 点赞 -->
                            <div class="zan" v-show="replie.ups.length != 0">
                                <i class="iconfont icon-dianzan"></i>
                                <span>{{replie.ups.length}}</span>
                            </div>
                        </div>
                     </div>
                </div>
               
            </div>
        </div>
    </div>
</template>

<script>

export default {
    data(){
        return {
            topic:{}
        }
    },
    created(){
        this.axios.get('/topic/' + this.$route.params.id)
        .then((res)=>{
            this.topic=res.data.data;
        })
    },
    filters:{
        gainTime(value){
            const ti=new Date(value);
            const time=Math.floor((Date.now()-ti.getTime())/1000);
            const arr=['年','月','周','天','小时','分钟','秒'];
            const arrn=[3600*24*365,3600*24*30,3600*24*7,3600*24,3600,60,1];
            for(var i=0;i<arr.length;i++){
                const t=Math.floor((time/arrn[i]));
                if(t != 0){
                    return t+arr[i]+"前";
                }
            }
        },
        gainLabel(value){
            if(value === 'share'){
                return '分享';
            }else if(value === 'job'){
                return '招聘';
            }else if(value === 'ask'){
                return '问答';
            }else{
                 return '客户端测试';
            }
            // console.log(index);
        }
    }
}
</script>

<style>
.big{
    background: #e1e1e1;
    padding-top: 100px;
}
.main-box{
    width: 1000px;
    margin: 20px auto;
    background: #fff;
    border-radius: 5px;
    padding: 20px 10px;
}
/* 顶部 */
    .main-top{
        border-bottom: 1px solid #e5e5e5;
        padding-bottom: 10px;
    }
    .main-title{
        margin-left: 10px;
        width: 980px;
    }
    .main-title label{
        float: left;
        padding: 3px 5px;
        background: #80bd01;
        color: #fff;
        text-align: center;
        line-height: 15px;
        border-radius: 5px;
        font-size: 12px;
        margin-top: 10px;
        margin-right: 10px;
    }
    .main-title h3{
        font-size: 30px;
        margin-left: 10px;
        font-weight: 700;
    }
    .detail-tit{
        margin-left: 10px;
        margin-top: 10px;
        color: grey;
        font-size: 14px;
        letter-spacing:0.18rem;
        /* font-weight: 600; */
    }

/* 内容部分 */
    .markdown-text{
        padding: 10px;
    }
    p{
        margin-top: 10px;
        line-height: 25px;
        color: #333;
    }
    img{
        max-width: 100%;
        height: auto;
    }
    h2{
        font-size: 26px;
        margin: 30px 0 15px;
        border-bottom: 1px solid #eee;
    }
    h3{
        font-size: 24px;
        line-height: 40px;
    }
    h4{
        font-size: 18px;
        margin: 30px 0 15px;
        border-bottom: 1px solid #eee;
    }
/* 评论区 */
    .main2{
        padding:0px;
    }
    .comment{
        margin-top: 20px;
    }
    .comment-top{
        width: 100%;
        padding: 10px;
        background: #f6f6f6;
        border-radius: 3px 3px 0 0;
    }
    em{
        color: #80bd01;

    }
    .comment-cont{
        padding: 10px;
    }
    .comment-cont .comment-wrap{
        display: flex;
        padding: 10px 0 10px 10px;
        border-top: 1px solid #f0f0f0;
    }
    .comment-cont .author-pic img{
        width: 30px;
        height: 30px;
        border-radius: 3px;
    }
    .autor-cont{
        width: 100%;
        margin-left: 20px;
        position: relative;
    }
    .autor-cont span{
        color: #08c;
        font-size: 12px;
    }
    .autor-cont span:first-child{
        color: #333;
        font-size: 14px;
    }
    hr{
       margin: 20px 0;
       border: 0;
       border-top: 1px solid #eee;
       border-bottom: 1px solid #fff;
    }
    .zan{
        
        position: absolute;
        right: 0;
        top: 20px;
    }
    .zan .iconfont{
        font-size: 20px;
    }
    .zan span{
        font-size: 16px;
        margin-left: 5px;
    }
</style>
