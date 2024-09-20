import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { SharedModule } from './shared/shared.module';

import { faHouse } from '@fortawesome/free-solid-svg-icons/faHouse';
import { faPhone } from '@fortawesome/free-solid-svg-icons/faPhone';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons/faEnvelope';
import { faDesktop } from '@fortawesome/free-solid-svg-icons/faDesktop';
import { faMicrophone } from '@fortawesome/free-solid-svg-icons/faMicrophone';
import { faBars } from '@fortawesome/free-solid-svg-icons/faBars';
import { faFile } from '@fortawesome/free-regular-svg-icons/faFile';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons/faLinkedin';
import { faStackOverflow } from '@fortawesome/free-brands-svg-icons/faStackOverflow';
import { faFacebook } from '@fortawesome/free-brands-svg-icons/faFacebook';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { AboutMeComponent } from './about-me/about-me.component';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { ServicesComponent } from './services/services.component';
import { ComingSoonComponent } from './coming-soon/coming-soon.component';
import { RatingModule } from 'ngx-bootstrap/rating';
import { FormsModule } from '@angular/forms';
import { ProjectsComponent } from './projects/projects.component';
import { TalksComponent } from './talks/talks.component';
import { ContactMeComponent } from './contact-me/contact-me.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutMeComponent,
    ServicesComponent,
    ComingSoonComponent,
    ProjectsComponent,
    TalksComponent,
    ContactMeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CarouselModule.forRoot(),
    RatingModule.forRoot(),
    FormsModule,
    SharedModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(
      faHouse,
      faPhone,
      faEnvelope,
      faDesktop,
      faMicrophone,
      faBars,
      faFile,
      faLinkedin,
      faStackOverflow,
      faFacebook
    );
  }
}
