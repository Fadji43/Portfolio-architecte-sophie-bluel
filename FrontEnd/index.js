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
  // Ajouter un délai avant la redirection pour permettre la mise à jour de l'interface utilisateur
  setTimeout(() => {
    window.location.href = 'index.html'; // Redirige vers la page d'accueil après la déconnexion
  });
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

// Vérifie l'état de connexion au chargement de la page et met à jour l'interface utilisateur en conséquence
if (isLoggedIn()) {
  updateLogin();
} else {
  updateLogout();
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
   console.log('closeModal') 
    modal.showModal();
    modalDisplayWorksGallery(allWorks);
  
  });
});

//titre
const titleModal = document.querySelector('.title-modal');

// icone pour fermer la modale
function closeModal() {
  modal.close();
}


/*// Écouteur d'événements pour détecter les clics sur le document
document.addEventListener('click', (event) => {
  const clickedElement = event.target;
  const modalElement = document.getElementById('modal');
  
  // Vérifier si l'élément cliqué n'appartient pas à la modale
  if (!modalElement.contains(clickedElement)) {
    closeModal(); // Appel closeModal() pour fermer la modale
  }
});*/

  
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
    }); 
    
//supprimer la galerie 
  const deleteGallery = document.createElement('button')
  deleteGallery.innerHTML = "Supprimer la galerie"
  deleteGallery.classList.add('supprimer');
  buttonModal.appendChild(deleteGallery);
  modalContent.appendChild(buttonModal);
};

function modalDisplayAddWorks() {
  const modalContent = document.getElementById('modal-content');
  modalContent.innerHTML = `
  <div class="modal">
  <i class="fa-solid fa-arrow-left fa-xl arrow-return"></i>
  <i class="fa fa-times fa-xl close-modal"></i>
  <h2 class="title-modal">Ajout Photo</h2>
  <div class="download-modal">
    <i class="fa fa-image countryside"></i>
    <label for="imageInput" class="download-button">+ Ajouter photo</label>
    <input type="file" id="imageInput"  accept="image/*">
    <p class="format">jpg, png: 4mo max</p>
    <img class="preview-img" src="#" alt="aperçu de l'image" style="display:none">
  </div>
  <form class="formulaire-modal">
    <label>Titre</label>
    <input id="titleInput" type="text">
    <label>Catégorie</label>
    <select class="category-modal" id="categoryInput"></select>
  </form>
  <div class="gray-bar"></div>
</div>
  `;

  // Flèche de retour modal
  const arrowModalBtn = document.createElement('i');
  arrowModalBtn.classList.add('fa-solid', 'fa-arrow-left', 'fa-xl', 'arrow-return');
  arrowModalBtn.addEventListener('click', () => {
    modalDisplayWorksGallery(allWorks);
  });

  modalContent.appendChild(arrowModalBtn);

  // Sélection des catégories dans le formulaire
  // Options à afficher
  const options = [
    { value: "tous", text: "Tous" },
    { value: "objets", text: "Objets" },
    { value: "appartements", text: "Appartements" },
    { value: "hotels&resto", text: "Hôtels et restaurants" },
  ];

  const optionsCategory = document.querySelector('.category-modal');
  optionsCategory.setAttribute('id', 'options');

  // Créer et ajouter les options
  options.forEach(function (option) {
    const optionElement = document.createElement("option");
    optionElement.value = option.value;
    optionElement.text = option.text;
    optionsCategory.appendChild(optionElement);
    }); 

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
  const btnValidate = document.createElement('button');
  btnValidate.innerHTML = "Valider"
  btnValidate.classList.add('button-validate');
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
  
};  
 //télecharger une image
 async function downloadImg() {
  const addBtn = document.getElementById("imageInput");
  const countrysideIcon = document.querySelector(".countryside");
  const formatModal = document.querySelector(".format");
  const imagePreview = document.querySelector(".preview-img");

  // Ajouter un écouteur d'événement "change" pour l'input file
  addBtn.addEventListener("change", function (event) {
    const selectedFile = event.target.files[0];
    const newImg = new FileReader();

    newImg.addEventListener("load", function () {
      imagePreview.style.display = "block";
      imagePreview.src = newImg.result;

      // Cacher l'icône "countryside", le bouton et le paragraphe
      countrysideIcon.style.display = "none";
      addBtn.style.display = "none";
      formatModal.style.display = "none";
    });

    // Charger le fichier sélectionné dans le FileReader
    newImg.readAsDataURL(selectedFile);
  });
}

async function addProject() {
  const selectedFile = document.getElementById("imageInput").files[0];
  const title = document.getElementById("titleInput").value;
  const category = document.getElementById("categoryInput").value;

  // Crée un objet FormData pour envoyer le fichier d'image
  const formData = new FormData();
  formData.append("image", selectedFile);
  formData.append("title", title);
  formData.append("category", category);

  // Utilise l'API fetch pour envoyer le FormData au serveur
  const response = await fetch("http://localhost:5678/api/works", {
    method: "POST",
    headers: {
      'authorization': `bearer ${localStorage.getItem('token')}`
    },
    body: formData,
  });

  // Vérifie si la réponse indique que l'envoi a réussi
  if (response.ok) {
    closeModal();
    // Récupère les travaux mis à jour et met à jour la galerie
    fetchWorksAndUpdateGallery();
  } else {
    // si le téléchargement a échoué
    console.error("Échec du téléchargement du projet.");
  }
}

// Fonction pour récupérer les travaux mis à jour et mettre à jour la galerie
async function fetchWorksAndUpdateGallery() {
  const response = await fetch("http://localhost:5678/api/works");
  if (response.ok) {
    const data = await response.json();
    allWorks = data;
    ajoutGallery(allWorks);
  } else {
    console.error("Échec de la récupération des travaux depuis le serveur.");
  }
}

// valider les informations et fermeture de la modale
