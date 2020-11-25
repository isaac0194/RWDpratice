// 頁面載入時, 顯示購物車數量
if(Cookies.get('cart')==undefined){
    Cookies.set('cart',0,{expires:1});
}
var cart=parseInt(Cookies.get('cart'));

// 按按鈕後: 加到購物車
$("#submit").click(function(e){
    //parseInt : 將數字轉為整數
    var cart=parseInt(Cookies.get('cart')); //也可統一由cookie設定數量
    //var cart=parseInt($("ul.nav .cart").text()); //取得目前購物車數量
    var qty=parseInt($("#qty").val());//取得目前商品, 要加入數量
    cart+=qty;
    $("ul.nav .cart").text(cart);//加入購物車
    Cookies.set('cart', cart, { expires: 1 });
    e.preventDefault();//不要送出表單1
    //return false; //不要送出表單2
});
// 收合面板
$(".accordion")
    .prepend($('<i class="fas fa-caret-right"></i>'))
    .addClass("active")
    .click(function(e){
        let panel=$(this).next(".acc-panel");
        //$(".acc-panel").slideUp();
        if(!$(this).hasClass("active")){
            $(this).addClass("active");
        }else{
            $(this).removeClass("active");
        }
        //console.log("accordion click:", panel.is(":not(:visible)"));
        panel.slideToggle();
    });
setTimeout(function(){//因為用了w3-include, 選單載入較晚, 故用setTimeout延後執行
    $("ul.nav .cart").text(cart);
    // 社群分享
    $("#share a").click(function(e){
        e.preventDefault();
        var shareType=$(this).attr("title");
        var pageUrl=location.href;
        var pageTitle=document.title;
        var link_facebook="https://www.facebook.com/sharer.php?u=";
        var link_line="https://lineit.line.me/share/ui?url=";
        var link_twitter="http://twitter.com/home/?status=";
        var link_mail="mailto:?subject=";
        var openFrame="";//"_blank";
        var windowSize="width=400,height=300";

        //pageUrl="https://www.pcschool.com.tw/";

        switch(shareType){
            case ('Facebook'):
                window.open(link_facebook+pageUrl, openFrame, windowSize);
                break;
            case ('Line'):
                window.open(link_line+pageUrl, openFrame, windowSize);
                break;                        
            case ('Twitter'):
                window.open(link_twitter+pageUrl, openFrame, windowSize); 
                //有問題
                // twitter:不會帶入網頁資訊, 只有網址
                // 所以會帶: 標題 + 網址
                break;
            case ('Mail'):
                var mailurl=link_mail+pageTitle+"&body="+pageTitle+" "+pageUrl;
                window.location=mailurl;
                //window.open(mailurl, openFrame, windowSize);
                console.log(mailurl);
                // 不指定收件人: mailto:?subject=主旨&body=內文
                // 指定收件人: mailto:mymail@gmail.com?subject=主旨&body=內文
                // window.location : 直接轉址
                // window.open : 另開視窗或頁籤
                break;  
            default:
                return false;                      
        }
    });
    // GDPR
    if(Cookies.get("gdpr")==undefined){
        $(".gdpr").addClass("show");
        if($(".gdpr").hasClass("bottom")){
            //$("body").css("margin-bottom",120);
            $("body").addClass("show-gdpr");
        }
    }
    $(".gdpr .btn-ok").click(function(e){
        e.preventDefault();
        $(".gdpr").removeClass("show");
        $("body").removeClass("show-gdpr");        
        //$("body").css("margin-bottom","");
        //$("body").removeAttr("style");
        Cookies.set("gdpr",1,{expires:1000});
    });
    // $(".gdpr .btn-policy").click(function(e){

    // });
},100);
