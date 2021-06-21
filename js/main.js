import'./generator-ads.js';
import {switchPageState} from './form.js';
import {validityTitle, validityPrice, validityCapacity} from './validity-form.js';

switchPageState(false);
validityTitle();
validityPrice();
validityCapacity();
