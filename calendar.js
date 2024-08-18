// Select DOM elements
const calendar = document.getElementById("calendar");
const currentMonthYear = document.getElementById("currentMonthYear");
const prevMonthBtn = document.getElementById("prevMonth");
const nextMonthBtn = document.getElementById("nextMonth");
const addEventBtn = document.getElementById("addEventBtn");

let today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();

// Array for month names
const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

// Render calendar for the given month and year
function renderCalendar(month, year) {
    calendar.innerHTML = "";
    currentMonthYear.textContent = `${monthNames[month]} ${year}`;

    // Get the first day of the month and the number of days in the month
    const firstDay = new Date(year, month).getDay();
    const daysInMonth = 32 - new Date(year, month, 32).getDate();

    // Create empty cells for days before the start of the month
    for (let i = 0; i < firstDay; i++) {
        const emptyCell = document.createElement("div");
        calendar.appendChild(emptyCell);
    }

    // Create cells for each day in the month
    for (let day = 1; day <= daysInMonth; day++) {
        const cell = document.createElement("div");
        cell.textContent = day;
        cell.className = "day";
        cell.addEventListener("click", () => showAddEventModal(day));
        calendar.appendChild(cell);
    }
}

// Show modal for adding an event
function showAddEventModal(day) {
    const eventDateInput = document.getElementById("eventDate");
    eventDateInput.value = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

// Handle adding an event
addEventBtn.addEventListener("click", () => {
    const eventDate = document.getElementById("eventDate").value;
    const eventTitle = document.getElementById("eventTitle").value;
    if (eventDate && eventTitle) {
        const eventDay = new Date(eventDate).getDate();
        const cells = document.querySelectorAll(".calendar div");
        cells.forEach(cell => {
            if (cell.textContent == eventDay && cell.classList.contains("day")) {
                const event = document.createElement("div");
                event.className = "event";
                event.textContent = eventTitle;
                cell.appendChild(event);
            }
        });
        alert("Event added!");
    } else {
        alert("Please enter both date and title.");
    }
});

// Navigate to the previous month
prevMonthBtn.addEventListener("click", () => {
    if (currentMonth === 0) {
        currentMonth = 11;
        currentYear--;
    } else {
        currentMonth--;
    }
    renderCalendar(currentMonth, currentYear);
});

// Navigate to the next month
nextMonthBtn.addEventListener("click", () => {
    if (currentMonth === 11) {
        currentMonth = 0;
        currentYear++;
    } else {
        currentMonth++;
    }
    renderCalendar(currentMonth, currentYear);
});

// Initial calendar render
renderCalendar(currentMonth, currentYear);
