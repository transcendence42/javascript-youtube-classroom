import { $ } from "../util.js";
const navigatorDiv = () => {
    return `
  <div class="d-flex justify-center mt-5 w-100">
    <div class="w-100">
      <header class="my-4">
        <h2 class="text-center font-bold">👩🏻‍💻 나만의 유튜브 강의실 👨🏻‍💻</h2>
        <nav class="d-flex justify-center">
          <button id="saved-video-button" class="btn bg-cyan-100 mx-1">👁️ 볼 영상</button>
          <button id="watched-video-button" class="btn mx-1">✅ 본 영상</button>
          <button id="search-button" class="btn mx-1">🔍 동영상 검색</button>
        </nav>
      </header>
    </div>
  </div>`;
};
export const navigatorRenderer = () => {
    var _a;
    (_a = $("#app")) === null || _a === void 0 ? void 0 : _a.insertAdjacentHTML("beforeend", navigatorDiv());
};
