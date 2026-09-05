const DB_NAME = "remember-me-extension-db";
const DB_VERSION = 1;

const ITEM_STORE = "items";
const LIST_STORE = "lists";

const DEFAULT_LISTS = [
    {
        id: "all",
        name: "All items",
        system: true
    },
    {
        id: "things-to-buy",
        name: "Things to buy",
        system: true
    },
    {
        id: "research",
        name: "Research",
        system: true
    },
    {
        id: "places-to-visit",
        name: "Places to visit",
        system: true
    }
];

function openDatabase() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION);

        request.onupgradeneeded = event => {
            const db = event.target.result;

            if (!db.objectStoreNames.contains(ITEM_STORE)) {
                const store = db.createObjectStore(ITEM_STORE, {
                    keyPath: "id"
                });

                store.createIndex("listId", "listId", {
                    unique: false
                });

                store.createIndex("createdAt", "createdAt", {
                    unique: false
                });
            }

            if (!db.objectStoreNames.contains(LIST_STORE)) {
                const store = db.createObjectStore(LIST_STORE, {
                    keyPath: "id"
                });

                store.createIndex("name", "name", {
                    unique: false
                });
            }
        };

        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
}

async function ensureDefaultLists() {
    const db = await openDatabase();

    return new Promise((resolve, reject) => {
        const transaction = db.transaction(
            LIST_STORE,
            "readwrite"
        );

        const store = transaction.objectStore(LIST_STORE);

        DEFAULT_LISTS.forEach(list => {
            store.put({
                ...list,
                createdAt: new Date().toISOString()
            });
        });

        transaction.oncomplete = () => {
            db.close();
            resolve();
        };

        transaction.onerror = () => {
            db.close();
            reject(transaction.error);
        };
    });
}

async function getLists() {
    await ensureDefaultLists();

    const db = await openDatabase();

    return new Promise((resolve, reject) => {
        const transaction = db.transaction(
            LIST_STORE,
            "readonly"
        );

        const request = transaction
            .objectStore(LIST_STORE)
            .getAll();

        request.onsuccess = () => {
            db.close();
            resolve(request.result);
        };

        request.onerror = () => {
            db.close();
            reject(request.error);
        };
    });
}

async function createList(name) {
    const cleanName = name.trim();

    if (!cleanName) {
        throw new Error("List name cannot be empty.");
    }

    const list = {
        id:
            "list-" +
            Date.now() +
            "-" +
            Math.random()
                .toString(36)
                .slice(2),
        name: cleanName,
        system: false,
        createdAt: new Date().toISOString()
    };

    const db = await openDatabase();

    return new Promise((resolve, reject) => {
        const transaction = db.transaction(
            LIST_STORE,
            "readwrite"
        );

        transaction.objectStore(LIST_STORE).put(list);

        transaction.oncomplete = () => {
            db.close();
            resolve(list);
        };

        transaction.onerror = () => {
            db.close();
            reject(transaction.error);
        };
    });
}

async function saveItem(item) {
    const db = await openDatabase();

    const now = new Date().toISOString();

    const completeItem = {
        ...item,
        id:
            item.id ||
            "item-" +
                Date.now() +
                "-" +
                Math.random()
                    .toString(36)
                    .slice(2),
        listId: item.listId || "all",
        createdAt: item.createdAt || now,
        updatedAt: now
    };

    return new Promise((resolve, reject) => {
        const transaction = db.transaction(
            ITEM_STORE,
            "readwrite"
        );

        transaction.objectStore(ITEM_STORE).put(
            completeItem
        );

        transaction.oncomplete = () => {
            db.close();
            resolve(completeItem);
        };

        transaction.onerror = () => {
            db.close();
            reject(transaction.error);
        };
    });
}

async function getItems() {
    const db = await openDatabase();

    return new Promise((resolve, reject) => {
        const transaction = db.transaction(
            ITEM_STORE,
            "readonly"
        );

        const request = transaction
            .objectStore(ITEM_STORE)
            .getAll();

        request.onsuccess = () => {
            db.close();
            resolve(request.result);
        };

        request.onerror = () => {
            db.close();
            reject(request.error);
        };
    });
}

async function deleteItem(id) {
    const db = await openDatabase();

    return new Promise((resolve, reject) => {
        const transaction = db.transaction(
            ITEM_STORE,
            "readwrite"
        );

        transaction
            .objectStore(ITEM_STORE)
            .delete(id);

        transaction.oncomplete = () => {
            db.close();
            resolve();
        };

        transaction.onerror = () => {
            db.close();
            reject(transaction.error);
        };
    });
}

async function updateItemList(itemId, listId) {
    const items = await getItems();
    const item = items.find(
        current => current.id === itemId
    );

    if (!item) {
        return;
    }

    item.listId = listId;

    await saveItem(item);
}

async function deleteList(id) {
    const lists = await getLists();
    const list = lists.find(
        current => current.id === id
    );

    if (!list || list.system) {
        return;
    }

    const items = await getItems();

    for (const item of items) {
        if (item.listId === id) {
            item.listId = "all";
            await saveItem(item);
        }
    }

    const db = await openDatabase();

    return new Promise((resolve, reject) => {
        const transaction = db.transaction(
            LIST_STORE,
            "readwrite"
        );

        transaction
            .objectStore(LIST_STORE)
            .delete(id);

        transaction.oncomplete = () => {
            db.close();
            resolve();
        };

        transaction.onerror = () => {
            db.close();
            reject(transaction.error);
        };
    });
}
