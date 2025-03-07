import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxSwalifyComponent } from './ngx-swalify.component';

describe('NgxSwalifyComponent', () => {
  let component: NgxSwalifyComponent;
  let fixture: ComponentFixture<NgxSwalifyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgxSwalifyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgxSwalifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
