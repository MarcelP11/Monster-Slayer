function getRandomValue(min, max){
    return Math.floor(Math.random() * (max - min)) + min; //formula to get number between min and max
}

const app = Vue.createApp({
    data() {
        return{
            playerHealth: 100,
            monsterHealth: 100,
            currentRound: 0,
            winner: null  //default falsey value used for v-if
        };
    },
    computed: {
        monsterBarStyles(){
            if(this.monsterHealth < 0){  //condition when health is under 0 to set it to empty bar
                return {width: "0%"};
            }
            return {width: this.monsterHealth + "%"};  //this computed properties is used to avoid to have CSS expression in HTML code
        },
        playerBarStyles(){
            if(this.playerHealth < 0){
                return {width: "0%"};
            }
            return {width: this.playerHealth + "%"};  
        },
        mayUseSpecialAttack(){
            return this.currentRound % 3 !== 0;  //only every third round can be used special attack
        }
    },
    watch: {
        playerHealth(value){
            if(value <= 0 && this.monsterHealth <= 0){
                this.winner = "draw";
            } else if(value <= 0){
                this.winner = "monster";
            }
        },
        monsterHealth(value){
            if(value <= 0 && this.playerHealth <= 0){
                this.winner = "draw";
            } else if(value <= 0){
                this.winner = "player";
            }
        }
    },
    methods: {
        startNewGame(){
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.currentRound = 0;
            this.winner = null;
        },
        attackMonster(){
            this.currentRound++;
            const attackValue = getRandomValue(5, 12);
            this.monsterHealth -= attackValue;
            this.attackPlayer();  //once the player attacks monster then the monster also attacks player at the same time
        },
        attackPlayer(){
            const attackValue = getRandomValue(8, 15);  //monster have more power of attack in compare with player
            this.playerHealth -= attackValue;
        },
        specialAttackMonster(){
            this.currentRound++;
            const attackValue = getRandomValue(10, 25);  //more powerfull attack
            this.monsterHealth -= attackValue;
            this.attackPlayer();
        },
        healPlayer(){
            this.currentRound++;
            const healValue = getRandomValue(8, 20);
            if((this.playerHealth + healValue) > 100){
                this.playerHealth = 100;
            } else {
                this.playerHealth += healValue;
            }
            this.attackPlayer();
        }
    }
});

app.mount("#game");