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
        if (recentSearchItems.includes(str)) {
            if (str === recentSearchItems[recentSearchItems.length - 1]) {
                return;
            }
            else {
                recentSearchItems.splice(recentSearchItems.indexOf(str), 1);
                // recentSearchItems.push(str);
                // localStorage.setItem('recent-search', JSON.stringify(recentSearchItems));
                // return ;
            }
        }
        if (recentSearchItems.length > 2) {
            recentSearchItems.shift();
        }
        recentSearchItems.push(str);
        localStorage.setItem('recent-search', JSON.stringify(recentSearchItems));
    },
    addSaveVideos(video) {
        let videoItems = this.getLocalStorageItem('videos');
        if (videoItems.some((x) => x.videoLink === video.videoLink)) {
            return;
        }
        videoItems.push(video);
        localStorage.setItem('videos', JSON.stringify(videoItems));
    },
};
