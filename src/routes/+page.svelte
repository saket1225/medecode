<svelte:head>
	<title>Medecode</title>
	<meta name="description" content="Medecode, let's rock it!" />
</svelte:head>

<script>
	import './styles.css';
	import heroImage from '$lib/images/hero.webp';
	import LeftSectionHero from './LeftSectionHero.svelte';
</script>

<div class="app">
	<div class="leftPartHero">
		<h2 class="logo">Me<span>decode_</span></h2>
		<LeftSectionHero></LeftSectionHero>
	</div>
	
	<div class="rightSection">
		<img src={ heroImage } class="heroImage">
		<div class="warning">
			<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" class="warningIcon">
				<g clip-path="url(#clip0_419_622)">
				<path d="M9 17.3574C13.6155 17.3574 17.3571 13.6157 17.3571 9.00021C17.3571 4.38469 13.6155 0.643066 9 0.643066C4.38447 0.643066 0.642853 4.38469 0.642853 9.00021C0.642853 13.6157 4.38447 17.3574 9 17.3574Z" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
				<path d="M9 4.5V8.35714" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
				<path d="M8.99999 12.8575C9.35503 12.8575 9.64285 12.5697 9.64285 12.2146C9.64285 11.8596 9.35503 11.5718 8.99999 11.5718C8.64495 11.5718 8.35713 11.8596 8.35713 12.2146C8.35713 12.5697 8.64495 12.8575 8.99999 12.8575Z" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
				</g>
				<defs>
				<clipPath id="clip0_419_622">
				<rect width="18" height="18" fill="white"/>
				</clipPath>
				</defs>
			</svg>
			<h2 class="description">
				This app provides general information about your medical reports. It is not a substitute for professional medical advice. If you have health concerns, consult a doctor for accurate evaluation and guidance. <br> Your health is paramount.
				<br><br>
				<a href="https://www.youtube.com/" target="_blank">Privacy Policy</a>
			</h2>
		</div>
	</div>
</div>

<style>
	.app{
		display: flex;
		justify-content: space-between;
		margin: 0;
		inset: 0;
	}

	.leftPartHero{
		position: sticky;
		top: 0;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		height: 100vh;
	}

	.logo{
		color: #FFF;
		font-size: 28px;
		font-style: normal;
		font-weight: 400;
		line-height: normal;
		margin-top: 5rem;
		margin-bottom: 3rem;
	}

	.logo span{
		color: #F4BB94;
		font-style: normal;
		font-weight: 600;
		line-height: normal;
	}

	.heroImage{
		width: auto;
		display: block;
		top: 0;
		right: 0;
		float: right;
		height: 100vh;
		object-fit: cover;
	}

	.warning{
		display: block;
		float: right;
		width: 80%;
	}

	.rightSection{
		display: flex;
		flex-direction: column;
		gap: 2rem;
		width: 50%;
		margin-left: 4rem;
	}

	.warning{
		display: flex;
		position: relative;
		left: 45%;
		transform: translateX(-50%);
		margin-top: 3rem;
		margin-bottom: 5rem;
	}

	.warning .warningIcon{
		position: relative;
		top: 0.2rem;
		width: 8rem;
	}

	.warning .description{
		color: #fff;
		font-weight: 400;
		font-size: 18px;
	}

	.warning .description a{
		color: #48E9FF;
	}

	/* Mobile Responsive */
	@media only screen and (max-width: 1000px) {
		.logo{
			font-size: 22px;
			margin-bottom: 7rem;
		}

		.app {
			flex-direction: column;
		}

		.leftPartHero {
			position: static; /* Make it unsticky */
			height: auto;
		}

		.heroImage {
			height: auto;
			width: 100%;
		}

		.rightSection{
			margin-top: -3rem;
		}

		.rightSection, .leftPartHero {
			width: 100%;
		}

		.warning {
			left: 50%;
			width: 90%;
			font-size: 16px;
		}

		.rightSection{
			margin-left: -59px;
			width: 100vw;
		}
	}

	@media only screen and (max-width: 650px) {
        .leftPartHero{
            margin-left: -15px;
        }
	}

	@media only screen and (max-width: 500px) {
        .leftPartHero{
            margin-left: -30px;
        }
	}
</style>
