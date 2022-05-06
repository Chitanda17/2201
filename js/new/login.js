class login{

    constructor(){
        //console.log(this.$('.log_btn'));
        this.$('.log_btn').addEventListener('click',this.clickFn.bind(this));

    }

    clickFn(){
        //console.log(location.search.split('=')[1]);
        let form = document.forms[0].elements;
        let username = form.user.value,
            password = form.password.value
         
       // console.log(username,password);
        if(!form.user.value.trim()||!form.password.value.trim()) throw new Error('用户名和密码不能为空')
        axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';
        // axios.defaults["Content-Type"] = "application/x-www-form-urlencoded";
        //   console.log(11111);
        let param = `username=${username}&password=${password}`;
        axios.post('http://localhost:8888/users/login',param).then(res=> {
            let {status,data} = res ;
            if (status == 200) {
               if(data.code == 1){
                localStorage.setItem('token',data.token);
                localStorage.setItem('user_id',data.user.id)
                let url = '';
                if(!location.search.split('=')[1]){
                    url = './food.html';
                }else{
                    url = location.search.split('=')[1]
                }
                location.assign(url)
               }else{
                layer.open({
                    title: '登陆失败'
                    ,content: '用户名或密码输入错误'
                  })
               }
            }
            
        })
          
    
    }


    $(tag){
        let res = document.querySelectorAll(tag);
        return res.length ==1? res[0]:res;

    }
}
 new login;