import _0x7d2fb from 'blessed';
import _0x404c81 from './logger.js';
import { Helper } from './helper.js';
export class Bless {
  constructor() {
    this.screen = _0x7d2fb.screen({
      'fastCSR': true
    });
    this.screen.title = "Nofan Rambe";
    this.titleBox = _0x7d2fb.box({
      'top': 0x0,
      'left': "center",
      'width': "shrink",
      'height': 0x2,
      'tags': true,
      'content': "{center}NOTPIXEL BOT{/center}",
      'style': {
        'fg': 'white',
        'bold': true
      }
    });
    this.screen.append(this.titleBox);
    this.subTitle = _0x7d2fb.box({
      'top': 0x1,
      'left': "center",
      'width': "shrink",
      'height': 0x2,
      'tags': true,
      'content': "By: Nofan Rambe",
      'style': {
        'fg': "white",
        'bold': true
      }
    });
    this.screen.append(this.subTitle);
    this.tabList = _0x7d2fb.box({
      'top': 0x5,
      'left': 'center',
      'width': '100%',
      'height': 0x3,
      'tags': true,
      'style': {
        'fg': "white"
      }
    });
    this.screen.append(this.tabList);
    this.hintBox = _0x7d2fb.box({
      'bottom': 0x0,
      'left': 'center',
      'width': "100%",
      'height': 0x3,
      'tags': true,
      'content': "{center}Use '->'(arrow right) and '<-'(arrow left) to switch between tabs{/center}",
      'style': {
        'fg': 'white'
      }
    });
    this.screen.append(this.hintBox);
    this.infoBox = _0x7d2fb.box({
      'bottom': 0x3,
      'left': "center",
      'width': "100%",
      'height': 0x3,
      'tags': true,
      'content': '',
      'style': {
        'fg': "white"
      }
    });
    this.screen.append(this.infoBox);
    this.tabs = [];
    this.currentTabIndex = 0x0;
    this.isSwitchingTab = false;
    Helper.getSession("accounts").forEach((_0x84ac16, _0x51a39d) => {
      const _0x3cda39 = this.createAccountTab("Account " + (_0x51a39d + 0x1));
      this.tabs.push(_0x3cda39);
      this.screen.append(_0x3cda39);
      _0x3cda39.hide();
    });
    if (this.tabs.length > 0x0) {
      this.tabs[0x0].show();
    }
    this.renderTabList();
    this.screen.key(['q', "C-c"], () => {
      return process.exit(0x0);
    });
    this.screen.key(['left', 'right'], (_0x3843c8, _0x399592) => {
      if (this.isSwitchingTab) {
        return;
      }
      if (_0x399592.name === "right") {
        this.switchTab((this.currentTabIndex + 0x1) % this.tabs.length);
      } else if (_0x399592.name === "left") {
        this.switchTab((this.currentTabIndex - 0x1 + this.tabs.length) % this.tabs.length);
      }
    });
    this.screen.render();
  }
  ["createAccountTab"](_0xd10cf2) {
    return _0x7d2fb.box({
      'label': _0xd10cf2,
      'top': 0x6,
      'left': 0x0,
      'width': "100%",
      'height': "shrink",
      'border': {
        'type': 'line'
      },
      'style': {
        'fg': "white",
        'border': {
          'fg': "#f0f0f0"
        }
      },
      'tags': true
    });
  }
  ['renderTabList']() {
    let _0x395a71 = '';
    Helper.getSession("accounts").forEach((_0xa8db84, _0xb3740d) => {
      if (_0xb3740d === this.currentTabIndex) {
        _0x395a71 += "{blue-fg}{bold} Account " + (_0xb3740d + 0x1) + " {/bold}{/blue-fg} ";
      } else {
        _0x395a71 += " Account " + (_0xb3740d + 0x1) + " ";
      }
    });
    this.tabList.setContent("{center}" + _0x395a71 + "{/center}");
    this.screen.render();
  }
  ["switchTab"](_0xd4e293) {
    if (_0xd4e293 < 0x0 || _0xd4e293 >= this.tabs.length) {
      return;
    }
    this.isSwitchingTab = true;
    this.tabs[this.currentTabIndex].hide();
    this.currentTabIndex = _0xd4e293;
    this.tabs[this.currentTabIndex].show();
    this.renderTabList();
    setTimeout(() => {
      this.isSwitchingTab = false;
    }, 0xc8);
    this.screen.render();
  }
  async ["log"](_0x25adad = '', _0x770b20 = '', _0x292dbd = new Core(), _0x58b14b) {
    const _0x26f13e = Helper.getSession("accounts");
    const _0x3a76b6 = _0x26f13e.indexOf(_0x770b20.accounts.split('/')[0x1]);
    if (_0x58b14b === undefined) {
      _0x404c81.info("Account " + (_0x3a76b6 + 0x1) + " - " + _0x25adad);
      _0x58b14b = '-';
    }
    let _0xff0f1b;
    const _0x3a75ac = _0x292dbd.mining ?? {};
    const _0x348160 = _0x3a75ac.userBalance ?? '-';
    const _0x172e57 = _0x3a75ac.charges ?? '-';
    let _0x4a9667 = {
      'msg': _0x25adad,
      'delay': _0x58b14b,
      'acc': _0x770b20,
      'balance': _0x348160,
      'charge': _0x172e57
    };
    _0xff0f1b = '' + Helper.spinnerContent(_0x4a9667);
    this.tabs[_0x3a76b6].setContent(_0xff0f1b);
    this.screen.render();
  }
  ["info"](_0xcb1079 = '') {
    const _0x4cb4f2 = "\n{center}Info: " + _0xcb1079 + "{/center}\n";
    this.infoBox.setContent(_0x4cb4f2);
    this.screen.render();
  }
  ["clearInfo"]() {
    this.infoBox.setContent('');
    this.screen.render();
  }
}
