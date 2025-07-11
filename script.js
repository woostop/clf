// 슬라이더 기능
const sliders = [
  { id: 'store1', slides: 5 },
  { id: 'store2', slides: 3 },
  { id: 'store3', slides: 16 }
];
const sliderStates = {};

function showSlide(sliderId, n) {
  const slider = document.querySelector(`#slider-${sliderId} .slider`);
  const slides = slider.querySelectorAll('.slide');
  const dotsContainer = document.getElementById(`dots-${sliderId}`);
  if (!sliderStates[sliderId]) sliderStates[sliderId] = 0;
  if (n >= slides.length) n = 0;
  if (n < 0) n = slides.length - 1;
  sliderStates[sliderId] = n;
  slider.style.transform = `translateX(-${n * 100}%)`;
  // Dots
  dotsContainer.innerHTML = '';
  slides.forEach((_, idx) => {
    const dot = document.createElement('span');
    dot.className = 'slider-dot' + (idx === n ? ' active' : '');
    dot.onclick = () => showSlide(sliderId, idx);
    dotsContainer.appendChild(dot);
  });
}
function nextSlide(sliderId) {
  showSlide(sliderId, sliderStates[sliderId] + 1);
}
function prevSlide(sliderId) {
  showSlide(sliderId, sliderStates[sliderId] - 1);
}
window.nextSlide = nextSlide;
window.prevSlide = prevSlide;
window.showSlide = showSlide;
window.onload = function() {
  sliders.forEach(s => showSlide(s.id, 0));
};

// 기타 수업 입력 토글
function toggleCustomClass() {
  const select = document.getElementById('class');
  const customGroup = document.getElementById('customClassGroup');
  if (select.value === '기타') {
    customGroup.style.display = 'block';
    document.getElementById('customClass').required = true;
  } else {
    customGroup.style.display = 'none';
    document.getElementById('customClass').required = false;
  }
}
window.toggleCustomClass = toggleCustomClass;

// 예약 폼 제출 (프론트엔드 알림만)
// 네비게이션 내부 anchor 부드러운 스크롤
function smoothScrollTo(selector) {
  const target = document.querySelector(selector);
  if (target) {
    target.scrollIntoView({ behavior: 'smooth' });
  }
}
document.addEventListener('DOMContentLoaded', function() {
  // 기존 예약폼 submit 이벤트 등 유지
  const form = document.getElementById('reservationForm');
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      alert('예약 신청이 완료되었습니다!\n담당자가 확인 후 연락드릴 예정입니다.');
      form.reset();
      toggleCustomClass();
    });
  }

  // 네비게이션 부드러운 스크롤
  document.querySelectorAll('.nav-links a[href^="#"]').forEach(function(link) {
    link.addEventListener('click', function(e) {
      const href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        smoothScrollTo(href);
      }
    });
  });
});

// 관리자 모달
function showAdminLogin() {
  document.getElementById('adminModal').style.display = 'flex';
}
function closeAdminModal() {
  document.getElementById('adminModal').style.display = 'none';
}
window.showAdminLogin = showAdminLogin;
window.closeAdminModal = closeAdminModal;

// 관리자 로그인 (구글 스프레드시트로 이동)
function adminLogin(e) {
  e.preventDefault();
  const pw = document.getElementById('adminPassword').value;
  if (pw === 'clf5612') {
    window.open('https://docs.google.com/spreadsheets/d/1XMmT5NkIVKVjUp8deSryTWe4_xhVbshz_Mj85CTYXj4/edit?usp=sharing', '_blank');
    closeAdminModal();
  } else {
    alert('비밀번호가 올바르지 않습니다.');
  }
}
window.adminLogin = adminLogin; 