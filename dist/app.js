const audioDialog = document.querySelector('#audio-dialog');
const themeDialog = document.querySelector('#theme-dialog');
const language = document.querySelector('#language');
const sampleText = document.querySelector('#sample-text');
const statusText = document.querySelector('#audio-status');
const playButton = document.querySelector('#play-audio');
const voiceLocales = { en: 'en-US', ja: 'ja-JP', zh: 'zh-CN', ko: 'ko-KR' };
const samples = {
  en: [
    'Welcome to a walk through Suncheon. An alley is a small street between buildings. As you walk, notice the shops and the spaces people share. Keep your voice low near homes, and ask before taking a photograph of someone.',
    'Explore Suncheon through its everyday spaces. An alley connects homes, shops, and places where neighbors meet. Look at how these spaces sit beside one another. Asking before photographing residents is a simple way to show respect.',
    'On this walk, look beyond individual buildings to the connections between homes, shops, and shared spaces. How does this streetscape compare with the Korean neighborhoods you already know? Observe daily life while respecting residents’ privacy.'
  ],
  ja: [
    '順天の路地散策へようこそ。路地は建物の間を通る小さな道です。お店や人々が共有する場所に目を向けてみましょう。住宅の近くでは静かに歩き、人を撮影する前には声をかけましょう。',
    '日常の風景から順天を感じてみましょう。路地は家やお店、近所の人が出会う場所をつないでいます。それぞれの空間の関係に注目してみてください。住民を撮影するときは、先に許可を得ましょう。',
    '建物そのものだけでなく、住まいや商い、共有空間のつながりに注目してみましょう。すでに知っている韓国の街並みと、どのような違いがありますか。住民のプライバシーを尊重しながら日常を見つめてみてください。'
  ],
  zh: [
    '欢迎漫步顺天的小巷。小巷是建筑之间的小路。沿途可以留意店铺和人们共享的空间。经过住宅时请放低音量，拍摄他人前请先征得同意。',
    '从日常空间感受顺天。小巷连接住宅、商店和邻里相遇的地方。看看这些空间如何彼此相邻。拍摄居民前先征得同意，是表达尊重的简单方式。',
    '这次散步，不妨把目光从单独的建筑转向住宅、商业与公共空间之间的联系。这里的街景与你熟悉的韩国社区有哪些异同？观察日常生活时，也请尊重居民的隐私。'
  ],
  ko: [
    '순천 골목 산책에 오신 것을 환영합니다. 골목은 건물 사이로 이어지는 작은 길입니다. 걸으며 가게와 사람들이 함께 쓰는 공간을 살펴보세요. 집 근처에서는 목소리를 낮추고, 사람을 촬영하기 전에는 먼저 허락을 구해주세요.',
    '일상의 공간을 통해 순천을 만나보세요. 골목은 집과 가게, 이웃이 만나는 자리를 연결합니다. 서로 다른 공간이 어떻게 나란히 놓여 있는지 살펴보세요. 주민을 촬영하기 전에 동의를 구하는 것도 여행의 작은 예절입니다.',
    '개별 건물보다 주거와 생업, 공유 공간이 맺는 관계에 주목해보세요. 이미 알고 있는 한국의 동네와 이곳의 거리 풍경은 어떤 점이 다른가요? 주민의 사생활을 존중하며 일상의 결을 관찰해보세요.'
  ]
};
function stopAudio() {
  if ('speechSynthesis' in window) window.speechSynthesis.cancel();
  playButton.textContent = '▶ 해설 예시 듣기';
}
function updateSample() {
  stopAudio();
  const level = Number(document.querySelector('input[name="level"]:checked').value);
  sampleText.textContent = samples[language.value][level];
  sampleText.lang = language.value;
  statusText.textContent = '기기의 음성 기능을 사용하는 시안입니다. 정식 해설과 녹음은 준비 중입니다.';
}
document.querySelectorAll('[data-start]').forEach(button => button.addEventListener('click', () => {
  updateSample();
  audioDialog.showModal();
}));
document.querySelector('#preferences').addEventListener('change', updateSample);
document.querySelector('#preferences').addEventListener('submit', event => event.preventDefault());
document.querySelectorAll('[data-close]').forEach(button => button.addEventListener('click', () => button.closest('dialog').close()));
[audioDialog, themeDialog].forEach(dialog => {
  dialog.addEventListener('click', event => { if (event.target === dialog) { const r = dialog.getBoundingClientRect(); if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) dialog.close(); } });
  dialog.addEventListener('close', stopAudio);
});
playButton.addEventListener('click', () => {
  if (!('speechSynthesis' in window) || !('SpeechSynthesisUtterance' in window)) {
    statusText.textContent = '이 브라우저에서는 음성을 지원하지 않습니다. 위의 텍스트로 해설을 확인해주세요.';
    return;
  }
  if (window.speechSynthesis.speaking) { stopAudio(); statusText.textContent = '재생을 중지했습니다.'; return; }
  const utterance = new SpeechSynthesisUtterance(sampleText.textContent);
  utterance.lang = voiceLocales[language.value];
  utterance.rate = 0.9;
  const voice = window.speechSynthesis.getVoices().find(v => v.lang.toLowerCase().startsWith(language.value));
  if (voice) utterance.voice = voice;
  utterance.onend = () => { playButton.textContent = '▶ 해설 예시 다시 듣기'; statusText.textContent = '해설 예시 재생이 끝났습니다.'; };
  utterance.onerror = event => {
    if (event.error === 'canceled' || event.error === 'interrupted') return;
    playButton.textContent = '▶ 해설 예시 듣기';
    statusText.textContent = '선택한 언어의 음성을 재생하지 못했습니다. 기기의 음성 설정을 확인하거나 텍스트로 읽어주세요.';
  };
  window.speechSynthesis.speak(utterance);
  playButton.textContent = '■ 재생 중지';
  statusText.textContent = '선택한 언어로 재생을 요청했습니다. 음성과 발음은 기기 설정에 따라 다를 수 있습니다.';
});
const themes = {
  nature: ['갯벌이 들려주는 이야기', '순천만의 물길과 갈대를 바라보며 자연과 사람의 관계를 만나는 여행을 준비합니다. 생태 해설과 지역의 생활문화를 함께 살펴보는 테마입니다.'],
  culture: ['오래된 골목, 오늘의 일상', '순천 원도심의 골목과 생활문화를 만나는 도보 여행을 준비합니다. 가까운 장소 3곳을 연결하고, 문화 친숙도에 맞춘 짧은 해설을 제공할 계획입니다.'],
  humanities: ['사람을 잇는 길, 오래된 문장을 따라', '매산등의 기독교 역사와 향교의 배움, 광양의 인문학을 주제로 여행을 구상합니다. 역사 해설과 종교 순례는 구분하고, 고전과 근대문학은 각각의 맥락에 맞게 다룰 예정입니다.']
};
document.querySelectorAll('[data-theme]').forEach(button => button.addEventListener('click', () => {
  const [title, description] = themes[button.dataset.theme];
  document.querySelector('#theme-title').textContent = title;
  document.querySelector('#theme-description').textContent = description;
  themeDialog.showModal();
}));
document.querySelector('[data-theme-audio]').addEventListener('click', () => { themeDialog.close(); updateSample(); audioDialog.showModal(); });
const menuButton = document.querySelector('.menu-toggle');
const mobileNav = document.querySelector('#mobile-nav');
function closeMenu() { mobileNav.hidden = true; menuButton.setAttribute('aria-expanded', 'false'); menuButton.setAttribute('aria-label', '메뉴 열기'); }
menuButton.addEventListener('click', () => { const open = menuButton.getAttribute('aria-expanded') !== 'true'; mobileNav.hidden = !open; menuButton.setAttribute('aria-expanded', String(open)); menuButton.setAttribute('aria-label', open ? '메뉴 닫기' : '메뉴 열기'); });
mobileNav.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });
window.addEventListener('pagehide', stopAudio);
updateSample();
