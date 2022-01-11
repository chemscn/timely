import React from "react";
import { TimeForm } from "../components";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

Enzyme.configure({ adapter: new Adapter() });

describe("The time form component", () => {
  const mockOnSave = jest.fn();
  const mockOnClearStorage = jest.fn();
  const component = shallow(
    <TimeForm onClearStorage={mockOnClearStorage} onSave={mockOnSave} />
  );
  const startActivityButton = component.find(
    '[data-testid="start-activity-button"]'
  );
  const clearStorageButton = component.find(
    '[data-testid="clear-storage-button"]'
  );
  it("given a time form component, description input value should be empty", () => {
    const descriptionInputText = component
      .find('[data-testid="description-input"]')
      .text();
    expect(descriptionInputText).toStrictEqual("");
  });

  it("given a time form component, should render start activity button", () => {
    expect(startActivityButton.text()).toStrictEqual("Start Activity");
  });

  it("given a time form component, should render clear storage button", () => {
    expect(clearStorageButton.text()).toStrictEqual("Clear Storage");
  });

  it("given something is typed in input description field, value should be updated", () => {
    const descriptionInput = component.find(
      '[data-testid="description-input"]'
    );
    descriptionInput.simulate("change", { target: { value: "Jumping" } });
    component.update();
    const updatedInput = component.find('[data-testid="description-input"]');
    expect(updatedInput.prop("value")).toStrictEqual("Jumping");
  });

  it("given a value is entered into input, then saved, should return activity and reset description input", () => {
    const descriptionInput = component.find(
      '[data-testid="description-input"]'
    );
    descriptionInput.simulate("change", { target: { value: "Jumping" } });
    component.update();
    startActivityButton.simulate("click");
    const updatedInput = component.find('[data-testid="description-input"]');
    expect(updatedInput.prop("value")).toStrictEqual("");
    expect(mockOnSave).toHaveBeenCalledTimes(1);
  });

  it("given someone clicks the clear storage button, local storage should be cleared", () => {
    clearStorageButton.simulate("click");
    expect(mockOnClearStorage).toHaveBeenCalledTimes(1);
  });
});
