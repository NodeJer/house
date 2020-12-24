//手机号正则
var phoneReg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
//姓名正则
var nameReg  = /^[\u4E00-\u9FA5]{2,4}$/;
//时间正则
var dateReg  = /^[1-2][0-9][0-9][0-9]-[0-1]{0,1}[0-9]-[0-3]{0,1}[0-9]$/;
/*首页轮播图*/
new Swiper('#homeBanner', {
  pagination         : '#homeBannerPagination',
  // autoplay           : 5000,
  paginationClickable: false,
  loop               : false
});
/*项目图库轮播图*/
new Swiper('#gallery', {
  pagination         : '#galleryPagination',
  // autoplay           : 5000,
  paginationClickable: false,
  loop               : false
});
/*户型鉴赏轮播图*/
new Swiper('#houseModel', {
  pagination         : '#houseModelPagination',
  // autoplay           : 5000,
  paginationClickable: false,
  loop               : false
});
/*特价房源轮播图*/
new Swiper('#tejia', {
  pagination         : '#tejiaPagination',
  // autoplay           : 5000,
  paginationClickable: false,
  loop               : false
});

//预约看房日期选择
var calendar = new LCalendar();
calendar.init({
  'trigger': '#dateTime',//标签id
  'type'   : 'date',//date 调出日期选择 datetime 调出日期时间选择 time 调出时间选择 ym 调出年月选择
  // 'minDate': new Date().toLocaleDateString().replace(/\//g, '-'),//最小日期 注意：该值会覆盖标签内定义的日期范围
});
//奖品列表
var prizeList = [
  {
    label: '500元加油卡',
    angle: 360
  },
  {
    label: '报销来回车费',
    angle: 400
  },
  {
    label: '海鲜自助大餐',
    angle: 440
  },
  {
    label: '酒店住宿1晚',
    angle: 480
  },
  {
    label: '1500元飞机票',
    angle: 520
  },
  {
    label: '1000元高铁票',
    angle: 560
  },
  {
    label: '免费专车接送',
    angle: 600
  },
  {
    label: '水上乐园门票',
    angle: 640
  },
  {
    label: '谢谢参与',
    angle: 680
  },
];

//获取中奖记录
$.get('https://hd.zdb.im/v2/view/randUserList', function (response) {
  var lotteryHistoryNode     = $('.lottery .history');
  var lotteryHistoryListNode = lotteryHistoryNode.children()[0];
  
  response.data.forEach(function (item) {
    var random = parseInt(Math.random() * 8);
    var prize  = prizeList[random];
    lotteryHistoryListNode.innerHTML += '<p>恭喜用户' + item['mobile'] + '获得' + prize.label + '</p>';
  });
  //大转盘中奖记录文字滚动
  scroll(lotteryHistoryNode[0]);
});

$(function (){
  //业主论坛滚动
  scroll($('#forumBody')[0], $('#forumBody .item')[0].offsetHeight + 1);
  //业主微信群滚动
  scroll($('#wechatBody')[0]);
});

//抽奖
function goLottery() {
  openLayer('留下联系方式，领取奖品', '立即抽奖', function (phone) {
    var random = parseInt(Math.random() * 9);
    var prize  = prizeList[random];
    
    $('#lotteryPan').rotate({
      duration : 6000,
      angle    : 0,
      animateTo: prize.angle,
      callback : function () {
        //谢谢参与
        if (random === 9) {
          alert(prize.label);
        }
        //获得奖品
        else {
          //todo 这里调用奖品记录接口
          
          alert('恭喜获得' + prize.label);
        }
      }
    });
  });
}

//领取活动福利弹框
function goWelfare() {
  openLayer('领取购房活动福利', '立即领取', function (phone) {
    //todo 调用领取购房活动福利接口
    alert('调用领取购房活动福利接口');
  });
}

//免费领纸质楼书弹框
function goPaperBook() {
  openLayer('免费领纸质楼书', '立即领取', function (phone) {
    //todo 调用免费领纸质楼书接口
    alert('调用免费领纸质楼书接口');
  });
}

//免费领电子楼书弹框
function goElectronBook() {
  openLayer('免费领电子楼书', '立即领取', function (phone) {
    //todo 调用免费领电子楼书接口
    alert('调用免费领电子楼书接口');
  });
}

//获取项目精准置业分析
function goAnalysis() {
  openLayer('获取项目精准置业分析', '立即获取', function (phone) {
    //todo 调用获取项目精准置业分析接口
    alert('调用获取项目精准置业分析接口');
  });
}

//申请远程视频看房
function goLiveHouse() {
  openLayer('申请远程视频看房', '立即申请', function (phone) {
    //todo 调用申请远程视频看房接口
    alert('调用申请远程视频看房接口');
  });
}

//获取楼盘及报价
function goBaoJia() {
  openLayer('获取楼盘及报价', '立即获取', function (phone) {
    //todo 调用获取楼盘及报价接口
    alert('调用获取楼盘及报价接口');
  });
}

//立即预约看房
function goBook() {
  var $form = $('#book');
  
  if (!nameReg.test($form[0]['realname'].value)) {
    alert('请输入合法姓名');
    return false;
  }
  else if (!phoneReg.test($form[0]['phone'].value)) {
    alert('请输入格式正确的手机号码');
    return false;
  }
  else if (!dateReg.test($form[0]['dateTime'].value)) {
    alert('请输入格式正确的日期');
    return false;
  }
  else {
    //todo 立即预约看房
    alert('立即预约看房接口' + $form.serialize());
  }
}

//在线看房
function goOnlineRoom() {
  var $form = $('#onlineRoom');
  
  if (!phoneReg.test($form[0]['phone'].value)) {
    alert('请输入格式正确的手机号码');
    return false;
  }
  else {
    //todo 在线看房
    alert('在线看房接口' + $form.serialize());
  }
}

//查看特价户型房源
function goTejia() {
  openLayer('查看特价户型房源', '立即查看', function (phone) {
    //todo 调用查看特价户型房源接口
    alert('调用查看特价户型房源接口');
  });
}

//登录查看在售房源
function goLogin() {
  alert('登录查看在售房源');
}

//获取该房号计价单
function goOnlineCompute() {
  var $form = $('#onlineCompute');
  
  if (!phoneReg.test($form[0]['phone'].value)) {
    alert('请输入格式正确的手机号码');
    return false;
  }
  else if ($form[0]['block'].value == '') {
    alert('请输入栋号');
    return false;
  }
  else if ($form[0]['room'].value == '') {
    alert('请输入房号');
    return false;
  }
  else {
    //todo 获取该房号计价单接口
    alert('获取该房号计价单' + $form.serialize());
  }
}

//置业顾问咨询
function goGuwen() {
  openLayer('预约顾问', '立即预约', function (phone) {
    //todo 调用置业顾问咨询接口
    alert('调用置业顾问咨询接口');
  });
}

//百问百答
function goAsk() {
  var $form = $('#ask');
  
  if (!phoneReg.test($form[0]['phone'].value)) {
    alert('请输入格式正确的手机号码');
    return false;
  }
  else if ($form[0]['consult'].value == '') {
    alert('请输入问题');
    return false;
  }
  else {
    //todo 百问百答接口
    alert('百问百答' + $form.serialize());
  }
}

//查看更多动态
function goNews() {
  openLayer('查看更多动态', '立即查看', function (phone) {
    //todo 调用查看更多动态接口
    alert('调用查看更多动态接口');
  });
}

//一键订阅
function goDescribe() {
  openLayer('订阅项目动态', '立即订阅', function (phone) {
    //todo 调用一键订阅接口
    alert('调用一键订阅接口');
  });
}

//业主论坛查看全部
function goFornumAll() {
  openLayer('查看全部', '立即查看', function (phone) {
    //todo 调用业主论坛查看全部接口
    alert('调用业主论坛查看全部接口');
  });
}

//业主论坛评论
function goFornumComment() {
  openLayerComment('我要评论', '立即评论', function (comment) {
    //todo 调用业主论坛评论接口
    alert('调用业主论坛评论接口=>' + comment);
  });
}

//业主微信群
function goJoin() {
  openLayer('加入业主微信群', '立即加入', function (phone) {
    //todo 调用加入业主微信群接口
    alert('调用加入业主微信群接口');
  });
}

//楼盘证书
function goZhenshu() {
  openLayer('查看项目五证高清图片', '立即查看', function (phone) {
    //todo 调用查看楼盘证书接口
    alert('调用查看楼盘证书接口');
  });
}

//项目位置
function goLocation() {
  openLayer('获取项目地址', '立即获取', function (phone) {
    //todo 调用项目位置接口
    alert('调用项目位置接口');
  });
}

/**
 * 手机号录入弹出层
 * @param title 弹出框标题
 * @param btnText 弹出框按钮文本
 * @param callback 弹出框回掉方法(正确填写手机号码后触发)
 */
function openLayer(title, btnText, callback) {
  layer.open({
    title  : title,
    content: '<form><input autofocus name="layerPhone" style="line-height: 1rem; width: 70%" type="tel" placeholder="请输入手机号码" /></form>',
    btn    : [btnText, '关闭'],
    success: function () {
      $('input[name=layerPhone]')[0].focus();
    },
    cancel : function (index) {
      layer.close(index);
    },
    yes    : function (index) {
      var phone = $('input[name=layerPhone]').val();
      if (!phoneReg.test(phone)) {
        alert('手机号码格式不正确！');
      }
      //正确填写手机号码
      else {
        callback(phone);
        layer.close(index);
      }
    }
  });
}

/**
 * 评论弹出层
 * @param title 弹出框标题
 * @param btnText 弹出框按钮文本
 * @param callback 弹出框回掉方法
 */
function openLayerComment(title, btnText, callback) {
  layer.open({
    title  : title,
    content: '<form><textarea id="layerComment" name="layerComment" style="width: 70%; height: 2rem; resize: none" placeholder="请输入评论"></textarea></form>',
    btn    : [btnText, '关闭'],
    cancel : function (index) {
      layer.close(index);
    },
    yes    : function (index) {
      var layerComment = $('#layerComment').val();
      if (layerComment == '') {
        alert('请填写评论！');
      }
      //正确填写手机号码
      else {
        callback(layerComment);
        layer.close(index);
      }
    }
  });
}

//文字滚动
function scroll(node, lineHeight) {
  if (node.scrollHeight > node.clientHeight) {
    node.appendChild(node.children[0].cloneNode(true));
  }
  
  var lineHeight = lineHeight || parseInt(window.getComputedStyle(node, null).lineHeight);
  var tid        = null;
  var stop       = true;
  
  function step(timestamp) {
    tid = requestAnimationFrame(step);
    if (node.scrollHeight <= node.clientHeight) {
      return false;
    }
    var scrollSpace = node.scrollHeight / 2;
    var st          = node.scrollTop;
    if (st + 4 >= scrollSpace) {
      node.appendChild(node.children[0]);
    }
    else {
      if (st % lineHeight == 0 && st != 0) {
        cancelAnimationFrame(tid);
        
        setTimeout(function () {
          node.scrollTop = st + 1;
          step();
        }, 3000);
        
      }
      else {
        node.scrollTop = st + 1;
      }
    }
  }
  
  requestAnimationFrame(step);
}