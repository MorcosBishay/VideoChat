# VideoChat

This is a video conference react app that allows up to 4 users to join the call simultaneously along with a chat feature among the users.

## Usage

***Create .env file in the project root directory, copy the .env.example content in the .env file & add your keys*** 

***Go to the root directory of the project, open your terminal & run the following commands in oreder**
```
1- npm install

2- npm run dev
```
**Output from command 2**

![npm-run-dev](https://user-images.githubusercontent.com/47229671/197359258-e896cb29-dd04-40ab-99b9-6ecb3a1aaa7a.PNG)

**There are 3 options to proceed:**

1- Local access:

Use the local link to use the app from your device.

2- Network access:

Use any of the 2 network links to use the app from any device which shares the same network connection.

3- Global access:

***Open a new terminal while the previous one is still running and run the following commands***

```
1- ./ngrok config add-authtoken <YOUR-NGROK-TOKEN>

2- ./ngrok http 5173
```

**Output from this command**

![ngrok](https://user-images.githubusercontent.com/47229671/197360043-0531be73-e67c-497c-b55f-f66fa96b9a8d.PNG)

Now you can send the highlighted Forwarding link from the output to anyone for video calling with you!


## Tools & Libraries

```
1- React

2- agora-rtc-react (video call)

3- firebase (handling users)

4- firestore (chat)

5- MUI (UI)

6- emotion (styling)

7- date-fns (date formating)

8- prop-types

9- eslint

10- prettier

11- ViteJS

12- ngrok (generate forwarding link)

```


