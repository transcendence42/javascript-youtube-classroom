import { CLASSNAME } from "../constants/index.js";

const GENERATE_TEMPLATE = (buttonTemplate) => `
<article class="clip ${CLASSNAME.SKELETON}">
  <div class="preview-container">
  <iframe
    class="image ${CLASSNAME.VIDEO_ID}"
    width="100%"
    height="118"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen
    loading="lazy"
  ></iframe>
  </div>
  <div class="content-container pt-2 px-1">
    <h3 class="line ${CLASSNAME.VIDEO_TITLE}"></h3>
    <div>
      <a target="_blank" class="line channel-name mt-1 ${CLASSNAME.CHANNEL_TITLE}"></a>
      <div class="line meta">
        <p class="${CLASSNAME.PUBLISHED_AT}"></p>
      </div>
      ${buttonTemplate}
    </div>
  </div>
</article>`;

const SAVED_VIDEO_BUTTON_TEMPLATE = `
<div class="d-flex justify-end ${CLASSNAME.SAVE_VIDEO_BUTTON_WRAPPER}">
  <button class="btn ${CLASSNAME.SAVE_VIDEO_BUTTON}" disabled>저장</button>
</div>
`;

const MAIN_ICONS_TEMPLATE = `
<div class=${CLASSNAME.ICONS_WRAPPER}>
  <span class="${CLASSNAME.MOVE_TO_WATCH_LATER_ICON} icon move-to-watch-later-icon opacity-hover "></span>
  <span class="${CLASSNAME.MOVE_TO_HISTORY_ICON} icon move-to-history-icon opacity-hover"></span>
  <span class="${CLASSNAME.LIKE_ICON} icon opacity-hover">👍</span>
  <span class="${CLASSNAME.COMMENT_ICON} icon opacity-hover">💬</span>
  <span class="${CLASSNAME.DELETE_ICON} icon opacity-hover">🗑️</span>
</div>`;

const SEARCH_VIDEO_TEMPLATE = GENERATE_TEMPLATE(SAVED_VIDEO_BUTTON_TEMPLATE);
const MAIN_VIDEO_TEMPLATE = GENERATE_TEMPLATE(MAIN_ICONS_TEMPLATE);

export { SEARCH_VIDEO_TEMPLATE, MAIN_VIDEO_TEMPLATE };
