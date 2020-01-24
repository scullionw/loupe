"use strict";

import { load_option } from './../options/optionslib.js'

async function highlight_selection(raw_text, opts) {
    let text = await load_option("trim_selection") ? raw_text.trim() : raw_text;
    let result = await browser.find.find(text, opts);
    if (result.count) {
        browser.find.highlightResults({ tabId: opts.tabId });
    }
}

function clear_selection() {
    browser.find.removeHighlighting()
}

async function options(tab_id) {
    return {
        tabId: tab_id,
        caseSensitive: await load_option("case_sensitive"),
        entireWord: await load_option("entire_word"),
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

function main() {
    browser.runtime.onMessage.addListener(handle_message);

    browser.browserAction.onClicked.addListener(() => {
        browser.runtime.openOptionsPage()
    });
}

main();