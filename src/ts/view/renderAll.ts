import { $, $$ } from '../util.js';
import {titleSection, articleSection, article, modal} from './mainPage/index.js';
import { modalTitleSection, modalSearchFormSection, modalRecentKeywordSection, modalArticleSection, modalArticle } from './modalPage/index.js';

const renderAll = () => {
  $('#app')?.insertAdjacentHTML('beforeend', titleSection());
  $('header')?.insertAdjacentHTML('afterend', articleSection());
  $('main>section')?.insertAdjacentHTML('beforeend', article());

  $('#app')?.insertAdjacentHTML('beforeend', modal());
  $('div.modal-inner')?.insertAdjacentHTML('beforeend', modalTitleSection());
  $('div.modal-inner')?.insertAdjacentHTML('beforeend', modalSearchFormSection());
  $('div.modal-inner')?.insertAdjacentHTML('beforeend', modalRecentKeywordSection());
  $('div.modal-inner')?.insertAdjacentHTML('beforeend', modalArticleSection());
  $('div.modal-inner section.video-wrapper')?.insertAdjacentHTML('beforeend', modalArticle());
};

export { renderAll }