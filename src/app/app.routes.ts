import { Routes } from '@angular/router'; import { HomeComponent } from './features/home/home.component'; import { ProductsComponent } from './features/products/products.component'; import { ProductDetailsComponent } from './features/product-details/product-details.component'; import { BrandsComponent } from './features/brands/brands.component'; import { CategoriesComponent } from './features/categories/categories.component'; import { SupportComponent } from './features/support/support.component'; import { WishlistComponent } from './features/wishlist/wishlist.component'; import { NotFoundComponent } from './features/not-found/not-found.component'; import { LoginComponent } from './core/auth/login/login.component'; import { RegisterComponent } from './core/auth/register/register.component'; import { ForgotPasswordComponent } from './features/forgot-password/forgot-password.component'; import { CartComponent } from './features/cart/cart.component'; import { CheckoutComponent } from './features/checkout/checkout.component'; import { AllOrdersComponent } from './features/all-orders/all-orders.component'; import { authGuard } from './core/guards/auth/auth-guard'; import { ShopComponent } from './features/shop/shop.component'; import { BrandsDetailsComponent } from './features/brands-details/brands-details.component'; import { SubcategoriesComponent } from './features/subcategories/subcategories.component'; import { SubcategoriesDetailsComponent } from './features/subcategories-details/subcategories-details/subcategories-details.component';


export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full', title: 'Fresh Cart' },
  
    { path: 'home', component: HomeComponent, title: 'Fresh Cart' },
  
    { path: 'shop', component: ShopComponent, title: 'Fresh Cart' },
  
    {
      path: 'product-details/:id',
      component: ProductDetailsComponent,
      title: 'Fresh Cart',
      data: { renderMode: 'client' }
    },
  
    { path: 'brands', component: BrandsComponent, title: 'Fresh Cart' },
  
    { path: 'categories', component: CategoriesComponent, title: 'Fresh Cart' },
  
    { path: 'subcategories-details', component: SubcategoriesDetailsComponent, title: 'Fresh Cart' },
  
    { path: 'support', component: SupportComponent, title: 'Fresh Cart' },
  
    {
      path: 'wishlist',
      component: WishlistComponent,
      title: 'Fresh Cart',
      canActivate: [authGuard]
    },
  
    { path: 'login', component: LoginComponent, title: 'Fresh Cart' },
  
    { path: 'register', component: RegisterComponent, title: 'Fresh Cart' },
  
    {
      path: 'cart',
      component: CartComponent,
      title: 'Fresh Cart',
      canActivate: [authGuard]
    },
  
    {
      path: 'checkout/:cartId',
      component: CheckoutComponent,
      title: 'Fresh Cart',
      canActivate: [authGuard],
      data: { renderMode: 'client' }
    },
  
    { path: 'forget-password', component: ForgotPasswordComponent, title: 'Fresh Cart' },
  
    {
      path: 'allorders',
      component: AllOrdersComponent,
      title: 'Fresh Cart',
      canActivate: [authGuard]
    },
  
    {
      path: 'brands-details/:id',
      component: BrandsDetailsComponent,
      title: 'Fresh Cart',
      data: { renderMode: 'client' }
    },
  
    {
      path: 'subcategories/:id',
      component: SubcategoriesComponent,
      title: 'Fresh Cart',
      data: { renderMode: 'client' }
    },
  
    { path: '**', component: NotFoundComponent, title: 'Fresh Cart' }
  ];