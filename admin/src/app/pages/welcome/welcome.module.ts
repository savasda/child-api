import { NgModule } from '@angular/core';

import { WelcomeRoutingModule } from './welcome-routing.module';

import { WelcomeComponent } from './welcome.component';
import { NgZorroAntdModule} from 'ng-zorro-antd';
import { CommonModule } from '@angular/common';


@NgModule({
  imports: [CommonModule, WelcomeRoutingModule, NgZorroAntdModule],
  declarations: [WelcomeComponent],
  exports: [WelcomeComponent]
})
export class WelcomeModule { }
