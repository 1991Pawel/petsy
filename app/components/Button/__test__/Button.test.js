import React from "react";
import { Button } from "../Button";
import { render, screen, fireEvent } from "@testing-library/react";
import { MdStar } from "react-icons/md";
import "@testing-library/jest-dom";

describe("Button", () => {
    it("should render the label correctly", () => {
        render(<Button label={"Test"} />);
        const buttonElement = screen.getByRole("button");
        expect(buttonElement.textContent).toBe("Test");
    });

    it("should render the icon correctly", () => {
        render(<Button icon={MdStar} />);
        const buttonElement = screen.getByRole("button");
        const svgIcon = buttonElement.querySelector("svg");
        expect(svgIcon).toBeInTheDocument();
    });
    it("should call onClick function when the button is clicked", () => {
        const onClickMock = jest.fn();
        render(<Button onClick={onClickMock} />);
        const buttonElement = screen.getByRole("button");
        fireEvent.click(buttonElement);
        expect(onClickMock).toHaveBeenCalledTimes(1);
    });
});
