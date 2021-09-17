import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { GlobalService } from '../shared/services/global.service';


@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss']
})
export class StartComponent implements OnInit {
  myreg = /^[A-Z]([\s \. '´:a-zA-Z0-9])*$/;

  sentence = new FormControl('', [Validators.required, Validators.pattern(this.myreg) ]);

  constructor(private readonly globalService: GlobalService) { 
    this.globalService.loadWords();
  }

  ngOnInit(): void {
  }

  getErrorMessage(errorMsj: String) {
    if (this.sentence.hasError('required')) {
      return 'You must enter a value';
    }
    return this.sentence.hasError('pattern') ? 
    'It must start with a capital letter. Only the following characters are allowed ( :, '+"'"+', ´, . ) ' : "";
  }

  readText(){
    let errorMsj =  ''

    const sentenceSplit =  this.sentence.value.toUpperCase().trim().split(" ");

    if(sentenceSplit[0] === ""){
      this.globalService.info('You must enter a value!');
      return;
    }
    if(!this.sentence.valid){
      this.globalService.info('It must start with a capital letter. Only the following characters are allowed ( :, '+"'"+', ´, . )');
      return;
    }
    
    errorMsj = this.globalService.validPropersNouns(sentenceSplit,0, false, false);

    if(errorMsj != ''){
      this.getErrorMessage(errorMsj);
      this.globalService.error();
      return;
    }

    this.globalService.success();
  }

  ValidPropersNouns(text: string, textSplit: []){

    //Validate that it is not a common noun
    textSplit
  }

}
