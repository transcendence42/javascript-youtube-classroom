export const modalSearchFormSection = (): string => {
  return `
  <form class="d-flex" onsubmit="return false;">
    <input type="text" id="search-input" class="w-100 mr-2 pl-2" placeholder="검색" data-is-first-search="true" data-next-token=""/>
    <button type="submit" id="search-submit-button" class="btn bg-cyan-500">검색</button>
  </form>`;
};