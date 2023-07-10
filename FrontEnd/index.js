fetch("http://localhost:5678/api/works")
  .then(response => response.json())
  .then(data => {
    const allWorks = data;
    ajoutGallery(allWorks);

    
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
  })


// affichage du mode éditeur avec éléments à masquer ou faire apparaitre
const modeEditeur = document.getElementById('#editorMode')
const logoModifier = document.querySelector('modifier')
if (isAdmin) {
  modeEditeur.style.display = 'block';
  logoModifier.style.display = 'block';
}
else {
  modeEditeur.style.display = 'none';
  logoModifier.style.display = 'none';
}

function (isAdmin)

//création de la modale
//modal1
//modal2
//modal3

//addEventlisteners au clique de title_Project et caption_photo
// au clique du bouton ajoutre photo chnagement de modale
//charger la photo et insérer texte et catégorie
// valider les informations et fermture de la modale