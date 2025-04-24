let allQuestions = [];
let shownQuestions = []; // 질문 히스토리 저장 배열

async function loadGroup() {
  try {
    const res = await fetch("questions.json");
    const data = await res.json();
    allQuestions = [...data.questions]; // 모든 질문 불러오기
    shownQuestions = [];

    // 👉 제목 업데이트
    const group = document.getElementById("groupInput").value;
    document.querySelector("h1").textContent = `${group}조 랜덤 질문`;

    // 👉 입력창 숨기기
    document.getElementById("inputArea").style.display = "none";

    const el = document.getElementById("question");
    el.textContent = "질문을 불러왔습니다. 버튼을 눌러 주세요.";
    el.classList.remove("show");

    document.getElementById("nextBtn").style.display = "inline-block";
    document.getElementById("historyBtn").style.display = "inline-block";
  } catch (err) {
    console.error("질문 로딩 오류:", err);
    alert("질문 파일을 불러오는 데 실패했습니다.");
  }
}

function showRandomQuestion() {
  if (allQuestions.length === 0) {
    alert("질문이 모두 표시되었습니다.");
    return;
  }

  // 랜덤 질문 선택
  const randomIndex = Math.floor(Math.random() * allQuestions.length);
  const randomQuestion = allQuestions.splice(randomIndex, 1)[0]; // 질문을 하나씩 제거하면서 보여줌

  const questionNumber = shownQuestions.length + 1; // 질문 번호 생성

  shownQuestions.push({ questionNumber, question: randomQuestion }); // 히스토리 배열에 추가

  const el = document.getElementById("question");
  el.textContent = randomQuestion;
  el.classList.add("show");
}

function showHistory() {
  const historyEl = document.getElementById("question");
  historyEl.innerHTML = "<h2>질문 히스토리</h2>"; // 히스토리 제목 추가

  if (shownQuestions.length === 0) {
    historyEl.innerHTML += "<p>질문이 없습니다. 질문을 먼저 확인해 주세요.</p>";
  } else {
    // 각 질문별로 번호와 내용 정리하여 히스토리 표시
    shownQuestions.forEach((item) => {
      historyEl.innerHTML += `<p>${item.questionNumber}질문</strong> ${item.question}</p>`;
    });
  }

  historyEl.classList.add("show");
}
