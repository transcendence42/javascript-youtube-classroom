var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);
const wait = (delay) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve) => setTimeout(resolve, delay));
});
const removeChildNodes = (element) => {
    while (element === null || element === void 0 ? void 0 : element.hasChildNodes()) {
        console.log('removeChildNodes', element === null || element === void 0 ? void 0 : element.hasChildNodes());
        element === null || element === void 0 ? void 0 : element.removeChild(element.childNodes[0]);
    }
};
const removeInnerHTML = (element) => {
    if (element) {
        element.innerHTML = '';
    }
};
const getDataKey = (element, key) => {
    if (element) {
        return element.dataset.key;
    }
};
const setDataKey = (element, key, text) => {
    if (element) {
        element.dataset[`${key}`] = text;
    }
};
export { $, $$, wait, removeChildNodes, removeInnerHTML, getDataKey, setDataKey };
