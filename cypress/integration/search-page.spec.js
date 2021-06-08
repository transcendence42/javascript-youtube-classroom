import { typeSearchInputAndClick } from './utils.js';

describe('검색 버튼 눌렀을 때 페이지 구성', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('youtube API 불러왔을 때 10개의 skeleton UI 생성 확인', () => {
    cy.get('#search-button').click();
    typeSearchInputAndClick('bts');

    cy.get('.skeleton').should('have.length', 10);
  });

  it('youtube API 불러왔을 때 10개의 item이 있는지 확인', () => {
    cy.get('#search-button').click();
    typeSearchInputAndClick('bts');
    cy.get('.skeleton').should('have.length', 0);
    cy.get('.clip').should('have.length', 10);
  });

  it('item을 불러왔을때 channelTitle, publishedAt, thumbnail, title, videoId 값 불러오기', () => {
    cy.get('#search-button').click();
    typeSearchInputAndClick('bts');
    cy.get(':nth-child(1) > .preview-container > iframe').should('have.attr', 'src');
    cy.get(`:nth-child(1) > .content-container > h3`).contains(/[^\s]/);
    cy.get(`:nth-child(1) > .content-container > :nth-child(2) > .channel-name`).should('have.attr', 'href');
    cy.get(`:nth-child(1) > .content-container > :nth-child(2) > .channel-name`).contains(/[^\s]/);
    cy.get(`:nth-child(1) > .content-container > :nth-child(2) > .meta > p`).contains(/[^\s]/);
    cy.get(`:nth-child(1) > .content-container > :nth-child(2) > .d-flex > .btn`).should('exist');
  });

  it('BTS 입력 후 검색버튼 누를때 최근 검색어 shift 최대 3개', () => {
    cy.get('#search-button').click();
    typeSearchInputAndClick('bts');
    cy.get('#modal-recent-search-items > :nth-child(1)').should('have.text', 'bts');
    typeSearchInputAndClick('ccc');
    cy.get('#modal-recent-search-items > :nth-child(1)').should('have.text', 'ccc');
    typeSearchInputAndClick('aaa');
    cy.get('#modal-recent-search-items > :nth-child(1)').should('have.text', 'aaa');
  });

  it('bts 입력후 item 카드로 UI 띄우기', () => {
    cy.get('#search-button').click();
    typeSearchInputAndClick('bts');

    for (let youtubeCardCount = 1; youtubeCardCount < 11; youtubeCardCount++) {
      cy.get(`:nth-child(${youtubeCardCount}) > .preview-container > iframe`).should('exist');
      cy.get(`:nth-child(${youtubeCardCount}) > .content-container > h3`).should('exist');
      cy.get(`:nth-child(${youtubeCardCount}) > .content-container > :nth-child(2) > .channel-name`).should('exist');
      cy.get(`:nth-child(${youtubeCardCount}) > .content-container > :nth-child(2) > .meta > p`).should('exist');
      cy.get(`:nth-child(${youtubeCardCount}) > .content-container > :nth-child(2) > .d-flex > .btn`).should('exist');
    }
  });

  /*// 검색어 중복처리
    it("한 item에 대해 저장 버튼 눌렀을 때 localstorage videos 자료구조에 추가되는지 확인", () => {
      // cy.get('#search-button').click();
      // typeSearchInputAndClick('bts');
      // cy.log(window.localStorage.getItem('recent-search'))
      // expect(window.localStorage.getItem('recent-search')).to.equal(['bts'])
    })*/

  it('한 item에 대해 저장 버튼 눌렀을 때 저장된 영상 갯수 오른쪽 상단에 띄우기', () => {
    cy.get('#search-button').click();
    typeSearchInputAndClick('bts');
    cy.get(`:nth-child(1) > .content-container > :nth-child(2) > .d-flex > .btn`).click();
    cy.get(`#modal-saved-video-length`).contains('저장된 영상 갯수: 1개');
  });

  // it("[3단계] scroll 했을때 10개씩 늘어나게 하기(lazy loading)", () => {

  // })

  // it("한 item에 대해 저장 버튼 눌렀을 때 저장된 영상 갯수 100개 제한하기", () => {

  // })
});
