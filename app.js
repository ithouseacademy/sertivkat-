const studentsContainer = document.getElementById("studentsContainer");

function addStudent(first = "", last = "") {
  const row = document.createElement("div");
  row.className = "student-row";
  row.innerHTML =
    '<input type="text" class="first-name" placeholder="Ism" />' +
    '<input type="text" class="last-name" placeholder="Familiya" />' +
    '<button type="button" class="remove-student" title="O\'chirish">×</button>';
  const inputs = row.querySelectorAll("input");
  inputs[0].value = first;
  inputs[1].value = last;
  row.querySelector(".remove-student").addEventListener("click", () => {
    if (studentsContainer.children.length > 1) row.remove();
  });
  studentsContainer.appendChild(row);
}

document.getElementById("addStudent").addEventListener("click", () => addStudent());

function getTodayDate() {
  const d = new Date();
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();
  return day + "." + month + "." + year;
}

function generateCertificate() {
  const students = [];

  studentsContainer.querySelectorAll(".student-row").forEach((row) => {
    const first = row.querySelector(".first-name").value.trim();
    const last = row.querySelector(".last-name").value.trim();
    const full = [first, last].filter(Boolean).join(" ");
    if (full) students.push(full);
  });

  if (students.length === 0) {
    alert("Kamida bitta o'quvchi ismini kiriting!");
    return;
  }

  const template = document.getElementById("certificate");
  const container = document.getElementById("certificates");
  container.innerHTML = "";

  const today = getTodayDate();

  students.forEach((name) => {
    const clone = template.cloneNode(true);
    clone.style.display = "block";
    const nameEl = clone.querySelector(".name");
    nameEl.textContent = name;
    clone.querySelector(".sana").textContent = today;
    container.appendChild(clone);
  });

  document.getElementById("modal").style.display = "none";
  window.scrollTo(0, 0);
}
