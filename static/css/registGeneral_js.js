(function() {
    var b;
    $(document).ready(function() {
        $.checkValidate();
        $(".studentType").hide();
        $.initStudentType();
        $.setStyle();
        $.show_cardCode_no();
        $.initQueryInput();
        initNameNotice();
        $("#_div_password_rank").attr("title", "请输入密码！");
        $("#email").mailAutoComplete();
        $("#userName").on("keyup",
        function() {
            $("#iok_userName").hide()
        });
        $("#confirmPassWord").on("keyup",
        function() {
            $("#iok_confirmPassWord").hide()
        });
        $("#cardType").on("change",
        function() {
            if ($(this).val() == "1") {
                $(".cardLi").hide();
                $(".gjLi").hide();
                $("#nation option[value='CN']").prop("selected", true)
            } else {
                $(".cardLi").show();
                if ($(this).val() == "H" || $(this).val() == "B") {
                    $(".gjLi").show()
                } else {
                    $(".gjLi").hide();
                    $("#nation option[value='CN']").prop("selected", true)
                }
            }
        });
        $("#mobile_hy_dia_get").on("click",
        function() {
            if (a) {
                $.doGetCode()
            }
        })
    });
    var c = 120;
    var d;
    var a = true;
    jQuery.extend({
        submitRegistGeneral: function() {
            $("#registForm").submit()
        },
        initQueryInput: function() {
            $("#born_date").focus(function() {
                $("#born_date").jcalendar({})
            })
        },
        countDown: function() {
            a = false;
            c = 120;
            clearInterval(d);
            d = window.setInterval(function() {
                if (c > 0) {
                    $("#mobile_hy_dia_get").html("重新获取(" + (c--) + ")")
                } else {
                    a = true;
                    c = 120;
                    clearInterval(d);
                    $("#mobile_hy_dia_get").html("重新获取验证码")
                }
            },
            1000)
        },
        doGetCode: function() {
            $.ajax({
                url: ctx + "regist/getRandCode",
                type: "post",
                async: false,
                data: $("#registForm").serialize(),
                success: function(e) {
                    if (e.data.msg && e.data.msg.length > 0) {
                        $("#mobile_hy_dia").hide();
                        $(".dhx_modal_cover").hide();
                        dhtmlx.alert({
                            title: "提示",
                            ok: "确定",
                            text: e.data.msg,
                            type: "alert-error"
                        });
                        return false
                    } else {
                        $.countDown()
                    }
                }
            })
        },
        checkValidate: function() {
            b = $("#registForm").validate({
                onkeyup: false,
                ignore: ":hidden",
                focusInvalid: true,
                rules: {
                    "loginUserDTO.user_name": {
                        required: true,
                        minlength: 6,
                        maxlength: 30,
                        checkAnsyUserName: [ctx + "regist/checkUserName", "user_name"],
                        checkWriteSpace: true,
                        validateUsersName: true
                    },
                    "userDTO.password": {
                        required: true,
                        minlength: 6,
                        checkPassward: true,
                        checkWriteSpace: true,
                        differentFrom: "#userName",
                        validatPwd: true
                    },
                    confirmPassWord: {
                        required: true,
                        checkPassward: true,
                        equalTo: "#passWord",
                        checkWriteSpace: true
                    },
                    "loginUserDTO.name": {
                        required: true,
                        byteRangeLength: [3, 30],
                        checkNameCharBlank: "cardType@cardCode"
                    },
                    "userDTO.sex_code": {
                        required: true
                    },
                    "userDTO.email": {
                        isEmail: true,
                        byteRangeLength: [3, 30]
                    },
                    "loginUserDTO.id_type_code": {
                        required: true
                    },
                    "loginUserDTO.id_no": {
                        required: true,
                        checkIdValidStr: true,
                        isSecIDCard: "#cardType",
                        isFirIDCard: "#cardType",
                        checkHkongMacao: "#cardType",
                        checkTaiw: "#cardType",
                        checkPassport: "#cardType",
                        checkWork: "#cardType"
                    },
                    "userDTO.mobile_no": {
                        required: true,
                        isMobile: true
                    },
                    "studentInfoDTO.school_name": {
                        checkStudentName: "#passengerType"
                    },
                    "studentInfoDTO.department": {
                        studentValidateName: "#passengerType",
                        byteRangeLength: [0, 30]
                    },
                    "studentInfoDTO.school_class": {
                        studentValidateName: "#passengerType",
                        byteRangeLength: [0, 30]
                    },
                    "studentInfoDTO.student_no": {
                        studentRequired: "#passengerType",
                        studentValidateName: "#passengerType",
                        byteRangeLength: [0, 30]
                    },
                    "studentInfoDTO.preference_card_no": {
                        studentValidateName: "#passengerType",
                        byteRangeLength: [0, 30]
                    },
                    "studentInfoDTO.preference_from_station_code": {
                        checkStudentName: "#passengerType"
                    },
                    "studentInfoDTO.preference_to_station_code": {
                        checkStudentName: "#passengerType"
                    },
                    "studentInfoDTO.enter_year": {
                        studentRequired: "#passengerType"
                    }
                },
                messages: {
                    "loginUserDTO.user_name": {
                        required: "请输入用户名！",
                        minlength: "用户名长度不能少于6个字符！",
                        maxlength: "用户名长度不能多于30个字符！",
                        checkAnsyUserName: "该用户名已经占用，请重新选择用户名！",
                        checkWriteSpace: "输入的用户名不能包含空格",
                        validateUsersName: "用户名只能由字母、数字和_组成,须以字母开头！"
                    },
                    "userDTO.password": {
                        required: "请输入密码！",
                        minlength: "密码长度不能少于6个字符！",
                        checkPassward: "输入的密码不能包含非法字符！",
                        checkWriteSpace: "输入的密码不能包含空格",
                        differentFrom: "密码不能与用户名相同！",
                        validatPwd: "格式错误，必须且只能包含字母，数字，下划线中的两种或两种以上！"
                    },
                    confirmPassWord: {
                        required: "请输入确认密码！",
                        minlength: "确认密码长度不能少于6个字符！",
                        checkPassward: "输入的确认密码不能包含非法字符！",
                        equalTo: "确认密码与密码不同！",
                        checkWriteSpace: "输入的确认密码不能包含空格"
                    },
                    "loginUserDTO.name": {
                        required: "请输入您的姓名！",
                        byteRangeLength: "允许输入的字符串在3-30个字符之间！",
                        checkNameCharBlank: "姓名只能包含中文或者英文，如有生僻字或繁体字参见姓名填写规则进行填写！"
                    },
                    "userDTO.sex_code": {
                        required: "请选择性别"
                    },
                    "userDTO.email": {
                        isEmail: "请输入有效的电子邮件地址！",
                        byteRangeLength: jQuery.format("允许输入的字符串在{0}-{1}个字符之间！")
                    },
                    "loginUserDTO.id_type_code": {
                        required: "请选择证件类型！"
                    },
                    "loginUserDTO.id_no": {
                        required: "请输入证件号码！",
                        isSecIDCard: "请正确输入18位的身份证号！",
                        isFirIDCard: "请正确输入15或者18位的身份证号！",
                        checkIdValidStr: "输入的证件编号中包含中文信息或特殊字符！",
                        checkHkongMacao: "请输入有效的港澳居民通行证号码！",
                        checkTaiw: "请输入有效的台湾居民通行证号码！",
                        checkPassport: "请输入有效的护照号码！",
                        checkWork: "请输入有效的外国人居留证号码！"
                    },
                    "userDTO.mobile_no": {
                        required: "请输入手机号码！",
                        isMobile: "您输入的手机号码不是有效的格式！"
                    },
                    "studentInfoDTO.school_name": {
                        checkStudentName: "请选择学校名称！"
                    },
                    "studentInfoDTO.department": {
                        studentValidateName: "院系只能包含中文、英文、数字！",
                        byteRangeLength: jQuery.format("允许输入的字符串在{0}-{1}个字符之间！")
                    },
                    "studentInfoDTO.school_class": {
                        studentValidateName: "班级只能包含中文、英文、数字！",
                        byteRangeLength: jQuery.format("允许输入的字符串在{0}-{1}个字符之间！")
                    },
                    "studentInfoDTO.student_no": {
                        studentRequired: "请输入学号",
                        studentValidateName: "学号只能包含中文、英文、数字！",
                        byteRangeLength: jQuery.format("允许输入的字符串在1-{1}个字符之间！")
                    },
                    "studentInfoDTO.preference_from_station_code": {
                        checkStudentName: "请输入优惠区间！"
                    },
                    "studentInfoDTO.preference_to_station_code": {
                        checkStudentName: "请输入优惠区间！"
                    },
                    "studentInfoDTO.preference_card_no": {
                        studentValidateName: "优惠卡号只能包含中文、英文、数字！",
                        byteRangeLength: jQuery.format("允许输入的字符串在{0}-{1}个字符之间！")
                    },
                    "studentInfoDTO.enter_year": {
                        studentRequired: "请输入入学年份 "
                    }
                },
                submitHandler: function(f) {
                    var e = $("#cardType").val();
                    var g = $("#nation").val();
                    if (e == "C" || e == "G" || e == "1" || e == "2") {
                        if (g != "CN") {
                            dhtmlx.alert({
                                title: "输入错误",
                                ok: "确认",
                                text: "请填写正确的国家/地区",
                                type: "alert-error",
                                callback: function() {}
                            });
                            return false
                        }
                    }
                    $(f).ajaxSubmit({
                        url: ctx + "regist/getRandCode",
                        type: "post",
                        async: false,
                        beforeSubmit: function(i) {
                            var h = document.getElementById("checkAgree");
                            if (!h.checked) {
                                dhtmlx.alert({
                                    title: "提示",
                                    ok: "确定",
                                    text: "请确定服务条款！",
                                    type: "alert-error"
                                });
                                return false
                            } else {
                                return true
                            }
                        },
                        success: function(h) {
                            if (h.data.msg && h.data.msg.length > 0) {
                                dhtmlx.alert({
                                    title: "提示",
                                    ok: "确定",
                                    text: h.data.msg,
                                    type: "alert-error"
                                });
                                return false
                            } else {
                                $.showMobileHy(h.data.info_show)
                            }
                        }
                    })
                },
                errorPlacement: function(e, f) {
                    if (f.attr("name") == "loginUserDTO.name" || (f.attr("name") == "userDTO.email")) {
                        e.insertAfter(f.parent().parent())
                    } else {
                        if (f.attr("name") == "loginUserDTO.id_no") {
                            e.insertAfter(f.parent().parent())
                        } else {
                            if (f.attr("name") == "userDTO.sex_code") {
                                e.insertAfter(f.parent().parent());
                                f.parent().parent().next().css("margin-left", "118px")
                            } else {
                                if (f.attr("name") == "studentInfoDTO.preference_from_station_code" || f.attr("name") == "studentInfoDTO.preference_to_station_code") {
                                    $("#youhui").css({
                                        display: "block"
                                    });
                                    $("#preferenceFromStationNameVal").css({
                                        display: "block"
                                    });
                                    $("#preference_from_station_code").attr("class", "inptxt w90 error");
                                    $("#preferenceFromStationNameVal").html("请选择优惠区间！");
                                    $("#preferenceFromStationNameVal").css("margin-left", "2px")
                                } else {
                                    $("#preferenceFromStationNameVal").css({
                                        display: "none"
                                    });
                                    e.insertAfter(f.parent().parent())
                                }
                            }
                        }
                    }
                    if (f.attr("name") == "loginUserDTO.userName") {
                        $("#iok_userName").hide()
                    }
                    if (f.attr("name") == "confirmPassWord") {
                        $("#iok_confirmPassWord").hide()
                    }
                },
                success: function(e) {
                    e.remove(".error");
                    if (e.attr("for") == "randCode") {
                        $("#_span_rand").addClass("i-ok")
                    }
                    if (e.attr("for") == "userName") {
                        $("#iok_userName").show()
                    }
                    if (e.attr("for") == "confirmPassWord") {
                        $("#iok_confirmPassWord").show()
                    }
                }
            })
        },
        showMobileHy: function(f) {
            $("#mobile_hy_code").val("");
            $.countDown();
            $("#nextBtn").removeClass().addClass("btn122");
            if (f && f == "Y") {
                var g = $("#mobileNo").val();
                var e = "<i></i><ul>";
                e += '<li style="line-height:40px;">为了保护您的信息安全，便于今后为您服务，请按以下程序进行手机双向核验:</li>';
                e += "<li>第一步：请您用手机" + g + "发送短信999至12306，以便确认您的手机可以联络。</li>";
                e += "<li>第二步：12306接到您的短信后将给您的手机回复六位数字短信，请您在十分钟内将六位数字短信填写在下方空白框中，并点击“完成注册”按钮。</li>";
                e += '<li style="margin-left:40px;">现在先请您发送999短信，并稍候我们的回复。</li>';
                e += "</ul>";
                $("#tip_msg").html(e);
                $("#tip_title").html("手机双向验证");
                $("#mobile_hy_dia_get").hide()
            } else {
                $("#tip_title").html("手机核验");
                $("#tip_msg").html("<i></i>短信验证码已发送至" + $("#mobileNo").val() + "，十分钟内有效。")
            }
            dhtmlx.createWin({
                winId: "dialog_mobile",
                closeWinId: ["mobile_hy_dia_close", "mobile_hy_dia_cancel"],
                okId: "mobile_hy_dia_ok",
                okCallBack: function() {
                    var h = $("#registForm").serialize();
                    h = h + "&randCode=" + $("#mobile_hy_code").val();
                    $.ajax({
                        url: ctx + "regist/subDetail",
                        type: "post",
                        async: false,
                        data: h,
                        success: function(i) {
                            $("#nextBtn").removeClass().addClass("btn122s");
                            if (i.data.msg && i.data.msg.length > 0) {
                                dhtmlx.alert({
                                    title: "提示",
                                    ok: "确定",
                                    text: i.data.msg,
                                    type: "alert-error"
                                });
                                return false
                            } else {
                                otsRedirect("post", ctx + "regist/initSuc")
                            }
                        }
                    })
                },
                checkConfirm: function() {
                    return true
                },
                callback: function() {
                    $("#nextBtn").removeClass().addClass("btn122s");
                    a = true;
                    c = 120;
                    clearInterval(d);
                    $("#mobile_hy_dia_get").html("重新获取验证码")
                }
            })
        },
        initStudentType: function() {
            $("#passengerType").on("change",
            function() {
                if ($(this).val() == "3") {
                    $(".studentType").show();
                    $("#youhui").hide()
                } else {
                    $(".studentType").css("display", "none")
                }
            })
        },
        setStyle: function() {
            $("#userName").css("color", "#333");
            $("#passWord").css("color", "#333");
            $("#confirmPassWord").css("color", "#333")
        },
        show_cardCode_no: function() {
            $("#cardCode").on("focus",
            function() {
                var k = $("#cardCode").val();
                if (k != "") {
                    var j = "";
                    var h = k.length;
                    if (k.length <= 3) {
                        j = k
                    } else {
                        if (h <= 6) {
                            j = k.substring(0, 3) + " " + k.substring(3, h)
                        } else {
                            j = k.substring(0, 3) + " " + k.substring(3, 6) + "  " + k.substring(6, 14) + " " + k.substring(14, h)
                        }
                    }
                    $("#cardCode_div").html(j);
                    $("#cardCode_div").show();
                    if ($("#cardType").val() == "1") {
                        if (k.length == 18) {
                            var i = k.substring(6, 10);
                            var g = k.substring(10, 12);
                            var f = k.substring(12, 14);
                            var e = i + "-" + g + "-" + f;
                            $("#born_date").val(e)
                        }
                    }
                } else {
                    $("#cardCode_div").html("");
                    $("#cardCode_div").hide()
                }
            });
            $("#cardCode").on("keyup",
            function() {
                $("#cardCode_div").show();
                var k = $("#cardCode").val();
                var j = "";
                var h = k.length;
                if (k.length <= 3) {
                    j = k
                } else {
                    if (h <= 6) {
                        j = k.substring(0, 3) + " " + k.substring(3, h)
                    } else {
                        j = k.substring(0, 3) + " " + k.substring(3, 6) + "  " + k.substring(6, 14) + " " + k.substring(14, h)
                    }
                }
                $("#cardCode_div").html(j);
                if ($("#cardType").val() == "1") {
                    if (k.length == 18) {
                        var i = k.substring(6, 10);
                        var g = k.substring(10, 12);
                        var f = k.substring(12, 14);
                        var e = i + "-" + g + "-" + f;
                        $("#born_date").val(e)
                    }
                }
            });
            $("#cardCode").on("blur",
            function() {
                $("#cardCode_div").html("");
                $("#cardCode_div").hide()
            });
            $("#cardType").on("change",
            function() {
                if ($(this).val() == "1") {
                    var i = $("#cardCode").val();
                    if (i.length == 18) {
                        var h = i.substring(6, 10);
                        var g = i.substring(10, 12);
                        var f = i.substring(12, 14);
                        var e = h + "-" + g + "-" + f;
                        $("#born_date").val(e)
                    }
                }
            })
        },
        isNum: function(g) {
            var f = window.event ? g.keyCode: g.which;
            if (! (((f >= 48) && (f <= 57)) || f == 8 || f == 0)) {
                if (window.event) {
                    window.event.returnValue = false
                } else {
                    g.preventDefault()
                }
            }
        }
    })
})();
jQuery.validator.addMethod("checkLoginUserName",
function(f, d) {
    var a = false;
    var c = /^(13[0-9])|(14[0-9])|(15[0-9])|(18[0-9])|(17[0-9])\d{8}$/;
    var b = /^[A-Za-z]{1}([A-Za-z0-9]|[_]){0,29}$/;
    var e = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i;
    if (b.test(f) || e.test(f) || c.test(f)) {
        a = true
    }
    return this.optional(d) || a
},
"wrong username.");
jQuery.validator.addMethod("requiredUserName",
function(b, a) {
    if ("用户名／邮箱／手机号" == b) {
        return false
    }
    if (b == null || "" == b) {
        return false
    }
    return true
},
"wrong username.");
jQuery.validator.addMethod("requiredSchoolName",
function(b, a) {
    if ("简码／汉字" == b) {
        return false
    }
    if (b == null || "" == b) {
        return false
    }
    return true
},
"wrong schoolname.");
jQuery.validator.addMethod("randCodeRequired",
function(b, a) {
    $("#i-ok").css("display", "none");
    return b.length > 0
},
"验证码错误!");
jQuery.validator.addMethod("randCodeFormat",
function(c, b) {
    $("#i-ok").css("display", "none");
    var a = /^[a-zA-Z0-9]+$/;
    return this.optional(b) || a.test(c)
},
"验证码错误!");
jQuery.validator.addMethod("randCodeLength",
function(b, a) {
    $("#i-ok").css("display", "none");
    return b.length == 4
},
"验证码错误!.");
jQuery.validator.addMethod("integrationCheck",
function(b, a) {
    var c = /^\d{6}$/;
    return this.optional(a) || c.test(b)
},
"wrong integrationpassword");
jQuery.validator.addMethod("integrationPwdCheck",
function(b, a, c) {
    if ($("#" + c[0]).val() == $("#" + c[1]).val()) {
        return true
    }
    return false
},
"两次输入密码不一致!.");
jQuery.validator.addMethod("checkRandCode",
function(c, b, d) {
    var a = true;
    if (c && c.length == 4) {
        $.ajax({
            url: ctx + "passcodeNew/checkRandCodeAnsyn",
            type: "post",
            data: {
                randCode: c,
                rand: d
            },
            async: false,
            success: function(e) {
                if (e.data == "N") {
                    a = false;
                    $("#i-ok").css("display", "none")
                } else {
                    a = true;
                    $("#i-ok").css("display", "block")
                }
            }
        })
    } else {
        a = false;
        $("#i-ok").css("display", "none")
    }
    return a
},
"验证码错误!.");
jQuery.validator.addMethod("validateUsersName",
function(b, a) {
    return this.optional(a) || /^[A-Za-z]{1}([A-Za-z0-9]|[_]){0,29}$/.test(b)
},
"用户名只能由字母、数字或_组成");
jQuery.validator.addMethod("checkWriteSpace",
function(c, b) {
    for (var a = 0; a < c.length; a++) {
        if (c.charCodeAt(a) == 32) {
            return false
        }
    }
    return true
},
"contain writespace");
jQuery.validator.addMethod("validateRandCode",
function(b, a) {
    return this.optional(a) || /^[a-zA-Z0-9]+$/.test(b)
},
"验证码错误!.");
jQuery.validator.addMethod("checkPassward",
function(c, b, e) {
    var d = true;
    for (var a = 0; a < c.length; a++) {
        if (c.charCodeAt(a) == 39 || c.charCodeAt(a) == 60 || c.charCodeAt(a) == 62) {
            d = false
        }
        if (!d) {
            break
        }
    }
    return this.optional(b) || d
},
"Passward wrong");
function validateSecIdCard(g) {
    var f = 0;
    var a = g;
    var e = {
        11 : "北京",
        12 : "天津",
        13 : "河北",
        14 : "山西",
        15 : "内蒙",
        21 : "辽宁",
        22 : "吉林",
        23 : "黑龙",
        31 : "上海",
        32 : "江苏",
        33 : "浙江",
        34 : "安徽",
        35 : "福建",
        36 : "江西",
        37 : "山东",
        41 : "河南",
        42 : "湖北",
        43 : "湖南",
        44 : "广东",
        45 : "广西",
        46 : "海南",
        50 : "重庆",
        51 : "四川",
        52 : "贵州",
        53 : "云南",
        54 : "西藏",
        61 : "陕西",
        62 : "甘肃",
        63 : "青海",
        64 : "宁夏",
        65 : "新疆",
        71 : "台湾",
        81 : "香港",
        82 : "澳门",
        91 : "国外"
    };
    if (!/^\d{17}(\d|x)$/i.test(a)) {
        return false
    }
    a = a.replace(/x$/i, "a");
    if (e[parseInt(a.substr(0, 2))] == null) {
        return false
    }
    var c = a.substr(6, 4) + "-" + Number(a.substr(10, 2)) + "-" + Number(a.substr(12, 2));
    var h = new Date(c.replace(/-/g, "/"));
    if (c != (h.getFullYear() + "-" + (h.getMonth() + 1) + "-" + h.getDate())) {
        return false
    }
    for (var b = 17; b >= 0; b--) {
        f += (Math.pow(2, b) % 11) * parseInt(a.charAt(17 - b), 11)
    }
    if (f % 11 != 1) {
        return false
    }
    return true
}
function validateFirIdCard(g) {
    var f = 0;
    var a;
    var e = {
        11 : "北京",
        12 : "天津",
        13 : "河北",
        14 : "山西",
        15 : "内蒙",
        21 : "辽宁",
        22 : "吉林",
        23 : "黑龙",
        31 : "上海",
        32 : "江苏",
        33 : "浙江",
        34 : "安徽",
        35 : "福建",
        36 : "江西",
        37 : "山东",
        41 : "河南",
        42 : "湖北",
        43 : "湖南",
        44 : "广东",
        45 : "广西",
        46 : "海南",
        50 : "重庆",
        51 : "四川",
        52 : "贵州",
        53 : "云南",
        54 : "西藏",
        61 : "陕西",
        62 : "甘肃",
        63 : "青海",
        64 : "宁夏",
        65 : "新疆",
        71 : "台湾",
        81 : "香港",
        82 : "澳门",
        91 : "国外"
    };
    if (g.length == 15) {
        a = idCardUpdate(g)
    } else {
        a = g
    }
    if (!/^\d{17}(\d|x)$/i.test(a)) {
        return false
    }
    a = a.replace(/x$/i, "a");
    if (e[parseInt(a.substr(0, 2))] == null) {
        return false
    }
    var c = a.substr(6, 4) + "-" + Number(a.substr(10, 2)) + "-" + Number(a.substr(12, 2));
    var h = new Date(c.replace(/-/g, "/"));
    if (c != (h.getFullYear() + "-" + (h.getMonth() + 1) + "-" + h.getDate())) {
        return false
    }
    for (var b = 17; b >= 0; b--) {
        f += (Math.pow(2, b) % 11) * parseInt(a.charAt(17 - b), 11)
    }
    if (f % 11 != 1) {
        return false
    }
    return true
}
function idCardUpdate(g) {
    var b;
    var f = /^(\d){15}$/;
    if (f.test(g)) {
        var e = 0;
        var a = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
        var d = new Array("1", "0", "X", "9", "8", "7", "6", "5", "4", "3", "2");
        g = g.substr(0, 6) + "19" + g.substr(6, g.length - 6);
        for (var c = 0; c < g.length; c++) {
            e += parseInt(g.substr(c, 1)) * a[c]
        }
        g += d[e % 11];
        b = g
    } else {
        b = "#"
    }
    return b
}
jQuery.validator.addMethod("checkBorth",
function(e, c) {
    var b = e;
    if (b == "") {
        return true
    } else {
        var a = b.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/);
        if (a == null) {
            return false
        }
        var f = new Date(a[1], a[3] - 1, a[4]);
        return (f.getFullYear() == a[1] && (f.getMonth() + 1) == a[3] && f.getDate() == a[4])
    }
},
"日期格式不合法");
jQuery.validator.addMethod("byteRangeLength",
function(d, b, e) {
    var c = d.length;
    for (var a = 0; a < d.length; a++) {
        if (d.charCodeAt(a) > 127) {
            c++
        }
    }
    return this.optional(b) || (c >= e[0] && c <= e[1])
},
"length wrong");
jQuery.validator.addMethod("checkNameCharBlank",
function(c, b, d) {
    var a = d.split("@");
    if ($("#" + a[1]).val() == "") {
        return true
    } else {
        if ($("#" + a[0]).val() == "1" || $("#" + a[0]).val() == "2") {
            return this.optional(b) || /^[a-zA-Z·.．\u3400-\u9FFF]+$/.test(c)
        } else {
            if ($("#" + a[0]).val() == "B") {
                if (/^[-]+$/.test(c)) {
                    return false
                }
                return this.optional(b) || /^[a-z A-Z·.．\u3400-\u9FFF\-]+$/.test(c)
            } else {
                if ($("#" + a[0]).val() == "H") {
                    if (/^[-]+$/.test(c)) {
                        return false
                    }
                    return this.optional(b) || /^[a-z A-Z·。.．\u3400-\u9FFF-]+$/.test(c)
                } else {
                    return this.optional(b) || /^[a-z A-Z·.．\u3400-\u9FFF]+$/.test(c)
                }
            }
        }
    }
},
"wrong name.");
jQuery.validator.addMethod("checkIdValidStr",
function(c, b) {
    var a = /^[a-zA-Z0-9\_\-\(\)]+$/;
    return this.optional(b) || (a.test(c))
},
"wrong id");
jQuery.validator.addMethod("isSecIDCard",
function(b, a, c) {
    if (!checkIfSecIdCard($(c).val())) {
        return true
    }
    return validateSecIdCard(b)
},
"wrong");
function checkIfSecIdCard(a) {
    if (a == "1") {
        return true
    }
    return false
}
function checkIfFirIdCard(a) {
    if (a == "2") {
        return true
    }
    return false
}
function checkCardForHKorTW(a) {
    if (a == "C" || a == "G") {
        return true
    }
    return false
}
jQuery.validator.addMethod("isFirIDCard",
function(b, a, c) {
    if (!checkIfFirIdCard($(c).val())) {
        return true
    }
    return validateFirIdCard(b)
},
"wrong");
jQuery.validator.addMethod("checkHkongMacao",
function(c, b, d) {
    if ($(d).val() == "C") {
        var a = /^[HMhm]{1}([0-9]{10}|[0-9]{8})$/;
        return this.optional(b) || (a.test(c))
    } else {
        return true
    }
},
"wrong format.");
jQuery.validator.addMethod("checkTaiw",
function(c, a, e) {
    if ($(e).val() == "G") {
        var d = /^[0-9]{8}$/;
        var b = /^[0-9]{10}$/;
        return this.optional(a) || (d.test(c)) || (b.test(c))
    } else {
        return true
    }
},
"wrong format.");
jQuery.validator.addMethod("checkPassport",
function(d, b, e) {
    if ($(e).val() == "B") {
        var c = /^[a-zA-Z]{5,17}$/;
        var a = /^[a-zA-Z0-9]{5,17}$/;
        return this.optional(b) || (a.test(d)) || c.test(d)
    } else {
        return true
    }
},
"wrong format.");
jQuery.validator.addMethod("checkWork",
function(c, b, d) {
    if ($(d).val() == "H") {
        var a = /^[a-zA-Z]{3}[0-9]{12}$/;
        return this.optional(b) || (a.test(c))
    } else {
        return true
    }
},
"wrong format.");
jQuery.validator.addMethod("isMobile",
function(d, b) {
    var c = d.length;
    var a = /^(13[0-9])|(14[0-9])|(15[0-9])|(18[0-9])|(17[0-9])\d{8}$/;
    return this.optional(b) || (c == 11 && a.test(d))
},
"wrong mobile phone ");
jQuery.validator.addMethod("isTelePhone",
function(b, a) {
    var c = /(^[0-9]{3,4}\-[0-9]{3,8}$)|(^[0-9]{3,8}$)|(^[0-9]{3,4}\)[0-9]{3,8}$)|(^0{0,1}13[0-9]{9}#)/;
    return this.optional(a) || (c.test(b))
},
"wrong telePhone ");
jQuery.validator.addMethod("illegalChar",
function(c, b, e) {
    var d = true;
    if (c.indexOf("$") >= 0) {
        return false
    }
    for (var a = 0; a < c.length; a++) {
        if (c.charCodeAt(a) == 39 || c.charCodeAt(a) == 60 || c.charCodeAt(a) == 62 || c.charCodeAt(a) == 34 || c.charCodeAt(a) == 63) {
            d = false
        }
        if (!d) {
            break
        }
    }
    return this.optional(b) || d
},
"Illegal char wrong");
jQuery.validator.addMethod("isZipCode",
function(c, b) {
    var a = /^[0-9]{6}$/;
    return this.optional(b) || (a.test(c))
},
"wrong zipcode");
jQuery.validator.addMethod("isEmail",
function(c, a) {
    var b = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return this.optional(a) || (b.test(trim(c)))
},
"wrong email");
function replaceChar(b) {
    var a = b.value.replace(/['"<> ?]/g, "");
    b.value = a
}
function checkNameChar1(a) {
    return /^[a-zA-Z0-9\u3400-\u9FFF]+$/.test(a)
}
function trim(a) {
    return a.replace(/(^\s*)|(\s*$)/g, "")
}
function ltrim(a) {
    return a.replace(/(^\s*)/g, "")
}
function rtrim(a) {
    return a.replace(/(\s*$)/g, "")
}
jQuery.validator.addMethod("validateName",
function(b, a) {
    return this.optional(a) || /^[a-zA-Z\u3400-\u9FFF0-9\_]+$/.test(b)
},
"wrong username.");
jQuery.validator.addMethod("studentRequired",
function(b, a, c) {
    if ($(c).val() == "3") {
        return b && trim(b) != ""
    }
    return true
},
"wrong studentRequired.");
jQuery.validator.addMethod("studentStationRequired",
function(b, a, c) {
    if ($(c).val() == "3") {
        return b && trim(b) != "简拼/全拼/汉字" && trim(b) != ""
    }
    return true
},
"wrong studentStationRequired.");
jQuery.validator.addMethod("studentValidateName",
function(b, a, c) {
    if ($(c).val() == "3") {
        return this.optional(a) || /^[a-zA-Z\u3400-\u9FFF0-9\_]+$/.test(b)
    }
    return true
},
"wrong username.");
jQuery.validator.addMethod("checkStudentName",
function(b, a, c) {
    if ($(c).val() == "3") {
        if ((!b || trim(b) == "" || trim(b) == "简码/汉字")) {
            return false
        }
    }
    return true
},
"wrong username.");
jQuery.validator.addMethod("isQuestionNull",
function(b, a, c) {
    if (jQuery.trim(b) != "") {
        if (jQuery.trim($(c[0]).val()) == "customQuestion" && jQuery.trim($(c[1]).val()) == "" || jQuery.trim($(c[0]).val()) == "") {
            return false
        }
    }
    return true
},
"you should input the question");
jQuery.validator.addMethod("isAnswerNull",
function(b, a, c) {
    if ((jQuery.trim($(c[0]).val()) == "customQuestion" && jQuery.trim($(c[1]).val()) != "") || (jQuery.trim($(c[0]).val()) != "")) {
        if (jQuery.trim(b) == "") {
            return false
        }
    }
    return true
},
"you should input the answer");
function checkSex(c, b, a) {
    if (!checkSexByCardId(c, b, a)) {
        if (!confirm("性别与身份证中的性别不符，是否继续?")) {
            return false
        } else {
            return true
        }
    } else {
        return true
    }
}
function checkSexByCardId(c, e, a) {
    function b(h, i) {
        var g = null;
        if (i.length == 15) {
            g = i.substring(14, 15)
        } else {
            if (i.length == 18) {
                g = i.substring(16, 17)
            } else {
                return true
            }
        }
        if (g == "x" || g == "X") {
            g = "10"
        }
        var f = parseInt(g);
        var j = f % 2;
        if (j === 0 && h === "F") {
            return true
        } else {
            if (j === 1 && h === "M") {
                return true
            } else {
                return false
            }
        }
    }
    var d = $(a).val();
    if (checkIfSecIdCard($(e).val()) && validateSecIdCard(d)) {
        if (d !== "") {
            return b(c, d)
        } else {
            return true
        }
    } else {
        if (checkIfFirIdCard($(e).val()) && validateFirIdCard(d)) {
            if (d !== "") {
                return b(c, d)
            } else {
                return true
            }
        } else {
            return true
        }
    }
}
function checkBirdDateByCardId(c, e, b) {
    var a = null;
    var d = $(b).val();
    if (checkIfSecIdCard($(e).val()) && d !== "" && validateSecIdCard(d)) {
        a = d.substring(6, 14)
    } else {
        if (checkIfFirIdCard($(e).val()) && d !== "" && validateFirIdCard(d)) {
            if (d.length == 15) {
                a = "19" + d.substring(6, 12)
            } else {
                if (d.length == 18) {
                    a = d.substring(6, 14)
                }
            }
        } else {
            return true
        }
    }
    if (c !== "") {
        c = c.replace(/-/g, "");
        if (c != a) {
            return false
        } else {
            return true
        }
    } else {
        return true
    }
}
function checkBirdate(c, b, a) {
    if (!checkBirdDateByCardId(c, b, a)) {
        if (!confirm("出生日期与身份证中的出生日期不符，是否继续?")) {
            return false
        } else {
            return true
        }
    } else {
        return true
    }
}
jQuery.validator.addMethod("checkPwdValidate",
function(b, a) {
    return this.optional(a) || /(?![a-z]+$|[0-9]+$|_+$)^[a-zA-Z0-9_]{6,}$/.test(b)
},
"contain writespace");
jQuery.validator.addMethod("checkConfirmPassWard",
function(b, a, c) {
    if ($(c).val() != null) {
        return $(c).val() == b
    }
    return true
},
"contain writespace");
jQuery.validator.addMethod("IVR_passwd_format",
function(b, a) {
    var c = /^[0-9]{6}$/;
    return this.optional(a) || c.test(b)
},
"验证码错误!.");
jQuery.validator.addMethod("checkStation",
function(b, a) {
    if ((!b || trim(b) == "" || trim(b) == "简拼/全拼/汉字" || trim(b) == "简拼/全拼/汉字或↑↓")) {
        return false
    }
    return true
},
"wrong username.");
jQuery.validator.addMethod("checkAnsyUserName",
function(e, c, f) {
    var b = f[0];
    var d = $("#" + f[1]).val();
    var a = true;
    $.ajax({
        url: b + "?user_name=" + e,
        type: "get",
        async: false,
        success: function(g, h) {
            if (g.data == true) {
                a = false
            } else {
                a = true
            }
        },
        error: function(g, i, h) {
            a = false
        }
    });
    return a
},
"wrong cardNo");
function checkPwdRank(e, a, d) {
    var b = $(e);
    var c = b.val();
    if (c.length <= 6 || new RegExp("^[a-zA-Z]{6,}$").test(c) || new RegExp("^[0-9]{6,}$").test(c) || new RegExp("^[_]{6,}$").test(c)) {
        $("#" + a).attr("title", "危险");
        $("#" + d).html("危险");
        $("#" + a).removeClass("rank-a");
        $("#" + a).removeClass("rank-b");
        $("#" + a).removeClass("rank-c");
        $("#" + a).addClass("rank-a")
    } else {
        if (c.length > 6 && new RegExp("[a-zA-Z]").test(c) && new RegExp("[0-9]").test(c) && new RegExp("[_]").test(c)) {
            $("#" + a).attr("title", "安全");
            $("#" + d).html("安全");
            $("#" + a).removeClass("rank-a");
            $("#" + a).removeClass("rank-b");
            $("#" + a).removeClass("rank-c");
            $("#" + a).addClass("rank-c")
        } else {
            $("#" + a).attr("title", "一般");
            $("#" + d).html("一般");
            $("#" + a).removeClass("rank-a");
            $("#" + a).removeClass("rank-b");
            $("#" + a).removeClass("rank-c");
            $("#" + a).addClass("rank-b")
        }
    }
}
Array.prototype.unique = function() {
    var b = {},
    a = this.length;
    for (var c = 0; c < a; c++) {
        if (typeof b[this[c]] == "undefined") {
            b[this[c]] = 1
        }
    }
    this.length = 0;
    a = 0;
    for (var c in b) {
        this[a++] = c
    }
    return this
};
function checkSearchPwdRank(h, c, g) {
    var e = $(h);
    var f = e.val();
    if (f.length < 6) {
        $("#" + c).attr("title", "危险");
        $("#" + g).html("危险");
        $("#" + c).removeClass("rank-a");
        $("#" + c).removeClass("rank-b");
        $("#" + c).removeClass("rank-c");
        $("#" + c).addClass("rank-a")
    } else {
        var a = [];
        for (var b = 0; b < 6; b++) {
            a.push(f.charAt(b))
        }
        a = a.unique();
        var d = a.length;
        if (d == 1) {
            $("#" + c).attr("title", "危险");
            $("#" + g).html("危险");
            $("#" + c).removeClass("rank-a");
            $("#" + c).removeClass("rank-b");
            $("#" + c).removeClass("rank-c");
            $("#" + c).addClass("rank-a")
        } else {
            if (d > 1 && d < 5) {
                $("#" + c).attr("title", "一般");
                $("#" + g).html("一般");
                $("#" + c).removeClass("rank-a");
                $("#" + c).removeClass("rank-b");
                $("#" + c).removeClass("rank-c");
                $("#" + c).addClass("rank-b")
            } else {
                $("#" + c).attr("title", "安全");
                $("#" + g).html("安全");
                $("#" + c).removeClass("rank-a");
                $("#" + c).removeClass("rank-b");
                $("#" + c).removeClass("rank-c");
                $("#" + c).addClass("rank-c")
            }
        }
    }
}
jQuery.validator.addMethod("checkDetailAddress",
function(b, a) {
    return this.optional(a) || /^[0-9a-zA-Z\u3400-\u9FFF\#]+$/.test(b)
},
"wrong name.");
jQuery.validator.addMethod("checkAddressName",
function(b, a) {
    if (/^[-]+$/.test(b)) {
        return false
    }
    return this.optional(a) || /^[a-z A-Z·.．\u3400-\u9FFF\-]+$/.test(b) || /^[a-zA-Z·.．\u3400-\u9FFF]+$/.test(b)
},
"wrong name.");
jQuery.validator.addMethod("checkAddressSelect",
function(b, a) {
    if ("" == b) {
        return false
    }
    if (b) {
        return true
    }
    return this.optional(a)
},
"wrong name.");
var login_messages = {
    randCodeError: "验证码错误!",
    randCodeExpired: "验证码失效",
    randCodeLentgh: "验证码长度为4位!",
    randCodeFormat: "验证码只能由数字或字母组成!",
    randCodeEmpty: "验证码不能为空!",
    userNameEmpty: "登录名必须填写!",
    userNameFormat: "登录名格式不正确，请重新输入!",
    passwordEmpty: "密码必须填写,且不少于6位!",
    passwordLength: "密码长度不能少于6位!",
    pleaseClickCaptcha: "请点击验证码",
    pleaseClickLeftCaptcha: "请点击左侧验证码",
    pleaseClickCaptchaRight: "请点击正确的验证码",
    pleaseClickBottomCaptcha: "请点击下方验证码",
    loginError: "当前访问用户过多,请稍候重试!",
    submitAfterVerify: "提交",
    pleaseClickSubmitButtonAfterClick: "pleaseClickSubmitButtonAfterClick",
    leftTicketOrderNoteMessage: '点击"提交"按钮获取验证码',
    leftTicketOrderClickCallbackNoteMessage: '完成选择后，继续点击下方橙色"提交"按钮提交订单',
    leftTicketOrderShowCallbackNoteMessage: "按照提示点击选择所有的图片",
    leftTicketOrderHiddenCallbackNoteMessage: '点击"提交"按钮获取验证码',
    getCaptchaByClick: "点击获取验证码"
};