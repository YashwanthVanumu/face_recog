import { Component, ElementRef, ViewChild, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { AttendanceService } from '../attendance.service';
import * as faceapi from 'face-api.js';
import { platformBrowser } from '@angular/platform-browser';
import { drawFaceExpressions } from 'face-api.js/build/commonjs/draw';
import { CanvasService } from '../canvas.service';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css']
})
export class AttendanceComponent{

 cameraStream!: MediaStream;
  showAttendanceSection = false;
  @ViewChild('video') videoElement!: ElementRef;
  @ViewChild('overlay') overlayCanvas!: ElementRef;
  canvas: any;
  // private overlayContext: CanvasRenderingContext2D | null = null;
  
   score = 0;
//  overlaycanvas!: HTMLCanvasElement;
  // emp_id!: string;
  // // resizedDetections: any;
  // video!: HTMLVideoElement;
 


  
  image="../assets/astreya-logo-white.svg";
  // overlayContext: any;
  


  // ngOnInit(): void {
  //   throw new Error('Method not implemented.');
  // }

  constructor(private router: Router, private attendanceService: AttendanceService, private cdr: ChangeDetectorRef, private canvasservice: CanvasService) { }

   async toggleAttendance() {
    this.showAttendanceSection = !this.showAttendanceSection;
    console.log('showAttendanceSection:',this.showAttendanceSection)
    this.cdr.detectChanges();
   
    
    try {
      
        
      
    
      await this.fun();


      // Create a canvas and draw the current video frame onto it
      // const canvas = faceapi.createCanvasFromMedia(video);
      // canvas.width = video.videoWidth;
    //   // canvas.height = video.videoHeight;
    //  const displaySize = { width: canvas.width, height: canvas.height }
      // const context = canvas.getContext('2d', { willReadFrequently: true });
     
      // let canvas1!: any;
      // do {
      //   canvas1 = await this.fun();
      // } while (this.score <= 0.8);
      // console.log(canvas1);

   
        // context.drawImage(video, 0, 0, canvas.width, canvas.height);

        // Use face-api.js to detect faces in the canvas image
        // const detections = await faceapi.detectAllFaces(canvas, new faceapi.TinyFaceDetectorOptions())
        //   .withFaceLandmarks()
        //   .withFaceDescriptors();
         

          // const resizedDetections = faceapi.resizeResults(
          //   detections,
          //   displaySize
          // );
         

          
          // const overlay: CanvasRenderingContext2D | null = overlayContext.getContext('2d');
          // const overlay : CanvasRenderingContext2D | any = overlayCanvas.getContext('2d');
         
          // canvas.width = video.videoWidth;
          // canvas.height = video.videoHeight;
          // const context = canvas.getContext('2d', { willReadFrequently: true });
          // this.overlayContext = overlayCanvas.getContext('2d');
         

          // faceapi.draw.drawDetections(canvas, resizedDetections);
          // faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);


        // Draw a box around each detected face
      //   if (detections.length > 0) {
      //   detections.forEach((detection: any) => {
      //     const box = detection.detection.box;
      //     context.beginPath();
      //     // overlayContext.beginPath();
      //     context.rect(box.x, box.y, box.width, box.height);
      //     // overlayContext.rect(box.x, box.y, box.width, box.height);
      //     context.lineWidth = 2;
      //     // overlayContext.lineWidth = 2;
      //     context.strokeStyle = 'red';
      //     // overlayContext.strokeStyle = 'red';
      //     context.fillStyle = 'red';
      //     // overlayContext.fillStyle = 'red';
      //     context.stroke();
      //     // overlayContext.stroke();
      //     console.log(context)
      //   });
      // }
    // }, 100);
    
    

       
      }
      
     
     catch (error) {
      console.error('Error accessing camera:', error);
    }

   
    
  
  }
  async fun(){
      const video = this.videoElement.nativeElement;
      const overlayCanvas: HTMLCanvasElement = this.overlayCanvas.nativeElement;
      overlayCanvas.height = video.videoHeight;
      overlayCanvas.width = video.videoWidth;
      // Wait for the camera access
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });


      // Assign the stream to the video element
      video.srcObject = stream;

     

      // Wait for the video to be loaded (metadata loaded)
      await new Promise<void>((resolve) => {
        video.onloadedmetadata = () => {
          resolve();
        };
      });

      const detectFace = async () => {
      const result = await faceapi.detectSingleFace(video, new faceapi.TinyFaceDetectorOptions())
      .withFaceLandmarks();
     
     if(result){
      this.score = result.detection.score;
      const dims = faceapi.matchDimensions(overlayCanvas, video , true)
          // overlayCanvas.getContext('2d').clearRect(0, 0, dims.width, dims.height);
          faceapi.draw.drawDetections(overlayCanvas, faceapi.resizeResults(result, dims))
     }
    if (this.score <= 0.8){
      requestAnimationFrame(detectFace);
    }
    else{
        // Convert the canvas content to a Blob
        this.canvas = faceapi.createCanvasFromMedia(video);
        this.canvasservice.canvasData = this.canvas;
        const blob = await new Promise<Blob | null>((resolve) => {
          this.canvas.toBlob((b: Blob | null) => resolve(b), 'image/jpeg');
        });

          if (blob) {
            // Send the image data to the backend
            const formData = new FormData();
            formData.append('image', blob, 'captured_image.jpg');
  
            this.attendanceService.postImage(formData).subscribe(
              (response) => {
                console.log("Response of uplading image:", response.message);
                // if (response.message === "Employee not found") {
                //   console.log("Inside employee not found");
                //   this.router.navigate(['/face-not-recognised']);
                // } else {
                //   this.router.navigate(['/mark-attendance-form']);
                // }
                  this.stopCamera();
                  this.router.navigate(['/show-image']);
          
              },
              (error) => {
                console.error('Error sending image to the backend:', error);
              }
            );
          }
        }
      };
      detectFace();
  }
  stopCamera = () => {
    // Stop all tracks in the camera stream
    if (this.videoElement.nativeElement.srcObject) {
      this.videoElement.nativeElement.srcObject.getTracks().forEach((track: { stop: () => void; }) => {
        track.stop();
        console.log("Inside stopcamera");
      });}
    }

    async ngOnInit() {
      // Load face-api.js models
      // await faceapi.setPlatform(platformBrowser());
      await faceapi.nets.tinyFaceDetector.loadFromUri('../../assets/models');
      await faceapi.nets.faceLandmark68Net.loadFromUri('../../assets/models');
      await faceapi.nets.faceRecognitionNet.loadFromUri('../../assets/models');
    // console.log(" This is how ---------------????????????")
    // this.router.navigate(['/face-detection']);
    // console.log(" This is how -------------////////////////////////////////////////////")
      
    }
}
