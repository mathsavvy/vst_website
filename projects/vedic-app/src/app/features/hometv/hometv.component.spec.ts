import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HometvComponent } from './hometv.component';

describe('HometvComponent', () => {
  let component: HometvComponent;
  let fixture: ComponentFixture<HometvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HometvComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HometvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
