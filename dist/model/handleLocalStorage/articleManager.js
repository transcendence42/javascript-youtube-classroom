export const getSavedVideos = () => {
    const savedVideosStr = localStorage.getItem("savedVideos");
    if (!savedVideosStr) {
        return [];
    }
    let savedVideosList = JSON.parse(savedVideosStr);
    return savedVideosList;
};
export const saveVideo = (video) => {
    const savedVideosList = getSavedVideos();
    video.saved = "yes";
    savedVideosList.push(video);
    localStorage.setItem("savedVideos", JSON.stringify(savedVideosList));
};
export const unsaveVideo = (videoId) => {
    let savedVideosList = getSavedVideos();
    savedVideosList = savedVideosList.filter((video) => video.videoId !== videoId);
    localStorage.setItem("savedVideos", JSON.stringify(savedVideosList));
};
export const isSavedVideo = (videoId) => {
    const savedVideosList = getSavedVideos();
    let ret = false;
    savedVideosList.forEach((video) => {
        if (video.videoId === videoId) {
            ret = true;
        }
    });
    return ret;
};
