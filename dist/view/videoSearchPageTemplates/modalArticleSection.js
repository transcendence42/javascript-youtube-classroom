import { getSavedVideos } from "../../model/handleLocalStorage/articleManager.js";
export const modalArticleSection = () => {
    return `
  <section>
    <div class="d-flex justify-end text-gray-700">
      저장된 영상 갯수: <span id="num-of-videos">${getSavedVideos().length}</span>개
    </div>
    <section id="searched-article-wrapper" class="video-wrapper">
    <!-- article begin -->
    </section>
  </section>`;
};
