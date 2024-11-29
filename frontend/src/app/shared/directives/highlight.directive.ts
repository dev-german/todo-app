import {Directive, ElementRef, HostListener, inject} from '@angular/core';
import {ThemeService} from '../../core/services/theme/theme.service';

@Directive({
  selector: '[appHighlight]',
  standalone: true
})
export class HighlightDirective {
  themeService = inject(ThemeService)

  constructor(private el: ElementRef) { }

  @HostListener('mouseenter') onMouseEnter() {
    if(this.themeService.isLightTheme()) {
      this.highlight('#f3f4f6');
    } else {
      this.highlight('#273d6a');
    }
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.highlight('');
  }

  private highlight(color: string){
    this.el.nativeElement.style.backgroundColor = color;
  }

}
