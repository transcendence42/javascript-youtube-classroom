const $ = (selector: string): HTMLElement | null => document.querySelector(selector);
const $$ = (selector: string): NodeListOf<HTMLElement> | null => document.querySelectorAll(selector);

export { $, $$ };