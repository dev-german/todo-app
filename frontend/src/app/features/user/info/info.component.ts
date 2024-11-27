import {Component, inject} from '@angular/core';
import {ThemeService} from '../../../core/services/theme/theme.service';

@Component({
  selector: 'app-info',
  standalone: true,
  imports: [],
  templateUrl: './info.component.html',
  styleUrl: './info.component.css'
})
export class InfoComponent {
  themeService = inject(ThemeService)


  changeTheme(theme: string) {
    this.themeService.switchTheme(theme);
  }

  isCurrentThemeLight(){
    let currentTheme = this.themeService.getCurrentTheme();
    return currentTheme.href.toString().includes('light');
  }

}
