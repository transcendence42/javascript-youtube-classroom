const $ = (selector: string): HTMLElement | null => document.querySelector(selector);

const $$ = (selector: string): NodeList | null => document.querySelectorAll(selector);

const wait = async (delay: number): Promise<number> => {
  return new Promise<number>((resolve) => setTimeout(resolve, delay));
};

const removeChildNodes = (element: HTMLElement | null): void => {
  while (element?.hasChildNodes()) {
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

const showSnackBar = async (text: string): Promise<void>  => {
  const snackbar: HTMLDivElement = $('#snackbar') as HTMLDivElement;
  if (snackbar) {
    snackbar.innerHTML = text;
    snackbar.classList.add('show');
    await wait(2000);
    snackbar.classList.remove('show');
  }
};

export { $, $$, wait, removeChildNodes, removeInnerHTML, getDataKey, setDataKey, showSnackBar };
