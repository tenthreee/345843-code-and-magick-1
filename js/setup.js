'use strict';

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;
var WIZARDS_NUMBER = 4;

var WIZARDS_NAMES = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон'
];

var WIZARDS_SURNAMES = [
  'да Марья',
  'Верон',
  'Мирабелла',
  'Вальц',
  'Онопко',
  'Топольницкая',
  'Нионго',
  'Ирвинг'
];

var WIZARDS_COATS_COLORS = [
  'rgb(101, 137, 164)',
  'rgb(241, 43, 107)',
  'rgb(146, 100, 161)',
  'rgb(56, 159, 117)',
  'rgb(215, 210, 55)',
  'rgb(0, 0, 0)'
];

var WIZARDS_EYES_COLORS = [
  'black',
  'red',
  'blue',
  'yellow',
  'green'
];

var FIREBALL_COLORS = [
  '#ee4830',
  '#30a8ee',
  '#5ce6c0',
  '#e848d5',
  '#e6e848'
];

var similarWizardTemplate = document.querySelector('#similar-wizard-template').content;
var setupSimilarList = document.querySelector('.setup-similar-list');

// Получаю случайное число
var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

// Делаю рокировочку
var swapElements = function (array, index1, index2) {
  var temporaryValue = array[index1];
  array[index1] = array[index2];
  array[index2] = temporaryValue;
};

// Перемешиваю массив
var shuffleArray = function (array) {
  for (var i = 0; i < array.length; i++) {
    var randomIndex = Math.floor(Math.random() * i);
    swapElements(array, i, randomIndex);
  }

  return array;
};

// Создаю болванку для волшебника
var getWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

// Создаю волшебников
var createWizards = function () {
  var shuffledNames = shuffleArray(WIZARDS_NAMES);
  var shuffledSurnames = shuffleArray(WIZARDS_SURNAMES);
  var shuffledCoats = shuffleArray(WIZARDS_COATS_COLORS);
  var shuffledEyes = shuffleArray(WIZARDS_EYES_COLORS);
  var array = [];

  for (var i = 0; i < WIZARDS_NUMBER; i++) {
    array[i] = {
      name: shuffledNames[i] + ' ' + shuffledSurnames[i],
      coatColor: shuffledCoats[i],
      eyesColor: shuffledEyes[i]
    };
  }

  return array;
};

// Рисую волшебников
var renderWizards = function (array) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < array.length; i++) {
    fragment.appendChild(getWizard(array[i]));
  }

  setupSimilarList.appendChild(fragment);
};

renderWizards(createWizards());


// Сценарии взаимодействия пользователя с сайтом
var setup = document.querySelector('.setup');
var setupOpen = document.querySelector('.setup-open');
var setupClose = setup.querySelector('.setup-close');
var setupUserName = setup.querySelector('.setup-user-name');
var setupWizard = setup.querySelector('.setup-wizard');
var wizardCoat = setupWizard.querySelector('.wizard-coat');
var wizardEyes = setupWizard.querySelector('.wizard-eyes');
var setupFireballWrap = document.querySelector('.setup-fireball-wrap');

// Попап закрывается
var onSetupEscKeydown = function (evt) {
  if (evt.keyCode === ESC_KEYCODE && setupUserName !== document.activeElement) {
    closeSetup();
  }
};

// Попап открывается
var openSetup = function () {
  setup.classList.remove('hidden');
  document.addEventListener('keydown', onSetupEscKeydown);
};

// Попап закрывается
var closeSetup = function () {
  setup.classList.add('hidden');
  document.removeEventListener('keydown', onSetupEscKeydown);
};

setupOpen.addEventListener('click', function () {
  openSetup();
});

setupOpen.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openSetup();
  }
});

setupClose.addEventListener('click', function () {
  closeSetup();
});

setupClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closeSetup();
  }
});

// Меняю цвет какой-нибудь штуки
var changeColor = function (feature, colors) {
  feature.style.fill = colors[getRandomNumber(0, colors.length - 1)];
};

// Меняю цвет мантии по клику
wizardCoat.addEventListener('click', function () {
  changeColor(wizardCoat, WIZARDS_COATS_COLORS);
});

// Меняю цвет глаз по клику
wizardEyes.addEventListener('click', function () {
  changeColor(wizardEyes, WIZARDS_EYES_COLORS);
});

// Меняю цвет фаербола по клику
var onSetupFireballWrap = function () {
  setupFireballWrap.style.background = FIREBALL_COLORS[getRandomNumber(0, FIREBALL_COLORS.length - 1)];
};

setupFireballWrap.addEventListener('click', onSetupFireballWrap);
