import uninav from './uninav';
import offCanvasNav from './offcanvas-nav';
import considerations from './considerations';

const navigation = {
  initialize() {
    uninav();
    offCanvasNav();
    considerations.initialize();
  }
}

export default navigation;