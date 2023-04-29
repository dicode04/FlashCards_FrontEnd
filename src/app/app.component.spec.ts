import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { FlashService } from './services/flash.service';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let flashService: FlashService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [AppComponent],
      providers: [FlashService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    flashService = TestBed.inject(FlashService);
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'ng-flashcards'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    console.log(app.title); // add this line to check the actual value
    expect(app.title).toEqual('ng-flashcards');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.content span')?.textContent).toContain('ng-flashcards');
  });

  it('should have editing as false and editingId as undefined on initial load', () => {
    expect(component.editing).toBeFalse();
    expect(component.editingId).toBeUndefined();
  });

  it('should call toggleFlash on flashService with correct flashId', () => {
    const flashServiceSpy = jasmine.createSpyObj('FlashService', ['toggleFlash']);
    const component = new AppComponent(flashServiceSpy);
  
    const flashId = 123;
    component.handleToggleCard(flashId);
  
    expect(flashServiceSpy.toggleFlash).toHaveBeenCalledWith(flashId);
  });

  it('should call updateFlash on flashService with correct editingId and flash, and call handleCancel', () => {
    const editingId = 123;
    const flash = { question: 'Question', answer: 'Answer' };
    spyOn(component, 'handleCancel');
    component.editingId = editingId;
    component.flash = flash;
    component.handleUpdate();
    expect(component.handleCancel).toHaveBeenCalled();
  });
  
  
});
