class List{

    constructor(){
        this.getData();
        this.$('.p_sell').addEventListener('click',this.addBuyCar.bind(this));
    }


    async getData(){

        let {data,status} = await axios.get('http://localhost:8888/goods/list?current=1');
        //console.log(data,status);
        if(status ==200){
            let html = '';
            data.list.forEach(ele => {
                html +=`
                <li data-id="${ele.goods_id}" >
                        <div class="img"><img src="${ele.img_big_logo}" width="160" height="140" /></div>
                        <div class="name">${ele.title}</div>
                        <div class="price">
                            <table border="0" style="width:100%; color:#888888;" cellspacing="0" cellpadding="0">
                                <tr style="font-family:'宋体';">
                                    <td width="33%">市场价 </td>
                                    <td width="33%">折扣</td>
                                
                                </tr>
                                <tr>
                                    <td style="text-decoration:line-through;">￥${ele.price}</td>
                                    <td>${ele.sale_type}</td>
                            
                                </tr>
                            </table>
                        </div>
                        <div class="ch_bg">
                            <span class="ch_txt">￥<font>${ele.current_price}</font></span>
                            <a href="#none" class="ch_a">加入购物车</a>
                        </div>
                    </li>
                `
            });
            let ul = this.$('.p_sell');
            ul.innerHTML = html;
            let li = ul.querySelectorAll('li');
            li.forEach(ele =>{
                ele.style.cursor = 'pointer';
            })
        }

    }

    addBuyCar(eve){
        // console.log(this);
        // console.log(eve.target);
        //判断用户是否登录
        // let token = localStorage.getItem('token');
        // if(!token) location.assign('./login.html?ReturnUrl =./food.html');
        //获取商品的id
         if(eve.target.className == 'ch_a'){
            let li = eve.target.parentNode.parentNode;
            // console.log(li);
            // let good_id = li.dataset.id;
            // console.log(id);
            //商品ID存储到本地
            localStorage.setItem('goods_id',li.dataset.id);
            location.assign('./Product.html');
            // axios.get('http://localhost:8888/goods/item', {
            //     params: {
            //       id:good_id 
            //     }
            //   }).then(res=>{
            //      let {status,data} = res;
            //     // console.log(status,data);
            //     if(status ==200){
            //         if(data.code ==1){
            //             localStorage.setItem('good_id',data.info.goods_id);

            //         }
            //     }
                
            //   })
         }
        //console.log(eve.target.className);
    }

    $(tag){
        let res = document.querySelectorAll(tag);
        return res.length ==1? res[0]:res;

    }

}
new List