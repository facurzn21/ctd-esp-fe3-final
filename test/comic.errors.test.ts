// comic.errors.test.ts
import {
  ERROR_INVALID_CREDENTIALS,
  ERROR_BAD_PARAMETERS_REQUESTS,
  ERROR_SERVER,
  ERROR_BAD_REQUEST,
} from "../services/comic/comic.errors";

describe("Comic Errors", () => {
  it("should have the correct error for invalid credentials", () => {
    expect(ERROR_INVALID_CREDENTIALS).toEqual({
      error: "INVALID_CREDENTIALS",
      message: "Invalid credentials.",
    });
  });

  it("should have the correct error for bad parameters requests", () => {
    expect(ERROR_BAD_PARAMETERS_REQUESTS).toEqual({
      error: "BAD_PARAMETERS_REQUESTS",
      message: "The request has invalid parameters",
    });
  });

  it("should have the correct error for server error", () => {
    expect(ERROR_SERVER).toEqual({
      error: "SERVER_ERROR",
      message: "Server error. Please try again in a few seconds",
    });
  });

  it("should have the correct error for bad request", () => {
    expect(ERROR_BAD_REQUEST).toEqual({
      error: "BAD_REQUEST",
      message: "The request is incorrect",
    });
  });
});
