let allWorks;

fetch("http://localhost:5678/api/works")
  .then(response => response.json())
  .then(data => {
    allWorks = data;
    ajoutGallery(allWorks);
   // setUpEvents();
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

function isLoggedIn() {
  const token = localStorage.getItem('token');
  if (token) {
    return true;
  }
  return false;
}

//éléments apparaissant ou disparu en fonction de la connexion
const modeEditeur = document.getElementById('modeEditor');
const btns = document.querySelectorAll('.btnModifier');
const btnCategory = document.querySelector('.category');
if (isLoggedIn()) {
  btns.forEach(btnModifier => {
    btnModifier.style.display = "block";
  });
  modeEditeur.style.display = "block";
  btnCategory.style.display = "none";
} else {
  btns.forEach(btnModifier => {
    btnModifier.style.display = "none";
  });
  modeEditeur.style.display = "none";
  btnCategory.style.display = "block";
};

//MODALE//
//ouverture de la modale au clique de btnModifier
const modal = document.getElementById('modal');
const modalContent = document.getElementById('modal-content');

btns.forEach(btn => {
  btn.addEventListener('click', () => {
    modal.showModal();
    modalDisplayWorksGallery(allWorks);
  });
});

//titre
const titleModal = document.querySelector('.title-modal');

// icone pour fermer la modale
function closeModal() {
  modal.style.display = "none";
}

// Fonction pour réouvrir la modale
function openModal() {
  modal.show(); // Utilisez modal.show() pour réouvrir la modale
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
      deleteProjet();
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


  //afficher le formulaire pour ajouter un work
  function modalDisplayAddWorks () {
    const modalContent = document.getElementById('modal-content')
    modalContent.innerHTML = "";
    modalContent.innerHTML = `
    <i class="fa-solid fa-arrow-left fa-xl arrow-return"></i>
    <i class="fa fa-times fa-xl close-modal"></i>
    <h2 class="title-modal">Ajout Photo</h2>
    <div class= "download-modal">
      <i class="fa fa-image countryside"></i>
      <button class="download-button">+ Ajouter Photo</button>
      <p class="format">jpg,png : 4mo max</p>
    </div>
    <form class="formulaire-modal">
      <label>Titre</label>
      <input></input>
      <label >Catégorie</label>
      <input class="category-modal"></input>
    </form>
      <div class="gray-bar"></div>
    `;

   // Flèche de retour modal
  const arrowModalBtn = document.createElement('i');
  arrowModalBtn.classList.add('fa-solid', 'fa-arrow-left', 'fa-xl', 'arrow-return');
  arrowModalBtn.addEventListener('click', () => {
    modalDisplayWorksGallery(works);
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
  }


// fonction appelle les événements
  /*function setUpEvents() {
    modalDisplayWorksGallery();
    deletProjet();
  }
};*/

async function deleteProjet() {
  const response = await fetch('http://localhost:5678/api/works/{id}', {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  });

  response.ok
    ? console.log('Élément supprimé avec succès !')
    : console.log('Échec lors de la suppression de l\'élément.');
  }
}  

//charger la photo et insérer texte et catégorie
// valider les informations et fermture de la modale
