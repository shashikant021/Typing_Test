import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SimpleTestComponent } from './simple-test/simple-test.component';
import { AdvancedTestComponent } from './advanced-test/advanced-test.component';

const routes: Routes = [
  {path: "", redirectTo: "/simple", pathMatch: 'full'},
  {path: "simple", component: SimpleTestComponent},
  {path: "advanced", component: AdvancedTestComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
