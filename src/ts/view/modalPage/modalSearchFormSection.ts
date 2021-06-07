export const modalSearchFormSection = (): string => {
  return `
  <form class="d-flex" onsubmit="return false;">
    <input type="text" id="search-input" class="w-100 mr-2 pl-2" placeholder="검색" />
    <button type="button" id="search-submit-button" class="btn bg-cyan-500">검색</button>
  </form>`;
};