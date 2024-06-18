// script.js
//DOMContentLoaded  웹 페이지가 로딩될 때 HTML을 파싱(분석)하여 DOM을 생성하는데, 
//이 과정이 완료되면 "DOMContentLoaded" 이벤트가 발생해 생성

document.addEventListener('DOMContentLoaded', () => {
  const addVideoBtn = document.getElementById('addVideoBtn');
  const videoUrlInput = document.getElementById('videoUrl');
  const videoGrid = document.getElementById('videoGrid');

  addVideoBtn.addEventListener('click', () => {
    const url = videoUrlInput.value;
    if (url) {
       //extractVideoId 사용자함수 유튜브 url 추출
      const videoId = extractVideoId(url);
      if (videoId) {
        if (videoGrid.children.length < 4) { // 비디오가 4개 이하일 때만 추가
          //addVideo 사용자 함수 비디오 넣기
          addVideo(videoId);
          videoUrlInput.value = '';
        } else {
          alert('최대 4개 화면까지 지원합니다.');
        }
      } else {
        alert('정확한 URL을 입력해 주세요');
      }
    }
  });

  function extractVideoId(url) {
// 정규식 구조: /(?:https?:\/\/)? (?:www\.)? youtube\.com\/watch\?v=([^&]+)|youtu\.be\/([^?&]+)/;
// (?:https?:\/\/)?: http:// 또는 https://가 있을 수도 있고 없을 수도 있습니다.
// (?:www\.)?: www.이 있을 수도 있고 없을 수도 있습니다.
// (?: ... )는 캡처하지 않는 그룹을 의미합니다.
// youtube\.com\/watch\?v=([^&]+): youtube.com/watch?v= 뒤에 나오는 비디오 ID를 캡처합니다. 
//([^&]+)는 & 문자 이전까지의 모든 문자를 캡처합니다.
// |: 또는 연산자. 앞의 패턴이 매치되지 않으면 뒤의 패턴을 시도합니다.
// youtu\.be\/([^?&]+): youtu.be/ 뒤에 나오는 비디오 ID를 캡처합니다. 
//([^?&]+)는 ? 또는 & 문자 이전까지의 모든 문자를 캡처합니다.
    const regex = /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([^&]+)|youtu\.be\/([^?&]+)/;
     //?<=조건 연산자(값이 있는지 없는지 확인) || <= 논리 or 연산자
        //값을 확인하고, match[1] youtube\.com\ 구간 확인 match[2] youtu\.be\ 구간 확인
    const match = url.match(regex);
    return match ? match[1] || match[2] : null;
  }

  function addVideo(videoId) {
    const videoItem = document.createElement('div');
    videoItem.className = 'video-item';
    videoItem.innerHTML = `
      <iframe src="https://www.youtube.com/embed/${videoId}" allowfullscreen></iframe>
      <button class="remove-btn">삭제</button>
    `;
    videoGrid.appendChild(videoItem);

    const removeBtn = videoItem.querySelector('.remove-btn');
    removeBtn.addEventListener('click', () => {
      videoGrid.removeChild(videoItem);
    });
  }
});
