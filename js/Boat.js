class Boat {
  constructor(x, y, width, height, boatPos) {
  
    this.body = Bodies.rectangle(x, y, width, height);
    this.width = width;
    this.height = height;
    this.boatPosition = boatPos;
    this.image = loadImage("assets/boat.png");

    World.add(world, this.body);
  }

  // 06) mét remove (recebe indice do navio como parametro)
  remove(i) {
    // 07) setTimeout(callback, tempo em millisec)
    setTimeout(() => {
      Matter.World.remove(world, boats[i].body);
      delete boats[i];
    } , 2000);

      // 08) WORLD.remove removendo o corpo NAVIO do mundo


      // 09) deletando o NAVIO da lista -> delete boats[index]
    

    // 10) EM SKETCH ->
  }

  display() {
    var angle = this.body.angle;
    var pos = this.body.position;

    push();
    translate(pos.x, pos.y);
    rotate(angle);
    imageMode(CENTER);
    image(this.image, 0, this.boatPosition, this.width, this.height);
    pop();
  }
}








