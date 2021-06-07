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
  //   cy.get("#search-input").type("축구");
  //   cy.get("#search-submit-button").click();
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

  it("'저장 버튼'을 클릭하면, '저장 버튼'이 삭제된다.", () => {
    cy.get("#search-button").click();
    cy.get("#search-input").type("축구");
    cy.get("#search-submit-button").click();
    cy.get("div.modal article:nth-child(1) button").click();
    cy.get("div.modal article:nth-child(1)").children('button').should("not.exist");
  });

});