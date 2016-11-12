To run the project, you need to run the following code to install libraries
npm install
npm install mocha --save // for testing case
npm install chai --save //
npm install request --save
npm install should --save-dev // for asserstion
npm install scanf // for input (inquirer js is another option)
npm install byline //for stream read

After then, you can run for the project:

node index.js

Or run for testing case:
npm test


Tech-Doc about this project
First let me explain a bit about why I choose NodeJS,
When I first read the requirement, I thought about how the logic should run in a sudo code, then
I thought about language and platform I should use. I thought about using JAVA, PHP on laravel or JavaScript.
Java is something I learnt in Uni, which is ages ago. I still remember that how we build similar things in eclips and type input command, but I haven't use for long time and don't even have eclipse. And because my laptop has already full of IDE and other stuffs, I don't want install anything, I pass the choice of Java quickly. 
Then I check google to see whether there're some examples that I can refer to. And I found 3 of them, one is written on Ruby on Rail, two are on NodeJS.
It will be very easy and quick for me to use PHP on Laravel and provide a web style form to input command and output in an html way. or even use javascript on a web. But using NodeJS to build an small application is something excit me. I never use command input in terminal and get result from console in NodeJS environment before, and I think the timeframe is enough for me to learn this new thing 
1) NodeJS is too new to me, although most of the time I use in my work about it is as an assistant service and libraris.
2) I'm confident in usting JavaScrip,
3) I've found examples to refer.
So I took a bit time to compare the two example and understand how they achieve this task, I found some good thing from them, also some thing that can improve such as memory optimise. 
Then I start to build my own solution.

Second is about how I think to achieve the task:
I wrote down the testing case first, then think about the structure of it. Basicly I think there are three things 
1) parse the command
2) a robot that implement the command
3) validate the state of the robot

Two of the reference I got
one of the code structured as the robot got the command and put it into paser to "translate" for it to follow the command and it use a helper to check whether the new state is "Valid", if yes then go, if not then ignore.

the other code structured as the paser get the command first and filter the command, then the robot implement the command as setting the new state to it, in the state, it check whether the new state is "Valid" or not,if yes then go, if not then ignore.

I found that the second structure is pretty clear but there'are some issues.
1) some part of the code is not efficient
2) As I mentioned above, there's space for me to optimise the memory use
3) There's some bugs in it
4) Test cases are not enough to cover all the possibility that should be test

my solutions is:
1)for the parser the most efficient way is just check the valid command of(PLACE, RIGHT, LEFT, MOVE, REPORT) and valid direction(SOUTH, NORTH, EAST, WEST)
2)for robot check init or not, and check report or not
3)for state to check the valid update position (0-4)
4) Use a config file to pack all the error message, so that for the same error message it call the same object instead of every time it use a new string instance
5) Create a function variable in state testing, so that everytime when it need, just call the same object

possible improvement:
As its not an credencial information, I had a talk with an expericed software tester(actully my husband) about the requirement right before write this doc. He point out that the syntax of the PLACE command should be exactly as on the requirement doc, so I think one of the improvement in my application will be
detail the PLACE command syntax check
because in my one the syntax of PLACE command is not that restricted
But I don't actully like that restriction as think about user experice. I'd like the current unrestriced way and I even think about make it case insenstive as an improvement.

reference:
https://www.npmjs.com/package/scanf
https://strongloop.com/strongblog/practical-examples-of-the-new-node-js-streams-api/
https://mochajs.org

example I refer:
https://github.com/etanxing/rea-robot/tree/master/test
This guy use 
https://github.com/z-george-ma/REA-robot-test