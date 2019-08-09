var userArr = []

$.ajax({
    type : 'get',
    url : '/users',
    success : function(res) {
        // console.log(res)
        userArr = res ;
        render(userArr);
    }
})


function render(arr) {
    var str = template('abc',{
        list : arr
    });
    // console.log(str)
    $('tbody').html(str)
}

$('#btn').on('click',function(){
    var formData = $(this).parents("form").serialize();
    $.ajax({
        type : 'post',
        url : '/users',
        data : formData,
        success : function(res) { 
            userArr.push(res);
            render(userArr)
        },
        error : function (ress) {
            alert(ress)
        }
    })
    
})

$('#avatar').on('change',function() {
    var formData = new FormData();
    formData.append('avatar',this.files[0]);

    $.ajax({
        type : 'post',
        url : '/upload',
        data : formData,
        processData : false,
        contentType : false,
        success : function (res) {
            $('#preview').attr('src',res[0].avatar);
            $('#hiddenAvatar').val(res[0].avatar)
            
            
        }
    })
})
    var userid;

$('tbody').on('click',"#edit",function() {
    userid = $(this).parent('.text-center').attr('data-id');
    
    // $(this).attr()
    $('#btn').hide();
    $('#btn2').show();
    $('h2').text('修改用户')
    // 获取tr
    var trObj = $(this).parents('tr') 
    //获取图片的地址
    var imgSrc = trObj.children(1).children('img').attr('src')
    //将图片的地址写到隐藏域
    $('#hiddenAvatar').val(imgSrc);
    if(imgSrc) {
        $('#preview').attr('src',imgSrc);
    } else {
        $('#preview').attr('src',"../assets/img/default.png");
    }

    // 将对应的内容写到左边的输入框
    $('#email').val(trObj.children().eq(2).text());
    $('#nickName').val(trObj.children().eq(3).text());

    var status = trObj.children().eq(4).text();
    if(status == '激活') {
        $('#jh').prop('checked',true);
    } else {
        $('#wjh').prop('checked',true);
    }

    var role = trObj.children().eq(5).text();
    if(status == '超级管理员') {
        $('#admin').prop('checked',true);
    } else {
        $('#normal').prop('checked',true);
    }

})

$('#btn2').on('click',function(){
    console.log($("form").serialize());
    
    $.ajax({
        type : 'put',
        url : '/users/'+userid,
        data:$("form").serialize(),
        success : function(res) {
            var index = userArr.findIndex(item => item._id == userid);
            userArr[index] = res;
            render(userArr);
        }
    })
})