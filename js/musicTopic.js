/**
 * 音乐播放js步骤
 * 音乐播放事件(音频和视频的api公用)
 * 1.点击按钮 触发播放事件
 * 2.点击按钮的时候判断当前音乐是否是暂停 true暂停 点击后开始播放  false不是暂停
 * 3.当音乐播放的时候 获取当前播放的时间 和总的时间
 * 4.进度条的进度 (当前的时间/总的时间*100%)
 * 5.播放完毕 暂停
 * 6.进入页面获取音乐的总时长
 */

// //获取音频标签
var audio = document.getElementById('audio');
// console.log(audio);
audio.oncanplay=function(){
    // console.log(audio.duration);
    $('.duration').html(times(audio.duration));
    //1.点击按钮 触发播放事件
    $('.playMusic').click(function(){
        //2.点击按钮时判断当前音乐是否暂停
        //pause暂停状态 暂停 true  false播放
        if(audio.paused){
            audio.play();
            $('.playMusic img').attr('src','img/pause.png');
        }else{
            audio.pause();
            $('.playMusic img').attr('src','img/play-btn_03.png');
        }
    })
}

//3.当前音频/视频播放时间发生改变时触发
audio.ontimeupdate=function(){
    // console.log(audio.currentTime);
    // console.log(audio.duration);
    //获取当前播放的时间 和总时间
    $('.current').html(times(audio.currentTime));
    $('.duration').html(times(audio.duration));
    //5.进度条修改
    var jindu = ((audio.currentTime/audio.duration)*100).toFixed(2)+'%';
    // console.log(jindu);
    $('.innerProgress').width(jindu);
    //6.判断音频播放结束
    if(audio.ended){
        $('.playMusic img').attr('src','img/play-btn_03.png');
    }
}
//4.处理时间的格式
function times(num){
    var m = parseInt(num/60);
    var s = parseInt(num%60);
    m=m>9? m : '0'+m;
    s=s>9? s : '0'+s;
    return m+':'+s;
}

// ajax获取音乐数据接口----------------------
$.ajax({
    type:'get',
    url:'http://iwenwiki.com/api/blueberrypai/getSongInfo.php',
    data:{
        song:'mo'
    },
    success:function(res){
        // console.log(res);
        var songInfo=res.songInfo;
        $('.musicTopic-movement .title').html(songInfo.song_title)
        $('.play span').html(songInfo.play_num);
        //获取图片--拼接地
        $('.middle img').attr('src','http://iwenwiki.com/api/blueberrypai/'+songInfo.song_pic);
        $('.middleText').html(res.songInfo.song_intro_cont);
        // console.log(res.songInfo);

        var newSong=JSON.stringify(songInfo);
        var newUrl=newSong.replace(/iwen.wiki\/sxtstu/g,'iwenwiki.com/api')
        songInfo=JSON.parse(newUrl);
        $('#audio').attr('src',songInfo.song_source);
    },
    error:function(){
        console.log('请求错误');
    }
})

//Ajax获取文章内容
//获取文章，标签，相关阅读，赞过的人，评论，其他文章，热门推荐
//1.获取dom元素 直接插入内容 
//2.数组数据循环输出的时候 字符串拼接 插入页面
$.ajax({
    type:'get',
    url:'http://iwenwiki.com/api/blueberrypai/getInterestingInfo.php',
    success:function(res){
        console.log(res);
        //1.文章数据
        var interestingInfo=res.interestingInfo;
        // console.log(interestingInfo);
        //标题
        $('.articleLeft h2').html(interestingInfo.interest_title);
        //段落文字
        var text = interestingInfo.interest_cont;
        // console.log(text);
        //换行方法<pre></pre>
        $('.articleText pre').html(text);
        $('.articleEye').html('<img src="img/eye_03.png" alt=""> '+interestingInfo.eye_num);        
        $('.articleChat').html('<img src="img/pinglun_05.png" alt=""> '+interestingInfo.wei_chat_num);        
        $('.articleTime').html('创建时间：'+interestingInfo.interest_create_time);        

        //2.旅游标签
        var travel = res.labels;
        // console.log(travel);
        var str2='';
        for(var j=0; j<travel.length; j++){
            str2+=`<li>${travel[j]}</li>`;
            // console.log(str2);
        }
        $('.travel').html(`<li class='lableOne'><img src="img/labelIcon_03.png" alt=""></li>`+str2);
    }
})
//点击登录 显示登录页面
$('#banner-login').click(function(e){
    e.stopPropagation();

    $('.loginPage-box').css({
        'display':'block'
    })
})
//点击登录按钮进行账号登录
$(function(){
    $('#loginBtn').click(function(){
        
        var uname=$('#username').val();
        console.log(uname);
        //将获取的账号信息显示
        $('.banner-login').html('用户账号：'+uname).css({
            'color':'#fff'
        });
        $('.banner-apply').html('');
        //登录成功后隐藏登录页面
        $('.loginPage-box').css({
            'display':'none'
        })
        })
        //阻断冒泡点击事件
        //点击小窗口周围 小窗口隐层 但点击登录小窗口自己不会隐藏
        $('.loginPage-box').click(function(e){
            $(this).css({
                'display':'none'
            })
            // console.log(2222);
            e.stopPropagation();//阻断冒泡
        })

        $('.loginPage').click(function(e){
            // console.log(3333);
            e.stopPropagation();//阻断冒泡
        })
})

