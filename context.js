{
  const once = async () => {
    if (once.done) {
      return;
    }
    once.done = true;

    try {
      await chrome.contextMenus.create({
        id: 'test',
        title: 'Open Test Page',
        contexts: ['action']
      }, () => chrome.runtime.lastError);
      await chrome.contextMenus.create({
        id: 'separator',
        title: 'Separator',
        contexts: ['action'],
        type: 'separator'
      }, () => chrome.runtime.lastError);
      await chrome.contextMenus.create({
        id: 'csp-1',
        title: 'Remove "Content-Security-Policy" header',
        contexts: ['action'],
        type: 'checkbox'
      }, () => chrome.runtime.lastError);
      await chrome.contextMenus.create({
        id: 'csp-2',
        title: 'Remove "Content-Security-Policy-Report-Only" header',
        contexts: ['action'],
        type: 'checkbox'
      }, () => chrome.runtime.lastError);
      /* Legacy / Deprecated */
      await chrome.contextMenus.create({
        id: 'deprecated',
        title: 'Legacy / Deprecated',
        contexts: ['action']
      }, () => chrome.runtime.lastError);
      await chrome.contextMenus.create({
        id: 'csp-4',
        title: 'Remove "X-Content-Security-Policy" header',
        contexts: ['action'],
        type: 'checkbox',
        parentId: 'deprecated'
      }, () => chrome.runtime.lastError);
      await chrome.contextMenus.create({
        id: 'csp-5',
        title: 'Remove "X-Content-Security-Policy-Report-Only" header',
        contexts: ['action'],
        type: 'checkbox',
        parentId: 'deprecated'
      }, () => chrome.runtime.lastError);
      await chrome.contextMenus.create({
        id: 'csp-3',
        title: 'Remove "X-Webkit-CSP" header',
        contexts: ['action'],
        type: 'checkbox',
        parentId: 'deprecated'
      });
      await chrome.contextMenus.create({
        id: 'csp-6',
        title: 'Remove "X-WebKit-CSP-Report-Only" header',
        contexts: ['action'],
        type: 'checkbox',
        parentId: 'deprecated'
      }, () => chrome.runtime.lastError);
      /* Report */
      await chrome.contextMenus.create({
        id: 'report',
        title: 'Reporting API',
        contexts: ['action']
      }, () => chrome.runtime.lastError);
      await chrome.contextMenus.create({
        id: 'csp-7',
        title: 'Remove "Report-To" header',
        contexts: ['action'],
        type: 'checkbox',
        parentId: 'report'
      }, () => chrome.runtime.lastError);
      await chrome.contextMenus.create({
        id: 'csp-8',
        title: 'Remove "Reporting-Endpoints" header',
        contexts: ['action'],
        type: 'checkbox',
        parentId: 'report'
      }, () => chrome.runtime.lastError);
    }
    catch (e) {
      console.error(e);
    }

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
    for (const [key, checked] of Object.entries(prefs)) {
      chrome.contextMenus.update(key, {checked});
    }
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
