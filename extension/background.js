chrome.tabs.onCreated.addListener(function (tab) {
  if (tab.pendingUrl === "chrome://newtab/") {
    chrome.tabs.update(tab.id, { url: "https://john-search-9e076.web.app/" });
  }
});
