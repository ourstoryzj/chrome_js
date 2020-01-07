// ==UserScript==
// @name         chrome_js
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.uvtao.com/
// @include      *://*.uvtao.com/*
// @include      *://*.baidu.com/*
// @include      *://*
// @connect		 ypsuperkey.meek.com.cn
// @grant        GM_xmlhttpRequest
// @grant        GM_getResourceText
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_download
// @grant        GM_openInTab
// @grant        GM_setClipboard
// @require      http://libs.baidu.com/jquery/2.0.0/jquery.min.js
// @run-at       document-idle
// @updateURL    http://raw.githack.com/ourstoryzj/chrome_js/master/main.js
// ==/UserScript==

(function () {
    'use strict';

    //获取网站网址
    var url = window.location.href;

    if (url.indexOf('uvtao.com') > -1) {
        //=======================================================================================
        //如果是uvtao教程网站，自动打开百度网盘并输入密码
        if (document.getElementsByClassName('t_f')[0].getElementsByTagName('a')[0] != null) {
            var aa = document.getElementsByClassName('t_f')[0].getElementsByTagName('a')[document.getElementsByClassName('t_f')[0].getElementsByTagName

('a').length - 1].href;
            console.log(aa);
            //alert(aa);
            if (aa.indexOf('pan.baidu.com') > -1) {
                var tiquma = document.getElementsByClassName('t_f')[0].getElementsByTagName('div')[document.getElementsByClassName('t_f')[0].getElementsByTagName

('div').length - 1].innerText;
                console.log(tiquma);
                tiquma = tiquma.replace('提取码：', "");
                //setCookie('tiquma',tiquma,30);
                //alert(getCookie('tiquma'));
                console.log(tiquma);
                GM_setValue('tiqumas', tiquma); //复制到jslocal
                window.location.href = aa;
            }
        }
    } else if (url.indexOf('pan.baidu.com/share/init?surl') > -1) {
        //=======================================================================================
        //如果是uvtao教程网站，自动打开百度网盘并输入密码
        var ma = GM_getValue('tiqumas');
        //alert(ma);
        if (ma != null) {
            document.getElementsByTagName('input')[0].value = ma;
            document.getElementsByClassName('g-button-right')[0].click();
            return;
        } else {
            //使用外部网站获取百度网盘密码
            var input = document.querySelector('.pickpw input[tabindex="1"], .access-box input#accessCode');
            var btn = document.querySelector('.pickpw a.g-button, .access-box a#getfileBtn');
            if (!input || !btn) {
                return;
            }
            var label = document.querySelector('.pickpw dt, .access-box label[for=accessCode]');
            var shareID = (location.href.match(/\/init\?(?:surl|shareid)=((?:\w|-)+)/) || location.href.match(/\/s\/1((?:\w|-)+)/))[1];
            label.style.margin = "-5px 0 10px";
            label.innerHTML += '<br>提取码自动填写：';
            var urls = 'https://ypsuperkey.meek.com.cn/api/items/BDY-' + shareID + '?access_key=4fxNbkKKJX2pAm3b8AEu2zT5d2MbqGbD&client_version=2018.8';
            //alert(url);
            GM_xmlhttpRequest({
                method: 'GET',
                url: urls,
                onload: function (xhr) {
                    var e = JSON.parse(xhr.responseText);
                    label.innerHTML += xhr.status == 200 ?
                        (e.access_code ? '提取码已获取'.fontcolor('blue') : '提取码未找到'.fontcolor('red')) :
                        '服务器出现异常'.fontcolor('red');
                    if (xhr.status == 200 && e.access_code) {
                        input.value = e.access_code; //填写密码
                        setTimeout(function () {
                            btn.click();
                        }, 1000);
                    }
                }
            });
        }

    } else if (url.indexOf('pan.baidu.com/s') > -1) {
        //=======================================================================================
        //进入网盘，自动点击全选，点击保存，点击上次存储位置
        if (document.getElementsByClassName('share-list')[0] != null) {
            document.getElementsByClassName('share-list')[0].getElementsByTagName('li')[2].getElementsByTagName('span')[0].click(); //全选
        }
        document.getElementsByClassName('g-button-right')[0].click(); //保存
        setTimeout(function () {
            document.getElementsByClassName('save-chk-io')[0].click(); //常用
        }, 500);
    } else if (url.indexOf('taobao.com/category') > -1 || url.indexOf('taobao.com/search') > -1) {
        //=======================================================================================
        //进入淘宝分类页面，提取当页面所有商品链接
        //添加p标签
        var p = document.createElement('p');
        p.id = 'zj_showbox';
        document.body.appendChild(p);
        setTimeout(function () {
            var length = document.getElementsByClassName('shop-hesper-bd grid')[0].getElementsByClassName('item').length;
            for (var i = 0; i < length; i++) {
                var href_str = document.getElementsByClassName('shop-hesper-bd grid')[0].getElementsByClassName('item')[i].getElementsByClassName('J_TGoldData')

[0].href
                p.innerHTML = p.innerHTML + '<br> ' + href_str;
            }
            GM_setClipboard(p.innerText);
        }, 3000);
    }
    else if (url.indexOf('item.taobao.com/item.htm') > -1) {
        //=======================================================================================
        //如果进入了宝贝详情页
        setTimeout(function () {
	        var dt =g_config.idata.item.dbst;
            var updt = new Date(dt).toLocaleString();
            document.getElementsByClassName('tb-main-title')[0].innerText = document.getElementsByClassName('tb-main-title')[0].innerText + '上架时间:'+updt;
        }, 3000);
    }
    else if (url.indexOf('login.taobao.com') > -1) {
        //=======================================================================================
        //自动登录
        var username = document.getElementById('TPL_username_1');
        username.focus();
        username.value = '迷你淘包铺';
        var password = document.getElementById('TPL_password_1');
        password.focus();
        password.value = 'zj013368qw@';
        var btns = document.getElementById('J_SubmitStatic');
        btns.focus();
        setTimeout(function () {
            //检测是否需要安全验证
            var noCaptcha = document.getElementById('nocaptcha');
            if (noCaptcha && noCaptcha.className == "nc-container tb-login" &&
                noCaptcha.style.display != "block") {
                var submitStatic = document.getElementById("J_SubmitStatic");
                if (submitStatic) submitStatic.click();
            }
        }, 2000);
    }
    else if(url.indexOf('breakserver.hichina.com')>-1){
        //=======================================================================================
        //自动登录OA
        var pwd = document.getElementById('password');
        pwd.focus();
        pwd.value = 'zhangjian';
        var vc = document.getElementById('verify_code');
        vc.focus();
    }

})();