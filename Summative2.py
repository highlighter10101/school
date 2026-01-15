from graphics import*
import random
question=[]
question.append("What is the correct flag")
question.append ("Which one is the flag of Greenland")
question.append ("Which flag is a country in Africa")

flags=[]
flags.append ("a__pictures/bosnia.png")
flags.append ("a__pictures/wrong_malaysia.png")
flags.append ("a__pictures/bosnia.png")
flags.append ("a__pictures/wrong_malaysia.png")
flags.append ("a__pictures/bosnia.png")
flags.append ("a__pictures/wrong_malaysia.png")

choices=[[2, 3,1,4], [3,5,0,2], [4,0,3,5]]

correct=[0,1,3]

askedQuestions=[]

ggg=GraphWin("Gold Gold Gold",900,1000)
ggg.setBackground ("#945c43")
introText=Text(Point(450,200),"Gold\n Gold Gold")
introText.setSize(72)
introText.setTextColor("#f0ede5")
introText.setFace ("stratumno2")
introText.setStyle('bold')
introText.draw(ggg)
description=Text(Point(450,350),"A betting style geography trivia game")
description.setSize(30)
description.setFace ("stratumno2")
description.setTextColor("#a8d5ba")
description.draw(ggg)
start=Rectangle(Point(300,750),Point(600,900))
start.setFill ('#354a21')
start.setOutline ('#354a21')
startTxt=Text(Point(450,800),"START")
startTxt.setFace('stratumno2')
startTxt.setSize(40)
startTxt.draw(ggg)
start.draw(ggg)
while True:
    click=ggg.getMouse()
    if click.getX()>300 and click.getX()<600 and click.getY()>750 and click.getY()<900:
        ggg.close()
        
    for questions in range (3):
        number=random.randint(0,2)
        while number in askedQuestions:
            number=random.randint (0,2)
        askedQuestions.append (number)
        quiz=GraphWin("Quiz"+ str(questions+1),700,700)
        title=Text(Point(350,150), question[number])
        title.draw (quiz)
        flag1=Image(Point(200,300), flags[choices[number][0]])
        flag2=Image(Point(500,300), flags[choices[number][1]])
        flag3=Image(Point(200,500), flags[choices[number][2]])
        flag4=Image(Point(500,500), flags[choices[number][3]])
        flag1.draw(quiz)
        flag2.draw(quiz)
        flag3.draw(quiz)
        flag4.draw(quiz)
        selected=-1
        while selected<0:
            click=quiz.getMouse()
            print (click)
            #change coords (incorrect)
            if click.getX()>200 and click.getX()<343 and click.getY()>300 and click.getY()<387:
                selected=0
            elif click.getX()>500 and click.getX()<641 and click.getY()>300 and click.getY()<387:
                selected=1
            elif click.getX()>200 and click.getX()<343 and click.getY()>500 and click.getY()<592:
                selected=2
            elif click.getX()>500 and click.getX()<641 and click.getY()>500 and click.getY()<592:
                selected=3
            print (selected)
            
