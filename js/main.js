import {SIMILAR_AD_COUNT, createAd} from './create-ad.js';

const similarAds = new Array(SIMILAR_AD_COUNT)
  .fill(null)
  .map((value, index) => createAd(index + 1))
  .sort(() => Math.random() - 0.3);

// eslint-disable-next-line no-console
console.log(similarAds);
