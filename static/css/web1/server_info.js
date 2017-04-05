// /**
//  * Created by root on 17-3-18.
//  */

function ServerAdd(){
    var temp = $("#ServerAdd").serialize()//获取表单数据，并序列话
    //var temp = $("form").serializeArray()
    temp = decodeURIComponent(temp ,true);//反序列化
    //alert(temp)
    $.post('server_info.html', {ServerAdd:temp}, function(data){
     var obj = jQuery.parseJSON(data);
     //alert(data)
     switch(obj['TrueBit']) {
         case 1:{
             alert('添加成功');
             location.replace(location.href);
             break;
         }
         default:{
             alert('添加失败'+','+obj['ErrorMsg'])
             break;
         }
         }
    })
}
