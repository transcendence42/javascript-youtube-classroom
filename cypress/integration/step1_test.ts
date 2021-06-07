describe("step1 test", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5500/");
  });

  it("볼 영상, 본 영상, 동영상 검색 버튼이 존재", () => {
    cy.get("nav.d-flex").children().should("have.length", 3);
    cy.get("nav.d-flex button:nth-child(1)").should("have.text", "👁️ 볼 영상");
    cy.get("nav.d-flex button:nth-child(2)").should("have.text", "✅ 본 영상");
    cy.get("nav.d-flex button:nth-child(3)").should("have.text", "🔍 동영상 검색");
  });


});