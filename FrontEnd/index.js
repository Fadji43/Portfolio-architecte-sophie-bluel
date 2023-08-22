let allWorks;

fetch("http://localhost:5678/api/works")
  .then(response => response.json())
  .then(data => {
    allWorks = data;
    ajoutGallery(allWorks);
    
  });

function ajoutGallery(works) {
  const galleryElement = document.querySelector('.gallery');
  galleryElement.innerHTML = "";

  works.forEach(work => {
    const figure = document.createElement('figure');
    const image = document.createElement('img');
    image.src = work.imageUrl;
    const caption = document.createElement('figcaption');
    caption.textContent = work.title;

    figure.appendChild(image);
    figure.appendChild(caption);
    galleryElement.appendChild(figure);
  });
}

function triObjets(works, category) {
  let filteredWorks;

  if (category == "all") {
    filteredWorks = works;
  } else {
    filteredWorks = works.filter(work => {
      return work.category.id.toString() === category;
    });
  }

  ajoutGallery(filteredWorks);
}

const filterButtons = document.querySelectorAll('.filtres');
filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    const category = button.getAttribute('data-category');
    triObjets(allWorks, category);
  });
});

// connexion et déconnexion
function isLoggedIn() {
  const token = localStorage.getItem('token');
  return !!token;
}

function logoutUser() {
  localStorage.removeItem('token'); // Supprime le token du local storage
    window.location.href = 'index.html';
}

//éléments apparaissant, disparu ou modifié en fonction de la connexion
const modeEditeur = document.getElementById('modeEditor');
const connexion = document.querySelector('.liens')
const btns = document.querySelectorAll('.btnModifier');
const btnCategory = document.querySelector('.category');

//fonction l'affichage après connexion
function updateLogin() {
  btns.forEach(btnModifier => {
    btnModifier.style.display = "block";
  });
  modeEditeur.style.display = "block";
  btnCategory.style.display = "none";
  connexion.innerText = "Logout";
}

//fct de l'affichage après la déconnexion
function updateLogout()  {
  btns.forEach(btnModifier => {
    btnModifier.style.display = "none";
  });
  modeEditeur.style.display = "none";
  btnCategory.style.display = "block";
  connexion.innerText = "Login";
}

// Ajoutez un événement de clic au bouton pour gérer la connexion/déconnexion
const liensBtn = document.querySelector('.liens');
liensBtn.addEventListener('click', () => {
  if (isLoggedIn()) {
    logoutUser(); // Déconnexion de l'utilisateur si déjà connecté
  } else {
    console.log('Connectez l\'utilisateur ici.');
    updateLogin(); // Met à jour l'interface utilisateur après la connexion simulée
  }
});

// MAJ l'interface utilisateur au chargement de la page
if (isLoggedIn()) {
  updateLogin();
} else {
  updateLogout();
}

//MODALE//
//ouverture de la modale au clique de btnModifier
const modal = document.getElementById('modal');
const modalContent = document.getElementById('modal-content');

btns.forEach(btn => {
  btn.addEventListener('click', () => {
   console.log('OpenModal') 
    modalDisplayWorksGallery(allWorks);
    modal.showModal();
  
  });
});

//titre
const titleModal = document.querySelector('.title-modal');

// icone pour fermer la modale
function closeModal() {
  const modal = document.getElementById('modal');
  modal.close();
}
// Écouteur d'événement pour fermer la modale lorsque l'utilisateur clique à l'extérieur de celle-ci
window.addEventListener('click', (event) => {
  if (event.target === modal) {
    closeModal();
  }
});


// Afficher la galerie d'images dans la modale
function modalDisplayWorksGallery(works) {
  const modalContent = document.getElementById('modal-content');
  modalContent.innerHTML = `
    <i class="fa fa-times fa-xl close-modal"></i>
    <h2 class="title-modal">Galerie photo</h2>
    <div class="gallery-modal"></div>
    `;
    
  const galleryModal = modalContent.querySelector('.gallery-modal');
  const buttonModal= document.createElement('div')
  buttonModal.classList.add('button-modal')

  works.forEach(work => {
    const projetModal = document.createElement('div');
    projetModal.classList.add('projet-modal');
    const closeModalButton = document.querySelector('.close-modal');
    closeModalButton.addEventListener('click', closeModal); 
    const photoModal = document.createElement('img');
    photoModal.src = work.imageUrl;
    const iconeModal = document.createElement('div')
    iconeModal.classList.add('icone-modal')
    const editIcon = document.createElement('i');
    editIcon.classList.add('fa', 'fa-arrows-up-down-left-right');
    editIcon.style.display = 'none';
    const deleteIcon = document.createElement('i');
    deleteIcon.classList.add('fa', 'fa-trash-can');
    const textModal = document.createElement('text-modal');
    textModal.innerHTML = `Editer`;

    projetModal.appendChild(photoModal);
    projetModal.appendChild(iconeModal)
    iconeModal.appendChild(editIcon);
    iconeModal.appendChild(deleteIcon);
    
    projetModal.appendChild(textModal);
    galleryModal.appendChild(projetModal);

     // Gestionnaires d'événements pour afficher/masquer l'icône deplacement
  photoModal.addEventListener('mouseover', () => {
    editIcon.style.display = 'inline-block'; // Afficher l'icône lorsque la souris passe sur l'image
  });

  photoModal.addEventListener('mouseout', () => {
    editIcon.style.display = 'none'; // Cacher l'icône lorsque la souris quitte l'image
  });
  
  // appel de la fonction supprimer sur l'icone
    deleteIcon.addEventListener('click', () => {
      deleteProject(work.id);
    });
  }); 
 
// barre grise
  const grayBar = document.createElement('div')
  grayBar.classList.add('gray-bar')
  modalContent.appendChild(grayBar);

  //bouton "ajouter une photo"
  const addButton = document.createElement('button');
    addButton.innerHTML = "Ajouter une photo"
    addButton.classList.add('ajoutPhoto');
    buttonModal.appendChild(addButton); 
    modalContent.appendChild(buttonModal);

    addButton.addEventListener('click', () => {
      modalDisplayAddWorks();

  //appel de la fonction du bouton vert
  const form = document.querySelector('.formulaire-modal');
  for (const el of form.elements) {
    el.addEventListener('change', validateForm);
  }
});

//supprimer la galerie 
  const deleteGallery = document.createElement('button')
  deleteGallery.innerHTML = "Supprimer la galerie"
  deleteGallery.classList.add('supprimer');
  buttonModal.appendChild(deleteGallery);
  modalContent.appendChild(buttonModal);
};

// remplissage du formulaire pour chgt du bouton vert et appel modale message d'erreur
function validateForm() {
  const previewImg = document.querySelector(".preview-img");
  const title = document.getElementById("titleInput");
  const categoryModal = document.querySelector(".category-modal");
  const buttonValidate = document.getElementById("button-validate");

  const hasImage = previewImg.getAttribute("src") !== '#';
  const isTitleOk = title.value.trim().length > 0;
  const isCategorySelected = categoryModal.value !== '';

  if (hasImage && isTitleOk && isCategorySelected) {
    buttonValidate.classList.add('green-button');
  } else {
    buttonValidate.classList.remove('green-button');
  }
};

function modalDisplayAddWorks() {
  const modalContent = document.getElementById('modal-content');
  modalContent.innerHTML = `
    <i class="fa-solid fa-arrow-left fa-xl arrow-return"></i>
    <i class="fa fa-times fa-xl close-modal"></i>
    <h2 class="title-modal">Ajout Photo</h2>
    <form class="formulaire-modal">
      <div class="download-modal">
        <i class="fa fa-image countryside"></i>
        <label for="imageInput" class="download-button">+ Ajouter photo</label>
        <input type="file" id="imageInput" accept="image/*">
        <p class="format">jpg, png: 4mo max</p>
        <img id="imageError" class="preview-img" src="#" alt="aperçu de l'image" style="display:none">
      </div>
      <label>Titre</label>
      <input id="titleInput" class="error" type="text">
      <label>Catégorie</label>
        <select class="category-modal" id="options">
          <option value="disabled selected">Tous</option>
          <option value="category1">Objets</option>
          <option value="category2">Appartements</option>
          <option value="category3">Hôtels et restaurants</option>
        </select>  
    </form>
    <div class="gray-bar"></div>
    <div id="errorContainer" class="error-message"></div> 
    <button id="button-validate" class="gray-button">Valider</button>
  </div>
`;

  // Flèche de retour modal
  const arrowModalBtn = document.createElement('i');
  arrowModalBtn.classList.add('fa-solid', 'fa-arrow-left', 'fa-xl', 'arrow-return');
  arrowModalBtn.addEventListener('click', () => {
    modalDisplayWorksGallery(allWorks);
  });
  
  modalContent.appendChild(arrowModalBtn);

  
  modalContent.appendChild(arrowModalBtn);
  const closeModalButton = document.querySelector('.close-modal');
  closeModalButton.addEventListener('click', closeModal); 
  const downloadModal = document.querySelector('.download-modal');
  modalContent.appendChild(downloadModal);
  const buttonDownload = document.querySelector('.download-button');
  downloadModal.appendChild(buttonDownload);
  const formatModal = document.querySelector('.format')
  downloadModal.appendChild(formatModal)

  const formulaireModal = document.querySelector('.formulaire-modal');
  modalContent.appendChild(formulaireModal);
  const categoryModal = document.querySelector('.category-modal')
  formulaireModal.appendChild(categoryModal)
  
  const grayBar = document.querySelector('.gray-bar');
  modalContent.appendChild(grayBar);
  const errorMessage = document.querySelector('.error-message')
  modalContent.appendChild(errorMessage)
  const btnValidate = document.getElementById('button-validate');
  modalContent.appendChild(btnValidate);
  
  downloadImg();
  
  btnValidate.addEventListener('click', () => {
    addProject();
  });
};

//supprimer un projet
async function deleteProject(id) {
  const response = await fetch(`http://localhost:5678/api/works/${id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json', 
    'authorization': `bearer ${localStorage.getItem('token')}`
    }  
  });
  if (response.ok) {
    console.log("Projet supprimé avec succès :", id);

    // Retirez le projet supprimé de la liste
    allWorks = allWorks.filter(work => work.id !== id);

    // Mettez à jour l'affichage de la galerie
    ajoutGallery(allWorks);
  } else {
    console.error("Échec de la suppression du projet.");
  }
} 

 //télecharger une image
 async function downloadImg() {
  const addBtn = document.getElementById('imageInput')
  const buttonDownload = document.querySelector(".download-button");
  const countrysideIcon = document.querySelector(".countryside");
  const formatModal = document.querySelector(".format");
  const imagePreview = document.querySelector(".preview-img");
  
  // Ajouter un écouteur d'événement "change"
  addBtn.addEventListener("change", function (event) {
    const selectedFile = event.target.files[0];
    const newImg = new FileReader();

    newImg.addEventListener("load", function () {
      imagePreview.style.display = "block";
      imagePreview.src = newImg.result;
  
  // Cacher l'icône "countryside", le bouton et le paragraphe
  buttonDownload.style.display = "none";
  countrysideIcon.style.display = "none";
  addBtn.style.display = "none";
  formatModal.style.display = "none";
});

  // Charger le fichier sélectionné dans le FileReader
  newImg.readAsDataURL(selectedFile);
});
}

//Ajout du projet sur galerie
async function addProject() {
  const selectedFile = document.getElementById("imageInput").files[0];
  const title = document.getElementById("titleInput");
  const category = document.getElementById("options");
  const errorContainer = document.getElementById("errorContainer");

  // Supprimer les classes d'erreur précédentes
  title.classList.remove("error");
  category.classList.remove("error");
  errorContainer.innerHTML = ""; // Effacer les anciens messages d'erreur
  
// Vérification des champs requis
if (!selectedFile || !title.value || !category.value) {
  // Ajouter les classes d'erreur aux champs manquants
  if (!selectedFile) {
    document.getElementById("imageInput").classList.add("error");
  } else {
    document.getElementById("imageInput").classList.remove("error");
  }
  if (!title.value) {
    title.classList.add("error");
  } else {
    title.classList.remove("error");
  }
  if (!category.value) {
    category.classList.add("error");
  } else {
    category.classList.remove("error");
  }

  // message d'erreur
  errorContainer.innerHTML = "Veuillez remplir tous les champs requis.";
  return;
}

  // FormData envoie le fichier d'image, titre et catégorie
  const formData = new FormData();
    formData.append("image", selectedFile);
    formData.append("title", title.value);
    formData.append("category", 1);
  
  for (const value of formData.values()) {
    console.log(value);
  }

  try {
    const response = await fetch("http://localhost:5678/api/works", {
      method: "POST",
      headers: {'authorization': `bearer ${localStorage.getItem('token')}`},
      body: formData,
    });

    // Vérifie si la réponse indique que l'envoi a réussi, sinon message d'erreur
    if (response.ok) {
      const data = await response.json();
      console.log("Projet ajouté avec succès :", data);
      allWorks.push(data);
      ajoutGallery(allWorks);
      closeModal();
    } else {
      console.error("Échec du téléchargement du projet.");
    }
  } catch (error) {
    console.error("Erreur lors de la requête :", error);
  }
};

// Fonction pour ajouter le projet à la liste de projets
function addToProjectList(projectData) {
  const projectList = document.getElementById("projectList");

  const projectElement = document.createElement("div");
  projectElement.classList.add("project");

  // Créez les éléments HTML pour afficher les informations du projet
  const imageElement = document.createElement("img");
  imageElement.src = projectData.imageURL;
  imageElement.alt = "Image du projet";
  imageElement.classList.add("project-image"); // Ajoutez des classes CSS si nécessaire

  const titleElement = document.createElement("h3");
  titleElement.textContent = projectData.title;

  const categoryElement = document.createElement("p");
  categoryElement.textContent = projectData.category;

  // Ajoutez les éléments au projectElement
  projectElement.appendChild(imageElement);
  projectElement.appendChild(titleElement);
  projectElement.appendChild(categoryElement);

  // Ajoutez le projectElement à la liste de projets
  projectList.appendChild(projectElement);
}