import React from "react";
//import ReactDOM from "react-dom";
import Sketch from "react-p5";

class Eye extends React.Component {
  constructor() {
    super();
    this.setState({ scale: 1, blink: false });

    this.eyelashY = 0;
    this.direction = "^";
  }

  render() {
    //console.log(this.state.scale);
    let point2x = 130;
    let point2y = 40;
    let point3x = 70;
    let point3y = 40;
    let point4x = 2;
    let point4y = 100;
    let point1x = 198;
    let point1y = 100;
    var scale = 1; //this.state.scale;

    return (
      <Sketch
        setup={(p5, parentRef) => {
          let cnv = p5.createCanvas(200 * scale, 200 * scale).parent(parentRef);
          cnv.id("enaEye");
        }}
        draw={p5 => {
          p5.background(0);

          // EYE white part
          p5.fill(241, 239, 227);
          p5.push();
          p5.scale(scale, scale);
          p5.beginShape();
          p5.curveVertex(point1x, point1y);
          p5.curveVertex(point1x, point1y);
          p5.curveVertex(point2x, point2y);
          p5.curveVertex(point3x, point3y);
          p5.curveVertex(point4x, point4y);
          p5.curveVertex(point4x, point4y);
          p5.endShape();
          p5.beginShape();
          p5.curveVertex(point1x, point1y);
          p5.curveVertex(point1x, point1y);
          p5.curveVertex(point2x, 200 - point2y);
          p5.curveVertex(point3x, 200 - point3y);
          p5.curveVertex(point4x, point4y);
          p5.curveVertex(point4x, point4y);
          p5.endShape();

          // Inside eye ball redish and black color
          p5.noStroke();
          p5.fill(236, 50, 39);
          p5.circle(100, 100, 107);
          p5.fill(0, 0, 0);
          p5.circle(100, 100, 65);

          if (this.eyelashY > 115) {
            this.direction = "-";
          }
          if (this.direction === "^") this.eyelashY += 2;
          else this.eyelashY -= 4;
          //console.log('drawing p5')
          // Eye Slash ready for animation
          p5.fill(0, 0, 0);
          p5.beginShape();
          p5.curveVertex(20, 0);
          p5.curveVertex(2, 100);
          p5.curveVertex(20, 10);
          p5.curveVertex(180, 10);
          p5.curveVertex(198, 100);
          p5.curveVertex(point1x, point1y);
          p5.curveVertex(point1x, point1y);
          p5.curveVertex(point2x, point2y + this.eyelashY);
          p5.curveVertex(point3x, point3y + this.eyelashY);
          p5.curveVertex(point4x, point4y);
          p5.curveVertex(point4x, point4y);
          p5.curveVertex(2, 0);
          p5.endShape();
          p5.pop();
        }}
      />
    );
  }
}

export default Eye;
