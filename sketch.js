const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world, backgroundImg;
var canvas, angle, tower, ground, cannon;
var balls = [];
var boats = [];

var score = 0;

function preload() {
  backgroundImg = loadImage("assets/background.gif");
  towerImage = loadImage("assets/tower.png");
}

function setup() {
  canvas = createCanvas(1200, 600);
  engine = Engine.create();
  world = engine.world;
  angleMode(DEGREES);
  angle = 15;


  ground = Bodies.rectangle(0, height - 1, width * 2, 1, { isStatic: true });
  World.add(world, ground);

  tower = Bodies.rectangle(160, 350, 160, 310, { isStatic: true });
  World.add(world, tower);

  cannon = new Cannon(180, 110, 130, 100, angle);
}

function draw() {
  background(189);
  image(backgroundImg, 0, 0, width, height);

  Engine.update(engine);

  push();
  translate(ground.position.x, ground.position.y);
  fill("brown");
  rectMode(CENTER);
  rect(0, 0, width * 2, 1);
  pop();

  push();
  translate(tower.position.x, tower.position.y);
  rotate(tower.angle);
  imageMode(CENTER);
  image(towerImage, 0, 0, 160, 310);
  pop();

  showBoats();

  for (var i = 0; i < balls.length; i++) {
    showCannonBalls(balls[i], i);

    // 13) chamar na func draw
    collisionWithBoat(i);
  }

  cannon.display();


}

// 01) func anaisa colisão entre TODAS balas e TODOS os navios
function collisionWithBoat(iBall) {
  // 02) for para acessar cada pos de boats
  for (var i = 0; i < boats.length; i++) {

    // 03) if para verificar se boats e balls não sao indef
    if (balls[iBall] !== undefined && boats[i] !== undefined) {

      // 04) cria var e guardar retorno da func Matter.SAT.collide(corpo1, corpo2);
      var collision = Matter.SAT.collides(balls[iBall].body, boats[i].body);

      // 05) if -> se collision.collided é true, remover navio
      if (collision.collided) {

        // 06) EM BOAT -> criar mét remove
        boats[i].remove(i);


        // 10) remover BALA do mundo
        Matter.World.remove(world, balls[iBall].body);

        // 11) deletando a BALA da lista
        delete balls[iBall];

        // 12) chamar na func draw
        // 13) ALUNO cria remove na classe das balas e as remove em showCannonballs
      }
    }
  }
}

function keyPressed() {
  if (keyCode === DOWN_ARROW) {
    var cannonBall = new CannonBall(cannon.x, cannon.y);
    cannonBall.trajectory = [];
    Matter.Body.setAngle(cannonBall.body, cannon.angle);
    balls.push(cannonBall);
  }
}

function showCannonBalls(ball, index) {
  if (ball) {
    ball.display();

    // 14) ALUNO - verificar pos X da bala >= largura da tela || posY é > height-50
    if (ball.body.position.x >= width || ball.body.position.y >= height - 50) {
      ball.remove(index);
    }
  }
}

function showBoats() {
  if (boats.length > 0) {
    if (
      boats[boats.length - 1] === undefined ||
      boats[boats.length - 1].body.position.x < width - 300
    ) {
      var positions = [-40, -60, -70, -20];
      var position = random(positions);
      var boat = new Boat(width, height - 100, 170, 170, position);

      boats.push(boat);
    }

    for (var i = 0; i < boats.length; i++) {
      if (boats[i]) {
        Matter.Body.setVelocity(boats[i].body, {x: -0.9, y: 0});
        boats[i].display();
      }
    }
  } else {
    var boat = new Boat(width, height - 60, 170, 170, -60);
    boats.push(boat);
  }
}

function keyReleased() {
  if (keyCode === DOWN_ARROW) {
    balls[balls.length - 1].shoot();
  }
}
