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
    <h2 class="logo">Me<span>decode_</span></h2>
    <UploadSection on:message={handleMessage} on:summary={handleSummary} />
    <div class="chat">
        <div class="topBlender"></div>
        <div class="mainChat">
			{#each messages as message}
                <div class={message.type} transition:fade={{ duration: 300 }}>
                    {#if message.type === 'ai'}
                        {@html message.text} <!-- Use Svelte's HTML binding -->
                    {:else}
                        {message.text}
                    {/if}
                </div>
            {/each}

		</div>
        <div class="input">
            <input bind:value={userInput} type="text" placeholder="Ask your question" on:input={checkInputLength} on:keydown={handleKeyPress} autofocus>
            <button class="send" on:click={sendMessage} disabled={isButtonDisabled} style="opacity: {isButtonDisabled ? 0.5 : 1}">
				Send
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

    .ai, .user {
        opacity: 1;
    }

    /* Add this to smoothly scroll to the bottom */
    .mainChat {
        transition: scroll 0.3s ease;
    }

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
		padding-top: 4rem;  /* Adjust this value to ensure the first message isn't hidden */
		margin-top: -2rem;
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
</style>