import { Component, OnInit } from '@angular/core';
import { ProgramsService } from './programs.service';

@Component({
  selector: 'app-programs',
  templateUrl: './programs.component.html',
  styleUrls: ['./programs.component.less']
})
export class ProgramsComponent implements OnInit {

  constructor(private programService: ProgramsService) {
  }

  ngOnInit(): void {
    console.log(this)
    this.programService.getAll().subscribe(program => {
      console.log(program)
    })
  }

}
