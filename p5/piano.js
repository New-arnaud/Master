// The midi notes of a scale
let notes = [ 60, 62, 64, 65, 67, 69, 71];

// For automatically playing the song J'ai du bon tabac
let index = 0;
let song = [
  { note: 0, duration: 700, display: "D" },
  { note: 1, duration: 700, display: "G" },
  { note: 2, duration: 700, display: "A" },
  { note: 0, duration: 700, display: "B" },
  { note: 1, duration: 700, display: "C" },
  { note: 1, duration: 700, display: "D" },
  { note: 2, duration: 700, display: "G" },
  { note: 3, duration: 700, display: "G" },
  { note: 3, duration: 700, display: "G" },
  { note: 2, duration: 700, display: "G" },
  { note: 2, duration: 700, display: "G" },
  { note: 0, duration: 700, display: "D" },
  { note: 1, duration: 700, display: "G" },
  { note: 2, duration: 700, display: "A" },
  { note: 0, duration: 700, display: "B" },
  { note: 1, duration: 700, display: "C" },
  { note: 1, duration: 700, display: "C" },
  { note: 2, duration: 700, display: "C" },
  { note: 3, duration: 700, display: "C" },
  { note: 4, duration: 700, display: "C" },
  { note: 0, duration: 700, display: "C" },
  { note: 4, duration: 700, display: "C" },
  { note: 4, duration: 700, display: "C" },
  { note: 3, duration: 700, display: "C" },
  { note: 2, duration: 700, display: "C" },
  { note: 0, duration: 700, display: "C" },
  { note: 1, duration: 700, display: "C" },
  { note: 2, duration: 700, display: "A" },
  { note: 0, duration: 700, display: "B" },
  { note: 1, duration: 700, display: "C" },
  { note: 4, duration: 700, display: "C" },
  { note: 4, duration: 700, display: "C" },
  { note: 3, duration: 700, display: "C" },
  { note: 2, duration: 700, display: "C" },
  { note: 0, duration: 700, display: "C" },
  { note: 1, duration: 700, display: "C" },
  { note: 2, duration: 700, display: "A" },
  { note: 0, duration: 700, display: "B" },
  { note: 1, duration: 700, display: "C" }
];
let trigger = 0;
let autoplay = false;
let osc;

function setup() {
  createCanvas(720, 400);
  let div = createDiv("Click to play notes or ");
  div.id("instructions");
  let button = createButton("play song automatically.");
  button.parent("instructions");
  // Trigger automatically playing
  button.mousePressed(function() {
    if (!autoplay) {
      index = 0;
      autoplay = true;
    }
  });

  // A triangle oscillator
  osc = new p5.TriOsc();
  // Start silent
  osc.start();
  osc.amp(0);
}

// A function to play a note
function playNote(note, duration) {
  osc.freq(midiToFreq(note));
  // Fade it in
  osc.fade(0.5,0.2);

  // If we sest a duration, fade it out
  if (duration) {
    setTimeout(function() {
      osc.fade(0,0.2);
    }, duration-50);
  }
}

function draw() {

  // If we are autoplaying and it's time for the next note
  if (autoplay && millis() > trigger){
    playNote(notes[song[index].note], song[index].duration);
    trigger = millis() + song[index].duration;
    // Move to the next note
    index ++;
  // We're at the end, stop autoplaying.
  } else if (index >= song.length) {
    autoplay = false;
  }


  // Draw a keyboard

  // The width for each key
  let w = width / notes.length;
  for (let i = 0; i < notes.length; i++) {
    let x = i * w;
    // If the mouse is over the key
    if (mouseX > x && mouseX < x + w && mouseY < height) {
      // If we're clicking
      if (mouseIsPressed) {
        fill(100,255,200);
      // Or just rolling over
      } else {
        fill(127);
      }
    } else {
      fill(200);
    }

    // Or if we're playing the song, let's highlight it too
    if (autoplay && i === song[index-1].note) {
      fill(100,255,200);
    }

    // Draw the key
    rect(x, 0, w-1, height-1);
  }

}

// When we click
function mousePressed(event) {
  if(event.button == 0 && event.clientX < width && event.clientY < height) {
    // Map mouse to the key index
    let key = floor(map(mouseX, 0, width, 0, notes.length));
    playNote(notes[key]);
  }
}

// Fade it out when we release
function mouseReleased() {
  osc.fade(0,0.5);
}
