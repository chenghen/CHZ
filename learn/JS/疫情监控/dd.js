class Http3 {

  //get请求
  get(url) {

    return new Promise ((resolved, rejected) => {

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

let http3 = new Http3();

//发起get请求
http.get('https://api.tianapi.com/txapi/ncovabroad/index?key=9823e6172b17190da652d51c52a2501a').then(result => {
  result = JSON.parse(result);
  // console.log('result ==> ', result);

  let types = [];
    result.newslist.map((v) => {

        if (types.indexOf(v.continents) === -1) {
            types.push(v.continents);
        }
    });

    let products = {};
    types.map((v) => {
        products[v] = [];
        result.newslist.map((item) => {
            if (v == item.continents) {
                products[v].push(item);
            }
        });
    });

    //封装一个创建标签的方法
    function querys(select) {
      return document.querySelector(select);
  }

  function create(select) {
      return document.createElement(select);
  }
  function query(select) {
      return document.querySelectorAll(select);
  }

  for (let g in products) {
    let count1 = 0;
    let count2 = 0;
    let count3 = 0;
    let count4 = 0;

    let province = create("div");
    // console.log(province);
    province.className = " provinceming";
    let divo = create("div");
    divo.className = "copen";
    // console.log(products);
    for (let y = 0; y < products[g].length; y++) {

        count1 += products[g][y].currentConfirmedCount;
        count2 += products[g][y].confirmedCount;
        count3 += products[g][y].deadCount;
        count4 += products[g][y].curedCount;


        let text = ` <ul>
                 <li>${products[g][y].provinceName}</li>
                 <li>${products[g][y].currentConfirmedCount}</li>
                 <li>${products[g][y].confirmedCount}</li>
                 <li>${products[g][y].deadCount}</li>
                 <li>${products[g][y].curedCount}</li>
              </ul>`;

        let divnone = create("div");
        
        divnone.innerHTML = text;
        divnone.className = "none";
        divo.appendChild(divnone);
    }
    let ul = create('ul')
    let html = `<ul>
                   <li class="lis">${g}</li>
                   <li class="lis">${count1}</li>
                   <li class="lis">${count2}</li>
                   <li class="lis">${count3}</li>
                   <li class="lis">${count4}</li>
                 </ul>
                 `
    ul.innerHTML = html;
    ul.className = 'shengji';
    province.appendChild(ul);
    province.appendChild(divo);
    let waiguo = query(".dy");
    waiguo[0].appendChild(province)
    console.log(waiguo)
}

let jiant = query(".shengji");
for (let i = 0; i < jiant.length; i++) {
    let kai = true;

    jiant[i].onclick = function () {
        // console.log(this.parentNode.parentNode.children[1].children[0])

        if (this.nextElementSibling.style.display !== 'block') {
            this.nextElementSibling.style.display = 'block';
        } else {

            this.nextElementSibling.style.display = 'none';

        }
    };
}


})


