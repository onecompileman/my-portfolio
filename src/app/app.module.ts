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
import { faDashboard } from '@fortawesome/free-solid-svg-icons/faDashboard';
import { faBlog } from '@fortawesome/free-solid-svg-icons/faBlog';
import { faMessage } from '@fortawesome/free-solid-svg-icons/faMessage';
import { faMicrophone } from '@fortawesome/free-solid-svg-icons/faMicrophone';
import { faBars } from '@fortawesome/free-solid-svg-icons/faBars';
import { faSpinner } from '@fortawesome/free-solid-svg-icons/faSpinner';
import { faTrash } from '@fortawesome/free-solid-svg-icons/faTrash';
import { faFile } from '@fortawesome/free-regular-svg-icons/faFile';
import { faComment } from '@fortawesome/free-regular-svg-icons/faComment';
import { faEye } from '@fortawesome/free-regular-svg-icons/faEye';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons/faLinkedin';
import { faStackOverflow } from '@fortawesome/free-brands-svg-icons/faStackOverflow';
import { faGithub } from '@fortawesome/free-brands-svg-icons/faGithub';
import { faFacebook } from '@fortawesome/free-brands-svg-icons/faFacebook';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { AboutMeComponent } from './about-me/about-me.component';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { ServicesComponent } from './services/services.component';
import { ComingSoonComponent } from './coming-soon/coming-soon.component';
import { RatingModule } from 'ngx-bootstrap/rating';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProjectsComponent } from './projects/projects.component';
import { TalksComponent } from './talks/talks.component';
import { ContactMeComponent } from './contact-me/contact-me.component';
import { BlogsComponent } from './blogs/blogs.component';
import { QuillModule } from 'ngx-quill';
import { BlogDetailsComponent } from './blogs/blog-details/blog-details.component';
import { BlogAuthorComponent } from './blogs/blog-author/blog-author.component';
import { BlogCommentComponent } from './blogs/blog-comment/blog-comment.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApiInterceptor } from './core/interceptors/api.interceptor';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';
import Quill from 'quill';
const VideoEmbed = Quill.import("formats/video") as any;

class VideoResponsive extends VideoEmbed {
    static aspectRatio: string = "16 / 9 auto"
    static create(value: string) {
        const node = super.create(value);
        node.setAttribute('width', '100%');
        node.style.aspectRatio = this.aspectRatio;
        return node;
    }
    html () {
        return this['domNode'].outerHTML;
    }
}

Quill.register(VideoResponsive, true);

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
    BlogsComponent,
    BlogDetailsComponent,
    BlogAuthorComponent,
    BlogCommentComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CarouselModule.forRoot(),
    RatingModule.forRoot(),
    QuillModule.forRoot({
      modules: {
        syntax: true,
        table: true,
        toolbar: [
          ['bold', 'italic', 'underline', 'strike'], // toggled buttons
          ['blockquote', 'code-block'],

          [{ header: 1 }, { header: 2 }], // custom button values
          [{ list: 'ordered' }, { list: 'bullet' }],
          [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
          [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
          [{ direction: 'rtl' }], // text direction

          [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
          [{ header: [1, 2, 3, 4, 5, 6, false] }],

          [{ color: [] }, { background: [] }], // dropdown with defaults from theme
          [{ font: [] }],
          [{ align: [] }],

          ['clean'], // remove formatting button

          ['link', 'image', 'video'], // link and image, video
        ],
      },
    }),
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    NgxSpinnerModule.forRoot({ type: 'square-loader' }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiInterceptor,
      multi: true,
    },
  ],
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
      faFacebook,
      faGithub,
      faEye,
      faComment,
      faBlog,
      faMessage,
      faDashboard,
      faSpinner,
      faTrash
    );
  }
}
