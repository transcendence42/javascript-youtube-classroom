const $ = (selector: string): HTMLElement | null => document.querySelector(selector);

const $$ = (selector: string): NodeList | null => document.querySelectorAll(selector);

const wait = async (delay: number): Promise<number> => {
  return new Promise<number>((resolve) => setTimeout(resolve, delay));
};

const removeChildNodes = (element: HTMLElement | null): void => {
  while (element?.hasChildNodes()) {
    console.log('removeChildNodes', element?.hasChildNodes());
    element?.removeChild(element.childNodes[0]);
  }
};

const removeInnerHTML = (element: HTMLElement | null) => {
  if (element) {
    element.innerHTML = '';
  }
};

const getDataKey = (element: HTMLElement | null, key: string): string => {
  if (element) {
    return element.dataset.key ? element.dataset.key : '';
  }
  return '';
};

const setDataKey = (element: HTMLElement | null, key: string, text: string): void => {
  if (element) {
    element.dataset[`${key}`] = text;
  }
};

export { $, $$, wait, removeChildNodes, removeInnerHTML, getDataKey, setDataKey };
