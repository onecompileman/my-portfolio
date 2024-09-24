import { Component } from '@angular/core';

@Component({
  selector: 'oc-blog-form',
  templateUrl: './blog-form.component.html',
  styleUrl: './blog-form.component.scss'
})
export class BlogFormComponent {
  tagClasses: string[] = ['info', 'primary', 'success', 'warning'];
  imageSrc: string | ArrayBuffer | null = null;

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imageSrc = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }
}
