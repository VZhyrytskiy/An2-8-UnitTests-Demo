import { LightSwitchComponent } from './light-switch.component';

describe(LightSwitchComponent.name, () => {
  let comp: LightSwitchComponent;

  beforeEach(() => {
    comp = new LightSwitchComponent();
  });

  it('#onClick should toggle #isOn', () => {
    expect(comp.isOn)
      .withContext('off at first')
      .toBe(false);

    comp.onClick();
    expect(comp.isOn)
      .withContext('on after click')
      .toBe(true);

    comp.onClick();
    expect(comp.isOn)
      .withContext('off after second click')
      .toBe(false);
  });

  it('#onClick should set #message to "is on"', () => {
    expect(comp.message)
      .withContext('off at first')
      .toMatch(/is off/i);

    comp.onClick();
    expect(comp.message)
      .withContext('on after clicked')
      .toMatch(/is on/i);
  });
});
