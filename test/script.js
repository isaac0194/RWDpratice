var cart;
$(document).ready(function(){
    cart=[];
    //cart=[[1,1],[2,1],[3,1]];
    if(!$.cookie("cart")){
        $.cookie("cart",JSON.stringify(cart),{ expires: 1 });
    }else{
        //cart=$.cookie("cart",[]);
        cart=JSON.parse($.cookie("cart"));
    }
    console.log($.cookie("cart"));
    $("nav a>.cart").text(cart.length);
});
function addToCart(id,qty){
    var item=cart.filter((t,i)=>{return t[0]==id;});
    if(item!=0){
        qty+=item[1];
        cart=cart.filter((t,i)=>{return t[0]!=id});
    }
    cart.push([id,qty]);
    console.log(cart);
    $.cookie("cart",JSON.stringify(cart),{ expires: 1 });
    $("nav a>.cart").text(cart.length);
}
function setCart(id,qty){

}