import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { IonicModule } from '@ionic/angular';

import { HomePage } from './home.page';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [HomePage],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not display the add checklist modal initially', () => {
    const modal = fixture.debugElement.query(
      By.css('[data-test="app-add-checklist"]')
    );

    expect(modal).toBeFalsy();
  });

  describe('openAddChecklistModal()', () => {
    it('should display the add checklist modal', () => {
      component.openAddChecklistModal();
      fixture.detectChanges();

      const modal = fixture.debugElement.query(
        By.css('[data-test="app-add-checklist"]')
      );

      expect(modal).toBeTruthy();
    });
  });
});
