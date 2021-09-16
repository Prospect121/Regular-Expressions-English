import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { StartComponent } from './start.component';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule	} from '@angular/material/input';
import { MatStepperModule	} from '@angular/material/stepper';
import { MatButtonModule	} from '@angular/material/button';
import { MatTreeModule	} from '@angular/material/tree';
import { MatProgressSpinnerModule	} from '@angular/material/progress-spinner';
import { FlexLayoutModule	} from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';


const materialDefinition = [
  MatFormFieldModule,
  MatInputModule,
  MatCardModule,
  MatButtonModule,
  FlexLayoutModule,
  MatStepperModule,
  MatIconModule,
  MatProgressSpinnerModule,
  MatTreeModule,
];

@NgModule({
  declarations: [StartComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: StartComponent },
    ]),
    ...materialDefinition
  ],
})
export class StartModule {}
