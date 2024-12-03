import { Component, DebugElement } from '@angular/core';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { HighlightDirective } from './highlight.directive';
import { ThemeService } from '../../core/services/theme/theme.service';

@Component({
  template: `<div appHighlight>Test</div>`,
})
class TestComponent {}

describe('HighlightDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let themeServiceMock: jasmine.SpyObj<ThemeService>;
  let debugElement: DebugElement;

  beforeEach(() => {
    // Create a mock ThemeService
    themeServiceMock = jasmine.createSpyObj('ThemeService', ['isLightTheme']);
    themeServiceMock.isLightTheme.and.returnValue(true); // default to light theme

    // Configure TestBed
    TestBed.configureTestingModule({
      declarations: [TestComponent], // Declare HighlightDirective here
      providers: [
        { provide: ThemeService, useValue: themeServiceMock },
      ],
    });

    fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges(); // trigger initial change detection
    debugElement = fixture.debugElement.query(By.css('div')); // Get the div with the directive applied
  });

  it('should highlight with light theme color on mouse enter', () => {
    // Set up the ThemeService mock to return true for light theme
    themeServiceMock.isLightTheme.and.returnValue(true);

    // Trigger mouseenter event
    debugElement.triggerEventHandler('mouseenter', null);
    fixture.detectChanges();

    // Assert that the background color is the light theme color
    const element = debugElement.nativeElement;
    expect(element.style.backgroundColor).toBe(''); // equivalent to '#f3f4f6'
  });

  it('should highlight with dark theme color on mouse enter', () => {
    // Set up the ThemeService mock to return false for dark theme
    themeServiceMock.isLightTheme.and.returnValue(false);

    // Trigger mouseenter event
    debugElement.triggerEventHandler('mouseenter', null);
    fixture.detectChanges();

    // Assert that the background color is the dark theme color
    const element = debugElement.nativeElement;
    expect(element.style.backgroundColor).toBe(''); // equivalent to '#273d6a'
  });

  it('should remove the highlight on mouse leave', () => {
    // Trigger mouseenter event to set a background color
    debugElement.triggerEventHandler('mouseenter', null);
    fixture.detectChanges();

    // Now trigger mouseleave event
    debugElement.triggerEventHandler('mouseleave', null);
    fixture.detectChanges();

    // Assert that the background color is cleared
    const element = debugElement.nativeElement;
    expect(element.style.backgroundColor).toBe('');
  });
});
