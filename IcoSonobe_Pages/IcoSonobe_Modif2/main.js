import '/style.css'
import {gltfloader2} from '/main.js'

gltfloader2('/GLB_Files/sonobemoduleicosahedronmodif2.glb');

document.body.addEventListener("click", (ev) => {
    const isExpandableTitle = ev.target.closest(".expandable_title-bar");
    const expandable = ev.target.closest(".expandable");

    if (!isExpandableTitle) {
        return;
    }

    expandable.classList.toggle("expandable-open");
})