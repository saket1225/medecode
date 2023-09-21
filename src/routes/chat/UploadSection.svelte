<script>
  import bg from '$lib/images/bgChat.png';
  import { createEventDispatcher } from 'svelte';
  import { showLoading, hideLoading } from './loadingUtils.js';
  import { isFileUploaded } from './fileStoreBool.js';
  import { startOver } from './startAgain.js';
  const dispatch = createEventDispatcher();
  

  let file;
  let showLayout = false;

  function handleFileChange(event) {
    file = event.target.files[0];
    if (file) {
      showLayout = true;
      uploadFile();  // Automatically upload the file\
      $isFileUploaded = true;
    }
  }

  function fileUploadedTrue(){
    $isFileUploaded = true;
  }

  function convertToHTML(text) {
      // Regular expression to match URLs
      const urlRegex = /(https?:\/\/[^\s]+)/g;

      // Check if the entire text is a URL
      if (urlRegex.test(text.trim())) {
          return `<a href="${text.trim()}" target="_blank">${text.trim()}</a>`;
      }

      // Split the text into lines
      const lines = text.split('\n');
      
      // Initialize an empty array to hold HTML lines
      let htmlLines = [];

      // Loop through each line to convert it to HTML
      lines.forEach(line => {
      // Check if the line contains a URL
      const urls = line.match(urlRegex);
      if (urls) {
          urls.forEach(url => {
          line = line.replace(url, `<a href="${url}" target="_blank">${url}</a>`);
          });
      }

      if (line.startsWith('**')) {
          // Convert bold text
          htmlLines.push(`<strong>${line.replace('**', '').replace('**', '')}</strong>`);
      } else if (line.startsWith('* ')) {
          // Convert bullet points
          htmlLines.push(`<li>${line.replace('* ', '')}</li>`);
      } else if (line.includes(':')) {
          // Convert key-value pairs
          const [key, value] = line.split(':');
          htmlLines.push(`<p><span class="key">${key.trim()}</span>: <span class="value">${value.trim()}</span></p>`);
      } else if (line.trim() === '') {
          // Convert empty lines to HTML breaks
          htmlLines.push('<br>');
      } else {
          // Handle other lines as regular text
          htmlLines.push(`<p>${line}</p>`);
      }
      });
      
      // Wrap bullet points in <ul> tags
      const html = htmlLines.join('\n').replace(/(<li>[\s\S]*?<\/li>)/g, '<ul>$1</ul>');
      
      return html;
    }

  function uploadFile() {
    showLoading()

    

    const formData = new FormData();
    formData.append('file', file);

    fetch('https://orca-app-su2vk.ondigitalocean.app/api/summarize', {
      method: 'POST',
      credentials: 'include',
      body: formData
    })
    .then(response => response.json())
    .then(data => {
      hideLoading()
      let ai_response = data.ai_response;
      let summary = data.summary;
      ai_response = convertToHTML(ai_response)
      dispatch('message', ai_response);
      dispatch('summary', summary);
    })
    .catch(error => {
      hideLoading()
      console.log("Error:", error); // hideLoading() and log the error
    });
  }

</script>

  <div class="uploadSection" class:hiddenMobile={$isFileUploaded}>
    <img src={bg} alt="bgChat" class="bgChat">
    <input name="upload_file" type="file" id="fileInput" accept="image/*" on:change={handleFileChange} style="display: none;" />
    {#if !showLayout}
      <button class="uploadReport" on:click={() => document.getElementById('fileInput').click()}>
        Upload Report
        <svg width="17" height="21" viewBox="0 0 17 21" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3.12402 20.4795C2.1748 20.4795 1.45703 20.2393 0.970703 19.7588C0.484375 19.2783 0.241211 18.5664 0.241211 17.623V8.97461C0.241211 8.03711 0.484375 7.32813 0.970703 6.84766C1.45703 6.36133 2.1748 6.11816 3.12402 6.11816H5.52344V7.84961H3.22949C2.81934 7.84961 2.50586 7.95801 2.28906 8.1748C2.07812 8.38574 1.97266 8.70508 1.97266 9.13281V17.4736C1.97266 17.9014 2.07812 18.2207 2.28906 18.4316C2.50586 18.6484 2.81934 18.7568 3.22949 18.7568H13.1348C13.5391 18.7568 13.8496 18.6484 14.0664 18.4316C14.2891 18.2207 14.4004 17.9014 14.4004 17.4736V9.13281C14.4004 8.70508 14.2891 8.38574 14.0664 8.1748C13.8496 7.95801 13.5391 7.84961 13.1348 7.84961H10.8584V6.11816H13.249C14.1982 6.11816 14.916 6.36133 15.4023 6.84766C15.8887 7.32813 16.1318 8.03711 16.1318 8.97461V17.623C16.1318 18.5605 15.8887 19.2695 15.4023 19.75C14.916 20.2363 14.1982 20.4795 13.249 20.4795H3.12402ZM8.18652 13.4746C7.96387 13.4746 7.77051 13.3955 7.60645 13.2373C7.44824 13.0791 7.36914 12.8916 7.36914 12.6748V3.82422L7.43945 2.51465L6.88574 3.15625L5.65527 4.47461C5.51465 4.63281 5.33301 4.71191 5.11035 4.71191C4.90527 4.71191 4.73242 4.64746 4.5918 4.51855C4.45703 4.38379 4.38965 4.21387 4.38965 4.00879C4.38965 3.82129 4.46289 3.64844 4.60938 3.49023L7.5625 0.651367C7.67383 0.545898 7.7793 0.472656 7.87891 0.431641C7.97852 0.390625 8.08105 0.370117 8.18652 0.370117C8.29199 0.370117 8.39453 0.390625 8.49414 0.431641C8.59375 0.472656 8.69629 0.545898 8.80176 0.651367L11.7549 3.49023C11.9072 3.64844 11.9834 3.82129 11.9834 4.00879C11.9834 4.21387 11.9102 4.38379 11.7637 4.51855C11.623 4.64746 11.4531 4.71191 11.2539 4.71191C11.0371 4.71191 10.8555 4.63281 10.709 4.47461L9.47852 3.15625L8.93359 2.51465L9.00391 3.82422V12.6748C9.00391 12.8916 8.92188 13.0791 8.75781 13.2373C8.59961 13.3955 8.40918 13.4746 8.18652 13.4746Z" fill="#EFE3DB"/>
        </svg>
      </button>
    {:else}
      <div class="uploadedLayout">
        <button class="cross" on:click={fileUploadedTrue}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="0.000183105" y="14.3428" width="20" height="1.6" transform="rotate(-45 0.000183105 14.3428)" fill="#071966"/>
            <rect x="1.13135" width="20" height="1.6" transform="rotate(45 1.13135 0)" fill="#071966"/>
          </svg>        
        </button>
        <div class="imageWrapper">
          <img src={URL.createObjectURL(file)} alt="Uploaded File" class="uploadedImage" />
        </div>
        <button class="startOver" on:click={startOver}>
            Start Again
            <svg width="17" height="20" viewBox="0 0 17 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0.573242 11.7783C0.573242 11.5146 0.655273 11.3008 0.819336 11.1367C0.989258 10.9727 1.2002 10.8906 1.45215 10.8906C1.70996 10.8906 1.91504 10.9727 2.06738 11.1367C2.21973 11.3008 2.2959 11.5146 2.2959 11.7783C2.2959 12.6279 2.4541 13.4248 2.77051 14.1689C3.08691 14.9072 3.52344 15.5605 4.08008 16.1289C4.64258 16.6914 5.29297 17.1309 6.03125 17.4473C6.77539 17.7578 7.5752 17.9131 8.43066 17.9131C9.27441 17.9131 10.0654 17.7578 10.8037 17.4473C11.5479 17.1309 12.1982 16.6914 12.7549 16.1289C13.3174 15.5605 13.7568 14.9072 14.0732 14.1689C14.3896 13.4248 14.5479 12.6279 14.5479 11.7783C14.5479 10.9229 14.3896 10.123 14.0732 9.37891C13.7627 8.63477 13.3291 7.98437 12.7725 7.42773C12.2158 6.86523 11.5684 6.42578 10.8301 6.10938C10.0918 5.79297 9.30078 5.63477 8.45703 5.63477C8.16406 5.63477 7.88574 5.64941 7.62207 5.67871C7.36426 5.70215 7.12109 5.7373 6.89258 5.78418L9.27441 8.14844C9.35645 8.23047 9.41797 8.32129 9.45898 8.4209C9.5 8.51465 9.52051 8.61719 9.52051 8.72852C9.52051 8.96875 9.43848 9.1709 9.27441 9.33496C9.11621 9.49902 8.91699 9.58105 8.67676 9.58105C8.43066 9.58105 8.23145 9.50195 8.0791 9.34375L4.4668 5.70508C4.37305 5.61133 4.30566 5.51172 4.26465 5.40625C4.22363 5.30078 4.20312 5.18945 4.20312 5.07227C4.20312 4.82617 4.29102 4.61523 4.4668 4.43945L8.0791 0.765625C8.23145 0.601562 8.43359 0.519531 8.68555 0.519531C8.91992 0.519531 9.11621 0.604492 9.27441 0.774414C9.43848 0.938477 9.52051 1.14355 9.52051 1.38965C9.52051 1.50098 9.5 1.60645 9.45898 1.70605C9.41797 1.7998 9.35938 1.8877 9.2832 1.96973L7.16504 4.07031C7.3584 4.0293 7.56348 3.99707 7.78027 3.97363C8.00293 3.9502 8.22852 3.93848 8.45703 3.93848C9.53516 3.93848 10.5488 4.14355 11.498 4.55371C12.4473 4.95801 13.2793 5.51758 13.9941 6.23242C14.709 6.94727 15.2656 7.7793 15.6641 8.72852C16.0684 9.67773 16.2705 10.6943 16.2705 11.7783C16.2705 12.8682 16.0684 13.8906 15.6641 14.8457C15.2598 15.7949 14.6973 16.6299 13.9766 17.3506C13.2617 18.0713 12.4297 18.6309 11.4805 19.0293C10.5312 19.4336 9.51465 19.6357 8.43066 19.6357C7.34082 19.6357 6.31836 19.4336 5.36328 19.0293C4.41406 18.6309 3.58203 18.0713 2.86719 17.3506C2.15234 16.6299 1.58984 15.7949 1.17969 14.8457C0.775391 13.8906 0.573242 12.8682 0.573242 11.7783Z" fill="#EFE3DB"/>
            </svg>                
        </button>
      </div>
    {/if}
  </div>
  
  <style>
    .cross{
      display: none;
    }

    .uploadSection {
      position: relative;
      height: 100vh;
    }

    .hiddenMobile {
      display: block; /* or whatever you want to do when hidden */
    }
    
    .bgChat {
      inset: 0;
      height: 100vh;
      z-index: -1;
      width: 428px;
      object-fit: cover;
    }
  
    .uploadReport {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      display: flex;
      gap: 1rem;
      border: none;
      outline: none;
      background: #071966;
      color: #EFE3DB;
      font-size: 18px;
      padding: 18px 30px;
      z-index: 1;
      cursor: pointer;
      transition: .1s all;
      width: 60%;
      align-items: center;
      justify-content: center;
    }

    .uploadReport svg{
      width: 17px;
      height: 21px;
    }
  
    .uploadReport:hover {
        background: #061350;
    }
    
    .uploadedLayout {
        position: absolute;
        inset: 0;
        height: 100vh;
    }

    .imageWrapper {
        position: absolute;
        display: flex;
        align-items: center;
        justify-content: center;
        top: 40%;
        left: 50%;
        padding: 15px;
        transform: translate(-50%, -50%);
        background-color: #EFE3DB;
        border: 6px solid #EDD2B0;
    }

    .uploadedImage {
        position: relative;
        width: 225px;
        opacity: 0.6;
        object-fit: contain;
    }

    .startOver {
        position: absolute;
        display: flex;
        gap: 1rem;
        font-size: 18px;
        bottom: 5rem;
        left: 50%;
        transform: translateX(-50%);
        background: #071966;
        border: none;
        outline: none;
        color: #EFE3DB;
        padding: 15px 40px;
        cursor: pointer;
        transition: .1s all;
    }
    
    .startOver:hover{
        background: #061350;
    }

    @media only screen and (max-width: 1000px){
        .uploadSection{
            height: 100vh;
            width: 100vw;
        }

        .uploadSection .bgChat{
          object-fit: cover;
          width: 100vw;
        }

        .uploadSection button{
          align-items: center;
          justify-content: center;
          width: 50%;
        }

        .hiddenMobile {
          display: none; /* or whatever you want to do when hidden */
        }

        .cross{
          position: absolute;
          inset: 30px;
          background: rebeccapurple;
          z-index: 100;
          width: 40px !important;
          height: 40px;
          display: block;
          background: none;
          outline: none;
          border: none;
          cursor: pointer;
        }

        .cross svg{
          transform: scale(1.5);
        }

        .startOver{
          bottom: 5rem;
        }
    }

    @media only screen and (max-width: 500px){
        .uploadSection button{
          align-items: center;
          justify-content: center;
          width: 90%;
        }
    }
  </style>
  