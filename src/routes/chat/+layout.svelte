<style>
    .loading {
        position: absolute;
        width: 125vw;
        height: 100px;
        z-index: 1000;
        left: -12.5vw;
        bottom: -20px;
        display: flex;
        background: linear-gradient(90deg, #F4BB94, #7386F7, #F4BB94);
        background-size: 200%;
        animation: animate 3s linear infinite, MoveXY 3s ease-in-out infinite alternate;
        filter: blur(40px);
        opacity: 0;
        transition: 2s all;
    }

    .loading.show{
        opacity: 1;
    }

    @keyframes animate {
        0%, 100% {
            background-position: 0%;
        }
        100% {
            background-position: 200%;
        }
    }
</style>

<main>
    <slot></slot>
</main>

<div class="loading"></div>