import { typeSearchInputAndClick } from './utils.js';

describe('볼 영상 버튼 눌렀을때 페이지 구성', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('bts영상 저장 후 영상 버튼 눌렀을 때, checkView가 false인것 렌더링', () => {
    cy.get('#search-button').click();
    typeSearchInputAndClick('bts');
    cy.get(`:nth-child(1) > .content-container > :nth-child(2) > .d-flex > .btn`).click();
    cy.get('svg').click();
    cy.reload()
  });

  // it("삭제 버튼 클릭시 자료구조에서 해당 item 삭제", () => {
  // })
  // it("checkLike false일 때 좋아요 버튼 클릭시, checkLike true로 변경", () => {
  // })
  // it("checkLike true일 때 좋아요 버튼 클릭시, checkLike false로 변경", () => {
  // })
  // it("checkView가 false일때 체크박스 클릭 시, 자료구조 checkView 값 true로 변경.", () => {
  // })
  // it("볼 영상 버튼 누를 시 다른 페이지 삭제 및 볼 영상 렌더링", () => {
  // })
  
});
