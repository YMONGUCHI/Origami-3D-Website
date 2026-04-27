import './style.css'
import gsap from "gsap"

// Container Loader
function Container_Loader(array, model_name, png_file, page_link) {
    var item_array = [model_name, png_file, page_link];
    array.push(item_array);
}

function PNG_Loader(array) {
    var container = document.getElementById('imageContainer');
    for (var i = 0; i < array.length; ++i) {
        var currentItem = array[i];
        // Load Image
        var image = new Image();
        image.src = currentItem[1];
        image.style.width = "80%";
        var imageAnchor = document.createElement('a');
        imageAnchor.href = currentItem[2];
        imageAnchor.appendChild(image);
        container.appendChild(imageAnchor);

        // Load Model_name
        var modelName = document.createElement('p');
        modelName.textContent = currentItem[0];
        var modelNameAnchor = document.createElement('a');
        modelNameAnchor.href = currentItem[2];
        modelNameAnchor.appendChild(modelName);
        modelNameAnchor.style.color = "white";
        container.appendChild(modelNameAnchor);

        // Position the image
        var column = (i % 4) * 300;
        var row = Math.floor(i / 4) * 400;
        imageAnchor.style.position = "absolute";
        imageAnchor.style.left = column + 200 + "px";
        imageAnchor.style.top = row + 200 + "px";
        modelNameAnchor.style.position = "absolute";
        modelNameAnchor.style.left = column + 240 + "px";
        modelNameAnchor.style.top = (row + 440) +"px";
    }
}

// Function call
var PNG_Files = [];
//Sonobe Tetrahedrons
Container_Loader(PNG_Files, "Sonobe - Tetrahedron", "/Models_PNG/Sonobe_Tetrahedron.png", "/TetraSonobe_Pages/index.html");
Container_Loader(PNG_Files, "Sonobe - Tetrahedron Var. 1", "/Models_PNG/Sonobe_Tetrahedron_Modif1.png", "/TetraSonobe_Pages/TetraSonobe_Modif1/index.html");
Container_Loader(PNG_Files, "Sonobe - Tetrahedron Var. 2", "/Models_PNG/Sonobe_Tetrahedron_Modif2.png", "/TetraSonobe_Pages/TetraSonobe_Modif2/index.html");
Container_Loader(PNG_Files, "Sonobe - Tetrahedron Var. 3", "/Models_PNG/Sonobe_Tetrahedron_Modif3.png", "/TetraSonobe_Pages/TetraSonobe_Modif3/index.html");

//Sonobe Hexahedrons
Container_Loader(PNG_Files, "Sonobe - Hexahedron", "/Models_PNG/Sonobe_Hexahedron.png", "/HexaSonobe_Pages/index.html");
Container_Loader(PNG_Files, "Sonobe - Hexahedron Var. 1", "/Models_PNG/Sonobe_Hexahedron_Modif1.png", "/HexaSonobe_Pages/HexaSonobe_Modif1/index.html");
Container_Loader(PNG_Files, "Sonobe - Hexahedron Var. 2", "/Models_PNG/Sonobe_Hexahedron_Modif2.png", "/HexaSonobe_Pages/HexaSonobe_Modif2/index.html");
Container_Loader(PNG_Files, "Sonobe - Hexahedron Var. 2", "/Models_PNG/Sonobe_Hexahedron_Modif3.png", "/HexaSonobe_Pages/HexaSonobe_Modif3/index.html");

//Sonobe Octahedrons
Container_Loader(PNG_Files, "Sonobe - Octahedron", "/Models_PNG/Sonobe_Octahedron.png", "/OctoSonobe_Pages/index.html");
Container_Loader(PNG_Files, "Sonobe - Octahedron Var. 1", "/Models_PNG/Sonobe_Octahedron_Modif1.png", "/OctoSonobe_Pages/OctaSonobe_Modif1/index.html");
Container_Loader(PNG_Files, "Sonobe - Octahedron Var. 2", "/Models_PNG/Sonobe_Octahedron_Modif2.png", "/OctoSonobe_Pages/OctaSonobe_Modif2/index.html");
Container_Loader(PNG_Files, "Sonobe - Octahedron Var. 3", "/Models_PNG/Sonobe_Octahedron_Modif3.png", "/OctoSonobe_Pages/OctaSonobe_Modif3/index.html");

//Sonobe Icosahedrons
Container_Loader(PNG_Files, "Sonobe - Icosahedron", "/Models_PNG/Sonobe_Icosahedron.png", "/IcoSonobe_Pages/index.html");
Container_Loader(PNG_Files, "Sonobe - Icosahedron Var. 1", "/Models_PNG/Sonobe_Icosahedron_Modif1.png", "/IcoSonobe_Pages/IcoSonobe_Modif1/index.html");
Container_Loader(PNG_Files, "Sonobe - Icosahedron Var. 2", "/Models_PNG/Sonobe_Icosahedron_Modif2.png", "/IcoSonobe_Pages/IcoSonobe_Modif2/index.html");
Container_Loader(PNG_Files, "Sonobe - Icosahedron Var. 3", "/Models_PNG/Sonobe_Icosahedron_Modif3.png", "/IcoSonobe_Pages/IcoSonobe_Modif3/index.html");

//Sonobe 90pcs
Container_Loader(PNG_Files, "Sonobe - 90pcs", "/Models_PNG/Sonobe_90pcs.png", "/IcoSonobe_Pages/IcoSonobe_90pcs/index.html");

//Sonobe 120pcs
Container_Loader(PNG_Files, "Sonobe - 120pcs", "/Models_PNG/Sonobe_120pcs.png", "/IcoSonobe_Pages/IcoSonobe_120pcs/index.html");

//Sonobe 270pcs
Container_Loader(PNG_Files, "Sonobe - 270pcs", "/Models_PNG/Sonobe_270pcs.png", "/IcoSonobe_Pages/IcoSonobe_270pcs/index.html");

//Sonobe 360pcs
Container_Loader(PNG_Files, "Sonobe - 360pcs", "/Models_PNG/Sonobe_360pcs.png", "/IcoSonobe_Pages/IcoSonobe_360pcs/index.html")

//Sonobe HexaOctaCompound
Container_Loader(PNG_Files, "Sonobe - HexaOctaCompound", "/Models_PNG/Sonobe_HexaOctahedron.png", "/HexaOctaSonobe_Pages/index.html");

//Sonobe Hexahedron size 2
Container_Loader(PNG_Files, "Sonobe - Hexahedron size 2", "/Models_PNG/Sonobe_Hexahedronsize2.png", "/HexaSonobesize2_Pages/index.html");

//Sonobe Hexahedron size 3
Container_Loader(PNG_Files, "Sonobe - Hexahedron size 2", "/Models_PNG/Sonobe_Hexahedronsize3.png", "/HexaSonobesize3_Pages/index.html");

//Sonobe 48pcs
Container_Loader(PNG_Files, "Sonobe - 48pcs", "/Models_PNG/Sonobe_48pcs.png", "/48pcsSonobe_Pages/index.html");

//Sonobe 108pcs
Container_Loader(PNG_Files, "Sonobe - 108pcs", "/Models_PNG/Sonobe_108pcs.png", "/108pcsSonobe_Pages/index.html");

//Sonobe 144pcs
Container_Loader(PNG_Files, "Sonobe - 144pcs", "/Models_PNG/Sonobe_144pcs.png", "/144pcsSonobe_Pages/index.html");

//Sonobe Plane 15pcs
Container_Loader(PNG_Files, "Sonobe - Plane 15pcs", "/Models_PNG/Sonobe_Plane_15pcs.png", "/SonobePlane_Pages/Sonobe_Plane_15pcs/index.html");
Container_Loader(PNG_Files, "Sonobe - Plane 18pcs", "/Models_PNG/Sonobe_Plane_18pcs.png", "/SonobePlane_Pages/Sonobe_Plane_18pcs/index.html");
Container_Loader(PNG_Files, "Sonobe - Plane 72pcs", "/Models_PNG/Sonobe_Plane_72pcs.png", "/SonobePlane_Pages/Sonobe_Plane_72pcs/index.html");

//Sonobe Inverse
Container_Loader(PNG_Files, "Sonobe - 12pcs Inverted", "/Models_PNG/Sonobe_Octahedron_Inverse.png", "/OctoSonobe_Pages/OctaSonobe_Inverse/index.html");
Container_Loader(PNG_Files, "Sonobe - 36pcs Inverted", "/Models_PNG/Sonobe_HexaOctahedron_Inverse.png", "/HexaOctaSonobe_Pages/HexaOctaSonobe_Inverse/index.html");
Container_Loader(PNG_Files, "Sonobe - 30pcs Inverted", "/Models_PNG/Sonobe_Icosahedron_Inverse.png", "/IcoSonobe_Pages/IcoSonobe_Inverse/index.html");
Container_Loader(PNG_Files, "Sonobe - 90pcs Inverted", "/Models_PNG/Sonobe_Icosahedron_90pcs_Inverse.png", "/IcoSonobe_Pages/IcoSonobe_90pcs_Inverse/index.html");
Container_Loader(PNG_Files, "Sonobe - 120pcs Inverted", "/Models_PNG/Sonobe_Icosahedron_120pcs_Inverse.png", "/IcoSonobe_Pages/IcoSonobe_120pcs_Inverse/index.html");
Container_Loader(PNG_Files, "Sonobe - 270pcs Inverted", "/Models_PNG/Sonobe_Icosahedron_270pcs_Inverse.png", "/IcoSonobe_Pages/IcoSonobe_270pcs_Inverse/index.html");
Container_Loader(PNG_Files, "Sonobe - 360pcs Inverted", "/Models_PNG/Sonobe_Icosahedron_360pcs_Inverse.png", "/IcoSonobe_Pages/IcoSonobe_360pcs_Inverse/index.html");

//BowTie
Container_Loader(PNG_Files, "Bow Tie Motif - Hexahedron", "/Models_PNG/BowTieMotif_Hexahedron.png", "/BowTie_Pages/BowTie_Hexahedron/index.html");
Container_Loader(PNG_Files, "Bow Tie Motif - Octahedron", "/Models_PNG/BowTieMotif_Octahedron.png", "/BowTie_Pages/BowTie_Octahedron/index.html");
Container_Loader(PNG_Files, "Bow Tie Motif - Icosahedron", "/Models_PNG/BowTieMotif_Icosahedron.png", "/BowTie_Pages/BowTie_Icosahedron/index.html");

//Poke
Container_Loader(PNG_Files, "Poke - Tetrahedron", "/Models_PNG/Poke_Tetrahedron.png", "/Poke_Pages/Poke_Tetrahedron/index.html");
Container_Loader(PNG_Files, "Poke - Hexahedron", "/Models_PNG/Poke_Hexahedron.png", "/Poke_Pages/Poke_Hexahedron/index.html");
Container_Loader(PNG_Files, "Poke - Octahedron", "/Models_PNG/Poke_Octahedron.png", "/Poke_Pages/Poke_Octahedron/index.html");
Container_Loader(PNG_Files, "Poke - Enlarged Octahedron", "/Models_PNG/Poke_EnlargedOctahedron.png", "/Poke_Pages/Poke_EnlargedOctahedron/index.html");

//Poke v2
Container_Loader(PNG_Files, "Poke v2 - Tetrahedron", "/Models_PNG/Pokev2_Tetrahedron.png", "/Pokev2_Pages/Pokev2_Tetrahedron/index.html");
Container_Loader(PNG_Files, "Poke v2 - Octahedron", "/Models_PNG/Pokev2_Octahedron.png", "/Pokev2_Pages/Pokev2_Octahedron/index.html");

//Fuse
Container_Loader(PNG_Files, "Fuse - Tetrahedron", "/Models_PNG/Fuse_Tetrahedron.png", "/Fuse_Pages/Fuse_Tetrahedron/index.html");
Container_Loader(PNG_Files, "Fuse - Enlarged Tetrahedron", "/Models_PNG/Fuse_EnlargedTetrahedron.png", "/Fuse_Pages/Fuse_ExtrudedTetrahedron/index.html");

//Uncategorized
Container_Loader(PNG_Files, "Box Triangle", "/Models_PNG/BoxTriangle.png", "/Uncategorized_Pages/BoxTriangle/index.html");
Container_Loader(PNG_Files, "Octahedron 2", "/Models_PNG/Octahedron2.png", "/Uncategorized_Pages/Octahedron2/index.html");
Container_Loader(PNG_Files, "Octahedron 3", "/Models_PNG/Octahedron3.png", "/Uncategorized_Pages/Octahedron3/index.html");
Container_Loader(PNG_Files, "Icosahedron 2", "/Models_PNG/Icosahedron2.png", "/Uncategorized_Pages/Icosahedron2/index.html");
Container_Loader(PNG_Files, "Icosahedron 3", "/Models_PNG/Icosahedron3.png", "/Uncategorized_Pages/Icosahedron3/index.html");
Container_Loader(PNG_Files, "Icosahedron 4", "/Models_PNG/Icosahedron4.png", "/Uncategorized_Pages/Icosahedron4/index.html");
Container_Loader(PNG_Files, "Icosahedron 5", "/Models_PNG/Icosahedron5.png", "/Uncategorized_Pages/Icosahedron5/index.html");
Container_Loader(PNG_Files, "Icosahedron 6", "/Models_PNG/Icosahedron6.png", "/Uncategorized_Pages/Icosahedron6/index.html");
Container_Loader(PNG_Files, "Icosahedron 7", "/Models_PNG/Icosahedron7.png", "/Uncategorized_Pages/Icosahedron7/index.html");
Container_Loader(PNG_Files, "Crystal Shape", "/Models_PNG/CrystalShape.png", "/Uncategorized_Pages/CrystalShape/index.html");
Container_Loader(PNG_Files, "Crystal Shape 2", "/Models_PNG/CrystalShape2.png", "/Uncategorized_Pages/CrystalShape2/index.html");
Container_Loader(PNG_Files, "Boat Disk 1", "/Models_PNG/BoatDisk1.png", "/Uncategorized_Pages/BoatDisk1/index.html");
Container_Loader(PNG_Files, "Boat Disk 2", "/Models_PNG/BoatDisk2.png", "/Uncategorized_Pages/BoatDisk2/index.html");
Container_Loader(PNG_Files, "Hole Box", "/Models_PNG/HoleBox.png", "/Uncategorized_Pages/Holebox/index.html");
Container_Loader(PNG_Files, "Diagonal Box", "/Models_PNG/DiagonalBox.png", "/Uncategorized_Pages/DiagonalBox/index.html");
Container_Loader(PNG_Files, "Diagonal Box 2", "/Models_PNG/DiagonalBox2.png", "/Uncategorized_Pages/DiagonalBox2/index.html");
Container_Loader(PNG_Files, "Star Box", "/Models_PNG/StarBox.png", "/Uncategorized_Pages/StarBox/index.html");

PNG_Loader(PNG_Files);

//Dropdown animation for Navigation
const tl = gsap.timeline({ defaults: { duration: 1} })
tl.fromTo('nav', {y: "-100%" }, {y: "0%"})