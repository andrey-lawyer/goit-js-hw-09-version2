import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const inputEl = document.querySelector('#datetime-picker');

const buttonEl = document.querySelector('[data-start]');
const arraydataEl = document.querySelectorAll('.value');
buttonEl.disabled = true;

//
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  return { days, hours, minutes, seconds };
}
//
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
//
function optionSelectDates(date) {
  const dateNowConst = Date.now();
  const choseDate = date.getTime();
  // console.log(choseDate - dateNowConst);
  const deltaTime = choseDate - dateNowConst;
  // console.log(deltaTime);
  // разница между настоящим временем и установленным в календаре
  if (deltaTime <= 0) {
    Notiflix.Notify.failure('Please choose a date in the future');
    return;
  }

  buttonEl.disabled = false;
  return choseDate;
}

function onClickStart(date) {
  // доп кнопка

  // доп кнопка
  const choseDate = date.getTime();
  let intervalId = setInterval(() => {
    const deltaTime2 = choseDate - Date.now();

    if (deltaTime2 <= 0) {
      buttonEl.disabled = true;

      Notiflix.Notify.warning('Sorry, the date cannot be negative');
      clearInterval(intervalId);
      return;
    }
    const time = convertMs(deltaTime2);
    const { days, hours, minutes, seconds } = time;
    arraydataEl[0].textContent = addLeadingZero(days) + ' :';
    arraydataEl[1].textContent = addLeadingZero(hours) + ' :';
    arraydataEl[2].textContent = addLeadingZero(minutes) + ' :';
    arraydataEl[3].textContent = addLeadingZero(seconds);
    buttonEl.disabled = true;
    if (deltaTime2 > -1000 && deltaTime2 < 1000 && seconds === 0) {
      buttonEl.disabled = true;
      clearInterval(intervalId);
    }
  }, 1000);
}

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    const choseDate = optionSelectDates(selectedDates[0]);
    buttonEl.addEventListener('click', () => {
      onClickStart(selectedDates[0]);
    });
  },
};

const myDate = flatpickr('#datetime-picker', options);

//   enableTime:  Включает выбор времени
//   time_24hr:  Отображает средство выбора времени в 24-часовом режиме без выбора AM/PM, если включено.
//   defaultDate:    Устанавливает начальную выбранную дату (даты).//
//   Если вы используете mode: "multiple"или диапазонный календарь,
//   Array укажите Dateобъекты или массив строк даты, которые следуют
//   за вашим файлом dateFormat.
//   В противном случае вы можете указать один объект Date или строку даты.
//   minuteIncrement: Регулирует шаг ввода минут (включая прокрутку)
//   onClose Функция(и) для запуска при каждом закрытии календаря. onClose срабатывает, когда календарь закрывается.
// --------!!!!!!!!!!!!!!!!!!!
