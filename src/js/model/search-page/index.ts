export const searchPageModel = {
  getLocalStorageItem(str: string): never | string[] {
    const rawItem = localStorage.getItem(str);
    if (!rawItem) {
      return [];
    } else {
      return JSON.parse(rawItem);
    }
  },
  addRecentSearch(str: string){
    let recentSearchItems = this.getLocalStorageItem('recent-search');
    if (recentSearchItems.length > 2) {
      recentSearchItems.shift();
    }
    recentSearchItems.push(str);
    localStorage.setItem('recent-search', JSON.stringify(recentSearchItems));
  },
};
