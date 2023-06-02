let resultBtn = document.getElementsByClassName('circle-button')[0];
let daysText = document.getElementById('days-text');
let monthText = document.getElementById('months-text');
let yearText = document.getElementById('years-text');
let inputField = document.getElementsByClassName('input');

function calculateAge(year, month, day) {
    var userInput = new Date(`${year}-${month}-${day}`);
    var currentDate = new Date();
    var ageDiffInMilliseconds = currentDate - userInput;
    var ageDate = new Date(ageDiffInMilliseconds);
    var age = ageDate.getUTCFullYear() - 1970;
    var months = ageDate.getUTCMonth();
    var days = ageDate.getUTCDate() - 1;

    return {
        years: age,
        months: months,
        days: days
    };
}

function checkInvalid(day, month, year) {
    let form = document.getElementsByClassName('input-control');
    let alertMsg = document.getElementsByClassName('alert-msg');
    let alertMsgText = ['Must be a valid day', 'Must be a valid month',
        'Must be in the past', 'Must be a valid date', 'This field is required'];

    let current = new Date();
    let currentYear = current.getFullYear();
    let max = [31, 12, currentYear];
    let inputDate = [day, month, year];
    const date = new Date(`${year}-${month}-${day}`);
    let invalid = false;

    for (let i = 0; i < form.length; i++) {
        if (inputDate[i] > max[i]) {
            form[i].classList.add('invalid');
            alertMsg[i].innerText = alertMsgText[i];
            invalid = true;
            clearDisplay();
            alert[i];
        } else {
            form[i].classList.remove('invalid');
        }
        if (inputDate[i] == "") {
            form[i].classList.add('invalid');
            alertMsg[i].innerText = alertMsgText[4];
            invalid = true;
        }
    }
    if (!invalid) {
        if (isNaN(date.getTime())) {
            form[0].classList.add('invalid');
            alertMsg[0].innerHTML = alertMsgText[3];
            clearDisplay();
            return true;
        }
        if (year > currentYear) {
            form[0].classList.add('invalid');
            alertMsg[0].innerHTML = alertMsgText[3];
            clearDisplay();
            return true;
        }
    }

    return invalid;
}

function updateDisplay(day, month, year) {
    daysText.innerText = 0;
    monthText.innerText = 0;
    yearText.innerText = year-15;

    let dayCount = 0;
    let monthCount = 0;
    let yearCount = 0;

    const animateDay = setInterval(function() {
        if(dayCount==day) {
            clearInterval(animateDay);
        }
        daysText.innerText = dayCount++;
    }, 200);
    const animateMonth = setInterval(function() {
        if(monthCount==month) {
            clearInterval(animateMonth);
        }
        monthText.innerText = monthCount++;
    }, 250);
    const animateYear = setInterval(function() {
        if(yearCount==year) {
            clearInterval(animateYear);
        }
        yearText.innerText = yearCount++;
    }, 100);
}

function clearDisplay() {
    daysText.innerText = "--";
    monthText.innerText = "--";
    yearText.innerText = "--";
}

function run() {
    let day = document.getElementById('day').value;
    let month = document.getElementById('month').value;
    let year = document.getElementById('year').value;

    const age = calculateAge(year, month, day);
    if (!checkInvalid(day, month, year)) {
        updateDisplay(age.days, age.months, age.years);
    } else {
        //console.log("Your age is:", age.years, "years,", age.months, "months, and", age.days, "days.");
    }
}

inputField[0].addEventListener('input', function (event) {
    const inputValue = inputField[0].value;
    const filteredValue = inputValue.replace(/\D/g, '');
    inputField[0].value = filteredValue;
});
inputField[1].addEventListener('input', function (event) {
    const inputValue = inputField[1].value;
    const filteredValue = inputValue.replace(/\D/g, '');
    inputField[1].value = filteredValue;
});
inputField[2].addEventListener('input', function (event) {
    const inputValue = inputField[2].value;
    const filteredValue = inputValue.replace(/\D/g, '');
    inputField[2].value = filteredValue;
});

resultBtn.addEventListener("click", function () {
    run();
});

document.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        run();
    }
});
