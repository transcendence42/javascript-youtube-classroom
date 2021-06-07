describe('유튜브 강의실 테스트', () => {
  it ('샘플 테스트 - 구글 접속', () => {
    cy.visit('https://google.com');
    cy.get('[name="q"]').type('유튜브').type('{enter}');
  });
})