import '/style.css'
import {gltfloader} from '/main.js'

gltfloader("/GLB_Files/sonobemoduleicosahedron_270pcs_inverse.glb");

document.body.addEventListener("click", (ev) => {
    const isExpandableTitle = ev.target.closest(".expandable_title-bar");
    const expandable = ev.target.closest(".expandable");

    if (!isExpandableTitle) {
        return;
    }

    expandable.classList.toggle("expandable-open");
})