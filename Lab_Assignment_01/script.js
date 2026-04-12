let events = [];
const eventList = document.getElementById("eventList");

function showEvents() {
    eventList.innerHTML = ""; 
    for (let i = 0; i < events.length; i++) {
        let event = events[i];
        eventList.innerHTML += ` 
             <div class="event-card">
                <h3>${event.title}</h3>
                <div class="event-meta">
                    <b>Date:</b> ${event.date} | <b>Type:</b> ${event.category}
                </div>
                <p>${event.desc}</p>
                <button class="del-btn" data-index="${i}" style="background-color: red; color: white; margin-top: 10px;">Delete</button>
            </div>
        `;
    }
}

document.getElementById("eventForm").addEventListener("submit", function(e) {
    e.preventDefault();  
    let newEvent = {
        title: document.getElementById("eventTitle").value,
        date: document.getElementById("eventDate").value,
        category: document.getElementById("eventCategory").value,
        desc: document.getElementById("eventDesc").value
    };  
    events.push(newEvent);
    showEvents();
    document.getElementById("eventForm").reset();
});

document.getElementById("clearBtn").addEventListener("click", function() {
    events = [];
    showEvents();
});

document.getElementById("sampleBtn").addEventListener("click", function() {
    let sample = {
        title: "Test Event",
        date: "2024-01-01",
        category: "Workshop",
        desc: "This is a sample description."
    };
    events.push(sample);
    showEvents();
});

eventList.addEventListener("click", function(e) {
    if (e.target.classList.contains("del-btn")) { 
        let index = e.target.getAttribute("data-index");
        events.splice(index, 1); 
        showEvents();
    }
});