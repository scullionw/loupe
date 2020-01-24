"use strict";

// Options with default values
export const OPTS = {
    case_sensitive: true,
    entire_word: true,
    trim_selection: true
};

export async function store_option(id, value) {
    await browser.storage.sync.set({ [id]: value ? "true" : "false" });
}

export async function load_option(id) {
    let value = (await browser.storage.sync.get(id))[id];
    if (value) {
        return value === "true"
    } else {
        return OPTS[id];
    }
}