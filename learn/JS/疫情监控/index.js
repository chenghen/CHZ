class Http {

  //get请求
  get(url) {

    return new Promise((resolved, rejected) => {

      //创建ajax对象
      let xhr = new XMLHttpRequest();

      //监听ajax状态变化
      xhr.onreadystatechange = function () {

        if (this.readyState == 4 && this.status == 200) {
          //凝固结果
          resolved(this.responseText);
        }

      }

      //建立服务器连接
      xhr.open('GET', url, true);

      //发起请求
      xhr.send();

    })

  }

}

let http = new Http();

//发起get请求
http.get('https://api.tianapi.com/txapi/ncov/index?key=9823e6172b17190da652d51c52a2501a ').then(result => {
  result = JSON.parse(result);
  console.log(result);
  // console.log(result.newslist[0].desc)
  // console.log(result.newslist[0].desc.confirmedCount)
  // console.log(result.newslist[0].desc.curedCount);
  // console.log(result.newslist[0].desc.confirmedIncr)

  fn(result.newslist[0].desc.confirmedCount);
  fn2(result.newslist[0].desc.curedCount);
  fn3(result.newslist[0].desc.deadCount);
  fn4(result.newslist[0].desc.currentConfirmedCount);
  fn5(result.newslist[0].desc.seriousCount);
  // fn6(result.newslist[0].desc.suspectedIncr);
  don(result.newslist[0].desc.confirmedIncr);
  don2(result.newslist[0].desc.curedIncr);
  don3(result.newslist[0].desc.deadIncr);
  don4(result.newslist[0].desc.currentConfirmedIncr);
  don5(result.newslist[0].desc.seriousIncr);
  // 全球数据
  console.log('confirmedCount==>', result.newslist[0].desc.globalStatistics.confirmedCount)
  quan1(result.newslist[0].desc.globalStatistics.confirmedCount);
  // curedCount 全球治愈
  quan2(result.newslist[0].desc.globalStatistics.curedCount);
  // deadCount 全球死亡
  quan3(result.newslist[0].desc.globalStatistics.deadCount);
  // 全球现有确诊
  console.log(result.newslist[0].desc.globalStatistics.currentConfirmedCount)
  quan4(result.newslist[0].desc.globalStatistics.currentConfirmedCount);

  // 较前一天确诊
  con1(result.newslist[0].desc.globalStatistics.confirmedIncr);
  // 较前一天治愈
  con2(result.newslist[0].desc.globalStatistics.curedIncr);
  // 较前一天死亡
  con3(result.newslist[0].desc.globalStatistics.deadIncr);
  // 较前一天现有确诊
  con4(result.newslist[0].desc.globalStatistics.currentConfirmedIncr);

})

function query(selector) {
  return document.querySelectorAll(selector);
}
function fn(data) {
  // 累计确诊
  // console.log("data ==>",data)
  query('.shu')[0].innerText = data;
}
function fn2(data) {
  // 累计治愈
  query('.h5-2')[0].innerText = data;
}
function fn3(data) {
  // 累计死亡
  query('.h5-3')[0].innerText = data;
}
function fn4(data) {
  // 现有确诊
  query('.h5-4')[0].innerText = data;
}
function fn5(data) {
  // 现存重症人数
  query('.h5-5')[0].innerText = data;
}
function fn6(data) {
  // 境外输入
  query('.h5-6')[0].innerText = data;
}
function don(data) {
  console.log("data ==>", data)
  query('.span-1')[0].innerText = '+' + data;
}
function don2(data) {
  query('.span-2')[0].innerText = '+' + data;
}
function don3(data) {
  query('.span-3')[0].innerText = '+' + data;
}
function don4(data) {
  query('.span-4')[0].innerText = '+' + data;
}
function don5(data) {
  query('.span-5')[0].innerText = '+' + data;
}


// 全球数据
function quan1(data) {
  query('.cz1')[0].innerText = data;
}
function quan2(data) {
  query('.cz2')[0].innerText = data;
}
function quan3(data) {
  query('.cz3')[0].innerText = data;
}
function quan4(data) {
  query('.cz4')[0].innerText = data;
}

function con1(data) {
  query('.qguo1')[0].innerText = '+' + data;
}
function con2(data) {
  query('.qguo2')[0].innerText = '+' + data;
}
function con3(data) {
  query('.qguo3')[0].innerText = '+' + data;
}
function con4(data) {
  query('.qguo4')[0].innerText = data;
}

class Http2 {

  //get请求
  get(url) {

    return new Promise((resolved, rejected) => {

      //创建ajax对象
      let xhr = new XMLHttpRequest();

      //监听ajax状态变化
      xhr.onreadystatechange = function () {

        if (this.readyState == 4 && this.status == 200) {
          //凝固结果
          resolved(this.responseText);
        }

      }

      //建立服务器连接
      xhr.open('GET', url, true);

      //发起请求
      xhr.send();

    })

  }

}

function create(select) {
  return document.createElement(select);
}

let http2 = new Http2();

//发起get请求
http.get('https://api.tianapi.com/txapi/ncovcity/index?key=9823e6172b17190da652d51c52a2501a').then(result => {
  result = JSON.parse(result);
  // console.log('result ==> ', result);
  console.log(result.newslist)
  // let city = desc[5].cities;
  shuju(result.newslist);

  let jian = query(".city-lists");
  console.log(jian);
  for (let i = 0; i < jian.length; i++) {
    let kai = true;
    jian[i].onclick = function(){
      if(this.nextElementSibling.style.display !== 'block'){
        this.nextElementSibling.style.display = 'block';
      }else{
        this.nextElementSibling.style.display = 'none';
      }
    }
  }
})

function shuju(data) {
  let desc = data;
  // let  city = desc[1].cities[1]
  let fragment = document.createDocumentFragment();
  let select = query('.tbody')[0];

  for (let i = 0; i < desc.length; i++) {
    var ul = document.createElement('ul');
    ul.className = "city-lists clearfix";
    let list = `
    <li ><span>${desc[i].provinceName}</span></li>
    <li ><span>${desc[i].currentConfirmedCount}</span></li>
    <li ><span>${desc[i].confirmedCount}</span></li>
    <li ><span>${desc[i].deadCount}</span></li>
    <li ><span>${desc[i].curedCount}</span></li>
  `;
    ul.innerHTML = list;
    fragment.appendChild(ul);

    let divbox = create('div');
    let divcude = create('div');
    divcude.className = "cude";
    divbox.className = 'boxcap';
    for (let k = 0; k < desc[i].cities.length; k++) {
      let text = ` <ul>
                       <li class="fl">${desc[i].cities[k].cityName}</li>
                       <li class="fl">${desc[i].cities[k].currentConfirmedCount}</li>
                       <li class="fl">${desc[i].cities[k].confirmedCount}</li>
                       <li class="fl">${desc[i].cities[k].deadCount}</li>
                       <li class="fl">${desc[i].cities[k].curedCount}</li>
                    </ul>`;
      let buzdao = create("div");
      buzdao.innerHTML = text;
      buzdao.className = "bu";
      divcude.appendChild(buzdao);
      divbox.appendChild(divcude);
      fragment.appendChild(divbox);
    }
  }

  select.appendChild(fragment);
}













