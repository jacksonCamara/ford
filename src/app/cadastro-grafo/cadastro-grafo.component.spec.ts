import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroGrafoComponent } from './cadastro-grafo.component';

describe('CadastroGrafoComponent', () => {
  let component: CadastroGrafoComponent;
  let fixture: ComponentFixture<CadastroGrafoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadastroGrafoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroGrafoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
