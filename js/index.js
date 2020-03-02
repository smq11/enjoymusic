
// 首页js----------------------------------------------------
function bannerSwiper(){
    var mySwiper = new Swiper('#bannerSwiper', {
    loop: true, // 循环模式选项

    // 如果需要分页器
    pagination: {
        el: '.swiper-pagination',
    },

    // 如果需要前进后退按钮
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },

    //autoplay效果
    autoplay: {
        delay: 3000,
        stopOnLastSlide: false,
        disableOnInteraction: false,
    },
    parallax:true,
})
}


//轮播请求数据ajax---------------
$.ajax({
    type:'get',
    url:'http://iwenwiki.com/api/blueberrypai/getIndexBanner.php',
    success:function(res){
        // console.log(res);//json对象类型
        //1.对象转字符串 2.查找img里的地址www.wwtliu.com/sxtstu替换成iwenwiki.com/api
        //方法 replace('旧值','新值')
        var newRes=JSON.stringify(res);
        // console.log(newRes);
        //用正则表达式查找全局
        var res=newRes.replace(/www.wwtliu.com\/sxtstu/g,'iwenwiki.com/api');
        // console.log(res);
        //字符串转回对象
        var res = JSON.parse(res);
        var bannerContent=res.banner;
        // console.log(bannerContent);
        //遍历数组，拿到轮播图内容
        var str='';//获取轮播图内容
        for(var i in bannerContent){
            str+=`<div class="swiper-slide">
            <img src="${bannerContent[i].img}" alt="">
            <div class="content" data-swiper-parallax="-1200" data-swiper-parallax-duration="1000">
                <h3>${bannerContent[i].title}</h3>
                <p>${bannerContent[i].content}</p>
            </div>
        </div>`;
        }
        $('.banner .swiper-wrapper').html(str);
        bannerSwiper();
    }
})


//封装的轮播方法 之后可调用-----------------------------

function fnSwiper(swiperId){
    new Swiper(swiperId, {
    loop: true ,// 循环模式选项

    // 如果需要分页器
    pagination: {
        el: '.swiper-pagination'
    }
})
}
//乐章的js------------------------------------------------------------------

$.ajax({
    type:'get',
    url:'http://iwenwiki.com/api/blueberrypai/getIndexMovement.php',
    success:function(res){
        var movement=res.movement;
        console.log(movement);
        var n = -1;
        for(var i=0;i<4;i++){
            var swiperSlide=$(`<div class="swiper-slide"></div>`);
            var str='';
            for(var j=0;j<4;j++){
                n++;
                str+=`<li class="innerBox">
                        <div class="innerImg"><img src="img/bbs_22_10.png" alt=""></div>
                        <div class="innerText">
                            <h4>${movement[n].title}</h4>
                            <h6>${movement[n].writer}</h6>
                            <p class="textContent">${movement[n].content}</p>
                        </div>
                    </li>`;
            }
            swiperSlide.html(`<ul class="outBox">${str}</ul>`);
            $('#movementSwiper .swiper-wrapper').append(swiperSlide);
        }
        fnSwiper('#movementSwiper');
    }
})

//听说的js--------------------------------
$.ajax({
    type:'get',
    url:'http://iwenwiki.com/api/blueberrypai/getIndexListening.php',
    success:function(res){
        console.log(res);
    
        var newRes=JSON.stringify(res);
        
        var res=newRes.replace(/iwen.wiki\/sxtstu/g,'iwenwiki.com/api');
        
        var res = JSON.parse(res);
        var listenSpeaker=res.listening;
        
        var str='';
        for(var i in listenSpeaker){
            str+=`<li class="innerImg">
            <img src="${listenSpeaker[i].img}" alt="">
            <div></div>
            </li>
            <li class="innerText">
                <h5>${listenSpeaker[i].writer}</h5>
                <h4>${listenSpeaker[i].title}</h4>
                <p >${listenSpeaker[i].content}</p>
            </li>`;
        }
        $('.listenSpeak-box .outBox').html(str);
    }
})