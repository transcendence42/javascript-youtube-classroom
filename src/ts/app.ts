import MainController from "./controller/MainController.js";
import { renderAll } from "./view/renderAll.js";

export const app = (): void => {
  renderAll();
  new MainController();
}

app();
