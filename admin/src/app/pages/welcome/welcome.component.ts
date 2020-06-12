import { Component, OnInit, OnDestroy } from '@angular/core';
import { StoreService } from 'src/app/services/store.service';
import { map, filter, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.less']
})
export class WelcomeComponent implements OnInit, OnDestroy {
  programsQuantity: number;
  unsubscribe = new Subject();

  constructor(
    private router: Router,
    private storeService: StoreService) { }

  ngOnInit() {
    this.storeService.getPrograms()
      .pipe(
        filter(program => program !== null), 
        takeUntil(this.unsubscribe))
      .subscribe(programs => {
        this.programsQuantity = programs.tottal;
        console.log(programs)
      } )
  }

  onNavigateToPrograms() {
    this.router.navigate(['programs'])
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.unsubscribe();
  }

}
