chrome.tabs.onCreated.addListener(function (tab) {
  chrome.tabs.update(tab.id, { url: "https://john-search-9e076.web.app/" });
});
