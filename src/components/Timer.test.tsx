import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { Timer } from "../components";

Enzyme.configure({ adapter: new Adapter() });

describe("Timer component", () => {
  const mockOnStop = jest.fn();
  const component = shallow(<Timer onStop={mockOnStop} index={1} />);
  const seconds = component.find('[data-testid="seconds-display"]');
  const stopButton = component.find('[data-testid="stop-button"]');
  it("given a timer component is rendered, count should increase", () => {
    expect(seconds.text()).toStrictEqual("0");
    setTimeout(() => {
      component.update();
      const updatedSeconds = component.find('[data-testid="seconds-display"]');
      expect(updatedSeconds.text()).toStrictEqual("1");
      console.log(updatedSeconds.text());
    }, 1000);
  });

  it("given that stop button is clicked, stop function should be called", () => {
    stopButton.simulate("click");
    expect(mockOnStop).toHaveBeenCalledTimes(1);
  });
});
