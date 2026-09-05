* {
    box-sizing: border-box;
}

:root {
    --background: #EBDCD8;
    --surface: #F8EFEC;
    --surface-light: #FCF6F4;
    --primary: #E39B8A;
    --primary-light: rgba(227, 155, 138, 0.14);
    --text: #332A28;
    --text-soft: #6F5D58;
    --text-muted: #9A8883;
    --border: rgba(51, 42, 40, 0.09);
}

html,
body {
    margin: 0;
    min-height: 100%;
}

body {
    background: var(--background);
    color: var(--text);

    font-family:
        Inter,
        system-ui,
        -apple-system,
        BlinkMacSystemFont,
        "Segoe UI",
        sans-serif;
}

button,
input,
textarea,
select {
    font: inherit;
}

button {
    cursor: pointer;
}

.app {
    min-height: 100vh;
    display: flex;
}


/* SIDEBAR */

.sidebar {
    width: 250px;
    flex-shrink: 0;

    padding: 28px 18px;

    border-right: 1px solid var(--border);
    background: var(--surface);
}

.logo {
    font-size: 21px;
    font-weight: 750;
    letter-spacing: -0.6px;
}

.sidebar-header {
    padding: 0 10px 32px;
}

.sidebar-section-title {
    padding: 0 10px 8px;

    color: var(--text-muted);

    font-size: 10px;
    font-weight: 750;
    letter-spacing: 1px;
}

#listsContainer {
    display: flex;
    flex-direction: column;
    gap: 3px;
}

.list-row {
    display: flex;
    align-items: center;

    border-radius: 9px;

    overflow: hidden;
}

.list-row.active {
    background: var(--primary-light);
}

.list-button {
    flex: 1;

    border: 0;
    background: transparent;

    padding: 10px;

    text-align: left;

    color: var(--text-soft);

    font-size: 13px;
}

.list-row.active .list-button {
    color: var(--text);
    font-weight: 650;
}

.list-delete-button {
    width: 32px;

    border: 0;
    background: transparent;

    color: var(--text-muted);
}

.list-delete-button:hover {
    color: var(--text);
}

.new-list-button {
    width: 100%;

    margin-top: 8px;
    padding: 9px 10px;

    border: 1px dashed var(--border);
    border-radius: 9px;

    background: transparent;

    color: var(--text-soft);

    text-align: left;
}


/* MAIN */

.main {
    width: min(100%, 1000px);

    padding: 48px 54px;

    margin: 0 auto;
}

.topbar {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;

    margin-bottom: 32px;
}

.eyebrow {
    color: var(--text-muted);

    font-size: 10px;
    font-weight: 750;
    letter-spacing: 1.2px;

    margin-bottom: 6px;
}

h1 {
    margin: 0;

    font-size: 30px;
    letter-spacing: -1px;
}

.add-button,
.primary-button {
    border: 0;
    border-radius: 10px;

    background: var(--primary);
    color: var(--text);

    padding: 10px 17px;

    font-weight: 700;
}

.toolbar {
    display: flex;
    gap: 10px;

    margin-bottom: 12px;
}

.toolbar input {
    flex: 1;
}

input,
textarea,
select {
    width: 100%;

    border: 1px solid var(--border);
    border-radius: 9px;

    background: var(--surface-light);
    color: var(--text);

    padding: 11px 12px;

    outline: none;
}

textarea {
    resize: vertical;
}

input:focus,
textarea:focus,
select:focus {
    border-color: var(--primary);
}

.toolbar select {
    width: 130px;
}

.item-count {
    color: var(--text-muted);

    font-size: 11px;

    margin-bottom: 14px;
}


/* ITEMS */

.items-list {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.item-card {
    position: relative;

    padding: 17px 18px;

    border: 1px solid var(--border);
    border-radius: 13px;

    background: var(--surface);
}

.item-type {
    color: var(--text-muted);

    font-size: 9px;
    font-weight: 750;
    letter-spacing: 1px;

    margin-bottom: 5px;
}

.item-title {
    font-size: 15px;
    font-weight: 700;

    margin-bottom: 7px;
}

.item-content {
    color: var(--text-soft);

    font-size: 13px;
    line-height: 1.55;

    white-space: pre-wrap;

    word-break: break-word;
}

.item-url {
    color: var(--text-soft);

    font-size: 12px;

    margin-top: 8px;

    word-break: break-all;
}

.item-url a {
    color: inherit;
}

.item-actions {
    display: flex;
    gap: 5px;

    margin-top: 13px;
}

.item-action {
    border: 1px solid var(--border);
    border-radius: 7px;

    background: transparent;

    color: var(--text-muted);

    padding: 5px 9px;

    font-size: 11px;
}

.item-action:hover {
    background: var(--surface-light);
    color: var(--text);
}

.checklist-item {
    display: flex;
    gap: 8px;

    color: var(--text-soft);

    font-size: 13px;

    margin: 6px 0;
}

.checklist-item input {
    width: auto;
}


/* EMPTY */

.empty-state {
    padding: 70px 20px;

    text-align: center;
}

.empty-title {
    font-size: 18px;
    font-weight: 700;

    margin-bottom: 7px;
}

.empty-text {
    color: var(--text-muted);
    font-size: 13px;
}


/* MODALS */

.modal {
    position: fixed;
    inset: 0;

    display: flex;
    align-items: center;
    justify-content: center;

    padding: 20px;

    background: rgba(51, 42, 40, 0.22);

    z-index: 100;
}

.modal[hidden] {
    display: none;
}

.modal-card {
    width: min(560px, 100%);
    max-height: 90vh;
    overflow-y: auto;

    padding: 24px;

    border-radius: 16px;

    background: var(--surface);
    box-shadow: 0 20px 60px rgba(51, 42, 40, 0.18);
}

.modal-card.small {
    width: min(420px, 100%);
}

.modal-header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    margin-bottom: 22px;
}

.modal-header h2 {
    margin: 0;

    font-size: 20px;
}

.close-button {
    width: 32px;
    height: 32px;

    border: 0;
    border-radius: 50%;

    background: transparent;

    color: var(--text-muted);

    font-size: 22px;
}

.close-button:hover {
    background: var(--primary-light);
}

.modal label {
    display: block;

    color: var(--text-soft);

    font-size: 11px;
    font-weight: 650;

    margin: 14px 0 6px;
}

.modal form > button:last-child {
    margin-top: 18px;
}

.type-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;

    gap: 9px;
}

.type-button {
    padding: 15px;

    border: 1px solid var(--border);
    border-radius: 11px;

    background: var(--surface-light);

    text-align: left;
}

.type-button strong {
    display: block;

    font-size: 13px;

    margin-bottom: 4px;
}

.type-button span {
    color: var(--text-muted);

    font-size: 11px;
}

.type-button:hover {
    background: var(--primary-light);
}

.secondary-button {
    border: 1px solid var(--border);
    border-radius: 9px;

    background: transparent;
    color: var(--text-soft);

    padding: 9px 13px;
}

.checklist-input {
    display: flex;
    gap: 6px;

    margin-bottom: 7px;
}

.checklist-input input {
    flex: 1;
}

.remove-checklist {
    width: 38px;

    border: 1px solid var(--border);
    border-radius: 8px;

    background: transparent;
}


/* RESPONSIVE */

@media (max-width: 700px) {

    .sidebar {
        display: none;
    }

    .main {
        padding: 30px 18px;
    }

    .topbar {
        margin-bottom: 24px;
    }

    h1 {
        font-size: 25px;
    }

    .toolbar {
        flex-direction: column;
    }

    .toolbar select {
        width: 100%;
    }

}
