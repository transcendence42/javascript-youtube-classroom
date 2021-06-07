export const searchPageModel = {
    getLocalStorageItem(str) {
        const rawItem = localStorage.getItem(str);
        if (!rawItem) {
            return [];
        }
        else {
            return JSON.parse(rawItem);
        }
    },
    addRecentSearch(str) {
        let recentSearchItems = this.getLocalStorageItem('recent-search');
        if (recentSearchItems.length > 2) {
            recentSearchItems.shift();
        }
        recentSearchItems.push(str);
        localStorage.setItem('recent-search', JSON.stringify(recentSearchItems));
    },
};
