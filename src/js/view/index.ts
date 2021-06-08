import { $ } from '../@shared/utils/utils.js'
import {getModalWrapper} from './search-page.js';

export const renderView = () => {
    $('#app')?.insertAdjacentHTML('beforeend', getModalWrapper());
}
