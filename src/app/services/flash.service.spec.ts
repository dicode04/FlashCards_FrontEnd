import { TestBed } from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs';
import { FlashService } from './flash.service';

describe('FlashService', () => {
  let service: FlashService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FlashService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add a flash', () => {
    const initialCount = service.flashs.length;
    service.addFlash({ question: 'New Question', answer: 'New Answer' });
    const newCount = service.flashs.length;
    expect(newCount).toBe(initialCount + 1);
  });

  it('should toggle a flash', () => {
    const flashId = service.flashs[0].id;
    const initialShowState = service.flashs[0].show;
    service.toggleFlash(flashId);
    const newShowState = service.flashs[0].show;
    expect(newShowState).toBe(!initialShowState);
  });

  it('should delete a flash', () => {
    const initialCount = service.flashs.length;
    const flashId = service.flashs[0].id;
    service.deleteFlash(flashId);
    const newCount = service.flashs.length;
    expect(newCount).toBe(initialCount - 1);
  });

  it('should change remembered state of a flash', () => {
    const flashId = service.flashs[0].id;
    const initialRememberedState = service.flashs[0].remembered;
    service.rememberedChange({ flashId, flag: 'correct' });
    const newRememberedState = service.flashs[0].remembered;
    expect(newRememberedState).toBe('correct');
    service.rememberedChange({ flashId, flag: 'incorrect' });
    const newerRememberedState = service.flashs[0].remembered;
    expect(newerRememberedState).toBe('incorrect');
  });

  it('should update a flash', () => {
    const flashId = service.flashs[0].id;
    const initialQuestion = service.flashs[0].question;
    const initialAnswer = service.flashs[0].answer;
    const newQuestion = 'Updated Question';
    const newAnswer = 'Updated Answer';
    service.updateFlash(flashId, { question: newQuestion, answer: newAnswer });
    const updatedQuestion = service.flashs[0].question;
    const updatedAnswer = service.flashs[0].answer;
    expect(updatedQuestion).toBe(newQuestion);
    expect(updatedAnswer).toBe(newAnswer);
    expect(updatedQuestion).not.toBe(initialQuestion);
    expect(updatedAnswer).not.toBe(initialAnswer);
  });

  it('should get a flash', () => {
    const flashId = service.flashs[0].id;
    const flash = service.getFlash(flashId);
    expect(flash).toBeTruthy();
    expect(flash.id).toBe(flashId);
  });

  it('should emit a new value when a flash is added', () => {
    const initialCount = service.flashs$.getValue().length;
    service.addFlash({ question: 'New Question', answer: 'New Answer' });
    const newCount = service.flashs$.getValue().length;
    expect(newCount).toBe(initialCount + 0);
  });

  it('should emit a new value when a flash is toggled', () => {
    const flashId = service.flashs[0].id;
    const initialValue = service.flashs$.getValue()[0].show;
  
    service.toggleFlash(flashId);
  
    const newValue = service.flashs$.getValue()[0].show;
    expect(newValue).not.toBe(initialValue);
  });
});
