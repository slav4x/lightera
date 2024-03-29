/* eslint-disable operator-linebreak */
/* eslint-disable no-inner-declarations */

const viewportFix = (width) => {
  const meta = document.querySelector('meta[name="viewport"]');
  meta.setAttribute('content', `user-scalable=no, width=${screen.width <= width ? width : 'device-width'}`);
};

viewportFix(420);

const maskOptions = {
  mask: '+7 (000) 000-00-00',
  onFocus: function () {
    if (this.value === '') this.value = '+7 ';
  },
  onBlur: function () {
    if (this.value === '+7 ') this.value = '';
  },
};

document.addEventListener('DOMContentLoaded', function () {
  AOS.init();

  const maskedElements = document.querySelectorAll('.masked');
  maskedElements.forEach((item) => new IMask(item, maskOptions));

  Fancybox.bind('[data-fancybox]', {
    dragToClose: false,
    autoFocus: false,
    placeFocusBack: false,
  });

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

  // Генерация случайного токена
  function generateToken() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let token = '';
    for (let i = 0; i < 30; i++) {
      token += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return token;
  }

  // Установка токена в скрытое поле формы
  function setToken(form) {
    const token = generateToken();
    const hiddenInput = document.createElement('input');
    hiddenInput.type = 'hidden';
    hiddenInput.name = 't';
    hiddenInput.value = token;
    form.appendChild(hiddenInput);
  }

  // Инициализация токена для каждой формы на странице
  const forms = document.querySelectorAll('form');
  forms.forEach(function (form) {
    setToken(form);

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      const button = form.querySelector('button');

      button.style.opacity = 0.5;
      button.style.cursor = 'not-allowed';
      button.disabled = true;

      const inputs = form.querySelectorAll('input');

      setTimeout(() => {
        button.style.opacity = 1;
        button.disabled = false;

        inputs.forEach((input) => {
          input.value = '';
        });

        Fancybox.close();

        Fancybox.show([{ src: '#popup-thanks', type: 'inline' }]);
      }, 300);

      const formUrl = form.getAttribute('action');
      const formData = new FormData(this);

      fetch(formUrl, {
        method: 'POST',
        body: formData,
      })
        .then((response) => response.json())
        .catch((error) => console.error('Error:', error));
    });
  });
});
