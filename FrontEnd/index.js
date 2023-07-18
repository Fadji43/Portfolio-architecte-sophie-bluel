fetch("http://localhost:5678/api/works")
  .then(response => response.json())
  .then(data => {
    const allWorks = data;
    const photo = allWorks[0, 1];
    ajoutGallery(allWorks);
    ajoutGalleryModal(photo);

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
  const closeModal = document.querySelector('echap');
  const modal1 = document.getElementById('modal1');
  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      modal1.showModal();
    });
  });
  
  //faire apparaitre la galerie image + texte 
  function ajoutGalleryModal(photo) {
    const photosModal = document.createElement('img');
    photosModal.src = photo.imageUrl;
    const galleryModal = document.querySelector('.gallery-modal');
    galleryModal.innerHTML = "";
    const textModal = document.createElement('text-modal');
    textModal.innerHTML = "";
  
    galleryModal.appendChild(photosModal);
    galleryModal.appendChild(textModal);
    modal1.appendChild(galleryModal);
  }
  
 
   

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
