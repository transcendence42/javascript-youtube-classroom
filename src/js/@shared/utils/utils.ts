const $ = (selector: string): HTMLElement | null => document.querySelector(selector);

const $$ = (selector: string): NodeList | null => document.querySelectorAll(selector);

const wait = async (delay: number): Promise<number> => {
  return new Promise<number>((resolve) => setTimeout(resolve, delay));
};

export { $, $$, wait };
