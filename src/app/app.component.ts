import { AfterViewChecked, ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})

export class AppComponent implements AfterViewChecked {

    constructor(
                private router: Router,
                private changeDetector: ChangeDetectorRef ) {
    }

    ngAfterViewChecked() { this.changeDetector.detectChanges(); }
}
