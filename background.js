"use strict";

async function highlight_selection(text, opts) {
    let result = await browser.find.find(text, opts);
    if (result.count) {
        browser.find.highlightResults({ tabId: opts.tabId });
    }
}

function clear_selection() {
    browser.find.removeHighlighting()
}

async function options(tab_id) {
    let opts = await browser.storage.sync.get(["case_sensitive", "entire_word"]);

    return {
        tabId: tab_id,
        caseSensitive: opts["case_sensitive"] === "true",
        entireWord: opts["entire_word"] === "true"
    }
}

async function handle_message(msg, sender) {
    if (msg.type === "highlight") {
        let opts = await options(sender.tab.id);
        await highlight_selection(msg.selection, opts);
    } else if (msg.type === "clear") {
        clear_selection()
    }
}

async function main() {
    browser.runtime.onMessage.addListener(handle_message);

    browser.browserAction.onClicked.addListener(() => {
        browser.runtime.openOptionsPage()
    });
}

main();