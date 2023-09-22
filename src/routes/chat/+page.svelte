<svelte:head>
	<title>Chat</title>
	<meta name="description" content="Chat with the bot here :)" />
</svelte:head>

<script>
    import { onMount, tick } from 'svelte';
    import './chat.css';
    import UploadSection from './UploadSection.svelte';
    import { showLoading, hideLoading } from './loadingUtils.js';
    import { fade } from 'svelte/transition';
    import { isFileUploaded } from './fileStoreBool.js';
    import { startOver } from './startAgain';

    function startAgain() {
        startOver();
    }
    
    function handleHamburgerClick() {
        $isFileUploaded = !$isFileUploaded;
    }


    let messages = [];
    let ai_response_first = '';
    let ai_response;
    let summary = '';
    let userInput = "";
    let isButtonDisabled = true;
    let trimmedInput;

    function checkInputLength() {
        isButtonDisabled = userInput.trim().length <= 2;
    }

    function handleMessage(event) {
        ai_response_first = event.detail;
    }

    function handleSummary(event) {
        summary = event.detail;
    }

    async function sendMessage() {
        trimmedInput = userInput.trim();
        if (trimmedInput.length > 2) {
            // Append user message first
            messages = [...messages, { type: 'user', text: trimmedInput }];
            userInput = "";
            checkInputLength();
            await tick();
            const chatDiv = document.querySelector('.mainChat');
            chatDiv.scrollTop = chatDiv.scrollHeight;

            // Start the loading process
            showLoading()

            // Fetch request
            fetch('https://orca-app-su2vk.ondigitalocean.app/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
				credentials: 'include',
                body: JSON.stringify({ summary: summary, user_input: trimmedInput })
            })

            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })

            .then(async data => {
                hideLoading();
                ai_response = data.ai_response;
                messages = [...messages, { type: 'ai', text: ai_response }];

                // Scroll to the bottom
                await tick();
                const chatDiv = document.querySelector('.mainChat');
                chatDiv.scrollTop = chatDiv.scrollHeight;
            })

            .catch(error => {
                hideLoading()
                console.error('Error:', error);
            });
        }
    }

    function handleKeyPress(event) {
        if (event.key === 'Enter') {
            sendMessage();
        }
    }

    onMount(() => {
        const chatDiv = document.querySelector('.mainChat');
        chatDiv.scrollTop = chatDiv.scrollHeight;
    });

    // Reactive statement to watch ai_response_first
    let hasInitialMessageBeenAppended = false;

	$: if (ai_response_first && ai_response_first.trim().length > 0 && !hasInitialMessageBeenAppended) {
		messages = [...messages, { type: 'ai', text: ai_response_first }];
		hasInitialMessageBeenAppended = true;
	}
</script>


<div class="app">
    {#if $isFileUploaded}
        <div class="topNavMobile">
            <button class="hamburger" on:click={handleHamburgerClick}>
                <div class="line firstLine"></div>
                <div class="line secondLine"></div>
            </button>
            <button class="startAgain" on:click={startAgain}>
                Start Again
                <svg width="13" height="16" viewBox="0 0 13 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0.242033 9.48288C0.242033 9.27472 0.306795 9.10588 0.436318 8.97636C0.570467 8.84683 0.736996 8.78207 0.935907 8.78207C1.13944 8.78207 1.30135 8.84683 1.42162 8.97636C1.54189 9.10588 1.60203 9.27472 1.60203 9.48288C1.60203 10.1536 1.72692 10.7827 1.97672 11.3702C2.22651 11.9531 2.57113 12.4689 3.01059 12.9176C3.45467 13.3616 3.96813 13.7086 4.55099 13.9584C5.13847 14.2035 5.76989 14.3261 6.44526 14.3261C7.11138 14.3261 7.73587 14.2035 8.31872 13.9584C8.9062 13.7086 9.41966 13.3616 9.85912 12.9176C10.3032 12.4689 10.6501 11.9531 10.8999 11.3702C11.1497 10.7827 11.2746 10.1536 11.2746 9.48288C11.2746 8.80751 11.1497 8.17609 10.8999 7.58861C10.6548 7.00113 10.3124 6.48766 9.873 6.04821C9.43354 5.60413 8.92239 5.2572 8.33954 5.0074C7.75668 4.75761 7.1322 4.63271 6.46608 4.63271C6.23479 4.63271 6.01506 4.64427 5.8069 4.6674C5.60336 4.68591 5.41139 4.71366 5.23098 4.75067L7.11138 6.61719C7.17614 6.68195 7.22471 6.75365 7.25709 6.83229C7.28947 6.9063 7.30566 6.98725 7.30566 7.07514C7.30566 7.2648 7.2409 7.42439 7.11138 7.55392C6.98648 7.68344 6.8292 7.7482 6.63955 7.7482C6.44526 7.7482 6.28798 7.68575 6.16771 7.56086L3.31589 4.68822C3.24188 4.61421 3.18868 4.53557 3.1563 4.4523C3.12392 4.36904 3.10773 4.28115 3.10773 4.18863C3.10773 3.99435 3.17712 3.82782 3.31589 3.68904L6.16771 0.788651C6.28798 0.659128 6.44757 0.594367 6.64648 0.594367C6.83152 0.594367 6.98648 0.661441 7.11138 0.79559C7.2409 0.925113 7.30566 1.08702 7.30566 1.2813C7.30566 1.36919 7.28947 1.45246 7.25709 1.5311C7.22471 1.60511 7.17845 1.6745 7.11832 1.73926L5.44608 3.39762C5.59874 3.36523 5.76064 3.33979 5.93179 3.32129C6.10758 3.30279 6.28567 3.29353 6.46608 3.29353C7.31723 3.29353 8.1175 3.45544 8.86688 3.77925C9.61626 4.09843 10.2731 4.54019 10.8375 5.10454C11.4018 5.66889 11.8413 6.32576 12.1558 7.07514C12.475 7.82453 12.6346 8.62711 12.6346 9.48288C12.6346 10.3433 12.475 11.1505 12.1558 11.9045C11.8367 12.6539 11.3926 13.3131 10.8236 13.882C10.2593 14.451 9.60238 14.8928 8.853 15.2073C8.10362 15.5265 7.30104 15.6861 6.44526 15.6861C5.58486 15.6861 4.77765 15.5265 4.02364 15.2073C3.27426 14.8928 2.61739 14.451 2.05304 13.882C1.48869 13.3131 1.04461 12.6539 0.720806 11.9045C0.401624 11.1505 0.242033 10.3433 0.242033 9.48288Z" fill="#071966"/>
                </svg>                
            </button>
        </div>
    {/if}
    <div class="logowrapper">
        <h2 class="logo">Me<span>decode_</span></h2>
    </div>
    <UploadSection on:message={handleMessage} on:summary={handleSummary} />
    <div class="chat {$isFileUploaded ? 'showChatPhone' : ''}">
        <div class="topBlender"></div>
        <div class="mainChat">
			{#each messages as message}
                <div class={message.type} transition:fade={{ duration: 300 }}>
                    {#if message.type === 'ai'}
                        {@html message.text}
                    {:else}
                        {message.text}
                    {/if}
                </div>
            {/each}

		</div>
        <div class="input">
            <input name="userInput" bind:value={userInput} type="text" placeholder="Ask your question" on:input={checkInputLength} on:keydown={handleKeyPress} autofocus>
            
            
            <!-- send button -->
            <button name="sendButton" class="send sendButton" on:click={sendMessage} disabled={isButtonDisabled} style="opacity: {isButtonDisabled ? 0.5 : 1}">
				Send
				<svg width="25" height="16" viewBox="0 0 25 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M24.7071 8.70711C25.0976 8.31658 25.0976 7.68342 24.7071 7.29289L18.3431 0.928932C17.9526 0.538408 17.3195 0.538408 16.9289 0.928932C16.5384 1.31946 16.5384 1.95262 16.9289 2.34315L22.5858 8L16.9289 13.6569C16.5384 14.0474 16.5384 14.6805 16.9289 15.0711C17.3195 15.4616 17.9526 15.4616 18.3431 15.0711L24.7071 8.70711ZM0 9L24 9V7L0 7L0 9Z" fill="#EFE3DB"/>
                </svg>
			</button>

            <!-- send button on mobile -->
            <button name="sendButtonMobile" class="send sendButtonMobile" on:click={sendMessage} disabled={isButtonDisabled} style="opacity: {isButtonDisabled ? 0.5 : 1}">
				<svg width="25" height="16" viewBox="0 0 25 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M24.7071 8.70711C25.0976 8.31658 25.0976 7.68342 24.7071 7.29289L18.3431 0.928932C17.9526 0.538408 17.3195 0.538408 16.9289 0.928932C16.5384 1.31946 16.5384 1.95262 16.9289 2.34315L22.5858 8L16.9289 13.6569C16.5384 14.0474 16.5384 14.6805 16.9289 15.0711C17.3195 15.4616 17.9526 15.4616 18.3431 15.0711L24.7071 8.70711ZM0 9L24 9V7L0 7L0 9Z" fill="#EFE3DB"/>
                </svg>
			</button>
        </div>
    </div>
</div>

<style>
	.input button:disabled {
		pointer-events: none;
	}

    .topNavMobile{
        display: none;
    }
    

    .showChatPhone{
        display: none;
    }

    .ai, .user {
        opacity: 1;
    }

    /* Add this to smoothly scroll to the bottom */
    .mainChat {
        transition: scroll 0.3s ease;
    }

    .app{
        overflow: hidden;
        display: flex;
        width: 100vw;
        height: 100vh
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
        z-index: 10;
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

    .mainChat {
		height: 70vh;
		overflow: auto;
		width: 70%;
		position: relative;
		z-index: 1;
		padding-top: 5rem;  /* Adjust this value to ensure the first message isn't hidden */
		margin-top: -3rem;
	}

    .topBlender {
		background: #EFE3DB;
		/* background: rebeccapurple; */
		filter: blur(20.5px);
		width: 100%;
		height: 10rem;
		position: relative;
		z-index: 2;
	}

    .input{
        display: flex;
        height: 4rem;
        width: 70%;
        margin-bottom: 3rem;
		margin-top: 4rem;
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

    .sendButton, .sendButtonMobile{
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

    .sendButtonMobile{
        display: none;
    }

    .input button:hover{
        background: #061350;
    }

    .ai{
        margin-top: 1rem;
        letter-spacing: 1px;
        width: 80%;
        font-weight: 400;
        color: #071966;
        font-size: 18px;
    }

    .user{
        width: 80%;
        letter-spacing: 1px;
        font-size: 18px;
        margin-top: 2rem;
        font-weight: 500;
    }

    @media only screen and (max-width: 1200px){
        .input{
            width: 90%;
        }

        .mainChat{
            width: 90%;
        }
    }


    @media only screen and (max-width: 1000px){
        .chat{
            display: none;
        }

        .mainChat{
            transform: translateX(-50%);
            left: 50%;
            height: 55vh;
        }

        .logo{
            text-align: center;
            top: auto;
            right: auto;
            bottom: 1rem;
            transform: scale(0.6);
            width: 100%;
        }

        .showChatPhone{
            display: block;
        }

        .input{
            position: relative;
            transform: translateX(-50%);
            left: 50%;
            width: 90%;
            margin-top: 1rem;
        }

        .user, .ai{
            width: 100%;
        }

        .sendButton{
            display: none;
        }

        .sendButtonMobile{
            padding: 18px;
            display: flex;
        }

        .topNavMobile{
            position: absolute;
            display: flex;
            padding: 30px;
            z-index: 100;
            width: 100vw;
            justify-content: space-between;
            align-items: center;
        }

        .topNavMobile .startAgain{
            cursor: pointer;
            display: inline-flex;
            padding: 10px 25px;
            align-items: center;
            gap: 13px;
            border: 1px solid #071966;
            background: #EFE3DB;
            color: #071966;
            font-size: 16px;
            font-style: normal;
            font-weight: 500;
            line-height: normal;
            transition: .2s all;
        }

        .startAgain:active{
            background: #e4d9cc;
        }

        .topNavMobile .hamburger{
            display: flex;
            flex-direction: column;
            gap: 0.3rem;
            cursor: pointer;
            background: none;
            border: none;
            outline: none;
        }

        .topNavMobile .hamburger .line{
            width: 35px;
            height: 3px;
            background: #071966;
        }
    }

    @media only screen and (max-width: 700px){
        .input{
            width: 100%;
        }
    }
</style>