import { NgModule } from "@angular/core";
import { HomeComponent } from "./home/home.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { AuthenticationModule } from "../authentication/authentication.module";
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
    declarations: [
        HomeComponent,
        NavbarComponent,
        NotFoundComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        AuthenticationModule
    ],
    exports: [
        HomeComponent,
        NavbarComponent
    ]
})
export class SharedModule {

}