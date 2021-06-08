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
            return;
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
