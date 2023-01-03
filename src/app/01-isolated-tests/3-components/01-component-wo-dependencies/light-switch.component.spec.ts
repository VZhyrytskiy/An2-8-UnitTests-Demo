import { LightSwitchComponent } from './light-switch.component';

describe(LightSwitchComponent.name, () => {
  let comp: LightSwitchComponent;

  beforeEach(() => {
    comp = new LightSwitchComponent();
  });

  it('onClick should toggle #isOn', () => {
    expect(comp.isOn).toBe(false, 'off at first');

    comp.onClick();
    expect(comp.isOn).toBe(true, 'on after click');

    comp.onClick();
    expect(comp.isOn).toBe(false, 'off after second click');
  });

  it('onClick should set #message to "is on"', () => {
    expect(comp.message).toMatch(/is off/i, 'off at first');

    comp.onClick();
    expect(comp.message).toMatch(/is on/i, 'on after clicked');
  });
});
