/**
 * Created by Administrator on 2017/2/16.
 */
/*function Foo(name){
    var arg2 = arguments[1]
    console.log(name);
    console.log(arg2);
}
Foo('aa','bb')
alert('cc')
*/
//(function(name){
//   console.log(name);
//})('aa')
function Foo(){
    document.getElementById('F1').submit();
}
function Enter(){
    var id = document.getElementById('tip');
    id.className = 'black';
    if (id.value=='请输入关键字'||id.value.trim()==''){
        id.value = ''
    }
}
function Leave(){
    var id = document.getElementById('tip')
    var val = id.value;
    if (val.length=='0'||id.value.trim()==''){
        id.value='请输入关键字'
        id.className = 'gray'
    }else{
        id.className = 'black'
    }
}