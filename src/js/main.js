/* eslint-disable operator-linebreak */
/* eslint-disable no-inner-declarations */

const viewportFix = (width) => {
  const meta = document.querySelector('meta[name="viewport"]');
  meta.setAttribute('content', `user-scalable=no, width=${screen.width <= width ? width : 'device-width'}`);
};

viewportFix(420);

document.addEventListener('DOMContentLoaded', function () {
  AOS.init();

  const switchItems = document.querySelectorAll('.hero-air__switch li');
  const images = document.querySelectorAll('.hero-air__images img');

  switchItems.forEach((item, index) => {
    item.addEventListener('click', () => {
      switchItems.forEach((i) => i.classList.remove('active'));
      images.forEach((img) => img.classList.remove('active'));

      item.classList.add('active');
      images[index].classList.add('active');
    });
  });

  const techSlider = new Swiper('.tech-slider', {
    spaceBetween: 10,
    slidesPerView: 'auto',
    grabCursor: true,
    breakpoints: {
      1024: {
        spaceBetween: 20,
      },
    },
    navigation: {
      nextEl: '.tech-arrow',
    },
    on: {
      slideChange: function () {
        const techSwipe = document.querySelector('.tech-swipe');
        techSwipe.classList.add('hide');
      },
    },
  });

  document.querySelectorAll('.safety-lightera__list li').forEach((tab) => {
    tab.addEventListener('click', function () {
      const currentId = this.getAttribute('data-id');

      document.querySelectorAll('.safety-lightera__list li, .safety-lightera__item').forEach((el) => {
        el.classList.remove('active');
      });

      this.classList.add('active');
      document.querySelector(`.safety-lightera__item[data-id="${currentId}"]`).classList.add('active');
    });
  });

  const interiorSlider = new Swiper('.interior-slider', {
    spaceBetween: 10,
    slidesPerView: 'auto',
    grabCursor: true,
    breakpoints: {
      1024: {
        spaceBetween: 20,
      },
    },
    navigation: {
      nextEl: '.interior-arrow',
    },
    on: {
      slideChange: function () {
        const interiorSwipe = document.querySelector('.interior-swipe');
        interiorSwipe.classList.add('hide');
      },
    },
  });

  const promoSlider = new Swiper('.promo-slider', {
    loop: true,
    slidesPerView: 1,
    grabCursor: true,
    navigation: {
      nextEl: '.promo-next',
      prevEl: '.promo-prev',
    },
    pagination: {
      el: '.promo-pagination',
      clickable: true,
      renderBullet: function (index, className) {
        return `<span class="${className}"></span>`;
      },
    },
    on: {
      slideChangeTransitionStart: function () {
        const slider = document.querySelector('.promo-slider');
        const activeSlide = document.querySelector('.swiper-slide-active');
        activeSlide.classList.contains('black') ? slider.classList.add('black') : slider.classList.remove('black');
      },
    },
  });

  function convertRadioButtonsToNumber() {
    const radioButtons = document.querySelectorAll('.calc-main input[type="radio"]:checked');
    let id = '';

    radioButtons.forEach(function (radioButton) {
      id += radioButton.value;
    });

    const createdID = parseInt(id);
    // console.log(createdID);
    searchById(createdID);

    const onoff = document.querySelectorAll('.onoff');
    if (createdID.toString().startsWith('1')) {
      onoff.forEach((item) => {
        item.style.display = 'block';
      });
    } else {
      onoff.forEach((item) => {
        item.style.display = 'none';
      });
    }

    const whiteColor = document.querySelector('.white');
    if (createdID.toString()[1] == 4) {
      whiteColor.style.display = 'none';
    } else {
      whiteColor.style.display = 'block';
    }
  }

  function searchById(id) {
    const price = document.querySelector('.price');
    fetch('data.json')
      .then((response) => response.json())
      .then((data) => {
        const item = data.find((item) => item.id === id);
        if (item) {
          price.textContent = item.price;

          document.querySelectorAll('.calc-image img').forEach((img) => {
            img.classList.remove('active');
          });

          if (item.color === 'white') {
            document.querySelector('.calc-white').classList.add('active');
          } else if (item.color === 'gold') {
            document.querySelector('.calc-gold').classList.add('active');
          } else if (item.color === 'black') {
            document.querySelector('.calc-black').classList.add('active');
          }
        } else {
          document.querySelector('.white + .calc-radio').click();
          console.log('Элемент', id, 'не найден');
        }
      })
      .catch((error) => {
        console.error('Ошибка при загрузке JSON:', error);
      });
  }

  function checkAndUpdate() {
    convertRadioButtonsToNumber();
    const radioButtons = document.querySelectorAll('.calc-main input[type="radio"]');
    radioButtons.forEach(function (radioButton) {
      radioButton.addEventListener('change', convertRadioButtonsToNumber);
    });
  }

  checkAndUpdate();
});
