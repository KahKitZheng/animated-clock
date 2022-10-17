const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");

function showTime() {
  const currentTime = new Date();
  const now = getTime(currentTime);
  const past = getTime(new Date(currentTime - 1000));

  hoursEl.innerHTML = renderNumber(now.hours, past.hours);
  minutesEl.innerHTML = renderNumber(now.minutes, past.minutes);
  secondsEl.innerHTML = renderNumber(now.seconds, past.seconds);

  setTimeout(showTime, 1000);
}

/**
 * Returns the hours, minutes and seconds of the given time
 * @param {Date} date value should either be the present time or one second before it
 * @returns an object with string values
 */
function getTime(date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();

  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;

  return {
    hours: hours.toString(),
    minutes: minutes.toString(),
    seconds: seconds.toString(),
  };
}

/**
 * Render each number into a separate span tag.
 * @param {string} currentTime string value of the current hour, minute or second
 * @param {string} pastTime one second before the value of `currentTime`
 * @returns a collection HTML elements of the given time
 */
function renderNumber(currentTime, pastTime) {
  let current = currentTime.split("");
  let past = pastTime.split("");

  return current
    .map((letter, index) =>
      // Add animation if the value is not the same as one second before
      current[index] !== past[index]
        ? `<div class="group">
            <span class="front" style="animation-name: bounceFront">${letter}</span>
            <span class="back" style="animation-name: bounceBack">${letter}</span>
          </div>`
        : `<div class="group">
            <span class="front">${letter}</span>
            <span class="back">${letter}</span>
          </div>`
    )
    .join("");
}

showTime();
