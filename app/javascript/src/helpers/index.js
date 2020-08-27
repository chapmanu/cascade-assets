import { focusedImage } from './focus-image';
import { ieFallbackObjectFit } from './ie_11_fallbacks';
import { objectFitIE } from './object-fit';
const helpers = {
  initialize() {
    focusedImage();
    objectFitIE();
  },
  ieFallbackObjectFit
}

export default helpers;