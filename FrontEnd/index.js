let Allmworks 

fetch("http://localhost:5678/api/works")
  .then(response => response.json())
  .then(data => {
    allWorks = data;
    ajoutGallery(allWorks);
    setUpEvents();
  })

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
  }
  
  //ouverture de la modale au clique de btnModifier
  const modal = document.getElementById('modal');
  const modalContent = document.getElementById('modal-content')
  ///const closeModal = document.querySelector('echap');
  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      modal.showModal();
      modalDisplayWorksGallery()
    });
  });

// Afficher la galerie d'images dans la modale
function modalDisplayWorksGallery() {
  const modal = document.getElementById('modal');
  const modalContent = document.getElementById('modal-content')
  modalContent.innerHTML = "";
  modalContent.innerHTML = `
    <i class="fa fa-xmark"></i>
    <h2>Galerie photo</h2> `;
  const galleryModal = document.createElement('div'); // Utilisation de 'div' au lieu de '.gallery-modal'
  galleryModal.classList.add('gallery-modal'); // Ajout de la classe 'gallery-modal' à l'élément div
  galleryModal.innerHTML = ""; // Cet élément semble être vide, vous pouvez le supprimer si nécessaire.

  const photosModal = document.createElement('img');
  photosModal.src = photo.imageUrl; // Assurez-vous de définir la source de l'image correctement, par exemple, en utilisant une variable appropriée.

  const textModal = document.createElement('text-modal');
  textModal.innerHTML = "Editer";

  // Ajout de boutons à la modale
  const addButton = document.createElement('button');
  addButton.innerHTML = "Ajouter une photo";

  const deleteButton = document.createElement('button');
  deleteButton.innerHTML = "Supprimer la galerie";

  // Ajout des éléments à la modale
  galleryModal.appendChild(photosModal);
  galleryModal.appendChild(textModal);
  galleryModal.appendChild(addButton);
  galleryModal.appendChild(deleteButton);

  // Ajout de la modale à l'élément modalContent (supposant que modalContent est déjà défini)
  modalContent.appendChild(galleryModal);
}

  // fermer la modale
  // evenement au clique pour ouvrir le formulaire 
  addButton.addEventListener('click', () => {

  }); 

  //afficher le formulaire pour ajouter un work
  function modalDisplayAddWorks () {
    const modalContent = document.getElementById('modal-content')
    modalContent.innerHTML = "";
    modalContent.innerHTML = `
      <i class="fa fa-xmark"></i>
      <h2>Ajout Photo</h2> `;
  }

  function SetUpEvents () {
    modalDisplayWorksGallery()
  }
  /*//faire apparaitre la galerie image + texte 
  function ajoutGalleryModal(photo) {
    const photosModal = document.createElement('img');
    photosModal.src = photo.imageUrl;
    const galleryModal = document.createElement('.gallery-modal');
    galleryModal.innerHTML = "";
    const textModal = document.createElement('text-modal');
    textModal.innerHTML = "Editer";
  // faire la boucle
    galleryModal.appendChild(photosModal);
    galleryModal.appendChild(textModal);
    modal1.appendChild(galleryModal);
  }

ajoutGalleryModal(photo);

// fermer modale au clique e echap ainsi que le font 
   

/*const btnphoto = document.querySelector('ajoutPhoto');
const modal2 = document.getElementById('.modal2');
btnphoto.addEventListener('click', () => {
  modal2.showModal;
})

// Fonction pour supprimer une image
function deleteImage(element) {
  const imageContainer = element.closest('.image');
  imageContainer.remove();
}

// Fonction pour déplacer une image
function moveImage(element) {
  const imageContainer = element.closest('.image');
  // Ajoutez votre logique de déplacement ici
}*/


//création de la modale

//modal1
//modal2
//modal3

//charger la photo et insérer texte et catégorie
// valider les informations et fermture de la modale
