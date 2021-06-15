export const getRecentKeywords = (): string[] => {
  const recentKeywords: string | null = localStorage.getItem('recentKeywords');
  if (!recentKeywords) {
    return [];
  }
  const recentKeywordList: string[] = JSON.parse(recentKeywords);
  return recentKeywordList;
};

export const saveRecentKeywordList = (recentKeywordList: string[]): void => {
  localStorage.setItem('recentKeywords', JSON.stringify(recentKeywordList));
};
