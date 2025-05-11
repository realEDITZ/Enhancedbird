// Using global kaboom instead of import
// initialize context
kaboom({
  scale: 1.3
});

// load assets
loadSprite("birdy", "../sprites/birdy.png");
loadSprite("burdy", "../sprites/bean.png");
loadSprite("LAZAR", "../sprites/LAZAR.png");
loadSprite("bg", "../sprites/bg.png");
loadSprite("pipe", "../sprites/pipe.png");
loadSprite("box", "../sprites/box.png");
loadSound("wooosh", "../sounds/wooosh.mp3");
loadSound("point", "../sounds/point.mp3");
loadSound("hit", "../sounds/hit.wav");

let highScore = 0;

// Menu scene that shows up first
scene("menu", () => {
  // Add background
  add([
    sprite("bg", {width: width(), height: height()})
  ]);

  // Add game title
  add([
    text("ENHANCED Flappy Bird", { size: 45 }),
    pos(width() / 2, height() / 4),
    anchor("center"),
    color(255, 255, 0),
  ]);

  // Add animated bird for decoration
  const menuBird = add([
    sprite("birdy"),
    scale(2),
    pos(width() / 2, height() / 2 - 20),
    anchor("center"),
  ]);

  // Make bird float up and down
  let floatDir = 1;
  menuBird.action(() => {
    menuBird.pos.y += floatDir * 0.7;
    if (menuBird.pos.y > height() / 2 + 10 || menuBird.pos.y < height() / 2 - 30) {
      floatDir *= -1;
    }
  });

  // Add Play Button
  const playBtn = add([
    text("PLAY", { size: 32 }),
    pos(width() / 2, height() / 2 + 80),
    area(),
    anchor("center"),
    color(0, 255, 0),
    "playButton"
  ]);

  // Add How To Play Button
  const howToPlayBtn = add([
    text("HOW TO PLAY", { size: 32 }),
    pos(width() / 2, height() / 2 + 140),
    area(),
    anchor("center"),
    color(0, 255, 255),
    "howToPlayButton"
  ]);

  // Track mouse clicks
  mouseClick(() => {
    // Check if clicking on play button
    if (mousePos().x > playBtn.pos.x - 50 && 
        mousePos().x < playBtn.pos.x + 50 &&
        mousePos().y > playBtn.pos.y - 20 && 
        mousePos().y < playBtn.pos.y + 20) {
      go("game");
    }

    // Check if clicking on how to play button
    if (mousePos().x > howToPlayBtn.pos.x - 100 && 
        mousePos().x < howToPlayBtn.pos.x + 100 &&
        mousePos().y > howToPlayBtn.pos.y - 20 && 
        mousePos().y < howToPlayBtn.pos.y + 20) {
      go("howToPlay");
    }
  });

  // Button hover effect
  action("playButton", (btn) => {
    if (mousePos().x > btn.pos.x - 50 && 
        mousePos().x < btn.pos.x + 50 &&
        mousePos().y > btn.pos.y - 20 && 
        mousePos().y < btn.pos.y + 20) {
      btn.scale = vec2(1.1);
    } else {
      btn.scale = vec2(1);
    }
  });

  action("howToPlayButton", (btn) => {
    if (mousePos().x > btn.pos.x - 100 && 
        mousePos().x < btn.pos.x + 100 &&
        mousePos().y > btn.pos.y - 20 && 
        mousePos().y < btn.pos.y + 20) {
      btn.scale = vec2(1.1);
    } else {
      btn.scale = vec2(1);
    }
  });

  // Keyboard controls for accessibility
  keyPress("space", () => {
    go("game");
  });
});

// How To Play Scene
scene("howToPlay", () => {
  // Add background
  add([
    sprite("bg", {width: width(), height: height()})
  ]);

  // Add title
  add([
    text("HOW TO PLAY", { size: 40 }),
    pos(width() / 2, 60),
    anchor("center"),
    color(255, 255, 0),
  ]);

  // Instructions text
  const instructions = [
    "To flap, press the SPACE BAR and try to maneuver",
    "yourself through the pipes and get a high score!",
    "",
    "There are powerups that you can encounter along the way",
    "that can do good (or bad)!",
    "",
    "But watch out, there can be laser beams falling from",
    "the sky or bullets that come straight for you!",
    "",
    "Now what are you waiting for, PRESS PLAY!"
  ];

  // Add instructions text
  add([
    text(instructions.join("\n"), { 
      size: 24,
      lineSpacing: 8,
      width: width() - 100
    }),
    pos(width() / 2, 180),
    anchor("top"),
    color(255, 255, 255),
  ]);

  // Add back button
  const backBtn = add([
    text("BACK", { size: 32 }),
    pos(width() / 4, height() - 80),
    area(),
    anchor("center"),
    color(255, 100, 100),
  ]);

  // Add play button
  const playBtn = add([
    text("PLAY", { size: 32 }),
    pos(width() * 3/4, height() - 80),
    area(),
    anchor("center"),
    color(0, 255, 0),
  ]);

  // Handle mouse clicks
  mouseClick(() => {
    // Check if clicking on back button
    if (mousePos().x > backBtn.pos.x - 50 && 
        mousePos().x < backBtn.pos.x + 50 &&
        mousePos().y > backBtn.pos.y - 20 && 
        mousePos().y < backBtn.pos.y + 20) {
      go("menu");
    }

    // Check if clicking on play button
    if (mousePos().x > playBtn.pos.x - 50 && 
        mousePos().x < playBtn.pos.x + 50 &&
        mousePos().y > playBtn.pos.y - 20 && 
        mousePos().y < playBtn.pos.y + 20) {
      go("game");
    }
  });

  // Button hover effects
  action(() => {
    // Back button hover effect
    if (mousePos().x > backBtn.pos.x - 50 && 
        mousePos().x < backBtn.pos.x + 50 &&
        mousePos().y > backBtn.pos.y - 20 && 
        mousePos().y < backBtn.pos.y + 20) {
      backBtn.scale = vec2(1.1);
    } else {
      backBtn.scale = vec2(1);
    }

    // Play button hover effect
    if (mousePos().x > playBtn.pos.x - 50 && 
        mousePos().x < playBtn.pos.x + 50 &&
        mousePos().y > playBtn.pos.y - 20 && 
        mousePos().y < playBtn.pos.y + 20) {
      playBtn.scale = vec2(1.1);
    } else {
      playBtn.scale = vec2(1);
    }
  });

  // Keyboard controls
  keyPress("escape", () => {
    go("menu");
  });

  keyPress("space", () => {
    go("game");
  });
});

// Main game scene
scene("game", () => {
  let score = 0;
  let gameSpeed = 160; // Initial speed
  let baseSpeed = 160; // Store base speed for power-ups
  let laserThreshold = rand(20, 35);
  let lasersActive = false;
  let laserDuration = 25; // Initial duration in seconds
  let breakDuration = 20; // Break duration in seconds
  let bulletThreshold = rand(35, 55);
  let bulletsActive = false;
  let immunityHits = 0;
  let activeEffects = {}; // Track active power-ups
  let scoreMultiplier = 1; // Initialize score multiplier

  // Create power-up message display with initial empty text
  let powerUpMessage = add([
    text("", { size: 36 }),
    pos(width() / 2, 80),
    anchor("center"),
    color(255, 255, 0), // Yellow color for visibility
    z(100) // Ensure it's on top of other elements
  ]);

  // Make it initially invisible by setting opacity to 0
  powerUpMessage.opacity = 0;

  // Function to display power-up message
  function showPowerUpMessage(message, isPersistent = false) {
    // Set the message
    powerUpMessage.text = message;

    // Make it visible
    powerUpMessage.opacity = 1;

    // For non-persistent messages, hide after 2 seconds
    if (!isPersistent) {
      wait(2, () => {
        // Only clear if it's still showing this message
        if (powerUpMessage.text === message) {
          powerUpMessage.opacity = 0;
        }
      });
    }
  }

  // Function to hide power-up message
  function hidePowerUpMessage() {
    powerUpMessage.opacity = 0;
    powerUpMessage.text = "";
  }

  // Immunity message function
  function updateImmunityMessage() {
    if (immunityHits > 0) {
      showPowerUpMessage(`IMMUNITY x${immunityHits}`, true);
      activeEffects["immunity"] = true;
    } else {
      if (activeEffects["immunity"]) {
        delete activeEffects["immunity"];

        // Only hide message if no other effects are active
        if (Object.keys(activeEffects).length === 0) {
          hidePowerUpMessage();
        }
      }
    }
  }

  // Power-up system
  function spawnPowerUp() {
    if (!player.exists()) return;

    const powerUps = [
      { name: "quarterSpeed", chance: 0.25, duration: 15 },
      { name: "halfSpeed", chance: 0.25, duration: 10 },
      { name: "immunity", chance: 0.10, duration: 0 },
      { name: "doubleSpeed", chance: 0.25, duration: 7 },
      { name: "spawnLasers", chance: 0.23, duration: 5 },
      { name: "spawnBullets", chance: 0.23, duration: 5 },
      { name: "doubleScore", chance: 0.10, duration: 10 },
      { name: "tripleScore", chance: 0.05, duration: 10 },
    ];

    const powerUpBox = add([
        sprite("box"),
        pos(width(), rand(50, height() - 100)),
        area(),
        "powerup",
        { type: choose(powerUps) },
        move(LEFT, gameSpeed * 2.2),
        { moveDir: rand(-1, 1) },
        {
          update() {
        powerUpBox.move(0, powerUpBox.moveDir * 2);
        if (powerUpBox.pos.y < 50 || powerUpBox.pos.y > height() - 100) {
          powerUpBox.moveDir *= -1;
        }
      }
      }]);


    wait(rand(40, 65), spawnPowerUp);
  }

  function activatePowerUp(type) {
      let message = "";

      // Debug log to confirm activation
      console.log("Activating power-up: " + type.name);

      switch(type.name) {
        case "quarterSpeed":
          message = "QUARTER SPEED!";
          const quarterSpeed = gameSpeed * 0.25;
          gameSpeed = quarterSpeed;
          activeEffects["quarterSpeed"] = true;
          showPowerUpMessage(message);

          wait(type.duration, () => {
            gameSpeed = gameSpeed / 0.25;
            delete activeEffects["quarterSpeed"];

            // Only hide message if no other effects are active
            if (Object.keys(activeEffects).length === 0) {
              hidePowerUpMessage();
            } else if (immunityHits > 0) {
              updateImmunityMessage(); // Switch back to showing immunity
            }
          });
          break;

        case "halfSpeed":
          message = "HALF SPEED!";
          const halfSpeed = gameSpeed * 0.5;
          gameSpeed = halfSpeed;
          activeEffects["halfSpeed"] = true;
          showPowerUpMessage(message);

          wait(type.duration, () => {
            gameSpeed = gameSpeed / 0.5;
            delete activeEffects["halfSpeed"];

            // Only hide message if no other effects are active
            if (Object.keys(activeEffects).length === 0) {
              hidePowerUpMessage();
            } else if (immunityHits > 0) {
              updateImmunityMessage(); // Switch back to showing immunity
            }
          });
          break;

        case "immunity":
          immunityHits = 2;
          activeEffects["immunity"] = true;
          updateImmunityMessage();
          break;

        case "doubleSpeed":
          message = "DOUBLE SPEED!";
          const doubleSpeed = gameSpeed * 2;
          gameSpeed = doubleSpeed;
          activeEffects["doubleSpeed"] = true;
          showPowerUpMessage(message);

          wait(type.duration, () => {
            gameSpeed = gameSpeed / 2;
            delete activeEffects["doubleSpeed"];

            // Only hide message if no other effects are active
            if (Object.keys(activeEffects).length === 0) {
              hidePowerUpMessage();
            } else if (immunityHits > 0) {
              updateImmunityMessage(); // Switch back to showing immunity
            }
          });
          break;

        case "spawnLasers":
          message = "LASERS ACTIVE!";
          lasersActive = true;
          activeEffects["lasers"] = true;
          showPowerUpMessage(message);
          // Immediately start spawning lasers
          spawnLaser();

          wait(type.duration, () => {
            lasersActive = false;
            delete activeEffects["lasers"];

            // Only hide message if no other effects are active
            if (Object.keys(activeEffects).length === 0) {
              hidePowerUpMessage();
            } else if (immunityHits > 0) {
              updateImmunityMessage(); // Switch back to showing immunity
            }
          });
          break;

        case "spawnBullets":
          message = "BULLETS ACTIVE!";
          bulletsActive = true;
          activeEffects["bullets"] = true;
          showPowerUpMessage(message);
          // Immediately start spawning bullets
          spawnBullet();

          wait(type.duration, () => {
            bulletsActive = false;
            delete activeEffects["bullets"];

            // Only hide message if no other effects are active
            if (Object.keys(activeEffects).length === 0) {
              hidePowerUpMessage();
            } else if (immunityHits > 0) {
              updateImmunityMessage(); // Switch back to showing immunity
            }
          });
          break;

        case "doubleScore":
          message = "DOUBLE SCORE!";
          scoreMultiplier = 2;
          activeEffects["doubleScore"] = true;
          showPowerUpMessage(message);

          wait(type.duration, () => {
            scoreMultiplier = 1;
            delete activeEffects["doubleScore"];

            // Only hide message if no other effects are active
            if (Object.keys(activeEffects).length === 0) {
              hidePowerUpMessage();
            } else if (immunityHits > 0) {
              updateImmunityMessage(); // Switch back to showing immunity
            }
          });
          break;

        case "tripleScore":
          message = "TRIPLE SCORE!";
          scoreMultiplier = 3;
          activeEffects["tripleScore"] = true;
          showPowerUpMessage(message);

          wait(type.duration, () => {
            scoreMultiplier = 1;
            delete activeEffects["tripleScore"];

            // Only hide message if no other effects are active
            if (Object.keys(activeEffects).length === 0) {
              hidePowerUpMessage();
            } else if (immunityHits > 0) {
              updateImmunityMessage(); // Switch back to showing immunity
            }
          });
          break;
      }
    }

  // Function to calculate pipe gap based on score
  function getPipeGap() {
    const baseGap = 245; // Start with a wider gap
    const minGap = 132; // Don't let it get too narrow
    const reductionRate = 5; // How much to reduce per point
    const currentGap = Math.max(baseGap - (score * reductionRate), minGap);
    const variance = 33; // Small variance for randomness
    return currentGap + rand(-variance, variance);
  }

  add([
    sprite("bg", {width: width(), height: height()})
  ]);

  const scoreText = add([
    text(score, {size: 50})
  ]);

  // add a game object to screen
  const player = add([
    // list of components
    sprite("birdy"),
    scale(2),
    pos(80, 40),
    area(),
    body(),
  ]);

  function producePipes(){
    const offset = rand(-50, 50);
    const currentGap = getPipeGap();

    add([
      sprite("pipe"),
      pos(width(), height()/2 + offset + currentGap/2),
      "pipe",
      area(),
      {passed: false}
    ]);

    add([
      sprite("pipe", {flipY: true}),
      pos(width(), height()/2 + offset - currentGap/2),
      anchor("botleft"),
      "pipe",
      area()
    ]);
  }

  loop(1.5, () => {
    producePipes();
  });

  // Start spawning power-ups
  wait(5, spawnPowerUp);

  action("pipe", (pipe) => {
    pipe.move(-gameSpeed, 0);

    if (pipe.passed === false && pipe.pos.x < player.pos.x) {
      pipe.passed = true;
      // Apply score multiplier when increasing score
      score += 1 * scoreMultiplier;
      scoreText.text = score;
      gameSpeed += 9; // Increase speed with each point
      play("point");

      // Only trigger based on score if not already active via power-up
      if (score >= bulletThreshold && !bulletsActive) {
        bulletsActive = true;
        spawnBullet();
      }

      // Only trigger based on score if not already active via power-up
      if (score >= laserThreshold && !lasersActive) {
        lasersActive = true;
        spawnLaser();

        // Set timer to deactivate lasers
        wait(laserDuration, () => {
          lasersActive = false;

          // Wait break duration then restart with increased duration
          wait(breakDuration, () => {
            laserDuration += rand(10, 30); // Increase duration
            lasersActive = true;
            spawnLaser();
          });
        });
      }
    }
  });

  function spawnLaser() {
    if (!lasersActive) return;

    add([
      sprite("LAZAR"),
      pos(rand(0, width()), 0),
      area(),
      "laser",
      move(DOWN, 400),
    ]);

    wait(rand(1, 3), spawnLaser);
  }

  function spawnBullet() {
    if (!bulletsActive) return;

    add([
      sprite("burdy"),
      pos(width(), rand(50, height() - 50)),
      area(),
      "bullet",
      move(LEFT, 3000),
    ]);

    wait(rand(1.5, 4), spawnBullet);
  }

  player.collides("bullet", () => {
    if (immunityHits > 0) {
      immunityHits--;
      updateImmunityMessage();
      return;
    }
    play("hit");
    go("gameover", score);
  });

  player.collides("laser", () => {
    if (immunityHits > 0) {
      immunityHits--;
      updateImmunityMessage();
      return;
    }
    play("hit");
    go("gameover", score);
  });

  player.collides("pipe", () => {
    if (immunityHits > 0) {
      immunityHits--;
      updateImmunityMessage();
      return;
    }
    play("hit");
    go("gameover", score);
  });

  player.collides("powerup", (p) => {
    // First destroy the power-up to prevent multiple collisions
    const powerupType = p.type;
    destroy(p);

    // Then activate the power-up and play sound
    activatePowerUp(powerupType);
    play("point");

    // Debug confirmation
    console.log("Collected power-up!");
  });

  player.action(() => {
    if (player.pos.y > height() + 30 || player.pos.y < -30) {
      go("gameover", score);
    }
  });

  keyPress("space", () => {
    play("wooosh");
    player.jump(310);
  });
});

scene("gameover", (score) => {
  if (score > highScore) {
    highScore = score;
  }

  add([
    sprite("bg", {width: width(), height: height()})
  ]);

  add([
    text(
      "GAME OVER!\n\n"
      + "SCORE: " + score + "\n"
      + "HIGH SCORE: " + highScore + "\n\n"
      + "Press SPACE to try again\n"
      + "Press ESC for menu",
      {
        size: 35,
        width: width() - 100,
        align: "center"
      }
    ),
    pos(width()/2, height()/2),
    anchor("center"),
    color(255, 255, 255)
  ]);

  // Menu button
  const menuBtn = add([
    text("MENU", { size: 28 }),
    pos(width() / 4, height() - 80),
    anchor("center"),
    color(255, 100, 100),
  ]);

  // Retry button
  const retryBtn = add([
    text("TRY AGAIN", { size: 28 }),
    pos(width() * 3/4, height() - 80),
    anchor("center"),
    color(0, 255, 0),
  ]);

  // Handle mouse clicks
  mouseClick(() => {
    // Check if clicking on menu button
    if (mousePos().x > menuBtn.pos.x - 50 && 
        mousePos().x < menuBtn.pos.x + 50 &&
        mousePos().y > menuBtn.pos.y - 20 && 
        mousePos().y < menuBtn.pos.y + 20) {
      go("menu");
    }

    // Check if clicking on retry button
    if (mousePos().x > retryBtn.pos.x - 75 && 
        mousePos().x < retryBtn.pos.x + 75 &&
        mousePos().y > retryBtn.pos.y - 20 && 
        mousePos().y < retryBtn.pos.y + 20) {
      go("game");
    }
  });

  // Button hover effects
  action(() => {
    // Menu button hover effect
    if (mousePos().x > menuBtn.pos.x - 50 && 
        mousePos().x < menuBtn.pos.x + 50 &&
        mousePos().y > menuBtn.pos.y - 20 && 
        mousePos().y < menuBtn.pos.y + 20) {
      menuBtn.scale = vec2(1.1);
    } else {
      menuBtn.scale = vec2(1);
    }

    // Retry button hover effect
    if (mousePos().x > retryBtn.pos.x - 75 && 
        mousePos().x < retryBtn.pos.x + 75 &&
        mousePos().y > retryBtn.pos.y - 20 && 
        mousePos().y < retryBtn.pos.y + 20) {
      retryBtn.scale = vec2(1.1);
    } else {
      retryBtn.scale = vec2(1);
    }
  });

  keyPress("space", () => {
    go("game");
  });

  keyPress("escape", () => {
    go("menu");
  });
});

// Start with the menu scene instead of going directly to game
go("menu");
