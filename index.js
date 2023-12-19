let menu = document.querySelector('.inventory-menu')

var isMenuVisible = false;

let player = {
    Health: document.querySelector('#player-health'),
    Power: document.querySelector('#player-power'),
    Defence: document.querySelector('#player-defence'),
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

player.Health.innerHTML = 100
player.Power.innerHTML = 5
player.Defence.innerHTML = 1.5

boss.Health.innerHTML = 500
boss.Power.innerHTML = 10
boss.Defence.innerHTML = 3;


player.actions.Attack.addEventListener('click', _ => {
    lowerShield(player);

    if (parseFloat(boss.Defence.innerHTML) < parseFloat(player.Power.innerHTML))
        boss.Health.innerHTML -= parseFloat(player.Power.innerHTML - boss.Defence.innerHTML);

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
            if (parseFloat(player.Defence.innerHTML) < parseFloat(boss.Power.innerHTML))
                player.Health.innerHTML -= parseFloat(boss.Power.innerHTML - player.Defence.innerHTML);
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
    } else if (boss.Health.innerHTML <= 0) {
        alert('You won!')
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
            entity.Health.innerHTML = parseInt(entity.Health.innerHTML) + entity.Inventory[index]
            break;
        case 1:
            entity.Defence.innerHTML = parseInt(entity.Defence.innerHTML) + entity.Inventory[index]
            break;
        case 2:
            entity.Power.innerHTML = parseInt(entity.Power.innerHTML) + entity.Inventory[index]
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
