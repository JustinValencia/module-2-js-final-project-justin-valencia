import Bullet from "./Bullet.js";

export default class BulletController {
    bullets = [];
    timeTillNextBulletAllowed = 0;

    constructor(canvas, maxBulletsAtATime, bulletColor, soundEnabled) {
        this.canvas = canvas;
        this.maxBulletsAtATime = maxBulletsAtATime;
        this.bulletColor = bulletColor;
        this.soundEnabled = soundEnabled;

        this.shootSound = new Audio("sounds/shoot.wav")
        this.shootSound.volume = 0.1;
    }

    draw(ctx) {
        //we're filtering for only the bullets on the screen
        this.bullets = this.bullets.filter(bullet => bullet.y + bullet.width > 0 && bullet.y <= this.canvas.height);


        this.bullets.forEach((bullet) => bullet.draw(ctx));
        if (this.timeTillNextBulletAllowed > 0) {
            this.timeTillNextBulletAllowed--;
        }
    }

    collideWith(sprite) {
        // if a sprite collides with a bullet it will return the index
        const bulletThatHitsSpriteIndex = this.bullets.findIndex(bullet => bullet.collideWith(sprite));

        if (bulletThatHitsSpriteIndex >= 0) {
            this.bullets.splice(bulletThatHitsSpriteIndex, 1);
            return true;
        }

        return false;
    }

    shoot(x, y, velocity, timeTillNextBulletAllowed = 0) {
        //this decrements from some positive number until it hits 0
        if (this.timeTillNextBulletAllowed <= 0 && this.bullets.length < this.maxBulletsAtATime) {
            const bullet = new Bullet(this.canvas, x, y, velocity, this.bulletColor);
            this.bullets.push(bullet);
            if (this.soundEnabled) {
                this.shootSound.currentTime = 0;
                this.shootSound.play();
            }
            this.timeTillNextBulletAllowed = timeTillNextBulletAllowed;
        }
    }
}