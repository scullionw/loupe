"use strict";

import { OPTS, load_option, store_option } from './optionslib.js'

function read_option(option_id) {
    return document.querySelector(`#${option_id}`).checked;
}

function write_option(option_id, value) {
    document.querySelector(`#${option_id}`).checked = value;
}

async function restore_options() {
    Promise.all(
        Object.keys(OPTS).map(async (opt) => {
            let state = await load_option(opt);
            write_option(opt, state);
        })
    )
}

function save_options(e) {
    e.preventDefault();

    Promise.all(
        Object.keys(OPTS).map(async (opt) => {
            let state = read_option(opt);
            await store_option(opt, state);
        })
    )
}

function main() {
    document.addEventListener('DOMContentLoaded', restore_options);
    document.querySelector("form").addEventListener("submit", save_options);
}

main();