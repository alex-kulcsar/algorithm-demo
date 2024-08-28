namespace SpriteKind {
    export const P1Steps = SpriteKind.create()
    export const P2Steps = SpriteKind.create()
    export const P3Steps = SpriteKind.create()
    export const P4Steps = SpriteKind.create()
}
function showP2Algo () {
    sprites.destroyAllSpritesOfKind(SpriteKind.P2Steps)
    p2x = 156 - (player2algo.length - 1) * 8
    p2y = 14
    for (let value3 of player2algo) {
        p2algoSprite = sprites.create(value3, SpriteKind.P2Steps)
        p2algoSprite.setPosition(p2x, p2y)
        p2x += 8
    }
}
controller.player4.onButtonEvent(ControllerButton.Up, ControllerButtonEvent.Pressed, function () {
    player4algo.push(assets.image`upArrow`)
    showP4Algo()
})
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    player1algo.push(assets.image`upArrow`)
    showP1Algo()
})
controller.player3.onButtonEvent(ControllerButton.B, ControllerButtonEvent.Pressed, function () {
    player3algo.pop()
    showP3Algo()
})
controller.player2.onButtonEvent(ControllerButton.B, ControllerButtonEvent.Pressed, function () {
    player2algo.pop()
    showP2Algo()
})
function showP4Algo () {
    sprites.destroyAllSpritesOfKind(SpriteKind.P4Steps)
    p4x = 156 - (player4algo.length - 1) * 8
    p4y = 106
    for (let value5 of player4algo) {
        p4algoSprite = sprites.create(value5, SpriteKind.P4Steps)
        p4algoSprite.setPosition(p4x, p4y)
        p4x += 8
    }
}
controller.player4.onButtonEvent(ControllerButton.B, ControllerButtonEvent.Pressed, function () {
    player4algo.pop()
    showP4Algo()
})
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    player1algo.pop()
    showP1Algo()
})
function checkP4Algo () {
    if (player4algo.length != pattern.length) {
        return false
    }
    for (let index4 = 0; index4 <= pattern.length - 1; index4++) {
        if (!(player4algo[index4].equals(pattern[index4]))) {
            return false
        }
    }
    return true
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (checkP1Algo()) {
        runPattern()
        game.setGameOverMessage(true, "Player 1 Wins!")
        game.gameOver(true)
    } else {
        info.player1.changeLifeBy(-1)
        player1algo = []
        showP1Algo()
    }
})
controller.player2.onButtonEvent(ControllerButton.A, ControllerButtonEvent.Pressed, function () {
    if (checkP2Algo()) {
        game.setGameOverMessage(true, "Player 2 Wins!")
        game.gameOver(true)
    } else {
        info.player2.changeLifeBy(-1)
        player2algo = []
        showP2Algo()
    }
})
function showP3Algo () {
    sprites.destroyAllSpritesOfKind(SpriteKind.P3Steps)
    p3x = 4
    p3y = 106
    for (let value4 of player3algo) {
        p3algoSprite = sprites.create(value4, SpriteKind.P3Steps)
        p3algoSprite.setPosition(p3x, p3y)
        p3x += 8
    }
}
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    player1algo.push(assets.image`leftArrow`)
    showP1Algo()
})
controller.player3.onButtonEvent(ControllerButton.Right, ControllerButtonEvent.Pressed, function () {
    player3algo.push(assets.image`rightArrow`)
    showP3Algo()
})
controller.player2.onButtonEvent(ControllerButton.Up, ControllerButtonEvent.Pressed, function () {
    player2algo.push(assets.image`upArrow`)
    showP2Algo()
})
function checkP1Algo () {
    if (player1algo.length != pattern.length) {
        return false
    }
    for (let index = 0; index <= pattern.length - 1; index++) {
        if (!(player1algo[index].equals(pattern[index]))) {
            return false
        }
    }
    return true
}
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    player1algo.push(assets.image`rightArrow`)
    showP1Algo()
})
controller.player2.onButtonEvent(ControllerButton.Right, ControllerButtonEvent.Pressed, function () {
    player2algo.push(assets.image`rightArrow`)
    showP2Algo()
})
controller.player4.onButtonEvent(ControllerButton.A, ControllerButtonEvent.Pressed, function () {
    if (checkP4Algo()) {
        game.setGameOverMessage(true, "Player 4 Wins!")
        game.gameOver(true)
    } else {
        info.player4.changeLifeBy(-1)
        player4algo = []
        showP4Algo()
    }
})
controller.player2.onButtonEvent(ControllerButton.Left, ControllerButtonEvent.Pressed, function () {
    player2algo.push(assets.image`leftArrow`)
    showP2Algo()
})
controller.player4.onButtonEvent(ControllerButton.Left, ControllerButtonEvent.Pressed, function () {
    player4algo.push(assets.image`leftArrow`)
    showP4Algo()
})
function checkP3Algo () {
    if (player3algo.length != pattern.length) {
        return false
    }
    for (let index3 = 0; index3 <= pattern.length - 1; index3++) {
        if (!(player3algo[index3].equals(pattern[index3]))) {
            return false
        }
    }
    return true
}
controller.player3.onButtonEvent(ControllerButton.A, ControllerButtonEvent.Pressed, function () {
    if (checkP3Algo()) {
        game.setGameOverMessage(true, "Player 3 Wins!")
        game.gameOver(true)
    } else {
        info.player3.changeLifeBy(-1)
        player3algo = []
        showP3Algo()
    }
})
function runPattern () {
    patternSprite = sprites.createProjectileFromSprite(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, fbPlayer, 0, 0)
    patternSprite.z = -1
    fbPlayer.follow(patternSprite, 25)
    for (let value of pattern) {
        patternSprite.setImage(value)
        if (value.equals(assets.image`upArrow`)) {
            patternSprite.y += -20
        } else if (value.equals(assets.image`leftArrow`)) {
            patternSprite.x += -20
        } else {
            patternSprite.x += 20
        }
        pause(1000)
    }
}
function checkP2Algo () {
    if (player2algo.length != pattern.length) {
        return false
    }
    for (let index2 = 0; index2 <= pattern.length - 1; index2++) {
        if (!(player2algo[index2].equals(pattern[index2]))) {
            return false
        }
    }
    return true
}
function printPattern (list: Image[]) {
    currX = 80
    currY = 100
    fbPlayer = sprites.create(assets.image`player`, SpriteKind.Player)
    fbPlayer.setPosition(currX, currY)
    for (let value of list) {
        if (value.equals(assets.image`upArrow`)) {
            currY += -20
        } else if (value.equals(assets.image`leftArrow`)) {
            currX += -20
        } else {
            currX += 20
        }
        projectile = sprites.create(assets.image`step`, SpriteKind.Player)
        projectile.setPosition(currX, currY)
    }
}
function showP1Algo () {
    sprites.destroyAllSpritesOfKind(SpriteKind.P1Steps)
    p1x = 4
    p1y = 14
    for (let value2 of player1algo) {
        p1algoSprite = sprites.create(value2, SpriteKind.P1Steps)
        p1algoSprite.setPosition(p1x, p1y)
        p1x += 8
    }
}
controller.player4.onButtonEvent(ControllerButton.Right, ControllerButtonEvent.Pressed, function () {
    player4algo.push(assets.image`rightArrow`)
    showP4Algo()
})
controller.player3.onButtonEvent(ControllerButton.Left, ControllerButtonEvent.Pressed, function () {
    player3algo.push(assets.image`leftArrow`)
    showP3Algo()
})
controller.player3.onButtonEvent(ControllerButton.Up, ControllerButtonEvent.Pressed, function () {
    player3algo.push(assets.image`upArrow`)
    showP3Algo()
})
let p1algoSprite: Sprite = null
let p1y = 0
let p1x = 0
let projectile: Sprite = null
let currY = 0
let currX = 0
let fbPlayer: Sprite = null
let patternSprite: Sprite = null
let p3algoSprite: Sprite = null
let p3y = 0
let p3x = 0
let p4algoSprite: Sprite = null
let p4y = 0
let p4x = 0
let player3algo: Image[] = []
let player4algo: Image[] = []
let p2algoSprite: Sprite = null
let p2y = 0
let player2algo: Image[] = []
let p2x = 0
let player1algo: Image[] = []
let tile = 0
let pattern: Image[] = []
game.showLongText("Use up, left, and right to create an algorithm for your player!\\n \\nPress A to check it.\\n \\nPress B if to erase the last step.", DialogLayout.Full)
pattern = []
for (let index = 0; index < 6; index++) {
    tile = randint(0, 2)
    if (tile == 0) {
        pattern.push(assets.image`upArrow`)
    } else if (tile == 1) {
        pattern.push(assets.image`leftArrow`)
    } else {
        pattern.push(assets.image`rightArrow`)
    }
}
printPattern(pattern)
player1algo = []
info.player1.setLife(3)
info.player2.setLife(3)
info.player3.setLife(3)
info.player4.setLife(3)
