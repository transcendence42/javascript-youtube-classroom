export const getRecentKeywords = () => {
    const recentKeywords = localStorage.getItem('recentKeywords');
    if (!recentKeywords) {
        return [];
    }
    const recentKeywordList = JSON.parse(recentKeywords);
    return recentKeywordList;
};
export const saveRecentKeywordList = (recentKeywordList) => {
    localStorage.setItem('recentKeywords', JSON.stringify(recentKeywordList));
};
