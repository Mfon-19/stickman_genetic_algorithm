class DNA {
  constructor() {
    this.stickman = {
      head: { x: this.random(), y: this.random(), radius: this.random() },
      torso: {
        x1: this.random(),
        y1: this.random(),
        x2: this.random(),
        y2: this.random(),
      },
      left_hand: {
        x1: this.random(),
        y1: this.random(),
        x2: this.random(),
        y2: this.random(),
      },
      right_hand: {
        x1: this.random(),
        y1: this.random(),
        x2: this.random(),
        y2: this.random(),
      },
      left_leg: {
        x1: this.random(),
        y1: this.random(),
        x2: this.random(),
        y2: this.random(),
      },
      right_leg: {
        x1: this.random(),
        y1: this.random(),
        x2: this.random(),
        y2: this.random(),
      },
    };
    this.fitness = 0;
  }

  random() {
    return Math.floor(Math.random() * (300 - 0 + 1) + 0);
  }

  calcFitness(target) {
    let sum = 0;
    // Calculate the difference between this stickman and target stickman
    Object.entries(this.stickman).forEach(([key, part]) => {
      if (key === "head") {
        // For head, compare x, y and radius
        sum += Math.abs(part.x - target.head.x);
        sum += Math.abs(part.y - target.head.y);
        sum += Math.abs(part.radius - target.head.radius);
      } else {
        // For other body parts (arms, legs, body), compare all coordinates
        sum += Math.abs(part.x1 - target[key].x1);
        sum += Math.abs(part.y1 - target[key].y1);
        sum += Math.abs(part.x2 - target[key].x2);
        sum += Math.abs(part.y2 - target[key].y2);
      }
    });

    // Convert the sum of differences to a fitness value between 0 and 1
    // The smaller the difference, the closer to 1 the fitness will be
    this.fitnessValue = 1 / (1 + sum); // Adding 1 to avoid division by zero
    return this.fitnessValue;
  }

  crossover(partner) {
    // Create a new DNA instance for the child
    let child = new DNA();

    Object.entries(this.stickman).forEach(([key, part]) => {
      // 50% chance of choosing either parent
      const rand = Math.floor(Math.random() * 100) + 1;

      if (key === "head") {
        // Handle head separately since it has different properties
        child.stickman[key] = {
          x: rand < 50 ? part.x : partner.stickman[key].x,
          y: rand < 50 ? part.y : partner.stickman[key].y,
          radius: rand < 50 ? part.radius : partner.stickman[key].radius,
        };
      } else {
        // Handle body parts with x1, y1, x2, y2 properties
        child.stickman[key] = {
          x1: rand < 50 ? part.x1 : partner.stickman[key].x1,
          y1: rand < 50 ? part.y1 : partner.stickman[key].y1,
          x2: rand < 50 ? part.x2 : partner.stickman[key].x2,
          y2: rand < 50 ? part.y2 : partner.stickman[key].y2,
        };
      }
    });

    return child;
  }

  getStickman() {
    return this.stickman;
  }

  mutate(mutationRate) {
    Object.entries(this.stickman).forEach(([key, part]) => {
      if (key === "head") {
        // Mutate head properties
        if (Math.random() < mutationRate) part.x = this.random();
        if (Math.random() < mutationRate) part.y = this.random();
        if (Math.random() < mutationRate) part.radius = this.random();
      } else {
        // Mutate body part coordinates
        if (Math.random() < mutationRate) part.x1 = this.random();
        if (Math.random() < mutationRate) part.y1 = this.random();
        if (Math.random() < mutationRate) part.x2 = this.random();
        if (Math.random() < mutationRate) part.y2 = this.random();
      }
    });
  }
}
