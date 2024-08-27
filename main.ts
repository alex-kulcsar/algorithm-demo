namespace SpriteKind {
    export const P1Steps = SpriteKind.create()
}
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    player1algo.push(assets.image`upArrow`)
    showP1Algo()
})
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    player1algo.pop()
    showP1Algo()
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    game.gameOver(checkP1Algo())
})
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    player1algo.push(assets.image`leftArrow`)
    showP1Algo()
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
function printPattern (list: Image[]) {
    currX = 80
    currY = 100
    mySprite = sprites.create(assets.image`player`, SpriteKind.Player)
    mySprite.setPosition(currX, currY)
    for (let value of list) {
        if (value.equals(assets.image`upArrow`)) {
            currY += -20
        } else if (value.equals(assets.image`leftArrow`)) {
            currX += -20
        } else {
            currX += 20
        }
        mySprite = sprites.create(assets.image`step`, SpriteKind.Player)
        mySprite.setPosition(currX, currY)
    }
}
function showP1Algo () {
    sprites.destroyAllSpritesOfKind(SpriteKind.P1Steps)
    p1x = 8
    p1y = 20
    for (let value of player1algo) {
        p1algoSprite = sprites.create(value, SpriteKind.P1Steps)
        p1algoSprite.setPosition(p1x, p1y)
        p1x += 20
    }
}
let p1algoSprite: Sprite = null
let p1y = 0
let p1x = 0
let mySprite: Sprite = null
let currY = 0
let currX = 0
let player1algo: Image[] = []
let pattern: Image[] = []
game.showLongText("Use up, left, and right to create an algorithm for your player!\\n \\nPress A to check it.\\n \\nPress B if to erase the last step.", DialogLayout.Full)
pattern = [
assets.image`upArrow`,
assets.image`upArrow`,
assets.image`leftArrow`,
assets.image`rightArrow`,
assets.image`rightArrow`,
assets.image`rightArrow`
]
printPattern(pattern)
player1algo = []
