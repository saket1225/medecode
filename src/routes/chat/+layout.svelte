<script>
	import './chat.css';
    import UploadSection from './UploadSection.svelte';
</script>

<div class="app">
    <h2 class="logo">Me<span>decode_</span></h2>
	<UploadSection></UploadSection>
    <div class="chat">
        <div class="mainChat">

        </div>
        <div class="input">
            <input autofocus type="text" placeholder="Ask your question">
            <button class="send">
                Send
                <svg width="25" height="16" viewBox="0 0 25 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M24.7071 8.70711C25.0976 8.31658 25.0976 7.68342 24.7071 7.29289L18.3431 0.928932C17.9526 0.538408 17.3195 0.538408 16.9289 0.928932C16.5384 1.31946 16.5384 1.95262 16.9289 2.34315L22.5858 8L16.9289 13.6569C16.5384 14.0474 16.5384 14.6805 16.9289 15.0711C17.3195 15.4616 17.9526 15.4616 18.3431 15.0711L24.7071 8.70711ZM0 9L24 9V7L0 7L0 9Z" fill="#EFE3DB"/>
                </svg>                
            </button>
        </div>
    </div>
</div>

<style>
    .app{
        display: flex;
    }

	.logo{
        position: absolute;
        top: 41px;
        right: 54px;
		color: #071966;
		font-size: 28px;
		font-style: normal;
		font-weight: 400;
		line-height: normal;
	}

	.logo span{
		color: #7386F7;
		font-size: 28px;
		font-style: normal;
		font-weight: 600;
		line-height: normal;
	}

    .chat{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100%;
    }

    .mainChat{
        height: 100%;
        width: 70%;
    }

    .input{
        display: flex;
        height: 5rem;
        width: 70%;
        margin-bottom: 3rem;
    }

    .input input{
        font-size: 22px;
        background: #EDD2B0;
        outline: none;
        border: none;
        padding: 18px 30px;
        color: #071966;
        font-weight: 500;
        width: 100%;
    }

    .input input::placeholder{
        padding-left: 0.2rem;
        font-size: 20px;
        color: #071966;
        font-weight: 100;
        opacity: .6;
    }

    .input button{
        font-size: 20px;
        background: #071966;
        color: #EFE3DB;
        display: flex;
        align-items: center;
        gap: 1rem;
        outline: none;
        border: none;
        padding: 18px 40px;
        transition: .1s all;
        cursor: pointer;
    }

    .input button:hover{
        background: #061350;
    }
</style>
