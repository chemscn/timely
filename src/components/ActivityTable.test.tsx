import { Button } from "@mui/material";
import { act } from "@testing-library/react";
import Enzyme, { mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { ActivityTable } from "../components";
Enzyme.configure({ adapter: new Adapter() });

describe("Activity table component", () => {
  const component = mount(<ActivityTable />);
  const tableBody = component.find('[data-testid="test-table-body"]').at(0);
  jest.useFakeTimers();
  it("given no activities, table body should be empty", () => {
    expect(tableBody.text()).toStrictEqual("");
  });

  it("given a value is entered into description and saved, data should appear in table body", () => {
    component
      .find("input")
      .simulate("change", { target: { value: "Jumping" } });
    component.update();
    const startActivityButton = component.find("button").at(0);
    startActivityButton.simulate("click");
    const stopButton = component
      .find("button")
      .find('[data-testid="stop-button"]');
    component.update();

    const descriptionCell = component.find(
      '[data-testid="test-description-cell"]'
    );
    const startTimeCell = component.find('[data-testid="test-startTime-cell"]');
    const seconds = component
      .find("div")
      .find('[data-testid="seconds-display"]');

    expect(seconds.text()).toStrictEqual("0");
    expect(descriptionCell.text()).toStrictEqual("Jumping");
    expect(startTimeCell.at(0).text()).toStrictEqual(
      new Date().toLocaleString()
    );
    const durationCell = component.find('[data-testid="test-duration-cell"]');
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    stopButton.at(0).simulate("click");
    expect(durationCell.at(0).text()).toStrictEqual("1");
    component.update();
  });
});
