import { Injectable } from '@angular/core';
import { forkJoin } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import Swal from'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  private personalPronouns: Array<string> = [];
  private demonstrativePronouns: Array<string> = [];
  private toBePresent: Array<string> = [];
  private nounsPlurar: Array<string> = [];
  private nounsSingular: Array<string> = [];
  private possiveNouns: Array<string> = [];
  private words: Array<string> = [];

  public subject: string = '';
  public verb: string = '';
  public complement: string = '';

  private sentenceInvalid: string = 'the sentence is not valid'

  constructor(private readonly httpClient: HttpClient) { }

  public loadWords() {
    forkJoin([
      this.httpClient.get('assets/personalPronouns.json'),
      this.httpClient.get('assets/demonstrativePronouns.json'),
      this.httpClient.get('assets/toBePresent.json'),
      this.httpClient.get('assets/nounsPlurar.json'),
      this.httpClient.get('assets/nounsSingular.json'),
      this.httpClient.get('assets/possiveNouns.json'),
      this.httpClient.get('assets/words.json'),
    ]).subscribe(res => {
      this.personalPronouns = res[0] as Array<string>;
      this.demonstrativePronouns = res[1] as Array<string>;
      this.toBePresent = res[2] as Array<string>;
      this.nounsPlurar = res[3] as Array<string>;
      this.nounsSingular = res[4] as Array<string>;
      this.possiveNouns = res[5] as Array<string>;
      this.words = res[6] as Array<string>;
    })
  }

  public validPropersNouns(words: Array<string> = [],index: number, isValid: boolean, isValidThe: boolean): string {
    let msj = '';

    const mrAll = ["MR.","MRS.","MISS.","MS."]
    
    if(!isValid && this.personalPronouns.includes(words[index])){
      msj = this.validPersonalPronouns(words, words[index]);
    } else if(this.demonstrativePronouns.includes(words[index])){
      msj = this.validDemonstrativePronouns (words, words[index])
    } else if(this.toBePresent.includes(words[index])){
      msj = this.sentenceInvalid;
    } else if(this.nounsPlurar.includes(words[index])){
      msj = this.sentenceInvalid;
    } else if(this.nounsSingular.includes(words[index]) && !isValidThe){
      msj = this.sentenceInvalid;
    } else if(this.possiveNouns.includes(words[index])){
      msj = this.sentenceInvalid;
    } else if(words[index] === "THE" && !isValidThe) {
      msj = this.validPropersNouns(words,index+1, false, true);
    }  else if(mrAll.includes(words[index])) {
      msj = this.validPropersNouns(words,index+1, false, true);
    } else {
      if(this.nounsPlurar.includes(words[index+1])){
        msj = this.validComplement(words, index+2);
      } else if (words[index+1] === "AND" && !isValid ){
        msj = this.validPropersNouns(words,index+2, true, true);
      } else if(words[index+1] === "IS" && words[index-1] != "AND"){
        msj = this.validComplement(words, index+2);
      } else if(words[index+1] === "ARE" && isValid){
        msj = this.validComplement(words, index+2);
      }else if(this.words.includes(words[index])){
        msj = this.sentenceInvalid;
      } else {
        //msj = this.validPropersNouns(words,index+1, false, true);
        msj = this.sentenceInvalid;
      } 
    }

    return msj;
  }

  public validPersonalPronouns(words: Array<string> = [], word: string): string{
    let msj = '';
    if(word === "I" && (words[1] != "AM" && !this.nounsSingular.includes(words[1]))) {
      return this.sentenceInvalid;
    }
    if((word === "YOU" || word === "THEY" || word === "WE")
    && (words[1] != "ARE"  && !this.nounsSingular.includes(words[1]))) {
      return this.sentenceInvalid;
    }
    if((word === "HE" || word === "SHE" || word === "IT") 
    && (words[1] != "IS" && !this.nounsPlurar.includes(words[1]))) {
      return this.sentenceInvalid;
    }
    msj = this.validComplement(words, 2);
    return msj;
  }

  public validDemonstrativePronouns (words: Array<string> = [], word: string): string {
    let msj = '';
    if((word === "THAT" || word === "THIS" )){
      const contains = this.nounsSingular.includes(words[1]);
      if(!this.nounsSingular.includes(words[1])){
        return this.sentenceInvalid;
      }
      if(words[2] != "IS"){
        return this.sentenceInvalid;
      }
    }
    if((word === "THESE" || word === "THOSE" )){
      const text = words[1];
      if(!this.nounsPlurar.includes(words[1])){
        return this.sentenceInvalid;
      }
      if(words[2] != "ARE"){
        return this.sentenceInvalid;
      }
    }
    msj = this.validComplement(words, 3);
    return msj;
  }

  public validComplement(words: string[], start: number): string {
    words = words.slice(start)
     return (words.every(item => this.words.includes(item.replace(/\./g, ''))) && words.length > 0) ? '' : this.sentenceInvalid;
  }


  public success(){
    Swal.fire(
      'Good job!',
      'The sentence is valid!',
      'success'
    )
  }

  public error(){
    Swal.fire(
      'Error!',
      'the sentence is invalid!',
      'error'
    )
  }


}
