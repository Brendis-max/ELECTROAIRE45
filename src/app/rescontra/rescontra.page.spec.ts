import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RescontraPage } from './rescontra.page';

describe('RescontraPage', () => {
  let component: RescontraPage;
  let fixture: ComponentFixture<RescontraPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RescontraPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
