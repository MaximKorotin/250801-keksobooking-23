import'./generator-ads.js';
import {switchPageState} from './form.js';
import {validityTitle, validityPrice, minPrice} from './validity-form.js';

validityTitle();
validityPrice();
switchPageState(false);
minPrice();
