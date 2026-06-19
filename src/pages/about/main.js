import '../../styles/base.css'
import { animateNavIn } from '../../utils/motion.js'
import { mountNav } from '../../components/nav.js';
import { mountFooter } from '../../components/footer.js';
mountNav();
mountFooter();

// Slide the nav in on load (skipped under reduced motion).
animateNavIn();