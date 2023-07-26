import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileRFComponent } from './profile.component';

describe('ProfileComponent (reactive form)', () => {
  let component: ProfileRFComponent;
  let fixture: ComponentFixture<ProfileRFComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    fixture = TestBed.createComponent(ProfileRFComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update the firstName (view to model)', () => {
    const input = fixture.nativeElement.querySelector('input');

    input.value = 'Anna';
    input.dispatchEvent(new Event('input'));

    expect(component.firstName.value).toEqual('Anna');
  });

  it('should update the firstName (model to view)', () => {
    component.firstName.setValue('Boris');

    const input = fixture.nativeElement.querySelector('input');
    expect(input.value).toBe('Boris');
  });
});
