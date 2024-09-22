namespace SpriteKind {
    export const P1Steps = SpriteKind.create()
    export const P2Steps = SpriteKind.create()
    export const P3Steps = SpriteKind.create()
    export const P4Steps = SpriteKind.create()
}
controller.player4.onButtonEvent(ControllerButton.Up, ControllerButtonEvent.Pressed, function () {
    agility.addPlayerStep(4, assets.image`upArrowSmall`)
})
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    agility.addPlayerStep(1, assets.image`upArrowSmall`)
})
controller.player3.onButtonEvent(ControllerButton.B, ControllerButtonEvent.Pressed, function () {
    agility.deletePlayerStep(3)
})
controller.player2.onButtonEvent(ControllerButton.B, ControllerButtonEvent.Pressed, function () {
    agility.deletePlayerStep(2)
})
controller.player4.onButtonEvent(ControllerButton.B, ControllerButtonEvent.Pressed, function () {
    agility.deletePlayerStep(4)
})
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    agility.deletePlayerStep(1)
})
controller.player2.onButtonEvent(ControllerButton.A, ControllerButtonEvent.Pressed, function () {
    if (agility.checkPlayerAlgo(2)) {
        info.player2.changeScoreBy(agility.getScore())
        agility.runCourse()
        game.splash("Good work, Player 2!")
        startNewRound()
    } else {
        music.play(music.melodyPlayable(music.buzzer), music.PlaybackMode.InBackground)
    }
})
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    agility.addPlayerStep(1, assets.image`leftArrowSmall`)
})
controller.player3.onButtonEvent(ControllerButton.Right, ControllerButtonEvent.Pressed, function () {
    agility.addPlayerStep(3, assets.image`rightArrowSmall`)
})
controller.player2.onButtonEvent(ControllerButton.Up, ControllerButtonEvent.Pressed, function () {
    agility.addPlayerStep(2, assets.image`upArrowSmall`)
})
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    agility.addPlayerStep(1, assets.image`rightArrowSmall`)
})
controller.player2.onButtonEvent(ControllerButton.Right, ControllerButtonEvent.Pressed, function () {
    agility.addPlayerStep(2, assets.image`rightArrowSmall`)
})
function startNewRound () {
    if (agility.getCurrRound() == agility.numCourses()) {
        game.gameOver(true)
    } else {
        agility.startNewRound()
    }
}
controller.player4.onButtonEvent(ControllerButton.A, ControllerButtonEvent.Pressed, function () {
    if (agility.checkPlayerAlgo(4)) {
        info.player4.changeScoreBy(agility.getScore())
        agility.runCourse()
        game.splash("Good work, Player 4!")
        startNewRound()
    } else {
        music.play(music.melodyPlayable(music.buzzer), music.PlaybackMode.InBackground)
    }
})
controller.player2.onButtonEvent(ControllerButton.Left, ControllerButtonEvent.Pressed, function () {
    agility.addPlayerStep(2, assets.image`leftArrowSmall`)
})
controller.player1.onButtonEvent(ControllerButton.A, ControllerButtonEvent.Pressed, function () {
    if (agility.checkPlayerAlgo(1)) {
        info.player1.changeScoreBy(agility.getScore())
        agility.runCourse()
        game.splash("Good work, Player 1!")
        startNewRound()
    } else {
        music.play(music.melodyPlayable(music.buzzer), music.PlaybackMode.InBackground)
    }
})
controller.player4.onButtonEvent(ControllerButton.Left, ControllerButtonEvent.Pressed, function () {
    agility.addPlayerStep(4, assets.image`leftArrowSmall`)
})
controller.player3.onButtonEvent(ControllerButton.A, ControllerButtonEvent.Pressed, function () {
    if (agility.checkPlayerAlgo(3)) {
        info.player3.changeScoreBy(agility.getScore())
        agility.runCourse()
        game.splash("Good work, Player 3!")
        startNewRound()
    } else {
        music.play(music.melodyPlayable(music.buzzer), music.PlaybackMode.InBackground)
    }
})
controller.player4.onButtonEvent(ControllerButton.Right, ControllerButtonEvent.Pressed, function () {
    agility.addPlayerStep(4, assets.image`rightArrowSmall`)
})
controller.player3.onButtonEvent(ControllerButton.Left, ControllerButtonEvent.Pressed, function () {
    agility.addPlayerStep(3, assets.image`leftArrowSmall`)
})
controller.player3.onButtonEvent(ControllerButton.Up, ControllerButtonEvent.Pressed, function () {
    agility.addPlayerStep(3, assets.image`upArrowSmall`)
})
let tile = 0
let ROUNDS = 3
let pattern: Image[] = []
for (let index = 0; index < ROUNDS; index++) {
    pattern = []
    for (let index = 0; index < 6; index++) {
        tile = randint(0, 2)
        if (tile == 0) {
            pattern.push(assets.image`upArrowSmall`)
        } else if (tile == 1) {
            pattern.push(assets.image`leftArrowSmall`)
        } else {
            pattern.push(assets.image`rightArrowSmall`)
        }
    }
    agility.addCourse("Random #" + agility.numCourses(), pattern)
}
scene.setBackgroundColor(7)
game.showLongText("Use up, left, and right to create an algorithm that matches the course!\\n \\nPress A to check it.\\n \\nPress B to erase the last step.", DialogLayout.Full)
let fbPlayer = sprites.create(assets.image`player`, SpriteKind.Player)
agility.setPlayerSprite(fbPlayer)
info.player1.setScore(0)
info.player2.setScore(0)
info.player3.setScore(0)
info.player4.setScore(0)
info.player1.setLife(3)
info.player2.setLife(3)
info.player3.setLife(3)
info.player4.setLife(3)
agility.startNewRound()
