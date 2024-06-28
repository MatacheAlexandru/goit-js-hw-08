import SimpleLightbox from '/node_modules/simplelightbox/src/simple-lightbox';

import 'simplelightbox/dist/simple-lightbox.min.css';
import { galleryItems } from './gallery-items.js';

function initializeGallery() {
  const galleryContainer = document.querySelector('.gallery');
  const galleryMarkup = createGalleryMarkup(galleryItems);
  galleryContainer.innerHTML = galleryMarkup;
  initializeLightbox();
}

function createGalleryMarkup(items) {
  return items
    .map(({ preview, original, description }) => {
      return `
      <li class="gallery__item">
        <a class="gallery__link" href="${original}">
          <img class="gallery__image" src="${preview}" data-source="${original}" alt="${description}" />
        </a>
      </li>
    `;
    })
    .join('');
}

function initializeLightbox() {
  new SimpleLightbox('.gallery a', { captionsData: 'alt', captionDelay: 250 });
}

function openImageInModal(event) {
  event.preventDefault();
  const clickedOn = event.target;
  if (clickedOn.nodeName !== 'IMG') {
    return;
  }

  const lightbox = basicLightbox.create(`
    <img width="1400" height="900" src="${clickedOn.dataset.source}">
  `);

  lightbox.show();
  document.addEventListener('keydown', closeModalOnEsc);

  function closeModalOnEsc(event) {
    if (event.key === 'Escape') {
      lightbox.close();
      document.removeEventListener('keydown', closeModalOnEsc);
    }
  }
}

initializeGallery();
