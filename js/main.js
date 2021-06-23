import'./generator-ads.js';
import {switchPageState} from './form.js';
import {setValidityTitle, setValidityMaxPrice, setValidityCapacity} from './validity-form.js';

switchPageState(false);
setValidityTitle();
setValidityMaxPrice();
setValidityCapacity();
