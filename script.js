const btn = document.getElementById("calculer");
const inputDebut = document.getElementById("dateDepart");
const inputFin = document.getElementById("dateFin");
const inputPattern = document.getElementById("pattern");
const currentDate = new Date();
let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();
let daysOff = [];

btn.addEventListener("click", (e) => {
    const dateDepartArr = inputDebut.value.split("-");
    const dateFinArr = inputFin.value.split("-");

    const pattern = inputPattern.value.split("-");
    let dateDebut = new Date(dateDepartArr[0], dateDepartArr[1] - 1, dateDepartArr[2], 0, 0, 0);
    let dateFin = new Date(dateFinArr[0], dateFinArr[1], dateFinArr[2], 0, 0, 0);

    daysOff = GetDaysOffBetweenDates(dateDebut, dateFin, pattern);
    
    renderCalendar(currentMonth, currentYear, daysOff);
});

function GetDaysOffBetweenDates(start, target, pattern)
{
    let startDay = start.getTime() / (1000 * 60 * 60 * 24);
    let endDay = target.getTime() / (1000 * 60 * 60 * 24);
    let daysDifference = endDay - startDay;
    let initialDaysDifference = daysDifference;

    const daysOff = [];
    while (daysDifference > 0)
    {
        for (let i = 0; i < pattern.length; i++)
        {
            if (i % 2 != 0)
            {
                for (let j = 0; j < pattern[i]; j++)
                {
                    daysOff.push(addDays(start, initialDaysDifference - daysDifference + j));
                }
            }
            daysDifference -= pattern[i];
        }
    }
    return daysOff;
}


function addDays(date, days) {
    let result = new Date(date);
    result.setDate(result.getDate() + days);
    
    return result;
}

   
document.getElementById("prevMonth").addEventListener("click", function() {
    currentMonth--;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    renderCalendar(currentMonth, currentYear);
});

document.getElementById("nextMonth").addEventListener("click", function() {
    currentMonth++;
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    renderCalendar(currentMonth, currentYear);
});

  
function renderCalendar(month, year) {
    const monthNames = ["January", "February", "March", "April", "May", "June",
                        "July", "August", "September", "October", "November", "December"];
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const calendarBody = document.getElementById("calendarBody");
    const currentMonthYear = document.getElementById("currentMonthYear");

    currentMonthYear.textContent = `${monthNames[month]} ${year}`;
    calendarBody.innerHTML = "";

    for (let i = 0; i < firstDayOfMonth; i++) {
        const dayCell = document.createElement("div");
        dayCell.classList.add("day");
        calendarBody.appendChild(dayCell);
    }

    for (let day = 1; day <= daysInMonth; day++) {
        const dayCell = document.createElement("div");
        dayCell.classList.add("day");
        dayCell.textContent = day;
        
        const currentDate = new Date(year, month, day);

        if (daysOff.some(date => date.toDateString() === currentDate.toDateString())) {
            dayCell.classList.add("day-off"); 
        }
        
        calendarBody.appendChild(dayCell);
    }
}