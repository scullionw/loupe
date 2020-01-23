"use strict";

const OPTS = ["case_sensitive", "entire_word"];

async function store(id) {
    await browser.storage.sync.set({
        [`${id}`]: document.querySelector(`#${id}`).checked ? "true" : "false"
    });
}

async function load(id) {
    let res = await browser.storage.sync.get(`${id}`);
    let value = res[`${id}`] || "false";
    document.querySelector(`#${id}`).checked = value === "true";
}

function restore_options() {
    Promise.all(OPTS.map(load))
}

function save_options(e) {
    Promise.all(OPTS.map(store))
    e.preventDefault();
}

function main() {
    document.addEventListener('DOMContentLoaded', restore_options);
    document.querySelector("form").addEventListener("submit", save_options);
}

main();


