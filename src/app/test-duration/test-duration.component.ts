import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-test-duration',
  templateUrl: './test-duration.component.html',
  styleUrls: ['./test-duration.component.scss']
})
export class TestDurationComponent implements OnInit{
  
  durationOptions: any[];
  @Output() durationChange = new EventEmitter<number>();

  constructor(){
    this.durationOptions = [
      {
        label: '1 Min',
        value: 1,
        name: 'test-duration',
        checked: 'checked',
        id: 'one'
      },
      {
        label: '2 Min',
        value: 2,
        name: 'test-duration',
        checked: '',
        id: 'two'
      },
      {
        label: '3 Min',
        value: 3,
        name: 'test-duration',
        checked: '',
        id: 'three'
      },
      {
        label: '4 Min',
        value: 4,
        name: 'test-duration',
        checked: '',
        id: 'four'
      },
      {
        label: '5 Min',
        value: 5,
        name: 'test-duration',
        checked: '',
        id: 'five'
      },
    ];
  }

  emitDuration(duration: number){
    this.durationChange.emit(duration);
  }

  ngOnInit(): void {
    
  }
}
