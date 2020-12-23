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

/**
 * 手机号录入弹出层
 * @param title 弹出框标题
 * @param btnText 弹出框按钮文本
 * @param callback 弹出框回掉方法(正确填写手机号码后触发)
 */
function openLayer(title, btnText, callback) {
  layer.open({
    title  : title,
    content: '<form><input name="phone" style="line-height: 1rem; width: 70%" type="tel" placeholder="请输入手机号码" /></form>',
    btn    : btnText,
    yes    : function (index) {
      var phone = $('input[name=phone]').val();
      if (!/^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/.test(phone)) {
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

//文字滚动
function scroll(node, lineHeight) {
  if (node.scrollHeight > node.clientHeight) {
    node.appendChild(node.children[0].cloneNode(true));
  }
  
  var lineHeight = parseInt(window.getComputedStyle(node, null).lineHeight);
  var tid        = null;
  var stop       = true;
  
  function step(timestamp) {
    tid = requestAnimationFrame(step);
    if (node.scrollHeight <= node.clientHeight) {
      return false;
    }
    var scrollSpace = node.scrollHeight / 2;
    var st          = node.scrollTop;
    if (st + 2 >= scrollSpace) {
      node.appendChild(node.children[0]);
    }
    else {
      if (st % lineHeight == 0 && st != 0) {
        cancelAnimationFrame(tid);
        
        setTimeout(function () {
          node.scrollTop = st + 1;
          step();
        }, 2000);
        
      }
      else {
        node.scrollTop = st + 1;
      }
    }
  }
  
  requestAnimationFrame(step);
}