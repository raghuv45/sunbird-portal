import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PublicCurriculumCardComponent } from './public-curriculum-card.component';
import {SharedModule} from '@sunbird/shared';
import {CoreModule} from '@sunbird/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
describe('PublicCurriculumCardComponent', () => {
  let component: PublicCurriculumCardComponent;
  let fixture: ComponentFixture<PublicCurriculumCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, SharedModule.forRoot(), CoreModule.forRoot()],
      declarations: [ PublicCurriculumCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicCurriculumCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
