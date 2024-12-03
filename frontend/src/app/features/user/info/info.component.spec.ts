import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoComponent } from './info.component';
import {ThemeService} from '../../../core/services/theme/theme.service';

describe('InfoComponent', () => {
  let infoComponent: InfoComponent;
  let fixture: ComponentFixture<InfoComponent>;
  let themeServiceMock: jasmine.SpyObj<ThemeService>;

  beforeEach(async () => {
    themeServiceMock = jasmine.createSpyObj('ThemeService', [ 'switchTheme', 'isLightTheme' ]);

    TestBed.configureTestingModule({
      providers: [
        InfoComponent,
        { provide: ThemeService, useValue: themeServiceMock }
      ]
    })

    infoComponent = TestBed.inject(InfoComponent);
  });

  it('should create', () => {
    expect(infoComponent).toBeTruthy();
  });
});
