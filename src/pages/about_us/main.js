import gsap from "gsap"
import { mountNav } from '../../components/nav.js';
mountNav();

//Dropdown animation for Navigation
const tl = gsap.timeline({ defaults: { duration: 1} })
tl.fromTo('nav', {y: "-100%" }, {y: "0%"})