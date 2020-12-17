import images from './gallery-images.js';

// variables
const ul = document.querySelector('.gallery');
const lightboxRef = document.querySelector('.lightbox');
const lightboxOverlayRef = document.querySelector('.lightbox__overlay');
const lightboxCloseBtnRef = document.querySelector(
  'button[data-action="close-lightbox"]',
);
const lightboxImgRef = document.querySelector('.lightbox__image');
let currentIndex = 0;

// functions
const createMarkup = function (array) {
  array.forEach((element, index) => {
    const li = `<li class="gallery__item"><a
    class="gallery__link" href="${element.original}"> <img class="gallery__image" src="${element.preview}"
      data-source="${element.original}" alt="${element.description}" data-index="${index}"/></a></li>`;
    ul.insertAdjacentHTML('beforeend', li);
  });
};

const openLightbox = function () {
  window.addEventListener('keydown', onPressEscape);
  window.addEventListener('keydown', onPressArrow);
  lightboxRef.classList.toggle('is-open');
};

const closeLightbox = function () {
  lightboxRef.classList.toggle('is-open');
  window.removeEventListener('keydown', onPressEscape);
  window.removeEventListener('keydown', onPressArrow);
  lightboxImgRef.src = '';
};

const handleUlClick = function (event) {
  event.preventDefault();

  const target = event.target;
  const fullSizeImg = target.dataset.source;
  currentIndex = Number(target.dataset.index);

  if (target.nodeName !== 'IMG') return;
  lightboxImgRef.src = fullSizeImg;
  openLightbox();
};

const onPressEscape = function (event) {
  if (event.code === 'Escape') {
    closeLightbox();
  }
};

const onPressArrow = function (event) {
  if (event.code === 'ArrowLeft') {
    if (currentIndex > 0) {
      currentIndex -= 1;
    } else {
      currentIndex = images.length - 1;
    }
    const nextImg = images[currentIndex].original;
    lightboxImgRef.src = nextImg;
  }

  if (event.code === 'ArrowRight') {
    if (currentIndex < images.length - 1) {
      currentIndex += 1;
    } else {
      currentIndex = 0;
    }
    const nextImg = images[currentIndex].original;
    lightboxImgRef.src = nextImg;
  }
};

// handlers
ul.addEventListener('click', handleUlClick);
lightboxCloseBtnRef.addEventListener('click', closeLightbox);
lightboxOverlayRef.addEventListener('click', closeLightbox);

// call functions
createMarkup(images);
