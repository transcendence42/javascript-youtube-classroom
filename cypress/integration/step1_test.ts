const searchByClickButton = (searchKeyword: string) => {
  cy.get("#search-input").type(searchKeyword);
  cy.get("#search-submit-button").click();
}

describe("step1 test", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5500/");
  });

  // it("볼 영상, 본 영상, 동영상 검색 버튼이 존재", () => {
  //   cy.get("nav.d-flex").children().should("have.length", 3);
  //   cy.get("nav.d-flex button:nth-child(1)").should("have.text", "👁️ 볼 영상");
  //   cy.get("nav.d-flex button:nth-child(2)").should("have.text", "✅ 본 영상");
  //   cy.get("nav.d-flex button:nth-child(3)").should("have.text", "🔍 동영상 검색");
  // });

  // it("'검색버튼'을 클릭하면, 검색 결과 최대 10개를 출력한다.", () => {
  //   cy.get("#search-button").click();
  //   searchByClickButton("축구");
  //   cy.get("div.modal article").should("have.length", 1);
  // }); // 입력 값, 길이 수정 필요

  // it("'엔터키'를 입력하면, 검색 결과 최대 10개를 출력한다.", () => {
  //   cy.get("#search-button").click();
  //   cy.get("#search-input").type("축구").type("{enter}");
  //   cy.get("div.modal article").should("have.length", 1);
  // }); // 입력 값, 길이 수정 필요

  // it("스켈레톤 UI 적용 여부 확인", () => {
  // }); // 수정 필요

  // it("검색 결과가 존재하지 않는 경우, 검색 결과 없음 이미지를 출력한다.", () => {
  // }); // 수정 필요

  // it("스크롤 바를 화면 최하단으로 이동하는 경우, 추가 검색을 진행 후 결과를 출력한다 (추가 된 결과의 갯수는 최대 10개이다)", () => {
  //   cy.get("#search-button").click();
  //   cy.get("div.modal-inner").scrollTo('bottom');
  //   // 추가 검색 및 결과 출력 여부 확인 필요
  // });

  // it("'저장 버튼'을 클릭하면, '저장 버튼'이 삭제된다.", () => {
  //   cy.get("#search-button").click();
  //   searchByClickButton("축구");
  //   cy.get("div.modal article:nth-child(1) button").click();
  //   cy.get("div.modal article:nth-child(1)").children('button').should("not.exist");
  // });

  // it("'저장 버튼'을 클릭하면 해당 영상 id가 웹 스토리지에 저장된다.", () => {
  //   cy.get("#search-button").click();
  //   searchByClickButton("축구");
  //   cy.get("div.modal article:nth-child(1) button").click();
  //   //const temp = localStorage.getItem("data");
  //   //expect(temp).to.not.equal('temp');
  // }); // 수정 필요

  // it("저장된 영상의 최대 갯수는 100개이다.", () => {
  //   cy.get("#search-button").click();
  //   searchByClickButton("축구");
  //   for (let i = 1; i <= 101; i++) {
  //     if (i % 10 === 0) {
  //       cy.get("div.modal-inner").scrollTo("bottom");
  //     }
  //     cy.get(`div.modal article:nth-child(${i}) button`).click();
  //   }
  //   // const numOfSavedItem = localStorage.getItem('savedItemCount');
  //   // expect(numOfSavedItem).to.equal(100);
  // }); // 수정 및 확인 필요

  // it("검색을 진행했을 때, 검색어가 최근 검색어에 포함된다.", () => {
  //   cy.get("#search-button").click();
  //   searchByClickButton("축구");
  //   cy.get("div.modal section:nth-child(4) a:nth-child(2)").should("have.text", "축구");
  // });

  // it("검색 모달이 다시 로딩된 경우, 최근에 검색한 결과를 보여준다.", () => {
  //   cy.get("#search-button").click();
  //   searchByClickButton("축구");
  //   cy.get("path.close-x").click();
  //   cy.get("#search-button").click();
  //   cy.get("#search-input").should("have.value", "축구");
  // });

  // it("검색을 4번 진행했을 때, 가장 최근의 3개 검색어를 보여준다.", ()=>{
  //   cy.get("#search-button").click();
  //   searchByClickButton("축구");
  //   searchByClickButton("야구");
  //   searchByClickButton("농구");
  //   searchByClickButton("배구");
  //   cy.get("#search-submit-button").click();
  //   cy.get("div.modal section:nth-child(4)").children().should("have.length", 4);
  //   cy.get("div.modal section:nth-child(4) a:nth-child(2)").should("have.text", "배구");
  //   cy.get("div.modal section:nth-child(4) a:nth-child(3)").should("have.text", "농구");
  //   cy.get("div.modal section:nth-child(4) a:nth-child(4)").should("have.text", "야구");
  // });
});