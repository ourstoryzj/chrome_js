// ==UserScript==
// @name         New Userscript
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
// @require      http://libs.baidu.com/jquery/2.0.0/jquery.min.js
// @run-at       document-idle
// @updateURL    
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...

    //获取网站网址
    var url = window.location.href;
    var tiquma;

    var p = document.createElement('p');
    p.id = 'zj_showbox';
    document.body.appendChild(p);

    if(url.indexOf('uvtao.com')>-1)
    {
        if(document.getElementsByClassName('t_f')[0].getElementsByTagName('a')[0] != null)
        {
            var aa = document.getElementsByClassName('t_f')[0].getElementsByTagName('a')[ document.getElementsByClassName('t_f')[0].getElementsByTagName('a').length-1].href;
            console.log(aa);
            //alert(aa);
            if(aa.indexOf('pan.baidu.com') > -1)
            {
                tiquma = document.getElementsByClassName('t_f')[0].getElementsByTagName('div')[document.getElementsByClassName('t_f')[0].getElementsByTagName('div').length-1].innerText;
                console.log(tiquma);
                tiquma = tiquma.replace('提取码：',"");
                //setCookie('tiquma',tiquma,30);
                //alert(getCookie('tiquma'));
                console.log(tiquma);
                GM_setValue('tiqumas',tiquma);
                window.location.href = aa;
            }
        }
    }
    else if(url.indexOf('pan.baidu.com/share/init?surl')>-1)
    {
        var ma = GM_getValue('tiqumas');
        //alert(ma);
        if(ma!=null)
        {
            document.getElementsByTagName('input')[0].value = ma;
            document.getElementsByClassName('g-button-right')[0].click();
            return;
        }
        else
        {
            var	input = document.querySelector('.pickpw input[tabindex="1"], .access-box input#accessCode');
            var	btn = document.querySelector('.pickpw a.g-button, .access-box a#getfileBtn');
            if (!input || !btn){
                return;
            }
            var	label = document.querySelector('.pickpw dt, .access-box label[for=accessCode]');
            var	shareID = (location.href.match(/\/init\?(?:surl|shareid)=((?:\w|-)+)/) || location.href.match(/\/s\/1((?:\w|-)+)/))[1];
            label.style.margin="-5px 0 10px";
            label.innerHTML += '<br>提取码自动填写：';
            var urls ='https://ypsuperkey.meek.com.cn/api/items/BDY-' + shareID + '?access_key=4fxNbkKKJX2pAm3b8AEu2zT5d2MbqGbD&client_version=2018.8';
            //alert(url);
            GM_xmlhttpRequest({
                method: 'GET',
                url: urls,
                onload: function(xhr) {
                    var e = JSON.parse(xhr.responseText);
                    label.innerHTML += xhr.status == 200
                        ? (e.access_code ? '提取码已获取'.fontcolor('blue') : '提取码未找到'.fontcolor('red'))
                    : '服务器出现异常'.fontcolor('red');
                    if (xhr.status == 200 && e.access_code) {
                        input.value = e.access_code;//填写密码
                        setTimeout(function(){btn.click();}, 1000);
                    }
                }
            });
        }
        /*
        alert(getCookie('tiquma'));
        if(tiquma != "" && tiquma != null)
        {

            document.getElementsByTagName('input')[0].value = tiquma;
            document.getElementsByClassName('g-button-right')[0].click();
        }

       //localStorage.removeItem("tiquma");*/
    }
    else if (url.indexOf('pan.baidu.com/s')>-1)
    {
        if(document.getElementsByClassName('share-list')[0]!=null)
        {
            document.getElementsByClassName('share-list')[0].getElementsByTagName('li')[2].getElementsByTagName('span')[0].click();//全选
        }
        document.getElementsByClassName('g-button-right')[0].click();//保存
        setTimeout(function(){
            document.getElementsByClassName('save-chk-io')[0].click();//常用
        },500);
    }
    else if (url.indexOf('taobao.com/category') > -1 || url.indexOf('taobao.com/search') > -1) {
        //alert('进来了taobao.com/category');
        setTimeout(function(){
            var length = document.getElementsByClassName('shop-hesper-bd grid')[0].getElementsByClassName('item').length;
            for (var i = 0; i < length; i++) {
                var href_str = document.getElementsByClassName('shop-hesper-bd grid')[0].getElementsByClassName('item')[i].getElementsByClassName('J_TGoldData')[0].href
                p.innerHTML = p.innerHTML + '<br> ' + href_str;
            }

        },3000);
    }

})();

