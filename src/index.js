/*
 * @Author: Cookie
 * @Date: 2020-12-27 15:39:12
 * @LastEditors: Cookie
 * @LastEditTime: 2020-12-27 19:46:51
 * @Description:
 */


class LoginInterceptor {
  constructor() {
    this.domTpl = ''

    // Logo参数
    this.imgUrl = {
      loginImgStart: false,
      loginImgUrl: '',
      activityImgStart: '',
      activityImgUrl: ''
    }

    // 协议参数
    this.agreement = {
      start: '',
      serverUrl: '',
      privacyUrl: ''
    }

    // 缓存类型
    this.dataStorage = {
      tokenKey: 'token',
      path: '',
      url: '',
      storage: 'localStorage'
    }

    this.close = false

    // 事件回调
    this.success = ''
    this.error = ''

    this.regulations = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAACjUlEQVRYR82XP2gUQRTGv7d7l9hYCApKtEixM3NwtmIKk06UiCJEOMRG0E4FC7Wx2MLGNIKmU7AROVAQg0GxS1JEbD24md0ihYqCgoWNyd3tk5HdcLnc5fbChXHL3dn3fu/PN/OG4Pghx/6RG4CZKY7jEwCmmXmCmQMA+9IAfhFRTEQrABaCIFgmIs4TXC4ArfUMgHsAZB6jAAyAu0qpl/3WbwugtR5n5udEdNwaIqLPAF4z8wIRfWo0Gj/s+2KxeICZjxLRNIBzzHzEvmfmD0R0USm12gukJ0Acx1OtVstGsJ+IvgIIhRBPiai1XVTM7EdRdNmuZ+YxAD99358JgmCx239dAVLn7wGMAJgHcEkp9btfOtu/a633AngG4CyAdd/3T3aD2AJg0w7go40cwMNqtXozDMNkEOfZ2jAMvUql8gDADZsJAMc6y7EFoF6vr6Q1n69Wq+d36rwD4pXNhO2JUqk00R7MJoC021/YmjNzadC098qSLQcR1dOeuNCujg0Aq3NjTN1KjYiuSimf7CTtvf4xxlxh5sdWolLKUrZPbABEUTSZJMmilZoQYrxftw8Kl6pj1UrU87wpIcTSP2lnhrTWswBuEdGclPL6oA7yrDfGPGLma57nzQoh7mwCMMYsMbPdak8rpd7lMTjoGq31KQBviWhZSjnZmYFvAA4S0WEppd14hv4YY8aY+QuA70qpQ50AfwCMNpvN0XK5vD507wBqtdpIoVBYA7CmlNrz3wG4LYHzJoyi6H6SJLedydD5RuR8K7aScHoYZbp3ehynWXA7kFgIpyNZVgqnQ2nbEe1uLO+YcN1cTNohsqtZkiRn7NDa7Wpmh07P894M/Wq2G0dzZjPX3XA3Af4CAK3OMDyR7pcAAAAASUVORK5CYII='
    this.regulationsStart = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAACk0lEQVRYR8WXz0tUURTHP2csR6kWBU1tImgydTTbBFFm0KpdvxB3Bf2yoobGsmiTm1YutEFJLHDTOor6B1rUom1BI00aBoGVKUEuppczJ95Mr2bG93ME39vec873c86597x7hZA/CVmfmgDi/RqLKrtQNpEHlAVDeT81KnNBE/IN0J7UuNbRq3ACtMlBKCvIUwMefkjLRz8wngA7k7q5fg0DKL2g9X6CAgYi40sR7maH5LubjytAS0r3R4QnqG71KVxtNqsROTk5LK+d/B0BEn3ag+ojIFqjeMlNySFyKpOWx3ZxbAGKmaMvVixuKSo5rZPDdpVYBlDseUTfItRadoeCyayRZ0/1SVkGkOjLj6JydUVld2y4jGTuybXy5QqA3SndkUcnAb+7PSin8RtpLT+iFQBtKR1U9FbQqOX26xtgMeccQZDBd2m5bVlUACRShSzgNGQ8uXoOwJUjcHYMpr869iGbSUvzMoD4JY1FG9TRzUvdFB/oBhFh/qdyehRmHAbzr5xsmR6Xb2bMfxVI3NCD5PWll5DpoFVG5eLm0psZpfeBSyvqpCszJK8qAa7rUQr6zA2gYzvc6YbkBHz5UbIMLG46ReRYZlieBwJo2wYTl2FDo/B5Xot97mz5X3ZfmVvZ2QJ4tOBQK6TPQHRtqWsLi8rGdaWeBxI3jQvSlRmpaoGfTdjZDCPnoOEvhJWQZ8+r+mrkJWZNxMDHcF8T3D8PjfU1ZF4EEftjaC75HUR74zB2AaZmcd/tNjvadRAFGcXmpvw05z71bPTdR7HpEOrPyAQI/XdsQoR6IbH6FuqVzIII9VJqQYR6LS8/Ru03NV4wCheRyPFVfZjY/R07+jW2tNpPM697Qq3rnk+zWgP79fsDb4c9MFA9vTUAAAAASUVORK5CYII=';

  }

  init({ imgUrl = {}, agreement = {}, close = false, success, error, dataStorage = {} }) {
    this.imgUrl = imgUrl
    this.agreement = agreement
    this.close = close
    this.success = success
    this.error = error
    this.dataStorage = { ...this.dataStorage, dataStorage }
    this.show()
  }

  // cookie存储
  cookieEven(token) {
    let Days = 30;
    let expires = new Date();
    expires.setTime(expires.getTime() + Days * 24 * 60 * 60 * 1000);
    let path = this.dataStorage.path || "/";
    document.cookie = `${this.dataStorage.tokenKey}=${token};path=${path}`;
  }

  // localStorage存储
  localStorageEven(token) {
    localStorage.setItem(this.dataStorage.tokenKey, token);
  }

  // sessionStorage储存
  sessionStorageEven(token) {
    sessionStorage.setItem(this.dataStorage.tokenKey, token);
  }


  // 打开登录页
  show() {
    this.domTpl = `<div style="position: fixed; top: 0; left: 0; background: #fff; width: 100%; height: 100%; z-index: 9999;font-family: 'PingFangSC-Regular'">
        ${this.close ? `<div id="closeIcon" style="position: absolute; right: 10px; top: 10px"><p style="height: 20px; width: 20px;" >X</p></div>` : ''}
        ${this.imgUrl.loginImgStart ? `<div class="logo" style="text-align: center; padding-top: 60px;">
          <img src=${this.imgUrl.loginImgUrl} style="width: 36.6vw; height: 36.6vw" />
        </div>` : ''}
        <div style="width: 78.6vw; margin: 0 auto; margin-top: 16px;">
          <input id="phone" type="text" name="phone" placeholder="请输入手机号码"
                 style="width: 100%;font-size: 16px; padding-top: 22px; -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
                 outline: none;border: none;border-bottom: 1px solid rgba(232,232,232,1);padding-bottom: 10px;" />
        </div>
        <div style="width: 78.6vw; margin: 0 auto; display: flex;">
          <input id="code" type="text" placeholder="请输入验证码"
                 style="width: calc(100% - 94px); font-size: 16px; padding-top: 22px; -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
                 outline: none;border: none;border-bottom: 1px solid rgba(232,232,232,1);padding-bottom: 10px;" />
          <p class="Obtain" style="width: 84px;border:1px solid rgba(42,112,254,1); font-size: 12px;padding: 5px 12px; text-align: center;margin: 20px 0 0px 0;
                               color: #2A70FE;border-radius:8px;">获取验证码</p>
        </div>
        <div style="width: 78.6vw; margin: 0 auto;margin-top: 45px;position: relative;">
          <div class="tipModel" style="display: none; position: absolute; top: -24px; left: 0; right: 0; color: #FF495F; font-size: 12px; text-align: center; margin-bottom: 12px;">123</div>
          <p class="loginButton" style="font-size: 17px;background:rgba(203,205,209,1);box-shadow:0px 1px 4px 0px rgba(82,88,102,0.2);border-radius:4px; text-align: center;
                    font-family: 'PingFangSC-Regular';font-weight:400;color:rgba(255,255,255,1);line-height:40px;margin-block-start: 0;margin-block-end: 0;">登录</p>
        </div>
        ${this.agreement.start ? `<div style="width: 78.6vw; margin: 0 auto;margin-top: 12px;">
          <div id="notes" style="display: flex;align-content: center;">
            <i id="regulations" style="display: block;background: url(${this.regulations}); background-size: cover; width: 16px; height: 16px;margin-right: 5px;"></i>
            <p style="color: #7A8599;font-size: 12px;margin-block-start: 0;margin-block-end: 0;">已阅读并同意<a href=${this.agreement.serverUrl} style="color: #2A70FE;text-decoration:none;">《用户服务协议》</a>和<a href=${this.agreement.privacyUrl} style="color: #2A70FE;text-decoration:none;">《隐私政策》</a></p>
          </div>
        </div>` : ''}
      </div>`;
    let dom = document.createElement("div");
    dom.innerHTML = this.domTpl;
    dom.id = 'loginModel';
    document.body.appendChild(dom);
    this.bindAction();
    return dom;
  }

  // 关闭登陆页
  hide() {
    document.body.removeChild(document.getElementById('loginModel'));
  }

  // 发送ajax请求
  createXMLHttpRequest(url, errFun) {
    let xmlHttp = new XMLHttpRequest();
    xmlHttp.open("POST", url, false);
    xmlHttp.setRequestHeader('content-type', 'application/json');
    xmlHttp.send(this.paramsEven());
    return xmlHttp.onreadystatechange = () => {
      if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
        let data = JSON.parse(xmlHttp.responseText);
        if (data.code !== 0) {
          return errFun(data.errmsg);
        }
        if (url === this.dataStorage.url) {
          this[`${this.dataStorage.storage}Even`](data.data.token);
          if (this.success) this.success(data.data.token);
        }
        return data;
      }
    };
  }

  // 登陆相关事件
  bindAction() {
    // 手机号正则
    let checkPhone = (phone) => {
      if (!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(phone))) {
        return false;
      } else {
        return true;
      }
    };

    // 弹窗
    let tipModel = {
      show: (tipFont) => {
        let tipModel = document.getElementsByClassName('tipModel')[0];
        tipModel.innerHTML = tipFont;
        tipModel.style.display = 'block';
      },
      hide: () => {
        document.getElementsByClassName('tipModel')[0].style.display = 'none';
      }
    };

    // 验证码相关
    let ObtainFun = () => {
      let ObtainStart = document.getElementsByClassName('ObtainStart')[0];
      let time = 50;
      ObtainStart.innerHTML = `${time} S`;
      ObtainStart.style.borderColor = 'rgba(245,246,247,1)';
      ObtainStart.style.background = 'rgba(245,246,247,1)';
      time = time - 1;
      let interval = setInterval(() => {
        ObtainStart.innerHTML = `${time} S`;
        time = time - 1;
        if (time < 0) {
          ObtainStart.innerHTML = `获取验证码`;
          clearInterval(interval);
          document.getElementsByClassName('ObtainStart')[0].className = 'Obtain';
          let Obtain = document.getElementsByClassName('Obtain')[0];
          Obtain.style.borderColor = '#2A70FE';
          Obtain.style.background = '#fff';
        }
      }, 1000)
    };

    // 验证码事件
    document.getElementsByClassName('Obtain')[0].onclick = () => {
      let phone = document.getElementById('phone').value;
      if (!checkPhone(phone)) {
        tipModel.show('请输入正确的手机号码');
        return false;
      }
      let dataInfo = {};
      if (document.getElementsByClassName('Obtain')[0]) {
        dataInfo = this.createXMLHttpRequest(this.dataStorage.verifyCodeUrl, tipModel.show)();
      }
      if (dataInfo.code === 0) {
        document.getElementsByClassName('Obtain')[0].className = 'ObtainStart';
        ObtainFun();
      }
    };

    // closeIcon事件
    if (this.close) {
      document.getElementById('closeIcon').onclick = () => {
        this.hide();
      };
    }

    // 判断验证码是否存在
    document.getElementById('code').oninput = () => {
      let codeVal = document.getElementById('code').value;
      if (codeVal) {
        let loginButton = document.getElementsByClassName('loginButton')[0];
        loginButton.style.background = '#3D424D';
        loginButton.style.color = '#fff';
      }
    };

    // 登陆事件
    document.getElementsByClassName('loginButton')[0].onclick = () => {
      if (!document.getElementById('phone').value || !document.getElementById('code').value) {
        return tipModel.show('请输入正确的手机号码和验证码');
      }
      if (this.agreement.start && document.getElementById('regulations').style.backgroundImage !== `url("${this.regulationsStart}")`) {
        return tipModel.show('请阅读用户相关条例');
      }
      this.createXMLHttpRequest(this.dataStorage.url, tipModel.show)();
    };

    // 用户条例事件
    if (this.agreement.start) {
      document.getElementById('notes').addEventListener('click', () => {
        let regulations = document.getElementById('regulations');
        let regulationsBackground = regulations.style.backgroundImage;
        if (regulationsBackground === `url("${this.regulations}")`) {
          regulations.style.backgroundImage = `url("${this.regulationsStart}")`;
        } else {
          regulations.style.backgroundImage = `url(${this.regulations})`;
        }
      }, false)
    }
  }

}

window.Login = new LoginInterceptor()