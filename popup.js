let currentTab = null;
let currentSelection = "";

document.addEventListener(
    "DOMContentLoaded",
    initialize
);

async function initialize() {
    try {
        const tabs =
            await chrome.tabs.query({
                active: true,
                currentWindow: true
            });

        currentTab = tabs[0];

        await loadLists();
        await loadCurrentPage();
        await loadSelection();

        document
            .getElementById("savePage")
            .addEventListener(
                "click",
                saveCurrentPage
            );

        document
            .getElementById("saveSelection")
            .addEventListener(
                "click",
                saveCurrentSelection
            );

        document
            .getElementById("openDashboard")
            .addEventListener(
                "click",
                () => {
                    chrome.tabs.create({
                        url:
                            chrome.runtime.getURL(
                                "dashboard.html"
                            )
                    });
                }
            );
    } catch (error) {
        console.error(error);
    }
}

async function loadLists() {
    const lists = await getLists();

    const selects = [
        document.getElementById("listSelect"),
        document.getElementById(
            "selectionListSelect"
        )
    ];

    selects.forEach(select => {
        select.innerHTML = "";

        lists.forEach(list => {
            const option =
                document.createElement(
                    "option"
                );

            option.value = list.id;
            option.textContent = list.name;

            select.appendChild(option);
        });
    });
}

async function loadCurrentPage() {
    const title =
        currentTab?.title ||
        "Current page";

    const url =
        currentTab?.url || "";

    document.getElementById(
        "pageTitle"
    ).textContent = title;

    document.getElementById(
        "pageUrl"
    ).textContent = url;
}

async function loadSelection() {
    if (
        !currentTab ||
        !currentTab.id ||
        !currentTab.url ||
        currentTab.url.startsWith(
            "chrome://"
        )
    ) {
        return;
    }

    try {
        const results =
            await chrome.scripting.executeScript(
                {
                    target: {
                        tabId: currentTab.id
                    },
                    func: () =>
                        window
                            .getSelection()
                            .toString()
                            .trim()
                }
            );

        currentSelection =
            results?.[0]?.result || "";

        if (!currentSelection) {
            return;
        }

        document.getElementById(
            "selectionCard"
        ).hidden = false;

        document.getElementById(
            "selectionText"
        ).textContent =
            currentSelection;
    } catch (error) {
        console.log(
            "Could not read selection.",
            error
        );
    }
}

async function saveCurrentPage() {
    if (!currentTab) {
        return;
    }

    const listId =
        document.getElementById(
            "listSelect"
        ).value;

    await saveItem({
        type: "link",
        listId,

        title:
            currentTab.title ||
            "Saved page",

        url:
            currentTab.url ||
            "",

        description: "",

        favicon:
            currentTab.favIconUrl ||
            ""
    });

    showSavedState(
        document.getElementById(
            "savePage"
        ),
        "Saved ✓"
    );
}

async function saveCurrentSelection() {
    if (!currentSelection) {
        return;
    }

    const listId =
        document.getElementById(
            "selectionListSelect"
        ).value;

    await saveItem({
        type: "quote",
        listId,

        title:
            currentTab?.title ||
            "Saved quote",

        content:
            currentSelection,

        author: "",

        url:
            currentTab?.url ||
            ""
    });

    showSavedState(
        document.getElementById(
            "saveSelection"
        ),
        "Saved ✓"
    );
}

function showSavedState(
    button,
    text
) {
    const original =
        button.textContent;

    button.textContent = text;

    setTimeout(() => {
        button.textContent =
            original;
    }, 1200);
}
