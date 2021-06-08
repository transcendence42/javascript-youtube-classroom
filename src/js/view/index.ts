import { $ } from '../@shared/utils/utils.js'
import {getModalWrapper} from './search-page/index.js';

export const renderView = () => {
    $('#app')?.insertAdjacentHTML('beforeend', getModalWrapper());
}
