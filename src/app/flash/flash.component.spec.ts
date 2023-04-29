import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FlashComponent } from './flash.component';
import { IFlash } from '../models/flash.model';

describe('FlashComponent', () => {
  let component: FlashComponent;
  let fixture: ComponentFixture<FlashComponent>;
  let flash: IFlash;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FlashComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FlashComponent);
    component = fixture.componentInstance;
    flash = {
      id: 1,
      question: 'React to Angular',
      answer: 'No Reaction :)',
      show: false,
    };
    component.flash = flash;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit the id of the flash when the card is toggled', () => {
    spyOn(component.onToggleCard, 'emit');
    const card = fixture.debugElement.query(By.css('.card-header'));
    card.triggerEventHandler('click', null);
    expect(component.onToggleCard.emit).toHaveBeenCalledWith(flash.id);
  });

  it('should emit the id and flag when markCorrect is called', () => {
    spyOn(component.onRememberedChange, 'emit');
    component.markCorrect();
    expect(component.onRememberedChange.emit).toHaveBeenCalledWith({
      flashId: flash.id,
      flag: 'correct',
    });
  });

  it('should emit the id and flag when markIncorrect is called', () => {
    spyOn(component.onRememberedChange, 'emit');
    component.markIncorrect();
    expect(component.onRememberedChange.emit).toHaveBeenCalledWith({
      flashId: flash.id,
      flag: 'incorrect',
    });
  });

  it('should emit onToggleCard event when toggleCard is called', () => {
    spyOn(component.onToggleCard, 'emit');
    component.toggleCard();
    expect(component.onToggleCard.emit).toHaveBeenCalledWith(component.flash.id);
  });

  it('should emit onDelete event when deleteFlash is called', () => {
    spyOn(component.onDelete, 'emit');
    component.deleteFlash();
    expect(component.onDelete.emit).toHaveBeenCalledWith(component.flash.id);
  });

  it('should emit onEdit event when editFlash is called', () => {
    spyOn(component.onEdit, 'emit');
    component.editFlash();
    expect(component.onEdit.emit).toHaveBeenCalledWith(component.flash.id);
  });

  it('should emit onRememberedChange event with correct flag when markCorrect is called', () => {
    spyOn(component.onRememberedChange, 'emit');
    component.markCorrect();
    expect(component.onRememberedChange.emit).toHaveBeenCalledWith({ flashId: component.flash.id, flag: 'correct' });
  });

  it('should emit onRememberedChange event with incorrect flag when markIncorrect is called', () => {
    spyOn(component.onRememberedChange, 'emit');
    component.markIncorrect();
    expect(component.onRememberedChange.emit).toHaveBeenCalledWith({ flashId: component.flash.id, flag: 'incorrect' });
  });
});
