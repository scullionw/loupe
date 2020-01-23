"use strict";

const MIN_LEN = 2;
const MAX_LEN = 100;

async function text_highlighted(highlight_active) {
    const s = window.getSelection().toString();

    if (is_selection_valid(s)) {
        await browser.runtime.sendMessage({ "type": "highlight", "selection": s });
        return true;
    } else if (highlight_active) {
        await browser.runtime.sendMessage({ "type": "clear" });
    }

    return false;
}

function is_selection_valid(s) {
    return s.length >= MIN_LEN && s.length <= MAX_LEN;
}

function main() {
    let highlight_active = false;

    window.addEventListener("mouseup", async () => {
        highlight_active = await text_highlighted(highlight_active);
    });
}

main();

