class Product{
    constructor(){
        this.getItems();
        //this.ShowDiv_1('#MyDiv1','#fade1');
    }

//获取商品ID并显示
    getItems(){
        let good_id = localStorage.getItem('goods_id');
        // console.log(good_id);
          axios.get('http://localhost:8888/goods/item', {
                params: {
                  id:good_id 
                }
              }).then(res=>{
                 let {status,data} = res;
                //  console.log(status,data);
                if(status ==200){
                    if(data.code ==1){
                       this.addItem(data); 
                        
                    }
                }
                
              })

    }
//显示商品的函数
    addItem(data){
        let content = this.$('.content')[0];
        // console.log(data);
        content.innerHTML=`
        <div id="tsShopContainer" style="height:390px;width:390px;">
                <div id="tsImgS">
                <a href="${data.info.img_big_logo}" title="Images" class="MagicZoom" id="MagicZoom">
                <img src="${data.info.img_big_logo}" width="390" height="390" /></a>
                <div id="mask" style=" width:200px; height:200px;background-color:rgba(255, 255, 0, 0.4);position:absolute;left:0;top:0;"> </div>
                </div>
                <div id="bigBox" class="MagicZoomBigImageCont" style="width: 300px; height: 297px;left:400px;  top: 0px; overflow: hidden; z-index: 100;  position: absolute; display: none;"><div style="overflow: hidden;"><img src="${data.info.img_big_logo}"width="600" height="600" style="position: relative; left: 0px; top: 0px; display: block; visibility: visible; " id="bigImg"></div></div>
               
            </div>
        <!-- 111111111111111111111111111111111111111-->
        <div class="pro_des">
        <div class="des_name">
            <p>${data.info.title}</p>
            “开业巨惠，北京专柜直供”，不光低价，“真”才靠谱！
        </div>
        <div class="des_price">
            本店价格：<b>￥${data.info.current_price}</b><br />
     
        </div>
        <div class="des_choice">
            <span class="fl">型号选择：</span>
            <ul>
                <li class="checked">30ml<div class="ch_img"></div>
                </li>
                <li>50ml<div class="ch_img"></div>
                </li>
                <li>100ml<div class="ch_img"></div>
                </li>
            </ul>
        </div>
        <div class="des_choice">
            <span class="fl">颜色选择：</span>
            <ul>
                <li>红色<div class="ch_img"></div>
                </li>
                <li class="checked">白色<div class="ch_img"></div>
                </li>
                <li>黑色<div class="ch_img"></div>
                </li>
            </ul>
        </div>
        <div class="des_join">
            <div class="j_nums">
                <input type="text" value="1" name="" class="n_ipt" />
                <input type="button" value="" onclick="addUpdate(jq(this));" class="n_btn_1" />
                <input type="button" value="" onclick="jianUpdate(jq(this));" class="n_btn_2" />
            </div>
            <span class="fl" onclick="Product.addBuyCar()"><a ><img src="./images/j_car.png" /></a></span>
        </div>
       <!-- ${data.info.goods_introduce}-->
    </div>
        
    `
    this.glass();

    }
//放大镜
    glass(){
        // console.log(this.$('#bigBox'));
        let smallBox = this.$('#tsShopContainer');
        let bigBox = this.$('#bigBox');
        let mask = this.$('#mask');
        let bigImg = this.$('#bigImg')
        // console.log(bigBox,mask,bigImg);
        smallBox.onmouseenter = function(){
            bigBox.style.display = 'block';
        }
        smallBox.onmouseleave = function(){
            bigBox.style.display = 'none';
        }
        smallBox.onmousemove=function(e){
            //console.log(smallBox.offsetLeft);
            // console.log(smallBox.offsetHeight,mask.offsetHeight);
           let disX = e.pageX - smallBox.offsetLeft - mask.offsetWidth/2;
           let disY = e.pageY - smallBox.offsetTop - mask.offsetHeight/2; 
           let disXMax = smallBox.offsetWidth - mask.offsetWidth;
           let disYMax = smallBox.offsetHeight - mask.offsetHeight;
           disX = disX<0?  0:disX;
           disX = disX>disXMax? disXMax:disX;
           disY = disY<0? 0:disY;
           disY = disY>disYMax? disYMax:disY; 
           
           mask.style.left = disX+'px';
           mask.style.top = disY +'px';
           let imgXMax = bigImg.offsetWidth - bigBox.offsetWidth,
            imgYMax = bigImg.offsetHeight - bigBox.offsetHeight;

            let imgX = (disX/disXMax)*imgXMax,
                imgY = (disY/disYMax)*imgYMax;
           bigImg.style.left =- imgX +'px';
           bigImg.style.top =-imgY +'px'; 
        }
    }
//加入购物车
//onclick="ShowDiv_1('MyDiv1','fade1')"
static addBuyCar(){
         //console.log(this);
        let token = localStorage.getItem('token');
        if(!token) location.assign('./login.html?ReturnUrl =./product.html');
        let good_id = localStorage.getItem('goods_id'),
            user_id = localStorage.getItem('user_id');
       // console.log(good_id);
            //向服务器端发送数据
        axios.defaults.headers.common['authorization'] = token;
        axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';
        let param = `id=${user_id}&goodsId=${good_id}`
        axios.post('http://localhost:8888/cart/add', param)
          .then(res=> {
             let {status,data} = res;
             //console.log(data);
             if(status != 200) throw new Error('加入购物车失败')  ;
             if(data.code == 1){
                //console.log(111);
                Product.ShowDiv_1('#MyDiv1','#fade1');         
            }

          })



        

    }
 //加入购物车后的模态框   
 static ShowDiv_1(show_div,bg_div){
        //console.log(this.$(show_div)); 
        //console.log(this);
        let div1 =document.querySelector(show_div);
        let div2 =document.querySelector(bg_div);
        div1.style.display = 'block';
        div2.style.display = 'block';

        // document.getElementById(show_div).style.display='block';
        // document.getElementById(bg_div).style.display='block' ;
        //var bgdiv = document.getElementById(bg_div);
        //bgdiv.style.width = document.body.scrollWidth;
        
        //this.$("#"+bg_div).height(this.$(document).height());
    };
//去购物车结算  跳转过程
 static skipBuyCar(){
     location.assign('./BuyCar.html')
 }

    $(tag){
        let res = document.querySelectorAll(tag);
        return res.length ==1? res[0]:res;

    }
}
new Product;