# 남도루트 | NAMDO ROUTE

순천·광양의 자연과 생활문화를 소개하는 반응형 관광 모바일 웹 시안입니다.

## 구성

- 순천만 풍경을 활용한 첫 화면과 여행 테마 안내
- 모바일 메뉴, 여행 테마 팝업, 이용 안내
- 영어·일본어·중국어·한국어 해설 예시
- 문화 친숙도 3단계에 따른 설명 예시
- 브라우저 음성 합성 미리듣기

정식 해설·현장 동선·예약·결제는 준비 중입니다. 기기와 브라우저에 따라 음성 지원이 다릅니다.

## 로컬에서 보기

`dist/index.html`을 브라우저로 열거나 아래 명령으로 미리봅니다.

```sh
python3 -m http.server 4173 --directory dist
```

## GitHub Pages

`gh-pages` 브랜치의 루트에서 배포합니다. 화면을 수정한 후 아래 명령으로 게시 파일을 갱신할 수 있습니다.

```sh
git add dist
git commit -m "Update website"
git push origin main
git subtree split --prefix dist -b pages-update
git push origin pages-update:gh-pages
git branch -D pages-update
```

## 사진 및 디자인 참고

- 순천만 사진: [순천만습지](https://scbay.suncheon.go.kr/wetland/experience/0007), [한국관광공사](https://english.visitkorea.or.kr/svc/contents/contentsView.do?vcontsId=96951)
- 문화의거리 사진: [순천시](https://www.suncheon.go.kr/tour/tourist/0008/0004)
- 디자인 참고: [핀터레스트 독도전시관 홈페이지 이미지](https://kr.pinterest.com/pin/454652524901144125/)

사진은 외부 기관 자료이며 이 저장소가 별도의 이용 허락을 부여하지 않습니다. 상용 사용 전 원 출처의 이용 조건을 확인해야 합니다.
