const openSidePanel = async () => {
    await chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true });
};

chrome.runtime.onInstalled.addListener(() => {
    void openSidePanel();
});

chrome.runtime.onStartup.addListener(() => {
    void openSidePanel();
});
