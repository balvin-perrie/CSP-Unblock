{
  const once = () => chrome.storage.local.get({
    'csp-1': true,
    'csp-2': true,
    'csp-3': true,
    'csp-4': true
  }, prefs => {
    chrome.contextMenus.create({
      id: 'test',
      title: 'Open Test Page',
      contexts: ['action']
    }, () => chrome.runtime.lastError);
    chrome.contextMenus.create({
      id: 'separator',
      title: 'Separator',
      contexts: ['action'],
      type: 'separator'
    }, () => chrome.runtime.lastError);
    chrome.contextMenus.create({
      id: 'csp-1',
      title: 'Remove "Content-Security-Policy" header',
      contexts: ['action'],
      type: 'checkbox',
      checked: prefs['csp-1']
    }, () => chrome.runtime.lastError);
    chrome.contextMenus.create({
      id: 'csp-2',
      title: 'Remove "Content-Security-Policy-Report-Only" header',
      contexts: ['action'],
      type: 'checkbox',
      checked: prefs['csp-2']
    }, () => chrome.runtime.lastError);
    chrome.contextMenus.create({
      id: 'csp-3',
      title: 'Remove "X-Webkit-CSP" header',
      contexts: ['action'],
      type: 'checkbox',
      checked: prefs['csp-3']
    }, () => chrome.runtime.lastError);
    chrome.contextMenus.create({
      id: 'csp-4',
      title: 'Remove "X-Content-Security-Policy" header',
      contexts: ['action'],
      type: 'checkbox',
      checked: prefs['csp-4']
    }, () => chrome.runtime.lastError);
  });

  chrome.runtime.onStartup.addListener(once);
  chrome.runtime.onInstalled.addListener(once);
}

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === 'test') {
    chrome.tabs.create({
      url: 'https://webbrowsertools.com/test-csp/',
      index: tab.index + 1
    });
  }
  else {
    chrome.storage.local.set({
      [info.menuItemId]: info.checked
    });
  }
});
