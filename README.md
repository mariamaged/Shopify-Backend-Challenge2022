# Shopify Backend Challenge - Winter 2022
## Image Repository Architecture

![](https://lh3.googleusercontent.com/pw/AM-JKLUSNEtYJrovPOOkPuMNTRWYK7glc0-oXqiCTk3VtaHgzhtcyv_JDmyS6b9kHgOY1Sc93dRRjnRAHnoSP8-77dLX-7OhfMD5QG3Lr1vBLvFQ2LVUqZJ1YXawsJG3M00pQIlOoaYE2bEvOCiFEqo_aa32=w809-h625-no?authuser=0)

### Deployed Version
- Link: https://imagerepository-42rxnmdfza-uc.a.run.app/docs/
### Technical Implementation
	Technologies
- **Routing:** Node.js and Express.
- **Database:** PostgreSQL RDMS with npm package sequelize.
- **Cloud:** Google Cloud SQL, Storage, Build, Run.
- **Authentication:** Firebase authentication with email and password and Json Web Tokens (JWT).
***
	Functionality
- Use authentication for all routes to return data to its respectively related user or prevent them from performing operations they are not allowed.
- Upload a set of images with additional metadata like description and keywords as well their access control (public, private).
  - Maximum size of one image is **100MB**.
  - Maximum number of images is **50**.
  - Public images get named as `Current date in milliseconds`-`original file name`.`extension (jpg or jpeg or png allowed)`.
  - Private images get named as `userId`-`Current date in milliseconds`-`original file name`.`extension (jpg or jpeg or png allowed)`.
- Get information about these images back.
- Delete images (set, by one image name, or all private images uploaded by user).
- The routes handle both deployed version and local version. Deployed version uploads images and database data to Cloud SQL database instance, and Google Cloud Storage while the local one saves the files locally in a folder called uploads and metadata in a local database instance running on localhost.
   - `The local cannot be tested here because of the environmental variables.`

### How to Test
- **Step 1:** Open the swagger docs link provided above.

![](https://lh3.googleusercontent.com/pw/AM-JKLXWJhZQ8tD1p3iksAd5PUshlF9ntaY9aOndkJ3hVFs7SyjBDgWotjXRXn0IORY6r-6TqCmW_-LUiTW7eVDh4dU-4neJnHmp0IY2sLsq8ppMeM5o5_FCyucPVAVlVT3vMpPLSVrN_qCGvh1RG3UMECxx=w1249-h540-no?authuser=0)
- **Step 2:** Call the POST /token route with the first example (for default user) or second example (to create your own user), and copy the token.

![](https://lh3.googleusercontent.com/pw/AM-JKLXModARWPDZDGbHrbKl_ZRVBxN9MYSvM4K1vzwqK89eL1UjSDB04asPe_xwN9RMgg1fCe48Jj8aW-u0a654CZjSljBzRCzxsc6O4RBZ_b7IZ8iXM4RJc7Lnj_CzsfD6CxmBbEXqgDkyBYuubAnJK9Tr=w1300-h320-no?authuser=0)
- **Step 3:** Go to the Green Authorize button at the top right of the page and paste the token in the bearerAuth field.

![](https://lh3.googleusercontent.com/pw/AM-JKLW75gXr2GSSHva8Rl_oKHq6KwMrGQo5MCjf3aUnhaieKpjcHOmyOSCGSQfQr9o3mYFUV_fImc1KpiuqHjP-MkGfW7f2Xt9d7o0L21lpmPRgI0liUqICp0zmwi7a_Ydr_Ew283xtlYnMixmZ7K_Dz77A=w200-h81-no?authuser=0)

![](https://lh3.googleusercontent.com/pw/AM-JKLU0BDNVNIU-P_A2pmFjopLvQ5KNnHZmYEJOg4cwiHEf2ne27GWP9P6o3l9v9VTzoMr7NtmAYQNy7_F610fg845si7JzBcoVpgD_ImruM5rFe-x0kiYSe7I__kV1bIfwRidthudWVVimvvT9aBFU7ovM=w641-h260-no?authuser=0)
- **Step 4:** Call the routes and take any of the linkUrls of images returned back and paste them in another tab to ensure it is the same image as the one uploaded.

![](https://lh3.googleusercontent.com/pw/AM-JKLXCMVLKKCve5eDIPxcWmdJAU5RF4lk582rqKt1TXgFER63ig0BwfH2sxR1jvPXnV6639Vx5u71795ol1NIFvX-MZuypG9P-TFbA_ew5rCUn8wJGPbjp4wEqXdyjrqTB3QP009Skl6Nqcyc0d3D9kXhY=w1288-h496-no?authuser=0)
