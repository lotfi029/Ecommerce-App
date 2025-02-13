import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CategoryComponent } from './components/category/category.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ProductComponent } from './components/product/product.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { DetailsComponent } from './components/details/details.component';
import { userAuthenticationGuard } from './gaurds/user-authentication.guard';
import { AboutUsComponent } from './components/about-us/about-us.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'product', component: ProductComponent },
  { path: 'category', component: CategoryComponent },
  { path: 'aboutus', component: AboutUsComponent },
  {
    path: 'details/:id',
    component: DetailsComponent,
    canActivate: [userAuthenticationGuard],
  },
  {
    path: 'addproduct',
    component: ProductFormComponent,
    canActivate: [userAuthenticationGuard],
  },
  {
    path: 'updateproduct/:id',
    component: ProductFormComponent,
    canActivate: [userAuthenticationGuard],
  },
  { path: 'register', component: RegisterComponent },
  { path: '**', component: NotFoundComponent },
];
