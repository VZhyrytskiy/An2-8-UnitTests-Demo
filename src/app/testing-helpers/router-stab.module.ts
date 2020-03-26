import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLinkStubDirective, RouterOutletStubComponent } from './router-stubs';

@NgModule({
  imports: [CommonModule],
  declarations: [RouterLinkStubDirective, RouterOutletStubComponent],
  exports: [RouterLinkStubDirective, RouterOutletStubComponent]
})
export class RouterStubModule {}
