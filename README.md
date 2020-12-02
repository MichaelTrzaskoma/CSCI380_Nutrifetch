# CSCI 380 - Project: Nutrifetch

Instructor: Prof. Akhtar

Contributors: Michael Trzaskoma, Gregory Salvesen, Zakaria Khan, and Hui (Henry) Chen

<br>

## Demo
* <a href="https://drive.google.com/file/d/1L2l0_u7QQGtK80Dw4m_auxPDGig-kHg4/view">Quick Demo</a>

<br>

## Get start
 * install the required libraries<br>
  ```
  npm install
  ```
  * Create a Google API: <a href="https://console.developers.google.com/apis/dashboard"> here </a>
  * Sign up firebase: <a href="https://console.firebase.google.com/">here</a>
  * Note: <br>
    a. Use your own API key. Never share with anyone else. <br>
    b. Use ```host.exp.exponent``` as the “Package name”(Android) or "Bundle ID"(IOS) in the Google Cloud Console, otherwise you will face ```Error 400: redirect_uri_mismatch```.<br>
    c. Use ```openssl rand -base64 32 | openssl sha1 -c``` to generate openssl key<br>
    d. Place "google-services.json" under android directory
  * Clear the Metro's cache: ```yarn start --reset-cache```

<br>

  ## Run the app
  ```
  cd <directory of your project>
  expo start
  # OR 
  npm start 
  # OR 
  npm run android 
  ```

  - If on android simulator:
  ```npm run android```

  - If on ios simulator:
  ```npm run ios```

  - If on web:
  ```npm run web```
  
  <br>