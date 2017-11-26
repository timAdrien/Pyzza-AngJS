import {Component, EventEmitter, Input, Output, ViewContainerRef} from '@angular/core';
import {ToastsManager} from "ng2-toastr";
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileuploadComponent {


  @Input() draggingColor: string = 'red';
  @Input() loadedColor: string = 'green';
  @Input() baseColor: string = '#ccc';
  @Input() overlayColor: string = 'rgba(255,255,255,0.5)';
  @Input() imageSrc: {
    data: string,
    contentType: string
  };

  @Output() sendPhoto: EventEmitter<string> = new EventEmitter<string>();

  dragging: boolean = false;
  loaded: boolean = false;
  imageLoaded: boolean = false;

  constructor(
      private toastr: ToastsManager,
      private _vcr: ViewContainerRef,
      public sanitizer: DomSanitizer
    ) {
      this.toastr.setRootViewContainerRef(_vcr);
    }

  handleDragEnter() {
    this.dragging = true;
  }

  handleDragLeave() {
    this.dragging = false;
  }

  handleDrop(e) {
    e.preventDefault();
    this.dragging = false;
    this.handleInputChange(e);
  }

  handleImageLoad() {
    this.imageLoaded = true;
  }

  handleInputChange(e) {
    let file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];

    let pattern = /image-*/;
    let reader = new FileReader();

    if (!file.type.match(pattern)) {
      this.toastr.error("Format non valide.", "Maj d'une pizza");
      return;
    }

    this.loaded = false;

    reader.onload = this.handleReaderLoaded.bind(this);
    reader.readAsDataURL(file);
  }

  handleReaderLoaded(e) {
    let reader = e.target;
    this.imageSrc = { data: reader.result.split("base64,")[1], contentType: reader.result.split(":")[1].split(";")[0] };
    this.sendPhoto.emit(JSON.stringify(this.imageSrc));
    this.loaded = true;
  }


}
