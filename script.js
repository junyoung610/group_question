let allQuestions = [];
let shownQuestions = [];

async function loadGroup() {
  try {
    const res = await fetch("questions.json");
    const data = await res.json();
    allQuestions = [...data.questions];
    shownQuestions = [];

    const group = document.getElementById("groupInput").value.trim();
    document.getElementById("title").textContent = `조원 ${group}`;
    document.getElementById("inputArea").style.display = "none";

    document.getElementById("question").textContent = "질문을 불러왔습니다.";
    document.getElementById("question").classList.add("show");

    document.getElementById("nextBtn").style.display = "inline-block";
    document.getElementById("historyBtn").style.display = "inline-block";
    document.getElementById("counter").textContent = "";
  } catch (err) {
    alert("질문을 불러오는 데 실패했습니다.");
    console.error(err);
  }
}

function showRandomQuestion() {
  if (allQuestions.length === 0) {
    alert("모든 질문을 표시했습니다.");
    return;
  }

  const randomIndex = Math.floor(Math.random() * allQuestions.length);
  const selectedQuestion = allQuestions.splice(randomIndex, 1)[0];
  const questionNumber = shownQuestions.length + 1;

  shownQuestions.push({ questionNumber, question: selectedQuestion });

  const el = document.getElementById("question");
  el.textContent = selectedQuestion;
  el.classList.remove("show");
  void el.offsetWidth;
  el.classList.add("show");

  // ✅ 화면 상단 카운터 제거 (더 이상 업데이트 X)
  // document.getElementById('counter').textContent = `(${shownQuestions.length} / ${shownQuestions.length + allQuestions.length}) 질문 완료`;
}

function showHistory() {
  const group = document.getElementById("groupInput").value.trim();
  document.getElementById("title2").textContent = `조원 ${group}`;
  document.getElementById("inputArea").style.display = "none";

  const modal = document.getElementById("modal");
  const historyList = document.getElementById("historyList");
  historyList.innerHTML = ""; // 초기화
  const total = shownQuestions.length;
  const totalCountEl = document.createElement("p");
  totalCountEl.innerHTML = `<strong>총 질문 수:</strong> ${total}개`;
  historyList.appendChild(totalCountEl);
  if (total === 0) {
    const p = document.createElement("p");
    p.textContent = "아직 표시된 질문이 없습니다.";
    historyList.appendChild(p);
  } else {
    shownQuestions.forEach((q) => {
      const p = document.createElement("p");
      p.textContent = `(${q.questionNumber}) ${q.question}`;
      historyList.appendChild(p);
    });
  }

  modal.style.display = "block";
}

function closeModal() {
  document.getElementById("modal").style.display = "none";
}
