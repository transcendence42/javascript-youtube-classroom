export const mainPageModel = {
    getLocalStorageItem(str) {
        const rawItem = localStorage.getItem(str);
        if (!rawItem) {
            return [];
        }
        else {
            return JSON.parse(rawItem);
        }
    },
    deleteSaveVideos(videoLink) {
        if (!videoLink) {
            return;
        }
        let videoItems = this.getLocalStorageItem('videos');
        localStorage.setItem('videos', JSON.stringify(videoItems.filter((x) => x.videoLink !== videoLink)));
    },
    toggleCheckLike(videoLink) {
        if (!videoLink) {
            return;
        }
        let videoItems = this.getLocalStorageItem('videos').map((x) => {
            if (x.videoLink === videoLink) {
                x.checkLike = !x.checkLike;
            }
            return x;
        });
        localStorage.setItem('videos', JSON.stringify(videoItems));
    },
    toggleCheckView(videoLink) {
        if (!videoLink) {
            return;
        }
        let videoItems = this.getLocalStorageItem('videos').map((x) => {
            if (x.videoLink === videoLink) {
                x.checkView = !x.checkView;
            }
            return x;
        });
        localStorage.setItem('videos', JSON.stringify(videoItems));
    },
};
