<!-- OTPVerification.svelte -->
<script>
    import { onMount } from 'svelte';
  
    let verificationCode = '';
  
    const handleVerify = () => {
      // Call the `handleVerifyOTP` function from your main component
    };
  </script>
  
  <style>
    
  </style>
  
  <div>
    <input type="text" bind:value={verificationCode} placeholder="Enter OTP" />
    <button on:click={handleVerify}>Verify OTP</button>
  </div>
  