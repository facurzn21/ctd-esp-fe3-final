import catchError from "../../../components/forms/handle-checkout-errors";
import ERROR_MESSAGES_CHECKOUT from "../../../components/forms/errors-submit-form";

describe("catchError function", () => {
  it("should return the correct message for CARD_DATA_INCORRECT", () => {
    const response = { error: "CARD_DATA_INCORRECT", message: "" };
    const result = catchError(response);
    expect(result).toBe(ERROR_MESSAGES_CHECKOUT.CARD_DATA_INCORRECT.message);
  });

  it("should return the correct message for CARD_WITHOUT_FUNDS", () => {
    const response = { error: "CARD_WITHOUT_FUNDS", message: "" };
    const result = catchError(response);
    expect(result).toBe(ERROR_MESSAGES_CHECKOUT.CARD_WITHOUT_FUNDS.message);
  });

  it("should return the correct message for CARD_WITHOUT_AUTHORIZATION", () => {
    const response = { error: "CARD_WITHOUT_AUTHORIZATION", message: "" };
    const result = catchError(response);
    expect(result).toBe(
      ERROR_MESSAGES_CHECKOUT.CARD_WITHOUT_AUTHORIZATION.message
    );
  });

  it("should return the correct message for INCORRECT_ADDRESS", () => {
    const response = { error: "INCORRECT_ADDRESS", message: "" };
    const result = catchError(response);
    expect(result).toBe(ERROR_MESSAGES_CHECKOUT.INCORRECT_ADDRESS.message);
  });

  it("should return the server error message for an unknown error", () => {
    const response = { error: "UNKNOWN_ERROR", message: "" };
    const result = catchError(response);
    expect(result).toBe(ERROR_MESSAGES_CHECKOUT.SERVER_ERROR.message);
  });
});
