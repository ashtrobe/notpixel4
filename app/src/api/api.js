import a1_0x7a12d0 from 'node-fetch';
import { HttpsProxyAgent } from 'https-proxy-agent';
import { Helper } from '../utils/helper.js';
import a1_0x589da1 from '../utils/logger.js';
export class API {
  constructor(_0x8e242b, _0x5c2d22, _0x541b74) {
    this.url = _0x541b74;
    this.ua = Helper.randomUserAgent();
    this.query = _0x8e242b;
    this.proxy = _0x5c2d22;
  }
  ["generateHeaders"](_0x541080 = this.query) {
    const _0xa929ba = {
      'Accept': "application/json, text/plain, */*",
      'Accept-Language': 'en-US,en;q=0.9,id;q=0.8',
      'Content-Type': "application/json",
      'User-Agent': this.ua
    };
    if (_0x541080) {
      _0xa929ba.Authorization = "initData " + _0x541080;
    }
    return _0xa929ba;
  }
  async ['fetch'](_0x3ae034, _0x3dfc7 = 'GET', _0x7f9254, _0x507ba7 = {}, _0x3089ed = {}) {
    try {
      const _0x41b91e = '' + this.url + _0x3ae034;
      const _0x19fe38 = {
        ..._0x3089ed,
        ...this.generateHeaders(_0x7f9254)
      };
      a1_0x589da1.info(_0x3dfc7 + " : " + _0x41b91e + " " + (this.proxy ? this.proxy : ''));
      a1_0x589da1.info("Request Header : " + JSON.stringify(_0x19fe38));
      const _0x36624f = {
        'method': _0x3dfc7,
        'headers': _0x19fe38,
        'referrer': 'https://app.notpx.app/'
      };
      if (this.proxy) {
        _0x36624f.httpsAgent = new HttpsProxyAgent(this.proxy);
      }
      if (_0x3dfc7 !== 'GET') {
        _0x36624f.body = JSON.stringify(_0x507ba7);
        a1_0x589da1.info("Request Body : " + JSON.stringify(_0x507ba7));
      }
      const _0x1f1d8f = await a1_0x7a12d0(_0x41b91e, _0x36624f);
      if (_0x1f1d8f.ok) {
        const _0x2628ad = _0x1f1d8f.headers.get("content-type");
        let _0x5535f1;
        if (_0x2628ad && _0x2628ad.includes("application/json")) {
          _0x5535f1 = await _0x1f1d8f.json();
          _0x5535f1.status = _0x1f1d8f.status;
        } else {
          _0x5535f1 = {
            'status': _0x1f1d8f.status,
            'message': await _0x1f1d8f.text()
          };
        }
        if (_0x1f1d8f.ok) {
          _0x5535f1.status = 0xc8;
        }
        a1_0x589da1.info("Response Data : " + JSON.stringify(_0x5535f1));
        return _0x5535f1;
      } else {
        throw _0x1f1d8f;
      }
    } catch (_0x4cec71) {
      a1_0x589da1.error("Error : " + _0x4cec71.message);
      if (_0x4cec71.status == 0x193) {
        return {
          'status': 0x193,
          ..._0x4cec71.response.data
        };
      }
      if (_0x4cec71.status == 0x1f7 || _0x4cec71.status == 0x194) {
        throw Error("Detect API change Stopping BOT..");
      } else {
        throw Error(_0x4cec71.status + " - " + _0x4cec71.statusText);
      }
    }
  }
}