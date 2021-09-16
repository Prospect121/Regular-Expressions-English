import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { GlobalService } from '../shared/services/global.service';


@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss']
})
export class StartComponent implements OnInit {
  myreg = /^[A-Z]+([\s \. a-zA-Z])*$/;///^[A-Z]{1}/

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

    return this.sentence.hasError('pattern') ? 'Must start with a capital letter' : '';
    /*if(this.sentence.hasError('pattern')){
      return 'You must enter a value';
    }*/
    //this.sentence.addValidators([Validators.required]);

    //return this.sentence.hasError('sentence') ? 'Not a valid sentence' : '';
  }

  readText(){
    let errorMsj =  ''
    const sentenceSplit =  this.sentence.value.toUpperCase().trim().split(" ");
    console.log(sentenceSplit.slice(2))
    if(sentenceSplit.length > 0){
      errorMsj = this.globalService.validPropersNouns(sentenceSplit,0, false, false);
    }

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
