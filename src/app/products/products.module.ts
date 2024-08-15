import { NgModule } from "@angular/core";
import { ProductListComponent } from "./product-list/product-list.component";
import { ProductComponent } from "./product/product.component";
import { ProductCreateComponent } from "./product-create/product-create.component";
import { CommonModule } from "@angular/common";
import { PreloadAllModules, PreloadingStrategy, RouterModule, Routes } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { CKEditorModule } from 'ckeditor4-angular';
import { AdminGuard } from "../authentication/admin.guard";
import { AuthenticationModule } from "../authentication/authentication.module";

const routes: Routes = [
    {
        path: "",
        children: [
            { path: '', component: ProductListComponent },
            { path: 'create', component: ProductCreateComponent, canActivate: [AdminGuard]},
            { path: ':productId', component: ProductComponent },
            { path: 'category/:categoryId', component: ProductListComponent },
        ]
    }
]

@NgModule({
    declarations: [
        ProductListComponent,
        ProductComponent,
        ProductCreateComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        CKEditorModule,
        AuthenticationModule,
        RouterModule.forChild(routes)
    ],
    exports:[
        ProductListComponent,
        ProductComponent,
        ProductCreateComponent
    ]
})
export class ProductsModule {

}