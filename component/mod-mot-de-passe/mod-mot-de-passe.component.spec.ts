import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModMotDePasseComponent } from './mod-mot-de-passe.component';

describe('ModMotDePasseComponent', () => {
  let component: ModMotDePasseComponent;
  let fixture: ComponentFixture<ModMotDePasseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModMotDePasseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModMotDePasseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
