import { act, render, screen, waitFor } from "@testing-library/react";
import Faqs from "./Faqs";
import { server } from "dh-marvel/test/server";
import { faqsData } from "./faqsData";
import userEvent from "@testing-library/user-event";

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("Cita component", () => {
  beforeEach(() => {
    render(<Faqs faqs={faqsData} />);
  });

  describe("Testing default component render", () => {
    test("Should render correctly", () => {
      const firstQuestion = screen.getByText(faqsData[0].question);
      expect(firstQuestion).toBeInTheDocument();
      const secondQuestion = screen.getByText(faqsData[1].question);
      expect(secondQuestion).toBeInTheDocument();
      const thirdQuestion = screen.getByText(faqsData[2].question);
      expect(thirdQuestion).toBeInTheDocument();
      const fourthQuestion = screen.getByText(faqsData[3].question);
      expect(fourthQuestion).toBeInTheDocument();
      const fifthQuestion = screen.getByText(faqsData[4].question);
      expect(fifthQuestion).toBeInTheDocument();
    });
    test("Should display answers correctly", async () => {
      const firstQuestion = screen.getByText(faqsData[0].question);
      act(() => {
        userEvent.click(firstQuestion);
      });
      await waitFor(() => {
        const firstAnswer = screen.getByText(faqsData[0].answer);
        expect(firstAnswer).toBeInTheDocument();
      });

      const secondQuestion = screen.getByText(faqsData[1].question);
      act(() => {
        userEvent.click(secondQuestion);
      });
      await waitFor(() => {
        const secondAnswer = screen.getByText(faqsData[1].answer);
        expect(secondAnswer).toBeInTheDocument();
      });

      const thirdQuestion = screen.getByText(faqsData[2].question);
      act(() => {
        userEvent.click(thirdQuestion);
      });
      await waitFor(() => {
        const thirdAnswer = screen.getByText(faqsData[2].answer);
        expect(thirdAnswer).toBeInTheDocument();
      });

      const fourthQuestion = screen.getByText(faqsData[3].question);
      act(() => {
        userEvent.click(fourthQuestion);
      });
      await waitFor(() => {
        const fourthAnswer = screen.getByText(faqsData[3].answer);
        expect(fourthAnswer).toBeInTheDocument();
      });

      const fifthQuestion = screen.getByText(faqsData[4].question);
      act(() => {
        userEvent.click(fifthQuestion);
      });
      await waitFor(() => {
        const fifthAnswer = screen.getByText(faqsData[4].answer);
        expect(fifthAnswer).toBeInTheDocument();
      });
    });
  });
});
