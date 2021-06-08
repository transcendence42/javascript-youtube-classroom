const typeSearchInputAndClick = (type) => {
  cy.get('#modal-search-input').type(type);
  cy.get('#modal-search-button').click();
};

export { typeSearchInputAndClick };
