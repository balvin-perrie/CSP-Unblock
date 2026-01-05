{
  const once = async () => {
    if (once.done) {
      return;
    }
    once.done = true;

    const prefs = await chrome.storage.local.get({
      'csp-1': true,
      'csp-2': true,
      'csp-3': true,
      'csp-4': true,
      'csp-5': true,
      'csp-6': true,
      'csp-7': true,
      'csp-8': true
    });
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
    /* Legacy / Deprecated */
    chrome.contextMenus.create({
      id: 'deprecated',
      title: 'Legacy / Deprecated',
      contexts: ['action']
    }, () => chrome.runtime.lastError);
    chrome.contextMenus.create({
      id: 'csp-4',
      title: 'Remove "X-Content-Security-Policy" header',
      contexts: ['action'],
      type: 'checkbox',
      checked: prefs['csp-4'],
      parentId: 'deprecated'
    }, () => chrome.runtime.lastError);
    chrome.contextMenus.create({
      id: 'csp-5',
      title: 'Remove "X-Content-Security-Policy-Report-Only" header',
      contexts: ['action'],
      type: 'checkbox',
      checked: prefs['csp-5'],
      parentId: 'deprecated'
    }, () => chrome.runtime.lastError);
    chrome.contextMenus.create({
      id: 'csp-3',
      title: 'Remove "X-Webkit-CSP" header',
      contexts: ['action'],
      type: 'checkbox',
      checked: prefs['csp-3'],
      parentId: 'deprecated'
    }, () => chrome.runtime.lastError);
    chrome.contextMenus.create({
      id: 'csp-6',
      title: 'Remove "X-WebKit-CSP-Report-Only" header',
      contexts: ['action'],
      type: 'checkbox',
      checked: prefs['csp-6'],
      parentId: 'deprecated'
    }, () => chrome.runtime.lastError);
    /* Report */
    chrome.contextMenus.create({
      id: 'report',
      title: 'Reporting API',
      contexts: ['action']
    }, () => chrome.runtime.lastError);
    chrome.contextMenus.create({
      id: 'csp-7',
      title: 'Remove "Report-To" header',
      contexts: ['action'],
      type: 'checkbox',
      checked: prefs['csp-7'],
      parentId: 'report'
    }, () => chrome.runtime.lastError);
    chrome.contextMenus.create({
      id: 'csp-8',
      title: 'Remove "Reporting-Endpoints" header',
      contexts: ['action'],
      type: 'checkbox',
      checked: prefs['csp-8'],
      parentId: 'report'
    }, () => chrome.runtime.lastError);
  };

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
