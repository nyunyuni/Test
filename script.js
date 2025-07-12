document.addEventListener('DOMContentLoaded', () => {

    // --- 스크롤 시 카드 애니메이션 ---
    // 모든 .card 요소를 선택합니다.
    const cards = document.querySelectorAll('.card');
    // Intersection Observer를 생성하여 요소가 뷰포트에 들어올 때 감지합니다.
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // 요소가 뷰포트에 들어오면 'visible' 클래스를 추가하여 애니메이션을 활성화합니다.
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 }); // 요소의 10%가 뷰포트에 보일 때 콜백 실행

    // 각 카드에 Observer를 연결합니다.
    cards.forEach(card => observer.observe(card));

    // --- 인터랙티브 타임라인 ---
    const timelineItems = document.querySelectorAll('.timeline-item');
    const infoBox = document.getElementById('timeline-info-box');
    const infoTitle = document.getElementById('info-era-title');
    const infoDesc = document.getElementById('info-era-desc');

    // 각 시대별 정보 객체
    const eraInfo = {
        renaissance: { title: '르네상스', desc: '인간 중심의 사상(인문주의)을 바탕으로, 원근법과 해부학을 통해 현실을 과학적으로 탐구하고 이상적인 아름다움을 추구했습니다.' },
        baroque: { title: '바로크', desc: '강렬한 명암 대비, 역동적인 구도, 과장된 감정 표현을 통해 종교적, 역사적 사건의 극적인 순간을 생생하게 담아냈습니다.' },
        impressionism: { title: '인상주의', desc: '야외에서 시시각각 변하는 빛과 색채의 순간적인 인상을 포착하기 위해 빠른 붓 터치와 밝은 색채를 사용했습니다.' }
    };

    // 각 타임라인 아이템에 클릭 이벤트 리스너를 추가합니다.
    timelineItems.forEach(item => {
        item.addEventListener('click', () => {
            // 모든 타임라인 아이템의 'active' 클래스를 제거합니다.
            timelineItems.forEach(i => i.classList.remove('active'));
            // 클릭된 아이템에 'active' 클래스를 추가합니다.
            item.classList.add('active');
            // 클릭된 아이템의 data-era 속성 값을 가져옵니다.
            const era = item.dataset.era;
            // 해당 시대의 정보를 정보 상자에 표시합니다.
            infoTitle.textContent = eraInfo[era].title;
            infoDesc.textContent = eraInfo[era].desc;
        });
    });

    // --- 르네상스: 화가와 작품 매칭 게임 ---
    const artworkCards = document.querySelectorAll('.artwork-card');
    const artistSlots = document.querySelectorAll('.artist-slot');

    // 작품 카드에 드래그 시작/종료 이벤트 리스너를 추가합니다.
    artworkCards.forEach(card => {
        card.addEventListener('dragstart', () => card.classList.add('dragging')); // 드래그 시작 시 'dragging' 클래스 추가
        card.addEventListener('dragend', () => card.classList.remove('dragging'));   // 드래그 종료 시 'dragging' 클래스 제거
    });

    // 화가 슬롯에 드래그 오버/리브/드롭 이벤트 리스너를 추가합니다.
    artistSlots.forEach(slot => {
        slot.addEventListener('dragover', e => {
            e.preventDefault(); // 드롭을 허용하기 위해 기본 동작 방지
            slot.classList.add('over'); // 드래그 오버 시 'over' 클래스 추가
        });
        slot.addEventListener('dragleave', () => slot.classList.remove('over')); // 드래그 리브 시 'over' 클래스 제거
        slot.addEventListener('drop', e => {
            e.preventDefault();
            slot.classList.remove('over');
            const card = document.querySelector('.dragging'); // 현재 드래그 중인 카드 가져오기
            // 카드가 존재하고, 슬롯의 아티스트와 카드의 아티스트가 일치하면
            if (card && slot.dataset.artist === card.dataset.artist) {
                slot.appendChild(card); // 카드를 슬롯에 추가
                card.setAttribute('draggable', 'false'); // 드래그 불가능하게 설정
                slot.classList.add('correct'); // 'correct' 클래스 추가 (정답 표시)
            }
        });
    });

    // --- 바로크: 틀린 그림 찾기 ---
    const diffPoints = document.querySelectorAll('.diff-point');
    const foundCountEl = document.getElementById('found-count');
    let foundCount = 0; // 찾은 차이점 개수

    // 각 차이점 포인트에 클릭 이벤트 리스너를 추가합니다.
    diffPoints.forEach(point => {
        point.addEventListener('click', () => {
            // 이미 찾은 차이점이 아니면
            if (!point.classList.contains('found')) {
                point.classList.add('found'); // 'found' 클래스 추가 (찾았음을 표시)
                foundCount++; // 찾은 개수 증가
                foundCountEl.textContent = foundCount; // 화면에 표시 업데이트
                // 모든 차이점을 찾았으면 메시지 표시
                if (foundCount === 3) {
                    document.getElementById('diff-feedback').textContent = "모두 찾았습니다! 바로크의 특징을 발견했네요. 🎉";
                }
            }
        });
    });

    // --- 인상주의: 화가 퀴즈 ---
    // 퀴즈 데이터 배열
    const quizData = [
        { img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Claude_Monet%2C_Impression%2C_soleil_levant.jpg/800px-Claude_Monet%2C_Impression%2C_soleil_levant.jpg', artist: '클로드 모네', options: ['클로드 모네', '오귀스트 르누아르', '에드가 드가'] },
        { img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Pierre-Auguste_Renoir_-_Le_Moulin_de_la_Galette.jpg/800px-Pierre-Auguste_Renoir_-_Le_Moulin_de_la_Galette.jpg', artist: '오귀스트 르누아르', options: ['클로드 모네', '오귀스트 르누아르', '에드가 드가'] },
        { img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/Edgar_Degas_-_The_Ballet_Class_-_Google_Art_Project.jpg/800px-Edgar_Degas%2C_-_The_Ballet_Class_-_Google_Art_Project.jpg', artist: '에드가 드가', options: ['클로드 모네', '오귀스트 르누아르', '에드가 드가'] }
    ];
    let currentQuizIndex = 0; // 현재 퀴즈 인덱스
    const quizImage = document.getElementById('quiz-image');
    const quizOptions = document.getElementById('quiz-options');
    const quizFeedback = document.getElementById('quiz-feedback');

    // 퀴즈 로드 함수
    function loadQuiz() {
        const currentQuiz = quizData[currentQuizIndex];
        quizImage.src = currentQuiz.img; // 이미지 설정
        quizOptions.innerHTML = ''; // 기존 옵션 초기화
        quizFeedback.textContent = ''; // 피드백 초기화

        // 각 옵션 버튼 생성 및 이벤트 리스너 추가
        currentQuiz.options.forEach(option => {
            const button = document.createElement('button');
            button.textContent = option;
            button.classList.add('quiz-option-btn');
            button.addEventListener('click', () => checkAnswer(option, currentQuiz.artist, button));
            quizOptions.appendChild(button);
        });
    }

    // 정답 확인 함수
    function checkAnswer(selected, correct, button) {
        // 모든 옵션 버튼 비활성화
        document.querySelectorAll('.quiz-option-btn').forEach(btn => btn.disabled = true);

        if (selected === correct) {
            button.classList.add('correct'); // 정답이면 'correct' 클래스 추가
            quizFeedback.textContent = "정답입니다!";
        } else {
            button.classList.add('wrong'); // 오답이면 'wrong' 클래스 추가
            quizFeedback.textContent = `아쉬워요. 정답은 ${correct}입니다.`;
        }

        // 2초 후 다음 퀴즈 로드
        setTimeout(() => {
            currentQuizIndex = (currentQuizIndex + 1) % quizData.length; // 다음 퀴즈 인덱스 (순환)
            loadQuiz(); // 다음 퀴즈 로드
            // 모든 옵션 버튼 다시 활성화
            document.querySelectorAll('.quiz-option-btn').forEach(btn => btn.disabled = false);
        }, 2000);
    }

    // 페이지 로드 시 첫 퀴즈 로드
    loadQuiz();
});