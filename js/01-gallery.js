import { galleryItems } from './gallery-items.js';

// Change code below this line

const galleryContainer = document.querySelector('.js-gallery');

const cardsMarkup = createGalleryItemCardMarkup(galleryItems);

galleryContainer.insertAdjacentHTML('beforeend', cardsMarkup);
galleryContainer.addEventListener('click', onGalleryContainerClick);
let closeModal;

function createGalleryItemCardMarkup(galleryItems) {
    return galleryItems.map(({preview, original, description}) => {
        return `
        <li class="gallery__item">
            <a class="gallery__link" href="${original}">
            <img
                class="gallery__image"
                src="${preview}"
                data-source="${original}"
                alt="${description}"
            />
            </a>
        </li>
        `;
    })
    .join('');
};


function onGalleryContainerClick(evn) {
    evn.preventDefault()

    if(evn.target.nodeName !== 'IMG') {
        return
    }
    const galleryLink = evn.target.dataset.source;
    console.log(galleryLink);

    const instance = basicLightbox.create(`
        <img src="${galleryLink}" width="800" height="600">
    `,
    {
        onShow: (instance) => {
            closeModal = (evn) => {
                if (evn.code === 'Escape') {
                    console.log(instance)
                    instance.close();
                }
            }
            window.addEventListener('keydown', closeModal)
        },
        onClose: (instance) => {
            window.removeEventListener('keydown', closeModal)
        }
    })

    instance.show()
}
