// ====================================================
// VisaGo — 메인 스크립트
// ====================================================

// ---- 비밀번호 설정 (여기서 바꾸세요) ----
const BOARD_PASSWORD = 'visago2025';
const AUTH_KEY       = 'visago_auth';

// ====================================================
// 비자 가이드 데이터 (E-9 → E-7-4 전용)
// ====================================================
const VISA_GUIDE = {
  'e9-e74': {
    ko: [
      {
        num: 1, title: '자격 요건 확인',
        desc: '아래 조건을 모두 충족해야 신청 가능합니다.',
        checklist: [
          '동일 사업장 4년 이상 근무',
          '법무부 숙련도 점수 200점 이상',
          '고용주 추천서 발급 가능',
          '체류 기간 만료 2개월 전 신청 권장',
        ]
      },
      {
        num: 2, title: '서류 준비',
        desc: '아래 서류를 빠짐없이 준비하세요.',
        checklist: [
          '통합신청서 (출입국 홈페이지 다운로드)',
          '여권 원본 + 외국인등록증',
          '재직확인서 (고용주 발급)',
          '사업자등록증 사본',
          '최근 1년 임금대장',
          '고용주 추천서',
          '소득세 납부확인서',
          '여권용 사진 2장',
        ]
      },
      {
        num: 3, title: '출입국관리사무소 예약',
        desc: '방문 예약을 먼저 하세요. 당일 방문은 거절될 수 있습니다.',
        checklist: [
          '하이코리아(www.hikorea.go.kr) 접속',
          '회원가입 후 로그인',
          '[민원] → [체류기간연장 등 신청] 클릭',
          '날짜/시간 선택 후 예약 완료',
          '예약 확인 문자 저장',
        ]
      },
      {
        num: 4, title: '방문 및 접수',
        desc: '예약 시간 10분 전에 도착하세요.',
        checklist: [
          '관할 출입국관리사무소 방문',
          '서류 전체 지참 (원본 + 사본)',
          '수수료 60,000원 준비 (현금/카드)',
          '접수 후 접수증 수령 보관',
        ]
      },
      {
        num: 5, title: '결과 수령',
        desc: '처리 완료 후 문자/앱 알림으로 안내됩니다.',
        checklist: [
          '처리 기간: 2~4주 소요',
          '결과 조회: 하이코리아 → 나의 민원',
          '승인 시: 외국인등록증 재발급 (E-7-4)',
          '불허 시: 사유 확인 후 이의신청 가능',
        ]
      },
    ],
    vi: [
      {
        num: 1, title: 'Kiểm tra điều kiện',
        desc: 'Bạn phải đáp ứng tất cả điều kiện dưới đây mới được nộp hồ sơ.',
        checklist: [
          'Làm việc tại cùng một công ty ít nhất 4 năm',
          'Đạt điểm kỹ năng Bộ Tư pháp 200 điểm trở lên',
          'Chủ sử dụng lao động có thể cấp thư giới thiệu',
          'Khuyến nghị nộp trước 2 tháng khi visa hết hạn',
        ]
      },
      {
        num: 2, title: 'Chuẩn bị hồ sơ',
        desc: 'Chuẩn bị đầy đủ các giấy tờ dưới đây.',
        checklist: [
          'Đơn xin cấp phép tổng hợp (tải trên website xuất nhập cảnh)',
          'Hộ chiếu gốc + Thẻ đăng ký người nước ngoài',
          'Giấy xác nhận làm việc (chủ sử dụng cấp)',
          'Bản sao đăng ký kinh doanh',
          'Bảng lương 1 năm gần nhất',
          'Thư giới thiệu của chủ sử dụng lao động',
          'Giấy xác nhận nộp thuế thu nhập',
          '2 ảnh thẻ',
        ]
      },
      {
        num: 3, title: 'Đặt lịch hẹn',
        desc: 'Đặt lịch trước khi đến. Đến không có hẹn có thể bị từ chối.',
        checklist: [
          'Truy cập HiKorea (www.hikorea.go.kr)',
          'Đăng ký tài khoản và đăng nhập',
          'Nhấp [Dịch vụ] → [Gia hạn thời gian lưu trú]',
          'Chọn ngày/giờ và hoàn tất đặt lịch',
          'Lưu tin nhắn xác nhận đặt lịch',
        ]
      },
      {
        num: 4, title: 'Đến nộp hồ sơ',
        desc: 'Đến trước giờ hẹn 10 phút.',
        checklist: [
          'Đến Cục Xuất nhập cảnh phụ trách khu vực',
          'Mang theo đầy đủ hồ sơ (bản gốc + bản sao)',
          'Chuẩn bị phí 60.000 won (tiền mặt hoặc thẻ)',
          'Sau khi nộp, giữ lại phiếu tiếp nhận',
        ]
      },
      {
        num: 5, title: 'Nhận kết quả',
        desc: 'Sau khi xử lý xong, bạn sẽ được thông báo qua tin nhắn/app.',
        checklist: [
          'Thời gian xử lý: 2~4 tuần',
          'Kiểm tra kết quả: HiKorea → Xem yêu cầu của tôi',
          'Nếu chấp thuận: Cấp lại thẻ đăng ký (E-7-4)',
          'Nếu bị từ chối: Hỏi lý do và có thể khiếu nại',
        ]
      },
    ]
  }
};

// ====================================================
// 다국어 시스템
// ====================================================
let activeGuideTab = 'e9-e74';
let currentPostId  = null;

function applyLang(lang) {
  currentLang = lang;
  localStorage.setItem('visago_lang', lang);
  document.documentElement.lang = lang;

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (LANG[lang] && LANG[lang][key] !== undefined) {
      el.innerHTML = LANG[lang][key];
    }
  });

  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (LANG[lang] && LANG[lang][key]) {
      el.placeholder = LANG[lang][key];
    }
  });

  document.getElementById('langLabel').textContent = lang === 'ko' ? 'VI' : 'KO';

  renderGuide(activeGuideTab);

  if (isAuthenticated()) renderPostList();
}

function toggleLang() {
  applyLang(currentLang === 'ko' ? 'vi' : 'ko');
}

// ====================================================
// 비자 가이드 탭
// ====================================================
function showGuide(tabKey) {
  activeGuideTab = tabKey;
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.guide === tabKey);
  });
  renderGuide(tabKey);
}

function renderGuide(tabKey) {
  const container = document.getElementById('guideContent');
  const steps = VISA_GUIDE[tabKey]?.[currentLang] || [];
  if (!steps.length) { container.innerHTML = ''; return; }

  container.innerHTML = steps.map(step => `
    <div class="step-item" onclick="toggleStep(this)">
      <div class="step-header">
        <span class="step-num">${step.num}</span>
        <span class="step-title">${step.title}</span>
        <span class="step-arrow">▼</span>
      </div>
      <div class="step-body" style="display:none">
        ${step.desc ? `<p class="step-desc">${step.desc.replace(/\n/g, '<br>')}</p>` : ''}
        ${step.checklist.length ? `
          <ul class="step-checklist">
            ${step.checklist.map(item => `
              <li class="checklist-item">
                <input type="checkbox" onclick="event.stopPropagation()">
                <span>${item}</span>
              </li>
            `).join('')}
          </ul>
        ` : ''}
      </div>
    </div>
  `).join('');

  const first = container.querySelector('.step-item');
  if (first) openStep(first);
}

function toggleStep(el) {
  const body  = el.querySelector('.step-body');
  const arrow = el.querySelector('.step-arrow');
  const isOpen = body.style.display !== 'none';
  body.style.display    = isOpen ? 'none' : 'block';
  arrow.style.transform = isOpen ? '' : 'rotate(180deg)';
  el.classList.toggle('open', !isOpen);
}

function openStep(el) {
  const body  = el.querySelector('.step-body');
  const arrow = el.querySelector('.step-arrow');
  body.style.display    = 'block';
  arrow.style.transform = 'rotate(180deg)';
  el.classList.add('open');
}

// ====================================================
// 비밀번호 인증 (게시판 잠금)
// ====================================================
function isAuthenticated() {
  return localStorage.getItem(AUTH_KEY) === 'ok';
}

function checkPassword() {
  const input = document.getElementById('pwInput');
  const error = document.getElementById('lockError');

  if (input.value === BOARD_PASSWORD) {
    localStorage.setItem(AUTH_KEY, 'ok');
    showBoard();
  } else {
    error.style.display = 'block';
    input.value = '';
    input.classList.add('shake');
    setTimeout(() => input.classList.remove('shake'), 500);
  }
}

function showBoard() {
  document.getElementById('boardLock').style.display    = 'none';
  document.getElementById('boardContent').style.display = 'block';
  document.getElementById('fabBtn').style.display       = 'flex';
  renderPostList();
}

// ====================================================
// 커뮤니티 게시판 (LocalStorage CRUD)
// ====================================================
const STORAGE_KEY = 'visago_posts';

function getPosts() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
}
function savePosts(posts) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
}

function initDummyPosts() {
  if (getPosts().length > 0) return;
  savePosts([
    {
      id: Date.now() - 200000,
      tag: 'warning',
      title: 'E-7-4 신청 거절 당한 경험 — 점수 계산 착오',
      content: '저는 점수가 200점이 넘는다고 생각했는데\n막상 접수하니 담당자가 임금대장 계산 방식이 다르다고 했어요.\n연봉이 아니라 실수령액 기준이라 약 12점 부족으로 거절됐습니다.\n꼭 사전에 점수 계산을 다시 확인하세요!',
      author: '관리자',
      date: new Date(Date.now() - 200000).toLocaleDateString('ko-KR'),
      comments: []
    },
    {
      id: Date.now() - 100000,
      tag: 'success',
      title: '첫 번째 도전 성공! — 준비 팁 정리',
      content: '서류를 2번 체크했더니 한 번에 통과했어요.\n고용주 추천서는 미리 한 달 전에 부탁드렸고,\n하이코리아 예약은 2개월 전에 잡았습니다.\n사진은 출입국사무소 근처 즉석사진관에서 당일 찍었어요.',
      author: '관리자',
      date: new Date(Date.now() - 100000).toLocaleDateString('ko-KR'),
      comments: []
    }
  ]);
}

function tagLabel(tag) {
  const map = {
    success: LANG[currentLang]?.board_tag_success  || '성공후기',
    question: LANG[currentLang]?.board_tag_question || '질문',
    warning:  LANG[currentLang]?.board_tag_warning  || '주의사항',
  };
  return map[tag] || tag;
}

function renderPostList() {
  const posts    = getPosts();
  const list     = document.getElementById('postList');
  const emptyMsg = document.getElementById('emptyMsg');

  if (!posts.length) {
    list.innerHTML = '';
    if (emptyMsg) emptyMsg.style.display = 'block';
    return;
  }
  if (emptyMsg) emptyMsg.style.display = 'none';

  list.innerHTML = [...posts].reverse().map(post => `
    <li class="post-card" onclick="openPost(${post.id})">
      <div class="post-card-top">
        <span class="tag-badge tag-${post.tag}">${tagLabel(post.tag)}</span>
        <span class="post-meta">${escHtml(post.author)} · ${post.date}</span>
      </div>
      <p class="post-title">${escHtml(post.title)}</p>
      <p class="post-comment-count">💬 ${post.comments.length}</p>
    </li>
  `).join('');
}

// ====================================================
// 글쓰기 모달
// ====================================================
let selectedTag = 'success';

function openWriteModal() {
  selectedTag = 'success';
  document.querySelectorAll('.tag-opt').forEach(b => b.classList.toggle('active', b.dataset.tag === 'success'));
  document.getElementById('writeAuthor').value  = '';
  document.getElementById('writeTitle').value   = '';
  document.getElementById('writeContent').value = '';
  document.getElementById('writeModal').classList.add('active');
}

function selectTag(btn) {
  selectedTag = btn.dataset.tag;
  document.querySelectorAll('.tag-opt').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
}

function submitPost() {
  const author  = document.getElementById('writeAuthor').value.trim();
  const title   = document.getElementById('writeTitle').value.trim();
  const content = document.getElementById('writeContent').value.trim();

  if (!title || !content) {
    alert(currentLang === 'ko' ? '제목과 내용을 입력해 주세요.' : 'Vui lòng nhập tiêu đề và nội dung.');
    return;
  }

  const posts = getPosts();
  posts.push({
    id:       Date.now(),
    tag:      selectedTag,
    title,
    content,
    author:   author || '관리자',
    date:     new Date().toLocaleDateString('ko-KR'),
    comments: []
  });
  savePosts(posts);
  renderPostList();
  document.getElementById('writeModal').classList.remove('active');
}

// ====================================================
// 글 상세 모달
// ====================================================
function openPost(id) {
  currentPostId = id;
  const post = getPosts().find(p => p.id === id);
  if (!post) return;

  document.getElementById('detailContent').innerHTML = `
    <div class="detail-tag-row">
      <span class="tag-badge tag-${post.tag}">${tagLabel(post.tag)}</span>
      <span class="post-meta">${escHtml(post.author)} · ${post.date}</span>
    </div>
    <h3 class="detail-title">${escHtml(post.title)}</h3>
    <p class="detail-body">${escHtml(post.content).replace(/\n/g, '<br>')}</p>
  `;

  renderComments(post);
  document.getElementById('detailModal').classList.add('active');
}

function renderComments(post) {
  const noMsg = LANG[currentLang]?.no_comments || '아직 댓글이 없습니다.';
  const list  = post.comments.map(c => `
    <div class="comment-item">
      <span class="comment-author">${escHtml(c.author)}</span>
      <span class="comment-text">${escHtml(c.text)}</span>
      <span class="comment-date">${c.date}</span>
    </div>
  `).join('');
  document.getElementById('commentList').innerHTML =
    list || `<p class="no-comments">${noMsg}</p>`;
}

function submitComment() {
  const input = document.getElementById('commentText');
  const text  = input.value.trim();
  if (!text) return;

  const posts = getPosts();
  const post  = posts.find(p => p.id === currentPostId);
  if (!post) return;

  post.comments.push({
    author: '관리자',
    text,
    date:   new Date().toLocaleDateString('ko-KR')
  });
  savePosts(posts);
  input.value = '';
  renderComments(post);
  renderPostList();
}

// ====================================================
// 모달 바깥 클릭 시 닫기
// ====================================================
function closeModal(e, id) {
  if (e.target === document.getElementById(id)) {
    document.getElementById(id).classList.remove('active');
  }
}

// ====================================================
// 유틸
// ====================================================
function escHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// ====================================================
// 초기화
// ====================================================
document.addEventListener('DOMContentLoaded', () => {
  initDummyPosts();
  applyLang(currentLang);
  showGuide('e9-e74');

  // 이미 인증된 상태면 바로 게시판 표시
  if (isAuthenticated()) {
    showBoard();
  }
});
