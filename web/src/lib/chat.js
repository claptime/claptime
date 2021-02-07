// https://help.crisp.chat/en/article/how-to-use-dollarcrisp-javascript-sdk-10ud15y/

export const initChat = () => {
  if (!window.$crisp) {
    window.$crisp = [];
    window.CRISP_WEBSITE_ID = '1b8420fb-8bd3-4c48-84a0-41e9a4c4d7a4';
    const script = document.createElement('script');
    script.src = 'https://client.crisp.chat/l.js';
    script.async = 1;
    document.getElementsByTagName('head')[0].appendChild(script);
  }
};

export const setChatValue = (name, value) => {
  if (window.$crisp) {
    window.$crisp.push(['set', `user:${name}`, [value]]);
  }
};

export const setChatVisibility = (setVisible) => {
  if (window.$crisp) {
    window.$crisp.push(['do', `chat:${setVisible ? 'show' : 'hide'}`]);
  }
};

export const openChat = () => {
  if (window.$crisp) {
    window.$crisp.push(['do', 'chat:open']);
  }
};

export default {
  initChat,
  setChatVisibility,
  openChat,
};
