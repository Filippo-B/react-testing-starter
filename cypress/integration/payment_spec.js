const { v4: uuidv4 } = require("uuid");
describe("payment", () => {
  it("user can make payment", () => {
    // LOGIN
    cy.visit("/");
    cy.findByRole("textbox", { name: /username/i }).type("johndoe");
    cy.findByLabelText(/password/i).type("s3cret");
    cy.findByRole("checkbox", { name: /remember me/i }).check();
    cy.findByRole("button", { name: /sign in/i }).click();
    // check account balance
    let oldBalance;
    // data-test is an id you give to an html element so that's easy to find for testing. However, this is the last resort.
    cy.get("[data-test=sidenav-user-balance]")
      .then(($balance) => (oldBalance = $balance.text()))
      .then((balance) => console.log(balance));
    // click on pay button
    cy.findByRole("button", { name: /new/i }).click();
    // search for user
    cy.findByRole("textbox").type("devon becker");
    cy.findByText(/devon becker/i).click();

    // enter amount and note and click pay
    const amount = "5.00";
    cy.findByPlaceholderText(/amount/i).type(amount);
    const note = uuidv4();
    cy.findByPlaceholderText(/add a note/i).type(note);
    cy.findByRole("button", { name: /pay/i }).click();

    // return to transactions
    cy.findByRole("button", { name: /return to transactions/i }).click();
    // go to personal payments
    cy.findByRole("tab", { name: /mine/i }).click();
    // click on payment
    // force:true is necessary because the element i not visible hen the page loads. We could also have used another property called scrollIntoView
    cy.findByText(note).click({ force: true });
    // verify if payment was made
    cy.findByText(`-$${amount}`).should("be.visible");
    cy.findByText(note).should("be.visible");
    // verify if payment amount was deducted
  });
});
