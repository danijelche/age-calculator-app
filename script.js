const btnElement = document.querySelector(".submit-btn");
const birthDayElement = document.querySelector(".day");
const birthMonthElement = document.querySelector(".month");
const birthYearElement = document.querySelector(".year");

const showDaysResult = document.querySelector(".show-days");
const showMonthResult = document.querySelector(".show-months");
const showYearResult = document.querySelector(".show-year");

const errorDayElement = document.querySelector(".error-day");
const errorMonthElement = document.querySelector(".error-month");
const errorYearElement = document.querySelector(".error-year");

const dayNameEl = document.querySelector(".date-div-day");
const monthNameEl = document.querySelector(".date-div-month");
const yearNameEl = document.querySelector(".date-div-year");

function getDaysInMonth(month) {
  const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  return daysInMonth[month - 1];
}

function calculateAge() {
  const currentDate = new Date();
  const currentDay = currentDate.getDate();
  const currentMonth = currentDate.getMonth() + 1;
  const currentYear = currentDate.getFullYear();

  const birthDay = parseInt(birthDayElement.value);
  const birthMonth = parseInt(birthMonthElement.value);
  const birthYear = parseInt(birthYearElement.value);

  let ageInDays, ageInMonths, ageInYears;

  if (birthDay > currentDay) {
    const daysInPrevMonth = getDaysInMonth(currentMonth - 1);
    const remainingDaysInPrevMonth = daysInPrevMonth - birthDay + currentDay;
    ageInDays = remainingDaysInPrevMonth > 0 ? remainingDaysInPrevMonth : 0;
    ageInMonths = currentMonth - birthMonth - 1;
    ageInYears = currentMonth < birthMonth ? currentYear - 1 - birthYear : currentYear - birthYear;
  } else if (birthDayElement.value === "") {
	  errorDayElement.style.display = "block";
    birthDayElement.style.borderColor = "red";
    dayNameEl.style.color = "red";
    errorDayElement.innerHTML = "This field is required";
    showDaysResult.textContent = "";
    showMonthResult.textContent = "";
    showYearResult.textContent = "";
  } 
	else {
    ageInDays = currentDay - birthDay;
    ageInMonths = currentMonth - birthMonth;
    ageInYears = currentYear - birthYear;
  }

  if (birthMonth > 12 || birthMonth < 1) {
    // Handle invalid birth month
    errorMonthElement.style.display = "block";
    birthMonthElement.style.borderColor = "red";
    monthNameEl.style.color = "red";
    showDaysResult.textContent = "";
    showMonthResult.textContent = "";
    showYearResult.textContent = "";
  } else if (birthMonthElement.value === "") {
    // Handle empty birth month
    errorMonthElement.style.display = "block";
    birthMonthElement.style.borderColor = "red";
    monthNameEl.style.color = "red";
    errorMonthElement.innerHTML = "This field is required";
    showDaysResult.textContent = "";
    showMonthResult.textContent = "";
    showYearResult.textContent = "";
  } else {
    
    errorMonthElement.style.display = "none";
    birthMonthElement.style.borderColor = "";
    monthNameEl.style.color = "";

    
    if (ageInMonths < 0) {
      ageInMonths += 12;
      ageInYears -= 1;
    }

    // Check if ageInDays is NaN and handle it appropriately
    if (isNaN(ageInDays)) {
      showDaysResult.textContent = "";
    } else {
      showDaysResult.textContent = ageInDays;
    }

    showMonthResult.textContent = ageInMonths;
    showYearResult.textContent = ageInYears;
  }

 
  birthDayElement.value = "";
  birthMonthElement.value = "";
  birthYearElement.value = "";
}


btnElement.addEventListener("click", calculateAge);
