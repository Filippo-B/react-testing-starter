import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TransactionCreateStepTwo from "./TransactionCreateStepTwo";

/**
 * Queries must follow a priority: https://testing-library.com/docs/queries/about#priority
 * Phases of testing: ARRANGE, ACT, ASSERT:
 * * Arrange: you se tup the component
 * * Act: what happens to the components (user events, changes, etc)
 * * Assert: you chheck if the features of your component match certain conditions
 */

// Test conditional rendering
test("on initial render the pay button is disabled", async () => {
  /*
   * Using async/await is necessary to geet rid of the formik error.
   * When the page loads for the first time,the button is enabled for a split second, then it becomes disabled.
   * With axync-awayt, getByRole is replaced by findByRole
   */
  render(<TransactionCreateStepTwo sender={{ id: "4" }} receiver={{ id: "5" }} />);

  expect(await screen.findByRole("button", { name: /pay/i })).toBeDisabled();
});

// Test user actions
test("if an amount and note is entered, the pay putton becomes enabled", async () => {
  /*
   * We need to find the input where the amount and note are entered. Since it does not have a label or role, we can get it by placeholder
   * See priority list in top note
   * NOTE: not having a label or role is bad practice
   */
  render(<TransactionCreateStepTwo sender={{ id: "4" }} receiver={{ id: "5" }} />);

  userEvent.type(screen.getByPlaceholderText(/amount/i), "50");
  userEvent.type(screen.getByPlaceholderText(/add a note/i), "dinner");

  expect(await screen.findByRole("button", { name: /pay/i })).toBeEnabled();
});
