import gsap from "gsap"
import { mountNav } from '../../components/nav.js';
import { mountFooter } from '../../components/footer.js';
mountNav();
mountFooter();

//Dropdown animation for Navigation
const tl = gsap.timeline({ defaults: { duration: 1} })
tl.fromTo('nav', {y: "-100%" }, {y: "0%"})