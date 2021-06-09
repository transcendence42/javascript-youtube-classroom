import { $, $$ } from '../util.js';

export const removeModalArticles = () => {
  $("div.modal-inner section.video-wrapper")!.innerHTML = "";
}

export const removeNotFoundImage = () => {
  $('div.modal section img')?.remove();
}

export const removeDuplicateRecentKeyword = (searchValue: string) => {
  ($$(".chip") as NodeListOf<HTMLAnchorElement>).forEach((elem)=>{
    if (elem.innerText === searchValue) {
      elem.remove();
    }
  });
}

export const removeOldSearchKeyword = () => {
  if (($$('.chip') as NodeList).length === 4) {
    $('a.chip:last-child')?.remove();
  }
}

export const removeSkeletons = () => {
  $$('div.modal-inner section.video-wrapper .skeleton')?.forEach(elem=>{
    elem.parentElement?.remove();
  });
}
