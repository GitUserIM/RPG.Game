let menu = document.querySelector('.inventory-menu')
let restartGame = document.querySelector('.restart-game')

var isMenuVisible = false;

let player = {
    Health: document.querySelector('#player-health'),
    Power: document.querySelector('#player-power'),
    Defence: document.querySelector('#player-defence'),
    Damage: document.querySelector('#player-delta'),
    BuffDef: 1.5,
    isDefending: false,
    actions: {
        Attack: document.querySelector('#player-attack'),
        Defend: document.querySelector('#player-defend'),
        Inventory: document.querySelector('#player-inventory')
    },
    Inventory: [
        HfPotion = 10,
        DefPotion = 2,
        PowPotion = 3
    ],
}

let boss = {
    Health: document.querySelector('#boss-health'),
    Power: document.querySelector('#boss-power'),
    Defence: document.querySelector('#boss-defence'),
    Damage: document.querySelector('#boss-delta'),
    BuffDef: 2.5,
    Inventory: [
        HfPotion = 10,
        DefPotion = 2,
        PowPotion = 3
    ],
}

document.querySelector('#hf').innerHTML = player.Inventory[0]
document.querySelector('#def').innerHTML = player.Inventory[1]
document.querySelector('#pow').innerHTML = player.Inventory[2]

function initGame() {
    player.Health.innerHTML = 100
    player.Power.innerHTML = 5
    player.Defence.innerHTML = 1.5

    boss.Health.innerHTML = 500
    boss.Power.innerHTML = 10
    boss.Defence.innerHTML = 3;

    restartGame.innerHTML = ""
}

initGame();

player.actions.Attack.addEventListener('click', _ => {
    lowerShield(player);

    if (parseFloat(boss.Defence.innerHTML) < parseFloat(player.Power.innerHTML)) {
        deltaHealth = parseFloat(player.Power.innerHTML - boss.Defence.innerHTML);
        boss.Health.innerHTML -= deltaHealth
        boss.Damage.innerHTML = `-${deltaHealth}`

        boss.Damage.classList.remove('fade-out')
        setTimeout(_ => boss.Damage.classList.add('fade-out'), 1)
    } else {
        boss.Damage.innerHTML = null
    }

    bossAction(searchValidNumber())
})

player.actions.Defend.addEventListener('click', _ => {
    riseShield(player);

    bossAction(searchValidNumber())
})

player.actions.Inventory.addEventListener('click', _ => {
    if (!isMenuVisible) {
        menu.style.left = 0;
        isMenuVisible = true
        player.actions.Attack.style.textDecoration = "line-through"
        player.actions.Defend.style.textDecoration = "line-through"
        return
    }
    menu.style.left = '-100%'
    isMenuVisible = false
    player.actions.Attack.style.textDecoration = ""
    player.actions.Defend.style.textDecoration = ""
})

let bossAction = (bossMove) => {
    switch (bossMove) {
        case '1'://Attack
            lowerShield(boss)
            if (parseFloat(player.Defence.innerHTML) < parseFloat(boss.Power.innerHTML)) {
                let deltaHealth = parseFloat(boss.Power.innerHTML - player.Defence.innerHTML);
                player.Health.innerHTML -= deltaHealth
                player.Damage.innerHTML = `-${deltaHealth}`

                player.Damage.classList.remove('fade-out')
                setTimeout(_ => player.Damage.classList.add('fade-out'), 1)
            } else {
                player.Damage.innerHTML = null
            }
            break;
        case '2'://Defend
            riseShield(boss)
            break;
        case '3'://Use Item
            useItem(boss, searchValidNumber() - 1)
            break;
    }

    if (player.Health.innerHTML <= 0) {
        alert('Game over')
        restartGame.innerHTML = `<button onclick="initGame()">RESTART</button>`
    } else if (boss.Health.innerHTML <= 0) {
        alert('You won!')
        restartGame.innerHTML = `<button onclick="initGame()">RESTART</button>`
    }
}

let lowerShield = (entity) => {
    if (entity.isDefending) {
        entity.Defence.innerHTML = parseFloat(entity.Defence.innerHTML) - entity.BuffDef
        entity.isDefending = false
    }
}

let riseShield = (entity) => {
    if (!entity.isDefending) {
        entity.Defence.innerHTML = parseFloat(entity.Defence.innerHTML) + entity.BuffDef
        entity.isDefending = true;
    }
}

let useItem = (entity, index) => {
    if (entity === null) entity = player;
    switch (index) {
        case 0:
            entity.Health.innerHTML = parseFloat(entity.Health.innerHTML) + entity.Inventory[index]
            break;
        case 1:
            entity.Defence.innerHTML = parseFloat(entity.Defence.innerHTML) + entity.Inventory[index]
            break;
        case 2:
            entity.Power.innerHTML = parseFloat(entity.Power.innerHTML) + entity.Inventory[index]
            break;
    }
    if (isMenuVisible) bossAction(searchValidNumber())
}

let searchValidNumber = _ => {
    random = null
    while (random === null) {
        random = Math.random().toFixed(1).charAt(2)

        for (let i = 1; i <= boss.Inventory.length; i++) {
            if (random == i) return random;
        }
        random = null;
    }
}
