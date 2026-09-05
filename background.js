importScripts("storage.js");

chrome.runtime.onInstalled.addListener(async () => {
    await ensureDefaultLists();

    chrome.contextMenus.create({
        id: "remember-me",
        title: "Remember Me",
        contexts: ["page", "selection", "link"]
    });

    chrome.contextMenus.create({
        id: "save-page",
        parentId: "remember-me",
        title: "Save this page",
        contexts: ["page"]
    });

    chrome.contextMenus.create({
        id: "save-selection",
        parentId: "remember-me",
        title: "Save selected text",
        contexts: ["selection"]
    });

    chrome.contextMenus.create({
        id: "save-link",
        parentId: "remember-me",
        title: "Save this link",
        contexts: ["link"]
    });
});

chrome.contextMenus.onClicked.addListener(
    async (info, tab) => {
        try {
            if (!tab) {
                return;
            }

            if (info.menuItemId === "save-page") {
                await saveItem({
                    type: "link",
                    listId: "all",
                    title: tab.title || "Saved page",
                    url: tab.url || "",
                    description: "",
                    favicon: tab.favIconUrl || ""
                });

                showNotification(
                    "Saved to Remember Me"
                );
            }

            if (
                info.menuItemId ===
                "save-selection"
            ) {
                await saveItem({
                    type: "quote",
                    listId: "all",
                    title: tab.title || "Saved quote",
                    content:
                        info.selectionText || "",
                    author: "",
                    url: tab.url || ""
                });

                showNotification(
                    "Selection saved"
                );
            }

            if (
                info.menuItemId ===
                "save-link"
            ) {
                await saveItem({
                    type: "link",
                    listId: "all",
                    title:
                        info.linkUrl ||
                        "Saved link",
                    url: info.linkUrl || "",
                    description: "",
                    favicon: ""
                });

                showNotification(
                    "Link saved"
                );
            }
        } catch (error) {
            console.error(error);
        }
    }
);

chrome.commands.onCommand.addListener(
    async command => {
        if (command !== "save-page") {
            return;
        }

        try {
            await chrome.action.openPopup();
        } catch {
            chrome.tabs.create({
                url:
                    chrome.runtime.getURL(
                        "dashboard.html"
                    )
            });
        }
    }
);

function showNotification(message) {
    if (!chrome.notifications) {
        return;
    }

    chrome.notifications.create({
        type: "basic",
        iconUrl: "icons/icon128.png",
        title: "Remember Me",
        message
    });
}
