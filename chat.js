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
// start: Sidebar
document.querySelector('.chat-sidebar-profile-toggle').addEventListener('click', function(e) {
  e.preventDefault()
  this.parentElement.classList.toggle('active')
})

document.addEventListener('click', function(e) {
  if(!e.target.matches('.chat-sidebar-profile, .chat-sidebar-profile *')) {
      document.querySelector('.chat-sidebar-profile').classList.remove('active')
  }
})
// end: Sidebar



// start: Coversation
document.querySelectorAll('.conversation-item-dropdown-toggle').forEach(function(item) {
  item.addEventListener('click', function(e) {
      e.preventDefault()
      if(this.parentElement.classList.contains('active')) {
          this.parentElement.classList.remove('active')
      } else {
          document.querySelectorAll('.conversation-item-dropdown').forEach(function(i) {
              i.classList.remove('active')
          })
          this.parentElement.classList.add('active')
      }
  })
})

document.addEventListener('click', function(e) {
  if(!e.target.matches('.conversation-item-dropdown, .conversation-item-dropdown *')) {
      document.querySelectorAll('.conversation-item-dropdown').forEach(function(i) {
          i.classList.remove('active')
      })
  }
})

document.querySelectorAll('.conversation-form-input').forEach(function(item) {
  item.addEventListener('input', function() {
      this.rows = this.value.split('\n').length
  })
})

document.querySelectorAll('[data-conversation]').forEach(function(item) {
  item.addEventListener('click', function(e) {
      e.preventDefault()
      document.querySelectorAll('.conversation').forEach(function(i) {
          i.classList.remove('active')
      })
      document.querySelector(this.dataset.conversation).classList.add('active')
  })
})

document.querySelectorAll('.conversation-back').forEach(function(item) {
  item.addEventListener('click', function(e) {
      e.preventDefault()
      this.closest('.conversation').classList.remove('active')
      document.querySelector('.conversation-default').classList.add('active')
  })
})
// end: Coversation