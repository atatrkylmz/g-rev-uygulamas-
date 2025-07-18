document.addEventListener("DOMContentLoaded", function () {
  let tasks = JSON.parse(localStorage.getItem("kanbanTasks")) || [];

  let calendarEl = document.getElementById("calendar");
  let calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: "dayGridMonth",
    events: tasks.map(t => ({
      title: t.title,
      start: new Date().toISOString().split("T")[0],
    })),
  });

  calendar.render();

  if (Notification.permission !== "granted") {
    Notification.requestPermission();
  }

  tasks.forEach(t => {
    new Notification("Görev Hatırlatma", {
      body: `Görev: ${t.title}`,
    });
  });
});
