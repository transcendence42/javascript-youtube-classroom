import { navigatorController } from "./controller/navigatorController.js";
import { navigatorRenderer } from "./view/navigatorRenderer.js";
export const app = () => {
    navigatorRenderer();
    navigatorController();
};
app();
