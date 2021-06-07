import { ENV } from '../../src/js/@shared/constants/env.ts'

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


describe("검색 버튼 눌렀을 때 페이지 구성", () => {
  beforeEach(()=> {
    cy.visit('/');
  })
  it("youtube API 불러왔을 때 10개의 skeleton UI 생성 확인, () => {
    cy.visit('/');
    // cy.get('#search-button').click();
    // cy.get('.modal > .video-wrapper').should('have.length', 10);
  })
  it("youtube API 불러왔을 때 10개의 item이 있는지 확인", () => {
    cy.visit('/');
    // cy.get('#search-button').click();
    // cy.get('.modal > .video-wrapper').should('have.length', 10);
  })
  // it("item을 불러왔을때 channelTitle, publishedAt, thumbnail, title, videoId 값 불러오기", () => {

  // }),
  it("BTS 입력 후 검색버튼 누를때 최근 검색어에 BTS 추가", () => {

  })
  it("bts 입력후 item 카드로 UI 띄우기", () => {

  })
  it("한 item에 대해 저장 버튼 눌렀을 때 localstorage saved-videos 자료구조에 추가되는지 확인", () => {

  })
  it("한 item에 대해 저장 버튼 눌렀을 때 저장된 영상 갯수 오른쪽 상단에 띄우기", () => {

  })
  it("[3단계] scroll 했을때 10개씩 늘어나게 하기(lazy loading)", () => {

  })
  it("한 item에 대해 저장 버튼 눌렀을 때 저장된 영상 갯수 100개 제한하기", () => {

  })
})

// - model (local storage)
//   - [ ] video : [
//       "a": {
//           checkLike : boolean,
//           checkView: boolean
//       }
//   ]

describe("볼 영상 버튼 눌렀을때 페이지 구성", () => {
  it("bts영상 저장 후 영상 버튼 눌렀을 때, local storage의 saved-videos중 checkView가 false인것 렌더링", () => {

  })
  it("삭제 버튼 클릭시 자료구조에서 해당 item 삭제", () => {

  })
  it("checkLike false일 때 좋아요 버튼 클릭시, checkLike true로 변경", () => {

  })
  it("checkLike true일 때 좋아요 버튼 클릭시, checkLike false로 변경", () => {

  })
  it("checkView가 false일때 체크박스 클릭 시, 자료구조 checkView 값 true로 변경.", () => {

  })
})

describe("본 영상 버튼 눌렀을때 페이지 구성", () => {
  it("local storage의 saved-videos중 checkView가 true인것 렌더링", () => {

  })
  it("삭제 버튼 클릭시 자료구조에서 해당 item 삭제", () => {

  })
  it("checkLike false일때 좋아요 버튼 클릭시, checkLike true로 변경", () => {

  })
  it("checkLike true일때 좋아요 버튼 클릭시, checkLike false로 변경", () => {

  })
  it("checkView가 true일때 체크박스 클릭 시, 자료구조 checkView 값 false로 변경.", () => {

  })
})

describe("좋아요 영상 버튼 눌렀을때 페이지 구성", () => {
  it("local storage의 saved-videos중 checkLike가 true인것 렌더링", () => {

  })
  it("삭제 버튼 클릭시 자료구조에서 해당 item 삭제", () => {

  })
  it("checkLike true일때 좋아요 버튼 클릭시, checkLike false로 변경하고 페이지에서 제거", () => {

  })
  it("checkView가 true일때 체크박스 클릭 시, 자료구조 checkView 값 false로 변경.", () => {

  })
})

describe("부가기능", () => {
  it("다크모드 클릭시 다크모드 전환", () => {

  })
  it("각 이벤트 발생시 알림창 띄우기 (추후에 세부적으로 분류)", () => {

  })
})

