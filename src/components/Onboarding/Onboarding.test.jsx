import { fireEvent, render, screen } from "@testing-library/react";
import Onboarding from "../Onboarding/Onboarding";
import { describe, expect, it, vi } from "vitest";
import "@testing-library/jest-dom";

vi.mock("../Onboarding/content.json", () => ({
    default: {
        slides: [
            { id: 1, image: "/image/onboarding1.png", header: "Stay Connected, Everywhere, Anytime", desc: "Welcome to Newsify, your ultimate destination for breaking news, exclusive stories, and tailored content" },
            { id: 2, image: "/image/onboarding2.png", header: "Become a Savvy Global Citizen.", desc: "Discover tailored news that aligns with your interests and preferences. Your personalized news journey awaits!" },
        ],
    },
}))

vi.stubGlobal("matchMedia", () => ({
    matches: false,
    addEventListener: () => {},
    removeEventListener: () => {},
}));

describe("Onboarding Component", () => {
    it("goes to the next slides when the Next button is clicked", () => {
        const mockOnComplete = vi.fn()

        render(<Onboarding onComplete={mockOnComplete} />);
        expect(screen.getByText("Stay Connected, Everywhere, Anytime")).toBeInTheDocument();
        fireEvent.click(screen.getByText("Next"));
    })
})
