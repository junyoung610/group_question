let allQuestions = [];
let shownQuestions = [];

async function loadGroup() {
  const group = document.getElementById("groupInput").value;
  if (!group) {
    alert("조 번호를 입력해주세요.");
    return;
  }

  try {
    const res = await fetch("questions.json");
    const data = await res.json();

    const groupQuestions = data[group];
    if (!groupQuestions || groupQuestions.length === 0) {
      alert(`${group}조의 질문이 없습니다.`);
      return;
    }
    document.querySelector("h1").textContent = `${group}조 랜덤 질문`;

    allQuestions = [...groupQuestions];
    shownQuestions = [];

    const el = document.getElementById("question");
    el.textContent = "welcome!";
    el.classList.remove("show");

    document.getElementById("inputArea").style.display = "none";

    document.getElementById("historyBtn").style.display = "inline-block";
    document.getElementById("nextBtn").style.display = "inline-block";
  } catch (err) {
    console.error("질문 로딩 오류:", err);
    alert("질문 파일을 불러오는 데 실패했습니다.");
  }
}

function showRandomQuestion() {
  if (allQuestions.length === 0) {
    document.getElementById("question").textContent =
      "모든 질문을 다 보았습니다.";
    return;
  }

  const index = Math.floor(Math.random() * allQuestions.length);
  const question = allQuestions.splice(index, 1)[0];
  shownQuestions.push(question);

  const el = document.getElementById("question");
  el.textContent = question;
  el.classList.remove("show");
  void el.offsetWidth; // 리렌더 유도
  el.classList.add("show");
}

function showHistory() {
  const modal = document.getElementById("modal");
  const list = document.getElementById("modalHistoryList");
  list.innerHTML = "";

  if (shownQuestions.length <= 1) {
    list.innerHTML = "<li>아직 이전 질문이 없습니다.</li>";
  } else {
    shownQuestions.slice(0, -1).forEach((q) => {
      const li = document.createElement("li");
      li.textContent = q;
      list.appendChild(li);
    });
  }

  modal.style.display = "block";
}

function closeModal() {
  document.getElementById("modal").style.display = "none";
}
