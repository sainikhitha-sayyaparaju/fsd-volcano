// let drawLine = (sx, sy, ex, ey) => {
//   ctx.stroke();
//   ctx.beginPath();
//   ctx.moveTo(sx, sy);
//   ctx.lineTo(ex, ey);
//   ctx.stroke();
// };
// let drawCircle = (sx, sy, r, sr, ea) => {
//   ctx.beginPath();
//   ctx.arc(sx, sy, r, sr, ea);
//   ctx.fillStyle = "yellow";
//   ctx.fill();
//   ctx.stroke();
// };
let c = document.getElementById("mycanvas");
let ctx = c.getContext("2d");
// drawCircle(250, 250, 100, 0, 2 * Math.PI);
//let img = document.createElement("img");
let loadImage = (src, callback) => {
  let img = new Image();
  img.onload = () => callback(img);
  img.src = src;
};
let imagepath = (frameNumber, animation) => {
  return `images/${animation}/${frameNumber}.png`;
};
let frames = {
  idle: [1, 2, 3, 4, 5, 6, 7, 8],
  kick: [1, 2, 3, 4, 5, 6, 7],
  punch: [1, 2, 3, 4, 5, 6, 7],
  backward: [1, 2, 3, 4, 5, 6],
  forward: [1, 2, 3, 4, 5, 6],
  block: [1, 2, 3, 4, 5, 6, 7, 8, 9],
};
// loadImage(imagepath(1), (img) => {
//   ctx.drawImage(img, 0, 0, 500, 500);
// });
let loadImages = (callback) => {
  let images = {
    idle: [],
    kick: [],
    punch: [],
    backward: [],
    forward: [],
    block: [],
  };
  let imagesToLoad = 0;
  ["idle", "kick", "punch", "backward", "forward", "block"].forEach(
    (animation) => {
      let animationFrames = frames[animation];
      imagesToLoad = imagesToLoad + animationFrames.length;
      animationFrames.forEach((frameNumber) => {
        let path = imagepath(frameNumber, animation);
        loadImage(path, (image) => {
          images[animation][frameNumber - 1] = image;
          imagesToLoad = imagesToLoad - 1;
          if (imagesToLoad === 0) {
            callback(images);
          }
        });
      });
    }
  );
};
let animate = (ctx, images, animation, callback) => {
  images[animation].forEach((image, index) => {
    setTimeout(() => {
      ctx.clearRect(0, 0, 500, 500);
      ctx.drawImage(image, 0, 0, 500, 500);
    }, index * 100);
  });
  setTimeout(callback, images[animation].length * 100);
};
loadImages((images) => {
  queuedAnimations = [];
  let aux = () => {
    let selectedAnimation;
    if (queuedAnimations.length === 0) {
      selectedAnimation = "idle";
    } else {
      selectedAnimation = queuedAnimations.shift();
    }
    animate(ctx, images, selectedAnimation, aux);
  };
  aux();
  document.getElementById("kick").onclick = () => {
    queuedAnimations.push("kick");
  };
  document.getElementById("punch").onclick = () => {
    queuedAnimations.push("punch");
  };
  document.getElementById("forward").onclick = () => {
    queuedAnimations.push("forward");
  };
  document.getElementById("backward").onclick = () => {
    queuedAnimations.push("backward");
  };
  document.getElementById("block").onclick = () => {
    queuedAnimations.push("block");
  };
  document.addEventListener("keyup", (event) => {
    const key = event.key;
    if (key === "ArrowLeft") {
      queuedAnimations.push("kick");
    } else if (key === "ArrowRight") {
      queuedAnimations.push("punch");
    }
  });
});
