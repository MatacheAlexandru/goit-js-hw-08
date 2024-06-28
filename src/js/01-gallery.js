// Descris în documentație
import SimpleLightbox from 'simplelightbox';
// Import suplimentar de stil
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

initializeGallery();
