const monthYearElement = document.getElementById('monthYear');
const datesElement = document.getElementById('dates');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

let currentDate = new Date();

const updateCalendar = () => {
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  // First day of the current month
  const firstDay = new Date(currentYear, currentMonth, 1);
  // Last day of the current month
  const lastDay = new Date(currentYear, currentMonth + 1, 0);

  // Total days in the current month
  const totalDays = lastDay.getDate();

  // Get the index for the first day of the week (Sunday start)
  const firstDayIndex = firstDay.getDay();

  // Display the month and year
  const monthYearString = currentDate.toLocaleString('default', {
    month: 'long',
    year: 'numeric',
  });
  monthYearElement.textContent = monthYearString;

  // HTML string to add dates
  let datesHTML = '';

  // Add previous month's last days
  for (let i = firstDayIndex; i > 0; i--) {
    const prevDate = new Date(currentYear, currentMonth, 1 - i);
    datesHTML += `<div class="date inactive">${prevDate.getDate()}</div>`;
  }

  // Add current month's days
  for (let i = 1; i <= totalDays; i++) {
    const date = new Date(currentYear, currentMonth, i);
    const activeClass = date.toDateString() === new Date().toDateString() ? 'active' : '';
    datesHTML += `<div class="date ${activeClass}">${i}</div>`;
  }

  // Add next month's starting days
  const nextDays = 7 - ((firstDayIndex + totalDays) % 7);
  for (let i = 1; i <= nextDays; i++) {
    const nextDate = new Date(currentYear, currentMonth + 1, i);
    datesHTML += `<div class="date inactive">${nextDate.getDate()}</div>`;
  }

  // Render the dates
  datesElement.innerHTML = datesHTML;
};

// Add event listeners to buttons for month navigation
prevBtn.addEventListener('click', () => {
  currentDate.setMonth(currentDate.getMonth() - 1);
  updateCalendar();
});

nextBtn.addEventListener('click', () => {
  currentDate.setMonth(currentDate.getMonth() + 1);
  updateCalendar();
});

// Initial render
updateCalendar();
