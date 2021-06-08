import { ENV } from '../../src/js/@shared/constants/env.ts';
import { model } from '../../dist/js/model/index.js';

// const BTSQUERY = `https://www.googleapis.com/youtube/v3/search?key=${ENV.API_KEY}&part=snippet&q=bts&maxResults=10&type=video&videoEmbeddable=true`;

// describe("API 유효성 확인", () => {
//   it("BTS 검색해 youtube API 요청 시 상태코드 200인지 확인", () => {
//     cy.visit('/');
//     cy.request({
//       url: BTSQUERY,
//       followRedirection: false,
//     }).then((resp) => {
//       cy.log(resp.status)
//       expect(resp.status).to.eq(200);
//     });
//   });
// })

// ⬇️ 저장
// ↪️ 저장 취소
// - model (local storage)
//   - [ ] video : [
//       "a": {
//           videodata: videoModel,
//           checkLike : boolean,
//           checkView: boolean
//       }
//   ]

describe('볼 영상 버튼 눌렀을때 페이지 구성', () => {
  // it("bts영상 저장 후 영상 버튼 눌렀을 때, local storage의 saved-videos중 checkView가 false인것 렌더링", () => {
  // })
  // it("삭제 버튼 클릭시 자료구조에서 해당 item 삭제", () => {
  // })
  // it("checkLike false일 때 좋아요 버튼 클릭시, checkLike true로 변경", () => {
  // })
  // it("checkLike true일 때 좋아요 버튼 클릭시, checkLike false로 변경", () => {
  // })
  // it("checkView가 false일때 체크박스 클릭 시, 자료구조 checkView 값 true로 변경.", () => {
  // })
});

// describe("본 영상 버튼 눌렀을때 페이지 구성", () => {
//   it("local storage의 saved-videos중 checkView가 true인것 렌더링", () => {

//   })
//   it("삭제 버튼 클릭시 자료구조에서 해당 item 삭제", () => {

//   })
//   it("checkLike false일때 좋아요 버튼 클릭시, checkLike true로 변경", () => {

//   })
//   it("checkLike true일때 좋아요 버튼 클릭시, checkLike false로 변경", () => {

//   })
//   it("checkView가 true일때 체크박스 클릭 시, 자료구조 checkView 값 false로 변경.", () => {

//   })
// })

// describe("좋아요 영상 버튼 눌렀을때 페이지 구성", () => {
//   it("local storage의 saved-videos중 checkLike가 true인것 렌더링", () => {

//   })
//   it("삭제 버튼 클릭시 자료구조에서 해당 item 삭제", () => {

//   })
//   it("checkLike true일때 좋아요 버튼 클릭시, checkLike false로 변경하고 페이지에서 제거", () => {

//   })
//   it("checkView가 true일때 체크박스 클릭 시, 자료구조 checkView 값 false로 변경.", () => {

//   })
// })

// describe("부가기능", () => {
//   it("다크모드 클릭시 다크모드 전환", () => {

//   })
//   it("각 이벤트 발생시 알림창 띄우기 (추후에 세부적으로 분류)", () => {

//   })
// })
