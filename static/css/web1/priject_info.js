// /**
//  * Created by root on 17-3-18.
//  */

function ProjectAddPost() {
    var temp = $("form").serialize()//获取表单数据，并序列话
    //var temp = $("form").serializeArray()
    temp = decodeURIComponent(temp ,true);//反序列化
    alert(temp)
    $.post('project_info.html', {ProjectAdd:temp}, function(data){
    var obj = jQuery.parseJSON(data);
    switch(obj['TrueBit']) {
        case 1:{
            alert('添加成功');
            location.replace(location.href);
            break;
        }
        case 1062:{
            alert('添加失败，项目名重复');
            break;
        }
        default:{
            alert('添加失败'+','+obj['ErrorMsg'])
            break;

        }
        }

    })
}
