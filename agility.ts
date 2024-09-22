namespace SpriteKind {
    export const CourseSteps = SpriteKind.create()
    export const P1AlgoSteps = SpriteKind.create()
    export const P2AlgoSteps = SpriteKind.create()
    export const P3AlgoSteps = SpriteKind.create()
    export const P4AlgoSteps = SpriteKind.create()
    export const P1PriorAlgoSteps = SpriteKind.create()
    export const P2PriorAlgoSteps = SpriteKind.create()
    export const P3PriorAlgoSteps = SpriteKind.create()
    export const P4PriorAlgoSteps = SpriteKind.create()
}

//% color=#AF7817 icon="\uf2f2"
namespace agility {
    enum direction {
        up,
        left,
        right,
    }

    interface Course {
        name: string,
        steps: Direction[],
    }

    interface Direction {
        dir: direction,
        name: string,
        images: Image[],
    }

    interface Point {
        x: number,
        y: number,
    }

    const DIRECTIONS: Direction[] = []
    const RESET_SCREEN_KINDS: number[] = [
        SpriteKind.CourseSteps,
        SpriteKind.P1AlgoSteps,
        SpriteKind.P2AlgoSteps,
        SpriteKind.P3AlgoSteps,
        SpriteKind.P4AlgoSteps,
        SpriteKind.P1PriorAlgoSteps,
        SpriteKind.P2PriorAlgoSteps,
        SpriteKind.P3PriorAlgoSteps,
        SpriteKind.P4PriorAlgoSteps,
    ]
    let needsInit: boolean = true
    let courses: Course[] = []
    let courseOrder: number[] = []
    let currCourse: Course = null
    let currRound: number = -1
    let stepImg: Image = assets.image`step`
    let lastStepImg: Image = assets.image`cone`
    let missStepImg: Image = assets.image`missSmall`
    let stepSpriteDelta: number = 20
    let fbPlayer: Sprite = null
    let fbPlayerStart: Point = { x: 80, y: 100, }
    let playerAlgos: Image[][] = []
    let playerAlgoStarts: Point[] = [
        null,
        { x: 4, y: 14, },
        { x: 0, y: 14, },
        { x: 4, y: 106, },
        { x: 0, y: 106, },
    ]

    //% block="add course with name $name steps $course"
    export function addCourse(name: string, course: Image[]): void {
        if (needsInit) {
            init()
        }

        let newCourse: Course = {
            name: name,
            steps: []
        }
        for (let step of course) {
            let d: Direction = getDirectionForImage(step)
            if (d !== null) {
                newCourse.steps.push(d)
            }
        }
        if (newCourse.steps.length > 0) {
            courseOrder.push(courses.length)
            courses.push(newCourse)
        }
    }

    //% block
    //% img.shadow=screen_image_picker
    export function addImageLeft(img: Image): void {
        if (needsInit) {
            init()
        }
        DIRECTIONS[direction.left].images.push(img)
    }

    //% block
    //% img.shadow=screen_image_picker
    export function addImageRight(img: Image): void {
        if (needsInit) {
            init()
        }
        DIRECTIONS[direction.right].images.push(img)
    }

    //% block
    //% img.shadow=screen_image_picker
    export function addImageUp(img: Image): void {
        if (needsInit) {
            init()
        }
        DIRECTIONS[direction.up].images.push(img)
    }

    //% block="add step $img for player $player"
    //% img.shadow=screen_image_picker
    //% player.defl=1
    export function addPlayerStep(player: number, img: Image): void {
        if (player < 1 || player > 4 || img === null || img === undefined) {
            return
        }
        playerAlgos[player].push(img)
        showPlayerAlgo(1)
    }

    //% block="delete last step for player $player"
    //% player.defl=1
    export function deletePlayerStep(player: number): void {
        if (player < 1 || player > 4) {
            return
        }
        playerAlgos[player].pop()
        showPlayerAlgo(1)
    }

    //% block="draw current course"
    export function drawCourse(): void {
        if (needsInit) {
            init()
        }

        let currX: number = fbPlayerStart.x
        let currY: number = fbPlayerStart.y

        if (fbPlayer !== null) {
            fbPlayer.setPosition(currX, currY)
        }

        for (let step of currCourse.steps) {
            switch (step.dir) {
                case direction.up:
                    currY -= stepSpriteDelta
                    break

                case direction.left:
                    currX -= stepSpriteDelta
                    break

                case direction.right:
                    currX += stepSpriteDelta
                    break
            }

            let stepSprite: Sprite = sprites.create(stepImg, SpriteKind.CourseSteps)
            stepSprite.setPosition(currX, currY)
            stepSprite.setFlag(SpriteFlag.Ghost, true)
        }
        let endSprite: Sprite = sprites.create(lastStepImg, SpriteKind.CourseSteps)
        endSprite.setPosition(currX, currY)
        endSprite.setFlag(SpriteFlag.Ghost, true)
        endSprite.z = 98
    }

    //% block
    export function getCourseName(): string {
        if (currRound < 0) {
            return ""
        }
        return courses[currRound].name
    }

    //% block="get current round"
    export function getCurrRound(): number {
        return currRound + 1
    }

    //% block="number of courses"
    export function numCourses(): number {
        return courses.length
    }

    //% block="set image for last step to $img"
    //% img.shadow=screen_image_picker
    export function setLastStepImage(img: Image): void {
        lastStepImg = img
    }

    //% block="set player sprite to $sprite"
    export function setPlayerSprite(sprite: Sprite): void {
        fbPlayer = sprite
        if (fbPlayer !== null) {
            fbPlayer.z = 99
        }
    }

    //% block="set course start to x $x y $y"
    //% x.defl=80 y.defl=100
    export function setStartLocation(x: number, y: number): void {
        fbPlayerStart.x = x
        fbPlayerStart.y = y
    }

    //% block="set image for step to $img"
    //% img.shadow=screen_image_picker
    export function setStepImage(img: Image): void {
        stepImg = img
    }

    //% block
    export function startNewRound(): void {
        if (needsInit) {
            init()
        }
        if (currRound + 1 >= courses.length) {
            return
        }
        currRound++
        let currCourseIndex: number = courseOrder[currRound]
        currCourse = courses[currCourseIndex]
        for (let k of RESET_SCREEN_KINDS) {
            sprites.destroyAllSpritesOfKind(k)
        }
        playerAlgoStarts[2].x = 155 - (currCourse.steps.length - 1) * 9
        playerAlgoStarts[4].x = 155 - (currCourse.steps.length - 1) * 9
        drawCourse()
        for (let id: number = 1; id <= 4; id++) {
            playerAlgos[id] = []
        }
        game.splash("Round " + (currRound + 1) + ": " + currCourse.name,
            "Course has " + currCourse.steps.length + " steps.")
    }

    function init(): void {
        if (!needsInit) {
            return
        }

        DIRECTIONS.push({
            dir: direction.up,
            name: "Up",
            images: [
                assets.image`upArrowSmall`,
                assets.image`upArrowLarge`,
            ],
        })
        DIRECTIONS.push({
            dir: direction.left,
            name: "Left",
            images: [
                assets.image`leftArrowSmall`,
                assets.image`leftArrowLarge`,
            ],
        })
        DIRECTIONS.push({
            dir: direction.right,
            name: "Right",
            images: [
                assets.image`rightArrowSmall`,
                assets.image`rightArrowLarge`,
            ],
        })

        playerAlgos.push(null) // Do not use player ID 0
        for (let id: number = 0; id < 4; id++) {
            playerAlgos.push([])
        }

        needsInit = false
    }

    function getDirectionForImage(img: Image): Direction {
        for (let d of DIRECTIONS) {
            for (let i of d.images) {
                if (i.equals(img)) {
                    return d
                }
            }
        }
        return null
    }

    function showPlayerAlgo(player: number): void {
        let kind: number = RESET_SCREEN_KINDS[player]
        sprites.destroyAllSpritesOfKind(kind)
        let currX: number = playerAlgoStarts[player].x
        let y: number = playerAlgoStarts[player].x
        for (let i of playerAlgos[player]) {
            let s: Sprite = sprites.create(i, kind)
            s.setPosition(currX, y)
            currX += i.width
        }
    }
}
