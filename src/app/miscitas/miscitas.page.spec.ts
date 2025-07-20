import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MiscitasPage } from './miscitas.page';

describe('MiscitasPage', () => {
  let component: MiscitasPage;
  let fixture: ComponentFixture<MiscitasPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MiscitasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
