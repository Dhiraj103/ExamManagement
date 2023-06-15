import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import * as pdfjsLib from 'pdfjs-dist';

if (pdfjsLib !== undefined) {
  console.log('set worker...');
  pdfjsLib.GlobalWorkerOptions.workerSrc =
    'https://npmcdn.com/pdfjs-dist@2.4.456/build/pdf.worker.js';
}

@Component({
  selector: 'app-teacher-evaluation-paper',
  templateUrl: './teacher-evaluation-paper.component.html',
  styleUrls: ['./teacher-evaluation-paper.component.css'],
})
export class TeacherEvaluationPaperComponent implements OnInit {
  name = 'Angular';
  sheet: any;
  pdfurlAns: any;
  pdfurlQue = ('../../../../assets/Hindi_Core.pdf');
  pdfurlIdle = encodeURI('../../../../assets/EnglishCore.pdf');
  currentPage: number = 1;
  pageNumber = 1;
  pageNumberQue = 1;
  pageNumberIdle = 1;
  pageCount = 0;
  pageCountQue = 0;
  pageCountIdle = 0;
  pdf: any;
  pdfQue: any;
  pdfIdle: any;
  startAnnotation: any;
  selectedColor: any;
  sheetName: any;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.sheet = this.route.snapshot.params.sheet;
    this.sheetName = this.route.snapshot.params.name;
    // console.log(this.sheet);
    this.pdfurlAns = encodeURI(
      `http://exam.ezii.live/uploads/answer_sheet/${this.sheetName}/${this.sheet}`
    );
    // console.log(this.pdfurlAns);
    this.loadPDF();
    this.loadPDFQue();
    this.loadPDFIdle();
  }
  annotations: any[] = [];

  loadPDF() {
    const loadingTask = pdfjsLib.getDocument(this.pdfurlAns);
    loadingTask.promise.then((pdf) => {
      console.log('pdf: ', pdf);
      console.log('PDF loaded');

      this.pageCount = pdf.numPages;
      this.pdf = pdf;

      // Fetch the first page
      this.loadPage(this.pageNumber);
    });
  }

  loadPage(pageNumber: number) {
    this.currentPage = pageNumber;
    const self = this;
    const loadingTask = pdfjsLib.getDocument(this.pdfurlAns);
    loadingTask.promise.then((pdf) => {
      self.pdf = pdf;
      pdf.getPage(pageNumber).then((page) => {
        var scale = 1.1;
        var viewport = page.getViewport({ scale: scale });
        var canvas: any = document.getElementById('the-canvas');
        var context = canvas.getContext('2d');
        canvas.height = viewport.height;
        canvas.width = viewport.width;
        var renderContext = {
          canvasContext: context,
          viewport: viewport,
        };
        page.render(renderContext).promise.then(() => {
          console.log('Page rendered');
          // Render annotations on canvas
          self.annotations[self.currentPage] =
            self.annotations[self.currentPage] || [];
          context.beginPath();
          self.annotations[self.currentPage].forEach(
            (annotation: { x: any; y: any }, index: number) => {
              context.strokeStyle = this.selectedColor;
              context.lineWidth = 2;
              if (index === 0) {
                context.moveTo(annotation.x, annotation.y);
                context.closePath();
              } else {
                context.moveTo(
                  self.annotations[self.currentPage][index - 1].x,
                  self.annotations[self.currentPage][index - 1].y
                );
                context.lineTo(annotation.x, annotation.y);
                context.closePath();
              }
            }
          );

          context.stroke();
          context.beginPath();
          context.closePath();
        });
      });
    });
  }

  activatePen() {
    const self = this;
    const canvas: any = document.getElementById('the-canvas');
    const context = canvas.getContext('2d');
    let isDrawing = false;
    let lastX = 0;
    let lastY = 0;

    canvas.addEventListener(
      'mousedown',
      (event: { offsetX: number; offsetY: number }) => {
        isDrawing = true;
        lastX = event.offsetX;
        lastY = event.offsetY;
      }
    );

    canvas.addEventListener(
      'mousemove',
      (event: { offsetX: number; offsetY: number }) => {
        if (!isDrawing) return;
        context.strokeStyle = this.selectedColor;
        context.lineWidth = 2;
        context.beginPath();
        context.moveTo(lastX, lastY);
        context.lineTo(event.offsetX, event.offsetY);
        context.stroke();
        lastX = event.offsetX;
        lastY = event.offsetY;

        self.annotations[self.currentPage] =
          self.annotations[self.currentPage] || [];
        self.annotations[self.currentPage].push({ x: lastX, y: lastY });

        context.closePath(); // close the current path
        context.beginPath(); // start a new path
        context.moveTo(lastX, lastY); // move to the last position
      }
    );

    canvas.addEventListener('mouseup', () => {
      isDrawing = false;
      context.closePath(); // close the path
    });

    canvas.addEventListener('mouseout', () => {
      isDrawing = false;
      context.closePath(); // close the path
    });
  }
  saveAnnotations() {
    localStorage.setItem(
      `annotations_${this.currentPage}`,
      JSON.stringify(this.annotations[this.currentPage])
    );
  }

  setColor(event: Event) {
    return (this.selectedColor = (event.target as HTMLInputElement).value);
    console.log(this.selectedColor);
  }
  nextPage() {
    if (this.pageNumber < this.pageCount) {
      this.saveAnnotations();
      this.pageNumber++;
      this.loadPage(this.pageNumber);
    }
  }

  prevPage() {
    if (this.pageNumber > 1) {
      this.saveAnnotations();
      this.pageNumber--;
      this.loadPage(this.pageNumber);
    }
  }

  // activatePen() {
  //   const canvas: any = document.getElementById('the-canvas');
  //   const context = canvas.getContext('2d');

  //   let isDrawing = false;
  //   let lastX = 0;
  //   let lastY = 0;
  //   let currentX = 0;
  //   let currentY = 0;
  //   // initialize this.annotations as empty array
  //   this.annotations[this.pageNumber - 1] =
  //     this.annotations[this.pageNumber - 1] || [];

  //   canvas.addEventListener('mousedown', (e: MouseEvent) => {
  //     isDrawing = true;
  //     [lastX, lastY] = [e.offsetX, e.offsetY];
  //   });

  //   canvas.addEventListener(
  //     'mousemove',
  //     (event: { offsetX: any; offsetY: any }) => {
  //       if (!isDrawing) return;
  //       let currentX = event.offsetX;
  //       let currentY = event.offsetY;
  //       context.beginPath();
  //       context.moveTo(lastX, lastY);
  //       context.lineTo(currentX, currentY);
  //       context.stroke();
  //       [lastX, lastY] = [currentX, currentY];
  //     }
  //   );

  //   canvas.addEventListener('mouseup', () => {
  //     isDrawing = false;
  //     // save annotation
  //     this.annotations[this.pageNumber - 1].push({
  //       x: lastX,
  //       y: lastY,
  //       width: currentX - lastX,
  //       height: currentY - lastY,
  //     });
  //     localStorage.setItem('annotations', JSON.stringify(this.annotations));
  //     // save annotations to local storage
  //   });
  // }
  //

  loadPDFQue() {
    const loadingTaskQue = pdfjsLib.getDocument(this.pdfurlQue);
    loadingTaskQue.promise.then((pdfQue) => {
      console.log('pdf: ', pdfQue);
      console.log('PDF loaded');

      this.pageCountQue = pdfQue.numPages;
      this.pdfQue = pdfQue;

      // Fetch the first page
      this.loadPageQue(this.pageNumberQue);
    });
  }

  loadPageQue(pageNumberQue: number) {
    console.log(this.pdfQue);
    this.pdfQue
      .getPage(pageNumberQue)
      .then(function (page: {
        getViewport: (arg0: { scale: number }) => any;
        render: (arg0: { canvasContext: any; viewport: any }) => any;
      }) {
        console.log('Page loaded');

        var scale = 1.1;
        var viewport = page.getViewport({ scale: scale });

        // Prepare canvas using PDF page dimensions
        var canvas: any = document.getElementById('the-canvas-que');
        var context = canvas.getContext('2d');
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        // Render PDF page into canvas context
        var renderContext = {
          canvasContext: context,
          viewport: viewport,
        };
        var renderTask = page.render(renderContext);
        renderTask.promise.then(function () {
          console.log('Page rendered');
        });
      });
  }

  nextPageQue() {
    if (this.pageNumberQue < this.pageCountQue) {
      this.pageNumberQue++;
      this.loadPageQue(this.pageNumberQue);
    }
  }

  prevPageQue() {
    if (this.pageNumberQue > 1) {
      this.pageNumberQue--;
      this.loadPageQue(this.pageNumberQue);
    }
  }

  //

  loadPDFIdle() {
    const loadingTaskIdle = pdfjsLib.getDocument(this.pdfurlIdle);
    loadingTaskIdle.promise.then((pdfIdle) => {
      console.log('pdf: ', pdfIdle);
      console.log('PDF loaded');

      this.pageCountIdle = pdfIdle.numPages;
      this.pdfIdle = pdfIdle;

      // Fetch the first page
      this.loadPageIdle(this.pageNumberIdle);
    });
  }

  loadPageIdle(pageNumberIdle: number) {
    console.log(this.pdfIdle);
    this.pdfIdle
      .getPage(pageNumberIdle)
      .then(function (page: {
        getViewport: (arg0: { scale: number }) => any;
        render: (arg0: { canvasContext: any; viewport: any }) => any;
      }) {
        console.log('Page loaded');

        var scale = 1.1;
        var viewport = page.getViewport({ scale: scale });

        // Prepare canvas using PDF page dimensions
        var canvas: any = document.getElementById('the-canvas-idle');
        var context = canvas.getContext('2d');
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        // Render PDF page into canvas context
        var renderContext = {
          canvasContext: context,
          viewport: viewport,
        };
        var renderTask = page.render(renderContext);
        renderTask.promise.then(function () {
          console.log('Page rendered');
        });
      });
  }

  nextPageIdle() {
    if (this.pageNumberIdle < this.pageCountIdle) {
      this.pageNumberIdle++;
      this.loadPageIdle(this.pageNumberIdle);
    }
  }

  prevPageIdle() {
    if (this.pageNumberIdle > 1) {
      this.pageNumberIdle--;
      this.loadPageIdle(this.pageNumberIdle);
    }
  }
}
