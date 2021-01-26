import { images } from './gallery-images.js';

// variables
const ul = document.querySelector('.gallery');
const lightboxRef = document.querySelector('.lightbox');
const lightboxImgRef = document.querySelector('.lightbox__image');
const lightboxOverlayRef = document.querySelector('.lightbox__overlay');
const lightboxCloseBtnRef = document.querySelector(
  'button[data-action="close-lightbox"]',
);

let currentIndex = 0;

const createMarkup = function (array) {
  let readyImgArrayDOM = array.map(
    element =>
      `<li class="gallery__item">
        <a class="gallery__link" href="${element.original}"><img class="gallery__image" src="${element.preview}"
      data-fullsize="${element.original}" alt="${element.description}"/>
       </a>
      </li>`,
  );
  ul.insertAdjacentHTML('beforeend', readyImgArrayDOM.join(''));
};

const openLightbox = function () {
  window.addEventListener('keydown', onPressEscape);
  window.addEventListener('keydown', onPressArrow);
  lightboxRef.classList.toggle('is-open');
};

const closeLightbox = function () {
  window.removeEventListener('keydown', onPressEscape);
  window.removeEventListener('keydown', onPressArrow);
  lightboxRef.classList.toggle('is-open');
  lightboxImgRef.src = '';
};

const handleUlClick = function (event) {
  event.preventDefault();

  // const {target: {dataset, nodeName}} = event;
  const { dataset, nodeName } = event.target;
  if (nodeName !== 'IMG') return;

  const { fullsize } = dataset;

  lightboxImgRef.src = fullsize;
  openLightbox();
};

const onPressEscape = function ({ code }) {
  if (code === 'Escape') {
    closeLightbox();
  }
};

const onPressArrow = function ({ code }) {
  const arrayImg = document.querySelectorAll('.gallery img');
  for (let i = 0; i < arrayImg.length; i += 1) {
    if (
      lightboxImgRef.src === arrayImg[i].dataset.fullsize &&
      code === 'ArrowLeft'
    ) {
      if (i === 0) {
        i = arrayImg.length;
      }
      lightboxImgRef.src = arrayImg[i - 1].dataset.fullsize;
      lightboxImgRef.alt = arrayImg[i - 1].alt;
      return;
    }

    if (
      lightboxImgRef.src === arrayImg[i].dataset.fullsize &&
      code == 'ArrowRight'
    ) {
      if (i === arrayImg.length - 1) {
        i = -1;
      }
      lightboxImgRef.src = arrayImg[i + 1].dataset.fullsize;
      lightboxImgRef.alt = arrayImg[i + 1].alt;
      return;
    }
  }
};

// handlers
ul.addEventListener('click', handleUlClick);
lightboxCloseBtnRef.addEventListener('click', closeLightbox);
lightboxOverlayRef.addEventListener('click', closeLightbox);

// call functions
createMarkup(images);
