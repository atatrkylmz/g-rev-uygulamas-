let tasks = JSON.parse(localStorage.getItem("kanbanTasks")) || [];

let todoCount = tasks.filter(t => t.status === "todo").length;
let doingCount = tasks.filter(t => t.status === "doing").length;
let doneCount = tasks.filter(t => t.status === "done").length;

const ctx = document.getElementById("taskChart").getContext("2d");

new Chart(ctx, {
  type: "doughnut",
  data: {
    labels: ["Yapılacak", "Devam", "Tamamlandı"],
    datasets: [{
      data: [todoCount, doingCount, doneCount],
      backgroundColor: ["#ff4d4d", "#ffd633", "#4dff4d"],
    }]
  },
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom"
      }
    }
  }
});
