// @title Be Right Back
// @by DEADLEADERS

samples("http://localhost:3000/strudel.json?v=3");
setcpm(130 / 4);

await initHydra({ feedStrudel: 1 });
midiport("IAC Driver");

// note(`<f#1*8!7 [a1 a1 c#2 f#2@2 c#2 f#2 c2]>`) // verse
$BASS: note(`<f#1*8!4 d2*8!2 c#2*8 [a1 a1 c#2 f#2@2 c#2 f#2 c2]>`) // chorus
  .s("brbass")
  .att(0)
  .rel(0.2)
  .gain(0.3);

// note(`<f#1,f#2,[- - [d2,c3]@6] [[c2,e3]@4 d2@3 [c2,c#3]@5 e2@4]>`) // verse
$PADS: note(
  `<<[f#1,f#2]!4 [d1,d2]!2 [c#1,c#2] [a1,a2]>,[- - [d2,c3]@6] [[c2,e3]@4 d2@3 [c2,c#3]@5 e2@4]>`,
) // chorus
  .s("deadpad")
  .att(0)
  .rel(1)
  .gain(0.25);

_$LEAD: note(
  `<[- - [d2,c3] [c2,d3] - c2 [d2,c3] -] [[c2,e3] - - - d2 - [c2,c#3] - e2 - c2 - c3@2 -@2]>`,
)
  .s("deadbrass")
  .lpf(8000)
  .lpq(6)
  .rel(0.3)
  .delay(0.9)
  .gain(0.27);

_$BELLS: s("bells").bank("00-brb").loopAt(4).chop(16).seg(8).gain(0.08);

$DRUMS: stack(
  // main
  note(
    "<[c2 c2*2 - c2*2 [c2 c2] [- c2] - c2*2]!3 [c2 c2*2 - c2*2 c2 [- c2] - c2]>",
  )
    .s("bd")
    .slow(2)
    .superimpose((x) => x.midi()),
  note("<[- c#2]!7 [- c#2*2 c#2 -@2 c#2 -@2]>")
    .s("sd")
    .superimpose((x) => x.midi()),
  s("<hh*16!7 [hh*8 -]>").vel(`.5 .2`.fast(8)).slow(2),
  s("<[- oh]!7 [oh -@2 oh -@2 oh -]>").begin(0.1).vel(0.8),

  // break
  // note("c2 c2*2 - c2*2 [c2 c2] [- c2] - c2*2").vel("1 .7 1 .7").s("bd").slow(2),
  // note("- c#2").s("sd"),
  // s("hh*16").vel(`.5 .2`.fast(8)).slow(2),
  // s("- oh").begin(.1).vel(.3),
)
  .bank("deadrums")
  .room(0.25)
  .o(1)
  .gain(0.7)
  .spectrum({ min: -60, speed: 10 });

$HIT: s("hit").bank("04-avy").slow(8).delay(0.5).room(0.5).o(1).gain(0.35);

$NOISE: s("deadfx_noise:1").loopAt(8).chop(64).seg(8).gain(0.1);

_$VONY: s("vony_sid")
  .bank("00-brb")
  .loopAt(32)
  .chop(64)
  .seg(2)
  .o(2)
  .room(0.8)
  .delay(0.3)
  .delays(0.3)
  .delayfb(0.8)
  .gain(0.33);

all((x) => x?.compressor("-10:10:.1:.1:.5"));

let briRand = Array.from({ length: 12 }, () => (Math.random() - 0.5) * 0.2);
let posRand = Array.from({ length: 12 }, () => 10 + Math.random() * 10);

solid(0)
  .blend(
    src(s1)
      .saturate(3)
      .scale(1.1)
      .modulate(s1, 0.1)
      .brightness(briRand.ease("easeInOutQuad").fast(1.2))
      .posterize(posRand.ease("easeInOutQuad").fast(1.4)),
  )
  // .blend(src(s0).modulate(o0).scrollY(-.1).scale(1, 1, 1.5), .1)
  // .add(src(o1), .7)
  .out(o0);

// MIDI trigs and scenes
await loadScript("http://localhost:3001/index.js?v=1");
await hm.midi.start({
  noteOff: "velocity_zero",
  adsrVelocity: "latched",
});

let trigify = (x) => x.diff(solid(trig, trig, trig)).luma();

// hm.midi.show()

let trig = hm.note("*", 0, 0).adsr(100, 500, 0.6, 500);

let mask1 = trigify(
  osc(trig.range(5, 30), 0, 0)
    .kaleid(99)
    .modulateScale(osc(trig.range(5, 40), 0, 0.3).kaleid(4), 1),
);
let mask2 = trigify(
  noise(trig.range(0, 20), 0)
    .kaleid(99)
    .modulateScale(osc(trig.range(0, 10), 0, 0).kaleid(4), 1),
);

let scene1 = () =>
  osc(100, 10, 0.4)
    .mask(mask1)
    .mult(solid(trig, trig, trig))
    .out(o1);
let scene2 = () =>
  osc(100, 10, 0.4)
    .mask(mask2)
    .mult(solid(trig, trig, trig))
    .out(o1);

hm.midi
  .input(0)
  .channel(0)
  .onNote("*", ({ note, velocity, channel }) => {
    if ([36].includes(note)) {
      scene1();
      return;
    }
    if ([37].includes(note)) {
      scene2();
      return;
    }
  });

s1.initVideo(
  "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExOXkwcTl5eDZidDRkZjI4ZGh3YXd5aG54NXU4NGJ3ZjJkanJxb2V4MSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l8UAXuTpDtwMmbBxJ2/giphy.mp4",
);
