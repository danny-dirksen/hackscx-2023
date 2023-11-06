# PerfectForm – HackSC-X 2023 Submission

Bad form can render your workout useless, put you at risk of short- and long-term injury, and give you an uncomfortable workout. PerfectForm uses computer vision to give you personalized, self-paced AI workout lessons.

## Video Demos
<details>
  <summary>Mobile Demo</summary>
  <video src="https://github.com/danny-dirksen/hackscx-2023/assets/19626472/235aa567-11f7-4dbe-acfb-8f7b9abbe315.mp4"></video>
</details>
<details>
  <summary>Flow Demo</summary>
  <video src="https://github.com/danny-dirksen/hackscx-2023/assets/19626472/ad4a77dd-ac3a-4c6f-8b25-bd6d848397d7.mp4"></video>
</details>
<details>
  <summary>Tips Demo</summary>
  <video src="https://github.com/danny-dirksen/hackscx-2023/assets/19626472/4555accc-b2e6-44ea-be94-40f33406d26e.mp4"></video>
</details>

## Project Story

### Your inspirations

Inspiration came through one of our team members having an ACL injury and when he had to do the exercises by himself with the reference of videos provided by the physio. However, he would always doubt whether he was doing it correctly and whether he had learned the exercise properly.
What it does

Here's how it works: simply open the app, start your workout or your gym trainer selects it for you, and let PerfectForm analyze your every move. Using cutting-edge MoveNet models, our app tracks your body's positioning and movements with incredible accuracy. But that's not all – PerfectForm takes it a step further by cross-referencing your performance with your trainer's recommended form.

With PerfectForm, you can achieve your fitness goals with confidence. Our app harnesses the power of MoveNet technology to provide real-time, expert-level AI feedback on your exercise form.

With PerfectForm, you'll never have to guess if you're doing your exercises right and you will be learning with the correct form of exercise. It's like learning from a personal trainer but anywhere at any time and it will ensure that you get the most out of your workouts while minimizing the risk of injury.

Whether you're a seasoned gym-goer or just starting your fitness journey, PerfectForm is the app you need to elevate your workouts and learn with the results you desire. Download PerfectForm today and experience the future of fitness training. Get ready to perfect your form, one exercise at a time!

### Tech Stack

Our web app prototype is built statically with vanilla JS/HTML/CSS, with real-time pose detection achieved in the browser using MoveNet viaTensorflow.js.

### Challenges you ran into:

There were several modals that would promise our team with getting the result we desired however upon researching we would always get a flaw in one of the techniques. After some time of research, we decided to proceed with OpenNet which was the ideal model as it provided the highest amount of points on the human body thus it would provide us with a high accuracy. However, after researching the ideal way to create the app we thought it would be best to create a web application as it would be feasible across all devices.

Upon investigating how to implement it on a web application it turns out that OpenNet was not ideal for web applications and also not for real-time analyses. So we decided to change our modal which would be ideal for real-time analyses and it can be implemented on a web application. Thus we moved on to using MoveNet. 

While implementing MoveNet we faced lots of challenges in terms of configuring the environment to suit the modal and after making the modal work we were able to receive data points for each point on the human body. The next step was to cross-reference it with the actual video of the trainer to provide the best possible feedback to the user. 

During that time we had to research the best method for it and also try several different methods and analyze which would be the best for the application. In that case, we came up with the idea of measuring the angles of the edges at the important points of the human body in reference to the ground. 

### Accomplishments that you’re proud of

We were really impressed with the accuracy of the modal in terms of giving us the correct vertices and it would also correspond with the right human body part. With the result, we were able to create accurate edges and were able to provide the user with accurate analyses of their movement. According to the movement, we would give the user the right feedback and if the user is doing badly it would automatically pause the video of the gym trainer so that the user gets time to come back to the required position. 

### What you learned

In this project, we all learned several things however the few important things we learned were the structure of the MoveNet model and also the other modals that we considered using previously for this project. As we had to implement the AI modal onto a web application it was definitely challenging to create the application and simultaneously implement the modal. So in this case we had to have good communication with the team such that no wrong changes were made to the project.

### What's Next for the Test Project

In terms of the next thing for the project, we were thinking about how it would be great to implement the same application but in the VR world. Through that, we would be able to have 3D models of the gym trainer so the user is able to accurately follow the trainer. We could create an environment that would be ideal for users to work in. 
